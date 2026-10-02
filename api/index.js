// Ortaokulluyuz — JSON API (Vercel Serverless + Postgres).
// Üretimde tüm istemci çağrıları /api/gateway üzerinden kısa işlem kodlarıyla gider.
// Kimlik: HttpOnly çerezde JWT. Güvenlik: origin kontrolü, DB rate-limit, CAPTCHA geçiş tokenı.
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

let _pool = null;
function pool() {
  if (!_pool) {
    if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL tanımlı değil.');
    _pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  }
  return _pool;
}

function guvenlikBasliklari(res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'microphone=(self), camera=(), geolocation=(), payment=()');
  res.setHeader('Content-Security-Policy', "default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'");
}
function gonder(res, kod, nesne) {
  guvenlikBasliklari(res);
  res.statusCode = kod;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(nesne));
}
const hata = (res, mesaj, kod, hataKodu) => {
  const v = { ok: false, hata: mesaj };
  if (hataKodu) v.hata_kodu = hataKodu;
  return gonder(res, kod || 400, v);
};

const ISLEM_KODLARI = {
  'captcha-yeni': 'a33',
  'captcha-dogrula': 'a34',
  'ping': 'a0',
  'oturum': 'a1',
  'kayit': 'a2',
  'dogrula': 'a3',
  'kod-tekrar': 'a4',
  'giris': 'a5',
  'telefon-kayit': 'a6',
  'google-giris': 'a7',
  'yapilandirma': 'a8',
  'cikis': 'a9',
  'sifre-degistir': 'aa',
  'uyeler': 'ab',
  'rol-ata': 'ac',
  'uye-sil': 'ad',
  'sifre-ver': 'ae',
  'uye-onayla': 'af',
  'test-eposta': 'a10',
  'istatistik': 'a11',
  'sorular': 'a12',
  'soru-ekle': 'a13',
  'soru-sil': 'a14',
  'yanit-ekle': 'a15',
  'yanit-sil': 'a16',
  'begeni': 'a17',
  'dogru-isaretle': 'a18',
  'favoriler': 'a19',
  'favori-ekle': 'a1a',
  'favori-cikar': 'a1b',
  'tercih-etki': 'a1c',
  'tercih-ozet': 'a1d',
  'sesli-yapilandirma': 'a1e',
  'sesli-arama-baslat': 'a1f',
  'sesli-gelen-arama': 'a20',
  'sesli-arama-teklif': 'a21',
  'sesli-arama-yanit': 'a22',
  'sesli-arama-durum-guncelle': 'a23',
  'sesli-arama-sinyal': 'a24',
  'sesli-arama-kapat': 'a25',
  'sesli-arama-durum': 'a26',
  'kisiler': 'a27',
  'sohbetler': 'a28',
  'mesajlar': 'a29',
  'mesaj-gonder': 'a2a',
  'mesaj-sil': 'a2b',
  'denetim-mesajlar': 'a2c',
  'sikayet-et': 'a2d',
  'sikayetler': 'a2e',
  'sikayet-kapat': 'a2f',
  'paylasimlar': 'a30',
  'paylasim-ekle': 'a31',
  'paylasim-sil': 'a32',
};
const KOD_ISLEMLERI = Object.fromEntries(Object.entries(ISLEM_KODLARI).map(([k, v]) => [v, k]));

function govdeOku(req) {
  return new Promise((resolve) => {
    if (req.body && typeof req.body === 'object') return resolve(req.body);
    if (typeof req.body === 'string' && req.body) {
      try { return resolve(JSON.parse(req.body)); } catch (e) { return resolve({}); }
    }
    let v = '';
    req.on('data', (p) => { v += p; });
    req.on('end', () => {
      try { resolve(v ? JSON.parse(v) : {}); } catch (e) { resolve({}); }
    });
  });
}
function girdi(govde, sorgu, ad, varsayilan) {
  if (govde && govde[ad] !== undefined && govde[ad] !== null) return govde[ad];
  if (sorgu && sorgu[ad] !== undefined) return sorgu[ad];
  return varsayilan === undefined ? '' : varsayilan;
}
function cerezOku(req) {
  const c = {};
  const h = req.headers && req.headers.cookie ? req.headers.cookie : '';
  h.split(';').forEach((p) => {
    const i = p.indexOf('=');
    if (i > 0) c[p.slice(0, i).trim()] = decodeURIComponent(p.slice(i + 1).trim());
  });
  return c;
}
function cerezYaz(res, req, deger, gun) {
  let c = 'ook_token=' + deger + '; HttpOnly; Path=/; Max-Age=' + (gun * 86400) + '; SameSite=Lax';
  const proto = req.headers && (req.headers['x-forwarded-proto'] || '');
  if (String(proto).split(',')[0].trim() === 'https') c += '; Secure';
  if (res.appendHeader) res.appendHeader('Set-Cookie', c); else res.setHeader('Set-Cookie', c);
}
function guvenlikCerezYaz(res, req, deger, saniye) {
  let c = 'ook_guard=' + encodeURIComponent(deger || '') + '; HttpOnly; Path=/; Max-Age=' + Number(saniye || 0) + '; SameSite=Lax';
  const proto = req.headers && (req.headers['x-forwarded-proto'] || '');
  if (String(proto).split(',')[0].trim() === 'https') c += '; Secure';
  res.appendHeader ? res.appendHeader('Set-Cookie', c) : res.setHeader('Set-Cookie', c);
}
function guvenlikCerezOku(req) {
  return cerezOku(req).ook_guard || '';
}
function guvenlikCerezSil(res, req) { guvenlikCerezYaz(res, req, '', 0); }

function jetonVer(res, req, kullanici) {
  const j = jwt.sign({ uid: kullanici.id }, process.env.JWT_SECRET || 'degistirin', { expiresIn: '30d' });
  cerezYaz(res, req, j, 30);
}
function jetonSil(res, req) { cerezYaz(res, req, '', 0); }

async function oturum(req) {
  const c = cerezOku(req);
  if (!c.ook_token) return null;
  try {
    const o = jwt.verify(c.ook_token, process.env.JWT_SECRET || 'degistirin');
    const r = await pool().query('SELECT id, ad, eposta, telefon, rol FROM uyeler WHERE id = $1', [o.uid]);
    return r.rows[0] || null;
  } catch (e) { return null; }
}
function rolAdiDB(r) {
  return r === 'ogretmen' ? 'Öğretmen' : (r === 'veli' ? 'Veli' : (r === 'admin' ? 'Yönetici' : 'Öğrenci'));
}

