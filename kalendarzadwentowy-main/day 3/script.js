const cookie = document.getElementById('cookie');
  const fortuneText = document.getElementById('fortune');

  const fortunes = [
    "Za 17 dni zobaczysz najlepszy prezent ever. Spoiler: to ja 😇",
    "Nie spoglądaj za siebie – najlepsze wydarzy się teraz 🌅",
    "Każdego dnia zbliżasz się do czegoś naprawdę wyjątkowego ❤️",
    "Twoja cierpliwość zostanie nagrodzona słodkim spotkaniem 🥰",
    "Uśmiechaj się, bo ktoś myśli o Tobie właśnie teraz 😘",
    "Nie trać nadziei – najlepsze chwile są jeszcze przed Tobą 🌟",
    "Już wkrótce coś wyjątkowego rozświetli Twój dzień ✨",
    "Dziś los Ci sprzyja – uśmiechnij się szeroko 😄",
    "Za każdym kliknięciem wróżba staje się jeszcze słodsza 🍭",
    "Nie zapomnij dzisiaj o sobie… ale myśl też o mnie 🥰",
    "Każda minuta przybliża Cię do chwili, na którą czekałeś ⏳❤️",
    "Ktoś jest dzięki Tobie bardzo szczęśliwy ❤️",
    "Dziś Twój dzień może być magiczny – uwierz w to ✨",
    "Dziś drobny gest może przynieść ogromną radość 💌"
  ];

  cookie.addEventListener('click', () => {
    cookie.classList.remove('cracked');
    void cookie.offsetWidth; 
    cookie.classList.add('cracked');

    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];

    setTimeout(() => {
      fortuneText.textContent = randomFortune;
      fortuneText.style.display = 'block';
    }, 500);
  });