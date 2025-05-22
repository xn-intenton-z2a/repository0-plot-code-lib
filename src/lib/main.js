#!/usr/bin/env node
import fs from 'fs';
import { fileURLToPath } from 'url';
import minimist from 'minimist';
import { compile } from 'mathjs';

export function main(args = process.argv.slice(2)) {
  if (!args || args.length === 0) {
    console.log(
      `Usage: node ${process.argv[1]} --expression "y=<expression>" --range "x=start:end:step" [--format json|csv] [--file outputPath]`
    );
    return;
  }

  const options = minimist(args, {
    string: ['expression', 'range', 'format', 'file'],
    alias: { e: 'expression', r: 'range', f: 'format', o: 'file' },
    default: { format: 'json' }
  });
  const { expression, range, format, file } = options;

  if (!expression) {
    console.error('Error: --expression is required');
    process.exit(1);
  }
  if (!/^y=/i.test(expression)) {
    console.error('Error: --expression must follow y=<expression>');
    process.exit(1);
  }
  const exprBody = expression.slice(2);
  let compiled;
  try {
    compiled = compile(exprBody);
  } catch (err) {
    console.error(`Error: Invalid expression: ${err.message}`);
    process.exit(1);
  }

  if (!range) {
    console.error('Error: --range is required');
    process.exit(1);
  }
  const rangeMatch = /^x=([^:]+):([^:]+):([^:]+)$/.exec(range);
  if (!rangeMatch) {
    console.error('Error: --range must be in form x=start:end:step');
    process.exit(1);
  }
  const start = parseFloat(rangeMatch[1]);
  const end = parseFloat(rangeMatch[2]);
  const step = parseFloat(rangeMatch[3]);
  if ([start, end, step].some((v) => Number.isNaN(v))) {
    console.error('Error: range values must be numbers');
    process.exit(1);
  }
  if (step <= 0) {
    console.error('Error: step must be > 0');
    process.exit(1);
  }
  if (start > end) {
    console.error('Error: start must be <= end');
    process.exit(1);
  }
  if (!['json', 'csv'].includes(format)) {
    console.error('Error: --format must be json or csv');
    process.exit(1);
  }

  const data = [];
  for (let x = start; x <= end + step / 2; x += step) {
    let y;
    try {
      y = compiled.evaluate({ x });
    } catch (err) {
      console.error(`Error: Failed to evaluate expression at x=${x}: ${err.message}`);
      process.exit(1);
    }
    data.push({ x, y });
  }

  let output;
  if (format === 'json') {
    output = JSON.stringify(data, null, 2);
  } else {
    const lines = ['x,y', ...data.map((point) => `${point.x},${point.y}`)];
    output = lines.join('\n');
  }

  if (file) {
    try {
      fs.writeFileSync(file, output);
    } catch (err) {
      console.error(`Error: Failed to write file: ${err.message}`);
      process.exit(1);
    }
  } else {
    console.log(output);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
