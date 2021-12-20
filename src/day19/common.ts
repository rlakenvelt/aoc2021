export class Vector {
    x: number;
    y: number;
    z: number;

    constructor(x: number, y: number, z: number) {
        this.x=x;
        this.y=y;
        this.z=z;
    }
    static add(v1: Vector, v2: Vector) {
        return new Vector(v1.x, v1.y, v1.z).add(v2);
    }
    add(v: Vector): Vector {
        this.x+=v.x;
        this.y+=v.y;
        this.z+=v.z;
        return this;
    }    
}

const rotations: ((v: Vector) => Vector)[] = [
    (v) => new Vector(v.x, v.y, v.z),
    (v) => new Vector(v.y, v.z, v.x),
    (v) => new Vector(v.z, v.x, v.y),
    (v) => new Vector(-v.x, v.z, v.y),
    (v) => new Vector(v.z, v.y, -v.x),
    (v) => new Vector(v.y, -v.x, v.z),
    (v) => new Vector(v.x, v.z, -v.y),
    (v) => new Vector(v.z, -v.y, v.x),
    (v) => new Vector(-v.y, v.x, v.z),
    (v) => new Vector(v.x, -v.z, v.y),
    (v) => new Vector(-v.z, v.y, v.x),
    (v) => new Vector(v.y, v.x, -v.z),
    (v) => new Vector(-v.x, -v.y, v.z),
    (v) => new Vector(-v.y, v.z, -v.x),
    (v) => new Vector(v.z, -v.x, -v.y),
    (v) => new Vector(-v.x, v.y, -v.z),
    (v) => new Vector(v.y, -v.z, -v.x),
    (v) => new Vector(-v.z, -v.x, v.y),
    (v) => new Vector(v.x, -v.y, -v.z),
    (v) => new Vector(-v.y, -v.z, v.x),
    (v) => new Vector(-v.z, v.x, -v.y),
    (v) => new Vector(-v.x, -v.z, -v.y),
    (v) => new Vector(-v.z, -v.y, -v.x),
    (v) => new Vector(-v.y, -v.x, -v.z)
];

export class Scanner {
    location: Vector;
    beacons: Vector[];
    ID: number;
    protected rotationIndex = 0;

    constructor(id: number) {
        this.ID = id;
        this.location = new Vector(0,0,0);
        this.beacons = []; 
    }

    get hasMoreRotationa() {
        return (this.rotationIndex<24);
    }  
    reset() {
        this.rotationIndex=0;
    }
    setBeacons(beacons: Vector[]) {
        this.beacons         = beacons.sort((a,b)=>a.x-b.x);
    }
    transform() {
        this.beacons.forEach(b=> {
            b.add(this.location);
        })
    }
    rotate(): Scanner {
        if (!this.hasMoreRotationa) return this;
        const newScanner = new Scanner(this.ID);
        newScanner.rotationIndex = this.rotationIndex;
        newScanner.setBeacons(this.beacons.map(b=>rotations[this.rotationIndex](b)));
        this.rotationIndex++;
        return newScanner;
    }
    clone(): Scanner {
        const newScanner = new Scanner(this.ID);
        newScanner.setBeacons(this.beacons.map(b=>rotations[this.rotationIndex](b)));

        return newScanner;
    }
    matches(scanner: Scanner): boolean {
        let count = 0;
        for (let base1=0; base1<this.beacons.length&&count<12; base1++) {
            for (let base2=11; base2<scanner.beacons.length&&count<12; base2++) {
                count=1;
                const diff = new Vector(this.beacons[base1].x - scanner.beacons[base2].x,
                                        this.beacons[base1].y - scanner.beacons[base2].y,
                                        this.beacons[base1].z - scanner.beacons[base2].z);

                for (let beacon2=0; beacon2<scanner.beacons.length&&count<12; beacon2++) {
                    const matchingBeacon = this.beacons.find(beacon => {
                        return (beacon.x===scanner.beacons[beacon2].x+diff.x &&
                                beacon.y===scanner.beacons[beacon2].y+diff.y &&
                                beacon.z===scanner.beacons[beacon2].z+diff.z);                           
                    });
                    if (matchingBeacon) count++;
                }
                if (count>=12) {
                    scanner.location = Vector.add(diff, this.location);
                }
            }            
        }
        return count>=12;
    }
}