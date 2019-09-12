import * as path from "path"
import * as utils from "../../common/utils"
import * as inquirer from "inquirer";

export class DefaultCommand implements Command {
  command = "*"
  describe = "Choose a generator from the UI menu to set up a new project."

  builder(yargs: any) {
    
  }

  handler = async (argv: any) => {
    class TechOption {

      static getPrompt() {
        return {
          name: "React Native",
          value: new GeneratorSelector()
        }
      }

      print() {
        utils.logDebug("Generator Selector: Hello world!");
      }
    }

    class Generator {

    }

    class GeneratorSelector {
      print() {
        utils.logDebug("Sub Generator Selector: Hello world!");
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

    const techResult = await inquirer.prompt(techsOptions)
    const tech = techResult.tech;
    tech.print();
    const generatorResult = await inquirer.prompt(tech.getPrompt());

    /*const directory = argv.dir

    const name = pascalCase(argv.name)
    const selector = paramCase(name)

    await this.createFolders(directory, selector)
    await this.createModule(directory, name, selector)*/
  }

  private async createFolders(directory, name) {
    const folders = ["assets", "components", "models", "services", "pages"]

    for (const folder of folders) {
      await utils.createDirectories(this.getPath(directory, name, folder))
    }
  }

  private async createModule(directory, name, selector) {
    return utils.createFile(
      this.getModulePath(directory, selector),
      featureModuleTemplate(name)
    )
  }

  private getModulePath(directory, name) {
    return this.getPath(directory, name, `${name}.module.ts`)
  }

  private getPath(directory, feature, name) {
    return path.join(directory, "features", feature, name)
  }
}
