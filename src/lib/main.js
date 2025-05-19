#!/usr/bin/env node
// src/lib/main.js

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export function main(rawArgs = process.argv.slice(2)) {
  if (rawArgs.includes("--mission")) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const missionPath = path.join(__dirname, "../../MISSION.md");
    try {
      const content = fs.readFileSync(missionPath, "utf-8");
      console.log(content);
    } catch (err) {
      console.error(`Error reading mission file: ${err.message}`);
    }
    return;
  }
  console.log(`Run with: ${JSON.stringify(rawArgs)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
