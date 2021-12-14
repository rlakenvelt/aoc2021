import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 14A: Extended Polymerization'
const input = new InputHelper();
const logger = new Logger(puzzle);

class Rule {
    pair:string='';
    insert:string='';
}
logger.start();

const inputValues = input.getInput('\n\n');
const template: string[] = inputValues[0].split('');
const rules: Rule[] = inputValues[1].split('\n').map(s=>{ 
    const parts = s.split(' -> ');
    return {pair: parts[0], insert: parts[1]}
});
console.log(template);
console.log(rules);

let answer = 0;
const steps = 10;
for (let step=0; step<steps; step++) {
    for (let i=template.length-2; i>=0; i--) {
        const search = template[i]+template[i+1];
        const rule = rules.find(r=>r.pair===search);
        // console.log(i, search, rule);
        if (rule) {
            template.splice(i+1,0,rule.insert); 
        }
    }
    // console.log(template.join(''));
}
const counts: any = {};
template.forEach(c=> {
    if (!counts[c]) counts[c]=0;
    counts[c]++;
})

const temp:number[] = Object.keys(counts).map(c=>counts[c]).sort((a,b)=>a-b);
console.log(temp);
answer=temp[temp.length-1]-temp[0];


logger.end(answer);

