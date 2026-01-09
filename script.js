// ====================
// ERA PASSCODE LOCK
// ====================
const CORRECT_CODE = "#W0rld5Bui1t_B4Fr@ctur3d!9Z";
let currentEra = "";

function openModal(era) {
    currentEra = era;
    document.getElementById("eraTitle").innerText = era + " — LOCKED";
    document.getElementById("modal").style.display = "block";
    document.getElementById("passcode").value = "";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function checkCode() {
    const input = document.getElementById("passcode").value;
    if (input === CORRECT_CODE) {
        alert("ACCESS GRANTED\n" + currentEra);
        // future: redirect to era page
    } else {
        alert("ACCESS DENIED");
    }
}

// ====================
// AI TERMINAL
// ====================
let username = "";

function closeAITerminal() {
    document.querySelector(".ai-terminal").style.display = "none";
}

function submitUsername() {
    username = document.getElementById("mcUsername").value.trim();
    if (!username) {
        alert("You must enter a username to proceed.");
        return;
    }

    const body = document.getElementById("ai-body");
    body.innerHTML = `<p>Welcome, ${username}. Choose an Arch Angel to interact with:</p>
        <div class="angel-list">
            <button onclick="startSariel()">Sariel — Arch Angel of Progeny</button>
            <button onclick="lockedAngel('Uriel')">Uriel — Arch Angel of Life</button>
            <button onclick="lockedAngel('Raphael')">Raphael — Arch Angel of Wisdom</button>
            <button onclick="lockedAngel('Chamuel')">Chamuel — Arch Angel of Affection</button>
            <button onclick="lockedAngel('Jophiel')">Jophiel — Arch Angel of Darkness</button>
            <button onclick="lockedAngel('Seraphiel')">Seraphiel — Arch Angel of Radiance</button>
            <button onclick="lockedAngel('Michael')">Michael — Arch Angel of Judgement</button>
        </div>`;
}

function lockedAngel(name) {
    const body = document.getElementById("ai-body");
    body.innerHTML += `<p><em>${name} has no time for you… Their duties lie beyond mortal concerns.</em></p>`;
}

// ====================
// SARIEL MINI-GAME
// ====================
let coins = 0;
const plants = [
    { name: "Carrot", value: 1 },
    { name: "Tomato", value: 2 },
    { name: "Potato", value: 3 },
    { name: "Corn", value: 5 },
    { name: "Pumpkin", value: 7 },
    { name: "Beetroot", value: 8 },
    { name: "Apple", value: 10 },
    { name: "Wheat", value: 12 },
    { name: "Melon", value: 15 },
    { name: "Rare Seed", value: 20 }
];
const animals = ["Sheep", "Cow", "Chicken"];
let shopItems = [
    { name: "Watering Can", cost: 50, effect: "doubleGrowth" },
    { name: "Fertilizer", cost: 75, effect: "tripleGrowth" },
    { name: "Magic Hoe", cost: 100, effect: "instantHarvest" },
    { name: "Seedlight Citadel Key", cost: 500, effect: "endGame" }
];

function startSariel() {
    document.getElementById("sarielModal").style.display = "block";
    updateGame();
}

function closeSarielGame() {
    document.getElementById("sarielModal").style.display = "none";
}

// Update game UI
function updateGame() {
    document.getElementById("coins").innerText = coins;
    const plantDiv = document.getElementById("plantsContainer");
    plantDiv.innerHTML = "";
    plants.forEach(p => {
        const b = document.createElement("button");
        b.className = "plant";
        b.innerText = `${p.name} (+${p.value} coins)`;
        b.onclick = () => { coins += p.value; checkGoal(); updateGame(); }
        plantDiv.appendChild(b);
    });

    const animalDiv = document.getElementById("animalsContainer");
    animalDiv.innerHTML = "";
    animals.forEach(a => {
        const b = document.createElement("button");
        b.className = "animal";
        b.innerText = `${a} (Breed +5 coins)`;
        b.onclick = () => { coins += 5; checkGoal(); updateGame(); }
        animalDiv.appendChild(b);
    });
}

// Check if player reached goal
function checkGoal() {
    if (coins >= 1000) {
        alert("You have enough coins! Go to the Shop to buy the Seedlight Citadel Key.");
    }
}

// ====================
// SHOP
// ====================
function openShop() {
    document.getElementById("shopModal").style.display = "block";
    const shopDiv = document.getElementById("shopItems");
    shopDiv.innerHTML = "";
    shopItems.forEach(item => {
        const b = document.createElement("button");
        b.innerText = `${item.name} - ${item.cost} coins`;
        b.onclick = () => {
            if (coins >= item.cost) {
                coins -= item.cost;
                updateGame();
                if (item.effect === "endGame") {
                    glitchEffect();
                } else {
                    alert(`${item.name} purchased!`);
                }
                document.getElementById("shopModal").style.display = "none";
            } else {
                alert("Not enough coins!");
            }
        }
        shopDiv.appendChild(b);
    });
}

function closeShop() {
    document.getElementById("shopModal").style.display = "none";
}

// ====================
// GLITCH EFFECT
// ====================
function glitchEffect() {
    document.body.style.filter = "blur(3px) invert(1)";
    setTimeout(() => {
        document.body.style.filter = "";
        coins = 0;
        closeSarielGame();
        alert("The Seedlight Citadel key has been acquired, but reality glitches around you...");
    }, 2000);
}

// ====================
// BINARY BACKGROUND
// ====================
const binaryEl = document.querySelector(".binary");
function generateBinary() {
    binaryEl.textContent = "";
    const screenHeight = Math.ceil(window.innerHeight / 24) * 2;
    const screenWidth = Math.ceil(window.innerWidth / 10) * 2;
    for (let i = 0; i < screenHeight; i++) {
        let line = "";
        for (let j = 0; j < screenWidth; j++) {
            line += Math.random() > 0.5 ? "1" : "0";
        }
        binaryEl.textContent += line + "\n";
    }
}
generateBinary();
window.addEventListener("resize", generateBinary);
