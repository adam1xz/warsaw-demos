document.addEventListener('DOMContentLoaded', function () {

  // Nav scroll state
  var nav = document.querySelector('.nav');
  function onScroll () {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Mobile nav toggle
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // Reveal on scroll
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  // Discipline tabs
  var tabBtns = document.querySelectorAll('.tab-btn');
  var panels = document.querySelectorAll('.menu-panel');
  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.getAttribute('data-tab');
      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      panels.forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      var panel = document.querySelector('.menu-panel[data-panel="' + target + '"]');
      if (panel) panel.classList.add('active');
    });
  });

  // Gallery lightbox
  var vignettes = document.querySelectorAll('.vignette');
  var lightbox = document.getElementById('lightbox');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lightboxClose = document.getElementById('lightboxClose');
  vignettes.forEach(function (v) {
    v.addEventListener('click', function () {
      if (!lightbox) return;
      lightboxCaption.textContent = v.getAttribute('data-caption') || '';
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

  // Trial-class booking form validation
  var bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = document.getElementById('bookingMsg');
      var name = document.getElementById('resName');
      var phone = document.getElementById('resPhone');
      var date = document.getElementById('resDate');
      var time = document.getElementById('resTime');
      var discipline = document.getElementById('resDiscipline');

      var phonePattern = /^[+0-9 ]{7,15}$/;

      if (!name.value.trim() || !phonePattern.test(phone.value.trim()) || !date.value || !time.value || !discipline.value) {
        msg.textContent = 'Uzupełnij poprawnie wszystkie pola (telefon: same cyfry, min. 7 znaków).';
        msg.className = 'form-msg show error';
        return;
      }

      msg.textContent = 'Dziękujemy, ' + name.value.trim() + '! Twój darmowy trening próbny (' + discipline.value + ') w dniu ' + date.value + ' o ' + time.value + ' został zgłoszony. Zadzwonimy, aby potwierdzić.';
      msg.className = 'form-msg show success';
      bookingForm.reset();
    });
  }

  // Contact form validation
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = document.getElementById('contactMsg');
      var name = document.getElementById('cName');
      var email = document.getElementById('cEmail');
      var message = document.getElementById('cMessage');

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name.value.trim() || !emailPattern.test(email.value.trim()) || !message.value.trim()) {
        msg.textContent = 'Sprawdź, czy podałeś poprawny adres e-mail i wypełniłeś wszystkie pola.';
        msg.className = 'form-msg show error';
        return;
      }

      msg.textContent = 'Wiadomość wysłana! Odpowiemy najszybciej, jak to możliwe.';
      msg.className = 'form-msg show success';
      contactForm.reset();
    });
  }

});
