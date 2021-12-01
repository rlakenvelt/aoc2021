export default class Logger {

    starttime: Date;
    puzzletitle: string;

    constructor (title: string) {
        this.puzzletitle = title;
        this.starttime = new Date();
    }  

    start() {
        this.starttime = new Date();
    };

    end (answer: any) {
        const endtime = new Date();
        console.log("---------------------");
        console.log("Puzzle   :", this.puzzletitle);
        console.log("Answer   :", answer);
        console.log("Duration :", endtime.getTime() - this.starttime.getTime(), "ms");
        console.log("---------------------");
    };

}