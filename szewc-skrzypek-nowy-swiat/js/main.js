// Pracownia Szewska Ryszard Skrzypek — site interactions

document.addEventListener('DOMContentLoaded', function () {

  // Nav scroll state
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    });
  }

  // Mobile burger menu
  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { navLinks.classList.remove('open'); });
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

  // Gallery lightbox
  var lightbox = document.getElementById('lightbox');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lightboxClose = document.getElementById('lightboxClose');
  document.querySelectorAll('.masonry-item').forEach(function (item) {
    item.addEventListener('click', function () {
      var cap = item.querySelector('.cap');
      if (lightbox && lightboxCaption) {
        lightboxCaption.textContent = cap ? cap.textContent : '';
        lightbox.classList.add('open');
      }
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

  // Contact form validation
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      function check(id, condition) {
        var field = document.getElementById(id);
        if (!condition) {
          field.classList.add('invalid');
          valid = false;
        } else {
          field.classList.remove('invalid');
        }
      }

      var name = document.getElementById('name').value.trim();
      var phone = document.getElementById('phone').value.trim();
      var service = document.getElementById('service').value;
      var message = document.getElementById('message').value.trim();

      check('f-name', name.length >= 3);
      check('f-phone', /^[0-9+\s-]{7,}$/.test(phone));
      check('f-service', service !== '');
      check('f-message', message.length >= 5);

      var success = document.getElementById('formSuccess');
      if (valid) {
        success.classList.add('show');
        form.reset();
        setTimeout(function () { success.classList.remove('show'); }, 6000);
      } else if (success) {
        success.classList.remove('show');
      }
    });
  }

});
