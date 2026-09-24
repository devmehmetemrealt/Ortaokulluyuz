/* Ortaokulluyuz — MEB Müfredat Verisi (2025-2026 / Türkiye Yüzyılı Maarif Modeli) */
const MUfredat = {
  siniflar: [5, 6, 7, 8],
  dersler: [
    { id: "turkce", ad: "Türkçe", renk: "#1B4F9C", ikon: "TR" },
    { id: "matematik", ad: "Matematik", renk: "#0E7C3E", ikon: "MT" },
    { id: "fen", ad: "Fen Bilimleri", renk: "#B45309", ikon: "FB" },
    { id: "sosyal", ad: "Sosyal Bilgiler", siniflar: [5, 6, 7], renk: "#7C3AED", ikon: "SB" },
    { id: "inkilap", ad: "T.C. İnkılap Tarihi ve Atatürkçülük", siniflar: [8], renk: "#7C3AED", ikon: "İN" },
    { id: "ingilizce", ad: "İngilizce", renk: "#C2410C", ikon: "EN" },
    { id: "din", ad: "Din Kültürü ve Ahlak Bilgisi", renk: "#0F766E", ikon: "DK" },
    { id: "almanca", ad: "Almanca", renk: "#0F766E", ikon: "AL" },
    { id: "beden", ad: "Beden Eğitimi ve Spor", renk: "#15803d", ikon: "BE" },
    { id: "bilisim", ad: "Bilişim Teknolojileri ve Yazılım", renk: "#0369a1", ikon: "BT" },
    { id: "muzik", ad: "Müzik", renk: "#a21caf", ikon: "MÜ" },
    { id: "gorsel", ad: "Görsel Sanatlar", renk: "#db2777", ikon: "GS" },
    { id: "sec-ahlak", ad: "Ahlak ve Vatandaşlık Eğitimi", renk: "#7C3AED", ikon: "AV" },
    { id: "sec-cevre", ad: "Çevre Eğitimi ve İklim Değişikliği", renk: "#0E7C3E", ikon: "ÇE" },
    { id: "sec-dusunme", ad: "Düşünme Eğitimi", renk: "#B45309", ikon: "DÜ" },
    { id: "sec-gorgu", ad: "Görgü Kuralları ve Nezaket", renk: "#C2410C", ikon: "GN" },
    { id: "sec-halk", ad: "Halk Oyunları", renk: "#a21caf", ikon: "HO" },
    { id: "sec-hukuk", ad: "Hukuk ve Adalet", renk: "#0B2A5B", ikon: "HÜ" },
    { id: "sec-kultur", ad: "Kültür ve Medeniyetimize Yön Verenler", renk: "#8B1E2D", ikon: "KÜ" },
    { id: "sec-masal", ad: "Masal ve Destanlarımız", renk: "#db2777", ikon: "MA" },
    { id: "sec-medya", ad: "Medya Okuryazarlığı", renk: "#0369a1", ikon: "MD" },
    { id: "sec-sorumluluk", ad: "Okul Temelli Sosyal Sorumluluk", renk: "#15803d", ikon: "SO" },
    { id: "sec-okuma", ad: "Okuma Becerileri", renk: "#1B4F9C", ikon: "OK" },
    { id: "sec-aile", ad: "Türk Sosyal Hayatında Aile", renk: "#B45309", ikon: "Aİ" },
    { id: "sec-yazarlik", ad: "Yazarlık ve Yazma Becerileri", renk: "#7C3AED", ikon: "YA" },
    { id: "secmeli", ad: "Seçmeli Dersler", siniflar: [0], renk: "#8B1E2D", ikon: "SÇ" }
  ],
  uniteler: {
    5: {
      turkce: ["Sözcükte Anlam", "Cümlede Anlam", "Parçada Anlam", "Yazım Kuralları ve Noktalama", "Fiiller ve Ekler", "Metin Türleri"],
      matematik: ["Doğal Sayılar", "Kesirler ve Ondalık Gösterim", "Geometri: Temel Kavramlar", "Veri Toplama ve Değerlendirme", "Uzunluk ve Zaman Ölçme", "Alan Ölçme"],
      fen: ["Güneş, Dünya ve Ay", "Canlılar Dünyası", "Kuvvetin Ölçülmesi", "Madde ve Değişim", "Işığın Yayılması", "İnsan ve Çevre"],
      sosyal: ["Birey ve Toplum", "Kültür ve Miras", "İnsanlar, Yerler ve Çevreler", "Bilim, Teknoloji ve Toplum", "Üretim, Dağıtım ve Tüketim", "Etkin Vatandaşlık"],
      ingilizce: ["Hello!", "My Town", "Games and Hobbies", "My Daily Routine", "Health", "Movies"],
      din: ["Allah'a İman", "Namaz", "Hz. Muhammed ve Aile Hayatı", "Kur'an-ı Kerim", "Sevgi ve Saygı"]
    },
    6: {
      turkce: ["Sözcükte ve Cümlede Anlam", "Paragraf", "Fiil Çekimleri", "Cümlenin Öğeleri", "Yazım ve Noktalama", "Metin Türleri ve Yazma"],
      matematik: ["Doğal Sayılarla İşlemler", "Çarpanlar ve Katlar", "Tam Sayılar", "Cebirsel İfadeler", "Oran", "Geometri ve Ölçme"],
      fen: ["Güneş Sistemi ve Tutulmalar", "Vücudumuzdaki Sistemler", "Kuvvet ve Hareket", "Madde ve Isı", "Ses ve Özellikleri", "Bitki ve Hayvanlarda Üreme"],
      sosyal: ["Biz ve Değerlerimiz", "Tarihe Yolculuk", "Yeryüzünde Yaşam", "Bilim ve Teknoloji", "Ekonomi ve Sosyal Hayat", "Demokrasi ve Haklar"],
      ingilizce: ["Life", "Yummy Breakfast", "Downtown", "Weather and Emotions", "At the Fair", "Occupations"],
      din: ["Peygamberlere İman", "Namazın Kılınışı", "Zararlı Alışkanlıklar", "Hz. Muhammed'in Hayatı", "Paylaşma ve Yardımlaşma"]
    },
    7: {
      turkce: ["Anlam Bilgisi", "Paragrafta Anlam", "Fiillerde Kip ve Kişi", "Cümlede Anlam İlişkileri", "Yazım Kuralları", "Edebi Türler"],
      matematik: ["Tam Sayılarla İşlemler", "Rasyonel Sayılar", "Cebirsel İfadeler ve Eşitlik", "Oran-Orantı ve Yüzdeler", "Doğrular ve Açılar", "Çember ve Daire"],
      fen: ["Güneş Sistemi ve Ötesi", "Hücre ve Bölünmeler", "Kuvvet, İş ve Enerji", "Maddenin Yapısı", "Işık ve Ses", "Canlılarda Üreme ve Gelişim"],
      sosyal: ["İletişim ve İnsan İlişkileri", "Türk Tarihinde Yolculuk", "Nüfus ve Yerleşme", "Zaman İçinde Bilim", "Ekonomi ve Yönetim", "Demokrasi Serüveni"],
      ingilizce: ["Appearance and Personality", "Sports", "Biographies", "Wild Animals", "Television", "Celebrations"],
      din: ["Meleklere ve Ahirete İman", "Hac ve Umre", "Ahlaki Davranışlar", "Kur'an'dan Mesajlar", "Hz. Muhammed'in Örnekliği"]
    },
    8: {
      turkce: ["Sözcükte Anlam ve Deyimler", "Cümlede Anlam", "Paragrafta Yapı ve Anlam", "Fiilimsiler", "Cümlenin Öğeleri ve Türleri", "Yazım, Noktalama ve Anlatım Bozuklukları"],
      matematik: ["Çarpanlar ve Katlar / Üslü İfadeler", "Kareköklü İfadeler", "Veri Analizi ve Olasılık", "Cebirsel İfadeler ve Özdeşlikler", "Doğrusal Denklemler", "Geometrik Cisimler ve Dönüşümler"],
      fen: ["Mevsimler ve İklim", "DNA ve Genetik Kod", "Basınç", "Madde ve Endüstri", "Enerji Dönüşümleri", "Elektrik ve Manyetizma"],
      inkilap: ["Bir Kahraman Doğuyor", "Millî Uyanış", "Millî Mücadele Hazırlık", "Kurtuluş Savaşı ve Antlaşmalar", "Atatürkçülük ve İnkılaplar", "Demokratikleşme ve Dış Politika"],
      ingilizce: ["Friendship", "Teen Life", "In the Kitchen", "On the Phone", "The Internet", "Adventures"],
      din: ["Kader İnancı", "Zekât ve Sadaka", "Hz. Muhammed'in Hayatı", "Kur'an-ı Kerim'in Özellikleri", "İslam ve Barış"]
    }
  }
};

