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
  olusturma TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  avatar TEXT NULL
);
CREATE TABLE IF NOT EXISTS sorular (
  id SERIAL PRIMARY KEY,
  sinif SMALLINT NOT NULL, ders VARCHAR(32) NOT NULL, unite VARCHAR(120) NOT NULL,
  baslik VARCHAR(200) NOT NULL, govde TEXT NOT NULL, gorsel TEXT NULL,
  yazar_id INT NULL, yazar_ad VARCHAR(120) NOT NULL,
  begeni INT NOT NULL DEFAULT 0, cozuldu BOOLEAN NOT NULL DEFAULT FALSE,
  olusturma TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE uyeler ADD COLUMN IF NOT EXISTS avatar TEXT NULL;
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
CREATE TABLE IF NOT EXISTS sms_kullanim (
  saglayici VARCHAR(24) NOT NULL, donem DATE NOT NULL, sayac INT NOT NULL DEFAULT 0,
  guncelleme TIMESTAMPTZ NOT NULL DEFAULT NOW(), PRIMARY KEY (saglayici, donem)
);
CREATE TABLE IF NOT EXISTS paylasimlar (
  id SERIAL PRIMARY KEY,
  sinif SMALLINT NOT NULL, ders VARCHAR(32) NOT NULL, unite VARCHAR(120) NOT NULL DEFAULT '',
  baslik VARCHAR(200) NOT NULL, icerik TEXT NOT NULL,
  yazar_id INT NULL, yazar_ad VARCHAR(120) NOT NULL,
  olusturma TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_paylasim_sinif_ders ON paylasimlar (sinif, ders);
CREATE TABLE IF NOT EXISTS ayarlar (anahtar TEXT PRIMARY KEY, deger TEXT NOT NULL);

CREATE TABLE IF NOT EXISTS kullanici_tercih (
  kullanici_id INT NOT NULL,
  sinif SMALLINT NOT NULL,
  ders VARCHAR(32) NOT NULL DEFAULT '',
  kitap_id VARCHAR(32) NOT NULL DEFAULT '',
  goruntuleme INT NOT NULL DEFAULT 0,
  acma INT NOT NULL DEFAULT 0,
  favori INT NOT NULL DEFAULT 0,
  indirme INT NOT NULL DEFAULT 0,
  son_etki TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (kullanici_id, sinif, ders, kitap_id)
);
CREATE INDEX IF NOT EXISTS idx_kullanici_tercih_user ON kullanici_tercih (kullanici_id, son_etki DESC);

CREATE TABLE IF NOT EXISTS sesli_arama (
  id VARCHAR(64) PRIMARY KEY,
  arayan_id INT NOT NULL,
  aranan_id INT NOT NULL,
  durum VARCHAR(16) NOT NULL DEFAULT 'caliyor',
  teklif JSONB NULL,
  yanit JSONB NULL,
  olusturma TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  guncelleme TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_sesli_arama_aranan ON sesli_arama (aranan_id, durum, guncelleme DESC);
CREATE INDEX IF NOT EXISTS idx_sesli_arama_arayan ON sesli_arama (arayan_id, durum, guncelleme DESC);
CREATE TABLE IF NOT EXISTS sesli_sinyal (
  id BIGSERIAL PRIMARY KEY,
  arama_id VARCHAR(64) NOT NULL REFERENCES sesli_arama(id) ON DELETE CASCADE,
  gonderen_id INT NOT NULL,
  sinyal JSONB NOT NULL,
  olusturma TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_sesli_sinyal_arama ON sesli_sinyal (arama_id, id);


CREATE TABLE IF NOT EXISTS captcha_zorluk (
  token_hash CHAR(64) PRIMARY KEY,
  soru VARCHAR(240) NOT NULL,
  cevap_hash CHAR(64) NOT NULL,
  ip_hash CHAR(64) NOT NULL,
  deneme SMALLINT NOT NULL DEFAULT 0,
  kullanildi BOOLEAN NOT NULL DEFAULT FALSE,
  bitis TIMESTAMPTZ NOT NULL,
  olusturma TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_captcha_bitis ON captcha_zorluk (bitis);

CREATE TABLE IF NOT EXISTS captcha_gecis (
  token_hash CHAR(64) PRIMARY KEY,
  ip_hash CHAR(64) NOT NULL,
  bitis TIMESTAMPTZ NOT NULL,
  kullanim INT NOT NULL DEFAULT 0,
  olusturma TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_captcha_gecis_bitis ON captcha_gecis (bitis);

CREATE TABLE IF NOT EXISTS guvenlik_hiz_sinir (
  anahtar_hash CHAR(64) NOT NULL,
  islem VARCHAR(40) NOT NULL,
  pencere BIGINT NOT NULL,
  sayac INT NOT NULL DEFAULT 0,
  PRIMARY KEY (anahtar_hash, islem, pencere)
);
CREATE INDEX IF NOT EXISTS idx_guvenlik_hiz_pencere ON guvenlik_hiz_sinir (pencere);

CREATE TABLE IF NOT EXISTS guvenlik_nonce (
  nonce_hash CHAR(64) PRIMARY KEY,
  bitis TIMESTAMPTZ NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_guvenlik_nonce_bitis ON guvenlik_nonce (bitis);
