const cells = document.querySelectorAll('.cell');
const titleHeader = document.querySelector('#titleHeader');
const xPlayerDisplay = document.querySelector('#xPlayerDisplay');
const oPlayerDisplay = document.querySelector('#oPlayerDisplay');
const restartBtn = document.querySelector('#restartBtn');

let player = 'x';
let isPauseGame = false;
let isGameStart = false;

const inputCells = ['', '', '', '', '', '', '', '', ''];

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => tapCell(cell, index));
});

function tapCell(cell, index) {
    if (cell.textContent === '' && !isPauseGame) {
        isGameStart = true;
        updateCell(cell, index);
        if (!checkWinner()) {
            changePlayer();
        }
    }
}

function updateCell(cell, index) {
    cell.textContent = player;
    inputCells[index] = player;
    cell.style.color = player === 'x' ? '#1892EA' : '#A737FF';
}

function changePlayer() {
    player = player === 'x' ? 'o' : 'x';
}

function checkWinner() {
    for (const [a, b, c] of winConditions) {
        if (
            inputCells[a] &&
            inputCells[a] === inputCells[b] &&
            inputCells[a] === inputCells[c]
        ) {
            titleHeader.textContent = `${player.toUpperCase()} Wins!`;
            isPauseGame = true;
            return true;
        }
    }

    if (!inputCells.includes('')) {
        titleHeader.textContent = "It's a Draw!";
        isPauseGame = true;
        return true;
    }

    return false;
}

restartBtn.addEventListener('click', () => {
    inputCells.fill('');
    cells.forEach(cell => {
        cell.textContent = '';
    });
    player = 'x';
    isPauseGame = false;
    isGameStart = false;
    titleHeader.textContent = 'Choose';
});