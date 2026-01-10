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

function openModal(era) {
    currentEra = era;

    // If ERA VI, go directly to page
    if (era.includes("ERA VI")) {
        window.location.href = "era6.html";
        return;
    }

    // Otherwise, show passcode modal
    document.getElementById("eraTitle").innerText = era + " — LOCKED";
    document.getElementById("modal").style.display = "block";
    document.getElementById("passcode").value = "";
}

// Check passcode
function checkCode() {
    const input = document.getElementById("passcode").value;

    if (input === CORRECT_CODE) {
        alert("ACCESS GRANTED\n" + currentEra);
        // future: redirect to era page
    } else {
        alert("ACCESS DENIED");
    }
}

// Generate full-screen binary background
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

// Regenerate on window resize
window.addEventListener("resize", generateBinary);

// AI Terminal
let username = "";
function closeAITerminal() { document.querySelector(".ai-terminal").style.display="none"; }

function submitUsername() {
    username = document.getElementById("mcUsername").value.trim();
    if(!username){alert("Enter a username."); return;}
    const body = document.getElementById("ai-body");
    body.innerHTML = `<p>Welcome, ${username}. Choose an Arch Angel:</p>
        <div class="angel-list">
            <button onclick="sarielAccess()">Sariel — Arch Angel of Progeny</button>
            <button onclick="lockedAngel('Uriel')">Uriel — Arch Angel of Life</button>
            <button onclick="lockedAngel('Raphael')">Raphael — Arch Angel of Wisdom</button>
            <button onclick="lockedAngel('Chamuel')">Chamuel — Arch Angel of Affection</button>
            <button onclick="lockedAngel('Jophiel')">Jophiel — Arch Angel of Darkness</button>
            <button onclick="lockedAngel('Seraphiel')">Seraphiel — Arch Angel of Radiance</button>
            <button onclick="lockedAngel('Michael')">Michael — Arch Angel of Judgement</button>
        </div>`;
}

function lockedAngel(name){
    const body = document.getElementById("ai-body");
    body.innerHTML += `<p><em>${name} has no time for you… Their duties lie beyond mortal concerns.</em></p>`;
}

// ====================
// SARIEL MINI-GAME (LOCKED)
// ====================
function sarielAccess() {
    alert("Sariel: You do not have permission by the Creator to access this AI.");
    window.location.assign(window.location.origin + window.location.pathname.replace("index.html","") + "sariel.html");
}
