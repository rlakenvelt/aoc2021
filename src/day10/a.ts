import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 10A: Syntax Scoring'
const input = new InputHelper();
const logger = new Logger(puzzle);

const pairs: any = [
    {open: '(', close: ')', count: 0, points: 3},
    {open: '[', close: ']', count: 0, points: 57},
    {open: '{', close: '}', count: 0, points: 1197},
    {open: '<', close: '>', count: 0, points: 25137}
]

logger.start();

let answer = 0;
const lines:string[][] = input.getInput().map(x=>x.split(''));

lines.forEach(l=> {
    let openstack: string[] = [l[0]];
    for (let i = 1; i< l.length; i++) {
        const pair = pairs.find((p: any)=>p.close===l[i]);
        if (pair) {
            if (openstack[0] !== pair.open) {
                pair.count++;
              break;
            }
            openstack.shift();
        } else {
            openstack.unshift(l[i]);
        }
    }
})
answer = pairs.reduce((total: number, p: any) => {
    return total+=p.points * p.count;
}, 0)

logger.end(answer);

