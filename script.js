// ============================================
// CONFIGURATION TOASTR
// ============================================

toastr.options = {
    closeButton: true,
    progressBar: true,
    positionClass: "toast-bottom-right",
    timeOut: 3000,
    extendedTimeOut: 1000,
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
    showDuration: 300,
    hideDuration: 300
};

// Enregistrement de ScrollTrigger avec GSAP
gsap.registerPlugin(ScrollTrigger);

// ============================================
// ROOT & DOM ELEMENTS
// ============================================

const root = document.documentElement;
const hero = document.querySelector('.hero');
const slides = [...document.querySelectorAll('.slide')];
const dots = [...document.querySelectorAll('.dot')];
const counter = document.getElementById('counter');
const bgA = document.getElementById('bg-a');
const bgB = document.getElementById('bg-b');
const reservationModal = document.getElementById('reservationModal');
const reserveBtn = document.getElementById('reserve-btn');
const modalClose = document.querySelector('.modal-close');
const navLinks = document.querySelectorAll('.nav-link');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// COLOR PALETTES
const backgrounds = [
  'radial-gradient(ellipse at 50% 50%, #7078A6 0%, #2E2951 42%, #03020a 100%)',
  'radial-gradient(ellipse at 50% 50%, #C94040 0%, #6B1515 42%, #03020a 100%)',
  'radial-gradient(ellipse at 50% 50%, #B07C40 0%, #4A2A10 42%, #03020a 100%)',
  'radial-gradient(ellipse at 50% 50%, #8A3878 0%, #3A0F50 42%, #03020a 100%)'
];

const palette = [
  ['#9cc5ff', '#b798ff', '#7078A6', '#2E2951'],
  ['#ff928d', '#ffc0d0', '#C94040', '#6B1515'],
  ['#ffd08a', '#bd7b42', '#B07C40', '#4A2A10'],
  ['#e287ff', '#9d73ff', '#8A3878', '#3A0F50']
];

let current = 0;
let animating = false;
let activeBg = 'a';

// ============================================
// UPDATE COUNTER & ACTIVE STATES
// ============================================

function updateCounter(index) {
  counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  const [accent, accent2] = palette[index];
  root.style.setProperty('--accent', accent);
  root.style.setProperty('--accent-2', accent2);
  root.style.setProperty('--slide-a', palette[index][2]);
  root.style.setProperty('--slide-b', palette[index][3]);
}

// ============================================
// SET BACKGROUND WITH FADE
// ============================================

function setBackground(index) {
  const grad = backgrounds[index];
  if (activeBg === 'a') {
    bgB.style.background = grad;
    bgB.style.opacity = '.48';
    bgA.style.opacity = '0';
    activeBg = 'b';
  } else {
    bgA.style.background = grad;
    bgA.style.opacity = '.48';
    bgB.style.opacity = '0';
    activeBg = 'a';
  }
}

// ============================================
// MAIN SLIDE ANIMATION AVEC GSAP
// ============================================

function goTo(next, direction) {
  if (animating || next === current) return;
  animating = true;

  const currSlide = slides[current];
  const nextSlide = slides[next];
  const enterClass = direction === 'next' ? 'enter-right' : 'enter-left';
  const exitClass  = direction === 'next' ? 'exit-left'  : 'exit-right';

  const tl = gsap.timeline({
    onComplete: () => {
      animating = false;
    }
  });

  const currElements = currSlide.querySelectorAll('.anim');
  tl.to(currElements, {
    opacity: 0,
    y: direction === 'next' ? -100 : 100,
    scale: 0.9,
    duration: 0.5,
    ease: "power2.in",
    stagger: 0.05
  });

  tl.call(() => {
    currSlide.classList.remove('active');
    currSlide.classList.add(exitClass);
    nextSlide.classList.remove(enterClass);
    nextSlide.classList.add('active');
    setBackground(next);
    updateCounter(next);
    current = next;
  });

  const nextElements = nextSlide.querySelectorAll('.anim');
  tl.fromTo(nextElements, 
    {
      opacity: 0,
      y: direction === 'next' ? 100 : -100,
      scale: 0.9
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: "power2.out",
      stagger: 0.08,
      clearProps: "all"
    }
  );
}

// ============================================
// SLIDE NAVIGATION
// ============================================

function nextSlide() { goTo((current + 1) % slides.length, 'next'); }
function prevSlide() { goTo((current - 1 + slides.length) % slides.length, 'prev'); }

