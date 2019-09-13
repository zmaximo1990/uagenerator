import * as fs from "fs"
import * as es from "event-stream";
import * as path from "path"
import * as mkdirp from "mkdirp";
import chalk from "chalk";
import * as _ from "lodash";

export const createDirectory = (directory: string) =>
  new Promise((ok, fail) =>
    mkdirp(directory, (err: any) => (err ? fail(err) : ok()))
  )

export const fileExists = (filePath: string) => fs.existsSync(filePath)

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

export const readFileSync = (filePath: string) => fs.readFileSync(filePath, {encoding: "utf8"});

export const copyFile = (sourcePath: string, destinationaPath: string) => fs.copyFileSync(sourcePath, destinationaPath);

export const insertContent = (filePath: string, delimiter: any) => { // TODO: agregar tipo al delimitador
  // Generate a copy of the target file.
  const fileBackPath = `${filePath}.back`;
  copyFile(filePath, fileBackPath);
  const file = fs.createWriteStream(filePath, {encoding: "utf8"});
  let lineBefore = "null";

  fs.createReadStream(fileBackPath)
  .pipe(es.split())
  .pipe(es.mapSync(
      (line: string) => {
        let newLine = "";
        if (
          _.trim(lineBefore).startsWith(delimiter.before) &&
          _.trim(line).startsWith(delimiter.last)
        ) {
          newLine = `${delimiter.content}\r\n`;
        }
        lineBefore = line; 
        return `${newLine}${line}\r\n`;
      }
  ))
  .pipe(file)
  .end();
  file.close();
}

export const trim = (text: string) => text.replace(/\s/g, "");

export const logError = (message: string) => console.log(chalk.red(message));

export const logWarning = (message: string) => console.log(chalk.yellow(message));

export const logDebug = (message: string) => console.log(chalk.blue(message));

export const logInfo = (message: string) => console.log(chalk.gray(message));

export const logSuccess = (message: string) => console.log(chalk.green(message));

export const logFileCreated = (path: string) => console.log(chalk.yellow("File created: "), chalk.green(path));