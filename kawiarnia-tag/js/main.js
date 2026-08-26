document.addEventListener('DOMContentLoaded', function () {
  // Sticky nav background on scroll
  var nav = document.getElementById('mainNav');
  function onScroll() {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Mobile nav toggle
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // Menu tabs (index page)
  var tabBtns = document.querySelectorAll('.tab-btn[data-tab]');
  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.getAttribute('data-tab');
      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      document.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });
      var panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });

  // Gallery filter (gallery page)
  var filterBtns = document.querySelectorAll('.tab-btn[data-filter]');
  var tiles = document.querySelectorAll('.g-tile[data-cat]');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      tiles.forEach(function (tile) {
        if (filter === 'all' || tile.getAttribute('data-cat') === filter) {
          tile.style.display = '';
        } else {
          tile.style.display = 'none';
        }
      });
    });
  });

  // Lightbox
  var lightbox = document.getElementById('lightbox');
  var lightboxClose = document.getElementById('lightboxClose');
  document.querySelectorAll('.full-gallery .g-tile').forEach(function (tile) {
    tile.addEventListener('click', function () {
      if (lightbox) lightbox.classList.add('open');
    });
  });
  if (lightboxClose) {
    lightboxClose.addEventListener('click', function () { lightbox.classList.remove('open'); });
  }
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
  }

  // Reservation form validation
  var form = document.getElementById('reservationForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      var fields = [
        { id: 'date', check: function (v) { return v.trim() !== ''; }, msg: 'Wybierz datę.' },
        { id: 'time', check: function (v) { return v.trim() !== ''; }, msg: 'Wybierz godzinę.' },
        { id: 'name', check: function (v) { return v.trim().length > 1; }, msg: 'Podaj imię i nazwisko.' },
        { id: 'email', check: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }, msg: 'Podaj poprawny adres e-mail.' },
        { id: 'phone', check: function (v) { return /^[+0-9 ]{7,}$/.test(v); }, msg: 'Podaj poprawny numer telefonu.' }
      ];

      fields.forEach(function (f) {
        var input = document.getElementById(f.id);
        var wrapper = input.closest('.field');
        var errorEl = wrapper.querySelector('.error-msg');
        if (!f.check(input.value)) {
          wrapper.classList.add('error');
          errorEl.textContent = f.msg;
          valid = false;
        } else {
          wrapper.classList.remove('error');
          errorEl.textContent = '';
        }
      });

      var success = document.getElementById('formSuccess');
      if (valid) {
        form.reset();
        success.classList.add('show');
        setTimeout(function () { success.classList.remove('show'); }, 6000);
      } else if (success) {
        success.classList.remove('show');
      }
    });
  }
});