function guvenlikPepper() {
  return process.env.SECURITY_PEPPER || process.env.JWT_SECRET || 'ook-guvenlik-degistirilmeli';
}
function sha256(v) {
  return crypto.createHash('sha256').update(String(v)).digest('hex');
}
function ipOku(req) {
  const xff = req.headers && req.headers['x-forwarded-for'];
  if (xff) return String(xff).split(',')[0].trim();
  return String((req.socket && req.socket.remoteAddress) || '0.0.0.0');
}
function ipHash(req) {
  return sha256(ipOku(req) + '|' + guvenlikPepper());
}
function originGuvenliMi(req) {
  if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS') return true;
  const site = req.headers && req.headers['sec-fetch-site'];
  if (site === 'cross-site') return false;
  const origin = req.headers && req.headers.origin;
  if (!origin) return true;
  try {
    const allowed = process.env.ALLOWED_ORIGIN
      ? new URL(process.env.ALLOWED_ORIGIN).host
      : String((req.headers && req.headers.host) || '').split(',')[0].trim();
    return new URL(origin).host === allowed;
  } catch (e) { return false; }
}
async function rateLimit(client, req, islem, limit, dakika) {
  const anahtar = ipHash(req);
  const pencere = Math.floor(Date.now() / (dakika * 60 * 1000));
  const r = await client.query(
    `INSERT INTO guvenlik_hiz_sinir (anahtar_hash, islem, pencere, sayac)
     VALUES ($1,$2,$3,1)
     ON CONFLICT (anahtar_hash, islem, pencere)
     DO UPDATE SET sayac = guvenlik_hiz_sinir.sayac + 1
     RETURNING sayac`,
    [anahtar, islem, pencere]
  );
  if (Math.random() < 0.015) {
    client.query('DELETE FROM guvenlik_hiz_sinir WHERE pencere < $1', [pencere - 120]).catch(() => {});
  }
  return Number(r.rows[0].sayac) <= limit;
}
async function gatewayTekrarKontrol(client, req, rawGovde) {
  const t = Number(rawGovde && rawGovde.t || 0);
  const n = String(rawGovde && rawGovde.n || '');
  if (!t || !n || Math.abs(Date.now() - t) > 2 * 60 * 1000) return false;
  const imza = sha256(n + '|' + ipHash(req));
  const r = await client.query(
    `INSERT INTO guvenlik_nonce (nonce_hash, bitis) VALUES ($1, NOW() + INTERVAL '3 minutes')
     ON CONFLICT (nonce_hash) DO NOTHING RETURNING nonce_hash`,
    [imza]
  );
  if (Math.random() < 0.02) client.query('DELETE FROM guvenlik_nonce WHERE bitis < NOW()').catch(() => {});
  return r.rows.length === 1;
}
function captchaCevapHash(cevap) {
  return sha256(String(cevap || '').trim().toLocaleLowerCase('tr-TR') + '|' + guvenlikPepper());
}
function captchaTokenHash(token) { return sha256(String(token || '') + '|' + guvenlikPepper()); }
function guvenlikTokenUret() { return crypto.randomBytes(32).toString('base64url'); }
function captchaUret() {
  const tip = crypto.randomInt(0, 3);
  let soru = '', cevap = '';
  if (tip === 0) {
    const a = crypto.randomInt(3, 18), b = crypto.randomInt(2, 13);
    soru = `${a} + ${b} = ?`; cevap = String(a + b);
  } else if (tip === 1) {
    const a = crypto.randomInt(2, 10), b = crypto.randomInt(2, 9);
    soru = `${a} × ${b} = ?`; cevap = String(a * b);
  } else {
    const d = new Set();
    while (d.size < 3) d.add(crypto.randomInt(10, 90));
    const sayilar = [...d];
    soru = `En büyük sayı hangisi?  ${sayilar.join('   •   ')}`;
    cevap = String(Math.max(...sayilar));
  }
  const token = crypto.randomBytes(32).toString('base64url');
  return { token, soru, cevap };
}
async function guvenlikGecisKontrol(client, req, islem, govde) {
  const korunan = new Set(['kayit', 'giris', 'telefon-kayit', 'google-giris', 'kod-tekrar', 'sifre-degistir']);
  if (!korunan.has(islem)) return { ok: true };
  const token = String(guvenlikCerezOku(req) || '');
  if (!token) return { ok: false, mesaj: 'Güvenlik doğrulaması gerekli.', kod: 'CAPTCHA_REQUIRED' };
  const r = await client.query(
    `UPDATE captcha_gecis
       SET kullanim = kullanim + 1
     WHERE token_hash = $1
       AND ip_hash = $2
       AND bitis > NOW()
       AND kullanim < 25
     RETURNING token_hash`,
    [captchaTokenHash(token), ipHash(req)]
  );
  if (!r.rows.length) return { ok: false, mesaj: 'Güvenlik doğrulaması geçersiz veya süresi dolmuş.', kod: 'CAPTCHA_REQUIRED' };
  return { ok: true };
}

// Sesli görüşme tablolarını deployment sonrası da otomatik hazırlar.
// Böylece eski veritabanında /api/setup tekrar çalıştırılmamış olsa bile sesli arama
// ilk kullanımda "relation does not exist" nedeniyle 500 vermez.
let _sesliSchemaReady = null;
async function sesliSemasiHazirla() {
  if (_sesliSchemaReady) return _sesliSchemaReady;
  _sesliSchemaReady = (async () => {
    const p = pool();
    await p.query(`CREATE TABLE IF NOT EXISTS sesli_arama (
      id VARCHAR(64) PRIMARY KEY,
      arayan_id INT NOT NULL,
      aranan_id INT NOT NULL,
      durum VARCHAR(16) NOT NULL DEFAULT 'caliyor',
      teklif JSONB NULL,
      yanit JSONB NULL,
      olusturma TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      guncelleme TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`);
    await p.query(`CREATE INDEX IF NOT EXISTS idx_sesli_arama_aranan ON sesli_arama (aranan_id, durum, guncelleme DESC)`);
    await p.query(`CREATE INDEX IF NOT EXISTS idx_sesli_arama_arayan ON sesli_arama (arayan_id, durum, guncelleme DESC)`);
    await p.query(`CREATE TABLE IF NOT EXISTS sesli_sinyal (
      id BIGSERIAL PRIMARY KEY,
      arama_id VARCHAR(64) NOT NULL REFERENCES sesli_arama(id) ON DELETE CASCADE,
      gonderen_id INT NOT NULL,
      sinyal JSONB NOT NULL,
      olusturma TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`);
    await p.query(`CREATE INDEX IF NOT EXISTS idx_sesli_sinyal_arama ON sesli_sinyal (arama_id, id)`);
  })().catch((err) => {
    _sesliSchemaReady = null;
    throw err;
  });
  return _sesliSchemaReady;
}

// Güvenlik şeması: mevcut deployment'da /api/setup tekrar çalıştırılmamış olsa bile otomatik hazırlanır.
let _guvenlikSchemaReady = null;
async function guvenlikSemasiHazirla() {
  if (_guvenlikSchemaReady) return _guvenlikSchemaReady;
  _guvenlikSchemaReady = (async () => {
    const p = pool();
    await p.query(`CREATE TABLE IF NOT EXISTS captcha_zorluk (
      token_hash CHAR(64) PRIMARY KEY,
      soru VARCHAR(240) NOT NULL,
      cevap_hash CHAR(64) NOT NULL,
      ip_hash CHAR(64) NOT NULL,
      deneme SMALLINT NOT NULL DEFAULT 0,
      kullanildi BOOLEAN NOT NULL DEFAULT FALSE,
      bitis TIMESTAMPTZ NOT NULL,
      olusturma TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`);
    await p.query('CREATE INDEX IF NOT EXISTS idx_captcha_bitis ON captcha_zorluk (bitis)');
    await p.query(`CREATE TABLE IF NOT EXISTS captcha_gecis (
      token_hash CHAR(64) PRIMARY KEY,
      ip_hash CHAR(64) NOT NULL,
      bitis TIMESTAMPTZ NOT NULL,
      kullanim INT NOT NULL DEFAULT 0,
      olusturma TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`);
    await p.query('CREATE INDEX IF NOT EXISTS idx_captcha_gecis_bitis ON captcha_gecis (bitis)');
    await p.query(`CREATE TABLE IF NOT EXISTS guvenlik_hiz_sinir (
      anahtar_hash CHAR(64) NOT NULL,
      islem VARCHAR(40) NOT NULL,
      pencere BIGINT NOT NULL,
      sayac INT NOT NULL DEFAULT 0,
      PRIMARY KEY (anahtar_hash, islem, pencere)
    )`);
    await p.query('CREATE INDEX IF NOT EXISTS idx_guvenlik_hiz_pencere ON guvenlik_hiz_sinir (pencere)');
    await p.query(`CREATE TABLE IF NOT EXISTS guvenlik_nonce (
      nonce_hash CHAR(64) PRIMARY KEY, bitis TIMESTAMPTZ NOT NULL
    )`);
    await p.query('CREATE INDEX IF NOT EXISTS idx_guvenlik_nonce_bitis ON guvenlik_nonce (bitis)');
  })().catch((err) => { _guvenlikSchemaReady = null; throw err; });
  return _guvenlikSchemaReady;
}

// ---------- telefon (NetGSM SMS) ----------
function telefonNormalize(t) {
  t = String(t || '').replace(/\D/g, '');
  if (t.length === 11 && t[0] === '0') t = t.slice(1);
  if (t.length === 10 && t[0] === '5') return '+90' + t;
  if (t.length === 12 && t.startsWith('90') && t[2] === '5') return '+' + t;
  return null;
}
async function smsGonder(tel, metin) {
  const mod = process.env.SMS_MODU || 'kapali';
  if (mod === 'kapali' || mod === 'off') return [false, 'SMS servisi kapalı (SMS_MODU).'];
  const uk = process.env.NETGSM_USERCODE || '';
  const ps = process.env.NETGSM_PASSWORD || '';
  const baslik = process.env.NETGSM_HEADER || '';
  if (!uk || !ps || !baslik) return [false, 'NetGSM bilgileri girilmedi (Vercel Environment Variables).'];
  const url = 'https://api.netgsm.com.tr/sms/send/get/?usercode=' + encodeURIComponent(uk) +
    '&password=' + encodeURIComponent(ps) + '&gsmno=' + encodeURIComponent(tel.replace('+', '')) +
    '&message=' + encodeURIComponent(metin) + '&msgheader=' + encodeURIComponent(baslik) + '&dil=TR';
  try {
    const r = await fetch(url);
    const t = (await r.text()).trim();
    if (t.startsWith('00')) return [true, ''];
    return [false, 'NetGSM hatası: ' + t.slice(0, 120)];
  } catch (e) { return [false, 'SMS bağlantısı kurulamadı: ' + e.message]; }
}

