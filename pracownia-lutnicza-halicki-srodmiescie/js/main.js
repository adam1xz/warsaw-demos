// Pracownia Lutnicza Mateusz Halicki — site scripts

document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
  }

  // Nav background on scroll (kept solid for brutalist style, but adds shadow depth)
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  // Reveal-on-scroll animation
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // Gallery lightbox
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lbSvg = document.getElementById('lbSvg');
    const lbTitle = document.getElementById('lbTitle');
    const lbDesc = document.getElementById('lbDesc');
    const lbClose = document.getElementById('lbClose');

    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const svg = item.querySelector('svg');
        lbSvg.innerHTML = svg ? svg.innerHTML : '';
        lbSvg.setAttribute('viewBox', svg ? svg.getAttribute('viewBox') : '0 0 100 100');
        lbTitle.textContent = item.dataset.title || '';
        lbDesc.textContent = item.dataset.desc || '';
        lightbox.classList.add('open');
      });
    });

    const closeLightbox = () => lightbox.classList.remove('open');
    lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
  }

  // Booking / contact form validation
  const form = document.getElementById('bookingForm');
  if (form) {
    const success = document.getElementById('formSuccess');

    const validators = {
      name: v => v.trim().length >= 3,
      phone: v => /^[+0-9 ()-]{7,}$/.test(v.trim()),
      instrument: v => v !== '',
      date: v => v !== ''
    };

    const validateField = (row) => {
      const field = row.dataset.field;
      const input = row.querySelector('input, select, textarea');
      if (!validators[field]) return true;
      const ok = validators[field](input.value);
      row.classList.toggle('invalid', !ok);
      return ok;
    };

    form.querySelectorAll('.form-row[data-field]').forEach(row => {
      const input = row.querySelector('input, select, textarea');
      input.addEventListener('blur', () => validateField(row));
      input.addEventListener('input', () => { if (row.classList.contains('invalid')) validateField(row); });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let allValid = true;
      form.querySelectorAll('.form-row[data-field]').forEach(row => {
        if (!validateField(row)) allValid = false;
      });

      if (allValid) {
        success.classList.add('show');
        form.querySelectorAll('input, select, textarea').forEach(el => {
          if (el.type !== 'submit') el.value = '';
        });
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        const firstInvalid = form.querySelector('.form-row.invalid');
        if (firstInvalid) firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

});
