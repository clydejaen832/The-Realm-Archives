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
