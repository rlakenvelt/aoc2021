import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import Vector from './vector';

class Probe {
    location: Vector;
    velocity: Vector;
    drag: Vector = new Vector(-1, 0);
    gravity: Vector = new Vector(0,-1);
    constructor(x: number, y: number, velocity: Vector) {
        this.location = new Vector(x,y);
        this.velocity = velocity;
    }
    move() {
        this.location.add(this.velocity);
        if (this.velocity.x!==0)
            this.velocity.add(this.drag);
        this.velocity.add(this.gravity);
    }
    applyDrag(drag: Vector) {
        this.drag = drag;
    }
    applyGravity(gravity: Vector) {
        this.gravity = gravity;
    }
}
const puzzle = 'Day 17A: Trick Shot'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues = input.getInput()[0].split(' ');
const xRange = inputValues[2].substring(2).split('..').map(x=>parseInt(x));
const yRange = inputValues[3].substring(2).split('..').map(x=>parseInt(x));

logger.start();
let answer = 0;

const xList: any[] = [];
const gravity = new Vector(0,-1);
const drag = new Vector(-1,0);

for (let xTry=1; xTry<=xRange[1]; xTry++) {
    let total = 0;
    for (let x=xTry; x>0&&total<=xRange[1]; x--) {
        total+=x;
        if (total>=xRange[0]&&total<=xRange[1]) {
            xList.push(xTry);
            break;
        }
    }
}
let maxY = Math.abs(yRange[0]);
const foundAccellerations: any[] = [];

xList.forEach(xTry=> {

    for (let yTry=yRange[0]; yTry<maxY; yTry++) {  
        let highest = -Infinity;
        const probe = new Probe(0, 0, new Vector(xTry,yTry));
        probe.applyDrag(drag);
        probe.applyGravity(gravity);
        let inTargetArea = false;
        do {
            probe.move();
            highest = Math.max(highest, probe.location.y);
            if (probe.location.y>=yRange[0] && probe.location.y<=yRange[1] && probe.location.x>=xRange[0] && probe.location.x<=xRange[1]) {
                inTargetArea=true;
                break;
            }
        } while (probe.location.y >= yRange[0]);
        if (inTargetArea) {
            foundAccellerations.push({x: xTry, y:yTry, highest})
        }
    }
})

answer = foundAccellerations.sort((a,b)=> b.highest - a.highest)[0].highest;

logger.end(answer);

