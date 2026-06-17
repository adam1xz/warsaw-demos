// Nav scroll
const nav = document.querySelector('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// Hero bg parallax
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  heroBg.classList.add('loaded');
  window.addEventListener('scroll', () => {
    heroBg.style.transform = `scale(1.05) translateY(${window.scrollY * 0.2}px)`;
  });
}

// Scroll fade-in
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));

// Contact form
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    const service = form.querySelector('[name="service"]').value;
    const errors = [];
    if (!name) errors.push('Imię jest wymagane');
    if (!phone.match(/^\+?[\d\s\-]{9,15}$/)) errors.push('Podaj poprawny numer telefonu');
    if (!service) errors.push('Wybierz usługę');
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }
    document.getElementById('formSuccess').style.display = 'block';
    form.reset();
    setTimeout(() => {
      document.getElementById('formSuccess').style.display = 'none';
    }, 5000);
  });
}