// Resmî kaynaklar — tamamı doğrulandı
const RESMI_KAYNAKLAR = [
  { ad: "MEB Ders Kitapları Kataloğu (TYMM)", url: "https://tymm.meb.gov.tr/ders-kitaplari/temel-egitim", aciklama: "5-8. sınıf ders kitaplarını sınıf ve derse göre filtreleyip görüntüleyin.", zemin: "#C8102E", harf: "MEB" },
  { ad: "MEB Ders Kitapları (Tümü)", url: "https://tymm.meb.gov.tr/ders-kitaplari", aciklama: "Temel eğitim + ortaöğretim kitap listesi.", zemin: "#0B2A5B", harf: "MEB" },
  { ad: "OGM Materyal", url: "https://ogmmateryal.eba.gov.tr/ders-sunulari", aciklama: "Ders anlatım sunuları ve destek materyalleri.", zemin: "#0E7C3E", harf: "OGM" },
  { ad: "MEBİ Öğrenme Platformu", url: "https://mebi.eba.gov.tr", aciklama: "Ücretsiz bireysel öğrenme, tarama testleri ve LGS hazırlık.", zemin: "#B45309", harf: "MEBİ" }
];
const MEB_KATALOG = "https://tymm.meb.gov.tr/ders-kitaplari/temel-egitim";
const MEB_SITE = "https://tymm.meb.gov.tr";

