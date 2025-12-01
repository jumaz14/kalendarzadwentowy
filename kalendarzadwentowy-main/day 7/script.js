const pairs = [
  ["Justyna", "Krzysztof"],
  ["Polska", "Hong Kong"],
  ["5°C", "25°C"],
  ["Dobranoc", "Dzień dobry"],
  ["UTC+1", "UTC+8"],
  ["Pierogi", "Dim sum"],
  ["Tęsknię", "Ja też"],
  ["Zimowa kurtka", "T-shirt"]
];

let cards = [];
pairs.forEach(pair => {
  cards.push({name: pair[0], pair: pair[1]});
  cards.push({name: pair[1], pair: pair[0]});
});
cards.sort(() => Math.random() - 0.5);

const board = document.getElementById('game-board');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

cards.forEach(cardData => {
  const card = document.createElement('div');
  card.classList.add('card');
  
  const inner = document.createElement('div');
  inner.classList.add('card-inner');
  
  const front = document.createElement('div');
  front.classList.add('card-front');
  front.textContent = "?";
  
  const back = document.createElement('div');
  back.classList.add('card-back');
  back.textContent = cardData.name;
  
  inner.appendChild(front);
  inner.appendChild(back);
  card.appendChild(inner);
  
  card.addEventListener('click', () => flipCard(card, cardData));
  
  board.appendChild(card);
});

function flipCard(card, cardData) {
  if (lockBoard || card.classList.contains('flipped')) return;
  
  card.classList.add('flipped');
  
  if (!firstCard) {
    firstCard = {card, data: cardData};
  } else {
    secondCard = {card, data: cardData};
    checkMatch();
  }
}

function checkMatch() {
  lockBoard = true;
  if (firstCard.data.pair === secondCard.data.name) {
    matches += 1;
    resetTurn();
    if (matches === pairs.length) {
      showMessage();
    }
  } else {
    setTimeout(() => {
      firstCard.card.classList.remove('flipped');
      secondCard.card.classList.remove('flipped');
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function showMessage() {
  document.getElementById('message').innerHTML = 
    "Na razie dzieli nas sporo różnic — miejsca, temperatura, strefy czasowe… i 8 452,02 km między Sosnowcem a Hongkongiem.<br>Ale już niedługo będzie Polska–Polska, ta sama temperatura, ta sama strefa czasowa i 8 452,02 km zmieni się w 0. ❤️";
}