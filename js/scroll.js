let scroll = 1;

window.addEventListener('wheel', e => {
    if (e.wheelDeltaY) {
        if (e.wheelDeltaY === (e.deltaY * -3)) {
            return;
        }
    } else if (e.deltaMode === 0) {
        isTrackpad = true;
        return;
    }
    
    if (scroll) {
        scroll = 0;
        setTimeout(() => {
            scroll = 1;
          }, 300);
        return;
    } else {
        e.preventDefault();
        return;
    }
}, { passive: false });