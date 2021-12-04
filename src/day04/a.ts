import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import Board from './board';

const puzzle = 'Day 04A: Giant Squid'
const testmode = false;
const input = new InputHelper(testmode);
const logger = new Logger(puzzle, testmode);

const puzzleinputparts: string[] = input.getInput('\n\n');

logger.start();

const boards: Board[] = [];
const numbers = puzzleinputparts[0].split(',').map(x=>parseInt(x));
for (let i=1; i < puzzleinputparts.length; i++) {
    boards.push(new Board(puzzleinputparts[i]));
}

let answer = 0;

for (let d=0; d<numbers.length && answer===0; d++) {
    for (let b=0; b<boards.length; b++) {
        boards[b].draw(numbers[d]);
        if (boards[b].score>0) {
            answer = boards[b].score*numbers[d];
            break;
        }
    }
}

logger.end(answer);

