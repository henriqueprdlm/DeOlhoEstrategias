let isScrolling = false;

window.addEventListener("wheel", function(e) {
    if (isScrolling) return; // Impede scroll múltiplo

    e.preventDefault(); // Impede scroll padrão

    const direction = e.deltaY > 0 ? "down" : "up";
    const sections = Array.from(document.querySelectorAll("section"));
    const currentSection = sections.find(s => {
        const rect = s.getBoundingClientRect();
        return rect.top >= -10 && rect.top < window.innerHeight;
    });

    let nextSection;
    if (direction === "down") {
        nextSection = sections[sections.indexOf(currentSection) + 1];
    } else {
        nextSection = sections[sections.indexOf(currentSection) - 1];
    }

    if (nextSection) {
        isScrolling = true;
        nextSection.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => { isScrolling = false; }, 1000); // Aguarda transição antes de liberar novo scroll
    }
}, { passive: false });
