export default class Compiler {
    private program: string = '';
    private bracketStack: string[] = [];
    // Error 1: Invalid closing bracket
    // Error 2: Missing closing brackets
    private errorNmbr: number = 0;
    private errorTxt: string = '';


    private pairs: any = [
        {open: '(', close: ')'},
        {open: '[', close: ']'},
        {open: '{', close: '}'},
        {open: '<', close: '>'}
    ]    

    constructor(program: string) {
        this.program = program;
    }
    loadProgram(program: string) {
        this.program = program;
    }
    get errorNumber(): number {
        return this.errorNmbr;
    }
    get errorText(): string {
        return this.errorTxt;
    }

    compile() {
        const brackets = this.program.split('');
        this.bracketStack = [];
        this.errorNmbr = 0;
        this.errorTxt = '';
        for (let i = 0; i< brackets.length; i++) {
            const bracket = brackets[i];
            if (this.isOpenBracket(bracket)) {
                this.bracketStack.unshift(bracket);
            } else {
                if (!this.isValidClosingBracket(bracket)) {
                    this.errorNmbr = 1;
                    this.errorTxt = bracket;
                    break;
                }
                this.bracketStack.shift();
            }
        }
        if (this.bracketStack.length>0&&this.errorNmbr===0) {
            this.errorNmbr = 2;
            this.errorTxt  = this.bracketStack.join('');
        }
    }
    private isOpenBracket(bracket: string) {
        const pair = this.pairs.find((p: any)=>p.open===bracket);
        return (pair?true:false);
    }
    private isValidClosingBracket(bracket: string) {
        const pair = this.pairs.find((p: any)=>p.close===bracket);
        if (!pair) return false;
        return (this.bracketStack[0] === pair.open);
    }

}