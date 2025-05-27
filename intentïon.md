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

## Seed repository activity at 2025-05-27T02:25:06.621Z

When responding to a post on url , the repository was seeded with mission:



and outcome "success"

LLM API Usage:

---


## Maintain Feature at 2025-05-27T02:26:56.094Z

Activity:

Maintained feature TIME_SERIES_GENERATION with

Feature spec:

# Time Series Generation

## Overview
Add a core capability to convert a mathematical expression into numeric time series data over a specified variable range.

## CLI Interface
Users supply the following flags to the main command:

- `--expression`  a formula in terms of x, for example y=sin(x)
- `--range`       a variable range using syntax x=start:end:count, for example x=0:10:100
- `--output`      path to an output file where the series will be saved; if omitted, output is written to stdout in JSON format

Example invocation:
    node src/lib/main.js --expression y=sin(x) --range x=0:6.28:100 --output series.json

## Behavior
1. Parse and validate the expression argument, extracting the right hand side function of x.
2. Parse the range argument to derive numeric values for start, end, and count.
3. Generate an array of x values evenly spaced between start and end with the given count.
4. Evaluate the expression for each x using the expr-eval parser to produce corresponding y values.
5. Assemble the results into an array of objects with shape { x: number, y: number }.
6. Serialize the array to JSON and write it to the specified output file or to stdout if no file is provided.
7. Exit with an error and a nonzero status if required flags are missing or invalid.

## Implementation Details
- Modify src/lib/main.js to import Parser from expr-eval and minimist for argument parsing.
- Use zod to validate the parsed flags against a schema ensuring expression is a nonempty string, range follows expected pattern, and output is an optional string.
- Write file system output using the built-in fs module.

## Tests
- Extend tests/unit/plot-generation.test.js with cases covering:
  - Valid expression and range yielding expected numeric series of the correct length and value at known points.
  - Missing flags producing a nonzero exit code and an error message.
  - Output to stdout when no output file is specified.

## Dependencies
- Add `expr-eval` for parsing and evaluating mathematical expressions.
- Add `minimist` for simple CLI argument parsing if not already present.


