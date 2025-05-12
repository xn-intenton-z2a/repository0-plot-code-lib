#!/usr/bin/env node
// src/lib/main.js

import fs from "fs";
import path from "path";
import { create, all } from "mathjs";
import sharp from "sharp";
import express from "express";
import { z } from "zod";
import { dump as yamlDump } from "js-yaml";
import { fileURLToPath } from "url";

const math = create(all);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Exported express app for HTTP API testing
export let httpApp;

/**
 * Parse command-line arguments into a key-value object.
 */
export function parseArgs(inputArgs) {
  const args = inputArgs || process.argv.slice(2);
  const result = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg.startsWith('--')) {
      throw new Error(`Unknown argument: ${arg}`);
    }
    const key = arg.slice(2);
    const value = args[i + 1];
    if (!value || value.startsWith('--')) {
      throw new Error(`Missing value for argument: ${arg}`);
    }
    i++;
    result[key] = value;
  }
  return result;
}

const cliSchema = z.object({
  expression: z.string(),
  range: z.string().regex(/^[a-zA-Z]+=-?\d+(\.\d+)?:-?\d+(\.\d+)?$/, 'range must be in the format axis=min:max'),
  format: z.enum(["svg", "png"]),
  output: z.string(),
  derivative: z.string().regex(/^(true|false)$/, 'derivative must be true or false').optional(),
  // Plot styling options
  width: z.string().regex(/^\d+$/, 'width must be a positive integer').optional(),
  height: z.string().regex(/^\d+$/, 'height must be a positive integer').optional(),
  title: z.string().optional(),
  'x-label': z.string().optional(),
  'y-label': z.string().optional(),
  grid: z.string().regex(/^(true|false)$/, 'grid must be true or false').optional(),
  palette: z.enum(["default", "pastel", "dark", "highContrast"]).optional(),
  colors: z.string().optional(),
  'export-data': z.string().optional(),
  'export-format': z.enum(["csv","json","yaml"]).optional()
});

/**
 * Parse a range string of the form axis=min:max.
 */
export function parseRange(rangeStr) {
  const [axis, values] = rangeStr.split('=');
  const [minStr, maxStr] = values.split(':');
  const min = Number(minStr);
  const max = Number(maxStr);
  if (Number.isNaN(min) || Number.isNaN(max)) {
    throw new Error(`Invalid range values: ${values}`);
  }
  return { axis, min, max };
}

/**
 * Generate time series data points for the provided expression and range.
 */
export function generateData(expression, range, samples = 100) {
  const expr = expression.includes('=') ? expression.split('=')[1].trim() : expression;
  const node = math.compile(expr);
  const { min, max } = range;
  const count = samples;
  const step = (max - min) / count;
  const points = [];
  for (let i = 0; i <= count; i++) {
    const x = min + step * i;
    const y = node.evaluate({ x });
    points.push({ x, y });
  }
  return points;
}

/**
 * Generate time series data points for the derivative expression.
 */
export function generateDerivativeData(expression, range, samples = 100) {
  const expr = expression.includes('=') ? expression.split('=')[1].trim() : expression;
  const derivativeNode = math.derivative(expr, 'x');
  const { min, max } = range;
  const count = samples;
  const step = (max - min) / count;
  const points = [];
  for (let i = 0; i <= count; i++) {
    const x = min + step * i;
    const y = derivativeNode.evaluate({ x });
    points.push({ x, y });
  }
  return points;
}

/**
 * Convert raw data or a series array to a string in the specified format.
 */
export function convertDataToString(dataOrSeries, format) {
  // CSV format
  if (format === 'csv') {
    const lines = [];
    const multi = Array.isArray(dataOrSeries) && dataOrSeries.length > 0 && dataOrSeries[0].points;
    if (multi) {
      lines.push('series,x,y');
      dataOrSeries.forEach((series) => {
        series.points.forEach((p) => {
          lines.push(`${series.label},${p.x},${p.y}`);
        });
      });
    } else {
      lines.push('x,y');
      dataOrSeries.forEach((p) => {
        lines.push(`${p.x},${p.y}`);
      });
    }
    return lines.join('\n');
  }
  // JSON format
  if (format === 'json') {
    const multi = Array.isArray(dataOrSeries) && dataOrSeries.length > 0 && dataOrSeries[0].points;
    if (multi) {
      const obj = {};
      dataOrSeries.forEach((series) => {
        obj[series.label] = series.points;
      });
      return JSON.stringify(obj, null, 2);
    }
    return JSON.stringify(dataOrSeries, null, 2);
  }
  // YAML format
  if (format === 'yaml') {
    const multi = Array.isArray(dataOrSeries) && dataOrSeries.length > 0 && dataOrSeries[0].points;
    let toDump;
    if (multi) {
      const obj = {};
      dataOrSeries.forEach((series) => {
        obj[series.label] = series.points;
      });
      toDump = obj;
    } else {
      toDump = dataOrSeries;
    }
    return yamlDump(toDump);
  }
  throw new Error(`Unsupported export format: ${format}`);
}

