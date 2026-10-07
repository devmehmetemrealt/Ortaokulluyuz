/* ===== data.js ===== */
/* Ortaokulluyuz — MEB Müfredat Verisi (2026-2027 / Türkiye Yüzyılı Maarif Modeli) */
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
      yayinevi: "MEB Yayınları", yil: "2026-2027",
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
      yayinevi: "MEB Yayınları", yil: "2026-2027",
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

/* ===== ikon.js ===== */
/* SVG ikon kütüphanesi — emojiler yerine resmi ve modern çizgi ikonlar */
const IKONLAR = {
  isaretci: '<path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="m13 13 6 6"/>',
  kalem: '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>',
  fosfor: '<path d="m9 11-5.5 5.5a2.1 2.1 0 0 0 0 3L6 22l2.5-.5a2.1 2.1 0 0 0 1.5-1L19 11.5a2.12 2.12 0 0 0-3-3L9 11z"/><path d="M14.5 5.5 18.5 9.5"/>',
  silgi: '<path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/>',
  metin: '<path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/>',
  kapat: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  tamEkran: '<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>',
  yazdir: '<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
  sol: '<path d="m15 18-6-6 6-6"/>',
  sag: '<path d="m9 18 6-6-6-6"/>',
  begeni: '<path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/>',
  yorum: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  uyari: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  tik: '<path d="M20 6 9 17l-5-5"/>',
  goz: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  gozKapali: '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><path d="m2 2 20 20"/>',
  zarf: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  kullanici: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  kitap: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  indir: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
  dis: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  cop: '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  gonder: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  liste: '<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/>',
  eksi: '<path d="M5 12h14"/>',
  arti: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  zil: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  ayar: '<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="m19.4 15 .1.1a1.8 1.8 0 0 1-2.55 2.55l-.1-.1a1.8 1.8 0 0 0-3.07 1.27v.18a1.8 1.8 0 0 1-3.6 0v-.18A1.8 1.8 0 0 0 7.1 17.55l-.1.1a1.8 1.8 0 0 1-2.55-2.55l.1-.1A1.8 1.8 0 0 0 3.28 12H3.1a1.8 1.8 0 0 1 0-3.6h.18A1.8 1.8 0 0 0 4.55 5.33l-.1-.1A1.8 1.8 0 0 1 7 2.68l.1.1a1.8 1.8 0 0 0 3.07-1.27v-.18a1.8 1.8 0 0 1 3.6 0v.18A1.8 1.8 0 0 0 16.84 2.8l.1-.1a1.8 1.8 0 0 1 2.55 2.55l-.1.1A1.8 1.8 0 0 0 20.66 8h.18a1.8 1.8 0 0 1 0 3.6h-.18A1.8 1.8 0 0 0 19.4 15Z"/>',
  cikis: '<path d="M10 17l5-5-5-5"/><path d="M15 12H3"/><path d="M21 19V5a2 2 0 0 0-2-2h-4"/>',
  kilit: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>'
};
const YILDIZ = '<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>';

function ikon(ad, boy) {
  boy = boy || 15;
  return `<svg class="ikon" width="${boy}" height="${boy}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IKONLAR[ad] || ""}</svg>`;
}
function ikonYildiz(dolu, boy) {
  boy = boy || 17;
  return dolu
    ? `<svg class="ikon yildiz-dolu" width="${boy}" height="${boy}" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">${YILDIZ}</svg>`
    : `<svg class="ikon" width="${boy}" height="${boy}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${YILDIZ}</svg>`;
}
/* Kurumsal kaynak rozeti: renkli kare + kurum kısaltması */
function kurumRozet(zemin, harf) {
  return `<svg class="kurum-rozet" width="44" height="44" viewBox="0 0 44 44" aria-hidden="true"><rect x="1" y="1" width="42" height="42" rx="9" fill="${zemin}"/><text x="22" y="27" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="13" font-weight="800" fill="#fff">${harf}</text></svg>`;
}

/* ===== api.js ===== */
/* Ortaokulluyuz — güvenli API istemcisi.
   Tüm üretim istekleri /api/gateway üzerinden kısa işlem kodlarıyla gider.
   Kimlik bilgileri HttpOnly cookie ile taşınır. */
const API = {
  taban: "/api/gateway",
  aktif: false,
  engelli: false,
  banBitis: 0,
  _kodlar: {"captcha-yeni":"a33","captcha-dogrula":"a34","ping":"a0","oturum":"a1","kayit":"a2","dogrula":"a3","kod-tekrar":"a4","giris":"a5","telefon-kayit":"a6","google-giris":"a7","yapilandirma":"a8","cikis":"a9","sifre-degistir":"aa","uyeler":"ab","rol-ata":"ac","uye-sil":"ad","sifre-ver":"ae","uye-onayla":"af","test-eposta":"a10","istatistik":"a11","sorular":"a12","soru-ekle":"a13","soru-sil":"a14","yanit-ekle":"a15","yanit-sil":"a16","begeni":"a17","dogru-isaretle":"a18","favoriler":"a19","favori-ekle":"a1a","favori-cikar":"a1b","tercih-etki":"a1c","tercih-ozet":"a1d","sesli-yapilandirma":"a1e","sesli-arama-baslat":"a1f","sesli-gelen-arama":"a20","sesli-arama-teklif":"a21","sesli-arama-yanit":"a22","sesli-arama-durum-guncelle":"a23","sesli-arama-sinyal":"a24","sesli-arama-kapat":"a25","sesli-arama-durum":"a26","kisiler":"a27","sohbetler":"a28","mesajlar":"a29","mesaj-gonder":"a2a","mesaj-sil":"a2b","denetim-mesajlar":"a2c","sikayet-et":"a2d","sikayetler":"a2e","sikayet-kapat":"a2f","paylasimlar":"a30","paylasim-ekle":"a31","paylasim-sil":"a32","avatar-guncelle":"a35","avatar-sil":"a36","devtools-rapor":"a37","ip-durum":"a38"},

  _nonce() {
    try {
      if (globalThis.crypto && typeof crypto.randomUUID === "function") return crypto.randomUUID();
    } catch (e) {}
    return Date.now().toString(36) + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
  },

  async sor(islem, veri) {
    const kod = this._kodlar[islem];
    if (!kod) throw new Error("Bilinmeyen API işlemi.");

    const payload = {
      a: kod,
      d: (veri && typeof veri === "object") ? veri : {},
      t: Date.now(),
      n: this._nonce()
    };

    let r;
    try {
      r = await fetch(this.taban, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        cache: "no-store",
        body: JSON.stringify(payload)
      });
    } catch (e) {
      throw new Error("Sunucuya bağlanılamadı. İnternet/Vercel bağlantısını kontrol edin.");
    }

    const ham = await r.text();
    let j = {};
    try {
      j = ham ? JSON.parse(ham) : {};
    } catch (e) {
      j = { ok: false, hata: "Sunucudan geçersiz yanıt alındı (HTTP " + r.status + ")." };
    }
    if (!r.ok && !j.hata) j.hata = "Sunucu hatası (HTTP " + r.status + ").";
    return j;
  },

  async ping() {
    try {
      const r = await this.sor("ping");
      this.engelli = !!(r && r.hata_kodu === 'IP_BANNED');
      if (this.engelli) this.banBitis = Date.now() + 60 * 60 * 1000;
      this.aktif = !!(r && r.ok);
    } catch (e) {
      this.aktif = false;
    }
    return this.aktif;
  },

  dosyaOku(dosya) {
    return new Promise((resolve, reject) => {
      if (!dosya) return resolve(null);
      if (dosya.size > 2 * 1024 * 1024) return reject(new Error("Görsel en fazla 2 MB olmalı."));
      const r = new FileReader();
      r.onload = () => resolve(r.result);
      r.onerror = () => reject(new Error("Görsel okunamadı."));
      r.readAsDataURL(dosya);
    });
  },

  async avatarOku(dosya) {
    if (!dosya) return null;
    if (!/^image\/(png|jpe?g|webp)$/i.test(dosya.type)) throw new Error("Avatar PNG, JPG veya WebP olmalı.");
    if (dosya.size > 4 * 1024 * 1024) throw new Error("Avatar dosyası en fazla 4 MB olabilir.");
    const url = await new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result);
      r.onerror = () => reject(new Error("Avatar okunamadı."));
      r.readAsDataURL(dosya);
    });
    const img = await new Promise((resolve, reject) => {
      const im = new Image();
      im.onload = () => resolve(im);
      im.onerror = () => reject(new Error("Avatar görüntüsü açılamadı."));
      im.src = url;
    });
    const maxSide = 320;
    const scale = Math.min(1, maxSide / Math.max(img.naturalWidth || img.width, img.naturalHeight || img.height));
    const w = Math.max(1, Math.round((img.naturalWidth || img.width) * scale));
    const h = Math.max(1, Math.round((img.naturalHeight || img.height) * scale));
    const canvas = document.createElement("canvas");
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) throw new Error("Avatar dönüştürülemedi.");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, w, h);
    let out = canvas.toDataURL("image/webp", 0.82);
    if (out.length > 210000) out = canvas.toDataURL("image/jpeg", 0.78);
    if (out.length > 260000) {
      const factor = Math.min(1, 240 / Math.max(img.naturalWidth || img.width, img.naturalHeight || img.height));
      canvas.width = Math.max(1, Math.round((img.naturalWidth || img.width) * factor));
      canvas.height = Math.max(1, Math.round((img.naturalHeight || img.height) * factor));
      const ctx2 = canvas.getContext("2d", { alpha: false });
      ctx2.fillStyle = "#ffffff"; ctx2.fillRect(0, 0, canvas.width, canvas.height);
      ctx2.drawImage(img, 0, 0, canvas.width, canvas.height);
      out = canvas.toDataURL("image/jpeg", 0.68);
    }
    if (out.length > 290000) throw new Error("Avatar sıkıştırılamadı. Daha küçük bir görsel seçin.");
    return out;
  },

  async soruGonderJson(veri) {
    return this.sor("soru-ekle", veri);
  }
};

/* ===== guvenlik.js ===== */
/* Ortaokulluyuz özel CAPTCHA + kısa ömürlü, HttpOnly güvenlik geçişi. */
function ookEscapeHTML(v) {
  return String(v).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","\'":"&#039;"}[c]));
}
const Guvenlik = {
  _challenge: null,
  _gecisGecerli: false,
  _gecisBitis: 0,
  _bekleyen: null,
  _stilEklendi: false,

  async hazirla(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return false;
    if (!this._challenge || this._challenge.bitis <= Date.now()) await this.yeni(containerId);
    this.ciz(containerId);
    return true;
  },

  async yeni(containerId) {
    try {
      const j = await API.sor("captcha-yeni");
      if (!j.ok) throw new Error(j.hata || "Güvenlik doğrulaması başlatılamadı.");
      this._challenge = { token: j.token, soru: j.soru, bitis: Number(j.bitis) };
      const input = document.querySelector(`#${containerId} input[data-captcha-yanit]`);
      if (input) input.value = "";
      this._gecisGecerli = false;
      this._gecisBitis = 0;
      this.ciz(containerId);
      return true;
    } catch (e) {
      const el = document.getElementById(containerId);
      if (el) el.innerHTML = `<div class="ook-captcha-hata">Güvenlik doğrulaması yüklenemedi.</div>`;
      return false;
    }
  },

  ciz(containerId) {
    const el = document.getElementById(containerId);
    if (!el || !this._challenge) return;
    const kalan = Math.max(0, Math.ceil((this._challenge.bitis - Date.now()) / 1000));
    el.innerHTML = `
      <div class="ook-captcha">
        <div class="ook-captcha-bas">
          <div><div class="ook-captcha-baslik">Güvenlik kontrolü</div><div class="ook-captcha-soru">${ookEscapeHTML(this._challenge.soru)}</div></div>
          <button type="button" class="ook-captcha-yenile" onclick="Guvenlik.yeni('${containerId}')" title="Yeni soru">↻</button>
        </div>
        <div class="ook-captcha-alt">
          <input data-captcha-yanit autocomplete="off" inputmode="numeric" maxlength="3" class="girdi" placeholder="Cevabınız" />
          <button type="button" class="btn btn-ikincil" onclick="Guvenlik.dogrula('${containerId}')">Kontrol et</button>
        </div>
        <div class="ook-captcha-sure">Token ${Math.floor(kalan/60)}:${String(kalan%60).padStart(2,'0')} içinde geçerli</div>
        <div class="ook-captcha-durum" data-captcha-durum></div>
      </div>`;
  },

  async dogrula(containerId) {
    if (!this._challenge || this._challenge.bitis <= Date.now()) {
      await this.yeni(containerId); return false;
    }
    const input = document.querySelector(`#${containerId} input[data-captcha-yanit]`);
    const durum = document.querySelector(`#${containerId} [data-captcha-durum]`);
    const cevap = input ? input.value.trim() : "";
    if (!cevap) { if (durum) durum.textContent = "Cevabınızı yazın."; return false; }
    try {
      const j = await API.sor("captcha-dogrula", { captcha_token: this._challenge.token, cevap });
      if (!j.ok) {
        if (durum) durum.textContent = j.hata || "Cevap doğru değil.";
        if (j.hata_kodu === "CAPTCHA_EXPIRED" || j.hata_kodu === "CAPTCHA_WRONG") await this.yeni(containerId);
        return false;
      }
      this._gecisGecerli = true;
      this._gecisBitis = Number(j.bitis || Date.now());
      if (durum) durum.textContent = "Doğrulandı ✓";
      if (input) input.disabled = true;
      const b = document.querySelector(`#${containerId} .ook-captcha-alt button`);
      if (b) { b.disabled = true; b.textContent = "Doğrulandı"; }
      return true;
    } catch (e) {
      if (durum) durum.textContent = e.message || "Doğrulama yapılamadı.";
      return false;
    }
  },

  gecisGecersiz() { this._gecisGecerli = false; this._gecisBitis = 0; },

  banEkrani(bitis) {
    if (document.getElementById('ook-ip-ban-overlay')) return;
    const kalan = Math.max(0, Number(bitis || (Date.now() + 60 * 60 * 1000)) - Date.now());
    const dk = Math.max(1, Math.ceil(kalan / 60000));
    const o = document.createElement('div');
    o.id = 'ook-ip-ban-overlay';
    o.innerHTML = '<div class="ook-ip-ban-kutu"><div class="ook-ip-ban-ikon">⛔</div><div class="ook-ip-ban-baslik">Geçici erişim engeli</div><p>Bu bağlantı güvenlik sistemi tarafından geçici olarak engellendi.</p><small>Tahmini süre: ' + dk + ' dakika</small></div>';
    document.body.appendChild(o);
    document.documentElement.style.overflow = 'hidden';
  },

  async tokenIste(containerId) {
    if (this._gecisGecerli && this._gecisBitis > Date.now()) return true;
    await this.hazirla(containerId);
    const ok = await this.dogrula(containerId);
    return ok;
  }
};
window.Guvenlik = Guvenlik;
window.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && Guvenlik._challenge && Guvenlik._challenge.bitis <= Date.now()) {
    ["girisCaptcha","kayitCaptcha"].forEach(id => { if (document.getElementById(id)) Guvenlik.yeni(id); });
  }
});

window.__OOK_ADMIN__ = window.__OOK_ADMIN__ === true;


/* Tarayıcı geliştirici araçları koruması.
   Yönetici hesabı ve ADMIN_IP_ALLOWLIST muaf tutulur.
   Not: Bir web sayfası DevTools'u %100 güvenilir biçimde tespit edemez;
   bu katman kötüye kullanım sinyallerini sunucuya bildirir. */
(function DevToolsGuard(){
  const state = {signals:new Set(),sent:false,debuggerHits:0,started:Date.now()};
  const masaustu = () => window.matchMedia?.('(pointer:fine)').matches && window.innerWidth >= 900;
  const adminMuaf = () => window.__OOK_ADMIN__ === true;
  const mark = (s) => {
    if (adminMuaf() || !masaustu() || state.sent) return;
    state.signals.add(s);
    if (state.signals.size >= 2) raporla();
  };
  const geometri = () => {
    if (adminMuaf() || !masaustu()) return;
    const dw = Math.max(0, (window.outerWidth || 0) - (window.innerWidth || 0));
    const dh = Math.max(0, (window.outerHeight || 0) - (window.innerHeight || 0));
    /* Dock edilmiş DevTools için güçlü geometri sinyali. */
    if (dw > 220 || dh > 170) mark('dock');
  };
  async function raporla(force=false){
    if (adminMuaf() || state.sent || (!force && state.signals.size < 2)) return;
    state.sent = true;
    try {
      const r = await API.sor('devtools-rapor',{kanit:{sinyaller:[...state.signals],masaustu:true,ts:Date.now()}});
      if (r && r.hata_kodu === 'IP_BANNED' && window.Guvenlik) Guvenlik.banEkrani(Date.now()+60*60*1000);
    } catch(e) {
      /* Güvenlik raporunun başarısız olması sayfayı kilitlemez. */
    }
  }

  /* Konsol paneli açıkken DevTools'un nesneyi incelemesinden yararlanan ek sinyal. */
  function consoleCanary(){
    if (adminMuaf() || !masaustu() || state.sent) return;
    try {
      const canary = {};
      Object.defineProperty(canary, 'id', {
        configurable: true,
        get(){ mark('console'); return 'ook'; }
      });
      console.debug('%c', 'font-size:0', canary);
    } catch(e) {}
  }

  /* F12 ve yaygın DevTools kısayolları: kısayolun kendisi tek başına güçlü kanıt olduğu için
     doğrudan raporlanır. Bu sırada varsayılan tarayıcı davranışı da engellenir. */
  window.addEventListener('keydown', (e) => {
    if (adminMuaf() || state.sent) return;
    const k = String(e.key || '').toUpperCase();
    const f12 = k === 'F12';
    const combo = e.ctrlKey && e.shiftKey && ['I','J','C','K'].includes(k);
    if (f12 || combo) {
      e.preventDefault();
      e.stopPropagation();
      state.signals.add('shortcut');
      raporla(true);
    }
  }, true);

  /* DevTools'u menüden açma / dock edilme durumu için ek sinyaller.
     debugger ölçümü, tarayıcı DevTools açıkken yürütmenin duraksamasını yakalamaya çalışır. */
  setInterval(() => {
    if (adminMuaf()) return;
    geometri();
    if (!masaustu() || state.sent) return;
    const t = performance.now();
    debugger;
    const d = performance.now() - t;
    if (d > 75) {
      state.debuggerHits++;
      if (state.debuggerHits >= 2) mark('debugger');
    } else {
      state.debuggerHits = Math.max(0, state.debuggerHits - 1);
    }
  }, 1400);

  setInterval(consoleCanary, 2200);
  window.addEventListener('resize',()=>setTimeout(geometri,150));
  window.addEventListener('beforeunload',()=>{ /* sadece sayaç/sinyal tutulur */ });
})();

/* ===== auth.js ===== */
/* Auth — sunucu (PHP+MySQL) varsa onu kullanır, yoksa yerel moda düşer.
   Roller kayıt ekranında seçilemez; yalnızca yönetici atar. */
function ookHash(sifre) {
  const s = String(sifre) + "::ook-salt-v1";
  let h1 = 0xdeadbeef ^ 7, h2 = 0x41c6ce57 ^ 7;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 2654435761); h2 = Math.imul(h2 ^ c, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return ((h2 >>> 0).toString(16).padStart(8, "0") + (h1 >>> 0).toString(16).padStart(8, "0"));
}
const ADMIN_SEED = { eposta: "yonetim@ortaokulluyuz.local", parolaKarma: "8285423e1a47c7a0", ad: "Site Yöneticisi" };
function yerelId(harf) { return harf + Date.now().toString(36) + Math.floor(Math.random() * 1296).toString(36); }

/* Yerel yedek (sunucusuz çalışma için eski mantık, aynen korundu) */
const YerelAuth = {
  key: "ook_kullanici",
  usersKey: "ook_kullanicilar",
  mevcut() {
    try {
      const o = JSON.parse(localStorage.getItem(this.key));
      if (!o) return null;
      const k = this.tumKullanicilar().find(u => u.id === o.id);
      return k ? { id: k.id, ad: k.ad, eposta: k.eposta, rol: k.rol, tarih: k.tarih, avatar: k.avatar || null } : null;
    } catch (e) { return null; }
  },
  tumKullanicilar() {
    try { const l = JSON.parse(localStorage.getItem(this.usersKey)) || []; return Array.isArray(l) ? l : []; }
    catch (e) { return []; }
  },
  _kaydet(l) { localStorage.setItem(this.usersKey, JSON.stringify(l)); },
  _tohumla() {
    const l = this.tumKullanicilar();
    if (!l.find(u => u.rol === "admin")) {
      l.push({ id: "u-admin", ad: ADMIN_SEED.ad, eposta: ADMIN_SEED.eposta, karma: ADMIN_SEED.parolaKarma, rol: "admin", tarih: new Date().toISOString() });
      this._kaydet(l);
    }
  },
  kayit(ad, eposta, sifre) {
    this._tohumla();
    const users = this.tumKullanicilar();
    eposta = String(eposta).toLowerCase().trim(); sifre = String(sifre).trim();
    if (users.find(u => u.eposta === eposta)) return { hata: "Bu e-posta ile zaten kayıt var." };
    const k = { id: yerelId("u"), ad, eposta, karma: ookHash(sifre), rol: "ogrenci", tarih: new Date().toISOString() };
    users.push(k); this._kaydet(users);
    localStorage.setItem(this.key, JSON.stringify({ id: k.id, ad: k.ad, eposta: k.eposta, rol: k.rol, tarih: k.tarih }));
    return { ok: true, kullanici: k };
  },
  giris(eposta, sifre) {
    this._tohumla();
    eposta = String(eposta).toLowerCase().trim(); sifre = String(sifre).trim();
    const u = this.tumKullanicilar().find(x => x.eposta === eposta);
    if (!u) return { hata: "Bu e-posta ile kayıt bulunamadı. Önce kayıt olun." };
    const deneme = ookHash(sifre);
    if (u.karma !== deneme && u.sifre !== sifre) return { hata: "Şifre hatalı. Tekrar deneyin." };
    if (!u.karma) {
      const l = this.tumKullanicilar();
      const kayit = l.find(x => x.id === u.id);
      kayit.karma = ookHash(sifre); delete kayit.sifre; this._kaydet(l);
    }
    localStorage.setItem(this.key, JSON.stringify({ id: u.id, ad: u.ad, eposta: u.eposta, rol: u.rol, tarih: u.tarih }));
    return { ok: true, kullanici: u };
  },
  cikis() { localStorage.removeItem(this.key); },
  adminMi() { const k = this.mevcut(); return !!(k && k.rol === "admin"); },
  rolAta(kullaniciId, rol) {
    if (!this.adminMi()) return { hata: "Yetkisiz işlem." };
    if (!["ogrenci", "ogretmen", "veli", "admin"].includes(rol)) return { hata: "Geçersiz rol." };
    const l = this.tumKullanicilar();
    const k = l.find(x => x.id === kullaniciId);
    if (!k) return { hata: "Kullanıcı bulunamadı." };
    if (k.id === "u-admin" && rol !== "admin") return { hata: "Ana yönetici hesabının yetkisi alınamaz." };
    k.rol = rol; this._kaydet(l); return { ok: true };
  },
  kullaniciSil(kullaniciId) {
    if (!this.adminMi()) return { hata: "Yetkisiz işlem." };
    if (kullaniciId === "u-admin") return { hata: "Ana yönetici hesabı silinemez." };
    this._kaydet(this.tumKullanicilar().filter(x => x.id !== kullaniciId));
    return { ok: true };
  },
  sifreSifirla(kullaniciId, yeniSifre) {
    if (!this.adminMi()) return { hata: "Yetkisiz işlem." };
    if (String(yeniSifre).length < 4) return { hata: "Şifre en az 4 karakter olmalı." };
    const l = this.tumKullanicilar();
    const k = l.find(x => x.id === kullaniciId);
    if (!k) return { hata: "Kullanıcı bulunamadı." };
    k.karma = ookHash(yeniSifre); delete k.sifre; this._kaydet(l);
    return { ok: true };
  },
  parolaDegistir(yeniSifre) {
    const k = this.mevcut();
    if (!k) return { hata: "Giriş yapmalısınız." };
    if (String(yeniSifre).length < 6) return { hata: "Şifre en az 6 karakter olmalı." };
    const l = this.tumKullanicilar();
    const kayit = l.find(x => x.id === k.id);
    if (!kayit) return { hata: "Kullanıcı bulunamadı." };
    kayit.karma = ookHash(yeniSifre); delete kayit.sifre; this._kaydet(l);
    return { ok: true };
  }
};

/* Birincil Auth: sunucu varsa uzak, yoksa yerel */
const Auth = {
  _uzak: false,
  _oturum: null,
  async baslat() {
    this._uzak = await API.ping();
    if (this._uzak) {
      try {
        const j = await API.sor("oturum");
        this._oturum = (j && j.ok && j.kullanici) ? j.kullanici : null;
        window.__OOK_ADMIN__ = !!(this._oturum && this._oturum.rol === 'admin');
      } catch (e) { this._uzak = false; window.__OOK_ADMIN__ = false; }
    }
    if (!this._uzak) YerelAuth._tohumla();
    return this._uzak;
  },
  sunucuModu() { return this._uzak; },
  mevcut() {
    if (this._uzak) return this._oturum;
    return YerelAuth.mevcut();
  },
  async kayit(ad, eposta, sifre) {
    if (this._uzak) {
      const j = await API.sor("kayit", { ad, eposta, sifre });
      if (!j.ok) return { hata: j.hata || "Kayıt başarısız." };
      if (j.dogrulama_gerekli) return { ok: true, dogrulama_gerekli: true, eposta: j.eposta, posta_hatasi: j.posta_hatasi || "" };
      this._oturum = j.kullanici;
      window.__OOK_ADMIN__ = !!(this._oturum && this._oturum.rol === 'admin');
      return { ok: true, kullanici: j.kullanici };
    }
    return YerelAuth.kayit(ad, eposta, sifre);
  },
  async dogrula(hedef, kod) {
    if (!this._uzak) return { ok: true };
    const j = await API.sor("dogrula", { hedef, kod });
    if (!j.ok) return { hata: j.hata || "Doğrulanamadı." };
    this._oturum = j.kullanici;
    window.__OOK_ADMIN__ = !!(this._oturum && this._oturum.rol === 'admin');
    return { ok: true, kullanici: j.kullanici };
  },
  async kodTekrar(hedef) {
    if (!this._uzak) return { ok: true };
    const j = await API.sor("kod-tekrar", { hedef });
    return j.ok ? { ok: true } : { hata: j.hata || "Kod gönderilemedi." };
  },
  async telefonKayit(ad, telefon, sifre) {
    if (!this._uzak) {
      const r = YerelAuth.kayit(ad, telefon, sifre);
      return r;
    }
    const j = await API.sor("telefon-kayit", { ad, telefon, sifre });
    if (!j.ok) return { hata: j.hata || "Kayıt başarısız." };
    return { ok: true, dogrulama_gerekli: true, hedef: j.hedef, kanal: "telefon", posta_hatasi: j.posta_hatasi || "" };
  },
  async googleGiris(idToken) {
    const j = await API.sor("google-giris", { idToken });
    if (!j.ok) return { hata: j.hata || "Google ile giriş başarısız." };
    if (j.dogrulama_gerekli) return { ok: true, dogrulama_gerekli: true, eposta: j.eposta, kanal: "eposta", posta_hatasi: j.posta_hatasi || "" };
    this._oturum = j.kullanici;
    window.__OOK_ADMIN__ = !!(this._oturum && this._oturum.rol === 'admin');
    return { ok: true, kullanici: j.kullanici };
  },
  _yapilandirma: null,
  async yapilandirma() {
    if (!this._uzak) return { google: false, sms: false, eposta: true };
    if (!this._yapilandirma) {
      try { this._yapilandirma = await API.sor("yapilandirma"); }
      catch (e) { this._yapilandirma = { google: false, sms: false, eposta: true }; }
    }
    return this._yapilandirma;
  },
  async uyeOnayla(kullaniciId) {
    if (this._uzak) {
      const j = await API.sor("uye-onayla", { id: kullaniciId });
      return j.ok ? { ok: true } : { hata: j.hata || "Onaylanamadı." };
    }
    return { ok: true };
  },
  async testEposta(eposta) {
    const j = await API.sor("test-eposta", { eposta });
    return j.ok ? { ok: true } : { hata: j.hata || "Gönderilemedi." };
  },
  async giris(eposta, sifre) {
    if (this._uzak) {
      const j = await API.sor("giris", { eposta, sifre });
      if (!j.ok) return {
        hata: j.hata || "Giriş başarısız.",
        dogrulama_gerekli: j.hata_kodu === "VERIFY_REQUIRED" || String(j.hata || "").startsWith("E-POSTA-DOGRULAMA-GEREK"),
        hedef: j.hedef || eposta,
        kanal: j.kanal || "eposta"
      };
      this._oturum = j.kullanici;
      return { ok: true, kullanici: j.kullanici };
    }
    return YerelAuth.giris(eposta, sifre);
  },
  async cikis() {
    if (this._uzak) { try { await API.sor("cikis"); } catch (e) {} this._oturum = null; window.__OOK_ADMIN__ = false; }
    else { YerelAuth.cikis(); window.__OOK_ADMIN__ = false; }
  },
  adminMi() { const k = this.mevcut(); return !!(k && k.rol === "admin"); },
  async uyeleriGetir() {
    if (this._uzak) {
      const j = await API.sor("uyeler");
      if (!j.ok) return { hata: j.hata || "Liste alınamadı." };
      return { ok: true, uyeler: j.uyeler };
    }
    return { ok: true, uyeler: YerelAuth.tumKullanicilar() };
  },
  async istatistik() {
    if (this._uzak) {
      const j = await API.sor("istatistik");
      if (!j.ok) return { hata: j.hata || "Alınamadı." };
      return { ok: true, veri: j };
    }
    return { ok: true, veri: null };
  },
  async rolAta(kullaniciId, rol) {
    if (this._uzak) {
      const j = await API.sor("rol-ata", { id: kullaniciId, rol });
      return j.ok ? { ok: true } : { hata: j.hata || "Güncellenemedi." };
    }
    return YerelAuth.rolAta(kullaniciId, rol);
  },
  async kullaniciSil(kullaniciId) {
    if (this._uzak) {
      const j = await API.sor("uye-sil", { id: kullaniciId });
      return j.ok ? { ok: true } : { hata: j.hata || "Silinemedi." };
    }
    return YerelAuth.kullaniciSil(kullaniciId);
  },
  async sifreSifirla(kullaniciId, yeniSifre) {
    if (this._uzak) {
      const j = await API.sor("sifre-ver", { id: kullaniciId, yeni: yeniSifre });
      return j.ok ? { ok: true } : { hata: j.hata || "Tanımlanamadı." };
    }
    return YerelAuth.sifreSifirla(kullaniciId, yeniSifre);
  },
  async avatarGuncelle(avatar) {
    if (this._uzak) {
      const j = await API.sor('avatar-guncelle', { avatar });
      if (!j.ok) return { hata: j.hata || 'Avatar güncellenemedi.' };
      if (this._oturum) this._oturum.avatar = j.avatar || null;
      return { ok: true, avatar: j.avatar || null };
    }
    const k = YerelAuth.mevcut();
    if (!k) return { hata: 'Giriş yapmalısınız.' };
    const users = YerelAuth.tumKullanicilar();
    const kayit = users.find(x => String(x.id) === String(k.id));
    if (!kayit) return { hata: 'Kullanıcı bulunamadı.' };
    kayit.avatar = avatar || null;
    YerelAuth._kaydet(users);
    localStorage.setItem(YerelAuth.key, JSON.stringify({ id: kayit.id, ad: kayit.ad, eposta: kayit.eposta, rol: kayit.rol, tarih: kayit.tarih, avatar: kayit.avatar }));
    return { ok: true, avatar: kayit.avatar };
  },
  async avatarSil() {
    return this.avatarGuncelle(null);
  },
  async parolaDegistir(yeniSifre) {
    if (this._uzak) {
      const j = await API.sor("sifre-degistir", { yeni: yeniSifre });
      return j.ok ? { ok: true } : { hata: j.hata || "Güncellenemedi." };
    }
    return YerelAuth.parolaDegistir(yeniSifre);
  },
  /* Favoriler her zaman bu cihazda tutulur (hızlı ve girişsiz çalışır) */
  favoriler() { try { return JSON.parse(localStorage.getItem("ook_fav_" + (this.mevcut()?.id || "misafir"))) || []; } catch (e) { return []; } },
  favoriEkle(kitapId) {
    const k = this.mevcut(); const ls = "ook_fav_" + (k?.id || "misafir");
    let f = []; try { f = JSON.parse(localStorage.getItem(ls)) || []; } catch (e) {}
    if (!f.includes(kitapId)) f.push(kitapId);
    localStorage.setItem(ls, JSON.stringify(f));
  },
  favoriCikar(kitapId) {
    const k = this.mevcut(); const ls = "ook_fav_" + (k?.id || "misafir");
    let f = []; try { f = JSON.parse(localStorage.getItem(ls)) || []; } catch (e) {}
    localStorage.setItem(ls, JSON.stringify(f.filter(x => x !== kitapId)));
  }
};

/* ===== forum.js ===== */
/* Forum — sunucu (PHP+MySQL) varsa ortak veritabanı, yoksa yerel yedek */
const YerelForum = {
  key: "ook_forum_v1",
  yukle() {
    try {
      const v = JSON.parse(localStorage.getItem(this.key));
      if (Array.isArray(v) && v.length) return v;
    } catch (e) {}
    localStorage.setItem(this.key, JSON.stringify(FORUM_SEED));
    return JSON.parse(JSON.stringify(FORUM_SEED));
  },
  kaydet(liste) { localStorage.setItem(this.key, JSON.stringify(liste)); },
  soruEkle({ sinif, ders, unite, baslik, govde, gorsel }) {
    const liste = this.yukle();
    const k = Auth.mevcut();
    liste.unshift({
      id: yerelId("s"), sinif: Number(sinif), ders, unite, baslik, govde,
      yazar: k ? `${k.ad} (${rolAdi(k.rol)})` : "Misafir",
      rol: k ? k.rol : "ogrenci", tarih: new Date().toISOString(),
      begeni: 0, cozuldu: false, gorsel: gorsel || null, yanitlar: []
    });
    this.kaydet(liste); return liste;
  },
  yanitEkle(soruId, metin) {
    const liste = this.yukle();
    const s = liste.find(x => x.id === soruId); if (!s) return liste;
    const k = Auth.mevcut();
    s.yanitlar.push({
      id: yerelId("y"), yazar: k ? `${k.ad} (${rolAdi(k.rol)})` : "Misafir",
      rol: k ? k.rol : "ogrenci", metin, begeni: 0, dogru: false, tarih: new Date().toISOString()
    });
    this.kaydet(liste); return liste;
  },
  begen(soruId, yanitId) {
    const liste = this.yukle();
    const s = liste.find(x => x.id === soruId); if (!s) return liste;
    if (!yanitId) s.begeni++;
    else { const y = s.yanitlar.find(a => a.id === yanitId); if (y) y.begeni++; }
    this.kaydet(liste); return liste;
  },
  dogruIsaretle(soruId, yanitId) {
    const liste = this.yukle();
    const s = liste.find(x => x.id === soruId); if (!s) return liste;
    const k = Auth.mevcut();
    const soruSahibi = k && s.yazar.startsWith(k.ad);
    const yetkili = k && (k.rol === "ogretmen" || k.rol === "admin" || soruSahibi);
    if (!yetkili && s.yazar !== "Misafir") { alert("Doğru yanıtı yalnızca soru sahibi veya öğretmen işaretleyebilir."); return liste; }
    s.yanitlar.forEach(a => a.dogru = (a.id === yanitId));
    s.cozuldu = true;
    this.kaydet(liste); return liste;
  },
  soruSil(soruId) {
    this.kaydet(this.yukle().filter(x => x.id !== soruId));
  },
  yanitSil(soruId, yanitId) {
    const liste = this.yukle();
    const s = liste.find(x => x.id === soruId);
    if (s) { s.yanitlar = s.yanitlar.filter(a => a.id !== yanitId); this.kaydet(liste); }
  }
};
const YerelSikayet = {
  key: "ook_sikayet_v1",
  yukle() { try { const v = JSON.parse(localStorage.getItem(this.key)); if (Array.isArray(v)) return v; } catch (e) {} return []; },
  kaydet(l) { localStorage.setItem(this.key, JSON.stringify(l)); }
};
function rolAdi(r) { return r === "ogretmen" ? "Öğretmen" : r === "veli" ? "Veli" : r === "admin" ? "Yönetici" : "Öğrenci"; }
function yanitSayiId(yid) { return parseInt(String(yid).replace(/^\D+/, ""), 10) || 0; }

