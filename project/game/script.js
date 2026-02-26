const cells = document.querySelectorAll('.cell');
const titleHeader = document.querySelector('#titleHeader');
const xPlayerDisplay = document.querySelector('#xPlayerDisplay');
const oPlayerDisplay = document.querySelector('#oPlayerDisplay');
const restartBtn = document.querySelector('#restartBtn');

let player = 'x';
let human = 'x';
let bot = 'o';
let isPauseGame = false;
let isGameStart = false;
let playWithBot = true;

const inputCells = ['', '', '', '', '', '', '', '', ''];

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

xPlayerDisplay.addEventListener('click', () => choosePlayer('x'));
oPlayerDisplay.addEventListener('click', () => choosePlayer('o'));

function choosePlayer(selected) {
    if (isGameStart) return;

    human = selected;
    bot = selected === 'x' ? 'o' : 'x';
    player = 'x';

    xPlayerDisplay.classList.remove('player-active');
    oPlayerDisplay.classList.remove('player-active');

    if (selected === 'x') {
        xPlayerDisplay.classList.add('player-active');
    } else {
        oPlayerDisplay.classList.add('player-active');
    }

    if (bot === 'x') {
        setTimeout(botMove, 400);
    }
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => tapCell(cell, index));
});

function tapCell(cell, index) {
    if (
        cell.textContent === '' &&
        !isPauseGame &&
        player === human
    ) {
        isGameStart = true;
        updateCell(cell, index);

        if (!checkWinner()) {
            changePlayer();
            if (playWithBot && player === bot) {
                setTimeout(botMove, 400);
            }
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

function botMove() {
    if (isPauseGame) return;

    let bestMove = findBestMove();
    updateCell(cells[bestMove], bestMove);

    if (!checkWinner()) {
        changePlayer();
    }
}

function findBestMove() {
    // 1. Try to win
    for (const [a, b, c] of winConditions) {
        const combo = [a, b, c];
        const values = combo.map(i => inputCells[i]);

        if (values.filter(v => v === bot).length === 2 &&
            values.includes('')) {
            return combo[values.indexOf('')];
        }
    }

    // 2. Block human
    for (const [a, b, c] of winConditions) {
        const combo = [a, b, c];
        const values = combo.map(i => inputCells[i]);

        if (values.filter(v => v === human).length === 2 &&
            values.includes('')) {
            return combo[values.indexOf('')];
        }
    }

    // 3. Center
    if (inputCells[4] === '') return 4;

    // 4. Corners
    const corners = [0, 2, 6, 8];
    for (let corner of corners) {
        if (inputCells[corner] === '') return corner;
    }

    // 5. Any empty
    const empty = inputCells
        .map((val, i) => val === '' ? i : null)
        .filter(v => v !== null);

    return empty[Math.floor(Math.random() * empty.length)];
}

restartBtn.addEventListener('click', () => {
    inputCells.fill('');
    cells.forEach(cell => cell.textContent = '');
    player = 'x';
    isPauseGame = false;
    isGameStart = false;
    titleHeader.textContent = 'Choose';
});