document.addEventListener('DOMContentLoaded', function () {
  var burger = document.querySelector('.burger');
  var links = document.querySelector('.nav-links');
  if (burger) burger.addEventListener('click', function () { links.classList.toggle('open'); });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.rv').forEach(function (el) { io.observe(el); });

  var lb = document.getElementById('lb');
  if (lb) {
    var lbImg = lb.querySelector('img');
    var tiles = Array.prototype.slice.call(document.querySelectorAll('.tile'));
    var idx = 0;
    function show(i) {
      idx = (i + tiles.length) % tiles.length;
      lbImg.src = tiles[idx].querySelector('img').src;
      lb.classList.add('open');
    }
    tiles.forEach(function (t, i) { t.addEventListener('click', function () { show(i); }); });
    lb.querySelector('.lb-x').addEventListener('click', function () { lb.classList.remove('open'); });
    lb.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); show(idx - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.classList.remove('open'); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') lb.classList.remove('open');
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }

  var form = document.getElementById('booking');
  if (form) {
    var dateEl = form.querySelector('[name=date]');
    if (dateEl) dateEl.min = new Date().toISOString().split('T')[0];

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      form.querySelectorAll('[required]').forEach(function (el) {
        var wrap = el.closest('.f');
        var bad = !el.value.trim();
        if (!bad && el.name === 'phone') bad = !/^[+0-9 ()-]{9,}$/.test(el.value.trim());
        if (!bad && el.type === 'email') bad = !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value.trim());
        wrap.classList.toggle('bad', bad);
        if (bad) valid = false;
      });
      if (!valid) return;
      form.style.display = 'none';
      document.querySelector('.ok').classList.add('show');
    });

    form.querySelectorAll('[required]').forEach(function (el) {
      el.addEventListener('input', function () { el.closest('.f').classList.remove('bad'); });
    });
  }
});