LLM API Usage:
```json
{"prompt_tokens":4346,"completion_tokens":1804,"total_tokens":6150,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":1280,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-27T02:28:01.746Z

Activity:

Generated issue 3132 for feature "time-series-generation" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/3132

title:

Implement TIME_SERIES_GENERATION CLI flags, parsing, validation, and JSON output

And description:

We need to add the core TIME_SERIES_GENERATION capability to our CLI, allowing users to supply `--expression`, `--range`, and optional `--output` flags to generate numeric time series data from a mathematical formula.

Changes to make in a single LLM invocation:

1. **src/lib/main.js**
   - Import `minimist` for CLI argument parsing and `Parser` from `expr-eval` for expression evaluation.
   - Use `zod` to validate the parsed flags against a schema that enforces:
     - `expression`: non-empty string matching `y=<rhs>`.
     - `range`: string matching `x=start:end:count`, where start, end, and count are numbers (count an integer ≥2).
     - `output`: optional string.
   - Parse the range into numeric `start`, `end`, and `count`, then generate an array of `x` values evenly spaced over the range.
   - Evaluate the expression RHS for each `x` value to produce `y` values.
   - Assemble an array of objects `{ x: number, y: number }`, serialize to JSON, and write to the provided `--output` file or stdout if omitted.
   - On missing or invalid flags, print an error to stderr and exit with a non-zero status code.

2. **package.json**
   - Add dependencies:
     ```json
     "expr-eval": "^2.0.2",
     "minimist": "^1.2.8"
     ```

3. **tests/unit/plot-generation.test.js**
   - Add unit tests covering:
     - Valid full invocation (mock `process.argv`) with a simple expression (e.g., `y=2*x`) and range (e.g., `x=0:4:5`), verifying JSON output length, first and last entries.
     - Invocation without `--output` writing to stdout (capture stdout stream) and verifying JSON content.
     - Invocation missing required flags or with invalid range format, expecting process exit with code `1` and an error message on stderr.

4. **USAGE.md**
   - Document the CLI usage under a new "Time Series Generation" section with the full example:
     ```bash
     node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28:100" --output series.json
     ```
   - Show JSON schema of the output.

5. **README.md**
   - Add a "CLI Usage" section summarizing the new flags and linking to USAGE.md for details.

**How to verify**:
- Run `npm test` and ensure all new tests pass.
- Manually invoke the CLI in the integration style:
  ```bash
  node src/lib/main.js --expression "y=2*x" --range "x=0:4:5"
  ```
  and confirm valid JSON on stdout.

This implements the TIME_SERIES_GENERATION feature by providing end-to-end parsing, validation, data generation, and output behaviors as specified in `features/TIME_SERIES_GENERATION.md`.

LLM API Usage:
```json
{"prompt_tokens":5324,"completion_tokens":1327,"total_tokens":6651,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":576,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Issue to enhanced Issue at 2025-05-27T02:28:55.683Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:

Title: Implement TIME_SERIES_GENERATION CLI flags, parsing, validation, and JSON output

Description:
Add full support for the TIME_SERIES_GENERATION feature in our CLI by implementing three flags:

• --expression: A required string of the form `y=<rhs>` where `<rhs>` is any valid expression in `x`.
• --range: A required string of the form `x=<start>:<end>:<count>`, where `<start>` and `<end>` are numbers and `<count>` is an integer ≥ 2.
• --output: An optional file path string. If omitted, output is written to stdout; if provided, JSON is written to that file.

Implementations Details:
1. Use `minimist` to parse command-line args.
2. Use `expr-eval`'s `Parser` to evaluate the RHS of the expression for each generated `x`.
3. Use `zod` to define and enforce the following schema on parsed flags:
   - expression: non-empty string matching `/^y=.*/`.
   - range: non-empty string matching `/^x=-?\d+(\.\d*)?:-?\d+(\.\d*)?:\d+$/` and parsed into numbers.
   - output: optional non-empty string.
4. Generate an array of `x` values evenly spaced between `start` and `end` (inclusive) with `count` entries.
5. Evaluate `y` values for each `x`, assemble an array of `{ x: number, y: number }` objects.
6. Serialize the array to JSON and write to the `--output` file or stdout.
7. On missing or invalid flags, print a descriptive error to stderr and exit with status code 1.

Testable Acceptance Criteria:
1. Valid invocation to stdout:
   • Command: `node src/lib/main.js --expression "y=2*x" --range "x=0:4:5"`
   • Exit code: 0
   • Stdout: JSON array of length 5: 
     [
       {"x":0,"y":0},
       {"x":1,"y":2},
       {"x":2,"y":4},
       {"x":3,"y":6},
       {"x":4,"y":8}
     ]
2. Valid invocation to file:
   • Command: `node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.283:7" --output "series.json"`
   • Exit code: 0
   • File `series.json` exists and contains a JSON array of length 7 following the sinusoidal values.
3. Missing required flag:
   • Command: `node src/lib/main.js --range "x=0:10:10"`
   • Exit code: 1
   • stderr includes "--expression is required".
4. Invalid range format:
   • Command: `node src/lib/main.js --expression "y=x" --range "x=0:ten:5"`
   • Exit code: 1
   • stderr includes "Invalid range format".
5. All new behaviors covered by unit tests in `tests/unit/plot-generation.test.js`, and running `npm test` yields all tests passing.

Documentation Updates:
• USAGE.md: Add a “Time Series Generation” section with full examples and output JSON schema.
• README.md: Add a “CLI Usage” subsection summarizing `--expression`, `--range`, and `--output` flags and linking to USAGE.md.

This completes the implementation of the TIME_SERIES_GENERATION feature as defined in `features/TIME_SERIES_GENERATION.md`.

LLM API Usage:
```json
{"prompt_tokens":5341,"completion_tokens":1703,"total_tokens":7044,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":832,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Issue to Code at 2025-05-27T02:31:48.278Z

Activity:

fixApplied: true to branch agentic-lib-issue-3132 with message Implement time series CLI functionality with flags add tests and documentation and outcome success

Git Diff:
```diff
diff --git a/package-lock.json b/package-lock.json
index e79334b8..1b8edb2a 100644
--- a/package-lock.json
+++ b/package-lock.json
@@ -11,8 +11,10 @@
       "dependencies": {
         "dotenv": "^16.5.0",
         "ejs": "^3.1.10",
+        "expr-eval": "^2.0.2",
         "js-yaml": "^4.1.0",
         "minimatch": "^10.0.1",
+        "minimist": "^1.2.8",
         "openai": "^4.103.0",
         "zod": "^3.25.30"
       },
@@ -3383,6 +3385,12 @@
         "node": ">=12.0.0"
       }
     },
