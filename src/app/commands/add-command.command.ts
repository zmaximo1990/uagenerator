import * as utils from "../../common/utils"
import * as _ from "lodash";

export class AddCommand implements Command {
  public command = "add:command"
  public describe = "Scaffold a new command for uagenerator."

  public builder(yargs: any) {
    return yargs
      .option("name", {
        alias: "n",
        describe: "Name of the command.",
        demand: true
      })
      .option("option-group", {
        alias: "og",
        describe: "Option group where the command should be created.",
        default: "app"
      })
  }

  public handler = async (argv: any) => {
    // Change case for command class name to start-case.
    argv.name = utils.trim(_.startCase(argv.name));

    // Scaffold command file into <option-group>/commands folder.
    let createdFileNamePath = this.createFile(argv);

    // Insert code for index the command into yargs.
    const delimiters = [
      {
        before: (line: string) => line !== null && _.trim(line).startsWith("import"),
        last: (line: string) => line !== null && line === "",
        code: `import { ${argv.name}Command } from "./${createdFileNamePath}";` // TODO: calcular el path relativo a index.ts
      },
      {
        before: (line: string) => line !== null && _.trim(line).startsWith(".command"),
        last: (line: string) => line !== null && _.trim(line).startsWith(".usage"),
        code: `  .command(new ${argv.name}Command())`
      }
    ];
    const targetFilePath = `${__dirname}/../../index.ts`;
    utils.insertCode(targetFilePath, delimiters);
    utils.logInfo(`Code inserted into: ${targetFilePath}`);

    utils.logSuccess("Done!");
  }

  private createFile(argv: any): string {
    const commandName = argv.name;
    const outputDir = `${__dirname}/../../${argv.optionGroup}/commands/`;
    const templatePath = utils.readFileSync(`${__dirname}/../templates/command.template.ejs`);
    const template = _.template(templatePath);
    const content = template({ 'name': commandName });
    const outputFileName = `${_.kebabCase(commandName)}.command.ts`;
    const outputFilePath = `${outputDir}${outputFileName}`;
    utils.createFile(outputFilePath, content);
    utils.logFileCreated(outputFilePath);
    return `${argv.optionGroup}/commands/${utils.removeExtensionFileName(outputFileName)}`;
  }
}
