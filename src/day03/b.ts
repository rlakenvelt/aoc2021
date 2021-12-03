import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 03B'
const testmode = false;
const input = new InputHelper(testmode);
const logger = new Logger(puzzle, testmode);

const report: string[][] = input.getInput().map(x=> x.split(''));

logger.start();

const oxygen = ratingValue('1');
const co2 = ratingValue('0');
let answer = oxygen * co2;

logger.end(answer);

function ratingValue(criterium: string) {
    let workreport = report.map(x=>x);
    for (let i=0; i<workreport[0].length; i++) {
        workreport = filterValues(workreport, i, criterium);
        if (workreport.length<=1) break;
    }
    return parseInt(workreport[0].join(''), 2);
}

function filterValues(inputreport: string[][], pos: number, criterium: string) {
    let countZeroes = 0;
    let countOnes = 0;
    let filter = (criterium === '1' ? '0' : '1');
    for (let counter = 0; counter < inputreport.length; counter++) {
        if ( inputreport[counter][pos] === '0')
        countZeroes++
        else
        countOnes ++;
    };
    if (countOnes>=countZeroes) {
        filter = criterium;
    }
    return inputreport.filter(row => row[pos]===filter);
}
