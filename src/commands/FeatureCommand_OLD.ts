import { pascalCase, paramCase } from "change-case"
import * as path from "path"
import * as utils from "./utils"
import { featureModuleTemplate } from "../templates/feature"

export class FeatureCommand {
  command = "generate:feature"
  describe = "Creates a new feature."

  builder(yargs: any) {
    return yargs
      .option("n", {
        alias: "name",
        describe: "Name of the feature.",
        demand: true
      })
      .option("d", {
        alias: "dir",
        describe: "Directory where the feature should be created.",
        default: "./src"
      })
  }

  handler = async (argv: any) => {
    const directory = argv.dir

    const name = pascalCase(argv.name)
    const selector = paramCase(name)

    await this.createFolders(directory, selector)
    await this.createModule(directory, name, selector)
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
