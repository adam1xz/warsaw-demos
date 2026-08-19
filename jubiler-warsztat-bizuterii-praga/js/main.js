document.addEventListener('DOMContentLoaded', function () {
  var navbar = document.getElementById('navbar');
  var navLinks = document.getElementById('navLinks');
  var navToggle = document.getElementById('navToggle');

  if (navbar) {
    var onScroll = function () {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else if (navbar.dataset.forceScrolled !== 'true') {
        navbar.classList.remove('scrolled');
      }
    };
    if (navbar.classList.contains('scrolled')) {
      navbar.dataset.forceScrolled = 'true';
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
  }

  document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
    });
  });

  // Fade-in on scroll
  var revealTargets = document.querySelectorAll('.service-row, .sepia-panel, .about .column, .pull-quote blockquote, .stat');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(function (el) {
      el.style.opacity = 0;
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity .7s ease, transform .7s ease';
      observer.observe(el);
    });

    setTimeout(function () {
      revealTargets.forEach(function (el) {
        el.style.opacity = 1;
        el.style.transform = 'translateY(0)';
      });
    }, 4000);
  }

  // Appointment form validation
  var bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      var name = document.getElementById('name');
      var phone = document.getElementById('phone');
      var service = document.getElementById('service');
      var date = document.getElementById('date');
      var time = document.getElementById('time');

      var nameError = document.getElementById('nameError');
      var phoneError = document.getElementById('phoneError');
      var serviceError = document.getElementById('serviceError');
      var dateError = document.getElementById('dateError');
      var timeError = document.getElementById('timeError');

      [nameError, phoneError, serviceError, dateError, timeError].forEach(function (el) {
        if (el) el.textContent = '';
      });

      if (!name.value.trim() || name.value.trim().length < 3) {
        nameError.textContent = 'Podaj imię i nazwisko (min. 3 znaki).';
        valid = false;
      }
      var phonePattern = /^[0-9+\s-]{7,15}$/;
      if (!phonePattern.test(phone.value.trim())) {
        phoneError.textContent = 'Podaj poprawny numer telefonu.';
        valid = false;
      }
      if (!service.value) {
        serviceError.textContent = 'Wybierz rodzaj usługi.';
        valid = false;
      }
      if (!date.value) {
        dateError.textContent = 'Wybierz datę.';
        valid = false;
      } else {
        var chosen = new Date(date.value);
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        if (chosen < today) {
          dateError.textContent = 'Data nie może być z przeszłości.';
          valid = false;
        }
      }
      if (!time.value) {
        timeError.textContent = 'Wybierz godzinę.';
        valid = false;
      } else if (time.value < '10:00' || time.value > '18:00') {
        timeError.textContent = 'Wybierz godzinę w zakresie 10:00–18:00.';
        valid = false;
      }

      if (valid) {
        var successBox = document.getElementById('successBox');
        successBox.classList.add('show');
        bookingForm.reset();
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // Gallery lightbox
  var masonry = document.getElementById('masonry');
  var lightbox = document.getElementById('lightbox');
  if (masonry && lightbox) {
    var lightboxTitle = document.getElementById('lightboxTitle');
    var lightboxDesc = document.getElementById('lightboxDesc');
    var lightboxClose = document.getElementById('lightboxClose');

    masonry.querySelectorAll('.sepia-panel').forEach(function (item) {
      item.addEventListener('click', function () {
        lightboxTitle.textContent = item.dataset.title || '';
        lightboxDesc.textContent = item.dataset.desc || '';
        lightbox.classList.add('show');
      });
    });

    lightboxClose.addEventListener('click', function () {
      lightbox.classList.remove('show');
    });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) lightbox.classList.remove('show');
    });
  }
});
