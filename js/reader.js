/* Z-Kitap Reader: flipbook + canvas annotation + zoom/pan + thumbnails + fullscreen */
const Reader = {
  kitap: null, sayfalar: [], indeks: 0,
  arac: "kalem", renk: "#1b4f9c", kalinlik: 3,
  zoom: 1, ciziliyor: false, ctx: null, canvas: null,

  ac(kitapId) {
    this.kitap = KITAPLAR.find(k => k.id === kitapId);
    if (!this.kitap) return;
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
