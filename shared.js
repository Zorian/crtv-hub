/* ── SHARED JS: cursor, nav, mobile nav, ticker, scroll reveal ── */
(function(){
  // Cursor
  const dot  = document.getElementById('dot');
  const ring = document.getElementById('ring');
  let mx=0, my=0, rx=0, ry=0;
  document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
  (function animCursor(){
    rx += (mx-rx)*.18; ry += (my-ry)*.18;
    dot.style.transform  = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(animCursor);
  })();
  document.querySelectorAll('a,button,.card,.brand-tile,.port-item,.svc-item,.stat-cell,.filter-btn,.event-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>document.body.classList.add('hovering'));
    el.addEventListener('mouseleave',()=>document.body.classList.remove('hovering'));
  });

  // Nav scroll
  const nav = document.getElementById('nav');
  if(nav && !nav.classList.contains('solid')){
    window.addEventListener('scroll',()=> nav.classList.toggle('scrolled', window.scrollY>60));
  }

  // Active nav link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, #mob-nav a').forEach(a => {
    if(a.getAttribute('href') === path) a.classList.add('active');
  });

  // Mobile nav
  const burger = document.getElementById('burger');
  const mobNav = document.getElementById('mob-nav');
  if(burger && mobNav){
    burger.addEventListener('click',()=>{ burger.classList.toggle('open'); mobNav.classList.toggle('open'); });
    mobNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{ burger.classList.remove('open'); mobNav.classList.remove('open'); }));
  }

  // Build tickers
  document.querySelectorAll('[data-ticker]').forEach(row => {
    const words = row.dataset.ticker.split(',');
    let html = '';
    for(let r=0;r<6;r++) words.forEach(w=>{ html += `<span class="t-item">${w.trim()}</span>`; });
    row.innerHTML = html;
  });

  // Scroll reveal
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
  },{threshold:0.08});
  document.querySelectorAll('.rev').forEach(el=>obs.observe(el));
})();
