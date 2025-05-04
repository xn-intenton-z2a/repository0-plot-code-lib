#!/usr/bin/env node
// src/lib/main.js

import fs from 'fs';
import { fileURLToPath } from 'url';
import { evaluate } from 'mathjs';
import { z } from 'zod';
import sharp from 'sharp';
import express from 'express';

/**
 * Parse a range string into an array of numbers.
 * Formats: "start:end" or "start:end:step".
 * When step is omitted, uses points evenly spaced.
 */
export function parseRange(rangeStr, points = 100) {
  const parts = rangeStr.split(':');
  if (parts.length === 2) {
    const [startStr, endStr] = parts;
    const start = Number(startStr);
    const end = Number(endStr);
    if (Number.isNaN(start) || Number.isNaN(end)) {
      throw new Error('Invalid range numbers');
    }
    if (points < 2) {
      return [start];
    }
    const step = (end - start) / (points - 1);
    return Array.from({ length: points }, (_, i) => start + step * i);
  } else if (parts.length === 3) {
    const [startStr, endStr, stepStr] = parts;
    const start = Number(startStr);
    const end = Number(endStr);
    const step = Number(stepStr);
    if ([start, end, step].some((n) => Number.isNaN(n))) {
      throw new Error('Invalid range numbers');
    }
    if (step === 0) {
      throw new Error('Step cannot be zero');
    }
    const arr = [];
    if (step > 0) {
      for (let x = start; x <= end + 1e-12; x += step) {
        arr.push(parseFloat(x.toFixed(12)));
      }
    } else {
      for (let x = start; x >= end - 1e-12; x += step) {
        arr.push(parseFloat(x.toFixed(12)));
      }
    }
    return arr;
  } else {
    throw new Error('Invalid range format');
  }
}

/**
 * Evaluate expression for each x value.
 */
export function evaluateExpression(expression, xValues) {
  return xValues.map((x) => {
    let y;
    try {
      y = evaluate(expression, { x });
    } catch (err) {
      throw new Error(`Expression evaluation error: ${err.message}`);
    }
    if (typeof y !== 'number' || Number.isNaN(y)) {
      throw new Error('Expression did not evaluate to a number');
    }
    return { x, y };
  });
}

/**
 * Serialize data array to CSV string.
 */
export function serializeCSV(data) {
  const lines = ['x,y', ...data.map((d) => `${d.x},${d.y}`)];
  return lines.join('\n');
}

/**
 * Serialize data array to JSON string.
 */
export function serializeJSON(data) {
  return JSON.stringify(data, null, 2);
}

/**
 * Generate SVG line chart from data.
 */
