# Ortaokulluyuz V5 — Güvenlik ve kurulum

## Uygulanan katmanlar

- Üretim istemci trafiği yalnızca `/api/gateway` POST endpoint'inden geçer; eski `?islem=` yolu kapalıdır.
- Gateway isteklerinde timestamp + tek kullanımlık nonce + IP/UA bağı vardır; aynı istek tekrar oynatılamaz.
- POST isteklerinde Origin / Sec-Fetch-Site kontrolü vardır.
- HttpOnly, Secure, `__Host-` JWT cookie; SameSite=Strict.
- JWT ayrıca PostgreSQL'deki `guvenlik_oturum` kaydıyla doğrulanır; JTI + IP + User-Agent bağı vardır.
- Kullanıcı başına canlı oturum sayısı sınırlandırılır.
- DB tabanlı rate-limit üç eksende çalışır: cihaz/IP+UA, IP ve hassas hesap/hedef.
- Giriş ve kayıt işlemlerinde honeypot alanı vardır.
- Özel CAPTCHA kendi PostgreSQL tablolarında tutulur. Challenge 3 dakika, guard 20 dakika geçerlidir.
- CAPTCHA tokenı istemciye işlem izni olarak dönmez; guard HttpOnly cookie içinde tutulur.
- CAPTCHA'ya kısa bir proof-of-work (SHA-256) katmanı eklenmiştir; challenge ile bağlanır ve tek kullanımlıdır.
- CAPTCHA/guard kayıtları IP ve User-Agent hash'i ile eşleştirilir.
- Güvenlik tabloları ilk API isteğinde otomatik migrate edilir.
- API ve genel deployment için CSP, HSTS, frame, referrer, MIME ve permissions başlıkları eklenmiştir.
- `/api/gateway` sağlık kontrolü PostgreSQL + JWT_SECRET + SECURITY_PEPPER hazır olmadan başarılı sayılmaz; production yerel moda düşmez.
- Production domain üzerinde Vercel/Postgres erişimi başarısız olursa localStorage fallback'i kapalıdır; site sahte yerel oturuma düşmez.

## Vercel Environment Variables

Zorunlu / önerilen:

- `DATABASE_URL` — PostgreSQL bağlantısı
- `JWT_SECRET` — en az 32 rastgele karakter
- `SECURITY_PEPPER` — en az 32 rastgele karakter; `JWT_SECRET` ile aynı OLMAMALI
- `ALLOWED_ORIGIN` — `https://ortaokulluyuz.dpdns.org`
- `SETUP_KEY` — uzun ve rastgele kurulum anahtarı

TURN kullanıyorsan:

- `TURN_URLS`
- `TURN_USERNAME`
- `TURN_CREDENTIAL`

Örnek secret üretimi:

```bash
openssl rand -base64 48
```

CAPTCHA için ayrıca herhangi bir Cloudflare/Google servisi zorunlu değildir.

> Not: Bu özel CAPTCHA bir WAF veya Cloudflare Turnstile alternatifi değildir. Uygulama katmanında bot maliyetini artıran, token süreli, DB tabanlı bir challenge sistemidir. En güçlü sonuç için Vercel'in sağladığı edge/network korumaları ve doğru rate-limit ayarları da korunmalıdır.
