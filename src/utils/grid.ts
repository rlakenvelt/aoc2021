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
    // sideX: number = 0;
    // sideY: number = 0;
    // length: number = 0;
    // directionDegrees: number = 0;
    // directionRadians: number = 0;

    constructor(from: Point, to: Point) {
        this.from = from;
        this.to = to;
        // this.calculateProperties();
    }

    // private calculateProperties() {
    //     this.sideX = Math.abs(this.from.x - this.to.x);
    //     this.sideY = Math.abs(this.from.y - this.to.y);
    //     this.length = Math.hypot(this.sideX, this.sideY);
    //     this.directionDegrees = Math.atan2(this.to.y - this.from.y, this.to.x - this.from.x) * 180 / Math.PI;
    //     this.directionRadians = Math.atan2(this.to.y - this.from.y, this.to.x - this.to.x);
    // }

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
}