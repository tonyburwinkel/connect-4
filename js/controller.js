$(document).ready(function(){
    c4 = new window.Connect4Model(6, 10);

    // construct the board
    for(let i=0;i<10;i++){
        let column = $(`<div id="col-${i}"></div>`);
        column.addClass('column');
        for(let j=5;j>=0;j--){
            let space = $(`<div class id="c-${i}r-${j}"></div>`);
            space.addClass('space');
            column.append(space);
        }
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
            if(winner) console.log(winner);
            })
        $("#game-container").append(column);

    }

})