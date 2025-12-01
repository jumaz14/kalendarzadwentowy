const prizes = [
  "50 przytulasów 🤍",
  "100 całusów 😘",
  "10 całusów 😘",
  "Buziak w czółko 😘",
  "Buziak w policzek 😘",
  "100 przytulasów 🤍🤍",
  "1 wspólny film 🎬",
  "Spacer razem 🚶‍♂️🚶‍♀️"
];

let currentRotation = 0;

function spinWheel() {
  const wheel = document.getElementById('wheel');
  const resultDiv = document.getElementById('result');

  const extraRotation = Math.floor(Math.random() * 360) + 720; 
  currentRotation += extraRotation;

  wheel.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    const normalizedDegree = currentRotation % 360;
    let prizeIndex = Math.floor(normalizedDegree / 36);
    prizeIndex = (9 - prizeIndex) % 10;

    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
    resultDiv.textContent = `Wygrałeś: ${randomPrize}! 🎉`;
  }, 4000);
}