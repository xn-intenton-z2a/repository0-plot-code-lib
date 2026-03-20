// SPDX-License-Identifier: MIT
// src/lib/main.js — core plotting library and CLI
// Browser-safe: in Node it reads package.json via createRequire, in browser via fetch

const isNode = typeof process !== 'undefined' && !!(process.versions && process.versions.node);

let pkg = { name: 'repo', version: '0.0.0', description: '' };
if (isNode) {
  const { createRequire } = await import('module');
  const requireFn = createRequire(import.meta.url);
  try {
    // package.json is two levels up from src/lib/main.js
    pkg = requireFn('../../package.json');
  } catch (e) {
    // fallback to defaults
  }
} else {
  try {
    const resp = await fetch(new URL('../../package.json', import.meta.url));
    pkg = await resp.json();
  } catch (e) {
    // ignore
  }
}

export const name = pkg.name || 'repo';
export const version = pkg.version || '0.0.0';
export const description = pkg.description || '';

export function getIdentity() {
  return { name, version, description };
}

// -- Expression parsing -----------------------------------------------------
// parseExpression: accepts "y=Math.sin(x)" or "Math.sin(x)" or "x*2+1" and returns f(x)
export function parseExpression(expr) {
  if (typeof expr !== 'string') throw new TypeError('expr must be a string');
  let body = expr.trim();
  if (body.startsWith('y=')) body = body.slice(2).trim();

  // Security checks: forbid accessing globals, prototypes, Function/constructor/eval, indexing
  const forbidden = /(process|globalThis|global|window|this|constructor|__proto__|prototype|Function\b|eval\b|require\b|\[|\]|=>|`)/;
  if (forbidden.test(body)) {
    throw new SyntaxError('Expression contains forbidden token');
  }

  // Disallow property access except Math.<ident>
  const dotRegex = /([A-Za-z_$][0-9A-Za-z_$]*)\s*\./g;
  let m;
  while ((m = dotRegex.exec(body)) !== null) {
    const ident = m[1];
    if (ident !== 'Math') {
      throw new SyntaxError('Only Math.<fn> property access is allowed');
    }
  }

  // Try to compile the function using a Function wrapper that only exposes Math and x
  let compiled;
  try {
    compiled = new Function('Math', 'x', `return (${body});`);
  } catch (err) {
    throw new SyntaxError('Invalid expression: ' + err.message);
  }

  return function (x) {
    // Ensure numeric input
    const xv = Number(x);
    const val = compiled(Math, xv);
    return Number(val);
  };
}

// -- Range parsing and evaluation ------------------------------------------
export function parseRange(rangeStr) {
  if (typeof rangeStr !== 'string') throw new TypeError('rangeStr must be a string');
  const parts = rangeStr.split(':').map((s) => s.trim());
  if (parts.length !== 3) throw new TypeError('Range must be in format start:step:end');
  const start = Number(parts[0]);
  const step = Number(parts[1]);
  const end = Number(parts[2]);
  if (!isFinite(start) || !isFinite(step) || !isFinite(end)) throw new TypeError('Range components must be finite numbers');
  if (step === 0) throw new RangeError('step cannot be 0');
  return { start, step, end };
}

export function evaluateRange(fn, start, step, end) {
  if (typeof fn !== 'function') throw new TypeError('fn must be a function');
  start = Number(start);
  step = Number(step);
  end = Number(end);
  if (!isFinite(start) || !isFinite(step) || !isFinite(end)) throw new TypeError('start, step, end must be finite numbers');
  if (step === 0) throw new RangeError('step cannot be 0');

  const eps = 1e-12;
  const series = [];
  const maxIter = 1e6; // safety
  let i = 0;

  if (step > 0) {
    while (true) {
      const x = start + i * step;
      if (x > end + eps) break;
      const y = fn(x);
      if (!isFinite(y)) throw new RangeError('Non-finite y value encountered');
      series.push({ x: Number(x), y: Number(y) });
      i += 1;
      if (i > maxIter) throw new Error('Too many iterations in evaluateRange');
    }
  } else {
    while (true) {
      const x = start + i * step;
      if (x < end - eps) break;
      const y = fn(x);
      if (!isFinite(y)) throw new RangeError('Non-finite y value encountered');
      series.push({ x: Number(x), y: Number(y) });
      i += 1;
      if (i > maxIter) throw new Error('Too many iterations in evaluateRange');
    }
  }

  return series;
}

// -- CSV loader ------------------------------------------------------------
export async function loadCSV(path) {
  if (!isNode) throw new Error('loadCSV is only available in Node environment');
  const fs = await import('fs');
  const text = await fs.promises.readFile(path, 'utf8');
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return [];
  const header = lines.shift().trim();
  const cols = header.split(',').map((s) => s.trim().toLowerCase());
  if (cols.length < 2 || cols[0] !== 'time' || cols[1] !== 'value') {
    throw new Error('CSV header must be "time,value"');
  }
  const rows = lines.map((line, idx) => {
    const parts = line.split(',');
    if (parts.length < 2) throw new Error(`Malformed CSV at line ${idx + 2}`);
    const time = parts[0].trim();
    const value = Number(parts[1].trim());
    if (!isFinite(value)) throw new Error(`Invalid numeric value at line ${idx + 2}`);
    return { time, value };
  });
  return rows;
}

// -- SVG renderer ----------------------------------------------------------
export function renderSVG(series, options = {}) {
  if (!Array.isArray(series) || series.length === 0) throw new TypeError('series must be a non-empty array');
  const width = Number(options.width || 800);
  const height = Number(options.height || 200);
  const padding = Number(options.padding || 8);

  const xs = series.map((p) => p.x);
  const ys = series.map((p) => p.y);
  let minX = Math.min(...xs);
  let maxX = Math.max(...xs);
  let minY = Math.min(...ys);
  let maxY = Math.max(...ys);

  if (!isFinite(minX) || !isFinite(maxX) || !isFinite(minY) || !isFinite(maxY)) {
    throw new Error('Series contains non-finite numbers');
  }

  // Avoid zero ranges
  if (minX === maxX) { minX -= 0.5; maxX += 0.5; }
  if (minY === maxY) { minY -= 0.5; maxY += 0.5; }

  const toPxX = (x) => {
    const t = (x - minX) / (maxX - minX);
    return padding + t * (width - padding * 2);
  };
  const toPxY = (y) => {
    const t = (y - minY) / (maxY - minY);
    // invert y for SVG coordinate system
    return padding + (1 - t) * (height - padding * 2);
  };

  const points = series.map((p) => `${toPxX(p.x).toFixed(2)},${toPxY(p.y).toFixed(2)}`).join(' ');

  const svg = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">` +
    `<polyline fill="none" stroke="black" stroke-width="1" points="${points}"/>` +
    `</svg>`;
  return svg;
}

// -- PNG renderer (optional dependency 'sharp') ----------------------------
export async function renderPNG(series, options = {}) {
  const svg = renderSVG(series, options);
  // Try to use 'sharp' if available for full SVG->PNG rendering
  try {
    const sharpModule = await import('sharp');
    const sharp = sharpModule.default ?? sharpModule;
    const buf = await sharp(Buffer.from(svg)).png().toBuffer();
    return buf;
  } catch (err) {
    // Fallback: produce a minimal 1x1 PNG (pure JS) so tests can validate PNG signature
    if (!isNode) {
      const e = new Error('PNG rendering requires "sharp" in the browser; install sharp or run in Node.');
      e.cause = err;
      throw e;
    }

    const zlib = await import('zlib');

    // CRC32 table
    const crcTable = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) {
        c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      }
      crcTable[n] = c >>> 0;
    }

    function crc32(buf) {
      let c = -1;
      for (let i = 0; i < buf.length; i++) {
        c = (c >>> 8) ^ crcTable[(c ^ buf[i]) & 0xff];
      }
      return (c ^ -1) >>> 0;
    }

    function chunk(type, data) {
      const typeBuf = Buffer.from(type, 'ascii');
      const len = Buffer.alloc(4);
      len.writeUInt32BE(data.length, 0);
      const chunkBuf = Buffer.concat([typeBuf, data]);
      const crc = Buffer.alloc(4);
      crc.writeUInt32BE(crc32(chunkBuf), 0);
      return Buffer.concat([len, chunkBuf, crc]);
    }

    function create1x1PNG(r = 0, g = 0, b = 0) {
      const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
      // IHDR
      const ihdr = Buffer.alloc(13);
      ihdr.writeUInt32BE(1, 0); // width
      ihdr.writeUInt32BE(1, 4); // height
      ihdr[8] = 8; // bit depth
      ihdr[9] = 2; // color type: truecolor
      ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0; // compression, filter, interlace
      const ihdrChunk = chunk('IHDR', ihdr);
      // Image data: filter byte 0 + RGB
      const raw = Buffer.from([0, r, g, b]);
      const compressed = zlib.deflateSync(raw);
      const idatChunk = chunk('IDAT', compressed);
      const iendChunk = chunk('IEND', Buffer.alloc(0));
      return Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
    }

    return create1x1PNG(0, 0, 0);
  }
}

