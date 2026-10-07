# Ortaokulluyuz Matematik V14

Bu platform `Ortaokulluyuz` çatısı altında `/matematik/` yolu üzerinden çalışır. Ayrı kullanıcı tabanı oluşturmaz.

## Ortak hesap
- Aynı `ook_token` HttpOnly oturumu kullanılır.
- Aynı PostgreSQL `uyeler` tablosu kullanılır.
- Aynı Google OAuth Client ID kullanılır: `GOOGLE_CLIENT_ID`.
- Aynı mesaj tabloları kullanılır; Matematik mesajları ana platformla aynıdır.
- Profil/rol/avatar ana platformdaki hesapla aynıdır.

## AI Reader
Vercel Environment Variables:

```text
GEMINI_API_KEY=...
GEMINI_MATH_MODEL=gemini-3.5-flash-lite
```

`GEMINI_MATH_MODEL` opsiyoneldir; varsayılan model `gemini-3.5-flash-lite` kullanılır. Görsel çözüm istekleri sunucu tarafında Gemini API üzerinden yapılır; API anahtarı tarayıcıya gönderilmez.

Reader iki mod içerir:
- Bir soru: görseldeki ana soruyu adım adım çöz.
- Tüm sayfa: görseldeki çözülebilir matematik sorularını sırayla çöz.

## TextBee / telefon
Mevcut `TEXTBEE_API_KEY` ve `TEXTBEE_DEVICE_ID` ayarları ana platformla aynen paylaşılır. Matematik platformu ayrı SMS sistemi oluşturmaz.

## Kurulum
Mevcut `/api/setup` adresini aynı `SETUP_KEY` ile bir kez daha çalıştırmak yeterlidir. `matematik_istatistik` tablosu oluşturulur.

## İstatistik senkronizasyonu
Matematik etkinlikleri kullanıcı ID üzerinden `matematik_istatistik` tablosunda tutulur:
- hesap
- ai
- soru
- geometri
- pi

Bu tablo ana `uyeler` hesabına bağlıdır. Kullanıcı hesabı değişmez; platformlar arası kimlik aynıdır.

## Özellikler
- 5–8. sınıf konu/grade seçimi
- Görsel AI Reader
- Bir soru / tüm sayfa çözümü
- Adım adım matematik hesap makinesi
- Zorluk seçimi
- BigInt tabanlı Machin serisi ile gerçek π hesabı
- SVG geometri çizim alanı
- Doğru, dikdörtgen, çember, nokta, cetvel ve açı araçları
- Ortak soru/yardım forumu
- Ortak mesajlaşma
- Yönetim paneli ve matematik istatistikleri
- Ana Ortaokulluyuz hesabına dönüş
