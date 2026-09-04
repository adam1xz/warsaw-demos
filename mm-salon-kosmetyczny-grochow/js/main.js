document.addEventListener('DOMContentLoaded', function () {
  // footer year
  document.querySelectorAll('.footer-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // nav background on scroll
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 40) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  // booking form validation
  var form = document.getElementById('booking-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = form.querySelector('.form-msg');
      var name = form.querySelector('#b-name').value.trim();
      var phone = form.querySelector('#b-phone').value.trim();
      var service = form.querySelector('#b-service').value;
      var date = form.querySelector('#b-date').value;
      var time = form.querySelector('#b-time').value;

      msg.classList.remove('ok', 'err');

      if (!name || !phone || !service || !date || !time) {
        msg.textContent = 'Uzupełnij wszystkie pola, aby zarezerwować termin.';
        msg.classList.add('err', 'show');
        return;
      }
      var phonePattern = /^[0-9+\s-]{7,15}$/;
      if (!phonePattern.test(phone)) {
        msg.textContent = 'Podaj prawidłowy numer telefonu.';
        msg.classList.add('err', 'show');
        return;
      }

      msg.textContent = 'Dziękujemy, ' + name + '! Twoja prośba o rezerwację (' + service + ', ' + date + ' o ' + time + ') została przyjęta. Skontaktujemy się, aby potwierdzić termin.';
      msg.classList.add('ok', 'show');
      form.reset();
    });
  }

  // lightbox for gallery
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lbCard = lightbox.querySelector('.lightbox-card');
    var lbTitle = document.getElementById('lightbox-title');
    var lbDesc = document.getElementById('lightbox-desc');
    var closeBtn = lightbox.querySelector('.lightbox-close');

    document.querySelectorAll('.gallery-card').forEach(function (card) {
      card.addEventListener('click', function () {
        lbTitle.textContent = card.getAttribute('data-title');
        lbDesc.textContent = card.getAttribute('data-desc');
        lbCard.style.background = card.style.background;
        lightbox.classList.add('open');
      });
    });
    closeBtn.addEventListener('click', function () {
      lightbox.classList.remove('open');
    });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
  }

  // contact form validation (contact page)
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = contactForm.querySelector('.form-msg');
      var name = contactForm.querySelector('#c-name').value.trim();
      var email = contactForm.querySelector('#c-email').value.trim();
      var message = contactForm.querySelector('#c-message').value.trim();

      msg.classList.remove('ok', 'err');

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!name || !email || !message) {
        msg.textContent = 'Uzupełnij wszystkie pola formularza.';
        msg.classList.add('err', 'show');
        return;
      }
      if (!emailPattern.test(email)) {
        msg.textContent = 'Podaj prawidłowy adres e-mail.';
        msg.classList.add('err', 'show');
        return;
      }

      msg.textContent = 'Dziękujemy za wiadomość, ' + name + '! Odpowiemy najszybciej, jak to możliwe.';
      msg.classList.add('ok', 'show');
      contactForm.reset();
    });
  }
});
