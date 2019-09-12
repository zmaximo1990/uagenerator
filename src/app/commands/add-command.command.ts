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
      .option("t", {
        alias: "tech",
        describe: "Tech module where the command should be created."
      })
  }

  public handler = async (argv: any) => {
    // 1. crear comando .ts en app/commands
    this.createFile(argv);

    // 2. Agregar comando en yargs index.ts
  }

  private async createFile(argv: any) {
    const commandName = argv.name;
    const techDir = argv.tech ? `${__dirname}/../${argv.tech}/commands` : `${__dirname}/`;

    //TODO: verificar si existe

    const file = utils.readFileSync(`${__dirname}/../templates/command.template.ejs`);
    const template = _.template(file);
    const content = template({ 'name': commandName });
    utils.createFile(`${techDir}${_.kebabCase(commandName)}.command.ts`, content);
  }
}
