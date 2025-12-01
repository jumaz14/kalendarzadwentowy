const imageSrc = "my.jpg";
const rows = 5;
const cols = 4;

const container = document.getElementById("puzzle-container");
container.style.gridTemplateColumns = `repeat(${cols}, var(--size))`;
container.style.gridTemplateRows = `repeat(${rows}, var(--size))`;

const message = document.getElementById("message");

const total = rows * cols;
const positions = [];

function getSize() {
  return parseInt(getComputedStyle(document.documentElement).getPropertyValue('--size'));
}

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    positions.push({ row: r, col: c });
  }
}

for (let i = 0; i < total; i++) {
  const slot = document.createElement("div");
  slot.className = "slot";
  slot.dataset.slotIndex = i;
  slot.addEventListener("dragover", (e) => e.preventDefault());
  slot.addEventListener("drop", onDropToSlot);
  container.appendChild(slot);
}

let pieces = positions.map((pos, idx) => {
  const p = document.createElement("div");
  p.className = "piece";
  p.setAttribute("draggable", "true");
  p.dataset.correct = idx;

  const size = getSize();
  p.style.backgroundImage = `url(${imageSrc})`;
  p.style.backgroundSize = `${cols * size}px ${rows * size}px`;
  p.style.backgroundPosition = `-${pos.col * size}px -${pos.row * size}px`;

  p.addEventListener("dragstart", dragStart);
  p.addEventListener("dragend", dragEnd);

  p.addEventListener("touchstart", touchStart, { passive:false });
  p.addEventListener("touchmove", touchMove, { passive:false });
  p.addEventListener("touchend", touchEnd);

  return p;
});

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
shuffleArray(pieces);

const slots = Array.from(document.querySelectorAll(".slot"));
slots.forEach((slot, i) => slot.appendChild(pieces[i]));

let draggedPiece = null;

function dragStart(e) {
  draggedPiece = this;
  this.classList.add("dragging");
  e.dataTransfer.setData("text/plain", "x");
}

function dragEnd() {
  this.classList.remove("dragging");
  draggedPiece = null;
}

function onDropToSlot(e) {
  e.preventDefault();
  const slot = e.currentTarget;
  if (!draggedPiece) return;

  const fromSlot = draggedPiece.parentElement;
  if (slot === fromSlot) return;

  const target = slot.querySelector(".piece");

  slot.appendChild(draggedPiece);
  if (target) fromSlot.appendChild(target);

  checkPuzzle();
}

let touchOffsetX = 0;
let touchOffsetY = 0;

function touchStart(e) {
  e.preventDefault();
  draggedPiece = this;

  const rect = this.getBoundingClientRect();
  const t = e.touches[0];
  touchOffsetX = t.clientX - rect.left;
  touchOffsetY = t.clientY - rect.top;

  this.classList.add("dragging");
  this.style.position = "absolute";
  this.style.pointerEvents = "none";
  this.style.zIndex = 9999;

  movePiece(t.clientX, t.clientY);
}

function touchMove(e) {
  e.preventDefault();
  if (!draggedPiece) return;

  const t = e.touches[0];
  movePiece(t.clientX, t.clientY);
}

function movePiece(x, y) {
  draggedPiece.style.left = x - touchOffsetX + "px";
  draggedPiece.style.top = y - touchOffsetY + "px";
}

function touchEnd(e) {
  if (!draggedPiece) return;

  draggedPiece.classList.remove("dragging");

  const t = e.changedTouches[0];
  const dropTarget = document.elementFromPoint(t.clientX, t.clientY);

  let slot = dropTarget?.closest(".slot");
  const fromSlot = draggedPiece.parentElement;

  draggedPiece.style.position = "relative";
  draggedPiece.style.left = "0px";
  draggedPiece.style.top = "0px";
  draggedPiece.style.pointerEvents = "auto";

  if (slot && slot !== fromSlot) {
    const target = slot.querySelector(".piece");
    slot.appendChild(draggedPiece);
    if (target) fromSlot.appendChild(target);
  }

  draggedPiece = null;
  checkPuzzle();
}


function checkPuzzle() {
  let correct = true;

  for (let i = 0; i < slots.length; i++) {
    const piece = slots[i].querySelector(".piece");
    if (!piece || Number(piece.dataset.correct) !== i) {
      correct = false;
      break;
    }
  }

  if (correct) message.classList.add("show");
  else message.classList.remove("show");
}

checkPuzzle();