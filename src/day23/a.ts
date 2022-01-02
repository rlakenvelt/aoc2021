import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 23A'
const input = new InputHelper();
const logger = new Logger(puzzle);
const rooms: string[] = ['','','','A','','B','','C','','D','',''];
let maxY = 1;

type Path = {
    endpoint: Point, 
    path: string[], 
    length: number
}

class Amphipod {
    id: number;
    room: string;
    energyConsumption: number;
    constructor(id: number, room: string) {
        this.room = room;
        this.id = id;
        this.energyConsumption = 1;
        switch (room) {
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
    }
    locationOnMap(map: any): Point {
        let hash: string = '';
        Object.keys(map).forEach(key=> {
            if (map[key].id===this.id) {
                hash=key;
            }
        })
        return points.find(p=>p.hash===hash) || new Point(0,0);
    }
    endpointCostsUsingMap(location: Point, path: Path, map: any): number {

        if (path.endpoint.y>1) {
            if (this.room!==path.endpoint.room) return -3; // To wrong room
            for (let y=path.endpoint.y+1; y<=maxY; y++) {
                const id = map[Point.hash(path.endpoint.x, y)].id;
                if (id<0) return -5; // Room not completely filled
                if (amphipods[id].room!==this.room) return -6; // Wrong amphipod in room
            }
        }
        if (this.room===location.room) {
            let allInPlace = true;
            for (let y=location.y+1; y<=maxY; y++) {
                const id = map[Point.hash(location.x, y)].id;
                if (id<0||amphipods[id].room!==this.room) {
                    allInPlace=false;
                }
            }
            if (allInPlace) return -7; // Already in place

        }
        if (!path.path.every(p=> map[p].id<0)) {
            return -8; // Amphipod on path
        }

        return path.length*this.energyConsumption;
    }
}

class Point {
    x: number;
    y: number;
    paths: Path[] = [];
    hash: string;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.hash = Point.hash(this.x, this.y);
    }
    get isInHallway() {
        return this.y===1;
    }
    get room(): string {
        if (this.y===1) return '';
        return rooms[this.x];
    }

    static hash(x:number, y:number): string {
        return `${x}_${y}`;
    }
    calculatePaths() {
        points.forEach(point=> {
            if (['3_1','5_1','7_1','9_1'].includes(point.hash)) return; // Roon entry
            if (this.y===1&&point.y===1) return; // From hall to hall
            if (this.x===point.x) return; // To same room
            const path = this.path(point);
            this.paths.push({endpoint: point, path: path, length: path.length})
        })
    }
    private path(point: Point): string[] {
        let points: string[] = [];
        for (let y=1; y<=this.y; y++) {
            points.push(Point.hash(this.x,y));
        }
        for (let y=1; y<=point.y; y++) {
            points.push(Point.hash(point.x,y));
        }
        for (let x = Math.min(this.x, point.x); x<=Math.max(this.x, point.x); x++) {
            points.push(Point.hash(x,1));
        }
        return [...new Set(points.filter(p=>p!==this.hash)) ];
    }
}

logger.start();

const inputValues: string[][] = input.getInput().map(x=>x.split(''));
const burrowMap: any = {};
const amphipods: Amphipod[] = [];
const points: Point[] = [];

init();

let answer = move(burrowMap, 0);

logger.end(answer);

function move(map: any, level: number): number {
    let possibleMoves: any[] = [];
    let energy = Infinity;
    let endpoints = false;
    amphipods.forEach(amphipod=> {
        const location: Point = amphipod.locationOnMap(map);

        location.paths.forEach(path=> {
            const costs = amphipod.endpointCostsUsingMap(location, path, map);
            if (costs > 0) {
                const isEndpoint = isAtEndpoint(path.endpoint, map);
                if (isEndpoint) endpoints = true;
                possibleMoves.push({id: amphipod.id, point: path.endpoint, energy: costs, end: isEndpoint})
            }
        })
    })
    if (endpoints) {
        possibleMoves = possibleMoves.filter(move=>move.end=== true)
    }

    if (possibleMoves.length===0) {
        let done = true
        for (let amphipod of amphipods) {
            const location: Point = amphipod.locationOnMap(map);
            if (location.room!==amphipod.room) done = false
        }
      
        return (done?0:Infinity);
    }

    for (let m of possibleMoves) {

        const newMap = {...map};
        Object.keys(newMap).forEach(key=> {
            if (newMap[key].id===m.id) {
                newMap[key]={id:-1,room:''};
            }              
        })

        newMap[m.point.hash] = {id:m.id,room:amphipods[m.id].room};

        const e = move(newMap, level+1);
        if (e!==Infinity)
            energy = Math.min(energy, m.energy + e);

    }
    if (level<=1) {
        console.log(level, energy);

    }
    return energy;
}

function isAtEndpoint(point: Point, map: any) {
    if (point.y===1) return false;
    for (let y=point.y+1; y<=maxY; y++) {
        if (map[point.hash].id<0) return false;
    }  
    return true;  
}

function init () {

    let id = 0;
    for (let x = 0; x<inputValues[0].length; x++) {
        for (let y = 0; y<inputValues.length; y++) {
            const point = new Point(x,y);
            switch (inputValues[y][x]) {
                case '.':
                    burrowMap[point.hash] = {id: -1, room: ''};
                    points.push(point);
                    break;
                case 'A':
                case 'B':
                case 'C':
                case 'D':
                    const newAmphipod = new Amphipod(id, inputValues[y][x]);
                    burrowMap[point.hash] = {id: id, room: newAmphipod.room};
                    amphipods.push(newAmphipod);
                    points.push(point);
                    id++;
                    maxY = Math.max(maxY, y);
                    break;
            }
        }
    }
    points.forEach(point=> {
        point.calculatePaths();
    })    
}