// Ortaokulluyuz — JSON API (Vercel Serverless + Postgres).
// Ön yüz api?islem=... adresinden konuşur. Kimlik: HttpOnly çerezde JWT.
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

function gonder(res, kod, nesne) {
  res.statusCode = kod;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(nesne));
}
const hata = (res, mesaj, kod) => gonder(res, kod || 400, { ok: false, hata: mesaj });

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
  res.setHeader('Set-Cookie', c);
}
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
  const islem = (req.query && req.query.islem) || '';
  const govde = (req.method === 'POST' || req.method === 'PUT') ? await govdeOku(req) : {};
  const sorgu = req.query || {};
  const g = (ad, v) => girdi(govde, sorgu, ad, v);

  if (islem === 'ping') return gonder(res, 200, { ok: true, zaman: new Date().toISOString() });

  let client;
  try { client = pool(); }
  catch (e) { return hata(res, 'Veritabanına bağlanılamadı (DATABASE_URL).', 500); }

  try {
    switch (islem) {
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
          [k.id, k.id]);
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
        const ek = await client.query('INSERT INTO mesajlar (gonderen_id, alici_id, metin) VALUES ($1,$2,$3) RETURNING id', [k.id, alici, metin]);
        return gonder(res, 200, { ok: true, id: ek.rows[0].id });
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
    return hata(res, 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.', 500);
  }
};
