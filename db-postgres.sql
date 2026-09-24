-- Ortaokulluyuz — manuel kurulum (Neon / Postgres SQL editörüne yapıştırın)
-- Normalde /api/setup adresindeki sihirbaz yeterlidir; bu dosya alternatiftir.
-- Yöneticiyi setup sihirbazıyla oluşturun (parola bcrypt ile saklanır).
CREATE TABLE IF NOT EXISTS uyeler (
  id SERIAL PRIMARY KEY,
  ad VARCHAR(120) NOT NULL, eposta VARCHAR(160) UNIQUE,
  parola VARCHAR(255) NOT NULL,
  rol VARCHAR(16) NOT NULL DEFAULT 'ogrenci' CHECK (rol IN ('ogrenci','ogretmen','veli','admin')),
  eposta_onay BOOLEAN NOT NULL DEFAULT TRUE,
  telefon VARCHAR(20) NULL UNIQUE,
  olusturma TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS sorular (
  id SERIAL PRIMARY KEY,
  sinif SMALLINT NOT NULL, ders VARCHAR(32) NOT NULL, unite VARCHAR(120) NOT NULL,
  baslik VARCHAR(200) NOT NULL, govde TEXT NOT NULL, gorsel TEXT NULL,
  yazar_id INT NULL, yazar_ad VARCHAR(120) NOT NULL,
  begeni INT NOT NULL DEFAULT 0, cozuldu BOOLEAN NOT NULL DEFAULT FALSE,
  olusturma TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_sorular_sinif_ders ON sorular (sinif, ders);
CREATE TABLE IF NOT EXISTS yanitlar (
  id SERIAL PRIMARY KEY,
  soru_id INT NOT NULL REFERENCES sorular(id) ON DELETE CASCADE,
  yazar_id INT NULL, yazar_ad VARCHAR(120) NOT NULL,
  metin TEXT NOT NULL, begeni INT NOT NULL DEFAULT 0, dogru BOOLEAN NOT NULL DEFAULT FALSE,
  olusturma TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_yanitlar_soru ON yanitlar (soru_id);
CREATE TABLE IF NOT EXISTS begeniler (
  id SERIAL PRIMARY KEY,
  kullanici_id INT NOT NULL, hedef VARCHAR(8) NOT NULL, hedef_id INT NOT NULL,
  UNIQUE (kullanici_id, hedef, hedef_id)
);
CREATE TABLE IF NOT EXISTS favoriler (
  kullanici_id INT NOT NULL, kitap_id VARCHAR(32) NOT NULL,
  eklenme TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (kullanici_id, kitap_id)
);
CREATE TABLE IF NOT EXISTS mesajlar (
  id SERIAL PRIMARY KEY,
  gonderen_id INT NOT NULL, alici_id INT NOT NULL,
  metin TEXT NOT NULL, okundu BOOLEAN NOT NULL DEFAULT FALSE,
  olusturma TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_mesajlar_taraflar ON mesajlar (gonderen_id, alici_id);
CREATE TABLE IF NOT EXISTS sikayetler (
  id SERIAL PRIMARY KEY,
  hedef VARCHAR(8) NOT NULL, hedef_id INT NOT NULL,
  neden VARCHAR(60) NOT NULL, aciklama VARCHAR(255) NULL,
  bildiren_id INT NULL, bildiren_ad VARCHAR(120) NOT NULL,
  durum VARCHAR(16) NOT NULL DEFAULT 'bekliyor',
  olusturma TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS dogrulama (
  id SERIAL PRIMARY KEY,
  eposta VARCHAR(160) NOT NULL, kod_hash VARCHAR(255) NOT NULL,
  deneme SMALLINT NOT NULL DEFAULT 0,
  bitis TIMESTAMPTZ NOT NULL, olusturma TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_dogrulama_eposta ON dogrulama (eposta);
CREATE TABLE IF NOT EXISTS paylasimlar (
  id SERIAL PRIMARY KEY,
  sinif SMALLINT NOT NULL, ders VARCHAR(32) NOT NULL, unite VARCHAR(120) NOT NULL DEFAULT '',
  baslik VARCHAR(200) NOT NULL, icerik TEXT NOT NULL,
  yazar_id INT NULL, yazar_ad VARCHAR(120) NOT NULL,
  olusturma TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_paylasim_sinif_ders ON paylasimlar (sinif, ders);
CREATE TABLE IF NOT EXISTS ayarlar (anahtar TEXT PRIMARY KEY, deger TEXT NOT NULL);
