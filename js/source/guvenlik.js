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

  banEkrani(bitis) {
    if (document.getElementById('ook-ip-ban-overlay')) return;
    const kalan = Math.max(0, Number(bitis || (Date.now() + 60 * 60 * 1000)) - Date.now());
    const dk = Math.max(1, Math.ceil(kalan / 60000));
    const o = document.createElement('div');
    o.id = 'ook-ip-ban-overlay';
    o.innerHTML = '<div class="ook-ip-ban-kutu"><div class="ook-ip-ban-ikon">⛔</div><div class="ook-ip-ban-baslik">Geçici erişim engeli</div><p>Bu bağlantı güvenlik sistemi tarafından geçici olarak engellendi.</p><small>Tahmini süre: ' + dk + ' dakika</small></div>';
    document.body.appendChild(o);
    document.documentElement.style.overflow = 'hidden';
  },

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

window.__OOK_ADMIN__ = window.__OOK_ADMIN__ === true;


/* Tarayıcı geliştirici araçları koruması.
   Yönetici hesabı ve ADMIN_IP_ALLOWLIST muaf tutulur.
   Not: Bir web sayfası DevTools'u %100 güvenilir biçimde tespit edemez;
   bu katman kötüye kullanım sinyallerini sunucuya bildirir. */
(function DevToolsGuard(){
  const state = {signals:new Set(),sent:false,debuggerHits:0,started:Date.now()};
  const masaustu = () => window.matchMedia?.('(pointer:fine)').matches && window.innerWidth >= 900;
  const adminMuaf = () => window.__OOK_ADMIN__ === true;
  const mark = (s) => {
    if (adminMuaf() || !masaustu() || state.sent) return;
    state.signals.add(s);
    if (state.signals.size >= 2) raporla();
  };
  const geometri = () => {
    if (adminMuaf() || !masaustu()) return;
    const dw = Math.max(0, (window.outerWidth || 0) - (window.innerWidth || 0));
    const dh = Math.max(0, (window.outerHeight || 0) - (window.innerHeight || 0));
    /* Dock edilmiş DevTools için güçlü geometri sinyali. */
    if (dw > 220 || dh > 170) mark('dock');
  };
  async function raporla(force=false){
    if (adminMuaf() || state.sent || (!force && state.signals.size < 2)) return;
    state.sent = true;
    try {
      const r = await API.sor('devtools-rapor',{kanit:{sinyaller:[...state.signals],masaustu:true,ts:Date.now()}});
      if (r && r.hata_kodu === 'IP_BANNED' && window.Guvenlik) Guvenlik.banEkrani(Date.now()+60*60*1000);
    } catch(e) {
      /* Güvenlik raporunun başarısız olması sayfayı kilitlemez. */
    }
  }

  /* Konsol paneli açıkken DevTools'un nesneyi incelemesinden yararlanan ek sinyal. */
  function consoleCanary(){
    if (adminMuaf() || !masaustu() || state.sent) return;
    try {
      const canary = {};
      Object.defineProperty(canary, 'id', {
        configurable: true,
        get(){ mark('console'); return 'ook'; }
      });
      console.debug('%c', 'font-size:0', canary);
    } catch(e) {}
  }

  /* F12 ve yaygın DevTools kısayolları: kısayolun kendisi tek başına güçlü kanıt olduğu için
     doğrudan raporlanır. Bu sırada varsayılan tarayıcı davranışı da engellenir. */
  window.addEventListener('keydown', (e) => {
    if (adminMuaf() || state.sent) return;
    const k = String(e.key || '').toUpperCase();
    const f12 = k === 'F12';
    const combo = e.ctrlKey && e.shiftKey && ['I','J','C','K'].includes(k);
    if (f12 || combo) {
      e.preventDefault();
      e.stopPropagation();
      state.signals.add('shortcut');
      raporla(true);
    }
  }, true);

  /* DevTools'u menüden açma / dock edilme durumu için ek sinyaller.
     debugger ölçümü, tarayıcı DevTools açıkken yürütmenin duraksamasını yakalamaya çalışır. */
  setInterval(() => {
    if (adminMuaf()) return;
    geometri();
    if (!masaustu() || state.sent) return;
    const t = performance.now();
    debugger;
    const d = performance.now() - t;
    if (d > 75) {
      state.debuggerHits++;
      if (state.debuggerHits >= 2) mark('debugger');
    } else {
      state.debuggerHits = Math.max(0, state.debuggerHits - 1);
    }
  }, 1400);

  setInterval(consoleCanary, 2200);
  window.addEventListener('resize',()=>setTimeout(geometri,150));
  window.addEventListener('beforeunload',()=>{ /* sadece sayaç/sinyal tutulur */ });
})();

