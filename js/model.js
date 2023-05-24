// a class that provides all the functionality
// of a game of connect 4
class Connect4Model{

    // create an instance of connect4
    constructor(rows, columns){
        this.name = "connect 4";
        this.players = ["r","b"];
        this.board = this.createBoard(rows, columns);
        this.boardCounts = Array(columns).fill(0);
        this.currentPlayer = 0;
    }

    // Initialize the board
    createBoard = (rows, columns) =>{
        let board = [];
        for (let i = 0; i < columns; i++) {
        board[i] = [];
        for (let j = 0; j < rows; j++) {
            board[i][j] = null; 
            }
        }
        return board;
    }

    // Returns a string version of the board for debugging
    printBoard() {
        let columns = this.board.length;
        let rows = this.board[0].length;
        let rowString=''
        let boardString=''
        for (let i=0;i<rows;i++){
            for (let j=0;j<columns;j++){
            if(!this.board[i][j]) rowString+='|o|';
            else rowString +=`|${this.board[i][j]}|`
            }
        boardString+=`${rowString}\n`;
        rowString=''
        }
        return boardString;
    }

    // return whether a position in the board is occupied
    isOccupied(col, row) {
        if (this.board[col][row])return true;
        return false;
    }

    // play a piece given a column 
    // should check if move is valid before calling move
    // returns final position of piece
    move(column) {
        console.log('moving')
        this.board[this.boardCounts[column]][column] = this.players[this.currentPlayer];
        this.boardCounts[column]++;
        return [column, boardCounts[column-1]];
    }

    // return whether a column is full
    isFull(column) {
        if (this.boardCounts[column]===rows) return true;
        return false;
    }

    // change the current player's turn
    switchTurn() {
        this.currentPlayer++;
        this.currentPlayer%=2;
    }

    checkWin(column, row, count){    
    };
}

const main = () => {
    let c4game = new Connect4Model(6, 10);
    console.log(c4game.printBoard());
    c4game.move(5);
    c4game.switchTurn();
    c4game.move(6);
    console.log(c4game.printBoard());
}

main();