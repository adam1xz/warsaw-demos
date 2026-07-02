// Nav scroll state
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navLinks.style.display = navLinks.classList.contains('open') ? 'flex' : '';
  });
}

// Fade-in on scroll
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
fadeEls.forEach(el => observer.observe(el));

// Booking form validation
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const service = document.getElementById('service');
    const date = document.getElementById('date');
    const time = document.getElementById('time');

    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    const serviceError = document.getElementById('serviceError');
    const dateError = document.getElementById('dateError');
    const timeError = document.getElementById('timeError');

    [nameError, phoneError, serviceError, dateError, timeError].forEach(el => el.style.display = 'none');

    if (!name.value.trim()) { nameError.style.display = 'block'; valid = false; }
    const phonePattern = /^[0-9+\s-]{7,15}$/;
    if (!phonePattern.test(phone.value.trim())) { phoneError.style.display = 'block'; valid = false; }
    if (!service.value) { serviceError.style.display = 'block'; valid = false; }
    if (!date.value) { dateError.style.display = 'block'; valid = false; }
    if (!time.value) {
      timeError.style.display = 'block'; valid = false;
    } else {
      const [h, m] = time.value.split(':').map(Number);
      const minutes = h * 60 + m;
      if (minutes < 9 * 60 || minutes > 19 * 60) { timeError.style.display = 'block'; valid = false; }
    }

    if (valid) {
      document.getElementById('formSuccess').style.display = 'block';
      bookingForm.reset();
      setTimeout(() => { document.getElementById('formSuccess').style.display = 'none'; }, 6000);
    }
  });
}

// Contact form validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    const cname = document.getElementById('cname');
    const cemail = document.getElementById('cemail');
    const cmessage = document.getElementById('cmessage');

    const cnameError = document.getElementById('cnameError');
    const cemailError = document.getElementById('cemailError');
    const cmessageError = document.getElementById('cmessageError');

    [cnameError, cemailError, cmessageError].forEach(el => el.style.display = 'none');

    if (!cname.value.trim()) { cnameError.style.display = 'block'; valid = false; }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(cemail.value.trim())) { cemailError.style.display = 'block'; valid = false; }
    if (!cmessage.value.trim()) { cmessageError.style.display = 'block'; valid = false; }

    if (valid) {
      document.getElementById('contactSuccess').style.display = 'block';
      contactForm.reset();
      setTimeout(() => { document.getElementById('contactSuccess').style.display = 'none'; }, 6000);
    }
  });
}

// Gallery lightbox
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const items = document.querySelectorAll('.gallery-item');
  const lightboxIcon = document.getElementById('lightboxIcon');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');

  items.forEach(item => {
    item.addEventListener('click', () => {
      lightboxIcon.textContent = item.querySelector('.g-icon').textContent;
      lightboxTitle.textContent = item.dataset.title || '';
      lightboxDesc.textContent = item.dataset.desc || '';
      lightbox.classList.add('open');
    });
  });

  lightboxClose.addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('open');
  });
}
