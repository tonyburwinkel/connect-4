//import { Connect4Model } from './model.js';
const Connect4Model = require('./model.js');

let c4;

beforeEach(()=>{
    c4 = new Connect4Model(6,10);
})

// make sure our board has the expected number of rows
test('create board test', ()=>{
    expect(c4.board.length).toBe(10);
})

// make sure our board has the expected number of rows
test('test making a move', ()=>{
    let move = c4.move(0);
    console.log(move)
    expect(move).toStrictEqual([0,0]);
})

// make sure our board has the expected number of rows
test('test isValidMove', ()=>{
    expect(c4.isValidMove(6, 2)).toBe(true);
    expect(c4.isValidMove(2, 9)).toBe(true);
    expect(c4.isValidMove(-1, 2)).toBe(false);
    expect(c4.isValidMove(9, 2)).toBe(false);
})

// make sure our board has the expected number of rows
test('test is full and move', ()=>{
    for(let i=0;i<6;i++) c4.move(0);
    console.log(c4.printBoard());
    expect(c4.isFull(0)).toBe(true);
})

// make sure our board has the expected number of rows
test('create board test', ()=>{
    expect(c4.board.length).toBe(10);
})

// make sure our board has the expected number of rows
test('create board test', ()=>{
    expect(c4.board.length).toBe(10);
})
