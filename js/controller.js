$(document).ready(function(){
    c4 = new window.Connect4Model(6, 10);

    // construct the board
    for(let i=6;i>=0;i--){
        let row = $(`<div id="row-${i}"></div>`);
        i===6?
            row.addClass('hover-row'):
            row.addClass('row');
        for(let j=0;j<10;j++){
            let space = $(`<div id="c-${j}r-${i}"></div>`);
            i===6?
                space.addClass('hover-space'):
                space.addClass('space');
            space.click(()=>{
                if (c4.isValidMove(j)){
                    let move=c4.move(`${j}`);
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
                } else console.log('invalid move');
            })
            row.append(space);
            }
        $("#game-container").append(row);
        }
})