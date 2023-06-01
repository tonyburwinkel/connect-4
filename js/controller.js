$(document).ready(function(){
    console.log('howdy pard');

    for(let i=0;i<10;i++){
        let column = $(`<div id="col-${i}"></div>`);
        column.addClass('column');
        for(let j=0;j<6;j++){
            let space = $(`<div id="space-${j}"></div>`);
            space.addClass('space');
            column.append(space);
        }
        column.click((e)=>{
            console.log(`${i}`);
            })
        $("#game-container").append(column);

    }

})