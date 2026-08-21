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

// Booking form validation
const bookingForm = document.querySelector('#booking-form');
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = bookingForm.querySelector('#b-name');
    const phone = bookingForm.querySelector('#b-phone');
    const service = bookingForm.querySelector('#b-service');
    const date = bookingForm.querySelector('#b-date');
    const time = bookingForm.querySelector('#b-time');
    const msg = bookingForm.querySelector('.form-msg');

    const phonePattern = /^[0-9+ -]{7,15}$/;
    let error = '';

    if (!name.value.trim()) error = 'Podaj proszę swoje imię i nazwisko.';
    else if (!phonePattern.test(phone.value.trim())) error = 'Podaj prawidłowy numer telefonu.';
    else if (!service.value) error = 'Wybierz zabieg, na który chcesz się umówić.';
    else if (!date.value) error = 'Wybierz preferowaną datę wizyty.';
    else if (!time.value) error = 'Wybierz preferowaną godzinę wizyty.';

    msg.classList.remove('show', 'ok', 'err');
    if (error) {
      msg.textContent = error;
      msg.classList.add('show', 'err');
      return;
    }

    msg.textContent = `Dziękujemy, ${name.value.trim()}! Twoja prośba o wizytę (${service.options[service.selectedIndex].text}, ${date.value} o ${time.value}) została wysłana. Zadzwonimy, aby potwierdzić termin.`;
    msg.classList.add('show', 'ok');
    bookingForm.reset();
  });
}

// Contact form validation
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('#c-name');
    const email = contactForm.querySelector('#c-email');
    const message = contactForm.querySelector('#c-message');
    const msg = contactForm.querySelector('.form-msg');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let error = '';
    if (!name.value.trim()) error = 'Podaj proszę swoje imię.';
    else if (!emailPattern.test(email.value.trim())) error = 'Podaj prawidłowy adres e-mail.';
    else if (!message.value.trim() || message.value.trim().length < 10) error = 'Wiadomość powinna mieć co najmniej 10 znaków.';

    msg.classList.remove('show', 'ok', 'err');
    if (error) {
      msg.textContent = error;
      msg.classList.add('show', 'err');
      return;
    }

    msg.textContent = 'Dziękujemy za wiadomość! Odpowiemy najszybciej, jak to możliwe.';
    msg.classList.add('show', 'ok');
    contactForm.reset();
  });
}

// Gallery lightbox
const lightbox = document.querySelector('#lightbox');
if (lightbox) {
  document.querySelectorAll('.gallery-card').forEach(card => {
    card.addEventListener('click', () => {
      lightbox.querySelector('#lightbox-title').textContent = card.dataset.title;
      lightbox.querySelector('#lightbox-desc').textContent = card.dataset.desc;
      lightbox.classList.add('open');
    });
  });
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.closest('.lightbox-close')) {
      lightbox.classList.remove('open');
    }
  });
}
