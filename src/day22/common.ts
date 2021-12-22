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

    split(other: Cuboid): Cuboid[] {
        const intersection = this.intersection(other);
        return [];
    }
    overlaps(other: Cuboid): boolean {
        return (this.highPoint.x > other.lowPoint.x &&
                this.lowPoint.x < other.highPoint.x &&
                this.highPoint.y > other.lowPoint.y &&
                this.lowPoint.y < other.highPoint.y &&
                this.highPoint.z > other.lowPoint.z &&
                this.lowPoint.z < other.highPoint.z);
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
  
}