function dersAdi(dersId, sinif) {
  if (dersId === "sosyal" && sinif === 8) return "T.C. İnkılap Tarihi ve Atatürkçülük";
  if (dersId === "inkilap") return "T.C. İnkılap Tarihi ve Atatürkçülük";
  const d = MUfredat.dersler.find(x => x.id === dersId);
  return d ? d.ad : dersId;
}

/* MEB TYMM portalında tek tek doğrulanan gerçek kitaplar.
   [sınıf, ders, MEB id, MEB başlığı, slug, meb.ai PDF kodu veya null] */
const GERCEK = [
  [5, "turkce", 33, "Türkçe 5. Sınıf Ders Kitabı (1. Kitap)", "turkce-5sinif-ders-kitabi-1kitap", "UhAFZ4b"],
  [5, "turkce", 34, "Türkçe 5. Sınıf Ders Kitabı (2. Kitap)", "turkce-5sinif-ders-kitabi-2kitap", "UfjP8nD"],
  [5, "matematik", 25, "Matematik 5. Sınıf Ders Kitabı (1. Kitap)", "matematik-5sinif-ders-kitabi-1kitap", "MxA2Nr"],
  [5, "matematik", 26, "Matematik 5. Sınıf Ders Kitabı (2. Kitap)", "matematik-5sinif-ders-kitabi-2kitap", "qzYTOr"],
  [5, "fen", 19, "Fen Bilimleri 5. Sınıf Ders Kitabı (1. Kitap)", "fen-bilimleri-5sinif-ders-kitabi-1kitap", "UTSNgQB"],
  [5, "fen", 20, "Fen Bilimleri 5. Sınıf Ders Kitabı (2. Kitap)", "fen-bilimleri-5sinif-ders-kitabi-2kitap", "1xuiyc"],
  [5, "sosyal", 46, "Sosyal Bilgiler 5. Sınıf Ders Kitabı (1. Kitap)", "sosyal-bilgiler-5sinif-ders-kitabi-1kitap", "UZTEDQC"],
  [5, "sosyal", 47, "Sosyal Bilgiler 5. Sınıf Ders Kitabı (2. Kitap)", "sosyal-bilgiler-5sinif-ders-kitabi-2kitap", "5pBQD6"],
  [5, "ingilizce", 139, "İngilizce 5. Sınıf Ders Kitabı", "ingilizce-dersi-5sinif-ders-kitabi", "Uo2KUKY"],
  [5, "ingilizce", 140, "İngilizce 5. Sınıf Çalışma Kitabı", "ingilizce-dersi-5sinif-calisma-kitabi", "UZ2Ksse"],
  [5, "ingilizce", 217, "İngilizce 5. Sınıf Öğretmen Kılavuz Kitabı", "ingilizce-dersi-5sinif-ogretmen-kilavuz-kitabi", "U5Tll8B"],
  [5, "din", 18, "Din Kültürü ve Ahlak Bilgisi 5. Sınıf Ders Kitabı", "din-kulturu-ve-ahlak-bilgisi-5sinif-ders-kitabi", null],
  [6, "turkce", 60, "Türkçe 6. Sınıf Ders Kitabı (1. Kitap)", "turkce-6sinif-ders-kitabi-1kitap", "ULy28Hy"],
  [6, "turkce", 61, "Türkçe 6. Sınıf Ders Kitabı (2. Kitap)", "turkce-6sinif-ders-kitabi-2kitap", "CPSB1u"],
  [6, "matematik", 54, "Matematik 6. Sınıf Ders Kitabı (1. Kitap)", "matematik-6sinif-ders-kitabi-1kitap", "aaIG5I"],
  [6, "matematik", 55, "Matematik 6. Sınıf Ders Kitabı (2. Kitap)", "matematik-6sinif-ders-kitabi-2kitap", "Uj0c1mI"],
  [6, "fen", 48, "Fen Bilimleri 6. Sınıf Ders Kitabı (1. Kitap)", "fen-bilimleri-6sinif-ders-kitabi-1kitap", "2pn9LH"],
  [6, "fen", 49, "Fen Bilimleri 6. Sınıf Ders Kitabı (2. Kitap)", "fen-bilimleri-6sinif-ders-kitabi-2kitap", "U364pU5"],
  [6, "sosyal", 56, "Sosyal Bilgiler 6. Sınıf Ders Kitabı (1. Kitap)", "sosyal-bilgileri-6sinif-ders-kitabi-1kitap", "WygFSY"],
  [6, "sosyal", 57, "Sosyal Bilgiler 6. Sınıf Ders Kitabı (2. Kitap)", "sosyal-bilgileri-6sinif-ders-kitabi-2kitap", "Ofrajx"],
  [6, "ingilizce", 298, "İngilizce 6. Sınıf Ders Kitabı", "ingilizce-dersi-6sinif-ders-kitabi", "U72SdzL"],
  [6, "ingilizce", 297, "İngilizce 6. Sınıf Çalışma Kitabı", "ingilizce-dersi-6sinif-calisma-kitabi", "ApYWoT"],
  [6, "ingilizce", 299, "İngilizce 6. Sınıf Öğretmen Kılavuz Kitabı", "ingilizce-dersi-6sinif-ogretmen-kilavuz-kitabi", "UZTRQlE"],
  [7, "turkce", 287, "Türkçe 7. Sınıf Ders Kitabı (1. Kitap)", "turkce-7sinif-ders-kitabi-1kitap", "UxjYr7N"],
  [7, "turkce", 288, "Türkçe 7. Sınıf Ders Kitabı (2. Kitap)", "turkce-7sinif-ders-kitabi-2kitap", "wMPuMB"],
  [7, "matematik", 280, "Matematik 7. Sınıf Ders Kitabı (1. Kitap)", "matematik-7sinif-ders-kitabi-1kitap", "0w0pTz"],
  [7, "matematik", 281, "Matematik 7. Sınıf Ders Kitabı (2. Kitap)", "matematik-7sinif-ders-kitabi-2kitap", "UfnV4xM"],
  [7, "fen", 272, "Fen Bilimleri 7. Sınıf Ders Kitabı (1. Kitap)", "fen-bilimleri-7sinif-ders-kitabi-1kitap", "DDH5xr"],
  [7, "fen", 273, "Fen Bilimleri 7. Sınıf Ders Kitabı (2. Kitap)", "fen-bilimleri-7sinif-ders-kitabi-2kitap", "T5ENRQ"],
  [7, "sosyal", 289, "Sosyal Bilgiler 7. Sınıf Ders Kitabı (1. Kitap)", "sosyal-bilgileri-7sinif-ders-kitabi-1kitap", "rO4R8o"],
  [7, "sosyal", 290, "Sosyal Bilgiler 7. Sınıf Ders Kitabı (2. Kitap)", "sosyal-bilgileri-7sinif-ders-kitabi-2kitap", "UttLCVG"],
  [7, "ingilizce", 135, "İngilizce 7. Sınıf Ders Kitabı", "coklu-yabanci-dil-egitim-modeli-ingilizce-7sinif-ders-kitabi", "UT0G9YB"],
  [7, "ingilizce", 136, "İngilizce 7. Sınıf Çalışma Kitabı", "coklu-yabanci-dil-egitim-modeli-ingilizce-7sinif-calisma-kitabi", "FyTrgS"],
  [7, "ingilizce", 300, "İngilizce 7. Sınıf Öğretmen Kılavuz Kitabı", "coklu-yabanci-dil-egitim-modeli-ingilizce-7sinif-ogretmen-kilavuz-kitabi", "UpZzTas"],
  [0, "secmeli", 261, "Afet Bilinci Ders Kitabı-1", "afet-bilinci-ders-kitabi-1", "URezQtN"],
  [0, "sec-ahlak", 257, "Ahlak ve Vatandaşlık Eğitimi Ders Kitabı-1", "ahlak-ve-vatandaslik-egitimi-ders-kitabi-1", "XthVlt"],
  [0, "sec-cevre", 269, "Çevre Eğitimi ve İklim Değişikliği Ders Kitabı", "cevre-egitimi-ve-iklim-degisikligi-ders-kitabi", "U62dmrt"],
  [0, "sec-dusunme", 268, "Düşünme Eğitimi Ders Kitabı-1", "dusunme-egitimi-ders-kitabi-1", "3MlMS9"],
  [0, "sec-gorgu", 274, "Görgü Kuralları ve Nezaket Ders Kitabı-1", "gorgu-kurallari-ve-nezaket-dersi-1", "UqDX0Kv"],
  [0, "sec-halk", 438, "Halk Oyunları Öğretmen Kılavuz Kitabı", "halk-oyunlari-dersi-ogretmen-kilavuz-kitabi", "UmPKwwB"],
  [0, "sec-hukuk", 277, "Hukuk ve Adalet Ders Kitabı", "hukuk-ve-adalet-ders-kitabi", "wvqycw"],
  [0, "sec-kultur", 295, "Kültür ve Medeniyetimize Yön Verenler Ders Kitabı-1", "kultur-ve-medeniyetimize-yon-verenler-ders-kitabi-1", "UiERRGU"],
  [0, "sec-masal", 296, "Masal ve Destanlarımız Ders Kitabı-1", "masal-ve-destanlarimiz-ders-kitabi-1", "UFgE37m"],
  [0, "sec-medya", 294, "Medya Okuryazarlığı Ders Kitabı", "medya-okuryazarligi-ders-kitabi", "BOOqbg"],
  [0, "sec-sorumluluk", 307, "Okul Temelli Sosyal Sorumluluk Çalışmaları Ders Kitabı-1", "okul-temelli-sosyal-sorumluluk-calismalari-ders-kitabi-1", "UcrHmk4"],
  [0, "sec-sorumluluk", 308, "Okul Temelli Sosyal Sorumluluk Çalışmaları Öğretmen Kılavuz Kitabı-1", "okul-temelli-sosyal-sorumluluk-calismalari-ogretmen-kilavuz-kitabi-1", "UJusAc0"],
  [0, "sec-okuma", 306, "Okuma Becerileri Ders Kitabı", "okuma-becerileri-ders-kitabi", "U7PyS6r"],
  [0, "sec-aile", 305, "Türk Sosyal Hayatında Aile Ders Kitabı", "turk-sosyal-hayatinda-aile-ders-kitabi", "YNa5vt"],
  [0, "sec-yazarlik", 304, "Yazarlık ve Yazma Becerileri Ders Kitabı-1", "yazarlik-ve-yazma-becerileri-ders-kitabi-1", "Uxs4xNQ"],
  [5, "almanca", 254, "Almanca 5. Sınıf Ders Kitabı", "coklu-yabanci-dil-egitim-modeli-almanca-5sinif-ders-kitabi", "D91BHc"],
  [5, "almanca", 253, "Almanca 5. Sınıf Çalışma Kitabı", "coklu-yabanci-dil-egitim-modeli-almanca-5sinif-calisma-kitabi", "zmsPSu"],
  [5, "almanca", 256, "Almanca 5. Sınıf Öğretmen Kılavuz Kitabı", "coklu-yabanci-dil-egitim-modeli-almanca-5sinif-ogretmen-kilavuz-kitabi", "cYfuXL"],
  [6, "almanca", 259, "Almanca 6. Sınıf Ders Kitabı", "coklu-yabanci-dil-egitim-modeli-almanca-6sinif-ders-kitabi", "UpJBRW7"],
  [6, "almanca", 258, "Almanca 6. Sınıf Çalışma Kitabı", "coklu-yabanci-dil-egitim-modeli-almanca-6sinif-calisma-kitabi", "YM1WGD"],
  [6, "almanca", 260, "Almanca 6. Sınıf Öğretmen Kılavuz Kitabı", "coklu-yabanci-dil-egitim-modeli-almanca-6sinif-ogretmen-kilavuz-kitabi", "aUsa1A"],
  [7, "almanca", 264, "Almanca 7. Sınıf Ders Kitabı", "coklu-yabanci-dil-egitim-modeli-almanca-7sinif-ders-kitabi", "Uxktqyu"],
  [7, "almanca", 262, "Almanca 7. Sınıf Çalışma Kitabı", "coklu-yabanci-dil-egitim-modeli-almanca-7sinif-calisma-kitabi", "pV7YEv"],
  [7, "almanca", 263, "Almanca 7. Sınıf Öğretmen Kılavuz Kitabı", "coklu-yabanci-dil-egitim-modeli-almanca-7sinif-ogretmen-kilavuz-kitabi", "DUCqql"],
  [8, "almanca", 265, "Almanca 8. Sınıf Ders Kitabı", "coklu-yabanci-dil-egitim-modeli-almanca-8sinif-ders-kitabi", "Fk4KmX"],
  [8, "almanca", 266, "Almanca 8. Sınıf Çalışma Kitabı", "coklu-yabanci-dil-egitim-modeli-almanca-8sinif-calisma-kitabi", "URODEPI"],
  [8, "almanca", 267, "Almanca 8. Sınıf Öğretmen Kılavuz Kitabı", "coklu-yabanci-dil-egitim-modeli-almanca-8sinif-ogretmen-kilavuz-kitabi", "izdrcU"],
  [8, "ingilizce", 302, "İngilizce 8. Sınıf Ders Kitabı", "coklu-yabanci-dil-egitim-modeli-ingilizce-8sinif-ders-kitabi", "Dvp5ss"],
  [8, "ingilizce", 303, "İngilizce 8. Sınıf Çalışma Kitabı", "coklu-yabanci-dil-egitim-modeli-ingilizce-8sinif-calisma-kitabi", "ULfkIAQ"],
  [8, "ingilizce", 301, "İngilizce 8. Sınıf Öğretmen Kılavuz Kitabı", "coklu-yabanci-dil-egitim-modeli-ingilizce-8sinif-ogretmen-kilavuz-kitabi", "UHQvR6G"],
  [0, "beden", 180, "Beden Eğitimi ve Spor Öğretmen Kılavuz Kitabı (5-8. Sınıf)", "beden-egitimi-ve-spor-dersi-ogretmen-kilavuz-kitabi-5-8sinif", "UhkA03V"],
  [5, "bilisim", 432, "Bilişim Teknolojileri ve Yazılım 5. Sınıf Öğretmen Kılavuz Kitabı", "bilisim-teknolojileri-ve-yazilim-dersi-5sinif-ogretmen-kilavuz-kitabi", "yJMKDd"],
  [6, "bilisim", 433, "Bilişim Teknolojileri ve Yazılım 6. Sınıf Öğretmen Kılavuz Kitabı", "bilisim-teknolojileri-ve-yazilim-dersi-6sinif-ogretmen-kilavuz-kitabi", "hq1PmJ"],
  [5, "muzik", 138, "Müzik 5. Sınıf Ders Kitabı", "muzik-5sinif-ders-kitabi", "X7ZvWY"],
  [6, "muzik", 284, "Müzik 6. Sınıf Ders Kitabı", "muzik-6sinif-ders-kitabi", "7ZnsCA"],
  [5, "gorsel", 436, "Görsel Sanatlar 5. Sınıf Öğretmen Kılavuz Kitabı", "gorsel-sanatlar-5-sinif-ogretmen-kilavuz-kitabi", "Uecgg1M"],
  [6, "gorsel", 437, "Görsel Sanatlar 6. Sınıf Öğretmen Kılavuz Kitabı", "gorsel-sanatlar-6-sinif-ogretmen-kilavuz-kitabi", "UTGPzag"]
];

