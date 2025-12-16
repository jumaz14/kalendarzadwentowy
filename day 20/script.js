  const envelopeContainer = document.getElementById('envelopeContainer');
  const envelope = document.getElementById('envelope');
  const letter = document.getElementById('letter');

  function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = "💗";
    heart.style.fontSize = (12 + Math.random() * 18) + "px";
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = window.innerHeight + 'px';
    heart.style.animationDuration = (2 + Math.random() * 1.5) + 's';
    document.body.appendChild(heart);
    heart.addEventListener('animationend', () => heart.remove());
  }
  setInterval(createHeart, 1000);

  envelopeContainer.addEventListener('click', () => {
    envelope.classList.add('open');
    setTimeout(() => {
      letter.classList.add('show');
    }, 1000);
  });
