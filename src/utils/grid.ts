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

export class NumberGrid {
    points: number[][];

    constructor (width: number, height: number) {
        this.points = new Array(height).fill([]).map(row => new Array(width).fill(0));
    }

}

export class StringGrid {
    points: string[][];

    constructor (width: number, height: number) {
        this.points = new Array(height).fill([]).map(row => new Array(width).fill(''));
    }

}