/* MEB portalında henüz yayımlanmayanlar — dürüst "yakında" kartları */
const YAKINDA = [
  [6, "din", "Din Kültürü ve Ahlak Bilgisi 6. Sınıf Ders Kitabı"],
  [7, "din", "Din Kültürü ve Ahlak Bilgisi 7. Sınıf Ders Kitabı"],
  [8, "turkce", "Türkçe 8. Sınıf Ders Kitabı"],
  [8, "matematik", "Matematik 8. Sınıf Ders Kitabı"],
  [8, "fen", "Fen Bilimleri 8. Sınıf Ders Kitabı"],
  [8, "inkilap", "T.C. İnkılap Tarihi ve Atatürkçülük 8. Sınıf Ders Kitabı"],
  [8, "ingilizce", "İngilizce 8. Sınıf Ders Kitabı"],
  [8, "din", "Din Kültürü ve Ahlak Bilgisi 8. Sınıf Ders Kitabı"]
];

const KITAPLAR = [];
(function uret() {
  for (const [sinif, ders, mebId, baslik, slug, pdf] of GERCEK) {
    const uniteler = (MUfredat.uniteler[sinif] && MUfredat.uniteler[sinif][ders]) || [baslik];
    KITAPLAR.push({
      id: "meb-" + mebId, sinif, ders, baslik,
      yayinevi: "MEB Yayınları", yil: "2025-2026",
      kapak: "img/kitap-" + mebId + ".webp",
      kapakRenk: (MUfredat.dersler.find(d => d.id === ders) || {}).renk || "#1B4F9C",
      uniteler, ozetSayfa: 12,
      pdfUrl: pdf ? "https://meb.ai/" + pdf : null,
      mebSayfa: MEB_SITE + "/kitap/" + mebId + "/" + slug,
      yakinda: false
    });
  }
  for (const [sinif, ders, baslik] of YAKINDA) {
    const uniteler = (MUfredat.uniteler[sinif] && MUfredat.uniteler[sinif][ders]) || [];
    KITAPLAR.push({
      id: "yak-" + sinif + "-" + ders, sinif, ders, baslik,
      yayinevi: "MEB Yayınları", yil: "2025-2026",
      kapak: null,
      kapakRenk: (MUfredat.dersler.find(d => d.id === ders) || {}).renk || "#1B4F9C",
      uniteler, ozetSayfa: 12,
      pdfUrl: null, mebSayfa: MEB_KATALOG, yakinda: true
    });
  }
})();

