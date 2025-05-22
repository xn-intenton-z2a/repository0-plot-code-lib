# Mission Statement

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

**plot-code-lib** is a JavaScript library and CLI tool designed to:
- Transform and given range and a simple expression syntax for (pick an existing open standard) to time series data.
- Read and write the time series data in a standard format (pick an existing open standard).
- Make use of libraries for formula parsing, time series generation, plotting, and persistence in image formats.
- Generate SVG and PNG plots from the time series data and save these as files.
- Variations on this example: `node run start -- --expression "y=sin(x)" --range "x=-1:-1,y=-1:-1" --file output.svg` .
- Showcase all the features of the library via a CLI by dry running tp generate example commands and output in the README.md file.

`plot-code-lib` facilitate the creation of plots from mathematical expressions and time series data. It will take a
mathematical expression and a range of values and generate a plot in SVG or PNG format.
## Maintain Feature at 2025-05-22T00:57:42.174Z

Maintained feature TIME_SERIES_GENERATION.

Feature spec:

# Overview
Generates time series data points from a mathematical expression over a specified one-dimensional range. Provides core functionality for sampling expressions and producing structured data suitable for plotting or further analysis.
# CLI Parameters
--expression   Simple formula using x as the independent variable, for example y=sin(x)
--range        Sampling range in the form x=start:end:step where start, end and step are numeric values
--format       Output format, one of json or csv, default json
--file         Optional path to write the output; if omitted, data is printed to stdout
# Output
A sequence of sample points. In json format an array of objects with fields x and y. In csv format a header row x,y followed by numeric pairs.
# Error Handling
Validates both expression syntax and range parameters. On invalid input prints a descriptive message and exits with a non-zero code.
# Examples
node run start -- --expression "y=sin(x)" --range "x=0:6.28:0.1" --format csv --file data.csv

Git diff:

```diff
\n\n// New [features/TIME_SERIES_GENERATION.md]:\n# Overview
Generates time series data points from a mathematical expression over a specified one-dimensional range. Provides core functionality for sampling expressions and producing structured data suitable for plotting or further analysis.
# CLI Parameters
--expression   Simple formula using x as the independent variable, for example y=sin(x)
--range        Sampling range in the form x=start:end:step where start, end and step are numeric values
--format       Output format, one of json or csv, default json
--file         Optional path to write the output; if omitted, data is printed to stdout
# Output
A sequence of sample points. In json format an array of objects with fields x and y. In csv format a header row x,y followed by numeric pairs.
# Error Handling
Validates both expression syntax and range parameters. On invalid input prints a descriptive message and exits with a non-zero code.
# Examples
node run start -- --expression "y=sin(x)" --range "x=0:6.28:0.1" --format csv --file data.csv
```

LLM API Usage:

```json
{"prompt_tokens":4297,"completion_tokens":1862,"total_tokens":6159,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":1600,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```
---

## Feature to Issue at 2025-05-22T00:58:56.505Z

Generated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/3116 with title:

Implement TIME_SERIES_GENERATION CLI: parse expressions, sample range, and format output

And description:

Objective

Fully implement the TIME_SERIES_GENERATION feature in `src/lib/main.js`, enabling users to generate time series data from a mathematical expression over a specified one-dimensional range, and output it in JSON or CSV format to stdout or a file.

Tasks

1. Add `mathjs` (or equivalent) to dependencies in `package.json`.

2. Update `src/lib/main.js`:
   - Use a CLI argument parser (e.g., `minimist`) to support:
     • `--expression` (required): formula like `y=sin(x)`
     • `--range` (required): in form `x=start:end:step`
     • `--format` (optional): `json` or `csv` (default `json`)
     • `--file` (optional): output file path; if omitted, print to stdout
   - Parse and validate the input:
     • Validate that expression matches `y=<math>` and can be compiled by `mathjs`.
     • Parse `start`, `end`, and `step` as numbers; ensure `step > 0` and `start <= end`.
     • Validate `format` is either `json` or `csv`.
   - Generate sample points from `start` to `end` inclusive, stepping by `step`:
     • For each `x` value compute `y` using the compiled expression.
     • Collect points as objects `{ x: Number, y: Number }`.
   - Format output:
     • JSON: print `JSON.stringify(array, null, 2)`.
     • CSV: print header `x,y` then rows `x,y`.
   - If `--file` is provided, write output to the specified file; otherwise, write to stdout.
   - On any validation or runtime error, print an error message to stderr and call `process.exit(1)`.