const Forum = {
  _sonListe: [],
  async liste(f) {
    f = f || {};
    if (Auth.sunucuModu()) {
      const j = await API.sor("sorular", {
        sinif: f.sinif || "", ders: f.ders || "", durum: f.durum || "", q: f.q || ""
      });
      if (!j.ok) throw new Error(j.hata || "Sorular alınamadı.");
      this._sonListe = j.sorular;
      return j.sorular;
    }
    let s = YerelForum.yukle();
    s = s.filter(x =>
      (!f.sinif || x.sinif == f.sinif) &&
      (!f.ders || x.ders === f.ders) &&
      (!f.durum || (f.durum === "cozuldu" ? x.cozuldu : !x.cozuldu)) &&
      (!f.q || (x.baslik + " " + x.govde).toLocaleLowerCase("tr").includes(String(f.q).toLocaleLowerCase("tr")))
    );
    this._sonListe = s;
    return s;
  },
  async soruEkle(o) {
    if (Auth.sunucuModu()) {
      const j = await API.soruGonderJson({
        sinif: o.sinif, ders: o.ders, unite: o.unite,
        baslik: o.baslik, govde: o.govde, gorsel: o.gorsel || null
      });
      if (!j.ok) throw new Error(j.hata || "Soru yayınlanamadı.");
      return j;
    }
    return YerelForum.soruEkle(o);
  },
  async yanitEkle(soruId, metin) {
    if (Auth.sunucuModu()) {
      const j = await API.sor("yanit-ekle", { soru_id: soruId, metin });
      if (!j.ok) throw new Error(j.hata || "Yanıt yayınlanamadı.");
      return j;
    }
    return YerelForum.yanitEkle(soruId, metin);
  },
  async begen(soruId, yanitId) {
    if (Auth.sunucuModu()) {
      const j = await API.sor("begeni", yanitId
        ? { hedef: "yanit", id: yanitSayiId(yanitId) }
        : { hedef: "soru", id: soruId });
      if (!j.ok) throw new Error(j.hata || "Beğenilemedi.");
      return j;
    }
    return YerelForum.begen(soruId, yanitId);
  },
  async dogruIsaretle(soruId, yanitId) {
    if (Auth.sunucuModu()) {
      const j = await API.sor("dogru-isaretle", { soru_id: soruId, id: yanitSayiId(yanitId) });
      if (!j.ok) throw new Error(j.hata || "İşaretlenemedi.");
      return j;
    }
    return YerelForum.dogruIsaretle(soruId, yanitId);
  },
  async soruSil(soruId) {
    if (Auth.sunucuModu()) {
      const j = await API.sor("soru-sil", { id: soruId });
      if (!j.ok) throw new Error(j.hata || "Silinemedi.");
      return j;
    }
    return YerelForum.soruSil(soruId);
  },
  async sikayetEt(hedef, hedefId, neden, aciklama) {
    const ben = Auth.mevcut();
    if (!ben) throw new Error("Şikayet etmek için giriş yapın.");
    if (Auth.sunucuModu()) {
      const j = await API.sor("sikayet-et", { hedef, hedef_id: hedefId, neden, aciklama: aciklama || "" });
      if (!j.ok) throw new Error(j.hata || "Şikayet gönderilemedi.");
      return j;
    }
    const l = YerelSikayet.yukle();
    if (l.some(s => s.hedef === hedef && String(s.hedef_id) === String(hedefId) && s.bildiren === ben.ad && s.durum === "bekliyor"))
      throw new Error("Bu içeriği zaten şikayet ettiniz.");
    l.unshift({ id: yerelId("r"), hedef, hedef_id: hedefId, neden, aciklama: aciklama || "",
      bildiren: ben.ad, durum: "bekliyor", tarih: new Date().toISOString() });
    YerelSikayet.kaydet(l);
    return { ok: true };
  },
  async sikayetler(durum) {
    if (Auth.sunucuModu()) {
      const j = await API.sor("sikayetler", { durum: durum || "" });
      if (!j.ok) throw new Error(j.hata || "Şikayetler alınamadı.");
      return j.sikayetler;
    }
    let l = YerelSikayet.yukle();
    if (durum) l = l.filter(s => s.durum === durum);
    return l.map(s => ({ ...s, ozet: "", soru_id: s.hedef === "soru" ? s.hedef_id : null }));
  },
  async sikayetKapat(id) {
    if (Auth.sunucuModu()) {
      const j = await API.sor("sikayet-kapat", { id });
      if (!j.ok) throw new Error(j.hata || "Kapatılamadı.");
      return j;
    }
    const l = YerelSikayet.yukle();
    const s = l.find(x => String(x.id) === String(id));
    if (s) { s.durum = "incelendi"; YerelSikayet.kaydet(l); }
    return { ok: true };
  },
  async yanitSil(soruId, yanitId) {
    if (Auth.sunucuModu()) {
      const j = await API.sor("yanit-sil", { id: yanitSayiId(yanitId) });
      if (!j.ok) throw new Error(j.hata || "Silinemedi.");
      return j;
    }
    return YerelForum.yanitSil(soruId, yanitId);
  }
};

/* ===== mesaj.js ===== */
/* Özel mesajlar — sunucu varsa ortak veritabanı, yoksa yerel yedek.
   Not: güvenlik denetimi kapsamında mesajlar yöneticiler tarafından görüntülenebilir. */
const YerelMesaj = {
  key: "ook_mesaj_v1",
  yukle() {
    try { const v = JSON.parse(localStorage.getItem(this.key)); if (Array.isArray(v)) return v; } catch (e) {}
    return [];
  },
  kaydet(l) { localStorage.setItem(this.key, JSON.stringify(l)); }
};

const Mesaj = {
  _acikSohbet: null,
  _gonderiliyor: false,
  async sohbetler() {
    const ben = Auth.mevcut();
    if (!ben) return { sohbetler: [], okunmamis_toplam: 0 };
    if (Auth.sunucuModu()) {
      const j = await API.sor("sohbetler");
      if (!j.ok) throw new Error(j.hata || "Sohbetler alınamadı.");
      return j;
    }
    const tum = YerelMesaj.yukle().filter(m => m.gonderen_id === ben.id || m.alici_id === ben.id);
    const harita = {};
    const adBul = (id) => {
      const u = YerelAuth.tumKullanicilar().find(x => String(x.id) === String(id));
      return u ? u.ad : "Silinmiş Üye";
    };
    tum.sort((a, b) => (a.tarih < b.tarih ? 1 : -1));
    for (const m of tum) {
      const karsi = String(m.gonderen_id) === String(ben.id) ? m.alici_id : m.gonderen_id;
      if (!harita[karsi]) harita[karsi] = { karsi_id: karsi, karsi_ad: adBul(karsi), karsi_avatar: (YerelAuth.tumKullanicilar().find(x => String(x.id) === String(karsi)) || {}).avatar || null, son_metin: m.metin, son_zaman: m.tarih, okunmamis: 0 };
      if (String(m.alici_id) === String(ben.id) && !m.okundu) harita[karsi].okunmamis++;
    }
    const liste = Object.values(harita);
    return { sohbetler: liste, okunmamis_toplam: liste.reduce((t, s) => t + s.okunmamis, 0) };
  },
  async kisiler() {
    const ben = Auth.mevcut();
    if (Auth.sunucuModu()) {
      const j = await API.sor("kisiler");
      if (!j.ok) throw new Error(j.hata || "Kişiler alınamadı.");
      return j.kisiler;
    }
    return YerelAuth.tumKullanicilar()
      .filter(u => String(u.id) !== String(ben && ben.id))
      .map(u => ({ id: u.id, ad: u.ad, rol: u.rol, avatar: u.avatar || null }));
  },
  async getir(karsiId) {
    const ben = Auth.mevcut();
    if (Auth.sunucuModu()) {
      const j = await API.sor("mesajlar", { karsi_id: karsiId });
      if (!j.ok) throw new Error(j.hata || "Mesajlar alınamadı.");
      return {
        karsi: j.karsi,
        mesajlar: j.mesajlar.map(m => ({
          id: m.id, metin: m.metin, tarih: m.olusturma,
          giden: Number(m.gonderen_id) === Number(ben.id)
        }))
      };
    }
    const tum = YerelMesaj.yukle().filter(m =>
      (String(m.gonderen_id) === String(ben.id) && String(m.alici_id) === String(karsiId)) ||
      (String(m.gonderen_id) === String(karsiId) && String(m.alici_id) === String(ben.id)));
    tum.forEach(m => { if (String(m.alici_id) === String(ben.id)) m.okundu = true; });
    YerelMesaj.kaydet(YerelMesaj.yukle().map(m => {
      if (String(m.alici_id) === String(ben.id) && String(m.gonderen_id) === String(karsiId)) m.okundu = true;
      return m;
    }));
    const u = YerelAuth.tumKullanicilar().find(x => String(x.id) === String(karsiId)) || { ad: "Silinmiş Üye" };
    return {
      karsi: { id: karsiId, ad: u.ad },
      mesajlar: tum.sort((a, b) => (a.tarih < b.tarih ? -1 : 1)).map(m => ({
        id: m.id, metin: m.metin, tarih: m.tarih,
        giden: String(m.gonderen_id) === String(ben.id)
      }))
    };
  },
  async gonder(aliciId, metin) {
    const ben = Auth.mevcut();
    metin = String(metin).trim();
    if (!metin) throw new Error("Mesaj boş olamaz.");
    if (metin.length > 1000) throw new Error("Mesaj en fazla 1000 karakter olabilir.");
    if (Auth.sunucuModu()) {
      const j = await API.sor("mesaj-gonder", { alici_id: aliciId, metin });
      if (!j.ok) throw new Error(j.hata || "Mesaj gönderilemedi.");
      return j;
    }
    const l = YerelMesaj.yukle();
    l.push({ id: yerelId("m"), gonderen_id: ben.id, alici_id: aliciId, metin, okundu: false, tarih: new Date().toISOString() });
    YerelMesaj.kaydet(l);
    return { ok: true };
  },
  async sil(id) {
    if (Auth.sunucuModu()) {
      const j = await API.sor("mesaj-sil", { id });
      if (!j.ok) throw new Error(j.hata || "Silinemedi.");
      return j;
    }
    const ben = Auth.mevcut();
    const l = YerelMesaj.yukle().filter(m =>
      !(String(m.id) === String(id) && (String(m.gonderen_id) === String(ben.id) || (ben && ben.rol === "admin"))));
    YerelMesaj.kaydet(l);
    return { ok: true };
  },
  async denetim(q) {
    if (Auth.sunucuModu()) {
      const j = await API.sor("denetim-mesajlar", { q: q || "" });
      if (!j.ok) throw new Error(j.hata || "Denetim listesi alınamadı.");
      return j.mesajlar;
    }
    const adBul = (id) => {
      const u = YerelAuth.tumKullanicilar().find(x => String(x.id) === String(id));
      return u ? u.ad : "Silinmiş Üye";
    };
    return YerelMesaj.yukle()
      .filter(m => !q || m.metin.toLocaleLowerCase("tr").includes(String(q).toLocaleLowerCase("tr")))
      .slice(-100).reverse()
      .map(m => ({ id: m.id, g_ad: adBul(m.gonderen_id), a_ad: adBul(m.alici_id), metin: m.metin, olusturma: m.tarih }));
  }
};

/* ===== tercih.js ===== */
/* Kişiselleştirme — sınıf/ders/kitap davranışlarını yerel + sunucu profiline dönüştürür. */
const Tercih = {
  key: 'ook_tercih_v2',
  veri: { sinif: {}, ders: {}, kitap: {} },
  uzak: [],
  async baslat() {
    try {
      const raw = JSON.parse(localStorage.getItem(this.key) || '{}');
      this.veri = {
        sinif: raw.sinif || {},
        ders: raw.ders || {},
        kitap: raw.kitap || {}
      };
    } catch (e) {}
    if (Auth.sunucuModu() && Auth.mevcut()) {
      try {
        const j = await API.sor('tercih-ozet');
        if (j.ok) this.uzak = j.kayitlar || [];
      } catch (e) { this.uzak = []; }
    } else {
      this.uzak = [];
    }
  },
  _kaydet() {
    try { localStorage.setItem(this.key, JSON.stringify(this.veri)); } catch (e) {}
  },
  _yerel(sinif, ders, kitapId, olay, agirlik) {
    const s = String(sinif || '');
    const d = String(ders || '');
    if (s) this.veri.sinif[s] = Number(this.veri.sinif[s] || 0) + agirlik;
    if (s && d) {
      const dk = s + '|' + d;
      this.veri.ders[dk] = Number(this.veri.ders[dk] || 0) + agirlik;
    }
    if (kitapId) {
      const b = this.veri.kitap[kitapId] || { goruntuleme: 0, acma: 0, favori: 0, indirme: 0 };
      if (olay && Object.prototype.hasOwnProperty.call(b, olay)) b[olay] = Number(b[olay] || 0) + 1;
      this.veri.kitap[kitapId] = b;
    }
    this._kaydet();
  },
  etkiKitap(kitap, olay) {
    if (!kitap) return;
    const agirlik = olay === 'favori' ? 1.5 : olay === 'acma' ? 1.2 : 1;
    this._yerel(kitap.sinif, kitap.ders, kitap.id, olay, agirlik);
    if (Auth.sunucuModu() && Auth.mevcut()) {
      API.sor('tercih-etki', { sinif: kitap.sinif, ders: kitap.ders, kitap_id: kitap.id, olay }).catch(() => {});
    }
  },
  sinifGor(sinif) {
    if (![5, 6, 7, 8].includes(Number(sinif))) return;
    this._yerel(Number(sinif), '', '', 'goruntuleme', 1);
    if (Auth.sunucuModu() && Auth.mevcut()) API.sor('tercih-etki', { sinif: Number(sinif), ders: '', kitap_id: '', olay: 'goruntuleme' }).catch(() => {});
  },
  dersGor(sinif, ders) {
    if (!sinif || !ders) return;
    this._yerel(Number(sinif), ders, '', 'goruntuleme', 0.75);
    if (Auth.sunucuModu() && Auth.mevcut()) API.sor('tercih-etki', { sinif: Number(sinif), ders, kitap_id: '', olay: 'goruntuleme' }).catch(() => {});
  },
  _uzakSatirlar() {
    const s = {}, d = {}, b = {};
    for (const r of this.uzak) {
      const sinif = String(r.sinif || '');
      if (sinif) s[sinif] = Number(s[sinif] || 0) + Number(r.puan || 0);
      if (sinif && r.ders) d[sinif + '|' + r.ders] = Number(d[sinif + '|' + r.ders] || 0) + Number(r.puan || 0);
      if (r.kitap_id) b[r.kitap_id] = {
        goruntuleme: Number(r.goruntuleme || 0), acma: Number(r.acma || 0), favori: Number(r.favori || 0), indirme: Number(r.indirme || 0)
      };
    }
    return { sinif: s, ders: d, kitap: b };
  },
  ozet() {
    const u = this._uzakSatirlar();
    const sinif = {};
    const ders = {};
    const kitap = {};
    for (const k of new Set([...Object.keys(this.veri.sinif), ...Object.keys(u.sinif)])) sinif[k] = Number(this.veri.sinif[k] || 0) + Number(u.sinif[k] || 0);
    for (const k of new Set([...Object.keys(this.veri.ders), ...Object.keys(u.ders)])) ders[k] = Number(this.veri.ders[k] || 0) + Number(u.ders[k] || 0);
    for (const k of new Set([...Object.keys(this.veri.kitap), ...Object.keys(u.kitap)])) {
      const a = this.veri.kitap[k] || {}, b = u.kitap[k] || {};
      kitap[k] = { goruntuleme: Number(a.goruntuleme || 0) + Number(b.goruntuleme || 0), acma: Number(a.acma || 0) + Number(b.acma || 0), favori: Number(a.favori || 0) + Number(b.favori || 0), indirme: Number(a.indirme || 0) + Number(b.indirme || 0) };
    }
    return { sinif, ders, kitap };
  },
  tercihSinif() {
    const s = this.ozet().sinif;
    let en = '', skor = -1;
    Object.keys(s).forEach(k => { if (Number(s[k]) > skor) { skor = Number(s[k]); en = Number(k); } });
    return en ? Number(en) : null;
  },
  kitaplar() {
    const o = this.ozet();
    const pref = this.tercihSinif();
    const favs = new Set(Auth.favoriler ? Auth.favoriler() : []);
    const kitaplar = KITAPLAR.filter(k => !k.yakinda);
    const skor = k => {
      const cls = Number(o.sinif[String(k.sinif)] || 0);
      const ds = Number(o.ders[String(k.sinif) + '|' + k.ders] || 0);
      const b = o.kitap[k.id] || {};
      return (pref && Number(k.sinif) === pref ? 20 : 0) + cls * 10 + ds * 5 + Number(b.goruntuleme || 0) + Number(b.acma || 0) * 3 + Number(b.favori || 0) * 6 + Number(b.indirme || 0) * 2;
    };
    return kitaplar.map(k => ({ k, s: skor(k), fav: favs.has(k.id) }))
      .sort((a, b) => b.s - a.s || Number(a.k.sinif) - Number(b.k.sinif) || a.k.baslik.localeCompare(b.k.baslik, 'tr'))
      .map(x => x.k);
  },
  etiket() {
    const sinif = this.tercihSinif();
    if (!sinif) return 'Başlangıç için seçtiklerimiz';
    const o = this.ozet();
    const dersler = Object.entries(o.ders).filter(([key]) => key.startsWith(String(sinif) + '|')).sort((a,b)=>b[1]-a[1]);
    if (!dersler.length) return sinif + '. sınıfa göre';
    const id = dersler[0][0].split('|')[1];
    return sinif + '. sınıf • ' + dersAdi(id, sinif);
  }
};

/* ===== sesli.js ===== */
/* 1'e 1 WebRTC sesli görüşme.
   Ses sunucuya kaydedilmez; API yalnızca arama durumu ve WebRTC sinyalleşmesini taşır. */
const Sesli = {
  pc: null,
  stream: null,
  aramaId: null,
  karsiId: null,
  karsiAd: '',
  rol: '',
  calisiyor: false,
  poll: null,
  sonSinyal: 0,
  kilit: false,
  zamanlayici: null,
  uzakAdayKuyrugu: [],
  uzakSdpHazir: false,
  bagliBildirildi: false,
  sonHata: '',
  _iceSunuculari: null,

  async ara(karsiId, karsiAd) {
    if (this.calisiyor) return toast('Zaten bir sesli görüşme devam ediyor.');
    if (!Auth.mevcut()) return authModal('giris');
    if (!window.isSecureContext || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return toast('Sesli arama için siteyi HTTPS üzerinden açın ve mikrofon izni verin.');
    }
    if (!window.RTCPeerConnection) return toast('Tarayıcınız WebRTC sesli görüşmeyi desteklemiyor.');

    try {
      this.sifirlaDurum();
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });

      const j = await API.sor('sesli-arama-baslat', { karsi_id: karsiId });
      if (!j.ok) throw new Error(j.hata || 'Arama başlatılamadı.');

      this.aramaId = j.arama_id;
      this.karsiId = karsiId;
      this.karsiAd = karsiAd || j.karsi_ad || 'Kullanıcı';
      this.rol = 'arayan';
      this.calisiyor = true;
      this.arayuz('giden', this.karsiAd);

      await this.pcHazirla(true);
      const offer = await this.pc.createOffer({ offerToReceiveAudio: true });
      await this.pc.setLocalDescription(offer);
      await this.localSdpHazirliginiBekle();
      await API.sor('sesli-arama-teklif', { arama_id: this.aramaId, teklif: this.pc.localDescription });

      this.pollBaslat();
      clearTimeout(this.zamanlayici);
      this.zamanlayici = setTimeout(() => {
        if (this.calisiyor && this.rol === 'arayan' && this.aramaId) {
          this.kapat(false, 'Karşı taraf cevap vermedi.');
        }
      }, 60000);
      toast(this.karsiAd + ' aranıyor…');
    } catch (e) {
      const mesaj = e && e.name === 'NotAllowedError'
        ? 'Mikrofon izni verilmedi. Tarayıcı adres çubuğundan mikrofon iznini açın.'
        : (e && e.message ? e.message : 'Sesli görüşme başlatılamadı.');
      await this.kapat(true);
      toast(mesaj);
    }
  },

  async araFromButton(el) {
    if (!el) return;
    await this.ara(el.dataset.sesliId, el.dataset.sesliAd || 'Kullanıcı');
  },

  async kabulEtId(id) {
    if (this.calisiyor) return;
    try {
      const j = await API.sor('sesli-arama-durum', { arama_id: id, sonra: 0 });
      if (!j.ok || !j.arama || !j.arama.teklif || j.arama.durum !== 'caliyor') {
        return toast('Arama artık mevcut değil.');
      }
      await this.kabulEt(j.arama);
    } catch (e) {
      toast(e.message || 'Arama bilgisi alınamadı.');
    }
  },

  async gelenleriKontrolEt() {
    if (!Auth.mevcut() || this.calisiyor || document.hidden) return;
    try {
      const j = await API.sor('sesli-gelen-arama');
      if (j.ok && j.arama && j.arama.teklif) this.gelenAramaGoster(j.arama);
    } catch (e) {}
  },

  async kabulEt(arama) {
    if (this.calisiyor) return;
    try {
      this.sifirlaDurum();
      this.aramaId = arama.id;
      this.karsiId = arama.arayan_id;
      this.karsiAd = arama.arayan_ad || 'Kullanıcı';
      this.rol = 'aranan';
      this.calisiyor = true;
      this.arayuz('gelen', this.karsiAd);

      if (!window.isSecureContext || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Sesli arama için siteyi HTTPS üzerinden açın ve mikrofon izni verin.');
      }
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      await this.pcHazirla(false);
      await this.pc.setRemoteDescription(new RTCSessionDescription(arama.teklif));
      this.uzakSdpHazir = true;
      await this.kuyruktakiAdaylariEkle();

      const answer = await this.pc.createAnswer();
      await this.pc.setLocalDescription(answer);
      await this.localSdpHazirliginiBekle();
      await API.sor('sesli-arama-yanit', { arama_id: this.aramaId, yanit: this.pc.localDescription });
      await API.sor('sesli-arama-durum-guncelle', { arama_id: this.aramaId, durum: 'baglaniyor' });
      this.pollBaslat();
    } catch (e) {
      const mesaj = e && e.name === 'NotAllowedError'
        ? 'Mikrofon izni verilmedi. Tarayıcı adres çubuğundan mikrofon iznini açın.'
        : (e && e.message ? e.message : 'Sesli görüşme başlatılamadı.');
      await this.kapat(true);
      toast(mesaj);
    }
  },

  reddet(aramaId) {
    API.sor('sesli-arama-kapat', { arama_id: aramaId }).catch(() => {});
    this.panelKapat();
  },

  async iceSunuculari() {
    if (this._iceSunuculari) return this._iceSunuculari;
    const varsayilan = [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun.cloudflare.com:3478' }
    ];
    try {
      const j = await API.sor('sesli-yapilandirma');
      if (j && j.ok && Array.isArray(j.ice_servers) && j.ice_servers.length) {
        this._iceSunuculari = j.ice_servers;
        return this._iceSunuculari;
      }
    } catch (e) {
      this.sonHata = e && e.message ? e.message : 'Sesli görüşme sunucu ayarları alınamadı.';
    }
    this._iceSunuculari = varsayilan;
    return this._iceSunuculari;
  },

  async pcHazirla(isCaller) {
    const iceServers = await this.iceSunuculari();
    this.pc = new RTCPeerConnection({ iceServers, bundlePolicy: 'balanced' });
    this.uzakSdpHazir = false;
    this.bagliBildirildi = false;

    this.stream.getTracks().forEach(t => this.pc.addTrack(t, this.stream));

    this.pc.ontrack = async e => {
      let audio = document.getElementById('sesliUzakSes');
      if (!audio) {
        audio = document.createElement('audio');
        audio.id = 'sesliUzakSes';
        audio.autoplay = true;
        audio.playsInline = true;
        audio.controls = false;
        document.body.appendChild(audio);
      }
      audio.srcObject = e.streams && e.streams[0] ? e.streams[0] : new MediaStream([e.track]);
      try {
        await audio.play();
      } catch (err) {
        this.durumGuncelle('Bağlantı kuruldu — sesi açmak için sayfaya dokunun.');
      }
    };

    this.pc.onicecandidate = async e => {
      if (!e.candidate || !this.aramaId) return;
      try {
        const j = await API.sor('sesli-arama-sinyal', { arama_id: this.aramaId, sinyal: e.candidate });
        if (j && j.ok === false) this.sonHata = j.hata || 'ICE sinyali gönderilemedi.';
      } catch (x) {
        this.sonHata = x.message || 'ICE sinyali gönderilemedi.';
      }
    };

    this.pc.onconnectionstatechange = () => {
      const st = this.pc && this.pc.connectionState;
      const durum = document.getElementById('sesliDurum');
      if (durum) {
        durum.textContent = st === 'connected' ? 'Bağlantı kuruldu' :
          st === 'connecting' ? 'Bağlanıyor…' :
          st === 'disconnected' ? 'Bağlantı koptu' :
          st === 'failed' ? 'Bağlantı kurulamadı' :
          st === 'closed' ? 'Görüşme kapandı' : 'Arama sürüyor…';
      }
      if (st === 'connected' && !this.bagliBildirildi && this.aramaId) {
        this.bagliBildirildi = true;
        API.sor('sesli-arama-durum-guncelle', { arama_id: this.aramaId, durum: 'bagli' }).catch(() => {});
      }
      if (st === 'failed') this.kapat(true, 'Sesli bağlantı kurulamadı.');
      if (st === 'closed') this.kapat(true);
    };

    this.pc.oniceconnectionstatechange = () => {
      const st = this.pc && this.pc.iceConnectionState;
      if (st === 'failed') this.durumGuncelle('Ağ bağlantısı kurulamadı.');
      if (st === 'checking') this.durumGuncelle('Ağ bağlantısı kontrol ediliyor…');
    };
    this.pc.onicecandidateerror = () => {
      this.sonHata = 'ICE sunucusuna ulaşılamadı.';
    };

    if (!isCaller) return;
  },

  async localSdpHazirliginiBekle() {
    if (!this.pc || this.pc.iceGatheringState === 'complete') return;
    await new Promise(resolve => {
      const bitir = () => {
        clearTimeout(zaman);
        if (this.pc) this.pc.removeEventListener('icegatheringstatechange', kontrol);
        resolve();
      };
      const kontrol = () => {
        if (this.pc && this.pc.iceGatheringState === 'complete') bitir();
      };
      const zaman = setTimeout(bitir, 8000);
      this.pc.addEventListener('icegatheringstatechange', kontrol);
    });
  },

  pollBaslat() {
    clearInterval(this.poll);
    this.sonSinyal = 0;
    this.poll = setInterval(() => this.pollEt(), 800);
    this.pollEt();
  },

  async pollEt() {
    if (!this.aramaId || !this.calisiyor) return;
    try {
      const j = await API.sor('sesli-arama-durum', { arama_id: this.aramaId, sonra: this.sonSinyal });
      if (!j.ok) return;

      // KRİTİK: Caller tarafında önce answer SDP uzak açıklama olarak kurulmalı.
      // Karşı tarafın ICE adayları answer'dan önce gelirse kuyrukta tutulur.
      if (this.rol === 'arayan' && j.arama && j.arama.yanit && this.pc && !this.pc.currentRemoteDescription) {
        await this.pc.setRemoteDescription(new RTCSessionDescription(j.arama.yanit));
        this.uzakSdpHazir = true;
        await this.kuyruktakiAdaylariEkle();
        this.durumGuncelle('Bağlanıyor…');
      }

      if (j.sinyaller && j.sinyaller.length) {
        for (const s of j.sinyaller) {
          this.sonSinyal = Math.max(this.sonSinyal, Number(s.id || 0));
          if (!s.sinyal || !this.pc || this.pc.signalingState === 'closed') continue;
          if (!this.uzakSdpHazir || !this.pc.remoteDescription) {
            this.uzakAdayKuyrugu.push(s.sinyal);
            continue;
          }
          try { await this.pc.addIceCandidate(new RTCIceCandidate(s.sinyal)); } catch (e) {
            this.uzakAdayKuyrugu.push(s.sinyal);
          }
        }
        await this.kuyruktakiAdaylariEkle();
      }

      if (j.arama && j.arama.durum === 'kapali') {
        this.kapat(true, 'Karşı taraf görüşmeyi sonlandırdı.');
      }
    } catch (e) {
      this.sonHata = e.message || 'Sinyalleşme hatası.';
    }
  },

  async kuyruktakiAdaylariEkle() {
    if (!this.pc || !this.uzakSdpHazir || !this.pc.remoteDescription || !this.uzakAdayKuyrugu.length) return;
    const kuyruk = this.uzakAdayKuyrugu.splice(0);
    for (const s of kuyruk) {
      try { await this.pc.addIceCandidate(new RTCIceCandidate(s)); }
      catch (e) { /* Aynı adayın sonraki denemesi bağlantıyı bozmasın. */ }
    }
  },

  sifirlaDurum() {
    this.sonSinyal = 0;
    this.uzakAdayKuyrugu = [];
    this.uzakSdpHazir = false;
    this.bagliBildirildi = false;
    this.sonHata = '';
  },

  async kapat(sessiz, bildirim) {
    const id = this.aramaId;
    clearInterval(this.poll); this.poll = null;
    clearTimeout(this.zamanlayici); this.zamanlayici = null;

    if (id && !this.kilit) {
      this.kilit = true;
      API.sor('sesli-arama-kapat', { arama_id: id }).catch(() => {});
    }
    if (this.stream) this.stream.getTracks().forEach(t => t.stop());
    if (this.pc) try { this.pc.close(); } catch (e) {}

    const a = document.getElementById('sesliUzakSes');
    if (a) { try { a.pause(); } catch (e) {} a.srcObject = null; a.remove(); }

    this.pc = null;
    this.stream = null;
    this.aramaId = null;
    this.karsiId = null;
    this.calisiyor = false;
    this.kilit = false;
    this.sifirlaDurum();
    this.panelKapat();
    if (!sessiz && bildirim) toast(bildirim);
    else if (!sessiz) toast('Sesli görüşme sonlandırıldı.');
  },

  arayuz(tip, ad) {
    const p = document.getElementById('sesliAramaPanel');
    if (!p) return;
    p.innerHTML = `<div class="sesli-kutu">
      <div class="sesli-ust"><span class="sesli-durum-nokta"></span><div><b>${kac(ad)}</b><div id="sesliDurum">${tip === 'gelen' ? 'Gelen sesli arama' : 'Aranıyor…'}</div></div>
      <button class="sesli-kapat" onclick="Sesli.kapat(false)">Kapat</button></div>
      <div class="sesli-icerik"><div class="sesli-mikrofon">🎙️</div><p>Sesli görüşme</p><small>Mikrofonunuz kullanılacak. Görüşme kaydedilmez.</small></div>
    </div>`;
    p.classList.remove('hidden');
  },

  gelenAramaGoster(a) {
    const p = document.getElementById('sesliAramaPanel');
    if (!p || p.dataset.incoming === String(a.id)) return;
    p.dataset.incoming = String(a.id);
    p.innerHTML = `<div class="sesli-kutu">
      <div class="sesli-ust"><span class="sesli-durum-nokta"></span><div><b>${kac(a.arayan_ad || 'Kullanıcı')}</b><div>Sesli arama geliyor</div></div></div>
      <div class="sesli-aksiyonlar"><button class="btn btn-birincil" onclick="Sesli.kabulEtId('${kac(a.id)}')">Kabul Et</button><button class="btn btn-ikincil" onclick="Sesli.reddet('${a.id}')">Reddet</button></div>
    </div>`;
    p.classList.remove('hidden');
  },

  durumGuncelle(s) {
    const el = document.getElementById('sesliDurum');
    if (el) el.textContent = s;
  },

  panelKapat() {
    const p = document.getElementById('sesliAramaPanel');
    if (p) { p.classList.add('hidden'); p.innerHTML = ''; delete p.dataset.incoming; }
  }
};

setInterval(() => {
  if (typeof Auth !== 'undefined' && Auth.sunucuModu && Auth.sunucuModu()) Sesli.gelenleriKontrolEt();
}, 2500);

/* ===== paylasim.js ===== */
/* Öğretmen paylaşımları — sunucu varsa ortak DB, yoksa yerel yedek.
   Yazma yetkisi: yalnızca öğretmen ve yöneticiler. Okuma: herkese açık. */
const YerelPaylasim = {
  key: "ook_paylasim_v1",
  yukle() { try { const v = JSON.parse(localStorage.getItem(this.key)); if (Array.isArray(v)) return v; } catch (e) {} return []; },
  kaydet(l) { localStorage.setItem(this.key, JSON.stringify(l)); }
};

const Paylasim = {
  async liste(f) {
    f = f || {};
    if (Auth.sunucuModu()) {
      const j = await API.sor("paylasimlar", { sinif: f.sinif || "", ders: f.ders || "", q: f.q || "" });
      if (!j.ok) throw new Error(j.hata || "Paylaşımlar alınamadı.");
      return j.paylasimlar;
    }
    let l = YerelPaylasim.yukle();
    return l.filter(p =>
      (!f.sinif || String(p.sinif) === String(f.sinif)) &&
      (!f.ders || p.ders === f.ders) &&
      (!f.q || ((p.baslik + " " + p.icerik).toLocaleLowerCase("tr").includes(String(f.q).toLocaleLowerCase("tr")))));
  },
  yazabilir() {
    const k = Auth.mevcut();
    return !!(k && (k.rol === "ogretmen" || k.rol === "admin"));
  },
  async ekle(o) {
    if (Auth.sunucuModu()) {
      const j = await API.sor("paylasim-ekle", o);
      if (!j.ok) throw new Error(j.hata || "Paylaşılamadı.");
      return j;
    }
    const k = Auth.mevcut();
    if (!k || (k.rol !== "ogretmen" && k.rol !== "admin"))
      throw new Error("Paylaşım yalnızca öğretmenler ve yöneticiler tarafından yapılır.");
    const l = YerelPaylasim.yukle();
    l.unshift({
      id: yerelId("p"), sinif: Number(o.sinif), ders: o.ders, unite: o.unite || "",
      baslik: o.baslik, icerik: o.icerik, yazar_id: k.id, yazar_ad: k.ad,
      yazar_rol: k.rol, olusturma: new Date().toISOString()
    });
    YerelPaylasim.kaydet(l);
    return { ok: true };
  },
  async sil(id) {
    if (Auth.sunucuModu()) {
      const j = await API.sor("paylasim-sil", { id });
      if (!j.ok) throw new Error(j.hata || "Silinemedi.");
      return j;
    }
    YerelPaylasim.kaydet(YerelPaylasim.yukle().filter(p => String(p.id) !== String(id)));
    return { ok: true };
  }
};

