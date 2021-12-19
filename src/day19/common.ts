export class Beacon {
    x: number;
    y: number;
    z: number;

    constructor(x: number, y: number, z: number) {
        this.x=x;
        this.y=y;
        this.z=z;
    }
}

export class Scanner {
    location: Beacon;
    beacons: Beacon[];
    ID: number;
    protected rotationIndex = 0;
    private rotations: ((v: Beacon) => Beacon)[] = [
        (v) => new Beacon(v.x, v.y, v.z),
        (v) => new Beacon(v.y, v.z, v.x),
        (v) => new Beacon(v.z, v.x, v.y),
        (v) => new Beacon(-v.x, v.z, v.y),
        (v) => new Beacon(v.z, v.y, -v.x),
        (v) => new Beacon(v.y, -v.x, v.z),
        (v) => new Beacon(v.x, v.z, -v.y),
        (v) => new Beacon(v.z, -v.y, v.x),
        (v) => new Beacon(-v.y, v.x, v.z),
        (v) => new Beacon(v.x, -v.z, v.y),
        (v) => new Beacon(-v.z, v.y, v.x),
        (v) => new Beacon(v.y, v.x, -v.z),
        (v) => new Beacon(-v.x, -v.y, v.z),
        (v) => new Beacon(-v.y, v.z, -v.x),
        (v) => new Beacon(v.z, -v.x, -v.y),
        (v) => new Beacon(-v.x, v.y, -v.z),
        (v) => new Beacon(v.y, -v.z, -v.x),
        (v) => new Beacon(-v.z, -v.x, v.y),
        (v) => new Beacon(v.x, -v.y, -v.z),
        (v) => new Beacon(-v.y, -v.z, v.x),
        (v) => new Beacon(-v.z, v.x, -v.y),
        (v) => new Beacon(-v.x, -v.z, -v.y),
        (v) => new Beacon(-v.z, -v.y, -v.x),
        (v) => new Beacon(-v.y, -v.x, -v.z)
    ];

    constructor(id: number) {
        this.ID = id;
        this.location = new Beacon(0,0,0);
        this.beacons = []; 
    }

    get noMoreRotations() {
        return (this.rotationIndex>=24);
    }  
    reset() {
        this.rotationIndex=0;
    }
    setBeacons(beacons: Beacon[]) {
        this.beacons         = beacons.sort((a,b)=>a.x-b.x);
    }
    transform() {
        this.beacons.forEach(b=> {
            b.x+=this.location.x;
            b.y+=this.location.y;
            b.z+=this.location.z;
        })
    }
    rotate(): Scanner {
        if (this.noMoreRotations) return this;
        const newScanner = new Scanner(this.ID);
        newScanner.rotationIndex = this.rotationIndex;
        newScanner.setBeacons(this.beacons.map(b=>this.rotations[this.rotationIndex](b)));
        this.rotationIndex++;
        return newScanner;
    }
    matches(scanner: Scanner): boolean {
        // console.log('TRY', this.ID, '->', scanner.ID, scanner.rotationIndex);
        let count = 0;
        for (let base1=0; base1<this.beacons.length&&count<12; base1++) {
            for (let base2=0; base2<scanner.beacons.length&&count<12; base2++) {
                count=1;
                const diffX = this.beacons[base1].x - scanner.beacons[base2].x;
                const diffY = this.beacons[base1].y - scanner.beacons[base2].y;
                const diffZ = this.beacons[base1].z - scanner.beacons[base2].z;

                for (let beacon2=0; beacon2<scanner.beacons.length&&count<12; beacon2++) {
                    const matchingBeacon = this.beacons.find(beacon => {
                        return (beacon.x===scanner.beacons[beacon2].x+diffX &&
                                beacon.y===scanner.beacons[beacon2].y+diffY &&
                                beacon.z===scanner.beacons[beacon2].z+diffZ);                           
                    });
                    if (matchingBeacon) count++;
                }
                if (count>=12) {
                    scanner.location.x = diffX + this.location.x;
                    scanner.location.y = diffY + this.location.y;
                    scanner.location.z = diffZ + this.location.z;
                }
            }            
        }
        return count>=12;
    }
}