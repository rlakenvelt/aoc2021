import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import Compiler from './compiler';

const puzzle = 'Day 10B: Syntax Scoring'
const input = new InputHelper();
const logger = new Logger(puzzle);

const brackets: any = [
    {bracket: '(', points: 1},
    {bracket: '[', points: 2},
    {bracket: '{', points: 3},
    {bracket: '<', points: 4}
]

logger.start();

let answer = 0;
let programs:string[][] = input.getInput().map(x=>x.split(''));
let scores: number[] = [];

programs.forEach(program=> {
    let score = 0;
    const compiler = new Compiler(program.join(''));
    compiler.compile();
    if (compiler.errorNumber===2) {
        compiler.errorText.split('').forEach(c=> {
            const bracket: any = brackets.find((b: any)=>b.bracket === c);
            score=score*5+bracket.points;
        });
        scores.push(score);
    }
    
})
scores=scores.sort((a, b)=> a-b);
answer=scores[Math.trunc(scores.length/2)];

logger.end(answer);