/* ===== reader.js ===== */
/* Z-Kitap Reader: flipbook + canvas annotation + zoom/pan + thumbnails + fullscreen */
const Reader = {
  kitap: null, sayfalar: [], indeks: 0,
  arac: "kalem", renk: "#1b4f9c", kalinlik: 3,
  zoom: 1, ciziliyor: false, ctx: null, canvas: null,

  ac(kitapId) {
    this.kitap = KITAPLAR.find(k => k.id === kitapId);
    if (!this.kitap) return;
    if (typeof Tercih !== 'undefined') Tercih.etkiKitap(this.kitap, 'acma');
    this.sayfalar = kitapSayfalari(this.kitap);
    this.indeks = 0; this.zoom = 1;
    this.mod = this.kitap.pdfUrl ? "meb" : "ozet";
    document.getElementById("okuyucu").classList.add("acik");
    document.body.style.overflow = "hidden";
    document.getElementById("okuyucuKitapAdi").textContent =
      `${this.kitap.baslik} — ${this.kitap.yayinevi} (${this.kitap.yil})`;
    this.kucukResimler();
    this.sayfaGoster();
    this.modSec(this.mod);
  },
  kapat() {
    this.kaydetNot();
    document.getElementById("okuyucu").classList.remove("acik");
    document.body.style.overflow = "";
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  },
  sayfaGoster() {
    const s = this.sayfalar[this.indeks];
    document.getElementById("sayfaNo").textContent = `${this.indeks + 1} / ${this.sayfalar.length}`;
    document.getElementById("sayfaBaslik").textContent = s.baslik;
    document.getElementById("sayfaMetin").innerText = s.metin;
    document.getElementById("sayfaOrnek").innerText = s.ornek || "";
    document.getElementById("sayfaOrnekKutu").style.display = s.ornek ? "block" : "none";
    document.getElementById("uniteEtiket").textContent = `${this.kitap.sinif}. Sınıf • ${dersAdi(this.kitap.ders, this.kitap.sinif)}`;
    this.zoomUygula();
    this.canvasHazirla();
    this.kayitliNotuYukle();
    document.querySelectorAll(".kucukresim").forEach((el, i) =>
      el.classList.toggle("aktif", i === this.indeks));
    const aktif = document.querySelector(".kucukresim.aktif");
    if (aktif) aktif.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  },
  onceki() { if (this.indeks > 0) { this.kaydetNot(); this.indeks--; this.sayfaGoster(); } },
  sonraki() { if (this.indeks < this.sayfalar.length - 1) { this.kaydetNot(); this.indeks++; this.sayfaGoster(); } },
  git(i) { this.kaydetNot(); this.indeks = i; this.sayfaGoster(); },
  mod: "ozet",
  modSec(mod) {
    this.mod = mod;
    const ozet = mod === "ozet";
    document.getElementById("ozetModu").classList.toggle("hidden", !ozet);
    document.getElementById("mebModu").classList.toggle("hidden", ozet);
    document.getElementById("kalemAraclari").style.display = ozet ? "" : "none";
    document.getElementById("sekmeOzet").classList.toggle("aktif", ozet);
    document.getElementById("sekmeMeb").classList.toggle("aktif", !ozet);
    if (!ozet) this.mebGoster();
  },
  mebGoster() {
    const alan = document.getElementById("mebCerceve");
    const k = this.kitap;
    if (k.pdfUrl) {
      alan.innerHTML = `<iframe src="${k.pdfUrl}#view=FitH" title="${k.baslik}" style="width:100%;height:100%;border:0;background:#fff" loading="lazy"></iframe>`;
      document.getElementById("mebIndirBtn").href = k.pdfUrl;
      document.getElementById("mebKaynakBtn").href = k.mebSayfa || k.mebKatalog;
      document.getElementById("mebBilgi").innerHTML = `Resmî MEB PDF'i doğrudan Bakanlık sunucusundan yüklenir. <b>PDF İndir</b> düğmesi dosyayı yeni sekmede açar; oradan cihazınıza kaydedebilirsiniz.`;
    } else {
      const kaynak = k.mebSayfa || MEB_KATALOG;
      alan.innerHTML = `<div class="meb-yonlendirme"><div class="meb-yonlendirme-kutu">
          <div class="font-bold text-[16px] text-slate-900">Gerçek kitap MEB portalında</div>
          <p class="text-[13.5px] text-slate-600 mt-2">Bu kitabın orijinal sayfası MEB portalında açılır. Aşağıdaki düğme ile <b>${k.baslik}</b> kitabına ulaşabilirsiniz.</p>
          <p class="mt-3 flex gap-2 justify-center flex-wrap">
            <a class="btn btn-birincil" target="_blank" rel="noopener" href="${kaynak}">MEB'de Aç</a>
            <button class="btn btn-ikincil" onclick="Reader.modSec('ozet')">Konu Özetini Aç</button>
          </p></div></div>`;
      document.getElementById("mebIndirBtn").href = kaynak;
      document.getElementById("mebKaynakBtn").href = kaynak;
      document.getElementById("mebBilgi").innerHTML = `Bu kitap MEB portalında görüntülenir.`;
    }
  },
  // Özet çıktısı: yazdırma penceresi açılır, kullanıcı PDF olarak kaydeder
  ozetCiktisi() {
    const k = this.kitap; if (!k) return;
    const w = window.open("", "_blank", "width=900,height=700");
    if (!w) { alert("Açılır pencere engellendi. Tarayıcınızda açılır pencerelere izin verin."); return; }
    const satirlar = this.sayfalar.map((s, i) =>
      `<h2>${i + 1}. ${s.baslik}</h2><p>${String(s.metin).replace(/\n/g, "<br>")}</p>${s.ornek ? `<div class="ornek">${String(s.ornek).replace(/\n/g, "<br>")}</div>` : ""}`).join("");
    w.document.write(`<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><title>${k.baslik} — Dijital Özet</title>
      <style>body{font-family:Arial,sans-serif;max-width:700px;margin:40px auto;padding:0 20px;color:#111}h1{font-size:22px;border-bottom:3px solid #0B2A5B;padding-bottom:8px}h2{font-size:16px;color:#0B2A5B;margin-top:28px}p{font-size:13.5px;line-height:1.7}.ornek{background:#f1f5f9;border:1px solid #cbd5e1;border-radius:8px;padding:10px 14px;font-size:13px}.kapsam{font-size:12px;color:#555}@media print{.yazdir{display:none}}</style>
      </head><body><button class="yazdir" onclick="window.print()">Yazdır / PDF Kaydet</button>
      <h1>${k.baslik}</h1><div class="kapsam">${k.yayinevi} • ${k.yil} • Kaynak: Ortaokulluyuz dijital özet içeriği</div>${satirlar}
      </body></html>`);
    w.document.close();
    w.focus();
  },

  kucukResimler() {
    const k = document.getElementById("kucukResimler");
    k.innerHTML = "";
    this.sayfalar.forEach((s, i) => {
      const d = document.createElement("div");
      d.className = "kucukresim"; d.title = s.baslik;
      d.innerHTML = `<b>${i + 1}</b><br>${s.baslik.slice(0, 42)}`;
      d.onclick = () => this.git(i);
      k.appendChild(d);
    });
  },
  zoomUygula() {
    const kagit = document.getElementById("kagit");
    kagit.style.transform = `scale(${this.zoom})`;
    kagit.style.transformOrigin = "top left";
    document.getElementById("zoomSeviye").textContent = "%" + Math.round(this.zoom * 100);
  },
  zoomDegis(d) {
    this.zoom = Math.min(3, Math.max(0.5, +(this.zoom + d).toFixed(2)));
    this.zoomUygula();
  },
  tamEkran() {
    const el = document.getElementById("okuyucu");
    if (!document.fullscreenElement) el.requestFullscreen().catch(() => {});
    else document.exitFullscreen().catch(() => {});
  },

  // --- Kalem / canvas mantığı ---
  canvasHazirla() {
    const kagit = document.getElementById("kagit");
    const eski = kagit.querySelector("canvas.cizim");
    if (eski) eski.remove();
    const c = document.createElement("canvas");
    c.className = "cizim";
    c.width = kagit.clientWidth; c.height = kagit.clientHeight;
    // Yüksek çözünürlükte net çizim
    const oran = window.devicePixelRatio || 1;
    c.width = kagit.clientWidth * oran; c.height = kagit.clientHeight * oran;
    c.getContext("2d").scale(oran, oran);
    kagit.appendChild(c);
    this.canvas = c; this.ctx = c.getContext("2d");
    this.canvasKitap = this.kitap.id + "_" + this.indeks;
    this.ctx.lineCap = "round"; this.ctx.lineJoin = "round";

    let ciziyor = false, sonX = 0, sonY = 0, metinModu = false;
    const pos = e => {
      const r = c.getBoundingClientRect();
      const p = (e.touches && e.touches[0]) || e;
      return { x: (p.clientX - r.left) * (kagit.clientWidth / r.width), y: (p.clientY - r.top) * (kagit.clientHeight / r.height) };
    };
    const basla = e => {
      if (this.arac === "isaretci") return;
      if (this.arac === "metin") {
        const { x, y } = pos(e);
        const t = prompt("Sayfaya eklenecek not:");
        if (t) {
          this.ctx.fillStyle = this.renk; this.ctx.font = "16px Segoe UI";
          this.ctx.fillText(t, x, y);
        }
        return;
      }
      ciziyor = true; const p = pos(e); sonX = p.x; sonY = p.y;
      this.ctx.beginPath(); this.ctx.moveTo(sonX, sonY);
      e.preventDefault();
    };
    const surukle = e => {
      if (!ciziyor) return;
      const p = pos(e);
      this.ctx.strokeStyle = this.arac === "silgi" ? "#ffffff" : (this.arac === "fosfor" ? this.renk + "55" : this.renk);
      this.ctx.lineWidth = this.arac === "fosfor" ? this.kalinlik * 4 : (this.arac === "silgi" ? 18 : this.kalinlik);
      this.ctx.globalCompositeOperation = this.arac === "silgi" ? "destination-out" : "source-over";
      this.ctx.lineTo(p.x, p.y); this.ctx.stroke();
      e.preventDefault();
    };
    const bitir = () => { ciziyor = false; this.ctx.globalCompositeOperation = "source-over"; };
    c.onmousedown = basla; c.onmousemove = surukle; c.onmouseup = bitir; c.onmouseleave = bitir;
    c.ontouchstart = basla; c.ontouchmove = surukle; c.ontouchend = bitir;
  },
  aracSec(arac, btn) {
    this.arac = arac;
    document.querySelectorAll("[data-arac]").forEach(b => b.classList.remove("aktif"));
    if (btn) btn.classList.add("aktif");
  },
  temizle() { if (this.ctx && confirm("Bu sayfadaki tüm çizimler silinsin mi?")) { this.ctx.clearRect(0, 0, 9999, 9999); this.kaydetNot(); } },

  notAnahtari() { return `ook_not_${this.kitap.id}_${this.indeks}`; },
  kaydetNot() {
    if (!this.canvas || !this.kitap) return;
    if (this.canvasKitap !== this.kitap.id + "_" + this.indeks) return;
    try {
      const bos = document.createElement("canvas");
      // boş kontrol: veri URL uzunluğu eşiği
      const url = this.canvas.toDataURL("image/png");
      if (url.length < 8000) localStorage.removeItem(this.notAnahtari());
      else localStorage.setItem(this.notAnahtari(), url);
    } catch {}
  },
  kayitliNotuYukle() {
    try {
      const url = localStorage.getItem(this.notAnahtari());
      if (!url) return;
      const img = new Image();
      img.onload = () => {
        const kagit = document.getElementById("kagit");
        this.ctx.drawImage(img, 0, 0, kagit.clientWidth, kagit.clientHeight);
      };
      img.src = url;
    } catch {}
  }
};
window.addEventListener("keydown", e => {
  if (!document.getElementById("okuyucu").classList.contains("acik")) return;
  if (e.key === "ArrowRight") Reader.sonraki();
  if (e.key === "ArrowLeft") Reader.onceki();
  if (e.key === "Escape") Reader.kapat();
});

/* ===== odevler.js ===== */
/* Hazır ödev + deneme sınavı verisi — Ortaokulluyuz özgün çalışma içeriği.
   NOT: Bunlar MEB'in resmi cevap anahtarı değildir; sitemiz öğretmen
   kadrosunca ünite kazanımlarına göre hazırlanmış özgün sorulardır. */
const ODEV_VERISI = {};
const SINAV_VERISI = {};
function odevUnite(sinif, ders) {
  const u = (MUfredat.uniteler[sinif] && MUfredat.uniteler[sinif][ders]) || [];
  return u;
}

/* ===== odev-5.js ===== */
/* 5. Sınıf hazır ödevler + deneme sınavları (özgün içerik) */
ODEV_VERISI[5] = {
turkce: [
{ u: "Sözcükte Anlam", s: [
["“Soğuk havada ince giyinmiş.” cümlesinde “ince” sözcüğü hangi anlamıyla kullanılmıştır?", "Mecaz anlam dışında, kalınlığı az olan (gerçek/temel anlam) anlamıyla kullanılmıştır."],
["“Yüz” sözcüğünü gerçek ve mecaz anlamıyla birer cümlede kullanın.", "Gerçek: Yüzümü yıkadım. Mecaz: Havuzda üç yüz metre yüzdü. (Örnekler değişebilir; önemli olan anlam farkıdır.)"],
["“Darılmak - gücenmek - kırılmak” sözcükleri arasındaki anlam ilişkisini yazın.", "Üçü de yakın (eş) anlamlı sözcüklerdir; birbirinin yerine kullanılabilir."] ] },
{ u: "Cümlede Anlam", s: [
["“Sınavdan yüksek not aldı.” cümlesine neden-sonuç anlamı katan cümle yazın.", "Örn: Düzenli çalıştığı için sınavdan yüksek not aldı."],
["“Hava çok soğuktu ama dışarı çıktık.” cümlesindeki karşıtlığı açıklayın.", "“Ama” bağlacı iki zıt durumu (soğuk hava / dışarı çıkma) karşıt anlamla bağlar."],
["“Keşke” sözcüğüyle varsayım anlamı taşıyan bir cümle kurun.", "Örn: Keşke yarın hava güzel olsa da pikniğe gitsek."] ] },
{ u: "Parçada Anlam", s: [
["Bir paragrafın ana fikrini bulurken ilk bakacağınız cümle genellikle hangisidir? Neden?", "Genellikle ilk veya son cümle; yazar ana düşünceyi girişte verir veya sonuçta özetler."],
["“Metinde yazarın asıl anlatmak istediği” sorusu sizden neyi ister?", "Ana fikri (ana düşünceyi) ister; detaylar değil, metnin bütününe sinen mesaj aranır."],
["Başlık ile içerik uyumsuzsa ne yapılmalıdır? Örnek verin.", "Başlık içeriği yansıtmalıdır; örn. kedi anlatılan metne “Uçaklar” başlığı konulamaz. Uygun başlık: “Minnoş'un Bir Günü”."] ] },
{ u: "Yazım Kuralları ve Noktalama", s: [
["“Türkçe'miz” yazımındaki hatayı düzeltip kuralı yazın.", "Doğrusu: Türkçemiz. Özel adlara gelen yapım ekleri kesmeyle ayrılmaz."],
["“Ankara'ya yarın gidecekmiş.” cümlesinde kesme işaretinin görevi nedir?", "Özel ada gelen çekim ekini (yönelme hâl eki -e) ayırmak."],
["Virgülün “sıralı cümleleri ayırma” görevine bir örnek yazın.", "Örn: Geldim, gördüm, beğendim."] ] },
{ u: "Fiiller ve Ekler", s: [
["“Okul-da” ve “okulda-ki” sözcüklerindeki ekleri ayırıp türlerini yazın.", "okul-da: bulunma hâl eki (-da). okul-da-ki: bulunma eki + ki (sıfat yapan ki)."],
["“Yazdı” ve “yazacak” fiillerinin zamanlarını karşılaştırın.", "Yazdı: görülen geçmiş zaman (-dı). Yazacak: gelecek zaman (-acak)."],
["“Gelmek” fiiline istek kipi eki getirerek cümle kurun.", "Örn: Sinemaya ben de geleyim. (-e istek kipi, 1. tekil kişi.)"] ] },
{ u: "Metin Türleri", s: [
["Masal ile hikâye (öykü) arasındaki iki farkı yazın.", "Masal: olağanüstü öğeler, “bir varmış bir yokmuş” kalıbı, yer-zaman belirsiz. Hikâye: yaşanabilir olaylar, belirli kişiler."],
["Bilgilendirici metin ile hikâye edici metni birer örnekle ayırt edin.", "Bilgilendirici: “Su, 100°C'de kaynar.” Hikâye edici: “Ali sabah heyecanla uyandı.”"],
["Şiirde dize ve dörtlük nedir? İkişer dizelik örnek yazın.", "Dize: şiirin her satırı. Dörtlük: dört dizeden oluşan bölüm. Örn: “Kış geldi, kar yağdı / Çocuklar sevindi.”"] ] }
],
matematik: [
{ u: "Doğal Sayılar", s: [
["245 318 sayısının okunuşunu yazıp bölüklerini gösterin.", "İki yüz kırk beş bin üç yüz on sekiz. Binler bölüğü: 245, birler bölüğü: 318."],
["7, 0, 4, 9 rakamlarıyla yazılabilecek en büyük ve en küçük dört basamaklı sayıyı bulun.", "En büyük: 9740. En küçük: 4079 (0 başa gelemez)."],
["1 000 000 sayısının kaç basamaklı olduğunu ve okunuşunu yazın.", "7 basamaklıdır; okunuşu: bir milyon."] ] },
{ u: "Kesirler ve Ondalık Gösterim", s: [
["3/4 kesrini ondalık gösterimle yazıp sayı doğrusunda yaklaşık yerini belirtin.", "0,75. 0 ile 1 arasında, 1'e yakın konumdadır."],
["0,6 ile 3/5 kesrini karşılaştırın.", "3/5 = 0,6 olduğundan ikisi birbirine eşittir."],
["Bir pastanın 2/8'ini yiyen biri pastanın yüzde kaçını yemiştir?", "2/8 = 1/4 = %25."] ] },
{ u: "Geometri: Temel Kavramlar", s: [
["Nokta, doğru, doğru parçası ve ışını birer cümleyle tanımlayın.", "Nokta: boyutsuz konum. Doğru: iki yönde sonsuz çizgi. Doğru parçası: iki nokta arası. Işın: bir uçtan başlayıp sonsuza giden."],
["Dar, dik ve geniş açıya günlük hayattan birer örnek verin.", "Dar: makasın az açılmış hâli. Dik: duvar ile zemin. Geniş: açılmış kitap kapağı. (Benzer örnekler kabul.)"],
["Kare ile dikdörtgenin ortak ve farklı iki özelliğini yazın.", "Ortak: 4 kenar, 4 dik açı. Farklı: karede tüm kenarlar eşit, dikdörtgende karşılıklı kenarlar eşit."] ] },
{ u: "Veri Toplama ve Değerlendirme", s: [
["Sınıfın en sevilen meyvesini öğrenmek için hangi veri toplama yöntemi kullanılır?", "Anket (soru sorma) yöntemi kullanılır; sonuçlar çetele/sıklık tablosuna işlenir."],
["Sıklık tablosu ile çetele tablosu arasındaki fark nedir?", "Çetelede her veri çizgiyle, sıklıkta sayı ile gösterilir; ikisi de tekrar sayısını verir."],
["5, 7, 5, 8, 5 veri grubunun tepe değerini (mod) bulun.", "En çok tekrar eden 5 olduğundan mod = 5."] ] },
{ u: "Uzunluk ve Zaman Ölçme", s: [
["3 km 250 m kaç metredir?", "3×1000 + 250 = 3250 m."],
["2 saat 45 dakika kaç dakikadır?", "2×60 + 45 = 165 dakika."],
["Bir otobüs 09.15'te kalkıp 11.05'te vardı. Yolculuk kaç dakika sürdü?", "11.05 − 09.15 = 1 saat 50 dakika = 110 dakika."] ] },
{ u: "Alan Ölçme", s: [
["Kenarları 6 cm ve 9 cm olan dikdörtgenin alanını bulun.", "6×9 = 54 cm²."],
["Alanı 48 cm², bir kenarı 8 cm olan dikdörtgenin diğer kenarı kaç cm'dir?", "48÷8 = 6 cm."],
["Bir karenin çevresi 36 cm ise alanı kaç cm²'dir?", "Bir kenar 36÷4 = 9 cm; alan 9×9 = 81 cm²."] ] }
],
fen: [
{ u: "Güneş, Dünya ve Ay", s: [
["Ay'ın evrelerini sırasıyla yazın.", "Yeni ay → hilal → ilk dördün → şişkin ay → dolunay → şişkin ay → son dördün → hilal."],
["Güneş tutulması hangi evrede, Ay tutulması hangi evrede olur?", "Güneş tutulması yeni ayda, Ay tutulması dolunayda olur."],
["Dünya'nın kendi ekseni etrafındaki dönüşü neyi oluşturur?", "Gece ve gündüzü oluşturur; bir tam dönüş 24 saattir."] ] },
{ u: "Canlılar Dünyası", s: [
["Mikroskobik canlılara iki örnek verin ve yararlı bir yönlerini yazın.", "Bakteri (yoğurt mayalama), maya mantarı (ekmek hamurunun kabarması)."],
["Mantarların bitki olmadığını kanıtlayan özelliği yazın.", "Mantarlar fotosentez yapamaz; besinini dışarıdan hazır alır."],
["Omurgalı ve omurgasız hayvana ikişer örnek verin.", "Omurgalı: balık, kuş. Omurgasız: kelebek, solucan."] ] },
{ u: "Kuvvetin Ölçülmesi", s: [
["Kuvvet hangi araçla, hangi birimle ölçülür?", "Dinamometre ile ölçülür; birimi newton (N)."],
["Bir cisme iki zıt yönde 8 N ve 5 N kuvvet uygulanırsa net kuvvet kaç N olur?", "8 − 5 = 3 N, büyük kuvvet yönünde."],
["Sürtünme kuvvetini artıran ve azaltan birer duruma örnek verin.", "Artıran: kış lastiği. Azaltan: buzda kayma / makine yağlama."] ] },
{ u: "Madde ve Değişim", s: [
["Erime ve donmaya birer örnek verin.", "Erime: buzun suya dönüşmesi. Donma: suyun buza dönüşmesi."],
["Suyun kaynama ve buharlaşma farkını yazın.", "Kaynama belirli sıcaklıkta (100°C) ve her yerde; buharlaşma her sıcaklıkta, yüzeyde olur."],
["Maddenin hâllerini ve birer örneğini yazın.", "Katı: taş. Sıvı: su. Gaz: hava."] ] },
{ u: "Işığın Yayılması", s: [
["Işık hangi yönde ve nasıl yayılır? Günlük bir kanıt yazın.", "Doğrusal yayılır; gölge oluşması kanıttır."],
["Tam gölge ile yarı gölge arasındaki fark nedir?", "Tam gölgede hiç ışık ulaşmaz; yarı gölgeye kısmen ulaşır."],
["Işık kirliliğini azaltmak için iki öneri yazın.", "Gereksiz lambaları kapatmak, ışığı gökyüzüne değil yere yöneltmek."] ] },
{ u: "İnsan ve Çevre", s: [
["Çevre kirliliğine neden olan üç insan faaliyetini yazın.", "Fabrika atıkları, egzoz gazları, bilinçsiz çöp atma. (Benzerleri kabul.)"],
["Geri dönüşümün iki yararını yazın.", "Doğal kaynakları korur, enerji tasarrufu sağlar."],
["Nesli tükenmekte olan bir canlıya örnek verip koruma önerisi yazın.", "Örn: deniz kaplumbağası; yumurtlama kumsallarını korumak, ışık kirliliğini azaltmak."] ] }
],
sosyal: [
{ u: "Birey ve Toplum", s: [
["Hak ve sorumluluğa birer örnek verin.", "Hak: eğitim hakkı. Sorumluluk: ödevleri zamanında yapma."],
["Kimliğinizi oluşturan üç öğeyi yazın.", "Ad-soyad, doğum yeri-tarihi, T.C. kimlik numarası."],
["Farklılıklara saygıya sınıf içinden bir örnek verin.", "Örn: farklı şehirden gelen arkadaşın konuşmasına saygı göstermek."] ] },
{ u: "Kültür ve Miras", s: [
["Somut ve somut olmayan kültürel mirasa ikişer örnek verin.", "Somut: Topkapı Sarayı, Efes. Somut olmayan: Hacivat-Karagöz, türküler."],
["Gelenek ve göreneklerimize bir örnek verip önemini yazın.", "Örn: bayramlaşma; birlik ve dayanışmayı güçlendirir."],
["Tarihî bir eseri korumanın iki yolunu yazın.", "Zarar vermemek, yetkililere bildirmek; müzeleri ziyaret edip tanıtmak."] ] },
{ u: "İnsanlar, Yerler ve Çevreler", s: [
["Harita, kroki ve ölçek kavramlarını kısaca açıklayın.", "Harita: yeryüzünün küçültülmüş çizimi. Kroki: kabataslak çizim. Ölçek: küçültme oranı."],
["İklimin günlük hayata iki etkisini yazın.", "Giyim seçimi ve tarım ürünleri (örn. Akdeniz'de turunçgil)."],
["Doğal ve beşerî unsura ikişer örnek verin.", "Doğal: dağ, akarsu. Beşerî: köprü, okul."] ] },
{ u: "Bilim, Teknoloji ve Toplum", s: [
["Teknolojinin eğitime iki katkısını yazın.", "Uzaktan eğitim, akıllı tahta ile görsel öğrenme."],
["Bilimsel düşünmenin basamaklarını sırayla yazın.", "Gözlem → soru → tahmin (hipotez) → deney → sonuç."],
["Teknolojiyi bilinçli kullanmaya iki örnek verin.", "Ekran süresini sınırlamak, güvenilir kaynaklardan araştırma yapmak."] ] },
{ u: "Üretim, Dağıtım ve Tüketim", s: [
["İhtiyaç ile istek farkını örnekle açıklayın.", "İhtiyaç (su, barınma) zorunludur; istek (yeni oyuncak) ertelenebilir."],
["Üretimden tüketime bir ürünün yolculuğunu yazın.", "Buğday üretilir → fabrikada un olur → markette satılır → evde tüketilir."],
["Tasarruflu olmanın aile bütçesine katkısını yazın.", "Gereksiz harcama azalır, birikim yapılır."] ] },
{ u: "Etkin Vatandaşlık", s: [
["Demokrasinin iki temel ilkesini yazın.", "Eşitlik ve özgürlük (katılım, çoğunluk kararı da kabul edilir)."],
["Okulda demokrasiye katılmaya bir örnek verin.", "Sınıf başkanı seçiminde oy kullanmak."],
["Kurallara uymanın toplumsal iki yararını yazın.", "Düzen ve güvenlik sağlar, hak ihlallerini önler."] ] }
],
ingilizce: [
{ u: "Hello!", s: [
["Kendinizi İngilizce üç cümleyle tanıtın.", "Örn: Hello! My name is Elif. I am eleven years old. I live in Ankara."],
["“Where are you from?” sorusuna cevap verin.", "Örn: I am from Türkiye."],
["Sayıları 1'den 10'a İngilizce yazın.", "One, two, three, four, five, six, seven, eight, nine, ten."] ] },
{ u: "My Town", s: [
["Yaşadığınız yeri İngilizce iki cümleyle anlatın.", "Örn: I live in İzmir. It is a big and beautiful city."],
["“Is there a park near your house?” sorusuna olumlu-olumsuz cevap verin.", "Yes, there is. / No, there isn't."],
["Yön tarifi için üç kalıp yazın.", "Turn left. / Turn right. / Go straight ahead."] ] },
{ u: "Games and Hobbies", s: [
["Hobilerinizi İngilizce anlatın (like + V-ing kullanın).", "Örn: I like reading books and playing football."],
["“Can you swim?” sorusuna cevap verin.", "Yes, I can. / No, I can't."],
["Üç spor dalını İngilizce yazın.", "Football, basketball, swimming."] ] },
{ u: "My Daily Routine", s: [
["Günlük rutininizi üç cümleyle İngilizce yazın.", "Örn: I get up at seven. I have breakfast. I go to school."],
["“What time do you go to bed?” sorusuna cevap verin.", "Örn: I go to bed at ten o'clock."],
["Geniş zamanda 3. tekil şahıs kuralını örnekle yazın.", "He/she/it öznesinde fiile -s gelir: She plays tennis."] ] },
{ u: "Health", s: [
["Üç sağlık sorununu İngilizce yazın.", "Headache, cold, stomachache."],
["“What's the matter?” sorusuna cevap verin.", "Örn: I have a headache."],
["Sağlıklı kalmak için iki öneriyi İngilizce yazın.", "Eat vegetables. / Drink milk. / Do sports."] ] },
{ u: "Movies", s: [
["En sevdiğiniz film türünü İngilizce anlatın.", "Örn: I like cartoons. They are funny."],
["“What kind of movies do you like?” sorusuna cevap verin.", "Örn: I like adventure movies."],
["Film türlerinden dördünü İngilizce yazın.", "Cartoon, comedy, horror, documentary."] ] }
],
din: [
{ u: "Allah'a İman", s: [
["İmanın şartlarından ilkini yazıp kısaca açıklayın.", "Allah'a iman: Allah'ın varlığına ve birliğine inanmak."],
["Allah'ın (c.c.) sıfatlarından ikisini anlamıyla yazın.", "Örn: Rahman (esirgeyen), Kadir (her şeye gücü yeten)."],
["Tevhit inancının günlük hayata bir yansımasını yazın.", "Örn: yardımı yalnız Allah'tan beklemek, rızkın Allah'tan olduğuna inanmak."] ] },
{ u: "Namaz", s: [
["Günlük farz namazları vakitleriyle yazın.", "Sabah (2), öğle (4), ikindi (4), akşam (3), yatsı (4) rekât farz."],
["Abdestin farzlarını sırayla yazın.", "Yüzü yıkamak, kolları dirseklerle yıkamak, başı mesh etmek, ayakları yıkamak."],
["Namazın insan hayatına iki katkısını yazın.", "Disiplin kazandırır, Allah ile bağı güçlendirir, kötü davranışlardan alıkoyar."] ] },
{ u: "Hz. Muhammed ve Aile Hayatı", s: [
["Hz. Muhammed'in (s.a.v.) çocuklarına örnek bir davranışını yazın.", "Torunları Hasan ve Hüseyin'i öper, onlarla oynar, şefkat gösterirdi."],
["Hz. Hatice'nin (r.a.) İslam'daki yerini yazın.", "İlk Müslümanlardandır; Peygamberimize ilk vahiyde destek olmuştur."],
["Aile büyüklerine saygıya bir örnek yazın.", "Örn: Anne-babaya “öf” bile dememek, ihtiyaçlarında yardımcı olmak."] ] },
{ u: "Kur'an-ı Kerim", s: [
["Kur'an-ı Kerim'in ilk emrini yazın.", "“Oku!” (Alak suresi ilk ayetleri)."],
["Kur'an'ın korunmuşluğuyla ilgili ayet mealini yazın.", "“Hiç şüphesiz zikri (Kur'an'ı) biz indirdik, onu koruyacak olan da biziz.” (Hicr 9)."],
["Kur'an okumanın adabından üçünü yazın.", "Abdestli olmak, besmeleyle başlamak, sessiz ortamda huşuyla okumak."] ] },
{ u: "Sevgi ve Saygı", s: [
["Sevgi ve saygı farkını örnekle açıklayın.", "Sevgi: içten bağlılık (aile sevgisi). Saygı: değer verme davranışı (büyüğün sözünü kesmemek)."],
["Komşuluk ilişkilerinde sevgi-saygıya örnek yazın.", "Gürültü yapmamak, hastayken ziyaret etmek."],
["Hadis örneğiyle merhametin önemini yazın.", "“Merhamet edenlere Rahman da merhamet eder.” (Tirmizî)."] ] }
]
};
SINAV_VERISI[5] = {
turkce: [
{ s: "“Ağır” sözcüğü hangi cümlede mecaz anlamıyla kullanılmıştır?", o: ["Ağır çantayı zor taşıdı.", "Ağır sözler söyledi.", "Ağır yük kamyonu.", "Ağır adımlarla yürüdü."], c: 1 },
{ s: "Hangisi neden-sonuç cümlesidir?", o: ["Yağmur yağdı, yine de çıktık.", "Çok çalıştığı için kazandı.", "Hem güldü hem ağladı.", "Gelir mi gelmez mi bilmem."], c: 1 },
{ s: "“Ankara'dan geldim.” cümlesindeki ekin türü nedir?", o: ["Yapım eki", "Ayrılma hâl eki", "İyelik eki", "Çoğul eki"], c: 1 },
{ s: "Hangisi hikâye edici metindir?", o: ["Su döngüsü anlatımı", "Ali'nin okul günü", "Ansiklopedi maddesi", "Kullanma kılavuzu"], c: 1 },
{ s: "“Gelecek” sözcüğü hangi cümlede isimdir?", o: ["Gelecek yıl gelecek.", "Gelecek güzel olacak.", "Yarın gelecek.", "Bize gelecek."], c: 1 },
{ s: "Paragrafın ilk cümlesi genellikle nedir?", o: ["Sonuç cümlesi", "Giriş/konu cümlesi", "Örnek cümle", "Alıntı cümle"], c: 1 },
{ s: "Hangisinde yazım yanlışı vardır?", o: ["Türkçeyi seviyorum.", "Ankara'ya gittik.", "Okul-da bekledim.", "Kitabı aldım."], c: 2 },
{ s: "“Masal” türünün özelliği değildir?", o: ["Olağanüstü öğeler", "Kalıplaşmış başlangıç", "Gerçekçi olaylar", "Belirsiz zaman-mekân"], c: 2 } ],
matematik: [
{ s: "345 209 sayısının binler bölüğü kaçtır?", o: ["209", "345", "345209", "45"], c: 1 },
{ s: "2/5 kesrinin ondalık gösterimi nedir?", o: ["0,25", "0,4", "0,5", "2,5"], c: 1 },
{ s: "Kenarları 7 cm ve 5 cm olan dikdörtgenin alanı kaç cm²'dir?", o: ["24", "35", "30", "12"], c: 1 },
{ s: "4 km 60 m kaç metredir?", o: ["460", "4060", "4600", "4006"], c: 1 },
{ s: "3, 3, 4, 5, 3 veri grubunun modu nedir?", o: ["4", "5", "3", "3,5"], c: 2 },
{ s: "Hangisi ışındır?", o: ["İki ucu sınırlı çizgi", "Bir uçtan başlayıp sonsuza giden", "İki yönde sonsuz çizgi", "Kapalı eğri"], c: 1 },
{ s: "1 saat 20 dakika kaç dakikadır?", o: ["120", "100", "80", "60"], c: 2 },
{ s: "Çevresi 28 cm olan karenin alanı kaç cm²'dir?", o: ["49", "28", "14", "56"], c: 0 } ],
fen: [
{ s: "Ay'ın Dünya'dan görünen parlak yüzünün tamamı hangi evredir?", o: ["Yeni ay", "İlk dördün", "Dolunay", "Hilal"], c: 2 },
{ s: "Hangisi mikroskobik canlıdır?", o: ["Kelebek", "Maya mantarı", "Solucan", "Kuş"], c: 1 },
{ s: "Kuvvetin birimi nedir?", o: ["Kilogram", "Newton", "Metre", "Litre"], c: 1 },
{ s: "Hangisi erimeye örnektir?", o: ["Suyun buza dönüşmesi", "Buzun suya dönüşmesi", "Suyun buharlaşması", "Yağmurun yağması"], c: 1 },
{ s: "Gölge oluşumu ışığın hangi özelliğini kanıtlar?", o: ["Renkli olduğunu", "Doğrusal yayıldığını", "Ses çıkardığını", "Isıttığını"], c: 1 },
{ s: "Hangisi geri dönüşebilir atıktır?", o: ["Cam şişe", "Yemek artığı", "Pilin içi", "Islak mendil"], c: 0 },
{ s: "Gece-gündüz oluşumunun nedeni nedir?", o: ["Dünya'nın Güneş çevresinde dolanması", "Dünya'nın kendi ekseninde dönmesi", "Ay'ın evreleri", "Mevsimler"], c: 1 },
{ s: "Hangisi omurgasız hayvandır?", o: ["Balık", "Kurbağa", "Kelebek", "Yılan"], c: 2 } ],
sosyal: [
{ s: "Hangisi sorumluluğa örnektir?", o: ["Oyun oynamak", "Ödevini yapmak", "Tatil yapmak", "Uyumak"], c: 1 },
{ s: "Somut olmayan kültürel miras hangisidir?", o: ["Topkapı Sarayı", "Efes Antik Kenti", "Hacivat-Karagöz", "Sümela Manastırı"], c: 2 },
{ s: "Haritada küçültme oranına ne denir?", o: ["Kroki", "Ölçek", "Lejant", "Yön"], c: 1 },
{ s: "Hangisi bilimsel sürecin ilk basamağıdır?", o: ["Deney", "Sonuç", "Gözlem", "Hipotez"], c: 2 },
{ s: "Buğdayın una dönüşmesi ekonominin hangi aşamasıdır?", o: ["Tüketim", "Dağıtım", "Üretim", "Takas"], c: 2 },
{ s: "Sınıf başkanı seçiminde oy kullanmak neye örnektir?", o: ["Görev", "Demokratik katılım", "Kural ihlali", "Zorunluluk"], c: 1 },
{ s: "Hangisi beşerî unsurdur?", o: ["Dağ", "Akarsu", "Köprü", "Orman"], c: 2 },
{ s: "İhtiyaç ile istek farkı nedir?", o: ["Fark yoktur", "İhtiyaç zorunlu, istek ertelenebilir", "İstek zorunludur", "İkisi de lükstür"], c: 1 } ],
ingilizce: [
{ s: "'I ___ from Türkiye.' Boşluğa hangisi gelir?", o: ["is", "am", "are", "be"], c: 1 },
{ s: "'Turn left' ne demektir?", o: ["Düz git", "Sola dön", "Sağa dön", "Dur"], c: 1 },
{ s: "'I like ___ football.' Boşluğa hangisi gelir?", o: ["play", "plays", "playing", "to playing"], c: 2 },
{ s: "'She ___ tennis.' (geniş zaman) hangisi doğrudur?", o: ["play", "plays", "playing", "played"], c: 1 },
{ s: "'I have a headache.' Ne demektir?", o: ["Karnım ağrıyor", "Başım ağrıyor", "Üşüttüm", "Yoruldum"], c: 1 },
{ s: "Hangisi film türüdür?", o: ["Headache", "Documentary", "Breakfast", "Swimming"], c: 1 },
{ s: "'What time do you get up?' sorusunun cevabı hangisidir?", o: ["I get up at seven.", "I am seven.", "Seven o'clock go.", "Up at seven me."], c: 0 },
{ s: "'Can you swim?' sorusuna olumsuz cevap hangisidir?", o: ["Yes, I can.", "No, I can't.", "I can swim.", "Swim yes."], c: 1 } ],
din: [
{ s: "İmanın ilk şartı nedir?", o: ["Namaz kılmak", "Allah'a iman", "Oruç tutmak", "Zekât vermek"], c: 1 },
{ s: "Abdestin farzlarından biri değildir?", o: ["Yüzü yıkamak", "Kolları yıkamak", "Başı mesh etmek", "Dişleri fırçalamak"], c: 3 },
{ s: "Kur'an'ın ilk emri nedir?", o: ["Namaz kıl", "Oruç tut", "Oku", "Sabret"], c: 2 },
{ s: "Günlük farz namazların toplam rekât sayısı kaçtır?", o: ["13", "17", "20", "40"], c: 1 },
{ s: "Hz. Hatice'nin (r.a.) özelliği nedir?", o: ["İlk Müslümanlardan olması", "Hicrete katılması", "Bedir'de savaşması", "Mekke'nin fethi"], c: 0 },
{ s: "Hangisi Kur'an okuma adabındandır?", o: ["Uzanarak okumak", "Besmeleyle başlamak", "Aceleyle bitirmek", "Müzik eşliğinde okumak"], c: 1 },
{ s: "“Merhamet edenlere Rahman da merhamet eder.” hadisi neyi vurgular?", o: ["Merhameti", "Zenginliği", "Gücü", "Hızı"], c: 0 },
{ s: "Komşulukta saygıya örnek hangisidir?", o: ["Gürültü yapmak", "Kapıyı çarpmak", "Hastayken ziyaret etmek", "Dedikodu yapmak"], c: 2 } ]
};

