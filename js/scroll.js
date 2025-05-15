// js/scroll.js
document.addEventListener('DOMContentLoaded', () => {
    const secs = Array.from(document.querySelectorAll('[id^="section"]'));
    let idx = 0, busy = false;
    const DURATION = 400;  // mais rápido para mouse
  
    function ease(t) {
      return t<0.5 ? 2*t*t : -1 + (4-2*t)*t;
    }
  
    function scrollTo(y, done) {
      const start = window.scrollY, delta = y - start;
      let t0 = null;
      function step(ts) {
        if (!t0) t0 = ts;
        const e = Math.min((ts - t0) / DURATION, 1);
        window.scrollTo(0, start + delta * ease(e));
        if (e < 1) requestAnimationFrame(step);
        else done && done();
      }
      requestAnimationFrame(step);
    }
  
    window.addEventListener('wheel', e => {
      if (window.innerWidth <= 800) return;
      // só roda física (deltaMode 1 = “lines”)
      if (e.deltaMode !== 1) return;
      e.preventDefault();
  
      if (busy) return;
      let next = idx;
      if (e.deltaY > 0 && idx < secs.length - 1) next++;
      else if (e.deltaY < 0 && idx > 0) next--;
      else return;
  
      busy = true;
      idx = next;
      scrollTo(secs[idx].offsetTop, () => { busy = false; });
    }, { passive: false });
  });
  