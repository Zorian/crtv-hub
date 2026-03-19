/* ── SHARED JS: cursor, nav, mobile nav, ticker, scroll reveal ── */
(function(){
  // Cursor - skip if managed by page
  if(!window.CURSOR_MANAGED){
    const dot  = document.getElementById('dot');
    const ring = document.getElementById('ring');
    let mx=0, my=0, rx=0, ry=0;
    document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
    (function animCursor(){
      rx += (mx-rx)*.18; ry += (my-ry)*.18;
      if(dot) dot.style.transform  = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      if(ring) ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(animCursor);
    })();

/* ── CLICK SOUND (all pages) ── */
if(!window.CURSOR_MANAGED){
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
}
    document.querySelectorAll('a,button,.card,.brand-tile,.port-item,.svc-item,.stat-cell,.filter-btn,.event-card').forEach(el=>{
      el.addEventListener('mouseenter',()=>);
      el.addEventListener('mouseleave',()=>);
    });
  }

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
