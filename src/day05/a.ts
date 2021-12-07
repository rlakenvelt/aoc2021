import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import {Line, Point} from '../utils/grid';
import {VentsGrid} from './ventsgrid';

const puzzle = 'Day 05A: Hydrothermal Venture'
const input = new InputHelper();
const logger = new Logger(puzzle);

logger.start();

let lines: Line []   = input.getInput()
                            .reduce((list: Line[], line) => {
                                const parts = line.split(' -> ');
                                const start = new Point(parseInt(parts[0].split(',')[0]), parseInt(parts[0].split(',')[1]));
                                const end = new Point(parseInt(parts[1].split(',')[0]), parseInt(parts[1].split(',')[1]));
                                const newline = new Line(start, end);
                                list.push(newline);
                                return list;
                            }, [])
                            .filter(line => line.from.x === line.to.x || line.from.y === line.to.y);

const height = lines.reduce((h, p) => {
                        h = Math.max(h, p.from.y, p.to.y);
                        return h;
                    }, 1);
const width = lines.reduce((w, p) => {
                        w = Math.max(w, p.from.x, p.to.x);
                        return w;
                    }, 0);

const grid = new VentsGrid(height+1, width+1);
grid.markLines(lines);
// grid.display();
logger.end(grid.countOverlapping());

