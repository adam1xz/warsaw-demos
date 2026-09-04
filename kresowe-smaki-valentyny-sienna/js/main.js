(function () {
  var nav = document.querySelector('nav');
  var onScroll = function () {
    if (window.scrollY > 40) nav.classList.add('solid');
    else nav.classList.remove('solid');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle) toggle.addEventListener('click', function () { links.classList.toggle('open'); });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.14 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  var figs = Array.prototype.slice.call(document.querySelectorAll('.gal figure'));
  if (figs.length) {
    var box = document.querySelector('.lightbox');
    var big = box.querySelector('img');
    var idx = 0;
    var show = function (i) {
      idx = (i + figs.length) % figs.length;
      big.src = figs[idx].querySelector('img').dataset.full || figs[idx].querySelector('img').src;
      box.classList.add('on');
      document.body.style.overflow = 'hidden';
    };
    var hide = function () { box.classList.remove('on'); document.body.style.overflow = ''; };
    figs.forEach(function (f, i) { f.addEventListener('click', function () { show(i); }); });
    box.querySelector('.lb-close').addEventListener('click', hide);
    box.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); show(idx - 1); });
    box.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); show(idx + 1); });
    box.addEventListener('click', function (e) { if (e.target === box) hide(); });
    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('on')) return;
      if (e.key === 'Escape') hide();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }

  var form = document.querySelector('form[data-validate]');
  if (form) {
    var today = new Date().toISOString().split('T')[0];
    var dateInput = form.querySelector('input[type="date"]');
    if (dateInput) dateInput.min = today;

    var fail = function (field, msg) {
      field.classList.add('bad');
      field.querySelector('.err').textContent = msg;
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll('.field').forEach(function (f) { f.classList.remove('bad'); });

      var name = form.querySelector('#imie');
      if (name.value.trim().length < 2) { fail(name.closest('.field'), 'Prosimy podać imię.'); ok = false; }

      var tel = form.querySelector('#telefon');
      if (!/^[+]?[0-9\s-]{9,16}$/.test(tel.value.trim())) { fail(tel.closest('.field'), 'Numer telefonu wygląda na niepełny.'); ok = false; }

      var mail = form.querySelector('#email');
      if (mail && mail.value.trim() && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(mail.value.trim())) {
        fail(mail.closest('.field'), 'Sprawdź adres e-mail.'); ok = false;
      }

      var data = form.querySelector('#data');
      if (data) {
        if (!data.value) { fail(data.closest('.field'), 'Wybierz dzień odbioru.'); ok = false; }
        else {
          var d = new Date(data.value + 'T00:00:00').getDay();
          if (d === 0 || d === 6) { fail(data.closest('.field'), 'W weekend bistro jest zamknięte. Wybierz dzień od poniedziałku do piątku.'); ok = false; }
        }
      }

      var godz = form.querySelector('#godzina');
      if (godz && !godz.value) { fail(godz.closest('.field'), 'Wybierz godzinę.'); ok = false; }

      if (!ok) { form.querySelector('.field.bad input, .field.bad select').focus(); return; }

      form.querySelectorAll('.field, .row, button[type="submit"], .form-note').forEach(function (el) { el.style.display = 'none'; });
      var msg = form.querySelector('.ok-msg');
      msg.classList.add('on');
      msg.innerHTML = 'Dziękujemy, ' + name.value.trim().split(' ')[0] +
        '. Zamówienie zostało zapisane w formularzu demonstracyjnym i nie zostało nigdzie wysłane.<br>' +
        'Aby faktycznie zamówić, prosimy zadzwonić: <strong>796 820 030</strong>.';
    });
  }
})();
