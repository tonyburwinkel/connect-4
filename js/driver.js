const Connect4Model = require('./model.js');

const main = () => {
    c4 = new Connect4Model(6,10);
    c4.move(5);
    c4.move(6);
    c4.move(6);
    c4.move(6);
    console.log(c4.printBoard())
}

main();