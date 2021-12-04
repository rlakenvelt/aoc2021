import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 03A: Binary Diagnostic'
const input = new InputHelper();
const logger = new Logger(puzzle);

const report: string[][] = input.getInput().map(x=> x.split(''));

logger.start();
let gamma = 0;
let epsilon = 0;

const gammabits = [];
const epsilonbits = [];
for (let column = 0; column < report[0].length; column++) {
    let zeroes = 0;
    let ones = 0;
    for (let counter = 0; counter < report.length; counter++) {
        const bit: string = report[counter][column];
       if ( bit === '0')
            zeroes++
        else
            ones ++;
    };
    if (ones>zeroes) {
        gammabits.push(1);
        epsilonbits.push(0);
    }
    else {
        gammabits.push(0);
        epsilonbits.push(1);
    }

}
gamma = parseInt(gammabits.join(''), 2);
epsilon = parseInt(epsilonbits.join(''), 2);

let answer = gamma * epsilon;

logger.end(answer);