/* ===== odev-6.js ===== */
/* 6. Sınıf hazır ödevler + deneme sınavları (özgün içerik) */
ODEV_VERISI[6] = {
turkce: [
{ u: "Sözcükte ve Cümlede Anlam", s: [
["“Gerçek, mecaz ve terim anlam”a birer örnek yazın.", "Gerçek: sıcak su. Mecaz: sıcak karşılama. Terim: dik açı (matematik)."],
["“Ne ekersen onu biçersin.” atasözünün anlamını yazın.", "İnsan, davranışlarının karşılığını alır; iyi davranan iyilik bulur."],
["Eş sesli (sesteş) iki sözcük yazıp cümlede kullanın.", "Örn: yüz (vücut bölümü / sayı), diz (oturmak / sıra)."] ] },
{ u: "Paragraf", s: [
["Paragrafta giriş, gelişme ve sonuç bölümlerinin görevini yazın.", "Giriş konuyu tanıtır, gelişme açıklar-örneklendirir, sonuç toparlar."],
["Paragrafın ana düşüncesi ile yardımcı düşüncelerini ayırt edin.", "Ana düşünce metnin mesajıdır; yardımcı düşünceler onu destekleyen detaylardır."],
["Bir paragrafı ikiye bölmek için hangi ölçüte bakılır?", "Düşünce değişimine (yeni konuya geçilmesine) bakılır."] ] },
{ u: "Fiil Çekimleri", s: [
["“Okumuş” ve “okuyor” fiillerinin kip ve zamanını yazın.", "Okumuş: öğrenilen geçmiş zaman. Okuyor: şimdiki zaman."],
["“Gelmelisin” fiilindeki kip ve kişi ekini gösterin.", "Gereklilik kipi (-meli), 2. tekil kişi (-sin)."],
["Emir kipiyle iki cümle kurun.", "Örn: Kapıyı kapat. Sessiz ol."] ] },
{ u: "Cümlenin Öğeleri", s: [
["“Ali topu bahçede oynadı.” cümlesinin öğelerini bulun.", "Oynadı: yüklem. Kim? Ali: özne. Neyi? Topu: belirtili nesne. Nerede? Bahçede: yer tamlayıcısı."],
["Özne ile yüklem arasındaki uyum kuralını yazın.", "Özne tekilse yüklem tekil, çoğulsa çoğul olur (insan dışı çoğul öznelerde tekil yüklem de olur)."],
["Zarf tümlecine örnek bir cümle yazıp gösterin.", "Örn: Sabah erken kalktı. (Ne zaman? → zarf tümleci.)"] ] },
{ u: "Yazım ve Noktalama", s: [
["“Herşey” yazımını düzeltip kuralı yazın.", "Doğrusu: Her şey (ayrı yazılır)."],
["Soru işaretinin üç kullanım yerini yazın.", "Soru cümleleri, soru anlamı taşıyan sıralı cümleler, bilinmeyen tarih/yer (“Ankara (?)”)."],
["“de/da” bağlacı ile hâl ekinin yazım farkını örnekle gösterin.", "Bağlaç ayrı: Ben de geldim. Ek bitişik: Evde kaldım."] ] },
{ u: "Metin Türleri ve Yazma", s: [
["Hikâye unsurlarını (kişi, yer, zaman, olay) örnekle yazın.", "Örn: Ali (kişi), okul (yer), sabah (zaman), yarış (olay)."],
["Dilekçe yazarken dikkat edilecek üç kuralı yazın.", "Sağ üste tarih, kime yazıldığı, saygılı dil ve imza."],
["Betimleyici anlatıma iki cümlelik örnek yazın.", "Örn: Gökyüzü masmaviydi. Deniz, güneşin altında pırıl pırıl parlıyordu."] ] }
],
matematik: [
{ u: "Doğal Sayılarla İşlemler", s: [
["(12 + 8) × 5 − 40 işleminin sonucunu bulun.", "(20)×5 − 40 = 100 − 40 = 60."],
["Bir sayının 7 katının 15 fazlası 64 ise sayı kaçtır?", "7x + 15 = 64 → 7x = 49 → x = 7."],
["Üslü ifade 2⁴'ün değerini bulun.", "2×2×2×2 = 16."] ] },
{ u: "Çarpanlar ve Katlar", s: [
["18'in çarpanlarını yazın.", "1, 2, 3, 6, 9, 18."],
["12 ve 18'in EBOB ve EKOK'unu bulun.", "EBOB: 6, EKOK: 36."],
["Asal sayıya üç örnek verin.", "2, 3, 5, 7, 11... (herhangi üçü)."] ] },
{ u: "Tam Sayılar", s: [
["(−7) + (+12) işleminin sonucunu bulun.", "+5."],
["(−4) × (−3) × (+2) işleminin sonucunu bulun.", "(+12)×(+2) = +24."],
["Sayı doğrusunda −5 ile +3 arasındaki tam sayıları yazın.", "−4, −3, −2, −1, 0, 1, 2."] ] },
{ u: "Cebirsel İfadeler", s: [
["3x + 5 ifadesinde x = 4 için değeri bulun.", "3×4 + 5 = 17."],
["2a + 3b − a + b ifadesini sadeleştirin.", "a + 4b."],
["“Bir sayının 3 eksiğinin 2 katı”nı cebirsel yazın.", "2(x − 3)."] ] },
{ u: "Oran", s: [
["12'nin 18'e oranını en sade hâliyle yazın.", "12/18 = 2/3."],
["Bir sınıfta 14 kız, 16 erkek varsa kızların tüm sınıfa oranı nedir?", "14/30 = 7/15."],
["2/3 = x/12 orantısında x kaçtır?", "İçler-dışlar: 3x = 24 → x = 8."] ] },
{ u: "Geometri ve Ölçme", s: [
["Çemberde yarıçap ile çap ilişkisini yazın.", "Çap, yarıçapın iki katıdır: R = 2r."],
["Dikdörtgenler prizmasının kaç yüzü, köşesi vardır?", "6 yüz, 8 köşe, 12 ayrıt."],
["1 m³ kaç litredir?", "1000 litre."] ] }
],
fen: [
{ u: "Güneş Sistemi ve Tutulmalar", s: [
["Gezegenleri Güneş'e yakınlık sırasına göre yazın.", "Merkür, Venüs, Dünya, Mars, Jüpiter, Satürn, Uranüs, Neptün."],
["Ay tutulmasının nasıl oluştuğunu yazın.", "Dünya, Güneş ile Ay arasına girer; Dünya'nın gölgesi Ay'ın üzerine düşer."],
["Güneş sisteminin en büyük gezegeni hangisidir?", "Jüpiter."] ] },
{ u: "Vücudumuzdaki Sistemler", s: [
["Destek ve hareket sisteminin yapılarını yazın.", "Kemikler, eklemler, kaslar, kıkırdak."],
["Solunum sisteminin organlarını sırayla yazın.", "Burun, yutak, gırtlak, soluk borusu, akciğerler."],
["Kalbin görevini bir cümleyle yazın.", "Kanı vücuda pompalayan kaslı organdır."] ] },
{ u: "Kuvvet ve Hareket", s: [
["Sürat nasıl hesaplanır? Formülü örnekle açıklayın.", "Sürat = yol ÷ zaman. Örn: 120 km ÷ 2 sa = 60 km/sa."],
["Sabit süratli harekete örnek verin.", "Örn: hız sabitleyiciyle giden otomobil."],
["Kuvvetin cisimler üzerindeki üç etkisini yazın.", "Hızlandırma/yavaşlatma, yön değiştirme, şekil değiştirme."] ] },
{ u: "Madde ve Isı", s: [
["Isı ile sıcaklık farkını yazın.", "Isı bir enerji türüdür (kalorimetre), sıcaklık termometreyle ölçülen göstergedir."],
["Isı iletimine üç örnek verin.", "Kaşığın sapının ısınması, kalorifer peteği, tencere sapı."],
["Yalıtım malzemelerine iki örnek verin.", "Strafor (köpük), cam yünü, çift cam."] ] },
{ u: "Ses ve Özellikleri", s: [
["Sesin yayılma hızını katılarda, sıvılarda ve gazlarda karşılaştırın.", "En hızlı katılarda, sonra sıvılarda, en yavaş gazlarda yayılır."],
["Ses şiddetinin birimini yazın.", "Desibel (dB)."],
["Yankı (eko) nasıl oluşur?", "Ses dalgalarının engele çarpıp geri dönmesiyle oluşur."] ] },
{ u: "Bitki ve Hayvanlarda Üreme", s: [
["Çiçeğin üremedeki görevini yazın.", "Çiçek, bitkinin üreme organıdır; tohum ve meyve oluşumunu sağlar."],
["Tozlaşma nedir? Örnek verin.", "Polenlerin dişicik tepesine taşınmasıdır; arılar ve rüzgâr taşır."],
["Yumurtayla ve doğurarak üreyen ikişer hayvan yazın.", "Yumurtayla: tavuk, kaplumbağa. Doğurarak: kedi, koyun."] ] }
],
sosyal: [
{ u: "Biz ve Değerlerimiz", s: [
["Değerlerimize üç örnek verin.", "Saygı, dürüstlük, yardımlaşma, vatanseverlik. (Üçü yeterli.)"],
["Empati nedir? Örnekle açıklayın.", "Kendini başkasının yerine koymaktır. Örn: üzgün arkadaşını anlamaya çalışmak."],
["Dayanışmaya okuldan bir örnek verin.", "Sınıfça kermes düzenleyip ihtiyaç sahibine yardım etmek."] ] },
{ u: "Tarihe Yolculuk", s: [
["İlk Çağ uygarlıklarına iki örnek verin.", "Sümerler, Mısırlılar, Hititler. (İkisi yeterli.)"],
["Yazının icadının tarihe etkisini yazın.", "Bilgi kalıcı hâle geldi, tarih çağları başladı."],
["Anadolu'da kurulmuş iki uygarlık yazın.", "Hititler, Lidyalılar (Frigler, Urartular da kabul)."] ] },
{ u: "Yeryüzünde Yaşam", s: [
["İklimi etkileyen üç faktörü yazın.", "Enlem, yükselti, denize uzaklık."],
["Nüfusun yoğun olduğu yerlerin iki özelliğini yazın.", "Ilıman iklim, su kaynakları, iş imkânları, verimli topraklar."],
["Göçün nedenlerine iki örnek verin.", "İşsizlik, eğitim imkânları, doğal afetler."] ] },
{ u: "Bilim ve Teknoloji", s: [
["Bilim insanlarının iki ortak özelliğini yazın.", "Meraklı ve sabırlı olmak, tarafsız gözlem yapmak."],
["Teknolojinin olumsuz bir etkisini ve çözümünü yazın.", "Olumsuz: teknoloji bağımlılığı. Çözüm: ekran süresini sınırlamak."],
["Türk bilim insanlarına iki örnek verin.", "İbn-i Sina, Ali Kuşçu, Aziz Sancar. (İkisi yeterli.)"] ] },
{ u: "Ekonomi ve Sosyal Hayat", s: [
["Meslek seçiminde dikkat edilecek üç ölçütü yazın.", "İlgi, yetenek, iş imkânları."],
["Bütçe nedir? Örnekle açıklayın.", "Gelir-gider planıdır. Örn: harçlığın bir kısmını biriktirmek."],
["Tüketici haklarına bir örnek verin.", "Ayıplı ürünü iade etme hakkı."] ] },
{ u: "Demokrasi ve Haklar", s: [
["Çocuk haklarına iki örnek verin.", "Eğitim hakkı, oyun hakkı, sağlık hakkı."],
["Oy kullanmanın yaşını ve önemini yazın.", "18 yaş. Yönetime katılmanın en temel yoludur."],
["Hoşgörünün toplumsal iki yararını yazın.", "Barışı korur, farklı görüşlerin bir arada yaşamasını sağlar."] ] }
],
ingilizce: [
{ u: "Life", s: [
["Günlük hayatınızı üç cümleyle İngilizce anlatın.", "Örn: I get up early. I go to school by bus. I do my homework."],
["Sıklık zarflarını (always-usually-sometimes-never) cümlede kullanın.", "Örn: I always brush my teeth. I never watch TV late."],
["“How often do you read books?” sorusuna cevap verin.", "Örn: I usually read books."] ] },
{ u: "Yummy Breakfast", s: [
["Kahvaltıda yediklerinizi İngilizce yazın.", "Örn: I eat cheese, olives and bread. I drink milk."],
["“Do you like honey?” sorusuna cevap verin.", "Yes, I do. / No, I don't."],
["Yiyeceklerden beşini İngilizce yazın.", "Egg, cheese, bread, butter, jam."] ] },
{ u: "Downtown", s: [
["Şehirdeki yerleri İngilizce yazın (4 tane).", "Bank, hospital, park, cinema."],
["“Where is the bank?” sorusuna cevap verin.", "Örn: It is next to the park."],
["“Turn right” ve “go straight” kalıplarını cümlede kullanın.", "Örn: Turn right and go straight ahead."] ] },
{ u: "Weather and Emotions", s: [
["Hava durumunu anlatan dört sözcük yazın.", "Sunny, rainy, cloudy, snowy."],
["“How do you feel today?” sorusuna cevap verin.", "Örn: I feel happy today."],
["Duyguları anlatan üç sözcük yazın.", "Happy, sad, excited."] ] },
{ u: "At the Fair", s: [
["Panayırdaki etkinlikleri İngilizce yazın.", "Örn: Ferris wheel, bumper cars, circus."],
["“Shall we go to the fair?” teklifine cevap verin.", "Örn: Sure, let's go! / Sorry, I can't."],
["Davet kalıbı kullanarak cümle kurun.", "Örn: Would you like to come with me?"] ] },
{ u: "Occupations", s: [
["Beş meslek yazın (İngilizce).", "Teacher, doctor, engineer, nurse, police officer."],
["“What does your father do?” sorusuna cevap verin.", "Örn: He is a driver."],
["“What do you want to be?” sorusuna cevap verin.", "Örn: I want to be a teacher."] ] }
],
din: [
{ u: "Peygamberlere İman", s: [
["İmanın şartlarından peygamberlere imanı açıklayın.", "Allah'ın elçilerine, getirdikleri vahye inanmaktır."],
["Kur'an'da adı geçen üç peygamberi yazın.", "Hz. Âdem, Hz. Nuh, Hz. İbrahim (Hz. Musa, Hz. İsa da kabul)."],
["Hz. Muhammed'in (s.a.v.) son peygamber oluşunu açıklayın.", "Ondan sonra peygamber gelmeyecektir; buna Hatmü'n-nübüvvet denir."] ] },
{ u: "Namazın Kılınışı", s: [
["Namazın içindeki farzlardan üçünü yazın.", "İftitah tekbiri, kıyam, rükû, secde, son oturuş (üçü yeterli)."],
["Sabah namazının kılınışını kısaca anlatın.", "Niyet edilir, tekbir alınır, iki rekât farz kılınır."],
["Cemaatle namazın iki faziletini yazın.", "Birlik sağlar, sevabı daha çoktur (27 derece)."] ] },
{ u: "Zararlı Alışkanlıklar", s: [
["Zararlı alışkanlıklara üç örnek verin.", "Sigara, alkol, uyuşturucu, kumar."],
["Sigaranın sağlığa iki zararını yazın.", "Akciğer kanseri, kalp-damar hastalıkları riski."],
["Kötü alışkanlıklardan korunmanın iki yolunu yazın.", "İyi arkadaş çevresi, spor ve hobilerle vakit geçirmek."] ] },
{ u: "Hz. Muhammed'in Hayatı", s: [
["Hz. Muhammed (s.a.v.) nerede, hangi yılda doğmuştur?", "571 yılında Mekke'de doğmuştur."],
["Hicretin yılını ve önemini yazın.", "622. Müslümanlar Mekke'den Medine'ye göç etti; hicrî takvimin başlangıcıdır."],
["Veda Hutbesi'nin iki mesajını yazın.", "Irk üstünlüğü yoktur; can, mal ve namus kutsaldır."] ] },
{ u: "Paylaşma ve Yardımlaşma", s: [
["Sadaka kavramını açıklayın.", "Allah rızası için yapılan her türlü yardım ve iyiliktir."],
["İnfakın toplumsal iki yararını yazın.", "Yoksulluğu azaltır, kardeşliği güçlendirir."],
["Paylaşmaya günlük hayattan örnek verin.", "Harçlığın bir kısmını ihtiyaç sahibine vermek, eşyayı ödünç vermek."] ] }
]
};
SINAV_VERISI[6] = {
turkce: [
{ s: "Hangisi terim anlamlıdır?", o: ["Sıcak karşılama", "Dik açı", "Soğuk hava", "Tatlı söz"], c: 1 },
{ s: "Hangisi paragrafın gelişme bölümüdür?", o: ["Konunun tanıtımı", "Konunun açıklanıp örneklendirilmesi", "Sonuç cümlesi", "Başlık"], c: 1 },
{ s: "“Gelmelisin” fiilinde kip nedir?", o: ["İstek", "Şart", "Gereklilik", "Emir"], c: 2 },
{ s: "“Ayşe kitabı okudu.” cümlesinde özne hangisidir?", o: ["kitabı", "okudu", "Ayşe", "kitap"], c: 2 },
{ s: "Hangisinde “de” bağlacı doğru yazılmıştır?", o: ["Evde geldim", "Bende geldim", "Okulda buluşalım", "Bende yok"], c: 2 },
{ s: "Hangisi hikâye unsurlarından değildir?", o: ["Kişi", "Yer", "Zaman", "Ölçek"], c: 3 },
{ s: "“Her şey” yazımı nasıldır?", o: ["Herşey", "Her şey", "Her-şey", "Hersey"], c: 1 },
{ s: "Emir kipiyle kurulan cümle hangisidir?", o: ["Gelsem mi?", "Kapıyı kapat.", "Gelmelisin.", "Gelseydin."], c: 1 } ],
matematik: [
{ s: "(15 − 5) × 4 + 10 işleminin sonucu kaçtır?", o: ["50", "60", "30", "90"], c: 0 },
{ s: "24'ün çarpanları hangileridir?", o: ["1,2,3,4,6,8,12,24", "2,4,6,12", "1,3,8,24", "2,3,5,7"], c: 0 },
{ s: "(−5) + (+9) kaçtır?", o: ["−14", "+4", "−4", "+14"], c: 1 },
{ s: "x = 3 için 4x − 5 kaçtır?", o: ["7", "12", "17", "2"], c: 0 },
{ s: "15'in 25'e oranı en sade hâliyle nedir?", o: ["15/25", "3/5", "5/3", "1/5"], c: 1 },
{ s: "1 m³ kaç litredir?", o: ["100", "1000", "10", "10000"], c: 1 },
{ s: "Hangisi asaldır?", o: ["9", "15", "13", "21"], c: 2 },
{ s: "Dikdörtgenler prizmasının yüz sayısı kaçtır?", o: ["4", "6", "8", "12"], c: 1 } ],
fen: [
{ s: "Güneş'e en yakın gezegen hangisidir?", o: ["Venüs", "Merkür", "Mars", "Dünya"], c: 1 },
{ s: "Kemikler ve kaslar hangi sistemdendir?", o: ["Solunum", "Destek ve hareket", "Sindirim", "Boşaltım"], c: 1 },
{ s: "Sürat formülü nedir?", o: ["yol × zaman", "yol ÷ zaman", "zaman ÷ yol", "yol + zaman"], c: 1 },
{ s: "Isıyı iyi iletmeyen malzemeye ne denir?", o: ["İletken", "Yalıtkan", "Mıknatıs", "Saydam"], c: 1 },
{ s: "Ses en hızlı nerede yayılır?", o: ["Havada", "Boşlukta", "Demirde", "Suda"], c: 2 },
{ s: "Bitkinin üreme organı hangisidir?", o: ["Kök", "Yaprak", "Çiçek", "Gövde"], c: 2 },
{ s: "Ay tutulması hangi evrede olur?", o: ["Yeni ay", "Dolunay", "Hilal", "İlk dördün"], c: 1 },
{ s: "Ses şiddetinin birimi nedir?", o: ["Newton", "Desibel", "Metre", "Saniye"], c: 1 } ],
sosyal: [
{ s: "Empati nedir?", o: ["Kendini başkasının yerine koyma", "Başkalarını suçlama", "Kurallara uymama", "Yalnız kalma"], c: 0 },
{ s: "Yazının icadı neyi başlattı?", o: ["Orta Çağ'ı", "Tarih çağlarını", "Sanayi'yi", "Cumhuriyet'i"], c: 1 },
{ s: "İklimi etkileyen faktör değildir?", o: ["Enlem", "Yükselti", "Nüfus", "Denize uzaklık"], c: 2 },
{ s: "Tüketici hakkı hangisidir?", o: ["Ayıplı ürünü iade", "Vergi vermeme", "Kuralsızlık", "Borçlanma"], c: 0 },
{ s: "Oy kullanma yaşı kaçtır?", o: ["15", "16", "17", "18"], c: 3 },
{ s: "Türk bilim insanı hangisidir?", o: ["Newton", "Aziz Sancar", "Einstein", "Galileo"], c: 1 },
{ s: "Meslek seçiminde önemli değildir?", o: ["İlgi", "Yetenek", "Burç", "İş imkânı"], c: 2 },
{ s: "Çocuk hakkı hangisidir?", o: ["Çalışma zorunluluğu", "Eğitim hakkı", "Oy kullanma", "Askerlik"], c: 1 } ],
ingilizce: [
{ s: "'I ___ brush my teeth.' (her zaman) hangisi gelir?", o: ["never", "always", "sometimes", "rarely"], c: 1 },
{ s: "'Cheese' Türkçesi nedir?", o: ["Yumurta", "Peynir", "Bal", "Tereyağı"], c: 1 },
{ s: "'It is ___ the park.' (yanında) hangisi gelir?", o: ["next to", "under", "on", "in"], c: 0 },
{ s: "'I feel ___ today.' (mutlu) hangisi gelir?", o: ["sad", "happy", "angry", "tired"], c: 1 },
{ s: "'___ you like to come?' (davet) hangisi gelir?", o: ["Do", "Are", "Would", "Shall"], c: 2 },
{ s: "'He is a ___.' (öğretmen) hangisi gelir?", o: ["teacher", "driver", "doctor", "teach"], c: 0 },
{ s: "'How often' ne sorar?", o: ["Nerede", "Ne sıklıkla", "Neden", "Kaç para"], c: 1 },
{ s: "'Hospital' Türkçesi nedir?", o: ["Okul", "Hastane", "Park", "Banka"], c: 1 } ],
din: [
{ s: "Son peygamber kimdir?", o: ["Hz. Musa", "Hz. İsa", "Hz. Muhammed", "Hz. Nuh"], c: 2 },
{ s: "Namazın içindeki farzlardan biri hangisidir?", o: ["Abdest almak", "Kıyam", "Ezan okumak", "Camiye gitmek"], c: 1 },
{ s: "Zararlı alışkanlık hangisidir?", o: ["Spor yapmak", "Kitap okumak", "Sigara içmek", "Uyumak"], c: 2 },
{ s: "Hicret hangi yılda olmuştur?", o: ["571", "610", "622", "632"], c: 2 },
{ s: "Sadaka nedir?", o: ["Zorunlu vergi", "Allah rızası için yardım", "Borç verme", "Ticaret"], c: 1 },
{ s: "Cemaatle namazın sevabı nasıldır?", o: ["Aynıdır", "27 derece fazladır", "Yarı yarıyadır", "Geçersizdir"], c: 1 },
{ s: "Veda Hutbesi mesajı hangisidir?", o: ["Irk üstünlüğü yoktur", "Savaş çağrısı", "Vergi emri", "Göç emri"], c: 0 },
{ s: "Kötü alışkanlıktan korunma yolu hangisidir?", o: ["Yalnız kalmak", "İyi arkadaş çevresi", "Gece gezmek", "Sır saklamak"], c: 1 } ]
};

/* ===== odev-7.js ===== */
/* 7. Sınıf hazır ödevler + deneme sınavları (özgün içerik) */
ODEV_VERISI[7] = {
turkce: [
{ u: "Anlam Bilgisi", s: [
["Gerçek, mecaz, terim ve argo anlama birer örnek yazın.", "Gerçek: soğuk su. Mecaz: soğuk davranış. Terim: yüklem. Argo: kanka (samimi dil)."],
["“Göz” sözcüğünü üç farklı anlamda cümlede kullanın.", "Örn: Gözüm ağrıyor. (organ) / Bu işte gözü var. (ilgi) / Çorbanın gözleri oluştu. (yağ damlası)."],
["Deyim ile atasözü farkını örnekle yazın.", "Deyim yargı bildirmez (gözden düşmek); atasözü öğüt verir (Damlaya damlaya göl olur)."] ] },
{ u: "Paragrafta Anlam", s: [
["Paragrafta yardımcı düşüncelerin görevini yazın.", "Ana düşünceyi örneklendirir, açıklar ve inandırıcı kılar."],
["“Paragrafın akışını bozan cümle” nasıl bulunur?", "Konuyla ilgisiz, farklı düşünceye geçen cümle aranır."],
["Öznel ve nesnel yargıya paragraftan örnek verin.", "Öznel: “En güzel mevsim ilkbahardır.” Nesnel: “İlkbahar üç ay sürer.”"] ] },
{ u: "Fiillerde Kip ve Kişi", s: [
["“Gideyim, gelesin, yapalım” fiillerinin kip ve kişisini yazın.", "Gideyim: istek, 1. tekil. Gelesin: emir, 3. tekil (istek kipi kalıbında emir anlamı). Yapalım: istek, 1. çoğul."],
["Haber ve dilek kiplerini ikişer örnekle ayırt edin.", "Haber: geldi, gelecek (zaman bildirir). Dilek: gelse, gelmeli (tasarım bildirir)."],
["Şart kipiyle birleşik cümle kurun.", "Örn: Erken kalkarsan otobüsü kaçırmazsın."] ] },
{ u: "Cümlede Anlam İlişkileri", s: [
["Neden-sonuç ile amaç-sonuç farkını örnekle yazın.", "Neden-sonuç: gerçekleşti (Yağmur yağdığı için ıslandı). Amaç-sonuç: gerçekleşmedi (Islanmamak için şemsiye aldı)."],
["Koşul cümlesine örnek yazıp koşulu gösterin.", "Örn: Ödevini bitirirsen parka gidebilirsin. (Koşul: ödevi bitirmek.)"],
["Karşılaştırma cümlesine örnek yazın.", "Örn: Elma, armuttan daha suludur."] ] },
{ u: "Yazım Kuralları", s: [
["“Türkçe'nin” yazımını düzeltip kuralı yazın.", "Doğrusu: Türkçenin. Özel ada gelen yapım eki (-çe) kesmeyle ayrılmaz."],
["Kısaltmaların yazımına iki örnek verin.", "TBMM, TDK, Dr., Prof. (Nokta ve büyük harf kurallarına dikkat.)"],
["Sayıların yazımına iki örnek verin.", "Yüzde yirmi beş, 3. kat, 14.30."] ] },
{ u: "Edebi Türler", s: [
["Destan ile efsane farkını yazın.", "Destan: ulusun ortak kahramanlık anlatısı (uzun). Efsane: olağanüstü yer-olay açıklaması (kısa)."],
["Tiyatro metninin iki özelliğini yazın.", "Sahnelenmek için yazılır; konuşma (diyalog) ağırlıklıdır."],
["Deneme türünün özelliğini yazın.", "Yazarın kişisel düşünceleri, kanıtlama kaygısı olmadan anlatılır."] ] }
],
matematik: [
{ u: "Tam Sayılarla İşlemler", s: [
["(−12) + (+5) − (−3) işleminin sonucunu bulun.", "−12 + 5 + 3 = −4."],
["(−2)³ + (−3)² işleminin sonucunu bulun.", "−8 + 9 = +1."],
["(−36) ÷ (+4) × (−1) işleminin sonucunu bulun.", "−9 × (−1) = +9."] ] },
{ u: "Rasyonel Sayılar", s: [
["−3/4 ile −2/3 kesirlerini karşılaştırın.", "Payda eşitle: −9/12 < −8/12, yani −3/4 < −2/3."],
["1,2 + 3/4 işlemini yapın.", "1,2 + 0,75 = 1,95."],
["0,333... devirli ondalık sayısının rasyonel karşılığını yazın.", "1/3."] ] },
{ u: "Cebirsel İfadeler ve Eşitlik", s: [
["5x − 7 = 18 denklemini çözün.", "5x = 25 → x = 5."],
["3(x − 2) + 4 = 19 denklemini çözün.", "3x − 6 + 4 = 19 → 3x = 21 → x = 7."],
["“Bir sayının yarısının 4 fazlası 10'dur.” denklemini kurup çözün.", "x/2 + 4 = 10 → x/2 = 6 → x = 12."] ] },
{ u: "Oran-Orantı ve Yüzdeler", s: [
["240'ın %25'ini bulun.", "240 × 25/100 = 60."],
["Bir ürün 200 TL'den %20 indirimle kaç TL olur?", "200 − 40 = 160 TL."],
["3/5 = 12/x orantısında x kaçtır?", "3x = 60 → x = 20."] ] },
{ u: "Doğrular ve Açılar", s: [
["Tümler ve bütünler açıyı tanımlayıp örnek verin.", "Tümler: toplamı 90° (30°+60°). Bütünler: toplamı 180° (70°+110°)."],
["Ters açıların özelliğini yazın.", "Kesişen iki doğrunun karşılıklı açıları birbirine eşittir."],
["Yöndeş açılara günlük örnek verin.", "Merdiven basamaklarının aynı yöne bakan köşeleri."] ] },
{ u: "Çember ve Daire", s: [
["Yarıçapı 7 cm olan çemberin çevresini bulun (π = 22/7).", "2×22/7×7 = 44 cm."],
["Yarıçapı 6 cm olan dairenin alanını bulun (π = 3).", "3×36 = 108 cm²."],
["Çember ile daire farkını yazın.", "Çember yalnız eğri çizgidir; daire iç bölgesiyle birlikte alandır."] ] }
],
fen: [
{ u: "Güneş Sistemi ve Ötesi", s: [
["Yıldız ile gezegen farkını yazın.", "Yıldız ısı-ışık üretir (Güneş); gezegen üretmez, yansıtır."],
["Gök ada (galaksi) nedir? Örnek verin.", "Milyarlarca yıldız topluluğudur; Samanyolu."],
["Işık yılını tanımlayın.", "Işığın bir yılda aldığı yol; uzaklık birimidir."] ] },
{ u: "Hücre ve Bölünmeler", s: [
["Bitki ve hayvan hücresinin iki farkını yazın.", "Bitkide hücre duvarı ve kloroplast vardır; hayvanda yoktur."],
["Mitoz bölünmenin sonucunu yazın.", "Bir hücreden, kalıtsal olarak aynı iki hücre oluşur."],
["Mayozun mitozdan iki farkını yazın.", "Mayozda kromozom yarıya iner ve 4 hücre oluşur; üreme hücrelerinde görülür."] ] },
{ u: "Kuvvet, İş ve Enerji", s: [
["İşin yapılması için iki şartı yazın.", "Kuvvet uygulanmalı ve cisim kuvvet yönünde yer değiştirmeli."],
["Kinetik ve potansiyel enerjiye örnek verin.", "Kinetik: koşan çocuk. Potansiyel: raftaki vazo."],
["20 N kuvvetle 5 m itilen cisimde yapılan işi bulun.", "W = 20×5 = 100 J."] ] },
{ u: "Maddenin Yapısı", s: [
["Element ile bileşik farkını örnekle yazın.", "Element tek cins atom (demir); bileşik birden çok cins (su: H₂O)."],
["Atomun temel parçacıklarını ve yüklerini yazın.", "Proton (+), nötron (0), elektron (−)."],
["Karışımlara iki örnek verin.", "Tuzlu su, ayran, hava."] ] },
{ u: "Işık ve Ses", s: [
["Işığın yansıma kanunlarını yazın.", "Gelme açısı yansıma açısına eşittir; gelen- yansıyan ışın ve normal aynı düzlemdedir."],
["Sesin yayılması için ne gerekir?", "Maddesel ortam (katı, sıvı veya gaz) gerekir."],
["Düzgün ve dağınık yansımaya örnek verin.", "Düzgün: ayna. Dağınık: duvar, kâğıt."] ] },
{ u: "Canlılarda Üreme ve Gelişim", s: [
["Eşeyli ve eşeysiz üreme farkını yazın.", "Eşeylide iki ata, çeşitlilik artar; eşeysizde tek ata, hızlı çoğalma olur."],
["Başkalışıma (metamorfoz) örnek verin.", "Kelebek: yumurta → tırtıl → pupa → kelebek."],
["İnsanda ergenlikte görülen iki değişimi yazın.", "Boy uzaması, ses değişimi, hızlı büyüme."] ] }
],
sosyal: [
{ u: "İletişim ve İnsan İlişkileri", s: [
["Etkili dinlemenin üç kuralını yazın.", "Göz teması kurmak, söz kesmemek, geri bildirim vermek."],
["Beden diline iki örnek verin.", "Gülümseme, el kol hareketleri, kaş çatma."],
["Empati kurmanın iletişime katkısını yazın.", "Anlaşmazlıkları azaltır, güven oluşturur."] ] },
{ u: "Türk Tarihinde Yolculuk", s: [
["Malazgirt Savaşı'nın yılını ve sonucunu yazın.", "1071. Anadolu'nun Türklere açılması."],
["Osmanlı Devleti'nin kurucusunu ve kuruluş yılını yazın.", "Osman Gazi, 1299."],
["İstanbul'un fethinin yılını ve önemini yazın.", "1453. Orta Çağ kapandı, Yeni Çağ açıldı."] ] },
{ u: "Nüfus ve Yerleşme", s: [
["Nüfus sayımının iki amacını yazın.", "Eğitim-sağlık planlaması, seçmen ve askerlik kayıtları."],
["Kırdan kente göçün iki nedenini yazın.", "İş bulma, eğitim ve sağlık hizmetlerine erişim."],
["Nüfus yoğunluğunu etkileyen iki faktörü yazın.", "İklim, su kaynakları, sanayi ve iş imkânları."] ] },
{ u: "Zaman İçinde Bilim", s: [
["Yazının bulunuşunun bilime katkısını yazın.", "Bilgi birikti ve aktarıldı; bilim hızlandı."],
["Matbaanın önemini yazın.", "Kitaplar çoğaldı, bilgi halka ulaştı."],
["Günümüzün iki önemli teknolojik gelişmesini yazın.", "Yapay zekâ, yenilenebilir enerji, uzay çalışmaları. (İkisi yeterli.)"] ] },
{ u: "Ekonomi ve Yönetim", s: [
["Verginin iki kullanım alanını yazın.", "Okul, hastane, yol, köprü yapımı."],
["Tasarrufun ülke ekonomisine katkısını yazın.", "Birikimler yatırıma dönüşür, dışa bağımlılık azalır."],
["Bilinçli tüketiciye iki örnek davranış yazın.", "Fiş/fatura almak, garanti belgesini saklamak."] ] },
{ u: "Demokrasi Serüveni", s: [
["Meşrutiyetin anlamını yazın.", "Padişah yanında meclisin de yönetime katılmasıdır."],
["Cumhuriyetin ilan yılını yazın.", "29 Ekim 1923."],
["Demokrasilerde kuvvetler ayrılığını yazın.", "Yasama (TBMM), yürütme (hükümet), yargı (mahkemeler) birbirinden ayrıdır."] ] }
],
ingilizce: [
{ u: "Appearance and Personality", s: [
["Dış görünüşü anlatan 4 sözcük yazın.", "Tall, short, blonde, curly."],
["Kişiliği anlatan 4 sözcük yazın.", "Kind, funny, shy, hardworking."],
["Arkadaşınızı iki cümleyle İngilizce tanıtın.", "Örn: My friend is tall and slim. She is very kind."] ] },
{ u: "Sports", s: [
["“Do” ve “play” alan sporlara ikişer örnek verin.", "Do: yoga, karate. Play: football, tennis."],
["“How often do you do sports?” sorusuna cevap verin.", "Örn: I do sports twice a week."],
["Sevdiğiniz sporu İngilizce anlatın.", "Örn: I like basketball. It is exciting."] ] },
{ u: "Biographies", s: [
["Geçmiş zaman (did) ile iki cümle yazın.", "Örn: He was born in 1881. He studied hard."],
["Atatürk'ü iki cümleyle İngilizce anlatın.", "Örn: Atatürk was born in 1881 in Thessaloniki. He founded Türkiye."],
["“Where was she born?” sorusuna cevap verin.", "Örn: She was born in İzmir."] ] },
{ u: "Wild Animals", s: [
["Vahşi hayvanlardan beşini İngilizce yazın.", "Lion, elephant, tiger, bear, wolf."],
["Yaşam alanlarını anlatın (live in).", "Örn: Lions live in Africa. Penguins live at the South Pole."],
["Nesli tehlikede bir hayvanı İngilizce anlatın.", "Örn: Pandas are in danger. We must protect them."] ] },
{ u: "Television", s: [
["TV program türlerinden dördünü yazın.", "News, cartoon, documentary, series."],
["“What is on TV tonight?” sorusuna cevap verin.", "Örn: There is a good documentary tonight."],
["En sevdiğiniz programı anlatın.", "Örn: I like documentaries. They are informative."] ] },
{ u: "Celebrations", s: [
["Kutlamalarda kullanılan 4 sözcük yazın.", "Party, gift, cake, invitation."],
["Doğum günü davetini İngilizce yazın.", "Örn: You are invited to my birthday party on Sunday!"],
["Dini/milli bayramlarımızdan birini İngilizce anlatın.", "Örn: We celebrate the Republic Day on October 29."] ] }
],
din: [
{ u: "Meleklere ve Ahirete İman", s: [
["Dört büyük meleği ve görevlerini yazın.", "Cebrail (vahiy), Mikâil (rızık-doğa), İsrafil (sûr), Azrail (ölüm)."],
["Ahiret hayatının aşamalarını sırayla yazın.", "Ölüm → kabir → kıyamet → haşir → hesap → cennet/cehennem."],
["Ahirete imanın davranışlara etkisini yazın.", "İnsan hesap vereceğini bilerek iyiliğe yönelir, kötülükten sakınır."] ] },
{ u: "Hac ve Umre", s: [
["Hac ile umre arasındaki iki farkı yazın.", "Hac farz ve belirli zamandadır; umre sünnet ve her zaman yapılabilir."],
["Haccın farzlarından ikisini yazın.", "İhram, Arafat vakfesi (tavaf ve sa'y ile birlikte)."],
["Kâbe'nin Müslümanlar için önemini yazın.", "Kıbledir; namazda yönelinen, hacda ziyaret edilen kutsal mabettir."] ] },
{ u: "Ahlaki Davranışlar", s: [
["Güzel ahlaka üç örnek yazın.", "Dürüstlük, sabır, cömertlik, affedicilik."],
["Gıybetin ne olduğunu ve hükmünü yazın.", "Arkadaşın hoşlanmayacağı şeyi arkasından konuşmak; günahtır, yasaklanmıştır."],
["Sabır kavramını örnekle açıklayın.", "Zorlukta metanet: Örn: sınava düzenli çalışıp sonucu beklemek."] ] },
{ u: "Kur'an'dan Mesajlar", s: [
["“Muhakkak ki iyilikler kötülükleri giderir.” ayetinin mesajını yazın.", "İyilik yapmak hataları telafi eder; iyiliğe yönelin."],
["İsraf ile ilgili ayet mealini yazın.", "“Yiyin için fakat israf etmeyin...” (A'râf 31)."],
["Anne-babaya iyilik ayetini yazın.", "“Onlara öf bile deme...” (İsrâ 23)."] ] },
{ u: "Hz. Muhammed'in Örnekliği", s: [
["Hz. Peygamber'in güvenilirliğine örnek yazın.", "Mekkeliler ona “el-Emîn” (güvenilir) der, eşyalarını emanet ederdi."],
["Peygamberimizin çocuk sevgisine örnek yazın.", "Torunlarını omzuna alır, namazda bile şefkat gösterirdi."],
["Affediciliğine tarihten örnek yazın.", "Mekke'nin fethinde geçmişi affetmesi."] ] }
]
};
SINAV_VERISI[7] = {
turkce: [
{ s: "Hangisi terim anlamlıdır?", o: ["Soğuk davranış", "Yüklem", "Tatlı söz", "Ağır çanta"], c: 1 },
{ s: "“Gideyim” fiilinin kipi ve kişisi nedir?", o: ["İstek-2. tekil", "İstek-1. tekil", "Emir-1. tekil", "Şart-3. tekil"], c: 1 },
{ s: "Hangisi amaç-sonuç cümlesidir?", o: ["Yağmur yağdığı için ıslandı.", "Islanmamak için şemsiye aldı.", "Yağmur yağdı ve ıslandı.", "Islandı çünkü koştu."], c: 1 },
{ s: "Hangisinde yazım yanlışı vardır?", o: ["Türkçenin incelikleri", "Türkçe'nin güzelliği", "Ankara'ya gittik", "Okulda buluştuk"], c: 1 },
{ s: "Destan ile efsane farkı nedir?", o: ["Aynı şeydir", "Destan ulusal kahramanlık, efsane kısa olağanüstü anlatı", "Efsane daha uzundur", "İkisi de gerçektir"], c: 1 },
{ s: "Paragrafı bölerken ölçü nedir?", o: ["Cümle sayısı", "Düşünce değişimi", "Kelime sayısı", "Satır sayısı"], c: 1 },
{ s: "Öznel yargı hangisidir?", o: ["Su 100 derecede kaynar", "En güzel mevsim ilkbahardır", "Yıl 12 aydır", "Dünya yuvarlaktır"], c: 1 },
{ s: "Tiyatro metni özelliği nedir?", o: ["Sahnelenmek için yazılır", "Kanıtlama amaçlıdır", "Kişisel blogdur", "Haber metnidir"], c: 0 } ],
matematik: [
{ s: "(−12) + (+5) − (−3) kaçtır?", o: ["−4", "−10", "−14", "4"], c: 0 },
{ s: "−3/4 ile −2/3 karşılaştırması nedir?", o: ["−3/4 > −2/3", "−3/4 < −2/3", "Eşittir", "Bilinemez"], c: 1 },
{ s: "5x − 7 = 18 ise x kaçtır?", o: ["4", "5", "6", "25"], c: 1 },
{ s: "240'ın %25'i kaçtır?", o: ["40", "50", "60", "80"], c: 2 },
{ s: "Tümler iki açıdan biri 30° ise diğeri kaçtır?", o: ["150°", "90°", "60°", "30°"], c: 2 },
{ s: "Yarıçapı 7 cm çemberin çevresi kaç cm'dir? (π=22/7)", o: ["44", "154", "22", "88"], c: 0 },
{ s: "3/5 = 12/x ise x kaçtır?", o: ["15", "18", "20", "25"], c: 2 },
{ s: "20 N kuvvetle 5 m itilen cisimde iş kaç J'dür?", o: ["25", "100", "4", "120"], c: 1 } ],
fen: [
{ s: "Isı-ışık üreten gök cismi hangisidir?", o: ["Gezegen", "Yıldız", "Uydu", "Asteroit"], c: 1 },
{ s: "Mitoz sonucu ne olur?", o: ["4 farklı hücre", "2 aynı hücre", "Kromozom yarıya iner", "Hücre ölür"], c: 1 },
{ s: "İşin şartı nedir?", o: ["Kuvvet ve yer değiştirme", "Yalnız kuvvet", "Yalnız ağırlık", "Hız"], c: 0 },
{ s: "Atomun yüksüz parçacığı hangisidir?", o: ["Proton", "Elektron", "Nötron", "Çekirdek"], c: 2 },
{ s: "Gelme açısı 30° ise yansıma açısı kaçtır?", o: ["60°", "30°", "90°", "15°"], c: 1 },
{ s: "Eşeysiz üremenin özelliği nedir?", o: ["İki ata vardır", "Tek ata, hızlı çoğalma", "Çeşitlilik artar", "Yavaştır"], c: 1 },
{ s: "Işık yılı nedir?", o: ["Zaman birimi", "Uzaklık birimi", "Hız birimi", "Kütle birimi"], c: 1 },
{ s: "Bitkide üreme organı hangisidir?", o: ["Kök", "Çiçek", "Yaprak", "Tohum"], c: 1 } ],
sosyal: [
{ s: "Malazgirt Savaşı hangi yılda oldu?", o: ["1071", "1453", "1299", "1923"], c: 0 },
{ s: "Etkili dinleme kuralı değildir?", o: ["Göz teması", "Söz kesmeme", "Telefonla oynama", "Geri bildirim"], c: 2 },
{ s: "Kırdan kente göç nedeni nedir?", o: ["İş bulma", "Deniz", "Orman", "Tatil"], c: 0 },
{ s: "Matbaanın önemi nedir?", o: ["Bilginin halka ulaşması", "Tarlaların sürülmesi", "Yolların yapılması", "Savaşların bitmesi"], c: 0 },
{ s: "Cumhuriyet ne zaman ilan edildi?", o: ["1920", "1921", "1923", "1938"], c: 2 },
{ s: "Kuvvetler ayrılığı nedir?", o: ["Tek elde toplanma", "Yasama-yürütme-yargı ayrılığı", "Meclisin kapanması", "Seçimsizlik"], c: 1 },
{ s: "Vergi nereye harcanır?", o: ["Kişisel tatil", "Okul-hastane-yol", "Yurt dışı", "Hediye"], c: 1 },
{ s: "Bilinçli tüketici davranışı hangisidir?", o: ["Fiş almamak", "Garanti belgesi saklamak", "Fiyat sormamak", "İade etmemek"], c: 1 } ],
ingilizce: [
{ s: "'Tall' Türkçesi nedir?", o: ["Kısa", "Uzun (boy)", "Zayıf", "Genç"], c: 1 },
{ s: "'Do yoga' doğru mudur?", o: ["Hayır, play yoga", "Evet, doğrudur", "Hayır, go yoga", "Yanlıştır"], c: 1 },
{ s: "'He was born in 1881.' Türkçesi nedir?", o: ["1881'de öldü", "1881'de doğdu", "1881'de evlendi", "1881'de taşındı"], c: 1 },
{ s: "'Penguins live ___.' (Güney Kutbu) hangisi gelir?", o: ["at the South Pole", "in desert", "on tree", "at home"], c: 0 },
{ s: "'Documentary' ne demektir?", o: ["Çizgi film", "Belgesel", "Dizi", "Haber"], c: 1 },
{ s: "'You are invited...' ne demektir?", o: ["Davetlisin", "Yasaksın", "Geciktin", "Unuttun"], c: 0 },
{ s: "'Kind' Türkçesi nedir?", o: ["Kibar/nazik", "Komik", "Utangaç", "Çalışkan"], c: 0 },
{ s: "'Twice a week' ne demektir?", o: ["Ayda iki kez", "Haftada iki kez", "Yılda iki kez", "Günde iki kez"], c: 1 } ],
din: [
{ s: "Vahiy meleği hangisidir?", o: ["Mikâil", "Cebrail", "İsrafil", "Azrail"], c: 1 },
{ s: "Hac ile umre farkı nedir?", o: ["Aynıdır", "Hac farz ve vaktinde, umre her zaman", "Umre farzdır", "İkisi de sünnet"], c: 1 },
{ s: "Gıybet nedir?", o: ["Yalan söylemek", "Arkasından hoşlanılmayanı konuşmak", "Hırsızlık", "Kıskançlık"], c: 1 },
{ s: "İsraf ayeti hangisidir?", o: ["Yiyin için fakat israf etmeyin", "Namaz kılın", "Oruç tutun", "Savaşın"], c: 0 },
{ s: "Peygamberimizin lakabı nedir?", o: ["el-Emîn", "el-Kerim", "el-Aziz", "el-Hakim"], c: 0 },
{ s: "Kıble neresidir?", o: ["Mescid-i Aksa", "Kâbe", "Medine", "Arafat"], c: 1 },
{ s: "Sabır örneği hangisidir?", o: ["Hemen vazgeçmek", "Düzenli çalışıp beklemek", "Bağırmak", "Kaçmak"], c: 1 },
{ s: "Ahiret aşaması değildir?", o: ["Haşir", "Hesap", "Doğum", "Kıyamet"], c: 2 } ]
};