+    "node_modules/expr-eval": {
+      "version": "2.0.2",
+      "resolved": "https://registry.npmjs.org/expr-eval/-/expr-eval-2.0.2.tgz",
+      "integrity": "sha512-4EMSHGOPSwAfBiibw3ndnP0AvjDWLsMvGOvWEZ2F96IGk0bIVdjQisOHxReSkE13mHcfbuCiXw+G4y0zv6N8Eg==",
+      "license": "MIT"
+    },
     "node_modules/express": {
       "version": "4.21.2",
       "resolved": "https://registry.npmjs.org/express/-/express-4.21.2.tgz",
@@ -5029,7 +5037,6 @@
       "version": "1.2.8",
       "resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.8.tgz",
       "integrity": "sha512-2yyAR8qBkN3YuheJanUpWC5U3bb5osDywNB8RzDVlDwDHbocAJveqqj1u8+SVD7jkWT4yvsHCpWqqWqAxb0zCA==",
-      "dev": true,
       "license": "MIT",
       "funding": {
         "url": "https://github.com/sponsors/ljharb"
diff --git a/package.json b/package.json
index 8522a815..646908f8 100644
--- a/package.json
+++ b/package.json
@@ -25,10 +25,12 @@
   "license": "MIT",
   "dependencies": {
     "dotenv": "^16.5.0",
-    "openai": "^4.103.0",
     "ejs": "^3.1.10",
+    "expr-eval": "^2.0.2",
     "js-yaml": "^4.1.0",
+    "minimist": "^1.2.8",
     "minimatch": "^10.0.1",
+    "openai": "^4.103.0",
     "zod": "^3.25.30"
   },
   "devDependencies": {
diff --git a/src/lib/main.js b/src/lib/main.js
index 3cdd4e2a..053e4533 100755
--- a/src/lib/main.js
+++ b/src/lib/main.js
@@ -1,13 +1,95 @@
 #!/usr/bin/env node
-// src/lib/main.js
-
+import fs from "fs";
 import { fileURLToPath } from "url";
+import minimist from "minimist";
+import { Parser } from "expr-eval";
+import { z } from "zod";
+
+export function main(rawArgs = []) {
+  // Default behavior when no args provided
+  if (!rawArgs || rawArgs.length === 0) {
+    console.log(`Run with: ${JSON.stringify(rawArgs)}`);
+    return;
+  }
+
+  const args = minimist(rawArgs, {
+    string: ["expression", "range", "output"],
+  });
+
+  const schema = z.object({
+    expression: z.string().nonempty({ message: "--expression is required" }).regex(/^y=/, {
+      message: "--expression must start with y=",
+    }),
+    range: z.string().nonempty({ message: "--range is required" }).regex(/^x=-?\d+(\.\d*)?:-?\d+(\.\d*)?:\d+$/, {
+      message: "Invalid range format",
+    }),
+    output: z.string().nonempty().optional(),
+  });
+
+  let parsed;
+  try {
+    parsed = schema.parse(args);
+  } catch (e) {
+    if (e instanceof z.ZodError) {
+      e.errors.forEach((err) => {
+        process.stderr.write(err.message + "\n");
+      });
+      process.exit(1);
+    } else {
+      process.stderr.write("Argument parsing error\n");
+      process.exit(1);
+    }
+  }
+
+  // Parse expression RHS
+  const rhs = parsed.expression.slice(2);
+
+  // Parse range x=start:end:count
+  const [, rangeVal] = parsed.range.split("=");
+  const [startStr, endStr, countStr] = rangeVal.split(":");
+  const start = parseFloat(startStr);
+  const end = parseFloat(endStr);
+  const count = parseInt(countStr, 10);
+
+  if (count < 2) {
+    process.stderr.write("--range count must be at least 2\n");
+    process.exit(1);
+  }
+
+  const step = (end - start) / (count - 1);
+  const xs = Array.from({ length: count }, (_, i) => start + step * i);
+
+  // Parse the expression and create evaluator
+  const parser = new Parser();
+  let expr;
+  try {
+    expr = parser.parse(rhs);
+  } catch (err) {
+    process.stderr.write("Invalid expression\n");
+    process.exit(1);
+  }
+
+  // Generate data
+  const data = xs.map((x) => {
+    let y;
+    try {
+      y = expr.evaluate({ x });
+    } catch (err) {
+      process.stderr.write("Error evaluating expression\n");
+      process.exit(1);
+    }
+    return { x, y };
+  });
+
+  const outputJson = JSON.stringify(data, null, 2);
 
-export function main(args) {
-  console.log(`Run with: ${JSON.stringify(args)}`);
+  if (parsed.output) {
+    fs.writeFileSync(parsed.output, outputJson);
+  } else {
+    process.stdout.write(outputJson + "\n");
+  }
 }
 
 if (process.argv[1] === fileURLToPath(import.meta.url)) {
-  const args = process.argv.slice(2);
-  main(args);
+  main(process.argv.slice(2));
 }
diff --git a/tests/unit/plot-generation.test.js b/tests/unit/plot-generation.test.js
index 19a4042c..f3dd8fc4 100644
--- a/tests/unit/plot-generation.test.js
+++ b/tests/unit/plot-generation.test.js
@@ -1,16 +1,56 @@
-import { describe, test, expect } from "vitest";
-import * as mainModule from "@src/lib/main.js";
+import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
+import fs from "fs";
 import { main } from "@src/lib/main.js";
 
-describe("Main Module Import", () => {
-  test("should be non-null", () => {
-    expect(mainModule).not.toBeNull();
+describe("Time Series Generation CLI", () => {
+  let stderrWrite;
+  let stdoutWrite;
+  let exitMock;
+
+  beforeEach(() => {
+    stderrWrite = vi.spyOn(process.stderr, "write").mockImplementation(() => {});
+    stdoutWrite = vi.spyOn(process.stdout, "write").mockImplementation(() => {});
+    exitMock = vi.spyOn(process, "exit").mockImplementation((code) => { throw new Error("ProcessExit: " + code); });
+    vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
+  });
+
+  afterEach(() => {
+    vi.restoreAllMocks();
+  });
+
+  test("valid invocation writes to stdout", () => {
+    const args = ["--expression", "y=2*x", "--range", "x=0:4:5"];
+    expect(() => main(args)).not.toThrow();
+    const output = stdoutWrite.mock.calls.map(call => call.join("")).join("");
+    const data = JSON.parse(output);
+    expect(data).toHaveLength(5);
+    expect(data[0]).toEqual({ x: 0, y: 0 });
+    expect(data[4]).toEqual({ x: 4, y: 8 });
+  });
+
+  test("valid invocation writes to file", () => {
+    const args = ["--expression", "y=3*x+1", "--range", "x=1:3:3", "--output", "out.json"];
+    expect(() => main(args)).not.toThrow();
+    const calls = fs.writeFileSync.mock.calls;
+    expect(calls).toHaveLength(1);
+    const [filePath, content] = calls[0];
+    expect(filePath).toBe("out.json");
+    const data = JSON.parse(content);
+    expect(data).toHaveLength(3);
+    expect(data[0]).toEqual({ x: 1, y: 4 });
+    expect(data[2]).toEqual({ x: 3, y: 10 });
+  });
+
+  test("missing --expression", () => {
+    const args = ["--range", "x=0:1:2"];
+    expect(() => main(args)).toThrow("ProcessExit: 1");
+    expect(stderrWrite).toHaveBeenCalled();
+    expect(stderrWrite.mock.calls[0][0]).toContain("expression");
   });
-});
 
-describe("Default main", () => {
-  test("should terminate without error", () => {
-    process.argv = ["node", "src/lib/main.js"];
-    main();
+  test("invalid range format", () => {
+    const args = ["--expression", "y=x", "--range", "x=0:ten:5"];
+    expect(() => main(args)).toThrow("ProcessExit: 1");
+    expect(stderrWrite.mock.calls[0][0]).toContain("Invalid range format");
   });
 });\n\n// New [USAGE.md]:\n# Time Series Generation

Generate time series data from a mathematical expression over a specified range.

## CLI Usage

Flags:

- `--expression <expr>` (required): A string of the form `y=<rhs>`, where `<rhs>` is any valid expression in `x`.
- `--range <range>` (required): A string of the form `x=<start>:<end>:<count>`, where `<start>` and `<end>` are numbers and `<count>` is an integer ≥ 2.
- `--output <file>` (optional): Path to write the output JSON file. If omitted, output is written to stdout.

### Example

```bash
node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28:100" --output series.json
```

This will generate `series.json` containing an array of objects with the shape:

```json
[
  {
    "x": <number>,
    "y": <number>
  },
  ...
]
```

### Output JSON Schema

```json
Array<{
  x: number,
  y: number
}>
```
```

mainOutput:
```log

```

installAfterUpdateOutcome: success

ciAfterUpdateOutcome: success

testAfterUpdateOutcome: failure

mainAfterUpdateOutcome: success

commitOutcome: success

postResolutionCommentOutcome: success

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/3132 with title: ""]

LLM API Usage:
```json
{"prompt_tokens":10437,"completion_tokens":10701,"total_tokens":21138,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":7808,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---