# Ortaokulluyuz V6 — Stabil arayüz + güvenlik korunarak görsel yenileme

Bu sürüm V5'teki kırılgan DOM/layout değişikliklerini geri alıp V3.1'in çalışan sayfa iskeletini baz alır.

- JS işlevleri, ID'ler ve mevcut backend/gateway yapısı korunur.
- UI yalnızca `css/theme-v6.css` ile görsel olarak yenilenir.
- Gateway, özel CAPTCHA, rate-limit, nonce/replay koruması, HttpOnly oturum ve sesli arama dosyaları korunur.
- Production'da `SECURITY_PEPPER` ve `ALLOWED_ORIGIN` önerilir.