/* ===== odev-8.js ===== */
/* 8. Sınıf hazır ödevler + deneme sınavları (özgün içerik) */
ODEV_VERISI[8] = {
turkce: [
{ u: "Sözcükte Anlam ve Deyimler", s: [
["“Gözden düşmek” deyiminin anlamını cümlede kullanın.", "Değerini yitirmek. Örn: Yalan söyleyince gözden düştü."],
["“El” sözcüğünü üç farklı anlamda kullanın.", "Örn: Elim ağrıyor. (organ) / Bu işte eli var. (etki) / Ele güne karşı. (başkaları)."],
["Atasözü ile deyimi iki cümleyle ayırt edin.", "Deyim: Pabucu dama atılmak (gözden düşmek). Atasözü: Ağaç yaşken eğilir (öğüt verir)."] ] },
{ u: "Cümlede Anlam", s: [
["Örtülü anlam taşıyan cümleye örnek yazın.", "Örn: “Yine geç kalmışsın.” (Sürekli geç kaldığı anlamı gizli.)"],
["Aşamalı durum cümlesine örnek yazın.", "Örn: Hastalığı günden güne iyileşiyor."],
["“Hem çalışıyor hem okuyor.” cümlesindeki anlam ilişkisini yazın.", "Birliktelik/bağlama: iki durumun aynı anda varlığı."] ] },
{ u: "Paragrafta Yapı ve Anlam", s: [
["Paragrafta düşünceyi geliştirme yollarından üçünü yazın.", "Tanımlama, örneklendirme, karşılaştırma, benzetme, tanık gösterme."],
["“Paragrafın akışını bozan cümle” sorusunda stratejiyi yazın.", "Her cümlenin konuyla bağını kur; konudan sapan cümleyi işaretle."],
["Giriş cümlesi olamayacak cümle özelliğini yazın.", "“Bu nedenle, oysa, ayrıca” gibi önceki cümleye bağlanan ifadeler giriş olamaz."] ] },
{ u: "Fiilimsiler", s: [
["İsim-fiil, sıfat-fiil ve zarf-fiil eklerini yazın.", "İsim-fiil: -ma/-me, -mak/-mek, -ış/-iş. Sıfat-fiil: -an/-en, -mış, -acak, -dık, -ası. Zarf-fiil: -ıp, -arak, -ınca, -ken, -madan, -dıkça."],
["“Okumak güzeldir.” ve “Okuyan öğrenci” cümlelerindeki fiilimsileri bulun.", "Okumak: isim-fiil. Okuyan: sıfat-fiil."],
["Zarf-fiille iki cümle kurun.", "Örn: Eve gelince ödevini yaptı. Koşarak yetişti."] ] },
{ u: "Cümlenin Öğeleri ve Türleri", s: [
["“Öğretmen, başarılı öğrencileri törenle ödüllendirdi.” cümlesini öğelerine ayırın.", "Ödüllendirdi: yüklem. Kim? Öğretmen: özne. Kimleri? Öğrencileri: belirtili nesne. Nasıl? Törenle: zarf tümleci."],
["Basit, birleşik ve sıralı cümleye örnek yazın.", "Basit: Ali geldi. Birleşik: Gelince sevindim. Sıralı: Geldi, gördü, gitti."],
["Olumlu-olumsuz ve soru cümlesine örnek yazın.", "Olumlu: Kitap okudum. Olumsuz: Okumadım. Soru: Okudun mu?"] ] },
{ u: "Yazım, Noktalama ve Anlatım Bozuklukları", s: [
["“Herşey yolunda mı?” cümlesindeki hataları düzeltin.", "Doğrusu: Her şey yolunda mı? (“Her şey” ayrı, “mi” ayrı.)"],
["Özne-yüklem uyumsuzluğuna örnek yazıp düzeltin.", "Yanlış: “Çocuklar parka gittiler.” havasında... Doğru örnek: “Herkes geldiler.” → “Herkes geldi.”"],
["Gereksiz sözcük kullanımına örnek yazın.", "Örn: “Geriye döndü.” → “Döndü.” (geri gereksiz)."] ] }
],
matematik: [
{ u: "Çarpanlar ve Katlar / Üslü İfadeler", s: [
["2⁵ × 2³ işleminin sonucunu üslü yazın.", "2⁸ = 256."],
["48 sayısının asal çarpanlarını yazın.", "48 = 2⁴ × 3; asal çarpanlar: 2 ve 3."],
["(3²)³ işleminin sonucunu bulun.", "3⁶ = 729."] ] },
{ u: "Kareköklü İfadeler", s: [
["√75 sayısını a√b biçiminde yazın.", "√(25×3) = 5√3."],
["3√2 + 5√2 − 2√2 işlemini yapın.", "(3+5−2)√2 = 6√2."],
["√2 × √8 işleminin sonucunu bulun.", "√16 = 4."] ] },
{ u: "Veri Analizi ve Olasılık", s: [
["Bir zar atıldığında 6 gelme olasılığını yazın.", "1/6."],
["Torpadaki 3 kırmızı, 5 mavi toptan rastgele çekilenin mavi olma olasılığı nedir?", "5/8."],
["Aritmetik ortalama ile medyan farkını örnekle yazın.", "Veri: 2,3,10. Ortalama 5, medyan (ortanca) 3."] ] },
{ u: "Cebirsel İfadeler ve Özdeşlikler", s: [
["(x + 3)² özdeşliğini açın.", "x² + 6x + 9."],
["x² − 16 ifadesini çarpanlarına ayırın.", "(x − 4)(x + 4) (iki kare farkı)."],
["(2a − 1)(2a + 1) işlemini yapın.", "4a² − 1."] ] },
{ u: "Doğrusal Denklemler", s: [
["2x + 5 = 17 denklemini çözün.", "2x = 12 → x = 6."],
["y = 3x − 2 doğrusunun eğimini ve y eksenini kestiği noktayı yazın.", "Eğim 3, kesim noktası (0, −2)."],
["3(x − 4) = 2x + 1 denklemini çözün.", "3x − 12 = 2x + 1 → x = 13."] ] },
{ u: "Geometrik Cisimler ve Dönüşümler", s: [
["Küpün yüzey alanını bir kenarı 5 cm için bulun.", "6×25 = 150 cm²."],
["Öteleme ile yansıma farkını yazın.", "Ötelemede şekil kayar, yön değişmez; yansımada ayna görüntüsü oluşur."],
["Dik dairesel silindirin hacim formülünü yazın.", "V = πr²h."] ] }
],
fen: [
{ u: "Mevsimler ve İklim", s: [
["Mevsimlerin oluşma nedenlerini yazın.", "Dünya'nın eksen eğikliği ve Güneş çevresinde dolanması."],
["21 Haziran'da Kuzey Yarım Küre'de hangi mevsim başlar?", "Yaz mevsimi başlar (en uzun gündüz)."],
["İklim ile hava olayları farkını yazın.", "İklim uzun süreli ortalama; hava olayı günlük değişkendir."] ] },
{ u: "DNA ve Genetik Kod", s: [
["DNA'nın yapı birimini ve bazları yazın.", "Nükleotid; bazlar: adenin, timin, guanin, sitozin."],
["Kalıtsal ve çevresel özelliğe örnek verin.", "Kalıtsal: göz rengi. Çevresel: bronzlaşma."],
["Mutasyon ile modifikasyon farkını yazın.", "Mutasyon gen yapısını değiştirir (kalıtsal olabilir); modifikasyon dış görünüşü etkiler, kalıtsal değildir."] ] },
{ u: "Basınç", s: [
["Katı basıncını artırmanın iki yolunu yazın.", "Kuvveti artırmak, yüzey alanını azaltmak (bıçak bilemek)."],
["Sıvı basıncının bağlı olduğu iki değişkeni yazın.", "Derinlik ve sıvının yoğunluğu."],
["Açık hava basıncını ölçen aracı yazın.", "Barometre (Torricelli deneyi)."] ] },
{ u: "Madde ve Endüstri", s: [
["Ham maddeye iki örnek verin.", "Petrol, demir cevheri, pamuk."],
["Geri dönüşümün endüstriye katkısını yazın.", "Ham madde ve enerji tasarrufu sağlar."],
["Asit ve baza günlük hayattan örnek verin.", "Asit: limon, sirke. Baz: sabun, deterjan."] ] },
{ u: "Enerji Dönüşümleri", s: [
["Güneş panelinde ve barajda enerji dönüşümlerini yazın.", "Panel: ışık → elektrik. Baraj: potansiyel → kinetik → elektrik."],
["Sürtünmede kaybolan enerji nereye gider?", "Isı enerjisine dönüşür."],
["Yenilenebilir enerjiye üç örnek verin.", "Güneş, rüzgâr, hidroelektrik (jeotermal de kabul)."] ] },
{ u: "Elektrik ve Manyetizma", s: [
["Seri ve paralel bağlama farkını yazın.", "Seride akım tek yol, ampul sönerse hepsi söner; paralelde bağımsızdır."],
["Mıknatısın kutuplarını ve etkileşimini yazın.", "N ve S; aynı kutuplar iter, zıt kutuplar çeker."],
["Elektrik akımının birimini ve ölçüm aracını yazın.", "Birim amper (A), araç ampermetre."] ] }
],
inkilap: [
{ u: "Bir Kahraman Doğuyor", s: [
["Mustafa Kemal'in doğum yerini ve yılını yazın.", "1881, Selanik."],
["Mustafa Kemal'in öğrenim gördüğü okulları sırayla yazın.", "Mahalle Mektebi, Şemsi Efendi Okulu, Selanik Askerî Rüştiyesi, Manastır Askerî İdadisi, Harp Okulu, Harp Akademisi."],
["Mustafa Kemal'in fikir hayatını etkileyen iki ismi yazın.", "Namık Kemal, Ziya Gökalp, Tevfik Fikret, Mehmet Emin Yurdakul. (İkisi yeterli.)"] ] },
{ u: "Millî Uyanış", s: [
["Trablusgarp Savaşı'nın yılını ve sonucunu yazın.", "1911-1912. Uşi Antlaşması'yla Libya İtalya'ya bırakıldı; Mustafa Kemal Derne-Tobruk'ta savaştı."],
["Balkan Savaşları'nın Osmanlı'ya etkisini yazın.", "Balkan topraklarının büyük kısmı kaybedildi."],
["Mustafa Kemal'in Çanakkale'deki görevini yazın.", "19. Tümen Komutanı; Anafartalar kahramanı oldu."] ] },
{ u: "Millî Mücadele Hazırlık", s: [
["Mustafa Kemal'in Samsun'a çıkış tarihini ve görevini yazın.", "19 Mayıs 1919; 9. Ordu Müfettişi olarak asayişi sağlama görevi."],
["Havza Genelgesi'nin önemini yazın.", "Millî bilinci uyandıran ilk genelge; protesto mitingleri istendi."],
["Erzurum Kongresi'nin iki kararını yazın.", "Vatan bir bütündür, parçalanamaz. Manda ve himaye kabul edilemez."] ] },
{ u: "Kurtuluş Savaşı ve Antlaşmalar", s: [
["TBMM'nin açılış tarihini yazın.", "23 Nisan 1920."],
["Sakarya Meydan Muharebesi'nin sonucunu yazın.", "Yunan ordusu durduruldu; Mustafa Kemal'e Mareşal ve Gazi unvanları verildi."],
["Lozan Antlaşması'nın yılını ve önemini yazın.", "1923. Yeni Türk devletinin bağımsızlığı ve sınırları tanındı."] ] },
{ u: "Atatürkçülük ve İnkılaplar", s: [
["Atatürk ilkelerinden dördünü yazın.", "Cumhuriyetçilik, milliyetçilik, halkçılık, devletçilik (laiklik, inkılapçılık da kabul)."],
["Harf İnkılabı'nın yılını yazın.", "1928. Latin alfabesi kabul edildi."],
["Kadınlara seçme-seçilme hakkının yılını yazın.", "1934 (milletvekili seçme-seçilme)."] ] },
{ u: "Demokratikleşme ve Dış Politika", s: [
["Çok partili hayata geçiş denemelerini yazın.", "Terakkiperver Cumhuriyet Fırkası (1924), Serbest Cumhuriyet Fırkası (1930)."],
["Hatay'ın anavatana katılma yılını yazın.", "1939."],
["Atatürk'ün dış politika ilkesini yazın.", "“Yurtta sulh, cihanda sulh.”"] ] }
],
ingilizce: [
{ u: "Friendship", s: [
["İyi arkadaş özelliklerini İngilizce yazın.", "Örn: A good friend is honest and helpful."],
["Davet kabul/red cümleleri yazın.", "Kabul: Sure, I'd love to. Red: Sorry, I can't."],
["“Count on me” ne demektir?", "Bana güvenebilirsin."] ] },
{ u: "Teen Life", s: [
["Gençlerin günlük aktivitelerini İngilizce anlatın.", "Örn: Teens like surfing the Net and hanging out."],
["“Prefer” kalıbıyla cümle kurun.", "Örn: I prefer reading to watching TV."],
["Sıklık zarfı kullanarak cümle yazın.", "Örn: I rarely play computer games."] ] },
{ u: "In the Kitchen", s: [
["Mutfak eşyalarından beşini İngilizce yazın.", "Knife, fork, spoon, plate, pan."],
["Yemek tarifini İngilizce anlatın (First, then...).", "Örn: First, boil the water. Then, add the pasta."],
["“How much / How many” farkını örnekle yazın.", "How much sugar? (sayılamaz) / How many eggs? (sayılır)."] ] },
{ u: "On the Phone", s: [
["Telefon konuşma kalıplarını yazın.", "Örn: Hello, this is Elif. Can I speak to...? / Just a moment, please."],
["Randevulaşma cümlesi kurun.", "Örn: Let's meet at five. / See you then!"],
["“Hold on” ne demektir?", "Hatta kal / bekle."] ] },
{ u: "The Internet", s: [
["İnternetin yararlarını İngilizce yazın.", "Örn: We can learn and communicate fast."],
["Güvenli internet için iki kural yazın.", "Don't share personal info. / Don't meet strangers."],
["“Download” ve “upload” farkını yazın.", "Download: indirmek, upload: yüklemek."] ] },
{ u: "Adventures", s: [
["Geçmiş zamanla tatil anınızı anlatın.", "Örn: We went camping. We swam and had fun."],
["“Did you enjoy it?” sorusuna cevap verin.", "Örn: Yes, it was amazing!"],
["Macera sporlarından üçünü yazın.", "Rafting, climbing, paragliding."] ] }
],
din: [
{ u: "Kader İnancı", s: [
["Kader kavramını açıklayın.", "Allah'ın olacakları ezeli ilmiyle bilmesi ve takdir etmesidir."],
["Kader ile kaza farkını yazın.", "Kader takdir, kaza takdirin gerçekleşmesidir."],
["“Kadercilik” anlayışının yanlışlığını yazın.", "İnsan sorumluluğunu inkâr eder; çalışmayı bırakmak tevekkül değildir."] ] },
{ u: "Zekât ve Sadaka", s: [
["Zekâtın kimlere verildiğini iki örnekle yazın.", "Yoksullar, borçlular, yolcular (Tevbe 60)."],
["Zekât nisabını altın için yazın.", "80,18 gram altın (20 miskal)."],
["Sadaka-i câriyeye örnek verin.", "Okul, çeşme, hastane yaptırmak; faydalı ilim bırakmak."] ] },
{ u: "Hz. Muhammed'in Hayatı", s: [
["Peygamberimizin vefat yılını ve yerini yazın.", "632, Medine."],
["Hudeybiye Antlaşması'nın önemini yazın.", "Mekkeliler Müslümanları resmen tanıdı; barış dönemi İslam hızla yayıldı."],
["Peygamberimizin hicret yol arkadaşını yazın.", "Hz. Ebubekir (r.a.)."] ] },
{ u: "Kur'an-ı Kerim'in Özellikleri", s: [
["Kur'an'ın kaç yılda indiğini yazın.", "Yaklaşık 23 yılda, parça parça indi."],
["İlk ve son inen sureleri yazın.", "İlk: Alak suresinin ilk ayetleri. Son: Nasr suresi (görüşlerden güçlüsü)."],
["Kur'an'ın evrenselliğini açıklayın.", "Tüm insanlığa ve kıyamete kadar geçerli mesajlar içerir."] ] },
{ u: "İslam ve Barış", s: [
["“İslam” kelimesinin barışla ilişkisini yazın.", "İslam, “se-l-m” kökünden gelir; barış, esenlik anlamı taşır."],
["Cihadın asıl anlamını yazın.", "Allah yolunda gayret; önce nefisle mücadele, haksızlığa karşı duruş."],
["Farklı inançlara saygıya örnek yazın.", "Medine Vesikası ile farklı grupların hakları güvenceye alındı."] ] }
]
};
SINAV_VERISI[8] = {
turkce: [
{ s: "“Gözden düşmek” deyiminin anlamı nedir?", o: ["Değer kazanmak", "Değerini yitirmek", "Uzaklaşmak", "Sevinmek"], c: 1 },
{ s: "Hangisi zarf-fiildir?", o: ["Okuyan", "Okumak", "Gelince", "Okumuş"], c: 2 },
{ s: "Örtülü anlam hangi cümlededir?", o: ["Yine geç kalmışsın.", "Saat dokuz.", "Hava güzel.", "Okul açıldı."], c: 0 },
{ s: "Hangisi birleşik cümledir?", o: ["Ali geldi.", "Gelince sevindim.", "Geldi, gitti.", "Koş!"], c: 1 },
{ s: "“Her şey yolunda mı?” yazımı nasıldır?", o: ["Herşey yolundamı?", "Her şey yolunda mı?", "Hersey yolunda mi?", "Herşey yolunda mı"], c: 1 },
{ s: "Anlatım bozukluğu hangisindedir?", o: ["Kitap okudum.", "Geriye döndü.", "Okula gittim.", "Su içtim."], c: 1 },
{ s: "Giriş cümlesi olamaz?", o: ["Kitaplar bilgi kaynağıdır.", "Bu nedenle katılmadı.", "Spor sağlıktır.", "Su hayattır."], c: 1 },
{ s: "Sıfat-fiil eki hangisidir?", o: ["-ıp", "-an", "-mak", "-ken"], c: 1 } ],
matematik: [
{ s: "2⁵ × 2³ kaçtır?", o: ["2⁸", "2¹⁵", "4⁸", "2⁵"], c: 0 },
{ s: "√75 = ?", o: ["5√3", "3√5", "25√3", "7√5"], c: 0 },
{ s: "Bir zar atımında 6 gelme olasılığı nedir?", o: ["1/2", "1/3", "1/6", "1"], c: 2 },
{ s: "(x + 3)² = ?", o: ["x²+9", "x²+6x+9", "x²+3x+9", "2x+6"], c: 1 },
{ s: "2x + 5 = 17 ise x kaçtır?", o: ["5", "6", "7", "11"], c: 1 },
{ s: "y = 3x − 2 doğrusunun eğimi kaçtır?", o: ["−2", "2", "3", "5"], c: 2 },
{ s: "Bir kenarı 5 cm küpün yüzey alanı kaç cm²'dir?", o: ["25", "125", "150", "30"], c: 2 },
{ s: "√2 × √8 kaçtır?", o: ["4", "16", "2√10", "8"], c: 0 } ],
fen: [
{ s: "Mevsimlerin nedeni nedir?", o: ["Ay'ın evreleri", "Eksen eğikliği + dolanma", "Gelgit", "Rüzgâr"], c: 1 },
{ s: "DNA'nın yapı birimi nedir?", o: ["Amino asit", "Nükleotid", "Protein", "Yağ"], c: 1 },
{ s: "Katı basıncını artırmak için ne yapılır?", o: ["Yüzey büyütülür", "Yüzey küçültülür", "Kuvvet azaltılır", "Ağırlık azaltılır"], c: 1 },
{ s: "Barometre neyi ölçer?", o: ["Sıcaklığı", "Açık hava basıncını", "Nemi", "Rüzgârı"], c: 1 },
{ s: "Güneş panelinde enerji dönüşümü nedir?", o: ["Elektrik-ışık", "Işık-elektrik", "Isı-hareket", "Kimyasal-ışık"], c: 1 },
{ s: "Seri bağlı ampullerden biri sönerse ne olur?", o: ["Diğerleri yanar", "Hepsi söner", "Parlaklık artar", "Değişmez"], c: 1 },
{ s: "Mıknatısta aynı kutuplar ne yapar?", o: ["Çeker", "İter", "Etkilemez", "Erime yapar"], c: 1 },
{ s: "Mutasyon nedir?", o: ["Gen yapısı değişimi", "Dış görünüş değişimi", "Büyüme", "Beslenme"], c: 0 } ],
inkilap: [
{ s: "Mustafa Kemal nerede doğmuştur?", o: ["Ankara", "İstanbul", "Selanik", "İzmir"], c: 2 },
{ s: "Samsun'a çıkış tarihi nedir?", o: ["23 Nisan 1920", "19 Mayıs 1919", "30 Ağustos 1922", "29 Ekim 1923"], c: 1 },
{ s: "Erzurum Kongresi kararı nedir?", o: ["Manda kabulü", "Vatan bölünmez bütün", "Saltanatın güçlenmesi", "Savaşın bitmesi"], c: 1 },
{ s: "TBMM ne zaman açıldı?", o: ["19 Mayıs 1919", "23 Nisan 1920", "30 Ağustos 1922", "29 Ekim 1923"], c: 1 },
{ s: "Lozan Antlaşması yılı nedir?", o: ["1920", "1921", "1922", "1923"], c: 3 },
{ s: "Harf İnkılabı yılı nedir?", o: ["1928", "1923", "1934", "1930"], c: 0 },
{ s: "Kadınlara milletvekili seçme hakkı yılı?", o: ["1926", "1930", "1934", "1946"], c: 2 },
{ s: "Atatürk'ün dış politika ilkesi nedir?", o: ["Sürekli savaş", "Yurtta sulh cihanda sulh", "Yalnızlık", "Sömürgecilik"], c: 1 } ],
ingilizce: [
{ s: "'Count on me' ne demektir?", o: ["Beni say", "Bana güvenebilirsin", "Beni ara", "Beni bekle"], c: 1 },
{ s: "'I prefer reading ___ watching TV.' hangisi gelir?", o: ["to", "than", "from", "at"], c: 0 },
{ s: "'Knife' Türkçesi nedir?", o: ["Kaşık", "Bıçak", "Tabak", "Tencere"], c: 1 },
{ s: "'Hold on' ne demektir?", o: ["Kapat", "Hatta kal", "Ara", "Mesaj at"], c: 1 },
{ s: "Güvenli internet kuralı hangisidir?", o: ["Bilgi paylaşmak", "Kişisel bilgi paylaşmamak", "Tanımadıklarla buluşmak", "Şifreleri vermek"], c: 1 },
{ s: "'We went camping.' zamanı nedir?", o: ["Geniş zaman", "Geçmiş zaman", "Gelecek zaman", "Şimdiki zaman"], c: 1 },
{ s: "'Download' ne demektir?", o: ["Yüklemek", "İndirmek", "Silmek", "Aramak"], c: 1 },
{ s: "'Would you like to come?' ne demektir?", o: ["Gelmek ister misin?", "Neredesin?", "Ne yapıyorsun?", "Kaçtasın?"], c: 0 } ],
din: [
{ s: "Kader nedir?", o: ["Rastlantı", "Allah'ın ezeli takdiri", "Şans oyunu", "Rüya"], c: 1 },
{ s: "Altın nisap miktarı nedir?", o: ["40 gram", "80,18 gram", "100 gram", "10 gram"], c: 1 },
{ s: "Hicret yol arkadaşı kimdir?", o: ["Hz. Ömer", "Hz. Ebubekir", "Hz. Ali", "Hz. Hamza"], c: 1 },
{ s: "Kur'an kaç yılda indi?", o: ["10", "23", "40", "63"], c: 1 },
{ s: "Cihadın asıl anlamı nedir?", o: ["Savaş", "Allah yolunda gayret", "Göç", "Ticaret"], c: 1 },
{ s: "Zekât kimlere verilir?", o: ["Zengine", "Yoksula", "Krala", "Askere"], c: 1 },
{ s: "Son inen sure hangisidir?", o: ["Fatiha", "Bakara", "Nasr", "İhlâs"], c: 2 },
{ s: "Medine Vesikası neyi gösterir?", o: ["Savaşı", "Farklı inançlara güvenceyi", "Vergiyi", "Göçü"], c: 1 } ]
};

/* ===== layout.js ===== */
/* Ortak sayfa iskeleti: üst şerit, başlık, menü, altlık, modallar, okuyucu.
   Tüm sayfalar <div id="iskelet-ust"></div> ... <div id="iskelet-alt"></div> içerir. */
