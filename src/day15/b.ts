import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import { Direction, Grid } from '../utils/grid';

const puzzle = 'Day 15B: Chiton'
const input = new InputHelper();
const logger = new Logger(puzzle);

class Cave {
    x: number;
    y: number;
    risk: number;
    totalRisk: number;
    constructor(x: number, y: number, risk: number) {
        this.x = x;
        this.y = y;
        this.risk = risk;
        this.totalRisk = Number.MAX_SAFE_INTEGER;
    }
}

logger.start();

const inputValues:number[][] = input.getInput().map(x=>x.split('').map(i=>parseInt(i)));
const caveMap: Grid<Cave> = new Grid(inputValues[0].length, inputValues.length);
const grid: Cave[][] = new Array(inputValues.length).fill([]).map(row => new Array(inputValues[0].length));
for (let y = 0; y<inputValues.length; y++) {
    for (let x = 0; x<inputValues[0].length; x++) {
        const newCave = new Cave(x, y, inputValues[y][x]);
        grid[y][x]=newCave;  
    }
}
caveMap.setGrid(grid);
const directions = Direction.directionsWithoutDiagonals();

const answer = dijkstra(caveMap.grid[0][0], caveMap.grid[caveMap.height-1][caveMap.width-1]);


logger.end(answer);

function dijkstra(start: Cave, finish: Cave) {
    const queue: Cave[] = []; 
    start.risk=0;
    start.totalRisk=0;
    queue.push(start);
    while (queue.length > 0) {
        const cave = queue.shift();
        if (!cave) continue;
        if (cave===finish) return cave.totalRisk; 
        directions.forEach((direction: any) => {
            if (caveMap.isOutsideGrid(cave.x+direction.x, cave.y+direction.y)) return;

            const childCave = caveMap.grid[cave.y+direction.y][cave.x+direction.x];
            const newRisk = cave.totalRisk+childCave.risk;

            if (childCave.totalRisk > newRisk) {
                childCave.totalRisk=newRisk;
                const caveOnQueue=queue.find(foundCave=>foundCave===childCave);
                if (!caveOnQueue) {
                    queue.push(childCave);
                }
                queue.sort((a, b) => a.totalRisk-b.totalRisk);
            }
        });
    } 
} 

