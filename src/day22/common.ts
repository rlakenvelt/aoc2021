import InputHelper from '../utils/input';

type Range = {from: number, to:number}

export class Vector {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z:  number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

export class Cuboid {
    lowPoint: Vector;
    highPoint: Vector;
    on: number;
  
    constructor(minX: number, maxX: number, minY: number, maxY: number, minZ: number, maxZ: number, on: number) {
        this.lowPoint  = new Vector(Math.min(minX, maxX), Math.min(minY, maxY), Math.min(minZ, maxZ));
        this.highPoint = new Vector(Math.max(minX, maxX), Math.max(minY, maxY), Math.max(minZ, maxZ));
        this.on = on;
    }

    static cuboidsFromInput(): Cuboid[] {
        const input = new InputHelper();

        const cuboids: Cuboid[] = [];
        input.getInput().forEach(line=> {
            const parts=line.split(' ');
            const ranges: Range[] = [];
            parts[1].split(',').forEach(range=>{
                const axis = range.substring(0,1);
                const index = (axis==='x'?0:axis==='y'?1:2);
                const values = range.substring(2).split('..').map(x=>parseInt(x));
                ranges[index]= {from:values[0],to:values[1]};
            })
            const cuboid: Cuboid = new Cuboid(ranges[0].from,
                                              ranges[0].to,
                                              ranges[1].from,
                                              ranges[1].to,
                                              ranges[2].from,
                                              ranges[2].to,                                         
                                              (parts[0]==='on'?1:0));
            cuboids.push(cuboid)
        })
        return cuboids;
    }

    get width(): number {
        return this.highPoint.x - this.lowPoint.x + 1;
    }
    get height(): number {
        return this.highPoint.y - this.lowPoint.y + 1;
    }
    get depth(): number {
        return this.highPoint.z - this.lowPoint.z + 1;
    }
    get volume(): number {
        return this.width * this.height * this.depth;
    }    

    remainingCuboids(other: Cuboid): Cuboid[] {
        const intersection = this.intersection(other);
        const newCuboids: Cuboid[] = [];
        if (intersection) {
            const xRanges = this.composeRanges(this.lowPoint.x, this.highPoint.x, intersection.lowPoint.x, intersection.highPoint.x);
            const yRanges = this.composeRanges(this.lowPoint.y, this.highPoint.y, intersection.lowPoint.y, intersection.highPoint.y);
            const zRanges = this.composeRanges(this.lowPoint.z, this.highPoint.z, intersection.lowPoint.z, intersection.highPoint.z);
            for (let xRange of xRanges) {
                for (let yRange of yRanges) {
                    for (let zRange of zRanges) {
                        const newCuboid = new Cuboid(xRange[0], xRange[1], yRange[0], yRange[1], zRange[0], zRange[1], 1);
                        if (!newCuboid.overlaps(intersection)) {
                            newCuboids.push(newCuboid);
                        }
                    }        
                }
            }
        }
        return newCuboids;
    }
    overlaps(other: Cuboid): boolean {
        return (this.highPoint.x >= other.lowPoint.x &&
                this.lowPoint.x <= other.highPoint.x &&
                this.highPoint.y >= other.lowPoint.y &&
                this.lowPoint.y <= other.highPoint.y &&
                this.highPoint.z >= other.lowPoint.z &&
                this.lowPoint.z <= other.highPoint.z);
    }

    intersection(other: Cuboid): Cuboid | undefined {
        if (!this.overlaps(other)) return undefined;
        let minX: number = Math.max(this.lowPoint.x, other.lowPoint.x);
        let maxX: number = Math.min(this.highPoint.x, other.highPoint.x);
        let minY: number = Math.max(this.lowPoint.y, other.lowPoint.y);
        let maxY: number = Math.min(this.highPoint.y, other.highPoint.y);
        let minZ: number = Math.max(this.lowPoint.z, other.lowPoint.z);
        let maxZ: number = Math.min(this.highPoint.z, other.highPoint.z);
        return new Cuboid(minX, maxX, minY, maxY, minZ, maxZ, 0);
    }    

    composeRanges(c1: number, c2: number, i1: number, i2: number): any[]{
        const ranges: any[] = [[i1, i2]];
        if (c1<i1) ranges.push([c1, i1-1]);
        if (c2>i2) ranges.push([i2+1, c2]);
        return ranges;
    }

}
