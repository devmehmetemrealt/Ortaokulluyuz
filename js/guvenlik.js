/* Ortaokulluyuz özel CAPTCHA + kısa ömürlü, HttpOnly güvenlik geçişi. */
function ookEscapeHTML(v) {
  return String(v).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","\'":"&#039;"}[c]));
}
const Guvenlik = {
  _challenge: null,
  _gecisGecerli: false,
  _gecisBitis: 0,
  _bekleyen: null,
  _stilEklendi: false,

  async hazirla(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return false;
    if (!this._challenge || this._challenge.bitis <= Date.now()) await this.yeni(containerId);
    this.ciz(containerId);
    return true;
  },

  async yeni(containerId) {
    try {
      const j = await API.sor("captcha-yeni");
      if (!j.ok) throw new Error(j.hata || "Güvenlik doğrulaması başlatılamadı.");
      this._challenge = { token: j.token, soru: j.soru, bitis: Number(j.bitis) };
      const input = document.querySelector(`#${containerId} input[data-captcha-yanit]`);
      if (input) input.value = "";
      this._gecisGecerli = false;
      this._gecisBitis = 0;
      this.ciz(containerId);
      return true;
    } catch (e) {
      const el = document.getElementById(containerId);
      if (el) el.innerHTML = `<div class="ook-captcha-hata">Güvenlik doğrulaması yüklenemedi.</div>`;
      return false;
    }
  },

  ciz(containerId) {
    const el = document.getElementById(containerId);
    if (!el || !this._challenge) return;
    const kalan = Math.max(0, Math.ceil((this._challenge.bitis - Date.now()) / 1000));
    el.innerHTML = `
      <div class="ook-captcha">
        <div class="ook-captcha-bas">
          <div><div class="ook-captcha-baslik">Güvenlik kontrolü</div><div class="ook-captcha-soru">${ookEscapeHTML(this._challenge.soru)}</div></div>
          <button type="button" class="ook-captcha-yenile" onclick="Guvenlik.yeni('${containerId}')" title="Yeni soru">↻</button>
        </div>
        <div class="ook-captcha-alt">
          <input data-captcha-yanit autocomplete="off" inputmode="numeric" maxlength="3" class="girdi" placeholder="Cevabınız" />
          <button type="button" class="btn btn-ikincil" onclick="Guvenlik.dogrula('${containerId}')">Kontrol et</button>
        </div>
        <div class="ook-captcha-sure">Token ${Math.floor(kalan/60)}:${String(kalan%60).padStart(2,'0')} içinde geçerli</div>
        <div class="ook-captcha-durum" data-captcha-durum></div>
      </div>`;
  },

  async dogrula(containerId) {
    if (!this._challenge || this._challenge.bitis <= Date.now()) {
      await this.yeni(containerId); return false;
    }
    const input = document.querySelector(`#${containerId} input[data-captcha-yanit]`);
    const durum = document.querySelector(`#${containerId} [data-captcha-durum]`);
    const cevap = input ? input.value.trim() : "";
    if (!cevap) { if (durum) durum.textContent = "Cevabınızı yazın."; return false; }
    try {
      const j = await API.sor("captcha-dogrula", { captcha_token: this._challenge.token, cevap });
      if (!j.ok) {
        if (durum) durum.textContent = j.hata || "Cevap doğru değil.";
        if (j.hata_kodu === "CAPTCHA_EXPIRED" || j.hata_kodu === "CAPTCHA_WRONG") await this.yeni(containerId);
        return false;
      }
      this._gecisGecerli = true;
      this._gecisBitis = Number(j.bitis || Date.now());
      if (durum) durum.textContent = "Doğrulandı ✓";
      if (input) input.disabled = true;
      const b = document.querySelector(`#${containerId} .ook-captcha-alt button`);
      if (b) { b.disabled = true; b.textContent = "Doğrulandı"; }
      return true;
    } catch (e) {
      if (durum) durum.textContent = e.message || "Doğrulama yapılamadı.";
      return false;
    }
  },

  gecisGecersiz() { this._gecisGecerli = false; this._gecisBitis = 0; },

  async tokenIste(containerId) {
    if (this._gecisGecerli && this._gecisBitis > Date.now()) return true;
    await this.hazirla(containerId);
    const ok = await this.dogrula(containerId);
    return ok;
  }
};
window.Guvenlik = Guvenlik;
window.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && Guvenlik._challenge && Guvenlik._challenge.bitis <= Date.now()) {
    ["girisCaptcha","kayitCaptcha"].forEach(id => { if (document.getElementById(id)) Guvenlik.yeni(id); });
  }
});
