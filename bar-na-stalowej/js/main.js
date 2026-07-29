document.addEventListener('DOMContentLoaded', function () {
  // mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
  }

  // nav background on scroll
  var nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        nav.style.background = 'rgba(20,5,8,0.98)';
      } else {
        nav.style.background = 'rgba(26,6,10,0.92)';
      }
    });
  }

  // menu tabs
  var tabs = document.querySelectorAll('.menu-tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = tab.getAttribute('data-tab');
      tabs.forEach(function (t) { t.classList.remove('active'); });
      document.querySelectorAll('.menu-panel').forEach(function (p) { p.classList.remove('active'); });
      tab.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });

  // booking form validation
  var bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = document.getElementById('formMsg');
      var name = document.getElementById('name').value.trim();
      var phone = document.getElementById('phone').value.trim();
      var date = document.getElementById('date').value;
      var time = document.getElementById('time').value;
      var guests = document.getElementById('guests').value;

      if (!name || !phone || !date || !time || !guests) {
        msg.textContent = 'Prosimy wypełnić wszystkie wymagane pola przed wysłaniem rezerwacji.';
        msg.classList.add('visible', 'error');
        return;
      }
      var phonePattern = /^[0-9+ ()-]{6,}$/;
      if (!phonePattern.test(phone)) {
        msg.textContent = 'Podany numer telefonu wygląda nieprawidłowo. Sprawdź i spróbuj ponownie.';
        msg.classList.add('visible', 'error');
        return;
      }
      msg.classList.remove('error');
      msg.textContent = 'Dziękujemy, ' + name + '! Twoja rezerwacja na ' + date + ' o godz. ' + time + ' została przyjęta. Zadzwonimy, aby potwierdzić stolik.';
      msg.classList.add('visible');
      bookingForm.reset();
    });
  }

  // contact form validation
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = document.getElementById('contactMsg');
      var name = document.getElementById('cname').value.trim();
      var email = document.getElementById('cemail').value.trim();
      var message = document.getElementById('cmessage').value.trim();
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        msg.textContent = 'Uzupełnij imię, e-mail oraz treść wiadomości.';
        msg.classList.add('visible', 'error');
        return;
      }
      if (!emailPattern.test(email)) {
        msg.textContent = 'Podany adres e-mail wygląda nieprawidłowo.';
        msg.classList.add('visible', 'error');
        return;
      }
      msg.classList.remove('error');
      msg.textContent = 'Dziękujemy za wiadomość, ' + name + '! Odpiszemy najszybciej, jak to możliwe.';
      msg.classList.add('visible');
      contactForm.reset();
    });
  }

  // gallery lightbox
  var lightbox = document.getElementById('lightbox');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lightboxClose = document.getElementById('lightboxClose');
  var vignettes = document.querySelectorAll('.vignette[data-caption]');
  vignettes.forEach(function (v) {
    v.style.cursor = 'pointer';
    v.addEventListener('click', function () {
      if (!lightbox) return;
      lightboxCaption.textContent = v.getAttribute('data-caption');
      lightbox.classList.add('open');
    });
  });
  if (lightboxClose) {
    lightboxClose.addEventListener('click', function () {
      lightbox.classList.remove('open');
    });
  }
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
  }

  // minimum date = today for booking
  var dateInput = document.getElementById('date');
  if (dateInput) {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var dd = String(today.getDate()).padStart(2, '0');
    dateInput.setAttribute('min', yyyy + '-' + mm + '-' + dd);
  }
});
