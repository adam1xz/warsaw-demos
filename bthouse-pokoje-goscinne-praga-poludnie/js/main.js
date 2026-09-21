document.addEventListener('DOMContentLoaded', function () {

  // Nav background on scroll
  var nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    });
  }

  // Fade-in on scroll
  var faders = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    faders.forEach(function (el) { io.observe(el); });
  } else {
    faders.forEach(function (el) { el.classList.add('visible'); });
  }

  // Graceful fallback for any broken remote image
  var placeholder = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">' +
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0%" stop-color="#0d0221"/><stop offset="100%" stop-color="#1a0533"/></linearGradient></defs>' +
    '<rect width="100%" height="100%" fill="url(#g)"/>' +
    '<text x="400" y="290" font-family="Arial" font-size="30" font-weight="800" fill="#ff006e" text-anchor="middle">BTHouse</text>' +
    '<text x="400" y="330" font-family="Arial" font-size="16" fill="#ffbe0b" text-anchor="middle" letter-spacing="2">POKOJE GO&#346;CINNE &middot; PRAGA</text>' +
    '</svg>'
  );
  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('error', function () {
      if (img.dataset.fallbackApplied) return;
      img.dataset.fallbackApplied = '1';
      img.src = placeholder;
    });
  });

  // Lightbox
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lightboxImg = document.getElementById('lightboxImg');
    document.querySelectorAll('.masonry img').forEach(function (img) {
      img.addEventListener('click', function () {
        lightboxImg.src = img.dataset.full || img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
      });
    });
    document.getElementById('lightboxClose').addEventListener('click', function () {
      lightbox.classList.remove('open');
    });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
  }

  // Availability inquiry form validation
  var bookForm = document.getElementById('bookForm');
  if (bookForm) {
    bookForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      ['name', 'email', 'checkin', 'checkout', 'guests'].forEach(function (id) {
        var field = document.getElementById(id);
        var errorEl = field.parentElement.querySelector('.error-text');
        if (!field.value.trim()) {
          valid = false;
          if (errorEl) errorEl.classList.add('visible');
        } else if (errorEl) {
          errorEl.classList.remove('visible');
        }
      });

      var emailField = document.getElementById('email');
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailField.value.trim() && !emailPattern.test(emailField.value.trim())) {
        valid = false;
        emailField.parentElement.querySelector('.error-text').classList.add('visible');
      }

      var checkin = document.getElementById('checkin');
      var checkout = document.getElementById('checkout');
      var dateErrorEl = checkout.parentElement.querySelector('.error-text');
      if (checkin.value && checkout.value && checkout.value <= checkin.value) {
        valid = false;
        if (dateErrorEl) {
          dateErrorEl.textContent = 'Data wymeldowania musi być późniejsza niż data zameldowania.';
          dateErrorEl.classList.add('visible');
        }
      }

      if (!valid) return;

      var successMsg = document.getElementById('successMsg');
      var name = document.getElementById('name').value.trim();
      successMsg.textContent = 'Dziękujemy, ' + name + '! Zapytanie o dostępność (' + checkin.value + ' – ' + checkout.value + ') zostało wysłane — odpowiemy najszybciej jak to możliwe.';
      successMsg.classList.add('visible');
      bookForm.reset();
    });
  }

});
