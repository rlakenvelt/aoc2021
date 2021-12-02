import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day %puzzle%'
const testmode = false;
const input = new InputHelper(testmode);
const logger = new Logger(puzzle, testmode);

const values = input.getNumericInput();

logger.start();
let answer = 0;



logger.end(answer);

