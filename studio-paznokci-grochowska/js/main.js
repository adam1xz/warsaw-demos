// Mobile nav toggle
const navBurger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
if (navBurger && navLinks) {
  navBurger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// Nav background on scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (nav) nav.style.boxShadow = window.scrollY > 30 ? '0 6px 20px rgba(58,50,44,0.08)' : 'none';
});

// Lightbox (gallery.html)
function openLightbox(el) {
  const lightbox = document.getElementById('lightbox');
  const title = document.getElementById('lightboxTitle');
  if (!lightbox) return;
  title.textContent = el.getAttribute('data-title') || 'Realizacja';
  lightbox.classList.add('open');
}
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) lightbox.classList.remove('open');
}
const lightboxEl = document.getElementById('lightbox');
if (lightboxEl) {
  lightboxEl.addEventListener('click', (e) => {
    if (e.target === lightboxEl) closeLightbox();
  });
}

// Generic field validation helper
function setError(id, message) {
  const span = document.getElementById('err-' + id);
  if (span) span.textContent = message;
}

// Booking form
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    const name = document.getElementById('bName').value.trim();
    const phone = document.getElementById('bPhone').value.trim();
    const service = document.getElementById('bService').value;
    const date = document.getElementById('bDate').value;
    const time = document.getElementById('bTime').value;

    setError('bName', ''); setError('bPhone', ''); setError('bService', ''); setError('bDate', ''); setError('bTime', '');

    if (name.length < 3) { setError('bName', 'Podaj imię i nazwisko (min. 3 znaki).'); valid = false; }
    if (!/^[0-9+ ]{9,15}$/.test(phone)) { setError('bPhone', 'Podaj prawidłowy numer telefonu.'); valid = false; }
    if (!service) { setError('bService', 'Wybierz usługę.'); valid = false; }
    if (!date) { setError('bDate', 'Wybierz datę.'); valid = false; }
    else if (new Date(date) < new Date(new Date().toDateString())) { setError('bDate', 'Data nie może być z przeszłości.'); valid = false; }
    if (!time) { setError('bTime', 'Wybierz godzinę.'); valid = false; }
    else if (time < '09:00' || time > '20:00') { setError('bTime', 'Rezerwacje przyjmujemy 9:00–20:00.'); valid = false; }

    if (!valid) return;

    document.getElementById('bookingSuccess').classList.add('show');
    bookingForm.reset();
  });
}

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    const name = document.getElementById('cName').value.trim();
    const email = document.getElementById('cEmail').value.trim();
    const message = document.getElementById('cMessage').value.trim();

    setError('cName', ''); setError('cEmail', ''); setError('cMessage', '');

    if (name.length < 2) { setError('cName', 'Podaj swoje imię.'); valid = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('cEmail', 'Podaj prawidłowy adres e-mail.'); valid = false; }
    if (message.length < 10) { setError('cMessage', 'Wiadomość powinna mieć min. 10 znaków.'); valid = false; }

    if (!valid) return;

    document.getElementById('contactSuccess').classList.add('show');
    contactForm.reset();
  });
}
