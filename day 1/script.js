const dialogue = document.getElementById('dialogue');
const continueText = document.getElementById('continue');
const options = document.getElementById('options');
const gift = document.getElementById('gift');
const giftText = document.getElementById('giftText');

const dialogues = [
  "Cześć Krzysiu <3",
  "Przygotowałam Ci małą niespodziankę, żeby te ostatnie 20 dni przed naszym spotkaniem szybciej zleciały i żeby jakoś umilić Ci ten czas.",
  "Nie wiem jak ty, ale ja bardzo lubię kalendarze adwentowe, nawet jak to jest jedna mała czekoladka dziennie, to i tak zawsze mi poprawia humor.",
  "Więc właśnie dlatego sobie pomyślałam, że zrobię Ci taki mały przedświąteczny prezent.",
  "Też w ramach podziękowania za to, że odbierasz mnie z lotniska, że poznajesz rodziców i że ogólnie tak się starasz, serio to bardzo doceniam i dużo to dla mnie znaczy.",
  "Robiłam to też z myślą o tym, że wiedziałam, że końcówka listopada i grudzień będą dla mnie intensywne, więc możliwe, że będziemy pisać/rozmawiać mniej niż zwykle.",
  "Więc mam nadzieję, że to choć troszkę Ci to wynagrodzi :)",
  "Codziennie będzie odblokowywało się nowe okienko, które będziesz mógł otworzyć.",
  "W środku będą różne mini gierki i inne drobne niespodzianki.",
  "Mam nadzieję, że Ci się spodoba <3 Gotowy?"
];

let index = 0;
let isTyping = false;

function typeText(text, callback) {
  let i = 0;
  isTyping = true;
  dialogue.textContent = "";
  const interval = setInterval(() => {
    dialogue.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      isTyping = false;
      if (callback) callback();
    }
  }, 25);
}

function nextDialogue() {
  if (isTyping) return;
  if (index < dialogues.length) {
    typeText(dialogues[index], () => {
      index++;
      continueText.style.display = "block";
    });
  } else {
    continueText.style.display = "none";
    options.style.display = "flex";
  }
}

document.addEventListener('click', () => {
  continueText.style.display = "none";
  nextDialogue();
});

document.addEventListener('keydown', (e) => {
  if (e.key === "Enter" && !isTyping) {
    continueText.style.display = "none";
    nextDialogue();
  }
});

options.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const reply = e.target.getAttribute('data-reply');
    options.style.display = "none";
    if (reply === "1") {
      typeText("Okej, to tu Twoja pierwsza nagroda na dzisiaj 🎁");
    } else if (reply === "2") {
      typeText("No co nie, masakra no. Tu Twoja pierwsza nagroda na dzisiaj 🎁");
    } else {
      typeText(" ... to masz problem, i tak Ci to pokażę! Tu Twoja pierwsza nagroda na dzisiaj 🎁");
    }

    setTimeout(() => { gift.style.display = "block"; }, 3000);
  }
});

document.getElementById('present').addEventListener('click', () => {
  giftText.innerHTML = '🎬 Oto reels na poprawę humoru:<br><a href="https://www.instagram.com/reel/DP9SZt0j0md/?igsh=MTU0eno0MHd3cGl5cQ%3D%3D" target="_blank">[kliknij tutaj]</a>';
});

nextDialogue();