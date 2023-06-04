/*
VIEW:
    methods:    renderMove(row, column)
                renderBoard(rows, columns)
                showWinner(winner)
                clearBoard()

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
    if (c4.isValidMove(rowNum)){
        let move=c4.move(`${rowNum}`);
        let selected=$(`#c-${move[0]}r-${move[1]}`);
        switch(c4.getPlayer()) {
            case 'r':
                selected.css('background-color', 'red');
                break;
            case 'b': 
                selected.css('background-color', 'black');
                break;
        }
        console.log(c4.printBoard());
        c4.switchTurn();
        renderTurn(move[0])
        console.log(`checking ${move}`);
        let winner = c4.checkWin(move);
        console.log(`winner is ${winner}`)
        winner? 
            $('#header').append(`<p>${winner} wins!</p>`): 
            console.log('no winner.')
    } 
    else console.log('row full');
}

const renderTurn = (spaceNum) => {
    $(`#c-${spaceNum}r-6`).css("background-color",`${c4.getPlayer()==='r'?'red':'black'}`)
}

const renderBlank = (spaceNum) => {
    $(`#c-${spaceNum}r-6`).css("background-color","white");
}

const makeBoard = (c4) => {
    for(let i=c4.rows;i>=0;i--){
        let row = makeRow(i, c4.columns, c4.rows);
        console.log(row)
        $("#game-container").append(row);
    }
}

$(document).ready(function(){
    c4 = new window.Connect4Model(6, 10);
    console.log('howdy pard')
    makeBoard(c4);



    // construct the board
    // for(let i=6;i>=0;i--){
    //     let row = $(`<div id="row-${i}"></div>`);
    //     i===6?
    //         row.addClass('hover-row'):
    //         row.addClass('row');
    //     for(let j=0;j<10;j++){
    //         let space = $(`<div id="c-${j}r-${i}"></div>`);
    //         i===6?
    //             space.addClass('hover-space'):
    //             space.addClass('space');
    //         space.click(()=>{
    //             console.log(j);
    //             if (c4.isValidMove(j)){
    //                 let move=c4.move(`${j}`);
    //                 let selected=$(`#c-${move[0]}r-${move[1]}`);
    //                 switch(c4.getPlayer()) {
    //                     case 'r':
    //                         selected.css('background-color', 'red');
    //                         break;
    //                     case 'b': 
    //                         selected.css('background-color', 'black');
    //                         break;
    //                 }
    //                 console.log(c4.printBoard());
    //                 c4.switchTurn();
    //                 let winner=c4.checkWin(move);
    //                 if(winner) $('#header').append(`<p>${winner} wins!</p>`);
    //             } else console.log('invalid move');
    //         })
    //         row.append(space);
    //         }
    //     $("#game-container").append(row);
    //     }
})