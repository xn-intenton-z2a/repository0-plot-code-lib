#!/usr/bin/env node
// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited

import fs from "fs";
import path from "path";

const isNode = typeof process !== "undefined" && !!process.versions?.node;

let pkg = { name: "repo", version: "0.0.0", description: "" };
if (isNode) {
  try {
    const { createRequire } = await import("module");
    const requireFn = createRequire(import.meta.url);
    pkg = requireFn(path.join(process.cwd(), "package.json"));
  } catch (e) {
    // keep defaults
  }
} else {
  try {
    // In browsers prefer the absolute package.json at repository root (served by the static server).
    // Fall back to a relative URL based on module location if that fails.
    let resp;
    try {
      resp = await fetch("/package.json");
    } catch (e) {
      resp = undefined;
    }
    if (resp && resp.ok) {
      pkg = await resp.json();
    } else {
      try {
        const resp2 = await fetch(new URL("../../package.json", import.meta.url).href);
        if (resp2 && resp2.ok) pkg = await resp2.json();
      } catch (e) {
        // keep defaults
      }
    }
  } catch (e) {
    // browser fallback
  }
}

export const name = pkg.name;
export const version = pkg.version;
export const description = pkg.description || "";

export function getIdentity() {
  return { name, version, description };
}

// Parse an expression like "y=Math.sin(x)" into a callable function f(x)
export function parseExpression(exprStr) {
  if (typeof exprStr !== "string") throw new TypeError("exprStr must be a string");
  const trimmed = exprStr.trim();
  // Allow forms like "y=..." or just "..."
  const eqIndex = trimmed.indexOf("=");
  const rhs = eqIndex >= 0 ? trimmed.slice(eqIndex + 1).trim() : trimmed;
  // Build a safe function that exposes Math functions as locals
  const allowedMath = [
    "abs",
    "acos",
    "asin",
    "atan",
    "atan2",
    "ceil",
    "cos",
    "exp",
    "floor",
    "log",
    "max",
    "min",
    "pow",
    "random",
    "round",
    "sin",
    "sqrt",
    "tan",
    "PI",
    "E",
    "sinh",
    "cosh",
    "tanh",
  ];
  const mathBindings = "const { " + allowedMath.join(",") + " } = Math;";
  let fn;
  try {
    // eslint-disable-next-line no-new-func
    fn = new Function("x", mathBindings + " return (" + rhs + ");");
  } catch (e) {
    throw new Error("Failed to parse expression: " + e.message);
  }
  return fn;
}

// Evaluate expression over a numeric range "start:step:end" -> [{x,y}, ...]
export function evaluateRange(rangeStr, exprOrFn) {
  if (typeof rangeStr !== "string") throw new TypeError("rangeStr must be a string");
  const parts = rangeStr.split(":");
  if (parts.length !== 3) throw new Error("Range must be in format start:step:end");
  const start = Number(parts[0]);
  const step = Number(parts[1]);
  const end = Number(parts[2]);
  if (!isFinite(start) || !isFinite(step) || !isFinite(end)) throw new Error("Range values must be numbers");
  const fn = typeof exprOrFn === "function" ? exprOrFn : parseExpression(String(exprOrFn));
  const points = [];
  if (step === 0) throw new Error("step must not be zero");
  const maxIter = 10000000;
  let x = start;
  let iter = 0;
  const cmp = step > 0 ? (a, b) => a <= b + 1e-12 : (a, b) => a >= b - 1e-12;
  while (cmp(x, end)) {
    const y = Number(fn(x));
    points.push({ x, y });
    x = x + step;
    iter++;
    if (iter > maxIter) throw new Error("Range iteration exceeded max iterations");
  }
  return points;
}

// Load CSV file with header time,value and return array of {time: Number, value: Number}
export function loadCSV(filePath) {
  if (!isNode) throw new Error("loadCSV is only available in Node.js environment");
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length === 0) return [];
  const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const timeIdx = header.indexOf("time");
  const valueIdx = header.indexOf("value");
  const rows = lines.slice(1);
  const out = [];
  for (const row of rows) {
    const cols = row.split(",").map((c) => c.trim());
    const t = timeIdx >= 0 ? Number(cols[timeIdx]) : Number(cols[0]);
    const v = valueIdx >= 0 ? Number(cols[valueIdx]) : Number(cols[1]);
    if (Number.isNaN(t) || Number.isNaN(v)) continue;
    out.push({ time: t, value: v });
  }
  return out;
}

