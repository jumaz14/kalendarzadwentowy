const quizData = [
  {
    question: "Która z poniższych historii z sezonu maturalnego jest prawdziwa?",
    answers: [
      "Spadłam ze schodów przed maturą z polskiego, miałam stłuczkę samochodową przed matmą i zapalenie spojówki na fizyce, przez co pisałam egzamin z jednym okiem zamkniętym.",
      "Przed polskim ptak nasrał mi na łeb, przed angielskim skręciłam kostkę, bo krzywo stanęłam w obcasie, a tuż przed matmą utknęłam w windzie, bo się zepsuła.",
      "Na matmie rozlałam wodę na arkusz, na fizyce wypisały mi się oba długopisy, a przed informatyką wykoleił mi się tramwaj i musiałam biec 2 km."
    ],
    correct: 0
  },
  {
    question: "Który z tych rodzinnych fun factów jest prawdziwy?",
    answers: [
      "Mój tata był w „1 z 10”.",
      "Moja mama wystąpiła w „Familiadzie”.",
      "Moja ciocia wygrała w „Postaw na milion”."
    ],
    correct: 0
  },
  {
    question: "Który z tych celebrytów pojawił się na komunii mojej kuzynki?",
    answers: [
      "Krzysztof Ibisz.",
      "Mateusz Morawiecki.",
      "Agustin Egurrola"
    ],
    correct: 1
  },
  {
    question: "Który z tych rekordów szkoły faktycznie pobiłam?",
    answers: [
      "Najwięcej skoków na skakance w minutę.",
      "Najszybciej rozwiązane sudoku.",
      "Najdłuższe stanie na rękach."
    ],
    correct: 0
  },
  {
    question: "Czego nie znoszę najbardziej na świecie?",
    answers: [
      "Piosenki „Girls Like You” Maroon 5, zapachu skoszonej trawy i Toffifee.",
      "Piosenki „Best Song Ever” One Direction, zapachu chloru i dalmatyńczyków.",
      "Piosenki „Cruel Summer” Taylor Swift, zapachu benzyny i niewyjustowanego tekstu."
    ],
    correct: 0
  },
  {
    question: "Mój ulubiony polski serial to...",
    answers: [
      "Miodowe lata.",
      "13 posterunek.",
      "Klan."
    ],
    correct: 0
  },
  {
    question: "Który z tych faktów o mnie jest prawdziwy?",
    answers: [
      "Umiem ruszać uchem.",
      "Potrafię gwizdać na palcach.",
      "Umiem podwinąć język w trąbkę i zrobić z niego serduszko."
    ],
    correct: 0
  },
  {
    question: "Który z tych urazów faktycznie mi się przydarzył?",
    answers: [
      "Złamałam nos, bo koleżanka robiła wymachy nogą w szatni i trafiła mnie prosto w twarz.",
      "Złamałam kciuka, bo 'puszysta' koleżanka na niego spadła podczas gry na WF-ie.",
      "Złamałam stopę, bo chciałam oddać siostrze, która mnie kopnęła, ale zamiast tego kopnęłam w drzwi."
    ],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;
let randomizedQuiz = [];

function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function startQuiz() {
  score = 0;
  currentQuestion = 0;
  document.getElementById("intro").classList.add("hidden");
  document.getElementById("result").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");

  randomizedQuiz = quizData.map(q => {
    const originalAnswers = [...q.answers];
    const correctAnswerText = originalAnswers[q.correct];
    const shuffledAnswers = shuffleArray(originalAnswers);
    const newCorrectIndex = shuffledAnswers.indexOf(correctAnswerText);
    return {
      question: q.question,
      answers: shuffledAnswers,
      correct: newCorrectIndex
    };
  });

  randomizedQuiz = shuffleArray(randomizedQuiz);

  showQuestion();
}

function showQuestion() {
  const q = randomizedQuiz[currentQuestion];
  document.getElementById("question").textContent = q.question;
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";
  document.getElementById("progress").textContent = `Pytanie ${currentQuestion+1} z ${randomizedQuiz.length}`;

  q.answers.forEach((ans, index) => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.onclick = () => checkAnswer(index);
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(index) {
  console.log('Kliknięto index:', index, 'poprawny index:', randomizedQuiz[currentQuestion].correct);

  if (index === randomizedQuiz[currentQuestion].correct) {
    score++;
  }
  currentQuestion++;
  if (currentQuestion < randomizedQuiz.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");

  const resultText = document.querySelector(".result");

  let vibe;
  if (score >= 7) {
    vibe = "Perfekcyjna intuicja 🔮";
} else if (score >= 5) {
    vibe = "Nieźle! Masz dobrego nosa 👀";
} else {
    vibe = "No cóż... totalny chaos 😅";
}

  resultText.textContent = `Twój wynik: ${score}/${randomizedQuiz.length} • ${vibe}`;
}

function restartQuiz() {
  document.getElementById("result").classList.add("hidden");
  document.getElementById("intro").classList.remove("hidden");
}