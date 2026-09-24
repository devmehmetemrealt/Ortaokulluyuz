/* Forum — sunucu (PHP+MySQL) varsa ortak veritabanı, yoksa yerel yedek */
const YerelForum = {
  key: "ook_forum_v1",
  yukle() {
    try {
      const v = JSON.parse(localStorage.getItem(this.key));
      if (Array.isArray(v) && v.length) return v;
    } catch (e) {}
    localStorage.setItem(this.key, JSON.stringify(FORUM_SEED));
    return JSON.parse(JSON.stringify(FORUM_SEED));
  },
  kaydet(liste) { localStorage.setItem(this.key, JSON.stringify(liste)); },
  soruEkle({ sinif, ders, unite, baslik, govde, gorsel }) {
    const liste = this.yukle();
    const k = Auth.mevcut();
    liste.unshift({
      id: yerelId("s"), sinif: Number(sinif), ders, unite, baslik, govde,
      yazar: k ? `${k.ad} (${rolAdi(k.rol)})` : "Misafir",
      rol: k ? k.rol : "ogrenci", tarih: new Date().toISOString(),
      begeni: 0, cozuldu: false, gorsel: gorsel || null, yanitlar: []
    });
    this.kaydet(liste); return liste;
  },
  yanitEkle(soruId, metin) {
    const liste = this.yukle();
    const s = liste.find(x => x.id === soruId); if (!s) return liste;
    const k = Auth.mevcut();
    s.yanitlar.push({
      id: yerelId("y"), yazar: k ? `${k.ad} (${rolAdi(k.rol)})` : "Misafir",
      rol: k ? k.rol : "ogrenci", metin, begeni: 0, dogru: false, tarih: new Date().toISOString()
    });
    this.kaydet(liste); return liste;
  },
  begen(soruId, yanitId) {
    const liste = this.yukle();
    const s = liste.find(x => x.id === soruId); if (!s) return liste;
    if (!yanitId) s.begeni++;
    else { const y = s.yanitlar.find(a => a.id === yanitId); if (y) y.begeni++; }
    this.kaydet(liste); return liste;
  },
  dogruIsaretle(soruId, yanitId) {
    const liste = this.yukle();
    const s = liste.find(x => x.id === soruId); if (!s) return liste;
    const k = Auth.mevcut();
    const soruSahibi = k && s.yazar.startsWith(k.ad);
    const yetkili = k && (k.rol === "ogretmen" || k.rol === "admin" || soruSahibi);
    if (!yetkili && s.yazar !== "Misafir") { alert("Doğru yanıtı yalnızca soru sahibi veya öğretmen işaretleyebilir."); return liste; }
    s.yanitlar.forEach(a => a.dogru = (a.id === yanitId));
    s.cozuldu = true;
    this.kaydet(liste); return liste;
  },
  soruSil(soruId) {
    this.kaydet(this.yukle().filter(x => x.id !== soruId));
  },
  yanitSil(soruId, yanitId) {
    const liste = this.yukle();
    const s = liste.find(x => x.id === soruId);
    if (s) { s.yanitlar = s.yanitlar.filter(a => a.id !== yanitId); this.kaydet(liste); }
  }
};
const YerelSikayet = {
  key: "ook_sikayet_v1",
  yukle() { try { const v = JSON.parse(localStorage.getItem(this.key)); if (Array.isArray(v)) return v; } catch (e) {} return []; },
  kaydet(l) { localStorage.setItem(this.key, JSON.stringify(l)); }
};
function rolAdi(r) { return r === "ogretmen" ? "Öğretmen" : r === "veli" ? "Veli" : r === "admin" ? "Yönetici" : "Öğrenci"; }
function yanitSayiId(yid) { return parseInt(String(yid).replace(/^\D+/, ""), 10) || 0; }

