interface Command {
  command: string | Array<string>;
  describe: string;
  builder: Function;
  handler: Function;
}

interface CodeDelimiter {
  before: Function;
  last: Function;
  code: string;
}