document.getElementById('next').addEventListener('click', nextSlide);
document.getElementById('prev').addEventListener('click', prevSlide);

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const index = Number(dot.dataset.dot);
    goTo(index, index > current ? 'next' : 'prev');
  });
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') nextSlide();
  if (event.key === 'ArrowLeft') prevSlide();
});

// ============================================
// POINTER/MOUSE TRACKING FOR HERO
// ============================================

const pointer = {
  x: window.innerWidth / 2,
  y: window.innerHeight * .45,
  tx: window.innerWidth / 2,
  ty: window.innerHeight * .45
};

function setHeroFocusVars() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const nx = (pointer.x / w - .5) * 2;
  const ny = (pointer.y / h - .5) * 2;
  root.style.setProperty('--mx', `${pointer.x}px`);
  root.style.setProperty('--my', `${pointer.y}px`);
  root.style.setProperty('--tilt-x', `${(-ny * 7).toFixed(2)}deg`);
  root.style.setProperty('--tilt-y', `${(nx * 9).toFixed(2)}deg`);
  root.style.setProperty('--p1x', `${(-nx * 30).toFixed(1)}px`);
  root.style.setProperty('--p1y', `${(-ny * 24).toFixed(1)}px`);
  root.style.setProperty('--p2x', `${(nx * 38).toFixed(1)}px`);
  root.style.setProperty('--p2y', `${(-ny * 30).toFixed(1)}px`);
  root.style.setProperty('--p3x', `${(nx * 24).toFixed(1)}px`);
  root.style.setProperty('--p3y', `${(ny * 32).toFixed(1)}px`);
}

function animateFocusLens() {
  if (!hero || prefersReducedMotion) return;
  pointer.x += (pointer.tx - pointer.x) * 0.075;
  pointer.y += (pointer.ty - pointer.y) * 0.075;
  setHeroFocusVars();
  requestAnimationFrame(animateFocusLens);
}

if (hero && !prefersReducedMotion) {
  window.addEventListener('pointermove', (event) => {
    const rect = hero.getBoundingClientRect();
    if (event.clientY < rect.top || event.clientY > rect.bottom) return;
    pointer.tx = event.clientX;
    pointer.ty = event.clientY;
  }, { passive: true });

  hero.addEventListener('pointerleave', () => {
    pointer.tx = window.innerWidth / 2;
    pointer.ty = window.innerHeight * .45;
  }, { passive: true });

  animateFocusLens();
}

// ============================================
// CANVAS SHADER ANIMATION
// ============================================

const canvas = document.getElementById('shader-canvas');
const ctx = canvas.getContext('2d', { alpha: true });
let width = 0;
let height = 0;
let dpr = 1;
let blobs = [];

function resizeCanvas() {
  dpr = Math.min(window.devicePixelRatio || 1, 1.8);
  width = canvas.clientWidth;
  height = canvas.clientHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  createBlobs();
}

function createBlobs() {
  blobs = Array.from({ length: 8 }, (_, i) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.min(width, height) * (.18 + Math.random() * .18),
    vx: (Math.random() - .5) * .32,
    vy: (Math.random() - .5) * .26,
    phase: Math.random() * Math.PI * 2,
    index: i
  }));
}

function drawShader(time) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'rgba(3,2,10,.96)';
  ctx.fillRect(0, 0, width, height);

  const colors = palette[current];
  blobs.forEach(blob => {
    blob.x += blob.vx;
    blob.y += blob.vy;
    if (blob.x < -blob.r) blob.x = width + blob.r;
    if (blob.x > width + blob.r) blob.x = -blob.r;
    if (blob.y < -blob.r) blob.y = height + blob.r;
    if (blob.y > height + blob.r) blob.y = -blob.r;

    const wave = Math.sin(time * .0007 + blob.phase) * 35;
    const gx = blob.x + Math.cos(time * .0004 + blob.phase) * wave;
    const gy = blob.y + Math.sin(time * .0005 + blob.phase) * wave;
    const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, blob.r);
    const c = blob.index % 2 === 0 ? colors[0] : colors[1];
    grad.addColorStop(0, `${c}55`);
    grad.addColorStop(.42, `${c}18`);
    grad.addColorStop(1, 'rgba(3,2,10,0)');
    ctx.globalCompositeOperation = 'screen';
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(gx, gy, blob.r, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'rgba(0,0,0,.18)';
  ctx.fillRect(0, 0, width, height);
  requestAnimationFrame(drawShader);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
requestAnimationFrame(drawShader);

// ============================================
// MODAL MANAGEMENT
// ============================================

function openReservationModal() {
  reservationModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeReservationModal() {
  reservationModal.classList.remove('active');
  document.body.style.overflow = '';
}

reserveBtn.addEventListener('click', openReservationModal);
modalClose.addEventListener('click', closeReservationModal);
reservationModal.addEventListener('click', (e) => {
  if (e.target === reservationModal) closeReservationModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && reservationModal.classList.contains('active')) {
    closeReservationModal();
  }
});

// SMOOTH SCROLL FOR NAV LINKS
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ============================================
// FORM SUBMISSION AVEC TOASTR
// ============================================

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    toastr.success('Message envoyé ! Nous vous recontacterons bientôt.', 'Succès');
    contactForm.reset();
  });
}