// Dijital konu özeti sayfaları (not alınabilir Z-Kitap modu için)
function kitapSayfalari(kitap) {
  const sayfalar = [];
  sayfalar.push({
    baslik: "İçindekiler",
    tip: "icindekiler",
    metin: kitap.uniteler.map((u, i) => `${i + 1}. Ünite: ${u}`).join("\n")
  });
  kitap.uniteler.forEach((unite, idx) => {
    sayfalar.push({
      baslik: `${idx + 1}. Ünite — ${unite}`,
      tip: "konu",
      metin: `Kazanım: Öğrenci bu ünitede "${unite}" konusuna ait temel kavramları açıklar, örnekler üzerinde uygular.\n\n1. Hazırlık Sorusu\n• Günlük hayatta "${unite}" ile nerede karşılaşırsınız? Sınıfta tartışınız.\n\n2. Temel Bilgiler\n• Kavram haritası oluşturun. Tanım, özellik, örnek ve karşı-örnek yazın.\n• Çözümlü Örnek: Adım adım çözüm, önce tahmin sonra işlem yapın.\n\n3. Etkinlik (Maarif Modeli: deneyimle-uygula-değerlendir)\n• Grup çalışması: 4 kişilik gruplar hâlinde kısa sunum hazırlayın.\n• Öz değerlendirme: Neyi öğrendim? Nerede zorlandım?`,
      ornek: `Çözümlü Örnek (${kitap.sinif}. Sınıf düzeyi): Konuya ait tipik bir soru tahtada öğretmenle birlikte çözülür, ardından benzeri size bırakılır.`
    });
    sayfalar.push({
      baslik: `${idx + 1}. Ünite — Etkinlik ve Değerlendirme`,
      tip: "etkinlik",
      metin: `A. Kısa Cevaplı Sorular (5 soru)\n1) Temel kavramı kendi cümlenizle tanımlayınız.\n2) Bir örnek verip nedenini açıklayınız.\n3) Şemayı tamamlayınız.\n\nB. Beceri Temelli Soru\n• Günlük hayat bağlamlı, çok adımlı yeni nesil soru. Çözüm stratejinizi yazın.\n\nC. Ünite Değerlendirme\n• 10 soruluk mini test. Yanlışlarınızı forumda sorun, öğretmen yanıtlasın.`
    });
  });
  return (kitap.ozetSayfa > 0) ? sayfalar.slice(0, kitap.ozetSayfa) : sayfalar;
}

