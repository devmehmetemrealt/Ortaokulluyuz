# V13 güncelleme notları

- Giriş artık ayrı `giris.html` sayfasında.
- Kayıt zaten ayrı `kayit.html` sayfasında; iki sayfa karşılıklı bağlantılı.
- Google giriş butonu standalone giriş kartında ayrılmış ve ortalanmış.
- Çıkış sonrası `index.html` yönlendirmesi eklendi.
- Yeni SVG logo `img/logo.svg` ile yenilendi.
- F12 ve Ctrl+Shift+I/J/C/K DevTools kısayolları yakalanır, varsayılan davranış engellenir ve sunucuya devtools raporu gönderilir. Yönetici hesapları/IP allowlist muaf kalır.
- Standalone girişte doğrulama formu desteklendi; telefonla girişte doğrulama hedefi telefon olarak gösterilir.
- Mevcut gateway, CAPTCHA, rate-limit, nonce ve TextBee altyapısı korunmuştur.

Not: Web sitesinin tarayıcı menüsünden açılan DevTools'u yüzde yüz güvenilir biçimde engellemesi mümkün değildir; kısayol raporu server-side IP cezasını tetikler.
