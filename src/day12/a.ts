import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 12A: Passage Pathing'
const input = new InputHelper();
const logger = new Logger(puzzle);

class Connection {
    from: Cave;
    to: Cave;
    constructor(from: Cave, to: Cave) {
        this.from = from;
        this.to = to;
    }

}
class Cave {
    name: string = '';
    small: boolean = false;
    visited: number = 0;

    constructor(name: string) {
        this.name = name;
        this.small = name === name.toLowerCase();
    }

}

logger.start();

const inputValues = input.getInput();
const connections: Connection[] = []
const caves: Cave[] = []; 
const routes: string[] = [];
inputValues.forEach((i: string)=> {
    const parts = i.split('-');
    connections.push(new Connection(getCave(parts[0]), getCave(parts[1])));
    if (parts[0]!=='start' && parts[1]!=='end')
        connections.push(new Connection(getCave(parts[1]), getCave(parts[0])));
})


// console.log(caves);
// console.log(connections);

let answer = 0;

const start = getCave('start');
const end   = getCave('end');

scanPaths(start, 'start');

answer = routes.length;

logger.end(answer);

function scanPaths(cave: Cave, path: string) {
    if (cave.name==='end') {
        routes.push(path);
        return;
    }
    cave.visited++;
    const caveconnections = connections.filter(c=> {
                                if (c.from.name!==cave.name) return false;
                                if (!c.to.small) return true;
                                if (path.includes(c.to.name)) return false;
                                return true;
                            });
    caveconnections.forEach(connection=> {
        if (cave.name==='start') {
            reset();
        }
        scanPaths(connection.to, path+','+connection.to.name);
    })
}

function reset() {
    caves.forEach(c=> c.visited = 0);
}

function getCave(name: string) {
    let cave = caves.find(c=>c.name===name);
    if (!cave) {
        cave = new Cave(name);
        caves.push(cave);
    }
    return cave; 
}

