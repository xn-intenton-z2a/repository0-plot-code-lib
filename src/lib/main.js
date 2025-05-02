#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import { z } from "zod";

function parseArgs(args) {
  const params = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = args[i + 1];
      if (next && !next.startsWith("--")) {
        params[key] = next;
        i++;
      } else {
        params[key] = true;
      }
    }
  }
  return params;
}

export function main(args = []) {
  const cliArgs = parseArgs(args.length ? args : process.argv.slice(2));

  const cliSchema = z.object({
    expression: z.string().nonempty("The --expression parameter is required"),
    range: z
      .string()
      .nonempty("The --range parameter is required")
      .regex(
        /^(?:[a-z]+=[-]?\d+:[-]?\d+)(?:,[a-z]+=[-]?\d+:[-]?\d+)*$/,
        "The --range parameter format is invalid. Expected format e.g. x=-10:10,y=-1:1"
      ),
    file: z.string().nonempty("The --file parameter is required")
  });

  try {
    const params = cliSchema.parse(cliArgs);
    console.log("Plot generation simulated:");
    console.log(`Expression: ${params.expression}`);
    console.log(`Range: ${params.range}`);
    console.log(`Output file: ${params.file}`);
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error("Error:", err.errors.map(e => e.message).join("; "));
    } else {
      console.error("Unexpected error occurred");
    }
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
