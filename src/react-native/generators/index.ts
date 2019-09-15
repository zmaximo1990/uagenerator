import { GeneratorSelector, Generator } from "../../common/types";
import inquirer = require("inquirer");
import BoilerplateReduxThunkGenerator from "./boilerplate-redux-thunk";

export default class ReactNativeGeneratorSelector implements GeneratorSelector {
  static getPrompt() {
    return {
      name: "React Native",
      value: new ReactNativeGeneratorSelector(),
    };
  }

  async prompt() {
    const options = [
      {
        name: "generator",
        message: "What would you like to generate?",
        type: "list",
        choices: [
          BoilerplateReduxThunkGenerator.getPrompt(),
          {
            name: "Landing page",
            value: {},
          },
        ],
      },
    ];
    const promptResult: { generator: Generator } = await inquirer.prompt(
      options
    );
    const generator: Generator = promptResult.generator;
    generator.prompt();
  }
}
