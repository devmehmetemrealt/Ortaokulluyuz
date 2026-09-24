/* Ortaokulluyuz — ana uygulama */
let filtre = { sinif: "", ders: "", q: "", kaynak: "" };
let forumFiltre = { sinif: "", ders: "", q: "", durum: "" };

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
  alan.innerHTML = liste.map(k => {
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
        <a class="btn btn-ikincil btn-kucuk" target="_blank" rel="noopener" href="${k.pdfUrl}">${ikon("indir", 14)} PDF İndir</a>
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
    return `<div class="kart kart-kitap golge-hafif overflow-hidden flex flex-col">
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
  if (f.includes(id)) Auth.favoriCikar(id); else Auth.favoriEkle(id);
  kitapListesiniCiz(); profilCiz();
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
  listeEl.innerHTML = s.map(x => `
    <div class="kart p-4">
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
    <div class="mesaj-duyuru">Özel mesajlar, güvenlik denetimi kapsamında yöneticiler tarafından görüntülenebilir. Kişisel bilgilerinizi (telefon, adres) paylaşmayın.</div>
    <div class="mesaj-grid">
      <div>
        <div class="mesaj-yan-baslik">Sohbetler</div>
        <div class="sohbet-liste">
          ${veri.sohbetler.map(s => `
            <button class="sohbet-oge ${String(Mesaj._acikSohbet) === String(s.karsi_id) ? "aktif" : ""}" data-karsi="${s.karsi_id}" onclick="sohbetAc('${s.karsi_id}')">
              <span class="sohbet-ad">${kac(s.karsi_ad)} ${s.okunmamis ? `<span class="sayac">${s.okunmamis}</span>` : ""}</span>
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
}
async function sohbetAc(karsiId) {
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
  mesajlariRozetYenile();
}
function sohbetAcIcerik(v) {
  const ben = Auth.mevcut();
  const alan = document.getElementById("mesajPencere");
  if (!alan) return;
  alan.innerHTML =
    `<div class="mesaj-karsi">${kac(v.karsi.ad)}</div>` +
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
  const kutu = document.getElementById("mesajMetin");
  try { await Mesaj.gonder(Mesaj._acikSohbet, kutu.value); }
  catch (e2) { toast(e2.message); return; }
  kutu.value = "";
  sohbetAc(Mesaj._acikSohbet); mesajlariCiz();
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
        <span class="sohbet-ad">${kac(s.karsi_ad)} ${s.okunmamis ? `<span class="sayac">${s.okunmamis}</span>` : ""}</span>
        <span class="sohbet-son">${kac(String(s.son_metin).slice(0, 48))}${s.son_metin.length > 48 ? "…" : ""}</span>
      </button>`).join("") || `<div class="text-[13px] text-slate-400 p-2">Henüz sohbet yok. Aşağıdan kişi seçerek başlayın.</div>`;
  }
};

// --- Auth modal / profil ---
function authModal(mod = "giris") {
  document.getElementById("authModal").classList.remove("hidden");
  authSekme(mod);
}
function authSekme(mod) {
  const giris = mod === "giris";
  document.getElementById("girisForm").classList.toggle("hidden", !giris);
  document.getElementById("kayitForm").classList.toggle("hidden", giris);
  document.getElementById("dogrulamaForm").classList.add("hidden");
  document.getElementById("sekmeGiris").className = "auth-sekme" + (giris ? " aktif" : "");
  document.getElementById("sekmeKayit").className = "auth-sekme" + (!giris ? " aktif" : "");
}
function sifreGoster(id, btn) {
  const i = document.getElementById(id);
  if (!i) return;
  i.type = i.type === "password" ? "text" : "password";
  btn.innerHTML = ikon(i.type === "password" ? "goz" : "gozKapali", 17);
}
async function girisYap(e) {
  e.preventDefault();
  const ep = document.getElementById("gEposta").value.trim();
  const r = await Auth.giris(ep, document.getElementById("gSifre").value);
  if (r.hata) {
    if (String(r.hata).startsWith("E-POSTA-DOGRULAMA-GEREK")) { dogrulamaEkraniGoster(ep, ""); return; }
    return toast(r.hata);
  }
  document.getElementById("authModal").classList.add("hidden");
  ustBarGuncelle(); profilCiz(); adminCiz(); forumCiz(); mesajlariCiz(); toast("Hoş geldiniz, " + r.kullanici.ad + ".");
}
async function kayitYap(e) {
  e.preventDefault();
  const ad = document.getElementById("kAd").value.trim();
  const ep = document.getElementById("kEposta").value.trim();
  const sf = document.getElementById("kSifre").value;
  if (ad.length < 3 || sf.length < 4) return toast("Ad ve şifreyi kontrol edin (şifre en az 4 karakter).");
  let r;
  try { r = await Auth.kayit(ad, ep, sf); }
  catch (e2) { return toast("Kayıt sırasında bağlantı hatası."); }
  if (r.hata) return toast(r.hata);
  if (r.dogrulama_gerekli) {
    dogrulamaEkraniGoster(r.eposta || ep, r.posta_hatasi || "");
    return;
  }
  document.getElementById("authModal").classList.add("hidden");
  ustBarGuncelle(); profilCiz(); adminCiz(); toast("Kaydınız oluşturuldu. Hesabınız öğrenci olarak açıldı.");
}
let _dogrulamaEposta = "", _kodSayac = null;
function dogrulamaEkraniGoster(eposta, postaHatali) {
  _dogrulamaEposta = eposta;
  document.getElementById("girisForm").classList.add("hidden");
  document.getElementById("kayitForm").classList.add("hidden");
  const d = document.getElementById("dogrulamaForm");
  d.classList.remove("hidden");
  document.getElementById("dogrulamaEposta").textContent = eposta;
  document.getElementById("dogrulamaUyari").textContent = postaHatali
    ? "Uyarı: e-posta gönderilemedi (" + postaHatali + "). Kod ulaşmazsa yöneticiden manuel onay isteyin."
    : "6 haneli kod e-postanıza gönderildi. 15 dakika geçerlidir.";
  document.getElementById("dogrulamaKod").value = "";
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
  const r = await Auth.dogrula(_dogrulamaEposta, kod);
  if (r.hata) return toast(r.hata);
  document.getElementById("authModal").classList.add("hidden");
  document.getElementById("dogrulamaForm").classList.add("hidden");
  ustBarGuncelle(); profilCiz(); adminCiz(); forumCiz(); mesajlariCiz();
  toast("E-postanız doğrulandı, hoş geldiniz!");
}
async function kodTekrarGonder() {
  const r = await Auth.kodTekrar(_dogrulamaEposta);
  if (r.hata) return toast(r.hata);
  toast("Yeni kod gönderildi.");
  kodSayacBaslat();
}
async function cikisYap() {
  await Auth.cikis();
  Mesaj._acikSohbet = null; mesajRozetGuncelle(0);
  ustBarGuncelle(); profilCiz(); adminCiz(); forumCiz(); kitapListesiniCiz(); mesajlariCiz(); toast("Çıkış yapıldı.");
}
function ustBarGuncelle() {
  const alan = document.getElementById("girisAlani");
  if (!alan) return;
  const k = Auth.mevcut();
  alan.innerHTML = k
    ? `<span class="text-[13px] text-slate-600">${ikon("kullanici", 15)} <b>${kac(k.ad)}</b> <span class="etiket ml-1">${rolAdi(k.rol)}</span></span>
       ${k.rol === "admin" ? `<a class="btn btn-birincil btn-kucuk" href="yonetim.html">Yönetim</a>` : ""}
       <a class="btn btn-ikincil btn-kucuk" href="profil.html">Profilim</a>
       <button class="btn btn-ikincil btn-kucuk" onclick="cikisYap()">Çıkış</button>`
    : `<button class="btn btn-ikincil btn-kucuk" onclick="authModal('giris')">Giriş Yap</button>
       <button class="btn btn-birincil btn-kucuk" onclick="authModal('kayit')">Kayıt Ol</button>`;
}
async function profilCiz() {
  const k = Auth.mevcut();
  const alan = document.getElementById("profilIcerik");
  if (!alan) return;
  if (!k) { alan.innerHTML = `<p class="text-[13.5px] text-slate-500">Profil özelliklerinden yararlanmak için <button class="text-blue-800 font-semibold" onclick="authModal('giris')">giriş yapın</button>. Favori kitaplar, sayfa notları ve forum hareketleriniz burada listelenir.</p>`; return; }
  const favs = Auth.favoriler().map(id => KITAPLAR.find(x => x.id === id)).filter(Boolean);
  let sorular = (Forum._sonListe || []).filter(x => x.yazar.startsWith(k.ad));
  if (!sorular.length && Auth.sunucuModu()) {
    try { const l = await Forum.liste({}); sorular = l.filter(x => x.yazar.startsWith(k.ad)); } catch (e) {}
  }
  let notSayisi = 0; for (let i = 0; i < localStorage.length; i++) { const anahtar = localStorage.key(i); if (anahtar && anahtar.startsWith("ook_not_")) notSayisi++; }
  alan.innerHTML = `
    <div class="grid md:grid-cols-3 gap-3">
      <div class="border border-slate-200 rounded-lg p-3"><div class="font-bold text-[13px] text-slate-700 profil-ico">${ikonYildiz(true, 14)} Favori Kitaplar (${favs.length})</div>
        <div class="mt-2 space-y-1 text-[13px]">${favs.map(f => `<button class="text-blue-800 hover:underline" onclick="Reader.ac('${f.id}')">${f.baslik}</button>`).join("") || `<span class="text-slate-400">Henüz favori yok.</span>`}</div></div>
      <div class="border border-slate-200 rounded-lg p-3"><div class="font-bold text-[13px] text-slate-700 profil-ico">${ikon("kalem", 14)} Kaydedilen Sayfa Notları (${notSayisi})</div>
        <p class="text-[12.5px] text-slate-500 mt-1">Z-Kitap'ta kalemle yazdıklarınız bu cihazda saklanır. Okuyucuda kaldığınız sayfayı açtığınızda notlarınız geri yüklenir.</p>
        <div class="mt-2 border-t pt-2"><div class="font-bold text-[13px] text-slate-700">Şifre Değiştir</div>
        <div class="flex gap-2 mt-1"><input id="yeniSifre" type="password" class="girdi" placeholder="Yeni şifre (en az 6 karakter)" /><button class="btn btn-ikincil btn-kucuk" onclick="parolaGuncelle()">Kaydet</button></div></div></div>
      <div class="border border-slate-200 rounded-lg p-3"><div class="font-bold text-[13px] text-slate-700 profil-ico">${ikon("yorum", 14)} Sorularım (${sorular.length})</div>
        <div class="mt-2 space-y-1 text-[13px]">${sorular.map(s2 => `<button class="text-blue-800 hover:underline" onclick="soruDetay('${s2.id}')">${s2.baslik}</button>`).join("") || `<span class="text-slate-400">Henüz soru sormadınız.</span>`}</div></div>
    </div>`;
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
    <div class="grid md:grid-cols-4 gap-3 mb-4">
      <div class="yonetim-istatistik"><div class="yonetim-sayi">${uyeler.length}</div><div class="yonetim-etiket">Kayıtlı kullanıcı</div></div>
      <div class="yonetim-istatistik"><div class="yonetim-sayi">${uyeler.filter(u => u.rol === "ogretmen").length}</div><div class="yonetim-etiket">Öğretmen</div></div>
      <div class="yonetim-istatistik"><div class="yonetim-sayi">${soruSayisi}</div><div class="yonetim-etiket">Forum sorusu</div></div>
      <div class="yonetim-istatistik"><div class="yonetim-sayi">${yanitSayisi}</div><div class="yonetim-etiket">Forum yanıtı</div></div>
    </div>
    <div class="kart-baslik">Kullanıcılar ve Rol Atama</div>
    <div class="p-3 overflow-auto"><table class="tablo">
      <tr><th>Ad Soyad</th><th>E-posta</th><th>Kayıt</th><th>Rol</th><th>E-posta Onayı</th><th>İşlem</th></tr>
      ${uyeler.map(u => {
        const anaYonetici = (u.id === "u-admin" || u.id === 1);
        return `<tr>
        <td>${u.ad}</td><td>${u.eposta}</td><td>${tarihKisa(u.olusturma || u.tarih)}</td>
        <td><select class="girdi" style="max-width:150px" onchange="rolGuncelle('${u.id}',this.value)" ${anaYonetici ? "disabled" : ""}>
          ${["ogrenci", "ogretmen", "veli", "admin"].map(r => `<option value="${r}" ${u.rol === r ? "selected" : ""}>${rolAdi(r)}</option>`).join("")}
        </select></td>
        <td>${(u.eposta_onay === 0 || u.eposta_onay === "0") ? `<button class="arac-btn" onclick="uyeOnaylaYap('${u.id}')">Onayla</button>` : `<span class="etiket etiket-cozuldu">${ikon("tik", 11)} Doğrulandı</span>`}</td>
        <td class="whitespace-nowrap">${!anaYonetici ? `<button class="arac-btn" onclick="sifreVer('${u.id}')">Şifre Ver</button> <button class="arac-btn arac-tehlike" onclick="uyeSil('${u.id}')">Sil</button>` : `<span class="etiket">Ana yönetici</span>`}</td>
      </tr>`; }).join("")}
    </table>
    <p class="text-[12px] text-slate-400 mt-2">Yeni kayıtlar otomatik olarak <b>Öğrenci</b> olur. Öğretmen ve veli yetkisini buradan tanımlayın.</p></div>
    <div class="kart-baslik mt-4">Mesaj Denetimi <span class="text-[11px]" style="font-weight:400">— son 100 özel mesaj; sorunlu içerikleri buradan silebilirsiniz</span></div>
    <div class="p-3">
      <div class="flex gap-2"><input id="denetimQ" class="girdi" placeholder="Mesajlarda ara…" onkeydown="if(event.key==='Enter')denetimCiz()" /><button class="btn btn-ikincil btn-kucuk" onclick="denetimCiz()">Ara</button></div>
      <div id="denetimListe" class="mt-2 space-y-2"><div class="text-[13px] text-slate-400">Yükleniyor…</div></div>
    </div>
    <div class="kart-baslik mt-4">E-posta Ayarı Testi</div>
    <div class="p-3 flex gap-2 flex-wrap items-center">
      <input id="testEposta" type="email" class="girdi" style="max-width:260px" placeholder="test@eposta.com" />
      <button class="btn btn-ikincil btn-kucuk" onclick="testEpostaGonder()">Test E-postası Gönder</button>
      <span class="text-[12px] text-slate-400">Kayıt kodları için Vercel panelindeki Brevo ayarları kullanılır.</span>
    </div>
    <div class="kart-baslik mt-4">Şikayetler <span class="text-[11px]" style="font-weight:400">— kullanıcı bildirimleri; içeriği inceleyip silebilirsiniz</span></div>
    <div class="p-3">
      <div class="flex gap-2 items-center">
        <select id="sikayetDurum" class="girdi" style="max-width:200px" onchange="sikayetCiz()">
          <option value="bekliyor">Bekleyenler</option><option value="tumu">Tümü</option><option value="incelendi">İncelenenler</option>
        </select>
        <button class="btn btn-ikincil btn-kucuk" onclick="sikayetCiz()">Yenile</button>
      </div>
      <div id="sikayetListe" class="mt-2 space-y-2"><div class="text-[13px] text-slate-400">Yükleniyor…</div></div>
    </div>`;
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

// --- yardımcılar ---
function tarihKisa(t) { try { return new Date(t).toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric" }); } catch { return ""; } }
function kac(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

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
  s5.innerHTML = `<option value="">Tüm Sınıflar (5-8)</option>` + [5, 6, 7, 8].map(s => `<option value="${s}" ${String(filtre.sinif) === String(s) ? "selected" : ""}>${s}. Sınıf</option>`).join("") + `<option value="0" ${filtre.sinif === "0" ? "selected" : ""}>Ortaokul Seçmeli</option>`;
  document.getElementById("fDers").innerHTML = `<option value="">Tüm Dersler</option>` + MUfredat.dersler.map(d => `<option value="${d.id}" ${filtre.ders === d.id ? "selected" : ""}>${d.ad}</option>`).join("");
  kitapListesiniCiz();
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
  alan.innerHTML = l.map(x => `
    <div class="kart p-4">
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
  Layout.kur();
  const sayfa = document.body.dataset.sayfa || "index";
  const uzak = await Auth.baslat();
  const rozet = document.getElementById("modRozeti");
  if (rozet) rozet.textContent = uzak ? "Ortak veritabanına bağlı" : "Yerel mod (sunucu yok)";
  ustBarGuncelle();
  kitapListesiniCiz();
  resmiKaynaklariCiz();
  if (sayfa === "index") { istatistikleriCiz(); sonSorularCiz(); }
  if (sayfa === "kitaplar") kitaplarSayfasiKur();
  if (sayfa.startsWith("sinif") || sayfa === "secmeli") sinifSayfasiKur();
  if (sayfa === "forum") forumSayfasiKur();
  await forumCiz();
  await profilCiz();
  await adminCiz();
  await mesajlariCiz();
  SohbetCanli.baslat();
  setInterval(() => {
    const a = document.getElementById("sayfaNo"), b = document.getElementById("sayfaNoAlt");
    if (a && b) b.textContent = "Sayfa " + a.textContent;
  }, 500);
});
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
