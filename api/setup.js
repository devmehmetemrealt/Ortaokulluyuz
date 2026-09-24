// Ortaokulluyuz — tek seferlik kurulum (Vercel + Postgres).
// Kullanım: siteniz.com/api/setup adresini açın, kurulum anahtarı + yönetici
// bilgilerini girin. Tablolar kurulur, yönetici oluşur, örnek içerik taşınır.
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const DDL = [
  `CREATE TABLE IF NOT EXISTS uyeler (
    id SERIAL PRIMARY KEY,
    ad VARCHAR(120) NOT NULL, eposta VARCHAR(160) NOT NULL UNIQUE,
    parola VARCHAR(255) NOT NULL,
    rol VARCHAR(16) NOT NULL DEFAULT 'ogrenci' CHECK (rol IN ('ogrenci','ogretmen','veli','admin')),
    eposta_onay BOOLEAN NOT NULL DEFAULT TRUE,
    olusturma TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS sorular (
    id SERIAL PRIMARY KEY,
    sinif SMALLINT NOT NULL, ders VARCHAR(32) NOT NULL, unite VARCHAR(120) NOT NULL,
    baslik VARCHAR(200) NOT NULL, govde TEXT NOT NULL, gorsel TEXT NULL,
    yazar_id INT NULL, yazar_ad VARCHAR(120) NOT NULL,
    begeni INT NOT NULL DEFAULT 0, cozuldu BOOLEAN NOT NULL DEFAULT FALSE,
    olusturma TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
  `CREATE INDEX IF NOT EXISTS idx_sorular_sinif_ders ON sorular (sinif, ders)`,
  `CREATE TABLE IF NOT EXISTS yanitlar (
    id SERIAL PRIMARY KEY,
    soru_id INT NOT NULL REFERENCES sorular(id) ON DELETE CASCADE,
    yazar_id INT NULL, yazar_ad VARCHAR(120) NOT NULL,
    metin TEXT NOT NULL, begeni INT NOT NULL DEFAULT 0, dogru BOOLEAN NOT NULL DEFAULT FALSE,
    olusturma TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
  `CREATE INDEX IF NOT EXISTS idx_yanitlar_soru ON yanitlar (soru_id)`,
  `CREATE TABLE IF NOT EXISTS begeniler (
    id SERIAL PRIMARY KEY,
    kullanici_id INT NOT NULL, hedef VARCHAR(8) NOT NULL, hedef_id INT NOT NULL,
    UNIQUE (kullanici_id, hedef, hedef_id)
  )`,
  `CREATE TABLE IF NOT EXISTS favoriler (
    kullanici_id INT NOT NULL, kitap_id VARCHAR(32) NOT NULL,
    eklenme TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (kullanici_id, kitap_id)
  )`,
  `CREATE TABLE IF NOT EXISTS mesajlar (
    id SERIAL PRIMARY KEY,
    gonderen_id INT NOT NULL, alici_id INT NOT NULL,
    metin TEXT NOT NULL, okundu BOOLEAN NOT NULL DEFAULT FALSE,
    olusturma TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
  `CREATE INDEX IF NOT EXISTS idx_mesajlar_taraflar ON mesajlar (gonderen_id, alici_id)`,
  `CREATE TABLE IF NOT EXISTS sikayetler (
    id SERIAL PRIMARY KEY,
    hedef VARCHAR(8) NOT NULL, hedef_id INT NOT NULL,
    neden VARCHAR(60) NOT NULL, aciklama VARCHAR(255) NULL,
    bildiren_id INT NULL, bildiren_ad VARCHAR(120) NOT NULL,
    durum VARCHAR(16) NOT NULL DEFAULT 'bekliyor',
    olusturma TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS dogrulama (
    id SERIAL PRIMARY KEY,
    eposta VARCHAR(160) NOT NULL, kod_hash VARCHAR(255) NOT NULL,
    deneme SMALLINT NOT NULL DEFAULT 0,
    bitis TIMESTAMPTZ NOT NULL, olusturma TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
  `CREATE INDEX IF NOT EXISTS idx_dogrulama_eposta ON dogrulama (eposta)`,
  `CREATE TABLE IF NOT EXISTS ayarlar (anahtar TEXT PRIMARY KEY, deger TEXT NOT NULL)`,
];

function govdeOku(req) {
  return new Promise((resolve) => {
    if (req.body && typeof req.body === 'object') return resolve(req.body);
    let v = '';
    req.on('data', (p) => { v += p; });
    req.on('end', () => { try { resolve(v ? JSON.parse(v) : {}); } catch (e) { resolve({}); } });
  });
}
function sayfa(mesaj, tur) {
  const kutu = mesaj
    ? '<div class="' + (tur === 'ok' ? 'ok' : 'hata') + '">' + mesaj + '</div>'
    : '';
  return '<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8" />' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0" />' +
    '<title>Ortaokulluyuz — Kurulum</title><style>' +
    'body{font-family:Arial,sans-serif;background:#eef1f6;margin:0;padding:32px 16px;color:#1e293b}' +
    '.kutu{max-width:520px;margin:0 auto;background:#fff;border:1px solid #dde3ee;border-top:4px solid #c8102e;border-radius:12px;padding:28px}' +
    'h1{font-size:20px;color:#0b2a5b;margin:0 0 4px}.alt{font-size:13px;color:#64748b;margin-bottom:18px}' +
    'label{font-size:12.5px;font-weight:600;display:block;margin:12px 0 4px}' +
    'input{width:100%;border:1px solid #dde3ee;border-radius:8px;padding:9px 11px;font-size:14px;box-sizing:border-box}' +
    'button{background:#1b4f9c;color:#fff;border:none;border-radius:8px;padding:11px;width:100%;font-size:15px;margin-top:18px;cursor:pointer}' +
    '.hata{background:#fdeaea;border:1px solid #f3b3bf;color:#8f0f24;border-radius:8px;padding:10px 12px;font-size:13.5px}' +
    '.ok{background:#f0fdf4;border:1px solid #86efac;color:#166534;border-radius:8px;padding:10px 12px;font-size:13.5px}' +
    '</style></head><body><div class="kutu">' +
    '<h1>Ortaokulluyuz — Veritabanı Kurulumu</h1>' +
    '<div class="alt">Tabloları oluşturur, yönetici hesabını tanımlar, örnek forum içeriğini taşır. Tek seferliktir.</div>' +
    kutu +
    '<form method="post">' +
    '<label>Kurulum anahtarı (Vercel SETUP_KEY ile aynı olmalı)</label><input name="anahtar" required autocomplete="off" />' +
    '<label>Yönetici adı</label><input name="admin_ad" required />' +
    '<label>Yönetici e-postası</label><input name="admin_eposta" type="email" required />' +
    '<label>Yönetici şifresi (en az 6 karakter)</label><input name="admin_sifre" type="password" required />' +
    '<button type="submit">Kurulumu Başlat</button></form></div></body></html>';
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  if (req.method !== 'POST') return res.end(sayfa('', ''));
  const govde = await govdeOku(req);
  // form-urlencoded da gelebilir
  let g = govde;
  if ((!g || !g.anahtar) && typeof req.body === 'string' && req.body.includes('=')) {
    g = {};
    req.body.split('&').forEach((p) => {
      const i = p.indexOf('=');
      if (i > 0) g[decodeURIComponent(p.slice(0, i))] = decodeURIComponent(p.slice(i + 1).replace(/\+/g, ' '));
    });
  }
  const anahtar = String(g.anahtar || '').trim();
  const adminAd = String(g.admin_ad || '').trim();
  const adminEposta = String(g.admin_eposta || '').trim().toLowerCase();
  const adminSifre = String(g.admin_sifre || '');
  if (!process.env.SETUP_KEY || anahtar !== process.env.SETUP_KEY)
    return res.end(sayfa('Kurulum anahtarı hatalı.', 'hata'));
  if (adminAd.length < 3) return res.end(sayfa('Yönetici adı en az 3 karakter olmalı.', 'hata'));
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(adminEposta)) return res.end(sayfa('Geçerli bir e-posta yazın.', 'hata'));
  if (adminSifre.length < 6) return res.end(sayfa('Yönetici şifresi en az 6 karakter olmalı.', 'hata'));
  if (!process.env.DATABASE_URL) return res.end(sayfa('DATABASE_URL tanımlı değil.', 'hata'));

  const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  try {
    for (const sql of DDL) await pool.query(sql);
    const bayrak = await pool.query("SELECT deger FROM ayarlar WHERE anahtar = 'kurulum'");
    if (bayrak.rows.length) {
      await pool.end();
      return res.end(sayfa('Site zaten kurulu.', 'ok'));
    }
    const mevcut = await pool.query('SELECT id FROM uyeler WHERE eposta = $1', [adminEposta]);
    let adminId;
    if (mevcut.rows.length) {
      adminId = mevcut.rows[0].id;
      await pool.query("UPDATE uyeler SET ad = $1, parola = $2, rol = 'admin', eposta_onay = TRUE WHERE id = $3",
        [adminAd, await bcrypt.hash(adminSifre, 10), adminId]);
    } else {
      const ek = await pool.query(
        "INSERT INTO uyeler (ad, eposta, parola, rol, eposta_onay) VALUES ($1,$2,$3,'admin',TRUE) RETURNING id",
        [adminAd, adminEposta, await bcrypt.hash(adminSifre, 10)]);
      adminId = ek.rows[0].id;
    }
    const sayi = await pool.query('SELECT COUNT(*) c FROM sorular');
    if (Number(sayi.rows[0].c) === 0) {
      const ornek = [
        [8, 'matematik', 'Kareköklü İfadeler', '√48 + √27 işleminin sonucu nedir?',
          'Paydaları eşitleyemedim, kök dışına çıkarma kısmında takıldım. Adım adım anlatabilir misiniz?', 14, true,
          [['M. Demir (Öğretmen)', '√48 = 4√3, √27 = 3√3. Toplam 7√3 olur. Kök içini asal çarpanlarına ayır: 48=16×3, 27=9×3.', 22, true]]],
        [6, 'fen', 'Ses ve Özellikleri', 'Ses boşlukta neden yayılmaz?',
          'Öğretmenimiz deney yapacağız dedi, önceden okumak istiyorum.', 8, true,
          [['S. Aydın (Öğretmen)', 'Ses mekanik dalgadır, yayılmak için maddesel ortama ihtiyaç duyar. Boşlukta tanecik olmadığı için yayılmaz.', 17, true]]],
        [7, 'turkce', 'Fiillerde Kip ve Kişi', 'Dilek kipleri ile istek kipi arasındaki fark?',
          "'Gelesin, gideyim, yapalım' örneklerinde hangisi hangi kip?", 6, false, []],
      ];
      for (const o of ornek) {
        const s = await pool.query(
          'INSERT INTO sorular (sinif, ders, unite, baslik, govde, yazar_id, yazar_ad, begeni, cozuldu) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id',
          [o[0], o[1], o[2], o[3], o[4], adminId, 'Site Yöneticisi', o[5], o[6]]);
        for (const y of o[7]) {
          await pool.query('INSERT INTO yanitlar (soru_id, yazar_id, yazar_ad, metin, begeni, dogru) VALUES ($1,$2,$3,$4,$5,$6)',
            [s.rows[0].id, adminId, y[0], y[1], y[2], y[3]]);
        }
      }
    }
    await pool.query("INSERT INTO ayarlar (anahtar, deger) VALUES ('kurulum', 'tamam') ON CONFLICT (anahtar) DO NOTHING");
    await pool.end();
    return res.end(sayfa('Kurulum tamamlandı. Yönetici bilgilerinizle giriş yapabilirsiniz.', 'ok'));
  } catch (e) {
    try { await pool.end(); } catch (e2) {}
    return res.end(sayfa('Kurulum başarısız: ' + e.message, 'hata'));
  }
};
