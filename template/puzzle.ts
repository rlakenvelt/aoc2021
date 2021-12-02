import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day %puzzle%'
const input = new InputHelper();
const logger = new Logger(puzzle);

const values = input.getNumericInput();

logger.start();
let answer = 0;



logger.end(answer);

