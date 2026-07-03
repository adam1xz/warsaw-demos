document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { navLinks.classList.remove('open'); });
    });
  }

  // Nav shadow on scroll
  var nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 12) {
        nav.style.boxShadow = '0 4px 0 rgba(0,0,0,0.06)';
      } else {
        nav.style.boxShadow = 'none';
      }
    });
  }

  // Gallery lightbox
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lbTitle = document.getElementById('lightboxTitle');
    var lbDesc = document.getElementById('lightboxDesc');
    var lbIcon = document.getElementById('lightboxIcon');
    var lbClose = document.getElementById('lightboxClose');

    document.querySelectorAll('.gallery-item').forEach(function (item) {
      item.addEventListener('click', function () {
        var svg = item.querySelector('svg');
        lbTitle.textContent = item.getAttribute('data-title') || '';
        lbDesc.textContent = item.getAttribute('data-desc') || '';
        lbIcon.innerHTML = svg ? svg.innerHTML : '';
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

  // Contact / inquiry form validation
  var form = document.getElementById('inquiryForm');
  if (form) {
    var successBox = document.getElementById('formSuccess');

    function setError(fieldEl, hasError) {
      var wrapper = fieldEl.closest('.field');
      wrapper.classList.toggle('invalid', hasError);
    }

    function isValidEmail(v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    }

    function isValidPhone(v) {
      var digits = v.replace(/[^0-9]/g, '');
      return digits.length >= 9;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('name');
      var phone = document.getElementById('phone');
      var email = document.getElementById('email');
      var message = document.getElementById('message');

      var valid = true;

      if (name.value.trim().length < 2) { setError(name, true); valid = false; }
      else { setError(name, false); }

      if (!isValidPhone(phone.value)) { setError(phone, true); valid = false; }
      else { setError(phone, false); }

      if (email.value.trim().length > 0 && !isValidEmail(email.value)) { setError(email, true); valid = false; }
      else { setError(email, false); }

      if (message.value.trim().length < 5) { setError(message, true); valid = false; }
      else { setError(message, false); }

      if (!valid) {
        successBox.classList.remove('show');
        return;
      }

      successBox.classList.add('show');
      form.reset();
      successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
});
