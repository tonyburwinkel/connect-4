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
        column.click((e)=>{
            let move=c4.move(`${i}`);
            $(`#c-${move[0]}r-${move[1]}`).css('background-color', 'red')
            console.log(c4.printBoard());
            })
        $("#game-container").append(column);

    }

})