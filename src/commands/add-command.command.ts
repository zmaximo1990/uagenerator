import { pascalCase, paramCase } from "change-case"
import * as path from "path"
import * as utils from "./utils"

export class AddCommand implements Command {
  command = "add:command"
  describe = "Scaffold a new command for uagenerator (this generator)."

  builder(yargs: any) {
    
  }

  handler = async (argv: any) => {

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
