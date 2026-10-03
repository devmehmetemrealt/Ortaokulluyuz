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