3. Extend `tests/unit/plot-generation.test.js`:
   - Test successful JSON output for a simple formula and range by capturing stdout.
   - Test CSV output by specifying `--format csv` and verifying header and rows.
   - Test file writing by mocking or writing to a temporary file and reading its contents.
   - Test invalid inputs (malformed expression, bad range, unsupported format) exit with code `1` and error message.

4. Update `README.md`:
   - Add a new "CLI Usage" section that describes the `--expression`, `--range`, `--format`, and `--file` flags.
   - Provide two concrete examples (one JSON, one CSV) showing commands and expected output.

Verification

- Run `npm install` to include `mathjs`.
- Execute `npm test` and confirm all new and existing tests pass.
- Manually test the CLI:
  • `node src/lib/main.js --expression "y=sin(x)" --range "x=0:3.14:1"` should print JSON array to stdout.
  • `node src/lib/main.js --expression "y=2*x" --range "x=0:5:2" --format csv --file data.csv` should create `data.csv` with header and rows.

This single LLM invocation should update the source, tests, `README.md`, and `package.json` to deliver full TIME_SERIES_GENERATION functionality.

LLM API Usage:

```json
{"prompt_tokens":5408,"completion_tokens":1483,"total_tokens":6891,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":704,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```
---

## Issue to enhanced Issue at 2025-05-22T00:59:52.687Z

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:

Title: Implement TIME_SERIES_GENERATION CLI: parse expressions, sample range, and format output

### Objective

Fully implement the TIME_SERIES_GENERATION feature in `src/lib/main.js`, enabling users to generate time series data from a mathematical expression over a specified one-dimensional range and output it in JSON or CSV format to stdout or a file.

### Acceptance Criteria (Testable)

1. Argument Parsing:
   - `--expression` is required and must follow the pattern `y=<math>`.
   - `--range` is required in the form `x=start:end:step` where `start`, `end`, and `step` are numbers.
   - `--format` is optional; valid values are `json` (default) or `csv`.
   - `--file` is optional; if provided, output is written to the given filepath.
   - Invalid or missing required flags should cause the CLI to print a descriptive error to stderr and exit with code `1`.

2. Expression Validation & Compilation:
   - The expression after `y=` must compile successfully with `mathjs` (or equivalent).
   - Test case: `--expression "y=sin(x)"` compiles without errors.

3. Range Parsing & Validation:
   - `start`, `end`, and `step` are parsed as numbers.
   - `step > 0` and `start <= end`; violations cause exit code `1` with error.
   - Test case: `--range "x=0:10:2"` produces x values [0,2,4,6,8,10].

4. Data Generation:
   - Sample x values from `start` to `end` inclusive by `step`.
   - Compute y for each x using the compiled expression.
   - Result is an array of objects: `{ x: Number, y: Number }`.

5. Output Formatting:
   - JSON mode: prints pretty-printed JSON via `JSON.stringify(data, null, 2)`.
   - CSV mode: prints header `x,y` and rows of numeric values.
   - Test case: running with `--format csv` produces a header and correct rows.

6. File Writing:
   - If `--file path/to/output` is specified, write the formatted output to the file.
   - On success, exit with code `0`. If writing fails, print error and exit with code `1`.
   - Test case: mock or use a temporary file and verify the contents match expected JSON/CSV output.

7. Error Handling & Exit Codes:
   - On any validation or runtime error (parsing, compilation, file I/O), print an error message to stderr and exit with code `1`.
   - All success flows exit with code `0`.

### Testing Tasks

- Extend `tests/unit/plot-generation.test.js` to cover:
  - Successful JSON output with sample expression and range.
  - Successful CSV output with tests for header and row content.
  - File writing behavior (using temp file mocks or stubs).
  - Error cases: missing flags, malformed expression, invalid range, unsupported format.

### Documentation Tasks

- Update `README.md`:
  - Add a "CLI Usage" section documenting `--expression`, `--range`, `--format`, and `--file` flags.
  - Provide two concrete examples (one JSON, one CSV) showing commands and expected output.

### Verification

- Install dependencies (`npm install mathjs minimist`).
- Run tests (`npm test`) and ensure all tests (new and existing) pass.
- Manually verify:
  - `node src/lib/main.js --expression "y=sin(x)" --range "x=0:3.14:1"` prints JSON.
  - `node src/lib/main.js --expression "y=2*x" --range "x=0:5:2" --format csv --file data.csv` creates `data.csv` with correct content.


LLM API Usage:

```json
{"prompt_tokens":5146,"completion_tokens":1259,"total_tokens":6405,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":320,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```
---

