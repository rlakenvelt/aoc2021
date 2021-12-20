import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import { Vector, Scanner} from './common';
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

let totalBeacons: Vector[] = [];
finalScanners.forEach(s=> {
    s.transform();
    s.beacons.forEach(b1=> {
        const f = totalBeacons.find(b2=> b2.x===b1.x&&b2.y===b1.y&&b2.z===b2.z);
        if (!f) totalBeacons.push(b1);

    })

})

let answer = totalBeacons.length;

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
    } while (tryRotation.hasMoreRotationa)
    return false;
}



function getScannersFromInput(): Scanner[] {
    const scanners: Scanner[] = [];

    input.getInput('\n\n')
        .map(x=>x.split('\n').slice(1))
        .forEach((beacons, index) => {
        const newScanner = new Scanner(index);
        const coordinatelist = beacons.map(b=>b.split(','))
                                      .map(b=>new Vector(parseInt(b[0]), parseInt(b[1]), parseInt(b[2])));
        newScanner.setBeacons(coordinatelist);
        scanners.push(newScanner);
        });

    return scanners;
}

