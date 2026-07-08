document.addEventListener('DOMContentLoaded', function () {

  // Nav scroll state
  var nav = document.getElementById('nav');
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Mobile nav toggle
  var toggle = document.getElementById('navToggle');
  var navList = document.getElementById('navList');
  if (toggle && navList) {
    toggle.addEventListener('click', function () {
      navList.classList.toggle('open');
    });
    navList.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { navList.classList.remove('open'); });
    });
  }

  // Reservation form validation
  var form = document.getElementById('reserveForm');
  if (form) {
    var success = document.getElementById('formSuccess');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      function setError(id, msg) {
        var el = document.getElementById('err-' + id);
        if (el) el.textContent = msg || '';
        if (msg) valid = false;
      }

      var name = form.querySelector('#r-name');
      setError('name', name && name.value.trim().length >= 2 ? '' : 'Podaj imię i nazwisko');

      var phone = form.querySelector('#r-phone');
      var phoneOk = phone && /^[\d +()-]{7,}$/.test(phone.value.trim());
      setError('phone', phoneOk ? '' : 'Podaj poprawny numer telefonu');

      var email = form.querySelector('#r-email');
      if (email) {
        var emailOk = email.value.trim() === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
        setError('email', emailOk ? '' : 'Podaj poprawny adres e-mail');
      }

      var date = form.querySelector('#r-date');
      var dateOk = false;
      if (date && date.value) {
        var chosen = new Date(date.value + 'T00:00:00');
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        dateOk = chosen >= today;
      }
      setError('date', dateOk ? '' : 'Wybierz przyszłą datę');

      var time = form.querySelector('#r-time');
      var timeOk = false;
      if (time && time.value) {
        var parts = time.value.split(':').map(Number);
        var minutes = parts[0] * 60 + parts[1];
        timeOk = minutes >= 12 * 60 && minutes <= 22 * 60;
      }
      setError('time', timeOk ? '' : 'Godziny otwarcia: 12:00–22:00');

      var guests = form.querySelector('#r-guests');
      setError('guests', guests && guests.value ? '' : 'Wybierz liczbę gości');

      if (valid) {
        form.reset();
        if (success) {
          success.classList.add('show');
          setTimeout(function () { success.classList.remove('show'); }, 6000);
        }
      }
    });
  }

  // Gallery lightbox
  var tiles = document.querySelectorAll('.gallery-tile');
  var lightbox = document.getElementById('lightbox');
  if (tiles.length && lightbox) {
    var lbVisual = document.getElementById('lightboxVisual');
    var lbTitle = document.getElementById('lightboxTitle');
    var lbDesc = document.getElementById('lightboxDesc');
    var lbPrice = document.getElementById('lightboxPrice');
    var lbClose = document.getElementById('lightboxClose');

    tiles.forEach(function (tile) {
      tile.addEventListener('click', function () {
        var title = tile.getAttribute('data-title');
        var desc = tile.getAttribute('data-desc');
        var price = tile.getAttribute('data-price');
        var visualClass = tile.querySelector('.tile-visual').className.match(/pv-\d/);

        lbTitle.textContent = title;
        lbDesc.textContent = desc;
        lbPrice.textContent = price ? price : '';
        lbVisual.className = 'lightbox-visual ' + (visualClass ? visualClass[0] : 'pv-1');
        lightbox.classList.add('open');
      });
    });

    function closeLightbox() { lightbox.classList.remove('open'); }
    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

});
