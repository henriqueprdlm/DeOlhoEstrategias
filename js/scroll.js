// js/scroll.js
document.addEventListener('DOMContentLoaded', () => {
    const sections      = Array.from(document.querySelectorAll('[id^="section"]'));
    let currentIndex    = 0;
    let gestureActive   = false;
    const duration      = 600;  // ms da animação
    const epsilon       = 12;   // tolerância para múltiplos de 120
  
    // easing easeInOutQuad
    function easeInOutQuad(t) {
      return t < 0.5
        ? 2 * t * t
        : -1 + (4 - 2 * t) * t;
    }
  
    // animação de scroll
    function smoothScrollTo(targetY, cb) {
      const startY = window.scrollY;
      const delta  = targetY - startY;
      let startT   = null;
  
      function step(ts) {
        if (!startT) startT = ts;
        const elapsed = ts - startT;
        const pct     = Math.min(elapsed / duration, 1);
        window.scrollTo(0, startY + delta * easeInOutQuad(pct));
        if (pct < 1) requestAnimationFrame(step);
        else cb && cb();
      }
      requestAnimationFrame(step);
    }
  
    // inicia currentIndex se recarregar no meio
    sections.forEach((sec, i) => {
      if (window.scrollY >= sec.offsetTop - 10) currentIndex = i;
    });
  
    window.addEventListener('wheel', e => {
      if (window.innerWidth <= 800) return;          // mobile: CSS nativo
  
      // detecta roda física: deltaY ≃ múltiplo de 120 ± epsilon
      const dy = Math.abs(e.deltaY);
      const isMouseWheel = dy >= 100 && (dy % 120 < epsilon || 120 - (dy % 120) < epsilon);
      if (!isMouseWheel) {
        // trackpad (não-colidir com CSS scroll-snap)
        return;
      }
  
      e.preventDefault();
      if (gestureActive) return;
  
      let next = currentIndex;
      if (e.deltaY > 0 && currentIndex < sections.length - 1) {
        next++;
      } else if (e.deltaY < 0 && currentIndex > 0) {
        next--;
      } else {
        return;
      }
  
      gestureActive = true;
      currentIndex  = next;
      smoothScrollTo(sections[currentIndex].offsetTop, () => {
        gestureActive = false;
      });
    }, { passive: false });
  });
  