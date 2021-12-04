import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import Board from './board';

const puzzle = 'Day 04B: Giant Squid'
const input = new InputHelper();
const logger = new Logger(puzzle);

const puzzleinputparts: string[] = input.getInput('\n\n');

logger.start();

let boards: Board[] = [];
const numbers = puzzleinputparts[0].split(',').map(x=>parseInt(x));
for (let i = 1; i < puzzleinputparts.length; i++) {
    boards.push(new Board(puzzleinputparts[i]));
}


let answer = 0;
for (let d=0; d<numbers.length; d++) {
    for (let b=0; b<boards.length; b++) {
        boards[b].draw(numbers[d]);
    }
    if (boards.length===1 && boards[0].score>0) {
        answer=boards[0].score*numbers[d];
        break;
    };
    boards = boards.filter((b: Board)=>b.score===0);
}

logger.end(answer);



