import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 08B: Seven Segment Search'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues:string[] = input.getInput();
const inputParts = inputValues.map(x=> x.split(' | '));
const patterns = getInputparts(0);
const outputValues = getInputparts(1);

logger.start();
let answer = 0;

patterns.forEach((pattern, index) => {
    const solution = determineDigitsForPattern(pattern);
    const digits:string[] = [];
    outputValues[index].forEach(c => {
        const digit = solution.indexOf(c);
        digits.push(digit.toString());
    })
    answer += parseInt(digits.join(''));

})

logger.end(answer);

function determineDigitsForPattern(patterns: string[]) {
    const solution: any[] = new Array(10).fill('A');
    // 1 4 7 8
    solution[1]=patterns.find(x=>x.length===2);
    solution[4]=patterns.find(x=>x.length===4);
    solution[7]=patterns.find(x=>x.length===3);
    solution[8]=patterns.find(x=>x.length===7);
    // 3 6
    solution[3] = patterns.find(x=>{return x.length===5 && matches(x, solution[1])});
    solution[6] = patterns.find(x=>{return x.length===6 && !matches(x, solution[1])});
    // 0 9
    solution[0]=patterns.find(x=>{return x.length===6&&x!==solution[6]&&diff([x, solution[3]]).length!==2})
    solution[9]=patterns.find(x=>{return x.length===6&&x!==solution[6]&&diff([x, solution[3]]).length===2})
    // 2 5
    solution[2]=patterns.find(x=>{return x.length===5&&x!==solution[3]&&diff([x, solution[9]]).length===3})
    solution[5]=patterns.find(x=>{return x.length===5&&x!==solution[3]&&diff([x, solution[9]]).length!==3})

    return solution;
}

function sortParts(parts: string[]) {
    for (let i=0; i<parts.length; i++) {
        parts[i] = sortString(parts[i]);
    }

    return parts;
}

function sortString(s: string) {
    return s.split('').sort((a, b)=> {return (b < a?1:-1)}).join('');
}

function matches(pattern: string, contains: string) {
    let count = 0;
    contains.split('').forEach((c: string)=> {
        if (pattern.includes(c)) count++;
    })

    return count===contains.length;
}

function diff(patterns: string[]) {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    const diff: string[] = [];
    letters.forEach(letter => {
        let count = 0;
        patterns.forEach(pattern=> {
            if (pattern.includes(letter)) count++;
        })
        if (count!==patterns.length) diff.push(letter);
    })
    return diff;
}

function getInputparts(part: number) {
    return inputParts.map(x=>x[part].split(' ')).map(p=>sortParts(p));
}