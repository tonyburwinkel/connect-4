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
        let rowStrings = [];
        let columns = this.board.length;
        let rows = this.board[0].length;
        let rowString=''
        let boardString=''
        for (let i=0;i<rows;i++){
            for (let j=0;j<columns;j++){
            if(this.board[j][i]===null) rowString+='|o|';
            else rowString +=`|${this.board[j][i]}|`
            }
        rowStrings.push(`${rowString}\n`);
        rowString=''
        }
        return rowStrings.reverse().join('');
    }

    // return whether a position in the board is occupied
    isOccupied(row, col) {
        if (this.board[row][col])return true;
        return false;
    }

    isValidMove(col){
        if (col<=this.columns && col>=0){
            if (this.boardCounts[col]<this.rows){
                return true;
            }
        }
        return false;
    }

    // play a piece given a column 
    // should check if move is valid before calling move
    // returns final position of piece
    move(column) {
        this.board[column][this.boardCounts[column]] = this.players[this.currentPlayer];
        this.boardCounts[column]++;
        return [Number(column), (this.boardCounts[column])-1];
    }

    // return whether a column is full
    isFull(column) {
        if (this.boardCounts[column]===this.rows) return true;
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
        // make sure the move is valid before trying to access the board at the indices of next
        if (!(this.isValidMove(next[0],next[1]))) {
            return origin;
        }
        // if the next position on the board is the same value as the origin, recurse
        if (this.board[next[0]][next[1]]===this.board[origin[0]][origin[1]]) {
            return this.seekEnd(next, direction);
        }
        // otherwise, we know the caller is the last link in the chain
        return origin;
    }

    // once an end is found, seekwin is called from the end
    // with the opposite direction to see if there are 4 in a row
    // count acts as an accumulator
    seekWin(origin, direction, count){
        if (count===4) return true;
        let next = [origin[0]+direction[0], origin[1]+direction[1]];
        if (!(this.isValidMove(next[0],next[1]))) return false;
        if (this.board[next[0]][next[1]]===this.board[origin[0]][origin[1]]) {
            return this.seekWin(next, direction, count + 1);
        }
        return false;
    }

    // takes the last move made and checks to see if it is a winner
    // returns a player if the move won
    // otherwise returns null
    checkWin(move){
        // call seekEnd on each neighbor with appropriate direction
        for(let i=-1;i<2;i++){
            for (let j=-1;j<2;j++){
                if (i===0 && j===0) continue;
                let end=this.seekEnd(move, [i,j])
                let win=this.seekWin(end,[i*-1,j*-1],1)
                if (win) return this.board[move[0]][move[1]];
                }
            }
            return null;
        }
}

//export default Connect4Model;
//module.exports = Connect4Model;

window.Connect4Model = Connect4Model;