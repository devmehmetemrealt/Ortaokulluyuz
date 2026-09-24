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
      <img class="amblem-img" src="img/logo.svg?v=7" alt="Ortaokulluyuz logosu" />
      <span>
        <span class="marka-ad">Ortaokulluyuz</span>
        <span class="marka-alt">Dijital Ders Kitabı ve Eğitim Platformu • 5-8. Sınıflar</span>
      </span>
    </a>
    <nav class="ust-menu">
      <a data-nav="index" href="index.html">Anasayfa</a>
      <a data-nav="kitaplar" href="kitaplar.html">Tüm Kitaplar</a>
      <a data-nav="sinif-5" href="sinif-5.html">5. Sınıf</a>
      <a data-nav="sinif-6" href="sinif-6.html">6. Sınıf</a>
      <a data-nav="sinif-7" href="sinif-7.html">7. Sınıf</a>
      <a data-nav="sinif-8" href="sinif-8.html">8. Sınıf</a>
      <a data-nav="secmeli" href="secmeli.html">Seçmeli</a>
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
      <option value="sinif-5.html">5. Sınıf Kitapları</option>
      <option value="sinif-6.html">6. Sınıf Kitapları</option>
      <option value="sinif-7.html">7. Sınıf Kitapları</option>
      <option value="sinif-8.html">8. Sınıf Kitapları</option>
      <option value="secmeli.html">Seçmeli Ders Kitapları</option>
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
      <div class="alt-metin"><a href="kitaplar.html">Tüm Kitaplar</a> • <a href="forum.html">Ödev Forumu</a> • <a href="mesajlar.html">Mesajlar</a> • <a href="profil.html">Profilim</a> • <a href="yardim.html">Yardım</a></div>
      <div class="alt-metin"><a href="sinif-5.html">5. Sınıf</a> • <a href="sinif-6.html">6. Sınıf</a> • <a href="sinif-7.html">7. Sınıf</a> • <a href="sinif-8.html">8. Sınıf</a> • <a href="secmeli.html">Seçmeli Dersler</a></div>
    </div>
    <div>
      <div class="alt-baslik">Resmî Bağlantılar</div>
      <div class="alt-metin"><a href="https://tymm.meb.gov.tr/ders-kitaplari/temel-egitim" target="_blank" rel="noopener">MEB Ders Kitapları</a> • <a href="https://ogmmateryal.eba.gov.tr" target="_blank" rel="noopener">OGM Materyal</a> • <a href="https://mebi.eba.gov.tr" target="_blank" rel="noopener">MEBİ</a></div>
      <div class="alt-metin alt-not">Resmî MEB yayını değildir. Kitap PDF'leri MEB sunucularından sunulur.</div>
    </div>
  </div>
  <div class="alt-cizgi">© 2025-2026 Ortaokulluyuz Eğitim Platformu</div>
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
      <img class="amblem-img" src="img/logo.svg?v=7" alt="Ortaokulluyuz logosu" />
      <div><div class="auth-baslik">Ortaokulluyuz'a hoş geldiniz</div>
      <div class="auth-alt">Öğrenci, öğretmen ve veliler için ortak eğitim platformu</div></div>
    </div>
    <div class="auth-sekmeler">
      <button id="sekmeGiris" onclick="authSekme('giris')">Giriş Yap</button>
      <button id="sekmeKayit" onclick="authSekme('kayit')">Kayıt Ol</button>
    </div>
    <form id="girisForm" class="auth-form" onsubmit="girisYap(event)">
      <label class="auth-etiket">E-posta adresiniz</label>
      <input id="gEposta" type="email" required class="girdi auth-girdi" placeholder="ornek@eposta.com" />
      <label class="auth-etiket">Şifreniz</label>
      <div class="sifre-sar">
        <input id="gSifre" type="password" required class="girdi auth-girdi" placeholder="••••••" />
        <button type="button" class="sifre-goz" onclick="sifreGoster('gSifre',this)" title="Göster/Gizle"><svg class="ikon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg></button>
      </div>
      <button class="btn btn-birincil w-full justify-center auth-btn">Giriş Yap</button>
      <button type="button" class="auth-vazgec" onclick="document.getElementById('authModal').classList.add('hidden')">Vazgeç</button>
    </form>
    <form id="kayitForm" class="auth-form hidden" onsubmit="kayitYap(event)">
      <label class="auth-etiket">Ad Soyad</label>
      <input id="kAd" required class="girdi auth-girdi" placeholder="Adınız Soyadınız" />
      <label class="auth-etiket">E-posta adresiniz</label>
      <input id="kEposta" type="email" required class="girdi auth-girdi" placeholder="ornek@eposta.com" />
      <label class="auth-etiket">Şifre <span class="auth-ipucu">(en az 4 karakter)</span></label>
      <div class="sifre-sar">
        <input id="kSifre" type="password" required class="girdi auth-girdi" placeholder="Güçlü bir şifre seçin" />
        <button type="button" class="sifre-goz" onclick="sifreGoster('kSifre',this)" title="Göster/Gizle"><svg class="ikon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg></button>
      </div>
      <button class="btn btn-birincil w-full justify-center auth-btn">Kayıt Ol</button>
      <p class="auth-not">E-postanıza <b>doğrulama kodu</b> gönderilecek. Hesabınız <b>öğrenci</b> olarak açılır; öğretmen ve veli yetkisi yönetici tarafından tanımlanır.</p>
      <button type="button" class="auth-vazgec" onclick="document.getElementById('authModal').classList.add('hidden')">Vazgeç</button>
    </form>
    <form id="dogrulamaForm" class="auth-form hidden" onsubmit="dogrulaYap(event)">
      <div class="dogrulama-kutu"><svg class="ikon" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#1b4f9c" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></div>
      <div class="auth-baslik text-center">E-postanızı doğrulayın</div>
      <p class="auth-not text-center"><b id="dogrulamaEposta"></b> adresine gönderilen 6 haneli kodu yazın.</p>
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
<div id="bildirimAlani"></div>`;
  }
};
