/*
VIEW:
    methods:    renderMove(row, column)
                renderBoard(rows, columns)
                showWinner(winner)
                reset()

CONTROLLER:
    go(MODEL, VIEW);
*/


/*
Helper function for makeboard
Params:
    rowNum: which row in the board is being made
    numCols: final number of columns in the board
    numRows: final number of rows in the board
*/
const makeRow = (rowNum, numCols, numRows) => {
    let row = $(`<div id="row-${rowNum}"></div>`);
        rowNum===numRows?
            row.addClass('hover-row') : row.addClass('row');
        for(let j=0;j<numCols;j++){
            let newSpace = makeSpace(rowNum, j);
            row.append(newSpace);
        }
    return row;
}

/*
Helper function for makeRow
Params:
    rowNum: which row in the board this space belongs to
    spaceNum: the column number this space will occupy
*/
const makeSpace = (rowNum, spaceNum) => {
    let space = $(`<div id="c-${spaceNum}r-${rowNum}"></div>`);
    if (rowNum===6){
        space.addClass('hover-space');
        space.click(()=>{makeMove(spaceNum)})
        space.on("mouseenter", ()=>{renderTurn(spaceNum)})
        space.on("mouseleave", ()=>{renderBlank(spaceNum)})
    } else {
        space.addClass('space');
    }
    return space;
}

/*
Click handler for each space in the hover-row
clicking one of these makes a move on the board,
both the model and the view
*/
const makeMove = (rowNum) => {
    let move;
    if (c4.isValidMove(rowNum)){
        move=c4.move(`${rowNum}`);
        let selected=$(`#c-${move[0]}r-${move[1]}`);
        c4.getPlayer()==='r'? 
                selected.css('background-color', 'red'):
                selected.css('background-color', 'black');
        }
        c4.switchTurn();
        renderTurn(move[0])
        let winner = c4.checkWin(move);
        if(winner){
            gameOver(winner);
        }
    } 

const gameOver = (winner) => {
    let color;
    winner === 'r'?
        color='Red':color='Black';
    $('#banner')
        .text(`Winner: ${color}`)
        .css({
            'visibility': 'visible',
            'cursor': 'pointer'
        })
        .click(reset);
    $('#header')
        .css({
            'background-color': color,
            'transition' : 'background-color 1s'
            })
        .on("mouseenter" , () => {
            $('#header').css('background-color','gray');
            })
        .on("mouseleave" , () => {
            $('#header').css('background-color', color);
            })
    $('.hover-space').off('click');
}

const renderTurn = (spaceNum) => {
    $(`#c-${spaceNum}r-6`).css("background-color",`${c4.getPlayer()==='r'?'red':'black'}`)
}

// handler for resetting hover space to bg color
const renderBlank = (spaceNum) => {
    $(`#c-${spaceNum}r-6`).css("background-color","aquamarine");
}

const makeBoard = (c4) => {
    for(let i=c4.rows;i>=0;i--){
        let row = makeRow(i, c4.columns, c4.rows);
        $("#game-container").append(row);
    }
}

const reset = () => {
    $('#banner').css('visibility', 'hidden');
    $('#header').css('background-color', 'aquamarine');
    $('#game-container').empty(); 
    c4 = new window.Connect4Model(6,10);
    makeBoard(c4);
}

$(document).ready(function(){
    c4 = new window.Connect4Model(6, 10);
    makeBoard(c4);

    $('#banner').css('visibility', 'hidden');

    $('#reset').click(reset);

})