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










//______________________________________________________________

/*#!/usr/bin/env node

import * as yargonaut from "yargonaut"
import * as yargs from "yargs"
import { DefaultCommand } from "./app/commands/default.command";
import { AddCommand } from "./app/commands/add-command.command";

yargonaut
  .style("blue")
  .style("yellow", "required")
  .helpStyle("green")
  .errorsStyle("red")

yargs
  .command(new DefaultCommand())
  .command(new AddCommand())
  .usage("Usage: $0 [<command>] [options]")
  .strict()
  .alias("v", "version")
  .help("h")
  .alias("h", "help")
  .parse()*/