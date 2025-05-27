#!/usr/bin/env node
// src/lib/main.js

import fs from 'fs';
import { fileURLToPath } from 'url';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { compile } from 'mathjs';

/**
 * Generate a series of {x, y} points from an expression and range.
 * @param {{ expression: string, range: string }} options
 * @returns {{ x: number, y: number }[]}
 */
export function main(options) {
  // Allow calling main() without arguments for default CLI entry
  if (arguments.length === 0) {
    return;
  }
  if (!options || typeof options !== 'object') {
    throw new Error('Options must be an object');
  }
  const { expression, range } = options;
  if (!expression) {
    throw new Error('Missing expression');
  }
  if (!range) {
    throw new Error('Missing range');
  }

  // Strip optional 'y=' prefix
  const exprStr = expression.startsWith('y=') ? expression.slice(2) : expression;
  let expr;
  try {
    expr = compile(exprStr);
  } catch (err) {
    throw new Error('Invalid expression');
  }

  // Parse range: must be in form x=<start>:<end>:<step>
  if (!range.startsWith('x=')) {
    throw new Error('Invalid range');
  }
  const parts = range.slice(2).split(':');
  if (parts.length !== 3) {
    throw new Error('Invalid range');
  }
  const start = parseFloat(parts[0]);
  const end = parseFloat(parts[1]);
  const step = parseFloat(parts[2]);
  if (isNaN(start) || isNaN(end) || isNaN(step) || step <= 0 || start > end) {
    throw new Error('Invalid range');
  }

  const data = [];
  for (let x = start; x <= end + 1e-12; x += step) {
    let y;
    try {
      y = expr.evaluate({ x });
    } catch (err) {
      throw new Error('Invalid expression');
    }
    data.push({ x, y });
  }
  return data;
}

function runCLI() {
  const argv = yargs(hideBin(process.argv))
    .usage('Usage: $0 -e <expression> -r <range> [options]')
    .option('expression', {
      alias: 'e',
      type: 'string',
      describe: 'Formula y=<expression> or <expression>',
      demandOption: true,
    })
    .option('range', {
      alias: 'r',
      type: 'string',
      describe: 'Range x=<start>:<end>:<step>',
      demandOption: true,
    })
    .option('format', {
      alias: 'f',
      type: 'string',
      describe: 'Output format: json or csv',
      default: 'json',
      choices: ['json', 'csv'],
    })
    .option('output', {
      alias: 'o',
      type: 'string',
      describe: 'Output file; stdout if omitted',
    })
    .help('help')
    .alias('help', 'h')
    .version()
    .alias('version', 'v')
    .parseSync();

  let data;
  try {
    data = main({ expression: argv.expression, range: argv.range });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }

  let output;
  if (argv.format === 'csv') {
    const lines = ['x,y', ...data.map(({ x, y }) => `${x},${y}`)];
    output = lines.join('\n');
  } else {
    output = JSON.stringify(data, null, 2);
  }

  if (argv.output) {
    try {
      fs.writeFileSync(argv.output, output, 'utf-8');
    } catch (err) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
  } else {
    console.log(output);
  }
}

// Only run CLI when executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runCLI();
}
