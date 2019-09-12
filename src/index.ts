#!/usr/bin/env node

import * as yargonaut from "yargonaut"
import * as yargs from "yargs"
import { DefaultCommand } from "./commands/default.command";
import { AddCommand } from "./commands/add-command.command";

yargonaut
  .style("blue")
  .style("yellow", "required")
  .helpStyle("green")
  .errorsStyle("red")

yargs
  .usage("Usage: $0 [<command>] [options]")
  .command(new DefaultCommand())
  .command(new AddCommand())
  .strict()
  .alias("v", "version")
  .help("h")
  .alias("h", "help")
  .parse()
