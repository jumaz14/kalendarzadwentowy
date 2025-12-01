  const speech = document.getElementById('speech');
  const character = document.getElementById('character');
  const lightbox = document.getElementById('lightbox');

  const message = "Ej… to wcale nie jest takie łatwe wymyślać coś innego codziennie, więc dziś masz tylko to 👇";

  let i = 0;
  function typeWriter() {
    if (i < message.length) {
      speech.innerHTML += message.charAt(i);
      i++;
      setTimeout(typeWriter, 40);
    }
  }
  typeWriter();

  character.addEventListener('click', () => {
    lightbox.style.display = 'flex';
  });

  lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });