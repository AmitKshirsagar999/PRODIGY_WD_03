let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleCellClick(index) {
    if (!gameActive || gameBoard[index] !== '') return;

    gameBoard[index] = currentPlayer;
    renderBoard();
    
    if (checkWinner()) {
        document.getElementById('status').innerText = `!! Player ${currentPlayer} won !!`;
        gameActive = false;
    } else if (gameBoard.every(cell => cell !== '')) {
        document.getElementById('status').innerText = '!! It\'s a draw !!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('status').innerText = `Current player: ${currentPlayer}`;
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
    });
}

function renderBoard() {
    const boardElement = document.getElementById('game-board');

    gameBoard.forEach((value, index) => {
        const cell = boardElement.children[index];
        cell.textContent = value;

        cell.className = `cell player-${value.toLowerCase()}`;
    });
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    document.getElementById('status').innerText = 'Current player: X';
    renderBoard();
}

document.getElementById('status').innerText = 'Current player: X';
renderBoard();
