const snowContainer = document.body;
for (let i = 0; i < 50; i++) {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.textContent = '❄';
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.animationDuration = (4 + Math.random() * 6) + 's';
    snowflake.style.fontSize = (10 + Math.random() * 12) + 'px';
    snowflake.style.opacity = Math.random();
    snowflake.style.animationDelay = Math.random() * 5 + 's';
    snowContainer.appendChild(snowflake);
}

const dialogueBox = document.getElementById("dialogue");
const choicesBox = document.getElementById("choices");
const enterHint = document.getElementById("enterHint");

const dialogue = [
    { speaker: "Justyna", text: "Hej Krzysiu. Wiesz kim jestem?" },
    { speaker: "choice", options: [
        { text: "Nie." },
        { text: "No widzę, że Justyną." },
        { text: "No nie wiem, kim?" }
    ]},
    { speaker: "Justyna", text:
`Jestem Justyną, ale nie byle jaką. Jestem Justyną z przyszłości – dokładnie z 20 grudnia. Z dnia naszego spotkania. Przychodzę z ważną informacją.` },
    { speaker: "choice", options: [
        { text: "Jaką informacją?" },
        { text: "To naprawdę się wydarzyło?!" },
        { text: "Przyszłość?!" }
    ]},
    { speaker: "Justyna", text:
`Spokojnie, wszystko po kolei 😄 U mnie jest właśnie wieczór. Odebrałeś mnie już z lotniska, dojechaliśmy bezpiecznie do Wrocławia. Poznałeś moją rodzinkę — i spoiler: uwielbiają Cię! A teraz siedzimy u mnie w pokoju. Zgadnij, co robimy?` },
    { speaker: "choice", options: [
        { text: "Przykleiliśmy się do siebie i nie możemy się odkleić." },
        { text: "Siedzimy pod kocykiem i oglądamy film." },
        { text: "Popijamy ciepłą herbatkę." }
    ]},
    { speaker: "Justyna", text: "W sumie… wszystkie odpowiedzi są poprawne 😌 Ale jestem ciekawa — zgadniesz, jaki film?" },
    { speaker: "choice", options: [
        { text: "Harry Potter" },
        { text: "Kevin sam w domu" },
        { text: "Die Hard" }
    ]},
    { speaker: "Justyna", text:
`Zgadłeś! Choć nie było to zbyt trudne 😄 Ustaliliśmy wcześniej, że robimy maraton HP.` },
    { speaker: "Justyna", text:
`Nie tym razem 😄 Ale spokojnie — jeszcze zdążymy obejrzeć wszystkie świąteczne klasyki.` },
    { speaker: "Justyna", text:
`Wiem, że to czekanie dłuży się niemiłosiernie. I nie tylko Tobie — Justyna z teraźniejszości też już odlicza dni. Ale mówię Ci, z przyszłości — naprawdę zleci to szybciej niż myślisz.` },
    { speaker: "Justyna", text:
`A z okazji Mikołajek mam dla Ciebie mały prezent 🎅 Przesyłam: garść cierpliwości, ciepła i całusy <3` },
    { speaker: "Justyna", text:
`Widzimy się już bardzo niedługo. Buziak z przyszłości ❤️` }
];

let skipNextAfterHP = false;
let index = 0;
let isTyping = false;
let charPos = 0;
let typeInterval = 20;

function typeCurrentLine() {
    const line = dialogue[index];
    if (!line || line.speaker === "choice") return;

    const displayText = `${line.speaker}: ${line.text}`;
    if (charPos < displayText.length) {
        isTyping = true;
        dialogueBox.textContent = displayText.substring(0, charPos + 1);
        charPos++;
        setTimeout(typeCurrentLine, typeInterval);
    } else {
        isTyping = false;
        const next = dialogue[index + 1];
        if (next && next.speaker === "choice") {
            showChoices(next.options);
        }
    }
}

function showChoices(options) {
    choicesBox.innerHTML = "";
    enterHint.style.visibility = "hidden";
    const choiceNodeIndex = index + 1;

    options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.textContent = opt.text || opt;
        btn.onclick = () => {
            choicesBox.innerHTML = "";
            enterHint.style.visibility = "visible";
            let newIndex;
            switch (choiceNodeIndex) {
                case 1: newIndex = 2; break;
                case 3: newIndex = 4; break;
                case 5: newIndex = 6; break;
                case 7:
                    if (i === 0) { newIndex = 8; skipNextAfterHP = true; }
                    else { newIndex = 9; skipNextAfterHP = false; }
                    break;
                default:
                    newIndex = choiceNodeIndex + 1;
            }
            index = newIndex;
            charPos = 0;
            typeCurrentLine();
        };
        choicesBox.appendChild(btn);
    });
}

function nextLine() {
    if (isTyping) return;
    let nextIdx = index + 1;
    if (skipNextAfterHP && nextIdx === 9) {
        nextIdx = 10;
        skipNextAfterHP = false;
    }
    if (nextIdx >= dialogue.length) {
        dialogueBox.textContent = "";
        enterHint.style.visibility = "hidden";
        choicesBox.innerHTML = "";
        return;
    }
    index = nextIdx;
    if (dialogue[index] && dialogue[index].speaker === "choice") {
        showChoices(dialogue[index].options);
    } else {
        charPos = 0;
        typeCurrentLine();
    }
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const hasButtons = !!document.querySelector("#choices button");
        if (hasButtons) return;

        if (isTyping) {
            const line = dialogue[index];
            const displayText = `${line.speaker}: ${line.text}`;
            dialogueBox.textContent = displayText;
            isTyping = false;
            charPos = displayText.length;
            const next = dialogue[index + 1];
            if (next && next.speaker === "choice") {
                showChoices(next.options);
            }
            return;
        }
        nextLine();
    }
});

document.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") return;

    const hasButtons = !!document.querySelector("#choices button");

    if (isTyping) {
        const line = dialogue[index];
        const displayText = `${line.speaker}: ${line.text}`;
        dialogueBox.textContent = displayText;
        isTyping = false;
        charPos = displayText.length;

        const next = dialogue[index + 1];
        if (next && next.speaker === "choice") {
            showChoices(next.options);
        }
        return;
    }

    if (hasButtons) return;

    nextLine();
});

typeCurrentLine();