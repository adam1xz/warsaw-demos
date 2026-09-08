(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- year ---------- */
  $$('#yr').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- nav ---------- */
  var nav = $('#nav');
  var isSub = nav && nav.classList.contains('scrolled');
  function onScroll() {
    if (!nav || isSub) return;
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var toggle = $('#navToggle'), links = $('#navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () { links.classList.toggle('open'); });
    $$('a', links).forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  /* ---------- reveal on scroll ---------- */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e, i) {
        if (!e.isIntersecting) return;
        var el = e.target;
        setTimeout(function () { el.classList.add('in'); }, i * 70);
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- hero parallax ---------- */
  var hero = $('.hero');
  if (hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (y < window.innerHeight * 1.2) {
        hero.style.setProperty('--par', (y * 0.22) + 'px');
      }
    }, { passive: true });
  }

  /* ---------- highlight today's opening hours ---------- */
  var hours = $('#hours');
  if (hours) {
    var d = String(new Date().getDay());
    var row = hours.querySelector('[data-day="' + d + '"]');
    if (row) {
      row.classList.add('today');
      var tag = document.createElement('span');
      tag.textContent = ' (dziś)';
      tag.style.cssText = 'font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--coral)';
      row.querySelector('span').appendChild(tag);
    }
  }

  /* ---------- validation helpers ---------- */
  function wrap(el) { return el.closest('[data-field]'); }
  function setErr(el, bad) {
    var f = wrap(el);
    if (f) f.classList.toggle('invalid', !!bad);
    return !bad;
  }
  function clearOnInput(form) {
    $$('input,select,textarea', form).forEach(function (el) {
      el.addEventListener('input', function () { setErr(el, false); });
      el.addEventListener('change', function () { setErr(el, false); });
    });
  }
  var mailRe = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
  var telRe = /^[+0-9 ()-]{9,18}$/;

  /* ---------- order form ---------- */
  var orderForm = $('#orderForm');
  if (orderForm) {
    var dayInput = $('#dzien');
    var min = new Date(); min.setDate(min.getDate() + 1);
    var max = new Date(); max.setDate(max.getDate() + 30);
    var iso = function (dt) { return dt.toISOString().slice(0, 10); };
    dayInput.min = iso(min);
    dayInput.max = iso(max);
    dayInput.value = iso(min);

    clearOnInput(orderForm);

    orderForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      var imie = $('#imie'), tel = $('#tel'), ryba = $('#ryba'), waga = $('#waga'), god = $('#godzina');

      ok = setErr(imie, imie.value.trim().length < 3) && ok;
      ok = setErr(tel, !telRe.test(tel.value.trim())) && ok;
      ok = setErr(ryba, !ryba.value) && ok;
      var w = parseFloat(waga.value);
      ok = setErr(waga, !(w >= 1 && w <= 20)) && ok;
      ok = setErr(god, !god.value) && ok;

      var dv = dayInput.value;
      ok = setErr(dayInput, !dv || dv < dayInput.min || dv > dayInput.max) && ok;

      if (!ok) {
        var first = $('.field.invalid', orderForm);
        if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      var pretty = new Date(dv + 'T12:00:00').toLocaleDateString('pl-PL', {
        weekday: 'long', day: 'numeric', month: 'long'
      });
      $('#orderSummary').textContent =
        'Odkładamy: ' + ryba.value + ', ' + w.toFixed(1).replace('.', ',') +
        ' kg. Odbiór ' + pretty + ', ' + god.value + '.';
      $('#orderFields').style.display = 'none';
      $('#orderOk').classList.add('show');
      $('#orderOk').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    $('#orderAgain').addEventListener('click', function () {
      orderForm.reset();
      dayInput.value = iso(min);
      $('#orderOk').classList.remove('show');
      $('#orderFields').style.display = '';
    });
  }

  /* ---------- contact form ---------- */
  var contactForm = $('#contactForm');
  if (contactForm) {
    clearOnInput(contactForm);
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var imie = $('#cImie'), mail = $('#cMail'), temat = $('#cTemat'), tresc = $('#cTresc');
      var ok = true;
      ok = setErr(imie, imie.value.trim().length < 2) && ok;
      ok = setErr(mail, !mailRe.test(mail.value.trim())) && ok;
      ok = setErr(temat, !temat.value) && ok;
      ok = setErr(tresc, tresc.value.trim().length < 10) && ok;
      if (!ok) {
        var first = $('.field.invalid', contactForm);
        if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
      $('#contactSummary').textContent = 'Temat: ' + temat.value + '. Potwierdzenie poszło na ' + mail.value.trim() + '.';
      $('#contactFields').style.display = 'none';
      $('#contactOk').classList.add('show');
    });
    $('#contactAgain').addEventListener('click', function () {
      contactForm.reset();
      $('#contactOk').classList.remove('show');
      $('#contactFields').style.display = '';
    });
  }

  /* ---------- newsletter ---------- */
  var newsForm = $('#newsForm');
  if (newsForm) {
    newsForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = $('#newsEmail'), msg = $('#newsMsg');
      var v = input.value.trim();
      if (!mailRe.test(v)) {
        msg.className = 'msg bad';
        msg.textContent = 'Podaj poprawny adres e-mail, np. jan@poczta.pl';
        input.focus();
        return;
      }
      msg.className = 'msg ok';
      msg.textContent = 'Zapisane. W czwartek wyślemy listę tego, co świeże.';
      input.value = '';
    });
  }

  /* ---------- lightbox ---------- */
  var tiles = $$('.tile');
  if (tiles.length) {
    var lb = $('#lb'), lbImg = $('#lbImg'), lbCap = $('#lbCap');
    var idx = 0;

    function show(i) {
      idx = (i + tiles.length) % tiles.length;
      var t = tiles[idx];
      lbImg.src = t.getAttribute('data-full');
      lbImg.alt = t.getAttribute('data-cap') || '';
      lbCap.textContent = t.getAttribute('data-cap') || '';
    }
    function open(i) { show(i); lb.classList.add('open'); document.body.style.overflow = 'hidden'; }
    function close() { lb.classList.remove('open'); document.body.style.overflow = ''; }

    tiles.forEach(function (t, i) {
      t.addEventListener('click', function () { open(i); });
    });
    $('#lbClose').addEventListener('click', close);
    $('#lbPrev').addEventListener('click', function (e) { e.stopPropagation(); show(idx - 1); });
    $('#lbNext').addEventListener('click', function (e) { e.stopPropagation(); show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }
})();
