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
export class Direction {
    x: number = 0;
    y: number = 0;
}

export class Grid<T> {
    grid: T[][] = [][0];
    width: number = 0;
    height: number = 0;

    constructor(width?: number, height?: number, initial?: T) {
        if (width && height && initial!==undefined) {
            this.initGrid(width, height, initial);
        }
    }
    
    initGrid (width: number, height: number, initial: T) {
        this.grid = new Array(height).fill([]).map(row => new Array(width).fill(initial));
        this.height = height;
        this.width = width;
    }

    setGrid(grid: T[][]) {
        this.grid = grid;
        this.height = grid[0].length;
        this.width  = grid.length;
    }

    display() {
        this.grid.forEach(row => {
            console.log(row.join(''));
        })
    }    

    isOutsideGrid(x: number, y: number) {
        if (x<0) return true;
        if (x>this.width-1) return true;
        if (y<0) return true;
        if (y>this.height-1) return true;
        return false;
    }    

}