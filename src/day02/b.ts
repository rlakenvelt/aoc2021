import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 02B: Dive!'
const input = new InputHelper();
const logger = new Logger(puzzle);
const course = input.getInput();

logger.start();

let depth = 0;
let horizontal = 0;
let aim = 0;
for (let counter = 0; counter < course.length; counter++) {
    const step = course[counter].split(' ');
    const value = parseInt(step[1]);
    switch (step[0]) {
        case 'forward':
            horizontal+=value;
            depth+=aim*value;
            break;
        case 'down':
            aim+=value;
            break;
        case 'up':
            aim-=value;
            break;
                
        default:
            break;
    }
}

const answer = horizontal * depth;
logger.end(answer);