const Forum = {
  _sonListe: [],
  async liste(f) {
    f = f || {};
    if (Auth.sunucuModu()) {
      const j = await API.sor("sorular", {
        sinif: f.sinif || "", ders: f.ders || "", durum: f.durum || "", q: f.q || ""
      });
      if (!j.ok) throw new Error(j.hata || "Sorular alınamadı.");
      this._sonListe = j.sorular;
      return j.sorular;
    }
    let s = YerelForum.yukle();
    s = s.filter(x =>
      (!f.sinif || x.sinif == f.sinif) &&
      (!f.ders || x.ders === f.ders) &&
      (!f.durum || (f.durum === "cozuldu" ? x.cozuldu : !x.cozuldu)) &&
      (!f.q || (x.baslik + " " + x.govde).toLocaleLowerCase("tr").includes(String(f.q).toLocaleLowerCase("tr")))
    );
    this._sonListe = s;
    return s;
  },
  async soruEkle(o) {
    if (Auth.sunucuModu()) {
      const j = await API.soruGonderJson({
        sinif: o.sinif, ders: o.ders, unite: o.unite,
        baslik: o.baslik, govde: o.govde, gorsel: o.gorsel || null
      });
      if (!j.ok) throw new Error(j.hata || "Soru yayınlanamadı.");
      return j;
    }
    return YerelForum.soruEkle(o);
  },
  async yanitEkle(soruId, metin) {
    if (Auth.sunucuModu()) {
      const j = await API.sor("yanit-ekle", { soru_id: soruId, metin });
      if (!j.ok) throw new Error(j.hata || "Yanıt yayınlanamadı.");
      return j;
    }
    return YerelForum.yanitEkle(soruId, metin);
  },
  async begen(soruId, yanitId) {
    if (Auth.sunucuModu()) {
      const j = await API.sor("begeni", yanitId
        ? { hedef: "yanit", id: yanitSayiId(yanitId) }
        : { hedef: "soru", id: soruId });
      if (!j.ok) throw new Error(j.hata || "Beğenilemedi.");
      return j;
    }
    return YerelForum.begen(soruId, yanitId);
  },
  async dogruIsaretle(soruId, yanitId) {
    if (Auth.sunucuModu()) {
      const j = await API.sor("dogru-isaretle", { soru_id: soruId, id: yanitSayiId(yanitId) });
      if (!j.ok) throw new Error(j.hata || "İşaretlenemedi.");
      return j;
    }
    return YerelForum.dogruIsaretle(soruId, yanitId);
  },
  async soruSil(soruId) {
    if (Auth.sunucuModu()) {
      const j = await API.sor("soru-sil", { id: soruId });
      if (!j.ok) throw new Error(j.hata || "Silinemedi.");
      return j;
    }
    return YerelForum.soruSil(soruId);
  },
  async sikayetEt(hedef, hedefId, neden, aciklama) {
    const ben = Auth.mevcut();
    if (!ben) throw new Error("Şikayet etmek için giriş yapın.");
    if (Auth.sunucuModu()) {
      const j = await API.sor("sikayet-et", { hedef, hedef_id: hedefId, neden, aciklama: aciklama || "" });
      if (!j.ok) throw new Error(j.hata || "Şikayet gönderilemedi.");
      return j;
    }
    const l = YerelSikayet.yukle();
    if (l.some(s => s.hedef === hedef && String(s.hedef_id) === String(hedefId) && s.bildiren === ben.ad && s.durum === "bekliyor"))
      throw new Error("Bu içeriği zaten şikayet ettiniz.");
    l.unshift({ id: yerelId("r"), hedef, hedef_id: hedefId, neden, aciklama: aciklama || "",
      bildiren: ben.ad, durum: "bekliyor", tarih: new Date().toISOString() });
    YerelSikayet.kaydet(l);
    return { ok: true };
  },
  async sikayetler(durum) {
    if (Auth.sunucuModu()) {
      const j = await API.sor("sikayetler", { durum: durum || "" });
      if (!j.ok) throw new Error(j.hata || "Şikayetler alınamadı.");
      return j.sikayetler;
    }
    let l = YerelSikayet.yukle();
    if (durum) l = l.filter(s => s.durum === durum);
    return l.map(s => ({ ...s, ozet: "", soru_id: s.hedef === "soru" ? s.hedef_id : null }));
  },
  async sikayetKapat(id) {
    if (Auth.sunucuModu()) {
      const j = await API.sor("sikayet-kapat", { id });
      if (!j.ok) throw new Error(j.hata || "Kapatılamadı.");
      return j;
    }
    const l = YerelSikayet.yukle();
    const s = l.find(x => String(x.id) === String(id));
    if (s) { s.durum = "incelendi"; YerelSikayet.kaydet(l); }
    return { ok: true };
  },
  async yanitSil(soruId, yanitId) {
    if (Auth.sunucuModu()) {
      const j = await API.sor("yanit-sil", { id: yanitSayiId(yanitId) });
      if (!j.ok) throw new Error(j.hata || "Silinemedi.");
      return j;
    }
    return YerelForum.yanitSil(soruId, yanitId);
  }
};