// Forum örnek verisi
const FORUM_SEED = [
  {
    id: "s1", sinif: 8, ders: "matematik", unite: "Kareköklü İfadeler",
    baslik: "√48 + √27 işleminin sonucu nedir?", govde: "Paydaları eşitleyemedim, kök dışına çıkarma kısmında takıldım. Adım adım anlatabilir misiniz?",
    yazar: "Zeynep K. (Öğrenci)", rol: "ogrenci", tarih: "2026-09-18T10:20:00",
    begeni: 14, cozuldu: true, gorsel: null,
    yanitlar: [
      { id: "y1", yazar: "M. Demir (Öğretmen)", rol: "ogretmen", metin: "√48 = 4√3, √27 = 3√3. Toplam 7√3 olur. Kök içini asal çarpanlarına ayır: 48=16×3, 27=9×3.", begeni: 22, dogru: true, tarih: "2026-09-18T11:02:00" },
      { id: "y2", yazar: "Emir T. (Öğrenci)", rol: "ogrenci", metin: "Ben de önce 16x3 olduğunu görememiştim, çarpanlara ayırmak işe yarıyor.", begeni: 5, dogru: false, tarih: "2026-09-18T12:00:00" }
    ]
  },
  {
    id: "s2", sinif: 6, ders: "fen", unite: "Ses ve Özellikleri",
    baslik: "Ses boşlukta neden yayılmaz?", govde: "Öğretmenimiz deney yapacağız dedi, önceden okumak istiyorum.",
    yazar: "Ali V. (Öğrenci)", rol: "ogrenci", tarih: "2026-09-20T09:10:00",
    begeni: 8, cozuldu: true, gorsel: null,
    yanitlar: [
      { id: "y3", yazar: "S. Aydın (Öğretmen)", rol: "ogretmen", metin: "Ses mekanik dalgadır, yayılmak için maddesel ortama (katı-sıvı-gaz) ihtiyaç duyar. Boşlukta tanecik olmadığı için yayılmaz. Fanus-hava boşaltma deneyi bunu gösterir.", begeni: 17, dogru: true, tarih: "2026-09-20T09:40:00" }
    ]
  },
  {
    id: "s3", sinif: 7, ders: "turkce", unite: "Fiillerde Kip ve Kişi",
    baslik: "Dilek kipleri ile istek kipi arasındaki fark?", govde: "'Gelesin, gideyim, yapalım' örneklerinde hangisi hangi kip?",
    yazar: "Elif S. (Öğrenci)", rol: "ogrenci", tarih: "2026-09-21T15:30:00",
    begeni: 6, cozuldu: false, gorsel: null,
    yanitlar: [
      { id: "y4", yazar: "H. Kaya (Öğretmen)", rol: "ogretmen", metin: "Dilek kipleri: istek (-e/-a), şart (-se/-sa), gereklilik (-meli/-malı), emir (eksiz). 'Gideyim' istek 1. tekil, 'gelesin' istek değil emir 3. tekil sayılır bazı kaynaklarda — MEB kitabındaki tabloya bakın, örnek cümleyle sorun.", begeni: 9, dogru: false, tarih: "2026-09-21T16:00:00" }
    ]
  },
  {
    id: "s4", sinif: 5, ders: "sosyal", unite: "Kültür ve Miras",
    baslik: "Somut ve somut olmayan kültürel miras örnekleri?",
    yazar: "Mert A. (Veli)", rol: "veli", tarih: "2026-09-22T08:00:00", govde: "Oğlumla ödev yapıyoruz, 3'er örnek listesi hazırlayabilir misiniz?",
    begeni: 4, cozuldu: false, gorsel: null,
    yanitlar: []
  }
];
