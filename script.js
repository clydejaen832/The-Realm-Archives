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
