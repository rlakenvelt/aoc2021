import { chownSync } from 'fs';
import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 06A: Lanternfish'
const input = new InputHelper();
const logger = new Logger(puzzle);

class LanternFish {
    timer: number;

    constructor(days: number) {
        this.timer = days;
    }
    addDay() {
        if (this.timer===0) {
            this.timer=6;
            return new LanternFish(8);
        }
        this.timer--;
        return;
    }
}
const days = 80;
const inputValues = input.getNumericInput(',');
const fishes: LanternFish[] = [];
inputValues.forEach(days => {
    fishes.push(new LanternFish(days));
})

logger.start();

for (let i = 0; i< days; i++) {
    const newFishes: LanternFish[] = [];
    fishes.forEach(fish=> {
        const newFish = fish.addDay();
        if (newFish) newFishes.push(newFish);
    })
    fishes.push(...newFishes);
    showFishes();
}

logger.end(fishes.length);

function showFishes() {
    let timers:number[] = [];
    fishes.forEach(fish=> {
        timers.push(fish.timer);
    })
}

