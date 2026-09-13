document.addEventListener('DOMContentLoaded', function () {

  /* Mobile nav toggle */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('mobile-open');
    });
  }

  /* Nav shrink border/shadow feel is intrinsic (already opaque); add scroll shadow */
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

  /* Fade-in on scroll */
  var faders = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    faders.forEach(function (el) { io.observe(el); });
  } else {
    faders.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* Smooth-scroll for on-page anchors */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length > 1) {
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          links && links.classList.remove('mobile-open');
        }
      }
    });
  });

  /* ---------- Booking form validation ---------- */
  var bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      var fields = bookingForm.querySelectorAll('[data-required]');

      fields.forEach(function (field) {
        var wrapper = field.closest('.field');
        var value = field.value.trim();
        var ok = value.length > 0;

        if (ok && field.type === 'tel') {
          ok = /^[0-9+\s-]{7,}$/.test(value);
        }
        if (ok && field.type === 'date') {
          var chosen = new Date(value);
          var today = new Date();
          today.setHours(0, 0, 0, 0);
          ok = chosen >= today;
        }

        if (!ok) {
          valid = false;
          wrapper.classList.add('invalid');
        } else {
          wrapper.classList.remove('invalid');
        }
      });

      var success = document.getElementById('booking-success');
      if (valid) {
        bookingForm.reset();
        if (success) {
          success.classList.add('show');
          success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else if (success) {
        success.classList.remove('show');
      }
    });
  }

  /* ---------- Contact form validation ---------- */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      var fields = contactForm.querySelectorAll('[data-required]');

      fields.forEach(function (field) {
        var wrapper = field.closest('.field');
        var value = field.value.trim();
        var ok = value.length > 0;

        if (ok && field.type === 'email') {
          ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }
        if (ok && field.type === 'tel') {
          ok = /^[0-9+\s-]{7,}$/.test(value);
        }

        if (!ok) {
          valid = false;
          wrapper.classList.add('invalid');
        } else {
          wrapper.classList.remove('invalid');
        }
      });

      var success = document.getElementById('contact-success');
      if (valid) {
        contactForm.reset();
        if (success) {
          success.classList.add('show');
          success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else if (success) {
        success.classList.remove('show');
      }
    });
  }

  /* ---------- Lightbox ---------- */
  var lbOverlay = document.getElementById('lb-overlay');
  if (lbOverlay) {
    var lbBox = lbOverlay.querySelector('.lb-box');
    var lbCaption = lbOverlay.querySelector('.lb-caption');
    var lbClose = lbOverlay.querySelector('.lb-close');

    document.querySelectorAll('.lightbox-tile').forEach(function (tile) {
      tile.addEventListener('click', function () {
        var swatch = tile.querySelector('.swatch').innerHTML;
        var tag = tile.querySelector('.tag') ? tile.querySelector('.tag').textContent : '';
        lbBox.innerHTML = swatch;
        lbCaption.textContent = tag;
        lbOverlay.classList.add('open');
      });
    });

    function closeLb() { lbOverlay.classList.remove('open'); }
    lbClose && lbClose.addEventListener('click', closeLb);
    lbOverlay.addEventListener('click', function (e) {
      if (e.target === lbOverlay) closeLb();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLb();
    });
  }

  /* Minimum date = today for date inputs */
  var todayStr = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(function (input) {
    input.setAttribute('min', todayStr);
  });
});
