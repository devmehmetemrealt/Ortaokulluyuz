/* Özel mesajlar — sunucu varsa ortak veritabanı, yoksa yerel yedek.
   Not: güvenlik denetimi kapsamında mesajlar yöneticiler tarafından görüntülenebilir. */
const YerelMesaj = {
  key: "ook_mesaj_v1",
  yukle() {
    try { const v = JSON.parse(localStorage.getItem(this.key)); if (Array.isArray(v)) return v; } catch (e) {}
    return [];
  },
  kaydet(l) { localStorage.setItem(this.key, JSON.stringify(l)); }
};

const Mesaj = {
  _acikSohbet: null,
  async sohbetler() {
    const ben = Auth.mevcut();
    if (!ben) return { sohbetler: [], okunmamis_toplam: 0 };
    if (Auth.sunucuModu()) {
      const j = await API.sor("sohbetler");
      if (!j.ok) throw new Error(j.hata || "Sohbetler alınamadı.");
      return j;
    }
    const tum = YerelMesaj.yukle().filter(m => m.gonderen_id === ben.id || m.alici_id === ben.id);
    const harita = {};
    const adBul = (id) => {
      const u = YerelAuth.tumKullanicilar().find(x => String(x.id) === String(id));
      return u ? u.ad : "Silinmiş Üye";
    };
    tum.sort((a, b) => (a.tarih < b.tarih ? 1 : -1));
    for (const m of tum) {
      const karsi = String(m.gonderen_id) === String(ben.id) ? m.alici_id : m.gonderen_id;
      if (!harita[karsi]) harita[karsi] = { karsi_id: karsi, karsi_ad: adBul(karsi), son_metin: m.metin, son_zaman: m.tarih, okunmamis: 0 };
      if (String(m.alici_id) === String(ben.id) && !m.okundu) harita[karsi].okunmamis++;
    }
    const liste = Object.values(harita);
    return { sohbetler: liste, okunmamis_toplam: liste.reduce((t, s) => t + s.okunmamis, 0) };
  },
  async kisiler() {
    const ben = Auth.mevcut();
    if (Auth.sunucuModu()) {
      const j = await API.sor("kisiler");
      if (!j.ok) throw new Error(j.hata || "Kişiler alınamadı.");
      return j.kisiler;
    }
    return YerelAuth.tumKullanicilar()
      .filter(u => String(u.id) !== String(ben && ben.id))
      .map(u => ({ id: u.id, ad: u.ad, rol: u.rol }));
  },
  async getir(karsiId) {
    const ben = Auth.mevcut();
    if (Auth.sunucuModu()) {
      const j = await API.sor("mesajlar", { karsi_id: karsiId });
      if (!j.ok) throw new Error(j.hata || "Mesajlar alınamadı.");
      return {
        karsi: j.karsi,
        mesajlar: j.mesajlar.map(m => ({
          id: m.id, metin: m.metin, tarih: m.olusturma,
          giden: Number(m.gonderen_id) === Number(ben.id)
        }))
      };
    }
    const tum = YerelMesaj.yukle().filter(m =>
      (String(m.gonderen_id) === String(ben.id) && String(m.alici_id) === String(karsiId)) ||
      (String(m.gonderen_id) === String(karsiId) && String(m.alici_id) === String(ben.id)));
    tum.forEach(m => { if (String(m.alici_id) === String(ben.id)) m.okundu = true; });
    YerelMesaj.kaydet(YerelMesaj.yukle().map(m => {
      if (String(m.alici_id) === String(ben.id) && String(m.gonderen_id) === String(karsiId)) m.okundu = true;
      return m;
    }));
    const u = YerelAuth.tumKullanicilar().find(x => String(x.id) === String(karsiId)) || { ad: "Silinmiş Üye" };
    return {
      karsi: { id: karsiId, ad: u.ad },
      mesajlar: tum.sort((a, b) => (a.tarih < b.tarih ? -1 : 1)).map(m => ({
        id: m.id, metin: m.metin, tarih: m.tarih,
        giden: String(m.gonderen_id) === String(ben.id)
      }))
    };
  },
  async gonder(aliciId, metin) {
    const ben = Auth.mevcut();
    metin = String(metin).trim();
    if (!metin) throw new Error("Mesaj boş olamaz.");
    if (metin.length > 1000) throw new Error("Mesaj en fazla 1000 karakter olabilir.");
    if (Auth.sunucuModu()) {
      const j = await API.sor("mesaj-gonder", { alici_id: aliciId, metin });
      if (!j.ok) throw new Error(j.hata || "Mesaj gönderilemedi.");
      return j;
    }
    const l = YerelMesaj.yukle();
    l.push({ id: yerelId("m"), gonderen_id: ben.id, alici_id: aliciId, metin, okundu: false, tarih: new Date().toISOString() });
    YerelMesaj.kaydet(l);
    return { ok: true };
  },
  async sil(id) {
    if (Auth.sunucuModu()) {
      const j = await API.sor("mesaj-sil", { id });
      if (!j.ok) throw new Error(j.hata || "Silinemedi.");
      return j;
    }
    const ben = Auth.mevcut();
    const l = YerelMesaj.yukle().filter(m =>
      !(String(m.id) === String(id) && (String(m.gonderen_id) === String(ben.id) || (ben && ben.rol === "admin"))));
    YerelMesaj.kaydet(l);
    return { ok: true };
  },
  async denetim(q) {
    if (Auth.sunucuModu()) {
      const j = await API.sor("denetim-mesajlar", { q: q || "" });
      if (!j.ok) throw new Error(j.hata || "Denetim listesi alınamadı.");
      return j.mesajlar;
    }
    const adBul = (id) => {
      const u = YerelAuth.tumKullanicilar().find(x => String(x.id) === String(id));
      return u ? u.ad : "Silinmiş Üye";
    };
    return YerelMesaj.yukle()
      .filter(m => !q || m.metin.toLocaleLowerCase("tr").includes(String(q).toLocaleLowerCase("tr")))
      .slice(-100).reverse()
      .map(m => ({ id: m.id, g_ad: adBul(m.gonderen_id), a_ad: adBul(m.alici_id), metin: m.metin, olusturma: m.tarih }));
  }
};
