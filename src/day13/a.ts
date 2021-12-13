import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import { Grid } from '../utils/grid';

const puzzle = 'Day 13A: Transparent Origami'
const input = new InputHelper();
const logger = new Logger(puzzle);

logger.start();

const inputValues = input.getInput('\n\n');
const dots: number[][] = inputValues[0].split('\n').map(x=>x.split(',').map(i=>parseInt(i)));
let height = 0;
let width = 0;
dots.forEach(dot=> {
    width = Math.max(width, dot[0]+1);
    height = Math.max(height, dot[1]+1);
})

let paper = new Grid<string>(width, height, ' ');
dots.forEach(dot=>{
    paper.grid[dot[1]][dot[0]] = '#';
})
const folds: any[] = inputValues[1].split('\n').map(f=> {
    const parts = f.split('=');
    return {fold: parts[0], line: parseInt(parts[1])}
});

folds.forEach((fold, index)=> {
    if (index<1) {
        switch(fold.fold) {
            case 'fold along y':
                for (let l=fold.line+1; l<paper.height; l++) {
                    for (let c=0; c<paper.width; c++) {
                        if (paper.grid[l][c] === '#') paper.grid[fold.line-(l-fold.line)][c] = '#';
                    }
                }
                height=fold.line;
                break;
            case 'fold along x':
                for (let l=0; l<paper.height; l++) {
                    for (let c=fold.line; c<paper.width; c++) {
                        if (paper.grid[l][c] === '#') paper.grid[l][fold.line-(c-fold.line)] = '#';
                    }
                }
                width=fold.line;
                break;
        }
    }
})
let answer = 0;
for (let l=0; l<height; l++) {
    for (let c=0; c<width; c++) {
        if (paper.grid[l][c] === '#') answer++;
    }
}

logger.end(answer);