const Layout = {
  sayfa() { return document.body.dataset.sayfa || "index"; },
  kur() {
    document.getElementById("iskelet-ust").innerHTML = this.ust();
    document.getElementById("iskelet-alt").innerHTML = this.alt();
    document.getElementById("iskelet-modal").innerHTML = this.modallar();
    const aktif = this.sayfa();
    document.querySelectorAll("[data-nav]").forEach(a => {
      if (a.dataset.nav === aktif) a.classList.add("aktif");
    });
  },
  ust() {
    return `
<div class="kurum-serit">
  <div class="sutun-dar px-4">
    <span>T.C. Millî Eğitim Bakanlığı öğretim programlarına uygun dijital eğitim içerikleri</span>
    <span class="kurum-serit-sag">
      <span id="modRozeti" class="mod-rozet">Bağlanıyor…</span>
      <a href="https://tymm.meb.gov.tr/ders-kitaplari/temel-egitim" target="_blank" rel="noopener">MEB Kitap Kataloğu</a>
      <a href="https://ogmmateryal.eba.gov.tr/ders-sunulari" target="_blank" rel="noopener">OGM Materyal</a>
      <a href="https://mebi.eba.gov.tr" target="_blank" rel="noopener">MEBİ</a>
    </span>
  </div>
</div>
<header class="ana-nav">
  <div class="sutun-dar px-4 nav-ic">
    <a class="marka" href="index.html" style="text-decoration:none">
      <img class="amblem-img" src="img/logo.svg?v=13" alt="Ortaokulluyuz logosu" />
      <span>
        <span class="marka-ad">Ortaokulluyuz</span>
        <span class="marka-alt">Dijital Ders Kitabı ve Eğitim Platformu • 5-8. Sınıflar</span>
      </span>
    </a>
    <nav class="ust-menu">
      <a data-nav="index" href="index.html">Anasayfa</a>
      <a data-nav="kitaplar" href="kitaplar.html">Tüm Kitaplar</a>
      <a data-nav="matematik" href="matematik/">Matematik</a>
      <a data-nav="sinif-5" href="sinif-5.html">5. Sınıf</a>
      <a data-nav="sinif-6" href="sinif-6.html">6. Sınıf</a>
      <a data-nav="sinif-7" href="sinif-7.html">7. Sınıf</a>
      <a data-nav="sinif-8" href="sinif-8.html">8. Sınıf</a>
      <a data-nav="secmeli" href="secmeli.html">Seçmeli</a>
      <a data-nav="odevler" href="odevler.html">Ödevler</a>
      <a data-nav="forum" href="forum.html">Forum</a>
      <a data-nav="mesajlar" href="mesajlar.html">Mesajlar <span id="mesajRozet" class="sayac hidden"></span></a>
      <a data-nav="yardim" href="yardim.html">Yardım</a>
    </nav>
    <div id="girisAlani" class="ml-auto flex items-center gap-2"></div>
  </div>
  <div class="sutun-dar px-4 mobil-menu-sar">
    <select class="girdi mobil-menu" onchange="if(this.value)location.href=this.value">
      <option value="">Menüye git…</option>
      <option value="index.html">Anasayfa</option>
      <option value="kitaplar.html">Tüm Kitaplar</option>
      <option value="matematik/">Ortaokulluyuz Matematik</option>
      <option value="sinif-5.html">5. Sınıf Kitapları</option>
      <option value="sinif-6.html">6. Sınıf Kitapları</option>
      <option value="sinif-7.html">7. Sınıf Kitapları</option>
      <option value="sinif-8.html">8. Sınıf Kitapları</option>
      <option value="secmeli.html">Seçmeli Ders Kitapları</option>
      <option value="odevler.html">Hazır Ödevler ve Sınavlar</option>
      <option value="forum.html">Ödev Forumu</option>
      <option value="mesajlar.html">Mesajlar</option>
      <option value="profil.html">Profilim</option>
      <option value="yardim.html">Yardım</option>
    </select>
  </div>
</header>`;
  },
  alt() {
    return `
<footer class="sayfa-alt">
  <div class="sutun-dar px-4 alt-ic">
    <div>
      <div class="alt-mark">Ortaokulluyuz</div>
      <div class="alt-metin">5-8. sınıflar için dijital ders kitabı erişimi ve eğitim destek platformu.</div>
    </div>
    <div>
      <div class="alt-baslik">Sayfalar</div>
      <div class="alt-metin"><a href="kitaplar.html">Tüm Kitaplar</a> • <a href="matematik/">Ortaokulluyuz Matematik</a> • <a href="odevler.html">Hazır Ödevler</a> • <a href="forum.html">Ödev Forumu</a> • <a href="mesajlar.html">Mesajlar</a> • <a href="profil.html">Profilim</a> • <a href="yardim.html">Yardım</a></div>
      <div class="alt-metin"><a href="sinif-5.html">5. Sınıf</a> • <a href="sinif-6.html">6. Sınıf</a> • <a href="sinif-7.html">7. Sınıf</a> • <a href="sinif-8.html">8. Sınıf</a> • <a href="secmeli.html">Seçmeli Dersler</a></div>
    </div>
    <div>
      <div class="alt-baslik">Resmî Bağlantılar</div>
      <div class="alt-metin"><a href="https://tymm.meb.gov.tr/ders-kitaplari/temel-egitim" target="_blank" rel="noopener">MEB Ders Kitapları</a> • <a href="https://ogmmateryal.eba.gov.tr" target="_blank" rel="noopener">OGM Materyal</a> • <a href="https://mebi.eba.gov.tr" target="_blank" rel="noopener">MEBİ</a></div>
      <div class="alt-metin alt-not">Resmî MEB yayını değildir. Kitap PDF'leri MEB sunucularından sunulur. <a href="gizlilik.html">Gizlilik Politikası</a></div>
    </div>
  </div>
  <div class="alt-cizgi">© 2026-2027 Ortaokulluyuz Eğitim Platformu</div>
</footer>`;
  },
  modallar() {
    return `
<div id="okuyucu">
  <div class="okuyucu-ust">
    <button class="arac-btn" onclick="Reader.kapat()"><svg class="ikon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> Kapat</button>
    <div id="okuyucuKitapAdi" class="font-bold text-[13.5px] text-slate-800 truncate"></div>
    <div class="ml-auto flex items-center gap-1">
      <button id="sekmeMeb" class="arac-btn" onclick="Reader.modSec('meb')">MEB Resmî PDF</button>
      <button id="sekmeOzet" class="arac-btn" onclick="Reader.modSec('ozet')">Dijital Özet + Notlar</button>
    </div>
  </div>
  <div id="kalemAraclari" class="okuyucu-araclar">
    <button class="arac-btn" data-arac title="İşaretçi" onclick="Reader.aracSec('isaretci',this)"><svg class="ikon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="m13 13 6 6"/></svg></button>
    <button class="arac-btn aktif" data-arac onclick="Reader.aracSec('kalem',this)"><svg class="ikon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg> Kalem</button>
    <button class="arac-btn" data-arac onclick="Reader.aracSec('fosfor',this)"><svg class="ikon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 11-5.5 5.5a2.1 2.1 0 0 0 0 3L6 22l2.5-.5a2.1 2.1 0 0 0 1.5-1L19 11.5a2.12 2.12 0 0 0-3-3L9 11z"/><path d="M14.5 5.5 18.5 9.5"/></svg> Fosfor</button>
    <button class="arac-btn" data-arac onclick="Reader.aracSec('silgi',this)"><svg class="ikon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/></svg> Silgi</button>
    <button class="arac-btn" data-arac onclick="Reader.aracSec('metin',this)"><svg class="ikon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg> Metin</button>
    <input type="color" value="#1b4f9c" onchange="Reader.renk=this.value" title="Renk" class="w-8 h-8 border rounded" />
    <input type="range" min="1" max="10" value="3" onchange="Reader.kalinlik=Number(this.value)" title="Kalınlık" class="w-20" />
    <button class="arac-btn" onclick="Reader.temizle()">Temizle</button>
    <button class="arac-btn" onclick="Reader.zoomDegis(-0.25)">−</button>
    <span id="zoomSeviye" class="text-[12px] w-10 text-center">%100</span>
    <button class="arac-btn" onclick="Reader.zoomDegis(0.25)">+</button>
    <button class="arac-btn" onclick="Reader.ozetCiktisi()"><svg class="ikon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg> Özet Çıktısı</button>
    <button class="arac-btn" title="Tam ekran" onclick="Reader.tamEkran()"><svg class="ikon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg></button>
  </div>
  <div id="mebModu" class="hidden">
    <div class="meb-araclar">
      <span id="mebBilgi" class="text-[12.5px] text-slate-300"></span>
      <span class="ml-auto flex gap-2">
        <a id="mebIndirBtn" class="btn btn-birincil btn-kucuk" target="_blank" rel="noopener" href="#"><svg class="ikon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></svg> PDF İndir</a>
        <a id="mebKaynakBtn" class="btn btn-ikincil btn-kucuk" target="_blank" rel="noopener" href="#">Kaynakta Aç</a>
      </span>
    </div>
    <div id="mebCerceve" class="meb-cerceve"></div>
  </div>
  <div id="ozetModu">
    <div id="sayfaAlani">
      <button class="arac-btn self-center" style="background:#fff" onclick="Reader.onceki()" title="Önceki sayfa"><svg class="ikon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg></button>
      <div id="kagit" class="sayfa-kagit">
        <div class="sayfa-icerik">
          <div id="uniteEtiket" class="text-[12px] font-bold text-blue-900 uppercase tracking-wide"></div>
          <h2 id="sayfaBaslik" class="text-[22px] font-extrabold text-slate-900 mt-1"></h2>
          <hr class="my-4" />
          <div id="sayfaMetin" class="text-[14.5px] leading-7 text-slate-800 whitespace-pre-line"></div>
          <div id="sayfaOrnekKutu" class="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div class="text-[12px] font-bold text-blue-900">ÇÖZÜMLÜ ÖRNEK</div>
            <div id="sayfaOrnek" class="text-[13.5px] text-slate-700 mt-1 whitespace-pre-line"></div>
          </div>
          <div class="mt-6 flex items-center gap-3 text-slate-300">
            <div class="flex-1 border-t"></div><div class="text-[11px]">ortaokulluyuz • <span id="sayfaNoAlt"></span></div><div class="flex-1 border-t"></div>
          </div>
        </div>
      </div>
      <button class="arac-btn self-center" style="background:#fff" onclick="Reader.sonraki()" title="Sonraki sayfa"><svg class="ikon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></button>
    </div>
    <div class="flex items-center gap-3 bg-[#0f2247] px-3 py-1">
      <span id="sayfaNo" class="text-white text-[12.5px] whitespace-nowrap"></span>
      <div id="kucukResimler" class="kucukresimler flex-1"></div>
    </div>
  </div>
</div>
<div id="soruModal" class="hidden fixed inset-0 z-[90] bg-black/50 flex items-start justify-center p-4 overflow-auto">
  <div class="bg-white rounded-xl max-w-2xl w-full p-5 my-8">
    <div class="flex justify-end"><button class="arac-btn" onclick="document.getElementById('soruModal').classList.add('hidden')"><svg class="ikon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> Kapat</button></div>
    <div id="soruModalIcerik"></div>
  </div>
</div>
<div id="authModal" class="hidden fixed inset-0 z-[95] bg-black/50 flex items-center justify-center p-4">
  <div class="auth-kart">
    <div class="auth-ust">
      <img class="amblem-img" src="img/logo.svg?v=13" alt="Ortaokulluyuz logosu" />
      <div><div class="auth-baslik">Ortaokulluyuz'a hoş geldiniz</div>
      <div class="auth-alt">Öğrenci, öğretmen ve veliler için ortak eğitim platformu</div></div>
    </div>
    <div class="auth-sekmeler">
      <button id="sekmeGiris" onclick="authSekme('giris')">Giriş Yap</button>
      <button id="sekmeKayit" onclick="location.href='kayit.html'">Kayıt Ol</button>
    </div>
    <form id="girisForm" class="auth-form" onsubmit="girisYap(event)">
      <label class="auth-etiket">E-posta adresiniz</label>
      <input id="gEposta" type="email" required class="girdi auth-girdi" placeholder="ornek@eposta.com" />
      <label class="auth-etiket">Şifreniz</label>
      <div class="sifre-sar">
        <input id="gSifre" type="password" required class="girdi auth-girdi" placeholder="••••••" />
        <button type="button" class="sifre-goz" onclick="sifreGoster('gSifre',this)" title="Göster/Gizle"><svg class="ikon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg></button>
      </div>
      <div id="girisCaptcha"></div>
      <button class="btn btn-birincil w-full justify-center auth-btn">Giriş Yap</button>
      <div id="googleBtnSar" class="hidden">
        <div class="ayrac"><span>veya</span></div>
        <div id="googleBtn"></div>
        <p class="auth-not">Google ile girişte de e-postanıza doğrulama kodu gönderilir.</p>
      </div>
      <button type="button" class="auth-vazgec" onclick="document.getElementById('authModal').classList.add('hidden')">Vazgeç</button>
    </form>
    <form id="kayitForm" class="auth-form hidden" onsubmit="kayitYap(event)">
      <label class="auth-etiket">Ad Soyad</label>
      <input id="kAd" required class="girdi auth-girdi" placeholder="Adınız Soyadınız" />
      <div class="kanal-sekmeler" id="kayitKanal">
        <button type="button" class="kanal-sekme aktif" data-kanal="eposta" onclick="kayitKanalSec('eposta')">E-posta ile</button>
        <button type="button" class="kanal-sekme" data-kanal="telefon" onclick="kayitKanalSec('telefon')">Telefon ile</button>
      </div>
      <div id="kEpostaSar">
        <label class="auth-etiket">E-posta adresiniz</label>
        <input id="kEposta" type="email" class="girdi auth-girdi" placeholder="ornek@eposta.com" />
      </div>
      <div id="kTelefonSar" class="hidden">
        <label class="auth-etiket">Cep telefonunuz</label>
        <div class="telefon-sar"><span class="telefon-on">+90</span><input id="kTelefon" type="tel" inputmode="tel" class="girdi auth-girdi" placeholder="5__ ___ __ __" /></div>
      </div>
      <label class="auth-etiket">Şifre <span class="auth-ipucu">(en az 4 karakter)</span></label>
      <div class="sifre-sar">
        <input id="kSifre" type="password" required class="girdi auth-girdi" placeholder="Güçlü bir şifre seçin" />
        <button type="button" class="sifre-goz" onclick="sifreGoster('kSifre',this)" title="Göster/Gizle"><svg class="ikon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg></button>
      </div>
      <div id="kayitCaptcha"></div>
      <button class="btn btn-birincil w-full justify-center auth-btn">Kayıt Ol</button>
      <p class="auth-not">E-postanıza veya telefonunuza <b>doğrulama kodu</b> gönderilecek. Hesabınız <b>öğrenci</b> olarak açılır; öğretmen ve veli yetkisi yönetici tarafından tanımlanır.</p>
      <button type="button" class="auth-vazgec" onclick="document.getElementById('authModal').classList.add('hidden')">Vazgeç</button>
    </form>
    <form id="dogrulamaForm" class="auth-form hidden" onsubmit="dogrulaYap(event)">
      <div class="dogrulama-kutu"><svg class="ikon" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#1b4f9c" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></div>
      <div class="auth-baslik text-center">E-postanızı doğrulayın</div>
      <p class="auth-not text-center"><b id="dogrulamaKanalYazi">e-postanıza</b> (<b id="dogrulamaEposta"></b>) gönderilen 6 haneli kodu yazın.</p>
      <p id="dogrulamaUyari" class="dogrulama-uyari"></p>
      <input id="dogrulamaKod" class="girdi dogrulama-girdi" maxlength="6" inputmode="numeric" placeholder="••••••" autocomplete="one-time-code" />
      <button class="btn btn-birincil w-full justify-center auth-btn">Doğrula ve Giriş Yap</button>
      <button id="kodTekrarBtn" type="button" class="btn btn-ikincil w-full justify-center" onclick="kodTekrarGonder()">Kodu Tekrar Gönder</button>
      <button type="button" class="auth-vazgec" onclick="authSekme('giris')">Girişe Dön</button>
    </form>
  </div>
</div>
<div id="sikayetModal" class="hidden fixed inset-0 z-[96] bg-black/50 flex items-center justify-center p-4">
  <div class="bg-white rounded-xl w-full max-w-md p-5">
    <div class="font-bold text-[16px] text-slate-900">İçeriği Şikayet Et</div>
    <p class="text-[12.5px] text-slate-500 mt-1">Şikayetiniz yöneticilere iletilir ve incelenir.</p>
    <form class="mt-3 space-y-2" onsubmit="sikayetGonder(event)">
      <input type="hidden" id="sikayetHedef" /><input type="hidden" id="sikayetHedefId" />
      <div><label class="text-[12px] font-semibold">Neden *</label>
        <select id="sikayetNeden" class="girdi">
          <option>Hakaret / Küfür</option><option>Spam / Reklam</option><option>Yanlış bilgi</option><option>Kişisel bilgi paylaşımı</option><option>Diğer</option>
        </select></div>
      <div><label class="text-[12px] font-semibold">Açıklama (isteğe bağlı)</label>
        <textarea id="sikayetAciklama" class="girdi" rows="3" maxlength="255" placeholder="Kısaca açıklayın…"></textarea></div>
      <div class="flex gap-2">
        <button class="btn btn-birincil flex-1 justify-center">Şikayeti Gönder</button>
        <button type="button" class="btn btn-ikincil" onclick="document.getElementById('sikayetModal').classList.add('hidden')">Vazgeç</button>
      </div>
    </form>
  </div>
</div>
<div id="toast" class="hidden fixed bottom-5 left-1/2 -translate-x-1/2 bg-[#0f2f5b] text-white text-[13.5px] px-4 py-2.5 rounded-lg shadow-lg z-[120]"></div>
<div id="bildirimAlani"></div>
<div id="sesliAramaPanel" class="hidden"></div>
<button id="yukariBtn" onclick="yukariCik()" title="Başa dön"><svg class="ikon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg></button>`;
  }
};

/* ===== reklam.js ===== */
/* Reklam altyapısı — varsayılan KAPALI. Açmak için aşağıdaki 3 satırı doldurun:
   1. AdSense hesabınız onaylanınca Publisher ID'yi yazın (ca-pub-...).
   2. AdSense panelinden 2 reklam birimi oluşturup Slot ID'leri yazın.
   3. acik: true yapın.
   Site çocuklara hitap ettiği için en fazla 2-3 sakin yerleşim kullanılır;
   açılır pencere / tam ekran reklam eklemeyin. */
const REKLAM = {
  acik: false,
  client: "",
  slot: { banner: "", kutu: "" }
};
function reklamKur() {
  if (!REKLAM.acik || !REKLAM.client) return;
  try {
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + REKLAM.client;
    s.crossOrigin = "anonymous";
    document.head.appendChild(s);
    document.querySelectorAll(".reklam-alani").forEach(alan => {
      const ad = alan.dataset.reklam === "kutu" ? REKLAM.slot.kutu : REKLAM.slot.banner;
      if (!ad) return;
      alan.classList.add("dolu");
      alan.innerHTML = "";
      const ins = document.createElement("ins");
      ins.className = "adsbygoogle";
      ins.style.display = "block";
      ins.dataset.adClient = REKLAM.client;
      ins.dataset.adSlot = ad;
      ins.dataset.adFormat = "auto";
      ins.dataset.fullWidthResponsive = "true";
      alan.appendChild(ins);
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    });
  } catch (e) {}
}

/* ===== ui-effects.js ===== */
/* Ortaokulluyuz V7 — yalnızca görsel mikro-etkileşimler. İş mantığına dokunmaz. */
(() => {
  const root = document.documentElement;
  root.classList.add('motion-on');

  const reveal = () => {
    const sections = document.querySelectorAll('main > section');
    if (!sections.length) return;
    if (!('IntersectionObserver' in window)) {
      sections.forEach(s => s.classList.add('gorundu'));
      return;
    }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('gorundu');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10, rootMargin: '0px 0px -8% 0px' });
    sections.forEach(s => io.observe(s));
  };

  const heroPointer = () => {
    const hero = document.querySelector('.hero');
    if (!hero || window.matchMedia('(pointer: coarse)').matches) return;
    let raf = 0;
    let x = 50, y = 50;
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      x = ((e.clientX - r.left) / r.width) * 100;
      y = ((e.clientY - r.top) / r.height) * 100;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        hero.style.setProperty('--pointer-x', `${x}%`);
        hero.style.setProperty('--pointer-y', `${y}%`);
        raf = 0;
      });
    }, { passive: true });
  };

  const buttonPress = () => {
    document.addEventListener('pointerdown', (e) => {
      const el = e.target.closest('.btn, .hero-sinif, .kaynak-kart, .onerilen-link');
      if (!el) return;
      el.animate([
        { transform: getComputedStyle(el).transform === 'none' ? 'scale(1)' : getComputedStyle(el).transform },
        { transform: 'scale(.985)' },
        { transform: 'scale(1)' }
      ], { duration: 180, easing: 'ease-out' });
    }, { passive: true });
  };

  document.addEventListener('DOMContentLoaded', () => {
    reveal();
    heroPointer();
    buttonPress();
  });
})();

/* ===== app.js ===== */
/* Ortaokulluyuz — ana uygulama */
let filtre = { sinif: "", ders: "", q: "", kaynak: "" };
let forumFiltre = { sinif: "", ders: "", q: "", durum: "" };

function kitapKartMini(k) {
  const kapak = k.kapak ? `<img src="${k.kapak}" alt="${k.baslik}" loading="lazy" />` : `<div class="onerilen-kapak-yok" style="background:${k.kapakRenk}">${k.baslik}</div>`;
  return `<article class="onerilen-kart"><a href="${k.pdfUrl || k.mebSayfa || '#'}" ${k.pdfUrl ? 'target="_blank" rel="noopener"' : ''} onclick="Tercih.etkiKitap(KITAPLAR.find(x=>x.id==='${k.id}'),'acma')"><div class="onerilen-kapak">${kapak}<span>${k.sinif}. Sınıf</span></div><div class="onerilen-govde"><div class="onerilen-ders">${kac(dersAdi(k.ders, k.sinif))}</div><h3>${kac(k.baslik)}</h3><div class="onerilen-link">${k.pdfUrl ? 'Kitabı aç' : 'Kitap sayfası'} →</div></div></a></article>`;
}
async function onerilenlerCiz() {
  const alan = document.getElementById('onerilenKitaplar');
  if (!alan) return;
  const secilen = Tercih.kitaplar().slice(0, 6);
  const baslik = document.getElementById('onerilenBaslik');
  if (baslik) baslik.textContent = Tercih.etiket();
  alan.innerHTML = secilen.map(kitapKartMini).join('') || '<div class="text-[13px] text-slate-500">Henüz yeterli hareket yok. Birkaç sınıf veya kitap gezdiğinizde öneriler burada kişiselleşecek.</div>';
}
function kitapEtkisi(id, olay) { const k = KITAPLAR.find(x => x.id === id); if (k) Tercih.etkiKitap(k, olay); }

function kitapListesiniCiz() {
  const alan = document.getElementById("kitaplar");
  if (!alan) return;
  const favs = Auth.favoriler();
  const liste = KITAPLAR.filter(k =>
    (!filtre.sinif || String(k.sinif) === String(filtre.sinif)) &&
    (!filtre.ders || k.ders === filtre.ders) &&
    (!filtre.kaynak || (filtre.kaynak === "meb" ? !!k.pdfUrl : filtre.kaynak === "yakinda" ? !!k.yakinda : !k.pdfUrl)) &&
    (!filtre.q || (k.baslik + " " + k.aciklama).toLocaleLowerCase("tr").includes(filtre.q.toLocaleLowerCase("tr")))
  );
  const sayiEl = document.getElementById("kitapSayi");
  if (sayiEl) sayiEl.textContent = liste.length + " kitap listeleniyor";
  alan.innerHTML = liste.map((k, bi) => {
    const fav = favs.includes(k.id);
    const sinifEtiket = k.sinif ? k.sinif + ". Sınıf" : "Ortaokul Seçmeli";
    let rozet, aciklama, dugmeler;
    if (k.yakinda) {
      rozet = `<span class="rozet rozet-yakinda">Yakında • MEB'de henüz yayımlanmadı</span>`;
      aciklama = `Bu kitap MEB portalında henüz yayımlanmadı. Yayımlandığında buraya eklenecek; konu özetini şimdiden inceleyebilirsiniz.`;
      dugmeler = `<button class="btn btn-birincil btn-kucuk" onclick="Reader.ac('${k.id}')">${ikon("kitap", 14)} Özeti Aç</button>
        <a class="btn btn-ikincil btn-kucuk" target="_blank" rel="noopener" href="${MEB_KATALOG}">${ikon("dis", 13)} MEB Kataloğu</a>`;
    } else if (k.pdfUrl) {
      rozet = `<span class="rozet rozet-meb">MEB Resmî PDF</span>`;
      aciklama = `MEB'in yayımladığı gerçek ders kitabı. Okuyucuda doğrudan açılır, <b>PDF İndir</b> ile cihazınıza kaydedilir.`;
      dugmeler = `<button class="btn btn-birincil btn-kucuk" onclick="Reader.ac('${k.id}')">${ikon("kitap", 14)} Oku</button>
        <a class="btn btn-ikincil btn-kucuk" target="_blank" rel="noopener" href="${k.pdfUrl}" onclick="kitapEtkisi('${k.id}','indirme')">${ikon("indir", 14)} PDF İndir</a>
        ${k.uniteler.length > 1 ? `<button class="btn btn-ikincil btn-kucuk" onclick="uniteListesi('${k.id}')">${ikon("liste", 14)} İçindekiler</button>` : ""}`;
    } else {
      rozet = `<span class="rozet">MEB Sayfasında</span>`;
      aciklama = `MEB'in yayımladığı gerçek ders kitabı. Kitap sayfası MEB portalında açılır; konu özeti burada incelenebilir.`;
      dugmeler = `<button class="btn btn-birincil btn-kucuk" onclick="Reader.ac('${k.id}')">${ikon("kitap", 14)} Özeti Aç</button>
        <a class="btn btn-ikincil btn-kucuk" target="_blank" rel="noopener" href="${k.mebSayfa}">${ikon("dis", 13)} MEB'de Aç</a>
        ${k.uniteler.length > 1 ? `<button class="btn btn-ikincil btn-kucuk" onclick="uniteListesi('${k.id}')">${ikon("liste", 14)} İçindekiler</button>` : ""}`;
    }
    const kapak = k.kapak
      ? `<img src="${k.kapak}" alt="${k.baslik}" loading="lazy" onerror="this.closest('.kapak-alani').classList.add('kapak-hatali');this.remove();" />`
      : `<div class="kapak-yer-tutucu" style="background:${k.kapakRenk}"><span>${k.baslik}</span></div>`;
    return `<div class="kart kart-kitap golge-hafif overflow-hidden flex flex-col" style="animation-delay:${Math.min(bi * 40, 400)}ms">
      <div class="kapak-alani">${kapak}
        <button class="kapak-fav" onclick="favoriDegist('${k.id}')" title="Favori">${ikonYildiz(fav)}</button>
        <span class="kapak-sinif">${sinifEtiket}</span>
      </div>
      <div class="p-3 flex-1 flex flex-col gap-2">
        <div>${rozet}</div>
        <div class="font-bold text-[14.5px] leading-tight text-slate-900">${k.baslik}</div>
        <div class="text-[11.5px] text-slate-400">${k.yayinevi} • ${k.yil}</div>
        <div class="text-[12.5px] text-slate-600">${aciklama}</div>
        <div class="flex gap-2 mt-auto pt-2 flex-wrap">${dugmeler}</div>
      </div>
    </div>`;
  }).join("") || `<div class="kart p-6 text-slate-500">Aramanıza uygun kitap bulunamadı.</div>`;
}

function uniteListesi(kitapId) {
  const k = KITAPLAR.find(x => x.id === kitapId);
  if (!k) return;
  const alan = document.getElementById("unitePanel");
  if (!alan) { Reader.ac(kitapId); return; }
  alan.classList.remove("hidden");
  alan.innerHTML = `<div class="kart"><div class="kart-baslik flex justify-between items-center">
    <span>${k.baslik} — Üniteler</span>
    <button class="arac-btn" onclick="document.getElementById('unitePanel').classList.add('hidden')">Kapat</button></div>
    <div class="p-3 grid md:grid-cols-2 gap-2">
    ${k.uniteler.map((u, i) => `<button onclick="Reader.ac('${k.id}');Reader.modSec('ozet');Reader.git(${(i + 1) * 2 - 1})" class="text-left border border-slate-200 rounded-lg p-3 hover:border-blue-700">
      <div class="text-[12px] text-slate-500">${i + 1}. Ünite</div><div class="font-semibold text-[14px] text-slate-800">${u}</div>
      <div class="text-[12px] text-blue-800 mt-1">Konu anlatımı ve etkinlik →</div></button>`).join("")}
    </div></div>`;
  alan.scrollIntoView({ behavior: "smooth" });
}

function favoriDegist(id) {
  if (!Auth.mevcut()) { authModal("giris"); toast("Favorilere eklemek için giriş yapın."); return; }
  const f = Auth.favoriler();
  if (f.includes(id)) { Auth.favoriCikar(id); kitapEtkisi(id, 'favori'); } else { Auth.favoriEkle(id); kitapEtkisi(id, 'favori'); }
  kitapListesiniCiz(); profilCiz(); onerilenlerCiz();
}

function resmiKaynaklariCiz() {
  const alan = document.getElementById("resmiKaynaklar");
  if (!alan) return;
  alan.innerHTML = RESMI_KAYNAKLAR.map(r => `
    <a href="${r.url}" target="_blank" rel="noopener" class="kaynak-kart">
      <span class="kaynak-ust">${kurumRozet(r.zemin, r.harf)}
        <span class="font-bold text-[13.5px] text-slate-900">${r.ad} ${ikon("dis", 13)}</span>
      </span>
      <div class="text-[12.5px] text-slate-500 mt-1">${r.aciklama}</div>
    </a>`).join("");
}

// --- Forum görünümü ---
async function forumCiz() {
  const admin = Auth.adminMi();
  const listeEl = document.getElementById("forumListe");
  if (!listeEl) { try { await Forum.liste(forumFiltre); } catch (e) {} return; }
  let s = [];
  try { s = await Forum.liste(forumFiltre); }
  catch (e) {
    listeEl.innerHTML = `<div class="kart p-6 text-slate-500">Sorular yüklenemedi: ${e.message}</div>`;
    return;
  }
  const sayiEl = document.getElementById("forumSayi");
  if (sayiEl) sayiEl.textContent = s.length + " soru";
  listeEl.innerHTML = s.map((x, bi) => `
    <div class="kart forum-giris p-4" style="animation-delay:${Math.min(bi * 40, 320)}ms">
      <div class="flex flex-wrap items-center gap-2 text-[12px]">
        <span class="etiket">${x.sinif}. Sınıf</span>
        <span class="etiket">${dersAdi(x.ders, x.sinif)}</span>
        <span class="etiket">${x.unite}</span>
        ${x.cozuldu ? `<span class="etiket etiket-cozuldu">${ikon("tik", 11)} Çözüldü</span>` : `<span class="etiket etiket-bekliyor">Yanıt bekliyor</span>`}
        <span class="ml-auto text-slate-400">${tarihKisa(x.tarih)} • ${x.yazar}</span>
      </div>
      <h3 class="font-bold text-[15.5px] text-slate-900 mt-2 cursor-pointer hover:text-blue-800" onclick="soruDetay('${x.id}')">${kac(x.baslik)}</h3>
      <p class="text-[13.5px] text-slate-600 mt-1">${kac(x.govde.slice(0, 160))}${x.govde.length > 160 ? "…" : ""}</p>
      ${x.gorsel ? `<img src="${x.gorsel}" class="mt-2 max-h-40 rounded border" />` : ""}
      <div class="flex items-center gap-2 mt-3 flex-wrap">
        <button class="arac-btn" onclick="begeniVer('${x.id}')">${ikon("begeni", 14)} Yararlı (${x.begeni})</button>
        <button class="arac-btn" onclick="soruDetay('${x.id}')">${ikon("yorum", 14)} ${x.yanitlar.length} yanıt</button>
        <button class="arac-btn" onclick="sikayetAc('soru','${x.id}')" title="Şikayet et">${ikon("uyari", 14)}</button>
        <button class="arac-btn ml-auto" onclick="soruDetay('${x.id}')">İncele →</button>
        ${admin ? `<button class="arac-btn arac-tehlike" onclick="soruSilSor('${x.id}')">Sil</button>` : ""}
      </div>
    </div>`).join("") || `<div class="kart p-6 text-slate-500">Kayıt bulunamadı. İlk soruyu siz sorun.</div>`;
}

async function begeniVer(soruId, yanitId) {
  if (Auth.sunucuModu() && !Auth.mevcut()) { authModal("giris"); toast("Beğenmek için giriş yapın."); return; }
  try { await Forum.begen(soruId, yanitId); }
  catch (e) { toast(e.message); return; }
  forumCiz();
  if (!document.getElementById("soruModal").classList.contains("hidden")) soruDetay(soruId);
}
async function dogruVer(soruId, yanitId) {
  try { await Forum.dogruIsaretle(soruId, yanitId); }
  catch (e) { toast(e.message); return; }
  soruDetay(soruId); forumCiz(); toast("Doğru yanıt işaretlendi.");
}
async function soruSilSor(id) {
  if (!confirm("Bu soru ve tüm yanıtları silinsin mi?")) return;
  try { await Forum.soruSil(id); }
  catch (e) { toast(e.message); return; }
  forumCiz(); adminCiz(); toast("Soru silindi.");
}
async function yanitSilSor(soruId, yanitId) {
  if (!confirm("Bu yanıt silinsin mi?")) return;
  try { await Forum.yanitSil(soruId, yanitId); }
  catch (e) { toast(e.message); return; }
  soruDetay(soruId); forumCiz();
}

async function soruDetay(id) {
  let x = (Forum._sonListe || []).find(a => String(a.id) === String(id));
  if (!x) {
    try { const l = await Forum.liste({}); x = l.find(a => String(a.id) === String(id)); }
    catch (e) { toast(e.message); return; }
  }
  if (!x) return;
  const admin = Auth.adminMi();
  const dogru = x.yanitlar.find(a => a.dogru);
  document.getElementById("soruModalIcerik").innerHTML = `
    <div class="flex flex-wrap gap-2 text-[12px]">
      <span class="etiket">${x.sinif}. Sınıf</span><span class="etiket">${dersAdi(x.ders, x.sinif)}</span>
      <span class="etiket">${x.unite}</span>${x.cozuldu ? `<span class="etiket etiket-cozuldu">${ikon("tik", 11)} Çözüldü</span>` : ""}
    </div>
    <h2 class="text-lg font-bold mt-2 text-slate-900">${kac(x.baslik)}</h2>
    <div class="text-[12px] text-slate-400">${kac(x.yazar)} • ${tarihKisa(x.tarih)}</div>
    <p class="text-[14px] text-slate-700 mt-2 whitespace-pre-line">${kac(x.govde)}</p>
    ${x.gorsel ? `<img src="${x.gorsel}" class="mt-2 max-h-64 rounded border" />` : ""}
    ${dogru ? `<div class="mt-3 border border-green-300 bg-green-50 rounded-lg p-3"><div class="text-[12px] font-bold text-green-800">${ikon("tik", 13)} DOĞRU YANIT — ${kac(dogru.yazar)}</div><div class="text-[13.5px] mt-1">${kac(dogru.metin)}</div></div>` : ""}
    <div class="mt-4 space-y-2">
      ${x.yanitlar.filter(a => !a.dogru).map(a => `
        <div class="border border-slate-200 rounded-lg p-3">
          <div class="text-[12px] text-slate-500">${kac(a.yazar)} • ${tarihKisa(a.tarih)}</div>
          <div class="text-[13.5px] mt-1">${kac(a.metin)}</div>
          <div class="flex gap-2 mt-2 flex-wrap">
            <button class="arac-btn" onclick="begeniVer('${x.id}','${a.id}')">${ikon("begeni", 13)} ${a.begeni}</button>
            <button class="arac-btn" onclick="dogruVer('${x.id}','${a.id}')">${ikon("tik", 13)} Doğru yanıt olarak işaretle</button>
            <button class="arac-btn" onclick="sikayetAc('yanit','${a.dbid || a.id}')" title="Şikayet et">${ikon("uyari", 13)}</button>
            ${admin ? `<button class="arac-btn arac-tehlike" onclick="yanitSilSor('${x.id}','${a.id}')">Sil</button>` : ""}
          </div>
        </div>`).join("") || `<div class="text-[13px] text-slate-400">Henüz yanıt yok. İlk yanıtı siz yazın.</div>`}
    </div>
    <div class="mt-4">
      <label class="text-[13px] font-semibold">Yanıtınız</label>
      <textarea id="yanitMetin" class="girdi mt-1" rows="3" placeholder="Açıklamalı, adım adım yanıt yazın…"></textarea>
      <button class="btn btn-birincil btn-kucuk mt-2" onclick="yanitGonder('${x.id}')">Yanıtı Gönder</button>
    </div>`;
  document.getElementById("soruModal").classList.remove("hidden");
}
async function yanitGonder(id) {
  const m = document.getElementById("yanitMetin").value.trim();
  if (!m) { toast("Yanıt boş olamaz."); return; }
  if (Auth.sunucuModu() && !Auth.mevcut()) { authModal("giris"); toast("Yanıt yazmak için giriş yapın."); return; }
  try { await Forum.yanitEkle(id, m); }
  catch (e) { toast(e.message); return; }
  soruDetay(id); forumCiz(); toast("Yanıtınız yayınlandı.");
}

