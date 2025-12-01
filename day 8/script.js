const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');
let snowflakes = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createSnowflakes(count) {
    for (let i = 0; i < count; i++) {
        snowflakes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 4 + 1,
            d: Math.random() * 1 + 0.5
        });
    }
}

function drawSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    for (let flake of snowflakes) {
        ctx.moveTo(flake.x, flake.y);
        ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
    }
    ctx.fill();
    updateSnow();
}

let angle = 0;
function updateSnow() {
    angle += 0.01;
    for (let flake of snowflakes) {
        flake.y += Math.pow(flake.d, 2) + 1;
        flake.x += Math.sin(angle) * 0.5;
        if (flake.y > canvas.height) {
            flake.y = 0;
            flake.x = Math.random() * canvas.width;
        }
    }
}
createSnowflakes(100);
function animateBackground() {
    drawSnow();
    requestAnimationFrame(animateBackground);
}
animateBackground();

let gameStarted = false;
let snowballs = [];
let powerPos = 0, powerDir = 1, powerSpeed = 100;
let krzysiu, justyna, hpKrzysiu, hpJustyna;
let aiInterval;

function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('gameUI').style.display = 'flex';
    gameStarted = true;

    krzysiu = { x: 200, y: canvas.height - 180, w: 120, h: 180, hp: 100 };
    justyna = { x: canvas.width - 300, y: canvas.height - 180, w: 120, h: 180, hp: 100 };

    hpKrzysiu = document.getElementById("hpKrzysiu");
    hpJustyna = document.getElementById("hpJustyna");

    requestAnimationFrame(animatePowerMarker);
    aiInterval = setInterval(aiThrow, 2000);
    gameLoop();
}

document.getElementById("startBtn").addEventListener("click", startGame);

const powerBar = document.querySelector('.power-bar');
const powerMarker = document.getElementById('powerMarker');

function animatePowerMarker(timestamp) {
    if (!gameStarted) return;
    if (!animatePowerMarker.last) animatePowerMarker.last = timestamp;
    const delta = (timestamp - animatePowerMarker.last) / 1000;
    animatePowerMarker.last = timestamp;

    const maxMove = powerBar.offsetHeight - powerMarker.offsetHeight;
    powerPos += powerDir * powerSpeed * delta;

    if (powerPos >= maxMove) { powerPos = maxMove; powerDir = -1; }
    if (powerPos <= 0) { powerPos = 0; powerDir = 1; }

    powerMarker.style.transform = `translateY(${powerPos}px)`;
    requestAnimationFrame(animatePowerMarker);
}

document.addEventListener('keydown', (e) => {
  if (!gameStarted) return;
  if (e.code === 'Space') {
    const barHeight = powerBar.offsetHeight;
    const markerHeight = powerMarker.offsetHeight;
    const center = (barHeight - markerHeight) / 2;
    const distanceFromCenter = Math.abs(powerPos - center);
    const powerFactor = 1 - (distanceFromCenter / center);
    const startX = krzysiu.x + krzysiu.w / -2.5;
    const startY = krzysiu.y + krzysiu.h / 7;
    throwSnowball(startX, startY, 1, powerFactor, 'krzysiu');
  }
});

function aiThrow() {
  const aiPower = Math.random() * 0.7 + 0.3;
  const startX = justyna.x + justyna.w / 1;
  const startY = justyna.y + justyna.h / 6;
  throwSnowball(startX, startY, -1, aiPower, 'justyna');
}

function throwSnowball(x, y, dir, power, owner) {
  const baseSpeed = 10;
  const speed = baseSpeed * power * 2;
  const angle = (Math.random() * 0.2 + 0.35) * Math.PI / 2;
  snowballs.push({
    x: x,
    y: y,
    r: 10,
    dx: Math.cos(angle) * speed * dir,
    dy: -Math.sin(angle) * speed,
    gravity: 0.25,
    owner: owner
  });
}

function updateSnowballs() {
  for (let ball of snowballs) {
    ball.x += ball.dx;
    ball.y += ball.dy;
    ball.dy += ball.gravity;
  }

  for (let ball of snowballs) {
    if (ball.owner === 'krzysiu' && hit(ball, document.getElementById('justyna'))) {
      justyna.hp -= 10;
      hpJustyna.style.width = justyna.hp + "%";
      explode(ball.x, ball.y);
      ball.hit = true;
    }
    if (ball.owner === 'justyna' && hit(ball, document.getElementById('krzysiu'))) {
      krzysiu.hp -= 10;
      hpKrzysiu.style.width = krzysiu.hp + "%";
      explode(ball.x, ball.y);
      ball.hit = true;
    }
  }

  snowballs = snowballs.filter(b => !b.hit && b.x > 0 && b.x < canvas.width && b.y < canvas.height);
  if (krzysiu.hp <= 0 || justyna.hp <= 0) endGame();
}

function hit(ball, targetElement) {
  const rect = targetElement.getBoundingClientRect();
  const canvasRect = canvas.getBoundingClientRect();
  const ballX = ball.x + canvasRect.left;
  const ballY = ball.y + canvasRect.top;
  return (
    ballX > rect.left &&
    ballX < rect.right &&
    ballY > rect.top &&
    ballY < rect.bottom
  );
}

function explode(x, y) {
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.fill();
}

const popup = document.createElement("div");
popup.style.position = "absolute";
popup.style.top = "50%";
popup.style.left = "50%";
popup.style.transform = "translate(-50%, -50%)";
popup.style.background = "rgba(255,255,255,0.95)";
popup.style.border = "4px solid #003366";
popup.style.padding = "40px 60px";
popup.style.textAlign = "center";
popup.style.fontFamily = "'Press Start 2P', monospace";
popup.style.fontSize = "16px";
popup.style.color = "#003366";
popup.style.borderRadius = "16px";
popup.style.display = "none";
popup.style.zIndex = "10";
popup.innerHTML = `
  <div id="popupMessage"></div>
  <button id="restartBtn" style="
    margin-top: 25px;
    padding: 10px 20px;
    font-family: 'Press Start 2P', monospace;
    border: 3px solid #003366;
    background: #00baff;
    color: white;
    border-radius: 10px;
    cursor: pointer;
  ">Zagraj ponownie</button>
`;
document.body.appendChild(popup);
document.getElementById("restartBtn").onclick = () => location.reload();

function endGame() {
  clearInterval(aiInterval);
  snowballs = [];
  const msg = document.getElementById("popupMessage");
  msg.textContent = krzysiu.hp <= 0 ? "💔 Justyna wygrała! ❄️" : "🎁 Wygrałeś! No Justyna kiepskiego ma cela... ❄️";
  popup.style.display = "block";
}

function drawSnowballs() {
  ctx.fillStyle = '#fff';
  for (let ball of snowballs) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fill();
  }
}

function gameLoop() {
  if (!gameStarted) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnow();
  updateSnowballs();
  drawSnowballs();
  requestAnimationFrame(gameLoop);
}