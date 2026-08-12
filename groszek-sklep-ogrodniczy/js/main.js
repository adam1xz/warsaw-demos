// Sklep Ogrodniczy "Groszek" — nav, scroll reveal, lightbox, form validation

document.addEventListener('DOMContentLoaded', function () {

  // Nav scroll background + mobile toggle
  var nav = document.getElementById('siteNav');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { navLinks.classList.remove('open'); });
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // Gallery lightbox
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lbIcon = document.getElementById('lightboxIcon');
    var lbTitle = document.getElementById('lightboxTitle');
    var lbDesc = document.getElementById('lightboxDesc');
    var lbClose = document.getElementById('lightboxClose');

    document.querySelectorAll('.plate-card').forEach(function (card) {
      card.addEventListener('click', function () {
        var svg = card.querySelector('svg');
        lbIcon.innerHTML = svg ? svg.outerHTML : '';
        lbTitle.textContent = card.querySelector('h4') ? card.querySelector('h4').textContent : '';
        lbDesc.textContent = card.getAttribute('data-desc') || '';
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

  // Newsletter form (index)
  var newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = document.getElementById('newsletterContact');
      var error = document.getElementById('newsletterError');
      var success = document.getElementById('newsletterSuccess');
      var value = input.value.trim();
      var isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      var isPhone = /^[0-9+\s-]{7,}$/.test(value);

      if (!value || (!isEmail && !isPhone)) {
        error.style.display = 'block';
        success.classList.remove('show');
        return;
      }
      error.style.display = 'none';
      success.classList.add('show');
      newsletterForm.reset();
    });
  }

  // Contact form (contact.html)
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      function setField(name, ok) {
        var field = contactForm.querySelector('[data-field="' + name + '"]');
        if (!field) return;
        field.classList.toggle('invalid', !ok);
        if (!ok) valid = false;
      }

      var name = document.getElementById('name').value.trim();
      var reach = document.getElementById('reach').value;
      var contactValue = document.getElementById('contactValue').value.trim();
      var product = document.getElementById('product').value.trim();
      var message = document.getElementById('message').value.trim();

      setField('name', name.length > 1);
      setField('reach', reach !== '');

      var isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactValue);
      var isPhone = /^[0-9+\s-]{7,}$/.test(contactValue);
      setField('contactValue', isEmail || isPhone);

      setField('product', product.length > 1);
      setField('message', message.length > 3);

      var success = document.getElementById('contactSuccess');
      if (!valid) {
        success.classList.remove('show');
        return;
      }
      success.classList.add('show');
      contactForm.reset();
      contactForm.querySelectorAll('.field').forEach(function (f) { f.classList.remove('invalid'); });
    });
  }
});