## Issue to Code at 2025-05-22T01:03:09.072Z

fixApplied: true

Implement TIME_SERIES_GENERATION CLI with parsing sampling formatting tests and documentation

Git Diff:

```
diff --git a/package-lock.json b/package-lock.json
index c5671969..a5c62813 100644
--- a/package-lock.json
+++ b/package-lock.json
@@ -12,8 +12,9 @@
         "dotenv": "^16.5.0",
         "ejs": "^3.1.10",
         "js-yaml": "^4.1.0",
-        "mathjs": "^11.12.0",
+        "mathjs": "^11.8.0",
         "minimatch": "^10.0.1",
+        "minimist": "^1.2.8",
         "openai": "^4.95.1",
         "zod": "^3.24.3"
       },
@@ -5106,7 +5107,6 @@
       "version": "1.2.8",
       "resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.8.tgz",
       "integrity": "sha512-2yyAR8qBkN3YuheJanUpWC5U3bb5osDywNB8RzDVlDwDHbocAJveqqj1u8+SVD7jkWT4yvsHCpWqqWqAxb0zCA==",
-      "dev": true,
       "license": "MIT",
       "funding": {
         "url": "https://github.com/sponsors/ljharb"
diff --git a/package.json b/package.json
index d53d00bd..b81e7ada 100644
--- a/package.json
+++ b/package.json
@@ -25,11 +25,13 @@
   "license": "MIT",
   "dependencies": {
     "dotenv": "^16.5.0",
-    "openai": "^4.95.1",
     "ejs": "^3.1.10",
     "js-yaml": "^4.1.0",
     "minimatch": "^10.0.1",
-    "zod": "^3.24.3"
+    "openai": "^4.95.1",
+    "zod": "^3.24.3",
+    "minimist": "^1.2.8",
+    "mathjs": "^11.8.0"
   },
   "devDependencies": {
     "@microsoft/eslint-formatter-sarif": "^3.1.0",
@@ -54,8 +56,10 @@
   "engines": {
     "node": ">=20.0.0"
   },
-  "files": ["src/"],
+  "files": [
+    "src/"
+  ],
   "publishConfig": {
     "registry": "https://npm.pkg.github.com"
   }
-}
+}
\ No newline at end of file
diff --git a/src/lib/main.js b/src/lib/main.js
index 3cdd4e2a..9a6699fb 100755
--- a/src/lib/main.js
+++ b/src/lib/main.js
@@ -1,13 +1,102 @@
 #!/usr/bin/env node
-// src/lib/main.js
+import fs from 'fs';
+import { fileURLToPath } from 'url';
+import minimist from 'minimist';
+import { compile } from 'mathjs';
 
-import { fileURLToPath } from "url";
+export function main(args = process.argv.slice(2)) {
+  if (!args || args.length === 0) {
+    console.log(
+      `Usage: node ${process.argv[1]} --expression "y=<expression>" --range "x=start:end:step" [--format json|csv] [--file outputPath]`
+    );
+    return;
+  }
 
-export function main(args) {
-  console.log(`Run with: ${JSON.stringify(args)}`);
+  const options = minimist(args, {
+    string: ['expression', 'range', 'format', 'file'],
+    alias: { e: 'expression', r: 'range', f: 'format', o: 'file' },
+    default: { format: 'json' }
+  });
+  const { expression, range, format, file } = options;
+
+  if (!expression) {
+    console.error('Error: --expression is required');
+    process.exit(1);
+  }
+  if (!/^y=/i.test(expression)) {
+    console.error('Error: --expression must follow y=<expression>');
+    process.exit(1);
+  }
+  const exprBody = expression.slice(2);
+  let compiled;
+  try {
+    compiled = compile(exprBody);
+  } catch (err) {
+    console.error(`Error: Invalid expression: ${err.message}`);
+    process.exit(1);
+  }
+
+  if (!range) {
+    console.error('Error: --range is required');
+    process.exit(1);
+  }
+  const rangeMatch = /^x=([^:]+):([^:]+):([^:]+)$/.exec(range);
+  if (!rangeMatch) {
+    console.error('Error: --range must be in form x=start:end:step');
+    process.exit(1);
+  }
+  const start = parseFloat(rangeMatch[1]);
+  const end = parseFloat(rangeMatch[2]);
+  const step = parseFloat(rangeMatch[3]);
+  if ([start, end, step].some((v) => Number.isNaN(v))) {
+    console.error('Error: range values must be numbers');
+    process.exit(1);
+  }
+  if (step <= 0) {
+    console.error('Error: step must be > 0');
+    process.exit(1);
+  }
+  if (start > end) {
+    console.error('Error: start must be <= end');
+    process.exit(1);
+  }
+  if (!['json', 'csv'].includes(format)) {
+    console.error('Error: --format must be json or csv');
+    process.exit(1);
+  }
+
+  const data = [];
+  for (let x = start; x <= end + step / 2; x += step) {
+    let y;
+    try {
+      y = compiled.evaluate({ x });
+    } catch (err) {
+      console.error(`Error: Failed to evaluate expression at x=${x}: ${err.message}`);
+      process.exit(1);
+    }
+    data.push({ x, y });
+  }
+
+  let output;
+  if (format === 'json') {
+    output = JSON.stringify(data, null, 2);
+  } else {
+    const lines = ['x,y', ...data.map((point) => `${point.x},${point.y}`)];
+    output = lines.join('\n');
+  }
+
+  if (file) {
+    try {
+      fs.writeFileSync(file, output);
+    } catch (err) {
+      console.error(`Error: Failed to write file: ${err.message}`);
+      process.exit(1);
+    }
+  } else {
+    console.log(output);
+  }
 }
 
 if (process.argv[1] === fileURLToPath(import.meta.url)) {
-  const args = process.argv.slice(2);
-  main(args);
+  main();
 }
diff --git a/tests/unit/plot-generation.test.js b/tests/unit/plot-generation.test.js
index 19a4042c..382bef8a 100644
--- a/tests/unit/plot-generation.test.js
+++ b/tests/unit/plot-generation.test.js
@@ -1,16 +1,62 @@
-import { describe, test, expect } from "vitest";
-import * as mainModule from "@src/lib/main.js";
-import { main } from "@src/lib/main.js";
+import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
+import fs from 'fs';
+import { main } from '@src/lib/main.js';
 
-describe("Main Module Import", () => {
-  test("should be non-null", () => {
-    expect(mainModule).not.toBeNull();
+describe('TIME_SERIES_GENERATION CLI', () => {
+  let consoleLogSpy;
+  let consoleErrorSpy;
+  let writeFileSyncSpy;
+
+  beforeEach(() => {
+    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
+    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
+    writeFileSyncSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
+  });
+
+  afterEach(() => {
+    vi.restoreAllMocks();
+  });
+
+  test('outputs JSON correctly to stdout', () => {
+    main(['--expression', 'y=2*x', '--range', 'x=0:2:1']);
+    expect(consoleLogSpy).toHaveBeenCalledWith(JSON.stringify([
+      { x: 0, y: 0 },
+      { x: 1, y: 2 },
+      { x: 2, y: 4 }
+    ], null, 2));
+  });
+
+  test('outputs CSV correctly to stdout', () => {
+    main(['--expression', 'y=x+1', '--range', 'x=0:2:1', '--format', 'csv']);
+    expect(consoleLogSpy).toHaveBeenCalledWith('x,y\n0,1\n1,2\n2,3');
+  });
+
+  test('writes output to file when --file is provided', () => {
+    main(['--expression', 'y=x', '--range', 'x=0:1:1', '--file', 'out.txt']);
+    expect(writeFileSyncSpy).toHaveBeenCalledWith('out.txt', JSON.stringify([
+      { x: 0, y: 0 },
+      { x: 1, y: 1 }
+    ], null, 2));
+  });
+
+  test('exits with code 1 on invalid expression syntax', () => {
+    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => { throw new Error('process.exit'); });
+    expect(() => main(['--expression', 'invalid', '--range', 'x=0:1:1'])).toThrow('process.exit');
+    expect(consoleErrorSpy).toHaveBeenCalledWith('Error: --expression must follow y=<expression>');
+    exitSpy.mockRestore();
+  });
+
+  test('exits with code 1 on invalid range format', () => {
+    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => { throw new Error('process.exit'); });
+    expect(() => main(['--expression', 'y=x', '--range', 'invalid'])).toThrow('process.exit');
+    expect(consoleErrorSpy).toHaveBeenCalledWith('Error: --range must be in form x=start:end:step');
+    exitSpy.mockRestore();
   });
-});
 
-describe("Default main", () => {
-  test("should terminate without error", () => {
-    process.argv = ["node", "src/lib/main.js"];
-    main();
+  test('exits with code 1 on unsupported format', () => {
+    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => { throw new Error('process.exit'); });
+    expect(() => main(['--expression', 'y=x', '--range', 'x=0:1:1', '--format', 'xml'])).toThrow('process.exit');
+    expect(consoleErrorSpy).toHaveBeenCalledWith('Error: --format must be json or csv');
+    exitSpy.mockRestore();
   });
 });\n\n// New [USAGE.md]:\n# Usage

## CLI Usage

Generates time series data from mathematical expressions over a specified one-dimensional range and outputs it in JSON or CSV format.

**Usage:**

  node src/lib/main.js --expression "y=<math>" --range "x=start:end:step" [--format json|csv] [--file outputPath]

**Options:**

  --expression, -e  Required: formula in form y=<math>, e.g. y=sin(x)
  --range, -r       Required: sampling range in form x=start:end:step, e.g. x=0:6.28:0.1
  --format, -f      Optional: output format, json (default) or csv
  --file, -o        Optional: path to output file; if omitted, prints to stdout

**Examples:**

```bash
# JSON output to stdout
node src/lib/main.js --expression "y=sin(x)" --range "x=0:3.14:1"

