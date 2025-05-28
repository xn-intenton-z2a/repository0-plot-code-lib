#!/usr/bin/env node
// src/lib/main.js

import fs from 'fs';
import { fileURLToPath } from 'url';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { compile } from 'mathjs';
import D3Node from 'd3-node';
import { createCanvas, loadImage } from 'canvas';

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

async function plotHandler(argv) {
  // Read JSON input
  let raw;
  try {
    raw = argv.input ? fs.readFileSync(argv.input, 'utf-8') : fs.readFileSync(0, 'utf-8');
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    console.error('Error: Invalid JSON');
    process.exit(1);
  }
  if (!Array.isArray(data) || data.some(d => typeof d.x !== 'number' || typeof d.y !== 'number')) {
    console.error('Error: Invalid data shape');
    process.exit(1);
  }
  const { width, height, format, output } = argv;
  // Create SVG via D3
  const d3n = new D3Node({ svgAttrs: { width, height } });
  const d3 = d3n.d3;
  const margin = { top: 10, right: 10, bottom: 30, left: 40 };
  const w = width - margin.left - margin.right;
  const h = height - margin.top - margin.bottom;
  const svg = d3n.createSVG(width, height);
  const xScale = d3.scaleLinear().domain(d3.extent(data, d => d.x)).range([margin.left, margin.left + w]);
  const yScale = d3.scaleLinear().domain(d3.extent(data, d => d.y)).range([margin.top + h, margin.top]);
  const line = d3.line().x(d => xScale(d.x)).y(d => yScale(d.y));
  svg.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 1.5)
    .attr('d', line);
  if (format === 'svg') {
    try {
      fs.writeFileSync(output, d3n.svgString(), 'utf-8');
    } catch (err) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
  } else {
    try {
      const svgBuffer = Buffer.from(d3n.svgString());
      const img = await loadImage(svgBuffer);
      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const buffer = canvas.toBuffer('image/png');
      fs.writeFileSync(output, buffer);
    } catch (err) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
  }
}

function timeSeriesHandler(argv) {
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

function runCLI() {
  yargs(hideBin(process.argv))
    .scriptName('repository0-plot-code-lib')
    .command(
      'plot',
      'Generate a line plot from JSON time series data',
      y =>
        y.option('input', {
          alias: 'i',
          type: 'string',
          describe: 'JSON input file path; reads stdin if omitted'
        })
        .option('output', {
          alias: 'o',
          type: 'string',
          describe: 'Output image file path',
          default: 'plot.svg'
        })
        .option('format', {
          alias: 'f',
          type: 'string',
          choices: ['svg', 'png'],
          describe: 'Output format: svg or png',
          default: 'svg'
        })
        .option('width', {
          alias: 'w',
          type: 'number',
          describe: 'Width in pixels',
          default: 800
        })
        .option('height', {
          alias: 'h',
          type: 'number',
          describe: 'Height in pixels',
          default: 600
        }),
      argv => {
        plotHandler(argv);
      }
    )
    .command(
      '$0',
      'Generate time series data',
      y =>
        y.usage('Usage: $0 -e <expression> -r <range> [options]')
        .option('expression', {
          alias: 'e',
          type: 'string',
          describe: 'Formula y=<expression> or <expression>',
          demandOption: true
        })
        .option('range', {
          alias: 'r',
          type: 'string',
          describe: 'Range x=<start>:<end>:<step>',
          demandOption: true
        })
        .option('format', {
          alias: 'f',
          type: 'string',
          describe: 'Output format: json or csv',
          default: 'json',
          choices: ['json', 'csv']
        })
        .option('output', {
          alias: 'o',
          type: 'string',
          describe: 'Output file; stdout if omitted'
        }),
      argv => {
        timeSeriesHandler(argv);
      }
    )
    .help()
    .alias('help', 'h')
    .version()
    .alias('version', 'v')
    .parse();
}

// Only run CLI when executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runCLI();
}
