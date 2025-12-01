const startScreen = document.getElementById('startScreen');
const room = document.getElementById('room');
const hud = document.getElementById('hud');
const areas = document.querySelectorAll('.area');
const tooltip = document.getElementById('tooltip');
const message = document.getElementById('message');
const foundCountElem = document.getElementById('foundCount');
const timerElem = document.getElementById('timer');

let found = 0;
let seconds = 0;
let timerInterval;

// Liczymy tylko obszary z przedmiotami
const total = Array.from(areas).filter(area => area.dataset.item).length;

// Start gry po Enter
document.addEventListener('keydown', function(e) {
    if(e.key === 'Enter') {
        startScreen.style.display = 'none';
        room.style.display = 'block';
        hud.style.display = 'block';

        // Start timera
        timerInterval = setInterval(() => {
            seconds++;
            const min = Math.floor(seconds / 60);
            const sec = seconds % 60;
            timerElem.textContent = `Czas: ${min}:${sec < 10 ? '0' : ''}${sec}`;
        }, 1000);
    }
});

// Interakcja z obszarami
areas.forEach(area => {
    area.addEventListener('mouseenter', (e) => {
        tooltip.textContent = area.dataset.tooltip;
        tooltip.style.display = 'block';
        tooltip.style.left = e.pageX + 10 + 'px';
        tooltip.style.top = e.pageY + 10 + 'px';
    });

    area.addEventListener('mousemove', (e) => {
        tooltip.style.left = e.pageX + 10 + 'px';
        tooltip.style.top = e.pageY + 10 + 'px';
    });

    area.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });

    area.addEventListener('click', () => {
        const item = area.dataset.item;
        if(item) {
            alert(`Znalazłeś ${item}! 🎉`);
            area.dataset.item = '';
            found++;
            foundCountElem.textContent = found;

            const li = document.getElementById('li-' + item);
            if(li){
                li.style.textDecoration = 'line-through';
                li.style.opacity = '0.5';
            }

            if(found === total){
                clearInterval(timerInterval);
                message.style.display = 'block';
                alert(`Gratulacje! Znalazłeś wszystkie przedmioty w ${Math.floor(seconds/60)}:${seconds%60 < 10 ? '0' : ''}${seconds%60} minut! 🎉`);
            }
        } else {
            alert('Niestety nic tu nie ma 😅');
        }
    });
});
