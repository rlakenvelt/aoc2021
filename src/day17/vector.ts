export default class Vector2D {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x=x;
        this.y=y;
    }
    add(v: Vector2D): Vector2D {
        this.x+=v.x;
        this.y+=v.y;
        return this;
    }
}