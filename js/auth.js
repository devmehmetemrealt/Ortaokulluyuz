/* Auth — sunucu (PHP+MySQL) varsa onu kullanır, yoksa yerel moda düşer.
   Roller kayıt ekranında seçilemez; yalnızca yönetici atar. */
function ookHash(sifre) {
  const s = String(sifre) + "::ook-salt-v1";
  let h1 = 0xdeadbeef ^ 7, h2 = 0x41c6ce57 ^ 7;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 2654435761); h2 = Math.imul(h2 ^ c, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return ((h2 >>> 0).toString(16).padStart(8, "0") + (h1 >>> 0).toString(16).padStart(8, "0"));
}
const ADMIN_SEED = { eposta: "yonetim@ortaokulluyuz.local", parolaKarma: "8285423e1a47c7a0", ad: "Site Yöneticisi" };
function yerelId(harf) { return harf + Date.now().toString(36) + Math.floor(Math.random() * 1296).toString(36); }

/* Yerel yedek (sunucusuz çalışma için eski mantık, aynen korundu) */
const YerelAuth = {
  key: "ook_kullanici",
  usersKey: "ook_kullanicilar",
  mevcut() {
    try {
      const o = JSON.parse(localStorage.getItem(this.key));
      if (!o) return null;
      const k = this.tumKullanicilar().find(u => u.id === o.id);
      return k ? { id: k.id, ad: k.ad, eposta: k.eposta, rol: k.rol, tarih: k.tarih } : null;
    } catch (e) { return null; }
  },
  tumKullanicilar() {
    try { const l = JSON.parse(localStorage.getItem(this.usersKey)) || []; return Array.isArray(l) ? l : []; }
    catch (e) { return []; }
  },
  _kaydet(l) { localStorage.setItem(this.usersKey, JSON.stringify(l)); },
  _tohumla() {
    const l = this.tumKullanicilar();
    if (!l.find(u => u.rol === "admin")) {
      l.push({ id: "u-admin", ad: ADMIN_SEED.ad, eposta: ADMIN_SEED.eposta, karma: ADMIN_SEED.parolaKarma, rol: "admin", tarih: new Date().toISOString() });
      this._kaydet(l);
    }
  },
  kayit(ad, eposta, sifre) {
    this._tohumla();
    const users = this.tumKullanicilar();
    eposta = String(eposta).toLowerCase().trim(); sifre = String(sifre).trim();
    if (users.find(u => u.eposta === eposta)) return { hata: "Bu e-posta ile zaten kayıt var." };
    const k = { id: yerelId("u"), ad, eposta, karma: ookHash(sifre), rol: "ogrenci", tarih: new Date().toISOString() };
    users.push(k); this._kaydet(users);
    localStorage.setItem(this.key, JSON.stringify({ id: k.id, ad: k.ad, eposta: k.eposta, rol: k.rol, tarih: k.tarih }));
    return { ok: true, kullanici: k };
  },
  giris(eposta, sifre) {
    this._tohumla();
    eposta = String(eposta).toLowerCase().trim(); sifre = String(sifre).trim();
    const u = this.tumKullanicilar().find(x => x.eposta === eposta);
    if (!u) return { hata: "Bu e-posta ile kayıt bulunamadı. Önce kayıt olun." };
    const deneme = ookHash(sifre);
    if (u.karma !== deneme && u.sifre !== sifre) return { hata: "Şifre hatalı. Tekrar deneyin." };
    if (!u.karma) {
      const l = this.tumKullanicilar();
      const kayit = l.find(x => x.id === u.id);
      kayit.karma = ookHash(sifre); delete kayit.sifre; this._kaydet(l);
    }
    localStorage.setItem(this.key, JSON.stringify({ id: u.id, ad: u.ad, eposta: u.eposta, rol: u.rol, tarih: u.tarih }));
    return { ok: true, kullanici: u };
  },
  cikis() { localStorage.removeItem(this.key); },
  adminMi() { const k = this.mevcut(); return !!(k && k.rol === "admin"); },
  rolAta(kullaniciId, rol) {
    if (!this.adminMi()) return { hata: "Yetkisiz işlem." };
    if (!["ogrenci", "ogretmen", "veli", "admin"].includes(rol)) return { hata: "Geçersiz rol." };
    const l = this.tumKullanicilar();
    const k = l.find(x => x.id === kullaniciId);
    if (!k) return { hata: "Kullanıcı bulunamadı." };
    if (k.id === "u-admin" && rol !== "admin") return { hata: "Ana yönetici hesabının yetkisi alınamaz." };
    k.rol = rol; this._kaydet(l); return { ok: true };
  },
  kullaniciSil(kullaniciId) {
    if (!this.adminMi()) return { hata: "Yetkisiz işlem." };
    if (kullaniciId === "u-admin") return { hata: "Ana yönetici hesabı silinemez." };
    this._kaydet(this.tumKullanicilar().filter(x => x.id !== kullaniciId));
    return { ok: true };
  },
  sifreSifirla(kullaniciId, yeniSifre) {
    if (!this.adminMi()) return { hata: "Yetkisiz işlem." };
    if (String(yeniSifre).length < 4) return { hata: "Şifre en az 4 karakter olmalı." };
    const l = this.tumKullanicilar();
    const k = l.find(x => x.id === kullaniciId);
    if (!k) return { hata: "Kullanıcı bulunamadı." };
    k.karma = ookHash(yeniSifre); delete k.sifre; this._kaydet(l);
    return { ok: true };
  },
  parolaDegistir(yeniSifre) {
    const k = this.mevcut();
    if (!k) return { hata: "Giriş yapmalısınız." };
    if (String(yeniSifre).length < 6) return { hata: "Şifre en az 6 karakter olmalı." };
    const l = this.tumKullanicilar();
    const kayit = l.find(x => x.id === k.id);
    if (!kayit) return { hata: "Kullanıcı bulunamadı." };
    kayit.karma = ookHash(yeniSifre); delete kayit.sifre; this._kaydet(l);
    return { ok: true };
  }
};

