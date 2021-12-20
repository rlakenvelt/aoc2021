import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import {Grid} from '../utils/grid';

const puzzle = 'Day 20A: Trench Map'
const input = new InputHelper();
const logger = new Logger(puzzle);

logger.start();

const inputValues = input.getInput('\n\n');
const algorithm:string[] = inputValues[0].split('\n').join('').split('');
const grid: string[][] = inputValues[1].split('\n').map(x=>x.split(''));
let image: Grid<string> = new Grid(grid[0].length, grid.length);

const iterations = 2;
const margin = iterations + 10;

image.setGrid(grid);
image.expand(iterations+margin, '.');
for (let count=0; count<iterations;count++) {
    image = createOutputImageFrom(image);
}
image.crop(margin);

// image.display();

const line = image.grid.map(x=>x.join('')).join('');
let answer = (line.match(/#/g) || []).length;

logger.end(answer);

function createOutputImageFrom(inputImage: Grid<string>): Grid<string> {
    const outputImage = new Grid(inputImage.width, inputImage.height, '.');

    for (let y=1; y<outputImage.height-2; y++) {
        for (let x=1; x<outputImage.width-2; x++) {
            let bits='';
            for (let y1=-1; y1<2; y1++) {
                bits+=inputImage.grid[y+y1].slice(x-1,x+2).join('');
            }
            bits = bits.replace(/\./g, '0');
            bits = bits.replace(/#/g, '1');
            outputImage.grid[y][x]=algorithm[parseInt(bits, 2)];    
        }
    }

    return outputImage;
}
