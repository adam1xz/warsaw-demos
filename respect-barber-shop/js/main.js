// Nav scroll
const nav = document.querySelector('nav');
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// Hamburger
const ham = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (ham) {
  ham.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// Hero bg parallax
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  setTimeout(() => heroBg.classList.add('loaded'), 100);
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    heroBg.style.transform = `scale(1) translateY(${scrolled * 0.3}px)`;
  });
}

// Fade-up observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
if (lightbox) {
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.querySelector('img').src;
      lightboxImg.src = src;
      lightbox.classList.add('open');
    });
  });
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
      lightbox.classList.remove('open');
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') lightbox.classList.remove('open');
  });
}

// Contact form validation
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    const required = form.querySelectorAll('[required]');
    required.forEach(el => {
      el.style.borderColor = '';
      if (!el.value.trim()) {
        el.style.borderColor = '#e55';
        valid = false;
      }
    });
    const phone = form.querySelector('#phone');
    if (phone && phone.value && !/^\+?[\d\s\-()]{7,}$/.test(phone.value)) {
      phone.style.borderColor = '#e55';
      valid = false;
    }
    if (valid) {
      form.style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
    }
  });
}

// Animate stat numbers
const statNums = document.querySelectorAll('.stat-num[data-target]');
if (statNums.length) {
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.target);
      const isDecimal = String(target).includes('.');
      const duration = 1500;
      const start = performance.now();
      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const val = eased * target;
        el.textContent = isDecimal ? val.toFixed(1) : Math.round(val) + (el.dataset.suffix || '');
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
      statObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => statObserver.observe(el));
}