/* Birincil Auth: sunucu varsa uzak, yoksa yerel */
const Auth = {
  _uzak: false,
  _oturum: null,
  async baslat() {
    this._uzak = await API.ping();
    if (this._uzak) {
      try {
        const j = await API.sor("oturum");
        this._oturum = (j && j.ok && j.kullanici) ? j.kullanici : null;
      } catch (e) { this._uzak = false; }
    }
    if (!this._uzak) YerelAuth._tohumla();
    return this._uzak;
  },
  sunucuModu() { return this._uzak; },
  mevcut() {
    if (this._uzak) return this._oturum;
    return YerelAuth.mevcut();
  },
  async kayit(ad, eposta, sifre) {
    if (this._uzak) {
      const j = await API.sor("kayit", { ad, eposta, sifre });
      if (!j.ok) return { hata: j.hata || "Kayıt başarısız." };
      if (j.dogrulama_gerekli) return { ok: true, dogrulama_gerekli: true, eposta: j.eposta, posta_hatasi: j.posta_hatasi || "" };
      this._oturum = j.kullanici;
      return { ok: true, kullanici: j.kullanici };
    }
    return YerelAuth.kayit(ad, eposta, sifre);
  },
  async dogrula(eposta, kod) {
    if (!this._uzak) return { ok: true };
    const j = await API.sor("dogrula", { eposta, kod });
    if (!j.ok) return { hata: j.hata || "Doğrulanamadı." };
    this._oturum = j.kullanici;
    return { ok: true, kullanici: j.kullanici };
  },
  async kodTekrar(eposta) {
    if (!this._uzak) return { ok: true };
    const j = await API.sor("kod-tekrar", { eposta });
    return j.ok ? { ok: true } : { hata: j.hata || "Kod gönderilemedi." };
  },
  async uyeOnayla(kullaniciId) {
    if (this._uzak) {
      const j = await API.sor("uye-onayla", { id: kullaniciId });
      return j.ok ? { ok: true } : { hata: j.hata || "Onaylanamadı." };
    }
    return { ok: true };
  },
  async testEposta(eposta) {
    const j = await API.sor("test-eposta", { eposta });
    return j.ok ? { ok: true } : { hata: j.hata || "Gönderilemedi." };
  },
  async giris(eposta, sifre) {
    if (this._uzak) {
      const j = await API.sor("giris", { eposta, sifre });
      if (!j.ok) return { hata: j.hata || "Giriş başarısız." };
      this._oturum = j.kullanici;
      return { ok: true, kullanici: j.kullanici };
    }
    return YerelAuth.giris(eposta, sifre);
  },
  async cikis() {
    if (this._uzak) { try { await API.sor("cikis"); } catch (e) {} this._oturum = null; }
    else YerelAuth.cikis();
  },
  adminMi() { const k = this.mevcut(); return !!(k && k.rol === "admin"); },
  async uyeleriGetir() {
    if (this._uzak) {
      const j = await API.sor("uyeler");
      if (!j.ok) return { hata: j.hata || "Liste alınamadı." };
      return { ok: true, uyeler: j.uyeler };
    }
    return { ok: true, uyeler: YerelAuth.tumKullanicilar() };
  },
  async istatistik() {
    if (this._uzak) {
      const j = await API.sor("istatistik");
      if (!j.ok) return { hata: j.hata || "Alınamadı." };
      return { ok: true, veri: j };
    }
    return { ok: true, veri: null };
  },
  async rolAta(kullaniciId, rol) {
    if (this._uzak) {
      const j = await API.sor("rol-ata", { id: kullaniciId, rol });
      return j.ok ? { ok: true } : { hata: j.hata || "Güncellenemedi." };
    }
    return YerelAuth.rolAta(kullaniciId, rol);
  },
  async kullaniciSil(kullaniciId) {
    if (this._uzak) {
      const j = await API.sor("uye-sil", { id: kullaniciId });
      return j.ok ? { ok: true } : { hata: j.hata || "Silinemedi." };
    }
    return YerelAuth.kullaniciSil(kullaniciId);
  },
  async sifreSifirla(kullaniciId, yeniSifre) {
    if (this._uzak) {
      const j = await API.sor("sifre-ver", { id: kullaniciId, yeni: yeniSifre });
      return j.ok ? { ok: true } : { hata: j.hata || "Tanımlanamadı." };
    }
    return YerelAuth.sifreSifirla(kullaniciId, yeniSifre);
  },
  async parolaDegistir(yeniSifre) {
    if (this._uzak) {
      const j = await API.sor("sifre-degistir", { yeni: yeniSifre });
      return j.ok ? { ok: true } : { hata: j.hata || "Güncellenemedi." };
    }
    return YerelAuth.parolaDegistir(yeniSifre);
  },
  /* Favoriler her zaman bu cihazda tutulur (hızlı ve girişsiz çalışır) */
  favoriler() { try { return JSON.parse(localStorage.getItem("ook_fav_" + (this.mevcut()?.id || "misafir"))) || []; } catch (e) { return []; } },
  favoriEkle(kitapId) {
    const k = this.mevcut(); const ls = "ook_fav_" + (k?.id || "misafir");
    let f = []; try { f = JSON.parse(localStorage.getItem(ls)) || []; } catch (e) {}
    if (!f.includes(kitapId)) f.push(kitapId);
    localStorage.setItem(ls, JSON.stringify(f));
  },
  favoriCikar(kitapId) {
    const k = this.mevcut(); const ls = "ook_fav_" + (k?.id || "misafir");
    let f = []; try { f = JSON.parse(localStorage.getItem(ls)) || []; } catch (e) {}
    localStorage.setItem(ls, JSON.stringify(f.filter(x => x !== kitapId)));
  }
};
