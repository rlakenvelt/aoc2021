
export default class Common {

    static testMode() {
        return process.argv.some(a=>a==="-test");
    }
    static highlight(text: string):string {
        return `\x1b[1m\x1b[31m${text}\x1b[0m`;
    }

}