// Game variables
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// DOM elements
const boardElement = document.getElementById('board');
const resultScreen = document.getElementById('result');
const resultMessage = document.querySelector('.result-message');

// Create the Tic Tac Toe board
function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        boardElement.appendChild(cell);
    }
}

// Handle cell click
function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        checkWinner();
        togglePlayer();
    }
}

// Check for a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            showResult(`${currentPlayer} wins!`);
            return;
        }
    }

    if (!gameBoard.includes('') && gameActive) {
        gameActive = false;
        showResult("It's a draw!");
    }
}

// Toggle player turn
function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Show result screen
function showResult(message) {
    resultMessage.textContent = message;
    resultScreen.style.display = 'flex';
    boardElement.style.display = 'none';
}

// Reset the game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    resultScreen.style.display = 'none';
    boardElement.style.display = 'grid';
    resultMessage.textContent = '';
    
    // Clear the board
    boardElement.innerHTML = '';
    
    // Recreate the board
    createBoard();
}

// Initialize the game
createBoard();
