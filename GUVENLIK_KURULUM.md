# Güvenlik güncellemesi

- Üretim API çağrıları `/api/gateway` üzerinden kısa işlem kodlarıyla gider.
- Eski `?islem=` API yolu kapatıldı; yalnızca `/api/gateway` kabul edilir.
- DB tabanlı özel CAPTCHA: `captcha_zorluk` + `captcha_gecis`. CAPTCHA 3 dakika, doğrulama geçiş tokenı 20 dakika geçerlidir; geçiş tokenı HttpOnly cookie olarak tutulur ve istemci JavaScript'ine verilmez.
- CAPTCHA geçiş tokenı IP hash ile bağlanır, 25 kullanımla sınırlandırılır.
- DB tabanlı genel/işlem bazlı rate-limit eklendi.
- POST isteklerinde Origin / Sec-Fetch-Site kontrolü bulunur.
- API yanıtlarında no-store ve temel güvenlik başlıkları vardır.

## Vercel Environment Variables

`SECURITY_PEPPER`: en az 32 rastgele karakter. `JWT_SECRET` ile aynı yapmak yerine ayrı bir secret kullanın.

`ALLOWED_ORIGIN`: isteğe bağlı; örnek `https://ortaokulluyuz.dpdns.org`. Tanımlanmazsa istek hostu kullanılır.

`SECURITY_PEPPER` yoksa sistem `JWT_SECRET` ile devam eder; ancak production'da ayrı bir secret kullanılması önerilir.

TURN değişkenleri mevcut sistemdeki gibi kullanılmaya devam eder.

> Bu CAPTCHA, Cloudflare Turnstile seviyesinde bot analizi yapmaz. Token, kısa süre, IP bağlama ve rate-limit ile birlikte hafif/yerel bir bot bariyeridir.


### DevTools ban istisnası
Vercel Environment Variables: `ADMIN_IP_ALLOWLIST` — virgülle ayrılmış public IP adresleri. Örnek: `203.0.113.10,198.51.100.7`. Bu listede olan IP adresleri DevTools banından muaftır. `DEVTOOLS_BAN_MINUTES` varsayılan 60 dakikadır.
