#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import { z } from "zod";

// Function to convert CLI arguments array to an object mapping flags to values
function parseCliArgs(args) {
  const parsed = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--")) {
      const key = args[i].substring(2);
      if (i + 1 < args.length && !args[i + 1].startsWith("--")) {
        parsed[key] = args[i + 1];
        i++;
      } else {
        parsed[key] = true;
      }
    }
  }
  return parsed;
}

// Define the CLI schema using zod
const cliSchema = z.object({
  expression: z.string().min(1, { message: "Expression is required and cannot be empty" }),
  range: z.string().regex(/^([xy]=-?\d+:\-?\d+)(,([xy]=-?\d+:\-?\d+))*$/, { message: "Range must be in the format 'x=start:end,y=start:end'" }),
  file: z.string().regex(/\.(svg|png)$/, { message: "File must end with .svg or .png" })
});

export function main(args = []) {
  if (args.includes("--help")) {
    console.log("Usage: node src/lib/main.js --expression <exp> --range <range> --file <filepath>");
    return;
  }
  if (args.length === 0) {
    console.log("No arguments provided. Use --help to see usage instructions.");
    return;
  }

  const parsedArgs = parseCliArgs(args);
  const result = cliSchema.safeParse(parsedArgs);
  if (!result.success) {
    console.error("Error: Invalid arguments.");
    result.error.errors.forEach(err => {
      console.error(err.message);
    });
    process.exit(1);
  }

  // Arguments are valid; placeholder for further processing
  console.log(`Validated arguments: ${JSON.stringify(result.data)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
