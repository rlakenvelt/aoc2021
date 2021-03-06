import {Line, Grid} from '../utils/grid';

export class VentsGrid extends Grid<number>
{
    countOverlapping() {
        return this.grid.reduce((total, row) => {
            row.forEach(point=> {
                if (point>1) total++;
            })
            return total;
        }, 0);        
    }    

    display() {
        const regex = /0/g;
        this.grid.forEach(row => {
            console.log(row.join('').replace(regex, '.'));
        })
    }

    markLines(lines: Line[]) {
        lines.forEach(line => {
            let stepy = (line.from.y === line.to.y ? 0 : (line.from.y < line.to.y ? 1 : -1));
            let stepx = (line.from.x === line.to.x ? 0 : (line.from.x < line.to.x ? 1 : -1));
            let stop = false
            for (let y = line.from.y, x = line.from.x; !stop; y+=stepy, x+=stepx) {
                this.grid[y][x]++;
                if (x===line.to.x && y===line.to.y) stop = true;
            };
        })    
    }

}
