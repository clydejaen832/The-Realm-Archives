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
        // Here you could redirect to the era page in the future
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
// SARIEL MINI-GAME (CANVAS VERSION)
// ====================
let canvas = document.getElementById("sarielCanvas");
let ctx = canvas.getContext("2d");
let coins = 0;

// Player setup
let player = { x: 50, y: 50, width: 20, height: 20, color: "#00ff88", speed: 4 };

// Plants
const plantsData = [
    {name:"Carrot", value:1, color:"#ff6600"},
    {name:"Tomato", value:2, color:"#ff0000"},
    {name:"Potato", value:3, color:"#d2b48c"},
    {name:"Corn", value:5, color:"#ffff00"},
    {name:"Pumpkin", value:7, color:"#ff9933"},
    {name:"Beetroot", value:8, color:"#990066"},
    {name:"Apple", value:10, color:"#ff5555"},
    {name:"Wheat", value:12, color:"#ffff99"},
    {name:"Melon", value:15, color:"#00cc00"},
    {name:"Rare Seed", value:20, color:"#cc00ff"}
];

// Create 10 plant objects with random positions
let plants = plantsData.map(p => ({
    ...p,
    x: Math.random() * (canvas.width-30),
    y: Math.random() * (canvas.height-30),
    width: 20,
    height: 20
}));

// Animals
let animalsData = ["Sheep","Cow","Chicken"];
let animals = animalsData.map((a,i) => ({
    name:a, x: 50+ i*60, y: 300, width:20, height:20, color:"#ffffff"
}));

// Key press
let keys = {};
document.addEventListener("keydown", e => { keys[e.key] = true; });
document.addEventListener("keyup", e => { keys[e.key] = false; });

// Game Loop
function gameLoop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Move player
    if(keys["ArrowUp"] || keys["w"]) player.y -= player.speed;
    if(keys["ArrowDown"] || keys["s"]) player.y += player.speed;
    if(keys["ArrowLeft"] || keys["a"]) player.x -= player.speed;
    if(keys["ArrowRight"] || keys["d"]) player.x += player.speed;

    // Boundaries
    player.x = Math.max(0, Math.min(canvas.width-player.width, player.x));
    player.y = Math.max(0, Math.min(canvas.height-player.height, player.y));

    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw plants
    plants.forEach(p=>{
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.width, p.height);
        // Collision
        if(player.x < p.x + p.width && player.x + player.width > p.x &&
           player.y < p.y + p.height && player.y + player.height > p.y){
            coins += p.value;
            resetPlant(p);
        }
    });

    // Draw animals
    animals.forEach(a=>{
        ctx.fillStyle = a.color;
        ctx.fillRect(a.x, a.y, a.width, a.height);
        // Collision: breed for 5 coins
        if(player.x < a.x + a.width && player.x + player.width > a.x &&
           player.y < a.y + a.height && player.y + player.height > a.y){
            coins += 5;
            a.x = Math.random() * (canvas.width-30);
            a.y = Math.random() * (canvas.height-30);
        }
    });

    document.getElementById("coins").innerText = coins;
    requestAnimationFrame(gameLoop);
}

// Reset plant position after harvesting
function resetPlant(p){
    p.x = Math.random() * (canvas.width-30);
    p.y = Math.random() * (canvas.height-30);
}

// Start Sariel Game
function startSariel(){
    document.getElementById("sarielModal").style.display="block";
    canvas.focus();
    requestAnimationFrame(gameLoop);
}

// Close Sariel Game
function closeSarielGame(){
    document.getElementById("sarielModal").style.display="none";
}

// ====================
// SHOP
// ====================
let shopItems = [
    { name: "Watering Can", cost: 50, effect: "doubleGrowth" },
    { name: "Fertilizer", cost: 75, effect: "tripleGrowth" },
    { name: "Magic Hoe", cost: 100, effect: "instantHarvest" },
    { name: "Seedlight Citadel Key", cost: 500, effect: "endGame" }
];

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
                if (item.effect === "endGame") {
                    glitchEffect();
                } else {
                    alert(`${item.name} purchased!`);
                }
                closeShop();
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
