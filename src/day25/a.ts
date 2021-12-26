import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import {Point, Grid} from '../utils/grid';

const puzzle = 'Day 25 Sea Cucumber'
const input = new InputHelper();
const logger = new Logger(puzzle);

logger.start();

const inputValues = input.getInput();
const grid: string[][] = inputValues.map(x=>x.split(''));
let map: Grid<string> = new Grid(grid[0].length, grid.length);


map.setGrid(grid);

let step = 0;
while (true) {
    step++;
    let east: Point[] = [];
    for (let x = 0; x<map.width; x++) {
        for (let y = 0; y<map.height; y++) {
            if (map.grid[y][x]!=='>') continue;
            const check: number = (x===map.width-1?0:x+1);
            if (map.grid[y][check]==='.') {
                east.push(new Point(x,y))
            }
        }
    }
    east.forEach(p=> {
        const newX: number = (p.x===map.width-1?0:p.x+1);
        map.grid[p.y][newX] = map.grid[p.y][p.x];
        map.grid[p.y][p.x]='.';
    })
    let south: Point[] = [];
    for (let x = 0; x<map.width; x++) {
        for (let y = 0; y<map.height; y++) {
            if (map.grid[y][x]!=='v') continue;
            const check: number = (y===map.height-1?0:y+1);
            if (map.grid[check][x]==='.') {
                south.push(new Point(x,y))
            }
        }
    }
    south.forEach(p=> {
        const newY: number = (p.y===map.height-1?0:p.y+1);
        map.grid[newY][p.x] = map.grid[p.y][p.x];
        map.grid[p.y][p.x]='.';
    })    

    if (east.length===0&&south.length===0) break;

}

let answer = step;
logger.end(answer);

