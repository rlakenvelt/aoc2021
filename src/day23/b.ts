import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 23B'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues = input.getInput();

logger.start();
let answer = 0;



logger.end(answer);


// console.log(amphipods)
// const newmap = {...burrowMap};
// newmap['1_1']={id: 10, room: 'BLA'};
// console.log(burrowMap)
// console.log(newmap)

// console.log(points)
// console.log(burrowMap)
// console.log(amphipods)
// const p1 = new Point(3,3);
// const p2 = new Point(1,1);
// console.log(p1.distance(p2));
// console.log(p1.path(p2));
// console.log(p1.room);
// console.log(p1.isInHallway);
// console.log(amphipods[0].endpointCosts(p1));
// const a=amphipods[2];
// console.log(a)
// points.forEach(point=> {
//     const costs = a.endpointCostsUsingMap(point, burrowMap);
//     console.log(point, costs);

// })
