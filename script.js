function GameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const markBoard = (row, column, mark) => {
        if (board[row][column].getValue() !== '-') {
            console.log('Invalid move'); 
            return;
        }

        board[row][column].markCell(mark); 
    };

    const printBoard = () => {
        for (let i = 0; i < rows; i++) {
            let line = '';
            for (let j = 0; j < columns; j++) {
                line += board[i][j].getValue() + ' ';
            }
            console.log(line);
        }
    };

    const rowCheck = (mark) => {
        for (let i = 0; i < rows; i++) {
            let row = 0;
            for (let j = 0; j < columns; j++) {
                row = board[i][j].getValue() === mark ? row + 1 : row; 
            }
            if (row === 3) {
                return true; 
            }
        }

        return false; 
    }

    const colCheck = (mark) => {
        for (let j = 0; j < columns; j++) {
            let col = 0;
            for (let i = 0; i < rows; i++) {
                col = board[i][j].getValue() === mark ? col + 1 : col; 
            }
            if (col === 3) {
                return true; 
            }
        }

        return false; 
    }
    
    const diagCheck = (mark) => {
        let diag = 0; 
        for (let i = 0; i < rows; i++) {
            diag = board[i][i].getValue() === mark ? diag + 1 : diag; 
        }
        if (diag === 3) {
            return true;
        }

        diag = 0;
        for (let j = 0; j < columns; j++) {
            diag = board[2 - j][j].getValue() === mark ? diag + 1 : diag; 
        }
        if (diag === 3) {
            return true;
        }

        return false; 
    }

    const winCheck = (mark) => {
        if (!rowCheck(mark) && !colCheck(mark) && !diagCheck(mark)) {
            return false;
        }

        return true;
    }

    const drawCheck = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                if (board[i][j].getValue() === '-') {
                    return false; 
                }
            }
        }

        return true; 
    }


    return { getBoard, markBoard, printBoard, winCheck, drawCheck };
}

function Cell() {
    let value = '-';

    const markCell = (playerMark) => {
        value = playerMark;
    }

    const getValue = () => value;

    return { markCell, getValue };
}

function GameController (
    playerOne = "Player One",
    playerTwo = "Player Two"
) {
    const board = GameBoard();

    const players = [
        {
            name: playerOne,
            mark: "X"
        },
        {
            name: playerTwo,
            mark: "O"
        }
    ];

    let activePlayer = players[0]; 

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]; 
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard(); 
        console.log(`${getActivePlayer().name}'s turn.`);
    }

    const playRound = (row, column) => {
        console.log(`${getActivePlayer().name} plays ${getActivePlayer().mark} on row ${row}, column ${column}`);
        board.markBoard(row, column, getActivePlayer().mark);

        if (winGameCheck()) {
            console.log(`${getActivePlayer().name} wins!`);
            return;
        }

        if (board.drawCheck()) {
            console.log('Draw!');
            return;
        }

        switchPlayerTurn();
        printNewRound(); 
    }

    const winGameCheck = () => {
        return board.winCheck(getActivePlayer().mark); 
    }

    printNewRound();

    return {
        playRound,
        getActivePlayer
    }
}

const game = GameController();