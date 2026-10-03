# TextBee SMS kurulumu

Bu sürüm telefonla kayıt/doğrulama SMS'lerini TextBee üzerinden gönderir.

## Vercel Environment Variables

Sadece API anahtarı zorunludur:

- `TEXTBEE_API_KEY` = TextBee Dashboard > API Keys > oluşturduğun anahtar

İsteğe bağlı:

- `TEXTBEE_DEVICE_ID` = `6ac0ca5acf8e7692e0fc5ede` (cihazın değişirse güncelle)
- `SMS_MODU` = `textbee` (TEXTBEE_API_KEY tanımlıysa boş bırakılınca da otomatik textbee seçilir)
- `TEXTBEE_MONTHLY_LIMIT` = `250` (site tarafındaki koruma limiti)

API anahtarı frontend'e gönderilmez; yalnızca Vercel serverless API'de kullanılır.

## Gönderim

Sunucu aşağıdaki isteği yapar:

`POST https://api.textbee.dev/api/v1/gateway/send-sms`

Headers:

- `x-api-key: TEXTBEE_API_KEY`
- `Content-Type: application/json`

Body:

```json
{
  "deviceId": "6ac0ca5acf8e7692e0fc5ede",
  "recipients": ["+905xxxxxxxxx"],
  "message": "Ortaokulluyuz dogrulama kodunuz: 123456 (15 dakika gecerli)"
}
```

## Kota koruması

PostgreSQL'de `sms_kullanim` tablosu oluşturulur. Başarılı gönderim öncesi bir slot ayrılır; sağlayıcı hatası olursa slot geri bırakılır. Varsayılan site içi aylık limit 250'dir.

Telefon kayıt işleminde SMS gönderilemezse kullanıcı kaydı geri alınır; böylece SMS sağlayıcısı kurulmadan sahte/yarım hesap oluşmaz.
