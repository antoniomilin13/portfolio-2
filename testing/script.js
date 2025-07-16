// --- SLIDER ABOUT ME ---
let slideItems = document.querySelectorAll('.slide-wrap .slide-item');
let nextBtn = document.getElementById('nextBtn');
let prevBtn = document.getElementById('prevBtn');

let active = 3;

function loadShow() {
    let stt = 0;
    slideItems[active].style.transform = `none`;
    slideItems[active].style.zIndex = 1;
    slideItems[active].style.filter = 'none';
    slideItems[active].style.opacity = 1;

    for (var i = active + 1; i < slideItems.length; i++) {
        stt++;
        slideItems[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
        slideItems[i].style.zIndex = -stt;
        slideItems[i].style.filter = 'blur(5px)';
        slideItems[i].style.opacity = stt > 2 ? 0 : 0.6;
    }

    stt = 0;

    for (var i = active - 1; i >= 0; i--) {
        stt++;
        slideItems[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
        slideItems[i].style.zIndex = -stt;
        slideItems[i].style.filter = 'blur(5px)';
        slideItems[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
}

loadShow();