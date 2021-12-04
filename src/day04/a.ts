import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 04A: Giant Squid'
const testmode = false;
const input = new InputHelper(testmode);
const logger = new Logger(puzzle, testmode);

const puzzleinputparts: string[] = input.getInput('\n\n');
const boards: any = [];
const numbers = puzzleinputparts[0].split(',').map(x=>parseInt(x));
for (let i = 1; i < puzzleinputparts.length; i++) {
    const board = puzzleinputparts[i].split('\n')
                                     .map(x=>x.split(' ')
                                     .filter(x=>x!=='')
                                     .map(x=> {
                                         return {number: parseInt(x), drawn: false};
                                     }));
    boards.push(board);
}


logger.start();
let answer = 0;

for (let d = 0; d<numbers.length; d++) {
    draw(numbers[d]);
    for (let b = 0; b< boards.length; b++) {
        const value = boardValue(boards[b]);
        if (value > 0) {
            answer = value;
            break;
        }
    }
    if (answer>0) {
        answer*=numbers[d];
        break;
    };
}


logger.end(answer);

function showBoard(board: any) {
    for (let i = 0; i < board.length; i++) {
        const line = board[i]
        console.log(line);
    }
}

function draw(value: number) {
    for (let b = 0; b < boards.length; b++) {
        const board = boards[b];
        for (let y=0; y<board.length; y++) {
            for (let x=0; x<board[y].length; x++) {
                if (board[y][x].number === value) board[y][x].drawn=true;
            }
        }
    }
}

function boardValue(board: any) {
    let wins = false;
    for (let y=0; y<board.length; y++) {
        let ok = true;
        for (let x=0; x<board[y].length; x++) {
            if (board[y][x].drawn === false) ok = false;
        }
        if (ok) wins = true;
    }
    if (!wins) {
        for (let x=0; x<board[0].length; x++) {
            let ok = true;
            for (let y=0; y<board.length; y++) {
                if (board[y][x].drawn === false) ok = false;
            }
            if (ok) wins = true;
        }
    }
    if (!wins) return 0;
    let value = 0;
    for (let y=0; y<board.length; y++) {
        for (let x=0; x<board[y].length; x++) {
            if (board[y][x].drawn === false) value+=board[y][x].number;
        }
    }
    return value;    
}

