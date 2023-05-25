// a class that provides all the functionality
// of a game of connect 4
class Connect4Model{

    // create an instance of connect4
    constructor(rows, columns){
        this.rows = rows;
        this.columns = columns;
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

    isValidMove(row, col){
        if (col<this.columns && col>=0){
            if (row<this.rows && row>=0){
                return true;
            }
        }
        return false;
    }

    // play a piece given a column 
    // should check if move is valid before calling move
    // returns final position of piece
    move(column) {
        console.log('moving')
        this.board[this.boardCounts[column]][column] = this.players[this.currentPlayer];
        this.boardCounts[column]++;
        return [column, this.boardCounts[column-1]];
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

    /* takes a board position and follows it to its
     last adjacent matching board position given direction
     params: 
        origin: [x,y] 
        direction: [xdiff, ydiff]
    */
    seekEnd(origin, direction){
        // calculate the next position on the board to check based on the origin and direction
        let next = [origin[0]+direction[0], origin[1]+direction[1]];
        console.log(`checking next ${next} against origin ${origin}`);
        // make sure the move is valid before trying to access the board at the indices of next
        if (!(this.isValidMove(next[0],next[1]))) {
            return origin;
        }
        // if the next position on the board is the same value as the origin, recurse
        if (this.board[next[0]][next[1]]===this.board[origin[0]][origin[1]]) {
            console.log('recursing');
            return this.seekEnd(next, direction);
        }
        // otherwise, we know the caller is the last link in the chain
        console.log('end of the line');
        return origin;
    }

    // once an end is found, seekwin is called from the end
    // with the opposite direction to see if there are 4 in a row
    seekWin(origin, direction, count){
        console.log(count);
        if (count===4) return true;
        let next = [origin[0]+direction[0], origin[1]+direction[1]];
        if (!(this.isValidMove(next[0],next[1]))) return false;
        if (this.board[next[0]][next[1]]===this.board[origin[0]][origin[1]]) {
            return this.seekWin(next, direction, count + 1);
        }
        return false;
    }

    getNeighbors(column, row){
        neighbors = [];
    }
}

const main = () => {
    let c4game = new Connect4Model(6, 10);
    console.log(c4game.printBoard());
    c4game.move(5);
    c4game.move(6);
    c4game.move(7);
    console.log(c4game.printBoard());
    console.log('testing seekEnd, expect [0,7]');
    let end = c4game.seekEnd([0, 5],[0, 1]);
    console.log(end);
    console.log(c4game.seekWin(end, [0,-1], 0));
}

main();