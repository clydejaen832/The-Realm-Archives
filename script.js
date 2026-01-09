const CORRECT_CODE = "#W0rld5Bui1t_B4Fr@ctur3d!9Z";
let selectedEra = "";

function openModal(era) {
    selectedEra = era;
    document.getElementById("eraTitle").innerText = era + " ACCESS";
    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("passcode").value = "";
}

function checkCode() {
    const input = document.getElementById("passcode").value;
    if (input === CORRECT_CODE) {
        alert("ACCESS GRANTED: " + selectedEra);
        // Later you can redirect like:
        // window.location.href = "era1.html";
    } else {
        alert("ACCESS DENIED");
    }
}
