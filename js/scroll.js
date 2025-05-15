// js/scroll.js
document.addEventListener('DOMContentLoaded', () => {
    const sections = Array.from(document.querySelectorAll('[id^="section"]'));
    let currentIndex = 0;
    let busy = false;
    const DURATION = 600; // ms de animação
  
    // easing easeInOutQuad
    function ease(t) {
      return t < 0.5
        ? 2 * t * t
        : -1 + (4 - 2 * t) * t;
    }
  
    // anima manual
    function smoothScrollTo(y, done) {
      const start = window.scrollY;
      const delta = y - start;
      let t0 = null;
  
      function step(ts) {
        if (!t0) t0 = ts;
        const elapsed = ts - t0;
        const p = Math.min(elapsed / DURATION, 1);
        window.scrollTo(0, start + delta * ease(p));
        if (p < 1) requestAnimationFrame(step);
        else done && done();
      }
  
      requestAnimationFrame(step);
    }
  
    // ajusta índice inicial se recarregar no meio da página
    sections.forEach((sec, i) => {
      if (window.scrollY >= sec.offsetTop - 10) currentIndex = i;
    });
  
    window.addEventListener('wheel', e => {
      // só desktop
      if (window.innerWidth <= 800) return;
  
      // **apenas roda “linhas” (wheel físico), não trackpad**
      if (e.deltaMode !== 1) return;
  
      e.preventDefault();
      if (busy) return;
  
      let next = currentIndex;
      if (e.deltaY > 0 && currentIndex < sections.length - 1) next++;
      else if (e.deltaY < 0 && currentIndex > 0) next--;
      else return;
  
      busy = true;
      currentIndex = next;
      smoothScrollTo(sections[currentIndex].offsetTop, () => {
        busy = false;
      });
    }, { passive: false });
  });
  