/* Ortaokulluyuz — güvenli API istemcisi.
   Tüm üretim istekleri /api/gateway üzerinden kısa işlem kodlarıyla gider.
   Kimlik bilgileri HttpOnly cookie ile taşınır. */
const API = {
  taban: "/api/gateway",
  aktif: false,
  _kodlar: {"captcha-yeni":"a33","captcha-dogrula":"a34","ping":"a0","oturum":"a1","kayit":"a2","dogrula":"a3","kod-tekrar":"a4","giris":"a5","telefon-kayit":"a6","google-giris":"a7","yapilandirma":"a8","cikis":"a9","sifre-degistir":"aa","uyeler":"ab","rol-ata":"ac","uye-sil":"ad","sifre-ver":"ae","uye-onayla":"af","test-eposta":"a10","istatistik":"a11","sorular":"a12","soru-ekle":"a13","soru-sil":"a14","yanit-ekle":"a15","yanit-sil":"a16","begeni":"a17","dogru-isaretle":"a18","favoriler":"a19","favori-ekle":"a1a","favori-cikar":"a1b","tercih-etki":"a1c","tercih-ozet":"a1d","sesli-yapilandirma":"a1e","sesli-arama-baslat":"a1f","sesli-gelen-arama":"a20","sesli-arama-teklif":"a21","sesli-arama-yanit":"a22","sesli-arama-durum-guncelle":"a23","sesli-arama-sinyal":"a24","sesli-arama-kapat":"a25","sesli-arama-durum":"a26","kisiler":"a27","sohbetler":"a28","mesajlar":"a29","mesaj-gonder":"a2a","mesaj-sil":"a2b","denetim-mesajlar":"a2c","sikayet-et":"a2d","sikayetler":"a2e","sikayet-kapat":"a2f","paylasimlar":"a30","paylasim-ekle":"a31","paylasim-sil":"a32"},

  _nonce() {
    try {
      if (globalThis.crypto && typeof crypto.randomUUID === "function") return crypto.randomUUID();
    } catch (e) {}
    return Date.now().toString(36) + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
  },

  async sor(islem, veri) {
    const kod = this._kodlar[islem];
    if (!kod) throw new Error("Bilinmeyen API işlemi.");

    const payload = {
      a: kod,
      d: (veri && typeof veri === "object") ? veri : {},
      t: Date.now(),
      n: this._nonce()
    };

    let r;
    try {
      r = await fetch(this.taban, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        cache: "no-store",
        body: JSON.stringify(payload)
      });
    } catch (e) {
      throw new Error("Sunucuya bağlanılamadı. İnternet/Vercel bağlantısını kontrol edin.");
    }

    const ham = await r.text();
    let j = {};
    try {
      j = ham ? JSON.parse(ham) : {};
    } catch (e) {
      j = { ok: false, hata: "Sunucudan geçersiz yanıt alındı (HTTP " + r.status + ")." };
    }
    if (!r.ok && !j.hata) j.hata = "Sunucu hatası (HTTP " + r.status + ").";
    return j;
  },

  async ping() {
    try {
      const r = await this.sor("ping");
      this.aktif = !!(r && r.ok);
    } catch (e) {
      this.aktif = false;
    }
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

  async soruGonderJson(veri) {
    return this.sor("soru-ekle", veri);
  }
};
