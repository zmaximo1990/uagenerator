import { Generator } from "../../../common/types";

export default class BoilerplateReduxThunkGenerator implements Generator {
  static getPrompt() {
    return {
      name: "Boilerplate Redux Thunk Generator project",
      value: new BoilerplateReduxThunkGenerator(),
    };
  }

  prompt() {
    this.run();
  }

  run() {
    console.log("Boilerplate Redux Thunk Generator works :)!");
  }
}