function escapeXML(str) {
  return str.replace(/&/g, '&amp;').nreplace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function generateSVG(data, width, height, title) {
  const xs = data.map((d) => d.x);
  const ys = data.map((d) => d.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const rangeX = maxX - minX || 1;
  const rangeY = maxY - minY || 1;
  const points = data.map((d) => {
    const px = ((d.x - minX) / rangeX) * width;
    const py = height - ((d.y - minY) / rangeY) * height;
    return `${px},${py}`;
  });
  const pointsAttr = points.join(' ');
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`;
  if (title) {
    svg += `<title>${escapeXML(title)}</title>`;
  }
  svg += `<polyline points="${pointsAttr}" fill="none" stroke="black"/>`;
  svg += `</svg>`;
  return svg;
}

/**
 * Programmatic API: return time series data array.
 */
export async function getTimeSeries(expression, range, options = {}) {
  const { points = 100 } = options;
  const xs = parseRange(range, points);
  return evaluateExpression(expression, xs);
}

/**
 * Programmatic API: generate PNG buffer from data.
 */
export async function generatePNG(data, width, height, title) {
  const svg = generateSVG(data, width, height, title);
  return sharp(Buffer.from(svg)).png().toBuffer();
}

/**
 * Main CLI logic for data and plots.
 */
export async function mainCLI(argv = process.argv.slice(2)) {
  // simple argument parser
  const args = {};
  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (token.startsWith('--')) {
      const key = token.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith('--')) {
        args[key] = true;
      } else {
        args[key] = next;
        i++;
      }
    } else {
      rest.push(token);
    }
  }
  const isPlot = rest[0] === 'plot';
  if (isPlot) {
    // Plot subcommand
    const expr = args.expression;
    if (!expr) throw new Error('Missing required flag --expression');
    const range = args.range;
    if (!range) throw new Error('Missing required flag --range');
    const points = args.points ? parseInt(args.points, 10) : 100;
    if (isNaN(points) || points <= 0) throw new Error('Invalid points value');
    const plotFormat = args['plot-format'] || 'svg';
    if (!['svg', 'png'].includes(plotFormat)) throw new Error('Invalid plot-format');
    const width = args.width ? parseInt(args.width, 10) : 800;
    const height = args.height ? parseInt(args.height, 10) : 600;
    if (isNaN(width) || width <= 0) throw new Error('Invalid width');
    if (isNaN(height) || height <= 0) throw new Error('Invalid height');
    const title = args.title;
    const outputFile = args['output-file'] || args.file;
    const data = await getTimeSeries(expr, range, { points });
    if (plotFormat === 'svg') {
      const svg = generateSVG(data, width, height, title);
      if (outputFile) {
        fs.writeFileSync(outputFile, svg);
      }
      return svg;
    } else {
      const pngBuffer = await generatePNG(data, width, height, title);
      if (outputFile) {
        fs.writeFileSync(outputFile, pngBuffer);
      }
      return pngBuffer;
    }
  } else {
    // Timeseries default
    const expr = args.expression;
    if (!expr) throw new Error('Missing required flag --expression');
    const range = args.range;
    if (!range) throw new Error('Missing required flag --range');
    const points = args.points ? parseInt(args.points, 10) : 100;
    if (isNaN(points) || points <= 0) throw new Error('Invalid points value');
    const format = args.format || 'csv';
    if (!['csv', 'json'].includes(format)) throw new Error('Unknown format');
    const outputFile = args['output-file'] || args.file;
    const data = await getTimeSeries(expr, range, { points });
    let output;
    if (format === 'csv') {
      output = serializeCSV(data);
    } else {
      output = serializeJSON(data);
    }
    if (outputFile) {
      fs.writeFileSync(outputFile, output);
    }
    return output;
  }
}

/**
 * Parse CLI options using commander.
 */
export async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('No command specified. Use --help for usage information.');
    return;
  }
  try {
    const result = await mainCLI(args);
    if (Buffer.isBuffer(result)) {
      process.stdout.write(result);
    } else {
      const out = typeof result === 'string' ? result : JSON.stringify(result, null, 2);
      process.stdout.write(out);
    }
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

// HTTP server utilities

const formSchema = z.object({
  expression: z.string({ required_error: 'Missing expression' }),
  range: z.string({ required_error: 'Missing range' }),
  points: z.preprocess((v) => parseInt(v, 10), z.number().int().positive().default(100)),
  plotFormat: z.enum(['svg', 'png']).default('svg'),
  width: z.preprocess((v) => parseInt(v, 10), z.number().int().positive().default(800)),
  height: z.preprocess((v) => parseInt(v, 10), z.number().int().positive().default(600)),
  title: z.string().optional(),
});

function generateFormHtml() {
  return `<!DOCTYPE html><html><head><title>Plot Generator</title></head><body>
    <form method="post" action="/plot">
      <label>Expression: <input name="expression" required/></label><br/>
      <label>Range: <input name="range" required/></label><br/>
      <label>Points: <input name="points" value="100"/></label><br/>
      <label>Format: <select name="plotFormat"><option value="svg">SVG</option><option value="png">PNG</option></select></label><br/>
      <label>Width: <input name="width" value="800"/></label><br/>
      <label>Height: <input name="height" value="600"/></label><br/>
      <label>Title: <input name="title"/></label><br/>
      <button type="submit">Generate Plot</button>
    </form>
  </body></html>`;
}

/**
 * Start an HTTP server with Express and return the app instance.
 */
export function startHTTPServer(port) {
  const app = express();
  // CORS middleware
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGINS || '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
  });
  // Body parsers
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Web UI form
  app.get('/', (_req, res) => {
    res.type('html').send(generateFormHtml());
  });

  // Handle form submissions
  app.post('/plot', async (req, res) => {
    let params;
    try {
      params = formSchema.parse(req.body);
    } catch (err) {
      return res.status(400).json({ error: err.errors ? err.errors.map((e) => e.message).join('; ') : err.message });
    }
    try {
      const data = await getTimeSeries(params.expression, params.range, { points: params.points });
      if (params.plotFormat === 'svg') {
        const svg = generateSVG(data, params.width, params.height, params.title);
        return res.type('html').send(`<!DOCTYPE html><html><body>${svg}</body></html>`);
      } else {
        const pngBuffer = await generatePNG(data, params.width, params.height, params.title);
        const base64 = pngBuffer.toString('base64');
        return res.type('html').send(`<!DOCTYPE html><html><body><img src="data:image/png;base64,${base64}"/></body></html>`);
      }
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  });

  // Optionally listen
  if (port) {
    app.listen(port, () => console.log(`HTTP server listening on port ${port}`));
  }
  return app;
}

// Auto-start HTTP server if requested
if (process.argv.includes('--serve') || process.env.HTTP_PORT) {
  const portNum = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT, 10) : 3000;
  startHTTPServer(portNum);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}