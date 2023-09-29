'use strict';

/***********************************************************************************/
/* *********************************** DONNEES *************************************/
/***********************************************************************************/
let countdown = 10; // Initialiser le compte à rebours à 10
let timerInterval; // Garder une référence à l'intervalle du compte à rebours
const bouton = document.getElementById("firing-button");
const cancel = document.getElementById("cancel-button");
const reset = document.getElementById("reset-button");


/***********************************************************************************/
/* ********************************** FONCTIONS ************************************/
/***********************************************************************************/
function timer() {
    const timerElement = document.getElementById("timer");
    timerElement.innerHTML = countdown;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function createStar() {
    const star = document.createElement("div");
    star.classList.add("star");

    // Choix de la taille de l'étoile
    const sizes = ["tiny", "normal", "big"];
    const randomSize = sizes[getRandomNumber(0, sizes.length)];
    star.classList.add(randomSize);

    // Positionnez aléatoire
    const x = getRandomNumber(0, window.innerWidth);
    const y = getRandomNumber(0, window.innerHeight);
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;

    document.body.appendChild(star);
}

/************************************************************************************/
/* ******************************** CODE PRINCIPAL **********************************/
/************************************************************************************/
timer();


bouton.addEventListener("click", function () {
    // Vérifier si le compte à rebours est déjà en cours
    if (!timerInterval) {
        // Mettre en place un intervalle pour mettre à jour le compte à rebours chaque seconde
        timerInterval = setInterval(function () {
            const rocket = document.getElementById("rocket");
            countdown--;
            if (countdown >= 0) {
                timer();
            } else {
                clearInterval(timerInterval); // Arrêter l'intervalle lorsque le compte à rebours atteint 0
                rocket.src = "./images/rocket3.gif";
                rocket.classList.add("tookOff"); // Ajouter la classe took-off à la fusée pour la faire bouger
            }
        }, 1000);

        // Ajouter la classe disable au bouton
        bouton.classList.add("disabled");
    }
});


cancel.addEventListener("click", function () {
    if (timerInterval) {
        clearInterval(timerInterval); // Arrêter le compte à rebours
        timerInterval = null;
        const rocket = document.getElementById("rocket");
        rocket.src = "./images/rocket1.png";
        rocket.classList.remove("tookOff");
        timer();
        bouton.classList.remove("disabled"); // Réactiver le bouton vert
    }
});

reset.addEventListener("click", function () {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        const rocket = document.getElementById("rocket");
        rocket.src = "./images/rocket1.png";
        rocket.classList.remove("tookOff");
        countdown = 10;
        timer();
        bouton.classList.remove("disabled");
    }
});

// Changer l'état de la rocket pendant le timer de rocket1.ping a rocket2.gif
bouton.addEventListener("click", function () {
    const rocket = document.getElementById("rocket");
    if (countdown === 10) {
        rocket.src = "./images/rocket1.gif";
    }
    if (countdown >= 0) {
        rocket.src = "./images/rocket2.gif";
    }
});

// Créer les étoiles
for (let i = 0; i < 150; i++) {
    createStar();
}
