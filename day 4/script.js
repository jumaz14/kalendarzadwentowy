const lastVisit = new Date("2025-08-04T14:30:00");
const nextVisit = new Date("2025-12-20T12:00:00");

function updateCounter() {
    const now = new Date();

    // Od ostatniego spotkania
    let diffLast = now - lastVisit;
    const daysLast = Math.floor(diffLast / (1000*60*60*24));
    const hoursLast = Math.floor(diffLast / (1000*60*60) % 24);
    const minutesLast = Math.floor(diffLast / (1000*60) % 60);
    const secondsLast = Math.floor(diffLast / 1000 % 60);
    document.getElementById("sinceLast").innerText = 
      `${daysLast} dni, ${hoursLast} godzin, ${minutesLast} minut, ${secondsLast} sekund`;

    // Do następnego spotkania
    let diffNext = nextVisit - now;
    const daysNext = Math.floor(diffNext / (1000*60*60*24));
    const hoursNext = Math.floor(diffNext / (1000*60*60) % 24);
    const minutesNext = Math.floor(diffNext / (1000*60) % 60);
    const secondsNext = Math.floor(diffNext / 1000 % 60);
    document.getElementById("untilNext").innerText = 
      `${daysNext} dni, ${hoursNext} godzin, ${minutesNext} minut, ${secondsNext} sekund`;

    // Pasek postępu
    const totalDuration = nextVisit - lastVisit;
    const progress = ((now - lastVisit) / totalDuration) * 100;
    const bar = document.getElementById("progressBar");
    const text = document.getElementById("progressText");
    bar.style.width = progress + "%";
    text.innerText = Math.floor(progress) + "%";
  }

  updateCounter();
  setInterval(updateCounter, 1000);