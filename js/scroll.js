let isScrolling = false;
  let currentSectionIndex = 0;

  const sections = document.querySelectorAll('section');

  window.addEventListener('wheel', (e) => {
    if (isScrolling) return;

    isScrolling = true;
    if (e.deltaY > 0) {
      currentSectionIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
    } else {
      currentSectionIndex = Math.max(currentSectionIndex - 1, 0);
    }

    sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
      isScrolling = false;
    }, 800); // Ajuste esse tempo para controlar a “travada”
  });