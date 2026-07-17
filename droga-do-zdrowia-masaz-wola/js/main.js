// nav scroll state
const nav = document.getElementById('nav');
if(nav){
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// mobile burger
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
if(burger && navLinks){
  burger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold:0.15});
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// lightbox for gallery
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxCaption = document.getElementById('lightboxCaption');
document.querySelectorAll('.masonry-item').forEach(item => {
  item.addEventListener('click', () => {
    const cap = item.querySelector('.cap');
    if(lightboxCaption) lightboxCaption.textContent = cap ? cap.textContent : '';
    if(lightbox) lightbox.classList.add('active');
  });
});
if(lightboxClose){
  lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
}
if(lightbox){
  lightbox.addEventListener('click', (e) => { if(e.target === lightbox) lightbox.classList.remove('active'); });
}

// generic form validation + success
function validateForm(formEl){
  let valid = true;
  formEl.querySelectorAll('[required]').forEach(field => {
    const row = field.closest('.form-row');
    if(!field.value.trim()){
      valid = false;
      if(row) row.classList.add('error');
    } else {
      if(row) row.classList.remove('error');
    }
    if(field.type === 'email' && field.value.trim()){
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!re.test(field.value.trim())){
        valid = false;
        if(row) row.classList.add('error');
      }
    }
    if(field.type === 'tel' && field.value.trim()){
      const digits = field.value.replace(/\D/g,'');
      if(digits.length < 9){
        valid = false;
        if(row) row.classList.add('error');
      }
    }
  });
  return valid;
}

document.querySelectorAll('form[data-validate]').forEach(formEl => {
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const success = formEl.parentElement.querySelector('.form-success') || formEl.querySelector('.form-success');
    if(validateForm(formEl)){
      formEl.reset();
      formEl.querySelectorAll('.form-row').forEach(r => r.classList.remove('error'));
      if(success) success.classList.add('active');
      formEl.style.display = 'none';
      setTimeout(() => {
        formEl.style.display = '';
        if(success) success.classList.remove('active');
      }, 6000);
    }
  });
});

// set min date on date inputs to today
document.querySelectorAll('input[type="date"]').forEach(input => {
  const today = new Date().toISOString().split('T')[0];
  input.min = today;
});
