# Ortaokulluyuz V8 UI Güncellemesi

## Header
- Kullanıcı adı/rol/işlemler artık taşmayan kompakt açılır menüde.
- Masaüstünde navigasyon taşma yapmadan yatay kaydırılabilir.
- Orta/küçük ekranlarda navigasyon mobil menüye geçer.

## Profil
- Yeni kişisel çalışma alanı başlığı.
- Profil hero kartı ve avatar baş harfleri.
- Favori, forum sorusu, not ve çalışma odağı metrikleri.
- Favori kitap listesi.
- Sınıf bazlı kişiselleştirme dağılımı.
- Son forum soruları.
- Hesap güvenliği ve şifre değiştirme bölümü.

## Yönetim
- Yönetici hero alanı.
- Ortak veritabanı / güvenlik katmanı / aktif yönetici sistem durumu kartları.
- Metrik kartları.
- Daha okunabilir kullanıcı yönetim tablosu.
- Mesaj denetimi, e-posta testi ve şikayetler için ayrı paneller.

## Uyumluluk
- Mevcut JS fonksiyon adları ve DOM kimlikleri korunmuştur.
- Backend, PostgreSQL, gateway, CAPTCHA, rate-limit, nonce ve WebRTC kodlarına dokunulmamıştır.
- Cache busting: theme-v7?v=8, ikon.js?v=8, layout.js?v=14, app.js?v=14.
