/* Hazır ödev + deneme sınavı verisi — Ortaokulluyuz özgün çalışma içeriği.
   NOT: Bunlar MEB'in resmi cevap anahtarı değildir; sitemiz öğretmen
   kadrosunca ünite kazanımlarına göre hazırlanmış özgün sorulardır. */
const ODEV_VERISI = {};
const SINAV_VERISI = {};
function odevUnite(sinif, ders) {
  const u = (MUfredat.uniteler[sinif] && MUfredat.uniteler[sinif][ders]) || [];
  return u;
}
