import { GeneratorSelector, Generator } from "../../common/types";
import inquirer = require("inquirer");
import ReduxThunkGenerator from "./redux-thunk";

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
          ReduxThunkGenerator.getPrompt(),
          // More React-Native generators here.
        ],
      },
    ];
    const promptResult: { generator: Generator } = await inquirer.prompt(
      options
    );
    const generator: Generator = promptResult.generator;
    generator.run();
  }
}
