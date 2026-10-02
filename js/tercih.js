/* Kişiselleştirme — sınıf/ders/kitap davranışlarını yerel + sunucu profiline dönüştürür. */
const Tercih = {
  key: 'ook_tercih_v2',
  veri: { sinif: {}, ders: {}, kitap: {} },
  uzak: [],
  async baslat() {
    try {
      const raw = JSON.parse(localStorage.getItem(this.key) || '{}');
      this.veri = {
        sinif: raw.sinif || {},
        ders: raw.ders || {},
        kitap: raw.kitap || {}
      };
    } catch (e) {}
    if (Auth.sunucuModu() && Auth.mevcut()) {
      try {
        const j = await API.sor('tercih-ozet');
        if (j.ok) this.uzak = j.kayitlar || [];
      } catch (e) { this.uzak = []; }
    } else {
      this.uzak = [];
    }
  },
  _kaydet() {
    try { localStorage.setItem(this.key, JSON.stringify(this.veri)); } catch (e) {}
  },
  _yerel(sinif, ders, kitapId, olay, agirlik) {
    const s = String(sinif || '');
    const d = String(ders || '');
    if (s) this.veri.sinif[s] = Number(this.veri.sinif[s] || 0) + agirlik;
    if (s && d) {
      const dk = s + '|' + d;
      this.veri.ders[dk] = Number(this.veri.ders[dk] || 0) + agirlik;
    }
    if (kitapId) {
      const b = this.veri.kitap[kitapId] || { goruntuleme: 0, acma: 0, favori: 0, indirme: 0 };
      if (olay && Object.prototype.hasOwnProperty.call(b, olay)) b[olay] = Number(b[olay] || 0) + 1;
      this.veri.kitap[kitapId] = b;
    }
    this._kaydet();
  },
  etkiKitap(kitap, olay) {
    if (!kitap) return;
    const agirlik = olay === 'favori' ? 1.5 : olay === 'acma' ? 1.2 : 1;
    this._yerel(kitap.sinif, kitap.ders, kitap.id, olay, agirlik);
    if (Auth.sunucuModu() && Auth.mevcut()) {
      API.sor('tercih-etki', { sinif: kitap.sinif, ders: kitap.ders, kitap_id: kitap.id, olay }).catch(() => {});
    }
  },
  sinifGor(sinif) {
    if (![5, 6, 7, 8].includes(Number(sinif))) return;
    this._yerel(Number(sinif), '', '', 'goruntuleme', 1);
    if (Auth.sunucuModu() && Auth.mevcut()) API.sor('tercih-etki', { sinif: Number(sinif), ders: '', kitap_id: '', olay: 'goruntuleme' }).catch(() => {});
  },
  dersGor(sinif, ders) {
    if (!sinif || !ders) return;
    this._yerel(Number(sinif), ders, '', 'goruntuleme', 0.75);
    if (Auth.sunucuModu() && Auth.mevcut()) API.sor('tercih-etki', { sinif: Number(sinif), ders, kitap_id: '', olay: 'goruntuleme' }).catch(() => {});
  },
  _uzakSatirlar() {
    const s = {}, d = {}, b = {};
    for (const r of this.uzak) {
      const sinif = String(r.sinif || '');
      if (sinif) s[sinif] = Number(s[sinif] || 0) + Number(r.puan || 0);
      if (sinif && r.ders) d[sinif + '|' + r.ders] = Number(d[sinif + '|' + r.ders] || 0) + Number(r.puan || 0);
      if (r.kitap_id) b[r.kitap_id] = {
        goruntuleme: Number(r.goruntuleme || 0), acma: Number(r.acma || 0), favori: Number(r.favori || 0), indirme: Number(r.indirme || 0)
      };
    }
    return { sinif: s, ders: d, kitap: b };
  },
  ozet() {
    const u = this._uzakSatirlar();
    const sinif = {};
    const ders = {};
    const kitap = {};
    for (const k of new Set([...Object.keys(this.veri.sinif), ...Object.keys(u.sinif)])) sinif[k] = Number(this.veri.sinif[k] || 0) + Number(u.sinif[k] || 0);
    for (const k of new Set([...Object.keys(this.veri.ders), ...Object.keys(u.ders)])) ders[k] = Number(this.veri.ders[k] || 0) + Number(u.ders[k] || 0);
    for (const k of new Set([...Object.keys(this.veri.kitap), ...Object.keys(u.kitap)])) {
      const a = this.veri.kitap[k] || {}, b = u.kitap[k] || {};
      kitap[k] = { goruntuleme: Number(a.goruntuleme || 0) + Number(b.goruntuleme || 0), acma: Number(a.acma || 0) + Number(b.acma || 0), favori: Number(a.favori || 0) + Number(b.favori || 0), indirme: Number(a.indirme || 0) + Number(b.indirme || 0) };
    }
    return { sinif, ders, kitap };
  },
  tercihSinif() {
    const s = this.ozet().sinif;
    let en = '', skor = -1;
    Object.keys(s).forEach(k => { if (Number(s[k]) > skor) { skor = Number(s[k]); en = Number(k); } });
    return en ? Number(en) : null;
  },
  kitaplar() {
    const o = this.ozet();
    const pref = this.tercihSinif();
    const favs = new Set(Auth.favoriler ? Auth.favoriler() : []);
    const kitaplar = KITAPLAR.filter(k => !k.yakinda);
    const skor = k => {
      const cls = Number(o.sinif[String(k.sinif)] || 0);
      const ds = Number(o.ders[String(k.sinif) + '|' + k.ders] || 0);
      const b = o.kitap[k.id] || {};
      return (pref && Number(k.sinif) === pref ? 20 : 0) + cls * 10 + ds * 5 + Number(b.goruntuleme || 0) + Number(b.acma || 0) * 3 + Number(b.favori || 0) * 6 + Number(b.indirme || 0) * 2;
    };
    return kitaplar.map(k => ({ k, s: skor(k), fav: favs.has(k.id) }))
      .sort((a, b) => b.s - a.s || Number(a.k.sinif) - Number(b.k.sinif) || a.k.baslik.localeCompare(b.k.baslik, 'tr'))
      .map(x => x.k);
  },
  etiket() {
    const sinif = this.tercihSinif();
    if (!sinif) return 'Başlangıç için seçtiklerimiz';
    const o = this.ozet();
    const dersler = Object.entries(o.ders).filter(([key]) => key.startsWith(String(sinif) + '|')).sort((a,b)=>b[1]-a[1]);
    if (!dersler.length) return sinif + '. sınıfa göre';
    const id = dersler[0][0].split('|')[1];
    return sinif + '. sınıf • ' + dersAdi(id, sinif);
  }
};
