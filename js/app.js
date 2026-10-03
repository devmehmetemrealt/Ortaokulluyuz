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
    `<div class="mesaj-karsi mesaj-karsi-ust"><div><b>${kac(v.karsi.ad)}</b><span>Özel sohbet</span></div><div class="mesaj-karsi-aksiyon"><button class="arac-btn" title="Sesli ara" data-sesli-id="${kac(v.karsi.id)}" data-sesli-ad="${kac(v.karsi.ad)}" onclick="Sesli.araFromButton(this)">🎙️ Sesli ara</button></div></div>` +
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
        <span class="sohbet-ad">${kac(s.karsi_ad)} ${s.okunmamis ? `<span class="sayac">${s.okunmamis}</span>` : ""}</span>
        <span class="sohbet-son">${kac(String(s.son_metin).slice(0, 48))}${s.son_metin.length > 48 ? "…" : ""}</span>
      </button>`).join("") || `<div class="text-[13px] text-slate-400 p-2">Henüz sohbet yok. Aşağıdan kişi seçerek başlayın.</div>`;
  }
};

// --- Auth modal / profil ---
function authModal(mod = "giris") {
  document.getElementById("authModal").classList.remove("hidden");
  authSekme(mod);
  if (Auth.sunucuModu() && window.Guvenlik) Guvenlik.hazirla(mod === 'giris' ? 'girisCaptcha' : 'kayitCaptcha');
}
function authSekme(mod) {
  const giris = mod === "giris";
  document.getElementById("girisForm").classList.toggle("hidden", !giris);
  document.getElementById("kayitForm").classList.toggle("hidden", giris);
  document.getElementById("dogrulamaForm").classList.add("hidden");
  document.getElementById("sekmeGiris").className = "auth-sekme" + (giris ? " aktif" : "");
  document.getElementById("sekmeKayit").className = "auth-sekme" + (!giris ? " aktif" : "");
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
    if (String(r.hata).startsWith("E-POSTA-DOGRULAMA-GEREK")) { dogrulamaEkraniGoster(ep, "eposta", ""); return; }
    return toast(r.hata);
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
  document.getElementById("authModal").classList.add("hidden");
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
  document.getElementById("girisForm").classList.add("hidden");
  document.getElementById("kayitForm").classList.add("hidden");
  const d = document.getElementById("dogrulamaForm");
  d.classList.remove("hidden");
  document.getElementById("dogrulamaEposta").textContent = hedef;
  document.getElementById("dogrulamaKanalYazi").textContent = _dogrulamaKanal === "telefon" ? "telefonunuza" : "e-postanıza";
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
  const r = await Auth.dogrula(_dogrulamaHedef, kod);
  if (r.hata) return toast(r.hata);
  document.getElementById("authModal").classList.add("hidden");
  document.getElementById("dogrulamaForm").classList.add("hidden");
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
async function cikisYap() {
  await Auth.cikis();
  Mesaj._acikSohbet = null; mesajRozetGuncelle(0);
  ustBarGuncelle(); profilCiz(); adminCiz(); forumCiz(); kitapListesiniCiz(); mesajlariCiz(); onerilenlerCiz(); toast("Çıkış yapıldı.");
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
        <span class="kullanici-avatar">${bas}</span>
        <span class="kullanici-metin"><b>${ad}</b><small>${k.rol === "admin" ? "Yönetici" : rolAdi(k.rol)}</small></span>
        <span class="kullanici-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="kullanici-panel">
        <div class="kullanici-panel-ust">
          <div class="kullanici-panel-avatar">${bas}</div>
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
    alan.innerHTML = `<div class="misafir-butonlari"><button class="btn btn-ikincil btn-kucuk" onclick="authModal('giris')">Giriş Yap</button><button class="btn btn-birincil btn-kucuk" onclick="authModal('kayit')">Kayıt Ol</button></div>`;
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
    <div class="profil-hero-card"><div class="profil-hero-glow"></div><div class="profil-avatar">${bas}</div><div class="profil-hero-copy"><span class="profil-kicker">KİŞİSEL ÇALIŞMA ALANI</span><h2>${kac(k.ad || "Kullanıcı")}</h2><p>${kac(rolAdi(k.rol))}${k.olusturma || k.tarih ? " · " + tarihKisa(k.olusturma || k.tarih) + " tarihinden beri" : ""}</p></div><div class="profil-hero-actions"><a class="btn btn-ikincil btn-kucuk" href="kitaplar.html">Kitaplara git</a><a class="btn btn-birincil btn-kucuk" href="forum.html">Foruma git</a></div></div>
    <div class="profil-metrik-grid"><div class="profil-metrik"><div class="profil-metrik-ikon pembe">${ikonYildiz(true,18)}</div><div><strong>${favs.length}</strong><span>Favori kitap</span></div></div><div class="profil-metrik"><div class="profil-metrik-ikon mavi">${ikon("yorum",18)}</div><div><strong>${sorular.length}</strong><span>Forum sorusu</span></div></div><div class="profil-metrik"><div class="profil-metrik-ikon turuncu">${ikon("kalem",18)}</div><div><strong>${notSayisi}</strong><span>Sayfa notu</span></div></div><div class="profil-metrik"><div class="profil-metrik-ikon mor">${ikon("kitap",18)}</div><div><strong>${odakSinif ? odakSinif + ". sınıf" : "Genel"}</strong><span>Çalışma odağı</span></div></div></div>
    <div class="profil-iki-kolon"><section class="profil-panel"><div class="profil-panel-ust"><div><span class="profil-panel-kicker">KÜTÜPHANE</span><h3>Favori kitapların</h3></div><span class="profil-panel-sayi">${favs.length}</span></div><div class="profil-kitap-listesi">${favs.slice(0,6).map(f => `<button class="profil-kitap-oge" onclick="Reader.ac('${f.id}')"><span class="profil-kitap-kapak"><img src="${f.kapak || f.gorsel || ''}" alt="" loading="lazy"></span><span class="profil-kitap-bilgi"><b>${kac(f.baslik)}</b><small>${kac(dersAdi(f.ders,f.sinif) || "Ders kitabı")} · ${f.sinif}. sınıf</small></span><span class="profil-kitap-ok">→</span></button>`).join("") || `<div class="profil-bos"><strong>Henüz favori kitabın yok.</strong><span>Beğendiğin kitapları ⭐ ile işaretlediğinde burada görünecek.</span><a href="kitaplar.html">Kitaplara göz at →</a></div>`}</div></section>
    <section class="profil-panel profil-odak"><div class="profil-panel-ust"><div><span class="profil-panel-kicker">KİŞİSELLEŞTİRME</span><h3>Çalışma odağın</h3></div><span class="profil-panel-sayi">${odakSinif ? odakSinif + ". sınıf" : "Yeni"}</span></div><p class="profil-panel-aciklama">Gezdiğin sınıf ve dersler önerilerini etkiliyor. Aşağıdaki dağılım son etkileşimlerinin özetidir.</p>${sinifKartlari || `<div class="profil-bos"><span>Henüz yeterli veri oluşmadı.</span><a href="kitaplar.html">Bir sınıf seç →</a></div>`}</section></div>
    <div class="profil-iki-kolon"><section class="profil-panel"><div class="profil-panel-ust"><div><span class="profil-panel-kicker">FORUM</span><h3>Son soruların</h3></div><a class="profil-panel-link" href="forum.html">Tümünü gör →</a></div><div class="profil-soru-listesi">${sorular.slice(0,5).map(s2 => `<button class="profil-soru-oge" onclick="soruDetay('${s2.id}')"><span class="profil-soru-num">?</span><span><b>${kac(s2.baslik)}</b><small>${kac(s2.ders || "Forum")}</small></span><em>→</em></button>`).join("") || `<div class="profil-bos"><strong>Henüz forum sorusu yok.</strong><span>Takıldığın yeri paylaş, yanıtları profilinden takip et.</span><a href="forum.html">Forumda soru sor →</a></div>`}</div></section>
    <section class="profil-panel profil-guvenlik"><div class="profil-panel-ust"><div><span class="profil-panel-kicker">HESAP</span><h3>Hesap güvenliği</h3></div><span class="guvenlik-durum">${ikon("tik",11)} Aktif</span></div><p class="profil-panel-aciklama">Şifreni güncel tut. Oturum güvenliği ve doğrulama işlemleri sunucu tarafında korunur.</p><div class="profil-sifre-satir"><div><strong>Şifre değiştir</strong><span>Yeni şifre en az 6 karakter olmalı.</span></div><div class="profil-sifre-form"><input id="yeniSifre" type="password" class="girdi" placeholder="Yeni şifre" autocomplete="new-password" /><button class="btn btn-birincil btn-kucuk" onclick="parolaGuncelle()">Güncelle</button></div></div></section></div>`;
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
        <td><div class="yonetim-kullanici"><span class="yonetim-mini-avatar">${mini}</span><span><b>${kac(u.ad)}</b><small>${u.rol ? rolAdi(u.rol) : "Öğrenci"}</small></span></div></td><td>${kac(u.eposta || u.telefon || "—")}</td><td>${tarihKisa(u.olusturma || u.tarih)}</td>
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
  try {
    Layout.kur();
    animasyonKur();
    const sayfa = document.body.dataset.sayfa || "index";
    const uzak = await Auth.baslat();
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