# CSV output to file
node src/lib/main.js --expression "y=2*x" --range "x=0:5:2" --format csv --file data.csv
```
```
mainOutput:
```

> @xn-intenton-z2a/repository0-plot-code-lib@1.2.0-0 start
> node src/lib/main.js

Usage: node /home/runner/work/repository0-plot-code-lib/repository0-plot-code-lib/src/lib/main.js --expression "y=<expression>" --range "x=start:end:step" [--format json|csv] [--file outputPath]

```
[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/3116 with title: ""]

LLM API Usage:

```json
{"prompt_tokens":10290,"completion_tokens":8313,"total_tokens":18603,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":5184,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```
---

# Activity Log

## Discussions activity at 2025-05-22T01:04:08.288Z

Hello @Antony-at-Polycode 👋

I’ve reseeded the repository as requested. The mission statement remains unchanged. Let me know if you’d like any next steps or adjustments!

[Posted on "https://github.com/xn-intenton-z2a/repository0-plot-code-lib/discussions/2972#discussioncomment-13227620" by the repository bot which took the action "seed-repository" with the detail "".]

LLM API Usage:

```json
{"prompt_tokens":54009,"completion_tokens":67,"total_tokens":54076,"prompt_tokens_details":{"cached_tokens":1280,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}

```
---

