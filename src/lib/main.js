#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from 'url';
import { Parser } from 'expr-eval';
import fs from 'fs';
import yargs from 'yargs';
import { z } from 'zod';

export function parseExpression(exprString) {
  try {
    const expr = Parser.parse(exprString);
    const vars = expr.variables();
    if (vars.length > 1) {
      throw new Error(`Expression must have a single variable, found variables: ${vars.join(',')}`);
    }
    return expr;
  } catch (err) {
    throw new Error(`Invalid expression: ${err.message}`);
  }
}

export function parseRange(rangeString) {
  const [varPart, numsPart] = rangeString.split('=');
  if (!varPart || !numsPart) {
    throw new Error(`Invalid range format: ${rangeString}`);
  }
  const variableName = varPart.trim();
  const parts = numsPart.split(':');
  if (parts.length !== 3) {
    throw new Error(`Invalid range format: ${rangeString}`);
  }
  const [startStr, endStr, stepStr] = parts;
  const RangeSchema = z.object({
    start: z.preprocess((val) => {
      const n = parseFloat(String(val));
      if (Number.isNaN(n)) throw new Error('start is not a number');
      return n;
    }, z.number()),
    end: z.preprocess((val) => {
      const n = parseFloat(String(val));
      if (Number.isNaN(n)) throw new Error('end is not a number');
      return n;
    }, z.number()),
    step: z.preprocess((val) => {
      const n = parseFloat(String(val));
      if (Number.isNaN(n)) throw new Error('step is not a number');
      return n;
    }, z.number().refine((n) => n !== 0, { message: 'step must be non-zero' })),
  });
  const { start, end, step } = RangeSchema.parse({ start: startStr, end: endStr, step: stepStr });
  return { variableName, start, end, step };
}

export function generateTimeSeries(exprAst, variableName, start, end, step) {
  const data = [];
  const positiveStep = step > 0;
  for (let x = start; positiveStep ? x <= end : x >= end; x += step) {
    const y = exprAst.evaluate({ [variableName]: x });
    data.push({ x, y });
  }
  return data;
}

/**
 * Main CLI entrypoint. Returns exit code rather than calling process.exit directly.
 * @param {string[]} args - command-line arguments (excluding node and script path)
 * @returns {number} exit code
 */
export function main(args = process.argv.slice(2)) {
  if (!args || args.length === 0) {
    console.log(`Run with: ${JSON.stringify(args)}`);
    return 0;
  }

  const argv = yargs(args)
    .option('expression', { type: 'string', demandOption: true, describe: 'Mathematical expression to evaluate' })
    .option('range', { type: 'string', demandOption: true, describe: 'Range in format var=start:end:step' })
    .option('output', { type: 'string', describe: 'File path to write JSON output' })
    .option('plot-format', { type: 'string', choices: ['svg', 'png'], describe: 'Plot output format (not yet implemented)' })
    .strict()
    .help()
    .parseSync();

  try {
    const exprAst = parseExpression(argv.expression);
    const { variableName, start, end, step } = parseRange(argv.range);
    const data = generateTimeSeries(exprAst, variableName, start, end, step);
    const json = JSON.stringify(data, null, 2);
    if (argv.output) {
      fs.writeFileSync(argv.output, json, 'utf-8');
    } else {
      console.log(json);
    }
    return 0;
  } catch (err) {
    console.error(err.message);
    return 1;
  }
}

// If run directly from CLI, exit with appropriate code
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const exitCode = main();
  process.exit(exitCode);
}
