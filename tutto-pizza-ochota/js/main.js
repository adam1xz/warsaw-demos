// Nav scroll + mobile toggle
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  // Pizza menu tabs (gallery page)
  const tabs = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.pizza-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.target).classList.add('active');
    });
  });

  // Lightbox modal for pizza cards
  const overlay = document.querySelector('.modal-overlay');
  const modalTitle = document.querySelector('.modal-box h3');
  const modalDesc = document.querySelector('.modal-box p');
  const modalClose = document.querySelector('.modal-close');
  document.querySelectorAll('.pizza-card').forEach(card => {
    card.addEventListener('click', () => {
      if (!overlay) return;
      modalTitle.textContent = card.dataset.name;
      modalDesc.textContent = card.dataset.desc;
      overlay.classList.add('open');
    });
  });
  if (modalClose) modalClose.addEventListener('click', () => overlay.classList.remove('open'));
  if (overlay) overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });

  // Reservation form validation
  const reserveForm = document.getElementById('reserve-form');
  if (reserveForm) {
    reserveForm.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
      const fields = reserveForm.querySelectorAll('[required]');
      fields.forEach(field => {
        const group = field.closest('.form-group');
        if (!field.value.trim()) {
          group.classList.add('error');
          valid = false;
        } else {
          group.classList.remove('error');
        }
      });

      const phone = reserveForm.querySelector('#r-phone');
      if (phone && phone.value && !/^[+0-9 ]{7,15}$/.test(phone.value.trim())) {
        phone.closest('.form-group').classList.add('error');
        valid = false;
      }

      const dateField = reserveForm.querySelector('#r-date');
      if (dateField && dateField.value) {
        const chosen = new Date(dateField.value);
        const today = new Date();
        today.setHours(0,0,0,0);
        if (chosen < today) {
          dateField.closest('.form-group').classList.add('error');
          valid = false;
        }
      }

      if (valid) {
        reserveForm.reset();
        document.querySelectorAll('.form-group.error').forEach(g => g.classList.remove('error'));
        document.querySelector('.form-success').classList.add('show');
        setTimeout(() => document.querySelector('.form-success').classList.remove('show'), 6000);
      }
    });
  }

  // Contact form validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
      const name = contactForm.querySelector('#c-name');
      const email = contactForm.querySelector('#c-email');
      const message = contactForm.querySelector('#c-message');

      [name, message].forEach(field => {
        const group = field.closest('.form-group');
        if (!field.value.trim()) { group.classList.add('error'); valid = false; }
        else { group.classList.remove('error'); }
      });

      const emailGroup = email.closest('.form-group');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        emailGroup.classList.add('error');
        valid = false;
      } else {
        emailGroup.classList.remove('error');
      }

      if (valid) {
        contactForm.reset();
        document.querySelectorAll('.form-group.error').forEach(g => g.classList.remove('error'));
        document.querySelector('.form-success').classList.add('show');
        setTimeout(() => document.querySelector('.form-success').classList.remove('show'), 6000);
      }
    });
  }
});
