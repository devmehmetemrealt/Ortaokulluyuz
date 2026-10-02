/* 1'e 1 WebRTC sesli görüşme.
   Ses sunucuya kaydedilmez; API yalnızca arama durumu ve WebRTC sinyalleşmesini taşır. */
const Sesli = {
  pc: null,
  stream: null,
  aramaId: null,
  karsiId: null,
  karsiAd: '',
  rol: '',
  calisiyor: false,
  poll: null,
  sonSinyal: 0,
  kilit: false,
  zamanlayici: null,
  uzakAdayKuyrugu: [],
  uzakSdpHazir: false,
  bagliBildirildi: false,
  sonHata: '',
  _iceSunuculari: null,

  async ara(karsiId, karsiAd) {
    if (this.calisiyor) return toast('Zaten bir sesli görüşme devam ediyor.');
    if (!Auth.mevcut()) return authModal('giris');
    if (!window.isSecureContext || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return toast('Sesli arama için siteyi HTTPS üzerinden açın ve mikrofon izni verin.');
    }
    if (!window.RTCPeerConnection) return toast('Tarayıcınız WebRTC sesli görüşmeyi desteklemiyor.');

    try {
      this.sifirlaDurum();
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });

      const j = await API.sor('sesli-arama-baslat', { karsi_id: karsiId });
      if (!j.ok) throw new Error(j.hata || 'Arama başlatılamadı.');

      this.aramaId = j.arama_id;
      this.karsiId = karsiId;
      this.karsiAd = karsiAd || j.karsi_ad || 'Kullanıcı';
      this.rol = 'arayan';
      this.calisiyor = true;
      this.arayuz('giden', this.karsiAd);

      await this.pcHazirla(true);
      const offer = await this.pc.createOffer({ offerToReceiveAudio: true });
      await this.pc.setLocalDescription(offer);
      await this.localSdpHazirliginiBekle();
      await API.sor('sesli-arama-teklif', { arama_id: this.aramaId, teklif: this.pc.localDescription });

      this.pollBaslat();
      clearTimeout(this.zamanlayici);
      this.zamanlayici = setTimeout(() => {
        if (this.calisiyor && this.rol === 'arayan' && this.aramaId) {
          this.kapat(false, 'Karşı taraf cevap vermedi.');
        }
      }, 60000);
      toast(this.karsiAd + ' aranıyor…');
    } catch (e) {
      const mesaj = e && e.name === 'NotAllowedError'
        ? 'Mikrofon izni verilmedi. Tarayıcı adres çubuğundan mikrofon iznini açın.'
        : (e && e.message ? e.message : 'Sesli görüşme başlatılamadı.');
      await this.kapat(true);
      toast(mesaj);
    }
  },

  async araFromButton(el) {
    if (!el) return;
    await this.ara(el.dataset.sesliId, el.dataset.sesliAd || 'Kullanıcı');
  },

  async kabulEtId(id) {
    if (this.calisiyor) return;
    try {
      const j = await API.sor('sesli-arama-durum', { arama_id: id, sonra: 0 });
      if (!j.ok || !j.arama || !j.arama.teklif || j.arama.durum !== 'caliyor') {
        return toast('Arama artık mevcut değil.');
      }
      await this.kabulEt(j.arama);
    } catch (e) {
      toast(e.message || 'Arama bilgisi alınamadı.');
    }
  },

  async gelenleriKontrolEt() {
    if (!Auth.mevcut() || this.calisiyor || document.hidden) return;
    try {
      const j = await API.sor('sesli-gelen-arama');
      if (j.ok && j.arama && j.arama.teklif) this.gelenAramaGoster(j.arama);
    } catch (e) {}
  },

  async kabulEt(arama) {
    if (this.calisiyor) return;
    try {
      this.sifirlaDurum();
      this.aramaId = arama.id;
      this.karsiId = arama.arayan_id;
      this.karsiAd = arama.arayan_ad || 'Kullanıcı';
      this.rol = 'aranan';
      this.calisiyor = true;
      this.arayuz('gelen', this.karsiAd);

      if (!window.isSecureContext || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Sesli arama için siteyi HTTPS üzerinden açın ve mikrofon izni verin.');
      }
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      await this.pcHazirla(false);
      await this.pc.setRemoteDescription(new RTCSessionDescription(arama.teklif));
      this.uzakSdpHazir = true;
      await this.kuyruktakiAdaylariEkle();

      const answer = await this.pc.createAnswer();
      await this.pc.setLocalDescription(answer);
      await this.localSdpHazirliginiBekle();
      await API.sor('sesli-arama-yanit', { arama_id: this.aramaId, yanit: this.pc.localDescription });
      await API.sor('sesli-arama-durum-guncelle', { arama_id: this.aramaId, durum: 'baglaniyor' });
      this.pollBaslat();
    } catch (e) {
      const mesaj = e && e.name === 'NotAllowedError'
        ? 'Mikrofon izni verilmedi. Tarayıcı adres çubuğundan mikrofon iznini açın.'
        : (e && e.message ? e.message : 'Sesli görüşme başlatılamadı.');
      await this.kapat(true);
      toast(mesaj);
    }
  },

  reddet(aramaId) {
    API.sor('sesli-arama-kapat', { arama_id: aramaId }).catch(() => {});
    this.panelKapat();
  },

  async iceSunuculari() {
    if (this._iceSunuculari) return this._iceSunuculari;
    const varsayilan = [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun.cloudflare.com:3478' }
    ];
    try {
      const j = await API.sor('sesli-yapilandirma');
      if (j && j.ok && Array.isArray(j.ice_servers) && j.ice_servers.length) {
        this._iceSunuculari = j.ice_servers;
        return this._iceSunuculari;
      }
    } catch (e) {
      this.sonHata = e && e.message ? e.message : 'Sesli görüşme sunucu ayarları alınamadı.';
    }
    this._iceSunuculari = varsayilan;
    return this._iceSunuculari;
  },

  async pcHazirla(isCaller) {
    const iceServers = await this.iceSunuculari();
    this.pc = new RTCPeerConnection({ iceServers, bundlePolicy: 'balanced' });
    this.uzakSdpHazir = false;
    this.bagliBildirildi = false;

    this.stream.getTracks().forEach(t => this.pc.addTrack(t, this.stream));

    this.pc.ontrack = async e => {
      let audio = document.getElementById('sesliUzakSes');
      if (!audio) {
        audio = document.createElement('audio');
        audio.id = 'sesliUzakSes';
        audio.autoplay = true;
        audio.playsInline = true;
        audio.controls = false;
        document.body.appendChild(audio);
      }
      audio.srcObject = e.streams && e.streams[0] ? e.streams[0] : new MediaStream([e.track]);
      try {
        await audio.play();
      } catch (err) {
        this.durumGuncelle('Bağlantı kuruldu — sesi açmak için sayfaya dokunun.');
      }
    };

    this.pc.onicecandidate = async e => {
      if (!e.candidate || !this.aramaId) return;
      try {
        const j = await API.sor('sesli-arama-sinyal', { arama_id: this.aramaId, sinyal: e.candidate });
        if (j && j.ok === false) this.sonHata = j.hata || 'ICE sinyali gönderilemedi.';
      } catch (x) {
        this.sonHata = x.message || 'ICE sinyali gönderilemedi.';
      }
    };

    this.pc.onconnectionstatechange = () => {
      const st = this.pc && this.pc.connectionState;
      const durum = document.getElementById('sesliDurum');
      if (durum) {
        durum.textContent = st === 'connected' ? 'Bağlantı kuruldu' :
          st === 'connecting' ? 'Bağlanıyor…' :
          st === 'disconnected' ? 'Bağlantı koptu' :
          st === 'failed' ? 'Bağlantı kurulamadı' :
          st === 'closed' ? 'Görüşme kapandı' : 'Arama sürüyor…';
      }
      if (st === 'connected' && !this.bagliBildirildi && this.aramaId) {
        this.bagliBildirildi = true;
        API.sor('sesli-arama-durum-guncelle', { arama_id: this.aramaId, durum: 'bagli' }).catch(() => {});
      }
      if (st === 'failed') this.kapat(true, 'Sesli bağlantı kurulamadı.');
      if (st === 'closed') this.kapat(true);
    };

    this.pc.oniceconnectionstatechange = () => {
      const st = this.pc && this.pc.iceConnectionState;
      if (st === 'failed') this.durumGuncelle('Ağ bağlantısı kurulamadı.');
      if (st === 'checking') this.durumGuncelle('Ağ bağlantısı kontrol ediliyor…');
    };
    this.pc.onicecandidateerror = () => {
      this.sonHata = 'ICE sunucusuna ulaşılamadı.';
    };

    if (!isCaller) return;
  },

  async localSdpHazirliginiBekle() {
    if (!this.pc || this.pc.iceGatheringState === 'complete') return;
    await new Promise(resolve => {
      const bitir = () => {
        clearTimeout(zaman);
        if (this.pc) this.pc.removeEventListener('icegatheringstatechange', kontrol);
        resolve();
      };
      const kontrol = () => {
        if (this.pc && this.pc.iceGatheringState === 'complete') bitir();
      };
      const zaman = setTimeout(bitir, 8000);
      this.pc.addEventListener('icegatheringstatechange', kontrol);
    });
  },

  pollBaslat() {
    clearInterval(this.poll);
    this.sonSinyal = 0;
    this.poll = setInterval(() => this.pollEt(), 800);
    this.pollEt();
  },

  async pollEt() {
    if (!this.aramaId || !this.calisiyor) return;
    try {
      const j = await API.sor('sesli-arama-durum', { arama_id: this.aramaId, sonra: this.sonSinyal });
      if (!j.ok) return;

      // KRİTİK: Caller tarafında önce answer SDP uzak açıklama olarak kurulmalı.
      // Karşı tarafın ICE adayları answer'dan önce gelirse kuyrukta tutulur.
      if (this.rol === 'arayan' && j.arama && j.arama.yanit && this.pc && !this.pc.currentRemoteDescription) {
        await this.pc.setRemoteDescription(new RTCSessionDescription(j.arama.yanit));
        this.uzakSdpHazir = true;
        await this.kuyruktakiAdaylariEkle();
        this.durumGuncelle('Bağlanıyor…');
      }

      if (j.sinyaller && j.sinyaller.length) {
        for (const s of j.sinyaller) {
          this.sonSinyal = Math.max(this.sonSinyal, Number(s.id || 0));
          if (!s.sinyal || !this.pc || this.pc.signalingState === 'closed') continue;
          if (!this.uzakSdpHazir || !this.pc.remoteDescription) {
            this.uzakAdayKuyrugu.push(s.sinyal);
            continue;
          }
          try { await this.pc.addIceCandidate(new RTCIceCandidate(s.sinyal)); } catch (e) {
            this.uzakAdayKuyrugu.push(s.sinyal);
          }
        }
        await this.kuyruktakiAdaylariEkle();
      }

      if (j.arama && j.arama.durum === 'kapali') {
        this.kapat(true, 'Karşı taraf görüşmeyi sonlandırdı.');
      }
    } catch (e) {
      this.sonHata = e.message || 'Sinyalleşme hatası.';
    }
  },

  async kuyruktakiAdaylariEkle() {
    if (!this.pc || !this.uzakSdpHazir || !this.pc.remoteDescription || !this.uzakAdayKuyrugu.length) return;
    const kuyruk = this.uzakAdayKuyrugu.splice(0);
    for (const s of kuyruk) {
      try { await this.pc.addIceCandidate(new RTCIceCandidate(s)); }
      catch (e) { /* Aynı adayın sonraki denemesi bağlantıyı bozmasın. */ }
    }
  },

  sifirlaDurum() {
    this.sonSinyal = 0;
    this.uzakAdayKuyrugu = [];
    this.uzakSdpHazir = false;
    this.bagliBildirildi = false;
    this.sonHata = '';
  },

  async kapat(sessiz, bildirim) {
    const id = this.aramaId;
    clearInterval(this.poll); this.poll = null;
    clearTimeout(this.zamanlayici); this.zamanlayici = null;

    if (id && !this.kilit) {
      this.kilit = true;
      API.sor('sesli-arama-kapat', { arama_id: id }).catch(() => {});
    }
    if (this.stream) this.stream.getTracks().forEach(t => t.stop());
    if (this.pc) try { this.pc.close(); } catch (e) {}

    const a = document.getElementById('sesliUzakSes');
    if (a) { try { a.pause(); } catch (e) {} a.srcObject = null; a.remove(); }

    this.pc = null;
    this.stream = null;
    this.aramaId = null;
    this.karsiId = null;
    this.calisiyor = false;
    this.kilit = false;
    this.sifirlaDurum();
    this.panelKapat();
    if (!sessiz && bildirim) toast(bildirim);
    else if (!sessiz) toast('Sesli görüşme sonlandırıldı.');
  },

  arayuz(tip, ad) {
    const p = document.getElementById('sesliAramaPanel');
    if (!p) return;
    p.innerHTML = `<div class="sesli-kutu">
      <div class="sesli-ust"><span class="sesli-durum-nokta"></span><div><b>${kac(ad)}</b><div id="sesliDurum">${tip === 'gelen' ? 'Gelen sesli arama' : 'Aranıyor…'}</div></div>
      <button class="sesli-kapat" onclick="Sesli.kapat(false)">Kapat</button></div>
      <div class="sesli-icerik"><div class="sesli-mikrofon">🎙️</div><p>Sesli görüşme</p><small>Mikrofonunuz kullanılacak. Görüşme kaydedilmez.</small></div>
    </div>`;
    p.classList.remove('hidden');
  },

  gelenAramaGoster(a) {
    const p = document.getElementById('sesliAramaPanel');
    if (!p || p.dataset.incoming === String(a.id)) return;
    p.dataset.incoming = String(a.id);
    p.innerHTML = `<div class="sesli-kutu">
      <div class="sesli-ust"><span class="sesli-durum-nokta"></span><div><b>${kac(a.arayan_ad || 'Kullanıcı')}</b><div>Sesli arama geliyor</div></div></div>
      <div class="sesli-aksiyonlar"><button class="btn btn-birincil" onclick="Sesli.kabulEtId('${kac(a.id)}')">Kabul Et</button><button class="btn btn-ikincil" onclick="Sesli.reddet('${a.id}')">Reddet</button></div>
    </div>`;
    p.classList.remove('hidden');
  },

  durumGuncelle(s) {
    const el = document.getElementById('sesliDurum');
    if (el) el.textContent = s;
  },

  panelKapat() {
    const p = document.getElementById('sesliAramaPanel');
    if (p) { p.classList.add('hidden'); p.innerHTML = ''; delete p.dataset.incoming; }
  }
};

setInterval(() => {
  if (typeof Auth !== 'undefined' && Auth.sunucuModu && Auth.sunucuModu()) Sesli.gelenleriKontrolEt();
}, 2500);
