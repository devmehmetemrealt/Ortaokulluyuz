/* 1'e 1 WebRTC sesli görüşme — ses kaydı tutulmaz; sadece bağlantı sinyalleşmesi API üzerinden iletilir. */
const Sesli = {
  pc: null, stream: null, aramaId: null, karsiId: null, karsiAd: '', rol: '', calisiyor: false,
  poll: null, sonSinyal: 0, kilit: false, zamanlayici: null,
  async ara(karsiId, karsiAd) {
    if (this.calisiyor) return toast('Zaten bir sesli görüşme devam ediyor.');
    if (!Auth.mevcut()) return authModal('giris');
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return toast('Tarayıcınız sesli görüşmeyi desteklemiyor. Siteyi HTTPS üzerinden açın.');
    try {
      const izin = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      this.stream = izin;
      const j = await API.sor('sesli-arama-baslat', { karsi_id: karsiId });
      if (!j.ok) throw new Error(j.hata || 'Arama başlatılamadı.');
      this.aramaId = j.arama_id; this.karsiId = karsiId; this.karsiAd = karsiAd || 'Kullanıcı'; this.rol = 'arayan'; this.calisiyor = true;
      this.arayuz('giden', this.karsiAd);
      await this.pcHazirla(true);
      const offer = await this.pc.createOffer();
      await this.pc.setLocalDescription(offer);
      await API.sor('sesli-arama-teklif', { arama_id: this.aramaId, teklif: offer });
      this.pollBaslat();
      clearTimeout(this.zamanlayici); this.zamanlayici = setTimeout(() => { if (this.calisiyor && this.rol === 'arayan' && this.aramaId) this.kapat(false); }, 60000);
      toast(this.karsiAd + ' aranıyor…');
    } catch (e) { this.temizle(); toast(e.message || 'Mikrofona erişilemedi.'); }
  },
  async araFromButton(el) {
    if (!el) return;
    await this.ara(el.dataset.sesliId, el.dataset.sesliAd || 'Kullanıcı');
  },
  async kabulEtId(id) {
    try {
      const j = await API.sor('sesli-arama-durum', { arama_id: id, sonra: 0 });
      if (!j.ok || !j.arama || !j.arama.teklif) return toast('Arama artık mevcut değil.');
      await this.kabulEt(j.arama);
    } catch (e) { toast(e.message || 'Arama bilgisi alınamadı.'); }
  },
  async gelenleriKontrolEt() {
    if (!Auth.mevcut() || this.calisiyor) return;
    try {
      const j = await API.sor('sesli-gelen-arama');
      if (j.ok && j.arama && j.arama.teklif) this.gelenAramaGoster(j.arama);
    } catch (e) {}
  },
  async kabulEt(arama) {
    if (this.calisiyor) return;
    try {
      this.aramaId = arama.id; this.karsiId = arama.arayan_id; this.karsiAd = arama.arayan_ad || 'Kullanıcı'; this.rol = 'aranan'; this.calisiyor = true;
      this.arayuz('gelen', this.karsiAd);
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) throw new Error('Tarayıcınız sesli görüşmeyi desteklemiyor.');
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      await this.pcHazirla(false);
      await this.pc.setRemoteDescription(new RTCSessionDescription(arama.teklif));
      const answer = await this.pc.createAnswer();
      await this.pc.setLocalDescription(answer);
      await API.sor('sesli-arama-yanit', { arama_id: this.aramaId, yanit: answer });
      await API.sor('sesli-arama-durum-guncelle', { arama_id: this.aramaId, durum: 'baglaniyor' });
      this.pollBaslat();
    } catch (e) { await this.kapat(true); toast(e.message || 'Sesli görüşme başlatılamadı.'); }
  },
  reddet(aramaId) { API.sor('sesli-arama-kapat', { arama_id: aramaId }).catch(()=>{}); this.panelKapat(); },
  async pcHazirla(isCaller) {
    this.pc = new RTCPeerConnection({ iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun.cloudflare.com:3478' }
    ]});
    this.stream.getTracks().forEach(t => this.pc.addTrack(t, this.stream));
    this.pc.ontrack = e => {
      let audio = document.getElementById('sesliUzakSes');
      if (!audio) { audio = document.createElement('audio'); audio.id = 'sesliUzakSes'; audio.autoplay = true; document.body.appendChild(audio); }
      audio.srcObject = e.streams[0];
    };
    this.pc.onicecandidate = async e => {
      if (!e.candidate || !this.aramaId) return;
      try { await API.sor('sesli-arama-sinyal', { arama_id: this.aramaId, sinyal: e.candidate }); } catch (x) {}
    };
    this.pc.onconnectionstatechange = () => {
      const st = this.pc && this.pc.connectionState;
      const durum = document.getElementById('sesliDurum');
      if (durum) durum.textContent = st === 'connected' ? 'Bağlantı kuruldu' : st === 'connecting' ? 'Bağlanıyor…' : st === 'disconnected' ? 'Bağlantı koptu' : st === 'failed' ? 'Bağlantı kurulamadı' : 'Arama sürüyor…';
      if (st === 'failed' || st === 'closed') this.kapat(true);
    };
    if (!isCaller) return;
  },
  pollBaslat() {
    clearInterval(this.poll); this.sonSinyal = 0;
    this.poll = setInterval(() => this.pollEt(), 900);
    this.pollEt();
  },
  async pollEt() {
    if (!this.aramaId || !this.calisiyor) return;
    try {
      const j = await API.sor('sesli-arama-durum', { arama_id: this.aramaId, sonra: this.sonSinyal });
      if (!j.ok) return;
      if (j.sinyaller && j.sinyaller.length) {
        for (const s of j.sinyaller) {
          this.sonSinyal = Math.max(this.sonSinyal, Number(s.id || 0));
          if (s.sinyal && this.pc && this.pc.signalingState !== 'closed') {
            try { await this.pc.addIceCandidate(new RTCIceCandidate(s.sinyal)); } catch (e) {}
          }
        }
      }
      if (this.rol === 'arayan' && j.arama && j.arama.yanit && this.pc && !this.pc.currentRemoteDescription) {
        await this.pc.setRemoteDescription(new RTCSessionDescription(j.arama.yanit));
        this.durumGuncelle('Bağlanıyor…');
      }
      if (j.arama && j.arama.durum === 'kapali') this.kapat(true);
    } catch (e) {}
  },
  async kapat(sessiz) {
    const id = this.aramaId;
    clearInterval(this.poll); this.poll = null; clearTimeout(this.zamanlayici); this.zamanlayici = null;
    if (id && !this.kilit) { this.kilit = true; API.sor('sesli-arama-kapat', { arama_id: id }).catch(()=>{}); }
    if (this.stream) this.stream.getTracks().forEach(t => t.stop());
    if (this.pc) try { this.pc.close(); } catch (e) {}
    const a = document.getElementById('sesliUzakSes'); if (a) { try { a.pause(); } catch (e) {} a.remove(); }
    this.pc = null; this.stream = null; this.aramaId = null; this.karsiId = null; this.calisiyor = false; this.kilit = false;
    this.panelKapat();
    if (!sessiz) toast('Sesli görüşme sonlandırıldı.');
  },
  arayuz(tip, ad) {
    const p = document.getElementById('sesliAramaPanel'); if (!p) return;
    p.innerHTML = `<div class="sesli-kutu"><div class="sesli-ust"><span class="sesli-durum-nokta"></span><div><b>${kac(ad)}</b><div id="sesliDurum">${tip === 'gelen' ? 'Gelen sesli arama' : 'Aranıyor…'}</div></div><button class="sesli-kapat" onclick="Sesli.kapat(false)">Kapat</button></div><div class="sesli-icerik"><div class="sesli-mikrofon">🎙️</div><p>Sesli görüşme</p><small>Mikrofonunuz kullanılacak. Görüşme kaydedilmez.</small></div></div>`;
    p.classList.remove('hidden');
  },
  gelenAramaGoster(a) {
    const p = document.getElementById('sesliAramaPanel'); if (!p || p.dataset.incoming === String(a.id)) return;
    p.dataset.incoming = String(a.id);
    p.innerHTML = `<div class="sesli-kutu"><div class="sesli-ust"><span class="sesli-durum-nokta"></span><div><b>${kac(a.arayan_ad || 'Kullanıcı')}</b><div>Sesli arama geliyor</div></div></div><div class="sesli-aksiyonlar"><button class="btn btn-birincil" onclick="Sesli.kabulEtId('${kac(a.id)}')">Kabul Et</button><button class="btn btn-ikincil" onclick="Sesli.reddet('${a.id}')">Reddet</button></div></div>`;
    p.classList.remove('hidden');
  },
  durumGuncelle(s) { const el = document.getElementById('sesliDurum'); if (el) el.textContent = s; },
  panelKapat() { const p = document.getElementById('sesliAramaPanel'); if (p) { p.classList.add('hidden'); p.innerHTML = ''; delete p.dataset.incoming; } }
};

setInterval(() => { if (Auth && Auth.sunucuModu && Auth.sunucuModu()) Sesli.gelenleriKontrolEt(); }, 2500);
