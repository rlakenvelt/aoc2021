import { SlowBuffer } from 'buffer';
import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 18A: Snailfish'
const input = new InputHelper();
const logger = new Logger(puzzle);

logger.start();

const inputValues = input.getInput();
let snailfishNumber=inputValues[0];
for (let i = 1; i<inputValues.length; i++) {
    const sum = `[${snailfishNumber},${inputValues[i]}]`;
    snailfishNumber = reduceNumber(sum);

}
let answer = calculateMagnitute(snailfishNumber);

logger.end(answer);

function calculateMagnitute(snailfishNumber: string): number {
    let characters = snailfishNumber.split('');

    do {
        let depth = 0;
        let numberIndex = 0;
        let lastNumber = '';
        let replaced=false;
        for (let i=0; i<snailfishNumber.length; i++) {
            switch (characters[i]) {
                case '[':
                    numberIndex=0;
                    lastNumber='';
                    depth++;
                    break;
                case ']':
                    numberIndex=0;
                    lastNumber='';
                    depth--;
                    break;
                case ',':
                    numberIndex=1;
                    break;
                default:
                    // [[1,2],[[3,4],5]]
                    if (numberIndex===1&&lastNumber!=='') {
                        const newRegular = parseInt(lastNumber) * 3 + parseInt(characters[i]) * 2;

                        characters.splice(i-3, 5, newRegular.toString());
                        replaced=true;
                    }
                    lastNumber=characters[i];
                    break;
            }
            if (replaced) break;
        }

    } while(characters.length>1);  
    return parseInt(characters[0]);
 
}

function reduceNumber (snailfishNumber: string) {
    let actionPosition: number = 0;
    let characters = snailfishNumber.split('');
    do {
        actionPosition=0;
        let depth = 0;
        let numberIndex = 0;
        let lastNumber = '';
        // Check for first explode position
        for (let i=0; i<characters.length&&actionPosition===0; i++) {
            switch (characters[i]) {
                case '[':
                    numberIndex=0;
                    lastNumber='';
                    depth++;
                    break;
                case ']':
                    numberIndex=0;
                    lastNumber='';
                    depth--;
                    break;
                case ',':
                    numberIndex=1;
                    break;
                default:
                    if (depth>4&&numberIndex===1&&lastNumber!=='') {
                        actionPosition=i;
                    }
                    lastNumber=characters[i];
                    break;
            }
        }
        
        if (actionPosition>0) {
            const regex = /[0-9]/g;
            // Explode to the left
            for (let p=actionPosition+1; p<characters.length; p++) {
                if (characters[p].match(regex)) {
                    characters[p] = (parseInt(characters[p]) + parseInt(characters[actionPosition])).toString();
                    break;
                };
            }
            // Explode to the right
            for (let p=actionPosition-3; p>=0; p--) {
                if (characters[p].match(regex)) {
                    characters[p] = (parseInt(characters[p]) + parseInt(characters[actionPosition-2])).toString();
                    break;
                };
            }
            characters.splice(actionPosition-3, 5, '0');
        } else {
            // Check for first split position
            for (let p=0; p<characters.length&&actionPosition===0; p++) {
                if (characters[p].length>1) {
                    const regular = parseInt(characters[p]);
                    actionPosition=p;
                    characters.splice(p, 1, '[', Math.trunc(regular/2).toString(), ',', Math.round(regular/2).toString(), ']')
                }
            }
        }

    } while (actionPosition>0);

    return characters.join('');
}


