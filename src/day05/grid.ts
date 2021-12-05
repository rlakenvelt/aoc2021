export class Point {
    x: number = 0;
    y: number = 0;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
export class Line {
    from: Point;
    to: Point;
    constructor(from: Point, to: Point) {
        this.from = from;
        this.to = to;
    }
}


export class Grid {
    points: number[][];

    constructor (width: number, height: number) {
        this.points = new Array(height).fill([]).map(row => new Array(width).fill(0));
    }

    display() {
        const regex = /0/g;
        this.points.forEach(row => {
            console.log(row.join('').replace(regex, '.'));
        })
    }

    markLines(lines: Line[]) {
        lines.forEach(line => {
            let stepy = (line.from.y === line.to.y ? 0 : (line.from.y < line.to.y ? 1 : -1));
            let stepx = (line.from.x === line.to.x ? 0 : (line.from.x < line.to.x ? 1 : -1));
            let stop = false
            for (let y = line.from.y, x = line.from.x; !stop; y+=stepy, x+=stepx) {
                this.points[y][x]++;
                if (x===line.to.x && y===line.to.y) stop = true;
            };
        })    
    }

    countOverlapping() {
        return this.points.reduce((total, row) => {
            row.forEach(point=> {
                if (point>1) total++;
            })
            return total;
        }, 0);        
    }
}