/**
 * Generate an SVG string for single or multiple data series with styling options.
 */
export function generateSVG(dataOrSeries, width = 500, height = 500, options = {}) {
  // Default color palettes
  const defaultColors = ["black", "red", "blue", "green", "orange", "purple"];
  const palettes = {
    default: defaultColors,
    pastel: ["#FFB3BA", "#BFFCC6", "#BBD2FF", "#FFFFBA", "#FFDFBA", "#DFBAFF"],
    dark: ["#222222", "#444444", "#666666", "#888888", "#AAAAAA", "#CCCCCC"],
    highContrast: ["#000000", "#FFFFFF"],
  };

  const seriesList = Array.isArray(dataOrSeries) && dataOrSeries.length > 0 && dataOrSeries[0].points
    ? dataOrSeries
    : null;

  // Determine color list
  let colorList;
  if (options.colors) {
    if (Array.isArray(options.colors)) {
      colorList = options.colors;
    } else if (typeof options.colors === 'string') {
      colorList = options.colors.split(',');
    }
  } else if (options.palette && palettes[options.palette]) {
    colorList = palettes[options.palette];
  } else {
    colorList = defaultColors;
  }

  const elements = [];

  // Grid lines
  if (options.grid) {
    const cols = 10;
    const rows = 10;
    const xStep = width / cols;
    const yStep = height / rows;
    for (let i = 0; i <= cols; i++) {
      const x = xStep * i;
      elements.push(
        `<line x1="${x}" y1="0" x2="${x}" y2="${height}" stroke="lightgray" stroke-dasharray="4,2" />`
      );
    }
    for (let j = 0; j <= rows; j++) {
      const y = yStep * j;
      elements.push(
        `<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="lightgray" stroke-dasharray="4,2" />`
      );
    }
  }

  // Title
  if (options.title) {
    elements.push(
      `<text x="${width / 2}" y="20" text-anchor="middle">${options.title}</text>`
    );
  }

  // Plot series
  if (seriesList) {
    seriesList.forEach((series, idx) => {
      const col = colorList[idx % colorList.length];
      const pts = series.points.map((p) => `${p.x},${p.y}`).join(' ');
      elements.push(
        `<polyline fill="none" stroke="${col}" points="${pts}" />`
      );
    });
    // Legend
    elements.push(`<g class="legend">`);
    seriesList.forEach((series, idx) => {
      const col = colorList[idx % colorList.length];
      const yPos = 20 + idx * 20;
      elements.push(
        `<text x="10" y="${yPos}" fill="${col}">${series.label}</text>`
      );
    });
    elements.push(`</g>`);
  } else {
    const pts = dataOrSeries.map((p) => `${p.x},${p.y}`).join(' ');
    const col = colorList[0];
    elements.push(
      `<polyline fill="none" stroke="${col}" points="${pts}" />`
    );
  }

  // Axis labels
  if (options.xLabel) {
    elements.push(
      `<text x="${width / 2}" y="${height - 5}" text-anchor="middle">${options.xLabel}</text>`
    );
  }
  if (options.yLabel) {
    elements.push(
      `<text x="15" y="${height / 2}" transform="rotate(-90,15,${height / 2})" text-anchor="middle">${options.yLabel}</text>`
    );
  }

  const inner = elements.join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${inner}</svg>`;
}

/**
 * Generate a plot programmatically without file I/O.
 */
export async function generatePlot(options) {
  const schema = z.object({
    expression: z.string(),
    range: z.string().regex(/^[a-zA-Z]+=-?\d+(\.\d+)?:-?\d+(\.\d+)?$/, 'range must be in the format axis=min:max'),
    format: z.enum(["svg", "png"]),
    width: z.number().int().positive().optional(),
    height: z.number().int().positive().optional(),
    samples: z.number().int().positive().optional(),
    xLog: z.boolean().optional(),
    yLog: z.boolean().optional(),
    grid: z.boolean().optional(),
    title: z.string().optional(),
    xLabel: z.string().optional(),
    yLabel: z.string().optional(),
    derivative: z.boolean().optional(),
    palette: z.enum(["default", "pastel", "dark", "highContrast"]).optional(),
    colors: z.string().optional(),
  });
  const opts = schema.parse(options);
  const {
    expression,
    range,
    format,
    width = 500,
    height = 500,
    samples = 100,
    xLog = false,
    yLog = false,
    grid = false,
    title,
    xLabel,
    yLabel,
    derivative = false,
    palette,
    colors,
  } = opts;
  const rangeObj = parseRange(range);
  let data = generateData(expression, rangeObj, samples);
  if (xLog) {
    data = data.map((p) => {
      if (p.x <= 0) throw new Error('x values must be positive for log scale');
      return { x: Math.log10(p.x), y: p.y };
    });
  }
  if (yLog) {
    data = data.map((p) => {
      if (p.y <= 0) throw new Error('y values must be positive for log scale');
      return { x: p.x, y: Math.log10(p.y) };
    });
  }
  const styleOpts = { grid, title, xLabel, yLabel, palette, colors: colors ? colors.split(',') : undefined };
  let svg;
  if (derivative) {
    const derivativeData = generateDerivativeData(expression, rangeObj, samples);
    const series = [
      { label: "original", points: data },
      { label: "derivative", points: derivativeData },
    ];
    svg = generateSVG(series, width, height, styleOpts);
  } else {
    svg = generateSVG(data, width, height, styleOpts);
  }
  if (format === 'svg') {
    return { type: 'svg', data: svg };
  }
  const buffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return { type: 'png', data: buffer };
}

/**
 * Main entrypoint for the CLI. Parses flags, generates data, optionally exports data, and writes SVG or PNG.
 */
export async function main(inputArgs) {
  const args = inputArgs || process.argv.slice(2);

  // Standard discovery flags
  if (args.length === 1) {
    const flag = args[0];
    if (flag === '--help') {
      const usagePath = path.resolve(__dirname, '../../USAGE.md');
      const usageText = fs.readFileSync(usagePath, 'utf-8');
      console.log(usageText);
      process.exit(0);
    }
    if (flag === '--version') {
      const pkgPath = path.resolve(__dirname, '../../package.json');
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      console.log(pkg.version);
      process.exit(0);
    }
    if (flag === '--mission') {
      const missionPath = path.resolve(__dirname, '../../MISSION.md');
      const missionText = fs.readFileSync(missionPath, 'utf-8');
      console.log(missionText);
      process.exit(0);
    }
  }

  if (args.length === 0) {
    console.log(`Run with: ${JSON.stringify(args)}`);
    return;
  }

  let parsedArgs;
  try {
    parsedArgs = parseArgs(args);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  // HTTP server mode
  if (parsedArgs.serve) {
    const port = Number(parsedArgs.serve);
    const app = express();
    httpApp = app;

    app.get('/plot', async (req, res) => {
      try {
        const raw = req.query;
        const opts = {
          expression: raw.expression,
          range: raw.range,
          format: raw.format,
          width: raw.width ? parseInt(raw.width, 10) : undefined,
          height: raw.height ? parseInt(raw.height, 10) : undefined,
          samples: raw.samples ? parseInt(raw.samples, 10) : undefined,
          xLog: raw.xLog === 'true',
          yLog: raw.yLog === 'true',
          grid: raw.grid === 'true',
          title: raw.title,
          xLabel: raw.xLabel,
          yLabel: raw.yLabel,
          derivative: raw.derivative === 'true',
          palette: raw.palette,
          colors: raw.colors,
        };
        const result = await generatePlot(opts);
        if (result.type === 'svg') {
          res.type('image/svg+xml').send(result.data);
        } else {
          res.type('image/png').send(result.data);
        }
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    });

    app.listen(port, () => console.log(`Listening on port ${port}`));
    return;
  }

  // CLI mode
  let parsed;
  try {
    parsed = cliSchema.parse(parsedArgs);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  const {
    expression,
    range,
    format,
    output,
    derivative,
    width,
    height,
    title,
    'x-label': xLabel,
    'y-label': yLabel,
    grid,
    palette,
    colors,
    'export-data': exportData,
    'export-format': exportFormat
  } = parsed;
  const derivativeFlag = derivative === 'true';
  const rangeObj = parseRange(range);
  const data = generateData(expression, rangeObj, 100);
  const widthVal = width ? Number(width) : 500;
  const heightVal = height ? Number(height) : 500;
  const gridFlag = grid === 'true';
  const colorsList = colors ? colors.split(',') : undefined;
  const styleOpts = { grid: gridFlag, title, xLabel, yLabel, palette, colors: colorsList };

  // Determine data or series for plotting and export
  let seriesOrData;
  if (derivativeFlag) {
    const derivativeData = generateDerivativeData(expression, rangeObj, 100);
    seriesOrData = [
      { label: 'original', points: data },
      { label: 'derivative', points: derivativeData }
    ];
  } else {
    seriesOrData = data;
  }

  // Export raw data if requested
  if (exportData) {
    let exFormat = exportFormat;
    if (!exFormat) {
      const ext = path.extname(exportData).toLowerCase();
      if (ext === '.csv') exFormat = 'csv';
      else if (ext === '.json') exFormat = 'json';
      else if (ext === '.yaml' || ext === '.yml') exFormat = 'yaml';
      else {
        console.error(`Unsupported export format for ${exportData}`);
        process.exit(1);
      }
    }
    const dataString = convertDataToString(seriesOrData, exFormat);
    fs.writeFileSync(exportData, dataString);
  }

  // Generate plot SVG/PNG
  const svg = generateSVG(seriesOrData, widthVal, heightVal, styleOpts);
  if (format === 'svg') {
    fs.writeFileSync(output, svg);
  } else {
    const buffer = await sharp(Buffer.from(svg)).png().toBuffer();
    fs.writeFileSync(output, buffer);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
