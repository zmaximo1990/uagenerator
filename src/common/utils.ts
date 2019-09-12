import * as fs from "fs"
import * as path from "path"
import * as mkdirp from "mkdirp";
import chalk from "chalk";

export const createDirectory = (directory: string) =>
  new Promise((ok, fail) =>
    mkdirp(directory, (err: any) => (err ? fail(err) : ok()))
  )

export const fileExists = async (filePath: string) => fs.existsSync(filePath)

export const createFile = async (
  filePath: string,
  content: string,
  override: boolean = true
) => {
  await createDirectory(path.dirname(filePath))
  return new Promise<void>((ok, fail) => {
    if (override === false && fs.existsSync(filePath)) return ok()

    fs.writeFile(filePath, content, err => (err ? fail(err) : ok()))
  })
}

export const readFile = async (filePath: string) =>
  new Promise<string>((ok, fail) => {
    fs.readFile(
      filePath,
      (err, data) => (err ? fail(err) : ok(data.toString()))
    )
  })

export const readFileSync = (filePath: string) => fs.readFileSync(filePath, "utf8");

export const logError = (message: string) => console.log(chalk.red(message));

export const logWarning = (message: string) => console.log(chalk.yellow(message));

export const logDebug = (message: string) => console.log(chalk.blue(message));

export const logSuccess = (message: string) => console.log(chalk.green(message));