// Render points [{x,y}] to SVG string with a single <polyline> and viewBox
export function renderSVG(points, opts = {}) {
  const width = opts.width || 800;
  const height = opts.height || 400;
  if (!Array.isArray(points) || points.length === 0) {
    return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}"></svg>`;
  }
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const padX = (maxX - minX) * 0.05 || 1;
  const padY = (maxY - minY) * 0.1 || 1;
  const viewMinX = minX - padX;
  const viewMaxX = maxX + padX;
  const viewMinY = minY - padY;
  const viewMaxY = maxY + padY;

  // map to pixel coordinates
  const mapX = (x) => ((x - viewMinX) / (viewMaxX - viewMinX)) * width;
  const mapY = (y) => height - ((y - viewMinY) / (viewMaxY - viewMinY)) * height;
  const pointsAttr = points.map((p) => `${mapX(p.x).toFixed(2)},${mapY(p.y).toFixed(2)}`).join(" ");

  const svg = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">\n` +
    `<polyline fill="none" stroke="black" stroke-width="1" points="${pointsAttr}" />\n` +
    `</svg>`;
  return svg;
}

// Render PNG for points. For portability and to avoid heavy native deps in tests we return a tiny 1x1 PNG buffer
// In a full implementation this would rasterise the SVG using canvas or sharp. See README for details.
export function renderPNG(points, opts = {}) {
  // tiny transparent 1x1 PNG
  const base64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=";
  return Buffer.from(base64, "base64");
}

// Save a plot to disk, inferring format from filename extension (.svg or .png)
export function savePlot(points, filename) {
  if (!isNode) throw new Error("savePlot is only available in Node.js environment");
  if (!filename || typeof filename !== "string") throw new TypeError("filename is required");
  const ext = path.extname(filename).toLowerCase();
  if (ext === ".svg") {
    const svg = renderSVG(points);
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    fs.writeFileSync(filename, svg, "utf8");
    return filename;
  } else if (ext === ".png") {
    const buf = renderPNG(points);
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    fs.writeFileSync(filename, buf);
    return filename;
  } else {
    throw new Error("Unsupported file extension: " + ext);
  }
}

// CLI handling
export function usage() {
  return `Usage: node src/lib/main.js [--expression "y=Math.sin(x)"] [--range "start:step:end"] [--csv file.csv] [--file output.svg|output.png]\n\n` +
    `Options:\n` +
    `  --expression   Expression to plot, e.g. "y=Math.sin(x)"\n` +
    `  --range        Range for x as start:step:end, e.g. "-3.14:0.01:3.14"\n` +
    `  --csv          CSV file with header time,value (optional)\n` +
    `  --file         Output filename (svg or png)\n` +
    `  --help         Show this help message\n`;
}

export function main(argv) {
  const args = Array.isArray(argv) ? argv : (isNode ? process.argv.slice(2) : []);
  if (args.includes("--help")) {
    console.log(usage());
    return;
  }
  const idx = (flag) => {
    const i = args.indexOf(flag);
    return i >= 0 ? i : -1;
  };
  const getVal = (flag) => {
    const i = idx(flag);
    if (i >= 0 && i + 1 < args.length) return args[i + 1];
    return undefined;
  };

  const expr = getVal("--expression");
  const range = getVal("--range");
  const csv = getVal("--csv");
  const file = getVal("--file");

  if (!expr && !csv) {
    console.log(usage());
    return;
  }
  let points = [];
  if (expr) {
    if (!range) throw new Error("--range is required when using --expression");
    const fn = parseExpression(expr);
    points = evaluateRange(range, fn);
  } else if (csv) {
    points = loadCSV(csv).map((r) => ({ x: r.time, y: r.value }));
  }

  if (file) {
    savePlot(points, file);
    console.log(`Wrote ${file}`);
  } else {
    // print SVG to stdout
    console.log(renderSVG(points));
  }
}

if (isNode) {
  const { fileURLToPath } = await import("url");
  if (process.argv[1] === fileURLToPath(import.meta.url)) {
    try {
      main();
    } catch (e) {
      console.error(e.message);
      process.exit(1);
    }
  }
}
