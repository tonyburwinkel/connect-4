const rows = 6;
const columns = 10;

// Initialize the array
const createBoard = () =>{
    let board = [];
    for (let i = 0; i < columns; i++) {
    board[i] = [];
    for (let j = 0; j < rows; j++) {
        board[i][j] = null; // You can change the initial value as needed
        }
    }
    return board;
}

const printRow = () => {
}

const printBoard = () => {
    rowString=''
    boardString=''
    for (i=0;i<rows;i++){
        for (j=0;j<columns;j++){
        console.log(`row${i} col${j} = board[i][j]`)
        rowString+='o';
        }
    boardString+=`${rowString}\n`;
    rowString=''
    }
    return boardString;
}

// return whether a position in the board is occupied
const isOccupied = () => {

}

// play a piece given a column and a player
const move = (player, column) => {
    if (isFull(column)) return;
}

// return whether a column is full
const isFull = (column) => {
    if (board[column].every(e=>e!==null)) return true;
    return false;
}

let board = createBoard();

console.log(printBoard());