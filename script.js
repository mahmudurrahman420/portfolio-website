// ----------------------------------------------------
// Theme Toggle (Dark / Light)
// ----------------------------------------------------
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');

// Check saved theme or system preference
const savedTheme = localStorage.getItem('theme') || 'dark';
document.body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = document.body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  if (theme === 'light') {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  }
}

// ----------------------------------------------------
// Mobile Navigation Menu
// ----------------------------------------------------
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// Close mobile menu when clicking any nav link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });
});

// ----------------------------------------------------
// Typing Animation Effect
// ----------------------------------------------------
const phrases = [
  'Modern Web Apps',
  'Scalable Systems',
  'Clean User Interfaces',
  'High-Performance Code'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingDelay = 120;
const erasingDelay = 60;
const newPhraseDelay = 1800;
const typingTarget = document.getElementById('typing-text');

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typingTarget.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingTarget.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? erasingDelay : typingDelay;

  if (!isDeleting && charIndex === currentPhrase.length) {
    speed = newPhraseDelay;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 500;
  }

  setTimeout(typeEffect, speed);
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(typeEffect, 500);
});

// ----------------------------------------------------
// Animated Numbers in Stats
// ----------------------------------------------------
const statNumbers = document.querySelectorAll('.stat-number');
let statsCounted = false;

function countUp() {
  statNumbers.forEach(stat => {
    const target = +stat.getAttribute('data-target');
    const increment = target / 50;

    const updateCount = () => {
      const current = +stat.innerText;
      if (current < target) {
        stat.innerText = Math.ceil(current + increment);
        setTimeout(updateCount, 30);
      } else {
        stat.innerText = target;
      }
    };
    updateCount();
  });
}

const statsSection = document.querySelector('.stats-card');
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !statsCounted) {
      statsCounted = true;
      countUp();
    }
  }, { threshold: 0.5 });
  observer.observe(statsSection);
}

// ----------------------------------------------------
// Contact Form Submission (Mock Handler)
// ----------------------------------------------------
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formStatus.className = 'form-status success';
    formStatus.textContent = '✓ Thank you! Your message has been sent successfully.';
    contactForm.reset();

    setTimeout(() => {
      formStatus.textContent = '';
    }, 5000);
  });
}

// ----------------------------------------------------
// Dynamic Year in Footer
// ----------------------------------------------------
document.getElementById('current-year').textContent = new Date().getFullYear();
