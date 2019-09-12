#!/usr/bin/env node

import chalk from "chalk";
var inquirer = require('inquirer');

class TechOption {

  static getPrompt() {
    return {
      name: "React Native",
      value: new GeneratorSelector()
    }
  }

  print() {
    console.log(chalk.green("Generator Selector: Hello world!"));
  }
}

class Generator {

}

class GeneratorSelector {
  print() {
    console.log(chalk.blue("Sub Generator Selector: Hello world!"));
  }

  getPrompt() {
    return [
      {
        name: "generator",
        message: "What would you like to generate?",
        type: "list",
        choices: [
          {
            name: "Boilerplate redux-thunk project",
            value: new Generator()
          },
          {
            name: "Landing page",
            value: new Generator()
          }
        ]
      }
    ];
  }
}

const techsOptions = [
  {
    name: "tech",
    message: "Which tech would you like to choose?",
    type: "list",
    choices: [
      TechOption.getPrompt(),
      {
        name: "Angular",
        value: "angular"
      }
    ]
  }
];

(async () => {
  const techResult = await inquirer.prompt(techsOptions)
  const tech = techResult.tech;
  tech.print();
  const generatorResult = await inquirer.prompt(tech.getPrompt());
})()