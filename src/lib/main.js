#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import minimist from 'minimist';

/**
 * Main CLI entrypoint with mission and help flags.
 * @param {string[]} args CLI arguments (excluding node and script path)
 */
export function main(args = process.argv.slice(2)) {
  const options = minimist(args, {
    boolean: ['mission', 'help'],
    alias: { m: 'mission', h: 'help' }
  });

  if (options.mission) {
    // Print mission statement
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const missionPath = path.resolve(__dirname, '../../MISSION.md');
    let missionText;
    try {
      missionText = fs.readFileSync(missionPath, 'utf8');
    } catch (err) {
      console.error(`Error: Unable to read mission statement: ${err.message}`);
      process.exit(1);
    }
    console.log(missionText);
    process.exit(0);
  }

  if (options.help) {
    // Print mission + help
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const missionPath = path.resolve(__dirname, '../../MISSION.md');
    let missionText;
    try {
      missionText = fs.readFileSync(missionPath, 'utf8');
    } catch (err) {
      console.error(`Error: Unable to read mission statement: ${err.message}`);
      process.exit(1);
    }
    console.log(missionText);
    console.log(`Usage: node ${process.argv[1]} [options]`);
    console.log('');
    console.log('Options:');
    console.log('  --mission, -m           Show mission statement');
    console.log('  --help, -h              Show help');
    console.log('  --expression, -e        Expression in form y=<expr>');
    console.log('  --range, -r             Range in form x=start:end:step');
    console.log('  --format, -f            Output format: json (default) or csv');
    console.log('  --plot-format, -p       Plot format: svg or png');
    console.log('  --file, -o              Output file path');
    console.log('  --width, -w             Plot width in pixels (default 800)');
    console.log('  --height, -H            Plot height in pixels (default 600)');
    console.log('  --parametric, -P        Parametric expressions x=<expr>,y=<expr>');
    process.exit(0);
  }

  // Default stub behavior
  console.log(`Run with: ${JSON.stringify(args)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
