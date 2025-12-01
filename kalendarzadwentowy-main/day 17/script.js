const secretWord = "BARSZCZ";
let attempts = 0;
const maxAttempts = 6;

const board = document.getElementById("board");
const message = document.getElementById("message");
const input = document.getElementById("guessInput");

for (let i = 0; i < maxAttempts; i++) {
  const row = document.createElement("div");
  row.classList.add("row");
  for (let j = 0; j < secretWord.length; j++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    row.appendChild(cell);
  }
  board.appendChild(row);
}

function launchConfetti() {
  for (let i = 0; i < 70; i++) {
    setTimeout(() => {
      const conf = document.createElement("div");
      conf.classList.add("confetti");
      conf.style.left = Math.random() * 100 + "vw";
      conf.style.backgroundColor = `hsl(${Math.random()*360}, 90%, 60%)`;
      conf.style.transform = `rotate(${Math.random()*360}deg)`;
      document.body.appendChild(conf);
      setTimeout(() => conf.remove(), 3000);
    }, i * 40);
  }
}

function submitGuess() {
  let guess = input.value.toUpperCase();

  if (guess.length !== secretWord.length) {
    alert("Hasło ma 7 liter!");
    return;
  }

  const row = board.children[attempts];
  for (let i = 0; i < secretWord.length; i++) {
    const cell = row.children[i];
    cell.textContent = guess[i];

    if (guess[i] === secretWord[i]) {
      cell.classList.add("correct");
    } else if (secretWord.includes(guess[i])) {
      cell.classList.add("present");
    } else {
      cell.classList.add("absent");
    }
  }

  attempts++;
  input.value = "";
  input.focus();

  if (guess === secretWord) {
    message.innerHTML =
      "Może to i Ty najczęściej okupujesz moje myśli,<br>ale świąteczny barszczyk ostatnio też chodzi mi po głowie 😋❤️";

    input.disabled = true;
    launchConfetti();
    return;
  }

  if (attempts >= maxAttempts) {
    message.innerHTML = `Niestety, nie udało się. Hasło to: ${secretWord}`;
    input.disabled = true;
  }
}