// ---------- e-posta (Brevo HTTPS API) ----------
async function epostaGonder(kime, konu, metin) {
  const mod = process.env.EMAIL_MODE || 'brevo';
  if (mod === 'kapali' || mod === 'off') return [false, 'E-posta gönderimi kapalı (EMAIL_MODE).'];
  const anahtar = process.env.BREVO_API_KEY || '';
  const gonderen = process.env.BREVO_SENDER_EMAIL || '';
  if (!anahtar || !gonderen) return [false, 'Brevo API anahtarı / gönderici e-postası girilmedi (Vercel Environment Variables).'];
  try {
    const r = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { accept: 'application/json', 'api-key': anahtar, 'content-type': 'application/json' },
      body: JSON.stringify({
        sender: { name: process.env.SENDER_NAME || 'Ortaokulluyuz', email: gonderen },
        to: [{ email: kime }], subject: konu, textContent: metin,
      }),
    });
    if (r.ok) return [true, ''];
    const t = await r.text().catch(() => '');
    return [false, 'Brevo hatası (HTTP ' + r.status + '): ' + String(t).slice(0, 200)];
  } catch (e) { return [false, 'Brevo bağlantısı kurulamadı: ' + e.message]; }
}

async function dogrulamaKoduGonder(client, eposta, ad) {
  const kod = String(crypto.randomInt(100000, 999999));
  await client.query('DELETE FROM dogrulama WHERE eposta = $1', [eposta]);
  const bitis = new Date(Date.now() + 15 * 60 * 1000).toISOString();
  await client.query('INSERT INTO dogrulama (eposta, kod_hash, bitis) VALUES ($1,$2,$3)',
    [eposta, await bcrypt.hash(kod, 10), bitis]);
  const metin = 'Merhaba ' + ad + ',\n\nOrtaokulluyuz e-posta doğrulama kodunuz: ' + kod +
    '\n\nBu kod 15 dakika geçerlidir. Bu isteği siz yapmadıysanız dikkate almayın.';
  return epostaGonder(eposta, 'Ortaokulluyuz Doğrulama Kodu', metin);
}

async function dogrulamaSmsGonder(client, tel, ad) {
  const kod = String(crypto.randomInt(100000, 999999));
  await client.query('DELETE FROM dogrulama WHERE eposta = $1', [tel]);
  const bitis = new Date(Date.now() + 15 * 60 * 1000).toISOString();
  await client.query('INSERT INTO dogrulama (eposta, kod_hash, bitis) VALUES ($1,$2,$3)',
    [tel, await bcrypt.hash(kod, 10), bitis]);
  return smsGonder(tel, 'Ortaokulluyuz dogrulama kodunuz: ' + kod + ' (15 dakika gecerli)');
}

