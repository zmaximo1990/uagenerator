import * as utils from "../../common/utils";
import * as _ from "lodash";
import * as path from "path";
import { Command, CodeDelimiter } from "../../common/types";

export class AddCommand implements Command {
  public command = "add:command";
  public describe = "Scaffold a new command for uagenerator.";

  public builder(yargs: any) {
    return yargs
      .option("name", {
        alias: "n",
        describe: "Name of the command.",
        demand: true,
      })
      .option("option-group", {
        alias: "og",
        describe: "Option group where the command should be created.",
        default: "app",
      });
  }

  public handler = async (argv: any) => {
    // Change case for command class name to start-case.
    argv.name = utils.pascalCase(argv.name);

    // Scaffold command file into <option-group>/commands folder.
    const createdFileNamePath = this.createFile(argv);

    // Insert code for index the command into yargs.
    const delimiters: CodeDelimiter[] = [
      {
        before: (line: string) =>
          line !== null && _.trim(line).startsWith("import"),
        last: (line: string) => line !== null && line === "",
        code: `import { ${argv.name}Command } from "./${createdFileNamePath}";`,
      },
      {
        before: (line: string) =>
          line !== null && _.trim(line).startsWith(".command"),
        last: (line: string) =>
          line !== null && _.trim(line).startsWith(".usage"),
        code: `  .command(new ${argv.name}Command())`,
      },
    ];

    const targetFilePath = path.join(__dirname, "..", "..", "index.ts");
    utils.insertCode(targetFilePath, delimiters);
    utils.logInfo(`Code inserted into: ${targetFilePath}`);
    utils.logSuccess("Done!");
  }

  private createFile(argv: any): string {
    const commandName = argv.name;
    const outputDir = path.join(
      __dirname,
      "..",
      "..",
      argv.optionGroup,
      "commands"
    );
    const templatePath = path.join(
      __dirname,
      "..",
      "templates",
      "command.template.ejs"
    );
    const content = utils.fillTemplate(templatePath, {
      optionGroup: argv.optionGroup,
      name: commandName,
    });

    const outputFileName = `${_.kebabCase(commandName)}.command.ts`;
    const outputFilePath = path.join(outputDir, outputFileName);
    utils.createFile(outputFilePath, content);
    utils.logFileCreated(outputFilePath);
    return `${argv.optionGroup}/commands/${utils.removeExtensionFileName(
      outputFileName
    )}`;
  }
}
