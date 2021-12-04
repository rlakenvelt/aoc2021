import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 01A: Sonar Sweep'
const input = new InputHelper();
const logger = new Logger(puzzle);
const measurements = input.getNumericInput();

logger.start();

let answer = 0;
for (let counter = 1; counter < measurements.length; counter++) {
    if (measurements[counter] > measurements[counter-1]) answer++;
}

logger.end(answer);

