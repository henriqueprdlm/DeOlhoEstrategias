document.addEventListener('DOMContentLoaded', () => {
    // 1) Pega todas as seções numa lista
    const sections = Array.from(document.querySelectorAll(
      '#section1-introducao, #section2-sobrenos, #section3-nossosservicos, #section4-nossotime, #section5-clientes, #section6-final'
    ));
    
    // 2) Encontra a seção inicial
    let currentIndex = sections.findIndex(sec =>
      Math.abs(sec.getBoundingClientRect().top) < window.innerHeight/2
    );
    if (currentIndex < 0) currentIndex = 0;
  
    let isThrottled = false;
  
    // Função de animação custom
    function smoothScrollTo(targetY, duration = 1200) {
      const startY = window.scrollY;
      const distance = targetY - startY;
      let startTime = null;
  
      function step(timestamp) {
        if (startTime === null) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const t = Math.min(elapsed / duration, 1);
        // easeInOutQuad
        const eased = t < 0.5
          ? 2*t*t
          : -1 + (4 - 2*t)*t;
        window.scrollTo(0, startY + (distance * eased));
        if (elapsed < duration) {
          requestAnimationFrame(step);
        }
      }
      requestAnimationFrame(step);
    }
  
    window.addEventListener('wheel', e => {
      e.preventDefault();
      if (isThrottled) return;
      isThrottled = true;
  
      // 3) direção do scroll
      const down = e.deltaY > 0;
      if (down && currentIndex < sections.length - 1) {
        currentIndex++;
      } else if (!down && currentIndex > 0) {
        currentIndex--;
      }
  
      // 4) usa nossa animação custom pra descer até o topo da seção
      const top = sections[currentIndex].offsetTop;
      smoothScrollTo(top, 1200);  // 1200 ms de duração
  
      // 5) espera a animação terminar antes de liberar novo scroll
      setTimeout(() => {
        isThrottled = false;
      }, 1200);
    }, { passive: false });
});
  