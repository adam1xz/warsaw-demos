// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  // Generic field validation helper
  function validateField(field, condition) {
    if (condition) {
      field.classList.remove('invalid');
      return true;
    }
    field.classList.add('invalid');
    return false;
  }

  // Reservation / event sign-up form
  const reserveForm = document.getElementById('reserve-form');
  if (reserveForm) {
    reserveForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const name = document.getElementById('r-name');
      valid = validateField(name.closest('.field'), name.value.trim().length > 1) && valid;

      const phone = document.getElementById('r-phone');
      valid = validateField(phone.closest('.field'), /^[0-9+\s-]{7,15}$/.test(phone.value.trim())) && valid;

      const date = document.getElementById('r-date');
      valid = validateField(date.closest('.field'), !!date.value) && valid;

      const time = document.getElementById('r-time');
      valid = validateField(time.closest('.field'), !!time.value) && valid;

      const guests = document.getElementById('r-guests');
      valid = validateField(guests.closest('.field'), Number(guests.value) >= 1 && Number(guests.value) <= 40) && valid;

      const successBox = document.getElementById('reserve-success');
      if (valid) {
        successBox.classList.add('show');
        successBox.textContent = `Dzięki, ${name.value.trim()}! Zgłoszenie na ${date.value} (${time.value}) dla ${guests.value} os. zostało wysłane. Odpowiemy telefonicznie lub mailowo w ciągu 24h.`;
        reserveForm.reset();
      } else {
        successBox.classList.remove('show');
      }
    });
  }

  // Newsletter form
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('newsletter-email');
      const msg = document.getElementById('newsletter-msg');
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      if (valid) {
        msg.textContent = 'Zapisano! Będziemy informować o najbliższych wydarzeniach.';
        msg.style.color = '#000';
        newsletterForm.reset();
      } else {
        msg.textContent = 'Podaj poprawny adres e-mail.';
        msg.style.color = '#e63946';
      }
    });
  }

  // Contact page form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const cname = document.getElementById('c-name');
      valid = validateField(cname.closest('.field'), cname.value.trim().length > 1) && valid;

      const cemail = document.getElementById('c-email');
      valid = validateField(cemail.closest('.field'), /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cemail.value.trim())) && valid;

      const cmsg = document.getElementById('c-message');
      valid = validateField(cmsg.closest('.field'), cmsg.value.trim().length > 5) && valid;

      const successBox = document.getElementById('contact-success');
      if (valid) {
        successBox.classList.add('show');
        successBox.textContent = `Dzięki, ${cname.value.trim()}! Twoja wiadomość została wysłana — odpowiemy najszybciej jak się da.`;
        contactForm.reset();
      } else {
        successBox.classList.remove('show');
      }
    });
  }

  // Nav background on scroll (kept solid per brutalist style, but adds shadow)
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        nav.style.boxShadow = '0 4px 0 rgba(0,0,0,0.05)';
      } else {
        nav.style.boxShadow = 'none';
      }
    });
  }
});
