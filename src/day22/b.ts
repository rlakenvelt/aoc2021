import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import { Cuboid } from './common';

const puzzle = 'Day 22B: Reactor Reboot'
const input = new InputHelper();
const logger = new Logger(puzzle);


logger.start();

let baseCuboids=Cuboid.cuboidsFromInput();
let cuboids: Cuboid[] = [];

for (let baseCuboid of baseCuboids) {
    const newCuboids: Cuboid[] = [];
    for (let cuboid of cuboids) {
        if (cuboid.overlaps(baseCuboid)) {
            const splitCuboids = cuboid.remainingCuboids(baseCuboid);
            newCuboids.push(...splitCuboids);
        } else {
            newCuboids.push(cuboid);
        }
    }  
    if (baseCuboid.on) newCuboids.push(baseCuboid);
    cuboids=newCuboids;
}
let answer = 0;
for (let cuboid of cuboids) {
    answer+=cuboid.volume;
}

logger.end(answer);
