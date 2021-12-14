import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 14B: Extended Polymerization'
const input = new InputHelper();
const logger = new Logger(puzzle);

class Rule {
    pair:string='';
    insert:string='';
}
class Pair {
    code:string='';
    count:number=0;
}
logger.start();

const inputValues = input.getInput('\n\n');
const template: string[] = inputValues[0].split('');
const rules: Rule[] = inputValues[1].split('\n').map(s=>{ 
    const parts = s.split(' -> ');
    return {pair: parts[0], insert: parts[1]}
});
let pairs: Pair[] = [];
const counts: any = {};

for (let i=0; i<template.length-1; i++) {
    const pair = getPair(template[i]+template[i+1]);
    pair.count++;
}
template.forEach(c=> {
    if (!counts[c]) counts[c]=0;
    counts[c]++;
})

let answer = 0;
const steps = 40;
for (let step=0; step<steps; step++) {
    const newPairs: Pair[] = [];
    pairs.forEach(p=> {
        const rule = rules.find(r=>r.pair===p.code);
        if (rule) {
            const parts=p.code.split('');
            let pair = newPairs.find(p=>p.code===parts[0]+rule.insert);
            if (!pair) {
                pair={code: parts[0]+rule.insert, count: 0};
                newPairs.push(pair);
            }  
            pair.count+=p.count;    
            pair = newPairs.find(p=>p.code===rule.insert+parts[1]);
            if (!pair) {
                pair={code: rule.insert+parts[1], count: 0};
                newPairs.push(pair);
            }                        
            pair.count+=p.count;    
            if (!counts[rule.insert]) counts[rule.insert]=0;
            counts[rule.insert]+=p.count;            
        }
    })
    pairs=[];
    pairs=newPairs;
}
const temp:number[] = Object.keys(counts).map(c=>counts[c]).sort((a,b)=>a-b);
answer=temp[temp.length-1]-temp[0];


logger.end(answer);

function getPair (code: string):Pair {
    let pair = pairs.find(p=>p.code===code);
    if (!pair) {
        pair={code: code, count: 0};
        pairs.push(pair);
    }
    return pair;
}