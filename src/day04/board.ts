
class BoardNumber {
    number: number;
    drawn: boolean;

    constructor(number: number) {
        this.number = number;
        this.drawn  = false;
    }
}

export default class Board {
    board: BoardNumber[][];
    score: number = 0;

    constructor(numbers: string) {
        this.board = numbers.split('\n')
                            .map(x=>x.split(' ')
                            .filter(x=>x!=='')
                            .map(x=> {
                                const number = new BoardNumber(parseInt(x));
                                return number;
                            }))

    }

    draw(value:number) {
        for (let y=0; y<this.board.length; y++) {
            for (let x=0; x<this.board[y].length; x++) {
                if (this.board[y][x].number === value) this.board[y][x].drawn=true;
            }
        }
        this.calculateScore();
    }

    display() {
        console.log('SCORE', this.score, '\n');
        for (let i = 0; i < this.board.length; i++) {
            console.log(this.board[i].map(x => {
                                        if (x.drawn) {
                                            return "\x1b[1m\x1b[31m" + x.number.toString().padStart(2) + "\x1b[0m";
                                        } else {
                                            return x.number.toString().padStart(2);
                                        }
                                    })
                                    .join(' '));
        }
    }    

    private calculateScore() {
        let rows = Array(this.board.length).fill(0);
        let cols = Array(this.board[0].length).fill(0);
        let score = 0;
        for (let y=0; y<this.board.length; y++) {
            for (let x=0; x<this.board[y].length; x++) {
                if (this.board[y][x].drawn) {
                    rows[y]++;
                    cols[x]++;
                } else {
                    score+=this.board[y][x].number;
                }
            }
        }
        if (rows.some(r=>r>=this.board.length)) {
            this.score = score;
        } else 
        if (cols.some(c=>c>=this.board[0].length)) {
            this.score = score;
        }
    }
}