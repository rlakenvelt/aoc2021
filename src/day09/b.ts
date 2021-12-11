import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import { Direction } from '../utils/grid';

const puzzle = 'Day 09B: Smoke Basin'
const input = new InputHelper();
const logger = new Logger(puzzle);

logger.start();

const directions = Direction.directionsWithoutDiagonals();

const points: number[][] = input.getInput()
                                .map(x=>x.split('')
                                .map(c=> {
                                    return (c==='9'?9:0);
                                }))
const width=points[0].length;
const height=points.length;

let basins: number[] = [];

while (getNextBasin()) {}

let answer = basins.sort((a, b)=>b-a)
                   .slice(0,3)
                   .reduce((total, b)=> {return total*=b}, 1);

logger.end(answer);


function getNextBasin() {
    const base: any = getFirstPointOfNewBasin();
    if (!base) return false;
    
    const size = scanPointNeigbours(base.x, base.y);
    basins.push(size);
    return true;
}

function scanPointNeigbours(x: number, y: number) {
    let size = 1;
    points[y][x] = 1;
    directions.forEach((d: any)=> {
        if (x+d.x<0) return;
        if (x+d.x>width-1) return;
        if (y+d.y<0) return;
        if (y+d.y>height-1) return;
        if (points[y+d.y][x+d.x]===0) {
            size+=scanPointNeigbours(x+d.x, y+d.y);
        }
    })

    return size;

}

function getFirstPointOfNewBasin() {
    for (let x = 0; x<width; x++) {
        for (let y = 0; y<height; y++) {
            if (points[y][x] === 0) return {x: x, y: y};
        }
    }    
}

