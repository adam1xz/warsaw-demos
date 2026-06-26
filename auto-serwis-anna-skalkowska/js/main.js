// Auto Serwis Anna Skałkowska — site interactions

document.addEventListener('DOMContentLoaded', function () {

  // Scroll-triggered fade-ins
  var fadeEls = document.querySelectorAll('.fade-in');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  fadeEls.forEach(function (el) { observer.observe(el); });

  // Nav background on scroll
  var nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        nav.style.boxShadow = '0 2px 18px rgba(0,0,0,0.05)';
      } else {
        nav.style.boxShadow = 'none';
      }
    });
  }

  // Booking form validation (homepage)
  var bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      var name = document.getElementById('name');
      var phone = document.getElementById('phone');
      var service = document.getElementById('service');
      var date = document.getElementById('date');

      var errName = document.getElementById('err-name');
      var errPhone = document.getElementById('err-phone');
      var errService = document.getElementById('err-service');
      var errDate = document.getElementById('err-date');

      [errName, errPhone, errService, errDate].forEach(function (e) { e.textContent = ''; });

      if (!name.value.trim()) { errName.textContent = 'Podaj imię i nazwisko.'; valid = false; }

      var phonePattern = /^[+]?[\d\s-]{7,15}$/;
      if (!phone.value.trim() || !phonePattern.test(phone.value.trim())) {
        errPhone.textContent = 'Podaj poprawny numer telefonu.'; valid = false;
      }

      if (!service.value) { errService.textContent = 'Wybierz rodzaj usługi.'; valid = false; }

      if (!date.value) {
        errDate.textContent = 'Wybierz preferowaną datę.'; valid = false;
      } else {
        var chosen = new Date(date.value);
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        if (chosen < today) { errDate.textContent = 'Data nie może być z przeszłości.'; valid = false; }
      }

      if (valid) {
        document.getElementById('form-success').classList.add('visible');
        bookingForm.reset();
        setTimeout(function () {
          document.getElementById('form-success').classList.remove('visible');
        }, 6000);
      }
    });
  }

  // Contact form validation
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      var name = document.getElementById('c-name');
      var email = document.getElementById('c-email');
      var message = document.getElementById('c-message');

      var errName = document.getElementById('c-err-name');
      var errEmail = document.getElementById('c-err-email');
      var errMessage = document.getElementById('c-err-message');

      [errName, errEmail, errMessage].forEach(function (e) { e.textContent = ''; });

      if (!name.value.trim()) { errName.textContent = 'Podaj imię i nazwisko.'; valid = false; }

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
        errEmail.textContent = 'Podaj poprawny adres e-mail.'; valid = false;
      }

      if (!message.value.trim() || message.value.trim().length < 5) {
        errMessage.textContent = 'Wiadomość jest zbyt krótka.'; valid = false;
      }

      if (valid) {
        document.getElementById('contact-success').classList.add('visible');
        contactForm.reset();
        setTimeout(function () {
          document.getElementById('contact-success').classList.remove('visible');
        }, 6000);
      }
    });
  }

  // Gallery lightbox
  var tiles = document.querySelectorAll('.masonry .tile');
  var lightbox = document.getElementById('lightbox');
  if (tiles.length && lightbox) {
    var lbSvg = document.getElementById('lightbox-svg');
    var lbTitle = document.getElementById('lightbox-title');
    var lbDesc = document.getElementById('lightbox-desc');

    tiles.forEach(function (tile) {
      tile.addEventListener('click', function () {
        var innerSvg = tile.querySelector('svg');
        lbSvg.innerHTML = innerSvg ? innerSvg.innerHTML : '';
        lbTitle.textContent = tile.getAttribute('data-title') || '';
        lbDesc.textContent = tile.getAttribute('data-desc') || '';
        lightbox.classList.add('open');
      });
    });

    document.getElementById('lightbox-close').addEventListener('click', function () {
      lightbox.classList.remove('open');
    });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
  }

});
