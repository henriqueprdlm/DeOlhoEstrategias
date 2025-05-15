const circle = document.querySelector('.circle');
const speed = 0.2;

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  circle.style.transform = `translateY(${scrolled * speed}px)`;
});