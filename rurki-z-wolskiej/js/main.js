(function(){
  var burger=document.querySelector('.burger'),menu=document.querySelector('.nav ul');
  if(burger){burger.addEventListener('click',function(){menu.classList.toggle('open');burger.textContent=menu.classList.contains('open')?'✕':'☰';});
    menu.addEventListener('click',function(e){if(e.target.tagName==='A'){menu.classList.remove('open');burger.textContent='☰';}});}

  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});

  var hero=document.querySelector('.hero-bg');
  if(hero&&window.matchMedia('(min-width:900px)').matches){
    window.addEventListener('scroll',function(){hero.style.transform='translateY('+(window.scrollY*.28)+'px)';},{passive:true});
  }

  var figs=[].slice.call(document.querySelectorAll('.masonry figure'));
  var lb=document.querySelector('.lb');
  if(lb&&figs.length){
    var lbImg=lb.querySelector('img'),i=0;
    function show(n){i=(n+figs.length)%figs.length;lbImg.src=figs[i].querySelector('img').dataset.full;}
    figs.forEach(function(f,n){f.addEventListener('click',function(){show(n);lb.classList.add('on');document.body.style.overflow='hidden';});});
    function close(){lb.classList.remove('on');document.body.style.overflow='';}
    lb.querySelector('.x').addEventListener('click',close);
    lb.querySelector('.pv').addEventListener('click',function(e){e.stopPropagation();show(i-1);});
    lb.querySelector('.nx').addEventListener('click',function(e){e.stopPropagation();show(i+1);});
    lb.addEventListener('click',function(e){if(e.target===lb)close();});
    document.addEventListener('keydown',function(e){
      if(!lb.classList.contains('on'))return;
      if(e.key==='Escape')close();
      if(e.key==='ArrowLeft')show(i-1);
      if(e.key==='ArrowRight')show(i+1);
    });
  }

  var form=document.getElementById('orderForm');
  if(form){
    var d=form.querySelector('[name=date]');
    if(d){var t=new Date();t.setMinutes(t.getMinutes()-t.getTimezoneOffset());d.min=t.toISOString().slice(0,10);}
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var bad=false;
      form.querySelectorAll('[data-req]').forEach(function(f){
        var v=f.value.trim(),err=f.parentNode.querySelector('.err'),ok=!!v;
        if(ok&&f.type==='email')ok=/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v);
        if(ok&&f.name==='qty')ok=+v>=1&&+v<=60;
        f.classList.toggle('bad',!ok);
        if(err)err.classList.toggle('on',!ok);
        if(!ok)bad=true;
      });
      if(bad)return;
      form.querySelector('.ok').classList.add('on');
      form.querySelector('button').disabled=true;
      form.querySelector('.ok').scrollIntoView({behavior:'smooth',block:'center'});
    });
  }
})();
