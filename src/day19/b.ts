import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import { Beacon, Scanner} from './common';
const puzzle = 'Day 19A: Beacon Scanner'
const input = new InputHelper();
const logger = new Logger(puzzle);

logger.start();

const scanners: Scanner[] = getScannersFromInput();
const finalScanners: Scanner[] = [scanners[0]];
scanners.shift();

do {
    for (let compare=0; compare<scanners.length; compare++) {
        for (let base=0; base<finalScanners.length; base++) {
            if (scanners[compare].ID===finalScanners[base].ID) break;
            if (findMatch(finalScanners[base], scanners[compare])) {
                scanners.splice(compare, 1);
                compare=0;
                break;
            };
        }
    }
} while (scanners.length>0)

let totalBeacons: Beacon[] = [];

let maxManhattan = 0;
finalScanners.forEach(s=> {
    for (let i=0; i<finalScanners.length; i++) {
        if (s.ID!==finalScanners[i].ID) {
            const manhattan = Math.abs(s.location.x-finalScanners[i].location.x) +
                              Math.abs(s.location.y-finalScanners[i].location.y) +
                              Math.abs(s.location.z-finalScanners[i].location.z);
            maxManhattan = Math.max(manhattan, maxManhattan);
        }
    
    }
})


let answer = maxManhattan;

logger.end(answer);

function findMatch(scanner1: Scanner, scanner2: Scanner): boolean {
    scanner2.reset();
    let tryRotation = scanner2.rotate();
    do {
        if (scanner1.matches(tryRotation)) {
            finalScanners.push(tryRotation);
            return true;
        };
        tryRotation = scanner2.rotate()
    } while (!tryRotation.noMoreRotations)
    return false;
}



function getScannersFromInput(): Scanner[] {
    const scanners: Scanner[] = [];

    input.getInput('\n\n')
        .map(x=>x.split('\n').slice(1))
        .forEach((beacons, index) => {
        const newScanner = new Scanner(index);
        const coordinatelist = beacons.map(b=>b.split(','))
                                      .map(b=>new Beacon(parseInt(b[0]), parseInt(b[1]), parseInt(b[2])));
        newScanner.setBeacons(coordinatelist);
        scanners.push(newScanner);
        });

    return scanners;
}

