# Ortaokulluyuz V9 — Avatar + Görsel Tasarım

- Avatar yükleme PNG/JPG/WebP kabul eder; tarayıcıda 320 px'e küçültülür ve sıkıştırılır.
- Sunucu yalnızca doğrulanmış PNG/JPEG/WebP data URL kabul eder; magic-byte kontrolü ve 220 KB ham dosya sınırı uygulanır.
- Avatar PostgreSQL `uyeler.avatar` alanında tutulur. Mevcut DB için `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` migration vardır.
- Avatar profil, üst kullanıcı menüsü, yönetim kullanıcı listesi ve özel mesaj listelerinde kullanılır.
- V8 görsel katmanı V7 DOM sözleşmesini korur; canlı renkler, cam yüzeyler, hareketli ışıklar, hover/scroll mikro animasyonları ve günlük kullanıma uygun Nunito Sans + Rubik fontları kullanılır.
- Production cache için api/auth/mesaj/app/layout ve tema sorgu sürümleri yükseltildi.
