
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
            board[i][j] = null; // You can change the initial value as needed
            }
        }
        return board;
    }

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
    isOccupied(board, col, row) {
        if (board[col][row])return true;
        return false;
    }

    // play a piece given a column 
    // should check if move is valid before calling move
    move(column) {
        console.log('moving')
        this.board[this.boardCounts[column]][column] = this.players[this.currentPlayer];
    }

    // return whether a column is full
    isFull(column) {
        if (board[column].every(e=>e!==null)) return true;
        return false;
    }

    switchTurn() {
        this.currentPlayer++;
        this.currentPlayer%=2;
    }
}

const main = () => {
    let c4game = new Connect4Model(6, 10);
    console.log(c4game.printBoard());
    c4game.move(5);
    console.log(c4game.printBoard());
}

main();