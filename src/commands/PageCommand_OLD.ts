import { pascalCase, paramCase, titleCase } from "change-case"
import * as path from "path"
import * as utils from "./utils"
import { featureModuleTemplate } from "../templates/feature"
import {
  pageModuleTemplate,
  pageComponentTemplate,
  pageHtmlTemplate,
  pageScssTemplate
} from "../templates/page"

export class PageCommand {
  command = "generate:page"
  describe = "Creates a new ionic page."

  builder(yargs: any) {
    return yargs
      .option("n", {
        alias: "name",
        describe: "Name of the page.",
        demand: true
      })
      .option("f", {
        alias: "feature",
        describe: "Feature where the page should be created."
      })
      .option("p", {
        alias: "path",
        describe: "Feature's sub-path where the page should be created.",
        default: ""
      })
      .option("d", {
        alias: "dir",
        describe: "Directory where the page should be created.",
        default: "./src"
      })
  }

  handler = async (argv: any) => {
    let directory = argv.dir

    const feature = argv.feature
    if (feature)
      directory = path.join(directory, "features", feature, argv.path)

    const name = pascalCase(argv.name)
    const selector = paramCase(name)

    await this.createModule(directory, name, selector)
    await this.createPage(directory, name, selector)
  }

  private async createModule(directory, name, selector) {
    return utils.createFile(
      this.getModulePath(directory, selector),
      pageModuleTemplate(name, selector)
    )
  }

  private async createPage(directory, name, selector) {
    await utils.createFile(
      this.getPath(directory, selector, `${selector}.ts`),
      pageComponentTemplate(name, selector)
    )
    await utils.createFile(
      this.getPath(directory, selector, `${selector}.html`),
      pageHtmlTemplate(titleCase(name))
    )
    await utils.createFile(
      this.getPath(directory, selector, `${selector}.scss`),
      pageScssTemplate(name)
    )
  }

  private getModulePath(directory, page) {
    return this.getPath(directory, page, `${page}.module.ts`)
  }

  private getPath(directory, page, file) {
    return path.join(directory, "pages", page, file)
  }
}
