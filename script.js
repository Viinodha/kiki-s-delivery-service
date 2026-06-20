const musicToggle = document.getElementById('music-toggle');
const backgroundMusic = document.getElementById('background-music');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');

let isPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        backgroundMusic.pause();
        isPlaying = false;
        playIcon.classList.remove('music-icon-hidden');
        pauseIcon.classList.add('music-icon-hidden');
        musicToggle.setAttribute('aria-label', 'Turn music on');
    } else {
        backgroundMusic.play()
            .then(() => {
                isPlaying = true;
                playIcon.classList.add('music-icon-hidden');
                pauseIcon.classList.remove('music-icon-hidden');
                musicToggle.setAttribute('aria-label', 'Turn music off');
            })
            .catch((err) => console.error('Playback failed:', err));
    }
});

//kiki
const hero = document.querySelector('header.hero');
const kiki = document.querySelector('.kiki-fly');
const nav = document.querySelector('nav');

let mouseX = hero.clientWidth / 2;
let mouseY = hero.clientHeight / 2;
let kikiX = mouseX - 50;
let kikiY = mouseY - 50;

const smoothing = 0.08;
const sparkleInterval = 80;
let lastSparkleTime = 0;

hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

function getMinY() {
    const heroRect = hero.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    return (navRect.bottom - heroRect.top) + 20;
}

//kop

let sparkleToggle = false; // add this alongside your other variables (mouseX, kikiX, etc.)

function spawnSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');

    if (sparkleToggle) {
        sparkle.classList.add('sparkle-blossom');
        sparkle.textContent = '🌸';
    } else {
        sparkle.classList.add('sparkle-star');
    }
    sparkleToggle = !sparkleToggle;

    sparkle.style.left = `${x + (Math.random() * 20 - 10)}px`;
    sparkle.style.top = `${y + (Math.random() * 20 - 10)}px`;
    hero.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 800);
}

function animate(time) {
    const targetX = mouseX - 50;
    let targetY = mouseY - 50;

    const minY = getMinY();
    if (targetY < minY) {
        targetY = minY;
    }

    kikiX += (targetX - kikiX) * smoothing;
    kikiY += (targetY - kikiY) * smoothing;

    const dx = targetX - kikiX;
    const tilt = Math.max(-15, Math.min(15, dx * 0.3));

    kiki.style.left = `${kikiX}px`;
    kiki.style.top = `${kikiY}px`;
    kiki.style.transform = `rotate(${tilt}deg)`;

    if (time - lastSparkleTime > sparkleInterval) {
        spawnSparkle(kikiX + 50, kikiY + 80);
        lastSparkleTime = time;
    }

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

const bakeryForm = document.getElementById('bakery-form');
const personalDeliveryForm = document.getElementById('personal-delivery-form');
const deliveryStatus = document.getElementById('delivery-status');
const deliveryMessage = document.getElementById('delivery-message');

function showDeliveryStatus(message) {
    deliveryMessage.textContent = message;
    deliveryStatus.classList.remove('hidden');

    // restart the broom-flying animation each time it's triggered
    const broom = deliveryStatus.querySelector('.broom-icon');
    broom.style.animation = 'none';
    void broom.offsetWidth; // forces the browser to reflow so the animation can replay
    broom.style.animation = 'fly 1.2s ease-in-out';

    requestAnimationFrame(() => {
        deliveryStatus.classList.add('visible');
    });

    deliveryStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

bakeryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const bread = Number(document.getElementById('bread').value) || 0;
    const baguette = Number(document.getElementById('baguette').value) || 0;
    const sourdough = Number(document.getElementById('sourdough').value) || 0;
    const province = document.getElementById('bakery-province').value;

    if (bread + baguette + sourdough === 0) {
        alert('Please select at least one item to order.');
        return;
    }
    if (!province) {
        alert('Please choose a delivery location.');
        return;
    }

    showDeliveryStatus(`Your freshly baked goods are on their way to ${province}!`);
    bakeryForm.reset();
});

personalDeliveryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const weight = document.getElementById('weight').value;
    const pickup = document.getElementById('pickup-province').value;
    const destination = document.getElementById('destination').value;

    if (!weight || !pickup || !destination) {
        alert('Please fill in all the delivery details.');
        return;
    }

    showDeliveryStatus(`Kiki is flying your package from ${pickup} to ${destination}!`);
    personalDeliveryForm.reset();
});