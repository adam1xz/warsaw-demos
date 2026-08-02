document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('nav.links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // Highlight active nav link
  var here = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav.links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === here || (here === '' && href === 'index.html')) a.classList.add('active');
  });

  // Scroll fade-in reveal
  var revealEls = document.querySelectorAll('.fade-in, .product-card');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  // Lightbox for gallery
  var lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    var lightboxInner = lightbox.querySelector('.lightbox-inner-content');
    document.querySelectorAll('.masonry-item').forEach(function (item) {
      item.addEventListener('click', function () {
        lightboxInner.innerHTML = item.querySelector('.tile').innerHTML;
        lightbox.classList.add('open');
      });
    });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.closest('.lightbox-close')) {
        lightbox.classList.remove('open');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') lightbox.classList.remove('open');
    });
  }

  // Generic form validation + success message
  document.querySelectorAll('form[data-validate]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      form.querySelectorAll('[required]').forEach(function (field) {
        var errorEl = field.parentElement.querySelector('.field-error');
        var value = field.value.trim();
        var fieldValid = value.length > 0;

        if (field.type === 'tel' && value) {
          fieldValid = /^[+0-9 ()-]{7,}$/.test(value);
        }
        if (field.type === 'email' && value) {
          fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }
        if (field.type === 'date' && value) {
          var chosen = new Date(value);
          var today = new Date();
          today.setHours(0, 0, 0, 0);
          fieldValid = chosen >= today;
        }

        if (!fieldValid) {
          valid = false;
          field.style.borderColor = '#c4622d';
          if (errorEl) {
            errorEl.textContent = field.type === 'date'
              ? 'Wybierz dzisiejszą datę lub późniejszą.'
              : field.type === 'tel'
              ? 'Podaj poprawny numer telefonu.'
              : field.type === 'email'
              ? 'Podaj poprawny adres e-mail.'
              : 'To pole jest wymagane.';
          }
        } else {
          field.style.borderColor = '';
          if (errorEl) errorEl.textContent = '';
        }
      });

      var msg = form.querySelector('.form-msg');
      if (valid) {
        if (msg) {
          msg.textContent = form.dataset.successMsg || 'Dziękujemy! Zgłoszenie zostało wysłane — odezwiemy się wkrótce.';
          msg.classList.remove('error');
          msg.classList.add('success', 'show');
        }
        form.reset();
      } else if (msg) {
        msg.textContent = 'Popraw zaznaczone pola i spróbuj ponownie.';
        msg.classList.remove('success');
        msg.classList.add('error', 'show');
      }
    });
  });

  // Set min date on date inputs to today
  var todayStr = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(function (input) {
    input.setAttribute('min', todayStr);
  });
});
