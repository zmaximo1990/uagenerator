export interface Command {
  command: string | Array<string>;
  describe: string;
  builder: Function;
  handler: Function;
}

export interface CodeDelimiter {
  before: Function;
  last: Function;
  code: string;
}

export class GeneratorSelector {
  static getPrompt: Function;
  prompt: Function;
}

export class Generator {
  static getPrompt: Function;
  run: Function;
  prompt: Function;
}
