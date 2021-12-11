import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import { Direction, Grid } from '../utils/grid';

const puzzle = 'Day 11B: Dumbo Octopus'
const input = new InputHelper();
const logger = new Logger(puzzle);

const directions = Direction.directionsWithDiagonals();

const inputValues: number[][] = input.getInput().map(x=>x.split('').map(x=>parseInt(x)));
const octopusses: Grid<number> = new Grid();
octopusses.setGrid(inputValues);

logger.start();

let answer = 0;
let flashed: Grid<number>;

let stepcount = 0;
for (let step=1; true; step++) {
    stepcount=0;
    flashed = new Grid(octopusses.width, octopusses.height, 0);
    step1();
    step2();
    if (stepcount===octopusses.height*octopusses.width) {
        answer=step;
        break;
    }
}

logger.end(answer);

function step1() {
    for (let y = 0; y < octopusses.height; y++) {
        for (let x = 0; x < octopusses.width; x++) {
            octopusses.grid[y][x]++;
        }
    }
}

function step2() {
    for (let y = 0; y < octopusses.height; y++) {
        for (let x = 0; x < octopusses.width; x++) {
            if (octopusses.grid[y][x]>9) {
                flashed.grid[y][x]++;
                stepcount++;
                scanNeigbours(x, y);
                octopusses.grid[y][x]=0;
            };
        }
    }
}

function scanNeigbours(x: number, y: number) {
    directions.forEach((d: Direction)=> {
        if (octopusses.isOutsideGrid(x+d.x, y+d.y)) return;
        if (flashed.grid[y+d.y][x+d.x]>0) return;
        octopusses.grid[y+d.y][x+d.x]++;
        if (octopusses.grid[y+d.y][x+d.x]>9) {
            stepcount++;
            flashed.grid[y+d.y][x+d.x]++;
            scanNeigbours(x+d.x, y+d.y);
            octopusses.grid[y+d.y][x+d.x]=0;
        }
    })
}
