//JS for the games pages
//basically the same code as the meditation audio features 
var selectedGame = null;

function selectGame(icon, gameName) {
    if (selectedGame) {
        var previousIcon = document.querySelector('.game-' + selectedGame);
        previousIcon.src = 'images/' + selectedGame + '.svg';
    }
    if (selectedGame === gameName) {
        selectedGame = null;
        return;
    }
    icon.src = 'images/' + gameName + '-pressed.svg';
    selectedGame = gameName;
}

//takes the user to the game they selected
function playSelectedGame() {
    if (!selectedGame) {
        return;
    }

    showScreen(selectedGame);
}