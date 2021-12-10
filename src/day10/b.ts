import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 10B: Syntax Scoring'
const input = new InputHelper();
const logger = new Logger(puzzle);

const pairs: any = [
    {open: '(', close: ')', points: 1},
    {open: '[', close: ']', points: 2},
    {open: '{', close: '}', points: 3},
    {open: '<', close: '>', points: 4}
]

logger.start();

let answer = 0;
let lines:string[][] = input.getInput().map(x=>x.split(''));
let allopenstacks: string[][] = [];

lines.forEach(l=> {
    let illegal = false;
    let openstack: string[] = [l[0]];
    for (let i = 1; i< l.length; i++) {
        const pair = pairs.find((p: any)=>p.close===l[i]);
        if (pair) {
            if (openstack[0] !== pair.open) {
              illegal = true;
              break;
            }
            openstack.shift();
        } else {
            openstack.unshift(l[i]);
        }
    }
    if (!illegal) {
        allopenstacks.push(openstack);
    }
    
})
let scores: number[] = [];
allopenstacks.forEach(line=> {
    let linetotal = line.reduce((total, c) => {
        const char:any = pairs.find((x: any)=> x.open===c);
        return total*5+char.points;
    }, 0);
    scores.push(linetotal);
})
scores=scores.sort((a, b)=> a-b);
answer=scores[Math.trunc(scores.length/2)];

logger.end(answer);

