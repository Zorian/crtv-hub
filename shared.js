/* ── SHARED JS: nav, mobile nav, ticker, scroll reveal, cursor, click sound ── */
(function(){

  /* ── NAV SCROLL ── */
  const nav = document.getElementById('nav');
  if(nav && !nav.classList.contains('solid')){
    window.addEventListener('scroll',()=> nav.classList.toggle('scrolled', window.scrollY>60));
  }

  /* ── ACTIVE NAV LINK ── */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, #mob-nav a').forEach(a => {
    if(a.getAttribute('href') === path) a.classList.add('active');
  });

  /* ── MOBILE NAV ── */
  const burger = document.getElementById('burger');
  const mobNav = document.getElementById('mob-nav');
  if(burger && mobNav){
    burger.addEventListener('click',()=>{ burger.classList.toggle('open'); mobNav.classList.toggle('open'); });
    mobNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{ burger.classList.remove('open'); mobNav.classList.remove('open'); }));
  }

  /* ── TICKERS ── */
  document.querySelectorAll('[data-ticker]').forEach(row => {
    const words = row.dataset.ticker.split(',');
    let html = '';
    for(let r=0;r<6;r++) words.forEach(w=>{ html += `<span class="t-item">${w.trim()}</span>`; });
    row.innerHTML = html;
  });

  /* ── SCROLL REVEAL ── */
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
  },{threshold:0.08});
  document.querySelectorAll('.rev').forEach(el=>obs.observe(el));

  /* ── CURSOR (runs on all pages unless index.html manages its own) ── */
  if(!window.CURSOR_MANAGED){
    const dot  = document.getElementById('dot');
    const ring = document.getElementById('ring');
    if(dot && ring){
      let mx=window.innerWidth/2, my=window.innerHeight/2, rx=mx, ry=my;
      document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
      (function animCursor(){
        rx += (mx-rx)*.18; ry += (my-ry)*.18;
        dot.style.transform  = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
        ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
        requestAnimationFrame(animCursor);
      })();
      document.querySelectorAll('a,button,.brand-tile,.port-item,.stat-cell,.filter-btn,.event-card').forEach(el=>{
        el.addEventListener('mouseenter',()=>{ ring.style.width='56px'; ring.style.height='56px'; ring.style.borderColor='var(--blue)'; });
        el.addEventListener('mouseleave',()=>{ ring.style.width='36px'; ring.style.height='36px'; ring.style.borderColor='rgba(16,118,248,.5)'; });
      });
    }
  }

  /* ── CLICK SOUND ── */
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  let _actx = null;
  function _playClick(){
    try{
      if(!_actx) _actx = new AudioCtx();
      const buf = _actx.createBuffer(1,_actx.sampleRate*.06,_actx.sampleRate);
      const d = buf.getChannelData(0);
      for(let i=0;i<d.length;i++){ const t=i/_actx.sampleRate; d[i]=(Math.random()*2-1)*Math.exp(-t*180); }
      const src=_actx.createBufferSource(); src.buffer=buf;
      const f=_actx.createBiquadFilter(); f.type='highpass'; f.frequency.value=800;
      const g=_actx.createGain(); g.gain.value=0.18;
      src.connect(f); f.connect(g); g.connect(_actx.destination); src.start();
    }catch(e){}
  }
  document.addEventListener('click', _playClick);
  document.addEventListener('touchstart', _playClick, {passive:true});

})();