// ---------- yönlendirici ----------
module.exports = async (req, res) => {
  const yol = String((req && req.url) || '').split('?')[0];
  const gateway = !yol || yol.endsWith('/api/gateway') || yol.endsWith('/api/gateway/');
  if (!gateway) return hata(res, 'Bu API uç noktası devre dışı.', 404, 'API_DISABLED');
  if (req.method !== 'POST') return hata(res, 'Bu uç nokta yalnızca POST kabul eder.', 405, 'METHOD_NOT_ALLOWED');
  const rawGovde = await govdeOku(req);
  const islem = KOD_ISLEMLERI[String(rawGovde && rawGovde.a || '')] || '';
  const govde = (rawGovde && rawGovde.d && typeof rawGovde.d === 'object') ? rawGovde.d : {};
  const sorgu = {};
  const g = (ad, v) => girdi(govde, sorgu, ad, v);

  if (!originGuvenliMi(req)) return hata(res, 'Geçersiz istek kaynağı.', 403, 'BAD_ORIGIN');
  if (!islem) return hata(res, 'Geçersiz güvenlik isteği.', 404, 'BAD_ACTION');

  if (islem === 'ping') return gonder(res, 200, { ok: true, zaman: new Date().toISOString() });

  let client;
  try { client = pool(); }
  catch (e) { return hata(res, 'Veritabanına bağlanılamadı (DATABASE_URL).', 500); }

  try {
    await guvenlikSemasiHazirla();
    if (gateway && !await gatewayTekrarKontrol(client, req, rawGovde)) return hata(res, 'Geçersiz veya tekrarlanan istek.', 409, 'REQUEST_REJECTED');
    const globalLimit = await rateLimit(client, req, 'genel', 240, 1);
    if (!globalLimit) return hata(res, 'Çok fazla istek gönderildi. Biraz sonra tekrar deneyin.', 429, 'RATE_LIMIT');

    const ozelLimit = {
      'captcha-yeni': [12, 10],
      'captcha-dogrula': [15, 10],
      'dogrula': [10, 15],
      'giris': [10, 10],
      'kayit': [5, 30],
      'telefon-kayit': [5, 30],
      'google-giris': [10, 10],
      'kod-tekrar': [4, 15],
      'sifre-degistir': [5, 15],
      'mesaj-gonder': [30, 1],
      'soru-ekle': [8, 10],
      'yanit-ekle': [20, 10],
      'sesli-arama-baslat': [8, 5],
      'sesli-arama-teklif': [40, 1],
      'sesli-arama-yanit': [40, 1],
      'sesli-arama-sinyal': [90, 1],
      'sikayet-et': [10, 10]
    };
    if (ozelLimit[islem]) {
      const [limit, dakika] = ozelLimit[islem];
      if (!await rateLimit(client, req, islem, limit, dakika)) return hata(res, 'Bu işlem için kısa sürede çok fazla istek yapıldı. Biraz sonra tekrar deneyin.', 429, 'RATE_LIMIT');
    }

    const guvenlik = await guvenlikGecisKontrol(client, req, islem, govde);
    if (!guvenlik.ok) return hata(res, guvenlik.mesaj, 428, guvenlik.kod);

    switch (islem) {
      case 'captcha-yeni': {
        await client.query('DELETE FROM captcha_zorluk WHERE bitis < NOW()');
        await client.query('DELETE FROM captcha_gecis WHERE bitis < NOW()');
        const c = captchaUret();
        const bitis = new Date(Date.now() + 3 * 60 * 1000).toISOString();
        await client.query(
          `INSERT INTO captcha_zorluk (token_hash, soru, cevap_hash, ip_hash, bitis) VALUES ($1,$2,$3,$4,$5)`,
          [captchaTokenHash(c.token), c.soru, captchaCevapHash(c.cevap), ipHash(req), bitis]
        );
        return gonder(res, 200, { ok: true, token: c.token, soru: c.soru, bitis: new Date(bitis).getTime() });
      }

      case 'captcha-dogrula': {
        const token = String(g('captcha_token', ''));
        const cevap = String(g('cevap', '')).trim();
        if (!token || !cevap) return hata(res, 'CAPTCHA cevabı gerekli.', 400, 'CAPTCHA_REQUIRED');
        const r = await client.query(
          `SELECT token_hash, cevap_hash, deneme FROM captcha_zorluk
           WHERE token_hash = $1 AND ip_hash = $2 AND bitis > NOW() AND kullanildi = FALSE`,
          [captchaTokenHash(token), ipHash(req)]
        );
        if (!r.rows.length) return hata(res, 'CAPTCHA bulunamadı veya süresi doldu.', 400, 'CAPTCHA_EXPIRED');
        const row = r.rows[0];
        const eslesiyor = crypto.timingSafeEqual(Buffer.from(row.cevap_hash), Buffer.from(captchaCevapHash(cevap)));
        if (!eslesiyor) {
          const yeni = Number(row.deneme) + 1;
          await client.query('UPDATE captcha_zorluk SET deneme = $1, kullanildi = $2 WHERE token_hash = $3', [yeni, yeni >= 5, captchaTokenHash(token)]);
          return hata(res, yeni >= 5 ? 'CAPTCHA deneme hakkı bitti. Yenisi oluşturun.' : 'CAPTCHA cevabı yanlış.', 400, 'CAPTCHA_WRONG');
        }
        await client.query('UPDATE captcha_zorluk SET deneme = deneme + 1, kullanildi = TRUE WHERE token_hash = $1', [captchaTokenHash(token)]);
        const gecis = guvenlikTokenUret();
        const gecisBitis = new Date(Date.now() + 20 * 60 * 1000).toISOString();
        await client.query(
          `INSERT INTO captcha_gecis (token_hash, ip_hash, bitis, kullanim) VALUES ($1,$2,$3,0)
           ON CONFLICT (token_hash) DO UPDATE SET ip_hash = EXCLUDED.ip_hash, bitis = EXCLUDED.bitis, kullanim = 0`,
          [captchaTokenHash(gecis), ipHash(req), gecisBitis]
        );
        guvenlikCerezYaz(res, req, gecis, 20 * 60);
        return gonder(res, 200, { ok: true, bitis: new Date(gecisBitis).getTime() });
      }

      case 'oturum': {
        const k = await oturum(req);
        return gonder(res, 200, { ok: true, kullanici: k });
      }

      case 'kayit': {
        const ad = String(g('ad', '')).trim();
        const eposta = String(g('eposta', '')).trim().toLowerCase();
        const sifre = String(g('sifre', ''));
        if (ad.length < 3) return hata(res, 'Ad soyad en az 3 karakter olmalı.');
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(eposta)) return hata(res, 'Geçerli bir e-posta yazın.');
        if (sifre.length < 4) return hata(res, 'Şifre en az 4 karakter olmalı.');
        const mevcut = await client.query('SELECT id FROM uyeler WHERE eposta = $1', [eposta]);
        if (mevcut.rows.length) return hata(res, 'Bu e-posta ile zaten kayıt var.');
        const mod = process.env.EMAIL_MODE || 'brevo';
        const onay = (mod === 'kapali' || mod === 'off') ? true : false;
        const ek = await client.query(
          'INSERT INTO uyeler (ad, eposta, parola, rol, eposta_onay) VALUES ($1,$2,$3,\'ogrenci\',$4) RETURNING id',
          [ad, eposta, await bcrypt.hash(sifre, 10), onay]);
        const id = ek.rows[0].id;
        if (!onay) {
          const [gonderildi, pm] = await dogrulamaKoduGonder(client, eposta, ad);
          return gonder(res, 200, { ok: true, dogrulama_gerekli: true, eposta, posta_gonderildi: gonderildi, posta_hatasi: gonderildi ? '' : pm });
        }
        const kul = { id, ad, eposta, rol: 'ogrenci' };
        jetonVer(res, req, kul);
        return gonder(res, 200, { ok: true, kullanici: kul });
      }

      case 'dogrula': {
        let hedef = String(g('hedef', g('eposta', ''))).trim();
        const telDogrula = telefonNormalize(hedef);
        hedef = telDogrula || hedef.toLowerCase();
        const kod = String(g('kod', '')).trim();
        const u = (await client.query('SELECT id, ad, eposta, rol FROM uyeler WHERE eposta = $1 OR telefon = $1', [hedef])).rows[0];
        if (!u) return hata(res, 'Kayıt bulunamadı.', 404);
        const d = (await client.query('SELECT * FROM dogrulama WHERE eposta = $1 ORDER BY id DESC LIMIT 1', [hedef])).rows[0];
        if (!d) return hata(res, 'Kod bulunamadı. Yeni kod isteyin.');
        if (new Date(d.bitis).getTime() < Date.now()) return hata(res, 'Kodun süresi doldu. Yeni kod isteyin.');
        if (Number(d.deneme) >= 5) return hata(res, 'Çok fazla hatalı deneme. Yeni kod isteyin.');
        if (!(await bcrypt.compare(kod, d.kod_hash))) {
          await client.query('UPDATE dogrulama SET deneme = deneme + 1 WHERE id = $1', [d.id]);
          return hata(res, 'Kod hatalı. Tekrar deneyin.');
        }
        await client.query('DELETE FROM dogrulama WHERE eposta = $1', [hedef]);
        await client.query('UPDATE uyeler SET eposta_onay = TRUE WHERE id = $1', [u.id]);
        jetonVer(res, req, u);
        return gonder(res, 200, { ok: true, kullanici: u });
      }

      case 'kod-tekrar': {
        let hedef = String(g('hedef', g('eposta', ''))).trim();
        const telTekrar = telefonNormalize(hedef);
        hedef = telTekrar || hedef.toLowerCase();
        const u = (await client.query('SELECT id, ad, eposta, telefon, eposta_onay FROM uyeler WHERE eposta = $1 OR telefon = $1', [hedef])).rows[0];
        if (!u) return hata(res, 'Kayıt bulunamadı.', 404);
        if (u.eposta_onay) return hata(res, 'Bu hesap zaten doğrulanmış.');
        const son = (await client.query('SELECT olusturma FROM dogrulama WHERE eposta = $1 ORDER BY id DESC LIMIT 1', [hedef])).rows[0];
        if (son && (Date.now() - new Date(son.olusturma).getTime() < 60000)) return hata(res, 'Yeni kod için 1 dakika bekleyin.');
        if (telTekrar) {
          const [gonderildi, pm] = await dogrulamaSmsGonder(client, hedef, u.ad);
          if (!gonderildi) return hata(res, 'Kod gönderilemedi: ' + pm);
        } else {
          const [gonderildi, pm] = await dogrulamaKoduGonder(client, hedef, u.ad);
          if (!gonderildi) return hata(res, 'Kod gönderilemedi: ' + pm);
        }
        return gonder(res, 200, { ok: true });
      }

      case 'giris': {
        const girisHedef = String(g('eposta', g('hedef', ''))).trim();
        const telGiris = telefonNormalize(girisHedef);
        const anahtar = telGiris || girisHedef.toLowerCase();
        const sifre = String(g('sifre', ''));
        const u = (await client.query('SELECT id, ad, eposta, telefon, parola, rol, eposta_onay FROM uyeler WHERE eposta = $1 OR telefon = $1', [anahtar])).rows[0];
        if (!u) return hata(res, 'Bu bilgilerle kayıt bulunamadı. Önce kayıt olun.', 404);
        if (!(await bcrypt.compare(sifre, u.parola))) return hata(res, 'Şifre hatalı. Tekrar deneyin.', 401);
        if (!u.eposta_onay) return hata(res, 'E-POSTA-DOGRULAMA-GEREK:Hesabınıza gönderilen 6 haneli kodu girerek doğrulayın.', 403);
        delete u.parola; delete u.eposta_onay;
        jetonVer(res, req, u);
        return gonder(res, 200, { ok: true, kullanici: u });
      }

      case 'telefon-kayit': {
        const ad = String(g('ad', '')).trim();
        const tel = telefonNormalize(g('telefon', ''));
        const sifre = String(g('sifre', ''));
        if (ad.length < 3) return hata(res, 'Ad soyad en az 3 karakter olmalı.');
        if (!tel) return hata(res, 'Geçerli bir cep telefonu yazın (05XX XXX XX XX).');
        if (sifre.length < 4) return hata(res, 'Şifre en az 4 karakter olmalı.');
        const mevcut = await client.query('SELECT id FROM uyeler WHERE telefon = $1 OR eposta = $1', [tel]);
        if (mevcut.rows.length) return hata(res, 'Bu telefon ile zaten kayıt var.');
        const ek = await client.query(
          'INSERT INTO uyeler (ad, eposta, parola, rol, eposta_onay, telefon) VALUES ($1,NULL,$2,\'ogrenci\',FALSE,$3) RETURNING id',
          [ad, await bcrypt.hash(sifre, 10), tel]);
        const [gonderildi, pm] = await dogrulamaSmsGonder(client, tel, ad);
        return gonder(res, 200, { ok: true, dogrulama_gerekli: true, hedef: tel,
          posta_gonderildi: gonderildi, posta_hatasi: gonderildi ? '' : pm });
      }

      case 'google-giris': {
        const idToken = String(g('idToken', ''));
        const cid = process.env.GOOGLE_CLIENT_ID || '';
        if (!cid) return hata(res, 'Google girişi yapılandırılmadı.');
        if (!idToken) return hata(res, 'Google belirteci alınamadı.');
        let dog;
        try {
          const r = await fetch('https://oauth2.googleapis.com/tokeninfo?id_token=' + encodeURIComponent(idToken));
          dog = await r.json();
        } catch (e) { return hata(res, 'Google doğrulaması başarısız.'); }
        if (!dog || dog.aud !== cid) return hata(res, 'Google doğrulaması başarısız.');
        if (dog.email_verified !== 'true' && dog.email_verified !== true) return hata(res, 'Google e-postası doğrulanmamış.');
        const eposta = String(dog.email || '').toLowerCase();
        const ad = String(dog.name || eposta.split('@')[0]).slice(0, 120);
        let u = (await client.query('SELECT id, ad, eposta, rol FROM uyeler WHERE eposta = $1', [eposta])).rows[0];
        if (!u) {
          const ek = await client.query(
            "INSERT INTO uyeler (ad, eposta, parola, rol, eposta_onay) VALUES ($1,$2,'-','ogrenci',FALSE) RETURNING id, ad, eposta, rol",
            [ad, eposta]);
          u = ek.rows[0];
        }
        const [gonderildi, pm] = await dogrulamaKoduGonder(client, eposta, u.ad);
        return gonder(res, 200, { ok: true, dogrulama_gerekli: true, eposta,
          posta_gonderildi: gonderildi, posta_hatasi: gonderildi ? '' : pm });
      }

      case 'yapilandirma': {
        return gonder(res, 200, { ok: true,
          google: !!(process.env.GOOGLE_CLIENT_ID),
          googleClientId: process.env.GOOGLE_CLIENT_ID || '',
          sms: (process.env.SMS_MODU || 'kapali') !== 'kapali',
          eposta: (process.env.EMAIL_MODE || 'brevo') !== 'kapali' });
      }

      case 'cikis':
        jetonSil(res, req);
        guvenlikCerezSil(res, req);
        return gonder(res, 200, { ok: true });

      case 'sifre-degistir': {
        const k = await oturum(req);
        if (!k) return hata(res, 'Bu işlem için giriş yapmalısınız.', 401);
        const yeni = String(g('yeni', ''));
        if (yeni.length < 6) return hata(res, 'Şifre en az 6 karakter olmalı.');
        await client.query('UPDATE uyeler SET parola = $1 WHERE id = $2', [await bcrypt.hash(yeni, 10), k.id]);
        return gonder(res, 200, { ok: true });
      }

      case 'uyeler': {
        const k = await oturum(req);
        if (!k || k.rol !== 'admin') return hata(res, 'Yetkisiz işlem.', 403);
        const l = await client.query('SELECT id, ad, eposta, telefon, rol, eposta_onay, olusturma FROM uyeler ORDER BY olusturma DESC');
        return gonder(res, 200, { ok: true, uyeler: l.rows });
      }

      case 'rol-ata': {
        const k = await oturum(req);
        if (!k || k.rol !== 'admin') return hata(res, 'Yetkisiz işlem.', 403);
        const id = Number(g('id', 0)); const rol = String(g('rol', ''));
        if (!['ogrenci', 'ogretmen', 'veli', 'admin'].includes(rol)) return hata(res, 'Geçersiz rol.');
        const v = await client.query('SELECT id FROM uyeler WHERE id = $1', [id]);
        if (!v.rows.length) return hata(res, 'Kullanıcı bulunamadı.', 404);
        if (id === 1 && rol !== 'admin') return hata(res, 'Ana yönetici hesabının yetkisi alınamaz.');
        await client.query('UPDATE uyeler SET rol = $1 WHERE id = $2', [rol, id]);
        return gonder(res, 200, { ok: true });
      }

      case 'uye-sil': {
        const k = await oturum(req);
        if (!k || k.rol !== 'admin') return hata(res, 'Yetkisiz işlem.', 403);
        const id = Number(g('id', 0));
        if (id === 1) return hata(res, 'Ana yönetici hesabı silinemez.');
        await client.query('DELETE FROM uyeler WHERE id = $1', [id]);
        return gonder(res, 200, { ok: true });
      }

      case 'sifre-ver': {
        const k = await oturum(req);
        if (!k || k.rol !== 'admin') return hata(res, 'Yetkisiz işlem.', 403);
        const id = Number(g('id', 0)); const yeni = String(g('yeni', ''));
        if (yeni.length < 4) return hata(res, 'Şifre en az 4 karakter olmalı.');
        await client.query('UPDATE uyeler SET parola = $1 WHERE id = $2', [await bcrypt.hash(yeni, 10), id]);
        return gonder(res, 200, { ok: true });
      }

      case 'uye-onayla': {
        const k = await oturum(req);
        if (!k || k.rol !== 'admin') return hata(res, 'Yetkisiz işlem.', 403);
        await client.query('UPDATE uyeler SET eposta_onay = TRUE WHERE id = $1', [Number(g('id', 0))]);
        return gonder(res, 200, { ok: true });
      }

      case 'test-eposta': {
        const k = await oturum(req);
        if (!k || k.rol !== 'admin') return hata(res, 'Yetkisiz işlem.', 403);
        const ep = String(g('eposta', ''));
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(ep)) return hata(res, 'Geçerli bir e-posta yazın.');
        const [ok, mesaj] = await epostaGonder(ep, 'Ortaokulluyuz Test E-postası', 'Bu bir test iletisidir. E-posta ayarlarınız çalışıyor.');
        if (!ok) return hata(res, 'Gönderilemedi: ' + mesaj);
        return gonder(res, 200, { ok: true });
      }

      case 'istatistik': {
        const k = await oturum(req);
        if (!k || k.rol !== 'admin') return hata(res, 'Yetkisiz işlem.', 403);
        const s = await client.query('SELECT (SELECT COUNT(*) FROM sorular) s, (SELECT COUNT(*) FROM yanitlar) y, (SELECT COUNT(*) FROM uyeler) u, (SELECT COUNT(*) FROM uyeler WHERE rol = \'ogretmen\') o');
        return gonder(res, 200, { ok: true, soru: Number(s.rows[0].s), yanit: Number(s.rows[0].y), uye: Number(s.rows[0].u), ogretmen: Number(s.rows[0].o) });
      }

      case 'sorular': {
        const k = await oturum(req);
        const kosul = []; const prm = [];
        if (g('sinif', '') !== '') { prm.push(Number(g('sinif'))); kosul.push('s.sinif = $' + prm.length); }
        if (g('ders', '') !== '') { prm.push(String(g('ders'))); kosul.push('s.ders = $' + prm.length); }
        if (g('durum', '') === 'cozuldu') kosul.push('s.cozuldu = TRUE');
        if (g('durum', '') === 'bekliyor') kosul.push('s.cozuldu = FALSE');
        if (g('q', '') !== '') { prm.push('%' + g('q') + '%'); prm.push('%' + g('q') + '%'); kosul.push('(s.baslik ILIKE $' + (prm.length - 1) + ' OR s.govde ILIKE $' + prm.length + ')'); }
        const where = kosul.length ? ('WHERE ' + kosul.join(' AND ')) : '';
        const sl = await client.query('SELECT s.*, u.rol AS yazar_rol FROM sorular s LEFT JOIN uyeler u ON u.id = s.yazar_id ' + where + ' ORDER BY s.olusturma DESC LIMIT 200', prm);
        const sorular = sl.rows;
        let yanitlar = {};
        if (sorular.length) {
          const ids = sorular.map((s) => s.id);
          const yer = ids.map((_, i) => '$' + (i + 1)).join(',');
          const yl = await client.query('SELECT y.*, u.rol AS yazar_rol FROM yanitlar y LEFT JOIN uyeler u ON u.id = y.yazar_id WHERE y.soru_id IN (' + yer + ') ORDER BY y.olusturma ASC', ids);
          yl.rows.forEach((y) => { (yanitlar[y.soru_id] = yanitlar[y.soru_id] || []).push(y); });
        }
        const cikti = sorular.map((s) => ({
          id: s.id, sinif: s.sinif, ders: s.ders, unite: s.unite,
          baslik: s.baslik, govde: s.govde, gorsel: s.gorsel,
          yazar: s.yazar_ad + ' (' + rolAdiDB(s.yazar_rol || 'ogrenci') + ')',
          yazar_id: s.yazar_id === null ? null : s.yazar_id,
          tarih: s.olusturma, begeni: s.begeni, cozuldu: !!s.cozuldu,
          sahip: !!(k && s.yazar_id !== null && Number(s.yazar_id) === Number(k.id)),
          yanitlar: (yanitlar[s.id] || []).map((y) => ({
            id: 'y' + y.id, dbid: y.id,
            yazar: y.yazar_ad + ' (' + rolAdiDB(y.yazar_rol || 'ogrenci') + ')',
            metin: y.metin, begeni: y.begeni, dogru: !!y.dogru, tarih: y.olusturma,
          })),
        }));
        return gonder(res, 200, { ok: true, sorular: cikti });
      }

      case 'soru-ekle': {
        const k = await oturum(req);
        if (!k) return hata(res, 'Bu işlem için giriş yapmalısınız.', 401);
        const sinif = Number(g('sinif', 0)); const ders = String(g('ders', '')); const unite = String(g('unite', ''));
        const baslik = String(g('baslik', '')); const govde = String(g('govde', ''));
        let gorsel = g('gorsel', null);
        if (![5, 6, 7, 8].includes(sinif)) return hata(res, 'Sınıf seçimi zorunlu.');
        if (!ders || !unite) return hata(res, 'Ders ve ünite seçimi zorunlu.');
        if (baslik.length < 8 || govde.length < 10) return hata(res, 'Başlık ve açıklama biraz daha detaylı olmalı.');
        if (gorsel) {
          if (typeof gorsel !== 'string' || !gorsel.startsWith('data:image/')) return hata(res, 'Geçerli bir görsel seçin.');
          if (gorsel.length > 2800000) return hata(res, 'Görsel en fazla 2 MB olmalı.');
        }
        const ek = await client.query(
          'INSERT INTO sorular (sinif, ders, unite, baslik, govde, gorsel, yazar_id, yazar_ad) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id',
          [sinif, ders, unite, baslik, govde, gorsel || null, k.id, k.ad]);
        return gonder(res, 200, { ok: true, id: ek.rows[0].id });
      }

      case 'soru-sil': {
        const k = await oturum(req);
        if (!k) return hata(res, 'Bu işlem için giriş yapmalısınız.', 401);
        const id = Number(g('id', 0));
        const s = (await client.query('SELECT yazar_id FROM sorular WHERE id = $1', [id])).rows[0];
        if (!s) return hata(res, 'Soru bulunamadı.', 404);
        if (k.rol !== 'admin' && Number(s.yazar_id) !== Number(k.id)) return hata(res, 'Yetkisiz işlem.', 403);
        await client.query('DELETE FROM sorular WHERE id = $1', [id]);
        return gonder(res, 200, { ok: true });
      }

      case 'yanit-ekle': {
        const k = await oturum(req);
        if (!k) return hata(res, 'Bu işlem için giriş yapmalısınız.', 401);
        const sid = Number(g('soru_id', 0)); const metin = String(g('metin', ''));
        if (metin.trim().length < 2) return hata(res, 'Yanıt boş olamaz.');
        const s = await client.query('SELECT id FROM sorular WHERE id = $1', [sid]);
        if (!s.rows.length) return hata(res, 'Soru bulunamadı.', 404);
        await client.query('INSERT INTO yanitlar (soru_id, yazar_id, yazar_ad, metin) VALUES ($1,$2,$3,$4)', [sid, k.id, k.ad, metin]);
        return gonder(res, 200, { ok: true });
      }

      case 'yanit-sil': {
        const k = await oturum(req);
        if (!k) return hata(res, 'Bu işlem için giriş yapmalısınız.', 401);
        const dbid = Number(g('id', 0));
        const y = (await client.query('SELECT yazar_id FROM yanitlar WHERE id = $1', [dbid])).rows[0];
        if (!y) return hata(res, 'Yanıt bulunamadı.', 404);
        if (k.rol !== 'admin' && Number(y.yazar_id) !== Number(k.id)) return hata(res, 'Yetkisiz işlem.', 403);
        await client.query('DELETE FROM yanitlar WHERE id = $1', [dbid]);
        return gonder(res, 200, { ok: true });
      }

      case 'begeni': {
        const k = await oturum(req);
        if (!k) return hata(res, 'Bu işlem için giriş yapmalısınız.', 401);
        const hedef = String(g('hedef', '')); const id = Number(g('id', 0));
        if (!['soru', 'yanit'].includes(hedef)) return hata(res, 'Geçersiz hedef.');
        const tablo = hedef === 'soru' ? 'sorular' : 'yanitlar';
        const v = await client.query('SELECT id FROM ' + tablo + ' WHERE id = $1', [id]);
        if (!v.rows.length) return hata(res, 'Kayıt bulunamadı.', 404);
        const once = await client.query('SELECT id FROM begeniler WHERE kullanici_id = $1 AND hedef = $2 AND hedef_id = $3', [k.id, hedef, id]);
        if (once.rows.length) return hata(res, 'Daha önce beğendiniz.');
        await client.query('INSERT INTO begeniler (kullanici_id, hedef, hedef_id) VALUES ($1,$2,$3)', [k.id, hedef, id]);
        await client.query('UPDATE ' + tablo + ' SET begeni = begeni + 1 WHERE id = $1', [id]);
        const son = await client.query('SELECT begeni FROM ' + tablo + ' WHERE id = $1', [id]);
        return gonder(res, 200, { ok: true, begeni: son.rows[0].begeni });
      }

      case 'dogru-isaretle': {
        const k = await oturum(req);
        if (!k) return hata(res, 'Bu işlem için giriş yapmalısınız.', 401);
        const sid = Number(g('soru_id', 0)); const yid = Number(g('id', 0));
        const s = (await client.query('SELECT yazar_id FROM sorular WHERE id = $1', [sid])).rows[0];
        if (!s) return hata(res, 'Soru bulunamadı.', 404);
        const sahip = Number(s.yazar_id) === Number(k.id);
        if (!sahip && !['ogretmen', 'admin'].includes(k.rol))
          return hata(res, 'Doğru yanıtı yalnızca soru sahibi veya öğretmen işaretleyebilir.', 403);
        await client.query('UPDATE yanitlar SET dogru = FALSE WHERE soru_id = $1', [sid]);
        await client.query('UPDATE yanitlar SET dogru = TRUE WHERE id = $1 AND soru_id = $2', [yid, sid]);
        await client.query('UPDATE sorular SET cozuldu = TRUE WHERE id = $1', [sid]);
        return gonder(res, 200, { ok: true });
      }

      case 'favoriler': {
        const k = await oturum(req);
        if (!k) return hata(res, 'Bu işlem için giriş yapmalısınız.', 401);
        const l = await client.query('SELECT kitap_id FROM favoriler WHERE kullanici_id = $1', [k.id]);
        return gonder(res, 200, { ok: true, favoriler: l.rows.map((r) => r.kitap_id) });
      }
      case 'favori-ekle': {
        const k = await oturum(req);
        if (!k) return hata(res, 'Bu işlem için giriş yapmalısınız.', 401);
        await client.query('INSERT INTO favoriler (kullanici_id, kitap_id) VALUES ($1,$2) ON CONFLICT DO NOTHING', [k.id, String(g('kitap_id', ''))]);
        return gonder(res, 200, { ok: true });
      }
      case 'favori-cikar': {
        const k = await oturum(req);
        if (!k) return hata(res, 'Bu işlem için giriş yapmalısınız.', 401);
        await client.query('DELETE FROM favoriler WHERE kullanici_id = $1 AND kitap_id = $2', [k.id, String(g('kitap_id', ''))]);
        return gonder(res, 200, { ok: true });
      }

      case 'tercih-etki': {
        const k = await oturum(req);
        if (!k) return hata(res, 'Bu işlem için giriş yapmalısınız.', 401);
        const sinif = Number(g('sinif', 0)); const ders = String(g('ders', '')).slice(0, 32); const kitapId = String(g('kitap_id', '')).slice(0, 32); const olay = String(g('olay', 'goruntuleme'));
        if (![5,6,7,8].includes(sinif)) return hata(res, 'Geçersiz sınıf.');
        if (!['goruntuleme','acma','favori','indirme'].includes(olay)) return hata(res, 'Geçersiz etkileşim.');
        await client.query(`INSERT INTO kullanici_tercih (kullanici_id, sinif, ders, kitap_id, ${olay}) VALUES ($1,$2,$3,$4,1)
          ON CONFLICT (kullanici_id, sinif, ders, kitap_id) DO UPDATE SET ${olay} = kullanici_tercih.${olay} + 1, son_etki = NOW()`, [k.id, sinif, ders, kitapId]);
        return gonder(res, 200, { ok: true });
      }
      case 'tercih-ozet': {
        const k = await oturum(req);
        if (!k) return hata(res, 'Bu işlem için giriş yapmalısınız.', 401);
        const l = await client.query('SELECT sinif, ders, kitap_id, goruntuleme, acma, favori, indirme, son_etki FROM kullanici_tercih WHERE kullanici_id = $1 ORDER BY son_etki DESC LIMIT 500', [k.id]);
        const kayitlar = l.rows.map(r => ({ ...r, puan: Number(r.goruntuleme||0) + Number(r.acma||0)*3 + Number(r.favori||0)*6 + Number(r.indirme||0)*2 }));
        return gonder(res, 200, { ok: true, kayitlar });
      }

      case 'sesli-yapilandirma': {
        const k = await oturum(req);
        if (!k) return hata(res, 'Bu işlem için giriş yapmalısınız.', 401);
        const ice = [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun.cloudflare.com:3478' }
        ];
        const turnUrls = String(process.env.TURN_URLS || process.env.TURN_URL || '')
          .split(',').map(x => x.trim()).filter(Boolean);
        const turnUser = String(process.env.TURN_USERNAME || '');
        const turnCred = String(process.env.TURN_CREDENTIAL || '');
        if (turnUrls.length && turnUser && turnCred) {
          turnUrls.forEach(url => ice.push({ urls: url, username: turnUser, credential: turnCred }));
        }
        return gonder(res, 200, { ok: true, ice_servers: ice });
      }
      case 'sesli-arama-baslat': {
        await sesliSemasiHazirla();
        const k = await oturum(req);
        if (!k) return hata(res, 'Bu işlem için giriş yapmalısınız.', 401);
        const karsi = Number(g('karsi_id', 0));
        if (!karsi || karsi === Number(k.id)) return hata(res, 'Geçersiz kullanıcı.');
        const u = (await client.query('SELECT id, ad FROM uyeler WHERE id = $1', [karsi])).rows[0];
        if (!u) return hata(res, 'Kullanıcı bulunamadı.', 404);
        const aktif = (await client.query("SELECT id FROM sesli_arama WHERE (arayan_id=$1 OR aranan_id=$1) AND durum IN ('caliyor','baglaniyor','bagli') AND guncelleme > NOW() - INTERVAL '2 minutes' LIMIT 1", [k.id])).rows[0];
        if (aktif) return hata(res, 'Zaten aktif bir sesli görüşmeniz var.');
        const id = crypto.randomUUID();
        await client.query('INSERT INTO sesli_arama (id, arayan_id, aranan_id, durum) VALUES ($1,$2,$3,\'caliyor\')', [id, k.id, karsi]);
        return gonder(res, 200, { ok: true, arama_id: id, karsi_ad: u.ad });
      }
      case 'sesli-gelen-arama': {
        await sesliSemasiHazirla();
        await client.query("DELETE FROM sesli_arama WHERE guncelleme < NOW() - INTERVAL '1 day'").catch(() => {});
        const k = await oturum(req);
        if (!k) return hata(res, 'Bu işlem için giriş yapmalısınız.', 401);
        const l = await client.query("SELECT a.*, u.ad AS arayan_ad FROM sesli_arama a LEFT JOIN uyeler u ON u.id=a.arayan_id WHERE a.aranan_id=$1 AND a.durum='caliyor' AND a.guncelleme > NOW() - INTERVAL '2 minutes' ORDER BY a.guncelleme DESC LIMIT 1", [k.id]);
        return gonder(res, 200, { ok: true, arama: l.rows[0] || null });
      }
      case 'sesli-arama-teklif': {
        await sesliSemasiHazirla();
        const k = await oturum(req); if (!k) return hata(res, 'Giriş yapmalısınız.', 401);
        const id = String(g('arama_id','')); const teklif = g('teklif', null);
        const a = (await client.query('SELECT * FROM sesli_arama WHERE id=$1 AND arayan_id=$2', [id, k.id])).rows[0];
        if (!a) return hata(res, 'Arama bulunamadı.', 404);
        await client.query("UPDATE sesli_arama SET teklif=$1, guncelleme=NOW() WHERE id=$2", [JSON.stringify(teklif), id]);
        return gonder(res, 200, { ok: true });
      }
      case 'sesli-arama-yanit': {
        await sesliSemasiHazirla();
        const k = await oturum(req); if (!k) return hata(res, 'Giriş yapmalısınız.', 401);
        const id = String(g('arama_id','')); const yanit = g('yanit', null);
        const a = (await client.query('SELECT * FROM sesli_arama WHERE id=$1 AND aranan_id=$2', [id, k.id])).rows[0];
        if (!a) return hata(res, 'Arama bulunamadı.', 404);
        await client.query("UPDATE sesli_arama SET yanit=$1, durum='baglaniyor', guncelleme=NOW() WHERE id=$2", [JSON.stringify(yanit), id]);
        return gonder(res, 200, { ok: true });
      }
      case 'sesli-arama-durum-guncelle': {
        await sesliSemasiHazirla();
        const k = await oturum(req); if (!k) return hata(res, 'Giriş yapmalısınız.', 401);
        const id = String(g('arama_id','')); const durum = String(g('durum',''));
        if (!['baglaniyor','bagli'].includes(durum)) return hata(res, 'Geçersiz durum.');
        const a = (await client.query('SELECT id FROM sesli_arama WHERE id=$1 AND (arayan_id=$2 OR aranan_id=$2)', [id, k.id])).rows[0];
        if (!a) return hata(res, 'Arama bulunamadı.', 404);
        await client.query('UPDATE sesli_arama SET durum=$1, guncelleme=NOW() WHERE id=$2', [durum, id]);
        return gonder(res, 200, { ok: true });
      }
      case 'sesli-arama-sinyal': {
        await sesliSemasiHazirla();
        const k = await oturum(req); if (!k) return hata(res, 'Giriş yapmalısınız.', 401);
        const id = String(g('arama_id','')); const sinyal = g('sinyal', null);
        const a = (await client.query('SELECT id FROM sesli_arama WHERE id=$1 AND (arayan_id=$2 OR aranan_id=$2)', [id, k.id])).rows[0];
        if (!a || !sinyal) return hata(res, 'Geçersiz sinyal.');
        await client.query('INSERT INTO sesli_sinyal (arama_id, gonderen_id, sinyal) VALUES ($1,$2,$3)', [id, k.id, JSON.stringify(sinyal)]);
        return gonder(res, 200, { ok: true });
      }
      case 'sesli-arama-kapat': {
        await sesliSemasiHazirla();
        const k = await oturum(req); if (!k) return hata(res, 'Giriş yapmalısınız.', 401);
        const id = String(g('arama_id',''));
        const a = (await client.query('SELECT id FROM sesli_arama WHERE id=$1 AND (arayan_id=$2 OR aranan_id=$2)', [id, k.id])).rows[0];
        if (!a) return hata(res, 'Arama bulunamadı.', 404);
        await client.query("UPDATE sesli_arama SET durum='kapali', guncelleme=NOW() WHERE id=$1", [id]);
        return gonder(res, 200, { ok: true });
      }
      case 'sesli-arama-durum': {
        await sesliSemasiHazirla();
        const k = await oturum(req); if (!k) return hata(res, 'Giriş yapmalısınız.', 401);
        const id = String(g('arama_id','')); const sonra = Number(g('sonra', 0));
        const a = (await client.query('SELECT id, arayan_id, aranan_id, durum, teklif, yanit, guncelleme FROM sesli_arama WHERE id=$1 AND (arayan_id=$2 OR aranan_id=$2)', [id,k.id])).rows[0];
        if (!a) return hata(res, 'Arama bulunamadı.', 404);
        const l = await client.query('SELECT id, sinyal FROM sesli_sinyal WHERE arama_id=$1 AND gonderen_id <> $2 AND id > $3 ORDER BY id ASC LIMIT 50', [id,k.id,sonra]);
        return gonder(res, 200, { ok: true, arama: a, sinyaller: l.rows });
      }

      case 'kisiler': {
        const k = await oturum(req);
        if (!k) return hata(res, 'Bu işlem için giriş yapmalısınız.', 401);
        const l = await client.query('SELECT id, ad, rol FROM uyeler WHERE id != $1 ORDER BY ad ASC LIMIT 200', [k.id]);
        return gonder(res, 200, { ok: true, kisiler: l.rows });
      }

      case 'sohbetler': {
        const k = await oturum(req);
        if (!k) return hata(res, 'Bu işlem için giriş yapmalısınız.', 401);
        const l = await client.query(
          'SELECT m.*, g.ad AS g_ad, a.ad AS a_ad FROM mesajlar m LEFT JOIN uyeler g ON g.id = m.gonderen_id LEFT JOIN uyeler a ON a.id = m.alici_id WHERE m.gonderen_id = $1 OR m.alici_id = $1 ORDER BY m.olusturma DESC LIMIT 500',
          [k.id]);
        const sohbet = {};
        l.rows.forEach((m) => {
          const karsi = Number(m.gonderen_id) === Number(k.id) ? Number(m.alici_id) : Number(m.gonderen_id);
          if (!sohbet[karsi]) {
            sohbet[karsi] = {
              karsi_id: karsi,
              karsi_ad: (Number(m.gonderen_id) === Number(k.id) ? m.a_ad : m.g_ad) || 'Silinmiş Üye',
              son_metin: m.metin, son_zaman: m.olusturma, okunmamis: 0,
            };
          }
          if (Number(m.alici_id) === Number(k.id) && !m.okundu) sohbet[karsi].okunmamis++;
        });
        const liste = Object.values(sohbet);
        let toplam = 0; liste.forEach((s) => { toplam += s.okunmamis; });
        return gonder(res, 200, { ok: true, sohbetler: liste, okunmamis_toplam: toplam });
      }

      case 'mesajlar': {
        const k = await oturum(req);
        if (!k) return hata(res, 'Bu işlem için giriş yapmalısınız.', 401);
        const karsi = Number(g('karsi_id', 0));
        const kk = (await client.query('SELECT id, ad, rol FROM uyeler WHERE id = $1', [karsi])).rows[0];
        if (!kk) return hata(res, 'Kullanıcı bulunamadı.', 404);
        const l = await client.query(
          'SELECT id, gonderen_id, alici_id, metin, okundu, olusturma FROM mesajlar WHERE (gonderen_id = $1 AND alici_id = $2) OR (gonderen_id = $2 AND alici_id = $1) ORDER BY olusturma ASC LIMIT 300',
          [k.id, karsi]);
        await client.query('UPDATE mesajlar SET okundu = TRUE WHERE alici_id = $1 AND gonderen_id = $2', [k.id, karsi]);
        return gonder(res, 200, { ok: true, karsi: kk, mesajlar: l.rows });
      }

      case 'mesaj-gonder': {
        const k = await oturum(req);
        if (!k) return hata(res, 'Bu işlem için giriş yapmalısınız.', 401);
        const alici = Number(g('alici_id', 0)); const metin = String(g('metin', ''));
        if (alici === Number(k.id)) return hata(res, 'Kendinize mesaj gönderemezsiniz.');
        if (metin.trim().length < 1 || metin.length > 1000) return hata(res, 'Mesaj 1-1000 karakter olmalı.');
        const v = await client.query('SELECT id FROM uyeler WHERE id = $1', [alici]);
        if (!v.rows.length) return hata(res, 'Kullanıcı bulunamadı.', 404);
        const ek = await client.query('INSERT INTO mesajlar (gonderen_id, alici_id, metin) VALUES ($1,$2,$3) RETURNING id, gonderen_id, alici_id, metin, okundu, olusturma', [k.id, alici, metin]);
        return gonder(res, 200, { ok: true, id: ek.rows[0].id, mesaj: ek.rows[0] });
      }

      case 'mesaj-sil': {
        const k = await oturum(req);
        if (!k) return hata(res, 'Bu işlem için giriş yapmalısınız.', 401);
        const id = Number(g('id', 0));
        const m = (await client.query('SELECT gonderen_id FROM mesajlar WHERE id = $1', [id])).rows[0];
        if (!m) return hata(res, 'Mesaj bulunamadı.', 404);
        if (k.rol !== 'admin' && Number(m.gonderen_id) !== Number(k.id)) return hata(res, 'Yetkisiz işlem.', 403);
        await client.query('DELETE FROM mesajlar WHERE id = $1', [id]);
        return gonder(res, 200, { ok: true });
      }

      case 'denetim-mesajlar': {
        const k = await oturum(req);
        if (!k || k.rol !== 'admin') return hata(res, 'Yetkisiz işlem.', 403);
        const q = String(g('q', ''));
        let l;
        if (q !== '') {
          l = await client.query(
            'SELECT m.*, g.ad AS g_ad, a.ad AS a_ad FROM mesajlar m LEFT JOIN uyeler g ON g.id = m.gonderen_id LEFT JOIN uyeler a ON a.id = m.alici_id WHERE m.metin ILIKE $1 ORDER BY m.olusturma DESC LIMIT 100',
            ['%' + q + '%']);
        } else {
          l = await client.query(
            'SELECT m.*, g.ad AS g_ad, a.ad AS a_ad FROM mesajlar m LEFT JOIN uyeler g ON g.id = m.gonderen_id LEFT JOIN uyeler a ON a.id = m.alici_id ORDER BY m.olusturma DESC LIMIT 100');
        }
        return gonder(res, 200, { ok: true, mesajlar: l.rows });
      }

      case 'sikayet-et': {
        const k = await oturum(req);
        if (!k) return hata(res, 'Bu işlem için giriş yapmalısınız.', 401);
        const hedef = String(g('hedef', '')); const hid = Number(g('hedef_id', 0));
        const neden = String(g('neden', '')); const aciklama = String(g('aciklama', '')).slice(0, 255);
        const nedenler = ['Hakaret / Küfür', 'Spam / Reklam', 'Yanlış bilgi', 'Kişisel bilgi paylaşımı', 'Diğer'];
        if (!['soru', 'yanit', 'mesaj'].includes(hedef)) return hata(res, 'Geçersiz hedef.');
        if (!nedenler.includes(neden)) return hata(res, 'Geçerli bir neden seçin.');
        const tablo = hedef === 'soru' ? 'sorular' : (hedef === 'yanit' ? 'yanitlar' : 'mesajlar');
        const v = await client.query('SELECT id FROM ' + tablo + ' WHERE id = $1', [hid]);
        if (!v.rows.length) return hata(res, 'Kayıt bulunamadı.', 404);
        const dup = await client.query(
          "SELECT id FROM sikayetler WHERE hedef = $1 AND hedef_id = $2 AND bildiren_id = $3 AND durum = 'bekliyor'",
          [hedef, hid, k.id]);
        if (dup.rows.length) return hata(res, 'Bu içeriği zaten şikayet ettiniz.');
        await client.query(
          'INSERT INTO sikayetler (hedef, hedef_id, neden, aciklama, bildiren_id, bildiren_ad) VALUES ($1,$2,$3,$4,$5,$6)',
          [hedef, hid, neden, aciklama || null, k.id, k.ad]);
        return gonder(res, 200, { ok: true });
      }

      case 'sikayetler': {
        const k = await oturum(req);
        if (!k || k.rol !== 'admin') return hata(res, 'Yetkisiz işlem.', 403);
        const durum = String(g('durum', ''));
        const w = (durum === 'bekliyor' || durum === 'incelendi') ? "WHERE sk.durum = '" + durum + "'" : '';
        const sql = "SELECT sk.*, COALESCE(s.baslik, LEFT(y.metin, 120), LEFT(m.metin, 120)) AS ozet, " +
          "COALESCE(s.id, y.soru_id, NULL) AS soru_id FROM sikayetler sk " +
          "LEFT JOIN sorular s ON (sk.hedef = 'soru' AND sk.hedef_id = s.id) " +
          "LEFT JOIN yanitlar y ON (sk.hedef = 'yanit' AND sk.hedef_id = y.id) " +
          "LEFT JOIN mesajlar m ON (sk.hedef = 'mesaj' AND sk.hedef_id = m.id) " +
          w + ' ORDER BY sk.olusturma DESC LIMIT 100';
        const l = await client.query(sql);
        return gonder(res, 200, { ok: true, sikayetler: l.rows });
      }

      case 'sikayet-kapat': {
        const k = await oturum(req);
        if (!k || k.rol !== 'admin') return hata(res, 'Yetkisiz işlem.', 403);
        await client.query("UPDATE sikayetler SET durum = 'incelendi' WHERE id = $1", [Number(g('id', 0))]);
        return gonder(res, 200, { ok: true });
      }

      case 'paylasimlar': {
        const kosul = []; const prm = [];
        if (g('sinif', '') !== '') { prm.push(Number(g('sinif'))); kosul.push('sinif = $' + prm.length); }
        if (g('ders', '') !== '') { prm.push(String(g('ders'))); kosul.push('ders = $' + prm.length); }
        if (g('q', '') !== '') { prm.push('%' + g('q') + '%'); prm.push('%' + g('q') + '%'); kosul.push('(baslik ILIKE $' + (prm.length - 1) + ' OR icerik ILIKE $' + prm.length + ')'); }
        const where = kosul.length ? ('WHERE ' + kosul.join(' AND ')) : '';
        const l = await client.query(
          'SELECT p.*, u.rol AS yazar_rol FROM paylasimlar p LEFT JOIN uyeler u ON u.id = p.yazar_id ' + where + ' ORDER BY p.olusturma DESC LIMIT 100', prm);
        return gonder(res, 200, { ok: true, paylasimlar: l.rows });
      }

      case 'paylasim-ekle': {
        const k = await oturum(req);
        if (!k || !['ogretmen', 'admin'].includes(k.rol)) return hata(res, 'Paylaşım yalnızca öğretmenler ve yöneticiler tarafından yapılır.', 403);
        const sinif = Number(g('sinif', 0)); const ders = String(g('ders', '')); const unite = String(g('unite', ''));
        const baslik = String(g('baslik', '')); const icerik = String(g('icerik', ''));
        if (![0, 5, 6, 7, 8].includes(sinif)) return hata(res, 'Sınıf seçimi zorunlu.');
        if (!ders) return hata(res, 'Ders seçimi zorunlu.');
        if (baslik.trim().length < 8 || icerik.trim().length < 20) return hata(res, 'Başlık ve içerik daha detaylı olmalı.');
        const ek = await client.query(
          'INSERT INTO paylasimlar (sinif, ders, unite, baslik, icerik, yazar_id, yazar_ad) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id',
          [sinif, ders, unite || '', baslik, icerik, k.id, k.ad]);
        return gonder(res, 200, { ok: true, id: ek.rows[0].id });
      }

      case 'paylasim-sil': {
        const k = await oturum(req);
        if (!k) return hata(res, 'Bu işlem için giriş yapmalısınız.', 401);
        const id = Number(g('id', 0));
        const p = (await client.query('SELECT yazar_id FROM paylasimlar WHERE id = $1', [id])).rows[0];
        if (!p) return hata(res, 'Paylaşım bulunamadı.', 404);
        if (k.rol !== 'admin' && Number(p.yazar_id) !== Number(k.id)) return hata(res, 'Yetkisiz işlem.', 403);
        await client.query('DELETE FROM paylasimlar WHERE id = $1', [id]);
        return gonder(res, 200, { ok: true });
      }

      default:
        return hata(res, 'Bilinmeyen işlem.', 404);
    }
  } catch (e) {
    console.error('[API]', islem, e);
    if (e && (e.code === '42P01' || e.code === '42703')) {
      if (String(islem).startsWith('sesli-')) return hata(res, 'Sesli görüşme veritabanı kurulumu eksik. /api/setup adresini bir kez açıp kurulumu tamamlayın.', 500);
      if (islem === 'captcha-yeni' || islem === 'captcha-dogrula') return hata(res, 'Güvenlik tabloları hazır değil. /api/setup adresini bir kez açıp kurulumu tamamlayın.', 500);
    }
    if (e && e.code === '28P01') return hata(res, 'Veritabanı kimlik doğrulaması başarısız. DATABASE_URL değerini kontrol edin.', 500);
    if (e && (e.code === 'ENOTFOUND' || e.code === 'ECONNREFUSED' || e.code === 'ETIMEDOUT')) return hata(res, 'Veritabanı bağlantısı kurulamadı. Vercel DATABASE_URL ayarını kontrol edin.', 500);
    return hata(res, 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.', 500);
  }
};
