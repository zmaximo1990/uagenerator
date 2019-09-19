import { Generator } from "../../../common/types";
import * as utils from "../../../common/utils";
import inquirer = require("inquirer");
import { ReactNativeConstantes } from "../../commons/constants";
import * as shell from "shelljs";
import * as editJsonFile from "edit-json-file";
import { exists } from "fs";

export default class ReduxThunkGenerator implements Generator {
  static getPrompt() {
    return {
      name: "Boilerplate Redux Thunk generator project",
      value: new ReduxThunkGenerator(),
    };
  }

  async run() {
    console.log("Boilerplate Redux Thunk Generator works :)!");

    // TODO: 1. Prompt
    /* Project: name, version, repo, web
        Author: name, contact email, web
        Others: - ask what navigation library to use?
                - ask auth flow?
                - ask for use Android Hermes?
                - ask for use TS insted JS? (for now its True always)
                - etc.
    */
    const promptResult: any = await this.prompt();
    console.log(promptResult);

    // TODO: 2. Check & Run "react-native" command
    const rnCommand = shell.which("react-native");
    if (!rnCommand) {
      utils.logInfo("You don't have 'react-native' installed on your system. Installing it globally...");
      shell.exec(`yarn global add react-native`);
    } else {
      shell.exec(`yarn global upgrade react-native`);
    }

    const template = promptResult.useTypeScript ? "--template react-native-template-typescript@next" : "";
    shell.exec(`react-native init ${promptResult.projectName} ${template}`);
    shell.cd(promptResult.projectName);

    // TODO: 3. Modify files => package.json: dependencies and project properties asked before
    shell.exec("yarn add react-navigation react-navigation-stack react-navigation-tabs react-native-gesture-handler");
    shell.exec("yarn add react-redux redux redux-thunk");
    shell.exec("yarn add typesafe-actions reselect re-reselect");
    shell.exec("yarn add husky lint-staged pretty pretty-quick tslint eslint --dev");

    const jsonFile = editJsonFile("package.json");
    jsonFile.set("repository", {
      "type": promptResult.projectRepoType,
      "url": promptResult.projectRepo
    });
    jsonFile.set("author", `${promptResult.authorName} <${promptResult.authorEmail}> (${promptResult.authorHomePage})`);
    jsonFile.set("homepage", promptResult.projectHomePage);
    jsonFile.set("husky", {
      "hooks": {
        "pre-commit": "lint-staged"
      }
    });
    jsonFile.set("lint-staged", {
      "src/**/*.{js,jsx}": [
        "npx prettier --write",
        "npx eslint --fix",
        "git add ."
      ],
      "src/**/*.{ts,tsx}": [
        "npx prettier --write",
        "npx tslint --fix",
        "git add ."
      ],
      "src/**/*.{yml,json,css,scss}": [
        "npx prettier --write",
        "git add ."
      ]
    });
    // TODO: add styleslint ?
    jsonFile.save();

    // TODO: 4. Overwritte files => index.js, src/, prettier file, tslint file, .gitignore

    // TODO: 5. Run prettier && init Git repo

    utils.logSuccess("Project generated :D! 🎉");
  }

  async prompt() {
    let prompts = [];

    // About the project
    prompts = prompts.concat(this.getPromptsAboutTheProject());

    // About the author
    prompts = prompts.concat(this.getPromptsAboutTheAuthor());

    // About the project's configs
    prompts = prompts.concat(this.getPromptsAboutProjectConfigs());

    return await inquirer.prompt(prompts);
  }

  private getPromptsAboutTheProject() {
    return [
      {
        name: "projectName",
        message: "What is the project's name?",
        type: "text"
      },
      {
        name: "projectVersion",
        message: "What is the project's version (semver)?",
        type: "text",
        default: "1.0.0"
      },
      {
        name: "projectRepoType",
        message: "What kind of repository would use for this project?",
        type: "text",
        default: "git"
      },
      {
        name: "projectRepo",
        message: "What is the url of the project's repository?",
        type: "text"
      },
      {
        name: "projectHomePage",
        message: "What is the home page of the project?",
        type: "text"
      }
    ];
  }

  private getPromptsAboutTheAuthor() {
    return [
      {
        name: "authorName",
        message: "What is the author's complete name?",
        type: "text"
      },
      {
        name: "authorEmail",
        message: "What is the author's email?",
        type: "text"
      },
      {
        name: "authorHomePage",
        message: "What is the author's home page?",
        type: "text"
      }
    ];
  }

  private getPromptsAboutProjectConfigs() {
    return [
      {
        name: "navigationLib",
        message: "What navigation library would like to use?",
        type: "list",
        choices: [
          {
            name: "React Navigation",
            value: ReactNativeConstantes.REACT_NAVIGATION
          }
        ],
      },
      {
        name: "useAndroidHermes",
        message: "Would you like to use Hermes for Android?",
        type: "confirm"
      },
      {
        name: "useTypeScript",
        message: "Would you like to use TypeScript?",
        type: "confirm"
      }
    ];
  }
}
