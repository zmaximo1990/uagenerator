import * as inquirer from "inquirer";
import { Command, GeneratorSelector } from "../../common/types";
import ReactNativeGeneratorSelector from "../../react-native/generators";

export class DefaultCommand implements Command {
  command = ["*", "menu"];
  describe = "Choose a generator from the UI menu to set up a new project.";

  builder(yargs: any) {}

  handler = async (argv: any) => {
    const options = [
      {
        name: "optionGroup",
        message: "Which language/framework would you like to choose?",
        type: "list",
        choices: [
          ReactNativeGeneratorSelector.getPrompt(),
          // More Languages/Frameworks options here.
        ],
      },
    ];

    const promptResult: {
      optionGroup: GeneratorSelector;
    } = await inquirer.prompt(options);
    const generatorSelector: GeneratorSelector = promptResult.optionGroup;
    generatorSelector.prompt();
  }
}