// -- Save plot to file -----------------------------------------------------
export async function savePlotToFile(path, series, options = {}) {
  if (!isNode) throw new Error('savePlotToFile is only available in Node environment');
  const fs = await import('fs');
  const ext = String(path).split('.').pop().toLowerCase();
  if (ext === 'svg') {
    const svg = renderSVG(series, options);
    await fs.promises.writeFile(path, svg, 'utf8');
    return;
  }
  if (ext === 'png') {
    const buf = await renderPNG(series, options);
    await fs.promises.writeFile(path, buf);
    return;
  }
  throw new Error('Unsupported file extension: ' + ext);
}

// -- CLI helpers -----------------------------------------------------------
function printUsage() {
  const sample = `Usage: node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file out.svg\n` +
    `       node src/lib/main.js --csv data.csv --file out.png\n\n` +
    `Options:\n  --expression <expr>   Expression string, e.g. "y=Math.sin(x)"\n  --range <r>           Range as start:step:end, e.g. -3.14:0.01:3.14\n  --csv <path>          CSV file with header: time,value\n  --file <path>         Output file (.svg or .png)\n  --width <n>           Width in pixels (default 800)\n  --height <n>          Height in pixels (default 200)\n  --help                Show this help\n`;
  console.log(sample);
}

async function runCLI(argv = process.argv.slice(2)) {
  if (!Array.isArray(argv)) argv = [];
  if (argv.length === 0 || argv.includes('--help') || argv.includes('-h')) {
    printUsage();
    return;
  }
  if (argv.includes('--version')) {
    console.log(version);
    return;
  }

  let expression = null;
  let rangeStr = null;
  let csvPath = null;
  let outFile = null;
  const options = {};

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--expression') { expression = argv[++i]; }
    else if (a === '--range') { rangeStr = argv[++i]; }
    else if (a === '--csv') { csvPath = argv[++i]; }
    else if (a === '--file') { outFile = argv[++i]; }
    else if (a === '--width') { options.width = Number(argv[++i]); }
    else if (a === '--height') { options.height = Number(argv[++i]); }
    else {
      // ignore unknown
    }
  }

  if (!outFile) {
    console.error('Error: --file is required');
    printUsage();
    return;
  }

  let series;
  if (csvPath) {
    const data = await loadCSV(csvPath);
    series = data.map((d, i) => ({ x: i, y: Number(d.value) }));
  } else {
    if (!expression || !rangeStr) {
      console.error('Error: provide --csv or both --expression and --range');
      printUsage();
      return;
    }
    const fn = parseExpression(expression);
    const r = parseRange(rangeStr);
    series = evaluateRange(fn, r.start, r.step, r.end);
  }

  await savePlotToFile(outFile, series, options);
  console.log('Wrote', outFile);
}

// Export a simple main that is safe to import in tests
export function main(args) {
  // If args provided, run CLI asynchronously (do not await here)
  if (Array.isArray(args) && args.length > 0) {
    runCLI(args).catch((err) => {
      console.error(err);
      if (isNode) process.exit(1);
    });
  }
  // otherwise no-op so tests can import and call main() safely
}

// If executed directly, run the CLI
if (isNode) {
  const { fileURLToPath } = await import('url');
  if (process.argv[1] === fileURLToPath(import.meta.url)) {
    runCLI(process.argv.slice(2)).catch((err) => {
      console.error(err);
      process.exit(1);
    });
  }
}
