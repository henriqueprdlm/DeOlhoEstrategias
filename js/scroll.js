// js/scroll.js
document.addEventListener('DOMContentLoaded', () => {
    const sections = Array.from(document.querySelectorAll('[id^="section"]'));
    let currentIndex = 0;
    let gestureActive = false;
    const duration = 600; // ms de duração da animação
  
    // easing suave
    function easeInOutQuad(t) {
      return t < 0.5
        ? 2 * t * t
        : -1 + (4 - 2 * t) * t;
    }
  
    // animação do scroll
    function smoothScrollTo(targetY, callback) {
      const startY = window.scrollY;
      const deltaY = targetY - startY;
      let startTime = null;
  
      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(
          0,
          startY + deltaY * easeInOutQuad(progress)
        );
        if (elapsed < duration) {
          requestAnimationFrame(step);
        } else {
          callback && callback();
        }
      }
  
      requestAnimationFrame(step);
    }
  
    // Determina índice inicial (se recarregar no meio da página)
    sections.forEach((sec, i) => {
      if (window.scrollY >= sec.offsetTop - 10) currentIndex = i;
    });
  
    // Listener único de roda do mouse
    window.addEventListener('wheel', e => {
      // só desktop
      if (window.innerWidth <= 800) return;
  
      // --- FILTRO PARA RODA FÍSICA (LINHAS) ---
      // só continua se for deltaMode = lines (1)
      if (e.deltaMode !== WheelEvent.DOM_DELTA_LINE) return; 
      // DOM_DELTA_LINE = 1 :contentReference[oaicite:0]{index=0}
  
      e.preventDefault();
  
      // ignora se já estamos animando
      if (gestureActive) return;
  
      // decide direção (qualquer deltaY, sem threshold)
      let nextIndex = currentIndex;
      if (e.deltaY > 0 && currentIndex < sections.length - 1) {
        nextIndex++;
      } else if (e.deltaY < 0 && currentIndex > 0) {
        nextIndex--;
      } else {
        return; // sem seção válida para ir
      }
  
      // bloqueia novos eventos até o callback
      gestureActive = true;
      currentIndex = nextIndex;
  
      smoothScrollTo(
        sections[currentIndex].offsetTop,
        () => { gestureActive = false; }
      );
  
    }, { passive: false });
  });
  