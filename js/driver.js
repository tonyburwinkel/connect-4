const Connect4Model = require('./model.js');
const readline = require('readline');
const prompt = require('prompt-sync')();

const main = () => {

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    c4 = new Connect4Model(6,10);

    let isGameOver = false;

    while(!isGameOver){
        console.log(c4.printBoard());

        let move;
        let valid = false;
        while(!valid){
            choice = parseInt(prompt('choose a column: '));
            if(c4.isValidMove(choice)) valid = true;
            move=choice;
        }

        console.log(move);
        move=c4.move(move);
        c4.switchTurn();

        isGameOver=c4.checkWin(move);
    
    rl.close();
    console.log(c4.printBoard());
    console.log(`winner is ${isGameOver}`)

    }

}

main();