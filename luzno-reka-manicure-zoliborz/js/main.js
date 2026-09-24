// Luźno Ręka — interactions

document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var toggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { navLinks.classList.remove('open'); });
    });
  }

  // Navbar shadow on scroll
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        navbar.style.boxShadow = '0 8px 24px rgba(0,0,0,0.35)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    });
  }

  // Generic field validators
  function showError(field, show) {
    if (show) field.classList.add('has-error');
    else field.classList.remove('has-error');
  }

  function validateField(fieldEl, testFn) {
    var input = fieldEl.querySelector('input, select, textarea');
    var valid = testFn(input.value.trim());
    showError(fieldEl, !valid);
    return valid;
  }

  // Booking form
  var bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = bookingForm.querySelectorAll('.field');
      var valid = true;

      fields.forEach(function (f) {
        var key = f.getAttribute('data-field');
        var ok = true;
        if (key === 'name') ok = validateField(f, function (v) { return v.length >= 2; });
        if (key === 'phone') ok = validateField(f, function (v) { return /^[+0-9 ]{7,}$/.test(v); });
        if (key === 'service') ok = validateField(f, function (v) { return v.length > 0; });
        if (key === 'date') ok = validateField(f, function (v) { return v.length > 0; });
        if (key === 'time') ok = validateField(f, function (v) { return v.length > 0; });
        if (!ok) valid = false;
      });

      var successMsg = document.getElementById('bookingSuccess');
      if (valid) {
        successMsg.classList.add('show');
        bookingForm.reset();
        setTimeout(function () {
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      } else {
        successMsg.classList.remove('show');
      }
    });
  }

  // Contact form
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = contactForm.querySelectorAll('.field');
      var valid = true;

      fields.forEach(function (f) {
        var key = f.getAttribute('data-field');
        var ok = true;
        if (key === 'name') ok = validateField(f, function (v) { return v.length >= 2; });
        if (key === 'email') ok = validateField(f, function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); });
        if (key === 'message') ok = validateField(f, function (v) { return v.length >= 10; });
        if (!ok) valid = false;
      });

      var successMsg = document.getElementById('contactSuccess');
      if (valid) {
        successMsg.classList.add('show');
        contactForm.reset();
        setTimeout(function () {
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      } else {
        successMsg.classList.remove('show');
      }
    });
  }

  // Gallery lightbox
  var panels = document.querySelectorAll('.gallery-panel');
  var lightbox = document.getElementById('lightbox');
  if (panels.length && lightbox) {
    var lbTitle = document.getElementById('lightboxTitle');
    var lbDesc = document.getElementById('lightboxDesc');
    var lbIconWrap = document.getElementById('lightboxIcon');
    var lbClose = document.getElementById('lightboxClose');

    panels.forEach(function (p) {
      p.addEventListener('click', function () {
        lbTitle.textContent = p.getAttribute('data-title');
        lbDesc.textContent = p.getAttribute('data-desc');
        var srcIcon = p.querySelector('.g-icon');
        if (srcIcon) lbIconWrap.innerHTML = srcIcon.innerHTML;
        lightbox.classList.add('open');
      });
    });

    lbClose.addEventListener('click', function () { lightbox.classList.remove('open'); });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') lightbox.classList.remove('open');
    });
  }

});
