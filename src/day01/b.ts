import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 01B: Sonar Sweep'
const testmode = false;
const input = new InputHelper(testmode);
const logger = new Logger(puzzle, testmode);
const measurements = input.getNumericInput();

logger.start();

let answer = 0;
for (let counter = 3; counter < measurements.length; counter++) {
    if (measurements[counter] > measurements[counter-3]) answer++;
}

logger.end(answer);

