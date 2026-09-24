/* Öğretmen paylaşımları — sunucu varsa ortak DB, yoksa yerel yedek.
   Yazma yetkisi: yalnızca öğretmen ve yöneticiler. Okuma: herkese açık. */
const YerelPaylasim = {
  key: "ook_paylasim_v1",
  yukle() { try { const v = JSON.parse(localStorage.getItem(this.key)); if (Array.isArray(v)) return v; } catch (e) {} return []; },
  kaydet(l) { localStorage.setItem(this.key, JSON.stringify(l)); }
};

const Paylasim = {
  async liste(f) {
    f = f || {};
    if (Auth.sunucuModu()) {
      const j = await API.sor("paylasimlar", { sinif: f.sinif || "", ders: f.ders || "", q: f.q || "" });
      if (!j.ok) throw new Error(j.hata || "Paylaşımlar alınamadı.");
      return j.paylasimlar;
    }
    let l = YerelPaylasim.yukle();
    return l.filter(p =>
      (!f.sinif || String(p.sinif) === String(f.sinif)) &&
      (!f.ders || p.ders === f.ders) &&
      (!f.q || ((p.baslik + " " + p.icerik).toLocaleLowerCase("tr").includes(String(f.q).toLocaleLowerCase("tr")))));
  },
  yazabilir() {
    const k = Auth.mevcut();
    return !!(k && (k.rol === "ogretmen" || k.rol === "admin"));
  },
  async ekle(o) {
    if (Auth.sunucuModu()) {
      const j = await API.sor("paylasim-ekle", o);
      if (!j.ok) throw new Error(j.hata || "Paylaşılamadı.");
      return j;
    }
    const k = Auth.mevcut();
    if (!k || (k.rol !== "ogretmen" && k.rol !== "admin"))
      throw new Error("Paylaşım yalnızca öğretmenler ve yöneticiler tarafından yapılır.");
    const l = YerelPaylasim.yukle();
    l.unshift({
      id: yerelId("p"), sinif: Number(o.sinif), ders: o.ders, unite: o.unite || "",
      baslik: o.baslik, icerik: o.icerik, yazar_id: k.id, yazar_ad: k.ad,
      yazar_rol: k.rol, olusturma: new Date().toISOString()
    });
    YerelPaylasim.kaydet(l);
    return { ok: true };
  },
  async sil(id) {
    if (Auth.sunucuModu()) {
      const j = await API.sor("paylasim-sil", { id });
      if (!j.ok) throw new Error(j.hata || "Silinemedi.");
      return j;
    }
    YerelPaylasim.kaydet(YerelPaylasim.yukle().filter(p => String(p.id) !== String(id)));
    return { ok: true };
  }
};
