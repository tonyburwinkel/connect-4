const Connect4Model = require('./model.js');

const main = () => {
    c4 = new Connect4Model(6,10);
    c4.move(5);
    c4.move(6);
    c4.move(6);
    c4.move(6);
    let move=c4.move(6);
    console.log(c4.printBoard())
    let end = c4.seekEnd(move, [0,1]);
    console.log(c4.seekWin(end, [0,-1], 1));
}

main();