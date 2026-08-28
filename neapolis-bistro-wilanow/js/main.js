/* Neapolis Bistro — site interactions */
(function(){
  "use strict";

  /* ---------- Graceful image fallback ---------------------------------
     Any element with a background image sourced from an external CDN
     (data-img) gets a solid-colour / gradient placeholder if the photo
     fails to load, so the layout never shows a broken image. */
  function fallbackDataUri(seed, label){
    var palette = [
      ["#0077b6","#e07a5f"],
      ["#02507f","#f4e4c1"],
      ["#e07a5f","#0077b6"]
    ];
    var c = palette[seed % palette.length];
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="' + c[0] + '"/><stop offset="1" stop-color="' + c[1] + '"/>' +
      '</linearGradient></defs>' +
      '<rect width="800" height="800" fill="url(#g)"/>' +
      '<circle cx="400" cy="330" r="120" fill="rgba(255,255,255,0.14)"/>' +
      '<path d="M0 560 Q133 500 266 560 T532 560 T800 560 V800 H0 Z" fill="rgba(255,255,255,0.16)"/>' +
      '<text x="400" y="430" font-family="Georgia,serif" font-size="40" fill="#ffffff" ' +
      'text-anchor="middle" opacity="0.92">' + (label || 'Neapolis') + '</text>' +
      '</svg>';
    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
  }

  function wireImageFallbacks(){
    var nodes = document.querySelectorAll('[data-img]');
    nodes.forEach(function(el, i){
      var url = el.getAttribute('data-img');
      var probe = new Image();
      var applied = false;
      var applyFallback = function(){
        if(applied) return;
        applied = true;
        el.style.setProperty('--img', 'url("' + fallbackDataUri(i, 'Neapolis Bistro') + '")');
      };
      probe.onload = function(){
        if(!applied){ el.style.setProperty('--img', 'url("' + url + '")'); }
      };
      probe.onerror = applyFallback;
      probe.src = url;
      // safety timeout in case the request hangs
      setTimeout(function(){ if(!applied && !probe.complete){ /* leave loading */ } }, 6000);
    });
  }

  /* ---------- Navbar ---------- */
  function initNav(){
    var nav = document.querySelector('.navbar');
    var toggle = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');
    if(nav){
      var onScroll = function(){
        if(window.scrollY > 40){ nav.classList.add('scrolled'); }
        else { nav.classList.remove('scrolled'); }
      };
      window.addEventListener('scroll', onScroll);
      onScroll();
    }
    if(toggle && links){
      toggle.addEventListener('click', function(){
        links.classList.toggle('open');
      });
      links.querySelectorAll('a').forEach(function(a){
        a.addEventListener('click', function(){ links.classList.remove('open'); });
      });
    }
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal(){
    var els = document.querySelectorAll('.reveal');
    if(!('IntersectionObserver' in window)){
      els.forEach(function(el){ el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach(function(el){ io.observe(el); });
  }

  /* ---------- Menu tabs ---------- */
  function initMenuTabs(){
    var tabs = document.querySelectorAll('.menu-tab');
    var panels = document.querySelectorAll('.menu-panel');
    if(!tabs.length) return;
    tabs.forEach(function(tab){
      tab.addEventListener('click', function(){
        var target = tab.getAttribute('data-tab');
        tabs.forEach(function(t){ t.classList.remove('active'); });
        panels.forEach(function(p){ p.classList.remove('active'); });
        tab.classList.add('active');
        document.getElementById(target).classList.add('active');
      });
    });
  }

  /* ---------- Gallery lightbox ---------- */
  function initLightbox(){
    var items = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));
    var lightbox = document.querySelector('.lightbox');
    if(!items.length || !lightbox) return;
    var content = lightbox.querySelector('.lightbox-content');
    var caption = lightbox.querySelector('.lightbox-caption');
    var closeBtn = lightbox.querySelector('.lightbox-close');
    var prevBtn = lightbox.querySelector('.lightbox-prev');
    var nextBtn = lightbox.querySelector('.lightbox-next');
    var idx = 0;

    function show(i){
      idx = (i + items.length) % items.length;
      var el = items[idx];
      var bg = getComputedStyle(el).getPropertyValue('--img') || el.style.getPropertyValue('--img');
      content.style.backgroundImage = bg;
      caption.textContent = el.getAttribute('data-caption') || '';
      lightbox.classList.add('open');
    }
    items.forEach(function(el, i){
      el.addEventListener('click', function(){ show(i); });
    });
    closeBtn.addEventListener('click', function(){ lightbox.classList.remove('open'); });
    lightbox.addEventListener('click', function(e){ if(e.target === lightbox){ lightbox.classList.remove('open'); } });
    prevBtn.addEventListener('click', function(){ show(idx - 1); });
    nextBtn.addEventListener('click', function(){ show(idx + 1); });
    document.addEventListener('keydown', function(e){
      if(!lightbox.classList.contains('open')) return;
      if(e.key === 'Escape') lightbox.classList.remove('open');
      if(e.key === 'ArrowLeft') show(idx - 1);
      if(e.key === 'ArrowRight') show(idx + 1);
    });
  }

  /* ---------- Reservation form (index page) ---------- */
  function validateField(field, testFn, msg){
    var wrap = field.closest('.field');
    var ok = testFn(field.value.trim());
    if(!ok){
      wrap.classList.add('error');
      var em = wrap.querySelector('.error-msg');
      if(em) em.textContent = msg;
    } else {
      wrap.classList.remove('error');
    }
    return ok;
  }

  function initReservationForm(){
    var form = document.getElementById('reservation-form');
    if(!form) return;
    var success = form.querySelector('.form-success');

    // sensible min date = today, min time defaults
    var dateInput = form.querySelector('#res-date');
    if(dateInput){
      var today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
    }

    form.addEventListener('submit', function(e){
      e.preventDefault();
      var name = form.querySelector('#res-name');
      var phone = form.querySelector('#res-phone');
      var date = form.querySelector('#res-date');
      var time = form.querySelector('#res-time');
      var guests = form.querySelector('#res-guests');

      var validName = validateField(name, function(v){ return v.length >= 2; }, 'Podaj imię i nazwisko.');
      var validPhone = validateField(phone, function(v){ return /^[0-9+ ]{7,15}$/.test(v); }, 'Podaj poprawny numer telefonu.');
      var validDate = validateField(date, function(v){ return v.length > 0; }, 'Wybierz datę rezerwacji.');
      var validTime = validateField(time, function(v){ return v.length > 0; }, 'Wybierz godzinę.');
      var validGuests = validateField(guests, function(v){ return v.length > 0; }, 'Podaj liczbę gości.');

      if(validName && validPhone && validDate && validTime && validGuests){
        success.textContent = 'Dziękujemy, ' + name.value.trim() + '! Twoja rezerwacja na ' +
          guests.value + ' os. (' + date.value + ', ' + time.value + ') została przyjęta. ' +
          'Zadzwonimy w ciągu 30 minut, aby potwierdzić stolik.';
        success.classList.add('show');
        form.reset();
        setTimeout(function(){ success.classList.remove('show'); }, 9000);
      } else {
        success.classList.remove('show');
      }
    });
  }

  /* ---------- Contact form (contact page) ---------- */
  function initContactForm(){
    var form = document.getElementById('contact-form');
    if(!form) return;
    var success = form.querySelector('.form-success');

    form.addEventListener('submit', function(e){
      e.preventDefault();
      var name = form.querySelector('#c-name');
      var email = form.querySelector('#c-email');
      var message = form.querySelector('#c-message');

      var validName = validateField(name, function(v){ return v.length >= 2; }, 'Podaj imię i nazwisko.');
      var validEmail = validateField(email, function(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }, 'Podaj poprawny adres e-mail.');
      var validMsg = validateField(message, function(v){ return v.length >= 10; }, 'Wiadomość powinna mieć co najmniej 10 znaków.');

      if(validName && validEmail && validMsg){
        success.textContent = 'Dziękujemy, ' + name.value.trim() + '! Odpowiemy najszybciej, jak to możliwe.';
        success.classList.add('show');
        form.reset();
        setTimeout(function(){ success.classList.remove('show'); }, 9000);
      } else {
        success.classList.remove('show');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    wireImageFallbacks();
    initNav();
    initReveal();
    initMenuTabs();
    initLightbox();
    initReservationForm();
    initContactForm();
  });
})();
