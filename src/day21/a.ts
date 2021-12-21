import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 21A: Dirac Dice'
const input = new InputHelper();
const logger = new Logger(puzzle);

class Player {
    id: number;
    score: number = 0;
    position: number = 0;
    constructor(id: number, position: number) {
        this.id = id;
        this.position = position;
    }
    get wins() {
        return this.score>=1000;
    }
    move(positions: number) {
        this.position+=positions;
        if (this.position>10) this.position=this.position%10;
        if (this.position===0) this.position=10;
        this.score+=this.position;
    }
}
class DeterministicDie {
    value: number = 0;
    private sides: number;
    constructor(sides: number) {
        this.sides=sides;
    }
    roll(): number {
        this.value++;
        if (this.value>this.sides) this.value=1;
        return this.value;
    }
}
logger.start();

const die = new DeterministicDie(100);
const inputValues = input.getInput();
const players: Player[] = inputValues.map(l=> {
    const parts = l.split(' ');
    const newPlayer = new Player(parseInt(parts[1]), parseInt(parts[4]));
    return newPlayer;
})

let currentPlayer = 0;
let turns = 0;
while (true) {
    const moves = die.roll()+die.roll()+die.roll();
    players[currentPlayer].move(moves);
    turns+=3;
    if (players[currentPlayer].wins) break;
    currentPlayer=(currentPlayer===0?1:0);
};

const loser = players[currentPlayer===1?0:1];

logger.end(turns * loser.score);

