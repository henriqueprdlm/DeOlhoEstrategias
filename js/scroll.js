let scroll = 1;

window.addEventListener('wheel', e => {
    // ————————————— DETECÇÃO MÍNIMA —————————————
    // Substitua todo este if/else de detecção pelo bloco abaixo:
    if (e.deltaMode === 1) {           // deltaMode 1 = roda de mouse “clássica”  
        /* continua no código */       
    } else {                          // deltaMode 0 = trackpad/high‑res
        return;                       // sai e deixa fluir
    }
    // ————————————— FIM DETECÇÃO —————————————

    if (scroll) {
        scroll = 0;
        // ———————— THROTTLE LEVE ————————
        // em vez de setTimeout(..., 500):
        requestAnimationFrame(() => {
          scroll = 1;
        });
        // —————— fim THROTTLE ——————
        return;
    } else {
        e.preventDefault();
        return;
    }
}, { passive: false });
