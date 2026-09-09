document.addEventListener('DOMContentLoaded', function () {
  // Nav scroll state
  var nav = document.querySelector('.site-nav');
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
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

  // Lightbox for gallery
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lbInner = lightbox.querySelector('.lightbox-inner svg');
    var lbCap = lightbox.querySelector('.lightbox-cap');
    document.querySelectorAll('.gallery-item').forEach(function (item) {
      item.addEventListener('click', function () {
        var svg = item.querySelector('svg');
        var cap = item.getAttribute('data-caption') || '';
        if (svg && lbInner) {
          lbInner.outerHTML = svg.outerHTML;
          lbInner = lightbox.querySelector('.lightbox-inner svg');
        }
        if (lbCap) lbCap.textContent = cap;
        lightbox.classList.add('open');
      });
    });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
        lightbox.classList.remove('open');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') lightbox.classList.remove('open');
    });
  }

  // Generic form validation helper
  function validateField(field, testFn, message) {
    var wrap = field.closest('.field');
    var errorEl = wrap ? wrap.querySelector('.error-msg') : null;
    var ok = testFn(field.value.trim());
    if (wrap) wrap.classList.toggle('invalid', !ok);
    if (errorEl && message) errorEl.textContent = message;
    return ok;
  }

  function setupForm(formId, successId, rules) {
    var form = document.getElementById(formId);
    if (!form) return;
    var success = document.getElementById(successId);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var allValid = true;
      rules.forEach(function (rule) {
        var field = form.querySelector(rule.selector);
        if (!field) return;
        var valid = validateField(field, rule.test, rule.message);
        if (!valid) allValid = false;
      });
      if (allValid) {
        form.reset();
        form.querySelectorAll('.field.invalid').forEach(function (f) { f.classList.remove('invalid'); });
        if (success) {
          success.classList.add('show');
          setTimeout(function () { success.classList.remove('show'); }, 6000);
        }
      }
    });
  }

  var notEmpty = function (v) { return v.length > 0; };
  var isEmail = function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); };
  var isPhone = function (v) { return v.length === 0 || /^[0-9+ ()-]{6,}$/.test(v); };

  setupForm('contact-form', 'contact-success', [
    { selector: '#c-name', test: notEmpty, message: 'Podaj swoje imię.' },
    { selector: '#c-email', test: isEmail, message: 'Podaj poprawny adres e-mail.' },
    { selector: '#c-message', test: notEmpty, message: 'Napisz kilka słów wiadomości.' }
  ]);

  setupForm('booking-form', 'booking-success', [
    { selector: '#b-name', test: notEmpty, message: 'Podaj swoje imię.' },
    { selector: '#b-email', test: isEmail, message: 'Podaj poprawny adres e-mail.' },
    { selector: '#b-workshop', test: notEmpty, message: 'Wybierz rodzaj warsztatu.' },
    { selector: '#b-date', test: notEmpty, message: 'Wybierz preferowaną datę.' },
    { selector: '#b-time', test: notEmpty, message: 'Wybierz preferowaną godzinę.' }
  ]);
});
