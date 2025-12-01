(function(){
  const canvas = document.getElementById('scratch');
  const card = document.getElementById('card');
  const resetBtn = document.getElementById('resetBtn');
  const hint = document.getElementById('hint');

  const COVER_COLOR = '#9aa1a6';
  const PATTERN = true;
  const THICKNESS = 40;
  const REVEAL_PERCENT = 0.5;

  let isDrawing = false;
  let lastPoint = null;
  let ctx, dpr;
  let revealed = false;

  function setupCanvas(){
    const rect = card.getBoundingClientRect();
    dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width, canvas.height);

    ctx.fillStyle = COVER_COLOR;
    ctx.fillRect(0,0,canvas.width, canvas.height);

    if (PATTERN){
      drawPattern();
    }

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = THICKNESS * dpr;
  }

  function drawPattern(){
    const w = canvas.width, h = canvas.height;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(255,255,255,0.03)';
    const gap = Math.max(12 * dpr, 8);
    for (let x = -h; x < w + h; x += gap){
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + h, h);
      ctx.lineTo(x + h + 8*dpr, h);
      ctx.lineTo(x + 8*dpr, 0);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
    ctx.globalCompositeOperation = 'destination-out';
  }

  function getPoint(e){
    const rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches.length) {
      return {
        x: (e.touches[0].clientX - rect.left) * dpr,
        y: (e.touches[0].clientY - rect.top) * dpr
      };
    } else {
      return {
        x: (e.clientX - rect.left) * dpr,
        y: (e.clientY - rect.top) * dpr
      };
    }
  }

  function startDraw(e){
    if (revealed) return;
    isDrawing = true;
    lastPoint = getPoint(e);
    drawDot(lastPoint.x, lastPoint.y);
    e.preventDefault();
  }

  function moveDraw(e){
    if (!isDrawing || revealed) return;
    const p = getPoint(e);
    drawLine(lastPoint, p);
    lastPoint = p;
    e.preventDefault();
  }

  function endDraw(){
    if (!isDrawing) return;
    isDrawing = false;
    lastPoint = null;
    checkReveal();
  }

  function drawDot(x, y){
    ctx.beginPath();
    ctx.arc(x, y, (THICKNESS/2) * dpr, 0, Math.PI*2);
    ctx.fill();
  }

  function drawLine(p1, p2){
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }

  function checkReveal(){
    try {
      const img = ctx.getImageData(0,0,canvas.width,canvas.height);
      const pixels = img.data;
      let cleared = 0;
      const step = Math.max(4, Math.floor(dpr));
      for (let i = 3; i < pixels.length; i += 4 * step){
        if (pixels[i] === 0) cleared++;
      }
      const total = pixels.length / (4 * step);
      const ratio = cleared / total;
      if (ratio >= REVEAL_PERCENT){
        revealAll();
      }
    } catch(err){
      console.warn('checkReveal error:', err);
    }
  }

  function revealAll(){
    if (revealed) return;
    revealed = true;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    canvas.style.transition = 'opacity 350ms ease';
    canvas.style.opacity = '0';
    setTimeout(()=> {
      canvas.style.display = 'none';
      hint.textContent = 'Odsłonięte — mam nadzieję, że ci się podoba! 💘';
    }, 360);
  }

  function reset(){
    revealed = false;
    canvas.style.display = 'block';
    canvas.style.opacity = '1';
    hint.textContent = 'Użyj myszki lub palca, aby zdrapać powłokę.';
    setupCanvas();
  }

  function addListeners(){
    canvas.addEventListener('mousedown', startDraw);
    window.addEventListener('mousemove', moveDraw);
    window.addEventListener('mouseup', endDraw);

    canvas.addEventListener('touchstart', startDraw, {passive:false});
    window.addEventListener('touchmove', moveDraw, {passive:false});
    window.addEventListener('touchend', endDraw);

    resetBtn.addEventListener('click', reset);
    window.addEventListener('resize', reset);
  }

  function init(){
    setupCanvas();
    addListeners();
  }
  init();

  function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = "💗";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (12 + Math.random() * 18) + "px";
    heart.style.animationDuration = (5 + Math.random() * 5) + "s";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 9000);
  }
  setInterval(createHeart, 600);
})();