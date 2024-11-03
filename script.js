const cells = document.querySelectorAll('[data-cell]');
const playerTurnText = document.getElementById('playerTurn');
const startGameButton = document.getElementById('startGame');
const restartGameButton = document.getElementById('restartGame');
let player1Name = '';
let player2Name = '';
let currentPlayer = 'X';
let gameActive = false;
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGameButton.addEventListener('click', startGame);
restartGameButton.addEventListener('click', restartGame);

function startGame() {
    player1Name = document.getElementById('player1').value || 'Player 1';
    player2Name = document.getElementById('player2').value || 'Player 2';
    gameActive = true;
    currentPlayer = 'X';
    playerTurnText.textContent = `${player1Name}'s turn (X)`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick, { once: true });
    });
}

function handleCellClick(e) {
    const cell = e.target;
    if (!gameActive) return;

    cell.textContent = currentPlayer;

    if (checkWin()) {
        playerTurnText.textContent = `${currentPlayer === 'X' ? player1Name : player2Name} wins!`;
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        playerTurnText.textContent = 'It\'s a draw!';
        gameActive = false;
        return;
    }

    switchPlayer();
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerTurnText.textContent = `${currentPlayer === 'X' ? player1Name : player2Name}'s turn (${currentPlayer})`;
}

function checkWin() {
    return winConditions.some(condition => {
        return condition.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

function checkDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
}

function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    playerTurnText.textContent = `${player1Name}'s turn (X)`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick, { once: true });
    });
}


