import * as fs from 'fs';

export default class InputHelper {

  testmode = false;

  constructor (testmode=false) {
    this.testmode = testmode;
  }    

  getInput (separator = "\n", name=(this.testmode ? "test" : "input")) {
    const file = fs.readFileSync(`./${name}.txt`, "utf-8");
    return file.split(separator).map(x =>x);
  };
  
  getNumericInput (separator = "\n") {
    return this.getInput(separator).map(x => parseInt(x));
  }; 
}