import Common from './common';

export default class Logger {

    starttime: Date;
    puzzletitle: string;
    testmode = false;
    
    constructor (title: string) {
        this.puzzletitle = title;
        this.starttime = new Date();
        this.testmode = Common.testMode();
    }  

    start() {
        this.starttime = new Date();
    };

    end (answer: any) {
        const endtime = new Date();
        console.log("---------------------");
        console.log("Puzzle   :", this.puzzletitle);
        if (this.testmode)
            console.log("Answer   :", answer, Common.highlight('TESTMODE'));
        else    
            console.log("Answer   :", answer);
        console.log("Duration :", endtime.getTime() - this.starttime.getTime(), "ms");
        console.log("---------------------");
    };

}