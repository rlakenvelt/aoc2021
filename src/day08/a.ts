import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 08A: Seven Segment Search'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues:string[] = input.getInput();
const inputParts = inputValues.map(x=> x.split(' | '));
const patterns = inputParts.map(x=>x[0].split(' '));
const outputValues = inputParts.map(x=>x[1].split(' '));

logger.start();
let answer = outputValues.reduce((total, p) => {
    p.forEach(digit=> {
        if (digit.length === 2 || digit.length === 3 || digit.length === 4 || digit.length === 7 )
            total++;
    })
    return total;
},0);



logger.end(answer);

