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
