// Mari Nails Studio — site interactions

document.addEventListener('DOMContentLoaded', () => {
  // Sticky nav background on scroll
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  // Lightbox
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const stage = lightbox.querySelector('.lightbox-stage');
    const caption = lightbox.querySelector('.lightbox-caption');
    const figs = Array.from(document.querySelectorAll('.masonry figure'));
    let current = 0;

    const openAt = (i) => {
      current = i;
      const fig = figs[current];
      stage.className = 'lightbox-stage ' + (fig.dataset.art || '');
      stage.innerHTML = fig.querySelector('svg').outerHTML;
      caption.textContent = fig.querySelector('figcaption') ? fig.querySelector('figcaption').textContent : '';
      lightbox.classList.add('open');
    };
    const close = () => lightbox.classList.remove('open');
    const next = () => openAt((current + 1) % figs.length);
    const prev = () => openAt((current - 1 + figs.length) % figs.length);

    figs.forEach((fig, i) => fig.addEventListener('click', () => openAt(i)));
    lightbox.querySelector('.lightbox-close').addEventListener('click', close);
    lightbox.querySelector('.lightbox-next').addEventListener('click', next);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', prev);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    });
  }

  // Booking form validation
  const form = document.querySelector('#booking-form');
  if (form) {
    const successBox = document.querySelector('.form-success');
    const validators = {
      name: v => v.trim().length >= 2,
      phone: v => /^[+0-9 ()-]{7,}$/.test(v.trim()),
      service: v => v !== '',
      date: v => v !== '',
      time: v => v !== ''
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      Object.keys(validators).forEach(field => {
        const input = form.querySelector(`[name="${field}"]`);
        if (!input) return;
        const row = input.closest('.form-row');
        const ok = validators[field](input.value);
        row.classList.toggle('invalid', !ok);
        if (!ok) valid = false;
      });

      if (valid) {
        successBox.classList.add('show');
        form.reset();
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => successBox.classList.remove('show'), 6000);
      }
    });

    form.querySelectorAll('input, select').forEach(el => {
      el.addEventListener('input', () => el.closest('.form-row').classList.remove('invalid'));
    });

    // Prevent booking dates in the past
    const dateInput = form.querySelector('[name="date"]');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
    }
  }
});