// --- Özel mesajlar ---
function tarihSaat(t) {
  try {
    return new Date(t).toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit" }) + " " +
      new Date(t).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
  } catch (e) { return ""; }
}
async function mesajlariCiz() {
  const alan = document.getElementById("mesajIcerik");
  if (!alan) return;
  const ben = Auth.mevcut();
  if (!ben) {
    alan.innerHTML = `<p class="text-[13.5px] text-slate-500">Mesajlaşmak için <button class="text-blue-800 font-semibold" onclick="authModal('giris')">giriş yapın</button>.</p>`;
    return;
  }
  let veri = { sohbetler: [], okunmamis_toplam: 0 };
  try { veri = await Mesaj.sohbetler(); }
  catch (e) { alan.innerHTML = `<div class="text-[13px] text-slate-400">${e.message}</div>`; return; }
  let kisiler = [];
  try { kisiler = await Mesaj.kisiler(); } catch (e) {}
  alan.innerHTML = `
    <div class="mesaj-duyuru">Özel mesajlar güvenlik denetimi kapsamında yöneticiler tarafından incelenebilir. Kişisel bilgi paylaşmayın. Sesli arama için sohbeti açın.</div>
    <div class="mesaj-grid">
      <div>
        <div class="mesaj-yan-baslik">Sohbetler</div>
        <div class="sohbet-liste">
          ${veri.sohbetler.map(s => `
            <button class="sohbet-oge ${String(Mesaj._acikSohbet) === String(s.karsi_id) ? "aktif" : ""}" data-karsi="${s.karsi_id}" onclick="sohbetAc('${s.karsi_id}')">
              ${avatarHTML(s.karsi_ad, s.karsi_avatar, "sohbet-avatar")}<span class="sohbet-ad">${kac(s.karsi_ad)} ${s.okunmamis ? `<span class="sayac">${s.okunmamis}</span>` : ""}</span>
              <span class="sohbet-son">${kac(String(s.son_metin).slice(0, 48))}${s.son_metin.length > 48 ? "…" : ""}</span>
            </button>`).join("") || `<div class="text-[13px] text-slate-400 p-2">Henüz sohbet yok. Aşağıdan kişi seçerek başlayın.</div>`}
        </div>
        <div class="mesaj-yan-baslik mt-3">Yeni Sohbet</div>
        <div class="flex gap-2">
          <select id="yeniSohbetKisi" class="girdi">${kisiler.map(k => `<option value="${k.id}">${k.ad} (${rolAdi(k.rol)})</option>`).join("")}</select>
          <button class="btn btn-ikincil btn-kucuk" onclick="sohbetAc(document.getElementById('yeniSohbetKisi').value)">Aç</button>
        </div>
      </div>
      <div>
        <div id="mesajPencere" class="mesaj-pencere"><div class="text-[13px] text-slate-400">Sohbet seçin.</div></div>
        <form id="mesajForm" class="hidden mt-2" onsubmit="mesajGonderForm(event)">
          <div class="flex gap-2">
            <input id="mesajMetin" class="girdi" maxlength="1000" placeholder="Mesajınız…" autocomplete="off" />
            <button class="btn btn-birincil btn-kucuk">Gönder</button>
          </div>
        </form>
      </div>
    </div>`;
  if (Mesaj._acikSohbet) sohbetAc(Mesaj._acikSohbet);
  else {
    try {
      const bekleyen = sessionStorage.getItem("ook_ac_sohbet");
      sessionStorage.removeItem("ook_ac_sohbet");
      if (bekleyen) sohbetAc(bekleyen);
    } catch (e) {}
  }
  mesajRozetGuncelle(veri.okunmamis_toplam);
  SohbetCanli.bilinen = {};
  veri.sohbetler.forEach(s => { SohbetCanli.bilinen[s.karsi_id] = Number(s.okunmamis || 0); });
}
async function sohbetAc(karsiId, sessizListe = false) {
  if (!karsiId) return;
  Mesaj._acikSohbet = karsiId;
  SohbetCanli.acikSonId = null;
  document.querySelectorAll(".sohbet-oge").forEach(b =>
    b.classList.toggle("aktif", String(b.dataset.karsi) === String(karsiId)));
  let v;
  try { v = await Mesaj.getir(karsiId); }
  catch (e) { toast(e.message); return; }
  sohbetAcIcerik(v);
  const p = document.getElementById("mesajPencere");
  if (p) p.scrollTop = p.scrollHeight;
  if (!sessizListe) mesajlariRozetYenile();
}
function sohbetAcIcerik(v) {
  const ben = Auth.mevcut();
  const alan = document.getElementById("mesajPencere");
  if (!alan) return;
  alan.innerHTML =
    `<div class="mesaj-karsi mesaj-karsi-ust"><div class="mesaj-karsi-kimlik">${avatarHTML(v.karsi.ad, v.karsi.avatar, "mesaj-karsi-avatar")}<div><b>${kac(v.karsi.ad)}</b><span>Özel sohbet</span></div></div><div class="mesaj-karsi-aksiyon"><button class="arac-btn" title="Sesli ara" data-sesli-id="${kac(v.karsi.id)}" data-sesli-ad="${kac(v.karsi.ad)}" onclick="Sesli.araFromButton(this)">🎙️ Sesli ara</button></div></div>` +
    (v.mesajlar.map(m => `
      <div class="balon-satir ${m.giden ? "giden" : "gelen"}" data-mid="${m.id}">
        <div class="balon">${kac(m.metin)}
          <span class="balon-zaman">${tarihSaat(m.tarih)}</span>
          ${(m.giden || (ben && ben.rol === "admin")) ? `<button class="balon-sil" title="Sil" onclick="mesajSilYap('${m.id}')">${ikon("kapat", 10)}</button>` : ""}
        </div>
      </div>`).join("") || `<div class="text-[13px] text-slate-400">Henüz mesaj yok. İlk mesajı yazın.</div>`);
  document.getElementById("mesajForm").classList.remove("hidden");
  SohbetCanli.acikSonId = v.mesajlar.length ? v.mesajlar[v.mesajlar.length - 1].id : null;
}
async function mesajGonderForm(e) {
  e.preventDefault();
  if (Mesaj._gonderiliyor || !Mesaj._acikSohbet) return;
  const form = document.getElementById('mesajForm');
  const kutu = document.getElementById('mesajMetin');
  const btn = form ? form.querySelector('button[type="submit"], button:not([type])') : null;
  const metin = kutu ? kutu.value.trim() : '';
  if (!metin) return;
  Mesaj._gonderiliyor = true;
  if (btn) { btn.disabled = true; btn.textContent = 'Gönderiliyor…'; }
  try {
    const sonuc = await Mesaj.gonder(Mesaj._acikSohbet, metin);
    kutu.value = '';
    await sohbetAc(Mesaj._acikSohbet, true);
    try { const liste = await Mesaj.sohbetler(); SohbetCanli._listeImza = ''; SohbetCanli.listeTazele(liste.sohbetler); mesajRozetGuncelle(liste.okunmamis_toplam); } catch (e3) {}
  } catch (e2) { toast(e2.message); }
  finally { Mesaj._gonderiliyor = false; if (btn) { btn.disabled = false; btn.textContent = 'Gönder'; } }
}
function mesajListesineEkle(m) {
  const alan = document.getElementById('mesajPencere');
  if (!alan || !m) return;
  const ben = Auth.mevcut();
  const satir = document.createElement('div'); satir.className = 'balon-satir giden'; satir.dataset.mid = m.id;
  const balon = document.createElement('div'); balon.className = 'balon';
  balon.append(document.createTextNode(m.metin + ' '));
  const z = document.createElement('span'); z.className = 'balon-zaman'; z.textContent = tarihSaat(m.tarih || m.olusturma || new Date().toISOString()); balon.appendChild(z);
  if (ben) { const del = document.createElement('button'); del.className='balon-sil'; del.title='Sil'; del.innerHTML=ikon('kapat',10); del.onclick=()=>mesajSilYap(m.id); balon.appendChild(del); }
  satir.appendChild(balon); alan.appendChild(satir); alan.scrollTop=alan.scrollHeight;
}

async function mesajSilYap(id) {
  if (!confirm("Bu mesaj silinsin mi?")) return;
  try { await Mesaj.sil(id); }
  catch (e) { toast(e.message); return; }
  sohbetAc(Mesaj._acikSohbet); mesajlariCiz();
}
async function mesajlariRozetYenile() {
  try {
    const v = await Mesaj.sohbetler();
    mesajRozetGuncelle(v.okunmamis_toplam);
  } catch (e) {}
}
function mesajRozetGuncelle(sayi) {
  const r = document.getElementById("mesajRozet");
  if (!r) return;
  if (sayi > 0) { r.textContent = sayi > 99 ? "99+" : sayi; r.classList.remove("hidden"); }
  else { r.classList.add("hidden"); }
}
function mesajDongu() { SohbetCanli.baslat(); }

/* Gerçek zamanlı ileti: 3 sn'de bir yoklama, kayan bildirim + ses */
function bildirimSesi() {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    bildirimSesi._ctx = bildirimSesi._ctx || new AC();
    const ctx = bildirimSesi._ctx;
    if (ctx.state === "suspended") ctx.resume();
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.type = "sine"; o.frequency.value = 880;
    g.gain.setValueAtTime(0.001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.03);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
    o.start(); o.stop(ctx.currentTime + 0.5);
  } catch (e) {}
}
document.addEventListener("pointerdown", () => {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC && !bildirimSesi._ctx) bildirimSesi._ctx = new AC();
  } catch (e) {}
}, { once: true });

function kayanBildirim(baslik, metin, tikla) {
  const alan = document.getElementById("bildirimAlani");
  if (!alan) return;
  const k = document.createElement("div");
  k.className = "kayan-bildirim";
  k.innerHTML = `<b></b><span></span>`;
  k.querySelector("b").textContent = baslik;
  k.querySelector("span").textContent = metin;
  k.onclick = () => { if (k.parentNode) k.parentNode.removeChild(k); if (tikla) tikla(); };
  alan.appendChild(k);
  setTimeout(() => { k.classList.add("cikis"); setTimeout(() => { if (k.parentNode) k.parentNode.removeChild(k); }, 400); }, 6000);
}

const SohbetCanli = {
  calisiyor: false, bilinen: {}, acikSonId: null, _listeImza: "",
  baslat() {
    if (this.calisiyor) return;
    this.calisiyor = true;
    setInterval(() => this.tik(), 3000);
  },
  async tik() {
    if (!Auth.mevcut() || document.hidden) return;
    let v;
    try { v = await Mesaj.sohbetler(); } catch (e) { return; }
    mesajRozetGuncelle(v.okunmamis_toplam);
    for (const s of v.sohbetler) {
      const once = this.bilinen[s.karsi_id] || 0;
      if (s.okunmamis > once && String(Mesaj._acikSohbet) !== String(s.karsi_id)) {
        kayanBildirim(s.karsi_ad, String(s.son_metin).slice(0, 90), () => {
          if (document.body.dataset.sayfa === "mesajlar") { sekmeyeGit("mesajlarBolumu"); sohbetAc(s.karsi_id); }
          else {
            try { sessionStorage.setItem("ook_ac_sohbet", s.karsi_id); } catch (e) {}
            location.href = "mesajlar.html";
          }
        });
        bildirimSesi();
      }
      this.bilinen[s.karsi_id] = s.okunmamis;
    }
    if (Mesaj._acikSohbet && document.getElementById("mesajPencere")) await this.acikTazele();
    this.listeTazele(v.sohbetler);
  },
  async acikTazele() {
    const karsi = Mesaj._acikSohbet;
    let v;
    try { v = await Mesaj.getir(karsi); } catch (e) { return; }
    const son = v.mesajlar.length ? v.mesajlar[v.mesajlar.length - 1].id : null;
    if (String(son) === String(this.acikSonId)) return;
    const pencere = document.getElementById("mesajPencere");
    const yakinda = pencere ? (pencere.scrollHeight - pencere.scrollTop - pencere.clientHeight < 120) : true;
    const yeniGelen = this.acikSonId !== null && v.mesajlar.length && !v.mesajlar[v.mesajlar.length - 1].giden;
    sohbetAcIcerik(v);
    const p2 = document.getElementById("mesajPencere");
    if (p2 && yakinda) p2.scrollTop = p2.scrollHeight;
    if (yeniGelen) bildirimSesi();
    mesajlariRozetYenile();
  },
  listeTazele(sohbetler) {
    const imza = JSON.stringify(sohbetler.map(s => [s.karsi_id, s.okunmamis, s.son_metin]));
    if (imza === this._listeImza) return;
    this._listeImza = imza;
    const liste = document.querySelector(".sohbet-liste");
    if (!liste) return;
    liste.innerHTML = sohbetler.map(s => `
      <button class="sohbet-oge ${String(Mesaj._acikSohbet) === String(s.karsi_id) ? "aktif" : ""}" data-karsi="${s.karsi_id}" onclick="sohbetAc('${s.karsi_id}')">
        ${avatarHTML(s.karsi_ad, s.karsi_avatar, "sohbet-avatar")}<span class="sohbet-ad">${kac(s.karsi_ad)} ${s.okunmamis ? `<span class="sayac">${s.okunmamis}</span>` : ""}</span>
        <span class="sohbet-son">${kac(String(s.son_metin).slice(0, 48))}${s.son_metin.length > 48 ? "…" : ""}</span>
      </button>`).join("") || `<div class="text-[13px] text-slate-400 p-2">Henüz sohbet yok. Aşağıdan kişi seçerek başlayın.</div>`;
  }
};

// --- Auth modal / profil ---
function authModal(mod = "giris") {
  if (document.body.dataset.sayfa === "giris") {
    authSekme(mod);
    return;
  }
  // Giriş/kayıt artık ayrı sayfalarda tutuluyor. Eski modal çağrılarını da kırmadan yönlendir.
  if (mod === "giris") { location.href = "giris.html"; return; }
  location.href = "kayit.html";
}
function authSekme(mod) {
  if (mod === "kayit") { location.href = "kayit.html"; return; }
  const giris = mod === "giris";
  const gf = document.getElementById("girisForm");
  const kf = document.getElementById("kayitForm");
  const df = document.getElementById("dogrulamaForm");
  if (gf) gf.classList.toggle("hidden", !giris);
  if (kf) kf.classList.toggle("hidden", giris);
  if (df) df.classList.add("hidden");
  const sg = document.getElementById("sekmeGiris");
  const sk = document.getElementById("sekmeKayit");
  if (sg) sg.className = "auth-sekme" + (giris ? " aktif" : "");
  if (sk) sk.className = "auth-sekme" + (!giris ? " aktif" : "");
  if (Auth.sunucuModu() && window.Guvenlik) Guvenlik.hazirla(giris ? 'girisCaptcha' : 'kayitCaptcha');
}
function sifreGoster(id, btn) {
  const i = document.getElementById(id);
  if (!i) return;
  i.type = i.type === "password" ? "text" : "password";
  btn.innerHTML = ikon(i.type === "password" ? "goz" : "gozKapali", 17);
}
async function girisYap(e) {
  e.preventDefault();
  const güvenlik = (Auth.sunucuModu() && window.Guvenlik) ? await Guvenlik.tokenIste('girisCaptcha') : true;
  if (!güvenlik) return toast('Önce güvenlik doğrulamasını tamamlayın.');
  const ep = document.getElementById("gEposta").value.trim();
  const r = await Auth.giris(ep, document.getElementById("gSifre").value);
  if (r.hata) {
    if (r.dogrulama_gerekli) { dogrulamaEkraniGoster(r.hedef || ep, r.kanal || "eposta", ""); return; }
    return typeof toast === "function" ? toast(r.hata) : (document.getElementById("girisDurum") && (document.getElementById("girisDurum").textContent = r.hata));
  }
  if (document.body.dataset.sayfa === "giris") {
    location.href = "index.html";
    return;
  }
  document.getElementById("authModal").classList.add("hidden");
  await Tercih.baslat();
  ustBarGuncelle(); profilCiz(); adminCiz(); forumCiz(); mesajlariCiz(); onerilenlerCiz(); toast("Hoş geldiniz, " + r.kullanici.ad + ".");
}
async function kayitYap(e) {
  e.preventDefault();
  const güvenlik = (Auth.sunucuModu() && window.Guvenlik) ? await Guvenlik.tokenIste('kayitCaptcha') : true;
  if (!güvenlik) return toast('Önce güvenlik doğrulamasını tamamlayın.');
  const ad = document.getElementById("kAd").value.trim();
  const sf = document.getElementById("kSifre").value;
  if (ad.length < 3 || sf.length < 4) return toast("Ad ve şifreyi kontrol edin (şifre en az 4 karakter).");
  const kanal = kayitKanali();
  let r;
  try {
    if (kanal === "telefon") {
      const tel = document.getElementById("kTelefon").value.trim();
      if (!tel) return toast("Telefon numaranızı yazın.");
      r = await Auth.telefonKayit(ad, tel, sf);
    } else {
      const ep = document.getElementById("kEposta").value.trim();
      if (!ep) return toast("E-posta adresinizi yazın.");
      r = await Auth.kayit(ad, ep, sf);
    }
  }
  catch (e2) { return toast("Kayıt sırasında bağlantı hatası."); }
  if (r.hata) return toast(r.hata);
  if (r.dogrulama_gerekli) {
    dogrulamaEkraniGoster(r.hedef || r.eposta, kanal, r.posta_hatasi || "");
    return;
  }
  document.getElementById("authModal").classList.add("hidden");
  await Tercih.baslat();
  ustBarGuncelle(); profilCiz(); adminCiz(); onerilenlerCiz(); toast("Kaydınız oluşturuldu. Hesabınız öğrenci olarak açıldı.");
}
function kayitKanali() {
  const a = document.querySelector("#kayitKanal .kanal-sekme.aktif");
  return a ? a.dataset.kanal : "eposta";
}
/* Google ile giriş (GIS) + giriş yapılandırması */
function girisYapilandir() {
  Auth.yapilandirma().then(y => {
    const ks = document.getElementById("kayitKanal");
    if (ks) {
      const telBtn = ks.querySelector('[data-kanal="telefon"]');
      if (telBtn) telBtn.style.display = y.sms ? "" : "none";
      if (!y.sms && kayitKanali() === "telefon") kayitKanalSec("eposta");
    }
    if (y.google && y.googleClientId) googleHazirla(y.googleClientId);
  }).catch(() => {});
}
function googleHazirla(clientId) {
  const sar = document.getElementById("googleBtnSar");
  if (!sar) return;
  sar.classList.remove("hidden");
  const yukle = () => {
    if (!window.google || !google.accounts || !google.accounts.id) { setTimeout(yukle, 400); return; }
    try {
      google.accounts.id.initialize({ client_id: clientId, callback: googleCevap, ux_mode: "popup" });
      const alan = document.getElementById("googleBtn");
      if (alan && !alan.dataset.kurulu) {
        alan.dataset.kurulu = "1";
        google.accounts.id.renderButton(alan, { theme: "outline", size: "large", width: 320, text: "signin_with", locale: "tr" });
      }
    } catch (e) {}
  };
  if (!document.getElementById("gisBetik")) {
    const s = document.createElement("script");
    s.id = "gisBetik"; s.src = "https://accounts.google.com/gsi/client"; s.async = true; s.defer = true;
    s.onload = yukle;
    document.head.appendChild(s);
  } else yukle();
}
async function googleCevap(cevap) {
  if (!cevap || !cevap.credential) { toast("Google yanıtı alınamadı."); return; }
  if (Auth.sunucuModu() && window.Guvenlik) {
    const güvenlik = await Guvenlik.tokenIste('girisCaptcha');
    if (!güvenlik) return toast('Önce güvenlik doğrulamasını tamamlayın.');
  }
  toast("Google doğrulanıyor…");
  let r;
  try { r = await Auth.googleGiris(cevap.credential); }
  catch (e) { toast("Bağlantı hatası, tekrar deneyin."); return; }
  if (r.hata) return toast(r.hata);
  if (r.dogrulama_gerekli) {
    dogrulamaEkraniGoster(r.eposta, "eposta", r.posta_hatasi || "");
    return;
  }
  if (document.body.dataset.sayfa === "giris") { location.href = "index.html"; return; }
  const am = document.getElementById("authModal"); if (am) am.classList.add("hidden");
  ustBarGuncelle(); profilCiz(); adminCiz(); forumCiz(); mesajlariCiz();
  toast("Hoş geldiniz, " + r.kullanici.ad + ".");
}
function kayitKanalSec(kanal) {
  document.querySelectorAll("#kayitKanal .kanal-sekme").forEach(b => b.classList.toggle("aktif", b.dataset.kanal === kanal));
  const tel = kanal === "telefon";
  document.getElementById("kEpostaSar").classList.toggle("hidden", tel);
  document.getElementById("kTelefonSar").classList.toggle("hidden", !tel);
}
let _dogrulamaHedef = "", _dogrulamaKanal = "eposta", _kodSayac = null;
function dogrulamaEkraniGoster(hedef, kanal, postaHatali) {
  _dogrulamaHedef = hedef;
  _dogrulamaKanal = kanal === "telefon" ? "telefon" : "eposta";
  const gf = document.getElementById("girisForm");
  const kf = document.getElementById("kayitForm");
  const d = document.getElementById("dogrulamaForm");
  if (gf) gf.classList.add("hidden");
  if (kf) kf.classList.add("hidden");
  if (!d) return;
  d.classList.remove("hidden");
  const he = document.getElementById("dogrulamaEposta");
  const ky = document.getElementById("dogrulamaKanalYazi");
  const uy = document.getElementById("dogrulamaUyari");
  const ko = document.getElementById("dogrulamaKod");
  if (he) he.textContent = hedef;
  if (ky) ky.textContent = _dogrulamaKanal === "telefon" ? "telefonunuza" : "e-postanıza";
  if (uy) uy.textContent = postaHatali
    ? "Uyarı: e-posta gönderilemedi (" + postaHatali + "). Kod ulaşmazsa yöneticiden manuel onay isteyin."
    : (_dogrulamaKanal === "telefon" ? "6 haneli kod telefonunuza gönderildi. 15 dakika geçerlidir." : "6 haneli kod e-postanıza gönderildi. 15 dakika geçerlidir.");
  if (ko) { ko.value = ""; ko.focus(); }
  if (document.getElementById("authModal")) document.getElementById("authModal").classList.remove("hidden");
  kodSayacBaslat();
}
function kodSayacBaslat() {
  const btn = document.getElementById("kodTekrarBtn");
  let kalan = 60;
  clearInterval(_kodSayac);
  btn.disabled = true;
  btn.textContent = "Tekrar gönder (60)";
  _kodSayac = setInterval(() => {
    kalan--;
    if (kalan <= 0) { clearInterval(_kodSayac); btn.disabled = false; btn.textContent = "Kodu Tekrar Gönder"; }
    else btn.textContent = "Tekrar gönder (" + kalan + ")";
  }, 1000);
}
async function dogrulaYap(e) {
  e.preventDefault();
  const kod = document.getElementById("dogrulamaKod").value.trim();
  if (kod.length < 4) return toast("Kodu eksiksiz yazın.");
  const r = await Auth.dogrula(_dogrulamaHedef, kod);
  if (r.hata) {
    const d = document.getElementById("dogrulamaUyari") || document.getElementById("girisDurum");
    if (d) d.textContent = r.hata;
    return;
  }
  if (document.body.dataset.sayfa === "giris") { location.href = "index.html"; return; }
  const am = document.getElementById("authModal"); if (am) am.classList.add("hidden");
  const df = document.getElementById("dogrulamaForm"); if (df) df.classList.add("hidden");
  await Tercih.baslat();
  ustBarGuncelle(); profilCiz(); adminCiz(); forumCiz(); mesajlariCiz(); onerilenlerCiz();
  toast("E-postanız doğrulandı, hoş geldiniz!");
}
async function kodTekrarGonder() {
  const r = await Auth.kodTekrar(_dogrulamaHedef);
  if (r.hata) return toast(r.hata);
  toast("Yeni kod gönderildi.");
  kodSayacBaslat();
}
function kayitSayfasiKanalSec(kanal) {
  const ep = document.getElementById("kayitSayfaEpostaSar");
  const tel = document.getElementById("kayitSayfaTelefonSar");
  document.querySelectorAll("#kayitSayfaKanal .kanal-sekme").forEach(b => b.classList.toggle("aktif", b.dataset.kanal === kanal));
  const isTel = kanal === "telefon";
  if (ep) ep.classList.toggle("hidden", isTel);
  if (tel) tel.classList.toggle("hidden", !isTel);
}
function kayitSayfasiKanali() {
  return document.querySelector("#kayitSayfaKanal .kanal-sekme.aktif")?.dataset.kanal || "eposta";
}
async function girisSayfasiBaslat() {
  try {
    const uzak = await Auth.baslat();
    const durum = document.getElementById("girisDurum");
    if (!uzak) {
      if (durum) durum.textContent = "Sunucu bağlantısı kurulamadı. Lütfen biraz sonra tekrar deneyin.";
      return;
    }
    if (window.Guvenlik) await Guvenlik.hazirla("girisCaptcha");
    const form = document.getElementById("girisForm");
    if (form) form.addEventListener("submit", girisYap);
    const y = await Auth.yapilandirma();
    if (y.google && y.googleClientId) googleHazirla(y.googleClientId);
  } catch (e) {
    const durum = document.getElementById("girisDurum");
    if (durum) durum.textContent = "Giriş ekranı başlatılamadı.";
  }
}

async function kayitSayfasiBaslat() {
  try {
    const uzak = await Auth.baslat();
    const durum = document.getElementById("kayitDurum");
    if (!uzak) {
      if (durum) durum.textContent = "Sunucu bağlantısı kurulamadı. Lütfen biraz sonra tekrar deneyin.";
      return;
    }
    if (window.Guvenlik) await Guvenlik.hazirla("kayitCaptchaSayfa");
    const y = await Auth.yapilandirma();
    const telBtn = document.querySelector('#kayitSayfaKanal [data-kanal="telefon"]');
    if (telBtn) telBtn.style.display = y.sms ? "" : "none";
    if (!y.sms) kayitSayfasiKanalSec("eposta");
    const form = document.getElementById("kayitSayfaForm");
    if (form) form.addEventListener("submit", kayitSayfasiGonder);
    const tel = document.getElementById("kTelefonSayfa");
    if (tel) tel.addEventListener("input", () => {
      let v = tel.value.replace(/\D/g, "").replace(/^90/, "").replace(/^0/, "").slice(0, 10);
      tel.value = v.replace(/^(\d{3})(\d{3})(\d{2})(\d{0,2}).*$/, (_,a,b,c,d) => [a,b,c,d].filter(Boolean).join(" "));
    });
  } catch (e) {
    const durum = document.getElementById("kayitDurum");
    if (durum) durum.textContent = "Kayıt ekranı başlatılamadı.";
  }
}
async function kayitSayfasiGonder(e) {
  e.preventDefault();
  const durum = document.getElementById("kayitDurum");
  if (durum) durum.textContent = "Kontrol ediliyor…";
  const guvenlik = (Auth.sunucuModu() && window.Guvenlik) ? await Guvenlik.tokenIste("kayitCaptchaSayfa") : true;
  if (!guvenlik) { if (durum) durum.textContent = "Önce güvenlik kontrolünü tamamlayın."; return; }
  const ad = document.getElementById("kAdSayfa").value.trim();
  const sf = document.getElementById("kSifreSayfa").value;
  const kanal = kayitSayfasiKanali();
  if (ad.length < 3 || sf.length < 4) { if (durum) durum.textContent = "Ad soyad ve şifreyi kontrol edin."; return; }
  let r;
  try {
    if (kanal === "telefon") {
      const raw = document.getElementById("kTelefonSayfa").value.trim();
      const tel = raw.replace(/\D/g, "");
      if (tel.length !== 10 || tel[0] !== "5") { if (durum) durum.textContent = "Geçerli bir 05XX XXX XX XX numarası yazın."; return; }
      r = await Auth.telefonKayit(ad, "+90" + tel, sf);
    } else {
      const ep = document.getElementById("kEpostaSayfa").value.trim();
      if (!ep) { if (durum) durum.textContent = "E-posta adresinizi yazın."; return; }
      r = await Auth.kayit(ad, ep, sf);
    }
  } catch (err) {
    if (durum) durum.textContent = err.message || "Kayıt sırasında bağlantı hatası.";
    return;
  }
  if (r.hata) { if (durum) durum.textContent = r.hata; return; }
  if (r.dogrulama_gerekli) {
    window._kayitSayfaHedef = r.hedef || r.eposta;
    window._kayitSayfaKanal = kanal;
    document.getElementById("kayitSayfaAdim1").classList.add("hidden");
    document.getElementById("kayitSayfaAdim2").classList.remove("hidden");
    document.getElementById("kayitHedefYazi").textContent = window._kayitSayfaHedef;
    document.getElementById("kayitKanalYazi").textContent = kanal === "telefon" ? "telefonunuza" : "e-postanıza";
    document.getElementById("kayitKodSayfa").focus();
    kayitSayfasiSayac();
    if (durum) durum.textContent = "Doğrulama kodunuz gönderildi.";
  }
}
let _kayitSayfaSayac = null;
function kayitSayfasiSayac() {
  const b = document.getElementById("kayitKodTekrar");
  if (!b) return;
  let k = 60; clearInterval(_kayitSayfaSayac); b.disabled = true; b.textContent = "Tekrar gönder (60)";
  _kayitSayfaSayac = setInterval(() => { k--; if (k <= 0) { clearInterval(_kayitSayfaSayac); b.disabled = false; b.textContent = "Kodu tekrar gönder"; } else b.textContent = "Tekrar gönder (" + k + ")"; }, 1000);
}
async function kayitSayfasiDogrula(e) {
  e.preventDefault();
  const kod = document.getElementById("kayitKodSayfa").value.trim();
  if (!/^\d{6}$/.test(kod)) { document.getElementById("kayitDogrulamaDurum").textContent = "6 haneli kodu eksiksiz yazın."; return; }
  const r = await Auth.dogrula(window._kayitSayfaHedef, kod);
  if (r.hata) { document.getElementById("kayitDogrulamaDurum").textContent = r.hata; return; }
  document.getElementById("kayitDogrulamaDurum").textContent = "Hesabınız doğrulandı. Yönlendiriliyorsunuz…";
  setTimeout(() => { location.href = "index.html"; }, 700);
}
async function kayitSayfasiKodTekrar() {
  const durum = document.getElementById("kayitDogrulamaDurum");
  const r = await Auth.kodTekrar(window._kayitSayfaHedef);
  if (r.hata) { if (durum) durum.textContent = r.hata; return; }
  if (durum) durum.textContent = "Yeni kod gönderildi.";
  kayitSayfasiSayac();
}

async function cikisYap() {
  await Auth.cikis();
  Mesaj._acikSohbet = null; mesajRozetGuncelle(0);
  location.href = "index.html";
}
function ustBarGuncelle() {
  const alan = document.getElementById("girisAlani");
  if (!alan) return;
  const k = Auth.mevcut();
  if (k) {
    const ad = kac(k.ad || "Kullanıcı");
    const bas = kac(String(k.ad || "K").trim().split(/\s+/).slice(0,2).map(x => x[0] || "").join("").toUpperCase() || "K");
    alan.innerHTML = `<details class="kullanici-menu">
      <summary class="kullanici-menu-ozet" aria-label="Kullanıcı menüsü">
        ${avatarHTML(k.ad, k.avatar, "kullanici-avatar")}
        <span class="kullanici-metin"><b>${ad}</b><small>${k.rol === "admin" ? "Yönetici" : rolAdi(k.rol)}</small></span>
        <span class="kullanici-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="kullanici-panel">
        <div class="kullanici-panel-ust">
          <div class="kullanici-panel-avatar-wrap">${avatarHTML(k.ad, k.avatar, "kullanici-panel-avatar")}<span class="avatar-panel-dot"></span></div>
          <div><strong>${ad}</strong><span>${k.eposta ? kac(k.eposta) : rolAdi(k.rol)}</span></div>
        </div>
        <div class="kullanici-menu-linkleri">
          <a href="profil.html">${ikon("kullanici",15)}<span>Profilim</span><em>→</em></a>
          ${k.rol === "admin" ? `<a class="yonetici-link" href="yonetim.html">${ikon("ayar",15)}<span>Yönetim paneli</span><em>→</em></a>` : ""}
          <button type="button" onclick="cikisYap()">${ikon("cikis",15)}<span>Çıkış yap</span><em>↪</em></button>
        </div>
        <div class="kullanici-panel-alt">Oturum güvenli çerez ile korunuyor.</div>
      </div>
    </details>`;
  } else {
    alan.innerHTML = `<div class="misafir-butonlari"><button class="btn btn-ikincil btn-kucuk" onclick="authModal('giris')">Giriş Yap</button><a class="btn btn-birincil btn-kucuk" href="kayit.html">Kayıt Ol</a></div>`;
  }
}

async function profilCiz() {
  const k = Auth.mevcut();
  const alan = document.getElementById("profilIcerik");
  if (!alan) return;
  if (!k) {
    alan.innerHTML = `<div class="profil-misafir"><div class="profil-misafir-ikon">${ikon("kullanici",26)}</div><div><span class="profil-kicker">KİŞİSEL ÇALIŞMA ALANI</span><h3>Profil alanına hoş geldin</h3><p>Favorilerini, forum sorularını, kişisel önerilerini ve okuma notlarını tek yerde görmek için hesabına giriş yap.</p><button class="btn btn-birincil btn-kucuk" onclick="authModal('giris')">Giriş Yap</button></div></div>`;
    return;
  }
  const favs = Auth.favoriler().map(id => KITAPLAR.find(x => x.id === id)).filter(Boolean);
  let sorular = (Forum._sonListe || []).filter(x => x.yazar && x.yazar.startsWith(k.ad));
  if (!sorular.length && Auth.sunucuModu()) {
    try { const l = await Forum.liste({}); sorular = l.filter(x => x.yazar && x.yazar.startsWith(k.ad)); } catch (e) {}
  }
  let notSayisi = 0;
  for (let i = 0; i < localStorage.length; i++) { const a = localStorage.key(i); if (a && a.startsWith("ook_not_")) notSayisi++; }
  const oz = (typeof Tercih !== "undefined" && Tercih.ozet) ? Tercih.ozet() : {sinif:{},ders:{},kitap:{}};
  const siniflar = [5,6,7,8].map(s => ({sinif:s, puan:Number(oz.sinif[String(s)] || 0)})).sort((a,b)=>b.puan-a.puan);
  const toplamEtki = siniflar.reduce((a,x)=>a+x.puan,0);
  const odakSinif = (typeof Tercih !== "undefined" && Tercih.tercihSinif) ? Tercih.tercihSinif() : null;
  const bas = kac(String(k.ad || "K").trim().split(/\s+/).slice(0,2).map(x=>x[0]||"").join("").toUpperCase() || "K");
  const sinifKartlari = siniflar.map(x => {
    const yuzde = toplamEtki ? Math.max(6, Math.round((x.puan/toplamEtki)*100)) : 0;
    return `<div class="profil-odak-satir"><div class="profil-odak-bas"><span>${x.sinif}. Sınıf</span><b>${yuzde}%</b></div><div class="profil-odak-bar"><span style="width:${yuzde}%"></span></div></div>`;
  }).join("");
  alan.innerHTML = `
    <div class="profil-hero-card"><div class="profil-hero-glow"></div><div class="profil-avatar-wrap">${avatarHTML(k.ad, k.avatar, "profil-avatar")}<button type="button" class="profil-avatar-degistir" onclick="avatarDosyasiAc()" title="Avatarı değiştir">✦<span>Değiştir</span></button><input id="avatarDosyasi" type="file" accept="image/png,image/jpeg,image/webp" class="sr-only" onchange="avatarYukle(this.files[0])" /></div><div class="profil-hero-copy"><span class="profil-kicker">KİŞİSEL ÇALIŞMA ALANI</span><h2>${kac(k.ad || "Kullanıcı")}</h2><p>${kac(rolAdi(k.rol))}${k.olusturma || k.tarih ? " · " + tarihKisa(k.olusturma || k.tarih) + " tarihinden beri" : ""}</p></div><div class="profil-hero-actions"><a class="btn btn-ikincil btn-kucuk" href="kitaplar.html">Kitaplara git</a><a class="btn btn-birincil btn-kucuk" href="forum.html">Foruma git</a></div></div>
    <div class="profil-avatar-info"><div><span class="profil-panel-kicker">PROFİL GÖRSELİ</span><b>Avatarını kişiselleştir</b><small>PNG, JPG veya WebP · En fazla 220 KB'a sıkıştırılır.</small></div><div class="profil-avatar-actions"><button class="btn btn-birincil btn-kucuk" type="button" onclick="avatarDosyasiAc()">Fotoğraf seç</button><button class="btn btn-ikincil btn-kucuk" type="button" onclick="avatarSil()">Sıfırla</button></div></div>
    <div class="profil-metrik-grid"><div class="profil-metrik"><div class="profil-metrik-ikon pembe">${ikonYildiz(true,18)}</div><div><strong>${favs.length}</strong><span>Favori kitap</span></div></div><div class="profil-metrik"><div class="profil-metrik-ikon mavi">${ikon("yorum",18)}</div><div><strong>${sorular.length}</strong><span>Forum sorusu</span></div></div><div class="profil-metrik"><div class="profil-metrik-ikon turuncu">${ikon("kalem",18)}</div><div><strong>${notSayisi}</strong><span>Sayfa notu</span></div></div><div class="profil-metrik"><div class="profil-metrik-ikon mor">${ikon("kitap",18)}</div><div><strong>${odakSinif ? odakSinif + ". sınıf" : "Genel"}</strong><span>Çalışma odağı</span></div></div></div>
    <div class="profil-iki-kolon"><section class="profil-panel"><div class="profil-panel-ust"><div><span class="profil-panel-kicker">KÜTÜPHANE</span><h3>Favori kitapların</h3></div><span class="profil-panel-sayi">${favs.length}</span></div><div class="profil-kitap-listesi">${favs.slice(0,6).map(f => `<button class="profil-kitap-oge" onclick="Reader.ac('${f.id}')"><span class="profil-kitap-kapak"><img src="${f.kapak || f.gorsel || ''}" alt="" loading="lazy"></span><span class="profil-kitap-bilgi"><b>${kac(f.baslik)}</b><small>${kac(dersAdi(f.ders,f.sinif) || "Ders kitabı")} · ${f.sinif}. sınıf</small></span><span class="profil-kitap-ok">→</span></button>`).join("") || `<div class="profil-bos"><strong>Henüz favori kitabın yok.</strong><span>Beğendiğin kitapları ⭐ ile işaretlediğinde burada görünecek.</span><a href="kitaplar.html">Kitaplara göz at →</a></div>`}</div></section>
    <section class="profil-panel profil-odak"><div class="profil-panel-ust"><div><span class="profil-panel-kicker">KİŞİSELLEŞTİRME</span><h3>Çalışma odağın</h3></div><span class="profil-panel-sayi">${odakSinif ? odakSinif + ". sınıf" : "Yeni"}</span></div><p class="profil-panel-aciklama">Gezdiğin sınıf ve dersler önerilerini etkiliyor. Aşağıdaki dağılım son etkileşimlerinin özetidir.</p>${sinifKartlari || `<div class="profil-bos"><span>Henüz yeterli veri oluşmadı.</span><a href="kitaplar.html">Bir sınıf seç →</a></div>`}</section></div>
    <div class="profil-iki-kolon"><section class="profil-panel"><div class="profil-panel-ust"><div><span class="profil-panel-kicker">FORUM</span><h3>Son soruların</h3></div><a class="profil-panel-link" href="forum.html">Tümünü gör →</a></div><div class="profil-soru-listesi">${sorular.slice(0,5).map(s2 => `<button class="profil-soru-oge" onclick="soruDetay('${s2.id}')"><span class="profil-soru-num">?</span><span><b>${kac(s2.baslik)}</b><small>${kac(s2.ders || "Forum")}</small></span><em>→</em></button>`).join("") || `<div class="profil-bos"><strong>Henüz forum sorusu yok.</strong><span>Takıldığın yeri paylaş, yanıtları profilinden takip et.</span><a href="forum.html">Forumda soru sor →</a></div>`}</div></section>
    <section class="profil-panel profil-guvenlik"><div class="profil-panel-ust"><div><span class="profil-panel-kicker">HESAP</span><h3>Hesap güvenliği</h3></div><span class="guvenlik-durum">${ikon("tik",11)} Aktif</span></div><p class="profil-panel-aciklama">Şifreni güncel tut. Oturum güvenliği ve doğrulama işlemleri sunucu tarafında korunur.</p><div class="profil-sifre-satir"><div><strong>Şifre değiştir</strong><span>Yeni şifre en az 6 karakter olmalı.</span></div><div class="profil-sifre-form"><input id="yeniSifre" type="password" class="girdi" placeholder="Yeni şifre" autocomplete="new-password" /><button class="btn btn-birincil btn-kucuk" onclick="parolaGuncelle()">Güncelle</button></div></div></section></div>`;
}

