document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav toggle
  const burger = document.getElementById('navBurger');
  const links = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', () => links.classList.toggle('open'));
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));

  // Sticky nav background on scroll
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if (nav) nav.style.boxShadow = window.scrollY > 20
      ? '0 4px 18px rgba(0,53,84,0.12)'
      : '0 2px 14px rgba(0,53,84,0.08)';
  });

  // Menu tabs
  const tabs = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.add('active');
    });
  });

  // Reservation form validation
  const form = document.getElementById('reservationForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const setError = (fieldId, show) => {
        const field = document.getElementById(fieldId);
        field.classList.toggle('error', show);
        if (show) valid = false;
      };

      const name = document.getElementById('name').value.trim();
      setError('field-name', name.length < 3);

      const phone = document.getElementById('phone').value.trim();
      setError('field-phone', !/^[0-9+\s-]{7,}$/.test(phone));

      const date = document.getElementById('date').value;
      setError('field-date', !date);

      const time = document.getElementById('time').value;
      setError('field-time', !time);

      const guests = document.getElementById('guests').value;
      setError('field-guests', !guests);

      const success = document.getElementById('formSuccess');
      if (valid) {
        success.classList.add('show');
        form.reset();
        setTimeout(() => success.classList.remove('show'), 6000);
      } else {
        success.classList.remove('show');
      }
    });
  }
});
