# Ortaokulluyuz V10 — Telefon Kaydı + Tek JS + Güvenlik

- Telefon/e-posta kayıt ekranı `kayit.html` olarak ayrıldı.
- TextBee SMS doğrulaması mevcut `telefon-kayit` akışına bağlandı; `TEXTBEE_API_KEY` ve opsiyonel `TEXTBEE_DEVICE_ID` Vercel env'den okunur.
- Tüm yerel JS modülleri `js/app.bundle.js` içinde tek dosyada birleştirildi; kaynaklar `js/source/` altında tutulur ve HTML'den yüklenmez.
- DevTools davranışına karşı klavye/context-menu engeli ve iki sinyalli istemci tespiti eklendi. Tespit server'a `devtools-rapor` olarak gider.
- Server `guvenlik_ip_yasak` tablosunda IP hashini 60 dakika varsayılan süreyle banlar. `DEVTOOLS_BAN_MINUTES` değiştirilebilir.
- `ADMIN_IP_ALLOWLIST` virgülle ayrılmış gerçek IP adreslerini alır; listedeki IP'ler ban sisteminden muaftır.
- `ip-durum`/`ping` banlı IP'de `IP_BANNED` döndürür ve istemci siteyi bloklayan overlay gösterir.
- Not: DevTools'un tarayıcıdan %100 güvenilir tespiti mümkün değildir; bunu tamamlayıcı bir katman olarak düşünün.

## Vercel

```text
ADMIN_IP_ALLOWLIST=203.0.113.10
DEVTOOLS_BAN_MINUTES=60
TEXTBEE_API_KEY=...
TEXTBEE_DEVICE_ID=6ac0ca5acf8e7692e0fc5ede
```

`ADMIN_IP_ALLOWLIST` içine kendi public IPv4 adresini yaz. Birden fazla adres: `1.2.3.4,5.6.7.8`. Dinamik IP değişirse listeyi güncellemek gerekir.
