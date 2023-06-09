//import { Connect4Model } from './model.js';
const Connect4Model = require('./model.js');

let c4;

beforeEach(()=>{
    c4 = new Connect4Model(6,10);
})

test('create board test', ()=>{
    expect(c4.board.length).toBe(10);
    expect(c4.board[0].length).toBe(6);
})

test('test making a move', ()=>{
    let move = c4.move(0);
    expect(move).toStrictEqual([0,0]);
})

test('test isValidMove', ()=>{
    expect(c4.isValidMove(6)).toBe(true);
    expect(c4.isValidMove(2)).toBe(true);
    expect(c4.isValidMove(-1)).toBe(false);
    expect(c4.isValidMove(10)).toBe(false);
})

test('test is full and move', ()=>{
    for(let i=0;i<6;i++) c4.move(0);
    expect(c4.isFull(0)).toBe(true);
})

test('test switch player', ()=>{
    expect(c4.players[c4.currentPlayer]).toBe('r');
    c4.switchTurn();
    expect(c4.players[c4.currentPlayer]).toBe('b');
})

test('test seekEnd', ()=>{
    let move;
    for (let i=0;i<4;i++) move=c4.move(0);
    expect(c4.seekEnd(move, [0,1])).toStrictEqual([0,3]);
})

test('test seekWin', ()=>{
    let move;
    for (let i=0;i<4;i++) move=c4.move(0);
    expect(c4.seekWin(move, [0,-1],1)).toBe(true);
})

test('test checkWin', ()=>{
    let move;
    for (let i=0;i<4;i++) move=c4.move(0);
    expect(c4.checkWin(move)).toBe('r');
})