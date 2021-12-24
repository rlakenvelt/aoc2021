import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 23A'
const input = new InputHelper();
const logger = new Logger(puzzle);
const rooms: string[] = ['A', 'B', 'C', 'D'];
let maxY = 1;

class Amphipod {
    id: number;
    type: string;
    // location: Point
    energyConsumption: number;
    constructor(id: number, type: string) {
        this.type = type;
        this.id = id;
        this.energyConsumption = 1;
        switch (type) {
            case 'B': 
                this.energyConsumption = 10;
                break;
            case 'C': 
                this.energyConsumption = 100;
                break;
            case 'D': 
                this.energyConsumption = 1000;
                break;
        }
        // this.location=new Point(x,y);
    }
    locationOnMap(map: any): Point {
        let hash = '';
        Object.keys(map).forEach(key=> {
            if (map[key]===this.id) {
                hash=key;
            }
        })
        const coord = hash.split('_').map(i=>parseInt(i))
        return new Point(coord[0], coord[1]);
    }
    endpointCostsUsingMap(point: Point, map: any): number {
        if (['3_1','5_1','7_1','9_1'].includes(hash(point.x, point.y))) return -1; // On room exit
        if (point.y>1) {
            if (this.type!==point.room) return -2; // To wrong room
            for (let y=point.y+1; y<=maxY; y++) {
                if (map[hash(point.x, y)]<0) return -3; // Room not completely filled
            }
        }
        const location: Point = this.locationOnMap(map);
        if (location.y>1&&this.type===location.room) {
            let allInPlace = true;
            for (let y=location.y+1; y<=maxY; y++) {
                const id = map[hash(location.x, y)];
                if (map[id]<0||amiphods[id].type!==this.type) {
                    allInPlace=false;
                }
            }
            if (allInPlace) return -4; // Already in place

        }
        if (location.y===1&&point.y===1) return -5; // from hall to hall
        const path = location.path(point);
        if (!path.every(p=> map[p]<0)) return -6; // Amphipod on path
        return path.length*this.energyConsumption;
    }
}

class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    get isInHallway() {
        return this.y===1;
    }
    get room(): string {
        if (this.y===1) return '';
        return rooms[(this.x-1)/2-1];
    }
    distance(point: Point): number {
        return this.path(point).length;
    }
    path(point: Point): string[] {
        let points: string[] = [];
        for (let y=1; y<=this.y; y++) {
            points.push(hash(this.x,y));
        }
        for (let y=1; y<=point.y; y++) {
            points.push(hash(point.x,y));
        }
        for (let x = Math.min(this.x, point.x); x<=Math.max(this.x, point.x); x++) {
            points.push(hash(x,1));
        }
        return [...new Set(points.filter(p=>p!==hash(this.x, this.y))) ];
    }
}

logger.start();

const inputValues: string[][] = input.getInput().map(x=>x.split(''));
const burrowMap: any = {};
const amiphods: Amphipod[] = [];
const points: Point[] = [];
let id = 0;
for (let x = 0; x<inputValues[0].length; x++) {
    for (let y = 0; y<inputValues.length; y++) {
        switch (inputValues[y][x]) {
            case '.':
                burrowMap[hash(x,y)] = -1;
                points.push(new Point(x,y));
                break;
            case 'A':
            case 'B':
            case 'C':
            case 'D':
                const newAmphipod = new Amphipod(id, inputValues[y][x]);
                burrowMap[hash(x,y)] = id;
                amiphods.push(newAmphipod);
                points.push(new Point(x,y));
                id++;
                maxY = Math.max(maxY, y);
                break;
        }
    }

}

let answer = move(burrowMap, 0, '');

logger.end(answer);

function move(map: any, level: number, path: string): number {
    console.log('LEVEL', level)
    let possibleMoves: any[] = [];
    // if (level>1) return 0;
    let energy = Infinity;
    amiphods.forEach(amphipod=> {
        points.forEach(point=> {
            const costs = amphipod.endpointCostsUsingMap(point, map);
            if (costs > 0) {
                possibleMoves.push({id: amphipod.id, point: point, energy: costs})
            }
        })
    })
    if (possibleMoves.length===0) return 0;
    // if (level>100) {
    //     console.log(map)
    //     console.log(possibleMoves);
    //     return 0;
    // }
    // possibleMoves=[possibleMoves[0]];
    // console.log(possibleMoves);

    for (let m of possibleMoves) {
        const newMap = {...map};
        Object.keys(newMap).forEach(key=> {
            if (newMap[key]===m.id) newMap[key]=-1;
        })
        newMap[hash(m.point.x, m.point.y)] = m.id;
        const e = move(newMap, level+1, '');
        energy = Math.min(m.energy, m.energy + e);
    }

    return energy;
}



function hash(x:number,y:number): string {
    return `${x}_${y}`;
}

// console.log(amiphods)
// const newmap = {...burrowMap};
// newmap['1_1']=10;
// console.log(burrowMap)
// console.log(newmap)

// console.log(points)
// console.log(burrowMap)
// console.log(amiphods)
// const p1 = new Point(6,1);
// const p2 = new Point(7,3);
// console.log(p1.distance(p2));
// console.log(p1.path(p2));
// console.log(p1.room);
// console.log(p1.isInHallway);
// console.log(amiphods[0].endpointCosts(p1));
