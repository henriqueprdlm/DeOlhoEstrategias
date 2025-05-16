// js/scroll.js
document.addEventListener('DOMContentLoaded', () => {
    const sections = Array.from(document.querySelectorAll('[id^="section"]'));
    let currentIndex = 0;
    let gestureActive = false;
    const duration = 600; // ms de duração da animação
  
    function easeInOutQuad(t) {
      return t < 0.5
        ? 2 * t * t
        : -1 + (4 - 2 * t) * t;
    }
  
    function smoothScrollTo(targetY, callback) {
      const startY = window.scrollY;
      const deltaY = targetY - startY;
      let startTime = null;
      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, startY + deltaY * easeInOutQuad(progress));
        if (elapsed < duration) requestAnimationFrame(step);
        else callback && callback();
      }
      requestAnimationFrame(step);
    }
  
    sections.forEach((sec, i) => {
      if (window.scrollY >= sec.offsetTop - 10) currentIndex = i;
    });
  
    window.addEventListener('wheel', e => {
      if (window.innerWidth <= 800) return;
  
      // **APENAS** roda física de mouse (deltaMode 1)
      if (e.deltaMode !== WheelEvent.DOM_DELTA_LINE) return;
  
      e.preventDefault();
      if (gestureActive) return;
  
      let nextIndex = currentIndex;
      if (e.deltaY > 0 && currentIndex < sections.length - 1) {
        nextIndex++;
      } else if (e.deltaY < 0 && currentIndex > 0) {
        nextIndex--;
      } else {
        return;
      }
  
      gestureActive = true;
      currentIndex = nextIndex;
      smoothScrollTo(
        sections[currentIndex].offsetTop,
        () => { gestureActive = false; }
      );
    }, { passive: false });
  });
  