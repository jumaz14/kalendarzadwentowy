const scene = document.getElementById('scene');
const justyna = document.getElementById('targetJustyna');
const hintBtn = document.getElementById('hintBtn');
const resetBtn = document.getElementById('resetBtn');
const resultEl = document.getElementById('result');

function randomizeJustyna(){
  resultEl.classList.add('hidden');

  const rect = scene.getBoundingClientRect();
  const w = 45, h = 45;

  const left = Math.random() * (rect.width - w - 20) + 10;
  const top  = Math.random() * (rect.height - h - 20) + 10;

  justyna.style.left = left + 'px';
  justyna.style.top = top + 'px';

  justyna.style.pointerEvents = 'auto';
}

justyna.addEventListener('click', ()=>{
  resultEl.classList.remove('hidden');
  justyna.style.pointerEvents = 'none';
});

hintBtn.addEventListener('click', ()=>{
  justyna.animate(
    [
      {filter:'brightness(1)'},
      {filter:'brightness(2)'},
      {filter:'brightness(1)'}
    ],
    {duration:700}
  );
});

resetBtn.addEventListener('click', randomizeJustyna);

window.addEventListener('load', randomizeJustyna);