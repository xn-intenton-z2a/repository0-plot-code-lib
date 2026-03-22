NODE_PROCESS

Table of Contents:
1. process.argv structure
2. CLI flag parsing conventions (no external deps)
3. Range parsing: start:step:end (exact algorithm)
4. Examples

1. process.argv structure
- process.argv is an array of strings provided by Node. Indexes:
  0: absolute path to node executable
  1: absolute path to executed script
  2..: CLI arguments passed to the script

2. CLI flag parsing conventions (exact behavior to implement)
- Accepted flag forms:
  --key value
  --key=value
  -k value (single-character alias support optional)
  --help (boolean flag)
- Parsing algorithm (deterministic):
  let args = process.argv.slice(2);
  for (let i=0; i<args.length; i++) {
    let a = args[i];
    if (a.startsWith('--')) {
      let eq = a.indexOf('=');
      if (eq !== -1) { key = a.slice(2,eq); val = a.slice(eq+1); }
      else { key = a.slice(2); val = args[++i]; }
      store key -> val
    } else if (a.startsWith('-') && a.length===2) {
      let key = a[1]; let val = args[++i]; store key -> val
    } else { collect or ignore }
  }
- Required flags for the CLI: --expression, --range or --csv, --file, --help

3. Range parsing: start:step:end (precise algorithm and signature)
Signature: parseRange(rangeSpec: string) -> { start: number, step: number, end: number, xs: number[] }
Algorithm:
  1. let parts = rangeSpec.split(':'); if parts.length !== 3 throw Error('range must be start:step:end')
  2. let start = Number(parts[0]); let step = Number(parts[1]); let end = Number(parts[2])
  3. if (!Number.isFinite(start) || !Number.isFinite(step) || !Number.isFinite(end)) throw Error('invalid numeric range')
  4. if (step === 0) throw Error('step must be non-zero')
  5. let xs = []; let eps = Math.abs(step) * 1e-12; if (step > 0) { for (let x = start; x <= end + eps; x += step) xs.push(Number(x)); } else { for (let x = start; x >= end - eps; x += step) xs.push(Number(x)); }
  6. Return { start, step, end, xs }
Note: round accumulated x to a reasonable precision (e.g., Number(x.toFixed(12))) before pushing to avoid floating accumulation drift.

4. Examples
- node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file output.svg
- node src/lib/main.js --csv data.csv --file output.png

Detailed digest
Content retrieved from https://nodejs.org/api/process.html#processargv and related Node docs on 2026-03-22.
This file codifies the exact process.argv structure and a deterministic CLI parsing algorithm (long-form and equals-form support) plus a robust and precise range parser that prevents infinite loops and floating drift.

Attribution
Sources:
- https://nodejs.org/api/process.html#processargv (primary)
Bytes retrieved (process doc): 694208
