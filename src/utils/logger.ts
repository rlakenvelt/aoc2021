export default class Logger {

    starttime: Date;
    puzzletitle: string;
    testmode = false;

    constructor (title: string, testmode=false) {
        this.puzzletitle = title;
        this.starttime = new Date();
        this.testmode = testmode;
    }  

    start() {
        this.starttime = new Date();
    };

    end (answer: any) {
        const endtime = new Date();
        console.log("---------------------");
        if (this.testmode)
            console.log("TEST");
        console.log("Puzzle   :", this.puzzletitle);
        console.log("Answer   :", answer);
        console.log("Duration :", endtime.getTime() - this.starttime.getTime(), "ms");
        console.log("---------------------");
    };

}