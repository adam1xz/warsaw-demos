// Nav background on scroll
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// Footer year
document.querySelectorAll('.footer-year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
}

// Menu tabs
const tabs = document.querySelectorAll('.menu-tab');
const panels = document.querySelectorAll('.menu-panel');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.target).classList.add('active');
  });
});

// Gallery lightbox
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const title = document.getElementById('lightbox-title');
  const desc = document.getElementById('lightbox-desc');
  document.querySelectorAll('.g-tile').forEach(tile => {
    tile.addEventListener('click', () => {
      title.textContent = tile.dataset.title || '';
      desc.textContent = tile.dataset.desc || '';
      lightbox.classList.add('open');
    });
  });
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
    lightbox.classList.remove('open');
  });
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('open');
  });
}

// Reservation form validation
const resForm = document.getElementById('reservation-form');
if (resForm) {
  resForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('r-name');
    const phone = document.getElementById('r-phone');
    const date = document.getElementById('r-date');
    const time = document.getElementById('r-time');
    const guests = document.getElementById('r-guests');
    const msg = resForm.querySelector('.form-msg');

    let error = '';
    if (!name.value.trim()) error = 'Podaj imię i nazwisko.';
    else if (!/^[0-9+\s-]{7,}$/.test(phone.value.trim())) error = 'Podaj poprawny numer telefonu.';
    else if (!date.value) error = 'Wybierz datę rezerwacji.';
    else if (!time.value) error = 'Wybierz godzinę rezerwacji.';
    else if (!guests.value) error = 'Wybierz liczbę gości.';

    if (error) {
      msg.style.color = '#e07a7a';
      msg.textContent = error;
      return;
    }

    msg.style.color = '';
    msg.textContent = `Dziękujemy, ${name.value.trim()}! Rezerwacja na ${guests.value} os. w dniu ${date.value} o ${time.value} została zapisana. Zadzwonimy, aby potwierdzić.`;
    resForm.reset();
  });
}

// Contact page inquiry form (if present)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('c-name');
    const email = document.getElementById('c-email');
    const message = document.getElementById('c-message');
    const msg = contactForm.querySelector('.form-msg');

    let error = '';
    if (!name.value.trim()) error = 'Podaj imię i nazwisko.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) error = 'Podaj poprawny adres e-mail.';
    else if (!message.value.trim()) error = 'Napisz kilka słów wiadomości.';

    if (error) {
      msg.style.color = '#e07a7a';
      msg.textContent = error;
      return;
    }

    msg.style.color = '';
    msg.textContent = 'Dziękujemy za wiadomość! Odpowiemy najszybciej, jak to możliwe.';
    contactForm.reset();
  });
}
