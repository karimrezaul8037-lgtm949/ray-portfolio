const cursorDot = id => document.getElementById(id);
const dot = cursorDot('cursorDot');
const ring = cursorDot('cursorRing');

// ১. কাস্টম মাউস ও স্মুথ স্পিড ফলো
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;

    // ভিডিওর মতো পার্টিকেল (Sparks) তৈরি করা
    createParticle(mouseX, mouseY);
});

function renderRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    
    requestAnimationFrame(renderRing);
}
renderRing();

// ২. মাউস নড়ালে লাল রঙের ট্র্যাকিং স্পার্ক/পার্টিকেল তৈরি হওয়া
function createParticle(x, y) {
    if (Math.random() > 0.4) return; // খুব বেশি ছড়াবে না

    const particle = document.createElement('div');
    particle.className = 'particle';
    document.body.appendChild(particle);

    const size = Math.random() * 6 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    setTimeout(() => {
        particle.remove();
    }, 600);
}

// ৩. কার্ড ও বাটনে হভার করলে কার্সার রিং বড় হওয়ার অ্যানিমেশন
const interactiveElements = document.querySelectorAll('a, .work-card, .btn');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        ring.style.width = '60px';
        ring.style.height = '60px';
        ring.style.backgroundColor = 'rgba(229, 9, 20, 0.2)';
    });
    el.addEventListener('mouseleave', () => {
        ring.style.width = '35px';
        ring.style.height = '35px';
        ring.style.backgroundColor = 'transparent';
    });
});

// ৪. স্ক্রল করার সাথে সাথে সেকশনগুলো ভেসে ওঠার অ্যানিমেশন (Scroll Reveal)
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - 100) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // প্রথমবার লোড হওয়ার জন্য