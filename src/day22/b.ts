import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import { Cuboid } from './common';

const puzzle = 'Day 22B: Reactor Reboot'
const input = new InputHelper();
const logger = new Logger(puzzle);


logger.start();

let cuboids=Cuboid.cuboidsFromInput();
let preprocessedCuboids: Cuboid[] = [];

for (let cuboid of cuboids) {
    if (preprocessedCuboids.length===0) {
        if (cuboid.on) preprocessedCuboids.push(cuboid);
        continue;
    }
    const addCuboids: Cuboid[] = [];
    if (cuboid.on) {
        for (let other of preprocessedCuboids) {
            const intersection = cuboid.intersection(other);
            if (intersection&&other.on) {
                intersection.on=-1;
                addCuboids.push(intersection);
            }
        }  
        preprocessedCuboids.push(cuboid);
    } else {
        for (let other of preprocessedCuboids) {
            const intersection = cuboid.intersection(other);
            if (intersection&&other.on) {
                intersection.on=-1;
                addCuboids.push(intersection);
            }
        }  
    } 
    preprocessedCuboids=[...preprocessedCuboids, ...addCuboids];
}
let cubes = 0;
for (let cuboid of preprocessedCuboids) {
    console.log(cuboid.on, cuboid.volume)
    cubes+=cuboid.volume*cuboid.on;
}

// const intersection = cuboids[0].intersection(cuboids[1]);

// console.log(intersection, intersection?.volume)
let answer = cubes;


logger.end(answer);
