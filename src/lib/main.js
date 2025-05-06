#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from 'url';
import { Parser } from 'expr-eval';
import fs from 'fs';
import yargs from 'yargs';
import { z } from 'zod';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';

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
 * Render a plot from time series data.
 * @param {Array<{x:number,y:number}>} data
 * @param {{width?:number,height?:number,format:string,labels?:{x:string,y:string}}} options
 * @returns {Promise<string|Buffer>}
 */
export async function renderPlot(data, options) {
  const { width = 800, height = 600, format, labels } = options;
  if (!['png', 'svg'].includes(format)) {
    throw new Error(`unsupported format: ${format}`);
  }
  const canvas = new ChartJSNodeCanvas({ width, height, backgroundColour: 'transparent' });
  const configuration = {
    type: 'line',
    data: {
      labels: data.map((p) => p.x),
      datasets: [
        {
          label: labels && labels.y ? labels.y : undefined,
          data: data.map((p) => p.y),
          borderColor: 'rgba(75,192,192,1)',
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        x: labels && labels.x ? { title: { display: true, text: labels.x } } : {},
        y: labels && labels.y ? { title: { display: true, text: labels.y } } : {},
      },
    },
  };
  if (format === 'png') {
    return await canvas.renderToBuffer(configuration);
  }
  const svgBuffer = await canvas.renderToBuffer(configuration, 'image/svg+xml');
  return svgBuffer.toString('utf-8');
}

/**
 * Main CLI entrypoint. Returns exit code rather than calling process.exit directly.
 * @param {string[]} args - command-line arguments (excluding node and script path)
 * @returns {Promise<number>} exit code
 */
export async function main(args = process.argv.slice(2)) {
  if (!args || args.length === 0) {
    console.log(`Run with: ${JSON.stringify(args)}`);
    return 0;
  }

  const argv = yargs(args)
    .option('expression', { type: 'string', demandOption: true, describe: 'Mathematical expression to evaluate' })
    .option('range', { type: 'string', demandOption: true, describe: 'Range in format var=start:end:step' })
    .option('output', { type: 'string', describe: 'File path to write output' })
    .option('format', { type: 'string', choices: ['json', 'ndjson'], default: 'json', describe: 'Output format (json or ndjson)' })
    .option('plot-format', { type: 'string', choices: ['svg', 'png'], describe: 'Plot output format (svg or png)' })
    .option('width', { type: 'number', default: 800, describe: 'Plot width in pixels' })
    .option('height', { type: 'number', default: 600, describe: 'Plot height in pixels' })
    .option('label-x', { type: 'string', describe: 'Label for x axis' })
    .option('label-y', { type: 'string', describe: 'Label for y axis' })
    .strict()
    .help()
    .parseSync();

  try {
    const exprAst = parseExpression(argv.expression);
    const { variableName, start, end, step } = parseRange(argv.range);
    const data = generateTimeSeries(exprAst, variableName, start, end, step);

    // Handle plot output
    if (argv['plot-format']) {
      const plotResult = await renderPlot(data, {
        format: argv['plot-format'],
        width: argv.width,
        height: argv.height,
        labels: argv['label-x'] || argv['label-y'] ? { x: argv['label-x'], y: argv['label-y'] } : undefined,
      });
      if (argv.output) {
        if (argv['plot-format'] === 'png') {
          fs.writeFileSync(argv.output, plotResult);
        } else {
          fs.writeFileSync(argv.output, plotResult, 'utf-8');
        }
      } else {
        process.stdout.write(plotResult);
      }
      return 0;
    }

    // Handle NDJSON streaming
    if (argv.format === 'ndjson') {
      if (argv.output) {
        const stream = fs.createWriteStream(argv.output, { encoding: 'utf8' });
        for (const point of data) {
          stream.write(JSON.stringify(point) + '\n');
        }
        stream.end();
      } else {
        for (const point of data) {
          process.stdout.write(JSON.stringify(point) + '\n');
        }
      }
      return 0;
    }

    // Default JSON array output
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
  main().then((code) => process.exit(code));
}
