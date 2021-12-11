import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import Common from '../utils/common';

const puzzle = 'Day 11B: Dumbo Octopus'
const input = new InputHelper();
const logger = new Logger(puzzle);

const directions = [
    {x: 1, y: 0},
    {x: 1, y: -1},
    {x: 0, y: -1},
    {x: -1, y: -1},
    {x: -1, y: 0},
    {x: -1, y: 1},
    {x: 0, y: 1},
    {x: 1, y: 1}
]
const octopusses: any= input.getInput().map(x=>x.split('').map(x=>parseInt(x)));
const height = octopusses.length;
const width = octopusses[0].length;

logger.start();

let answer = 0;
let flashed: number[][];

let stepcount = 0;
for (let step=1; true; step++) {
    stepcount=0;
    flashed = new Array(height).fill([]).map(row => new Array(width).fill(0));
    step1();
    step2();
    if (stepcount===height*width) {
        answer=step;
        break;
    }
}

logger.end(answer);

function step1() {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            octopusses[y][x]++;
        }
    }
}

function step2() {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (octopusses[y][x]>9) {
                flashed[y][x]++;
                stepcount++;
                scanNeigbours(x, y);
                octopusses[y][x]=0;
            };
        }
    }
}

function scanNeigbours(x: number, y: number) {
    directions.forEach((d: any)=> {
        if (x+d.x<0) return;
        if (x+d.x>width-1) return;
        if (y+d.y<0) return;
        if (y+d.y>height-1) return;
        if (flashed[y+d.y][x+d.x]>0) return;
        octopusses[y+d.y][x+d.x]++;
        if (octopusses[y+d.y][x+d.x]>9) {
            stepcount++;
            flashed[y+d.y][x+d.x]++;
            scanNeigbours(x+d.x, y+d.y);
            octopusses[y+d.y][x+d.x]=0;
        }
    })
}

function displayGrid() {
    for (let i = 0; i < height; i++) {
        console.log(octopusses[i].map((x: number) => {
                                    if (x===0) {
                                        return Common.highlight(x.toString());
                                    } else {
                                        return x.toString();
                                    }
                                })
                                .join(''));
    }
    console.log('');
}