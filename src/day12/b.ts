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
    if (parts[1]!=='start' && parts[0]!=='end')
        connections.push(new Connection(getCave(parts[0]), getCave(parts[1])));
    if (parts[0]!=='start' && parts[1]!=='end')
        connections.push(new Connection(getCave(parts[1]), getCave(parts[0])));
})

const start = getCave('start');
const end   = getCave('end');

scanPaths(start, 'start');

logger.end(routes.length);

function scanPaths(cave: Cave, path: string) {
    if (cave.name==='end') {
        routes.push(path);
        return;
    }
    const caveconnections = connections.filter(c=> {
                                if (c.from.name!==cave.name) return false;
                                if (!c.to.small) return true;
                                if (c.to.name==='end') return true;
                                if (!isValid(path+','+c.to.name)) return false;
                                return true;
                            });
    caveconnections.forEach(connection=> {
        scanPaths(connection.to, path+','+connection.to.name);
    })
}

function isValid(path: string): boolean {
    let pathList=path.split(',').filter(p=>p!=='start'&&p=== p.toLowerCase());
    const countAll = pathList.length;
    pathList=pathList.filter((p, index, self)=>{return self.indexOf(p) === index});
    return countAll-pathList.length<2;
}


function getCave(name: string) {
    let cave = caves.find(c=>c.name===name);
    if (!cave) {
        cave = new Cave(name);
        caves.push(cave);
    }
    return cave; 
}

