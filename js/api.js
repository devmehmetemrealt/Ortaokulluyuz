/* Güvenli API istemcisi — tüm üretim çağrıları tek gateway üzerinden gider. */
const API = {
  taban: "/api/gateway",
  aktif: false,
  _kodlar: {"captcha-yeni": "a33", "captcha-dogrula": "a34", "ping": "a0", "oturum": "a1", "kayit": "a2", "dogrula": "a3", "kod-tekrar": "a4", "giris": "a5", "telefon-kayit": "a6", "google-giris": "a7", "yapilandirma": "a8", "cikis": "a9", "sifre-degistir": "aa", "uyeler": "ab", "rol-ata": "ac", "uye-sil": "ad", "sifre-ver": "ae", "uye-onayla": "af", "test-eposta": "a10", "istatistik": "a11", "sorular": "a12", "soru-ekle": "a13", "soru-sil": "a14", "yanit-ekle": "a15", "yanit-sil": "a16", "begeni": "a17", "dogru-isaretle": "a18", "favoriler": "a19", "favori-ekle": "a1a", "favori-cikar": "a1b", "tercih-etki": "a1c", "tercih-ozet": "a1d", "sesli-yapilandirma": "a1e", "sesli-arama-baslat": "a1f", "sesli-gelen-arama": "a20", "sesli-arama-teklif": "a21", "sesli-arama-yanit": "a22", "sesli-arama-durum-guncelle": "a23", "sesli-arama-sinyal": "a24", "sesli-arama-kapat": "a25", "sesli-arama-durum": "a26", "kisiler": "a27", "sohbetler": "a28", "mesajlar": "a29", "mesaj-gonder": "a2a", "mesaj-sil": "a2b", "denetim-mesajlar": "a2c", "sikayet-et": "a2d", "sikayetler": "a2e", "sikayet-kapat": "a2f", "paylasimlar": "a30", "paylasim-ekle": "a31", "paylasim-sil": "a32"},
  _nonce() {
    try { return crypto.randomUUID(); } catch (e) { return String(Date.now()) + Math.random().toString(36).slice(2); }
  },
  async ping() {
    try {
      const r = await this.sor("ping");
      this.aktif = !!(r && r.ok);
    } catch (e) { this.aktif = false; }
    return this.aktif;
  },
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
  async soruGonderJson(veri) { return this.sor("soru-ekle", veri); }
};
