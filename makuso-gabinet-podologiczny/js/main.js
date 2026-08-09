document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
  }

  // Fade-in on scroll
  var fadeEls = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }

  function setError(group, show) {
    if (!group) return;
    group.classList.toggle('field-error', show);
  }

  function validateField(input, checkFn) {
    var group = input.closest('.form-group');
    var valid = checkFn(input.value.trim());
    setError(group, !valid);
    return valid;
  }

  var notEmpty = function (v) { return v.length > 0; };
  var isEmail = function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); };
  var isPhone = function (v) { return /^[+0-9 ()-]{7,}$/.test(v); };

  // Booking form
  var bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('name');
      var phone = document.getElementById('phone');
      var service = document.getElementById('service');
      var date = document.getElementById('date');
      var time = document.getElementById('time');

      var validName = validateField(name, notEmpty);
      var validPhone = validateField(phone, isPhone);
      var validService = validateField(service, notEmpty);
      var validDate = validateField(date, notEmpty);
      var validTime = validateField(time, notEmpty);

      if (validName && validPhone && validService && validDate && validTime) {
        bookingForm.reset();
        document.getElementById('bookingSuccess').classList.add('show');
        setTimeout(function () {
          document.getElementById('bookingSuccess').classList.remove('show');
        }, 6000);
      }
    });
  }

  // Contact form
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('c-name');
      var email = document.getElementById('c-email');
      var message = document.getElementById('c-message');

      var validName = validateField(name, notEmpty);
      var validEmail = validateField(email, isEmail);
      var validMessage = validateField(message, notEmpty);

      if (validName && validEmail && validMessage) {
        contactForm.reset();
        document.getElementById('contactSuccess').classList.add('show');
        setTimeout(function () {
          document.getElementById('contactSuccess').classList.remove('show');
        }, 6000);
      }
    });
  }
});
