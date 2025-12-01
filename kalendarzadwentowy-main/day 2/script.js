const messages = [
  "Zabrałabym Cię do kina, ale niestety nie wpuszczają z własnymi słodyczami 🍬",
  "Twoje oczy są lepsze niż te w rosole 👀",
  "W skali od 1 do 9 daję Ci 9, bo jedyne czego Ci brakuje to mnie obok 💘",
  "Muszą Cię boleć nogi, bo cały dzień chodziłeś mi po głowie ✨",
  "Twoje imię to Google? Bo masz wszystko, czego szukam 😇",
  "Masz może ładunek elektryczny? Bo mnie kopie, jak cię widzę ✨",
  "Jesteś jak hotel tylko bez 'el' 🔥",
  "Dla Ciebie zjadłabym rodzynki w serniku 🤩",
  "Gdybyś był piosenką to bym Cię znała na pamięć 😘",
  "Jesteś cukrzycą typu 2? Bo wywarłeś nieodwracalny wpływ na moje serce 💘"
];

const claw = document.getElementById("claw");
const glass = document.querySelector(".glass");
const playBtn = document.getElementById("playBtn");
const soundStart = document.getElementById("sound-start");
const soundWin = document.getElementById("sound-win");
const messageCard = document.getElementById("messageCard");

let balls = [];
let moving = false;

function createBalls() {
  balls.forEach(b => b.el.remove()); // usuń stare
  balls = [];
  const glassWidth = glass.clientWidth;
  const glassHeight = glass.clientHeight;
  for (let i = 0; i < 25; i++) {
    const ball = document.createElement("div");
    ball.classList.add("ball");
    ball.style.left = (Math.random() * (glassWidth - glassWidth*0.08)) + "px";
    ball.style.top = (glassHeight*0.06 + Math.random() * (glassHeight - glassHeight*0.08 - glassHeight*0.06)) + "px";
    ball.style.background = `hsl(${Math.random()*360}, 70%, 75%)`;
    glass.appendChild(ball);
    balls.push({
      el: ball,
      x: parseFloat(ball.style.left),
      y: parseFloat(ball.style.top),
      dx: (Math.random() - 0.5) * 1.8,
      dy: (Math.random() - 0.5) * 1.8
    });
  }
}
createBalls();

function moveBalls() {
  const glassWidth = glass.clientWidth;
  const glassHeight = glass.clientHeight;
  balls.forEach(b => {
    b.x += b.dx;
    b.y += b.dy;

    if (b.x <= 0 || b.x >= glassWidth - glassWidth*0.08) b.dx *= -1;
    if (b.y <= glassHeight*0.06 || b.y >= glassHeight - glassHeight*0.08) b.dy *= -1;

    b.el.style.left = b.x + "px";
    b.el.style.top = b.y + "px";
  });
  requestAnimationFrame(moveBalls);
}
moveBalls();

playBtn.addEventListener("click", () => {
  if (moving) return;
  moving = true;
  messageCard.classList.remove("show");
  messageCard.textContent = "";

  soundStart.play();
  claw.classList.add("animate");

  setTimeout(() => {
    const randBall = balls[Math.floor(Math.random() * balls.length)];
    const randMsg = messages[Math.floor(Math.random() * messages.length)];
    const clawX = claw.offsetLeft;
    const clawY = glass.clientHeight/2;

    randBall.el.style.left = clawX + "px";
    randBall.el.style.top = clawY + "px";
    randBall.el.style.transition = "all 2s ease-in-out";

    setTimeout(() => {
      soundWin.play();
      randBall.el.style.top = glass.clientHeight*0.18 + "px";

      setTimeout(() => {
        randBall.el.style.opacity = "0";
        messageCard.textContent = randMsg;
        messageCard.classList.add("show");
        moving = false;

        setTimeout(() => {
          randBall.el.style.opacity = "1";
          randBall.el.style.left = (Math.random() * (glass.clientWidth - glass.clientWidth*0.08)) + "px";
          randBall.el.style.top = (glass.clientHeight*0.06 + Math.random() * (glass.clientHeight - glass.clientHeight*0.08 - glass.clientHeight*0.06)) + "px";
        }, 1000);
      }, 2000);
    }, 1000);
  }, 1500);

  setTimeout(() => claw.classList.remove("animate"), 4000);
});

window.addEventListener('resize', createBalls); // reaguj na zmianę rozmiaru