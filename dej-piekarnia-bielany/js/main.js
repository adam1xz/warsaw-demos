document.addEventListener('DOMContentLoaded', function () {
  var nav = document.querySelector('.site-nav');
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.fade-in').forEach(function (el) { observer.observe(el); });

  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lbInner = lightbox.querySelector('.lightbox-inner');
    var lbCap = lightbox.querySelector('.lightbox-cap');
    document.querySelectorAll('.gallery-item').forEach(function (item) {
      item.addEventListener('click', function () {
        var svg = item.querySelector('svg');
        lbInner.innerHTML = svg ? svg.outerHTML : '';
        lbCap.textContent = item.getAttribute('data-caption') || '';
        lightbox.classList.add('open');
      });
    });
    lightbox.querySelector('.lightbox-close').addEventListener('click', function () {
      lightbox.classList.remove('open');
    });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
  }

  var form = document.getElementById('order-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      var today = new Date();
      today.setHours(0, 0, 0, 0);

      form.querySelectorAll('[required]').forEach(function (field) {
        var wrap = field.closest('.field');
        var bad = !field.value.trim();
        if (field.type === 'date' && field.value) {
          var picked = new Date(field.value);
          if (picked < today) bad = true;
        }
        if (field.type === 'email' && field.value) {
          var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!re.test(field.value)) bad = true;
        }
        if (bad) { valid = false; wrap.classList.add('invalid'); }
        else { wrap.classList.remove('invalid'); }
      });

      var success = document.getElementById('form-success');
      if (valid) {
        form.reset();
        success.classList.add('show');
        setTimeout(function () { success.classList.remove('show'); }, 6000);
      } else if (success) {
        success.classList.remove('show');
      }
    });
  }

  var newsletter = document.getElementById('newsletter-form');
  if (newsletter) {
    newsletter.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = newsletter.querySelector('input[type="email"]');
      var msg = document.getElementById('newsletter-success');
      var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (input && re.test(input.value)) {
        input.value = '';
        if (msg) { msg.classList.add('show'); setTimeout(function () { msg.classList.remove('show'); }, 5000); }
      }
    });
  }
});
