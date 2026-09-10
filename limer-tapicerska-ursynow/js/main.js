document.addEventListener('DOMContentLoaded', function () {
  var nav = document.querySelector('.site-nav');
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

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

  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lbInner = lightbox.querySelector('.lightbox-inner-content');
    var lbCap = lightbox.querySelector('.lightbox-cap');
    document.querySelectorAll('.gallery-item').forEach(function (item) {
      item.addEventListener('click', function () {
        var svg = item.querySelector('svg');
        var cap = item.getAttribute('data-caption') || '';
        if (svg && lbInner) {
          lbInner.innerHTML = '';
          lbInner.appendChild(svg.cloneNode(true));
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
  var isEmail = function (v) { return v.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); };
  var isPhone = function (v) { return /^[0-9+ ()-]{6,}$/.test(v); };

  setupForm('quote-form', 'quote-success', [
    { selector: '#q-name', test: notEmpty, message: 'Podaj swoje imię i nazwisko.' },
    { selector: '#q-phone', test: isPhone, message: 'Podaj poprawny numer telefonu.' },
    { selector: '#q-item', test: notEmpty, message: 'Wybierz rodzaj mebla.' },
    { selector: '#q-message', test: notEmpty, message: 'Opisz krótko swój mebel.' }
  ]);

  setupForm('contact-form', 'contact-success', [
    { selector: '#c-name', test: notEmpty, message: 'Podaj swoje imię.' },
    { selector: '#c-email', test: isEmail, message: 'Podaj poprawny adres e-mail.' },
    { selector: '#c-message', test: notEmpty, message: 'Napisz kilka słów wiadomości.' }
  ]);
});
