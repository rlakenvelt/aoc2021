import * as fs from 'fs';

export default class InputHelper {

  getInput (name="input", separator = "\n", ) {
    const file = fs.readFileSync(`./${name}.txt`, "utf-8");
    return file.split(separator).map(x =>x);
  };
  
  getNumericInput (name="input", separator = "\n") {
    return this.getInput(name, separator).map(x => parseInt(x));
  }; 
}