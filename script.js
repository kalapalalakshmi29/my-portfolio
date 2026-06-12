// ── LOADER ──
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hide'), 800);
});

// ── AOS ──
AOS.init({ duration: 750, once: true, offset: 70, easing: 'ease-out-cubic' });

// ── NAVBAR SCROLL EFFECT ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navLinks.classList.remove('open');
}));

// ── ACTIVE NAV LINK ──
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 130;
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
      navItems.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
      if (active) active.classList.add('active');
    }
  });
});

// ── TYPEWRITER ──
const roles = ['Full Stack Developer', 'MERN Stack Developer', 'AI & ML Enthusiast', 'Python Developer', 'Problem Solver'];
let ri = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');
function type() {
  const word = roles[ri];
  tw.textContent = deleting ? word.slice(0, --ci) : word.slice(0, ++ci);
  if (!deleting && ci === word.length) { deleting = true; setTimeout(type, 1600); return; }
  if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  setTimeout(type, deleting ? 55 : 95);
}
type();

// ── COUNTER ANIMATION ──
function animateCounters() {
  document.querySelectorAll('.counter').forEach(el => {
    const target = +el.dataset.target;
    let count = 0;
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    const timer = setInterval(() => {
      count = Math.min(count + increment, target);
      el.textContent = Math.floor(count);
      if (count >= target) { el.textContent = target; clearInterval(timer); }
    }, duration / steps);
  });
}
const counterObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) { animateCounters(); counterObserver.disconnect(); }
}, { threshold: 0.4 });
const aboutSection = document.querySelector('#about');
if (aboutSection) counterObserver.observe(aboutSection);

// ── SKILL BARS ANIMATION ──
function animateSkillBars() {
  document.querySelectorAll('.skill-fill').forEach(bar => {
    bar.style.width = bar.dataset.width + '%';
  });
}
const skillBarObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) { animateSkillBars(); skillBarObserver.disconnect(); }
}, { threshold: 0.2 });
const skillsSection = document.querySelector('#skills');
if (skillsSection) skillBarObserver.observe(skillsSection);

// ── PARALLAX PARTICLES ──
window.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 25;
  const y = (e.clientY / window.innerHeight - 0.5) * 25;
  document.querySelectorAll('.particle').forEach((p, i) => {
    const factor = (i + 1) * 0.3;
    p.style.transform = `translate(${x * factor}px, ${y * factor}px) scale(1)`;
  });
});

// ── BACK TO TOP ──
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── CONTACT FORM ──
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const original = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
  btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 3500);
});

// ── PROJECT CARD 3D TILT ──
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-8px) perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
