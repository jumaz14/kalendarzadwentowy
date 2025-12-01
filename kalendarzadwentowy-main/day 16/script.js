const game = document.getElementById('game');
const car = document.getElementById('car');
const scoreDisplay = document.getElementById('score');
const message = document.getElementById('message');
const instructions = document.getElementById('instructions');

let score = 0;
let gameOver = false;
let gameStarted = false;

const lanes = [
  game.offsetWidth * 0.2,
  game.offsetWidth * 0.5,
  game.offsetWidth * 0.8
];
let laneIndex = 1;
car.style.left = lanes[laneIndex] - car.offsetWidth / 2 + "px";

document.addEventListener('keydown', (e) => {
  if (!gameStarted && e.key === "Enter") {
    instructions.style.display = 'none';
    gameStarted = true;
  }
  
  if (!gameStarted) return;

  if (gameOver) return;
  if (e.key === "ArrowLeft" && laneIndex > 0) laneIndex--;
  if (e.key === "ArrowRight" && laneIndex < lanes.length - 1) laneIndex++;
  car.style.left = lanes[laneIndex] - car.offsetWidth / 2 + "px";
});

function createObstacle() {
  if (!gameStarted) return;

  const obstacle = document.createElement('div');
  obstacle.classList.add('obstacle');
  const types = ['snow', 'traffic', 'police'];
  const type = types[Math.floor(Math.random() * types.length)];
  obstacle.classList.add(type);

  const lane = lanes[Math.floor(Math.random() * lanes.length)];
  obstacle.style.left = lane - 30 + "px";
  obstacle.style.top = "0px";
  game.appendChild(obstacle);

  let pos = 0;
  const interval = setInterval(() => {
    if (gameOver) {
      clearInterval(interval);
      obstacle.remove();
      return;
    }

    pos += 5;
    obstacle.style.top = pos + "px";

    const carRect = car.getBoundingClientRect();
    const obsRect = obstacle.getBoundingClientRect();
    if (
      obsRect.bottom >= carRect.top &&
      obsRect.top <= carRect.bottom &&
      obsRect.right >= carRect.left &&
      obsRect.left <= carRect.right
    ) {
      gameOver = true;
      message.textContent = "Game Over 😢 Dostałeś mandat, spóźniłeś się i przez Ciebie Justyna musiała wracać pociągiem 😔";
      setTimeout(() => location.reload(), 5000);
      clearInterval(interval);
    }

    if (pos > game.offsetHeight) {
      clearInterval(interval);
      obstacle.remove();
      if (!gameOver) {
        score++;
        scoreDisplay.textContent = "Punkty: " + score;
        if (score >= 20) {
          gameOver = true;
          message.textContent = "Wygrałeś! Udało Ci się dojechać na czas ❤️";
          clearInterval(obstacleInterval);
        }
      }
    }
  }, 40);
}

const obstacleInterval = setInterval(createObstacle, 1500);