function avatarDosyasiAc() {
  const input = document.getElementById("avatarDosyasi");
  if (input) input.click();
}
async function avatarYukle(dosya) {
  if (!dosya) return;
  try {
    toast("Avatar hazırlanıyor…");
    const veri = await API.avatarOku(dosya);
    const r = await Auth.avatarGuncelle(veri);
    if (!r.ok) return toast(r.hata || "Avatar güncellenemedi.");
    ustBarGuncelle();
    await profilCiz();
    toast("Avatarın güncellendi.");
  } catch (e) { toast(e.message || "Avatar yüklenemedi."); }
  const input = document.getElementById("avatarDosyasi");
  if (input) input.value = "";
}
async function avatarSil() {
  if (!Auth.mevcut()) return;
  const r = await Auth.avatarSil();
  if (!r.ok) return toast(r.hata || "Avatar sıfırlanamadı.");
  ustBarGuncelle();
  await profilCiz();
  toast("Avatar sıfırlandı.");
}

async function parolaGuncelle() {
  const r = await Auth.parolaDegistir(document.getElementById("yeniSifre").value);
  toast(r.ok ? "Şifreniz güncellendi." : r.hata);
}

// --- Yönetim paneli (yalnızca admin) ---
async function adminCiz() {
  const bolum = document.getElementById("yonetim");
  if (!bolum) return;
  const k = Auth.mevcut();
  const uyari = document.getElementById("yonetimUyari");
  if (!k || k.rol !== "admin") {
    bolum.classList.add("hidden");
    if (uyari) uyari.classList.toggle("hidden", !!k);
    return;
  }
  bolum.classList.remove("hidden");
  if (uyari) uyari.classList.add("hidden");
  let uyeler = [];
  try {
    const r = await Auth.uyeleriGetir();
    if (r.hata) { document.getElementById("yonetimIcerik").innerHTML = `<div class="kart p-4 text-slate-500">${r.hata}</div>`; return; }
    uyeler = r.uyeler;
  } catch (e) { document.getElementById("yonetimIcerik").innerHTML = `<div class="kart p-4 text-slate-500">Liste alınamadı.</div>`; return; }
  let ist = { soru: "–", yanit: "–", uye: uyeler.length, ogretmen: uyeler.filter(u => u.rol === "ogretmen").length };
  try {
    const r = await Auth.istatistik();
    if (r.ok && r.veri) ist = { soru: r.veri.soru, yanit: r.veri.yanit, uye: r.veri.uye, ogretmen: r.veri.ogretmen };
    else {
      const l = await Forum.liste({});
      let ys = 0; l.forEach(s => ys += s.yanitlar.length);
      ist = { soru: l.length, yanit: ys, uye: ist.uye, ogretmen: ist.ogretmen };
    }
  } catch (e) {}
  const soruSayisi = ist.soru, yanitSayisi = ist.yanit;
  document.getElementById("yonetimIcerik").innerHTML = `
    <div class="yonetim-hero">
      <div class="yonetim-hero-dekor"></div>
      <div><span class="yonetim-kicker">YÖNETİCİ ÇALIŞMA ALANI</span><h2>Platformu buradan yönet</h2><p>Kullanıcıları, forum hareketlerini, mesaj denetimini ve bildirimleri tek ekrandan takip et.</p></div>
      <div class="yonetim-hero-actions"><button class="btn btn-ikincil btn-kucuk" onclick="adminCiz()">Yenile</button><a class="btn btn-birincil btn-kucuk" href="forum.html">Forumu aç</a></div>
    </div>
    <div class="yonetim-sistem-grid">
      <div class="yonetim-sistem-kart"><span class="yonetim-sistem-ikon yesil">${ikon("tik",17)}</span><div><b>${Auth.sunucuModu() ? "Ortak veritabanı" : "Yerel mod"}</b><small>${Auth.sunucuModu() ? "PostgreSQL bağlantısı aktif" : "Sunucu bağlantısı kapalı"}</small></div></div>
      <div class="yonetim-sistem-kart"><span class="yonetim-sistem-ikon mor">${ikon("kilit",17)}</span><div><b>Güvenlik katmanı</b><small>Gateway · rate-limit · CAPTCHA</small></div></div>
      <div class="yonetim-sistem-kart"><span class="yonetim-sistem-ikon mavi">${ikon("kullanici",17)}</span><div><b>Aktif yönetici</b><small>${kac(k.ad)}</small></div></div>
    </div>
    <div class="yonetim-metrik-grid">
      <div class="yonetim-istatistik"><span class="yonetim-metrik-kicker">TOPLAM</span><div class="yonetim-sayi">${uyeler.length}</div><div class="yonetim-etiket">Kayıtlı kullanıcı</div></div>
      <div class="yonetim-istatistik"><span class="yonetim-metrik-kicker">ROL</span><div class="yonetim-sayi">${uyeler.filter(u => u.rol === "ogretmen").length}</div><div class="yonetim-etiket">Öğretmen</div></div>
      <div class="yonetim-istatistik"><span class="yonetim-metrik-kicker">FORUM</span><div class="yonetim-sayi">${soruSayisi}</div><div class="yonetim-etiket">Forum sorusu</div></div>
      <div class="yonetim-istatistik"><span class="yonetim-metrik-kicker">ETKİLEŞİM</span><div class="yonetim-sayi">${yanitSayisi}</div><div class="yonetim-etiket">Forum yanıtı</div></div>
    </div>
    <div class="yonetim-panel">
      <div class="yonetim-panel-ust"><div><span class="yonetim-kicker koyu">KULLANICI YÖNETİMİ</span><h3>Kullanıcılar ve rol atama</h3><p>Rol, doğrulama, şifre ve hesap işlemlerini buradan yönet.</p></div><span class="yonetim-chip">${uyeler.length} hesap</span></div>
      <div class="p-3 overflow-auto"><table class="tablo yonetim-tablo">
      <tr><th>Ad Soyad</th><th>E-posta / Telefon</th><th>Kayıt</th><th>Rol</th><th>E-posta Onayı</th><th>İşlem</th></tr>
      ${uyeler.map(u => {
        const anaYonetici = (u.id === "u-admin" || u.id === 1);
        const mini = kac(String(u.ad || "K").trim().split(/\s+/).slice(0,2).map(x=>x[0]||"").join("").toUpperCase() || "K");
        return `<tr>
        <td><div class="yonetim-kullanici">${avatarHTML(u.ad, u.avatar, "yonetim-mini-avatar")}<span><b>${kac(u.ad)}</b><small>${u.rol ? rolAdi(u.rol) : "Öğrenci"}</small></span></div></td><td>${kac(u.eposta || u.telefon || "—")}</td><td>${tarihKisa(u.olusturma || u.tarih)}</td>
        <td><select class="girdi" style="max-width:150px" onchange="rolGuncelle('${u.id}',this.value)" ${anaYonetici ? "disabled" : ""}>
          ${["ogrenci", "ogretmen", "veli", "admin"].map(r => `<option value="${r}" ${u.rol === r ? "selected" : ""}>${rolAdi(r)}</option>`).join("")}
        </select></td>
        <td>${(u.eposta_onay === 0 || u.eposta_onay === "0") ? `<button class="arac-btn" onclick="uyeOnaylaYap('${u.id}')">Onayla</button>` : `<span class="etiket etiket-cozuldu">${ikon("tik", 11)} Doğrulandı</span>`}</td>
        <td class="whitespace-nowrap">${!anaYonetici ? `<button class="arac-btn" onclick="sifreVer('${u.id}')">Şifre Ver</button> <button class="arac-btn arac-tehlike" onclick="uyeSil('${u.id}')">Sil</button>` : `<span class="etiket">Ana yönetici</span>`}</td>
      </tr>`; }).join("")}
      </table><p class="yonetim-not">Yeni kayıtlar otomatik olarak <b>Öğrenci</b> olur. Yetkileri gerektiğinde buradan güncelleyebilirsin.</p></div>
    </div>
    <div class="yonetim-iki-kolon">
      <div class="yonetim-panel"><div class="yonetim-panel-ust kompakt"><div><span class="yonetim-kicker koyu">MESAJ DENETİMİ</span><h3>Son özel mesajları incele</h3></div></div><div class="p-3"><div class="yonetim-arama"><input id="denetimQ" class="girdi" placeholder="Mesajlarda ara…" onkeydown="if(event.key==='Enter')denetimCiz()" /><button class="btn btn-ikincil btn-kucuk" onclick="denetimCiz()">Ara</button></div><div id="denetimListe" class="mt-2 space-y-2"><div class="text-[13px] text-slate-400">Yükleniyor…</div></div></div></div>
      <div class="yonetim-panel"><div class="yonetim-panel-ust kompakt"><div><span class="yonetim-kicker koyu">E-POSTA</span><h3>Doğrulama gönderimini test et</h3></div></div><div class="p-3"><div class="yonetim-arama"><input id="testEposta" type="email" class="girdi" placeholder="test@eposta.com" /><button class="btn btn-birincil btn-kucuk" onclick="testEpostaGonder()">Test gönder</button></div><p class="yonetim-yardim">Kayıt kodları için Vercel ortamındaki e-posta ayarları kullanılır.</p></div></div>
    </div>
    <div class="yonetim-panel"><div class="yonetim-panel-ust kompakt"><div><span class="yonetim-kicker koyu">ŞİKAYETLER</span><h3>Kullanıcı bildirimleri</h3></div><div class="yonetim-filtre"><select id="sikayetDurum" class="girdi" onchange="sikayetCiz()"><option value="bekliyor">Bekleyenler</option><option value="tumu">Tümü</option><option value="incelendi">İncelenenler</option></select><button class="btn btn-ikincil btn-kucuk" onclick="sikayetCiz()">Yenile</button></div></div><div class="p-3"><div id="sikayetListe" class="space-y-2"><div class="text-[13px] text-slate-400">Yükleniyor…</div></div></div></div>`;
  denetimCiz();
  sikayetCiz();
}
async function uyeOnaylaYap(id) {
  const r = await Auth.uyeOnayla(id);
  toast(r.ok ? "E-posta onaylandı." : r.hata);
  adminCiz();
}
async function testEpostaGonder() {
  const e = (document.getElementById("testEposta") || {}).value || "";
  if (!e) { toast("Test adresi yazın."); return; }
  toast("Gönderiliyor…");
  const r = await Auth.testEposta(e);
  toast(r.ok ? "Test e-postası gönderildi, gelen kutusunu kontrol edin." : r.hata);
}
async function denetimCiz() {
  if (!Auth.adminMi()) return;
  const q = (document.getElementById("denetimQ") || {}).value || "";
  let l = [];
  try { l = await Mesaj.denetim(q); }
  catch (e) { document.getElementById("denetimListe").innerHTML = `<div class="text-[13px] text-slate-400">${e.message}</div>`; return; }
  document.getElementById("denetimListe").innerHTML = l.map(m => `
    <div class="denetim-oge">
      <div class="text-[12px] text-slate-500"><b class="text-slate-700">${kac(m.g_ad || "Silinmiş Üye")}</b> → <b class="text-slate-700">${kac(m.a_ad || "Silinmiş Üye")}</b> • ${tarihSaat(m.olusturma)}</div>
      <div class="text-[13.5px] mt-1">${kac(m.metin)}</div>
      <div class="mt-1"><button class="arac-btn arac-tehlike" onclick="denetimMesajSil(${m.id})">Mesajı Sil</button></div>
    </div>`).join("") || `<div class="text-[13px] text-slate-400">Kayıt yok.</div>`;
}
async function denetimMesajSil(id) {
  if (!confirm("Bu mesaj silinsin mi?")) return;
  try { await Mesaj.sil(id); }
  catch (e) { toast(e.message); return; }
  denetimCiz(); toast("Mesaj silindi.");
}
async function rolGuncelle(id, rol) {
  const r = await Auth.rolAta(id, rol);
  toast(r.ok ? "Rol güncellendi." : r.hata);
  ustBarGuncelle(); adminCiz();
}
async function uyeSil(id) {
  if (!confirm("Bu kullanıcı silinsin mi?")) return;
  const r = await Auth.kullaniciSil(id);
  toast(r.ok ? "Kullanıcı silindi." : r.hata);
  adminCiz();
}
async function sifreVer(id) {
  const y = prompt("Kullanıcı için yeni şifre (en az 4 karakter):");
  if (!y) return;
  const r = await Auth.sifreSifirla(id, y);
  toast(r.ok ? "Şifre tanımlandı." : r.hata);
}

// --- Hazır ödevler / sınavlar / paylaşımlar ---
const CEKIRDEK_DERSLER = {
  5: ["turkce", "matematik", "fen", "sosyal", "ingilizce", "din"],
  6: ["turkce", "matematik", "fen", "sosyal", "ingilizce", "din"],
  7: ["turkce", "matematik", "fen", "sosyal", "ingilizce", "din"],
  8: ["turkce", "matematik", "fen", "inkilap", "ingilizce", "din"]
};
function odevVerisiVar() { return (typeof ODEV_VERISI !== "undefined") && (typeof SINAV_VERISI !== "undefined"); }
function odevSekme(ad) {
  ["odev", "sinav", "paylasim"].forEach(a => {
    const p = document.getElementById("panel" + a[0].toUpperCase() + a.slice(1));
    if (p) p.classList.toggle("hidden", a !== ad);
    const b = document.getElementById("sekme" + a[0].toUpperCase() + a.slice(1));
    if (b) b.classList.toggle("aktif", a === ad);
  });
  if (ad === "paylasim") paylasimCiz();
}
function odevDersDoldur() {
  const s = document.getElementById("oSinif");
  if (!s || !odevVerisiVar()) return;
  document.getElementById("oDers").innerHTML = (CEKIRDEK_DERSLER[s.value] || []).map(d => {
    const dd = MUfredat.dersler.find(x => x.id === d);
    return `<option value="${d}">${dd ? dd.ad : d}</option>`;
  }).join("");
}
function odevCiz() {
  const alan = document.getElementById("odevListe");
  if (!alan || !odevVerisiVar()) return;
  const sinif = document.getElementById("oSinif").value;
  const ders = document.getElementById("oDers").value;
  const dd = MUfredat.dersler.find(x => x.id === ders);
  const liste = ((ODEV_VERISI[sinif] || {})[ders]) || [];
  alan.innerHTML = liste.map((u, i) => `
    <div class="kart">
      <div class="kart-baslik flex justify-between items-center">
        <span>${i + 1}. Ünite — ${kac(u.u)}</span>
        <button class="arac-btn" onclick="cevapAc('cv-${sinif}-${ders}-${i}',this)">Cevapları Göster</button>
      </div>
      <div class="p-4">
        <ol class="odev-sorular">
          ${u.s.map((sr, j) => `<li><div class="font-semibold text-[13.5px]">${j + 1}) ${kac(sr[0])}</div><div class="cevap-gizli" id="cv-${sinif}-${ders}-${i}-${j}">${kac(sr[1])}</div></li>`).join("")}
        </ol>
      </div>
    </div>`).join("") || `<div class="kart p-4 text-slate-500">Bu ders için ödev bulunamadı.</div>`;
}
function cevapAc(kok, btn) {
  const acik = btn.dataset.acik === "1";
  document.querySelectorAll(`[id^="${kok}-"]`).forEach(el => el.classList.toggle("goster", !acik));
  btn.dataset.acik = acik ? "0" : "1";
  btn.textContent = acik ? "Cevapları Göster" : "Cevapları Gizle";
}
let snSecimler = {}, snKilit = false;
function sinavDersDoldur() {
  const s = document.getElementById("snSinif");
  if (!s || !odevVerisiVar()) return;
  document.getElementById("snDers").innerHTML = (CEKIRDEK_DERSLER[s.value] || []).map(d => {
    const dd = MUfredat.dersler.find(x => x.id === d);
    return `<option value="${d}">${dd ? dd.ad : d}</option>`;
  }).join("");
  snSecimler = {}; snKilit = false;
}
function sinavCiz() {
  const alan = document.getElementById("sinavAlani");
  if (!alan || !odevVerisiVar()) return;
  snSecimler = {}; snKilit = false;
  const sonuc = document.getElementById("sinavSonuc");
  if (sonuc) { sonuc.classList.add("hidden"); sonuc.innerHTML = ""; }
  const sinif = document.getElementById("snSinif").value;
  const ders = document.getElementById("snDers").value;
  const liste = ((SINAV_VERISI[sinif] || {})[ders]) || [];
  alan.innerHTML = liste.map((q, i) => `
    <div class="kart p-4" id="sn-soru-${i}">
      <div class="font-bold text-[14px] text-slate-900">${i + 1}) ${kac(q.s)}</div>
      <div class="secenekler mt-2">
        ${q.o.map((sec, j) => `<button class="secenek" id="sn-${i}-${j}" onclick="sinavSec(${i},${j})"><span class="secenek-harf">${"ABCD"[j]}</span> ${kac(sec)}</button>`).join("")}
      </div>
    </div>`).join("") || `<div class="kart p-4 text-slate-500">Bu ders için sınav bulunamadı.</div>`;
}
function sinavSec(si, oi) {
  if (snKilit) return;
  snSecimler[si] = oi;
  for (let j = 0; j < 4; j++) {
    const b = document.getElementById(`sn-${si}-${j}`);
    if (b) b.classList.toggle("secili", j === oi);
  }
}
function sinavKontrol() {
  const sinif = document.getElementById("snSinif").value;
  const ders = document.getElementById("snDers").value;
  const liste = ((SINAV_VERISI[sinif] || {})[ders]) || [];
  if (!liste.length) return;
  snKilit = true;
  let dogru = 0;
  liste.forEach((q, i) => {
    const sec = snSecimler[i];
    for (let j = 0; j < 4; j++) {
      const b = document.getElementById(`sn-${i}-${j}`);
      if (!b) continue;
      b.classList.remove("secili");
      if (j === q.c) b.classList.add("dogru");
      else if (j === sec) b.classList.add("yanlis");
    }
    if (sec === q.c) dogru++;
  });
  const puan = Math.round((dogru / liste.length) * 100);
  const mesaj = puan >= 85 ? "Mükemmel! Konuya hâkimsin." : puan >= 65 ? "İyi gidiyorsun, yanlışlara tekrar bak." : puan >= 45 ? "Biraz daha çalışmalısın, özetlere göz at." : "Önce konu özetini okuyup tekrar dene.";
  const sonuc = document.getElementById("sinavSonuc");
  sonuc.classList.remove("hidden");
  sonuc.innerHTML = `<div class="sinav-sonuc"><div class="sinav-puan">${puan}</div><div><div class="font-bold">${dogru} / ${liste.length} doğru</div><div class="text-[13px] text-slate-600">${mesaj}</div></div></div>`;
  sonuc.scrollIntoView({ behavior: "smooth", block: "nearest" });
}
let paylasimFiltre = { sinif: "", ders: "", q: "" };
async function paylasimCiz() {
  const alan = document.getElementById("paylasimListe");
  if (!alan) return;
  const ben = Auth.mevcut();
  const formSar = document.getElementById("paylasimFormSar");
  if (formSar) formSar.classList.toggle("hidden", !Paylasim.yazabilir());
  let l = [];
  try { l = await Paylasim.liste(paylasimFiltre); }
  catch (e) { alan.innerHTML = `<div class="kart p-4 text-slate-500">${kac(e.message)}</div>`; return; }
  alan.innerHTML = l.map(p => `
    <div class="kart p-4">
      <div class="flex flex-wrap items-center gap-2 text-[12px]">
        ${p.sinif ? `<span class="etiket">${p.sinif}. Sınıf</span>` : `<span class="etiket">Seçmeli</span>`}
        <span class="etiket">${kac(dersAdi(p.ders, p.sinif))}</span>
        ${p.unite ? `<span class="etiket">${kac(p.unite)}</span>` : ""}
        <span class="etiket etiket-meb">${ikon("kitap", 11)} Öğretmen Paylaşımı</span>
        <span class="ml-auto text-slate-400">${tarihSaat(p.olusturma)} • ${kac(p.yazar_ad)}</span>
      </div>
      <div class="font-bold text-[15px] text-slate-900 mt-2">${kac(p.baslik)}</div>
      <div class="text-[13.5px] text-slate-700 mt-1 whitespace-pre-line">${kac(p.icerik)}</div>
      ${(ben && (ben.rol === "admin" || String(p.yazar_id) === String(ben.id))) ? `<div class="mt-2"><button class="arac-btn arac-tehlike" onclick="paylasimSil('${p.id}')">${ikon("cop", 13)} Sil</button></div>` : ""}
    </div>`).join("") || `<div class="kart p-4 text-slate-500">Henüz paylaşım yok.</div>`;
}
async function paylasimGonder(e) {
  e.preventDefault();
  const o = {
    sinif: document.getElementById("pFSinif").value,
    ders: document.getElementById("pFDers").value,
    unite: document.getElementById("pFUnite").value.trim(),
    baslik: document.getElementById("pFBaslik").value.trim(),
    icerik: document.getElementById("pFIcerik").value.trim()
  };
  try { await Paylasim.ekle(o); }
  catch (e2) { toast(e2.message); return; }
  document.getElementById("pFUnite").value = ""; document.getElementById("pFBaslik").value = ""; document.getElementById("pFIcerik").value = "";
  paylasimCiz(); toast("Paylaşım yayınlandı.");
}
async function paylasimSil(id) {
  if (!confirm("Bu paylaşım silinsin mi?")) return;
  try { await Paylasim.sil(id); }
  catch (e) { toast(e.message); return; }
  paylasimCiz(); toast("Paylaşım silindi.");
}
function odevSayfasiKur() {
  if (!document.getElementById("odevListe") || !odevVerisiVar()) return;
  odevDersDoldur(); odevCiz();
  sinavDersDoldur(); sinavCiz();
  const pd = document.getElementById("pDers");
  if (pd) pd.innerHTML = `<option value="">Ders (tümü)</option>` + MUfredat.dersler.map(d => `<option value="${d.id}">${d.ad}</option>`).join("");
  const pfd = document.getElementById("pFDers");
  if (pfd) pfd.innerHTML = MUfredat.dersler.map(d => `<option value="${d.id}">${d.ad}</option>`).join("");
}

/* Animasyonlar: kayarak belirme, sayaçlar, yukarı düğmesi */
function animasyonKur() {
  try {
    const goz = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("gorunur"); goz.unobserve(e.target); }
    }), { threshold: 0.1 });
    document.querySelectorAll("main section").forEach(el => { el.classList.add("reveal"); goz.observe(el); });
  } catch (e) {}
  const ist = document.getElementById("istKitap");
  if (ist) {
    const hedef = KITAPLAR.filter(k => !k.yakinda).length;
    let simdiki = 0;
    const adim = Math.max(1, Math.round(hedef / 40));
    const say = setInterval(() => {
      simdiki += adim;
      if (simdiki >= hedef) { simdiki = hedef; clearInterval(say); }
      ist.textContent = simdiki;
    }, 30);
  }
  const yukari = document.getElementById("yukariBtn");
  const nav = document.querySelector(".ana-nav");
  window.addEventListener("scroll", () => {
    if (nav) nav.classList.toggle("golge", window.scrollY > 10);
    if (yukari) yukari.classList.toggle("goster", window.scrollY > 600);
  }, { passive: true });
}
function yukariCik() { window.scrollTo({ top: 0, behavior: "smooth" }); }

// --- yardımcılar ---
function tarihKisa(t) { try { return new Date(t).toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric" }); } catch { return ""; } }
function kac(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function avatarBasHarfi(ad) {
  return kac(String(ad || "K").trim().split(/\s+/).slice(0,2).map(x => x[0] || "").join("").toUpperCase() || "K");
}
function avatarHTML(ad, avatar, cls="") {
  const src = typeof avatar === "string" && /^data:image\/(?:png|jpeg|webp);base64,[A-Za-z0-9+/]+={0,2}$/i.test(avatar) ? kac(avatar) : "";
  return src ? `<span class="avatar-gorsel ${cls}"><img src="${src}" alt="" loading="lazy" /></span>` : `<span class="avatar-gorsel avatar-initial ${cls}">${avatarBasHarfi(ad)}</span>`;
}

// --- Şikayetler ---
const SIKAYET_NEDENLERI = ["Hakaret / Küfür", "Spam / Reklam", "Yanlış bilgi", "Kişisel bilgi paylaşımı", "Diğer"];
function sikayetAc(hedef, hedefId) {
  if (!Auth.mevcut()) { authModal("giris"); toast("Şikayet etmek için giriş yapın."); return; }
  document.getElementById("sikayetHedef").value = hedef;
  document.getElementById("sikayetHedefId").value = hedefId;
  document.getElementById("sikayetNeden").selectedIndex = 0;
  document.getElementById("sikayetAciklama").value = "";
  document.getElementById("sikayetModal").classList.remove("hidden");
}
async function sikayetGonder(e) {
  e.preventDefault();
  const hedef = document.getElementById("sikayetHedef").value;
  const hedefId = document.getElementById("sikayetHedefId").value;
  const neden = document.getElementById("sikayetNeden").value;
  const aciklama = document.getElementById("sikayetAciklama").value.trim();
  try { await Forum.sikayetEt(hedef, hedefId, neden, aciklama); }
  catch (e2) { toast(e2.message); return; }
  document.getElementById("sikayetModal").classList.add("hidden");
  toast("Şikayetiniz alındı, yöneticiler inceleyecek.");
}
async function sikayetCiz() {
  if (!Auth.adminMi()) return;
  const durum = ((document.getElementById("sikayetDurum") || {}).value) || "bekliyor";
  let l = [];
  try { l = await Forum.sikayetler(durum === "tumu" ? "" : durum); }
  catch (e) { document.getElementById("sikayetListe").innerHTML = `<div class="text-[13px] text-slate-400">${kac(e.message)}</div>`; return; }
  document.getElementById("sikayetListe").innerHTML = l.map(s => `
    <div class="denetim-oge">
      <div class="text-[12px] text-slate-500">
        <span class="etiket">${s.hedef === "soru" ? "Soru" : s.hedef === "yanit" ? "Yanıt" : "Mesaj"}</span>
        <b class="text-slate-700">${kac(s.neden)}</b> • Bildiren: ${kac(s.bildiren_ad || s.bildiren || "")} • ${tarihSaat(s.olusturma || s.tarih)}
        ${s.durum === "incelendi" ? `<span class="etiket etiket-cozuldu">İncelendi</span>` : `<span class="etiket etiket-bekliyor">Bekliyor</span>`}
      </div>
      <div class="text-[13.5px] mt-1">${kac(s.ozet || "")}</div>
      ${s.aciklama ? `<div class="text-[12.5px] text-slate-500 mt-1">Not: ${kac(s.aciklama)}</div>` : ""}
      <div class="mt-1 flex gap-2 flex-wrap">
        <button class="arac-btn" onclick="sikayetIncele('${s.hedef}','${s.hedef_id}','${s.soru_id || ""}')">İncele</button>
        <button class="arac-btn arac-tehlike" onclick="sikayetIcerikSil('${s.hedef}','${s.hedef_id}','${s.soru_id || ""}','${s.id}')">İçeriği Sil</button>
        ${s.durum !== "incelendi" ? `<button class="arac-btn" onclick="sikayetKapatYap('${s.id}')">Kapat</button>` : ""}
      </div>
    </div>`).join("") || `<div class="text-[13px] text-slate-400">Şikayet yok.</div>`;
}
async function sikayetIncele(hedef, hedefId, soruId) {
  const hedefSoru = hedef === "soru" ? hedefId : (hedef === "yanit" ? soruId : null);
  if (hedefSoru) {
    if (document.body.dataset.sayfa === "forum") soruDetay(hedefSoru);
    else sayfayaGit("forum.html", hedefSoru);
  }
  else { sekmeyeGit("yonetim"); toast("Mesaj içeriğini Mesaj Denetimi bölümünde arayın."); }
}
async function sikayetIcerikSil(hedef, hedefId, soruId, sikayetId) {
  if (!confirm("Şikayet edilen içerik silinsin mi?")) return;
  try {
    if (hedef === "soru") await Forum.soruSil(hedefId);
    else if (hedef === "yanit") await Forum.yanitSil(soruId, hedefId);
    else await Mesaj.sil(hedefId);
    await Forum.sikayetKapat(sikayetId);
  } catch (e) { toast(e.message); return; }
  sikayetCiz(); forumCiz(); toast("İçerik silindi.");
}
async function sikayetKapatYap(id) {
  try { await Forum.sikayetKapat(id); }
  catch (e) { toast(e.message); return; }
  sikayetCiz();
}
function toast(m) {
  const t = document.getElementById("toast");
  t.textContent = m; t.classList.remove("hidden");
  clearTimeout(t._z); t._z = setTimeout(() => t.classList.add("hidden"), 2600);
}
function sekmeyeGit(id) { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: "smooth" }); }
function sayfayaGit(url, soruId) {
  if (soruId) { try { sessionStorage.setItem("ook_ac_soru", soruId); } catch (e) {} }
  location.href = url;
}

// --- sayfa kurulumları ---
function urlParametre(ad) {
  try { return new URLSearchParams(location.search).get(ad) || ""; }
  catch (e) { return ""; }
}
function dersSecenekListesi(sinif) {
  if (!sinif) return MUfredat.dersler;
  const n = String(sinif);
  const ids = [...new Set(KITAPLAR.filter(k => String(k.sinif) === n).map(k => k.ders))];
  return MUfredat.dersler.filter(d => ids.includes(d.id));
}
function kitaplarSayfasiKur() {
  const s5 = document.getElementById("fSinif");
  if (!s5) return;
  filtre.sinif = urlParametre("sinif");
  filtre.ders = urlParametre("ders");
  if (filtre.sinif) Tercih.sinifGor(filtre.sinif);
  if (filtre.sinif && filtre.ders) Tercih.dersGor(filtre.sinif, filtre.ders);
  s5.innerHTML = `<option value="">Tüm Sınıflar (5-8)</option>` + [5, 6, 7, 8].map(s => `<option value="${s}" ${String(filtre.sinif) === String(s) ? "selected" : ""}>${s}. Sınıf</option>`).join("") + `<option value="0" ${filtre.sinif === "0" ? "selected" : ""}>Ortaokul Seçmeli</option>`;
  document.getElementById("fDers").innerHTML = `<option value="">Tüm Dersler</option>` + MUfredat.dersler.map(d => `<option value="${d.id}" ${filtre.ders === d.id ? "selected" : ""}>${d.ad}</option>`).join("");
  kitapListesiniCiz();
  if (filtre.sinif) Tercih.sinifGor(filtre.sinif);
  if (filtre.sinif && filtre.ders) Tercih.dersGor(filtre.sinif, filtre.ders);
}
function sinifSayfasiKur() {
  const sinif = document.body.dataset.sinif || "";
  if (!sinif || !document.getElementById("kitaplar")) return;
  filtre.sinif = sinif; filtre.ders = ""; filtre.kaynak = ""; filtre.q = "";
  const dEl = document.getElementById("fDers");
  if (dEl) dEl.innerHTML = `<option value="">Tüm Dersler</option>` + dersSecenekListesi(sinif).map(d => `<option value="${d.id}">${d.ad}</option>`).join("");
  kitapListesiniCiz();
}
async function sonSorularCiz() {
  const alan = document.getElementById("sonSorular");
  if (!alan) return;
  let l = [];
  try { l = (await Forum.liste({})).slice(0, 3); }
  catch (e) { alan.innerHTML = `<div class="kart p-4 text-[13px] text-slate-400">Sorular yüklenemedi.</div>`; return; }
  alan.innerHTML = l.map((x, bi) => `
    <div class="kart forum-giris p-4" style="animation-delay:${Math.min(bi * 40, 240)}ms">
      <div class="flex flex-wrap items-center gap-2 text-[12px]">
        <span class="etiket">${x.sinif}. Sınıf</span>
        <span class="etiket">${dersAdi(x.ders, x.sinif)}</span>
        ${x.cozuldu ? `<span class="etiket etiket-cozuldu">${ikon("tik", 11)} Çözüldü</span>` : `<span class="etiket etiket-bekliyor">Yanıt bekliyor</span>`}
      </div>
      <button class="font-bold text-[15px] text-slate-900 mt-2 hover:text-blue-800 text-left" onclick="sayfayaGit('forum.html','${x.id}')">${kac(x.baslik)}</button>
      <p class="text-[13px] text-slate-500 mt-1">${kac(x.govde.slice(0, 120))}${x.govde.length > 120 ? "…" : ""}</p>
    </div>`).join("") || `<div class="kart p-4 text-slate-500">Henüz soru yok.</div>`;
}
function istatistikleriCiz() {
  const el = document.getElementById("istKitap");
  if (el) el.textContent = KITAPLAR.filter(k => !k.yakinda).length;
}
function forumSayfasiKur() {
  if (!document.getElementById("forumListe")) return;
  document.getElementById("ffSinif").innerHTML = `<option value="">Sınıf (tümü)</option>` + [5, 6, 7, 8].map(s => `<option value="${s}">${s}. Sınıf</option>`).join("");
  document.getElementById("ffDers").innerHTML = `<option value="">Ders (tümü)</option>` + MUfredat.dersler.map(d => `<option value="${d.id}">${d.ad}</option>`).join("");
  document.getElementById("sSinif").innerHTML = [5, 6, 7, 8].map(s => `<option value="${s}">${s}. Sınıf</option>`).join("");
  dersUniteDoldur();
  forumCiz().then(() => {
    let bekleyen = null;
    try { bekleyen = sessionStorage.getItem("ook_ac_soru"); sessionStorage.removeItem("ook_ac_soru"); } catch (e) {}
    if (bekleyen) soruDetay(bekleyen);
  });
}

// --- ilk yükleme ---
document.addEventListener("DOMContentLoaded", async () => {
  document.documentElement.classList.add("js-anim");
  const sayfa = document.body.dataset.sayfa || "index";
  if (sayfa === "kayit") { await kayitSayfasiBaslat(); return; }
  if (sayfa === "giris") { await girisSayfasiBaslat(); return; }
  if (!document.getElementById("iskelet-ust")) return;
  try {
    Layout.kur();
    animasyonKur();
    const uzak = await Auth.baslat();
    if (API.engelli) {
      if (window.Guvenlik) Guvenlik.banEkrani(API.banBitis || 0);
      return;
    }
    await Tercih.baslat();
    const rozet = document.getElementById("modRozeti");
    if (rozet) rozet.textContent = uzak ? "Ortak veritabanına bağlı" : "Yerel mod (sunucu yok)";
    ustBarGuncelle();
    girisYapilandir();
    kitapListesiniCiz();
    resmiKaynaklariCiz();
    if (sayfa === "index") { istatistikleriCiz(); sonSorularCiz(); await onerilenlerCiz(); }
    if (sayfa === "kitaplar") kitaplarSayfasiKur();
    if (sayfa.startsWith("sinif") || sayfa === "secmeli") { sinifSayfasiKur(); if (document.body.dataset.sinif) Tercih.sinifGor(document.body.dataset.sinif); }
    if (sayfa === "forum") forumSayfasiKur();
    if (sayfa === "odevler") odevSayfasiKur();
    await forumCiz();
    await profilCiz();
    await adminCiz();
    await mesajlariCiz();
    SohbetCanli.baslat();
  } finally {
    setTimeout(() => document.querySelectorAll(".reveal").forEach(e => e.classList.add("gorunur")), 1800);
  }
  try { reklamKur(); } catch (e) {}
  setInterval(() => {
    const a = document.getElementById("sayfaNo"), b = document.getElementById("sayfaNoAlt");
    if (a && b) b.textContent = "Sayfa " + a.textContent;
  }, 500);
});
if (location.hash === "#giris") setTimeout(() => { try { authModal("giris"); } catch (e) {} }, 120);

function dersUniteDoldur() {
  if (!document.getElementById("sSinif")) return;
  const sinif = document.getElementById("sSinif").value || "5";
  const ders = document.getElementById("sDers").value || "matematik";
  const dersler = sinif == "8"
    ? MUfredat.dersler.filter(d => ["turkce", "matematik", "fen", "inkilap", "ingilizce", "din"].includes(d.id))
    : MUfredat.dersler.filter(d => ["turkce", "matematik", "fen", "sosyal", "ingilizce", "din"].includes(d.id));
  document.getElementById("sDers").innerHTML = dersler.map(d => `<option value="${d.id}" ${d.id === ders ? "selected" : ""}>${d.ad}</option>`).join("");
  const gercekDers = document.getElementById("sDers").value;
  const uniteler = (MUfredat.uniteler[sinif] && MUfredat.uniteler[sinif][gercekDers]) || [];
  document.getElementById("sUnite").innerHTML = uniteler.map(u => `<option>${u}</option>`).join("");
}
async function soruGonder(e) {
  e.preventDefault();
  const baslik = document.getElementById("sBaslik").value.trim();
  const govde = document.getElementById("sGovde").value.trim();
  if (baslik.length < 8 || govde.length < 10) { toast("Başlık ve açıklama biraz daha detaylı olmalı."); return; }
  if (Auth.sunucuModu() && !Auth.mevcut()) { authModal("giris"); toast("Soru sormak için giriş yapın."); return; }
  const veri = {
    sinif: document.getElementById("sSinif").value,
    ders: document.getElementById("sDers").value,
    unite: document.getElementById("sUnite").value, baslik, govde
  };
  const temizle = () => {
    document.getElementById("sBaslik").value = ""; document.getElementById("sGovde").value = ""; document.getElementById("sGorsel").value = "";
    forumCiz(); toast("Sorunuz yayınlandı.");
  };
  const dosya = document.getElementById("sGorsel").files[0];
  let gorsel = null;
  if (dosya) {
    try { gorsel = await API.dosyaOku(dosya); }
    catch (e2) { toast(e2.message); return; }
  }
  try { await Forum.soruEkle({ ...veri, gorsel }); temizle(); }
  catch (e2) { toast(e2.message); }
}
