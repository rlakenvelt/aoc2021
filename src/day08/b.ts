import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 08B: Seven Segment Search'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues:string[] = input.getInput();
const inputParts = inputValues.map(x=> x.split(' | '));
const patterns = inputParts.map(x=>x[0].split(' ')).map(p=>sortParts(p));
const outputValues = inputParts.map(x=>x[1].split(' ')).map(p=>sortParts(p));

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
    const solution: string[] = new Array(10).fill('');
    // 1 4 7 8
    for (let i=0; i<patterns.length; i++) {
        switch (patterns[i].length) {
            case 2:
                solution[1] = patterns[i];
                break;
            case 3:
                solution[7] = patterns[i]
                break;
            case 4:
                solution[4] = patterns[i];
                break;
            case 7:
                solution[8] = patterns[i]
                break;
        }
    }
    // 3 6
    for (let i=0; i<patterns.length; i++) {
        switch (patterns[i].length) {
            case 5:
                if (matches(patterns[i], solution[1]))
                   solution[3] = patterns[i];
                break;
            case 6:
                if (!matches(patterns[i], solution[1]))
                    solution[6] = patterns[i];
                break;
        }
    }
    // 0 9
    const six = patterns.filter(p=>{return p.length===6&&p!==solution[6]});
    if (diff([six[0], solution[3]]).length===2) {
        solution[0] = six[1];
        solution[9] = six[0];
    } else {
        solution[0] = six[0];
        solution[9] = six[1];
    }
    // 2 5
    const five = patterns.filter(p=>{return p.length===5&&p!==solution[3]});
    if (diff([five[0], solution[9]]).length===3) {
        solution[2] = five[0];
        solution[5] = five[1];
    } else {
        solution[2] = five[1];
        solution[5] = five[0];
    }

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