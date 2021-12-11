import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import { Direction } from '../utils/grid';

const puzzle = 'Day 09A: Smoke Basin'
const input = new InputHelper();
const logger = new Logger(puzzle);

logger.start();

const directions = Direction.directionsWithoutDiagonals();

const points = input.getInput()
                    .map(x=>x.split('').map(c=>parseInt(c)));
const width=points[0].length;
const height=points.length;

let answer = 0;
for (let x = 0; x<width; x++) {
    for (let y = 0; y<height; y++) {
        let isLow = true;
        directions.forEach((d: any)=> {
            if (x+d.x<0) return;
            if (x+d.x>width-1) return;
            if (y+d.y<0) return;
            if (y+d.y>height-1) return;
            if (points[y+d.y][x+d.x] <= points[y][x]) isLow=false;
        })
        if (isLow) {
            answer+=1+points[y][x];
        }
    }
}

logger.end(answer);
