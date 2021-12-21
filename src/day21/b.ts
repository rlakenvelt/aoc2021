import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 21B: Dirac Dice'
const input = new InputHelper();
const logger = new Logger(puzzle);

type Player = {pos: number; score: number};
type Wins = [number, number];

logger.start();

const players: Player[] = getPlayers();
const diracDie: number[] = [1,2,3];

let cache: any = {}
const result = play([players[0].pos, players[1].pos], [0, 0], 0);

logger.end(result.sort((a,b)=> b-a)[0]);

function play(pos: [number, number], score: [number, number], current: number): Wins  {
    let wins: Wins = cache[hash(pos[0], pos[1], score[0], score[1], current)];
    if (wins) return wins;
    wins=[0,0];
    for (const d1 of diracDie) {
        for (const d2 of diracDie) {
            for (const d3 of diracDie) {
                let tempPos =pos[current]+d1+d2+d3;
                if (tempPos>10) tempPos%=10;
                const tempScore = score[current]+tempPos;
                if (tempScore>=21) {
                    wins[current]++;
                } else {
                    let w = [0,0];
                    if (current===0) {
                        w = play([tempPos, pos[1]], [tempScore, score[1]], 1);
                    } else {
                        w = play([pos[0], tempPos], [score[0], tempScore], 0);
                    }
                    wins[0]+=w[0];
                    wins[1]+=w[1];
                }      
            }                
        }
    }
    cache[hash(pos[0], pos[1], score[0], score[1], current)] = wins;
    return wins;
}

function getPlayers(): Player[] {
    return input.getInput().map(l=> {
        const parts = l.split(' ');
        return {pos: parseInt(parts[4]), score: 0};
    })
}

function hash(pos1: number, pos2: number, score1: number, score2: number, current: number): string {
    return [pos1, pos2, score1, score2, current].join('_');
}

