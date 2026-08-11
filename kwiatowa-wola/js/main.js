document.addEventListener('DOMContentLoaded', function () {
  var nav = document.getElementById('siteNav');
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');

  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 40) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
  }

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

  var form = document.getElementById('orderForm');
  if (form) {
    var success = document.getElementById('formSuccess');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      var name = document.getElementById('name');
      var phone = document.getElementById('phone');
      var date = document.getElementById('date');

      var checks = [
        { field: name, err: 'err-name', test: function (v) { return v.trim().length > 1; } },
        { field: phone, err: 'err-phone', test: function (v) { return /^[0-9+()\s-]{7,}$/.test(v.trim()); } },
        { field: date, err: 'err-date', test: function (v) { return v.trim().length > 0; } }
      ];

      checks.forEach(function (c) {
        var errEl = document.getElementById(c.err);
        if (!c.test(c.field.value)) {
          errEl.style.display = 'block';
          c.field.style.borderColor = '#ff006e';
          valid = false;
        } else {
          errEl.style.display = 'none';
          c.field.style.borderColor = 'rgba(255,255,255,0.15)';
        }
      });

      if (valid) {
        success.style.display = 'block';
        form.reset();
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }
});
