import * as fs from 'fs';
import Common from './common';

export default class InputHelper {

  testmode = false;

  constructor () {
    this.testmode = Common.testMode();
  }    

  getInput (separator = "\n", name=(this.testmode ? "test" : "input")) {
    const file = fs.readFileSync(`./${name}.txt`, "utf-8");
    return file.split(separator).map(x =>x);
  };
  
  getNumericInput (separator = "\n") {
    return this.getInput(separator).map(x => parseInt(x));
  }; 
}