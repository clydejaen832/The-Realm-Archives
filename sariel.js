function selectCharacter(name) {
    document.getElementById("selection").innerText =
        name + " has been chosen.\nThe world will remember this decision.";

    // later we store this choice
    localStorage.setItem("sarielCharacter", name);

    // future: go to first room
    // window.location.href = "room1.html";
}
