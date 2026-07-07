// Nav scroll + mobile toggle
const siteNav = document.getElementById('siteNav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

function onScroll(){
  if(!siteNav) return;
  if(window.scrollY > 40){ siteNav.classList.add('scrolled'); }
  else { siteNav.classList.remove('scrolled'); }
}
window.addEventListener('scroll', onScroll);
onScroll();

if(navToggle && navLinks){
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// Fade-in on scroll
const fadeEls = document.querySelectorAll('.fade-in');
if('IntersectionObserver' in window && fadeEls.length){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  fadeEls.forEach(el => io.observe(el));
} else {
  fadeEls.forEach(el => el.classList.add('visible'));
}

// Menu tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.target)?.classList.add('active');
  });
});

// Gallery filter
const filterBtns = document.querySelectorAll('.filter-btn');
const tiles = document.querySelectorAll('.g-tile');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    tiles.forEach(t => {
      t.style.display = (f === 'all' || t.dataset.cat === f) ? '' : 'none';
    });
  });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCap = document.getElementById('lightboxCap');
const lightboxClose = document.getElementById('lightboxClose');
tiles.forEach(t => {
  t.addEventListener('click', () => {
    if(!lightbox) return;
    const ph = t.querySelector('.ph');
    lightboxImg.style.background = ph ? getComputedStyle(ph).background : '';
    lightboxCap.textContent = `${t.dataset.title || ''} — ${t.dataset.desc || ''}`;
    lightbox.classList.add('open');
  });
});
if(lightboxClose){
  lightboxClose.addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', (e) => { if(e.target === lightbox) lightbox.classList.remove('open'); });
}

// Generic form validation + fake success
function validateField(field, condition){
  if(!field) return true;
  if(condition){ field.classList.remove('error'); return true; }
  field.classList.add('error');
  return false;
}

const reserveForm = document.getElementById('reserveForm');
if(reserveForm){
  reserveForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    ok = validateField(document.getElementById('rName').closest('.field'), document.getElementById('rName').value.trim().length > 1) && ok;
    ok = validateField(document.getElementById('rPhone').closest('.field'), /^[0-9+ ]{7,}$/.test(document.getElementById('rPhone').value.trim())) && ok;
    ok = validateField(document.getElementById('rDate').closest('.field'), !!document.getElementById('rDate').value) && ok;
    ok = validateField(document.getElementById('rTime').closest('.field'), !!document.getElementById('rTime').value) && ok;
    ok = validateField(document.getElementById('rGuests').closest('.field'), !!document.getElementById('rGuests').value) && ok;
    const successEl = document.getElementById('reserveSuccess');
    if(ok){
      successEl.classList.add('show');
      successEl.textContent = '> Rezerwacja wysłana. Zadzwonimy, aby potwierdzić termin.';
      reserveForm.reset();
    } else {
      successEl.classList.remove('show');
    }
  });
}

const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    ok = validateField(document.getElementById('cName').closest('.field'), document.getElementById('cName').value.trim().length > 1) && ok;
    ok = validateField(document.getElementById('cEmail').closest('.field'), /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById('cEmail').value.trim())) && ok;
    ok = validateField(document.getElementById('cMessage').closest('.field'), document.getElementById('cMessage').value.trim().length > 5) && ok;
    const successEl = document.getElementById('contactSuccess');
    if(ok){
      successEl.classList.add('show');
      successEl.textContent = '> Wiadomość wysłana. Odpowiemy najszybciej, jak to możliwe.';
      contactForm.reset();
    } else {
      successEl.classList.remove('show');
    }
  });
}
