import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import Common from '../utils/common';

const puzzle = 'Day 07B : The Treachery of Whales'
const input = new InputHelper();
const logger = new Logger(puzzle);

logger.start();

const positions = input.getNumericInput(',');
const maxPosition = Common.arrayMax(positions);
const alignments = new Array(maxPosition).fill(0);

for (let i = 0; i<maxPosition; i++) {
    alignments[i] = positions.reduce((total, p) => {
                                    const distance = Math.abs(p-(i+1));
                                    total+=(distance+1)*distance/2;
                                    return total;
                                }, 0);
}

logger.end(Common.arrayMin(alignments));

