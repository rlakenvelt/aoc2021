import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import Compiler from './compiler';

const puzzle = 'Day 10A: Syntax Scoring'
const input = new InputHelper();
const logger = new Logger(puzzle);

const brackets: any = [
    {bracket: ')', points: 3},
    {bracket: ']', points: 57},
    {bracket: '}', points: 1197},
    {bracket: '>', points: 25137}
]

logger.start();

let answer = 0;
let programs:string[][] = input.getInput().map(x=>x.split(''));

programs.forEach(program=> {
    const compiler = new Compiler(program.join(''));
    compiler.compile();
    if (compiler.errorNumber===1) {
        const bracket = brackets.find((b: any)=>b.bracket === compiler.errorText);
        answer+=bracket.points;
    }
})

logger.end(answer);

