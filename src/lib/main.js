#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import process from "process";
import { parseArguments } from "./cliParser.js";

export function main(args) {
  try {
    const { action } = parseArguments(args);
    action();
  } catch (error) {
    console.error(error.message);
    process.exit(error.code || 1);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
