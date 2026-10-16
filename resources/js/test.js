const cart = document.querySelector('.cart');
const nav = document.getElementById('mainNav');
const track = document.getElementById('waveTrack');
const wavePath = document.getElementById('wavePath');
const stopBlue = document.getElementById('stopBlue');
const stopWhite = document.getElementById('stopWhite');
const buttons = document.querySelector('.button-row');
const navLinks = document.querySelectorAll('.wave-track .nav-links a');

function rideCart(duration) {
    const svg = wavePath.ownerSVGElement;
    const total = wavePath.getTotalLength();
    const startTime = performance.now();
    let shown = false;

    function frame(now) {
        const t = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
    
        const box = svg.getBoundingClientRect();
        const trackBox = track.getBoundingClientRect();
        const vb = svg.viewBox.baseVal;
        const scaleX = box.width / vb.width;
        const scaleY = box.height / vb.height;
        const offsetTop = box.top - trackBox.top;
    
        const dist = eased * total;
        const here = wavePath.getPointAtLength(dist);
        const ahead = wavePath.getPointAtLength(Math.min(dist + 1, total));
    
        const angle = Math.atan2(
            (ahead.y - here.y) * scaleY,
            (ahead.x - here.x) * scaleX
        ) * 180 / Math.PI;
    
        const x = here.x * scaleX - cart.offsetWidth / 2;
        const y = offsetTop + (here.y - vb.y) * scaleY - cart.offsetHeight;
    
        cart.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
    
        const frac = Math.max(0, Math.min(1, (here.x - vb.x) / vb.width));
        stopBlue.setAttribute('offset', frac);
        stopWhite.setAttribute('offset', frac);
    
        // nav links appear as the cart reaches them
        const cartScreenX = box.left + (here.x - vb.x) * scaleX;
        navLinks.forEach((link) => {
            if (!link.classList.contains('show') &&
                (cartScreenX >= link.getBoundingClientRect().left || t >= 1)) {
                link.classList.add('show');
            }
        });
    
        if (!shown && buttons && (here.x >= vb.x + vb.width || t >= 1)) {
            buttons.classList.add('show');
            shown = true;
        }
    
        if (t < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
}

function start() {
    document.body.style.overflow = 'hidden';
    rideCart(9500);
    setTimeout(() => {
        if (nav) nav.classList.add('visible');
        document.body.style.overflow = 'auto';
    }, 200);
}

if (cart && wavePath) {
    if (cart.complete) start();
    else cart.addEventListener('load', start);
} else {
    console.warn('test.js: cart or wavePath not found');
    if (nav) nav.classList.add('visible');
    if (buttons) buttons.classList.add('show');
    navLinks.forEach((link) => link.classList.add('show'));
}