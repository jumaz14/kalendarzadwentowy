const ICONS = ["🎁","🎄","⭐","🦌","⛄","🧦","🔔","🕯️"];

const now = new Date();
const isTestNovember = now.getMonth() === 11;
const currentDay = now.getDate();
const unlockedUntil = 20//isTestNovember ? currentDay : 0;

const calendar = document.getElementById("calendar");

for (let i = 1; i <= 20; i++) {

  const door = document.createElement("div");
  door.className = "door" + (i > unlockedUntil ? " locked" : "");
  door.dataset.day = i;
  door.id = "door" + i;


  door.innerHTML = `
    <div class="door-inner">
      <div style="font-size:32px">${ICONS[Math.floor(Math.random() * ICONS.length)]}</div>
      Dzień ${i}
    </div>
  `;

  calendar.appendChild(door);
}

document.querySelectorAll(".door").forEach(door => {
  door.addEventListener("click", () => {
    door.classList.add("open");

    setTimeout(() => {
      window.location.href = "day " + door.dataset.day + "/index.html";
    }, 700);
  });
});
