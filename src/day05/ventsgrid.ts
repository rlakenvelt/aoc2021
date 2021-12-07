import {Grid} from '../utils/grid';

export class VentsGrid extends Grid
{
    countOverlapping() {
        return this.points.reduce((total, row) => {
            row.forEach(point=> {
                if (point>1) total++;
            })
            return total;
        }, 0);        
    }    
}
