  const intro = document.getElementById('intro');
  const startBtn = document.getElementById('startBtn');
  const bubbles = document.querySelectorAll('.bubble');

  bubbles.forEach(b => b.style.display = 'none');

  startBtn.addEventListener('click', () => {
    intro.style.display = 'none';
    bubbles.forEach(b => b.style.display = 'flex');
  });

  bubbles.forEach(bubble => {
    bubble.addEventListener('click', () => {
      if (!bubble.classList.contains('revealed')) {
        const img = document.createElement('img');
        img.src = bubble.dataset.img;
        bubble.appendChild(img);
        bubble.classList.add('revealed');
      } else {
        bubble.classList.remove('revealed');
        bubble.innerHTML = "";
      }
    });
  });