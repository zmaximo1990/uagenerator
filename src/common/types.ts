interface Command {
  command: string | Array<string>;
  describe: string;
  builder: Function;
  handler: Function;
}
