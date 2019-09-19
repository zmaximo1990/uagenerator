#!/usr/bin/env node

import * as yargonaut from "yargonaut";
import * as yargs from "yargs";
import { DefaultCommand } from "./app/commands/default.command";
import { AddCommand } from "./app/commands/add-command.command";

yargonaut
  .style("blue")
  .style("yellow", "required")
  .helpStyle("green")
  .errorsStyle("red");

// TODO: Check yarn & npx global instalation

yargs
  .command(new DefaultCommand()) // Choose a generator from the UI menu to set up a new project.
  .command(new AddCommand())
  .usage("Usage: $0 [<command>] [options]")
  .strict()
  .alias("v", "version")
  .help("h")
  .alias("h", "help")
  .parse();