2025-05-22T01:29:35Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-22T01-29Z

## Feature to Issue at 2025-05-22T01:54:40.661Z

Generated feature development issue with title Implement PLOT_GENERATION CLI: generate SVG and PNG plots from time series data.

LLM API Usage:

```json
{"prompt_tokens":10519,"completion_tokens":2223,"total_tokens":12742,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":1472,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```
---

## Issue to Ready Issue at 2025-05-22T02:17:48.141Z

Enhanced issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/3117 with action enhance and updated description:

Implement PLOT_GENERATION CLI: generate SVG and PNG plots from time series data

Objective:
Extend the CLI to support PLOT_GENERATION: render a line chart from generated time series into SVG or PNG formats.

Acceptance Criteria:
1. Invoking with:
   node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28:0.1" --plot-format svg --file chart.svg
   - generates "chart.svg" file with content starting with "<svg"
   - process exits with code 0
2. Invoking with:
   node src/lib/main.js --expression "y=2*x" --range "x=0:10:1" --plot-format png --width 1024 --height 768 --file chart.png
   - generates "chart.png" file whose first bytes match PNG magic number (0x89 0x50 0x4E 0x47)
   - process exits with code 0
3. Invoking with --plot-format (svg or png) but missing --file:
   node src/lib/main.js --expression "y=x" --range "x=0:1:0.1" --plot-format svg
   - prints error "Error: --file is required when --plot-format is provided" to stderr
   - process exits with code 1
4. --width and --height flags override default dimensions (800x600) when rendering charts; missing flags use defaults.
5. When --plot-format is provided, JSON/CSV output (--format) is bypassed: no JSON/CSV is produced.

Implementation Tasks:
1. Add dependency: chartjs-node-canvas ^4.0.0.
2. Update src/lib/main.js to parse --plot-format (-p), --width, --height, instantiate ChartJSNodeCanvas, render line chart, write output, handle errors and exit codes.
3. Add/extend tests:
   - stub ChartJSNodeCanvas.renderToBuffer for SVG and PNG modes
   - spy on fs.writeFileSync to verify correct file writes
   - test error case when --file is missing
4. Update README.md to document new flags and provide examples for SVG and PNG modes.

LLM API Usage:

```json
{"prompt_tokens":5632,"completion_tokens":1866,"total_tokens":7498,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":1344,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```
---

