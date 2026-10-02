/* Ortaokulluyuz — özel CAPTCHA + HttpOnly güvenlik geçişi + küçük proof-of-work. */
function ookEscapeHTML(v) {
  return String(v).replace(/[&<>"\']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","\'":"&#039;"}[c]));
}
const Guvenlik = {
  _challenge: null, _gecisGecerli: false, _gecisBitis: 0, _powPromise: null,
  async hazirla(containerId) {
    const el = document.getElementById(containerId); if (!el) return false;
    if (!this._challenge || this._challenge.bitis <= Date.now()) await this.yeni(containerId);
    if (!this._challenge) return false;
    this.ciz(containerId);
    if (this._challenge.pow && !this._challenge.powNonce) {
      this._powPromise ||= this._powUret(this._challenge.powSalt, this._challenge.powDifficulty).then(pow => {
        if (this._challenge && this._challenge.powSalt === pow.salt) this._challenge.powNonce = pow.nonce;
        this.ciz(containerId); return pow;
      });
      try { await this._powPromise; } catch (e) { this._challenge=null; this._powPromise=null; return false; }
    }
    return true;
  },
  async yeni(containerId) {
    try {
      const j = await API.sor("captcha-yeni");
      if (!j.ok) throw new Error(j.hata || "Güvenlik doğrulaması başlatılamadı.");
      this._challenge = {token:j.token, soru:j.soru, bitis:Number(j.bitis), powSalt:String(j.pow_salt||""), powDifficulty:Number(j.pow_difficulty||3), powNonce:"", pow:true};
      this._gecisGecerli=false; this._gecisBitis=0; this._powPromise=null; this.ciz(containerId);
      this._powPromise=this._powUret(this._challenge.powSalt,this._challenge.powDifficulty).then(pow=>{ if(this._challenge&&this._challenge.powSalt===pow.salt)this._challenge.powNonce=pow.nonce; this.ciz(containerId); return pow; });
      try { await this._powPromise; } catch (e) { this._challenge=null; this._powPromise=null; throw e; }
      return true;
    } catch(e) {
      const el=document.getElementById(containerId); if(el) el.innerHTML='<div class="ook-captcha-hata">Güvenlik doğrulaması yüklenemedi. Sayfayı yenileyin.</div>'; return false;
    }
  },
  async _powUret(salt,difficulty) {
    const d=Math.max(2,Math.min(5,Number(difficulty)||3)), hedef="0".repeat(d);
    if(!salt || !globalThis.crypto?.subtle) return {salt,nonce:""};
    for(let i=0;i<1000000;i++){
      const nonce=i.toString(36); const bytes=new TextEncoder().encode(`${salt}|${nonce}`);
      const digest=await crypto.subtle.digest('SHA-256',bytes);
      const hex=Array.from(new Uint8Array(digest),x=>x.toString(16).padStart(2,'0')).join('');
      if(hex.startsWith(hedef)) return {salt,nonce};
      if(i%64===0) await new Promise(r=>setTimeout(r,0));
    }
    throw new Error('Güvenlik doğrulaması hazırlanamadı.');
  },
  ciz(containerId) {
    const el=document.getElementById(containerId); if(!el||!this._challenge)return;
    const kalan=Math.max(0,Math.ceil((this._challenge.bitis-Date.now())/1000)), hazir=!!this._challenge.powNonce;
    el.innerHTML=`<div class="ook-captcha">
      <div class="ook-captcha-bas"><div><div class="ook-captcha-baslik">Güvenlik kontrolü</div><div class="ook-captcha-soru">${ookEscapeHTML(this._challenge.soru)}</div></div>
      <button type="button" class="ook-captcha-yenile" onclick="Guvenlik.yeni('${containerId}')" title="Yeni soru">↻</button></div>
      <div class="ook-captcha-alt"><input data-captcha-yanit autocomplete="off" inputmode="numeric" maxlength="3" class="girdi" placeholder="Cevabınız" />
      <button type="button" class="btn btn-ikincil" ${hazir?'':'disabled'} onclick="Guvenlik.dogrula('${containerId}')">${hazir?'Kontrol et':'Hazırlanıyor…'}</button></div>
      <div class="ook-captcha-sure">Kontrol ${Math.floor(kalan/60)}:${String(kalan%60).padStart(2,'0')} içinde geçerli</div>
      <div class="ook-captcha-durum" data-captcha-durum>${hazir?'':'İstemci doğrulaması hazırlanıyor…'}</div></div>`;
  },
  async dogrula(containerId) {
    if(!this._challenge||this._challenge.bitis<=Date.now()){await this.yeni(containerId);return false;}
    if(this._powPromise){try{await this._powPromise;}catch(e){return false;}}
    const input=document.querySelector(`#${containerId} input[data-captcha-yanit]`), durum=document.querySelector(`#${containerId} [data-captcha-durum]`), cevap=input?input.value.trim():'';
    if(!cevap){if(durum)durum.textContent='Cevabınızı yazın.';return false;}
    if(!this._challenge.powNonce){if(durum)durum.textContent='Güvenlik kontrolü hazırlanıyor…';return false;}
    try{
      const j=await API.sor('captcha-dogrula',{captcha_token:this._challenge.token,cevap,pow:this._challenge.powNonce});
      if(!j.ok){if(durum)durum.textContent=j.hata||'Doğrulama başarısız.';if(['CAPTCHA_EXPIRED','CAPTCHA_WRONG','CAPTCHA_POW'].includes(j.hata_kodu))await this.yeni(containerId);return false;}
      this._gecisGecerli=true;this._gecisBitis=Number(j.bitis||Date.now());
      if(durum)durum.textContent='Doğrulandı ✓';if(input)input.disabled=true;
      const b=document.querySelector(`#${containerId} .ook-captcha-alt button`);if(b){b.disabled=true;b.textContent='Doğrulandı';}return true;
    }catch(e){if(durum)durum.textContent=e.message||'Doğrulama yapılamadı.';return false;}
  },
  gecisGecersiz(){this._gecisGecerli=false;this._gecisBitis=0;},
  async tokenIste(containerId){if(this._gecisGecerli&&this._gecisBitis>Date.now())return true;await this.hazirla(containerId);return this.dogrula(containerId);}
};
window.Guvenlik=Guvenlik;
window.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&Guvenlik._challenge&&Guvenlik._challenge.bitis<=Date.now()){['girisCaptcha','kayitCaptcha'].forEach(id=>{if(document.getElementById(id))Guvenlik.yeni(id);});}});
