# Ortaokulluyuz — Güncelleme Notları

Bu sürüm Vercel + mevcut Postgres yapısını bozmadan üç ana alanı yeniler:

## 1. Kişiselleştirilmiş öneriler
- Kullanıcının gezdiği sınıf ve dersler takip edilir.
- Kitap açma, favoriye ekleme ve PDF indirme gibi etkileşimler öneri skoruna katkı verir.
- Kullanıcı 6. sınıf içeriklerine ağırlık veriyorsa ana sayfadaki “Senin için” alanında 6. sınıf kitapları öne çıkar.
- Giriş yapmayan kullanıcı için `localStorage`, giriş yapan kullanıcı için Postgres destekli profil kullanılır.

## 2. Mesajlaşma düzeltmeleri
- `sohbetler` sorgusundaki fazla SQL parametresi düzeltildi; sunucu modunda sohbet listesinin hata vermesine neden olan hata giderildi.
- Mesaj gönderirken tüm mesaj sayfasının yeniden çizilmesi kaldırıldı.
- Gönderim sırasında çift tıklama/çift gönderim engellendi.
- Sohbet listesi, gönderim sonrasında güncellenir.

## 3. 1'e 1 sesli görüşme
- Mesaj ekranındaki kullanıcı sohbetine “🎙️ Sesli ara” düğmesi eklendi.
- WebRTC + Postgres sinyalleşmesi kullanılır; ses kaydı uygulamaya yüklenmez.
- Gelen arama için Kabul Et / Reddet, görüşme için kapatma işlemi bulunur.
- Mikrofon erişimi HTTPS altında tarayıcı izniyle yapılır.
- NAT/kurumsal ağ kısıtları nedeniyle bazı ağlarda WebRTC bağlantısı kurulamayabilir; bu sürümde STUN sunucuları kullanılır, TURN sunucusu dahil değildir.

## 4. Arayüz yenilemesi
- Gradient ağırlıklı görünüm sadeleştirildi.
- Daha düz, editoryal ve eğitim odaklı kartlar/navigasyon kullanıldı.
- Ana sayfaya kişiselleştirilmiş kitap alanı eklendi.
- Mesaj ekranı ve sesli görüşme katmanı yeni görsel stile uyarlandı.

## Vercel / veritabanı
Mevcut `/api/setup` sihirbazı yeni tabloları da oluşturacak şekilde güncellendi. Mevcut veriyi silmez.

Önerilen tablolar:
- `kullanici_tercih`
- `sesli_arama`
- `sesli_sinyal`

Mevcut üretim veritabanında manuel SQL kullanacaksanız `db-postgres.sql` dosyasındaki yeni bölümleri çalıştırmanız yeterlidir.

## Not
Bu paketi Vercel'e yüklediğinizde mevcut environment variable'lar (`DATABASE_URL`, `JWT_SECRET`, vb.) korunmalıdır. WebRTC için ek bir Vercel değişkeni gerekmiyor.
