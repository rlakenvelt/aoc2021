export class Point {
    x: number = 0;
    y: number = 0;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
export class Vector {
    from: Point;
    to: Point;
    sideX: number = 0;
    sideY: number = 0;
    length: number = 0;
    directionDegrees: number = 0;
    directionRadians: number = 0;

    constructor(from: Point, to: Point) {
        this.from = from;
        this.to = to;
        this.calculateProperties();
    }

    private calculateProperties() {
        this.sideX = Math.abs(this.from.x - this.to.x);
        this.sideY = Math.abs(this.from.y - this.to.y);
        this.length = Math.hypot(this.sideX, this.sideY);
        this.directionDegrees = Math.atan2(this.to.y - this.from.y, this.to.x - this.from.x) * 180 / Math.PI;
        this.directionRadians = Math.atan2(this.to.y - this.from.y, this.to.x - this.to.x);
    }

    add(vector: Vector) {
        this.to.x+=(vector.to.x - vector.from.x);
        this.to.y+=(vector.to.y - vector.from.y);
        this.calculateProperties();
    }
    subtract(vector: Vector) {
        this.to.x-=(vector.to.x - vector.from.x);
        this.to.y-=(vector.to.y - vector.from.y);
        this.calculateProperties();
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

    markVectors(vectors: Vector[]) {
        vectors.forEach(vector => {
            let stepy = (vector.from.y === vector.to.y ? 0 : (vector.from.y < vector.to.y ? 1 : -1));
            let stepx = (vector.from.x === vector.to.x ? 0 : (vector.from.x < vector.to.x ? 1 : -1));
            let stop = false
            for (let y = vector.from.y, x = vector.from.x; !stop; y+=stepy, x+=stepx) {
                this.points[y][x]++;
                if (x===vector.to.x && y===vector.to.y) stop = true;
            };
        })    
    }
}