$(document).ready(function(){
    c4 = new window.Connect4Model(6, 10);

    // construct the board
    for(let i=0;i<10;i++){
        let column = $(`<div id="col-${i}"></div>`);
        column.addClass('column');
        for(let j=6;j>=0;j--){
            if(j===6){
                let space = $(`<div id="c-${i}r-${j}"></div>`);
                space.addClass('hover-space');
                column.append(space);
            } else {
            let space = $(`<div id="c-${i}r-${j}"></div>`);
            space.addClass('space');
            column.append(space);
            }
        }
        // add a click listener to each row that
        // makes a move on the board and renders the move
        column.click(()=>{
            let move=c4.move(`${i}`);
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
            let winner=c4.checkWin(move);
            if(winner) $('#header').append(`<p>${winner} wins!</p>`);
            })
        $("#game-container").append(column);

    }

})