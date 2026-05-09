/* ===================================================
   AANYA SHARMA — DIGITAL MARKETING PORTFOLIO
   JavaScript — Interactions & Animations
=================================================== */

'use strict';

/* ============================================
   PRELOADER
============================================ */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('done');
    initRevealObserver(); // Start observing after load
  }, 900);
});

/* ============================================
   CUSTOM CURSOR
============================================ */
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

if (dot && ring) {
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let raf;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left  = mouseX + 'px';
    dot.style.top   = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    raf = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effect on links and buttons
  const hoverTargets = document.querySelectorAll('a, button, .skill-card, .project-card, .service-card, .cert-card');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
}

/* ============================================
   NAVBAR — Scroll & Active Link
============================================ */
const navbar  = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  // Scrolled class
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active link highlighting
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Hamburger toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

// Close menu on nav link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ============================================
   SCROLL REVEAL ANIMATION
============================================ */
function initRevealObserver() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children inside grids
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  // Add staggered delay to grid children
  document.querySelectorAll('.skills-grid, .cert-grid, .projects-grid, .services-grid').forEach(grid => {
    Array.from(grid.children).forEach((child, i) => {
      child.dataset.delay = i * 90;
    });
  });

  reveals.forEach(el => observer.observe(el));
}

/* ============================================
   SKILL BAR ANIMATION
============================================ */
const skillBarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-fill');
      fills.forEach(fill => {
        const target = fill.dataset.width;
        setTimeout(() => {
          fill.style.width = target + '%';
        }, 300);
      });
      skillBarObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillBarObserver.observe(skillsSection);

/* ============================================
   PROJECT FILTER
============================================ */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    // Toggle active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    projectCards.forEach(card => {
      const cats = card.dataset.category || '';
      if (filter === 'all' || cats.includes(filter)) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeInUp 0.4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ============================================
   CONTACT FORM SUBMISSION
============================================ */
const contactForm = document.getElementById('contact-form');
const formSuccess  = document.getElementById('form-success');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
    btn.disabled = true;

    // Simulate async submission
    setTimeout(() => {
      contactForm.reset();
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.disabled = false;
      formSuccess.classList.add('show');
      setTimeout(() => formSuccess.classList.remove('show'), 5000);
    }, 1600);
  });
}

/* ============================================
   SMOOTH SCROLL for anchor links
============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ============================================
   HERO PARALLAX (subtle)
============================================ */
const heroShapes = document.querySelectorAll('.shape');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  heroShapes.forEach((shape, i) => {
    const speed = 0.1 + i * 0.07;
    shape.style.transform = `translateY(${y * speed}px)`;
  });
});

/* ============================================
   COUNTER ANIMATION for About Stats
============================================ */
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = Math.ceil(target / (duration / 16));
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target + '+'; clearInterval(timer); }
    else { el.textContent = start + '+'; }
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      const targets = [10, 5, 3];
      nums.forEach((num, i) => animateCounter(num, targets[i]));
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) statsObserver.observe(aboutStats);

/* ============================================
   TYPING EFFECT in hero subtitle
============================================ */
const typingEl = document.querySelector('.hero-sub');
if (typingEl) {
  const words = ['SEO', 'SEM', 'Social Media', 'Content Marketing', 'Campaign Optimization'];
  let wordIdx = 0, charIdx = 0, isDeleting = false;
  const baseText = '';

  function type() {
    const currentWord = words[wordIdx];
    const display = isDeleting
      ? currentWord.substring(0, charIdx - 1)
      : currentWord.substring(0, charIdx + 1);

    typingEl.innerHTML = `<span class="typed-prefix">Expertise in → </span><span class="typed-word" style="color:var(--gold);font-weight:600">${display}<span class="typed-cursor">|</span></span>`;

    charIdx = isDeleting ? charIdx - 1 : charIdx + 1;

    if (!isDeleting && charIdx > currentWord.length) {
      isDeleting = true;
      setTimeout(type, 1400);
      return;
    }
    if (isDeleting && charIdx < 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      charIdx = 0;
      setTimeout(type, 300);
      return;
    }
    setTimeout(type, isDeleting ? 55 : 95);
  }

  // Start typing after preloader
  setTimeout(type, 1200);
}

/* ============================================
   CSS: Inject additional keyframes
============================================ */
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: none; }
  }
  .typed-cursor {
    display: inline-block;
    animation: blink 0.75s step-end infinite;
    color: var(--gold);
    font-weight: 300;
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
`;
document.head.appendChild(styleSheet);

/* ============================================
   NAVBAR: Hide on fast scroll down, show on scroll up
============================================ */
let lastScrollY = 0;
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > 300) {
    if (current > lastScrollY + 10) {
      navbar.style.top = '-100px';
    } else if (lastScrollY > current + 5) {
      navbar.style.top = '0';
    }
  } else {
    navbar.style.top = '0';
  }
  lastScrollY = current;
}, { passive: true });

/* ============================================
   INIT — run on DOM ready
============================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Ensure hero reveals are visible quickly
  document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 200 + i * 120);
  });
});