const reservationForm = document.querySelector('.reservation-form');
if (reservationForm) {
  reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    toastr.success('Réservation confirmée ! Merci de votre confiance.', 'Succès');
    reservationForm.reset();
    closeReservationModal();
  });
}

// ============================================
// INITIALIZE
// ============================================

updateCounter(0);

// ============================================
// ANIMATIONS GSAP POUR TOUTES LES SECTIONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Stats animation avec CountUp
    document.querySelectorAll('.stat-number[data-count]').forEach(el => {
        const target = parseFloat(el.dataset.count);
        const isFloat = target % 1 !== 0;
        
        const countUp = new countUp.CountUp(el, target, {
            duration: 2.5,
            useEasing: true,
            useGrouping: true,
            separator: ' ',
            decimal: isFloat ? ',' : '',
            decimalPlaces: isFloat ? 1 : 0,
            enableScrollSpy: true,
            scrollSpyOnce: true
        });
        
        if (!countUp.error) {
            countUp.start();
        }
    });

    // Animation GSAP des cartes
    gsap.utils.toArray('.team-card, .mcard, .tescard').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power2.out",
            delay: i * 0.1
        });
    });

    // Animation des features
    gsap.utils.toArray('.stat-item, .fti').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            x: i % 2 === 0 ? -30 : 30,
            duration: 0.6,
            ease: "power2.out",
            delay: i * 0.08
        });
    });

    // Animation du CTA banner
    gsap.from('.cta-banner', {
        scrollTrigger: {
            trigger: '.cta-banner',
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 30,
        scale: 0.97,
        duration: 1,
        ease: "power2.out"
    });

    // Animation de la timeline
    gsap.utils.toArray('.tli').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            x: i % 2 === 0 ? -50 : 50,
            duration: 0.8,
            ease: "power2.out",
            delay: i * 0.15
        });
    });

    // Animation des horaires
    gsap.from('.hrscard', {
        scrollTrigger: {
            trigger: '.hrscard',
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power2.out"
    });

    // Animation de l'image stack
    gsap.from('.astack', {
        scrollTrigger: {
            trigger: '.astack',
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power2.out"
    });

    // Animation du texte about
    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.about-text',
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: 50,
        duration: 1,
        ease: "power2.out"
    });

    // Animation des filtres
    gsap.from('.filtbtn', {
        scrollTrigger: {
            trigger: '.filter-buttons',
            start: "top 90%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
    });
});

// ============================================
// FILTRE DU MENU
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.filtbtn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelector('.filtbtn.active').classList.remove('active');
            this.classList.add('active');

            const filter = this.getAttribute('data-f');
            document.querySelectorAll('.menu-item').forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    gsap.to(item, {
                        display: 'block',
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        ease: "power2.out",
                        clearProps: "display"
                    });
                } else {
                    gsap.to(item, {
                        opacity: 0,
                        y: -20,
                        duration: 0.3,
                        ease: "power2.in",
                        onComplete: () => {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
});

// ============================================
// SWIPER POUR LES TÉMOIGNAGES
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.tesSwiper')) {
        new Swiper('.tesSwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            centeredSlides: true,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 1.2,
                },
                992: {
                    slidesPerView: 1.5,
                }
            }
        });
    }
});

// ============================================
// BOUTONS DE COMMANDE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.menu-order-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.menu-card');
            const title = card?.querySelector('.card-title')?.textContent || 'Bol';
            toastr.success(`"${title}" ajouté au panier !`, 'Panier');
        });
    });
});