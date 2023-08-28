let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let currentPlayer = 'X';

function makeMove(row, col) {
    const cell = document.querySelector(`.board > .cell:nth-child(${row * 3 + col + 1})`);

    if (board[row][col] === '' && cell.innerText === '') {
        board[row][col] = currentPlayer;
        cell.innerText = currentPlayer;

        if (checkWinner()) {
            setTimeout(() => {
                alert(`${currentPlayer} wins!`);
                resetGame();
            }, 100);
            return;
        } else if (isBoardFull()) {
            setTimeout(() => {
                alert('It\'s a draw!');
                resetGame();
            }, 100);
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer) {
            return true;
        }
        if (board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer) {
            return true;
        }
    }

    if (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) {
        return true;
    }

    if (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer) {
        return true;
    }

    return false;
}

function isBoardFull() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                return false;
            }
        }
    }
    return true;
}

function resetGame() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = '';
    });

    currentPlayer = 'X';
}
