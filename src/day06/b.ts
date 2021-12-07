import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 06B: Lanternfish'
const input = new InputHelper();
const logger = new Logger(puzzle);

const days = 256;

logger.start();
const fishes = input.getNumericInput(',');

const counters = fishes.reduce((list, fish) => {
                            list[fish]++;
                            return list;
                        }, new Array(9).fill(0))

for (let i = 0; i< days; i++) {
    const newFishes = counters.shift()
    counters[6]+=newFishes;
    counters.push(newFishes);
}

logger.end(totalFishes());

function totalFishes() {
    return counters.reduce((total, c) => {
        total+=c;
        return total;
    }, 0);
}

