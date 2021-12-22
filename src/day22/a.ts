import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 22A: Reactor Reboot'
const input = new InputHelper();
const logger = new Logger(puzzle);

type Range = {from: number, to:number}

type Cuboid = {
    on: number;
    range: {
        x: Range,
        y: Range,
        z: Range
    }
}

let cuboids: Cuboid[] = [];
logger.start();

const inputValues = input.getInput();
inputValues.forEach(line=> {
    const parts=line.split(' ');
    const ranges: any = {};
    parts[1].split(',').forEach(range=>{
        const axis = range.substring(0,1);
        const values = range.substring(2).split('..').map(x=>parseInt(x));
        ranges[axis]={from:values[0],to:values[1]};
    })
    const cuboid: Cuboid = {on: (parts[0]==='on'?1:0), range: ranges};

    cuboids.push(cuboid)
})

cuboids=cuboids.filter(filterSteps)

const cubes: any = {}

let answer = 0;

cuboids.forEach(step=> {
    for (let z=step.range.z.from; z<=step.range.z.to; z++) {
        for (let y=step.range.y.from; y<=step.range.y.to; y++) {
            for (let x=step.range.x.from; x<=step.range.x.to; x++) {
                cubes[hash(x,y,z)]=step.on;
            }
        }
    }
})
Object.keys(cubes).forEach(c=>{
    answer+=cubes[c];
})

logger.end(answer);

function hash(x: number, y: number, z: number): string {
    return [x, y, z].join('_');
}

function filterSteps(step: Cuboid) {
    if (step.range.x.from>50) return false;
    if (step.range.x.to<=-50) return false;
    if (step.range.y.from>50) return false;
    if (step.range.y.to<=-50) return false;
    if (step.range.z.from>50) return false;
    if (step.range.z.to<=-50) return false;
    return true;
}


