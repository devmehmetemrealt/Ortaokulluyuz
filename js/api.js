/* API istemcisi — Vercel sunucusuz işlevi (api/index.js) yoksa yerel moda düşer */
const API = {
  taban: "api",
  aktif: false,
  async ping() {
    try {
      const r = await fetch(this.taban + "?islem=ping", { credentials: "same-origin" });
      const j = await r.json();
      this.aktif = !!(j && j.ok);
    } catch (e) { this.aktif = false; }
    return this.aktif;
  },
  async sor(islem, veri) {
    let r;
    try {
      r = await fetch(this.taban + "?islem=" + encodeURIComponent(islem), {
        method: "POST", credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(veri || {})
      });
    } catch (e) {
      throw new Error('Sunucuya bağlanılamadı. İnternet/Vercel bağlantısını kontrol edin.');
    }
    const ham = await r.text();
    let j;
    try { j = ham ? JSON.parse(ham) : {}; }
    catch (e) { j = { ok: false, hata: 'Sunucudan geçersiz yanıt alındı (HTTP ' + r.status + ').' }; }
    if (!r.ok && !j.hata) j.hata = 'Sunucu hatası (HTTP ' + r.status + ').';
    return j;
  },
  // Soru görseli istemcide base64'e çevrilir (sunucusuz işlevde dosya saklanmaz)
  dosyaOku(dosya) {
    return new Promise((resolve, reject) => {
      if (!dosya) return resolve(null);
      if (dosya.size > 2 * 1024 * 1024) return reject(new Error("Görsel en fazla 2 MB olmalı."));
      const r = new FileReader();
      r.onload = () => resolve(r.result);
      r.onerror = () => reject(new Error("Görsel okunamadı."));
      r.readAsDataURL(dosya);
    });
  },
  async soruGonderJson(veri) {
    return this.sor("soru-ekle", veri);
  }
};
