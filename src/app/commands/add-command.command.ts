import * as path from "path"
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
      .option("og", {
        alias: "option-group",
        describe: "Tech module where the command should be created."
      })
  }

  public handler = async (argv: any) => {
    // Change case for command class name to start-case.
    argv.name = _.startCase(argv.name).replace(/\s/g, "");

    // Scaffold command file into <option-group>/commands folder.
    this.createFile(argv);

    // Insert code for index the command into yargs.
    // TODO: agregar forEach para cada linea de codigo a insertar
    utils.insertContent(
      `${__dirname}/../../index.ts`,
      {
        before: ".command",
        last: `  .usage`,
        content: `  .command(new ${argv.name}Command())`
      }
    );

    utils.logSuccess("Done!");
  }

  private createFile(argv: any) {
    const commandName = argv.name;
    const outputDir = "option-group" in argv ? `${__dirname}/../../${argv.optionGroup}/commands/` : `${__dirname}/`;
    const templatePath = utils.readFileSync(`${__dirname}/../templates/command.template.ejs`);
    const template = _.template(templatePath);
    const content = template({ 'name': commandName });
    const outputFile = `${outputDir}${_.kebabCase(commandName)}.command.ts`;
    utils.createFile(outputFile, content);
    utils.logFileCreated(outputFile);
  }
}
