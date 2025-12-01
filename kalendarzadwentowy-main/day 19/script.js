  const quotes = [
    document.getElementById('q0'),
    document.getElementById('q1'),
    document.getElementById('q2')
  ];
  const hint = document.getElementById('hint');
  const shootingStar = document.getElementById('shootingStar');
  const scene = document.getElementById('scene');

  let index = -1;

  function showQuote(i){
    quotes.forEach((el, idx)=>el.classList.toggle('visible', idx===i));
    // pokazujemy hint tylko jeśli jesteśmy w fazie cytatów
    hint.style.opacity = i>=0 && i<quotes.length ? 0.95 : 0;
  }

  function shootStar(){
    shootingStar.style.left = '0%';
    shootingStar.style.top = Math.random()*50 + '%';
    shootingStar.style.opacity = 1;
    shootingStar.style.transform = 'translate(0,0)';

    const duration = 1200;
    const endX = window.innerWidth + 100;
    const endY = window.innerHeight*0.6 + Math.random()*100;

    const start = performance.now();
    function animate(time){
      const t = Math.min((time - start)/duration,1);
      const x = t*endX;
      const y = t*endY;
      shootingStar.style.transform = `translate(${x}px,${y}px)`;
      shootingStar.style.opacity = 1-t;
      if(t<1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  function next(){
    index++;
    if(index===0) shootStar();
    if(index>quotes.length-1){
      index=-1;
      quotes.forEach(q=>q.classList.remove('visible'));
      return;
    }
    showQuote(index);
  }

  scene.addEventListener('click', next);
  scene.addEventListener('keydown', e=>{
    if(e.code==='Enter'||e.code==='Space'){
      e.preventDefault();
      next();
    }
  });

  (function makeStars(){
    const starsLayer = document.getElementById('stars');
    const w = window.innerWidth, h = window.innerHeight;
    const count = Math.min(100, Math.floor(Math.sqrt(w*h)/5));
    for(let i=0;i<count;i++){
      const s = document.createElement('div');
      s.className='star';
      const left = Math.random()*100;
      const top = Math.random()*100;
      const size = 2+Math.random()*3;
      s.style.left=left+'%';
      s.style.top=top+'%';
      s.style.width=size+'px';
      s.style.height=size+'px';
      s.style.animationDelay=(Math.random()*4)+'s';
      s.style.opacity=0.5+Math.random()*0.5;
      starsLayer.appendChild(s);
    }
  })();