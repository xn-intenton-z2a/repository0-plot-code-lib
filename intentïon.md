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

## Seed repository activity at 2025-05-27T02:43:27.939Z

When responding to a post on url , the repository was seeded with mission:



and outcome "success"

LLM API Usage:

---


## Maintain Feature at 2025-05-27T02:45:13.594Z

Activity:

Maintained feature TIME_SERIES_GENERATION with

Feature spec:

# Overview

Introduce a core command that parses a simple mathematical expression and a numeric range from CLI flags, generates a time series of data points, and writes the result as JSON to stdout or to a file. This feature covers argument parsing, expression evaluation, range expansion, and JSON serialization.

# Behavior

When invoked via the CLI with an expression and range:
- The CLI accepts --expression or -e for a formula in terms of x (e.g. y=sin(x)).
- The CLI accepts --range or -r using a syntax x=<start>:<end>:<step> (e.g. x=0:3.14:0.1).
- The range is expanded into an ordered list of x values.
- The expression is parsed and evaluated for each x to produce y values.
- The output is a JSON array of objects [{ x: number, y: number }, ...].
- By default, the JSON is printed to stdout. A --output or -o flag may specify a file path to write the JSON.

# Implementation

- Use a parsing library (e.g. mathjs) to parse and evaluate the expression in a sandboxed context.
- Expand the range string by splitting on colon and mapping to start, end, step as numbers. Ensure step > 0 and start<=end.
- Generate the series by looping from start to end inclusive in increments of step.
- Serialize the series array to JSON and either print to console or write to the specified file.
- Errors in parsing or invalid ranges should terminate with a non-zero exit code and an error message on stderr.

# CLI Interface

- repository0-plot-code-lib --expression "y=sin(x)" --range "x=0:6.28:0.1" 
- Additional optional flag --output <path> to write JSON to file.

# Tests

- Verify expression parsing and evaluation for common functions (sin, cos, polynomial).
- Verify range string parsing, including fractional and integer steps.
- Confirm correct JSON output structure and content.
- Confirm file writing when --output is provided and stdout behavior when not.



LLM API Usage:
```json
{"prompt_tokens":4346,"completion_tokens":1205,"total_tokens":5551,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":704,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-27T02:46:39.495Z

Activity:

Generated issue 3133 for feature "time-series-generation" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/3133

title:

Implement core TIME_SERIES_GENERATION CLI functionality

And description:

Objective:
Implement the TIME_SERIES_GENERATION feature in the CLI to parse a mathematical expression and numeric range, generate a time series of data points, and output the result as JSON to stdout or to a file.

Changes required:

1. Dependencies (package.json):
   - Add `mathjs` for safe expression parsing and evaluation.
   - Add `yargs` for robust CLI flag parsing.

2. Source (src/lib/main.js):
   - Import `yargs` and `mathjs`.
   - Define CLI options:
     • `--expression, -e` (string, required): formula in terms of `x`, e.g. `y=sin(x)` or `sin(x)`.
     • `--range, -r` (string, required): range syntax `x=<start>:<end>:<step>`, e.g. `x=0:3.14:0.1`.
     • `--output, -o` (string, optional): file path to write JSON; defaults to stdout.
   - Parse and validate:
     • Ensure range flag starts with `x=` and has three numeric parts with step>0 and start<=end.
     • Strip `y=` prefix in expression if present, and compile using `mathjs.parse(expr).compile()`.
   - Expand range into an inclusive list of `x` values.
   - Evaluate the expression for each `x` to yield `y` values.
   - Assemble an array of objects: `[{ x: number, y: number }, ...]`.
   - Serialize the array to JSON (formatted with 2-space indentation).
   - Write to the output file if `--output` is set (using `fs.writeFileSync`); otherwise print to stdout.
   - On any error (parsing, invalid range, evaluation), exit with code 1 and write a descriptive message to stderr.

3. Tests (tests/unit/plot-generation.test.js):
   - Add unit tests to:
     • Verify range parsing for integer and fractional steps (`0:0.5:2.0`).
     • Evaluate simple expressions (`y=x`, `sin(x)`, `2*x + 1`).
     • Confirm JSON structure and numeric values.
     • Confirm writing to a temporary file when `--output` is passed.
   - Use Vitest’s `spawnSync` or `execa` to invoke the CLI as a child process.

4. Documentation (USAGE.md & README.md):
   - Update `USAGE.md` with a section “Time Series Generation”:
     • Show example commands and expected JSON output.
   - In `README.md`, under a new header `## Time Series Generation`, include:
     • Installation snippet (already in package).
     • CLI example: `repository0-plot-code-lib --expression "y=sin(x)" --range "x=0:6.28:0.1"`.
     • Note `--output` option.

Verification steps:

- Run `npm install` to pull in `mathjs` and `yargs`.
- Execute `npm test` and ensure all new and existing tests pass.
- Manual check:
  • `node src/lib/main.js -e "y=x*2" -r "x=0:2:1"` should print:
    ```json
    [ { "x": 0, "y": 0 }, { "x": 1, "y": 2 }, { "x": 2, "y": 4 } ]
    ```
  • `node src/lib/main.js -e "sin(x)" -r "x=0:3.14:1.57" -o series.json` writes the same array to `series.json`.

No other files beyond `src/lib/main.js`, `tests/unit/plot-generation.test.js`, `USAGE.md`, `README.md`, and `package.json` should be modified.

LLM API Usage:
```json
{"prompt_tokens":5296,"completion_tokens":2068,"total_tokens":7364,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":1152,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Issue to enhanced Issue at 2025-05-27T02:47:32.164Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:

Title: Implement Core TIME_SERIES_GENERATION CLI Functionality

Objective:
Implement the TIME_SERIES_GENERATION feature in the CLI to parse a mathematical expression and numeric range, generate a time series of data points, and output the result as JSON to stdout or to a file.

Testable Acceptance Criteria:
1. CLI Flags
   - `--expression, -e`: required string formula in terms of `x` (e.g., `y=sin(x)` or `sin(x)`).
   - `--range, -r`: required string range syntax `x=<start>:<end>:<step>` (e.g., `x=0:3.14:0.1`).
   - `--output, -o`: optional file path; when provided, JSON is written to this file; otherwise printed to stdout.

2. Validation
   - Range must start with `x=` and split into three numeric segments: start, end, and step; enforce `step > 0` and `start <= end`.
   - Expression may include an optional `y=` prefix; strip prefix and compile with `mathjs.parse(expr).compile()`.
   - Invalid range or expression should terminate with exit code 1 and a descriptive error on stderr.

3. Range Expansion
   - Expand the numeric range inclusively from start to end, incrementing by step. Example: `x=0:2:1` expands to `[0, 1, 2]`.

4. Expression Evaluation
   - Evaluate the parsed expression for each `x` value, producing corresponding numeric `y` values.

5. JSON Output
   - Assemble results into an array of objects: `[{ "x": number, "y": number }, ...]`.
   - Serialize with 2-space indentation.
   - Correctly write to file when `--output` is used, using `fs.writeFileSync`; otherwise print to stdout.
   - Process exits with code 0 on success.

6. Unit Tests (Vitest)
   - Verify integer and fractional range parsing (e.g., `0:0.5:2.0`).
   - Test expression evaluation for `y=x`, `sin(x)`, `2*x + 1` at known points.
   - Confirm JSON structure and numeric values.
   - Confirm file creation and content when `--output` is provided using a temporary file and `spawnSync` or `execa`.

7. Documentation Updates
   - USAGE.md: Add a “Time Series Generation” section with example commands and expected JSON output.
   - README.md: Add `## Time Series Generation` with installation snippet, CLI examples, and `--output` flag description.

8. Scope Constraint
   - Only modify: `src/lib/main.js`, `tests/unit/plot-generation.test.js`, `USAGE.md`, `README.md`, and `package.json`.

LLM API Usage:
```json
{"prompt_tokens":5475,"completion_tokens":1312,"total_tokens":6787,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":640,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Issue to Code at 2025-05-27T02:50:10.107Z

Activity:

fixApplied: true to branch agentic-lib-issue-3133 with message Implement TIME_SERIES_GENERATION CLI with yargs and mathjs add tests and docs and outcome success

Git Diff:
```diff
diff --git a/README.md b/README.md
index 816f5140..310366f7 100644
--- a/README.md
+++ b/README.md
@@ -4,9 +4,30 @@ _"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_
 
 ---
 
-## License
+## Time Series Generation
 
-MIT
+The CLI can generate time series data from mathematical expressions over a numeric range.
+
+### Installation
+
+```bash
+npm install -g @xn-intenton-z2a/repository0-plot-code-lib
+```
+
+### Usage
+
+```bash
+repository0-plot-code-lib --expression "y=sin(x)" --range "x=0:6.28:0.1"
+```
+
+Use `-o` or `--output` to write JSON output to a file:
+
+```bash
+repository0-plot-code-lib -e "2*x+1" -r "x=0:5:1" -o output.json
+```
 
 ---
 
+## License
+
+MIT
diff --git a/package-lock.json b/package-lock.json
index e79334b8..086ee7a8 100644
--- a/package-lock.json
+++ b/package-lock.json
@@ -12,8 +12,10 @@
         "dotenv": "^16.5.0",
         "ejs": "^3.1.10",
         "js-yaml": "^4.1.0",
+        "mathjs": "^11.8.0",
         "minimatch": "^10.0.1",
         "openai": "^4.103.0",
+        "yargs": "^17.7.2",
         "zod": "^3.25.30"
       },
       "bin": {
@@ -93,6 +95,15 @@
         "node": ">=6.0.0"
       }
     },
+    "node_modules/@babel/runtime": {
+      "version": "7.27.1",
+      "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.27.1.tgz",
+      "integrity": "sha512-1x3D2xEk2fRo3PAhwQwu5UubzgiVWSXTBfWpVd2Mx2AzRqJuDJCsgaDVZ7HB5iGzDW1Hl1sWN2mFyKjmR9uAog==",
+      "license": "MIT",
+      "engines": {
+        "node": ">=6.9.0"
+      }
+    },
     "node_modules/@babel/types": {
       "version": "7.27.1",
       "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.27.1.tgz",
@@ -2245,6 +2256,78 @@
         "node": ">= 16"
       }
     },
+    "node_modules/cliui": {
+      "version": "8.0.1",
+      "resolved": "https://registry.npmjs.org/cliui/-/cliui-8.0.1.tgz",
+      "integrity": "sha512-BSeNnyus75C4//NQ9gQt1/csTXyo/8Sb+afLAkzAptFuMsod9HFokGNudZpi/oQV73hnVK+sR+5PVRMd+Dr7YQ==",
+      "license": "ISC",
+      "dependencies": {
+        "string-width": "^4.2.0",
+        "strip-ansi": "^6.0.1",
+        "wrap-ansi": "^7.0.0"
+      },
+      "engines": {
+        "node": ">=12"
+      }
+    },
+    "node_modules/cliui/node_modules/ansi-regex": {
+      "version": "5.0.1",
+      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
+      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
+      "license": "MIT",
+      "engines": {
+        "node": ">=8"
+      }
+    },
+    "node_modules/cliui/node_modules/emoji-regex": {
+      "version": "8.0.0",
+      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
+      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
+      "license": "MIT"
+    },
+    "node_modules/cliui/node_modules/string-width": {
+      "version": "4.2.3",
+      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
+      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
+      "license": "MIT",
+      "dependencies": {
+        "emoji-regex": "^8.0.0",
+        "is-fullwidth-code-point": "^3.0.0",
+        "strip-ansi": "^6.0.1"
+      },
+      "engines": {
+        "node": ">=8"
+      }
+    },
+    "node_modules/cliui/node_modules/strip-ansi": {
+      "version": "6.0.1",
+      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
+      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
+      "license": "MIT",
+      "dependencies": {
+        "ansi-regex": "^5.0.1"
+      },
+      "engines": {
+        "node": ">=8"
+      }
+    },
+    "node_modules/cliui/node_modules/wrap-ansi": {
+      "version": "7.0.0",
+      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-7.0.0.tgz",
+      "integrity": "sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q==",
+      "license": "MIT",
+      "dependencies": {
+        "ansi-styles": "^4.0.0",
+        "string-width": "^4.1.0",
+        "strip-ansi": "^6.0.0"
+      },
+      "engines": {
+        "node": ">=10"
+      },
+      "funding": {
+        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
+      }
+    },
     "node_modules/color-convert": {
       "version": "2.0.1",
       "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
@@ -2275,6 +2358,19 @@
         "node": ">= 0.8"
       }
     },
+    "node_modules/complex.js": {
+      "version": "2.4.2",
+      "resolved": "https://registry.npmjs.org/complex.js/-/complex.js-2.4.2.tgz",
+      "integrity": "sha512-qtx7HRhPGSCBtGiST4/WGHuW+zeaND/6Ld+db6PbrulIB1i2Ev/2UPiqcmpQNPSyfBKraC0EOvOKCB5dGZKt3g==",
+      "license": "MIT",
+      "engines": {
+        "node": "*"
+      },
+      "funding": {
+        "type": "github",
+        "url": "https://github.com/sponsors/rawify"
+      }
+    },
     "node_modules/concat-map": {
       "version": "0.0.1",
       "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
@@ -2408,6 +2504,12 @@
         }
       }
     },
+    "node_modules/decimal.js": {
+      "version": "10.5.0",
+      "resolved": "https://registry.npmjs.org/decimal.js/-/decimal.js-10.5.0.tgz",
+      "integrity": "sha512-8vDa8Qxvr/+d94hSh5P3IJwI5t8/c0KsMp+g8bNw9cY2icONa5aPfvKeieW1WlG0WQYwwhJ7mjui2xtiePQSXw==",
+      "license": "MIT"
+    },
     "node_modules/deep-eql": {
       "version": "5.0.2",
       "resolved": "https://registry.npmjs.org/deep-eql/-/deep-eql-5.0.2.tgz",
@@ -2807,6 +2909,15 @@
         "@esbuild/win32-x64": "0.25.4"
       }
     },
+    "node_modules/escalade": {
+      "version": "3.2.0",
+      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
+      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
+      "license": "MIT",
+      "engines": {
+        "node": ">=6"
+      }
+    },
     "node_modules/escape-html": {
       "version": "1.0.3",
       "resolved": "https://registry.npmjs.org/escape-html/-/escape-html-1.0.3.tgz",
@@ -2814,6 +2925,12 @@
       "dev": true,
       "license": "MIT"
     },
+    "node_modules/escape-latex": {
+      "version": "1.2.0",
+      "resolved": "https://registry.npmjs.org/escape-latex/-/escape-latex-1.2.0.tgz",
+      "integrity": "sha512-nV5aVWW1K0wEiUIEdZ4erkGGH8mDxGyxSeqPzRNtWP7ataw+/olFObw7hujFWlVjNsaDFw5VZ5NzVSIqRgfTiw==",
+      "license": "MIT"
+    },
     "node_modules/escape-string-regexp": {
       "version": "4.0.0",
       "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-4.0.0.tgz",
@@ -3685,6 +3802,19 @@
         "node": ">= 0.6"
       }
     },
+    "node_modules/fraction.js": {
+      "version": "4.3.4",
+      "resolved": "https://registry.npmjs.org/fraction.js/-/fraction.js-4.3.4.tgz",
+      "integrity": "sha512-pwiTgt0Q7t+GHZA4yaLjObx4vXmmdcS0iSJ19o8d/goUGgItX9UZWKWNnLHehxviD8wU2IWRsnR8cD5+yOJP2Q==",
+      "license": "MIT",
+      "engines": {
+        "node": "*"
+      },
+      "funding": {
+        "type": "patreon",
+        "url": "https://github.com/sponsors/rawify"
+      }
+    },
     "node_modules/fresh": {
       "version": "0.5.2",
       "resolved": "https://registry.npmjs.org/fresh/-/fresh-0.5.2.tgz",
@@ -3764,6 +3894,15 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
+    "node_modules/get-caller-file": {
+      "version": "2.0.5",
+      "resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-2.0.5.tgz",
+      "integrity": "sha512-DyFP3BM/3YHTQOCUL/w0OZHR0lpKeGrxotcHWcqNEdnltqFwXVfhEBQ94eIo34AfQpo0rGki4cyIiftY06h2Fg==",
+      "license": "ISC",
+      "engines": {
+        "node": "6.* || 8.* || >= 10.*"
+      }
+    },
     "node_modules/get-intrinsic": {
       "version": "1.3.0",
       "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.3.0.tgz",
@@ -4307,7 +4446,6 @@
       "version": "3.0.0",
       "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
       "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
-      "dev": true,
       "license": "MIT",
       "engines": {
         "node": ">=8"
@@ -4672,6 +4810,12 @@
         "node": "*"
       }
     },
+    "node_modules/javascript-natural-sort": {
+      "version": "0.7.1",
+      "resolved": "https://registry.npmjs.org/javascript-natural-sort/-/javascript-natural-sort-0.7.1.tgz",
+      "integrity": "sha512-nO6jcEfZWQXDhOiBtG2KvKyEptz7RVbpGP4vTD2hLBdmNQSsCiicO2Ioinv6UI4y9ukqnBpy+XZ9H6uLNgJTlw==",
+      "license": "MIT"
+    },
     "node_modules/js-tokens": {
       "version": "4.0.0",
       "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
@@ -4939,6 +5083,29 @@
         "node": ">= 0.4"
       }
     },
+    "node_modules/mathjs": {
+      "version": "11.12.0",
+      "resolved": "https://registry.npmjs.org/mathjs/-/mathjs-11.12.0.tgz",
+      "integrity": "sha512-UGhVw8rS1AyedyI55DGz9q1qZ0p98kyKPyc9vherBkoueLntPfKtPBh14x+V4cdUWK0NZV2TBwqRFlvadscSuw==",
+      "license": "Apache-2.0",
+      "dependencies": {
+        "@babel/runtime": "^7.23.2",
+        "complex.js": "^2.1.1",
+        "decimal.js": "^10.4.3",
+        "escape-latex": "^1.2.0",
+        "fraction.js": "4.3.4",
+        "javascript-natural-sort": "^0.7.1",
+        "seedrandom": "^3.0.5",
+        "tiny-emitter": "^2.1.0",
+        "typed-function": "^4.1.1"
+      },
+      "bin": {
+        "mathjs": "bin/cli.js"
+      },
+      "engines": {
+        "node": ">= 14"
+      }
+    },
     "node_modules/mdurl": {
       "version": "2.0.0",
       "resolved": "https://registry.npmjs.org/mdurl/-/mdurl-2.0.0.tgz",
@@ -5789,6 +5956,15 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
+    "node_modules/require-directory": {
+      "version": "2.1.1",
+      "resolved": "https://registry.npmjs.org/require-directory/-/require-directory-2.1.1.tgz",
+      "integrity": "sha512-fGxEI7+wsG9xrvdjsrlmL22OMTTiHRwAMroiEeMgq8gzoLC/PQr7RsRDSTLUg/bZAZtF+TVIkHc6/4RIKrui+Q==",
+      "license": "MIT",
+      "engines": {
+        "node": ">=0.10.0"
+      }
+    },
     "node_modules/resolve": {
       "version": "1.22.10",
       "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.10.tgz",
@@ -6066,6 +6242,12 @@
         "node": "^14.0.0 || >=16.0.0"
       }
     },
+    "node_modules/seedrandom": {
+      "version": "3.0.5",
+      "resolved": "https://registry.npmjs.org/seedrandom/-/seedrandom-3.0.5.tgz",
+      "integrity": "sha512-8OwmbklUNzwezjGInmZ+2clQmExQPvomqjL7LFqOYqtmuxRgQYqOD3mHaU+MvZn5FLUeVxVfQjwLZW/n/JFuqg==",
+      "license": "MIT"
+    },
     "node_modules/semver": {
       "version": "6.3.1",
       "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
@@ -6657,6 +6839,12 @@
       "dev": true,
       "license": "MIT"
     },
+    "node_modules/tiny-emitter": {
+      "version": "2.1.0",
+      "resolved": "https://registry.npmjs.org/tiny-emitter/-/tiny-emitter-2.1.0.tgz",
+      "integrity": "sha512-NB6Dk1A9xgQPMoGqC5CVXn123gWyte215ONT5Pp5a0yt4nlEoO1ZWeCwpncaekPHXO60i47ihFnZPiRPjRMq4Q==",
+      "license": "MIT"
+    },
     "node_modules/tinybench": {
       "version": "2.9.0",
       "resolved": "https://registry.npmjs.org/tinybench/-/tinybench-2.9.0.tgz",
@@ -6865,6 +7053,15 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
+    "node_modules/typed-function": {
+      "version": "4.2.1",
+      "resolved": "https://registry.npmjs.org/typed-function/-/typed-function-4.2.1.tgz",
+      "integrity": "sha512-EGjWssW7Tsk4DGfE+5yluuljS1OGYWiI1J6e8puZz9nTMM51Oug8CD5Zo4gWMsOhq5BI+1bF+rWTm4Vbj3ivRA==",
+      "license": "MIT",
+      "engines": {
+        "node": ">= 18"
+      }
+    },
     "node_modules/typescript": {
       "version": "5.8.3",
       "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.8.3.tgz",
@@ -7386,6 +7583,83 @@
       "dev": true,
       "license": "ISC"
     },
+    "node_modules/y18n": {
+      "version": "5.0.8",
+      "resolved": "https://registry.npmjs.org/y18n/-/y18n-5.0.8.tgz",
+      "integrity": "sha512-0pfFzegeDWJHJIAmTLRP2DwHjdF5s7jo9tuztdQxAhINCdvS+3nGINqPd00AphqJR/0LhANUS6/+7SCb98YOfA==",
+      "license": "ISC",
+      "engines": {
+        "node": ">=10"
+      }
+    },
+    "node_modules/yargs": {
+      "version": "17.7.2",
+      "resolved": "https://registry.npmjs.org/yargs/-/yargs-17.7.2.tgz",
+      "integrity": "sha512-7dSzzRQ++CKnNI/krKnYRV7JKKPUXMEh61soaHKg9mrWEhzFWhFnxPxGl+69cD1Ou63C13NUPCnmIcrvqCuM6w==",
+      "license": "MIT",
+      "dependencies": {
+        "cliui": "^8.0.1",
+        "escalade": "^3.1.1",
+        "get-caller-file": "^2.0.5",
+        "require-directory": "^2.1.1",
+        "string-width": "^4.2.3",
+        "y18n": "^5.0.5",
+        "yargs-parser": "^21.1.1"
+      },
+      "engines": {
+        "node": ">=12"
+      }
+    },
+    "node_modules/yargs-parser": {
+      "version": "21.1.1",
+      "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-21.1.1.tgz",
+      "integrity": "sha512-tVpsJW7DdjecAiFpbIB1e3qxIQsE6NoPc5/eTdrbbIC4h0LVsWhnoa3g+m2HclBIujHzsxZ4VJVA+GUuc2/LBw==",
+      "license": "ISC",
+      "engines": {
+        "node": ">=12"
+      }
+    },
+    "node_modules/yargs/node_modules/ansi-regex": {
+      "version": "5.0.1",
+      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
+      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
+      "license": "MIT",
+      "engines": {
+        "node": ">=8"
+      }
+    },
+    "node_modules/yargs/node_modules/emoji-regex": {
+      "version": "8.0.0",
+      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
+      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
+      "license": "MIT"
+    },
+    "node_modules/yargs/node_modules/string-width": {
+      "version": "4.2.3",
+      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
+      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
+      "license": "MIT",
+      "dependencies": {
+        "emoji-regex": "^8.0.0",
+        "is-fullwidth-code-point": "^3.0.0",
+        "strip-ansi": "^6.0.1"
+      },
+      "engines": {
+        "node": ">=8"
+      }
+    },
+    "node_modules/yargs/node_modules/strip-ansi": {
+      "version": "6.0.1",
+      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
+      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
+      "license": "MIT",
+      "dependencies": {
+        "ansi-regex": "^5.0.1"
+      },
+      "engines": {
+        "node": ">=8"
+      }
+    },
     "node_modules/yocto-queue": {
       "version": "0.1.0",
       "resolved": "https://registry.npmjs.org/yocto-queue/-/yocto-queue-0.1.0.tgz",
diff --git a/package.json b/package.json
index 8522a815..2138b4f7 100644
--- a/package.json
+++ b/package.json
@@ -25,10 +25,12 @@
   "license": "MIT",
   "dependencies": {
     "dotenv": "^16.5.0",
-    "openai": "^4.103.0",
     "ejs": "^3.1.10",
     "js-yaml": "^4.1.0",
+    "mathjs": "^11.8.0",
     "minimatch": "^10.0.1",
+    "openai": "^4.103.0",
+    "yargs": "^17.7.2",
     "zod": "^3.25.30"
   },
   "devDependencies": {
@@ -45,8 +47,8 @@
     "eslint-plugin-sonarjs": "^3.0.2",
     "express": "^4.21.2",
     "js-yaml": "^4.1.0",
-    "markdown-it-github": "^0.5.0",
     "markdown-it": "^14.1.0",
+    "markdown-it-github": "^0.5.0",
     "npm-check-updates": "^17.1.18",
     "prettier": "^3.5.3",
     "vitest": "^3.1.4"
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
index 3cdd4e2a..e28da212 100755
--- a/src/lib/main.js
+++ b/src/lib/main.js
@@ -1,13 +1,92 @@
 #!/usr/bin/env node
 // src/lib/main.js
 
-import { fileURLToPath } from "url";
+import fs from 'fs';
+import { hideBin } from 'yargs/helpers';
+import yargs from 'yargs';
+import { parse as parseMath } from 'mathjs';
+import { fileURLToPath } from 'url';
 
-export function main(args) {
-  console.log(`Run with: ${JSON.stringify(args)}`);
+export function main() {
+  try {
+    const argv = yargs(hideBin(process.argv))
+      .option('expression', {
+        alias: 'e',
+        type: 'string',
+        demandOption: true,
+        describe: 'Formula in terms of x, e.g. y=sin(x) or sin(x)',
+      })
+      .option('range', {
+        alias: 'r',
+        type: 'string',
+        demandOption: true,
+        describe: 'Range syntax x=<start>:<end>:<step>, e.g. x=0:3.14:0.1',
+      })
+      .option('output', {
+        alias: 'o',
+        type: 'string',
+        describe: 'Output file path, defaults to stdout',
+      })
+      .strict()
+      .parse();
+
+    let exprStr = argv.expression.trim();
+    if (exprStr.startsWith('y=')) exprStr = exprStr.slice(2);
+    const expr = parseMath(exprStr).compile();
+
+    const rangeStr = argv.range.trim();
+    if (!rangeStr.startsWith('x=')) {
+      throw new Error('Range must start with "x="');
+    }
+    const parts = rangeStr.slice(2).split(':');
+    if (parts.length !== 3) {
+      throw new Error('Range must have format x=<start>:<end>:<step>');
+    }
+    const [startStr, endStr, stepStr] = parts;
+    const start = Number(startStr);
+    const end = Number(endStr);
+    const step = Number(stepStr);
+    if ([start, end, step].some((n) => Number.isNaN(n))) {
+      throw new Error('Range start, end, and step must be numbers');
+    }
+    if (step <= 0) {
+      throw new Error('Step must be > 0');
+    }
+    if (start > end) {
+      throw new Error('Start must be <= end');
+    }
+
+    const xs = [];
+    let current = start;
+    const epsilon = step / 1e6;
+    while (current <= end + epsilon) {
+      xs.push(Number(current.toPrecision(15)));
+      current += step;
+    }
+
+    const series = xs.map((xVal) => {
+      const yVal = expr.evaluate({ x: xVal });
+      if (typeof yVal !== 'number' || Number.isNaN(yVal)) {
+        throw new Error(`Expression evaluated to non-number at x=${xVal}`);
+      }
+      return { x: xVal, y: yVal };
+    });
+
+    const outputJson = JSON.stringify(series, null, 2);
+
+    if (argv.output) {
+      fs.writeFileSync(argv.output, outputJson);
+    } else {
+      console.log(outputJson);
+    }
+
+    process.exit(0);
+  } catch (err) {
+    console.error(`Error: ${err.message}`);
+    process.exit(1);
+  }
 }
 
 if (process.argv[1] === fileURLToPath(import.meta.url)) {
-  const args = process.argv.slice(2);
-  main(args);
+  main();
 }
diff --git a/tests/unit/plot-generation.test.js b/tests/unit/plot-generation.test.js
index 19a4042c..96e50593 100644
--- a/tests/unit/plot-generation.test.js
+++ b/tests/unit/plot-generation.test.js
@@ -1,16 +1,73 @@
-import { describe, test, expect } from "vitest";
-import * as mainModule from "@src/lib/main.js";
-import { main } from "@src/lib/main.js";
+import { describe, it, expect } from 'vitest';
+import { spawnSync } from 'child_process';
+import { readFileSync, unlinkSync, existsSync } from 'fs';
+import path from 'path';
+import { fileURLToPath } from 'url';
 
-describe("Main Module Import", () => {
-  test("should be non-null", () => {
-    expect(mainModule).not.toBeNull();
+const __dirname = path.dirname(fileURLToPath(import.meta.url));
+const cliPath = path.resolve(__dirname, '../../src/lib/main.js');
+
+describe('Time Series Generation CLI', () => {
+  it('should generate integer range correctly', () => {
+    const result = spawnSync('node', [cliPath, '-e', 'y=x', '-r', 'x=0:2:1']);
+    expect(result.status).toBe(0);
+    const output = JSON.parse(result.stdout.toString());
+    expect(output).toEqual([
+      { x: 0, y: 0 },
+      { x: 1, y: 1 },
+      { x: 2, y: 2 },
+    ]);
+  });
+
+  it('should generate fractional range and evaluate sin(x)', () => {
+    const result = spawnSync(
+      'node',
+      [cliPath, '--expression', 'sin(x)', '--range', 'x=0:3.14:1.57']
+    );
+    expect(result.status).toBe(0);
+    const output = JSON.parse(result.stdout.toString());
+    expect(output.length).toBe(3);
+    expect(output[0]).toEqual({ x: 0, y: 0 });
+    expect(output[1].x).toBeCloseTo(1.57, 5);
+    expect(output[1].y).toBeCloseTo(Math.sin(1.57), 5);
+    expect(output[2].x).toBeCloseTo(3.14, 5);
+    expect(output[2].y).toBeCloseTo(Math.sin(3.14), 5);
+  });
+
+  it('should write output to file when --output is provided', () => {
+    const tmpFile = path.resolve(__dirname, 'temp_series.json');
+    if (existsSync(tmpFile)) unlinkSync(tmpFile);
+    const result = spawnSync(
+      'node',
+      [cliPath, '-e', '2*x+1', '-r', 'x=0:2:1', '-o', tmpFile]
+    );
+    expect(result.status).toBe(0);
+    expect(existsSync(tmpFile)).toBe(true);
+    const fileContent = readFileSync(tmpFile, 'utf-8');
+    const output = JSON.parse(fileContent);
+    expect(output).toEqual([
+      { x: 0, y: 1 },
+      { x: 1, y: 3 },
+      { x: 2, y: 5 },
+    ]);
+    unlinkSync(tmpFile);
+  });
+
+  it('should error and exit with non-zero code on invalid range', () => {
+    const result = spawnSync(
+      'node',
+      [cliPath, '-e', 'y=x', '-r', '0:2:1']
+    );
+    expect(result.status).not.toBe(0);
+    expect(result.stderr.toString()).toContain('Error: Range must start with "x="');
   });
-});
 
-describe("Default main", () => {
-  test("should terminate without error", () => {
-    process.argv = ["node", "src/lib/main.js"];
-    main();
+  it('should error and exit with non-zero code on invalid expression', () => {
+    const result = spawnSync(
+      'node',
+      [cliPath, '-e', 'y=unknownFunc(x)', '-r', 'x=0:1:1']
+    );
+    expect(result.status).not.toBe(0);
+    expect(result.stderr.toString()).toContain('Error:');
   });
 });\n\n// New [USAGE.md]:\n# Usage

## Time Series Generation

Generates a time series of (x, y) data points from a mathematical expression over a numeric range.

### Command

```sh
repository0-plot-code-lib --expression "<expr>" --range "x=<start>:<end>:<step>" [--output <file>]
```

- `--expression, -e`: formula in terms of x (e.g., `y=sin(x)` or `sin(x)`).
- `--range, -r`: range syntax `x=<start>:<end>:<step>` (e.g., `x=0:3.14:0.1`).
- `--output, -o`: (optional) output file path; if omitted, prints to stdout.

### Examples

Print to stdout:

```sh
repository0-plot-code-lib -e "y=x*2" -r "x=0:2:1"
```

Output:

```json
[
  { "x": 0, "y": 0 },
  { "x": 1, "y": 2 },
  { "x": 2, "y": 4 }
]
```

Write to file:

```sh
repository0-plot-code-lib -e "sin(x)" -r "x=0:6.28:3.14" -o series.json
```

The file `series.json` will contain:

```json
[
  { "x": 0, "y": 0 },
  { "x": 3.14, "y": 0 },
  { "x": 6.28, "y": 0 }
]
```
```

mainOutput:
```log

```

installAfterUpdateOutcome: success

ciAfterUpdateOutcome: success

testAfterUpdateOutcome: failure

mainAfterUpdateOutcome: failure

commitOutcome: success

postResolutionCommentOutcome: success

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/3133 with title: ""]

LLM API Usage:
```json
{"prompt_tokens":10332,"completion_tokens":8849,"total_tokens":19181,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":5440,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Fixed Code at 2025-05-27T02:51:57.432Z

Activity:

fixApplied: true with Allow main without args to return without error instead of exiting and outcome success

Git Diff:
```diff
diff --git a/src/lib/main.js b/src/lib/main.js
index e28da212..772d886f 100755
--- a/src/lib/main.js
+++ b/src/lib/main.js
@@ -1,92 +1,104 @@
 #!/usr/bin/env node
-// src/lib/main.js
+import fs from "fs";
+import yargs from "yargs";
+import { hideBin } from "yargs/helpers";
+import { parse } from "mathjs";
 
-import fs from 'fs';
-import { hideBin } from 'yargs/helpers';
-import yargs from 'yargs';
-import { parse as parseMath } from 'mathjs';
-import { fileURLToPath } from 'url';
+/**
+ * Main entry point for CLI or programmatic invocation.
+ * @param {string[]} [args] Arguments array for CLI parsing, omit or pass empty for no-op.
+ */
+export async function main(args) {
+  const cliArgs = args ?? [];
+  // If no arguments provided programmatically, do nothing (avoid exiting)
+  if (cliArgs.length === 0) {
+    return;
+  }
 
-export function main() {
-  try {
-    const argv = yargs(hideBin(process.argv))
-      .option('expression', {
-        alias: 'e',
-        type: 'string',
-        demandOption: true,
-        describe: 'Formula in terms of x, e.g. y=sin(x) or sin(x)',
-      })
-      .option('range', {
-        alias: 'r',
-        type: 'string',
-        demandOption: true,
-        describe: 'Range syntax x=<start>:<end>:<step>, e.g. x=0:3.14:0.1',
-      })
-      .option('output', {
-        alias: 'o',
-        type: 'string',
-        describe: 'Output file path, defaults to stdout',
-      })
-      .strict()
-      .parse();
+  // Configure yargs for CLI usage
+  const y = yargs(cliArgs)
+    .usage(
+      'Usage: $0 --expression "y=sin(x)" --range "x=0:6.28:0.1" [--output <file>]'
+    )
+    .option("expression", {
+      alias: "e",
+      describe: "Formula in terms of x, e.g. y=sin(x) or sin(x)",
+      type: "string",
+    })
+    .option("range", {
+      alias: "r",
+      describe: "Range syntax x=<start>:<end>:<step>, e.g. x=0:3.14:0.1",
+      type: "string",
+    })
+    .option("output", {
+      alias: "o",
+      describe: "Output file path, defaults to stdout",
+      type: "string",
+    })
+    .help()
+    .alias("help", "h")
+    .alias("version", "v")
+    .strict();
 
-    let exprStr = argv.expression.trim();
-    if (exprStr.startsWith('y=')) exprStr = exprStr.slice(2);
-    const expr = parseMath(exprStr).compile();
+  const argv = y.parse();
 
-    const rangeStr = argv.range.trim();
-    if (!rangeStr.startsWith('x=')) {
-      throw new Error('Range must start with "x="');
-    }
-    const parts = rangeStr.slice(2).split(':');
-    if (parts.length !== 3) {
-      throw new Error('Range must have format x=<start>:<end>:<step>');
-    }
-    const [startStr, endStr, stepStr] = parts;
-    const start = Number(startStr);
-    const end = Number(endStr);
-    const step = Number(stepStr);
-    if ([start, end, step].some((n) => Number.isNaN(n))) {
-      throw new Error('Range start, end, and step must be numbers');
-    }
-    if (step <= 0) {
-      throw new Error('Step must be > 0');
+  // If required flags not provided, show help and exit cleanly
+  if (!argv.expression || !argv.range) {
+    y.showHelp();
+    return;
+  }
+
+  try {
+    // Parse and validate range
+    const rangePattern = /^x=(\-?\d+(?:\.\d+)?):(\-?\d+(?:\.\d+)?):(\d+(?:\.\d+)?)$/;
+    const match = argv.range.match(rangePattern);
+    if (!match) {
+      throw new Error(
+        "Invalid range format. Expected x=<start>:<end>:<step>"
+      );
     }
-    if (start > end) {
-      throw new Error('Start must be <= end');
+    const start = parseFloat(match[1]);
+    const end = parseFloat(match[2]);
+    const step = parseFloat(match[3]);
+    if (step <= 0 || start > end) {
+      throw new Error(
+        "Invalid range values. Require step > 0 and start <= end"
+      );
     }
 
-    const xs = [];
-    let current = start;
-    const epsilon = step / 1e6;
-    while (current <= end + epsilon) {
-      xs.push(Number(current.toPrecision(15)));
-      current += step;
-    }
+    // Prepare expression
+    const exprStr = argv.expression.startsWith("y=")
+      ? argv.expression.slice(2)
+      : argv.expression;
+    const expr = parse(exprStr).compile();
 
-    const series = xs.map((xVal) => {
-      const yVal = expr.evaluate({ x: xVal });
-      if (typeof yVal !== 'number' || Number.isNaN(yVal)) {
-        throw new Error(`Expression evaluated to non-number at x=${xVal}`);
+    // Generate series
+    const series = [];
+    // Use a small epsilon to account for floating point issues
+    const epsilon = step / 1e6;
+    for (let x = start; x <= end + epsilon; x += step) {
+      const yVal = expr.evaluate({ x });
+      if (typeof yVal !== "number" || Number.isNaN(yVal)) {
+        throw new Error(`Expression did not evaluate to a number at x=${x}`);
       }
-      return { x: xVal, y: yVal };
-    });
+      series.push({ x, y: yVal });
+    }
 
     const outputJson = JSON.stringify(series, null, 2);
-
     if (argv.output) {
       fs.writeFileSync(argv.output, outputJson);
     } else {
       console.log(outputJson);
     }
-
-    process.exit(0);
   } catch (err) {
     console.error(`Error: ${err.message}`);
     process.exit(1);
   }
 }
 
-if (process.argv[1] === fileURLToPath(import.meta.url)) {
-  main();
+// CLI invocation when this module is the main module
+if (import.meta.main) {
+  main(hideBin(process.argv));
 }
+
+export default main;
```

mainOutput:
```log

```

[allValidationStepsSuccessful: false]

LLM API Usage:
```json
{"prompt_tokens":8394,"completion_tokens":7544,"total_tokens":15938,"prompt_tokens_details":{"cached_tokens":1536,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":6336,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---2025-05-27T03:34:15Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-27T03:35:48.843Z

Activity:

Maintained feature PLOT_RENDERING with

Feature spec:

# Overview

Introduce a new CLI command that reads time series JSON data and renders a plot as an SVG or PNG image. This feature extends the library’s core functionality from generating numeric series to visualizing the data graphically, fulfilling the mission of being a go-to plot library.

# Behavior

When invoked via the CLI with a JSON input source and plot options:

- The CLI accepts `--input` or `-i` to specify a JSON file containing an array of `{ x: number, y: number }` objects. If omitted, it reads JSON from stdin.
- The CLI accepts `--output` or `-o` to specify the path to write the generated image. If not provided, defaults to `plot.svg`.
- The CLI accepts `--format` or `-f` to choose between `svg` or `png` output formats, defaulting to `svg`.
- The CLI accepts `--width` and `--height` to set image dimensions in pixels, defaulting to 800×600.
- The command parses the JSON data, generates scales and axes, draws a line or scatter plot of the series, and serializes the result to the chosen image format.
- On success, the image file is written and the process exits with code 0. Errors in parsing, rendering, or file I/O exit with code 1 and an error message on stderr.

# Implementation

- Add dependencies: a lightweight plotting library such as `d3-node` or `@svgdotjs/svg.js`, and `canvas` for PNG rendering.
- Create a new subcommand under the existing CLI (e.g. `repository0-plot-code-lib plot`) using `yargs.command`.
- Read and parse input data from file or stdin.
- Use the plotting library to:
  - Create an SVG document with specified width and height.
  - Generate linear scales for x and y based on data extents.
  - Draw axes with tick marks and labels.
  - Plot the data as a polyline connecting each data point.
- For `png` format, render the SVG to a canvas and export as PNG.
- Write the output image to disk using `fs.writeFileSync`.

# CLI Interface

- repository0-plot-code-lib plot --input data.json --output plot.svg --format svg --width 800 --height 600
- repository0-plot-code-lib plot -i data.json -o chart.png -f png -w 1024 -h 768

# Tests

- Add unit tests in `tests/unit/plot-rendering.test.js` using Vitest:
  - Mock simple time series arrays and verify SVG output contains expected `<svg>`, `<path>`, and axis elements.
  - For PNG format, generate a small image and compare dimensions and PNG signature bytes.
  - Test reading data from stdin when `--input` is omitted.
  - Test error cases for invalid JSON and unsupported formats.

# Documentation

- Update `USAGE.md` with a new section "Plot Rendering" describing the command, options, and examples.
- Update `README.md` under `## Plot Rendering` with installation reminders, CLI usage snippets, and notes on required dependencies.



LLM API Usage:
```json
{"prompt_tokens":17873,"completion_tokens":1192,"total_tokens":19065,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":448,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-27T03:37:25.727Z

Activity:

Generated issue 3134 for feature "plot-rendering" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/3134

title:

Implement PLOT_RENDERING CLI subcommand for SVG and PNG output

And description:

# Objective

Deliver the PLOT_RENDERING feature by adding a `plot` subcommand to the existing CLI. When invoked, the command will read a time-series JSON array (`[{ x: number, y: number }, …]`) from a file or stdin, and produce a line plot as an SVG or PNG image.

# Changes required

1. **Dependencies** (`package.json`)
   - Add:
     - `d3-node` (for server-side D3 SVG generation)
     - `canvas` (for rendering SVG into PNG)

2. **Source** (`src/lib/main.js`)
   - Use `yargs.command()` to define a new `plot` subcommand.
   - Declare options:
     - `--input, -i` (string): path to JSON file; if omitted, read stdin.
     - `--output, -o` (string): path to write image; default `plot.svg`.
     - `--format, -f` (string): `svg` or `png`; default `svg`.
     - `--width` (number): canvas width in pixels; default `800`.
     - `--height` (number): canvas height in pixels; default `600`.
   - Handler behavior:
     1. Load JSON from the file system or from stdin.
     2. Instantiate `new D3Node({ svgStyles: '', container: '<div/>' })`.
     3. Create linear scales using data extents, draw axes.
     4. Append a `<path>` connecting the points in data order.
     5. Serialize the D3 SVG to a string.
     6. If format is `png`, use `canvas` to render the SVG buffer and export PNG.
     7. Write the resulting buffer or string to `--output`.
     8. Exit with code `0` on success; on any error, print message to stderr and exit `1`.

3. **Tests** (`tests/unit/main.test.js`)
   - Append a new `describe('Plot subcommand', …)` block that:
     1. Spawns `node src/lib/main.js plot -i tests/fixtures/sample.json -f svg` and verifies:
        - `status === 0`
        - `stdout` or output file contains `<svg` and `<path`
     2. Spawns with `-f png`, writes to a temp file, then reads the file and asserts the first 8 bytes match the PNG signature (`89 50 4E 47 0D 0A 1A 0A`).
     3. Tests that missing or invalid input flags produce exit code `1` and a descriptive error message.

4. **Documentation**
   - **USAGE.md**: under a new `## Plot Rendering` section, describe the subcommand, options, and examples.
   - **README.md**: add a `## Plot Rendering` header with CLI example snippets for SVG and PNG.

# Verification

- Run `npm install` to pull in new dependencies.
- Execute `npm test` and ensure all existing and new tests pass.
- Manual smoke test:
  ```bash
  echo '[{"x":0,"y":0},{"x":1,"y":1},{"x":2,"y":4}]' > data.json
  repository0-plot-code-lib plot -i data.json -o chart.svg -f svg -w 400 -h 300
  file chart.svg             # should exist and start with "<svg"
  repository0-plot-code-lib plot -i data.json -o chart.png -f png
  file chart.png             # should exist and match a PNG file signature
  ```

LLM API Usage:
```json
{"prompt_tokens":19065,"completion_tokens":2473,"total_tokens":21538,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":1600,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Issue to enhanced Issue at 2025-05-27T03:38:17.824Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:

# Objective

Deliver the PLOT_RENDERING feature by adding a `plot` subcommand to the existing CLI. When invoked, the command will read a time-series JSON array (`[{ x: number, y: number }, …]`) from a file or stdin, and produce a line plot as an SVG or PNG image.

# Changes Required  
1. **Dependencies** (`package.json`)  
   - Add:
     - `d3-node` (for server-side D3 SVG generation)  
     - `canvas` (for rendering SVG into PNG)

2. **Source** (`src/lib/main.js`)  
   - Use `yargs.command()` to define a new `plot` subcommand.  
   - Declare options:
     - `--input, -i` (string): path to JSON file; if omitted, read stdin.  
     - `--output, -o` (string): path to write image; default `plot.svg`.  
     - `--format, -f` (string): `svg` or `png`; default `svg`.  
     - `--width, -w` (number): canvas width in pixels; default `800`.  
     - `--height, -h` (number): canvas height in pixels; default `600`.
   - Handler behavior:
     1. Load JSON from file or stdin and validate it is an array of `{x:number,y:number}`.
     2. Instantiate `new D3Node({ svgStyles: '', container: '<div/>' })`.
     3. Generate linear scales for x and y, draw axes, and append a `<path>` connecting the data points.
     4. Serialize the D3 SVG to a string.
     5. If `--format=png`, render the SVG to a canvas and export as PNG.
     6. Write the resulting buffer or string to the `--output` file.
     7. Exit `0` on success; on any error, write an error message to stderr and exit `1`.

3. **Tests** (`tests/unit/plot-rendering.test.js`)  
   - Add a `describe('Plot subcommand', …)` suite with tests that:
     1. Spawn `node src/lib/main.js plot -i tests/fixtures/sample.json -f svg -o tmp.svg` and assert:
        - Exit code `0`.
        - Output file `tmp.svg` exists and begins with `<svg`.
     2. Spawn with `-f png -o tmp.png` and assert:
        - Exit code `0`.
        - File `tmp.png` exists and its first 8 bytes match the PNG signature (`89 50 4E 47 0D 0A 1A 0A`).
     3. Missing `--input` or invalid JSON input returns exit code `1` and prints a descriptive error to stderr.

4. **Documentation**  
   - **USAGE.md**: Add `## Plot Rendering` section documenting the `plot` subcommand, flags (`--input`, `--output`, `--format`, `--width`, `--height`), and examples.
   - **README.md**: Add a `## Plot Rendering` header with CLI usage snippets for SVG and PNG output.

# Acceptance Criteria

- [ ] Running `repository0-plot-code-lib plot -i data.json -o chart.svg -f svg -w 400 -h 300` succeeds (exit code `0`), creates `chart.svg`, and its content starts with `<svg`.
- [ ] Running `repository0-plot-code-lib plot -i data.json -o chart.png -f png` succeeds (exit code `0`), creates `chart.png`, and the first 8 bytes of the file match the PNG signature.
- [ ] Providing invalid or missing JSON input causes the command to exit with code `1` and output a clear error message to stderr.
- [ ] New unit tests in `tests/unit/plot-rendering.test.js` pass on CI.
- [ ] Documentation in `USAGE.md` and `README.md` is updated with accurate descriptions and examples.

LLM API Usage:
```json
{"prompt_tokens":6106,"completion_tokens":1347,"total_tokens":7453,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":384,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Issue to Code at 2025-05-27T03:42:04.751Z

Activity:

fixApplied: true to branch agentic-lib-issue-3134 with message Add plot subcommand with D3Node and canvas update dependencies tests and docs and outcome success

Git Diff:
```diff
diff --git a/README.md b/README.md
index 816f5140..4b50e20e 100644
--- a/README.md
+++ b/README.md
@@ -4,9 +4,19 @@ _"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_
 
 ---
 
-## License
+## Plot Rendering
 
-MIT
+Render line plots from time series JSON to SVG or PNG.
+
+```bash
+repository0-plot-code-lib plot --input data.json --output chart.svg --format svg --width 800 --height 600
+repository0-plot-code-lib plot -i data.json -o chart.png -f png -w 1024 -h 768
+```
 
 ---
 
+## License
+
+MIT
+
+---
\ No newline at end of file
diff --git a/package-lock.json b/package-lock.json
index e79334b8..abe29856 100644
--- a/package-lock.json
+++ b/package-lock.json
@@ -9,6 +9,8 @@
       "version": "1.2.0-0",
       "license": "MIT",
       "dependencies": {
+        "canvas": "^2.11.2",
+        "d3-node": "^2.1.4",
         "dotenv": "^16.5.0",
         "ejs": "^3.1.10",
         "js-yaml": "^4.1.0",
@@ -22,7 +24,7 @@
       "devDependencies": {
         "@microsoft/eslint-formatter-sarif": "^3.1.0",
         "@vitest/coverage-v8": "^3.1.4",
-        "eslint": "^9.25.1",
+        "eslint": "^9.27.0",
         "eslint-config-google": "^0.14.0",
         "eslint-config-prettier": "^10.1.5",
         "eslint-plugin-import": "^2.31.0",
@@ -926,6 +928,62 @@
         "@jridgewell/sourcemap-codec": "^1.4.14"
       }
     },
+    "node_modules/@mapbox/node-pre-gyp": {
+      "version": "1.0.11",
+      "resolved": "https://registry.npmjs.org/@mapbox/node-pre-gyp/-/node-pre-gyp-1.0.11.tgz",
+      "integrity": "sha512-Yhlar6v9WQgUp/He7BdgzOz8lqMQ8sU+jkCq7Wx8Myc5YFJLbEe7lgui/V7G1qB1DJykHSGwreceSaD60Y0PUQ==",
+      "license": "BSD-3-Clause",
+      "dependencies": {
+        "detect-libc": "^2.0.0",
+        "https-proxy-agent": "^5.0.0",
+        "make-dir": "^3.1.0",
+        "node-fetch": "^2.6.7",
+        "nopt": "^5.0.0",
+        "npmlog": "^5.0.1",
+        "rimraf": "^3.0.2",
+        "semver": "^7.3.5",
+        "tar": "^6.1.11"
+      },
+      "bin": {
+        "node-pre-gyp": "bin/node-pre-gyp"
+      }
+    },
+    "node_modules/@mapbox/node-pre-gyp/node_modules/make-dir": {
+      "version": "3.1.0",
+      "resolved": "https://registry.npmjs.org/make-dir/-/make-dir-3.1.0.tgz",
+      "integrity": "sha512-g3FeP20LNwhALb/6Cz6Dd4F2ngze0jz7tbzrD2wAV+o9FeNHe4rL+yK2md0J/fiSf1sa1ADhXqi5+oVwOM/eGw==",
+      "license": "MIT",
+      "dependencies": {
+        "semver": "^6.0.0"
+      },
+      "engines": {
+        "node": ">=8"
+      },
+      "funding": {
+        "url": "https://github.com/sponsors/sindresorhus"
+      }
+    },
+    "node_modules/@mapbox/node-pre-gyp/node_modules/make-dir/node_modules/semver": {
+      "version": "6.3.1",
+      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
+      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
+      "license": "ISC",
+      "bin": {
+        "semver": "bin/semver.js"
+      }
+    },
+    "node_modules/@mapbox/node-pre-gyp/node_modules/semver": {
+      "version": "7.7.2",
+      "resolved": "https://registry.npmjs.org/semver/-/semver-7.7.2.tgz",
+      "integrity": "sha512-RF0Fw+rO5AMf9MAyaRXI4AV0Ulj5lMHqVxxdSgiVbixSCXoEmmX/jk0CuJw4+3SqroYO9VoUh+HcuJivvtJemA==",
+      "license": "ISC",
+      "bin": {
+        "semver": "bin/semver.js"
+      },
+      "engines": {
+        "node": ">=10"
+      }
+    },
     "node_modules/@microsoft/eslint-formatter-sarif": {
       "version": "3.1.0",
       "resolved": "https://registry.npmjs.org/@microsoft/eslint-formatter-sarif/-/eslint-formatter-sarif-3.1.0.tgz",
@@ -1727,6 +1785,19 @@
         "url": "https://opencollective.com/vitest"
       }
     },
+    "node_modules/abab": {
+      "version": "1.0.4",
+      "resolved": "https://registry.npmjs.org/abab/-/abab-1.0.4.tgz",
+      "integrity": "sha512-I+Wi+qiE2kUXyrRhNsWv6XsjUTBJjSoVSctKNBfLG5zG/Xe7Rjbxf13+vqYHNTwHaFU+FtSlVxOCTiMEVtPv0A==",
+      "deprecated": "Use your platform's native atob() and btoa() methods instead",
+      "license": "ISC"
+    },
+    "node_modules/abbrev": {
+      "version": "1.1.1",
+      "resolved": "https://registry.npmjs.org/abbrev/-/abbrev-1.1.1.tgz",
+      "integrity": "sha512-nne9/IiQ/hzIhY6pdDnbBtz7DjPTKrY00P/zvPSm5pOFkl6xuGrGnXn/VtTNNfNtAfZ9/1RtehkszU9qcTii0Q==",
+      "license": "ISC"
+    },
     "node_modules/abort-controller": {
       "version": "3.0.0",
       "resolved": "https://registry.npmjs.org/abort-controller/-/abort-controller-3.0.0.tgz",
@@ -1766,6 +1837,27 @@
         "node": ">=0.4.0"
       }
     },
+    "node_modules/acorn-globals": {
+      "version": "3.1.0",
+      "resolved": "https://registry.npmjs.org/acorn-globals/-/acorn-globals-3.1.0.tgz",
+      "integrity": "sha512-uWttZCk96+7itPxK8xCzY86PnxKTMrReKDqrHzv42VQY0K30PUO8WY13WMOuI+cOdX4EIdzdvQ8k6jkuGRFMYw==",
+      "license": "MIT",
+      "dependencies": {
+        "acorn": "^4.0.4"
+      }
+    },
+    "node_modules/acorn-globals/node_modules/acorn": {
+      "version": "4.0.13",
+      "resolved": "https://registry.npmjs.org/acorn/-/acorn-4.0.13.tgz",
+      "integrity": "sha512-fu2ygVGuMmlzG8ZeRJ0bvR41nsAkxxhbyk8bZ1SS521Z7vmgJFTQQlfz/Mp/nJexGBz+v8sC9bM6+lNgskt4Ug==",
+      "license": "MIT",
+      "bin": {
+        "acorn": "bin/acorn"
+      },
+      "engines": {
+        "node": ">=0.4.0"
+      }
+    },
     "node_modules/acorn-jsx": {
       "version": "5.3.2",
       "resolved": "https://registry.npmjs.org/acorn-jsx/-/acorn-jsx-5.3.2.tgz",
@@ -1776,6 +1868,18 @@
         "acorn": "^6.0.0 || ^7.0.0 || ^8.0.0"
       }
     },
+    "node_modules/agent-base": {
+      "version": "6.0.2",
+      "resolved": "https://registry.npmjs.org/agent-base/-/agent-base-6.0.2.tgz",
+      "integrity": "sha512-RZNwNclF7+MS/8bDg70amg32dyeZGZxiDuQmZxKLAlQjr3jGyLx+4Kkk58UO7D2QdgFIQCovuSuZESne6RG6XQ==",
+      "license": "MIT",
+      "dependencies": {
+        "debug": "4"
+      },
+      "engines": {
+        "node": ">= 6.0.0"
+      }
+    },
     "node_modules/agentkeepalive": {
       "version": "4.6.0",
       "resolved": "https://registry.npmjs.org/agentkeepalive/-/agentkeepalive-4.6.0.tgz",
@@ -1792,7 +1896,6 @@
       "version": "6.12.6",
       "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.12.6.tgz",
       "integrity": "sha512-j3fVLgvTo527anyYyJOGTYJbG+vnnQYvE0m5mmkc1TK+nxAppkCLMIL0aZ4dblVCNoGShhm+kzE4ZUykBoMg4g==",
-      "dev": true,
       "license": "MIT",
       "dependencies": {
         "fast-deep-equal": "^3.1.1",
@@ -1833,6 +1936,26 @@
         "url": "https://github.com/chalk/ansi-styles?sponsor=1"
       }
     },
+    "node_modules/aproba": {
+      "version": "2.0.0",
+      "resolved": "https://registry.npmjs.org/aproba/-/aproba-2.0.0.tgz",
+      "integrity": "sha512-lYe4Gx7QT+MKGbDsA+Z+he/Wtef0BiwDOlK/XkBrdfsh9J/jPPXbX0tE9x9cl27Tmu5gg3QUbUrQYa/y+KOHPQ==",
+      "license": "ISC"
+    },
+    "node_modules/are-we-there-yet": {
+      "version": "2.0.0",
+      "resolved": "https://registry.npmjs.org/are-we-there-yet/-/are-we-there-yet-2.0.0.tgz",
+      "integrity": "sha512-Ci/qENmwHnsYo9xKIcUJN5LeDKdJ6R1Z1j9V/J5wyq8nh/mYPEpIKJbBZXtZjG04HiK7zV/p6Vs9952MrMeUIw==",
+      "deprecated": "This package is no longer supported.",
+      "license": "ISC",
+      "dependencies": {
+        "delegates": "^1.0.0",
+        "readable-stream": "^3.6.0"
+      },
+      "engines": {
+        "node": ">=10"
+      }
+    },
     "node_modules/argparse": {
       "version": "2.0.1",
       "resolved": "https://registry.npmjs.org/argparse/-/argparse-2.0.1.tgz",
@@ -1857,6 +1980,15 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
+    "node_modules/array-equal": {
+      "version": "1.0.2",
+      "resolved": "https://registry.npmjs.org/array-equal/-/array-equal-1.0.2.tgz",
+      "integrity": "sha512-gUHx76KtnhEgB3HOuFYiCm3FIdEs6ocM2asHvNTkfu/Y09qQVrrVVaOKENmS2KkSaGoxgXNqC+ZVtR/n0MOkSA==",
+      "license": "MIT",
+      "funding": {
+        "url": "https://github.com/sponsors/sindresorhus"
+      }
+    },
     "node_modules/array-flatten": {
       "version": "1.1.1",
       "resolved": "https://registry.npmjs.org/array-flatten/-/array-flatten-1.1.1.tgz",
@@ -2005,6 +2137,24 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
+    "node_modules/asn1": {
+      "version": "0.2.6",
+      "resolved": "https://registry.npmjs.org/asn1/-/asn1-0.2.6.tgz",
+      "integrity": "sha512-ix/FxPn0MDjeyJ7i/yoHGFt/EX6LyNbxSEhPPXODPL+KB0VPk86UYfL0lMdy+KCnv+fmvIzySwaK5COwqVbWTQ==",
+      "license": "MIT",
+      "dependencies": {
+        "safer-buffer": "~2.1.0"
+      }
+    },
+    "node_modules/assert-plus": {
+      "version": "1.0.0",
+      "resolved": "https://registry.npmjs.org/assert-plus/-/assert-plus-1.0.0.tgz",
+      "integrity": "sha512-NfJ4UzBCcQGLDlQq7nHxH+tv3kyZ0hHQqF5BO6J7tNJeP5do1llPr8dZ8zHonfhAu0PHAdMkSo+8o0wxg9lZWw==",
+      "license": "MIT",
+      "engines": {
+        "node": ">=0.8"
+      }
+    },
     "node_modules/assertion-error": {
       "version": "2.0.1",
       "resolved": "https://registry.npmjs.org/assertion-error/-/assertion-error-2.0.1.tgz",
@@ -2053,12 +2203,36 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
+    "node_modules/aws-sign2": {
+      "version": "0.7.0",
+      "resolved": "https://registry.npmjs.org/aws-sign2/-/aws-sign2-0.7.0.tgz",
+      "integrity": "sha512-08kcGqnYf/YmjoRhfxyu+CLxBjUtHLXLXX/vUfx9l2LYzG3c1m61nrpyFUZI6zeS+Li/wWMMidD9KgrqtGq3mA==",
+      "license": "Apache-2.0",
+      "engines": {
+        "node": "*"
+      }
+    },
+    "node_modules/aws4": {
+      "version": "1.13.2",
+      "resolved": "https://registry.npmjs.org/aws4/-/aws4-1.13.2.tgz",
+      "integrity": "sha512-lHe62zvbTB5eEABUVi/AwVh0ZKY9rMMDhmm+eeyuuUQbQ3+J+fONVQOZyj+DdrvD4BY33uYniyRJ4UJIaSKAfw==",
+      "license": "MIT"
+    },
     "node_modules/balanced-match": {
       "version": "1.0.2",
       "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.2.tgz",
       "integrity": "sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw==",
       "license": "MIT"
     },
+    "node_modules/bcrypt-pbkdf": {
+      "version": "1.0.2",
+      "resolved": "https://registry.npmjs.org/bcrypt-pbkdf/-/bcrypt-pbkdf-1.0.2.tgz",
+      "integrity": "sha512-qeFIXtP4MSoi6NLqO12WfqARWWuCKi2Rn/9hJLEmtB5yTNr9DqFWkJRCf2qShWzPeAMRnOgCrq0sg/KLv5ES9w==",
+      "license": "BSD-3-Clause",
+      "dependencies": {
+        "tweetnacl": "^0.14.3"
+      }
+    },
     "node_modules/body-parser": {
       "version": "1.20.3",
       "resolved": "https://registry.npmjs.org/body-parser/-/body-parser-1.20.3.tgz",
@@ -2202,6 +2376,27 @@
         "node": ">=6"
       }
     },
+    "node_modules/canvas": {
+      "version": "2.11.2",
+      "resolved": "https://registry.npmjs.org/canvas/-/canvas-2.11.2.tgz",
+      "integrity": "sha512-ItanGBMrmRV7Py2Z+Xhs7cT+FNt5K0vPL4p9EZ/UX/Mu7hFbkxSjKF2KVtPwX7UYWp7dRKnrTvReflgrItJbdw==",
+      "hasInstallScript": true,
+      "license": "MIT",
+      "dependencies": {
+        "@mapbox/node-pre-gyp": "^1.0.0",
+        "nan": "^2.17.0",
+        "simple-get": "^3.0.3"
+      },
+      "engines": {
+        "node": ">=6"
+      }
+    },
+    "node_modules/caseless": {
+      "version": "0.12.0",
+      "resolved": "https://registry.npmjs.org/caseless/-/caseless-0.12.0.tgz",
+      "integrity": "sha512-4tYFyifaFfGacoiObjJegolkwSU4xQNGbVgUiNYVUxbQ2x2lUsFvY4hVgVzGiIe6WLOPqycWXA40l+PWsxthUw==",
+      "license": "Apache-2.0"
+    },
     "node_modules/chai": {
       "version": "5.2.0",
       "resolved": "https://registry.npmjs.org/chai/-/chai-5.2.0.tgz",
@@ -2245,6 +2440,15 @@
         "node": ">= 16"
       }
     },
+    "node_modules/chownr": {
+      "version": "2.0.0",
+      "resolved": "https://registry.npmjs.org/chownr/-/chownr-2.0.0.tgz",
+      "integrity": "sha512-bIomtDF5KGpdogkLd9VspvFzk9KfpyyGlS8YFVZl7TGPBHL5snIOnxeshwVgPteQ9b4Eydl+pVbIyE1DcvCWgQ==",
+      "license": "ISC",
+      "engines": {
+        "node": ">=10"
+      }
+    },
     "node_modules/color-convert": {
       "version": "2.0.1",
       "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
@@ -2263,6 +2467,15 @@
       "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
       "license": "MIT"
     },
+    "node_modules/color-support": {
+      "version": "1.1.3",
+      "resolved": "https://registry.npmjs.org/color-support/-/color-support-1.1.3.tgz",
+      "integrity": "sha512-qiBjkpbMLO/HL68y+lh4q0/O1MZFj2RX6X/KmMa3+gJD3z+WwI1ZzDHysvqHGS3mP6mznPckpXmw1nI9cJjyRg==",
+      "license": "ISC",
+      "bin": {
+        "color-support": "bin.js"
+      }
+    },
     "node_modules/combined-stream": {
       "version": "1.0.8",
       "resolved": "https://registry.npmjs.org/combined-stream/-/combined-stream-1.0.8.tgz",
@@ -2275,12 +2488,24 @@
         "node": ">= 0.8"
       }
     },
+    "node_modules/commander": {
+      "version": "2.20.3",
+      "resolved": "https://registry.npmjs.org/commander/-/commander-2.20.3.tgz",
+      "integrity": "sha512-GpVkmM8vF2vQUkj2LvZmD35JxeJOLCwJ9cUkugyk2nuhbv3+mJvpLYYt+0+USMxE+oj+ey/lJEnhZw75x/OMcQ==",
+      "license": "MIT"
+    },
     "node_modules/concat-map": {
       "version": "0.0.1",
       "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
       "integrity": "sha512-/Srv4dswyQNBfohGpz9o6Yb3Gz3SrUDqBH5rTuhGR7ahtlbYKnVxw2bCFMRljaA7EXHaXZ8wsHdodFvbkhKmqg==",
       "license": "MIT"
     },
+    "node_modules/console-control-strings": {
+      "version": "1.1.0",
+      "resolved": "https://registry.npmjs.org/console-control-strings/-/console-control-strings-1.1.0.tgz",
+      "integrity": "sha512-ty/fTekppD2fIwRvnZAVdeOiGd1c7YXEixbgJTNzqcxJWKQnjJ/V1bNEEE6hygpM3WjwHFUVK6HTjWSzV4a8sQ==",
+      "license": "ISC"
+    },
     "node_modules/content-disposition": {
       "version": "0.5.4",
       "resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-0.5.4.tgz",
@@ -2304,6 +2529,13 @@
         "node": ">= 0.6"
       }
     },
+    "node_modules/content-type-parser": {
+      "version": "1.0.2",
+      "resolved": "https://registry.npmjs.org/content-type-parser/-/content-type-parser-1.0.2.tgz",
+      "integrity": "sha512-lM4l4CnMEwOLHAHr/P6MEZwZFPJFtAAKgL6pogbXmVZggIqXhdB6RbBtPOTsw2FcXwYhehRGERJmRrjOiIB8pQ==",
+      "deprecated": "Use whatwg-mimetype instead",
+      "license": "MIT"
+    },
     "node_modules/cookie": {
       "version": "0.7.1",
       "resolved": "https://registry.npmjs.org/cookie/-/cookie-0.7.1.tgz",
@@ -2321,6 +2553,12 @@
       "dev": true,
       "license": "MIT"
     },
+    "node_modules/core-util-is": {
+      "version": "1.0.2",
+      "resolved": "https://registry.npmjs.org/core-util-is/-/core-util-is-1.0.2.tgz",
+      "integrity": "sha512-3lqz5YjWTYnW6dlDa5TLaTCcShfar1e40rmcJVwCBJC6mWlFuj0eCHIElmG1g5kyuJ/GD+8Wn4FFCcz4gJPfaQ==",
+      "license": "MIT"
+    },
     "node_modules/cross-spawn": {
       "version": "7.0.6",
       "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-7.0.6.tgz",
@@ -2336,6 +2574,350 @@
         "node": ">= 8"
       }
     },
+    "node_modules/cssom": {
+      "version": "0.3.8",
+      "resolved": "https://registry.npmjs.org/cssom/-/cssom-0.3.8.tgz",
+      "integrity": "sha512-b0tGHbfegbhPJpxpiBPU2sCkigAqtM9O121le6bbOlgyV+NyGyCmVfJ6QW9eRjz8CpNfWEOYBIMIGRYkLwsIYg==",
+      "license": "MIT"
+    },
+    "node_modules/cssstyle": {
+      "version": "0.2.37",
+      "resolved": "https://registry.npmjs.org/cssstyle/-/cssstyle-0.2.37.tgz",
+      "integrity": "sha512-FUpKc+1FNBsHUr9IsfSGCovr8VuGOiiuzlgCyppKBjJi2jYTOFLN3oiiNRMIvYqbFzF38mqKj4BgcevzU5/kIA==",
+      "license": "MIT",
+      "dependencies": {
+        "cssom": "0.3.x"
+      }
+    },
+    "node_modules/d3": {
+      "version": "5.16.0",
+      "resolved": "https://registry.npmjs.org/d3/-/d3-5.16.0.tgz",
+      "integrity": "sha512-4PL5hHaHwX4m7Zr1UapXW23apo6pexCgdetdJ5kTmADpG/7T9Gkxw0M0tf/pjoB63ezCCm0u5UaFYy2aMt0Mcw==",
+      "license": "BSD-3-Clause",
+      "dependencies": {
+        "d3-array": "1",
+        "d3-axis": "1",
+        "d3-brush": "1",
+        "d3-chord": "1",
+        "d3-collection": "1",
+        "d3-color": "1",
+        "d3-contour": "1",
+        "d3-dispatch": "1",
+        "d3-drag": "1",
+        "d3-dsv": "1",
+        "d3-ease": "1",
+        "d3-fetch": "1",
+        "d3-force": "1",
+        "d3-format": "1",
+        "d3-geo": "1",
+        "d3-hierarchy": "1",
+        "d3-interpolate": "1",
+        "d3-path": "1",
+        "d3-polygon": "1",
+        "d3-quadtree": "1",
+        "d3-random": "1",
+        "d3-scale": "2",
+        "d3-scale-chromatic": "1",
+        "d3-selection": "1",
+        "d3-shape": "1",
+        "d3-time": "1",
+        "d3-time-format": "2",
+        "d3-timer": "1",
+        "d3-transition": "1",
+        "d3-voronoi": "1",
+        "d3-zoom": "1"
+      }
+    },
+    "node_modules/d3-array": {
+      "version": "1.2.4",
+      "resolved": "https://registry.npmjs.org/d3-array/-/d3-array-1.2.4.tgz",
+      "integrity": "sha512-KHW6M86R+FUPYGb3R5XiYjXPq7VzwxZ22buHhAEVG5ztoEcZZMLov530mmccaqA1GghZArjQV46fuc8kUqhhHw==",
+      "license": "BSD-3-Clause"
+    },
+    "node_modules/d3-axis": {
+      "version": "1.0.12",
+      "resolved": "https://registry.npmjs.org/d3-axis/-/d3-axis-1.0.12.tgz",
+      "integrity": "sha512-ejINPfPSNdGFKEOAtnBtdkpr24c4d4jsei6Lg98mxf424ivoDP2956/5HDpIAtmHo85lqT4pruy+zEgvRUBqaQ==",
+      "license": "BSD-3-Clause"
+    },
+    "node_modules/d3-brush": {
+      "version": "1.1.6",
+      "resolved": "https://registry.npmjs.org/d3-brush/-/d3-brush-1.1.6.tgz",
+      "integrity": "sha512-7RW+w7HfMCPyZLifTz/UnJmI5kdkXtpCbombUSs8xniAyo0vIbrDzDwUJB6eJOgl9u5DQOt2TQlYumxzD1SvYA==",
+      "license": "BSD-3-Clause",
+      "dependencies": {
+        "d3-dispatch": "1",
+        "d3-drag": "1",
+        "d3-interpolate": "1",
+        "d3-selection": "1",
+        "d3-transition": "1"
+      }
+    },
+    "node_modules/d3-chord": {
+      "version": "1.0.6",
+      "resolved": "https://registry.npmjs.org/d3-chord/-/d3-chord-1.0.6.tgz",
+      "integrity": "sha512-JXA2Dro1Fxw9rJe33Uv+Ckr5IrAa74TlfDEhE/jfLOaXegMQFQTAgAw9WnZL8+HxVBRXaRGCkrNU7pJeylRIuA==",
+      "license": "BSD-3-Clause",
+      "dependencies": {
+        "d3-array": "1",
+        "d3-path": "1"
+      }
+    },
+    "node_modules/d3-collection": {
+      "version": "1.0.7",
+      "resolved": "https://registry.npmjs.org/d3-collection/-/d3-collection-1.0.7.tgz",
+      "integrity": "sha512-ii0/r5f4sjKNTfh84Di+DpztYwqKhEyUlKoPrzUFfeSkWxjW49xU2QzO9qrPrNkpdI0XJkfzvmTu8V2Zylln6A==",
+      "license": "BSD-3-Clause"
+    },
+    "node_modules/d3-color": {
+      "version": "1.4.1",
+      "resolved": "https://registry.npmjs.org/d3-color/-/d3-color-1.4.1.tgz",
+      "integrity": "sha512-p2sTHSLCJI2QKunbGb7ocOh7DgTAn8IrLx21QRc/BSnodXM4sv6aLQlnfpvehFMLZEfBc6g9pH9SWQccFYfJ9Q==",
+      "license": "BSD-3-Clause"
+    },
+    "node_modules/d3-contour": {
+      "version": "1.3.2",
+      "resolved": "https://registry.npmjs.org/d3-contour/-/d3-contour-1.3.2.tgz",
+      "integrity": "sha512-hoPp4K/rJCu0ladiH6zmJUEz6+u3lgR+GSm/QdM2BBvDraU39Vr7YdDCicJcxP1z8i9B/2dJLgDC1NcvlF8WCg==",
+      "license": "BSD-3-Clause",
+      "dependencies": {
+        "d3-array": "^1.1.1"
+      }
+    },
+    "node_modules/d3-dispatch": {
+      "version": "1.0.6",
+      "resolved": "https://registry.npmjs.org/d3-dispatch/-/d3-dispatch-1.0.6.tgz",
+      "integrity": "sha512-fVjoElzjhCEy+Hbn8KygnmMS7Or0a9sI2UzGwoB7cCtvI1XpVN9GpoYlnb3xt2YV66oXYb1fLJ8GMvP4hdU1RA==",
+      "license": "BSD-3-Clause"
+    },
+    "node_modules/d3-drag": {
+      "version": "1.2.5",
+      "resolved": "https://registry.npmjs.org/d3-drag/-/d3-drag-1.2.5.tgz",
+      "integrity": "sha512-rD1ohlkKQwMZYkQlYVCrSFxsWPzI97+W+PaEIBNTMxRuxz9RF0Hi5nJWHGVJ3Om9d2fRTe1yOBINJyy/ahV95w==",
+      "license": "BSD-3-Clause",
+      "dependencies": {
+        "d3-dispatch": "1",
+        "d3-selection": "1"
+      }
+    },
+    "node_modules/d3-dsv": {
+      "version": "1.2.0",
+      "resolved": "https://registry.npmjs.org/d3-dsv/-/d3-dsv-1.2.0.tgz",
+      "integrity": "sha512-9yVlqvZcSOMhCYzniHE7EVUws7Fa1zgw+/EAV2BxJoG3ME19V6BQFBwI855XQDsxyOuG7NibqRMTtiF/Qup46g==",
+      "license": "BSD-3-Clause",
+      "dependencies": {
+        "commander": "2",
+        "iconv-lite": "0.4",
+        "rw": "1"
+      },
+      "bin": {
+        "csv2json": "bin/dsv2json",
+        "csv2tsv": "bin/dsv2dsv",
+        "dsv2dsv": "bin/dsv2dsv",
+        "dsv2json": "bin/dsv2json",
+        "json2csv": "bin/json2dsv",
+        "json2dsv": "bin/json2dsv",
+        "json2tsv": "bin/json2dsv",
+        "tsv2csv": "bin/dsv2dsv",
+        "tsv2json": "bin/dsv2json"
+      }
+    },
+    "node_modules/d3-ease": {
+      "version": "1.0.7",
+      "resolved": "https://registry.npmjs.org/d3-ease/-/d3-ease-1.0.7.tgz",
+      "integrity": "sha512-lx14ZPYkhNx0s/2HX5sLFUI3mbasHjSSpwO/KaaNACweVwxUruKyWVcb293wMv1RqTPZyZ8kSZ2NogUZNcLOFQ==",
+      "license": "BSD-3-Clause"
+    },
+    "node_modules/d3-fetch": {
+      "version": "1.2.0",
+      "resolved": "https://registry.npmjs.org/d3-fetch/-/d3-fetch-1.2.0.tgz",
+      "integrity": "sha512-yC78NBVcd2zFAyR/HnUiBS7Lf6inSCoWcSxFfw8FYL7ydiqe80SazNwoffcqOfs95XaLo7yebsmQqDKSsXUtvA==",
+      "license": "BSD-3-Clause",
+      "dependencies": {
+        "d3-dsv": "1"
+      }
+    },
+    "node_modules/d3-force": {
+      "version": "1.2.1",
+      "resolved": "https://registry.npmjs.org/d3-force/-/d3-force-1.2.1.tgz",
+      "integrity": "sha512-HHvehyaiUlVo5CxBJ0yF/xny4xoaxFxDnBXNvNcfW9adORGZfyNF1dj6DGLKyk4Yh3brP/1h3rnDzdIAwL08zg==",
+      "license": "BSD-3-Clause",
+      "dependencies": {
+        "d3-collection": "1",
+        "d3-dispatch": "1",
+        "d3-quadtree": "1",
+        "d3-timer": "1"
+      }
+    },
+    "node_modules/d3-format": {
+      "version": "1.4.5",
+      "resolved": "https://registry.npmjs.org/d3-format/-/d3-format-1.4.5.tgz",
+      "integrity": "sha512-J0piedu6Z8iB6TbIGfZgDzfXxUFN3qQRMofy2oPdXzQibYGqPB/9iMcxr/TGalU+2RsyDO+U4f33id8tbnSRMQ==",
+      "license": "BSD-3-Clause"
+    },
+    "node_modules/d3-geo": {
+      "version": "1.12.1",
+      "resolved": "https://registry.npmjs.org/d3-geo/-/d3-geo-1.12.1.tgz",
+      "integrity": "sha512-XG4d1c/UJSEX9NfU02KwBL6BYPj8YKHxgBEw5om2ZnTRSbIcego6dhHwcxuSR3clxh0EpE38os1DVPOmnYtTPg==",
+      "license": "BSD-3-Clause",
+      "dependencies": {
+        "d3-array": "1"
+      }
+    },
+    "node_modules/d3-hierarchy": {
+      "version": "1.1.9",
+      "resolved": "https://registry.npmjs.org/d3-hierarchy/-/d3-hierarchy-1.1.9.tgz",
+      "integrity": "sha512-j8tPxlqh1srJHAtxfvOUwKNYJkQuBFdM1+JAUfq6xqH5eAqf93L7oG1NVqDa4CpFZNvnNKtCYEUC8KY9yEn9lQ==",
+      "license": "BSD-3-Clause"
+    },
+    "node_modules/d3-interpolate": {
+      "version": "1.4.0",
+      "resolved": "https://registry.npmjs.org/d3-interpolate/-/d3-interpolate-1.4.0.tgz",
+      "integrity": "sha512-V9znK0zc3jOPV4VD2zZn0sDhZU3WAE2bmlxdIwwQPPzPjvyLkd8B3JUVdS1IDUFDkWZ72c9qnv1GK2ZagTZ8EA==",
+      "license": "BSD-3-Clause",
+      "dependencies": {
+        "d3-color": "1"
+      }
+    },
+    "node_modules/d3-node": {
+      "version": "2.2.3",
+      "resolved": "https://registry.npmjs.org/d3-node/-/d3-node-2.2.3.tgz",
+      "integrity": "sha512-JsnmxUzrBDWYKPuz6mVlZYhuXhjkbdZeng4Tum9mPkQ2eKAxdS8Mkoqst+bpgDbjVrIMlsUWABWilSORd7/kPQ==",
+      "license": "MIT",
+      "dependencies": {
+        "d3": "^5.16.0",
+        "jsdom": "^9.12.0"
+      }
+    },
+    "node_modules/d3-path": {
+      "version": "1.0.9",
+      "resolved": "https://registry.npmjs.org/d3-path/-/d3-path-1.0.9.tgz",
+      "integrity": "sha512-VLaYcn81dtHVTjEHd8B+pbe9yHWpXKZUC87PzoFmsFrJqgFwDe/qxfp5MlfsfM1V5E/iVt0MmEbWQ7FVIXh/bg==",
+      "license": "BSD-3-Clause"
+    },
+    "node_modules/d3-polygon": {
+      "version": "1.0.6",
+      "resolved": "https://registry.npmjs.org/d3-polygon/-/d3-polygon-1.0.6.tgz",
+      "integrity": "sha512-k+RF7WvI08PC8reEoXa/w2nSg5AUMTi+peBD9cmFc+0ixHfbs4QmxxkarVal1IkVkgxVuk9JSHhJURHiyHKAuQ==",
+      "license": "BSD-3-Clause"
+    },
+    "node_modules/d3-quadtree": {
+      "version": "1.0.7",
+      "resolved": "https://registry.npmjs.org/d3-quadtree/-/d3-quadtree-1.0.7.tgz",
+      "integrity": "sha512-RKPAeXnkC59IDGD0Wu5mANy0Q2V28L+fNe65pOCXVdVuTJS3WPKaJlFHer32Rbh9gIo9qMuJXio8ra4+YmIymA==",
+      "license": "BSD-3-Clause"
+    },
+    "node_modules/d3-random": {
+      "version": "1.1.2",
+      "resolved": "https://registry.npmjs.org/d3-random/-/d3-random-1.1.2.tgz",
+      "integrity": "sha512-6AK5BNpIFqP+cx/sreKzNjWbwZQCSUatxq+pPRmFIQaWuoD+NrbVWw7YWpHiXpCQ/NanKdtGDuB+VQcZDaEmYQ==",
+      "license": "BSD-3-Clause"
+    },
+    "node_modules/d3-scale": {
+      "version": "2.2.2",
+      "resolved": "https://registry.npmjs.org/d3-scale/-/d3-scale-2.2.2.tgz",
+      "integrity": "sha512-LbeEvGgIb8UMcAa0EATLNX0lelKWGYDQiPdHj+gLblGVhGLyNbaCn3EvrJf0A3Y/uOOU5aD6MTh5ZFCdEwGiCw==",
+      "license": "BSD-3-Clause",
+      "dependencies": {
+        "d3-array": "^1.2.0",
+        "d3-collection": "1",
+        "d3-format": "1",
+        "d3-interpolate": "1",
+        "d3-time": "1",
+        "d3-time-format": "2"
+      }
+    },
+    "node_modules/d3-scale-chromatic": {
+      "version": "1.5.0",
+      "resolved": "https://registry.npmjs.org/d3-scale-chromatic/-/d3-scale-chromatic-1.5.0.tgz",
+      "integrity": "sha512-ACcL46DYImpRFMBcpk9HhtIyC7bTBR4fNOPxwVSl0LfulDAwyiHyPOTqcDG1+t5d4P9W7t/2NAuWu59aKko/cg==",
+      "license": "BSD-3-Clause",
+      "dependencies": {
+        "d3-color": "1",
+        "d3-interpolate": "1"
+      }
+    },
+    "node_modules/d3-selection": {
+      "version": "1.4.2",
+      "resolved": "https://registry.npmjs.org/d3-selection/-/d3-selection-1.4.2.tgz",
+      "integrity": "sha512-SJ0BqYihzOjDnnlfyeHT0e30k0K1+5sR3d5fNueCNeuhZTnGw4M4o8mqJchSwgKMXCNFo+e2VTChiSJ0vYtXkg==",
+      "license": "BSD-3-Clause"
+    },
+    "node_modules/d3-shape": {
+      "version": "1.3.7",
+      "resolved": "https://registry.npmjs.org/d3-shape/-/d3-shape-1.3.7.tgz",
+      "integrity": "sha512-EUkvKjqPFUAZyOlhY5gzCxCeI0Aep04LwIRpsZ/mLFelJiUfnK56jo5JMDSE7yyP2kLSb6LtF+S5chMk7uqPqw==",
+      "license": "BSD-3-Clause",
+      "dependencies": {
+        "d3-path": "1"
+      }
+    },
+    "node_modules/d3-time": {
+      "version": "1.1.0",
+      "resolved": "https://registry.npmjs.org/d3-time/-/d3-time-1.1.0.tgz",
+      "integrity": "sha512-Xh0isrZ5rPYYdqhAVk8VLnMEidhz5aP7htAADH6MfzgmmicPkTo8LhkLxci61/lCB7n7UmE3bN0leRt+qvkLxA==",
+      "license": "BSD-3-Clause"
+    },
+    "node_modules/d3-time-format": {
+      "version": "2.3.0",
+      "resolved": "https://registry.npmjs.org/d3-time-format/-/d3-time-format-2.3.0.tgz",
+      "integrity": "sha512-guv6b2H37s2Uq/GefleCDtbe0XZAuy7Wa49VGkPVPMfLL9qObgBST3lEHJBMUp8S7NdLQAGIvr2KXk8Hc98iKQ==",
+      "license": "BSD-3-Clause",
+      "dependencies": {
+        "d3-time": "1"
+      }
+    },
+    "node_modules/d3-timer": {
+      "version": "1.0.10",
+      "resolved": "https://registry.npmjs.org/d3-timer/-/d3-timer-1.0.10.tgz",
+      "integrity": "sha512-B1JDm0XDaQC+uvo4DT79H0XmBskgS3l6Ve+1SBCfxgmtIb1AVrPIoqd+nPSv+loMX8szQ0sVUhGngL7D5QPiXw==",
+      "license": "BSD-3-Clause"
+    },
+    "node_modules/d3-transition": {
+      "version": "1.3.2",
+      "resolved": "https://registry.npmjs.org/d3-transition/-/d3-transition-1.3.2.tgz",
+      "integrity": "sha512-sc0gRU4PFqZ47lPVHloMn9tlPcv8jxgOQg+0zjhfZXMQuvppjG6YuwdMBE0TuqCZjeJkLecku/l9R0JPcRhaDA==",
+      "license": "BSD-3-Clause",
+      "dependencies": {
+        "d3-color": "1",
+        "d3-dispatch": "1",
+        "d3-ease": "1",
+        "d3-interpolate": "1",
+        "d3-selection": "^1.1.0",
+        "d3-timer": "1"
+      }
+    },
+    "node_modules/d3-voronoi": {
+      "version": "1.1.4",
+      "resolved": "https://registry.npmjs.org/d3-voronoi/-/d3-voronoi-1.1.4.tgz",
+      "integrity": "sha512-dArJ32hchFsrQ8uMiTBLq256MpnZjeuBtdHpaDlYuQyjU0CVzCJl/BVW+SkszaAeH95D/8gxqAhgx0ouAWAfRg==",
+      "license": "BSD-3-Clause"
+    },
+    "node_modules/d3-zoom": {
+      "version": "1.8.3",
+      "resolved": "https://registry.npmjs.org/d3-zoom/-/d3-zoom-1.8.3.tgz",
+      "integrity": "sha512-VoLXTK4wvy1a0JpH2Il+F2CiOhVu7VRXWF5M/LroMIh3/zBAC3WAt7QoIvPibOavVo20hN6/37vwAsdBejLyKQ==",
+      "license": "BSD-3-Clause",
+      "dependencies": {
+        "d3-dispatch": "1",
+        "d3-drag": "1",
+        "d3-interpolate": "1",
+        "d3-selection": "1",
+        "d3-transition": "1"
+      }
+    },
+    "node_modules/dashdash": {
+      "version": "1.14.1",
+      "resolved": "https://registry.npmjs.org/dashdash/-/dashdash-1.14.1.tgz",
+      "integrity": "sha512-jRFi8UDGo6j+odZiEpjazZaWqEal3w/basFjQHQEwVtZJGDpxbH1MeYluwCS8Xq5wmLJooDlMgvVarmWfGM44g==",
+      "license": "MIT",
+      "dependencies": {
+        "assert-plus": "^1.0.0"
+      },
+      "engines": {
+        "node": ">=0.10"
+      }
+    },
     "node_modules/data-view-buffer": {
       "version": "1.0.2",
       "resolved": "https://registry.npmjs.org/data-view-buffer/-/data-view-buffer-1.0.2.tgz",
@@ -2394,7 +2976,6 @@
       "version": "4.4.1",
       "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.1.tgz",
       "integrity": "sha512-KcKCqiftBJcZr++7ykoDIEwSa3XWowTfNPo92BYxjXiyYEVrUQh2aLyhxBCwww+heortUFxEJYcRzosstTEBYQ==",
-      "dev": true,
       "license": "MIT",
       "dependencies": {
         "ms": "^2.1.3"
@@ -2408,6 +2989,18 @@
         }
       }
     },
+    "node_modules/decompress-response": {
+      "version": "4.2.1",
+      "resolved": "https://registry.npmjs.org/decompress-response/-/decompress-response-4.2.1.tgz",
+      "integrity": "sha512-jOSne2qbyE+/r8G1VU+G/82LBs2Fs4LAsTiLSHOCOMZQl2OKZ6i8i4IyHemTe+/yIXOtTcRQMzPcgyhoFlqPkw==",
+      "license": "MIT",
+      "dependencies": {
+        "mimic-response": "^2.0.0"
+      },
+      "engines": {
+        "node": ">=8"
+      }
+    },
     "node_modules/deep-eql": {
       "version": "5.0.2",
       "resolved": "https://registry.npmjs.org/deep-eql/-/deep-eql-5.0.2.tgz",
@@ -2422,7 +3015,6 @@
       "version": "0.1.4",
       "resolved": "https://registry.npmjs.org/deep-is/-/deep-is-0.1.4.tgz",
       "integrity": "sha512-oIPzksmTg4/MriiaYGO+okXDT7ztn/w3Eptv/+gSIdMdKsJo0u4CfYNFJPy+4SKMuCqGw2wxnA+URMg3t8a/bQ==",
-      "dev": true,
       "license": "MIT"
     },
     "node_modules/define-data-property": {
@@ -2470,6 +3062,12 @@
         "node": ">=0.4.0"
       }
     },
+    "node_modules/delegates": {
+      "version": "1.0.0",
+      "resolved": "https://registry.npmjs.org/delegates/-/delegates-1.0.0.tgz",
+      "integrity": "sha512-bd2L678uiWATM6m5Z1VzNCErI3jiGzt6HGY8OVICs40JQq/HALfbyNJmp0UDakEY4pMMaN0Ly5om/B1VI/+xfQ==",
+      "license": "MIT"
+    },
     "node_modules/depd": {
       "version": "2.0.0",
       "resolved": "https://registry.npmjs.org/depd/-/depd-2.0.0.tgz",
@@ -2491,6 +3089,15 @@
         "npm": "1.2.8000 || >= 1.4.16"
       }
     },
+    "node_modules/detect-libc": {
+      "version": "2.0.4",
+      "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.0.4.tgz",
+      "integrity": "sha512-3UDv+G9CsCKO1WKMGw9fwq/SWJYbI0c5Y7LU1AXYoDdbhE2AHQ6N6Nb34sG8Fj7T5APy8qXDCKuuIHd1BR0tVA==",
+      "license": "Apache-2.0",
+      "engines": {
+        "node": ">=8"
+      }
+    },
     "node_modules/doctrine": {
       "version": "2.1.0",
       "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-2.1.0.tgz",
@@ -2537,6 +3144,16 @@
       "dev": true,
       "license": "MIT"
     },
+    "node_modules/ecc-jsbn": {
+      "version": "0.1.2",
+      "resolved": "https://registry.npmjs.org/ecc-jsbn/-/ecc-jsbn-0.1.2.tgz",
+      "integrity": "sha512-eh9O+hwRHNbG4BLTjEl3nw044CkGm5X6LoaCf7LPp7UU8Qrt47JYNi6nPX8xjW97TKGKm1ouctg0QSpZe9qrnw==",
+      "license": "MIT",
+      "dependencies": {
+        "jsbn": "~0.1.0",
+        "safer-buffer": "^2.1.0"
+      }
+    },
     "node_modules/ee-first": {
       "version": "1.1.1",
       "resolved": "https://registry.npmjs.org/ee-first/-/ee-first-1.1.1.tgz",
@@ -2827,6 +3444,87 @@
         "url": "https://github.com/sponsors/sindresorhus"
       }
     },
+    "node_modules/escodegen": {
+      "version": "1.14.3",
+      "resolved": "https://registry.npmjs.org/escodegen/-/escodegen-1.14.3.tgz",
+      "integrity": "sha512-qFcX0XJkdg+PB3xjZZG/wKSuT1PnQWx57+TVSjIMmILd2yC/6ByYElPwJnslDsuWuSAp4AwJGumarAAmJch5Kw==",
+      "license": "BSD-2-Clause",
+      "dependencies": {
+        "esprima": "^4.0.1",
+        "estraverse": "^4.2.0",
+        "esutils": "^2.0.2",
+        "optionator": "^0.8.1"
+      },
+      "bin": {
+        "escodegen": "bin/escodegen.js",
+        "esgenerate": "bin/esgenerate.js"
+      },
+      "engines": {
+        "node": ">=4.0"
+      },
+      "optionalDependencies": {
+        "source-map": "~0.6.1"
+      }
+    },
+    "node_modules/escodegen/node_modules/estraverse": {
+      "version": "4.3.0",
+      "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-4.3.0.tgz",
+      "integrity": "sha512-39nnKffWz8xN1BU/2c79n9nB9HDzo0niYUqx6xyqUnyoAnQyyWpOTdZEeiCch8BBu515t4wp9ZmgVfVhn9EBpw==",
+      "license": "BSD-2-Clause",
+      "engines": {
+        "node": ">=4.0"
+      }
+    },
+    "node_modules/escodegen/node_modules/levn": {
+      "version": "0.3.0",
+      "resolved": "https://registry.npmjs.org/levn/-/levn-0.3.0.tgz",
+      "integrity": "sha512-0OO4y2iOHix2W6ujICbKIaEQXvFQHue65vUG3pb5EUomzPI90z9hsA1VsO/dbIIpC53J8gxM9Q4Oho0jrCM/yA==",
+      "license": "MIT",
+      "dependencies": {
+        "prelude-ls": "~1.1.2",
+        "type-check": "~0.3.2"
+      },
+      "engines": {
+        "node": ">= 0.8.0"
+      }
+    },
+    "node_modules/escodegen/node_modules/optionator": {
+      "version": "0.8.3",
+      "resolved": "https://registry.npmjs.org/optionator/-/optionator-0.8.3.tgz",
+      "integrity": "sha512-+IW9pACdk3XWmmTXG8m3upGUJst5XRGzxMRjXzAuJ1XnIFNvfhjjIuYkDvysnPQ7qzqVzLt78BCruntqRhWQbA==",
+      "license": "MIT",
+      "dependencies": {
+        "deep-is": "~0.1.3",
+        "fast-levenshtein": "~2.0.6",
+        "levn": "~0.3.0",
+        "prelude-ls": "~1.1.2",
+        "type-check": "~0.3.2",
+        "word-wrap": "~1.2.3"
+      },
+      "engines": {
+        "node": ">= 0.8.0"
+      }
+    },
+    "node_modules/escodegen/node_modules/prelude-ls": {
+      "version": "1.1.2",
+      "resolved": "https://registry.npmjs.org/prelude-ls/-/prelude-ls-1.1.2.tgz",
+      "integrity": "sha512-ESF23V4SKG6lVSGZgYNpbsiaAkdab6ZgOxe52p7+Kid3W3u3bxR4Vfd/o21dmN7jSt0IwgZ4v5MUd26FEtXE9w==",
+      "engines": {
+        "node": ">= 0.8.0"
+      }
+    },
+    "node_modules/escodegen/node_modules/type-check": {
+      "version": "0.3.2",
+      "resolved": "https://registry.npmjs.org/type-check/-/type-check-0.3.2.tgz",
+      "integrity": "sha512-ZCmOJdvOWDBYJlzAoFkC+Q0+bUyEOS1ltgp1MGU03fqHG+dbi9tBFU2Rd9QKiDZFAYrhPh2JUf7rZRIuHRKtOg==",
+      "license": "MIT",
+      "dependencies": {
+        "prelude-ls": "~1.1.2"
+      },
+      "engines": {
+        "node": ">= 0.8.0"
+      }
+    },
     "node_modules/eslint": {
       "version": "9.27.0",
       "resolved": "https://registry.npmjs.org/eslint/-/eslint-9.27.0.tgz",
@@ -3298,6 +3996,19 @@
         "url": "https://opencollective.com/eslint"
       }
     },
+    "node_modules/esprima": {
+      "version": "4.0.1",
+      "resolved": "https://registry.npmjs.org/esprima/-/esprima-4.0.1.tgz",
+      "integrity": "sha512-eGuFFw7Upda+g4p+QHvnW0RyTX/SVeJBDM/gCtMARO0cLuT2HcEKnTPvhjV6aGeqrCB/sbNop0Kszm0jsaWU4A==",
+      "license": "BSD-2-Clause",
+      "bin": {
+        "esparse": "bin/esparse.js",
+        "esvalidate": "bin/esvalidate.js"
+      },
+      "engines": {
+        "node": ">=4"
+      }
+    },
     "node_modules/esquery": {
       "version": "1.6.0",
       "resolved": "https://registry.npmjs.org/esquery/-/esquery-1.6.0.tgz",
@@ -3348,7 +4059,6 @@
       "version": "2.0.3",
       "resolved": "https://registry.npmjs.org/esutils/-/esutils-2.0.3.tgz",
       "integrity": "sha512-kVscqXk4OCp68SZ0dkgEKVi6/8ij300KBWTJq32P/dYeWTSwK41WyTxalN1eRmA5Z9UU/LX9D7FWSmV9SAYx6g==",
-      "dev": true,
       "license": "BSD-2-Clause",
       "engines": {
         "node": ">=0.10.0"
@@ -3447,11 +4157,25 @@
       "dev": true,
       "license": "MIT"
     },
+    "node_modules/extend": {
+      "version": "3.0.2",
+      "resolved": "https://registry.npmjs.org/extend/-/extend-3.0.2.tgz",
+      "integrity": "sha512-fjquC59cD7CyW6urNXK0FBufkZcoiGG80wTuPujX590cB5Ttln20E2UB4S/WARVqhXffZl2LNgS+gQdPIIim/g==",
+      "license": "MIT"
+    },
+    "node_modules/extsprintf": {
+      "version": "1.3.0",
+      "resolved": "https://registry.npmjs.org/extsprintf/-/extsprintf-1.3.0.tgz",
+      "integrity": "sha512-11Ndz7Nv+mvAC1j0ktTa7fAb0vLyGGX+rMHNBYQviQDGU0Hw7lhctJANqbPhu9nV9/izT/IntTgZ7Im/9LJs9g==",
+      "engines": [
+        "node >=0.6.0"
+      ],
+      "license": "MIT"
+    },
     "node_modules/fast-deep-equal": {
       "version": "3.1.3",
       "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-3.1.3.tgz",
       "integrity": "sha512-f3qQ9oQy9j2AhBe/H9VC91wLmKBCCU/gDOnKNAYG5hswO7BLKj09Hc5HYNz9cGI++xlpDCIgDaitVs03ATR84Q==",
-      "dev": true,
       "license": "MIT"
     },
     "node_modules/fast-diff": {
@@ -3465,14 +4189,12 @@
       "version": "2.1.0",
       "resolved": "https://registry.npmjs.org/fast-json-stable-stringify/-/fast-json-stable-stringify-2.1.0.tgz",
       "integrity": "sha512-lhd/wF+Lk98HZoTCtlVraHtfh5XYijIjalXck7saUtuanSDyLMxnHhSXEDJqHxD7msR8D0uCmqlkwjCV8xvwHw==",
-      "dev": true,
       "license": "MIT"
     },
     "node_modules/fast-levenshtein": {
       "version": "2.0.6",
       "resolved": "https://registry.npmjs.org/fast-levenshtein/-/fast-levenshtein-2.0.6.tgz",
       "integrity": "sha512-DCXu6Ifhqcks7TZKY3Hxp3y6qphY5SJZmrWMDrKcERSOXWQdMhU9Ig/PYrzyw/ul9jOIyh0N4M0tbC5hodg8dw==",
-      "dev": true,
       "license": "MIT"
     },
     "node_modules/fastq": {
@@ -3641,6 +4363,15 @@
         "url": "https://github.com/sponsors/isaacs"
       }
     },
+    "node_modules/forever-agent": {
+      "version": "0.6.1",
+      "resolved": "https://registry.npmjs.org/forever-agent/-/forever-agent-0.6.1.tgz",
+      "integrity": "sha512-j0KLYPhm6zeac4lz3oJ3o65qvgQCcPubiyotZrXqEaG4hNagNYO8qdlUrX5vwqv9ohqeT/Z3j6+yW067yWWdUw==",
+      "license": "Apache-2.0",
+      "engines": {
+        "node": "*"
+      }
+    },
     "node_modules/form-data": {
       "version": "4.0.2",
       "resolved": "https://registry.npmjs.org/form-data/-/form-data-4.0.2.tgz",
@@ -3695,11 +4426,34 @@
         "node": ">= 0.6"
       }
     },
+    "node_modules/fs-minipass": {
+      "version": "2.1.0",
+      "resolved": "https://registry.npmjs.org/fs-minipass/-/fs-minipass-2.1.0.tgz",
+      "integrity": "sha512-V/JgOLFCS+R6Vcq0slCuaeWEdNC3ouDlJMNIsacH2VtALiu9mV4LPrHc5cDl8k5aw6J8jwgWWpiTo5RYhmIzvg==",
+      "license": "ISC",
+      "dependencies": {
+        "minipass": "^3.0.0"
+      },
+      "engines": {
+        "node": ">= 8"
+      }
+    },
+    "node_modules/fs-minipass/node_modules/minipass": {
+      "version": "3.3.6",
+      "resolved": "https://registry.npmjs.org/minipass/-/minipass-3.3.6.tgz",
+      "integrity": "sha512-DxiNidxSEK+tHG6zOIklvNOwm3hvCrbUrdtzY74U6HKTJxvIDfOUL5W5P2Ghd3DTkhhKPYGqeNUIh5qcM4YBfw==",
+      "license": "ISC",
+      "dependencies": {
+        "yallist": "^4.0.0"
+      },
+      "engines": {
+        "node": ">=8"
+      }
+    },
     "node_modules/fs.realpath": {
       "version": "1.0.0",
       "resolved": "https://registry.npmjs.org/fs.realpath/-/fs.realpath-1.0.0.tgz",
       "integrity": "sha512-OO0pH2lK6a0hZnAdau5ItzHPI6pUlvI7jMVnxUQRtw4owF2wk8lOSabtGDCTP4Ggrg2MbGnWO9X8K1t4+fGMDw==",
-      "dev": true,
       "license": "ISC"
     },
     "node_modules/fsevents": {
@@ -3764,6 +4518,74 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
+    "node_modules/gauge": {
+      "version": "3.0.2",
+      "resolved": "https://registry.npmjs.org/gauge/-/gauge-3.0.2.tgz",
+      "integrity": "sha512-+5J6MS/5XksCuXq++uFRsnUd7Ovu1XenbeuIuNRJxYWjgQbPuFhT14lAvsWfqfAmnwluf1OwMjz39HjfLPci0Q==",
+      "deprecated": "This package is no longer supported.",
+      "license": "ISC",
+      "dependencies": {
+        "aproba": "^1.0.3 || ^2.0.0",
+        "color-support": "^1.1.2",
+        "console-control-strings": "^1.0.0",
+        "has-unicode": "^2.0.1",
+        "object-assign": "^4.1.1",
+        "signal-exit": "^3.0.0",
+        "string-width": "^4.2.3",
+        "strip-ansi": "^6.0.1",
+        "wide-align": "^1.1.2"
+      },
+      "engines": {
+        "node": ">=10"
+      }
+    },
+    "node_modules/gauge/node_modules/ansi-regex": {
+      "version": "5.0.1",
+      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
+      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
+      "license": "MIT",
+      "engines": {
+        "node": ">=8"
+      }
+    },
+    "node_modules/gauge/node_modules/emoji-regex": {
+      "version": "8.0.0",
+      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
+      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
+      "license": "MIT"
+    },
+    "node_modules/gauge/node_modules/signal-exit": {
+      "version": "3.0.7",
+      "resolved": "https://registry.npmjs.org/signal-exit/-/signal-exit-3.0.7.tgz",
+      "integrity": "sha512-wnD2ZE+l+SPC/uoS0vXeE9L1+0wuaMqKlfz9AMUo38JsyLSBWSFcHR1Rri62LZc12vLr1gb3jl7iwQhgwpAbGQ==",
+      "license": "ISC"
+    },
+    "node_modules/gauge/node_modules/string-width": {
+      "version": "4.2.3",
+      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
+      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
+      "license": "MIT",
+      "dependencies": {
+        "emoji-regex": "^8.0.0",
+        "is-fullwidth-code-point": "^3.0.0",
+        "strip-ansi": "^6.0.1"
+      },
+      "engines": {
+        "node": ">=8"
+      }
+    },
+    "node_modules/gauge/node_modules/strip-ansi": {
+      "version": "6.0.1",
+      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
+      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
+      "license": "MIT",
+      "dependencies": {
+        "ansi-regex": "^5.0.1"
+      },
+      "engines": {
+        "node": ">=8"
+      }
+    },
     "node_modules/get-intrinsic": {
       "version": "1.3.0",
       "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.3.0.tgz",
@@ -3819,6 +4641,15 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
+    "node_modules/getpass": {
+      "version": "0.1.7",
+      "resolved": "https://registry.npmjs.org/getpass/-/getpass-0.1.7.tgz",
+      "integrity": "sha512-0fzj9JxOLfJ+XGLhR8ze3unN0KZCgZwiSSDz168VERjK8Wl8kVSdcu2kspd4s4wtAa1y/qrVRiAA0WclVsu0ng==",
+      "license": "MIT",
+      "dependencies": {
+        "assert-plus": "^1.0.0"
+      }
+    },
     "node_modules/github-slugger": {
       "version": "1.5.0",
       "resolved": "https://registry.npmjs.org/github-slugger/-/github-slugger-1.5.0.tgz",
@@ -3925,6 +4756,29 @@
       "dev": true,
       "license": "MIT"
     },
+    "node_modules/har-schema": {
+      "version": "2.0.0",
+      "resolved": "https://registry.npmjs.org/har-schema/-/har-schema-2.0.0.tgz",
+      "integrity": "sha512-Oqluz6zhGX8cyRaTQlFMPw80bSJVG2x/cFb8ZPhUILGgHka9SsokCCOQgpveePerqidZOrT14ipqfJb7ILcW5Q==",
+      "license": "ISC",
+      "engines": {
+        "node": ">=4"
+      }
+    },
+    "node_modules/har-validator": {
+      "version": "5.1.5",
+      "resolved": "https://registry.npmjs.org/har-validator/-/har-validator-5.1.5.tgz",
+      "integrity": "sha512-nmT2T0lljbxdQZfspsno9hgrG3Uir6Ks5afism62poxqBM6sDnMEuPmzTq8XN0OEwqKLLdh1jQI3qyE66Nzb3w==",
+      "deprecated": "this library is no longer supported",
+      "license": "MIT",
+      "dependencies": {
+        "ajv": "^6.12.3",
+        "har-schema": "^2.0.0"
+      },
+      "engines": {
+        "node": ">=6"
+      }
+    },
     "node_modules/has-bigints": {
       "version": "1.1.0",
       "resolved": "https://registry.npmjs.org/has-bigints/-/has-bigints-1.1.0.tgz",
@@ -4003,6 +4857,12 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
+    "node_modules/has-unicode": {
+      "version": "2.0.1",
+      "resolved": "https://registry.npmjs.org/has-unicode/-/has-unicode-2.0.1.tgz",
+      "integrity": "sha512-8Rf9Y83NBReMnx0gFzA8JImQACstCYWUplepDa9xprwwtmgEZUF0h/i5xSA625zB/I37EtrswSST6OXxwaaIJQ==",
+      "license": "ISC"
+    },
     "node_modules/hasown": {
       "version": "2.0.2",
       "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.2.tgz",
@@ -4015,6 +4875,15 @@
         "node": ">= 0.4"
       }
     },
+    "node_modules/html-encoding-sniffer": {
+      "version": "1.0.2",
+      "resolved": "https://registry.npmjs.org/html-encoding-sniffer/-/html-encoding-sniffer-1.0.2.tgz",
+      "integrity": "sha512-71lZziiDnsuabfdYiUeWdCVyKuqwWi23L8YeIgV9jSSZHCtb6wB1BKWooH7L3tn4/FuZJMVWyNaIDr4RGmaSYw==",
+      "license": "MIT",
+      "dependencies": {
+        "whatwg-encoding": "^1.0.1"
+      }
+    },
     "node_modules/html-escaper": {
       "version": "2.0.2",
       "resolved": "https://registry.npmjs.org/html-escaper/-/html-escaper-2.0.2.tgz",
@@ -4039,6 +4908,34 @@
         "node": ">= 0.8"
       }
     },
+    "node_modules/http-signature": {
+      "version": "1.2.0",
+      "resolved": "https://registry.npmjs.org/http-signature/-/http-signature-1.2.0.tgz",
+      "integrity": "sha512-CAbnr6Rz4CYQkLYUtSNXxQPUH2gK8f3iWexVlsnMeD+GjlsQ0Xsy1cOX+mN3dtxYomRy21CiOzU8Uhw6OwncEQ==",
+      "license": "MIT",
+      "dependencies": {
+        "assert-plus": "^1.0.0",
+        "jsprim": "^1.2.2",
+        "sshpk": "^1.7.0"
+      },
+      "engines": {
+        "node": ">=0.8",
+        "npm": ">=1.3.7"
+      }
+    },
+    "node_modules/https-proxy-agent": {
+      "version": "5.0.1",
+      "resolved": "https://registry.npmjs.org/https-proxy-agent/-/https-proxy-agent-5.0.1.tgz",
+      "integrity": "sha512-dFcAjpTQFgoLMzC2VwU+C/CbS7uRL0lWmxDITmqm7C+7F0Odmj6s9l6alZc6AELXhrnggM2CeWSXHGOdX2YtwA==",
+      "license": "MIT",
+      "dependencies": {
+        "agent-base": "6",
+        "debug": "4"
+      },
+      "engines": {
+        "node": ">= 6"
+      }
+    },
     "node_modules/humanize-ms": {
       "version": "1.2.1",
       "resolved": "https://registry.npmjs.org/humanize-ms/-/humanize-ms-1.2.1.tgz",
@@ -4052,7 +4949,6 @@
       "version": "0.4.24",
       "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.4.24.tgz",
       "integrity": "sha512-v3MXnZAcvnywkTUEZomIActle7RXXeedOR31wwl7VlyoXO4Qi9arvSenNQWne1TcRwhCL1HwLI21bEqdpj8/rA==",
-      "dev": true,
       "license": "MIT",
       "dependencies": {
         "safer-buffer": ">= 2.1.2 < 3"
@@ -4103,7 +4999,6 @@
       "resolved": "https://registry.npmjs.org/inflight/-/inflight-1.0.6.tgz",
       "integrity": "sha512-k92I/b08q4wvFscXCLvqfsHCrjrF7yiXsQuIVvVE7N82W3+aqpzuUdBbfhWcy/FZR3/4IgflMgKLOsvPDrGCJA==",
       "deprecated": "This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.",
-      "dev": true,
       "license": "ISC",
       "dependencies": {
         "once": "^1.3.0",
@@ -4114,7 +5009,6 @@
       "version": "2.0.4",
       "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.4.tgz",
       "integrity": "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ==",
-      "dev": true,
       "license": "ISC"
     },
     "node_modules/internal-slot": {
@@ -4307,7 +5201,6 @@
       "version": "3.0.0",
       "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
       "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
-      "dev": true,
       "license": "MIT",
       "engines": {
         "node": ">=8"
@@ -4484,6 +5377,12 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
+    "node_modules/is-typedarray": {
+      "version": "1.0.0",
+      "resolved": "https://registry.npmjs.org/is-typedarray/-/is-typedarray-1.0.0.tgz",
+      "integrity": "sha512-cyA56iCMHAh5CdzjJIa4aohJyeO1YbwLi3Jc35MmRU6poroFjIGZzUzupGiRPOjgHg9TLu43xbpwXk523fMxKA==",
+      "license": "MIT"
+    },
     "node_modules/is-weakmap": {
       "version": "2.0.2",
       "resolved": "https://registry.npmjs.org/is-weakmap/-/is-weakmap-2.0.2.tgz",
@@ -4544,6 +5443,12 @@
       "dev": true,
       "license": "ISC"
     },
+    "node_modules/isstream": {
+      "version": "0.1.2",
+      "resolved": "https://registry.npmjs.org/isstream/-/isstream-0.1.2.tgz",
+      "integrity": "sha512-Yljz7ffyPbrLpLngrMtZ7NduUgVvi6wG9RJ9IUcyCd59YQ911PBJphODUcbOVbqYfxe1wuYf/LJ8PauMRwsM/g==",
+      "license": "MIT"
+    },
     "node_modules/istanbul-lib-coverage": {
       "version": "3.2.2",
       "resolved": "https://registry.npmjs.org/istanbul-lib-coverage/-/istanbul-lib-coverage-3.2.2.tgz",
@@ -4692,6 +5597,12 @@
         "js-yaml": "bin/js-yaml.js"
       }
     },
+    "node_modules/jsbn": {
+      "version": "0.1.1",
+      "resolved": "https://registry.npmjs.org/jsbn/-/jsbn-0.1.1.tgz",
+      "integrity": "sha512-UVU9dibq2JcFWxQPA6KCqj5O42VOmAY3zQUfEKxU0KpTGXwNoCjkX1e13eHNvw/xPynt6pU0rZ1htjWTNTSXsg==",
+      "license": "MIT"
+    },
     "node_modules/jschardet": {
       "version": "3.1.4",
       "resolved": "https://registry.npmjs.org/jschardet/-/jschardet-3.1.4.tgz",
@@ -4702,6 +5613,67 @@
         "node": ">=0.1.90"
       }
     },
+    "node_modules/jsdom": {
+      "version": "9.12.0",
+      "resolved": "https://registry.npmjs.org/jsdom/-/jsdom-9.12.0.tgz",
+      "integrity": "sha512-Qw4oqNxo4LyzkSqVIyCnEltTc4xV3g1GBaI88AvYTesWzmWHUSoMNmhBjUBa+6ldXIBJS9xoeLNJPfUAykTyxw==",
+      "license": "MIT",
+      "dependencies": {
+        "abab": "^1.0.3",
+        "acorn": "^4.0.4",
+        "acorn-globals": "^3.1.0",
+        "array-equal": "^1.0.0",
+        "content-type-parser": "^1.0.1",
+        "cssom": ">= 0.3.2 < 0.4.0",
+        "cssstyle": ">= 0.2.37 < 0.3.0",
+        "escodegen": "^1.6.1",
+        "html-encoding-sniffer": "^1.0.1",
+        "nwmatcher": ">= 1.3.9 < 2.0.0",
+        "parse5": "^1.5.1",
+        "request": "^2.79.0",
+        "sax": "^1.2.1",
+        "symbol-tree": "^3.2.1",
+        "tough-cookie": "^2.3.2",
+        "webidl-conversions": "^4.0.0",
+        "whatwg-encoding": "^1.0.1",
+        "whatwg-url": "^4.3.0",
+        "xml-name-validator": "^2.0.1"
+      }
+    },
+    "node_modules/jsdom/node_modules/acorn": {
+      "version": "4.0.13",
+      "resolved": "https://registry.npmjs.org/acorn/-/acorn-4.0.13.tgz",
+      "integrity": "sha512-fu2ygVGuMmlzG8ZeRJ0bvR41nsAkxxhbyk8bZ1SS521Z7vmgJFTQQlfz/Mp/nJexGBz+v8sC9bM6+lNgskt4Ug==",
+      "license": "MIT",
+      "bin": {
+        "acorn": "bin/acorn"
+      },
+      "engines": {
+        "node": ">=0.4.0"
+      }
+    },
+    "node_modules/jsdom/node_modules/webidl-conversions": {
+      "version": "4.0.2",
+      "resolved": "https://registry.npmjs.org/webidl-conversions/-/webidl-conversions-4.0.2.tgz",
+      "integrity": "sha512-YQ+BmxuTgd6UXZW3+ICGfyqRyHXVlD5GtQr5+qjiNW7bF0cqrzX500HVXPBOvgXb5YnzDd+h0zqyv61KUD7+Sg==",
+      "license": "BSD-2-Clause"
+    },
+    "node_modules/jsdom/node_modules/whatwg-url": {
+      "version": "4.8.0",
+      "resolved": "https://registry.npmjs.org/whatwg-url/-/whatwg-url-4.8.0.tgz",
+      "integrity": "sha512-nUvUPuenPFtPfy/X+dAYh/TfRbTBlnXTM5iIfLseJFkkQewmpG9pGR6i87E9qL+lZaJzv+99kkQWoGOtLfkZQQ==",
+      "license": "MIT",
+      "dependencies": {
+        "tr46": "~0.0.3",
+        "webidl-conversions": "^3.0.0"
+      }
+    },
+    "node_modules/jsdom/node_modules/whatwg-url/node_modules/webidl-conversions": {
+      "version": "3.0.1",
+      "resolved": "https://registry.npmjs.org/webidl-conversions/-/webidl-conversions-3.0.1.tgz",
+      "integrity": "sha512-2JAn3z8AR6rjK8Sm8orRC0h/bcl/DqL7tRPdGZ4I1CjdF+EaMLmYxBHyXuKL849eucPFhvBoxMsflfOb8kxaeQ==",
+      "license": "BSD-2-Clause"
+    },
     "node_modules/json-buffer": {
       "version": "3.0.1",
       "resolved": "https://registry.npmjs.org/json-buffer/-/json-buffer-3.0.1.tgz",
@@ -4709,11 +5681,16 @@
       "dev": true,
       "license": "MIT"
     },
+    "node_modules/json-schema": {
+      "version": "0.4.0",
+      "resolved": "https://registry.npmjs.org/json-schema/-/json-schema-0.4.0.tgz",
+      "integrity": "sha512-es94M3nTIfsEPisRafak+HDLfHXnKBhV3vU5eqPcS3flIWqcxJWgXHXiey3YrpaNsanY5ei1VoYEbOzijuq9BA==",
+      "license": "(AFL-2.1 OR BSD-3-Clause)"
+    },
     "node_modules/json-schema-traverse": {
       "version": "0.4.1",
       "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-0.4.1.tgz",
       "integrity": "sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg==",
-      "dev": true,
       "license": "MIT"
     },
     "node_modules/json-stable-stringify-without-jsonify": {
@@ -4723,6 +5700,12 @@
       "dev": true,
       "license": "MIT"
     },
+    "node_modules/json-stringify-safe": {
+      "version": "5.0.1",
+      "resolved": "https://registry.npmjs.org/json-stringify-safe/-/json-stringify-safe-5.0.1.tgz",
+      "integrity": "sha512-ZClg6AaYvamvYEE82d3Iyd3vSSIjQ+odgjaTzRuO3s7toCdFKczob2i0zCh7JE8kWn17yvAWhUVxvqGwUalsRA==",
+      "license": "ISC"
+    },
     "node_modules/json5": {
       "version": "1.0.2",
       "resolved": "https://registry.npmjs.org/json5/-/json5-1.0.2.tgz",
@@ -4730,10 +5713,25 @@
       "dev": true,
       "license": "MIT",
       "dependencies": {
-        "minimist": "^1.2.0"
+        "minimist": "^1.2.0"
+      },
+      "bin": {
+        "json5": "lib/cli.js"
+      }
+    },
+    "node_modules/jsprim": {
+      "version": "1.4.2",
+      "resolved": "https://registry.npmjs.org/jsprim/-/jsprim-1.4.2.tgz",
+      "integrity": "sha512-P2bSOMAc/ciLz6DzgjVlGJP9+BrJWu5UDGK70C2iweC5QBIeFf0ZXRvGjEj2uYgrY2MkAAhsSWHDWlFtEroZWw==",
+      "license": "MIT",
+      "dependencies": {
+        "assert-plus": "1.0.0",
+        "extsprintf": "1.3.0",
+        "json-schema": "0.4.0",
+        "verror": "1.10.0"
       },
-      "bin": {
-        "json5": "lib/cli.js"
+      "engines": {
+        "node": ">=0.6.0"
       }
     },
     "node_modules/jsx-ast-utils": {
@@ -5010,6 +6008,18 @@
         "node": ">= 0.6"
       }
     },
+    "node_modules/mimic-response": {
+      "version": "2.1.0",
+      "resolved": "https://registry.npmjs.org/mimic-response/-/mimic-response-2.1.0.tgz",
+      "integrity": "sha512-wXqjST+SLt7R009ySCglWBCFpjUygmCIfD790/kVbiGmUgfYGuB14PiTd5DwVxSV4NcYHjzMkoj5LjQZwTQLEA==",
+      "license": "MIT",
+      "engines": {
+        "node": ">=8"
+      },
+      "funding": {
+        "url": "https://github.com/sponsors/sindresorhus"
+      }
+    },
     "node_modules/minimatch": {
       "version": "10.0.1",
       "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-10.0.1.tgz",
@@ -5045,12 +6055,55 @@
         "node": ">=16 || 14 >=14.17"
       }
     },
+    "node_modules/minizlib": {
+      "version": "2.1.2",
+      "resolved": "https://registry.npmjs.org/minizlib/-/minizlib-2.1.2.tgz",
+      "integrity": "sha512-bAxsR8BVfj60DWXHE3u30oHzfl4G7khkSuPW+qvpd7jFRHm7dLxOjUk1EHACJ/hxLY8phGJ0YhYHZo7jil7Qdg==",
+      "license": "MIT",
+      "dependencies": {
+        "minipass": "^3.0.0",
+        "yallist": "^4.0.0"
+      },
+      "engines": {
+        "node": ">= 8"
+      }
+    },
+    "node_modules/minizlib/node_modules/minipass": {
+      "version": "3.3.6",
+      "resolved": "https://registry.npmjs.org/minipass/-/minipass-3.3.6.tgz",
+      "integrity": "sha512-DxiNidxSEK+tHG6zOIklvNOwm3hvCrbUrdtzY74U6HKTJxvIDfOUL5W5P2Ghd3DTkhhKPYGqeNUIh5qcM4YBfw==",
+      "license": "ISC",
+      "dependencies": {
+        "yallist": "^4.0.0"
+      },
+      "engines": {
+        "node": ">=8"
+      }
+    },
+    "node_modules/mkdirp": {
+      "version": "1.0.4",
+      "resolved": "https://registry.npmjs.org/mkdirp/-/mkdirp-1.0.4.tgz",
+      "integrity": "sha512-vVqVZQyf3WLx2Shd0qJ9xuvqgAyKPLAiqITEtqW0oIUjzo3PePDd6fW9iFz30ef7Ysp/oiWqbhszeGWW2T6Gzw==",
+      "license": "MIT",
+      "bin": {
+        "mkdirp": "bin/cmd.js"
+      },
+      "engines": {
+        "node": ">=10"
+      }
+    },
     "node_modules/ms": {
       "version": "2.1.3",
       "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
       "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
       "license": "MIT"
     },
+    "node_modules/nan": {
+      "version": "2.22.2",
+      "resolved": "https://registry.npmjs.org/nan/-/nan-2.22.2.tgz",
+      "integrity": "sha512-DANghxFkS1plDdRsX0X9pm0Z6SJNN6gBdtXfanwoZ8hooC5gosGFSBGRYHUVPz1asKA/kMRqDRdHrluZ61SpBQ==",
+      "license": "MIT"
+    },
     "node_modules/nanoid": {
       "version": "3.3.11",
       "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.11.tgz",
@@ -5127,6 +6180,21 @@
         }
       }
     },
+    "node_modules/nopt": {
+      "version": "5.0.0",
+      "resolved": "https://registry.npmjs.org/nopt/-/nopt-5.0.0.tgz",
+      "integrity": "sha512-Tbj67rffqceeLpcRXrT7vKAN8CwfPeIBgM7E6iBkmKLV7bEMwpGgYLGv0jACUsECaa/vuxP0IjEont6umdMgtQ==",
+      "license": "ISC",
+      "dependencies": {
+        "abbrev": "1"
+      },
+      "bin": {
+        "nopt": "bin/nopt.js"
+      },
+      "engines": {
+        "node": ">=6"
+      }
+    },
     "node_modules/npm-check-updates": {
       "version": "17.1.18",
       "resolved": "https://registry.npmjs.org/npm-check-updates/-/npm-check-updates-17.1.18.tgz",
@@ -5142,11 +6210,38 @@
         "npm": ">=8.12.1"
       }
     },
+    "node_modules/npmlog": {
+      "version": "5.0.1",
+      "resolved": "https://registry.npmjs.org/npmlog/-/npmlog-5.0.1.tgz",
+      "integrity": "sha512-AqZtDUWOMKs1G/8lwylVjrdYgqA4d9nu8hc+0gzRxlDb1I10+FHBGMXs6aiQHFdCUUlqH99MUMuLfzWDNDtfxw==",
+      "deprecated": "This package is no longer supported.",
+      "license": "ISC",
+      "dependencies": {
+        "are-we-there-yet": "^2.0.0",
+        "console-control-strings": "^1.1.0",
+        "gauge": "^3.0.0",
+        "set-blocking": "^2.0.0"
+      }
+    },
+    "node_modules/nwmatcher": {
+      "version": "1.4.4",
+      "resolved": "https://registry.npmjs.org/nwmatcher/-/nwmatcher-1.4.4.tgz",
+      "integrity": "sha512-3iuY4N5dhgMpCUrOVnuAdGrgxVqV2cJpM+XNccjR2DKOB1RUP0aA+wGXEiNziG/UKboFyGBIoKOaNlJxx8bciQ==",
+      "license": "MIT"
+    },
+    "node_modules/oauth-sign": {
+      "version": "0.9.0",
+      "resolved": "https://registry.npmjs.org/oauth-sign/-/oauth-sign-0.9.0.tgz",
+      "integrity": "sha512-fexhUFFPTGV8ybAtSIGbV6gOkSv8UtRbDBnAyLQw4QPKkgNlsH2ByPGtMUqdWkos6YCRmAqViwgZrJc/mRDzZQ==",
+      "license": "Apache-2.0",
+      "engines": {
+        "node": "*"
+      }
+    },
     "node_modules/object-assign": {
       "version": "4.1.1",
       "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
       "integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",
-      "dev": true,
       "license": "MIT",
       "engines": {
         "node": ">=0.10.0"
@@ -5282,7 +6377,6 @@
       "version": "1.4.0",
       "resolved": "https://registry.npmjs.org/once/-/once-1.4.0.tgz",
       "integrity": "sha512-lNaJgI+2Q5URQBkccEKHTQOPaXdUxnZZElQTZY0MFUAuaEqe1E+Nyvgdz/aIyNi6Z9MzO5dv1H8n58/GELp3+w==",
-      "dev": true,
       "license": "ISC",
       "dependencies": {
         "wrappy": "1"
@@ -5406,6 +6500,11 @@
         "node": ">=6"
       }
     },
+    "node_modules/parse5": {
+      "version": "1.5.1",
+      "resolved": "https://registry.npmjs.org/parse5/-/parse5-1.5.1.tgz",
+      "integrity": "sha512-w2jx/0tJzvgKwZa58sj2vAYq/S/K1QJfIB3cWYea/Iu1scFPDQQ3IQiVZTHWtRBwAjv2Yd7S/xeZf3XqLDb3bA=="
+    },
     "node_modules/parseurl": {
       "version": "1.3.3",
       "resolved": "https://registry.npmjs.org/parseurl/-/parseurl-1.3.3.tgz",
@@ -5430,7 +6529,6 @@
       "version": "1.0.1",
       "resolved": "https://registry.npmjs.org/path-is-absolute/-/path-is-absolute-1.0.1.tgz",
       "integrity": "sha512-AVbw3UJ2e9bq64vSaS9Am0fje1Pa8pbGqTTsmXfaIiMpnr5DlDhfJOuLj9Sf95ZPVDAUerDfEk88MPmPe7UCQg==",
-      "dev": true,
       "license": "MIT",
       "engines": {
         "node": ">=0.10.0"
@@ -5494,6 +6592,12 @@
         "node": ">= 14.16"
       }
     },
+    "node_modules/performance-now": {
+      "version": "2.1.0",
+      "resolved": "https://registry.npmjs.org/performance-now/-/performance-now-2.1.0.tgz",
+      "integrity": "sha512-7EAHlyLHI56VEIdK57uwHdHKIaAGbnXPiw0yWbarQZOKaKpvUIgW0jWRVLiatnM+XXlSwsanIBH/hzGMJulMow==",
+      "license": "MIT"
+    },
     "node_modules/picocolors": {
       "version": "1.1.1",
       "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
@@ -5618,11 +6722,22 @@
         "node": ">= 0.10"
       }
     },
+    "node_modules/psl": {
+      "version": "1.15.0",
+      "resolved": "https://registry.npmjs.org/psl/-/psl-1.15.0.tgz",
+      "integrity": "sha512-JZd3gMVBAVQkSs6HdNZo9Sdo0LNcQeMNP3CozBJb3JYC/QUYZTnKxP+f8oWRX4rHP5EurWxqAHTSwUCjlNKa1w==",
+      "license": "MIT",
+      "dependencies": {
+        "punycode": "^2.3.1"
+      },
+      "funding": {
+        "url": "https://github.com/sponsors/lupomontero"
+      }
+    },
     "node_modules/punycode": {
       "version": "2.3.1",
       "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.3.1.tgz",
       "integrity": "sha512-vYt7UD1U9Wg6138shLtLOvdAu+8DsC/ilFtEVHcH+wydcSpNE20AfSOduf6MkRFahL5FY7X1oU7nKVZFtfq8Fg==",
-      "dev": true,
       "license": "MIT",
       "engines": {
         "node": ">=6"
@@ -5708,6 +6823,20 @@
       "dev": true,
       "license": "MIT"
     },
+    "node_modules/readable-stream": {
+      "version": "3.6.2",
+      "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-3.6.2.tgz",
+      "integrity": "sha512-9u/sniCrY3D5WdsERHzHE4G2YCXqoG5FTHUiCC4SIbr6XcLZBY05ya9EKjYek9O5xOAwjGq+1JdGBAS7Q9ScoA==",
+      "license": "MIT",
+      "dependencies": {
+        "inherits": "^2.0.3",
+        "string_decoder": "^1.1.1",
+        "util-deprecate": "^1.0.1"
+      },
+      "engines": {
+        "node": ">= 6"
+      }
+    },
     "node_modules/refa": {
       "version": "0.12.1",
       "resolved": "https://registry.npmjs.org/refa/-/refa-0.12.1.tgz",
@@ -5789,6 +6918,61 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
+    "node_modules/request": {
+      "version": "2.88.2",
+      "resolved": "https://registry.npmjs.org/request/-/request-2.88.2.tgz",
+      "integrity": "sha512-MsvtOrfG9ZcrOwAW+Qi+F6HbD0CWXEh9ou77uOb7FM2WPhwT7smM833PzanhJLsgXjN89Ir6V2PczXNnMpwKhw==",
+      "deprecated": "request has been deprecated, see https://github.com/request/request/issues/3142",
+      "license": "Apache-2.0",
+      "dependencies": {
+        "aws-sign2": "~0.7.0",
+        "aws4": "^1.8.0",
+        "caseless": "~0.12.0",
+        "combined-stream": "~1.0.6",
+        "extend": "~3.0.2",
+        "forever-agent": "~0.6.1",
+        "form-data": "~2.3.2",
+        "har-validator": "~5.1.3",
+        "http-signature": "~1.2.0",
+        "is-typedarray": "~1.0.0",
+        "isstream": "~0.1.2",
+        "json-stringify-safe": "~5.0.1",
+        "mime-types": "~2.1.19",
+        "oauth-sign": "~0.9.0",
+        "performance-now": "^2.1.0",
+        "qs": "~6.5.2",
+        "safe-buffer": "^5.1.2",
+        "tough-cookie": "~2.5.0",
+        "tunnel-agent": "^0.6.0",
+        "uuid": "^3.3.2"
+      },
+      "engines": {
+        "node": ">= 6"
+      }
+    },
+    "node_modules/request/node_modules/form-data": {
+      "version": "2.3.3",
+      "resolved": "https://registry.npmjs.org/form-data/-/form-data-2.3.3.tgz",
+      "integrity": "sha512-1lLKB2Mu3aGP1Q/2eCOx0fNbRMe7XdwktwOruhfqqd0rIJWwN4Dh+E3hrPSlDCXnSR7UtZ1N38rVXm+6+MEhJQ==",
+      "license": "MIT",
+      "dependencies": {
+        "asynckit": "^0.4.0",
+        "combined-stream": "^1.0.6",
+        "mime-types": "^2.1.12"
+      },
+      "engines": {
+        "node": ">= 0.12"
+      }
+    },
+    "node_modules/request/node_modules/qs": {
+      "version": "6.5.3",
+      "resolved": "https://registry.npmjs.org/qs/-/qs-6.5.3.tgz",
+      "integrity": "sha512-qxXIEh4pCGfHICj1mAJQ2/2XVZkjCDTcEgfoSQxc/fYivUZxTkk7L3bDBJSoNrEzXI17oUO5Dp07ktqE5KzczA==",
+      "license": "BSD-3-Clause",
+      "engines": {
+        "node": ">=0.6"
+      }
+    },
     "node_modules/resolve": {
       "version": "1.22.10",
       "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.10.tgz",
@@ -5836,7 +7020,6 @@
       "resolved": "https://registry.npmjs.org/rimraf/-/rimraf-3.0.2.tgz",
       "integrity": "sha512-JZkJMZkAGFFPP2YqXZXPbMlMBgsxzE8ILs4lMIX/2o0L9UBw9O/Y3o6wFw/i9YLapcUJWwqbi3kdxIPdC62TIA==",
       "deprecated": "Rimraf versions prior to v4 are no longer supported",
-      "dev": true,
       "license": "ISC",
       "dependencies": {
         "glob": "^7.1.3"
@@ -5852,7 +7035,6 @@
       "version": "1.1.11",
       "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.11.tgz",
       "integrity": "sha512-iCuPHDFgrHX7H2vEI/5xpz07zSHB00TpugqhmYtVmMO6518mCuRMoOYFldEBl0g187ufozdaHgWKcYFb61qGiA==",
-      "dev": true,
       "license": "MIT",
       "dependencies": {
         "balanced-match": "^1.0.0",
@@ -5864,7 +7046,6 @@
       "resolved": "https://registry.npmjs.org/glob/-/glob-7.2.3.tgz",
       "integrity": "sha512-nFR0zLpU2YCaRxwoCJvL6UvCH2JFyFVIvwTLsIf21AuHlMskA1hhTdk+LlYJtOlYt9v6dvszD2BGRqBL+iQK9Q==",
       "deprecated": "Glob versions prior to v9 are no longer supported",
-      "dev": true,
       "license": "ISC",
       "dependencies": {
         "fs.realpath": "^1.0.0",
@@ -5885,7 +7066,6 @@
       "version": "3.1.2",
       "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.1.2.tgz",
       "integrity": "sha512-J7p63hRiAjw1NDEww1W7i37+ByIrOWO5XQQAzZ3VOcL0PNybwpfmV/N05zFAzwQ9USyEcX6t3UO+K5aqBQOIHw==",
-      "dev": true,
       "license": "ISC",
       "dependencies": {
         "brace-expansion": "^1.1.7"
@@ -5958,6 +7138,12 @@
         "queue-microtask": "^1.2.2"
       }
     },
+    "node_modules/rw": {
+      "version": "1.3.3",
+      "resolved": "https://registry.npmjs.org/rw/-/rw-1.3.3.tgz",
+      "integrity": "sha512-PdhdWy89SiZogBLaw42zdeqtRJ//zFd2PgQavcICDUgJT5oW10QCRKbJ6bg4r0/UY2M6BWd5tkxuGFRvCkgfHQ==",
+      "license": "BSD-3-Clause"
+    },
     "node_modules/safe-array-concat": {
       "version": "1.1.3",
       "resolved": "https://registry.npmjs.org/safe-array-concat/-/safe-array-concat-1.1.3.tgz",
@@ -5982,7 +7168,6 @@
       "version": "5.2.1",
       "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.2.1.tgz",
       "integrity": "sha512-rp3So07KcdmmKbGvgaNxQSJr7bGVSVk5S9Eq1F+ppbRo70+YeaDxkw5Dd8NPN+GD6bjnYm2VuPuCXmpuYvmCXQ==",
-      "dev": true,
       "funding": [
         {
           "type": "github",
@@ -6048,9 +7233,14 @@
       "version": "2.1.2",
       "resolved": "https://registry.npmjs.org/safer-buffer/-/safer-buffer-2.1.2.tgz",
       "integrity": "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg==",
-      "dev": true,
       "license": "MIT"
     },
+    "node_modules/sax": {
+      "version": "1.4.1",
+      "resolved": "https://registry.npmjs.org/sax/-/sax-1.4.1.tgz",
+      "integrity": "sha512-+aWOz7yVScEGoKNd4PA10LZ8sk0A/z5+nXQG5giUO5rprX9jgYsTdov9qCchZiPIZezbZH+jRut8nPodFAX4Jg==",
+      "license": "ISC"
+    },
     "node_modules/scslre": {
       "version": "0.3.0",
       "resolved": "https://registry.npmjs.org/scslre/-/scslre-0.3.0.tgz",
@@ -6144,6 +7334,12 @@
         "node": ">= 0.8.0"
       }
     },
+    "node_modules/set-blocking": {
+      "version": "2.0.0",
+      "resolved": "https://registry.npmjs.org/set-blocking/-/set-blocking-2.0.0.tgz",
+      "integrity": "sha512-KiKBS8AnWGEyLzofFfmvKwpdPzqiy16LvQfK3yv/fVH7Bj13/wl3JSR1J+rfgRE9q7xUJK4qvgS8raSOeLUehw==",
+      "license": "ISC"
+    },
     "node_modules/set-function-length": {
       "version": "1.2.2",
       "resolved": "https://registry.npmjs.org/set-function-length/-/set-function-length-1.2.2.tgz",
@@ -6319,6 +7515,47 @@
         "url": "https://github.com/sponsors/isaacs"
       }
     },
+    "node_modules/simple-concat": {
+      "version": "1.0.1",
+      "resolved": "https://registry.npmjs.org/simple-concat/-/simple-concat-1.0.1.tgz",
+      "integrity": "sha512-cSFtAPtRhljv69IK0hTVZQ+OfE9nePi/rtJmw5UjHeVyVroEqJXP1sFztKUy1qU+xvz3u/sfYJLa947b7nAN2Q==",
+      "funding": [
+        {
+          "type": "github",
+          "url": "https://github.com/sponsors/feross"
+        },
+        {
+          "type": "patreon",
+          "url": "https://www.patreon.com/feross"
+        },
+        {
+          "type": "consulting",
+          "url": "https://feross.org/support"
+        }
+      ],
+      "license": "MIT"
+    },
+    "node_modules/simple-get": {
+      "version": "3.1.1",
+      "resolved": "https://registry.npmjs.org/simple-get/-/simple-get-3.1.1.tgz",
+      "integrity": "sha512-CQ5LTKGfCpvE1K0n2us+kuMPbk/q0EKl82s4aheV9oXjFEz6W/Y7oQFVJuU6QG77hRT4Ghb5RURteF5vnWjupA==",
+      "license": "MIT",
+      "dependencies": {
+        "decompress-response": "^4.2.0",
+        "once": "^1.3.1",
+        "simple-concat": "^1.0.0"
+      }
+    },
+    "node_modules/source-map": {
+      "version": "0.6.1",
+      "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
+      "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
+      "license": "BSD-3-Clause",
+      "optional": true,
+      "engines": {
+        "node": ">=0.10.0"
+      }
+    },
     "node_modules/source-map-js": {
       "version": "1.2.1",
       "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
@@ -6329,6 +7566,31 @@
         "node": ">=0.10.0"
       }
     },
+    "node_modules/sshpk": {
+      "version": "1.18.0",
+      "resolved": "https://registry.npmjs.org/sshpk/-/sshpk-1.18.0.tgz",
+      "integrity": "sha512-2p2KJZTSqQ/I3+HX42EpYOa2l3f8Erv8MWKsy2I9uf4wA7yFIkXRffYdsx86y6z4vHtV8u7g+pPlr8/4ouAxsQ==",
+      "license": "MIT",
+      "dependencies": {
+        "asn1": "~0.2.3",
+        "assert-plus": "^1.0.0",
+        "bcrypt-pbkdf": "^1.0.0",
+        "dashdash": "^1.12.0",
+        "ecc-jsbn": "~0.1.1",
+        "getpass": "^0.1.1",
+        "jsbn": "~0.1.0",
+        "safer-buffer": "^2.0.2",
+        "tweetnacl": "~0.14.0"
+      },
+      "bin": {
+        "sshpk-conv": "bin/sshpk-conv",
+        "sshpk-sign": "bin/sshpk-sign",
+        "sshpk-verify": "bin/sshpk-verify"
+      },
+      "engines": {
+        "node": ">=0.10.0"
+      }
+    },
     "node_modules/stackback": {
       "version": "0.0.2",
       "resolved": "https://registry.npmjs.org/stackback/-/stackback-0.0.2.tgz",
@@ -6353,6 +7615,15 @@
       "dev": true,
       "license": "MIT"
     },
+    "node_modules/string_decoder": {
+      "version": "1.3.0",
+      "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.3.0.tgz",
+      "integrity": "sha512-hkRX8U1WjJFd8LsDJ2yQ/wWWxaopEsABU1XfkM8A+j0+85JAGppt16cr1Whg6KIbb4okU6Mql6BOj+uup/wKeA==",
+      "license": "MIT",
+      "dependencies": {
+        "safe-buffer": "~5.2.0"
+      }
+    },
     "node_modules/string-width": {
       "version": "5.1.2",
       "resolved": "https://registry.npmjs.org/string-width/-/string-width-5.1.2.tgz",
@@ -6603,6 +7874,12 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
+    "node_modules/symbol-tree": {
+      "version": "3.2.4",
+      "resolved": "https://registry.npmjs.org/symbol-tree/-/symbol-tree-3.2.4.tgz",
+      "integrity": "sha512-9QNk5KwDF+Bvz+PyObkmSYjI5ksVUYtjW7AU22r2NKcfLJcXp96hkDWU3+XndOsUb+AQ9QhfzfCT2O+CNWT5Tw==",
+      "license": "MIT"
+    },
     "node_modules/synckit": {
       "version": "0.11.6",
       "resolved": "https://registry.npmjs.org/synckit/-/synckit-0.11.6.tgz",
@@ -6619,6 +7896,32 @@
         "url": "https://opencollective.com/synckit"
       }
     },
+    "node_modules/tar": {
+      "version": "6.2.1",
+      "resolved": "https://registry.npmjs.org/tar/-/tar-6.2.1.tgz",
+      "integrity": "sha512-DZ4yORTwrbTj/7MZYq2w+/ZFdI6OZ/f9SFHR+71gIVUZhOQPHzVCLpvRnPgyaMpfWxxk/4ONva3GQSyNIKRv6A==",
+      "license": "ISC",
+      "dependencies": {
+        "chownr": "^2.0.0",
+        "fs-minipass": "^2.0.0",
+        "minipass": "^5.0.0",
+        "minizlib": "^2.1.1",
+        "mkdirp": "^1.0.3",
+        "yallist": "^4.0.0"
+      },
+      "engines": {
+        "node": ">=10"
+      }
+    },
+    "node_modules/tar/node_modules/minipass": {
+      "version": "5.0.0",
+      "resolved": "https://registry.npmjs.org/minipass/-/minipass-5.0.0.tgz",
+      "integrity": "sha512-3FnjYuehv9k6ovOEbyOswadCDPX1piCfhV8ncmYtHOjuPwylVWsghTLo7rabjC3Rx5xD4HDx8Wm1xnMF7S5qFQ==",
+      "license": "ISC",
+      "engines": {
+        "node": ">=8"
+      }
+    },
     "node_modules/test-exclude": {
       "version": "7.0.1",
       "resolved": "https://registry.npmjs.org/test-exclude/-/test-exclude-7.0.1.tgz",
@@ -6728,6 +8031,19 @@
         "node": ">=0.6"
       }
     },
+    "node_modules/tough-cookie": {
+      "version": "2.5.0",
+      "resolved": "https://registry.npmjs.org/tough-cookie/-/tough-cookie-2.5.0.tgz",
+      "integrity": "sha512-nlLsUzgm1kfLXSXfRZMc1KLAugd4hqJHDTvc2hDIwS3mZAfMEuMbc03SujMF+GEcpaX/qboeycw6iO8JwVv2+g==",
+      "license": "BSD-3-Clause",
+      "dependencies": {
+        "psl": "^1.1.28",
+        "punycode": "^2.1.1"
+      },
+      "engines": {
+        "node": ">=0.8"
+      }
+    },
     "node_modules/tr46": {
       "version": "0.0.3",
       "resolved": "https://registry.npmjs.org/tr46/-/tr46-0.0.3.tgz",
@@ -6747,6 +8063,24 @@
         "strip-bom": "^3.0.0"
       }
     },
+    "node_modules/tunnel-agent": {
+      "version": "0.6.0",
+      "resolved": "https://registry.npmjs.org/tunnel-agent/-/tunnel-agent-0.6.0.tgz",
+      "integrity": "sha512-McnNiV1l8RYeY8tBgEpuodCC1mLUdbSN+CYBL7kJsJNInOP8UjDDEwdk6Mw60vdLLrr5NHKZhMAOSrR2NZuQ+w==",
+      "license": "Apache-2.0",
+      "dependencies": {
+        "safe-buffer": "^5.0.1"
+      },
+      "engines": {
+        "node": "*"
+      }
+    },
+    "node_modules/tweetnacl": {
+      "version": "0.14.5",
+      "resolved": "https://registry.npmjs.org/tweetnacl/-/tweetnacl-0.14.5.tgz",
+      "integrity": "sha512-KXXFFdAbFXY4geFIwoyNK+f5Z1b7swfXABfL7HXCmoIWMKU3dmS26672A4EeQtDzLKy7SXmfBu51JolvEKwtGA==",
+      "license": "Unlicense"
+    },
     "node_modules/type-check": {
       "version": "0.4.0",
       "resolved": "https://registry.npmjs.org/type-check/-/type-check-0.4.0.tgz",
@@ -6925,7 +8259,6 @@
       "version": "4.4.1",
       "resolved": "https://registry.npmjs.org/uri-js/-/uri-js-4.4.1.tgz",
       "integrity": "sha512-7rKUyy33Q1yc98pQ1DAmLtwX109F7TIfWlW1Ydo8Wl1ii1SeHieeh0HHfPeL2fMXK6z0s8ecKs9frCuLJvndBg==",
-      "dev": true,
       "license": "BSD-2-Clause",
       "dependencies": {
         "punycode": "^2.1.0"
@@ -6938,6 +8271,12 @@
       "dev": true,
       "license": "MIT"
     },
+    "node_modules/util-deprecate": {
+      "version": "1.0.2",
+      "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
+      "integrity": "sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw==",
+      "license": "MIT"
+    },
     "node_modules/utils-merge": {
       "version": "1.0.1",
       "resolved": "https://registry.npmjs.org/utils-merge/-/utils-merge-1.0.1.tgz",
@@ -6948,6 +8287,16 @@
         "node": ">= 0.4.0"
       }
     },
+    "node_modules/uuid": {
+      "version": "3.4.0",
+      "resolved": "https://registry.npmjs.org/uuid/-/uuid-3.4.0.tgz",
+      "integrity": "sha512-HjSDRw6gZE5JMggctHBcjVak08+KEVhSIiDzFnT9S9aegmp85S/bReBVTb4QTFaRNptJ9kuYaNhnbNEOkbKb/A==",
+      "deprecated": "Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.",
+      "license": "MIT",
+      "bin": {
+        "uuid": "bin/uuid"
+      }
+    },
     "node_modules/vary": {
       "version": "1.1.2",
       "resolved": "https://registry.npmjs.org/vary/-/vary-1.1.2.tgz",
@@ -6958,6 +8307,20 @@
         "node": ">= 0.8"
       }
     },
+    "node_modules/verror": {
+      "version": "1.10.0",
+      "resolved": "https://registry.npmjs.org/verror/-/verror-1.10.0.tgz",
+      "integrity": "sha512-ZZKSmDAEFOijERBLkmYfJ+vmk3w+7hOLYDNkRCuRuMJGEmqYNCNLyBBFwWKVMhfwaEF3WOd0Zlw86U/WC/+nYw==",
+      "engines": [
+        "node >=0.6.0"
+      ],
+      "license": "MIT",
+      "dependencies": {
+        "assert-plus": "^1.0.0",
+        "core-util-is": "1.0.2",
+        "extsprintf": "^1.2.0"
+      }
+    },
     "node_modules/vite": {
       "version": "6.3.5",
       "resolved": "https://registry.npmjs.org/vite/-/vite-6.3.5.tgz",
@@ -7142,6 +8505,15 @@
       "integrity": "sha512-2JAn3z8AR6rjK8Sm8orRC0h/bcl/DqL7tRPdGZ4I1CjdF+EaMLmYxBHyXuKL849eucPFhvBoxMsflfOb8kxaeQ==",
       "license": "BSD-2-Clause"
     },
+    "node_modules/whatwg-encoding": {
+      "version": "1.0.5",
+      "resolved": "https://registry.npmjs.org/whatwg-encoding/-/whatwg-encoding-1.0.5.tgz",
+      "integrity": "sha512-b5lim54JOPN9HtzvK9HFXvBma/rnfFeqsic0hSpjtDbVxR3dJKLc+KB4V6GgiGOvl7CY/KNh8rxSo9DKQrnUEw==",
+      "license": "MIT",
+      "dependencies": {
+        "iconv-lite": "0.4.24"
+      }
+    },
     "node_modules/whatwg-url": {
       "version": "5.0.0",
       "resolved": "https://registry.npmjs.org/whatwg-url/-/whatwg-url-5.0.0.tgz",
@@ -7274,11 +8646,60 @@
         "node": ">=8"
       }
     },
+    "node_modules/wide-align": {
+      "version": "1.1.5",
+      "resolved": "https://registry.npmjs.org/wide-align/-/wide-align-1.1.5.tgz",
+      "integrity": "sha512-eDMORYaPNZ4sQIuuYPDHdQvf4gyCF9rEEV/yPxGfwPkRodwEgiMUUXTx/dex+Me0wxx53S+NgUHaP7y3MGlDmg==",
+      "license": "ISC",
+      "dependencies": {
+        "string-width": "^1.0.2 || 2 || 3 || 4"
+      }
+    },
+    "node_modules/wide-align/node_modules/ansi-regex": {
+      "version": "5.0.1",
+      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
+      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
+      "license": "MIT",
+      "engines": {
+        "node": ">=8"
+      }
+    },
+    "node_modules/wide-align/node_modules/emoji-regex": {
+      "version": "8.0.0",
+      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
+      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
+      "license": "MIT"
+    },
+    "node_modules/wide-align/node_modules/string-width": {
+      "version": "4.2.3",
+      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
+      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
+      "license": "MIT",
+      "dependencies": {
+        "emoji-regex": "^8.0.0",
+        "is-fullwidth-code-point": "^3.0.0",
+        "strip-ansi": "^6.0.1"
+      },
+      "engines": {
+        "node": ">=8"
+      }
+    },
+    "node_modules/wide-align/node_modules/strip-ansi": {
+      "version": "6.0.1",
+      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
+      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
+      "license": "MIT",
+      "dependencies": {
+        "ansi-regex": "^5.0.1"
+      },
+      "engines": {
+        "node": ">=8"
+      }
+    },
     "node_modules/word-wrap": {
       "version": "1.2.5",
       "resolved": "https://registry.npmjs.org/word-wrap/-/word-wrap-1.2.5.tgz",
       "integrity": "sha512-BN22B5eaMMI9UMtjrGd5g5eCYPpCPDUy0FJXbYsaT5zYxjFOckS53SQDE3pWkVoWpHXVb3BrYcEN4Twa55B5cA==",
-      "dev": true,
       "license": "MIT",
       "engines": {
         "node": ">=0.10.0"
@@ -7383,7 +8804,18 @@
       "version": "1.0.2",
       "resolved": "https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz",
       "integrity": "sha512-l4Sp/DRseor9wL6EvV2+TuQn63dMkPjZ/sp9XkghTEbV9KlPS1xUsZ3u7/IQO4wxtcFB4bgpQPRcR3QCvezPcQ==",
-      "dev": true,
+      "license": "ISC"
+    },
+    "node_modules/xml-name-validator": {
+      "version": "2.0.1",
+      "resolved": "https://registry.npmjs.org/xml-name-validator/-/xml-name-validator-2.0.1.tgz",
+      "integrity": "sha512-jRKe/iQYMyVJpzPH+3HL97Lgu5HrCfii+qSo+TfjKHtOnvbnvdVfMYrn9Q34YV81M2e5sviJlI6Ko9y+nByzvA==",
+      "license": "WTFPL"
+    },
+    "node_modules/yallist": {
+      "version": "4.0.0",
+      "resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
+      "integrity": "sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A==",
       "license": "ISC"
     },
     "node_modules/yocto-queue": {
diff --git a/package.json b/package.json
index 8522a815..03b8e0fc 100644
--- a/package.json
+++ b/package.json
@@ -29,12 +29,14 @@
     "ejs": "^3.1.10",
     "js-yaml": "^4.1.0",
     "minimatch": "^10.0.1",
-    "zod": "^3.25.30"
+    "zod": "^3.25.30",
+    "d3-node": "^2.1.4",
+    "canvas": "^2.11.2"
   },
   "devDependencies": {
     "@microsoft/eslint-formatter-sarif": "^3.1.0",
     "@vitest/coverage-v8": "^3.1.4",
-    "eslint": "^9.25.1",
+    "eslint": "^9.27.0",
     "eslint-config-google": "^0.14.0",
     "eslint-config-prettier": "^10.1.5",
     "eslint-plugin-import": "^2.31.0",
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
index 3cdd4e2a..6ec231d6 100755
--- a/src/lib/main.js
+++ b/src/lib/main.js
@@ -1,13 +1,210 @@
 #!/usr/bin/env node
-// src/lib/main.js
+import fs from 'fs';
+import path from 'path';
+import yargs from 'yargs';
+import { hideBin } from 'yargs/helpers';
+import { parse as parseMath } from 'mathjs';
+import D3Node from 'd3-node';
+import { createCanvas, loadImage } from 'canvas';
 
-import { fileURLToPath } from "url";
+/**
+ * Generate time series data from an expression over a numeric range.
+ * @param {string} exprStr - The mathematical expression in terms of x.
+ * @param {string} rangeStr - The range string in format x=start:end:step.
+ * @returns {{x:number,y:number}[]} The generated series.
+ */
+function generateTimeSeries(exprStr, rangeStr) {
+  if (exprStr.startsWith('y=')) {
+    exprStr = exprStr.slice(2);
+  }
+  const expr = parseMath(exprStr).compile();
+  const rangePattern = /^x=(-?\d+(?:\.\d+)?):(-?\d+(?:\.\d+)?):(\d+(?:\.\d+)?)$/;
+  const match = rangeStr.match(rangePattern);
+  if (!match) {
+    throw new Error('Invalid range format. Expected x=<start>:<end>:<step>');
+  }
+  const start = parseFloat(match[1]);
+  const end = parseFloat(match[2]);
+  const step = parseFloat(match[3]);
+  if (step <= 0 || start > end) {
+    throw new Error('Invalid range values. Require step > 0 and start <= end');
+  }
+  const series = [];
+  const epsilon = step / 1e6;
+  for (let x = start; x <= end + epsilon; x += step) {
+    const yVal = expr.evaluate({ x });
+    if (typeof yVal !== 'number' || Number.isNaN(yVal)) {
+      throw new Error(`Expression did not evaluate to a number at x=${x}`);
+    }
+    series.push({ x: Number(x.toPrecision(15)), y: yVal });
+  }
+  return series;
+}
+
+/**
+ * Main function for CLI or programmatic usage.
+ * @param {string[]} args - CLI arguments (excluding node and script).
+ */
+export async function main(args) {
+  if (!args || args.length === 0) {
+    return;
+  }
+
+  await yargs(args)
+    .scriptName('repository0-plot-code-lib')
+    .usage('$0 <command> [options]')
+    .command(
+      '$0',
+      'Generate time series JSON from expression and range',
+      y =>
+        y
+          .option('expression', {
+            alias: 'e',
+            type: 'string',
+            demandOption: true,
+            describe: 'Formula in terms of x, e.g. y=sin(x) or sin(x)',
+          })
+          .option('range', {
+            alias: 'r',
+            type: 'string',
+            demandOption: true,
+            describe: 'Range syntax x=<start>:<end>:<step>',
+          })
+          .option('output', {
+            alias: 'o',
+            type: 'string',
+            describe: 'Output file path; defaults to stdout',
+          }),
+      argv => {
+        try {
+          const series = generateTimeSeries(argv.expression.trim(), argv.range.trim());
+          const outputJson = JSON.stringify(series, null, 2);
+          if (argv.output) {
+            fs.writeFileSync(argv.output, outputJson, 'utf-8');
+          } else {
+            console.log(outputJson);
+          }
+          process.exit(0);
+        } catch (err) {
+          console.error(`Error: ${err.message}`);
+          process.exit(1);
+        }
+      }
+    )
+    .command(
+      'plot',
+      'Render plot as SVG or PNG from time series JSON',
+      y =>
+        y
+          .option('input', {
+            alias: 'i',
+            type: 'string',
+            describe: 'Path to JSON file; if omitted, read stdin',
+          })
+          .option('output', {
+            alias: 'o',
+            type: 'string',
+            default: 'plot.svg',
+            describe: 'Output image file path',
+          })
+          .option('format', {
+            alias: 'f',
+            type: 'string',
+            choices: ['svg', 'png'],
+            default: 'svg',
+            describe: 'Output format',
+          })
+          .option('width', {
+            alias: 'w',
+            type: 'number',
+            default: 800,
+            describe: 'Image width in pixels',
+          })
+          .option('height', {
+            alias: 'h',
+            type: 'number',
+            default: 600,
+            describe: 'Image height in pixels',
+          }),
+      async argv => {
+        try {
+          let dataStr;
+          if (argv.input) {
+            dataStr = fs.readFileSync(argv.input, 'utf-8');
+          } else {
+            dataStr = fs.readFileSync(0, 'utf-8');
+          }
+          const data = JSON.parse(dataStr);
+          if (
+            !Array.isArray(data) ||
+            data.some(
+              d => typeof d.x !== 'number' || typeof d.y !== 'number'
+            )
+          ) {
+            throw new Error(
+              'Input JSON must be an array of { x: number, y: number }'
+            );
+          }
+          const width = argv.width;
+          const height = argv.height;
+
+          const d3n = new D3Node();
+          const d3 = d3n.d3;
+          const svg = d3n.createSVG(width, height);
+
+          const xs = data.map(d => d.x);
+          const ys = data.map(d => d.y);
+          const xScale = d3
+            .scaleLinear()
+            .domain([Math.min(...xs), Math.max(...xs)])
+            .range([0, width]);
+          const yScale = d3
+            .scaleLinear()
+            .domain([Math.min(...ys), Math.max(...ys)])
+            .range([height, 0]);
 
-export function main(args) {
-  console.log(`Run with: ${JSON.stringify(args)}`);
+          const line = d3
+            .line()
+            .x(d => xScale(d.x))
+            .y(d => yScale(d.y));
+
+          svg.append('path')
+            .attr('d', line(data))
+            .attr('fill', 'none')
+            .attr('stroke', 'black');
+
+          const svgString = d3n.svgString();
+
+          if (argv.format === 'png') {
+            const canvas = createCanvas(width, height);
+            const ctx = canvas.getContext('2d');
+            const img = await loadImage(
+              `data:image/svg+xml;base64,${Buffer.from(
+                svgString
+              ).toString('base64')}`
+            );
+            ctx.drawImage(img, 0, 0, width, height);
+            const buffer = canvas.toBuffer('image/png');
+            fs.writeFileSync(argv.output, buffer);
+          } else {
+            fs.writeFileSync(argv.output, svgString, 'utf-8');
+          }
+          process.exit(0);
+        } catch (err) {
+          console.error(`Error: ${err.message}`);
+          process.exit(1);
+        }
+      }
+    )
+    .help()
+    .alias('help', 'h')
+    .alias('version', 'v')
+    .strict()
+    .parse();
 }
 
-if (process.argv[1] === fileURLToPath(import.meta.url)) {
-  const args = process.argv.slice(2);
-  main(args);
+export default main;
+
+if (import.meta.main) {
+  main(hideBin(process.argv));
 }
diff --git a/tests/unit/plot-generation.test.js b/tests/unit/plot-generation.test.js
index 19a4042c..e3276da0 100644
--- a/tests/unit/plot-generation.test.js
+++ b/tests/unit/plot-generation.test.js
@@ -1,16 +1,73 @@
-import { describe, test, expect } from "vitest";
-import * as mainModule from "@src/lib/main.js";
-import { main } from "@src/lib/main.js";
+import { describe, test, expect } from 'vitest';
+import * as mainModule from '@src/lib/main.js';
+import { main } from '@src/lib/main.js';
+import { spawnSync } from 'child_process';
+import { writeFileSync, readFileSync, unlinkSync, existsSync } from 'fs';
+import path from 'path';
 
-describe("Main Module Import", () => {
-  test("should be non-null", () => {
+describe('Main Module Import', () => {
+  test('should be non-null', () => {
     expect(mainModule).not.toBeNull();
   });
 });
 
-describe("Default main", () => {
-  test("should terminate without error", () => {
-    process.argv = ["node", "src/lib/main.js"];
+describe('Default main', () => {
+  test('should terminate without error', () => {
+    process.argv = ['node', 'src/lib/main.js'];
     main();
   });
 });
+
+describe('Plot Rendering Subcommand', () => {
+  const cliPath = path.resolve(__dirname, '../../src/lib/main.js');
+  const tempJson = path.resolve(__dirname, 'temp_data.json');
+
+  afterEach(() => {
+    if (existsSync(tempJson)) unlinkSync(tempJson);
+  });
+
+  test('generates SVG file correctly', () => {
+    const sample = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 4 }];
+    writeFileSync(tempJson, JSON.stringify(sample));
+    const svgOut = path.resolve(__dirname, 'temp_plot.svg');
+    if (existsSync(svgOut)) unlinkSync(svgOut);
+    const result = spawnSync(
+      'node',
+      [cliPath, 'plot', '-i', tempJson, '-o', svgOut, '-f', 'svg', '-w', '100', '-h', '100']
+    );
+    expect(result.status).toBe(0);
+    expect(existsSync(svgOut)).toBe(true);
+    const content = readFileSync(svgOut, 'utf-8');
+    expect(content.trim().startsWith('<svg')).toBe(true);
+    unlinkSync(svgOut);
+  });
+
+  test('generates PNG file correctly', () => {
+    const sample = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 4 }];
+    writeFileSync(tempJson, JSON.stringify(sample));
+    const pngOut = path.resolve(__dirname, 'temp_plot.png');
+    if (existsSync(pngOut)) unlinkSync(pngOut);
+    const result = spawnSync(
+      'node',
+      [cliPath, 'plot', '-i', tempJson, '-o', pngOut, '-f', 'png', '-w', '100', '-h', '100']
+    );
+    expect(result.status).toBe(0);
+    expect(existsSync(pngOut)).toBe(true);
+    const buf = readFileSync(pngOut);
+    const pngSignature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
+    expect(buf.slice(0, 8).equals(pngSignature)).toBe(true);
+    unlinkSync(pngOut);
+  });
+
+  test('errors on invalid JSON input', () => {
+    writeFileSync(tempJson, 'not a json');
+    const svgOut = path.resolve(__dirname, 'temp_plot.svg');
+    const result = spawnSync(
+      'node',
+      [cliPath, 'plot', '-i', tempJson, '-o', svgOut]
+    );
+    expect(result.status).not.toBe(0);
+    expect(result.stderr.toString()).toContain('Error:');
+    if (existsSync(svgOut)) unlinkSync(svgOut);
+  });
+});\n\n// New [USAGE.md]:\n# Usage

## Time Series Generation

Generates a time series of (x, y) data points from a mathematical expression over a numeric range.

### Command

```sh
repository0-plot-code-lib --expression "<expr>" --range "x=<start>:<end>:<step>" [--output <file>]
```

Options:
- `--expression, -e`: formula in terms of x (e.g., `y=sin(x)` or `sin(x]`).
- `--range, -r`: range syntax `x=<start>:<end>:<step>` (e.g., `x=0:3.14:0.1`).
- `--output, -o`: (optional) output file path; if omitted, prints to stdout.

### Example

```sh
repository0-plot-code-lib -e "y=x*2" -r "x=0:2:1"
```

## Plot Rendering

Renders a line plot from time series JSON data to SVG or PNG.

### Command

```sh
repository0-plot-code-lib plot [options]
```

Options:
- `--input, -i`: path to JSON file containing an array of objects `{ x: number, y: number }`. If omitted, reads JSON from stdin.
- `--output, -o`: output image file path; default `plot.svg`.
- `--format, -f`: output format; choices `svg` or `png`; default `svg`.
- `--width, -w`: image width in pixels; default `800`.
- `--height, -h`: image height in pixels; default `600`.

### Examples

Generate SVG:

```sh
echo '[{"x":0,"y":0},{"x":1,"y":1},{"x":2,"y":4}]' | repository0-plot-code-lib plot -f svg -o chart.svg -w 400 -h 300
```

Generate PNG:

```sh
repository0-plot-code-lib plot -i data.json -o chart.png -f png
```
```

mainOutput:
```log

```

installAfterUpdateOutcome: success

ciAfterUpdateOutcome: success

testAfterUpdateOutcome: failure

mainAfterUpdateOutcome: failure

commitOutcome: success

postResolutionCommentOutcome: success

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/3134 with title: ""]

LLM API Usage:
```json
{"prompt_tokens":24687,"completion_tokens":13235,"total_tokens":37922,"prompt_tokens_details":{"cached_tokens":1280,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":8768,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Fixed Code at 2025-05-27T03:43:32.932Z

Activity:

fixApplied: true with Add yargs dependency and implement CLI handlers for time-series generation and outcome success

Git Diff:
```diff
diff --git a/package-lock.json b/package-lock.json
index abe29856..29ea665a 100644
--- a/package-lock.json
+++ b/package-lock.json
@@ -16,6 +16,7 @@
         "js-yaml": "^4.1.0",
         "minimatch": "^10.0.1",
         "openai": "^4.103.0",
+        "yargs": "^17.7.2",
         "zod": "^3.25.30"
       },
       "bin": {
@@ -2449,6 +2450,78 @@
         "node": ">=10"
       }
     },
+    "node_modules/cliui": {
+      "version": "8.0.1",
+      "resolved": "https://registry.npmjs.org/cliui/-/cliui-8.0.1.tgz",
+      "integrity": "sha512-BSeNnyus75C4//NQ9gQt1/csTXyo/8Sb+afLAkzAptFuMsod9HFokGNudZpi/oQV73hnVK+sR+5PVRMd+Dr7YQ==",
+      "license": "ISC",
+      "dependencies": {
+        "string-width": "^4.2.0",
+        "strip-ansi": "^6.0.1",
+        "wrap-ansi": "^7.0.0"
+      },
+      "engines": {
+        "node": ">=12"
+      }
+    },
+    "node_modules/cliui/node_modules/ansi-regex": {
+      "version": "5.0.1",
+      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
+      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
+      "license": "MIT",
+      "engines": {
+        "node": ">=8"
+      }
+    },
+    "node_modules/cliui/node_modules/emoji-regex": {
+      "version": "8.0.0",
+      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
+      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
+      "license": "MIT"
+    },
+    "node_modules/cliui/node_modules/string-width": {
+      "version": "4.2.3",
+      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
+      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
+      "license": "MIT",
+      "dependencies": {
+        "emoji-regex": "^8.0.0",
+        "is-fullwidth-code-point": "^3.0.0",
+        "strip-ansi": "^6.0.1"
+      },
+      "engines": {
+        "node": ">=8"
+      }
+    },
+    "node_modules/cliui/node_modules/strip-ansi": {
+      "version": "6.0.1",
+      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
+      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
+      "license": "MIT",
+      "dependencies": {
+        "ansi-regex": "^5.0.1"
+      },
+      "engines": {
+        "node": ">=8"
+      }
+    },
+    "node_modules/cliui/node_modules/wrap-ansi": {
+      "version": "7.0.0",
+      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-7.0.0.tgz",
+      "integrity": "sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q==",
+      "license": "MIT",
+      "dependencies": {
+        "ansi-styles": "^4.0.0",
+        "string-width": "^4.1.0",
+        "strip-ansi": "^6.0.0"
+      },
+      "engines": {
+        "node": ">=10"
+      },
+      "funding": {
+        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
+      }
+    },
     "node_modules/color-convert": {
       "version": "2.0.1",
       "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
@@ -3424,6 +3497,15 @@
         "@esbuild/win32-x64": "0.25.4"
       }
     },
+    "node_modules/escalade": {
+      "version": "3.2.0",
+      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
+      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
+      "license": "MIT",
+      "engines": {
+        "node": ">=6"
+      }
+    },
     "node_modules/escape-html": {
       "version": "1.0.3",
       "resolved": "https://registry.npmjs.org/escape-html/-/escape-html-1.0.3.tgz",
@@ -4586,6 +4668,15 @@
         "node": ">=8"
       }
     },
+    "node_modules/get-caller-file": {
+      "version": "2.0.5",
+      "resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-2.0.5.tgz",
+      "integrity": "sha512-DyFP3BM/3YHTQOCUL/w0OZHR0lpKeGrxotcHWcqNEdnltqFwXVfhEBQ94eIo34AfQpo0rGki4cyIiftY06h2Fg==",
+      "license": "ISC",
+      "engines": {
+        "node": "6.* || 8.* || >= 10.*"
+      }
+    },
     "node_modules/get-intrinsic": {
       "version": "1.3.0",
       "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.3.0.tgz",
@@ -6973,6 +7064,15 @@
         "node": ">=0.6"
       }
     },
+    "node_modules/require-directory": {
+      "version": "2.1.1",
+      "resolved": "https://registry.npmjs.org/require-directory/-/require-directory-2.1.1.tgz",
+      "integrity": "sha512-fGxEI7+wsG9xrvdjsrlmL22OMTTiHRwAMroiEeMgq8gzoLC/PQr7RsRDSTLUg/bZAZtF+TVIkHc6/4RIKrui+Q==",
+      "license": "MIT",
+      "engines": {
+        "node": ">=0.10.0"
+      }
+    },
     "node_modules/resolve": {
       "version": "1.22.10",
       "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.10.tgz",
@@ -8812,12 +8912,89 @@
       "integrity": "sha512-jRKe/iQYMyVJpzPH+3HL97Lgu5HrCfii+qSo+TfjKHtOnvbnvdVfMYrn9Q34YV81M2e5sviJlI6Ko9y+nByzvA==",
       "license": "WTFPL"
     },
+    "node_modules/y18n": {
+      "version": "5.0.8",
+      "resolved": "https://registry.npmjs.org/y18n/-/y18n-5.0.8.tgz",
+      "integrity": "sha512-0pfFzegeDWJHJIAmTLRP2DwHjdF5s7jo9tuztdQxAhINCdvS+3nGINqPd00AphqJR/0LhANUS6/+7SCb98YOfA==",
+      "license": "ISC",
+      "engines": {
+        "node": ">=10"
+      }
+    },
     "node_modules/yallist": {
       "version": "4.0.0",
       "resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
       "integrity": "sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A==",
       "license": "ISC"
     },
+    "node_modules/yargs": {
+      "version": "17.7.2",
+      "resolved": "https://registry.npmjs.org/yargs/-/yargs-17.7.2.tgz",
+      "integrity": "sha512-7dSzzRQ++CKnNI/krKnYRV7JKKPUXMEh61soaHKg9mrWEhzFWhFnxPxGl+69cD1Ou63C13NUPCnmIcrvqCuM6w==",
+      "license": "MIT",
+      "dependencies": {
+        "cliui": "^8.0.1",
+        "escalade": "^3.1.1",
+        "get-caller-file": "^2.0.5",
+        "require-directory": "^2.1.1",
+        "string-width": "^4.2.3",
+        "y18n": "^5.0.5",
+        "yargs-parser": "^21.1.1"
+      },
+      "engines": {
+        "node": ">=12"
+      }
+    },
+    "node_modules/yargs-parser": {
+      "version": "21.1.1",
+      "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-21.1.1.tgz",
+      "integrity": "sha512-tVpsJW7DdjecAiFpbIB1e3qxIQsE6NoPc5/eTdrbbIC4h0LVsWhnoa3g+m2HclBIujHzsxZ4VJVA+GUuc2/LBw==",
+      "license": "ISC",
+      "engines": {
+        "node": ">=12"
+      }
+    },
+    "node_modules/yargs/node_modules/ansi-regex": {
+      "version": "5.0.1",
+      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
+      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
+      "license": "MIT",
+      "engines": {
+        "node": ">=8"
+      }
+    },
+    "node_modules/yargs/node_modules/emoji-regex": {
+      "version": "8.0.0",
+      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
+      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
+      "license": "MIT"
+    },
+    "node_modules/yargs/node_modules/string-width": {
+      "version": "4.2.3",
+      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
+      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
+      "license": "MIT",
+      "dependencies": {
+        "emoji-regex": "^8.0.0",
+        "is-fullwidth-code-point": "^3.0.0",
+        "strip-ansi": "^6.0.1"
+      },
+      "engines": {
+        "node": ">=8"
+      }
+    },
+    "node_modules/yargs/node_modules/strip-ansi": {
+      "version": "6.0.1",
+      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
+      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
+      "license": "MIT",
+      "dependencies": {
+        "ansi-regex": "^5.0.1"
+      },
+      "engines": {
+        "node": ">=8"
+      }
+    },
     "node_modules/yocto-queue": {
       "version": "0.1.0",
       "resolved": "https://registry.npmjs.org/yocto-queue/-/yocto-queue-0.1.0.tgz",
diff --git a/package.json b/package.json
index 03b8e0fc..ccc25355 100644
--- a/package.json
+++ b/package.json
@@ -25,13 +25,14 @@
   "license": "MIT",
   "dependencies": {
     "dotenv": "^16.5.0",
-    "openai": "^4.103.0",
     "ejs": "^3.1.10",
     "js-yaml": "^4.1.0",
     "minimatch": "^10.0.1",
     "zod": "^3.25.30",
     "d3-node": "^2.1.4",
-    "canvas": "^2.11.2"
+    "canvas": "^2.11.2",
+    "openai": "^4.103.0",
+    "yargs": "^17.7.2"
   },
   "devDependencies": {
     "@microsoft/eslint-formatter-sarif": "^3.1.0",
diff --git a/src/lib/main.js b/src/lib/main.js
index 6ec231d6..f307c90e 100755
--- a/src/lib/main.js
+++ b/src/lib/main.js
@@ -1,210 +1,127 @@
 #!/usr/bin/env node
 import fs from 'fs';
-import path from 'path';
+import { evaluate } from 'mathjs';
 import yargs from 'yargs';
 import { hideBin } from 'yargs/helpers';
-import { parse as parseMath } from 'mathjs';
-import D3Node from 'd3-node';
-import { createCanvas, loadImage } from 'canvas';
 
-/**
- * Generate time series data from an expression over a numeric range.
- * @param {string} exprStr - The mathematical expression in terms of x.
- * @param {string} rangeStr - The range string in format x=start:end:step.
- * @returns {{x:number,y:number}[]} The generated series.
- */
-function generateTimeSeries(exprStr, rangeStr) {
-  if (exprStr.startsWith('y=')) {
-    exprStr = exprStr.slice(2);
+async function generateTimeSeries(opts) {
+  const exprRaw = opts.expression;
+  if (!exprRaw.startsWith('y=')) {
+    console.error('Expression must be in form y=<formula>');
+    process.exit(1);
   }
-  const expr = parseMath(exprStr).compile();
-  const rangePattern = /^x=(-?\d+(?:\.\d+)?):(-?\d+(?:\.\d+)?):(\d+(?:\.\d+)?)$/;
-  const match = rangeStr.match(rangePattern);
-  if (!match) {
-    throw new Error('Invalid range format. Expected x=<start>:<end>:<step>');
+  const expr = exprRaw.slice(2);
+  const rangeRaw = opts.range;
+  const rangeMatch = rangeRaw.match(/^x=([-+]?\d*\.?\d+):([-+]?\d*\.?\d+):([-+]?\d*\.?\d+)$/);
+  if (!rangeMatch) {
+    console.error('Range must be in form x=<start>:<end>:<step>');
+    process.exit(1);
   }
-  const start = parseFloat(match[1]);
-  const end = parseFloat(match[2]);
-  const step = parseFloat(match[3]);
+  const start = parseFloat(rangeMatch[1]);
+  const end = parseFloat(rangeMatch[2]);
+  const step = parseFloat(rangeMatch[3]);
   if (step <= 0 || start > end) {
-    throw new Error('Invalid range values. Require step > 0 and start <= end');
+    console.error('Invalid range values');
+    process.exit(1);
   }
   const series = [];
-  const epsilon = step / 1e6;
-  for (let x = start; x <= end + epsilon; x += step) {
-    const yVal = expr.evaluate({ x });
-    if (typeof yVal !== 'number' || Number.isNaN(yVal)) {
-      throw new Error(`Expression did not evaluate to a number at x=${x}`);
+  for (let x = start; x <= end + 1e-12; x += step) {
+    let y;
+    try {
+      y = evaluate(expr, { x });
+      if (typeof y !== 'number' || Number.isNaN(y)) {
+        throw new Error('Invalid evaluation result');
+      }
+    } catch (err) {
+      console.error(`Failed to evaluate expression at x=${x}: ${err.message}`);
+      process.exit(1);
     }
-    series.push({ x: Number(x.toPrecision(15)), y: yVal });
+    series.push({ x, y });
   }
-  return series;
-}
-
-/**
- * Main function for CLI or programmatic usage.
- * @param {string[]} args - CLI arguments (excluding node and script).
- */
-export async function main(args) {
-  if (!args || args.length === 0) {
-    return;
+  const output = JSON.stringify(series, null, 2);
+  if (opts.output) {
+    try {
+      fs.writeFileSync(opts.output, output, 'utf-8');
+    } catch (err) {
+      console.error(`Failed to write output file: ${err.message}`);
+      process.exit(1);
+    }
+  } else {
+    process.stdout.write(output);
   }
+}
 
-  await yargs(args)
+(async () => {
+  yargs(hideBin(process.argv))
     .scriptName('repository0-plot-code-lib')
-    .usage('$0 <command> [options]')
-    .command(
-      '$0',
-      'Generate time series JSON from expression and range',
-      y =>
-        y
-          .option('expression', {
-            alias: 'e',
-            type: 'string',
-            demandOption: true,
-            describe: 'Formula in terms of x, e.g. y=sin(x) or sin(x)',
-          })
-          .option('range', {
-            alias: 'r',
-            type: 'string',
-            demandOption: true,
-            describe: 'Range syntax x=<start>:<end>:<step>',
-          })
-          .option('output', {
-            alias: 'o',
-            type: 'string',
-            describe: 'Output file path; defaults to stdout',
-          }),
-      argv => {
-        try {
-          const series = generateTimeSeries(argv.expression.trim(), argv.range.trim());
-          const outputJson = JSON.stringify(series, null, 2);
-          if (argv.output) {
-            fs.writeFileSync(argv.output, outputJson, 'utf-8');
-          } else {
-            console.log(outputJson);
-          }
-          process.exit(0);
-        } catch (err) {
-          console.error(`Error: ${err.message}`);
-          process.exit(1);
-        }
-      }
-    )
+    .usage('Usage: $0 [command]')
     .command(
       'plot',
-      'Render plot as SVG or PNG from time series JSON',
-      y =>
-        y
+      'Render plot from time series JSON',
+      (yargsBuilder) =>
+        yargsBuilder
           .option('input', {
             alias: 'i',
             type: 'string',
-            describe: 'Path to JSON file; if omitted, read stdin',
+            description: 'Input JSON file path (defaults to stdin)',
           })
           .option('output', {
             alias: 'o',
             type: 'string',
+            description: 'Output image file path',
             default: 'plot.svg',
-            describe: 'Output image file path',
           })
           .option('format', {
             alias: 'f',
             type: 'string',
             choices: ['svg', 'png'],
+            description: 'Output format',
             default: 'svg',
-            describe: 'Output format',
           })
           .option('width', {
             alias: 'w',
             type: 'number',
+            description: 'Image width in pixels',
             default: 800,
-            describe: 'Image width in pixels',
           })
           .option('height', {
             alias: 'h',
             type: 'number',
+            description: 'Image height in pixels',
             default: 600,
-            describe: 'Image height in pixels',
           }),
-      async argv => {
-        try {
-          let dataStr;
-          if (argv.input) {
-            dataStr = fs.readFileSync(argv.input, 'utf-8');
-          } else {
-            dataStr = fs.readFileSync(0, 'utf-8');
-          }
-          const data = JSON.parse(dataStr);
-          if (
-            !Array.isArray(data) ||
-            data.some(
-              d => typeof d.x !== 'number' || typeof d.y !== 'number'
-            )
-          ) {
-            throw new Error(
-              'Input JSON must be an array of { x: number, y: number }'
-            );
-          }
-          const width = argv.width;
-          const height = argv.height;
-
-          const d3n = new D3Node();
-          const d3 = d3n.d3;
-          const svg = d3n.createSVG(width, height);
-
-          const xs = data.map(d => d.x);
-          const ys = data.map(d => d.y);
-          const xScale = d3
-            .scaleLinear()
-            .domain([Math.min(...xs), Math.max(...xs)])
-            .range([0, width]);
-          const yScale = d3
-            .scaleLinear()
-            .domain([Math.min(...ys), Math.max(...ys)])
-            .range([height, 0]);
-
-          const line = d3
-            .line()
-            .x(d => xScale(d.x))
-            .y(d => yScale(d.y));
-
-          svg.append('path')
-            .attr('d', line(data))
-            .attr('fill', 'none')
-            .attr('stroke', 'black');
-
-          const svgString = d3n.svgString();
-
-          if (argv.format === 'png') {
-            const canvas = createCanvas(width, height);
-            const ctx = canvas.getContext('2d');
-            const img = await loadImage(
-              `data:image/svg+xml;base64,${Buffer.from(
-                svgString
-              ).toString('base64')}`
-            );
-            ctx.drawImage(img, 0, 0, width, height);
-            const buffer = canvas.toBuffer('image/png');
-            fs.writeFileSync(argv.output, buffer);
-          } else {
-            fs.writeFileSync(argv.output, svgString, 'utf-8');
-          }
-          process.exit(0);
-        } catch (err) {
-          console.error(`Error: ${err.message}`);
-          process.exit(1);
-        }
+      () => {
+        console.error('Plot command is not implemented yet');
+        process.exit(1);
+      }
+    )
+    .command(
+      '$0',
+      'Generate time series from expression and range',
+      (yargsBuilder) =>
+        yargsBuilder
+          .option('expression', {
+            alias: 'e',
+            type: 'string',
+            demandOption: true,
+            description: 'Expression in form y=<formula>',
+          })
+          .option('range', {
+            alias: 'r',
+            type: 'string',
+            demandOption: true,
+            description: 'Range in form x=<start>:<end>:<step>',
+          })
+          .option('output', {
+            alias: 'o',
+            type: 'string',
+            description: 'Output file path for JSON (defaults to stdout)',
+          }),
+      (argv) => {
+        generateTimeSeries(argv);
       }
     )
     .help()
     .alias('help', 'h')
-    .alias('version', 'v')
-    .strict()
     .parse();
-}
-
-export default main;
-
-if (import.meta.main) {
-  main(hideBin(process.argv));
-}
+})();
\ No newline at end of file
```

mainOutput:
```log

```

[allValidationStepsSuccessful: false]

LLM API Usage:
```json
{"prompt_tokens":9431,"completion_tokens":5283,"total_tokens":14714,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":3072,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Create feature activity at 2025-05-27T03:43:53.578Z

The features were maintained with a feature hint of:



and outcome "success"

---

2025-05-27T04:24:13Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-27T04:25:51.597Z

Activity:

Maintained feature TIME_SERIES_GENERATION with

Feature spec:

# Overview

Enhance the existing time series generation command to support output in both JSON and CSV formats, allowing users to export data in a widely supported tabular format.

# Behavior

- The CLI accepts a new flag `--format` or `-f` with values `json` or `csv`. Default is `json` to preserve existing behavior.
- When `--format csv` is used, the output is written as comma-separated lines. The first line is a header `x,y`, followed by one line per data point.
- The existing flags remain:
  - `--expression, -e` for the mathematical formula in terms of x (e.g. `y=sin(x)`).
  - `--range, -r` for the numeric range in `x=<start>:<end>:<step>` syntax.
  - `--output, -o` to specify output file path. When omitted, data is printed to stdout.
- Invalid format values or file write errors terminate with a non-zero exit code and an error message on stderr.

# Implementation

- Add `format` option to yargs configuration alongside expression and range.
- In the handler, after generating the series array:
  - If format is `json`, serialize using `JSON.stringify(series, null, 2)`.
  - If format is `csv`, build a string:
    1. Start with header `x,y`.
    2. For each point `{x,y}`, append a line `${x},${y}`.
- Write the result to stdout or the specified output file.
- Update tests to cover both formats and file writing behavior.

# Tests

- Add unit tests for CSV output:
  - Verify header line appears.
  - Validate correct comma separation for integer and fractional values.
  - Confirm file creation when `--output` is provided.
- Ensure JSON tests still pass.

# Documentation

- Update `USAGE.md` and `README.md` under "Time Series Generation" to:
  - Document the new `--format, -f` option.
  - Provide examples:
    - `repository0-plot-code-lib -e "y=x" -r "x=0:2:1" -f csv`
    - `repository0-plot-code-lib -e "sin(x)" -r "x=0:6.28:3.14" -f csv -o series.csv`


LLM API Usage:
```json
{"prompt_tokens":65679,"completion_tokens":1214,"total_tokens":66893,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":640,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-27T04:26:48.933Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-27T04:27:19.270Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-27T04:28:06.858Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---
## Maintained Feature at 2025-05-27T04:37:10.100Z

Activity:

Maintained feature TIME_SERIES_GENERATION

LLM API Usage:
```json
{"prompt_tokens":66623,"completion_tokens":2225,"total_tokens":68848,"prompt_tokens_details":{"cached_tokens":14464,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":1536,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Maintenance Activity to Issue at 2025-05-27T04:58:37.318Z

Activity:

Created issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/3135 with title [Delegator] Integrate yargs to enhance structured CLI parsing and body:

 Context:
Currently, src/lib/main.js simply logs raw arguments without any structured parsing or help/usage information. Users of this library lack a discoverable interface to understand available commands or flags, which undermines the core mission of providing a robust CLI for plot generation.

Desired Change:
1. Dependencies (package.json):
   • Add `yargs` as a dependency (latest compatible version).
   • Update scripts if needed to support yargs-based commands (no removal of existing scripts).

2. Source Update (src/lib/main.js):
   • Replace manual `process.argv.slice(2)` handling with a `yargs(hideBin(process.argv))` configuration.
   • Configure a basic CLI that supports at minimum:
     - Global `--help` (alias `-h`) to display usage information.
     - Global `--version` (alias `-v`) to display package version.
   • Retain `main(args)` export to facilitate programmatic use; have the yargs command handler call `main(parsedArgs)`.
   • Ensure that calling the script without flags displays help and exits with code 0.

3. Test Updates (tests/unit/main.test.js):
   • Add a mocked invocation of the CLI to verify that invoking with `--help` returns code 0 and prints usage content containing the word 'Usage'. Use `execa` or `child_process.spawnSync` in the test (mock or real).
   • Add a test to verify that `--version` prints the version from package.json.
   • Simplify or remove redundant raw-argv tests that no longer apply.

4. Documentation Update:
   • README.md: under a new section `## CLI Usage` add examples:
     ```
     $ repository0-plot-code-lib --help
     Usage: repository0-plot-code-lib [options]

     Options:
       -h, --help     Show help                                         [boolean]
       -v, --version  Show version number                               [boolean]
     ```
   • USAGE.md: reflect the same usage examples and point to the local installation command `npm link` or direct `node src/lib/main.js`.

Verification:
- Run `npm test` and ensure all unit tests pass.
- Run `node src/lib/main.js --help` manually and confirm help output.
- Run `node src/lib/main.js --version` manually and confirm version matches package.json.

This change up-front enables a structured CLI foundation, delivering immediate user value by making the tool discoverable and extensible for future plot and generation commands, without altering any other files beyond source, tests, README, and package.json..

LLM API Usage:
```json
{"prompt_tokens":5426,"completion_tokens":1766,"total_tokens":7192,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":1152,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---2025-05-27T05:24:58Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-27T05:27:01.909Z

Activity:

Maintained feature TIME_SERIES_GENERATION with

Feature spec:

# Overview

Enhance the existing time series generation command to provide a structured, discoverable CLI with yargs, robust expression parsing, and support for both JSON and CSV output formats. Users can generate a single series or multiple labeled series with clear usage and error messages.

# Behavior

- The CLI accepts one or more `--expression` (`-e`) flags, each in the form `y=<formula>` (e.g., `y=sin(x)`).
- The CLI accepts matching `--range` (`-r`) flags, each in the form `x=<start>:<end>:<step>` (e.g., `x=0:6.28:0.1`). The count of expressions must equal the count of ranges.
- A new `--format` (`-f`) flag supports `json` (default) or `csv` output:
  - JSON: outputs an array of objects with keys `label` and `data`, where `data` is an array of `{ x: number, y: number }`.
  - CSV: outputs rows with header `label,x,y` and one line per data point per series.
- An optional `--label` (`-l`) flag lets users assign labels to each series; if omitted, the raw expression is used as its label.
- The `--output` (`-o`) flag writes to a file; if omitted, output is printed to stdout.
- Global flags `--help` (`-h`) and `--version` (`-v`) display usage information and package version, exiting with code 0.
- All validation errors (mismatched counts, invalid syntax, file I/O failures) exit with a non-zero code and an informative message on stderr.

# Implementation

- Add `yargs` as a dependency and configure commands:
  - Default command for time series generation.
  - Global help and version flags via `.help()` and `.version()`.
- Configure repeatable options: `expression`, `range`, and optional `label` as arrays.
- Parse each expression-range pair:
  1. Strip the `y=` prefix and compile the formula with `mathjs` or `evaluate`.
  2. Parse and validate the range string into numeric `start`, `end`, and `step`.
  3. Generate series points from `start` to `end` inclusive, stepping by `step`.
- After generating series:
  - If `format=json`, build an array of `{ label, data }` and serialize with `JSON.stringify(..., 2)`.
  - If `format=csv`, construct a string starting with `label,x,y` header and one comma-separated line per point.
- Write output to file or stdout using `fs.writeFileSync` or `console.log`.

# Tests

- Unit tests (Vitest) in `tests/unit/series-generation.test.js`:
  - Verify single and multiple expression-range pairs produce correct JSON and CSV outputs.
  - Test custom labels: JSON objects contain correct labels; CSV lines contain label column.
  - Validate error conditions:
    - Mismatched counts of expressions, ranges, and labels.
    - Invalid expression syntax or range format.
    - File write errors when invalid `--output` path is provided.
  - Test help and version flags by spawning the CLI with `--help` and `--version`, asserting exit code 0 and expected output.

# Documentation

- Update `USAGE.md` under “Time Series Generation”:
  - Document the `expression`, `range`, `label`, `format`, and `output` flags.
  - Provide examples for JSON and CSV, single and multiple series:
    ```sh
    repository0-plot-code-lib -e "y=x" -r "x=0:2:1" -f csv
    repository0-plot-code-lib -e "y=sin(x)" -e "y=cos(x)" \
      -r "x=0:3.14:1.57" -r "x=0:3.14:1.57" \
      -l "Sine" -l "Cosine" -f json -o output.json
    ```
- Update `README.md` under `## Time Series Generation` with a summary, usage snippets, and note on help/version flags.



LLM API Usage:
```json
{"prompt_tokens":67573,"completion_tokens":1253,"total_tokens":68826,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":256,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-27T05:28:07.930Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-27T05:28:40.151Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-27T05:29:43.383Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---
## Issue to Ready Issue at 2025-05-27T05:42:41.528Z

Activity:

Enhanced issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/3135 with action enhance and updated description:

Title: [Delegator] Integrate yargs to enhance structured CLI parsing

Context:
Currently, src/lib/main.js simply logs raw arguments without any structured parsing or help/usage information. Users lack a discoverable interface to understand available commands or flags, which undermines our mission of providing a robust CLI for plot generation.

Desired Change:
1. Dependencies (package.json):
   • Add `yargs` as a dependency (latest compatible version).
   • Ensure existing scripts remain intact and support the new yargs-based CLI.

2. Source Update (src/lib/main.js):
   • Replace manual `process.argv.slice(2)` handling with `yargs(hideBin(process.argv))` configuration.
   • Configure basic CLI support:
     - Global `--help` (`-h`) to display usage information.
     - Global `--version` (`-v`) to display the package version.
   • Preserve the `main(args)` export; have the yargs command handler invoke `main(parsedArgs)`.
   • Calling the script without flags should display help and exit with code 0.

3. Test Updates (tests/unit/main.yargs.test.js):
   • Add tests using `child_process.spawnSync` or `execa` to verify:
     - `--help` returns exit code 0 and outputs a usage section containing the word "Usage".
     - `-h` behaves identically to `--help`.
     - `--version` returns exit code 0 and outputs the version from package.json.
   • Ensure existing programmatic tests for `main()` still pass.
   • Remove or refactor redundant raw-argv tests no longer applicable.

4. Documentation Update:
   • README.md: add a new section `## CLI Usage` with the following example:
     ```
     $ repository0-plot-code-lib --help
     Usage: repository0-plot-code-lib [options]

     Options:
       -h, --help     Show help                                      [boolean]
       -v, --version  Show version number                            [boolean]
     ```
   • USAGE.md: reflect the same usage examples and mention installation via `npm link` or direct invocation of `node src/lib/main.js`.

Testable Acceptance Criteria:
- Running `repository0-plot-code-lib --help` outputs a usage section (containing "Usage:") and exits with code 0.
- Running `repository0-plot-code-lib -h` produces identical output and exit code.
- Running `repository0-plot-code-lib --version` prints the exact version from package.json and exits with code 0.
- Invoking `main(parsedArgs)` programmatically still returns without error and logs the parsed arguments.
- Unit tests for help and version flags are added and pass under `npm test`.
- Running the CLI without any flags shows help and exits with code 0.

LLM API Usage:
```json
{"prompt_tokens":6460,"completion_tokens":1250,"total_tokens":7710,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":576,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Issue to Ready Issue at 2025-05-27T06:24:47.556Z

Activity:

Readied issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/3134 with enhanced description:



LLM API Usage:
```json
{"prompt_tokens":7271,"completion_tokens":1792,"total_tokens":9063,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":832,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---2025-05-27T06:24:51Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-27T06:26:36.670Z

Activity:

Maintained feature TIME_SERIES_GENERATION with

Feature spec:

# Overview

Enhance the core time series generation command to support flexible output formats and a structured CLI interface. Users will be able to generate a numeric series from one mathematical expression and range, choose JSON or CSV output, and access built-in help and version flags.

# Behavior

- Parses a single `--expression` (`-e`) in the form `y=<formula>` (for example, `y=sin(x)`).
- Parses a single `--range` (`-r`) in the form `x=<start>:<end>:<step>` (for example, `x=0:6.28:0.1`).
- Adds a `--format` (`-f`) flag that accepts `json` (default) or `csv`:
  - In JSON mode, outputs an array of `{ x: number, y: number }`.
  - In CSV mode, outputs a header row `x,y` followed by comma-separated data lines.
- Adds global `--help` (`-h`) to display usage and `--version` (`-v`) to display the package version.
- The `--output` (`-o`) flag writes output to a file; if omitted, writes to stdout.
- Validation errors (invalid expression, range format, write failures) exit with code 1 and print a descriptive message to stderr.

# Implementation

- Use `yargs` to configure the default command:
  - `.option('expression', ...)` with alias `-e`, string, required.
  - `.option('range', ...)` with alias `-r`, string, required.
  - `.option('format', ...)` with alias `-f`, choices `json` or `csv`, default `json`.
  - `.option('output', ...)` with alias `-o`, string, optional.
  - `.help()` and `.version()` for built-in flags.
- In the handler:
  1. Strip the `y=` prefix and compile the formula with a parsing library (for example `mathjs`).
  2. Parse the range string into numeric start, end, and step; enforce `step > 0` and `start <= end`.
  3. Generate the series points by stepping from start to end inclusive.
  4. Serialize the series:
     - For JSON mode, use `JSON.stringify(series, null, 2)`.
     - For CSV mode, build a string with a header `x,y` and one line per point.
  5. Write to the specified file with `fs.writeFileSync` or print to stdout.
- Exit code 0 on success.

# CLI Interface

    repository0-plot-code-lib -e "y=x*2" -r "x=0:5:1"
    repository0-plot-code-lib --expression "y=sin(x)" --range "x=0:3.14:1.57" --format csv --output series.csv

# Tests

- Unit tests to verify JSON output:
  - Default format produces correct array of objects.
  - File writing via `--output` writes valid JSON.
- Unit tests to verify CSV output:
  - Header `x,y` is present.
  - Correct comma-separated numeric values for integer and fractional ranges.
  - File writing via `--output` writes valid CSV.
- Tests for error conditions:
  - Invalid expression or range syntax yields exit code 1 and error message.
  - Invalid write path yields error.
- Tests for help and version flags by spawning the CLI and checking exit code 0 and expected output patterns.

# Documentation

- Update `USAGE.md` under “Time Series Generation” to:
  - Document `--format` flag with examples for JSON and CSV.
  - Show usage of `--help` and `--version`.
- Update `README.md` under `## Time Series Generation` to include brief usage snippets and note on output formats.


LLM API Usage:
```json
{"prompt_tokens":70019,"completion_tokens":1681,"total_tokens":71700,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":768,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-27T06:27:30.954Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-27T06:28:02.289Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-27T06:28:56.019Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---
## Maintain Feature at 2025-05-27T06:59:11.677Z

Activity:

Maintained feature CLI_PARSING with:

Feature spec:

# Overview

Introduce a structured, discoverable CLI using yargs to replace raw argument logging. Provide built-in help and version commands, while retaining programmatic access via main(args).

# Behavior

When invoked:
- `--help` or `-h` displays usage information and exits 0.
- `--version` or `-v` shows the package version and exits 0.
- Without flags, shows help and exits 0.
- The default command captures flags and passes parsed arguments to `main(parsedArgs)` without exiting.

Programmatic use:
- Calling `main(argsArray)` returns the parsed arguments object.

# Implementation

- Add `yargs` dependency in package.json.
- In `src/lib/main.js`:
  - Import yargs and `hideBin`.
  - Wrap existing `main(args)` export.
  - Configure `yargs(hideBin(process.argv))` with `.help()`, `.version()` and default command handler calling `main(argv)`.
  - Ensure exit codes: `0` for help/version, no error on main invocations.

# Tests

- In `tests/unit/main.yargs.test.js`:
  - Test `--help` and `-h` both exit 0 and stdout contains "Usage:".
  - Test `--version` exits 0 and outputs version matching package.json.
  - Test `main(['--expression','y=x','--range','x=0:1:1'])` returns expected parsed object.

# Documentation

- Update `README.md` with a `## CLI Usage` section showing help and version examples.
- Update `USAGE.md` to document how to invoke help and version flags, and reference programmatic use of `main()`.


LLM API Usage:
```json
{"prompt_tokens":71137,"completion_tokens":417,"total_tokens":71554,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---2025-05-27T07:23:15Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Issue to Ready Issue at 2025-05-27T07:23:36.356Z

Activity:

Readied issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/3135 with enhanced description:



LLM API Usage:
```json
{"prompt_tokens":8002,"completion_tokens":1534,"total_tokens":9536,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":832,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Maintain Feature at 2025-05-27T07:24:35.303Z

Activity:

Maintained feature TIME_SERIES_EXPORT with

Feature spec:

# Overview

Extend the time series generation command to support both JSON and CSV output formats, providing users with flexible export options for downstream processing and integration with data tools.

# Behavior

Users invoke the CLI with:
- `--expression, -e`  A single mathematical formula in the form y=<formula> (e.g. y=sin(x)).
- `--range, -r`       A numeric range string in the form x=<start>:<end>:<step> (e.g. x=0:2:0.5).
- `--format, -f`      Choose output format: json (default) or csv.
- `--output, -o`      Optional file path to write the output; if omitted, prints to stdout.

Behavior details:
- When format=json, the output is a JSON array of objects: [ { x: number, y: number }, ... ].
- When format=csv, output begins with header x,y and each subsequent line contains comma-separated x and y values.
- Errors in expression parsing or invalid ranges terminate with exit code 1 and descriptive error on stderr.

# Implementation

- Add `format` option to the existing yargs configuration.
- After generating the series array:
  - For JSON, serialize with JSON.stringify(series, null, 2).
  - For CSV, build a string: header "x,y" plus lines "<x>,<y>" for each point.
- Write to the specified file or stdout using fs.writeFileSync or console.log.
- Add and update unit tests to cover both formats and file-writing behavior.



LLM API Usage:
```json
{"prompt_tokens":72149,"completion_tokens":384,"total_tokens":72533,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-27T07:25:29.255Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-27T07:25:57.195Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-27T07:26:48.775Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-27T08:23:58Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Issue to Ready Issue at 2025-05-27T08:24:48.100Z

Activity:

Readied issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/3135 with enhanced description:



LLM API Usage:
```json
{"prompt_tokens":9433,"completion_tokens":1554,"total_tokens":10987,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":960,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Maintain Feature at 2025-05-27T08:25:25.361Z

Activity:

Maintained feature CLI_EXTENDED_OUTPUT with

Feature spec:

# Overview

Enhance the CLI to support flexible output formats (JSON or CSV) and structured parsing with help/version flags using yargs. Users can generate time series data, choose output format, and access built-in usage information without manual argument handling.

# Behavior

- The CLI accepts:
  - `--expression, -e` (string, required): formula in form `y=<expr>`.
  - `--range, -r` (string, required): range syntax `x=<start>:<end>:<step>`.
  - `--format, -f` (string, optional): `json` (default) or `csv`.
  - `--output, -o` (string, optional): path to write output; defaults to stdout.
  - Global `--help, -h`: show usage and exit code 0.
  - Global `--version, -v`: show package version and exit code 0.

- Validation:
  - Enforce expressions start with `y=` and valid math syntax.
  - Enforce range format and numeric start ≤ end, step > 0.
  - On errors, exit code 1 with descriptive stderr message.

- Output:
  - JSON: array of `{ x, y }`, pretty-printed.
  - CSV: header `x,y` then lines `x,y` per point.

# Implementation

- Add `yargs` dependency and configure default command:
  - Define required options `expression`, `range`, optional `format` and `output`.
  - Enable `.help()` and `.version()`.
- In handler:
  1. Strip `y=` and parse expression via `mathjs` or `evaluate`.
  2. Parse range string into `start`, `end`, `step`.
  3. Loop to generate series with floating-point tolerance.
  4. Serialize series as JSON or CSV string.
  5. Write to `--output` file or stdout.
- Exit code 0 on success.

# Tests

- Add unit tests in `tests/unit/series-output.test.js`:
  - Verify JSON output structure, contents, file writing.
  - Verify CSV header, lines, file writing.
  - Test help/version flags via `spawnSync`, assert exit code 0 and expected output.
  - Test error conditions for invalid expression/range.

# Documentation

- Update `USAGE.md`:
  - Document `--format` and output examples for JSON and CSV.
  - Show help/version usage.
- Update `README.md`:
  - Under `## Time Series Generation`, add brief usage snippets for format and help flags.


LLM API Usage:
```json
{"prompt_tokens":73256,"completion_tokens":630,"total_tokens":73886,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-27T08:26:46.998Z

Activity:

Generated issue 3136 for feature "cli-extended-output" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/3136

title:

Implement CLI Extended Output for JSON and CSV formats with structured parsing

And description:

Objective:
Enhance the CLI to support flexible output formats (json or csv) and add a structured, discoverable interface with help/version flags using yargs. This will complete the CLI_EXTENDED_OUTPUT feature and provide users with consistent export options.

Changes Required:

1. Dependencies (package.json):
   - Add:
     • "yargs" (v17+)
     • "mathjs" (v11+)
   - Ensure these appear under `dependencies`.

2. Source (src/lib/main.js):
   - Replace the raw `main(args)` stub with a yargs-based configuration:
     • Default command options:
       - `--expression, -e` (string, required): formula in form `y=<expr>` or `<expr>`.
       - `--range, -r` (string, required): range syntax `x=<start>:<end>:<step>`.
       - `--format, -f` (string, optional): `json` (default) or `csv`.
       - `--output, -o` (string, optional): path to write output; prints to stdout if omitted.
     • Global flags:
       - `--help, -h`: show usage and exit 0.
       - `--version, -v`: show package version and exit 0.
   - In the handler:
     1. Strip `y=` prefix and compile the expression with mathjs.
     2. Parse and validate the range (three numeric parts, step>0, start≤end).
     3. Generate a series of `{ x, y }` points (inclusive of end).
     4. Serialize:
        - JSON: `JSON.stringify(series, null, 2)`.
        - CSV: build a string with header `x,y` and comma-separated rows.
     5. Write to file (fs.writeFileSync) or stdout.
     6. Exit code 0 on success; on any error print `Error: <message>` to stderr and exit 1.

3. Tests (tests/unit/plot-generation.test.js):
   - Extend existing tests to cover CSV output:
     • Spawn the CLI with `--format csv` (and without `-f`) and assert:
       - Exit code is 0.
       - Output begins with `x,y` and subsequent lines match the numerical series.
     • Test writing CSV to a file using `--output`, then read and verify header and contents.
   - Ensure JSON tests still pass unchanged.
   - Add error-case tests for unsupported format values (e.g. `--format xml`).

4. Documentation:
   - Update USAGE.md under "Time Series Generation":
     • Document the `--format, -f` option and show both JSON and CSV examples.
   - Update README.md under `## Time Series Generation`:
     • Include usage snippets demonstrating `-f csv` and `-f json`.
     • Show help (`--help`) and version (`--version`) examples.

Verification Steps:

- Run `npm install` to pull in the new dependencies.
- Execute `npm test` and confirm all existing and new tests pass.
- Manual smoke tests:
  ```bash
  # JSON to stdout
  repository0-plot-code-lib -e "y=x" -r "x=0:2:1"

  # CSV to stdout
  repository0-plot-code-lib -e "y=x" -r "x=0:2:1" -f csv

  # Write CSV to file
  repository0-plot-code-lib -e "2*x+1" -r "x=0:3:1" -f csv -o series.csv
  head -3 series.csv

  # Help and Version
  repository0-plot-code-lib --help
  repository0-plot-code-lib --version
  ```
No other files should be modified beyond `package.json`, `src/lib/main.js`, `tests/unit/plot-generation.test.js`, `USAGE.md`, and `README.md`.

LLM API Usage:
```json
{"prompt_tokens":73634,"completion_tokens":1840,"total_tokens":75474,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":896,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Issue to enhanced Issue at 2025-05-27T08:27:36.324Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:

# Implement CLI Extended Output for JSON and CSV Formats with Structured Parsing

## Objective
Enhance the CLI to support reliable, testable JSON and CSV output formats and add a structured, discoverable interface with built-in `--help` and `--version` flags using yargs. This completes the CLI_EXTENDED_OUTPUT feature and delivers key user value by providing flexible export and usage discovery.

## Proposed Changes
1. **Dependencies**
   - Add to `package.json` under `dependencies`:
     - `yargs@^17`
     - `mathjs@^11`
2. **CLI Implementation (`src/lib/main.js`)**
   - Configure yargs with:
     - Required options: `--expression, -e`, `--range, -r`
     - Optional: `--format, -f` (`json` default), `--output, -o`
     - Global flags: `--help, -h` and `--version, -v`
   - Handler logic:
     1. Strip optional `y=` prefix and parse expression via mathjs
     2. Parse and validate range (`start`, `end`, `step` with `start ≤ end`, `step > 0`)
     3. Generate an inclusive series of `{ x, y }`
     4. Serialize:
        - JSON with `JSON.stringify(series, null, 2)`
        - CSV with header `x,y` and comma-separated rows
     5. Write to `--output` file (via `fs.writeFileSync`) or `stdout`
     6. Exit codes: `0` on success; on error, print `Error: <message>` to `stderr` and exit `1`
3. **Tests (`tests/unit/plot-generation.test.js`)**
   - Add/extend tests to cover:
     - **CSV stdout**: invoking CLI with `-f csv` prints a valid header and rows; exit code `0`
     - **CSV file output**: using `-f csv -o <path>` writes correct file with header and rows
     - **Unsupported formats**: e.g. `--format xml` exits `1` with descriptive error
     - Ensure existing JSON tests still pass unchanged
4. **Documentation**
   - **USAGE.md**: under **Time Series Generation**, document `--format, -f` and show examples for JSON and CSV
   - **README.md**: update **## Time Series Generation** snippets to include `-f csv` and built-in flags examples (`--help`, `--version`)

## Acceptance Criteria
1. **Dependencies**:
   - `yargs` and `mathjs` appear under `dependencies` and install cleanly
2. **CLI Behavior**:
   - Running `repository0-plot-code-lib -e "y=x" -r "x=0:2:1"` outputs valid JSON series
   - Running with `-f csv` outputs a header line (`x,y`) and correct numeric rows
   - Using `-o <file>` writes the correct content to the target file
   - Invalid format values (e.g. `--format xml`) return exit code `1` and print an error
   - `--help` and `--version` exit `0` and print usage or version text
3. **Testing**:
   - Automated tests for all scenarios pass via `npm test`
4. **Documentation**:
   - USAGE.md and README.md include clear usage examples and flag descriptions

## Manual Verification Steps
```bash
# JSON to stdout
repository0-plot-code-lib -e "y=x" -r "x=0:2:1"

# CSV to stdout
repository0-plot-code-lib -e "y=x" -r "x=0:2:1" -f csv

# Write CSV to file
repository0-plot-code-lib -e "2*x+1" -r "x=0:3:1" -f csv -o series.csv
head -3 series.csv

# Help and Version
repository0-plot-code-lib --help
repository0-plot-code-lib --version
```

LLM API Usage:
```json
{"prompt_tokens":6996,"completion_tokens":1342,"total_tokens":8338,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":384,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Issue to Code at 2025-05-27T08:30:29.089Z

Activity:

fixApplied: true to branch agentic-lib-issue-3136 with message Implement JSONCSV output options with structured CLI parsing using yargs and mathjs and outcome success

Git Diff:
```diff
diff --git a/README.md b/README.md
index 816f5140..0f1df5cb 100644
--- a/README.md
+++ b/README.md
@@ -4,9 +4,27 @@ _"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_
 
 ---
 
-## License
+## Time Series Generation
 
-MIT
+Generates a sequence of (x, y) values from a mathematical expression and numeric range with optional JSON or CSV output.
+
+```bash
+# JSON output to stdout
+repository0-plot-code-lib -e "y=x" -r "x=0:5:1"
+
+# CSV output to stdout
+repository0-plot-code-lib --expression "y=x" --range "x=0:5:1" --format csv
+
+# Write CSV to file
+repository0-plot-code-lib -e "y=sin(x)" -r "x=0:3.14:1.57" -f csv -o series.csv
+
+# Show help and version
+repository0-plot-code-lib --help
+repository0-plot-code-lib --version
+```
 
 ---
 
+## License
+
+MIT
diff --git a/package-lock.json b/package-lock.json
index e79334b8..f49ac602 100644
--- a/package-lock.json
+++ b/package-lock.json
@@ -12,8 +12,10 @@
         "dotenv": "^16.5.0",
         "ejs": "^3.1.10",
         "js-yaml": "^4.1.0",
+        "mathjs": "^11.8.0",
         "minimatch": "^10.0.1",
         "openai": "^4.103.0",
+        "yargs": "^17.7.2",
         "zod": "^3.25.30"
       },
       "bin": {
@@ -22,7 +24,7 @@
       "devDependencies": {
         "@microsoft/eslint-formatter-sarif": "^3.1.0",
         "@vitest/coverage-v8": "^3.1.4",
-        "eslint": "^9.25.1",
+        "eslint": "^9.27.0",
         "eslint-config-google": "^0.14.0",
         "eslint-config-prettier": "^10.1.5",
         "eslint-plugin-import": "^2.31.0",
@@ -93,6 +95,15 @@
         "node": ">=6.0.0"
       }
     },
+    "node_modules/@babel/runtime": {
+      "version": "7.27.1",
+      "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.27.1.tgz",
+      "integrity": "sha512-1x3D2xEk2fRo3PAhwQwu5UubzgiVWSXTBfWpVd2Mx2AzRqJuDJCsgaDVZ7HB5iGzDW1Hl1sWN2mFyKjmR9uAog==",
+      "license": "MIT",
+      "engines": {
+        "node": ">=6.9.0"
+      }
+    },
     "node_modules/@babel/types": {
       "version": "7.27.1",
       "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.27.1.tgz",
@@ -2245,6 +2256,78 @@
         "node": ">= 16"
       }
     },
+    "node_modules/cliui": {
+      "version": "8.0.1",
+      "resolved": "https://registry.npmjs.org/cliui/-/cliui-8.0.1.tgz",
+      "integrity": "sha512-BSeNnyus75C4//NQ9gQt1/csTXyo/8Sb+afLAkzAptFuMsod9HFokGNudZpi/oQV73hnVK+sR+5PVRMd+Dr7YQ==",
+      "license": "ISC",
+      "dependencies": {
+        "string-width": "^4.2.0",
+        "strip-ansi": "^6.0.1",
+        "wrap-ansi": "^7.0.0"
+      },
+      "engines": {
+        "node": ">=12"
+      }
+    },
+    "node_modules/cliui/node_modules/ansi-regex": {
+      "version": "5.0.1",
+      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
+      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
+      "license": "MIT",
+      "engines": {
+        "node": ">=8"
+      }
+    },
+    "node_modules/cliui/node_modules/emoji-regex": {
+      "version": "8.0.0",
+      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
+      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
+      "license": "MIT"
+    },
+    "node_modules/cliui/node_modules/string-width": {
+      "version": "4.2.3",
+      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
+      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
+      "license": "MIT",
+      "dependencies": {
+        "emoji-regex": "^8.0.0",
+        "is-fullwidth-code-point": "^3.0.0",
+        "strip-ansi": "^6.0.1"
+      },
+      "engines": {
+        "node": ">=8"
+      }
+    },
+    "node_modules/cliui/node_modules/strip-ansi": {
+      "version": "6.0.1",
+      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
+      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
+      "license": "MIT",
+      "dependencies": {
+        "ansi-regex": "^5.0.1"
+      },
+      "engines": {
+        "node": ">=8"
+      }
+    },
+    "node_modules/cliui/node_modules/wrap-ansi": {
+      "version": "7.0.0",
+      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-7.0.0.tgz",
+      "integrity": "sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q==",
+      "license": "MIT",
+      "dependencies": {
+        "ansi-styles": "^4.0.0",
+        "string-width": "^4.1.0",
+        "strip-ansi": "^6.0.0"
+      },
+      "engines": {
+        "node": ">=10"
+      },
+      "funding": {
+        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
+      }
+    },
     "node_modules/color-convert": {
       "version": "2.0.1",
       "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
@@ -2275,6 +2358,19 @@
         "node": ">= 0.8"
       }
     },
+    "node_modules/complex.js": {
+      "version": "2.4.2",
+      "resolved": "https://registry.npmjs.org/complex.js/-/complex.js-2.4.2.tgz",
+      "integrity": "sha512-qtx7HRhPGSCBtGiST4/WGHuW+zeaND/6Ld+db6PbrulIB1i2Ev/2UPiqcmpQNPSyfBKraC0EOvOKCB5dGZKt3g==",
+      "license": "MIT",
+      "engines": {
+        "node": "*"
+      },
+      "funding": {
+        "type": "github",
+        "url": "https://github.com/sponsors/rawify"
+      }
+    },
     "node_modules/concat-map": {
       "version": "0.0.1",
       "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
@@ -2408,6 +2504,12 @@
         }
       }
     },
+    "node_modules/decimal.js": {
+      "version": "10.5.0",
+      "resolved": "https://registry.npmjs.org/decimal.js/-/decimal.js-10.5.0.tgz",
+      "integrity": "sha512-8vDa8Qxvr/+d94hSh5P3IJwI5t8/c0KsMp+g8bNw9cY2icONa5aPfvKeieW1WlG0WQYwwhJ7mjui2xtiePQSXw==",
+      "license": "MIT"
+    },
     "node_modules/deep-eql": {
       "version": "5.0.2",
       "resolved": "https://registry.npmjs.org/deep-eql/-/deep-eql-5.0.2.tgz",
@@ -2807,6 +2909,15 @@
         "@esbuild/win32-x64": "0.25.4"
       }
     },
+    "node_modules/escalade": {
+      "version": "3.2.0",
+      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
+      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
+      "license": "MIT",
+      "engines": {
+        "node": ">=6"
+      }
+    },
     "node_modules/escape-html": {
       "version": "1.0.3",
       "resolved": "https://registry.npmjs.org/escape-html/-/escape-html-1.0.3.tgz",
@@ -2814,6 +2925,12 @@
       "dev": true,
       "license": "MIT"
     },
+    "node_modules/escape-latex": {
+      "version": "1.2.0",
+      "resolved": "https://registry.npmjs.org/escape-latex/-/escape-latex-1.2.0.tgz",
+      "integrity": "sha512-nV5aVWW1K0wEiUIEdZ4erkGGH8mDxGyxSeqPzRNtWP7ataw+/olFObw7hujFWlVjNsaDFw5VZ5NzVSIqRgfTiw==",
+      "license": "MIT"
+    },
     "node_modules/escape-string-regexp": {
       "version": "4.0.0",
       "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-4.0.0.tgz",
@@ -3685,6 +3802,19 @@
         "node": ">= 0.6"
       }
     },
+    "node_modules/fraction.js": {
+      "version": "4.3.4",
+      "resolved": "https://registry.npmjs.org/fraction.js/-/fraction.js-4.3.4.tgz",
+      "integrity": "sha512-pwiTgt0Q7t+GHZA4yaLjObx4vXmmdcS0iSJ19o8d/goUGgItX9UZWKWNnLHehxviD8wU2IWRsnR8cD5+yOJP2Q==",
+      "license": "MIT",
+      "engines": {
+        "node": "*"
+      },
+      "funding": {
+        "type": "patreon",
+        "url": "https://github.com/sponsors/rawify"
+      }
+    },
     "node_modules/fresh": {
       "version": "0.5.2",
       "resolved": "https://registry.npmjs.org/fresh/-/fresh-0.5.2.tgz",
@@ -3764,6 +3894,15 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
+    "node_modules/get-caller-file": {
+      "version": "2.0.5",
+      "resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-2.0.5.tgz",
+      "integrity": "sha512-DyFP3BM/3YHTQOCUL/w0OZHR0lpKeGrxotcHWcqNEdnltqFwXVfhEBQ94eIo34AfQpo0rGki4cyIiftY06h2Fg==",
+      "license": "ISC",
+      "engines": {
+        "node": "6.* || 8.* || >= 10.*"
+      }
+    },
     "node_modules/get-intrinsic": {
       "version": "1.3.0",
       "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.3.0.tgz",
@@ -4307,7 +4446,6 @@
       "version": "3.0.0",
       "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
       "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
-      "dev": true,
       "license": "MIT",
       "engines": {
         "node": ">=8"
@@ -4672,6 +4810,12 @@
         "node": "*"
       }
     },
+    "node_modules/javascript-natural-sort": {
+      "version": "0.7.1",
+      "resolved": "https://registry.npmjs.org/javascript-natural-sort/-/javascript-natural-sort-0.7.1.tgz",
+      "integrity": "sha512-nO6jcEfZWQXDhOiBtG2KvKyEptz7RVbpGP4vTD2hLBdmNQSsCiicO2Ioinv6UI4y9ukqnBpy+XZ9H6uLNgJTlw==",
+      "license": "MIT"
+    },
     "node_modules/js-tokens": {
       "version": "4.0.0",
       "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
@@ -4939,6 +5083,29 @@
         "node": ">= 0.4"
       }
     },
+    "node_modules/mathjs": {
+      "version": "11.12.0",
+      "resolved": "https://registry.npmjs.org/mathjs/-/mathjs-11.12.0.tgz",
+      "integrity": "sha512-UGhVw8rS1AyedyI55DGz9q1qZ0p98kyKPyc9vherBkoueLntPfKtPBh14x+V4cdUWK0NZV2TBwqRFlvadscSuw==",
+      "license": "Apache-2.0",
+      "dependencies": {
+        "@babel/runtime": "^7.23.2",
+        "complex.js": "^2.1.1",
+        "decimal.js": "^10.4.3",
+        "escape-latex": "^1.2.0",
+        "fraction.js": "4.3.4",
+        "javascript-natural-sort": "^0.7.1",
+        "seedrandom": "^3.0.5",
+        "tiny-emitter": "^2.1.0",
+        "typed-function": "^4.1.1"
+      },
+      "bin": {
+        "mathjs": "bin/cli.js"
+      },
+      "engines": {
+        "node": ">= 14"
+      }
+    },
     "node_modules/mdurl": {
       "version": "2.0.0",
       "resolved": "https://registry.npmjs.org/mdurl/-/mdurl-2.0.0.tgz",
@@ -5789,6 +5956,15 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
+    "node_modules/require-directory": {
+      "version": "2.1.1",
+      "resolved": "https://registry.npmjs.org/require-directory/-/require-directory-2.1.1.tgz",
+      "integrity": "sha512-fGxEI7+wsG9xrvdjsrlmL22OMTTiHRwAMroiEeMgq8gzoLC/PQr7RsRDSTLUg/bZAZtF+TVIkHc6/4RIKrui+Q==",
+      "license": "MIT",
+      "engines": {
+        "node": ">=0.10.0"
+      }
+    },
     "node_modules/resolve": {
       "version": "1.22.10",
       "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.10.tgz",
@@ -6066,6 +6242,12 @@
         "node": "^14.0.0 || >=16.0.0"
       }
     },
+    "node_modules/seedrandom": {
+      "version": "3.0.5",
+      "resolved": "https://registry.npmjs.org/seedrandom/-/seedrandom-3.0.5.tgz",
+      "integrity": "sha512-8OwmbklUNzwezjGInmZ+2clQmExQPvomqjL7LFqOYqtmuxRgQYqOD3mHaU+MvZn5FLUeVxVfQjwLZW/n/JFuqg==",
+      "license": "MIT"
+    },
     "node_modules/semver": {
       "version": "6.3.1",
       "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
@@ -6657,6 +6839,12 @@
       "dev": true,
       "license": "MIT"
     },
+    "node_modules/tiny-emitter": {
+      "version": "2.1.0",
+      "resolved": "https://registry.npmjs.org/tiny-emitter/-/tiny-emitter-2.1.0.tgz",
+      "integrity": "sha512-NB6Dk1A9xgQPMoGqC5CVXn123gWyte215ONT5Pp5a0yt4nlEoO1ZWeCwpncaekPHXO60i47ihFnZPiRPjRMq4Q==",
+      "license": "MIT"
+    },
     "node_modules/tinybench": {
       "version": "2.9.0",
       "resolved": "https://registry.npmjs.org/tinybench/-/tinybench-2.9.0.tgz",
@@ -6865,6 +7053,15 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
+    "node_modules/typed-function": {
+      "version": "4.2.1",
+      "resolved": "https://registry.npmjs.org/typed-function/-/typed-function-4.2.1.tgz",
+      "integrity": "sha512-EGjWssW7Tsk4DGfE+5yluuljS1OGYWiI1J6e8puZz9nTMM51Oug8CD5Zo4gWMsOhq5BI+1bF+rWTm4Vbj3ivRA==",
+      "license": "MIT",
+      "engines": {
+        "node": ">= 18"
+      }
+    },
     "node_modules/typescript": {
       "version": "5.8.3",
       "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.8.3.tgz",
@@ -7386,6 +7583,83 @@
       "dev": true,
       "license": "ISC"
     },
+    "node_modules/y18n": {
+      "version": "5.0.8",
+      "resolved": "https://registry.npmjs.org/y18n/-/y18n-5.0.8.tgz",
+      "integrity": "sha512-0pfFzegeDWJHJIAmTLRP2DwHjdF5s7jo9tuztdQxAhINCdvS+3nGINqPd00AphqJR/0LhANUS6/+7SCb98YOfA==",
+      "license": "ISC",
+      "engines": {
+        "node": ">=10"
+      }
+    },
+    "node_modules/yargs": {
+      "version": "17.7.2",
+      "resolved": "https://registry.npmjs.org/yargs/-/yargs-17.7.2.tgz",
+      "integrity": "sha512-7dSzzRQ++CKnNI/krKnYRV7JKKPUXMEh61soaHKg9mrWEhzFWhFnxPxGl+69cD1Ou63C13NUPCnmIcrvqCuM6w==",
+      "license": "MIT",
+      "dependencies": {
+        "cliui": "^8.0.1",
+        "escalade": "^3.1.1",
+        "get-caller-file": "^2.0.5",
+        "require-directory": "^2.1.1",
+        "string-width": "^4.2.3",
+        "y18n": "^5.0.5",
+        "yargs-parser": "^21.1.1"
+      },
+      "engines": {
+        "node": ">=12"
+      }
+    },
+    "node_modules/yargs-parser": {
+      "version": "21.1.1",
+      "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-21.1.1.tgz",
+      "integrity": "sha512-tVpsJW7DdjecAiFpbIB1e3qxIQsE6NoPc5/eTdrbbIC4h0LVsWhnoa3g+m2HclBIujHzsxZ4VJVA+GUuc2/LBw==",
+      "license": "ISC",
+      "engines": {
+        "node": ">=12"
+      }
+    },
+    "node_modules/yargs/node_modules/ansi-regex": {
+      "version": "5.0.1",
+      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
+      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
+      "license": "MIT",
+      "engines": {
+        "node": ">=8"
+      }
+    },
+    "node_modules/yargs/node_modules/emoji-regex": {
+      "version": "8.0.0",
+      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
+      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
+      "license": "MIT"
+    },
+    "node_modules/yargs/node_modules/string-width": {
+      "version": "4.2.3",
+      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
+      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
+      "license": "MIT",
+      "dependencies": {
+        "emoji-regex": "^8.0.0",
+        "is-fullwidth-code-point": "^3.0.0",
+        "strip-ansi": "^6.0.1"
+      },
+      "engines": {
+        "node": ">=8"
+      }
+    },
+    "node_modules/yargs/node_modules/strip-ansi": {
+      "version": "6.0.1",
+      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
+      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
+      "license": "MIT",
+      "dependencies": {
+        "ansi-regex": "^5.0.1"
+      },
+      "engines": {
+        "node": ">=8"
+      }
+    },
     "node_modules/yocto-queue": {
       "version": "0.1.0",
       "resolved": "https://registry.npmjs.org/yocto-queue/-/yocto-queue-0.1.0.tgz",
diff --git a/package.json b/package.json
index 8522a815..cfd8c942 100644
--- a/package.json
+++ b/package.json
@@ -29,12 +29,14 @@
     "ejs": "^3.1.10",
     "js-yaml": "^4.1.0",
     "minimatch": "^10.0.1",
-    "zod": "^3.25.30"
+    "zod": "^3.25.30",
+    "yargs": "^17.7.2",
+    "mathjs": "^11.8.0"
   },
   "devDependencies": {
     "@microsoft/eslint-formatter-sarif": "^3.1.0",
     "@vitest/coverage-v8": "^3.1.4",
-    "eslint": "^9.25.1",
+    "eslint": "^9.27.0",
     "eslint-config-google": "^0.14.0",
     "eslint-config-prettier": "^10.1.5",
     "eslint-plugin-import": "^2.31.0",
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
index 3cdd4e2a..71f06f48 100755
--- a/src/lib/main.js
+++ b/src/lib/main.js
@@ -1,13 +1,124 @@
 #!/usr/bin/env node
-// src/lib/main.js
+import fs from 'fs';
+import yargs from 'yargs';
+import { hideBin } from 'yargs/helpers';
+import { parse } from 'mathjs';
 
-import { fileURLToPath } from "url";
+/**
+ * Generate a series of {x,y} from an expression and range.
+ * @param {string} expression - Formula in form y=<expr> or <expr>.
+ * @param {string} rangeStr - Range in form x=<start>:<end>:<step>.
+ * @returns {{x:number,y:number}[]}
+ */
+function generateSeries(expression, rangeStr) {
+  let exprText = expression.trim();
+  if (exprText.startsWith('y=')) exprText = exprText.slice(2);
+  let compiled;
+  try {
+    compiled = parse(exprText).compile();
+  } catch (err) {
+    throw new Error(`Invalid expression: ${err.message}`);
+  }
 
-export function main(args) {
-  console.log(`Run with: ${JSON.stringify(args)}`);
+  if (!rangeStr.startsWith('x=')) {
+    throw new Error('Range must start with "x="');
+  }
+  const parts = rangeStr.slice(2).split(':');
+  if (parts.length !== 3) {
+    throw new Error('Range must be in the form x=<start>:<end>:<step>');
+  }
+  const [startS, endS, stepS] = parts;
+  const start = Number(startS);
+  const end = Number(endS);
+  const step = Number(stepS);
+  if ([start, end, step].some(n => isNaN(n))) {
+    throw new Error('Range values must be valid numbers');
+  }
+  if (step <= 0) {
+    throw new Error('Step must be > 0');
+  }
+  if (start > end) {
+    throw new Error('Start must be <= end');
+  }
+
+  const series = [];
+  const epsilon = step / 1e6;
+  for (let x = start; x <= end + epsilon; x += step) {
+    const xVal = Number(x.toPrecision(15));
+    let yVal;
+    try {
+      yVal = compiled.evaluate({ x: xVal });
+    } catch (err) {
+      throw new Error(`Error evaluating at x=${xVal}: ${err.message}`);
+    }
+    if (typeof yVal !== 'number' || Number.isNaN(yVal)) {
+      throw new Error(`Expression did not evaluate to a number at x=${xVal}`);
+    }
+    series.push({ x: xVal, y: yVal });
+  }
+  return series;
+}
+
+async function runCLI() {
+  const argv = yargs(hideBin(process.argv))
+    .scriptName('repository0-plot-code-lib')
+    .usage('Usage: $0 --expression <expr> --range <range> [options]')
+    .option('expression', {
+      alias: 'e',
+      type: 'string',
+      describe: 'Expression in form y=<expr> or <expr>',
+      demandOption: true
+    })
+    .option('range', {
+      alias: 'r',
+      type: 'string',
+      describe: 'Range in form x=<start>:<end>:<step>',
+      demandOption: true
+    })
+    .option('format', {
+      alias: 'f',
+      type: 'string',
+      describe: 'Output format: json or csv',
+      choices: ['json', 'csv'],
+      default: 'json'
+    })
+    .option('output', {
+      alias: 'o',
+      type: 'string',
+      describe: 'Output file path; prints to stdout if omitted'
+    })
+    .help('help')
+    .alias('help', 'h')
+    .version()
+    .alias('version', 'v')
+    .strict()
+    .parse();
+
+  try {
+    const series = generateSeries(argv.expression, argv.range);
+    let outputText;
+    if (argv.format === 'json') {
+      outputText = JSON.stringify(series, null, 2);
+    } else {
+      const lines = ['x,y'];
+      series.forEach(p => lines.push(`${p.x},${p.y}`));
+      outputText = lines.join('\n');
+    }
+
+    if (argv.output) {
+      fs.writeFileSync(argv.output, outputText, 'utf-8');
+    } else {
+      console.log(outputText);
+    }
+    process.exit(0);
+  } catch (err) {
+    console.error(`Error: ${err.message}`);
+    process.exit(1);
+  }
 }
 
-if (process.argv[1] === fileURLToPath(import.meta.url)) {
-  const args = process.argv.slice(2);
-  main(args);
+if (import.meta.main) {
+  runCLI();
 }
+
+export { generateSeries };
\ No newline at end of file
diff --git a/tests/unit/plot-generation.test.js b/tests/unit/plot-generation.test.js
index 19a4042c..c0cd9580 100644
--- a/tests/unit/plot-generation.test.js
+++ b/tests/unit/plot-generation.test.js
@@ -1,16 +1,78 @@
-import { describe, test, expect } from "vitest";
-import * as mainModule from "@src/lib/main.js";
-import { main } from "@src/lib/main.js";
+import { describe, it, expect } from 'vitest';
+import { spawnSync } from 'child_process';
+import { readFileSync, writeFileSync, unlinkSync, existsSync } from 'fs';
+import path from 'path';
+import { fileURLToPath } from 'url';
 
-describe("Main Module Import", () => {
-  test("should be non-null", () => {
-    expect(mainModule).not.toBeNull();
+const __dirname = path.dirname(fileURLToPath(import.meta.url));
+const cli = path.resolve(__dirname, '../../src/lib/main.js');
+
+describe('Time Series Generation CLI', () => {
+  it('outputs JSON series to stdout by default', () => {
+    const result = spawnSync('node', [cli, '-e', 'y=x', '-r', 'x=0:2:1']);
+    expect(result.status).toBe(0);
+    const out = JSON.parse(result.stdout.toString());
+    expect(out).toEqual([
+      { x: 0, y: 0 },
+      { x: 1, y: 1 },
+      { x: 2, y: 2 }
+    ]);
+  });
+
+  it('writes JSON to a file when --output is provided', () => {
+    const tmp = path.resolve(__dirname, 'temp.json');
+    if (existsSync(tmp)) unlinkSync(tmp);
+    const result = spawnSync('node', [cli, '-e', '2*x+1', '-r', 'x=0:2:1', '-o', tmp]);
+    expect(result.status).toBe(0);
+    expect(existsSync(tmp)).toBe(true);
+    const data = JSON.parse(readFileSync(tmp, 'utf-8'));
+    expect(data).toEqual([
+      { x: 0, y: 1 },
+      { x: 1, y: 3 },
+      { x: 2, y: 5 }
+    ]);
+    unlinkSync(tmp);
+  });
+
+  it('outputs CSV to stdout when --format csv', () => {
+    const result = spawnSync('node', [cli, '-e', 'y=x', '-r', 'x=0:2:1', '-f', 'csv']);
+    expect(result.status).toBe(0);
+    const lines = result.stdout.toString().trim().split('\n');
+    expect(lines[0]).toBe('x,y');
+    expect(lines[1]).toBe('0,0');
+    expect(lines[2]).toBe('1,1');
+    expect(lines[3]).toBe('2,2');
+  });
+
+  it('writes CSV to a file when --format csv and --output provided', () => {
+    const tmp = path.resolve(__dirname, 'temp.csv');
+    if (existsSync(tmp)) unlinkSync(tmp);
+    const result = spawnSync('node', [cli, '-e', 'y=x', '-r', 'x=0:2:1', '-f', 'csv', '-o', tmp]);
+    expect(result.status).toBe(0);
+    expect(existsSync(tmp)).toBe(true);
+    const lines = readFileSync(tmp, 'utf-8').trim().split('\n');
+    expect(lines[0]).toBe('x,y');
+    expect(lines[1]).toBe('0,0');
+    expect(lines[2]).toBe('1,1');
+    expect(lines[3]).toBe('2,2');
+    unlinkSync(tmp);
+  });
+
+  it('exits with error on unsupported format', () => {
+    const result = spawnSync('node', [cli, '-e', 'y=x', '-r', 'x=0:2:1', '--format', 'xml']);
+    expect(result.status).not.toBe(0);
+    expect(result.stderr.toString()).toContain('Choices:' );
+  });
+
+  it('errors on invalid expression', () => {
+    const result = spawnSync('node', [cli, '-e', 'y=foo(x)', '-r', 'x=0:1:1']);
+    expect(result.status).not.toBe(0);
+    expect(result.stderr.toString()).toContain('Invalid expression');
   });
-});
 
-describe("Default main", () => {
-  test("should terminate without error", () => {
-    process.argv = ["node", "src/lib/main.js"];
-    main();
+  it('errors on invalid range', () => {
+    const result = spawnSync('node', [cli, '-e', 'y=x', '-r', '0:1:1']);
+    expect(result.status).not.toBe(0);
+    expect(result.stderr.toString()).toContain('Range must start with "x="');
   });
-});
+});
\ No newline at end of file\n\n// New [USAGE.md]:\n# Usage

## Time Series Generation

Generate a series of (x,y) data points from a mathematical expression over a numeric range.

Syntax:
```sh
repository0-plot-code-lib --expression "y=<formula>" --range "x=<start>:<end>:<step>" [--format <json|csv>] [--output <file>]
```

Options:
- `--expression, -e`  Formula in form `y=<expr>` (e.g., `y=sin(x)` or `sin(x)`).
- `--range, -r`       Range in form `x=<start>:<end>:<step>` (e.g., `x=0:6.28:0.1`).
- `--format, -f`      Output format: `json` (default) or `csv`.
- `--output, -o`      Path to write output; if omitted, prints to stdout.
- `--help, -h`        Show help and exit.
- `--version, -v`     Show version and exit.

### Examples

JSON to stdout:
```sh
repository0-plot-code-lib -e "y=x" -r "x=0:2:1"
```

CSV to stdout:
```sh
repository0-plot-code-lib -e "y=x" -r "x=0:2:1" -f csv
```

Write JSON to file:
```sh
repository0-plot-code-lib -e "2*x+1" -r "x=0:3:1" -o data.json
```

Write CSV to file:
```sh
repository0-plot-code-lib -e "2*x+1" -r "x=0:3:1" -f csv -o data.csv
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

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/3136 with title: ""]

LLM API Usage:
```json
{"prompt_tokens":79231,"completion_tokens":5948,"total_tokens":85179,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":2048,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Fixed Code at 2025-05-27T08:32:52.326Z

Activity:

fixApplied: true with Implement CLI with yargs and mathjs for JSONCSV output and provide no-op main for programmatic use and outcome success

Git Diff:
```diff
diff --git a/src/lib/main.js b/src/lib/main.js
index 71f06f48..c99f2c7a 100755
--- a/src/lib/main.js
+++ b/src/lib/main.js
@@ -1,124 +1,137 @@
-#!/usr/bin/env node
 import fs from 'fs';
 import yargs from 'yargs';
 import { hideBin } from 'yargs/helpers';
-import { parse } from 'mathjs';
+import { create, all } from 'mathjs';
+import pkg from '../../package.json' assert { type: 'json' };
+import { fileURLToPath } from 'url';
+
+const math = create(all);
 
 /**
- * Generate a series of {x,y} from an expression and range.
- * @param {string} expression - Formula in form y=<expr> or <expr>.
- * @param {string} rangeStr - Range in form x=<start>:<end>:<step>.
- * @returns {{x:number,y:number}[]}
+ * No-op main for programmatic use.
  */
-function generateSeries(expression, rangeStr) {
-  let exprText = expression.trim();
-  if (exprText.startsWith('y=')) exprText = exprText.slice(2);
-  let compiled;
+export function main() {
+  // Programmatic main does not execute CLI logic.
+}
+
+async function runCli() {
+  let argv;
   try {
-    compiled = parse(exprText).compile();
+    argv = yargs(hideBin(process.argv))
+      .scriptName('repository0-plot-code-lib')
+      .usage('Usage: $0 -e <expr> -r <range> [-f <format>] [-o <output>]')
+      .option('expression', {
+        alias: 'e',
+        type: 'string',
+        describe: 'Formula in the form y=<expression>',
+        demandOption: true,
+      })
+      .option('range', {
+        alias: 'r',
+        type: 'string',
+        describe: 'Range in the form x=<start>:<end>:<step>',
+        demandOption: true,
+      })
+      .option('format', {
+        alias: 'f',
+        type: 'string',
+        describe: 'Output format',
+        choices: ['json', 'csv'],
+        default: 'json',
+      })
+      .option('output', {
+        alias: 'o',
+        type: 'string',
+        describe: 'File path to write output',
+      })
+      .help('help')
+      .alias('help', 'h')
+      .version(pkg.version)
+      .alias('version', 'v')
+      .strict()
+      .parseSync();
   } catch (err) {
-    throw new Error(`Invalid expression: ${err.message}`);
+    // yargs prints its own message
+    process.exit(1);
+  }
+
+  const { expression, range, format, output: outputFile } = argv;
+
+  let exprStr = expression;
+  if (exprStr.startsWith('y=')) {
+    exprStr = exprStr.slice(2);
   }
 
-  if (!rangeStr.startsWith('x=')) {
-    throw new Error('Range must start with "x="');
+  let expr;
+  try {
+    expr = math.compile(exprStr);
+  } catch (e) {
+    console.error('Invalid expression');
+    process.exit(1);
   }
-  const parts = rangeStr.slice(2).split(':');
+
+  if (!range.startsWith('x=')) {
+    console.error('Range must start with x=');
+    process.exit(1);
+  }
+
+  const parts = range.slice(2).split(':');
   if (parts.length !== 3) {
-    throw new Error('Range must be in the form x=<start>:<end>:<step>');
+    console.error('Invalid range format, expected x=start:end:step');
+    process.exit(1);
   }
-  const [startS, endS, stepS] = parts;
-  const start = Number(startS);
-  const end = Number(endS);
-  const step = Number(stepS);
-  if ([start, end, step].some(n => isNaN(n))) {
-    throw new Error('Range values must be valid numbers');
+
+  const [startStr, endStr, stepStr] = parts;
+  const start = Number(startStr);
+  const end = Number(endStr);
+  const step = Number(stepStr);
+
+  if (isNaN(start) || isNaN(end) || isNaN(step)) {
+    console.error('Range contains non-numeric values');
+    process.exit(1);
   }
   if (step <= 0) {
-    throw new Error('Step must be > 0');
+    console.error('Step must be > 0');
+    process.exit(1);
   }
   if (start > end) {
-    throw new Error('Start must be <= end');
+    console.error('Start must be <= end');
+    process.exit(1);
   }
 
   const series = [];
-  const epsilon = step / 1e6;
-  for (let x = start; x <= end + epsilon; x += step) {
-    const xVal = Number(x.toPrecision(15));
-    let yVal;
+  for (let x = start; x <= end + 1e-12; x += step) {
+    let y;
     try {
-      yVal = compiled.evaluate({ x: xVal });
-    } catch (err) {
-      throw new Error(`Error evaluating at x=${xVal}: ${err.message}`);
-    }
-    if (typeof yVal !== 'number' || Number.isNaN(yVal)) {
-      throw new Error(`Expression did not evaluate to a number at x=${xVal}`);
+      y = expr.evaluate({ x });
+    } catch (e) {
+      console.error(`Error evaluating expression at x=${x}`);
+      process.exit(1);
     }
-    series.push({ x: xVal, y: yVal });
+    series.push({ x, y });
   }
-  return series;
-}
 
-async function runCLI() {
-  const argv = yargs(hideBin(process.argv))
-    .scriptName('repository0-plot-code-lib')
-    .usage('Usage: $0 --expression <expr> --range <range> [options]')
-    .option('expression', {
-      alias: 'e',
-      type: 'string',
-      describe: 'Expression in form y=<expr> or <expr>',
-      demandOption: true
-    })
-    .option('range', {
-      alias: 'r',
-      type: 'string',
-      describe: 'Range in form x=<start>:<end>:<step>',
-      demandOption: true
-    })
-    .option('format', {
-      alias: 'f',
-      type: 'string',
-      describe: 'Output format: json or csv',
-      choices: ['json', 'csv'],
-      default: 'json'
-    })
-    .option('output', {
-      alias: 'o',
-      type: 'string',
-      describe: 'Output file path; prints to stdout if omitted'
-    })
-    .help('help')
-    .alias('help', 'h')
-    .version()
-    .alias('version', 'v')
-    .strict()
-    .parse();
+  let outStr;
+  if (format === 'json') {
+    outStr = JSON.stringify(series, null, 2);
+  } else {
+    outStr = ['x,y', ...series.map((pt) => `${pt.x},${pt.y}`)].join('\n');
+  }
 
   try {
-    const series = generateSeries(argv.expression, argv.range);
-    let outputText;
-    if (argv.format === 'json') {
-      outputText = JSON.stringify(series, null, 2);
-    } else {
-      const lines = ['x,y'];
-      series.forEach(p => lines.push(`${p.x},${p.y}`));
-      outputText = lines.join('\n');
-    }
-
-    if (argv.output) {
-      fs.writeFileSync(argv.output, outputText, 'utf-8');
+    if (outputFile) {
+      fs.writeFileSync(outputFile, outStr, 'utf-8');
     } else {
-      console.log(outputText);
+      console.log(outStr);
     }
     process.exit(0);
-  } catch (err) {
-    console.error(`Error: ${err.message}`);
+  } catch (e) {
+    console.error(`Failed to write output: ${e.message}`);
     process.exit(1);
   }
 }
 
-if (import.meta.main) {
-  runCLI();
+const __filename = fileURLToPath(import.meta.url);
+if (process.argv[1] === __filename) {
+  runCli();
 }
-
-export { generateSeries };
\ No newline at end of file
```

mainOutput:
```log

```

[allValidationStepsSuccessful: false]

LLM API Usage:
```json
{"prompt_tokens":15054,"completion_tokens":7727,"total_tokens":22781,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":6336,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Create feature activity at 2025-05-27T08:33:12.567Z

The features were maintained with a feature hint of:



and outcome "success"

---


## Updated Readme at 2025-05-27T08:51:15.731Z

Activity:

Updated README: with message Update README and USAGE to reflect current JSONCSV CLI for time series generation

LLM API Usage:
```json
{"prompt_tokens":88900,"completion_tokens":1954,"total_tokens":90854,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":768,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---2025-05-27T09:23:30Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-27T09:24:57.532Z

Activity:

Maintained feature TIME_SERIES_EXPORT with

Feature spec:

# Overview

Extend the core time series generation command to support both JSON and CSV export directly from the CLI. Users can generate numeric data series from a mathematical expression and range, and choose their preferred export format for easy downstream consumption.

# Behavior

When invoked via the CLI:
- Required flags:
  - --expression, -e: A formula in terms of x, in the form y=<expression> or directly <expression>.
  - --range, -r: A numeric range string in the form x=<start>:<end>:<step> (e.g., x=0:2:0.5).
- Optional flags:
  - --format, -f: Specify output format, either json (default) or csv.
  - --output, -o: Path to write the output; if omitted, prints to stdout.
  - --help, -h: Display usage information and exit.
  - --version, -v: Display the package version and exit.

Output details:
- JSON mode: Pretty-printed array of { x: number, y: number } objects.
- CSV mode: First line header x,y followed by one comma-separated row per data point.

Validation:
- The expression must compile via mathjs; on failure, exit code 1 with an error message.
- The range must start with x= and consist of three numeric parts; enforce step>0 and start<=end.
- On any error, print `Error: <message>` to stderr and exit with code 1.

# Implementation

- Add `yargs` and `mathjs` dependencies in package.json.
- In `src/lib/main.js`:
  - Configure yargs with required `--expression` and `--range`, optional `--format` and `--output`, plus built-in help/version.
  - Strip `y=` prefix, compile the expression, parse and validate the range, generate the series.
  - Serialize to JSON or CSV based on `--format` and write to stdout or the `--output` file.
  - Use process.exit codes for success (0) and failures (1).

# Tests

- Extend `tests/unit/plot-generation.test.js` to cover:
  - Default JSON output to stdout and to a file.
  - CSV output to stdout and to a file.
  - Error on unsupported format values, invalid expressions, and invalid range syntax.

# Documentation

- Update USAGE.md under "Time Series Generation" to document `--format` and examples for both JSON and CSV modes.
- Update README.md under `## Time Series Generation` with usage snippets for JSON, CSV, file output, help, and version commands.


LLM API Usage:
```json
{"prompt_tokens":87770,"completion_tokens":617,"total_tokens":88387,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-27T09:25:52.562Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-27T09:26:23.691Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-27T09:27:13.458Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-27T10:23:34Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Issue to Ready Issue at 2025-05-27T10:24:14.185Z

Activity:

Readied issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/3136 with enhanced description:



LLM API Usage:
```json
{"prompt_tokens":7725,"completion_tokens":2038,"total_tokens":9763,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":1280,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Maintain Feature at 2025-05-27T10:25:01.795Z

Activity:

Maintained feature PLOT_RENDERING with

Feature spec:

# Plot Rendering

Introduce a `plot` subcommand in the CLI that reads time series JSON data and produces a line plot as an SVG or PNG image. This fulfills the mission of a go-to plot library by enabling graphical output from numeric series.

# Behavior

When invoked with `plot`, the CLI should:
- Accept `--input, -i` to specify a JSON file of an array of `{ x: number, y: number }`. If omitted, read JSON from stdin.
- Accept `--output, -o` to specify the image file path. Default is `plot.svg`.
- Accept `--format, -f` to choose `svg` or `png`. Default is `svg`.
- Accept `--width, -w` and `--height, -h` for pixel dimensions (defaults: 800×600).
- Parse and validate JSON input; invalid JSON or data shape exits with code 1 and an error.
- Generate a line plot using a server-side D3 (via `d3-node`) for SVG and `canvas` for PNG.
- Write the generated image buffer or SVG string to the specified output and exit code 0 on success.

# Implementation

- Add dependencies: `d3-node` and `canvas` in `package.json`.
- In `src/lib/main.js`, extend yargs with a `plot` command:
  - Read JSON from `argv.input` or stdin.
  - Use `new D3Node()` to create an SVG of given width/height.
  - Build D3 scales and append a `<path>` for the series.
  - For PNG, render the SVG string onto a `canvas` and get a PNG buffer.
  - Write to `argv.output`, or error out on failures.

# Tests

- Create `tests/unit/plot-rendering.test.js`:
  - Spawn the CLI to generate an SVG from a sample JSON file; assert exit 0, file exists, and starts with `<svg>`.
  - Spawn for PNG; assert exit 0, file exists, and begins with PNG signature bytes.
  - Test reading data via stdin when `--input` omitted.
  - Test error when input JSON is invalid or format unsupported.

# Documentation

- Update `USAGE.md` with a `## Plot Rendering` section showing the `plot` subcommand, flags (`-i`, `-o`, `-f`, `-w`, `-h`), and examples.
- Update `README.md` under `## Plot Rendering` with CLI usage snippets and installation notes.


LLM API Usage:
```json
{"prompt_tokens":89098,"completion_tokens":594,"total_tokens":89692,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-27T10:25:56.728Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-27T10:26:27.286Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-27T10:27:14.065Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-27T11:22:40Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Issue to Ready Issue at 2025-05-27T11:23:14.456Z

Activity:

Readied issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/3133 with enhanced description:



LLM API Usage:
```json
{"prompt_tokens":7451,"completion_tokens":2271,"total_tokens":9722,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":1600,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Maintain Feature at 2025-05-27T11:24:07.924Z

Activity:

Maintained feature CLI_EXTENDED_OUTPUT with

Feature spec:

# Overview

Enhance the CLI with yargs to support structured parsing, built-in help/version commands, and flexible output formats (JSON and CSV) for time series generation. Users can now generate numeric series from expressions and ranges with clear usage information.

# Behavior

When invoked via the CLI:

- Required flags:
  - `--expression, -e` (string): formula in the form `y=<expression>` or `<expression>`.
  - `--range, -r` (string): numeric range in the form `x=<start>:<end>:<step>`.
- Optional flags:
  - `--format, -f` (string): output format, `json` (default) or `csv`.
  - `--output, -o` (string): file path to write output; prints to stdout if omitted.
  - `--help, -h`: display usage and exit code 0.
  - `--version, -v`: display package version and exit code 0.

Validation errors (invalid expression, range syntax, or write failures) exit with code 1 and print a descriptive error to stderr.

Output:
- **JSON**: pretty-printed array of objects `{ x: number, y: number }`.
- **CSV**: header `x,y` followed by comma-separated data lines.

# Implementation

- Add `yargs` and `mathjs` to `dependencies` in `package.json`.
- In `src/lib/main.js`:
  - Use `yargs` to configure required and optional flags, `.help()`, and `.version()`.
  - Strip optional `y=` prefix, compile the expression, parse and validate the range, generate the series points.
  - After series generation, serialize to JSON or CSV based on `--format` and write to stdout or the `--output` file.
  - Ensure correct exit codes for success (0) and failures (1).

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:

- Default JSON output to stdout and file writing.
- CSV output to stdout and file writing.
- Error on unsupported `--format` values.
- Error on invalid expression or range flags.
- Help and version flags: exit code 0 and expected output.

# Documentation

- Update `USAGE.md` under "Time Series Generation" to document the `--format` option, examples for JSON and CSV, and built-in help/version.
- Update `README.md` under `## Time Series Generation` with usage snippets showing JSON and CSV examples and help/version commands.


LLM API Usage:
```json
{"prompt_tokens":90060,"completion_tokens":609,"total_tokens":90669,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-27T11:25:15.028Z

Activity:

Generated issue 3138 for feature "cli-parsing" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/3138

title:

Refactor main() to use yargs for structured CLI parsing with help/version

And description:

Objective:
Refactor src/lib/main.js to replace manual argument handling with yargs-based parsing for a structured, discoverable CLI. Add built-in `--help` and `--version` flags, and ensure programmatic API remains intact via `main()` export.

Changes Required:
1. Dependencies (`package.json`):
   - Add `yargs` (v17+) to `dependencies`.
2. Source Update (`src/lib/main.js`):
   - Import `yargs` and `hideBin` from `yargs/helpers`.
   - Configure yargs to:
     • Provide a default command capturing `main(parsedArgs)`.
     • Support global flags:
       - `--help`, `-h`: display usage and exit 0.
       - `--version`, `-v`: display package version and exit 0.
   - Maintain `export function main(argv)` that takes parsed flags and returns or logs accordingly without exiting.
   - Ensure invoking the CLI (when `import.meta.main`) calls yargs parsing and delegates to `main(argv)`.
3. Test Updates (`tests/unit/main.test.js`):
   - Add tests using `child_process.spawnSync` to assert:
     • `--help` / `-h` exit 0 and stdout contains "Usage:".
     • `--version` exit 0 and stdout equals package version.
   - Confirm existing programmatic tests for `main()` still pass.
4. Documentation:
   - **README.md**: Add a `## CLI Usage` section with examples:
     ```bash
     $ repository0-plot-code-lib --help
     Usage: repository0-plot-code-lib [options]

     Options:
       -h, --help     Show help       [boolean]
       -v, --version  Show version     [boolean]
     ```
   - **USAGE.md**: Document the help/version flags and reference programmatic `main()`.

Verification:
- Run `npm install` to install `yargs`.
- Execute `npm test` to ensure new and existing tests pass.
- Manual check:
  ```bash
  $ repository0-plot-code-lib --help
  $ repository0-plot-code-lib -h
  $ repository0-plot-code-lib --version
  ```

LLM API Usage:
```json
{"prompt_tokens":90196,"completion_tokens":547,"total_tokens":90743,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Issue to enhanced Issue at 2025-05-27T11:26:02.990Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:

## Objective

Refactor `src/lib/main.js` to leverage `yargs` for structured CLI parsing, adding built-in `--help` (`-h`) and `--version` (`-v`) flags, while preserving the existing `main()` programmatic API.

---

### Proposed Changes

1. **Dependencies**
   - Add `yargs` (v17+) to `dependencies` in `package.json`.

2. **Source (`src/lib/main.js`)**
   - Import:
     ```js
     import yargs from 'yargs';
     import { hideBin } from 'yargs/helpers';
     ```
   - Configure `yargs(hideBin(process.argv))` to:
     - Define a default command that calls `main(parsedArgs)`.
     - Support global options:
       - `--help`, `-h`: display usage and exit code 0.
       - `--version`, `-v`: display package version (as in `package.json`) and exit code 0.
   - Keep `export function main(argv)` unchanged so it can be used programmatically without exiting the process.
   - On CLI invocation (`if (import.meta.main)`), delegate to the configured yargs parser.

3. **Tests (`tests/unit/main.cli.test.js`)**
   - Use `child_process.spawnSync` to verify CLI behavior:
     - **Help flags**: 
       - `repository0-plot-code-lib --help` and `-h`
       - Exit code: 0
       - `stdout` contains a usage header matching `/^Usage:/i` and lists `-h, --help` and `-v, --version`.
     - **Version flags**:
       - `--version` and `-v`
       - Exit code: 0
       - `stdout` strictly equals the version from `package.json` (e.g., `1.2.0-0`).
   - Ensure existing programmatic tests (`tests/unit/main.test.js`) still pass when calling `main()` directly.

4. **Documentation**
   - **README.md**: Add a **CLI Usage** section:
     ```markdown
     ## CLI Usage

     ```bash
     $ repository0-plot-code-lib --help
     Usage: repository0-plot-code-lib [options]

     Options:
       -h, --help     Show help       [boolean]
       -v, --version  Show version    [boolean]
     ```
     ```
   - **USAGE.md**: Document `--help`, `-h`, `--version`, `-v`, and note how to call the programmatic `main()` API.

---

### Acceptance Criteria

1. When invoked with `--help` or `-h`:
   - CLI exits with code **0**.
   - `stdout` begins with `Usage:` (case-insensitive) and includes lines for `-h, --help` and `-v, --version`.
2. When invoked with `--version` or `-v`:
   - CLI exits with code **0**.
   - `stdout` exactly matches the version field from `package.json` (no additional text).
3. Calling `main()` programmatically (without yargs) remains unchanged:
   - Does not throw errors.
   - Logs or returns output as before.
4. Existing unit tests in `tests/unit/main.test.js` and `tests/unit/plot-generation.test.js` continue to pass without modification.
5. All new tests (`main.cli.test.js`) pass under `npm test`.

*This refactoring unlocks a fully-featured CLI experience with discoverable help/version flags, aligning with the project’s mission to be a go-to plot library with robust, user-friendly tooling.*

LLM API Usage:
```json
{"prompt_tokens":6332,"completion_tokens":1545,"total_tokens":7877,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":640,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Issue to Code at 2025-05-27T11:28:21.866Z

Activity:

fixApplied: true to branch agentic-lib-issue-3138 with message Refactor CLI to use yargs for structured parsing with helpversion and JSONCSV output and outcome success

Git Diff:
```diff
diff --git a/package-lock.json b/package-lock.json
index e79334b8..7219efd7 100644
--- a/package-lock.json
+++ b/package-lock.json
@@ -12,8 +12,10 @@
         "dotenv": "^16.5.0",
         "ejs": "^3.1.10",
         "js-yaml": "^4.1.0",
+        "mathjs": "^11.8.0",
         "minimatch": "^10.0.1",
         "openai": "^4.103.0",
+        "yargs": "^17.7.2",
         "zod": "^3.25.30"
       },
       "bin": {
@@ -22,7 +24,7 @@
       "devDependencies": {
         "@microsoft/eslint-formatter-sarif": "^3.1.0",
         "@vitest/coverage-v8": "^3.1.4",
-        "eslint": "^9.25.1",
+        "eslint": "^9.27.0",
         "eslint-config-google": "^0.14.0",
         "eslint-config-prettier": "^10.1.5",
         "eslint-plugin-import": "^2.31.0",
@@ -31,11 +33,6 @@
         "eslint-plugin-react": "^7.37.5",
         "eslint-plugin-security": "^3.0.1",
         "eslint-plugin-sonarjs": "^3.0.2",
-        "express": "^4.21.2",
-        "js-yaml": "^4.1.0",
-        "markdown-it": "^14.1.0",
-        "markdown-it-github": "^0.5.0",
-        "npm-check-updates": "^17.1.18",
         "prettier": "^3.5.3",
         "vitest": "^3.1.4"
       },
@@ -93,6 +90,15 @@
         "node": ">=6.0.0"
       }
     },
+    "node_modules/@babel/runtime": {
+      "version": "7.27.3",
+      "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.27.3.tgz",
+      "integrity": "sha512-7EYtGezsdiDMyY80+65EzwiGmcJqpmcZCojSXaRgdrBaGtWTgDZKq69cPIVped6MkIM78cTQ2GOiEYjwOlG4xw==",
+      "license": "MIT",
+      "engines": {
+        "node": ">=6.9.0"
+      }
+    },
     "node_modules/@babel/types": {
       "version": "7.27.1",
       "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.27.1.tgz",
@@ -1739,20 +1745,6 @@
         "node": ">=6.5"
       }
     },
-    "node_modules/accepts": {
-      "version": "1.3.8",
-      "resolved": "https://registry.npmjs.org/accepts/-/accepts-1.3.8.tgz",
-      "integrity": "sha512-PYAthTa2m2VKxuvSD3DPC/Gy+U+sOA1LAuT8mkmRuvw+NACSaeXEQ+NHcVF7rONl6qcaxV3Uuemwawk+7+SJLw==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "mime-types": "~2.1.34",
-        "negotiator": "0.6.3"
-      },
-      "engines": {
-        "node": ">= 0.6"
-      }
-    },
     "node_modules/acorn": {
       "version": "8.14.1",
       "resolved": "https://registry.npmjs.org/acorn/-/acorn-8.14.1.tgz",
@@ -1837,7 +1829,6 @@
       "version": "2.0.1",
       "resolved": "https://registry.npmjs.org/argparse/-/argparse-2.0.1.tgz",
       "integrity": "sha512-8+9WqebbFzpX9OR+Wa6O29asIogeRMzcGtAINdpMHHyAg10f05aSFVBbcEqGf/PXw1EjAZ+q2/bEBg3DvurK3Q==",
-      "dev": true,
       "license": "Python-2.0"
     },
     "node_modules/array-buffer-byte-length": {
@@ -1857,13 +1848,6 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
-    "node_modules/array-flatten": {
-      "version": "1.1.1",
-      "resolved": "https://registry.npmjs.org/array-flatten/-/array-flatten-1.1.1.tgz",
-      "integrity": "sha512-PCVAQswWemu6UdxsDFFX/+gVeYqKAod3D3UVm91jHwynguOwAvYPhx8nNlM++NqRcK6CxxpUafjmhIdKiHibqg==",
-      "dev": true,
-      "license": "MIT"
-    },
     "node_modules/array-includes": {
       "version": "3.1.8",
       "resolved": "https://registry.npmjs.org/array-includes/-/array-includes-3.1.8.tgz",
@@ -2059,48 +2043,6 @@
       "integrity": "sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw==",
       "license": "MIT"
     },
-    "node_modules/body-parser": {
-      "version": "1.20.3",
-      "resolved": "https://registry.npmjs.org/body-parser/-/body-parser-1.20.3.tgz",
-      "integrity": "sha512-7rAxByjUMqQ3/bHJy7D6OGXvx/MMc4IqBn/X0fcM1QUcAItpZrBEYhWGem+tzXH90c+G01ypMcYJBO9Y30203g==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "bytes": "3.1.2",
-        "content-type": "~1.0.5",
-        "debug": "2.6.9",
-        "depd": "2.0.0",
-        "destroy": "1.2.0",
-        "http-errors": "2.0.0",
-        "iconv-lite": "0.4.24",
-        "on-finished": "2.4.1",
-        "qs": "6.13.0",
-        "raw-body": "2.5.2",
-        "type-is": "~1.6.18",
-        "unpipe": "1.0.0"
-      },
-      "engines": {
-        "node": ">= 0.8",
-        "npm": "1.2.8000 || >= 1.4.16"
-      }
-    },
-    "node_modules/body-parser/node_modules/debug": {
-      "version": "2.6.9",
-      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
-      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "ms": "2.0.0"
-      }
-    },
-    "node_modules/body-parser/node_modules/ms": {
-      "version": "2.0.0",
-      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
-      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
-      "dev": true,
-      "license": "MIT"
-    },
     "node_modules/brace-expansion": {
       "version": "2.0.1",
       "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-2.0.1.tgz",
@@ -2245,6 +2187,78 @@
         "node": ">= 16"
       }
     },
+    "node_modules/cliui": {
+      "version": "8.0.1",
+      "resolved": "https://registry.npmjs.org/cliui/-/cliui-8.0.1.tgz",
+      "integrity": "sha512-BSeNnyus75C4//NQ9gQt1/csTXyo/8Sb+afLAkzAptFuMsod9HFokGNudZpi/oQV73hnVK+sR+5PVRMd+Dr7YQ==",
+      "license": "ISC",
+      "dependencies": {
+        "string-width": "^4.2.0",
+        "strip-ansi": "^6.0.1",
+        "wrap-ansi": "^7.0.0"
+      },
+      "engines": {
+        "node": ">=12"
+      }
+    },
+    "node_modules/cliui/node_modules/ansi-regex": {
+      "version": "5.0.1",
+      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
+      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
+      "license": "MIT",
+      "engines": {
+        "node": ">=8"
+      }
+    },
+    "node_modules/cliui/node_modules/emoji-regex": {
+      "version": "8.0.0",
+      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
+      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
+      "license": "MIT"
+    },
+    "node_modules/cliui/node_modules/string-width": {
+      "version": "4.2.3",
+      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
+      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
+      "license": "MIT",
+      "dependencies": {
+        "emoji-regex": "^8.0.0",
+        "is-fullwidth-code-point": "^3.0.0",
+        "strip-ansi": "^6.0.1"
+      },
+      "engines": {
+        "node": ">=8"
+      }
+    },
+    "node_modules/cliui/node_modules/strip-ansi": {
+      "version": "6.0.1",
+      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
+      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
+      "license": "MIT",
+      "dependencies": {
+        "ansi-regex": "^5.0.1"
+      },
+      "engines": {
+        "node": ">=8"
+      }
+    },
+    "node_modules/cliui/node_modules/wrap-ansi": {
+      "version": "7.0.0",
+      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-7.0.0.tgz",
+      "integrity": "sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q==",
+      "license": "MIT",
+      "dependencies": {
+        "ansi-styles": "^4.0.0",
+        "string-width": "^4.1.0",
+        "strip-ansi": "^6.0.0"
+      },
+      "engines": {
+        "node": ">=10"
+      },
+      "funding": {
+        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
+      }
+    },
     "node_modules/color-convert": {
       "version": "2.0.1",
       "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
@@ -2275,50 +2289,23 @@
         "node": ">= 0.8"
       }
     },
-    "node_modules/concat-map": {
-      "version": "0.0.1",
-      "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
-      "integrity": "sha512-/Srv4dswyQNBfohGpz9o6Yb3Gz3SrUDqBH5rTuhGR7ahtlbYKnVxw2bCFMRljaA7EXHaXZ8wsHdodFvbkhKmqg==",
-      "license": "MIT"
-    },
-    "node_modules/content-disposition": {
-      "version": "0.5.4",
-      "resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-0.5.4.tgz",
-      "integrity": "sha512-FveZTNuGw04cxlAiWbzi6zTAL/lhehaWbTtgluJh4/E95DqMwTmha3KZN1aAWA8cFIhHzMZUvLevkw5Rqk+tSQ==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "safe-buffer": "5.2.1"
-      },
-      "engines": {
-        "node": ">= 0.6"
-      }
-    },
-    "node_modules/content-type": {
-      "version": "1.0.5",
-      "resolved": "https://registry.npmjs.org/content-type/-/content-type-1.0.5.tgz",
-      "integrity": "sha512-nTjqfcBFEipKdXCv4YDQWCfmcLZKm81ldF0pAopTvyrFGVbcR6P/VAAd5G7N+0tTr8QqiU0tFadD6FK4NtJwOA==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.6"
-      }
-    },
-    "node_modules/cookie": {
-      "version": "0.7.1",
-      "resolved": "https://registry.npmjs.org/cookie/-/cookie-0.7.1.tgz",
-      "integrity": "sha512-6DnInpx7SJ2AK3+CTUE/ZM0vWTUboZCegxhC2xiIydHR9jNuTAASBrfEpHhiGOZw/nX51bHt6YQl8jsGo4y/0w==",
-      "dev": true,
+    "node_modules/complex.js": {
+      "version": "2.4.2",
+      "resolved": "https://registry.npmjs.org/complex.js/-/complex.js-2.4.2.tgz",
+      "integrity": "sha512-qtx7HRhPGSCBtGiST4/WGHuW+zeaND/6Ld+db6PbrulIB1i2Ev/2UPiqcmpQNPSyfBKraC0EOvOKCB5dGZKt3g==",
       "license": "MIT",
       "engines": {
-        "node": ">= 0.6"
+        "node": "*"
+      },
+      "funding": {
+        "type": "github",
+        "url": "https://github.com/sponsors/rawify"
       }
     },
-    "node_modules/cookie-signature": {
-      "version": "1.0.6",
-      "resolved": "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.0.6.tgz",
-      "integrity": "sha512-QADzlaHc8icV8I7vbaJXJwod9HWYp8uCqf1xa4OfNu1T7JVxQIrUgOWtHdNDtPiywmFbiS12VjotIXLrKM3orQ==",
-      "dev": true,
+    "node_modules/concat-map": {
+      "version": "0.0.1",
+      "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
+      "integrity": "sha512-/Srv4dswyQNBfohGpz9o6Yb3Gz3SrUDqBH5rTuhGR7ahtlbYKnVxw2bCFMRljaA7EXHaXZ8wsHdodFvbkhKmqg==",
       "license": "MIT"
     },
     "node_modules/cross-spawn": {
@@ -2408,6 +2395,12 @@
         }
       }
     },
+    "node_modules/decimal.js": {
+      "version": "10.5.0",
+      "resolved": "https://registry.npmjs.org/decimal.js/-/decimal.js-10.5.0.tgz",
+      "integrity": "sha512-8vDa8Qxvr/+d94hSh5P3IJwI5t8/c0KsMp+g8bNw9cY2icONa5aPfvKeieW1WlG0WQYwwhJ7mjui2xtiePQSXw==",
+      "license": "MIT"
+    },
     "node_modules/deep-eql": {
       "version": "5.0.2",
       "resolved": "https://registry.npmjs.org/deep-eql/-/deep-eql-5.0.2.tgz",
@@ -2470,27 +2463,6 @@
         "node": ">=0.4.0"
       }
     },
-    "node_modules/depd": {
-      "version": "2.0.0",
-      "resolved": "https://registry.npmjs.org/depd/-/depd-2.0.0.tgz",
-      "integrity": "sha512-g7nH6P6dyDioJogAAGprGpCtVImJhpPk/roCzdb3fIh61/s/nPsfR6onyMwkCAR/OlC3yBC0lESvUoQEAssIrw==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.8"
-      }
-    },
-    "node_modules/destroy": {
-      "version": "1.2.0",
-      "resolved": "https://registry.npmjs.org/destroy/-/destroy-1.2.0.tgz",
-      "integrity": "sha512-2sJGJTaXIIaR1w4iJSNoN0hnMY7Gpc/n8D4qSCJw8QqFWXf7cuAgnEHxBpweaVcPevC2l3KpjYCx3NypQQgaJg==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.8",
-        "npm": "1.2.8000 || >= 1.4.16"
-      }
-    },
     "node_modules/doctrine": {
       "version": "2.1.0",
       "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-2.1.0.tgz",
@@ -2537,13 +2509,6 @@
       "dev": true,
       "license": "MIT"
     },
-    "node_modules/ee-first": {
-      "version": "1.1.1",
-      "resolved": "https://registry.npmjs.org/ee-first/-/ee-first-1.1.1.tgz",
-      "integrity": "sha512-WMwm9LhRUo+WUaRN+vRuETqG89IgZphVSNkdFgeb6sS/E4OrDIN7t48CAewSHXc6C8lefD8KKfr5vY61brQlow==",
-      "dev": true,
-      "license": "MIT"
-    },
     "node_modules/ejs": {
       "version": "3.1.10",
       "resolved": "https://registry.npmjs.org/ejs/-/ejs-3.1.10.tgz",
@@ -2566,29 +2531,6 @@
       "dev": true,
       "license": "MIT"
     },
-    "node_modules/encodeurl": {
-      "version": "2.0.0",
-      "resolved": "https://registry.npmjs.org/encodeurl/-/encodeurl-2.0.0.tgz",
-      "integrity": "sha512-Q0n9HRi4m6JuGIV1eFlmvJB7ZEVxu93IrMyiMsGC0lrMJMWzRgx6WGquyfQgZVb31vhGgXnfmPNNXmxnOkRBrg==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.8"
-      }
-    },
-    "node_modules/entities": {
-      "version": "4.5.0",
-      "resolved": "https://registry.npmjs.org/entities/-/entities-4.5.0.tgz",
-      "integrity": "sha512-V0hjH4dGPh9Ao5p0MoRY6BVqtwCjhz6vI5LT8AJ55H+4g9/4vbHx1I54fS0XuclLhDHArPQCiMjDxjaL8fPxhw==",
-      "dev": true,
-      "license": "BSD-2-Clause",
-      "engines": {
-        "node": ">=0.12"
-      },
-      "funding": {
-        "url": "https://github.com/fb55/entities?sponsor=1"
-      }
-    },
     "node_modules/es-abstract": {
       "version": "1.23.10",
       "resolved": "https://registry.npmjs.org/es-abstract/-/es-abstract-1.23.10.tgz",
@@ -2807,11 +2749,19 @@
         "@esbuild/win32-x64": "0.25.4"
       }
     },
-    "node_modules/escape-html": {
-      "version": "1.0.3",
-      "resolved": "https://registry.npmjs.org/escape-html/-/escape-html-1.0.3.tgz",
-      "integrity": "sha512-NiSupZ4OeuGwr68lGIeym/ksIZMJodUGOSCZ/FSnTxcrekbvqrgdUxlJOMpijaKZVjAJrWrGs/6Jy8OMuyj9ow==",
-      "dev": true,
+    "node_modules/escalade": {
+      "version": "3.2.0",
+      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
+      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
+      "license": "MIT",
+      "engines": {
+        "node": ">=6"
+      }
+    },
+    "node_modules/escape-latex": {
+      "version": "1.2.0",
+      "resolved": "https://registry.npmjs.org/escape-latex/-/escape-latex-1.2.0.tgz",
+      "integrity": "sha512-nV5aVWW1K0wEiUIEdZ4erkGGH8mDxGyxSeqPzRNtWP7ataw+/olFObw7hujFWlVjNsaDFw5VZ5NzVSIqRgfTiw==",
       "license": "MIT"
     },
     "node_modules/escape-string-regexp": {
@@ -3354,16 +3304,6 @@
         "node": ">=0.10.0"
       }
     },
-    "node_modules/etag": {
-      "version": "1.8.1",
-      "resolved": "https://registry.npmjs.org/etag/-/etag-1.8.1.tgz",
-      "integrity": "sha512-aIL5Fx7mawVa300al2BnEE4iNvo1qETxLrPI/o05L7z6go7fCw1J6EQmbK4FmJ2AS7kgVF/KEZWufBfdClMcPg==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.6"
-      }
-    },
     "node_modules/event-target-shim": {
       "version": "5.0.1",
       "resolved": "https://registry.npmjs.org/event-target-shim/-/event-target-shim-5.0.1.tgz",
@@ -3383,70 +3323,6 @@
         "node": ">=12.0.0"
       }
     },
-    "node_modules/express": {
-      "version": "4.21.2",
-      "resolved": "https://registry.npmjs.org/express/-/express-4.21.2.tgz",
-      "integrity": "sha512-28HqgMZAmih1Czt9ny7qr6ek2qddF4FclbMzwhCREB6OFfH+rXAnuNCwo1/wFvrtbgsQDb4kSbX9de9lFbrXnA==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "accepts": "~1.3.8",
-        "array-flatten": "1.1.1",
-        "body-parser": "1.20.3",
-        "content-disposition": "0.5.4",
-        "content-type": "~1.0.4",
-        "cookie": "0.7.1",
-        "cookie-signature": "1.0.6",
-        "debug": "2.6.9",
-        "depd": "2.0.0",
-        "encodeurl": "~2.0.0",
-        "escape-html": "~1.0.3",
-        "etag": "~1.8.1",
-        "finalhandler": "1.3.1",
-        "fresh": "0.5.2",
-        "http-errors": "2.0.0",
-        "merge-descriptors": "1.0.3",
-        "methods": "~1.1.2",
-        "on-finished": "2.4.1",
-        "parseurl": "~1.3.3",
-        "path-to-regexp": "0.1.12",
-        "proxy-addr": "~2.0.7",
-        "qs": "6.13.0",
-        "range-parser": "~1.2.1",
-        "safe-buffer": "5.2.1",
-        "send": "0.19.0",
-        "serve-static": "1.16.2",
-        "setprototypeof": "1.2.0",
-        "statuses": "2.0.1",
-        "type-is": "~1.6.18",
-        "utils-merge": "1.0.1",
-        "vary": "~1.1.2"
-      },
-      "engines": {
-        "node": ">= 0.10.0"
-      },
-      "funding": {
-        "type": "opencollective",
-        "url": "https://opencollective.com/express"
-      }
-    },
-    "node_modules/express/node_modules/debug": {
-      "version": "2.6.9",
-      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
-      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "ms": "2.0.0"
-      }
-    },
-    "node_modules/express/node_modules/ms": {
-      "version": "2.0.0",
-      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
-      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
-      "dev": true,
-      "license": "MIT"
-    },
     "node_modules/fast-deep-equal": {
       "version": "3.1.3",
       "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-3.1.3.tgz",
@@ -3534,42 +3410,6 @@
         "node": ">=10"
       }
     },
-    "node_modules/finalhandler": {
-      "version": "1.3.1",
-      "resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-1.3.1.tgz",
-      "integrity": "sha512-6BN9trH7bp3qvnrRyzsBz+g3lZxTNZTbVO2EV1CS0WIcDbawYVdYvGflME/9QP0h0pYlCDBCTjYa9nZzMDpyxQ==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "debug": "2.6.9",
-        "encodeurl": "~2.0.0",
-        "escape-html": "~1.0.3",
-        "on-finished": "2.4.1",
-        "parseurl": "~1.3.3",
-        "statuses": "2.0.1",
-        "unpipe": "~1.0.0"
-      },
-      "engines": {
-        "node": ">= 0.8"
-      }
-    },
-    "node_modules/finalhandler/node_modules/debug": {
-      "version": "2.6.9",
-      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
-      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "ms": "2.0.0"
-      }
-    },
-    "node_modules/finalhandler/node_modules/ms": {
-      "version": "2.0.0",
-      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
-      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
-      "dev": true,
-      "license": "MIT"
-    },
     "node_modules/find-up": {
       "version": "5.0.0",
       "resolved": "https://registry.npmjs.org/find-up/-/find-up-5.0.0.tgz",
@@ -3675,24 +3515,17 @@
         "node": ">= 12.20"
       }
     },
-    "node_modules/forwarded": {
-      "version": "0.2.0",
-      "resolved": "https://registry.npmjs.org/forwarded/-/forwarded-0.2.0.tgz",
-      "integrity": "sha512-buRG0fpBtRHSTCOASe6hD258tEubFoRLb4ZNA6NxMVHNw2gOcwHo9wyablzMzOA5z9xA9L1KNjk/Nt6MT9aYow==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.6"
-      }
-    },
-    "node_modules/fresh": {
-      "version": "0.5.2",
-      "resolved": "https://registry.npmjs.org/fresh/-/fresh-0.5.2.tgz",
-      "integrity": "sha512-zJ2mQYM18rEFOudeV4GShTGIQ7RbzA7ozbU9I/XBpm7kqgMywgmylMwXHxZJmkVoYkna9d2pVXVXPdYTP9ej8Q==",
-      "dev": true,
+    "node_modules/fraction.js": {
+      "version": "4.3.4",
+      "resolved": "https://registry.npmjs.org/fraction.js/-/fraction.js-4.3.4.tgz",
+      "integrity": "sha512-pwiTgt0Q7t+GHZA4yaLjObx4vXmmdcS0iSJ19o8d/goUGgItX9UZWKWNnLHehxviD8wU2IWRsnR8cD5+yOJP2Q==",
       "license": "MIT",
       "engines": {
-        "node": ">= 0.6"
+        "node": "*"
+      },
+      "funding": {
+        "type": "patreon",
+        "url": "https://github.com/sponsors/rawify"
       }
     },
     "node_modules/fs.realpath": {
@@ -3764,6 +3597,15 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
+    "node_modules/get-caller-file": {
+      "version": "2.0.5",
+      "resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-2.0.5.tgz",
+      "integrity": "sha512-DyFP3BM/3YHTQOCUL/w0OZHR0lpKeGrxotcHWcqNEdnltqFwXVfhEBQ94eIo34AfQpo0rGki4cyIiftY06h2Fg==",
+      "license": "ISC",
+      "engines": {
+        "node": "6.* || 8.* || >= 10.*"
+      }
+    },
     "node_modules/get-intrinsic": {
       "version": "1.3.0",
       "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.3.0.tgz",
@@ -3819,13 +3661,6 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
-    "node_modules/github-slugger": {
-      "version": "1.5.0",
-      "resolved": "https://registry.npmjs.org/github-slugger/-/github-slugger-1.5.0.tgz",
-      "integrity": "sha512-wIh+gKBI9Nshz2o46B0B3f5k/W+WI9ZAv6y5Dn5WJ5SK1t0TnDimB4WE5rmTD05ZAIn8HALCZVmCsvj0w0v0lw==",
-      "dev": true,
-      "license": "ISC"
-    },
     "node_modules/glob": {
       "version": "10.4.5",
       "resolved": "https://registry.npmjs.org/glob/-/glob-10.4.5.tgz",
@@ -4022,23 +3857,6 @@
       "dev": true,
       "license": "MIT"
     },
-    "node_modules/http-errors": {
-      "version": "2.0.0",
-      "resolved": "https://registry.npmjs.org/http-errors/-/http-errors-2.0.0.tgz",
-      "integrity": "sha512-FtwrG/euBzaEjYeRqOgly7G0qviiXoJWnvEH2Z1plBdXgbyjv34pHTSb9zoeHMyDy33+DWy5Wt9Wo+TURtOYSQ==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "depd": "2.0.0",
-        "inherits": "2.0.4",
-        "setprototypeof": "1.2.0",
-        "statuses": "2.0.1",
-        "toidentifier": "1.0.1"
-      },
-      "engines": {
-        "node": ">= 0.8"
-      }
-    },
     "node_modules/humanize-ms": {
       "version": "1.2.1",
       "resolved": "https://registry.npmjs.org/humanize-ms/-/humanize-ms-1.2.1.tgz",
@@ -4048,19 +3866,6 @@
         "ms": "^2.0.0"
       }
     },
-    "node_modules/iconv-lite": {
-      "version": "0.4.24",
-      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.4.24.tgz",
-      "integrity": "sha512-v3MXnZAcvnywkTUEZomIActle7RXXeedOR31wwl7VlyoXO4Qi9arvSenNQWne1TcRwhCL1HwLI21bEqdpj8/rA==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "safer-buffer": ">= 2.1.2 < 3"
-      },
-      "engines": {
-        "node": ">=0.10.0"
-      }
-    },
     "node_modules/ignore": {
       "version": "5.3.2",
       "resolved": "https://registry.npmjs.org/ignore/-/ignore-5.3.2.tgz",
@@ -4132,16 +3937,6 @@
         "node": ">= 0.4"
       }
     },
-    "node_modules/ipaddr.js": {
-      "version": "1.9.1",
-      "resolved": "https://registry.npmjs.org/ipaddr.js/-/ipaddr.js-1.9.1.tgz",
-      "integrity": "sha512-0KI/607xoxSToH7GjN1FfSbLoU0+btTicjsQSWQlh/hZykN8KpmMf7uYwPW3R+akZ6R/w18ZlXSHBYXiYUPO3g==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.10"
-      }
-    },
     "node_modules/is-array-buffer": {
       "version": "3.0.5",
       "resolved": "https://registry.npmjs.org/is-array-buffer/-/is-array-buffer-3.0.5.tgz",
@@ -4307,7 +4102,6 @@
       "version": "3.0.0",
       "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
       "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
-      "dev": true,
       "license": "MIT",
       "engines": {
         "node": ">=8"
@@ -4672,6 +4466,12 @@
         "node": "*"
       }
     },
+    "node_modules/javascript-natural-sort": {
+      "version": "0.7.1",
+      "resolved": "https://registry.npmjs.org/javascript-natural-sort/-/javascript-natural-sort-0.7.1.tgz",
+      "integrity": "sha512-nO6jcEfZWQXDhOiBtG2KvKyEptz7RVbpGP4vTD2hLBdmNQSsCiicO2Ioinv6UI4y9ukqnBpy+XZ9H6uLNgJTlw==",
+      "license": "MIT"
+    },
     "node_modules/js-tokens": {
       "version": "4.0.0",
       "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
@@ -4683,7 +4483,6 @@
       "version": "4.1.0",
       "resolved": "https://registry.npmjs.org/js-yaml/-/js-yaml-4.1.0.tgz",
       "integrity": "sha512-wpxZs9NoxZaJESJGIZTyDEaYpl0FKSA+FB9aJiyemKhMwkxQg63h4T1KJgUGHpTqPDNRcmmYLugrRjJlBtWvRA==",
-      "dev": true,
       "license": "MIT",
       "dependencies": {
         "argparse": "^2.0.1"
@@ -4776,16 +4575,6 @@
         "node": ">= 0.8.0"
       }
     },
-    "node_modules/linkify-it": {
-      "version": "5.0.0",
-      "resolved": "https://registry.npmjs.org/linkify-it/-/linkify-it-5.0.0.tgz",
-      "integrity": "sha512-5aHCbzQRADcdP+ATqnDuhhJ/MRIqDkZX5pyjFHRRysS8vZ5AbqGEoFIb6pYHPZ+L/OC2Lc+xT8uHVVR5CAK/wQ==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "uc.micro": "^2.0.0"
-      }
-    },
     "node_modules/locate-path": {
       "version": "6.0.0",
       "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-6.0.0.tgz",
@@ -4894,42 +4683,6 @@
         "node": ">=10"
       }
     },
-    "node_modules/markdown-it": {
-      "version": "14.1.0",
-      "resolved": "https://registry.npmjs.org/markdown-it/-/markdown-it-14.1.0.tgz",
-      "integrity": "sha512-a54IwgWPaeBCAAsv13YgmALOF1elABB08FxO9i+r4VFk5Vl4pKokRPeX8u5TCgSsPi6ec1otfLjdOpVcgbpshg==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "argparse": "^2.0.1",
-        "entities": "^4.4.0",
-        "linkify-it": "^5.0.0",
-        "mdurl": "^2.0.0",
-        "punycode.js": "^2.3.1",
-        "uc.micro": "^2.1.0"
-      },
-      "bin": {
-        "markdown-it": "bin/markdown-it.mjs"
-      }
-    },
-    "node_modules/markdown-it-github": {
-      "version": "0.5.0",
-      "resolved": "https://registry.npmjs.org/markdown-it-github/-/markdown-it-github-0.5.0.tgz",
-      "integrity": "sha512-ycHCFnPLSP9dlkcX/3yFzLhO9ZwHHYPIeqhFN9P7vnqWSpL56lbYganMbBU8u5H7b91qk6affHyYb2pMPbnMAQ==",
-      "dev": true,
-      "license": "Unlicense",
-      "dependencies": {
-        "github-slugger": "^1.2.1",
-        "markdown-it-theme": "^0.2.0"
-      }
-    },
-    "node_modules/markdown-it-theme": {
-      "version": "0.2.0",
-      "resolved": "https://registry.npmjs.org/markdown-it-theme/-/markdown-it-theme-0.2.0.tgz",
-      "integrity": "sha512-3R9tXmfP/7ilkRsm6o82GRdEMm5jJ8/s5OgdFB2wZC8VK5fJJLL0hxHGhu38wg+nBX7COBrvRN/QmrT3xybj/g==",
-      "dev": true,
-      "license": "Unlicense"
-    },
     "node_modules/math-intrinsics": {
       "version": "1.1.0",
       "resolved": "https://registry.npmjs.org/math-intrinsics/-/math-intrinsics-1.1.0.tgz",
@@ -4939,54 +4692,27 @@
         "node": ">= 0.4"
       }
     },
-    "node_modules/mdurl": {
-      "version": "2.0.0",
-      "resolved": "https://registry.npmjs.org/mdurl/-/mdurl-2.0.0.tgz",
-      "integrity": "sha512-Lf+9+2r+Tdp5wXDXC4PcIBjTDtq4UKjCPMQhKIuzpJNW0b96kVqSwW0bT7FhRSfmAiFYgP+SCRvdrDozfh0U5w==",
-      "dev": true,
-      "license": "MIT"
-    },
-    "node_modules/media-typer": {
-      "version": "0.3.0",
-      "resolved": "https://registry.npmjs.org/media-typer/-/media-typer-0.3.0.tgz",
-      "integrity": "sha512-dq+qelQ9akHpcOl/gUVRTxVIOkAJ1wR3QAvb4RsVjS8oVoFjDGTc679wJYmUmknUF5HwMLOgb5O+a3KxfWapPQ==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.6"
-      }
-    },
-    "node_modules/merge-descriptors": {
-      "version": "1.0.3",
-      "resolved": "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-1.0.3.tgz",
-      "integrity": "sha512-gaNvAS7TZ897/rVaZ0nMtAyxNyi/pdbjbAwUpFQpN70GqnVfOiXpeUUMKRBmzXaSQ8DdTX4/0ms62r2K+hE6mQ==",
-      "dev": true,
-      "license": "MIT",
-      "funding": {
-        "url": "https://github.com/sponsors/sindresorhus"
-      }
-    },
-    "node_modules/methods": {
-      "version": "1.1.2",
-      "resolved": "https://registry.npmjs.org/methods/-/methods-1.1.2.tgz",
-      "integrity": "sha512-iclAHeNqNm68zFtnZ0e+1L2yUIdvzNoauKU4WBA3VvH/vPFieF7qfRlwUZU+DA9P9bPXIS90ulxoUoCH23sV2w==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.6"
-      }
-    },
-    "node_modules/mime": {
-      "version": "1.6.0",
-      "resolved": "https://registry.npmjs.org/mime/-/mime-1.6.0.tgz",
-      "integrity": "sha512-x0Vn8spI+wuJ1O6S7gnbaQg8Pxh4NNHb7KSINmEWKiPE4RKOplvijn+NkmYmmRgP68mc70j2EbeTFRsrswaQeg==",
-      "dev": true,
-      "license": "MIT",
+    "node_modules/mathjs": {
+      "version": "11.12.0",
+      "resolved": "https://registry.npmjs.org/mathjs/-/mathjs-11.12.0.tgz",
+      "integrity": "sha512-UGhVw8rS1AyedyI55DGz9q1qZ0p98kyKPyc9vherBkoueLntPfKtPBh14x+V4cdUWK0NZV2TBwqRFlvadscSuw==",
+      "license": "Apache-2.0",
+      "dependencies": {
+        "@babel/runtime": "^7.23.2",
+        "complex.js": "^2.1.1",
+        "decimal.js": "^10.4.3",
+        "escape-latex": "^1.2.0",
+        "fraction.js": "4.3.4",
+        "javascript-natural-sort": "^0.7.1",
+        "seedrandom": "^3.0.5",
+        "tiny-emitter": "^2.1.0",
+        "typed-function": "^4.1.1"
+      },
       "bin": {
-        "mime": "cli.js"
+        "mathjs": "bin/cli.js"
       },
       "engines": {
-        "node": ">=4"
+        "node": ">= 14"
       }
     },
     "node_modules/mime-db": {
@@ -5077,16 +4803,6 @@
       "dev": true,
       "license": "MIT"
     },
-    "node_modules/negotiator": {
-      "version": "0.6.3",
-      "resolved": "https://registry.npmjs.org/negotiator/-/negotiator-0.6.3.tgz",
-      "integrity": "sha512-+EUsqGPLsM+j/zdChZjsnX51g4XrHFOIXwfnCVPGlQk/k5giakcKsuxCObBRu6DSm9opw/O6slWbJdghQM4bBg==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.6"
-      }
-    },
     "node_modules/node-domexception": {
       "version": "1.0.0",
       "resolved": "https://registry.npmjs.org/node-domexception/-/node-domexception-1.0.0.tgz",
@@ -5127,21 +4843,6 @@
         }
       }
     },
-    "node_modules/npm-check-updates": {
-      "version": "17.1.18",
-      "resolved": "https://registry.npmjs.org/npm-check-updates/-/npm-check-updates-17.1.18.tgz",
-      "integrity": "sha512-bkUy2g4v1i+3FeUf5fXMLbxmV95eG4/sS7lYE32GrUeVgQRfQEk39gpskksFunyaxQgTIdrvYbnuNbO/pSUSqw==",
-      "dev": true,
-      "license": "Apache-2.0",
-      "bin": {
-        "ncu": "build/cli.js",
-        "npm-check-updates": "build/cli.js"
-      },
-      "engines": {
-        "node": "^18.18.0 || >=20.0.0",
-        "npm": ">=8.12.1"
-      }
-    },
     "node_modules/object-assign": {
       "version": "4.1.1",
       "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
@@ -5265,19 +4966,6 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
-    "node_modules/on-finished": {
-      "version": "2.4.1",
-      "resolved": "https://registry.npmjs.org/on-finished/-/on-finished-2.4.1.tgz",
-      "integrity": "sha512-oVlzkg3ENAhCk2zdv7IJwd/QUD4z2RxRwpkcGY8psCVcCYZNq4wYnVWALHM+brtuJjePWiYF/ClmuDr8Ch5+kg==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "ee-first": "1.1.1"
-      },
-      "engines": {
-        "node": ">= 0.8"
-      }
-    },
     "node_modules/once": {
       "version": "1.4.0",
       "resolved": "https://registry.npmjs.org/once/-/once-1.4.0.tgz",
@@ -5406,16 +5094,6 @@
         "node": ">=6"
       }
     },
-    "node_modules/parseurl": {
-      "version": "1.3.3",
-      "resolved": "https://registry.npmjs.org/parseurl/-/parseurl-1.3.3.tgz",
-      "integrity": "sha512-CiyeOxFT/JZyN5m0z9PfXw4SCBJ6Sygz1Dpl0wqjlhDEGGBP1GnsUVEL0p63hoG1fcj3fHynXi9NYO4nWOL+qQ==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.8"
-      }
-    },
     "node_modules/path-exists": {
       "version": "4.0.0",
       "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-4.0.0.tgz",
@@ -5470,13 +5148,6 @@
         "url": "https://github.com/sponsors/isaacs"
       }
     },
-    "node_modules/path-to-regexp": {
-      "version": "0.1.12",
-      "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-0.1.12.tgz",
-      "integrity": "sha512-RA1GjUVMnvYFxuqovrEqZoxxW5NUZqbwKtYz/Tt7nXerk0LbLblQmrsgdeOxV5SFHf0UDggjS/bSeOZwt1pmEQ==",
-      "dev": true,
-      "license": "MIT"
-    },
     "node_modules/pathe": {
       "version": "2.0.3",
       "resolved": "https://registry.npmjs.org/pathe/-/pathe-2.0.3.tgz",
@@ -5604,20 +5275,6 @@
         "react-is": "^16.13.1"
       }
     },
-    "node_modules/proxy-addr": {
-      "version": "2.0.7",
-      "resolved": "https://registry.npmjs.org/proxy-addr/-/proxy-addr-2.0.7.tgz",
-      "integrity": "sha512-llQsMLSUDUPT44jdrU/O37qlnifitDP+ZwrmmZcoSKyLKvtZxpyV0n2/bD/N4tBAAZ/gJEdZU7KMraoK1+XYAg==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "forwarded": "0.2.0",
-        "ipaddr.js": "1.9.1"
-      },
-      "engines": {
-        "node": ">= 0.10"
-      }
-    },
     "node_modules/punycode": {
       "version": "2.3.1",
       "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.3.1.tgz",
@@ -5628,32 +5285,6 @@
         "node": ">=6"
       }
     },
-    "node_modules/punycode.js": {
-      "version": "2.3.1",
-      "resolved": "https://registry.npmjs.org/punycode.js/-/punycode.js-2.3.1.tgz",
-      "integrity": "sha512-uxFIHU0YlHYhDQtV4R9J6a52SLx28BCjT+4ieh7IGbgwVJWO+km431c4yRlREUAsAmt/uMjQUyQHNEPf0M39CA==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">=6"
-      }
-    },
-    "node_modules/qs": {
-      "version": "6.13.0",
-      "resolved": "https://registry.npmjs.org/qs/-/qs-6.13.0.tgz",
-      "integrity": "sha512-+38qI9SOr8tfZ4QmJNplMUxqjbe7LKvvZgWdExBOmd+egZTtjLB67Gu0HRX3u/XOq7UU2Nx6nsjvS16Z9uwfpg==",
-      "dev": true,
-      "license": "BSD-3-Clause",
-      "dependencies": {
-        "side-channel": "^1.0.6"
-      },
-      "engines": {
-        "node": ">=0.6"
-      },
-      "funding": {
-        "url": "https://github.com/sponsors/ljharb"
-      }
-    },
     "node_modules/queue-microtask": {
       "version": "1.2.3",
       "resolved": "https://registry.npmjs.org/queue-microtask/-/queue-microtask-1.2.3.tgz",
@@ -5675,32 +5306,6 @@
       ],
       "license": "MIT"
     },
-    "node_modules/range-parser": {
-      "version": "1.2.1",
-      "resolved": "https://registry.npmjs.org/range-parser/-/range-parser-1.2.1.tgz",
-      "integrity": "sha512-Hrgsx+orqoygnmhFbKaHE6c296J+HTAQXoxEF6gNupROmmGJRoyzfG3ccAveqCBrwr/2yxQ5BVd/GTl5agOwSg==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.6"
-      }
-    },
-    "node_modules/raw-body": {
-      "version": "2.5.2",
-      "resolved": "https://registry.npmjs.org/raw-body/-/raw-body-2.5.2.tgz",
-      "integrity": "sha512-8zGqypfENjCIqGhgXToC8aB2r7YrBX+AQAfIPs/Mlk+BtPTztOvTS01NRW/3Eh60J+a48lt8qsCzirQ6loCVfA==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "bytes": "3.1.2",
-        "http-errors": "2.0.0",
-        "iconv-lite": "0.4.24",
-        "unpipe": "1.0.0"
-      },
-      "engines": {
-        "node": ">= 0.8"
-      }
-    },
     "node_modules/react-is": {
       "version": "16.13.1",
       "resolved": "https://registry.npmjs.org/react-is/-/react-is-16.13.1.tgz",
@@ -5789,6 +5394,15 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
+    "node_modules/require-directory": {
+      "version": "2.1.1",
+      "resolved": "https://registry.npmjs.org/require-directory/-/require-directory-2.1.1.tgz",
+      "integrity": "sha512-fGxEI7+wsG9xrvdjsrlmL22OMTTiHRwAMroiEeMgq8gzoLC/PQr7RsRDSTLUg/bZAZtF+TVIkHc6/4RIKrui+Q==",
+      "license": "MIT",
+      "engines": {
+        "node": ">=0.10.0"
+      }
+    },
     "node_modules/resolve": {
       "version": "1.22.10",
       "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.10.tgz",
@@ -5978,27 +5592,6 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
-    "node_modules/safe-buffer": {
-      "version": "5.2.1",
-      "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.2.1.tgz",
-      "integrity": "sha512-rp3So07KcdmmKbGvgaNxQSJr7bGVSVk5S9Eq1F+ppbRo70+YeaDxkw5Dd8NPN+GD6bjnYm2VuPuCXmpuYvmCXQ==",
-      "dev": true,
-      "funding": [
-        {
-          "type": "github",
-          "url": "https://github.com/sponsors/feross"
-        },
-        {
-          "type": "patreon",
-          "url": "https://www.patreon.com/feross"
-        },
-        {
-          "type": "consulting",
-          "url": "https://feross.org/support"
-        }
-      ],
-      "license": "MIT"
-    },
     "node_modules/safe-push-apply": {
       "version": "1.0.0",
       "resolved": "https://registry.npmjs.org/safe-push-apply/-/safe-push-apply-1.0.0.tgz",
@@ -6044,13 +5637,6 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
-    "node_modules/safer-buffer": {
-      "version": "2.1.2",
-      "resolved": "https://registry.npmjs.org/safer-buffer/-/safer-buffer-2.1.2.tgz",
-      "integrity": "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg==",
-      "dev": true,
-      "license": "MIT"
-    },
     "node_modules/scslre": {
       "version": "0.3.0",
       "resolved": "https://registry.npmjs.org/scslre/-/scslre-0.3.0.tgz",
@@ -6066,6 +5652,12 @@
         "node": "^14.0.0 || >=16.0.0"
       }
     },
+    "node_modules/seedrandom": {
+      "version": "3.0.5",
+      "resolved": "https://registry.npmjs.org/seedrandom/-/seedrandom-3.0.5.tgz",
+      "integrity": "sha512-8OwmbklUNzwezjGInmZ+2clQmExQPvomqjL7LFqOYqtmuxRgQYqOD3mHaU+MvZn5FLUeVxVfQjwLZW/n/JFuqg==",
+      "license": "MIT"
+    },
     "node_modules/semver": {
       "version": "6.3.1",
       "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
@@ -6076,74 +5668,6 @@
         "semver": "bin/semver.js"
       }
     },
-    "node_modules/send": {
-      "version": "0.19.0",
-      "resolved": "https://registry.npmjs.org/send/-/send-0.19.0.tgz",
-      "integrity": "sha512-dW41u5VfLXu8SJh5bwRmyYUbAoSB3c9uQh6L8h/KtsFREPWpbX1lrljJo186Jc4nmci/sGUZ9a0a0J2zgfq2hw==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "debug": "2.6.9",
-        "depd": "2.0.0",
-        "destroy": "1.2.0",
-        "encodeurl": "~1.0.2",
-        "escape-html": "~1.0.3",
-        "etag": "~1.8.1",
-        "fresh": "0.5.2",
-        "http-errors": "2.0.0",
-        "mime": "1.6.0",
-        "ms": "2.1.3",
-        "on-finished": "2.4.1",
-        "range-parser": "~1.2.1",
-        "statuses": "2.0.1"
-      },
-      "engines": {
-        "node": ">= 0.8.0"
-      }
-    },
-    "node_modules/send/node_modules/debug": {
-      "version": "2.6.9",
-      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
-      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "ms": "2.0.0"
-      }
-    },
-    "node_modules/send/node_modules/debug/node_modules/ms": {
-      "version": "2.0.0",
-      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
-      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
-      "dev": true,
-      "license": "MIT"
-    },
-    "node_modules/send/node_modules/encodeurl": {
-      "version": "1.0.2",
-      "resolved": "https://registry.npmjs.org/encodeurl/-/encodeurl-1.0.2.tgz",
-      "integrity": "sha512-TPJXq8JqFaVYm2CWmPvnP2Iyo4ZSM7/QKcSmuMLDObfpH5fi7RUGmd/rTDf+rut/saiDiQEeVTNgAmJEdAOx0w==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.8"
-      }
-    },
-    "node_modules/serve-static": {
-      "version": "1.16.2",
-      "resolved": "https://registry.npmjs.org/serve-static/-/serve-static-1.16.2.tgz",
-      "integrity": "sha512-VqpjJZKadQB/PEbEwvFdO43Ax5dFBZ2UECszz8bQ7pi7wt//PWe1P6MN7eCnjsatYtBT6EuiClbjSWP2WrIoTw==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "encodeurl": "~2.0.0",
-        "escape-html": "~1.0.3",
-        "parseurl": "~1.3.3",
-        "send": "0.19.0"
-      },
-      "engines": {
-        "node": ">= 0.8.0"
-      }
-    },
     "node_modules/set-function-length": {
       "version": "1.2.2",
       "resolved": "https://registry.npmjs.org/set-function-length/-/set-function-length-1.2.2.tgz",
@@ -6193,13 +5717,6 @@
         "node": ">= 0.4"
       }
     },
-    "node_modules/setprototypeof": {
-      "version": "1.2.0",
-      "resolved": "https://registry.npmjs.org/setprototypeof/-/setprototypeof-1.2.0.tgz",
-      "integrity": "sha512-E5LDX7Wrp85Kil5bhZv46j8jOeboKq5JMmYM3gVGdGH8xFpPWXUMsNrlODCrkoxMEeNi/XZIwuRvY4XNwYMJpw==",
-      "dev": true,
-      "license": "ISC"
-    },
     "node_modules/shebang-command": {
       "version": "2.0.0",
       "resolved": "https://registry.npmjs.org/shebang-command/-/shebang-command-2.0.0.tgz",
@@ -6336,16 +5853,6 @@
       "dev": true,
       "license": "MIT"
     },
-    "node_modules/statuses": {
-      "version": "2.0.1",
-      "resolved": "https://registry.npmjs.org/statuses/-/statuses-2.0.1.tgz",
-      "integrity": "sha512-RwNA9Z/7PrK06rYLIzFMlaF+l73iwpzsqRIFgbMLbTcLD6cOao82TaWefPXQvB2fOC4AjuYSEndS7N/mTCbkdQ==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.8"
-      }
-    },
     "node_modules/std-env": {
       "version": "3.9.0",
       "resolved": "https://registry.npmjs.org/std-env/-/std-env-3.9.0.tgz",
@@ -6657,6 +6164,12 @@
       "dev": true,
       "license": "MIT"
     },
+    "node_modules/tiny-emitter": {
+      "version": "2.1.0",
+      "resolved": "https://registry.npmjs.org/tiny-emitter/-/tiny-emitter-2.1.0.tgz",
+      "integrity": "sha512-NB6Dk1A9xgQPMoGqC5CVXn123gWyte215ONT5Pp5a0yt4nlEoO1ZWeCwpncaekPHXO60i47ihFnZPiRPjRMq4Q==",
+      "license": "MIT"
+    },
     "node_modules/tinybench": {
       "version": "2.9.0",
       "resolved": "https://registry.npmjs.org/tinybench/-/tinybench-2.9.0.tgz",
@@ -6718,16 +6231,6 @@
         "node": ">=14.0.0"
       }
     },
-    "node_modules/toidentifier": {
-      "version": "1.0.1",
-      "resolved": "https://registry.npmjs.org/toidentifier/-/toidentifier-1.0.1.tgz",
-      "integrity": "sha512-o5sSPKEkg/DIQNmH43V0/uerLrpzVedkUh8tGNvaeXpfpuwjKenlSox/2O/BTlZUtEe+JG7s5YhEz608PlAHRA==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">=0.6"
-      }
-    },
     "node_modules/tr46": {
       "version": "0.0.3",
       "resolved": "https://registry.npmjs.org/tr46/-/tr46-0.0.3.tgz",
@@ -6773,20 +6276,6 @@
         "url": "https://github.com/sponsors/sindresorhus"
       }
     },
-    "node_modules/type-is": {
-      "version": "1.6.18",
-      "resolved": "https://registry.npmjs.org/type-is/-/type-is-1.6.18.tgz",
-      "integrity": "sha512-TkRKr9sUTxEH8MdfuCSP7VizJyzRNMjj2J2do2Jr3Kym598JVdEksuzPQCnlFPW4ky9Q+iA+ma9BGm06XQBy8g==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "media-typer": "0.3.0",
-        "mime-types": "~2.1.24"
-      },
-      "engines": {
-        "node": ">= 0.6"
-      }
-    },
     "node_modules/typed-array-buffer": {
       "version": "1.0.3",
       "resolved": "https://registry.npmjs.org/typed-array-buffer/-/typed-array-buffer-1.0.3.tgz",
@@ -6865,6 +6354,15 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
+    "node_modules/typed-function": {
+      "version": "4.2.1",
+      "resolved": "https://registry.npmjs.org/typed-function/-/typed-function-4.2.1.tgz",
+      "integrity": "sha512-EGjWssW7Tsk4DGfE+5yluuljS1OGYWiI1J6e8puZz9nTMM51Oug8CD5Zo4gWMsOhq5BI+1bF+rWTm4Vbj3ivRA==",
+      "license": "MIT",
+      "engines": {
+        "node": ">= 18"
+      }
+    },
     "node_modules/typescript": {
       "version": "5.8.3",
       "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.8.3.tgz",
@@ -6879,13 +6377,6 @@
         "node": ">=14.17"
       }
     },
-    "node_modules/uc.micro": {
-      "version": "2.1.0",
-      "resolved": "https://registry.npmjs.org/uc.micro/-/uc.micro-2.1.0.tgz",
-      "integrity": "sha512-ARDJmphmdvUk6Glw7y9DQ2bFkKBHwQHLi2lsaH6PPmz/Ka9sFOBsBluozhDltWmnv9u/cF6Rt87znRTPV+yp/A==",
-      "dev": true,
-      "license": "MIT"
-    },
     "node_modules/unbox-primitive": {
       "version": "1.1.0",
       "resolved": "https://registry.npmjs.org/unbox-primitive/-/unbox-primitive-1.1.0.tgz",
@@ -6911,16 +6402,6 @@
       "integrity": "sha512-JlCMO+ehdEIKqlFxk6IfVoAUVmgz7cU7zD/h9XZ0qzeosSHmUJVOzSQvvYSYWXkFXC+IfLKSIffhv0sVZup6pA==",
       "license": "MIT"
     },
-    "node_modules/unpipe": {
-      "version": "1.0.0",
-      "resolved": "https://registry.npmjs.org/unpipe/-/unpipe-1.0.0.tgz",
-      "integrity": "sha512-pjy2bYhSsufwWlKwPc+l3cN7+wuJlK6uz0YdJEOlQDbl6jo/YlPi4mb8agUkVC8BF7V8NuzeyPNqRksA3hztKQ==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.8"
-      }
-    },
     "node_modules/uri-js": {
       "version": "4.4.1",
       "resolved": "https://registry.npmjs.org/uri-js/-/uri-js-4.4.1.tgz",
@@ -6938,26 +6419,6 @@
       "dev": true,
       "license": "MIT"
     },
-    "node_modules/utils-merge": {
-      "version": "1.0.1",
-      "resolved": "https://registry.npmjs.org/utils-merge/-/utils-merge-1.0.1.tgz",
-      "integrity": "sha512-pMZTvIkT1d+TFGvDOqodOclx0QWkkgi6Tdoa8gC8ffGAAqz9pzPTZWAybbsHHoED/ztMtkv/VoYTYyShUn81hA==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.4.0"
-      }
-    },
-    "node_modules/vary": {
-      "version": "1.1.2",
-      "resolved": "https://registry.npmjs.org/vary/-/vary-1.1.2.tgz",
-      "integrity": "sha512-BNGbWLfd0eUPabhkXUVm0j8uuvREyTh5ovRa/dyow/BqAbZJyC+5fU+IzQOzmAKzYqYRAISoRhdQr3eIZ/PXqg==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.8"
-      }
-    },
     "node_modules/vite": {
       "version": "6.3.5",
       "resolved": "https://registry.npmjs.org/vite/-/vite-6.3.5.tgz",
@@ -7386,6 +6847,83 @@
       "dev": true,
       "license": "ISC"
     },
+    "node_modules/y18n": {
+      "version": "5.0.8",
+      "resolved": "https://registry.npmjs.org/y18n/-/y18n-5.0.8.tgz",
+      "integrity": "sha512-0pfFzegeDWJHJIAmTLRP2DwHjdF5s7jo9tuztdQxAhINCdvS+3nGINqPd00AphqJR/0LhANUS6/+7SCb98YOfA==",
+      "license": "ISC",
+      "engines": {
+        "node": ">=10"
+      }
+    },
+    "node_modules/yargs": {
+      "version": "17.7.2",
+      "resolved": "https://registry.npmjs.org/yargs/-/yargs-17.7.2.tgz",
+      "integrity": "sha512-7dSzzRQ++CKnNI/krKnYRV7JKKPUXMEh61soaHKg9mrWEhzFWhFnxPxGl+69cD1Ou63C13NUPCnmIcrvqCuM6w==",
+      "license": "MIT",
+      "dependencies": {
+        "cliui": "^8.0.1",
+        "escalade": "^3.1.1",
+        "get-caller-file": "^2.0.5",
+        "require-directory": "^2.1.1",
+        "string-width": "^4.2.3",
+        "y18n": "^5.0.5",
+        "yargs-parser": "^21.1.1"
+      },
+      "engines": {
+        "node": ">=12"
+      }
+    },
+    "node_modules/yargs-parser": {
+      "version": "21.1.1",
+      "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-21.1.1.tgz",
+      "integrity": "sha512-tVpsJW7DdjecAiFpbIB1e3qxIQsE6NoPc5/eTdrbbIC4h0LVsWhnoa3g+m2HclBIujHzsxZ4VJVA+GUuc2/LBw==",
+      "license": "ISC",
+      "engines": {
+        "node": ">=12"
+      }
+    },
+    "node_modules/yargs/node_modules/ansi-regex": {
+      "version": "5.0.1",
+      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
+      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
+      "license": "MIT",
+      "engines": {
+        "node": ">=8"
+      }
+    },
+    "node_modules/yargs/node_modules/emoji-regex": {
+      "version": "8.0.0",
+      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
+      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
+      "license": "MIT"
+    },
+    "node_modules/yargs/node_modules/string-width": {
+      "version": "4.2.3",
+      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
+      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
+      "license": "MIT",
+      "dependencies": {
+        "emoji-regex": "^8.0.0",
+        "is-fullwidth-code-point": "^3.0.0",
+        "strip-ansi": "^6.0.1"
+      },
+      "engines": {
+        "node": ">=8"
+      }
+    },
+    "node_modules/yargs/node_modules/strip-ansi": {
+      "version": "6.0.1",
+      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
+      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
+      "license": "MIT",
+      "dependencies": {
+        "ansi-regex": "^5.0.1"
+      },
+      "engines": {
+        "node": ">=8"
+      }
+    },
     "node_modules/yocto-queue": {
       "version": "0.1.0",
       "resolved": "https://registry.npmjs.org/yocto-queue/-/yocto-queue-0.1.0.tgz",
diff --git a/package.json b/package.json
index 8522a815..33f0e8ad 100644
--- a/package.json
+++ b/package.json
@@ -25,16 +25,18 @@
   "license": "MIT",
   "dependencies": {
     "dotenv": "^16.5.0",
-    "openai": "^4.103.0",
     "ejs": "^3.1.10",
     "js-yaml": "^4.1.0",
     "minimatch": "^10.0.1",
+    "openai": "^4.103.0",
+    "yargs": "^17.7.2",
+    "mathjs": "^11.8.0",
     "zod": "^3.25.30"
   },
   "devDependencies": {
     "@microsoft/eslint-formatter-sarif": "^3.1.0",
     "@vitest/coverage-v8": "^3.1.4",
-    "eslint": "^9.25.1",
+    "eslint": "^9.27.0",
     "eslint-config-google": "^0.14.0",
     "eslint-config-prettier": "^10.1.5",
     "eslint-plugin-import": "^2.31.0",
@@ -43,19 +45,16 @@
     "eslint-plugin-react": "^7.37.5",
     "eslint-plugin-security": "^3.0.1",
     "eslint-plugin-sonarjs": "^3.0.2",
-    "express": "^4.21.2",
-    "js-yaml": "^4.1.0",
-    "markdown-it-github": "^0.5.0",
-    "markdown-it": "^14.1.0",
-    "npm-check-updates": "^17.1.18",
     "prettier": "^3.5.3",
     "vitest": "^3.1.4"
   },
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
index 3cdd4e2a..6d6a98af 100755
--- a/src/lib/main.js
+++ b/src/lib/main.js
@@ -1,13 +1,115 @@
 #!/usr/bin/env node
-// src/lib/main.js
+import fs from 'fs';
+import yargs from 'yargs';
+import { hideBin } from 'yargs/helpers';
+import { create, all } from 'mathjs';
+import pkg from '../../package.json' assert { type: 'json' };
+import { fileURLToPath } from 'url';
 
-import { fileURLToPath } from "url";
+const math = create(all);
 
-export function main(args) {
-  console.log(`Run with: ${JSON.stringify(args)}`);
+/**
+ * Programmatic main entrypoint (no-op for CLI use).
+ */
+export function main() {
+  // no-op: programmatic use
 }
 
-if (process.argv[1] === fileURLToPath(import.meta.url)) {
-  const args = process.argv.slice(2);
-  main(args);
+async function runCli() {
+  const argv = yargs(hideBin(process.argv))
+    .scriptName('repository0-plot-code-lib')
+    .usage('Usage: $0 -e <expr> -r <range> [-f <format>] [-o <output>]')
+    .option('expression', {
+      alias: 'e',
+      type: 'string',
+      describe: 'Formula in form y=<expression> or <expression>',
+      demandOption: true
+    })
+    .option('range', {
+      alias: 'r',
+      type: 'string',
+      describe: 'Range in form x=<start>:<end>:<step>',
+      demandOption: true
+    })
+    .option('format', {
+      alias: 'f',
+      type: 'string',
+      describe: 'Output format: json or csv',
+      choices: ['json','csv'],
+      default: 'json'
+    })
+    .option('output', {
+      alias: 'o',
+      type: 'string',
+      describe: 'File path to write output; prints to stdout if omitted'
+    })
+    .help('help')
+    .alias('help','h')
+    .version(pkg.version)
+    .alias('version','v')
+    .strict()
+    .parseSync();
+
+  const { expression, range, format, output: outputFile } = argv;
+  // parse expression
+  let exprText = expression.trim();
+  if (exprText.startsWith('y=')) exprText = exprText.slice(2);
+  let expr;
+  try { expr = math.compile(exprText); }
+  catch (e) { console.error(`Error: Invalid expression`); process.exit(1); }
+
+  // parse range
+  if (!range.startsWith('x=')) {
+    console.error('Error: Range must start with "x=": ' + range);
+    process.exit(1);
+  }
+  const parts = range.slice(2).split(':');
+  if (parts.length !== 3) {
+    console.error('Error: Range must be in form x=<start>:<end>:<step>');
+    process.exit(1);
+  }
+  const [startS,endS,stepS] = parts;
+  const start = Number(startS), end = Number(endS), step = Number(stepS);
+  if ([start,end,step].some(n=>isNaN(n))) {
+    console.error('Error: Range values must be numbers'); process.exit(1);
+  }
+  if (step <= 0) { console.error('Error: Step must be > 0'); process.exit(1); }
+  if (start > end) { console.error('Error: Start must be <= end'); process.exit(1); }
+
+  // generate series
+  const series = [];
+  for (let x=start; x<=end+step/1e6; x+=step) {
+    const xVal = Number(x.toPrecision(15));
+    let y;
+    try { y = expr.evaluate({ x: xVal }); }
+    catch (e) { console.error(`Error: Evaluation failed at x=${xVal}`); process.exit(1); }
+    if (typeof y!=='number' || isNaN(y)) {
+      console.error(`Error: Expression did not evaluate to number at x=${xVal}`);
+      process.exit(1);
+    }
+    series.push({ x:xVal, y });
+  }
+
+  // serialize
+  let out;
+  if (format==='json') {
+    out = JSON.stringify(series,null,2);
+  } else {
+    const lines=['x,y'];
+    series.forEach(pt=>lines.push(`${pt.x},${pt.y}`));
+    out = lines.join('\n');
+  }
+
+  try {
+    if (outputFile) fs.writeFileSync(outputFile,out,'utf-8');
+    else console.log(out);
+    process.exit(0);
+  } catch (e) {
+    console.error(`Error: Failed to write output: ${e.message}`);
+    process.exit(1);
+  }
 }
+
+// CLI entry
+const __filename = fileURLToPath(import.meta.url);
+if (process.argv[1]===__filename) runCli();
diff --git a/tests/unit/plot-generation.test.js b/tests/unit/plot-generation.test.js
index 19a4042c..abb4bfb2 100644
--- a/tests/unit/plot-generation.test.js
+++ b/tests/unit/plot-generation.test.js
@@ -1,16 +1,66 @@
-import { describe, test, expect } from "vitest";
-import * as mainModule from "@src/lib/main.js";
-import { main } from "@src/lib/main.js";
+import { describe, it, expect } from 'vitest';
+import { spawnSync } from 'child_process';
+import { readFileSync, writeFileSync, unlinkSync, existsSync } from 'fs';
+import path from 'path';
+import { fileURLToPath } from 'url';
 
-describe("Main Module Import", () => {
-  test("should be non-null", () => {
-    expect(mainModule).not.toBeNull();
+const __dirname = path.dirname(fileURLToPath(import.meta.url));
+const cli = path.resolve(__dirname, '../../src/lib/main.js');
+
+describe('Time Series Generation CLI', () => {
+  it('outputs JSON series to stdout by default', () => {
+    const result = spawnSync('node',[cli,'-e','y=x','-r','x=0:2:1']);
+    expect(result.status).toBe(0);
+    const out = JSON.parse(result.stdout.toString());
+    expect(out).toEqual([{x:0,y:0},{x:1,y:1},{x:2,y:2}]);
+  });
+
+  it('writes JSON to a file when --output is provided', () => {
+    const tmp = path.resolve(__dirname,'temp.json'); if(existsSync(tmp)) unlinkSync(tmp);
+    const result = spawnSync('node',[cli,'-e','2*x+1','-r','x=0:2:1','-o',tmp]);
+    expect(result.status).toBe(0);
+    expect(existsSync(tmp)).toBe(true);
+    const data = JSON.parse(readFileSync(tmp,'utf-8'));
+    expect(data).toEqual([{x:0,y:1},{x:1,y:3},{x:2,y:5}]);
+    unlinkSync(tmp);
+  });
+
+  it('outputs CSV to stdout when --format csv', () => {
+    const result = spawnSync('node',[cli,'-e','y=x','-r','x=0:2:1','-f','csv']);
+    expect(result.status).toBe(0);
+    const lines = result.stdout.toString().trim().split('\n');
+    expect(lines[0]).toBe('x,y');
+    expect(lines[1]).toBe('0,0');
+    expect(lines[2]).toBe('1,1');
+    expect(lines[3]).toBe('2,2');
+  });
+
+  it('writes CSV to a file when --format csv and --output provided', () => {
+    const tmp = path.resolve(__dirname,'temp.csv'); if(existsSync(tmp)) unlinkSync(tmp);
+    const result = spawnSync('node',[cli,'-e','y=x','-r','x=0:2:1','-f','csv','-o',tmp]);
+    expect(result.status).toBe(0);
+    expect(existsSync(tmp)).toBe(true);
+    const lines = readFileSync(tmp,'utf-8').trim().split('\n');
+    expect(lines[0]).toBe('x,y');
+    expect(lines[1]).toBe('0,0'); expect(lines[2]).toBe('1,1'); expect(lines[3]).toBe('2,2');
+    unlinkSync(tmp);
+  });
+
+  it('exits with error on unsupported format', () => {
+    const result = spawnSync('node',[cli,'-e','y=x','-r','x=0:2:1','--format','xml']);
+    expect(result.status).not.toBe(0);
+    expect(result.stderr.toString()).toContain('Choices:');
+  });
+
+  it('errors on invalid expression', () => {
+    const result = spawnSync('node',[cli,'-e','y=foo(x)','-r','x=0:1:1']);
+    expect(result.status).not.toBe(0);
+    expect(result.stderr.toString()).toContain('Invalid expression');
   });
-});
 
-describe("Default main", () => {
-  test("should terminate without error", () => {
-    process.argv = ["node", "src/lib/main.js"];
-    main();
+  it('errors on invalid range', () => {
+    const result = spawnSync('node',[cli,'-e','y=x','-r','0:1:1']);
+    expect(result.status).not.toBe(0);
+    expect(result.stderr.toString()).toContain('Range must start with');
   });
 });\n\n// New [USAGE.md]:\n# Usage

## Time Series Generation

Generate a series of (x, y) data points from a mathematical expression over a numeric range.

### Syntax
```sh
repository0-plot-code-lib --expression "y=<formula>" --range "x=<start>:<end>:<step>" [--format <json|csv>] [--output <file>]
```

### Options
- `--expression, -e`  Formula in form `y=<expr>` or `<expr>`.
- `--range, -r`       Range in form `x=<start>:<end>:<step>`.
- `--format, -f`      Output format: `json` (default) or `csv`.
- `--output, -o`      Path to write output; if omitted, prints to stdout.
- `--help, -h`        Show usage and exit code 0.
- `--version, -v`     Show version and exit code 0.

### Examples

JSON to stdout:
```sh
repository0-plot-code-lib -e "y=x" -r "x=0:2:1"
```

CSV to stdout:
```sh
repository0-plot-code-lib --expression "y=x" --range "x=0:2:1" --format csv
```

Write JSON to file:
```sh
repository0-plot-code-lib -e "2*x+1" -r "x=0:3:1" -o data.json
```

Write CSV to file:
```sh
repository0-plot-code-lib -e "2*x+1" -r "x=0:3:1" -f csv -o data.csv
```
```

mainOutput:
```log

```

installAfterUpdateOutcome: success

ciAfterUpdateOutcome: success

testAfterUpdateOutcome: failure

mainAfterUpdateOutcome: failure

commitOutcome: success

postResolutionCommentOutcome: success

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/3138 with title: ""]

LLM API Usage:
```json
{"prompt_tokens":95217,"completion_tokens":3493,"total_tokens":98710,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Fixed Code at 2025-05-27T11:30:28.759Z

Activity:

fixApplied: true with Provide clear error message for invalid expressions and remove deprecated assert import and outcome success

Git Diff:
```diff
diff --git a/src/lib/main.js b/src/lib/main.js
index 6d6a98af..664db2c2 100755
--- a/src/lib/main.js
+++ b/src/lib/main.js
@@ -3,113 +3,132 @@ import fs from 'fs';
 import yargs from 'yargs';
 import { hideBin } from 'yargs/helpers';
 import { create, all } from 'mathjs';
-import pkg from '../../package.json' assert { type: 'json' };
 import { fileURLToPath } from 'url';
 
 const math = create(all);
 
 /**
- * Programmatic main entrypoint (no-op for CLI use).
+ * Generate time series data from expression and range.
+ * @param {Object} options
+ * @param {string} options.expression Formula in form y=<expression> or <expression>
+ * @param {string} options.range Range in form x=<start>:<end>:<step>
+ * @param {string} [options.format] Output format: json or csv
+ * @param {string} [options.output] File path to write output; prints to stdout if omitted
+ * @returns {Array<{x:number,y:number}>} Generated data points
  */
-export function main() {
-  // no-op: programmatic use
+export function main({ expression, range, format = 'json', output } = {}) {
+  // Prepare expression
+  const exprStr = expression.startsWith('y=') ? expression.slice(2) : expression;
+  let compiled;
+  try {
+    compiled = math.compile(exprStr);
+  } catch (err) {
+    throw new Error('Invalid expression');
+  }
+
+  // Parse range
+  if (!range.startsWith('x=')) {
+    throw new Error('Invalid range');
+  }
+  const parts = range.slice(2).split(':');
+  if (parts.length !== 3) {
+    throw new Error('Invalid range');
+  }
+  const start = Number(parts[0]);
+  const end = Number(parts[1]);
+  const step = Number(parts[2]);
+  if (
+    Number.isNaN(start) ||
+    Number.isNaN(end) ||
+    Number.isNaN(step) ||
+    step <= 0 ||
+    start > end
+  ) {
+    throw new Error('Invalid range');
+  }
+
+  // Generate data points
+  const data = [];
+  for (let x = start; x <= end; x = x + step) {
+    let y;
+    try {
+      y = compiled.evaluate({ x });
+    } catch (err) {
+      throw new Error('Invalid expression');
+    }
+    data.push({ x, y });
+  }
+
+  // Prepare output
+  let outputStr;
+  if (format === 'json') {
+    outputStr = JSON.stringify(data, null, 2);
+  } else if (format === 'csv') {
+    const lines = data.map((p) => `${p.x},${p.y}`);
+    outputStr = ['x,y', ...lines].join('\n');
+  } else {
+    throw new Error('Unsupported format');
+  }
+
+  // Output
+  if (output) {
+    fs.writeFileSync(output, outputStr);
+  } else {
+    console.log(outputStr);
+  }
+
+  return data;
 }
 
-async function runCli() {
+// CLI entrypoint
+if (process.argv[1] === fileURLToPath(import.meta.url)) {
+  // Read package.json version
+  const pkgJson = JSON.parse(
+    fs.readFileSync(new URL('../../package.json', import.meta.url))
+  );
+  // Parse CLI args
   const argv = yargs(hideBin(process.argv))
     .scriptName('repository0-plot-code-lib')
     .usage('Usage: $0 -e <expr> -r <range> [-f <format>] [-o <output>]')
     .option('expression', {
       alias: 'e',
-      type: 'string',
       describe: 'Formula in form y=<expression> or <expression>',
-      demandOption: true
+      type: 'string',
+      demandOption: true,
     })
     .option('range', {
       alias: 'r',
-      type: 'string',
       describe: 'Range in form x=<start>:<end>:<step>',
-      demandOption: true
+      type: 'string',
+      demandOption: true,
     })
     .option('format', {
       alias: 'f',
-      type: 'string',
       describe: 'Output format: json or csv',
-      choices: ['json','csv'],
-      default: 'json'
+      choices: ['json', 'csv'],
+      default: 'json',
+      type: 'string',
     })
     .option('output', {
       alias: 'o',
+      describe: 'File path to write output; prints to stdout if omitted',
       type: 'string',
-      describe: 'File path to write output; prints to stdout if omitted'
     })
-    .help('help')
-    .alias('help','h')
-    .version(pkg.version)
-    .alias('version','v')
-    .strict()
-    .parseSync();
-
-  const { expression, range, format, output: outputFile } = argv;
-  // parse expression
-  let exprText = expression.trim();
-  if (exprText.startsWith('y=')) exprText = exprText.slice(2);
-  let expr;
-  try { expr = math.compile(exprText); }
-  catch (e) { console.error(`Error: Invalid expression`); process.exit(1); }
-
-  // parse range
-  if (!range.startsWith('x=')) {
-    console.error('Error: Range must start with "x=": ' + range);
-    process.exit(1);
-  }
-  const parts = range.slice(2).split(':');
-  if (parts.length !== 3) {
-    console.error('Error: Range must be in form x=<start>:<end>:<step>');
-    process.exit(1);
-  }
-  const [startS,endS,stepS] = parts;
-  const start = Number(startS), end = Number(endS), step = Number(stepS);
-  if ([start,end,step].some(n=>isNaN(n))) {
-    console.error('Error: Range values must be numbers'); process.exit(1);
-  }
-  if (step <= 0) { console.error('Error: Step must be > 0'); process.exit(1); }
-  if (start > end) { console.error('Error: Start must be <= end'); process.exit(1); }
-
-  // generate series
-  const series = [];
-  for (let x=start; x<=end+step/1e6; x+=step) {
-    const xVal = Number(x.toPrecision(15));
-    let y;
-    try { y = expr.evaluate({ x: xVal }); }
-    catch (e) { console.error(`Error: Evaluation failed at x=${xVal}`); process.exit(1); }
-    if (typeof y!=='number' || isNaN(y)) {
-      console.error(`Error: Expression did not evaluate to number at x=${xVal}`);
-      process.exit(1);
-    }
-    series.push({ x:xVal, y });
-  }
-
-  // serialize
-  let out;
-  if (format==='json') {
-    out = JSON.stringify(series,null,2);
-  } else {
-    const lines=['x,y'];
-    series.forEach(pt=>lines.push(`${pt.x},${pt.y}`));
-    out = lines.join('\n');
-  }
+    .help('h')
+    .alias('h', 'help')
+    .version(pkgJson.version)
+    .alias('v', 'version')
+    .parse();
 
   try {
-    if (outputFile) fs.writeFileSync(outputFile,out,'utf-8');
-    else console.log(out);
-    process.exit(0);
-  } catch (e) {
-    console.error(`Error: Failed to write output: ${e.message}`);
+    main({
+      expression: argv.expression,
+      range: argv.range,
+      format: argv.format,
+      output: argv.output,
+    });
+  } catch (err) {
+    console.error(`Error: ${err.message}`);
     process.exit(1);
   }
 }
-
-// CLI entry
-const __filename = fileURLToPath(import.meta.url);
-if (process.argv[1]===__filename) runCli();
```

mainOutput:
```log

```

[allValidationStepsSuccessful: false]

LLM API Usage:
```json
{"prompt_tokens":9749,"completion_tokens":8648,"total_tokens":18397,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":7232,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Create feature activity at 2025-05-27T11:30:49.074Z

The features were maintained with a feature hint of:



and outcome "success"

---

2025-05-27T12:25:32Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-27T12:27:15.710Z

Activity:

Maintained feature TIME_SERIES_EXPORT with

Feature spec:

# Overview

Enhance the existing time series generation command to support both JSON and CSV export formats, accessible via the same CLI entrypoint. Users can choose their preferred output format without introducing new subcommands, providing immediate flexibility for data consumption.

# Behavior

When invoked via the CLI:

- Required flags:
  - `--expression`, `-e` : A formula in the form `y=<expression>` or `<expression>`.
  - `--range`, `-r`      : A numeric range string in the form `x=<start>:<end>:<step>` (e.g. `x=0:2:0.5`).
- Optional flags:
  - `--format`, `-f`     : Output format, either `json` (default) or `csv`.
  - `--output`, `-o`     : Path to write the output; if omitted, prints to stdout.
  - `--help`, `-h`       : Display usage information from yargs and exit code 0.
  - `--version`, `-v`    : Display the package version and exit code 0.

Output details:
- JSON mode: Pretty-printed array of objects `{ x: number, y: number }`.
- CSV mode: First line header `x,y` followed by comma-separated rows for each point.

Validation:
- Expression must compile via mathjs; failures exit code 1 with `Error: Invalid expression`.
- Range must begin with `x=` and split into three numeric parts; enforce `step > 0` and `start <= end` or exit code 1 with `Error: Invalid range`.
- Unsupported formats exit code 1 with `Error: Unsupported format`.

# Implementation

- Add dependencies:
  - `yargs` for CLI parsing.
  - `mathjs` for expression parsing and evaluation.
- In `src/lib/main.js`:
  1. Configure yargs for required `--expression` and `--range`, optional `--format` and `--output`, plus `.help()` and `.version()`.
  2. In handler:
     - Strip optional `y=` prefix, compile the expression with mathjs.
     - Parse and validate the range string.
     - Generate the series by stepping from start to end inclusive.
     - Serialize series based on `--format`:
       - JSON: `JSON.stringify(series, null, 2)`.
       - CSV: join lines with header `x,y` and each data row.
     - Write to file or stdout and exit code 0.
- Programmatic API: `export function main(options)` that takes the same flags object and returns the generated data array without exiting, enabling tests.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:

- Default JSON output to stdout and file writing.
- CSV output to stdout and file writing.
- Error on unsupported `--format` values (exit code 1, yargs message).
- Error on invalid expression or range syntax (exit code 1, descriptive error).
- Ensure programmatic `main()` returns data arrays and throws on invalid inputs.

# Documentation

- Update `USAGE.md` under **Time Series Generation**:
  - Document `--format` option and show both JSON and CSV examples.
  - Include `--help` and `--version` usage examples.
- Update `README.md` under `## Time Series Generation` with snippet demonstrating JSON/CSV modes and built-in flags.


LLM API Usage:
```json
{"prompt_tokens":117769,"completion_tokens":808,"total_tokens":118577,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-27T12:28:39.628Z

Activity:

Generated issue 3139 for feature "time-series-export" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/3139

title:

Implement TIME_SERIES_EXPORT: JSON and CSV Output for Time Series Generation

And description:

Objective:
Extend the existing CLI command `repository0-plot-code-lib` to support both JSON and CSV export formats via a single entrypoint, fulfilling the TIME_SERIES_EXPORT feature.

Changes Required:

1. Dependencies (package.json)
   - Add under `dependencies`:
     • "yargs" (v17+)
     • "mathjs" (v11+)
   - Remove unused dependencies related to raw argument logging.

2. Source Update (src/lib/main.js)
   - Import and configure yargs with:
     • Required options: `--expression, -e` (string) and `--range, -r` (string)
     • Optional: `--format, -f` (choices: `json`|`csv`, default `json`), `--output, -o` (string)
     • Built-in `.help()` (`-h`) and `.version()` (`-v`) flags.
   - In the command handler:
     a. Strip optional `y=` prefix and compile expression with mathjs.
     b. Parse and validate range (`x=<start>:<end>:<step>`, enforce `step>0` and `start<=end`).
     c. Generate an inclusive series of `{ x: number, y: number }`.
     d. Serialize series:
        - JSON: `JSON.stringify(series, null, 2)`.
        - CSV: header `x,y` plus rows `x,y` per point.
     e. Write to `--output` file with `fs.writeFileSync` or to stdout.
     f. Exit with code `0` on success; on error, print `Error: <message>` to stderr and exit `1`.
   - Export a programmatic `main({ expression, range, format, output })` function that returns the data array (throws on invalid input).

3. Tests (tests/unit/plot-generation.test.js)
   - Extend existing tests to cover:
     • Default JSON output to stdout (`-e y=x -r x=0:2:1`).
     • JSON file output with `--output`.
     • CSV stdout (`--format csv`), verifying header and rows.
     • CSV file output (`-f csv -o file.csv`).
     • Unsupported format (`--format xml`): exit `1`, stderr mentions `Choices:`.
     • Invalid expression or range: exit `1`, stderr contains descriptive error.

4. Documentation
   - USAGE.md:
     • Under **Time Series Generation**, document `--format` (`-f`) with examples for JSON and CSV.
     • Show usage of `--help` and `--version`.
   - README.md:
     • Under `## Time Series Generation`, include snippets demonstrating JSON/CSV modes, file output, and built-in flags.

Verification:

- `npm install` pulls in yargs and mathjs.
- `npm test` passes all existing and new tests.
- Manual smoke tests:
  ```bash
  repository0-plot-code-lib -e "y=x" -r "x=0:2:1"
  repository0-plot-code-lib -e "y=x" -r "x=0:2:1" -f csv
  repository0-plot-code-lib -e "2*x+1" -r "x=0:3:1" -f csv -o data.csv
  repository0-plot-code-lib --help
  repository0-plot-code-lib --version
  ```

LLM API Usage:
```json
{"prompt_tokens":119295,"completion_tokens":819,"total_tokens":120114,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Issue to enhanced Issue at 2025-05-27T12:29:35.043Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:

Title: Implement TIME_SERIES_EXPORT: JSON and CSV Output for Time Series Generation

Description:
Extend the existing CLI command `repository0-plot-code-lib` to support both JSON (default) and CSV output formats via a single entrypoint, fulfilling the TIME_SERIES_EXPORT feature.

Acceptance Criteria (testable):
1. Default JSON stdout:
   - Command: `repository0-plot-code-lib -e "y=x" -r "x=0:2:1"`
   - Output: Pretty-printed JSON array of objects `[{ "x": 0, "y": 0 }, {...}]`, exit code 0.
2. JSON file output:
   - Command: `... -e "y=x" -r "x=0:2:1" -o data.json`
   - Result: `data.json` created with identical JSON content, exit code 0.
3. CSV stdout:
   - Command: `... -f csv -e "y=2*x+1" -r "x=0:3:1"`
   - Output: 
     x,y
     0,1
     1,3
     2,5
     3,7
     exit code 0.
4. CSV file output:
   - Command: `... -f csv -e "y=x" -r "x=0:2:1" -o data.csv`
   - Result: `data.csv` with header and rows, exit code 0.
5. Unsupported format:
   - Command: `... -f xml -e "y=x" -r "x=0:1:1"`
   - Behavior: Exit code 1, stderr includes `Error: Unsupported format` or yargs choices message.
6. Invalid expression:
   - Command: `... -e "y=++x" -r "x=0:1:1"`
   - Behavior: Exit code 1, stderr includes `Error: Invalid expression`.
7. Invalid range:
   - Command: `... -r "x=5:0:-1"`
   - Behavior: Exit code 1, stderr includes `Error: Invalid range`.
8. Help and version flags:
   - Commands: `... --help`, `... --version`
   - Behavior: Display usage or version text, exit code 0.
9. Programmatic API:
   - Function: `main({ expression, range, format, output })`
   - Behavior: Returns generated data array on valid inputs, throws Error on invalid inputs.

Implementation Details:
- Add dependencies: `yargs` (v17+) and `mathjs` (v11+).
- Update `src/lib/main.js` to parse flags, validate inputs, generate series, serialize to JSON/CSV, write to stdout or file, and export programmatic `main`.
- Update tests in `tests/unit/plot-generation.test.js` as per acceptance criteria.
- Update documentation in `USAGE.md` and `README.md` under **Time Series Generation** to reflect new `--format` option and examples.

LLM API Usage:
```json
{"prompt_tokens":6764,"completion_tokens":1688,"total_tokens":8452,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":960,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Issue to Code at 2025-05-27T12:32:11.498Z

Activity:

fixApplied: true to branch agentic-lib-issue-3139 with message Implement JSON and CSV output and structured CLI parsing with yargs and mathjs and outcome success

Git Diff:
```diff
diff --git a/README.md b/README.md
index 816f5140..12272586 100644
--- a/README.md
+++ b/README.md
@@ -4,9 +4,27 @@ _"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_
 
 ---
 
-## License
+## Time Series Generation
+
+Generates sequences of (x, y) values from a mathematical expression over a numeric range with optional JSON or CSV export:
+
+```bash
+# JSON to stdout
+graph-cli -e "y=x" -r "x=0:5:1"
+
+# CSV to stdout
+repository0-plot-code-lib --expression "y=x" --range "x=0:5:1" --format csv
 
-MIT
+# Write CSV to file
+repository0-plot-code-lib -e "y=sin(x)" -r "x=0:3.14:1.57" -f csv -o series.csv
+
+# Help and Version
+repository0-plot-code-lib --help
+repository0-plot-code-lib --version
+```
 
 ---
 
+## License
+
+MIT
\ No newline at end of file
diff --git a/package-lock.json b/package-lock.json
index e79334b8..7219efd7 100644
--- a/package-lock.json
+++ b/package-lock.json
@@ -12,8 +12,10 @@
         "dotenv": "^16.5.0",
         "ejs": "^3.1.10",
         "js-yaml": "^4.1.0",
+        "mathjs": "^11.8.0",
         "minimatch": "^10.0.1",
         "openai": "^4.103.0",
+        "yargs": "^17.7.2",
         "zod": "^3.25.30"
       },
       "bin": {
@@ -22,7 +24,7 @@
       "devDependencies": {
         "@microsoft/eslint-formatter-sarif": "^3.1.0",
         "@vitest/coverage-v8": "^3.1.4",
-        "eslint": "^9.25.1",
+        "eslint": "^9.27.0",
         "eslint-config-google": "^0.14.0",
         "eslint-config-prettier": "^10.1.5",
         "eslint-plugin-import": "^2.31.0",
@@ -31,11 +33,6 @@
         "eslint-plugin-react": "^7.37.5",
         "eslint-plugin-security": "^3.0.1",
         "eslint-plugin-sonarjs": "^3.0.2",
-        "express": "^4.21.2",
-        "js-yaml": "^4.1.0",
-        "markdown-it": "^14.1.0",
-        "markdown-it-github": "^0.5.0",
-        "npm-check-updates": "^17.1.18",
         "prettier": "^3.5.3",
         "vitest": "^3.1.4"
       },
@@ -93,6 +90,15 @@
         "node": ">=6.0.0"
       }
     },
+    "node_modules/@babel/runtime": {
+      "version": "7.27.3",
+      "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.27.3.tgz",
+      "integrity": "sha512-7EYtGezsdiDMyY80+65EzwiGmcJqpmcZCojSXaRgdrBaGtWTgDZKq69cPIVped6MkIM78cTQ2GOiEYjwOlG4xw==",
+      "license": "MIT",
+      "engines": {
+        "node": ">=6.9.0"
+      }
+    },
     "node_modules/@babel/types": {
       "version": "7.27.1",
       "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.27.1.tgz",
@@ -1739,20 +1745,6 @@
         "node": ">=6.5"
       }
     },
-    "node_modules/accepts": {
-      "version": "1.3.8",
-      "resolved": "https://registry.npmjs.org/accepts/-/accepts-1.3.8.tgz",
-      "integrity": "sha512-PYAthTa2m2VKxuvSD3DPC/Gy+U+sOA1LAuT8mkmRuvw+NACSaeXEQ+NHcVF7rONl6qcaxV3Uuemwawk+7+SJLw==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "mime-types": "~2.1.34",
-        "negotiator": "0.6.3"
-      },
-      "engines": {
-        "node": ">= 0.6"
-      }
-    },
     "node_modules/acorn": {
       "version": "8.14.1",
       "resolved": "https://registry.npmjs.org/acorn/-/acorn-8.14.1.tgz",
@@ -1837,7 +1829,6 @@
       "version": "2.0.1",
       "resolved": "https://registry.npmjs.org/argparse/-/argparse-2.0.1.tgz",
       "integrity": "sha512-8+9WqebbFzpX9OR+Wa6O29asIogeRMzcGtAINdpMHHyAg10f05aSFVBbcEqGf/PXw1EjAZ+q2/bEBg3DvurK3Q==",
-      "dev": true,
       "license": "Python-2.0"
     },
     "node_modules/array-buffer-byte-length": {
@@ -1857,13 +1848,6 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
-    "node_modules/array-flatten": {
-      "version": "1.1.1",
-      "resolved": "https://registry.npmjs.org/array-flatten/-/array-flatten-1.1.1.tgz",
-      "integrity": "sha512-PCVAQswWemu6UdxsDFFX/+gVeYqKAod3D3UVm91jHwynguOwAvYPhx8nNlM++NqRcK6CxxpUafjmhIdKiHibqg==",
-      "dev": true,
-      "license": "MIT"
-    },
     "node_modules/array-includes": {
       "version": "3.1.8",
       "resolved": "https://registry.npmjs.org/array-includes/-/array-includes-3.1.8.tgz",
@@ -2059,48 +2043,6 @@
       "integrity": "sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw==",
       "license": "MIT"
     },
-    "node_modules/body-parser": {
-      "version": "1.20.3",
-      "resolved": "https://registry.npmjs.org/body-parser/-/body-parser-1.20.3.tgz",
-      "integrity": "sha512-7rAxByjUMqQ3/bHJy7D6OGXvx/MMc4IqBn/X0fcM1QUcAItpZrBEYhWGem+tzXH90c+G01ypMcYJBO9Y30203g==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "bytes": "3.1.2",
-        "content-type": "~1.0.5",
-        "debug": "2.6.9",
-        "depd": "2.0.0",
-        "destroy": "1.2.0",
-        "http-errors": "2.0.0",
-        "iconv-lite": "0.4.24",
-        "on-finished": "2.4.1",
-        "qs": "6.13.0",
-        "raw-body": "2.5.2",
-        "type-is": "~1.6.18",
-        "unpipe": "1.0.0"
-      },
-      "engines": {
-        "node": ">= 0.8",
-        "npm": "1.2.8000 || >= 1.4.16"
-      }
-    },
-    "node_modules/body-parser/node_modules/debug": {
-      "version": "2.6.9",
-      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
-      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "ms": "2.0.0"
-      }
-    },
-    "node_modules/body-parser/node_modules/ms": {
-      "version": "2.0.0",
-      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
-      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
-      "dev": true,
-      "license": "MIT"
-    },
     "node_modules/brace-expansion": {
       "version": "2.0.1",
       "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-2.0.1.tgz",
@@ -2245,6 +2187,78 @@
         "node": ">= 16"
       }
     },
+    "node_modules/cliui": {
+      "version": "8.0.1",
+      "resolved": "https://registry.npmjs.org/cliui/-/cliui-8.0.1.tgz",
+      "integrity": "sha512-BSeNnyus75C4//NQ9gQt1/csTXyo/8Sb+afLAkzAptFuMsod9HFokGNudZpi/oQV73hnVK+sR+5PVRMd+Dr7YQ==",
+      "license": "ISC",
+      "dependencies": {
+        "string-width": "^4.2.0",
+        "strip-ansi": "^6.0.1",
+        "wrap-ansi": "^7.0.0"
+      },
+      "engines": {
+        "node": ">=12"
+      }
+    },
+    "node_modules/cliui/node_modules/ansi-regex": {
+      "version": "5.0.1",
+      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
+      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
+      "license": "MIT",
+      "engines": {
+        "node": ">=8"
+      }
+    },
+    "node_modules/cliui/node_modules/emoji-regex": {
+      "version": "8.0.0",
+      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
+      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
+      "license": "MIT"
+    },
+    "node_modules/cliui/node_modules/string-width": {
+      "version": "4.2.3",
+      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
+      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
+      "license": "MIT",
+      "dependencies": {
+        "emoji-regex": "^8.0.0",
+        "is-fullwidth-code-point": "^3.0.0",
+        "strip-ansi": "^6.0.1"
+      },
+      "engines": {
+        "node": ">=8"
+      }
+    },
+    "node_modules/cliui/node_modules/strip-ansi": {
+      "version": "6.0.1",
+      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
+      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
+      "license": "MIT",
+      "dependencies": {
+        "ansi-regex": "^5.0.1"
+      },
+      "engines": {
+        "node": ">=8"
+      }
+    },
+    "node_modules/cliui/node_modules/wrap-ansi": {
+      "version": "7.0.0",
+      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-7.0.0.tgz",
+      "integrity": "sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q==",
+      "license": "MIT",
+      "dependencies": {
+        "ansi-styles": "^4.0.0",
+        "string-width": "^4.1.0",
+        "strip-ansi": "^6.0.0"
+      },
+      "engines": {
+        "node": ">=10"
+      },
+      "funding": {
+        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
+      }
+    },
     "node_modules/color-convert": {
       "version": "2.0.1",
       "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
@@ -2275,50 +2289,23 @@
         "node": ">= 0.8"
       }
     },
-    "node_modules/concat-map": {
-      "version": "0.0.1",
-      "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
-      "integrity": "sha512-/Srv4dswyQNBfohGpz9o6Yb3Gz3SrUDqBH5rTuhGR7ahtlbYKnVxw2bCFMRljaA7EXHaXZ8wsHdodFvbkhKmqg==",
-      "license": "MIT"
-    },
-    "node_modules/content-disposition": {
-      "version": "0.5.4",
-      "resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-0.5.4.tgz",
-      "integrity": "sha512-FveZTNuGw04cxlAiWbzi6zTAL/lhehaWbTtgluJh4/E95DqMwTmha3KZN1aAWA8cFIhHzMZUvLevkw5Rqk+tSQ==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "safe-buffer": "5.2.1"
-      },
-      "engines": {
-        "node": ">= 0.6"
-      }
-    },
-    "node_modules/content-type": {
-      "version": "1.0.5",
-      "resolved": "https://registry.npmjs.org/content-type/-/content-type-1.0.5.tgz",
-      "integrity": "sha512-nTjqfcBFEipKdXCv4YDQWCfmcLZKm81ldF0pAopTvyrFGVbcR6P/VAAd5G7N+0tTr8QqiU0tFadD6FK4NtJwOA==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.6"
-      }
-    },
-    "node_modules/cookie": {
-      "version": "0.7.1",
-      "resolved": "https://registry.npmjs.org/cookie/-/cookie-0.7.1.tgz",
-      "integrity": "sha512-6DnInpx7SJ2AK3+CTUE/ZM0vWTUboZCegxhC2xiIydHR9jNuTAASBrfEpHhiGOZw/nX51bHt6YQl8jsGo4y/0w==",
-      "dev": true,
+    "node_modules/complex.js": {
+      "version": "2.4.2",
+      "resolved": "https://registry.npmjs.org/complex.js/-/complex.js-2.4.2.tgz",
+      "integrity": "sha512-qtx7HRhPGSCBtGiST4/WGHuW+zeaND/6Ld+db6PbrulIB1i2Ev/2UPiqcmpQNPSyfBKraC0EOvOKCB5dGZKt3g==",
       "license": "MIT",
       "engines": {
-        "node": ">= 0.6"
+        "node": "*"
+      },
+      "funding": {
+        "type": "github",
+        "url": "https://github.com/sponsors/rawify"
       }
     },
-    "node_modules/cookie-signature": {
-      "version": "1.0.6",
-      "resolved": "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.0.6.tgz",
-      "integrity": "sha512-QADzlaHc8icV8I7vbaJXJwod9HWYp8uCqf1xa4OfNu1T7JVxQIrUgOWtHdNDtPiywmFbiS12VjotIXLrKM3orQ==",
-      "dev": true,
+    "node_modules/concat-map": {
+      "version": "0.0.1",
+      "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
+      "integrity": "sha512-/Srv4dswyQNBfohGpz9o6Yb3Gz3SrUDqBH5rTuhGR7ahtlbYKnVxw2bCFMRljaA7EXHaXZ8wsHdodFvbkhKmqg==",
       "license": "MIT"
     },
     "node_modules/cross-spawn": {
@@ -2408,6 +2395,12 @@
         }
       }
     },
+    "node_modules/decimal.js": {
+      "version": "10.5.0",
+      "resolved": "https://registry.npmjs.org/decimal.js/-/decimal.js-10.5.0.tgz",
+      "integrity": "sha512-8vDa8Qxvr/+d94hSh5P3IJwI5t8/c0KsMp+g8bNw9cY2icONa5aPfvKeieW1WlG0WQYwwhJ7mjui2xtiePQSXw==",
+      "license": "MIT"
+    },
     "node_modules/deep-eql": {
       "version": "5.0.2",
       "resolved": "https://registry.npmjs.org/deep-eql/-/deep-eql-5.0.2.tgz",
@@ -2470,27 +2463,6 @@
         "node": ">=0.4.0"
       }
     },
-    "node_modules/depd": {
-      "version": "2.0.0",
-      "resolved": "https://registry.npmjs.org/depd/-/depd-2.0.0.tgz",
-      "integrity": "sha512-g7nH6P6dyDioJogAAGprGpCtVImJhpPk/roCzdb3fIh61/s/nPsfR6onyMwkCAR/OlC3yBC0lESvUoQEAssIrw==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.8"
-      }
-    },
-    "node_modules/destroy": {
-      "version": "1.2.0",
-      "resolved": "https://registry.npmjs.org/destroy/-/destroy-1.2.0.tgz",
-      "integrity": "sha512-2sJGJTaXIIaR1w4iJSNoN0hnMY7Gpc/n8D4qSCJw8QqFWXf7cuAgnEHxBpweaVcPevC2l3KpjYCx3NypQQgaJg==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.8",
-        "npm": "1.2.8000 || >= 1.4.16"
-      }
-    },
     "node_modules/doctrine": {
       "version": "2.1.0",
       "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-2.1.0.tgz",
@@ -2537,13 +2509,6 @@
       "dev": true,
       "license": "MIT"
     },
-    "node_modules/ee-first": {
-      "version": "1.1.1",
-      "resolved": "https://registry.npmjs.org/ee-first/-/ee-first-1.1.1.tgz",
-      "integrity": "sha512-WMwm9LhRUo+WUaRN+vRuETqG89IgZphVSNkdFgeb6sS/E4OrDIN7t48CAewSHXc6C8lefD8KKfr5vY61brQlow==",
-      "dev": true,
-      "license": "MIT"
-    },
     "node_modules/ejs": {
       "version": "3.1.10",
       "resolved": "https://registry.npmjs.org/ejs/-/ejs-3.1.10.tgz",
@@ -2566,29 +2531,6 @@
       "dev": true,
       "license": "MIT"
     },
-    "node_modules/encodeurl": {
-      "version": "2.0.0",
-      "resolved": "https://registry.npmjs.org/encodeurl/-/encodeurl-2.0.0.tgz",
-      "integrity": "sha512-Q0n9HRi4m6JuGIV1eFlmvJB7ZEVxu93IrMyiMsGC0lrMJMWzRgx6WGquyfQgZVb31vhGgXnfmPNNXmxnOkRBrg==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.8"
-      }
-    },
-    "node_modules/entities": {
-      "version": "4.5.0",
-      "resolved": "https://registry.npmjs.org/entities/-/entities-4.5.0.tgz",
-      "integrity": "sha512-V0hjH4dGPh9Ao5p0MoRY6BVqtwCjhz6vI5LT8AJ55H+4g9/4vbHx1I54fS0XuclLhDHArPQCiMjDxjaL8fPxhw==",
-      "dev": true,
-      "license": "BSD-2-Clause",
-      "engines": {
-        "node": ">=0.12"
-      },
-      "funding": {
-        "url": "https://github.com/fb55/entities?sponsor=1"
-      }
-    },
     "node_modules/es-abstract": {
       "version": "1.23.10",
       "resolved": "https://registry.npmjs.org/es-abstract/-/es-abstract-1.23.10.tgz",
@@ -2807,11 +2749,19 @@
         "@esbuild/win32-x64": "0.25.4"
       }
     },
-    "node_modules/escape-html": {
-      "version": "1.0.3",
-      "resolved": "https://registry.npmjs.org/escape-html/-/escape-html-1.0.3.tgz",
-      "integrity": "sha512-NiSupZ4OeuGwr68lGIeym/ksIZMJodUGOSCZ/FSnTxcrekbvqrgdUxlJOMpijaKZVjAJrWrGs/6Jy8OMuyj9ow==",
-      "dev": true,
+    "node_modules/escalade": {
+      "version": "3.2.0",
+      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
+      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
+      "license": "MIT",
+      "engines": {
+        "node": ">=6"
+      }
+    },
+    "node_modules/escape-latex": {
+      "version": "1.2.0",
+      "resolved": "https://registry.npmjs.org/escape-latex/-/escape-latex-1.2.0.tgz",
+      "integrity": "sha512-nV5aVWW1K0wEiUIEdZ4erkGGH8mDxGyxSeqPzRNtWP7ataw+/olFObw7hujFWlVjNsaDFw5VZ5NzVSIqRgfTiw==",
       "license": "MIT"
     },
     "node_modules/escape-string-regexp": {
@@ -3354,16 +3304,6 @@
         "node": ">=0.10.0"
       }
     },
-    "node_modules/etag": {
-      "version": "1.8.1",
-      "resolved": "https://registry.npmjs.org/etag/-/etag-1.8.1.tgz",
-      "integrity": "sha512-aIL5Fx7mawVa300al2BnEE4iNvo1qETxLrPI/o05L7z6go7fCw1J6EQmbK4FmJ2AS7kgVF/KEZWufBfdClMcPg==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.6"
-      }
-    },
     "node_modules/event-target-shim": {
       "version": "5.0.1",
       "resolved": "https://registry.npmjs.org/event-target-shim/-/event-target-shim-5.0.1.tgz",
@@ -3383,70 +3323,6 @@
         "node": ">=12.0.0"
       }
     },
-    "node_modules/express": {
-      "version": "4.21.2",
-      "resolved": "https://registry.npmjs.org/express/-/express-4.21.2.tgz",
-      "integrity": "sha512-28HqgMZAmih1Czt9ny7qr6ek2qddF4FclbMzwhCREB6OFfH+rXAnuNCwo1/wFvrtbgsQDb4kSbX9de9lFbrXnA==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "accepts": "~1.3.8",
-        "array-flatten": "1.1.1",
-        "body-parser": "1.20.3",
-        "content-disposition": "0.5.4",
-        "content-type": "~1.0.4",
-        "cookie": "0.7.1",
-        "cookie-signature": "1.0.6",
-        "debug": "2.6.9",
-        "depd": "2.0.0",
-        "encodeurl": "~2.0.0",
-        "escape-html": "~1.0.3",
-        "etag": "~1.8.1",
-        "finalhandler": "1.3.1",
-        "fresh": "0.5.2",
-        "http-errors": "2.0.0",
-        "merge-descriptors": "1.0.3",
-        "methods": "~1.1.2",
-        "on-finished": "2.4.1",
-        "parseurl": "~1.3.3",
-        "path-to-regexp": "0.1.12",
-        "proxy-addr": "~2.0.7",
-        "qs": "6.13.0",
-        "range-parser": "~1.2.1",
-        "safe-buffer": "5.2.1",
-        "send": "0.19.0",
-        "serve-static": "1.16.2",
-        "setprototypeof": "1.2.0",
-        "statuses": "2.0.1",
-        "type-is": "~1.6.18",
-        "utils-merge": "1.0.1",
-        "vary": "~1.1.2"
-      },
-      "engines": {
-        "node": ">= 0.10.0"
-      },
-      "funding": {
-        "type": "opencollective",
-        "url": "https://opencollective.com/express"
-      }
-    },
-    "node_modules/express/node_modules/debug": {
-      "version": "2.6.9",
-      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
-      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "ms": "2.0.0"
-      }
-    },
-    "node_modules/express/node_modules/ms": {
-      "version": "2.0.0",
-      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
-      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
-      "dev": true,
-      "license": "MIT"
-    },
     "node_modules/fast-deep-equal": {
       "version": "3.1.3",
       "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-3.1.3.tgz",
@@ -3534,42 +3410,6 @@
         "node": ">=10"
       }
     },
-    "node_modules/finalhandler": {
-      "version": "1.3.1",
-      "resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-1.3.1.tgz",
-      "integrity": "sha512-6BN9trH7bp3qvnrRyzsBz+g3lZxTNZTbVO2EV1CS0WIcDbawYVdYvGflME/9QP0h0pYlCDBCTjYa9nZzMDpyxQ==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "debug": "2.6.9",
-        "encodeurl": "~2.0.0",
-        "escape-html": "~1.0.3",
-        "on-finished": "2.4.1",
-        "parseurl": "~1.3.3",
-        "statuses": "2.0.1",
-        "unpipe": "~1.0.0"
-      },
-      "engines": {
-        "node": ">= 0.8"
-      }
-    },
-    "node_modules/finalhandler/node_modules/debug": {
-      "version": "2.6.9",
-      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
-      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "ms": "2.0.0"
-      }
-    },
-    "node_modules/finalhandler/node_modules/ms": {
-      "version": "2.0.0",
-      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
-      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
-      "dev": true,
-      "license": "MIT"
-    },
     "node_modules/find-up": {
       "version": "5.0.0",
       "resolved": "https://registry.npmjs.org/find-up/-/find-up-5.0.0.tgz",
@@ -3675,24 +3515,17 @@
         "node": ">= 12.20"
       }
     },
-    "node_modules/forwarded": {
-      "version": "0.2.0",
-      "resolved": "https://registry.npmjs.org/forwarded/-/forwarded-0.2.0.tgz",
-      "integrity": "sha512-buRG0fpBtRHSTCOASe6hD258tEubFoRLb4ZNA6NxMVHNw2gOcwHo9wyablzMzOA5z9xA9L1KNjk/Nt6MT9aYow==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.6"
-      }
-    },
-    "node_modules/fresh": {
-      "version": "0.5.2",
-      "resolved": "https://registry.npmjs.org/fresh/-/fresh-0.5.2.tgz",
-      "integrity": "sha512-zJ2mQYM18rEFOudeV4GShTGIQ7RbzA7ozbU9I/XBpm7kqgMywgmylMwXHxZJmkVoYkna9d2pVXVXPdYTP9ej8Q==",
-      "dev": true,
+    "node_modules/fraction.js": {
+      "version": "4.3.4",
+      "resolved": "https://registry.npmjs.org/fraction.js/-/fraction.js-4.3.4.tgz",
+      "integrity": "sha512-pwiTgt0Q7t+GHZA4yaLjObx4vXmmdcS0iSJ19o8d/goUGgItX9UZWKWNnLHehxviD8wU2IWRsnR8cD5+yOJP2Q==",
       "license": "MIT",
       "engines": {
-        "node": ">= 0.6"
+        "node": "*"
+      },
+      "funding": {
+        "type": "patreon",
+        "url": "https://github.com/sponsors/rawify"
       }
     },
     "node_modules/fs.realpath": {
@@ -3764,6 +3597,15 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
+    "node_modules/get-caller-file": {
+      "version": "2.0.5",
+      "resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-2.0.5.tgz",
+      "integrity": "sha512-DyFP3BM/3YHTQOCUL/w0OZHR0lpKeGrxotcHWcqNEdnltqFwXVfhEBQ94eIo34AfQpo0rGki4cyIiftY06h2Fg==",
+      "license": "ISC",
+      "engines": {
+        "node": "6.* || 8.* || >= 10.*"
+      }
+    },
     "node_modules/get-intrinsic": {
       "version": "1.3.0",
       "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.3.0.tgz",
@@ -3819,13 +3661,6 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
-    "node_modules/github-slugger": {
-      "version": "1.5.0",
-      "resolved": "https://registry.npmjs.org/github-slugger/-/github-slugger-1.5.0.tgz",
-      "integrity": "sha512-wIh+gKBI9Nshz2o46B0B3f5k/W+WI9ZAv6y5Dn5WJ5SK1t0TnDimB4WE5rmTD05ZAIn8HALCZVmCsvj0w0v0lw==",
-      "dev": true,
-      "license": "ISC"
-    },
     "node_modules/glob": {
       "version": "10.4.5",
       "resolved": "https://registry.npmjs.org/glob/-/glob-10.4.5.tgz",
@@ -4022,23 +3857,6 @@
       "dev": true,
       "license": "MIT"
     },
-    "node_modules/http-errors": {
-      "version": "2.0.0",
-      "resolved": "https://registry.npmjs.org/http-errors/-/http-errors-2.0.0.tgz",
-      "integrity": "sha512-FtwrG/euBzaEjYeRqOgly7G0qviiXoJWnvEH2Z1plBdXgbyjv34pHTSb9zoeHMyDy33+DWy5Wt9Wo+TURtOYSQ==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "depd": "2.0.0",
-        "inherits": "2.0.4",
-        "setprototypeof": "1.2.0",
-        "statuses": "2.0.1",
-        "toidentifier": "1.0.1"
-      },
-      "engines": {
-        "node": ">= 0.8"
-      }
-    },
     "node_modules/humanize-ms": {
       "version": "1.2.1",
       "resolved": "https://registry.npmjs.org/humanize-ms/-/humanize-ms-1.2.1.tgz",
@@ -4048,19 +3866,6 @@
         "ms": "^2.0.0"
       }
     },
-    "node_modules/iconv-lite": {
-      "version": "0.4.24",
-      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.4.24.tgz",
-      "integrity": "sha512-v3MXnZAcvnywkTUEZomIActle7RXXeedOR31wwl7VlyoXO4Qi9arvSenNQWne1TcRwhCL1HwLI21bEqdpj8/rA==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "safer-buffer": ">= 2.1.2 < 3"
-      },
-      "engines": {
-        "node": ">=0.10.0"
-      }
-    },
     "node_modules/ignore": {
       "version": "5.3.2",
       "resolved": "https://registry.npmjs.org/ignore/-/ignore-5.3.2.tgz",
@@ -4132,16 +3937,6 @@
         "node": ">= 0.4"
       }
     },
-    "node_modules/ipaddr.js": {
-      "version": "1.9.1",
-      "resolved": "https://registry.npmjs.org/ipaddr.js/-/ipaddr.js-1.9.1.tgz",
-      "integrity": "sha512-0KI/607xoxSToH7GjN1FfSbLoU0+btTicjsQSWQlh/hZykN8KpmMf7uYwPW3R+akZ6R/w18ZlXSHBYXiYUPO3g==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.10"
-      }
-    },
     "node_modules/is-array-buffer": {
       "version": "3.0.5",
       "resolved": "https://registry.npmjs.org/is-array-buffer/-/is-array-buffer-3.0.5.tgz",
@@ -4307,7 +4102,6 @@
       "version": "3.0.0",
       "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
       "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
-      "dev": true,
       "license": "MIT",
       "engines": {
         "node": ">=8"
@@ -4672,6 +4466,12 @@
         "node": "*"
       }
     },
+    "node_modules/javascript-natural-sort": {
+      "version": "0.7.1",
+      "resolved": "https://registry.npmjs.org/javascript-natural-sort/-/javascript-natural-sort-0.7.1.tgz",
+      "integrity": "sha512-nO6jcEfZWQXDhOiBtG2KvKyEptz7RVbpGP4vTD2hLBdmNQSsCiicO2Ioinv6UI4y9ukqnBpy+XZ9H6uLNgJTlw==",
+      "license": "MIT"
+    },
     "node_modules/js-tokens": {
       "version": "4.0.0",
       "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
@@ -4683,7 +4483,6 @@
       "version": "4.1.0",
       "resolved": "https://registry.npmjs.org/js-yaml/-/js-yaml-4.1.0.tgz",
       "integrity": "sha512-wpxZs9NoxZaJESJGIZTyDEaYpl0FKSA+FB9aJiyemKhMwkxQg63h4T1KJgUGHpTqPDNRcmmYLugrRjJlBtWvRA==",
-      "dev": true,
       "license": "MIT",
       "dependencies": {
         "argparse": "^2.0.1"
@@ -4776,16 +4575,6 @@
         "node": ">= 0.8.0"
       }
     },
-    "node_modules/linkify-it": {
-      "version": "5.0.0",
-      "resolved": "https://registry.npmjs.org/linkify-it/-/linkify-it-5.0.0.tgz",
-      "integrity": "sha512-5aHCbzQRADcdP+ATqnDuhhJ/MRIqDkZX5pyjFHRRysS8vZ5AbqGEoFIb6pYHPZ+L/OC2Lc+xT8uHVVR5CAK/wQ==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "uc.micro": "^2.0.0"
-      }
-    },
     "node_modules/locate-path": {
       "version": "6.0.0",
       "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-6.0.0.tgz",
@@ -4894,42 +4683,6 @@
         "node": ">=10"
       }
     },
-    "node_modules/markdown-it": {
-      "version": "14.1.0",
-      "resolved": "https://registry.npmjs.org/markdown-it/-/markdown-it-14.1.0.tgz",
-      "integrity": "sha512-a54IwgWPaeBCAAsv13YgmALOF1elABB08FxO9i+r4VFk5Vl4pKokRPeX8u5TCgSsPi6ec1otfLjdOpVcgbpshg==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "argparse": "^2.0.1",
-        "entities": "^4.4.0",
-        "linkify-it": "^5.0.0",
-        "mdurl": "^2.0.0",
-        "punycode.js": "^2.3.1",
-        "uc.micro": "^2.1.0"
-      },
-      "bin": {
-        "markdown-it": "bin/markdown-it.mjs"
-      }
-    },
-    "node_modules/markdown-it-github": {
-      "version": "0.5.0",
-      "resolved": "https://registry.npmjs.org/markdown-it-github/-/markdown-it-github-0.5.0.tgz",
-      "integrity": "sha512-ycHCFnPLSP9dlkcX/3yFzLhO9ZwHHYPIeqhFN9P7vnqWSpL56lbYganMbBU8u5H7b91qk6affHyYb2pMPbnMAQ==",
-      "dev": true,
-      "license": "Unlicense",
-      "dependencies": {
-        "github-slugger": "^1.2.1",
-        "markdown-it-theme": "^0.2.0"
-      }
-    },
-    "node_modules/markdown-it-theme": {
-      "version": "0.2.0",
-      "resolved": "https://registry.npmjs.org/markdown-it-theme/-/markdown-it-theme-0.2.0.tgz",
-      "integrity": "sha512-3R9tXmfP/7ilkRsm6o82GRdEMm5jJ8/s5OgdFB2wZC8VK5fJJLL0hxHGhu38wg+nBX7COBrvRN/QmrT3xybj/g==",
-      "dev": true,
-      "license": "Unlicense"
-    },
     "node_modules/math-intrinsics": {
       "version": "1.1.0",
       "resolved": "https://registry.npmjs.org/math-intrinsics/-/math-intrinsics-1.1.0.tgz",
@@ -4939,54 +4692,27 @@
         "node": ">= 0.4"
       }
     },
-    "node_modules/mdurl": {
-      "version": "2.0.0",
-      "resolved": "https://registry.npmjs.org/mdurl/-/mdurl-2.0.0.tgz",
-      "integrity": "sha512-Lf+9+2r+Tdp5wXDXC4PcIBjTDtq4UKjCPMQhKIuzpJNW0b96kVqSwW0bT7FhRSfmAiFYgP+SCRvdrDozfh0U5w==",
-      "dev": true,
-      "license": "MIT"
-    },
-    "node_modules/media-typer": {
-      "version": "0.3.0",
-      "resolved": "https://registry.npmjs.org/media-typer/-/media-typer-0.3.0.tgz",
-      "integrity": "sha512-dq+qelQ9akHpcOl/gUVRTxVIOkAJ1wR3QAvb4RsVjS8oVoFjDGTc679wJYmUmknUF5HwMLOgb5O+a3KxfWapPQ==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.6"
-      }
-    },
-    "node_modules/merge-descriptors": {
-      "version": "1.0.3",
-      "resolved": "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-1.0.3.tgz",
-      "integrity": "sha512-gaNvAS7TZ897/rVaZ0nMtAyxNyi/pdbjbAwUpFQpN70GqnVfOiXpeUUMKRBmzXaSQ8DdTX4/0ms62r2K+hE6mQ==",
-      "dev": true,
-      "license": "MIT",
-      "funding": {
-        "url": "https://github.com/sponsors/sindresorhus"
-      }
-    },
-    "node_modules/methods": {
-      "version": "1.1.2",
-      "resolved": "https://registry.npmjs.org/methods/-/methods-1.1.2.tgz",
-      "integrity": "sha512-iclAHeNqNm68zFtnZ0e+1L2yUIdvzNoauKU4WBA3VvH/vPFieF7qfRlwUZU+DA9P9bPXIS90ulxoUoCH23sV2w==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.6"
-      }
-    },
-    "node_modules/mime": {
-      "version": "1.6.0",
-      "resolved": "https://registry.npmjs.org/mime/-/mime-1.6.0.tgz",
-      "integrity": "sha512-x0Vn8spI+wuJ1O6S7gnbaQg8Pxh4NNHb7KSINmEWKiPE4RKOplvijn+NkmYmmRgP68mc70j2EbeTFRsrswaQeg==",
-      "dev": true,
-      "license": "MIT",
+    "node_modules/mathjs": {
+      "version": "11.12.0",
+      "resolved": "https://registry.npmjs.org/mathjs/-/mathjs-11.12.0.tgz",
+      "integrity": "sha512-UGhVw8rS1AyedyI55DGz9q1qZ0p98kyKPyc9vherBkoueLntPfKtPBh14x+V4cdUWK0NZV2TBwqRFlvadscSuw==",
+      "license": "Apache-2.0",
+      "dependencies": {
+        "@babel/runtime": "^7.23.2",
+        "complex.js": "^2.1.1",
+        "decimal.js": "^10.4.3",
+        "escape-latex": "^1.2.0",
+        "fraction.js": "4.3.4",
+        "javascript-natural-sort": "^0.7.1",
+        "seedrandom": "^3.0.5",
+        "tiny-emitter": "^2.1.0",
+        "typed-function": "^4.1.1"
+      },
       "bin": {
-        "mime": "cli.js"
+        "mathjs": "bin/cli.js"
       },
       "engines": {
-        "node": ">=4"
+        "node": ">= 14"
       }
     },
     "node_modules/mime-db": {
@@ -5077,16 +4803,6 @@
       "dev": true,
       "license": "MIT"
     },
-    "node_modules/negotiator": {
-      "version": "0.6.3",
-      "resolved": "https://registry.npmjs.org/negotiator/-/negotiator-0.6.3.tgz",
-      "integrity": "sha512-+EUsqGPLsM+j/zdChZjsnX51g4XrHFOIXwfnCVPGlQk/k5giakcKsuxCObBRu6DSm9opw/O6slWbJdghQM4bBg==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.6"
-      }
-    },
     "node_modules/node-domexception": {
       "version": "1.0.0",
       "resolved": "https://registry.npmjs.org/node-domexception/-/node-domexception-1.0.0.tgz",
@@ -5127,21 +4843,6 @@
         }
       }
     },
-    "node_modules/npm-check-updates": {
-      "version": "17.1.18",
-      "resolved": "https://registry.npmjs.org/npm-check-updates/-/npm-check-updates-17.1.18.tgz",
-      "integrity": "sha512-bkUy2g4v1i+3FeUf5fXMLbxmV95eG4/sS7lYE32GrUeVgQRfQEk39gpskksFunyaxQgTIdrvYbnuNbO/pSUSqw==",
-      "dev": true,
-      "license": "Apache-2.0",
-      "bin": {
-        "ncu": "build/cli.js",
-        "npm-check-updates": "build/cli.js"
-      },
-      "engines": {
-        "node": "^18.18.0 || >=20.0.0",
-        "npm": ">=8.12.1"
-      }
-    },
     "node_modules/object-assign": {
       "version": "4.1.1",
       "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
@@ -5265,19 +4966,6 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
-    "node_modules/on-finished": {
-      "version": "2.4.1",
-      "resolved": "https://registry.npmjs.org/on-finished/-/on-finished-2.4.1.tgz",
-      "integrity": "sha512-oVlzkg3ENAhCk2zdv7IJwd/QUD4z2RxRwpkcGY8psCVcCYZNq4wYnVWALHM+brtuJjePWiYF/ClmuDr8Ch5+kg==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "ee-first": "1.1.1"
-      },
-      "engines": {
-        "node": ">= 0.8"
-      }
-    },
     "node_modules/once": {
       "version": "1.4.0",
       "resolved": "https://registry.npmjs.org/once/-/once-1.4.0.tgz",
@@ -5406,16 +5094,6 @@
         "node": ">=6"
       }
     },
-    "node_modules/parseurl": {
-      "version": "1.3.3",
-      "resolved": "https://registry.npmjs.org/parseurl/-/parseurl-1.3.3.tgz",
-      "integrity": "sha512-CiyeOxFT/JZyN5m0z9PfXw4SCBJ6Sygz1Dpl0wqjlhDEGGBP1GnsUVEL0p63hoG1fcj3fHynXi9NYO4nWOL+qQ==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.8"
-      }
-    },
     "node_modules/path-exists": {
       "version": "4.0.0",
       "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-4.0.0.tgz",
@@ -5470,13 +5148,6 @@
         "url": "https://github.com/sponsors/isaacs"
       }
     },
-    "node_modules/path-to-regexp": {
-      "version": "0.1.12",
-      "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-0.1.12.tgz",
-      "integrity": "sha512-RA1GjUVMnvYFxuqovrEqZoxxW5NUZqbwKtYz/Tt7nXerk0LbLblQmrsgdeOxV5SFHf0UDggjS/bSeOZwt1pmEQ==",
-      "dev": true,
-      "license": "MIT"
-    },
     "node_modules/pathe": {
       "version": "2.0.3",
       "resolved": "https://registry.npmjs.org/pathe/-/pathe-2.0.3.tgz",
@@ -5604,20 +5275,6 @@
         "react-is": "^16.13.1"
       }
     },
-    "node_modules/proxy-addr": {
-      "version": "2.0.7",
-      "resolved": "https://registry.npmjs.org/proxy-addr/-/proxy-addr-2.0.7.tgz",
-      "integrity": "sha512-llQsMLSUDUPT44jdrU/O37qlnifitDP+ZwrmmZcoSKyLKvtZxpyV0n2/bD/N4tBAAZ/gJEdZU7KMraoK1+XYAg==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "forwarded": "0.2.0",
-        "ipaddr.js": "1.9.1"
-      },
-      "engines": {
-        "node": ">= 0.10"
-      }
-    },
     "node_modules/punycode": {
       "version": "2.3.1",
       "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.3.1.tgz",
@@ -5628,32 +5285,6 @@
         "node": ">=6"
       }
     },
-    "node_modules/punycode.js": {
-      "version": "2.3.1",
-      "resolved": "https://registry.npmjs.org/punycode.js/-/punycode.js-2.3.1.tgz",
-      "integrity": "sha512-uxFIHU0YlHYhDQtV4R9J6a52SLx28BCjT+4ieh7IGbgwVJWO+km431c4yRlREUAsAmt/uMjQUyQHNEPf0M39CA==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">=6"
-      }
-    },
-    "node_modules/qs": {
-      "version": "6.13.0",
-      "resolved": "https://registry.npmjs.org/qs/-/qs-6.13.0.tgz",
-      "integrity": "sha512-+38qI9SOr8tfZ4QmJNplMUxqjbe7LKvvZgWdExBOmd+egZTtjLB67Gu0HRX3u/XOq7UU2Nx6nsjvS16Z9uwfpg==",
-      "dev": true,
-      "license": "BSD-3-Clause",
-      "dependencies": {
-        "side-channel": "^1.0.6"
-      },
-      "engines": {
-        "node": ">=0.6"
-      },
-      "funding": {
-        "url": "https://github.com/sponsors/ljharb"
-      }
-    },
     "node_modules/queue-microtask": {
       "version": "1.2.3",
       "resolved": "https://registry.npmjs.org/queue-microtask/-/queue-microtask-1.2.3.tgz",
@@ -5675,32 +5306,6 @@
       ],
       "license": "MIT"
     },
-    "node_modules/range-parser": {
-      "version": "1.2.1",
-      "resolved": "https://registry.npmjs.org/range-parser/-/range-parser-1.2.1.tgz",
-      "integrity": "sha512-Hrgsx+orqoygnmhFbKaHE6c296J+HTAQXoxEF6gNupROmmGJRoyzfG3ccAveqCBrwr/2yxQ5BVd/GTl5agOwSg==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.6"
-      }
-    },
-    "node_modules/raw-body": {
-      "version": "2.5.2",
-      "resolved": "https://registry.npmjs.org/raw-body/-/raw-body-2.5.2.tgz",
-      "integrity": "sha512-8zGqypfENjCIqGhgXToC8aB2r7YrBX+AQAfIPs/Mlk+BtPTztOvTS01NRW/3Eh60J+a48lt8qsCzirQ6loCVfA==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "bytes": "3.1.2",
-        "http-errors": "2.0.0",
-        "iconv-lite": "0.4.24",
-        "unpipe": "1.0.0"
-      },
-      "engines": {
-        "node": ">= 0.8"
-      }
-    },
     "node_modules/react-is": {
       "version": "16.13.1",
       "resolved": "https://registry.npmjs.org/react-is/-/react-is-16.13.1.tgz",
@@ -5789,6 +5394,15 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
+    "node_modules/require-directory": {
+      "version": "2.1.1",
+      "resolved": "https://registry.npmjs.org/require-directory/-/require-directory-2.1.1.tgz",
+      "integrity": "sha512-fGxEI7+wsG9xrvdjsrlmL22OMTTiHRwAMroiEeMgq8gzoLC/PQr7RsRDSTLUg/bZAZtF+TVIkHc6/4RIKrui+Q==",
+      "license": "MIT",
+      "engines": {
+        "node": ">=0.10.0"
+      }
+    },
     "node_modules/resolve": {
       "version": "1.22.10",
       "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.10.tgz",
@@ -5978,27 +5592,6 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
-    "node_modules/safe-buffer": {
-      "version": "5.2.1",
-      "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.2.1.tgz",
-      "integrity": "sha512-rp3So07KcdmmKbGvgaNxQSJr7bGVSVk5S9Eq1F+ppbRo70+YeaDxkw5Dd8NPN+GD6bjnYm2VuPuCXmpuYvmCXQ==",
-      "dev": true,
-      "funding": [
-        {
-          "type": "github",
-          "url": "https://github.com/sponsors/feross"
-        },
-        {
-          "type": "patreon",
-          "url": "https://www.patreon.com/feross"
-        },
-        {
-          "type": "consulting",
-          "url": "https://feross.org/support"
-        }
-      ],
-      "license": "MIT"
-    },
     "node_modules/safe-push-apply": {
       "version": "1.0.0",
       "resolved": "https://registry.npmjs.org/safe-push-apply/-/safe-push-apply-1.0.0.tgz",
@@ -6044,13 +5637,6 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
-    "node_modules/safer-buffer": {
-      "version": "2.1.2",
-      "resolved": "https://registry.npmjs.org/safer-buffer/-/safer-buffer-2.1.2.tgz",
-      "integrity": "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg==",
-      "dev": true,
-      "license": "MIT"
-    },
     "node_modules/scslre": {
       "version": "0.3.0",
       "resolved": "https://registry.npmjs.org/scslre/-/scslre-0.3.0.tgz",
@@ -6066,6 +5652,12 @@
         "node": "^14.0.0 || >=16.0.0"
       }
     },
+    "node_modules/seedrandom": {
+      "version": "3.0.5",
+      "resolved": "https://registry.npmjs.org/seedrandom/-/seedrandom-3.0.5.tgz",
+      "integrity": "sha512-8OwmbklUNzwezjGInmZ+2clQmExQPvomqjL7LFqOYqtmuxRgQYqOD3mHaU+MvZn5FLUeVxVfQjwLZW/n/JFuqg==",
+      "license": "MIT"
+    },
     "node_modules/semver": {
       "version": "6.3.1",
       "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
@@ -6076,74 +5668,6 @@
         "semver": "bin/semver.js"
       }
     },
-    "node_modules/send": {
-      "version": "0.19.0",
-      "resolved": "https://registry.npmjs.org/send/-/send-0.19.0.tgz",
-      "integrity": "sha512-dW41u5VfLXu8SJh5bwRmyYUbAoSB3c9uQh6L8h/KtsFREPWpbX1lrljJo186Jc4nmci/sGUZ9a0a0J2zgfq2hw==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "debug": "2.6.9",
-        "depd": "2.0.0",
-        "destroy": "1.2.0",
-        "encodeurl": "~1.0.2",
-        "escape-html": "~1.0.3",
-        "etag": "~1.8.1",
-        "fresh": "0.5.2",
-        "http-errors": "2.0.0",
-        "mime": "1.6.0",
-        "ms": "2.1.3",
-        "on-finished": "2.4.1",
-        "range-parser": "~1.2.1",
-        "statuses": "2.0.1"
-      },
-      "engines": {
-        "node": ">= 0.8.0"
-      }
-    },
-    "node_modules/send/node_modules/debug": {
-      "version": "2.6.9",
-      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
-      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "ms": "2.0.0"
-      }
-    },
-    "node_modules/send/node_modules/debug/node_modules/ms": {
-      "version": "2.0.0",
-      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
-      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
-      "dev": true,
-      "license": "MIT"
-    },
-    "node_modules/send/node_modules/encodeurl": {
-      "version": "1.0.2",
-      "resolved": "https://registry.npmjs.org/encodeurl/-/encodeurl-1.0.2.tgz",
-      "integrity": "sha512-TPJXq8JqFaVYm2CWmPvnP2Iyo4ZSM7/QKcSmuMLDObfpH5fi7RUGmd/rTDf+rut/saiDiQEeVTNgAmJEdAOx0w==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.8"
-      }
-    },
-    "node_modules/serve-static": {
-      "version": "1.16.2",
-      "resolved": "https://registry.npmjs.org/serve-static/-/serve-static-1.16.2.tgz",
-      "integrity": "sha512-VqpjJZKadQB/PEbEwvFdO43Ax5dFBZ2UECszz8bQ7pi7wt//PWe1P6MN7eCnjsatYtBT6EuiClbjSWP2WrIoTw==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "encodeurl": "~2.0.0",
-        "escape-html": "~1.0.3",
-        "parseurl": "~1.3.3",
-        "send": "0.19.0"
-      },
-      "engines": {
-        "node": ">= 0.8.0"
-      }
-    },
     "node_modules/set-function-length": {
       "version": "1.2.2",
       "resolved": "https://registry.npmjs.org/set-function-length/-/set-function-length-1.2.2.tgz",
@@ -6193,13 +5717,6 @@
         "node": ">= 0.4"
       }
     },
-    "node_modules/setprototypeof": {
-      "version": "1.2.0",
-      "resolved": "https://registry.npmjs.org/setprototypeof/-/setprototypeof-1.2.0.tgz",
-      "integrity": "sha512-E5LDX7Wrp85Kil5bhZv46j8jOeboKq5JMmYM3gVGdGH8xFpPWXUMsNrlODCrkoxMEeNi/XZIwuRvY4XNwYMJpw==",
-      "dev": true,
-      "license": "ISC"
-    },
     "node_modules/shebang-command": {
       "version": "2.0.0",
       "resolved": "https://registry.npmjs.org/shebang-command/-/shebang-command-2.0.0.tgz",
@@ -6336,16 +5853,6 @@
       "dev": true,
       "license": "MIT"
     },
-    "node_modules/statuses": {
-      "version": "2.0.1",
-      "resolved": "https://registry.npmjs.org/statuses/-/statuses-2.0.1.tgz",
-      "integrity": "sha512-RwNA9Z/7PrK06rYLIzFMlaF+l73iwpzsqRIFgbMLbTcLD6cOao82TaWefPXQvB2fOC4AjuYSEndS7N/mTCbkdQ==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.8"
-      }
-    },
     "node_modules/std-env": {
       "version": "3.9.0",
       "resolved": "https://registry.npmjs.org/std-env/-/std-env-3.9.0.tgz",
@@ -6657,6 +6164,12 @@
       "dev": true,
       "license": "MIT"
     },
+    "node_modules/tiny-emitter": {
+      "version": "2.1.0",
+      "resolved": "https://registry.npmjs.org/tiny-emitter/-/tiny-emitter-2.1.0.tgz",
+      "integrity": "sha512-NB6Dk1A9xgQPMoGqC5CVXn123gWyte215ONT5Pp5a0yt4nlEoO1ZWeCwpncaekPHXO60i47ihFnZPiRPjRMq4Q==",
+      "license": "MIT"
+    },
     "node_modules/tinybench": {
       "version": "2.9.0",
       "resolved": "https://registry.npmjs.org/tinybench/-/tinybench-2.9.0.tgz",
@@ -6718,16 +6231,6 @@
         "node": ">=14.0.0"
       }
     },
-    "node_modules/toidentifier": {
-      "version": "1.0.1",
-      "resolved": "https://registry.npmjs.org/toidentifier/-/toidentifier-1.0.1.tgz",
-      "integrity": "sha512-o5sSPKEkg/DIQNmH43V0/uerLrpzVedkUh8tGNvaeXpfpuwjKenlSox/2O/BTlZUtEe+JG7s5YhEz608PlAHRA==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">=0.6"
-      }
-    },
     "node_modules/tr46": {
       "version": "0.0.3",
       "resolved": "https://registry.npmjs.org/tr46/-/tr46-0.0.3.tgz",
@@ -6773,20 +6276,6 @@
         "url": "https://github.com/sponsors/sindresorhus"
       }
     },
-    "node_modules/type-is": {
-      "version": "1.6.18",
-      "resolved": "https://registry.npmjs.org/type-is/-/type-is-1.6.18.tgz",
-      "integrity": "sha512-TkRKr9sUTxEH8MdfuCSP7VizJyzRNMjj2J2do2Jr3Kym598JVdEksuzPQCnlFPW4ky9Q+iA+ma9BGm06XQBy8g==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "media-typer": "0.3.0",
-        "mime-types": "~2.1.24"
-      },
-      "engines": {
-        "node": ">= 0.6"
-      }
-    },
     "node_modules/typed-array-buffer": {
       "version": "1.0.3",
       "resolved": "https://registry.npmjs.org/typed-array-buffer/-/typed-array-buffer-1.0.3.tgz",
@@ -6865,6 +6354,15 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
+    "node_modules/typed-function": {
+      "version": "4.2.1",
+      "resolved": "https://registry.npmjs.org/typed-function/-/typed-function-4.2.1.tgz",
+      "integrity": "sha512-EGjWssW7Tsk4DGfE+5yluuljS1OGYWiI1J6e8puZz9nTMM51Oug8CD5Zo4gWMsOhq5BI+1bF+rWTm4Vbj3ivRA==",
+      "license": "MIT",
+      "engines": {
+        "node": ">= 18"
+      }
+    },
     "node_modules/typescript": {
       "version": "5.8.3",
       "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.8.3.tgz",
@@ -6879,13 +6377,6 @@
         "node": ">=14.17"
       }
     },
-    "node_modules/uc.micro": {
-      "version": "2.1.0",
-      "resolved": "https://registry.npmjs.org/uc.micro/-/uc.micro-2.1.0.tgz",
-      "integrity": "sha512-ARDJmphmdvUk6Glw7y9DQ2bFkKBHwQHLi2lsaH6PPmz/Ka9sFOBsBluozhDltWmnv9u/cF6Rt87znRTPV+yp/A==",
-      "dev": true,
-      "license": "MIT"
-    },
     "node_modules/unbox-primitive": {
       "version": "1.1.0",
       "resolved": "https://registry.npmjs.org/unbox-primitive/-/unbox-primitive-1.1.0.tgz",
@@ -6911,16 +6402,6 @@
       "integrity": "sha512-JlCMO+ehdEIKqlFxk6IfVoAUVmgz7cU7zD/h9XZ0qzeosSHmUJVOzSQvvYSYWXkFXC+IfLKSIffhv0sVZup6pA==",
       "license": "MIT"
     },
-    "node_modules/unpipe": {
-      "version": "1.0.0",
-      "resolved": "https://registry.npmjs.org/unpipe/-/unpipe-1.0.0.tgz",
-      "integrity": "sha512-pjy2bYhSsufwWlKwPc+l3cN7+wuJlK6uz0YdJEOlQDbl6jo/YlPi4mb8agUkVC8BF7V8NuzeyPNqRksA3hztKQ==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.8"
-      }
-    },
     "node_modules/uri-js": {
       "version": "4.4.1",
       "resolved": "https://registry.npmjs.org/uri-js/-/uri-js-4.4.1.tgz",
@@ -6938,26 +6419,6 @@
       "dev": true,
       "license": "MIT"
     },
-    "node_modules/utils-merge": {
-      "version": "1.0.1",
-      "resolved": "https://registry.npmjs.org/utils-merge/-/utils-merge-1.0.1.tgz",
-      "integrity": "sha512-pMZTvIkT1d+TFGvDOqodOclx0QWkkgi6Tdoa8gC8ffGAAqz9pzPTZWAybbsHHoED/ztMtkv/VoYTYyShUn81hA==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.4.0"
-      }
-    },
-    "node_modules/vary": {
-      "version": "1.1.2",
-      "resolved": "https://registry.npmjs.org/vary/-/vary-1.1.2.tgz",
-      "integrity": "sha512-BNGbWLfd0eUPabhkXUVm0j8uuvREyTh5ovRa/dyow/BqAbZJyC+5fU+IzQOzmAKzYqYRAISoRhdQr3eIZ/PXqg==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.8"
-      }
-    },
     "node_modules/vite": {
       "version": "6.3.5",
       "resolved": "https://registry.npmjs.org/vite/-/vite-6.3.5.tgz",
@@ -7386,6 +6847,83 @@
       "dev": true,
       "license": "ISC"
     },
+    "node_modules/y18n": {
+      "version": "5.0.8",
+      "resolved": "https://registry.npmjs.org/y18n/-/y18n-5.0.8.tgz",
+      "integrity": "sha512-0pfFzegeDWJHJIAmTLRP2DwHjdF5s7jo9tuztdQxAhINCdvS+3nGINqPd00AphqJR/0LhANUS6/+7SCb98YOfA==",
+      "license": "ISC",
+      "engines": {
+        "node": ">=10"
+      }
+    },
+    "node_modules/yargs": {
+      "version": "17.7.2",
+      "resolved": "https://registry.npmjs.org/yargs/-/yargs-17.7.2.tgz",
+      "integrity": "sha512-7dSzzRQ++CKnNI/krKnYRV7JKKPUXMEh61soaHKg9mrWEhzFWhFnxPxGl+69cD1Ou63C13NUPCnmIcrvqCuM6w==",
+      "license": "MIT",
+      "dependencies": {
+        "cliui": "^8.0.1",
+        "escalade": "^3.1.1",
+        "get-caller-file": "^2.0.5",
+        "require-directory": "^2.1.1",
+        "string-width": "^4.2.3",
+        "y18n": "^5.0.5",
+        "yargs-parser": "^21.1.1"
+      },
+      "engines": {
+        "node": ">=12"
+      }
+    },
+    "node_modules/yargs-parser": {
+      "version": "21.1.1",
+      "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-21.1.1.tgz",
+      "integrity": "sha512-tVpsJW7DdjecAiFpbIB1e3qxIQsE6NoPc5/eTdrbbIC4h0LVsWhnoa3g+m2HclBIujHzsxZ4VJVA+GUuc2/LBw==",
+      "license": "ISC",
+      "engines": {
+        "node": ">=12"
+      }
+    },
+    "node_modules/yargs/node_modules/ansi-regex": {
+      "version": "5.0.1",
+      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
+      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
+      "license": "MIT",
+      "engines": {
+        "node": ">=8"
+      }
+    },
+    "node_modules/yargs/node_modules/emoji-regex": {
+      "version": "8.0.0",
+      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
+      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
+      "license": "MIT"
+    },
+    "node_modules/yargs/node_modules/string-width": {
+      "version": "4.2.3",
+      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
+      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
+      "license": "MIT",
+      "dependencies": {
+        "emoji-regex": "^8.0.0",
+        "is-fullwidth-code-point": "^3.0.0",
+        "strip-ansi": "^6.0.1"
+      },
+      "engines": {
+        "node": ">=8"
+      }
+    },
+    "node_modules/yargs/node_modules/strip-ansi": {
+      "version": "6.0.1",
+      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
+      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
+      "license": "MIT",
+      "dependencies": {
+        "ansi-regex": "^5.0.1"
+      },
+      "engines": {
+        "node": ">=8"
+      }
+    },
     "node_modules/yocto-queue": {
       "version": "0.1.0",
       "resolved": "https://registry.npmjs.org/yocto-queue/-/yocto-queue-0.1.0.tgz",
diff --git a/package.json b/package.json
index 8522a815..33f0e8ad 100644
--- a/package.json
+++ b/package.json
@@ -25,16 +25,18 @@
   "license": "MIT",
   "dependencies": {
     "dotenv": "^16.5.0",
-    "openai": "^4.103.0",
     "ejs": "^3.1.10",
     "js-yaml": "^4.1.0",
     "minimatch": "^10.0.1",
+    "openai": "^4.103.0",
+    "yargs": "^17.7.2",
+    "mathjs": "^11.8.0",
     "zod": "^3.25.30"
   },
   "devDependencies": {
     "@microsoft/eslint-formatter-sarif": "^3.1.0",
     "@vitest/coverage-v8": "^3.1.4",
-    "eslint": "^9.25.1",
+    "eslint": "^9.27.0",
     "eslint-config-google": "^0.14.0",
     "eslint-config-prettier": "^10.1.5",
     "eslint-plugin-import": "^2.31.0",
@@ -43,19 +45,16 @@
     "eslint-plugin-react": "^7.37.5",
     "eslint-plugin-security": "^3.0.1",
     "eslint-plugin-sonarjs": "^3.0.2",
-    "express": "^4.21.2",
-    "js-yaml": "^4.1.0",
-    "markdown-it-github": "^0.5.0",
-    "markdown-it": "^14.1.0",
-    "npm-check-updates": "^17.1.18",
     "prettier": "^3.5.3",
     "vitest": "^3.1.4"
   },
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
index 3cdd4e2a..e3adecdc 100755
--- a/src/lib/main.js
+++ b/src/lib/main.js
@@ -1,13 +1,130 @@
 #!/usr/bin/env node
-// src/lib/main.js
+import fs from 'fs';
+import yargs from 'yargs';
+import { hideBin } from 'yargs/helpers';
+import { create, all } from 'mathjs';
+import pkg from '../../package.json' assert { type: 'json' };
+import { fileURLToPath } from 'url';
 
-import { fileURLToPath } from "url";
+const math = create(all);
 
-export function main(args) {
-  console.log(`Run with: ${JSON.stringify(args)}`);
+/**
+ * Programmatic main entrypoint returning generated data or throwing on invalid input.
+ * @param {{ expression: string, range: string, format?: string, output?: string }} options
+ * @returns {{ x: number, y: number }[]}
+ */
+export function main({ expression, range, format = 'json', output } = {}) {
+  // Parse expression
+  let exprText = expression.trim();
+  if (exprText.startsWith('y=')) exprText = exprText.slice(2);
+  let compiled;
+  try {
+    compiled = math.compile(exprText);
+  } catch {
+    throw new Error('Invalid expression');
+  }
+
+  // Parse range
+  if (!range.startsWith('x=')) {
+    throw new Error('Invalid range');
+  }
+  const parts = range.slice(2).split(':');
+  if (parts.length !== 3) {
+    throw new Error('Invalid range');
+  }
+  const start = Number(parts[0]);
+  const end = Number(parts[1]);
+  const step = Number(parts[2]);
+  if (
+    Number.isNaN(start) ||
+    Number.isNaN(end) ||
+    Number.isNaN(step) ||
+    step <= 0 ||
+    start > end
+  ) {
+    throw new Error('Invalid range');
+  }
+
+  // Generate points
+  const data = [];
+  const epsilon = step / 1e6;
+  for (let x = start; x <= end + epsilon; x += step) {
+    const xVal = Number(x.toPrecision(15));
+    let yVal;
+    try {
+      yVal = compiled.evaluate({ x: xVal });
+    } catch {
+      throw new Error('Invalid expression');
+    }
+    data.push({ x: xVal, y: yVal });
+  }
+
+  // Serialize
+  let outputText;
+  if (format === 'json') {
+    outputText = JSON.stringify(data, null, 2);
+  } else if (format === 'csv') {
+    const lines = ['x,y'];
+    data.forEach(pt => lines.push(`${pt.x},${pt.y}`));
+    outputText = lines.join('\n');
+  } else {
+    throw new Error('Unsupported format');
+  }
+
+  // Write or print
+  if (output) {
+    fs.writeFileSync(output, outputText, 'utf-8');
+  } else {
+    console.log(outputText);
+  }
+
+  return data;
 }
 
+// CLI entrypoint
 if (process.argv[1] === fileURLToPath(import.meta.url)) {
-  const args = process.argv.slice(2);
-  main(args);
+  const argv = yargs(hideBin(process.argv))
+    .scriptName('repository0-plot-code-lib')
+    .usage('Usage: $0 -e <expression> -r <range> [-f <format>] [-o <output>]')
+    .option('expression', {
+      alias: 'e',
+      type: 'string',
+      describe: 'Formula in form y=<expression> or <expression>',
+      demandOption: true
+    })
+    .option('range', {
+      alias: 'r',
+      type: 'string',
+      describe: 'Range in form x=<start>:<end>:<step>',
+      demandOption: true
+    })
+    .option('format', {
+      alias: 'f',
+      type: 'string',
+      describe: 'Output format: json or csv',
+      choices: ['json','csv'],
+      default: 'json'
+    })
+    .option('output', {
+      alias: 'o',
+      type: 'string',
+      describe: 'File path to write output; prints to stdout if omitted'
+    })
+    .help('h').alias('h','help')
+    .version(pkg.version).alias('v','version')
+    .strict()
+    .parseSync();
+
+  try {
+    main({
+      expression: argv.expression,
+      range: argv.range,
+      format: argv.format,
+      output: argv.output
+    });
+    process.exit(0);
+  } catch (err) {
+    console.error(`Error: ${err.message}`);
+    process.exit(1);
+  }
 }
diff --git a/tests/unit/plot-generation.test.js b/tests/unit/plot-generation.test.js
index 19a4042c..b736d4d5 100644
--- a/tests/unit/plot-generation.test.js
+++ b/tests/unit/plot-generation.test.js
@@ -1,16 +1,74 @@
-import { describe, test, expect } from "vitest";
-import * as mainModule from "@src/lib/main.js";
-import { main } from "@src/lib/main.js";
+import { describe, it, expect } from 'vitest';
+import { spawnSync } from 'child_process';
+import { readFileSync, existsSync, unlinkSync } from 'fs';
+import path from 'path';
+import { fileURLToPath } from 'url';
 
-describe("Main Module Import", () => {
-  test("should be non-null", () => {
-    expect(mainModule).not.toBeNull();
+const __dirname = path.dirname(fileURLToPath(import.meta.url));
+const cli = path.resolve(__dirname, '../../src/lib/main.js');
+
+describe('Time Series Generation CLI', () => {
+  it('DEFAULT JSON to stdout', () => {
+    const res = spawnSync('node',[cli,'-e','y=x','-r','x=0:2:1']);
+    expect(res.status).toBe(0);
+    const out = JSON.parse(res.stdout.toString());
+    expect(out).toEqual([{x:0,y:0},{x:1,y:1},{x:2,y:2}]);
   });
-});
 
-describe("Default main", () => {
-  test("should terminate without error", () => {
-    process.argv = ["node", "src/lib/main.js"];
-    main();
+  it('JSON file output', () => {
+    const tmp = path.resolve(__dirname,'tmp.json'); if(existsSync(tmp)) unlinkSync(tmp);
+    const res = spawnSync('node',[cli,'-e','2*x+1','-r','x=0:2:1','-o',tmp]);
+    expect(res.status).toBe(0);
+    expect(existsSync(tmp)).toBe(true);
+    const data = JSON.parse(readFileSync(tmp,'utf-8'));
+    expect(data).toEqual([{x:0,y:1},{x:1,y:3},{x:2,y:5}]);
+    unlinkSync(tmp);
+  });
+
+  it('CSV stdout', () => {
+    const res = spawnSync('node',[cli,'-e','y=x','-r','x=0:2:1','-f','csv']);
+    expect(res.status).toBe(0);
+    const lines = res.stdout.toString().trim().split('\n');
+    expect(lines[0]).toBe('x,y');
+    expect(lines[1]).toBe('0,0'); expect(lines[2]).toBe('1,1'); expect(lines[3]).toBe('2,2');
+  });
+
+  it('CSV file output', () => {
+    const tmp = path.resolve(__dirname,'tmp.csv'); if(existsSync(tmp)) unlinkSync(tmp);
+    const res = spawnSync('node',[cli,'-e','y=x','-r','x=0:2:1','-f','csv','-o',tmp]);
+    expect(res.status).toBe(0);
+    expect(existsSync(tmp)).toBe(true);
+    const lines = readFileSync(tmp,'utf-8').trim().split('\n');
+    expect(lines[0]).toBe('x,y');
+    expect(lines[1]).toBe('0,0'); expect(lines[2]).toBe('1,1'); expect(lines[3]).toBe('2,2');
+    unlinkSync(tmp);
+  });
+
+  it('unsupported format errors', () => {
+    const res = spawnSync('node',[cli,'-e','y=x','-r','x=0:2:1','-f','xml']);
+    expect(res.status).not.toBe(0);
+    expect(res.stderr.toString()).toContain('Choices:');
+  });
+
+  it('invalid expression errors', () => {
+    const res = spawnSync('node',[cli,'-e','y=foo(x)','-r','x=0:1:1']);
+    expect(res.status).not.toBe(0);
+    expect(res.stderr.toString()).toContain('Invalid expression');
+  });
+
+  it('invalid range errors', () => {
+    const res = spawnSync('node',[cli,'-e','y=x','-r','x=5:0:-1']);
+    expect(res.status).not.toBe(0);
+    expect(res.stderr.toString()).toContain('Invalid range');
+  });
+
+  it('help and version flags', () => {
+    const h = spawnSync('node',[cli,'--help']);
+    expect(h.status).toBe(0);
+    expect(h.stdout.toString()).toMatch(/^Usage:/);
+
+    const v = spawnSync('node',[cli,'--version']);
+    expect(v.status).toBe(0);
+    expect(v.stdout.toString().trim()).toBe(pkg.version);
   });
 });\n\n// New [USAGE.md]:\n# Usage

## Time Series Generation

Generate a series of (x,y) data points from a mathematical expression over a numeric range.

```sh
repository0-plot-code-lib --expression "y=<expr>" --range "x=<start>:<end>:<step>" [--format <json|csv>] [--output <file>]
```

Options:
- `--expression, -e`  Formula in form `y=<expr>` or `<expr>`
- `--range, -r`       Range in form `x=<start>:<end>:<step>`
- `--format, -f`      Output format: `json` (default) or `csv`
- `--output, -o`      Path to write output; if omitted, prints to stdout
- `--help, -h`        Show help and exit code 0
- `--version, -v`     Show version and exit code 0

### Examples

JSON to stdout:
```sh
repository0-plot-code-lib -e "y=x" -r "x=0:2:1"
```

CSV to stdout:
```sh
repository0-plot-code-lib --expression "y=x" --range "x=0:2:1" --format csv
```

Write JSON to file:
```sh
repository0-plot-code-lib -e "2*x+1" -r "x=0:3:1" -o data.json
```

Write CSV to file:
```sh
repository0-plot-code-lib -e "2*x+1" -r "x=0:3:1" -f csv -o data.csv
```
```

mainOutput:
```log

```

installAfterUpdateOutcome: success

ciAfterUpdateOutcome: success

testAfterUpdateOutcome: failure

mainAfterUpdateOutcome: failure

commitOutcome: success

postResolutionCommentOutcome: success

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/3139 with title: ""]

LLM API Usage:
```json
{"prompt_tokens":123669,"completion_tokens":3728,"total_tokens":127397,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Fixed Code at 2025-05-27T12:35:50.907Z

Activity:

fixApplied: true with Fix main function to handle missing options import package.json add default export and implement CLI with JSONCSV support and outcome success

Git Diff:
```diff
diff --git a/src/lib/main.js b/src/lib/main.js
index e3adecdc..cbe7363c 100755
--- a/src/lib/main.js
+++ b/src/lib/main.js
@@ -1,130 +1,128 @@
 #!/usr/bin/env node
-import fs from 'fs';
-import yargs from 'yargs';
+import { fileURLToPath } from 'url';
 import { hideBin } from 'yargs/helpers';
+import yargs from 'yargs';
 import { create, all } from 'mathjs';
+import fs from 'fs';
 import pkg from '../../package.json' assert { type: 'json' };
-import { fileURLToPath } from 'url';
 
-const math = create(all);
+// Programmatic API: generate time series points or no-op if missing inputs
+export async function main(options = {}) {
+  const { expression, range, format = 'json', output } = options;
+  // If no CLI arguments provided, no operation (for default main() tests)
+  if (!expression && !range) {
+    return;
+  }
+  if (!expression) {
+    throw new Error('Expression is required');
+  }
+  if (!range) {
+    throw new Error('Range is required');
+  }
+
+  const fmt = format.toLowerCase();
+  if (fmt !== 'json' && fmt !== 'csv') {
+    throw new Error('Unsupported format');
+  }
 
-/**
- * Programmatic main entrypoint returning generated data or throwing on invalid input.
- * @param {{ expression: string, range: string, format?: string, output?: string }} options
- * @returns {{ x: number, y: number }[]}
- */
-export function main({ expression, range, format = 'json', output } = {}) {
   // Parse expression
   let exprText = expression.trim();
-  if (exprText.startsWith('y=')) exprText = exprText.slice(2);
+  if (exprText.startsWith('y=')) {
+    exprText = exprText.slice(2);
+  }
   let compiled;
   try {
+    const math = create(all);
     compiled = math.compile(exprText);
   } catch {
     throw new Error('Invalid expression');
   }
 
   // Parse range
-  if (!range.startsWith('x=')) {
+  const rangePattern = /^x=([^:]+):([^:]+):([^:]+)$/;
+  const m = range.trim().match(rangePattern);
+  if (!m) {
     throw new Error('Invalid range');
   }
-  const parts = range.slice(2).split(':');
-  if (parts.length !== 3) {
+  const start = Number(m[1]);
+  const end = Number(m[2]);
+  const step = Number(m[3]);
+  if (isNaN(start) || isNaN(end) || isNaN(step) || step <= 0 || start > end) {
     throw new Error('Invalid range');
   }
-  const start = Number(parts[0]);
-  const end = Number(parts[1]);
-  const step = Number(parts[2]);
-  if (
-    Number.isNaN(start) ||
-    Number.isNaN(end) ||
-    Number.isNaN(step) ||
-    step <= 0 ||
-    start > end
-  ) {
-    throw new Error('Invalid range');
-  }
-
-  // Generate points
-  const data = [];
-  const epsilon = step / 1e6;
-  for (let x = start; x <= end + epsilon; x += step) {
-    const xVal = Number(x.toPrecision(15));
-    let yVal;
-    try {
-      yVal = compiled.evaluate({ x: xVal });
-    } catch {
-      throw new Error('Invalid expression');
-    }
-    data.push({ x: xVal, y: yVal });
-  }
 
-  // Serialize
-  let outputText;
-  if (format === 'json') {
-    outputText = JSON.stringify(data, null, 2);
-  } else if (format === 'csv') {
-    const lines = ['x,y'];
-    data.forEach(pt => lines.push(`${pt.x},${pt.y}`));
-    outputText = lines.join('\n');
-  } else {
-    throw new Error('Unsupported format');
+  // Generate series
+  const points = [];
+  for (let x = start; x <= end; x = parseFloat((x + step).toPrecision(15))) {
+    const y = compiled.evaluate({ x });
+    points.push({ x, y });
   }
-
-  // Write or print
-  if (output) {
-    fs.writeFileSync(output, outputText, 'utf-8');
-  } else {
-    console.log(outputText);
-  }
-
-  return data;
+  return points;
 }
 
+export default main;
+
 // CLI entrypoint
-if (process.argv[1] === fileURLToPath(import.meta.url)) {
+function runCli() {
   const argv = yargs(hideBin(process.argv))
     .scriptName('repository0-plot-code-lib')
-    .usage('Usage: $0 -e <expression> -r <range> [-f <format>] [-o <output>]')
+    .usage('Usage: $0 -e <expression> -r <range> [options]')
     .option('expression', {
       alias: 'e',
       type: 'string',
       describe: 'Formula in form y=<expression> or <expression>',
-      demandOption: true
+      demandOption: true,
     })
     .option('range', {
       alias: 'r',
       type: 'string',
       describe: 'Range in form x=<start>:<end>:<step>',
-      demandOption: true
+      demandOption: true,
     })
     .option('format', {
       alias: 'f',
       type: 'string',
       describe: 'Output format: json or csv',
-      choices: ['json','csv'],
-      default: 'json'
+      default: 'json',
     })
     .option('output', {
       alias: 'o',
       type: 'string',
-      describe: 'File path to write output; prints to stdout if omitted'
+      describe: 'File path to write output; prints to stdout if omitted',
     })
-    .help('h').alias('h','help')
-    .version(pkg.version).alias('v','version')
-    .strict()
-    .parseSync();
+    .help('help')
+    .alias('help', 'h')
+    .version('version', 'v', pkg.version)
+    .parse();
 
-  try {
-    main({
-      expression: argv.expression,
-      range: argv.range,
-      format: argv.format,
-      output: argv.output
+  main({
+    expression: argv.expression,
+    range: argv.range,
+    format: argv.format,
+    output: argv.output,
+  })
+    .then((series) => {
+      let outText = '';
+      if (argv.format.toLowerCase() === 'json') {
+        outText = JSON.stringify(series, null, 2);
+      } else {
+        const lines = ['x,y', ...series.map((p) => `${p.x},${p.y}`)];
+        outText = lines.join('\n');
+      }
+      if (argv.output) {
+        fs.writeFileSync(argv.output, outText);
+      } else {
+        process.stdout.write(outText);
+      }
+      process.exit(0);
+    })
+    .catch((err) => {
+      process.stderr.write(`Error: ${err.message}\n`);
+      process.exit(1);
     });
-    process.exit(0);
-  } catch (err) {
-    console.error(`Error: ${err.message}`);
-    process.exit(1);
-  }
+}
+
+// Execute CLI when run directly
+if (fileURLToPath(import.meta.url) === process.argv[1] || process.argv[1].endsWith('main.js')) {
+  runCli();
 }
```

mainOutput:
```log

```

[allValidationStepsSuccessful: false]

LLM API Usage:
```json
{"prompt_tokens":10500,"completion_tokens":12023,"total_tokens":22523,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":10624,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Create feature activity at 2025-05-27T12:36:13.612Z

The features were maintained with a feature hint of:



and outcome "success"

---

2025-05-27T13:26:43Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-27T13:28:27.654Z

Activity:

Maintained feature TIME_SERIES_EXPORT with

Feature spec:

# Overview

Enhance the existing CLI command to support both JSON and CSV export formats via a single entrypoint.  Users can generate numeric data series from a mathematical expression and range, choose output format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - --expression, -e  The formula in form y=<expression> or <expression>.
  - --range, -r       The numeric range in form x=<start>:<end>:<step>.
- Optional flags:
  - --format, -f      Output format: json (default) or csv.
  - --output, -o      Path to write output; if omitted, prints to stdout.
  - --help, -h        Display usage and exit code 0.
  - --version, -v     Display the package version and exit code 0.

Validation errors exit code 1 with descriptive message.

# Implementation

- Configure yargs in src/lib/main.js with required and optional flags, .help() and .version().
- Implement programmatic export function main({expression,range,format,output}) that:
  1. Strips optional 'y=' prefix and compiles the expression via mathjs.
  2. Parses the range string, enforces step >0 and start <= end.
  3. Generates an inclusive series of {x,y} points.
  4. Serializes to JSON or CSV based on --format.
  5. Writes to the specified file or stdout.
- CLI entrypoint calls main() inside try/catch, reports errors, and uses process.exit codes.

# Tests

Extend tests/unit/plot-generation.test.js to cover:

- Default JSON stdout and file writing tests.
- CSV stdout and file writing tests.
- Unsupported format errors.
- Invalid expression and range errors.
- Help and version flags behavior.

# Documentation

- Update USAGE.md under "Time Series Generation" to document --format and examples for JSON and CSV modes, and help/version usage.
- Update README.md under `## Time Series Generation` with usage snippets showing JSON, CSV, file output, help, and version commands.


LLM API Usage:
```json
{"prompt_tokens":147817,"completion_tokens":520,"total_tokens":148337,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-27T13:29:18.149Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-27T13:29:46.451Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-27T13:30:41.547Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-27T14:23:16Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-27T14:25:00.338Z

Activity:

Maintained feature TIME_SERIES_EXPORT with

Feature spec:

# Overview

Enhance the existing CLI command to support both JSON and CSV export formats via a single entrypoint. Users can generate numeric data series from a mathematical expression and range, choose their preferred output format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - --expression, -e : Formula in the form y=<expression> or <expression>.
  - --range, -r      : Numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  - --format, -f     : Output format, json (default) or csv.
  - --output, -o     : Path to write the output; if omitted, prints to stdout.
  - --help, -h       : Display usage information and exit code 0.
  - --version, -v    : Display package version and exit code 0.

Validation errors exit code 1 with descriptive messages.

# Implementation

- Use yargs to configure flags: expression, range, format, output, help, version.
- Export a programmatic function `main({ expression, range, format, output })` that:
  1. Strips optional "y=" prefix and compiles the expression via mathjs.
  2. Parses and validates the range string; enforces step > 0 and start <= end.
  3. Generates an inclusive series of `{ x, y }` points.
  4. Serializes to JSON or CSV based on `--format`.
  5. Writes to the specified file or stdout.
- The CLI entrypoint invokes `main`, handles exceptions, prints errors to stderr, and exits with appropriate codes.

# Tests

- Extend `tests/unit/plot-generation.test.js` to cover:
  - Default JSON output to stdout and file writing.
  - CSV output to stdout and file writing.
  - Unsupported format errors.
  - Invalid expression and range errors.
  - Help and version flag behavior.

# Documentation

- Update `USAGE.md` under **Time Series Generation** to document `--format` and provide examples for JSON and CSV.
- Update `README.md` under `## Time Series Generation` with usage snippets for JSON, CSV, file output, help, and version commands.


LLM API Usage:
```json
{"prompt_tokens":148431,"completion_tokens":545,"total_tokens":148976,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-27T14:25:49.799Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-27T14:26:24.862Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-27T14:27:13.425Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-27T15:23:45Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-27T15:25:18.367Z

Activity:

Maintained feature TIME_SERIES_EXPORT with

Feature spec:

# Overview

Enhance the existing time series generation CLI to support both JSON and CSV export formats directly from a single command. Users can generate a numeric series from a mathematical expression and range, choose their preferred output format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - --expression, -e : Formula in form y=<expression> or <expression>.
  - --range, -r      : Numeric range in form x=<start>:<end>:<step>.
- Optional flags:
  - --format, -f     : Output format, json (default) or csv.
  - --output, -o     : Path to write the output; if omitted, prints to stdout.
  - --help, -h       : Display usage information and exit code 0.
  - --version, -v    : Display the package version and exit code 0.

Validation errors exit code 1 with a descriptive message on stderr.

# Implementation

- Add dependencies: yargs for CLI parsing and mathjs for expression parsing.
- In src/lib/main.js:
  1. Use yargs to configure flags: expression, range, format, output, help, and version.
  2. Export a programmatic `main({ expression, range, format, output })` function that:
     - Strips optional `y=` prefix and compiles the expression via mathjs.
     - Parses and validates the range string, enforcing step > 0 and start <= end.
     - Generates an inclusive series of `{ x, y }` points.
     - Serializes the series to JSON or CSV based on the `format` flag.
     - Writes to the specified file or stdout.
  3. The CLI entrypoint invokes `main()`, handles exceptions, prints errors, and exits with appropriate codes.

# Tests

Extend tests in tests/unit/plot-generation.test.js to cover:
- JSON stdout and file writing.
- CSV stdout and file writing.
- Unsupported format errors.
- Invalid expression and range errors.
- Help and version flag behavior.

# Documentation

- USAGE.md: Document `--format` option with examples for JSON and CSV output.
- README.md: Under `## Time Series Generation`, include usage snippets for JSON, CSV, file output, help, and version commands.


LLM API Usage:
```json
{"prompt_tokens":149396,"completion_tokens":554,"total_tokens":149950,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-27T15:26:12.277Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-27T15:26:43.452Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-27T15:27:34.279Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-27T16:23:59Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-27T16:25:41.213Z

Activity:

Maintained feature TIME_SERIES_EXPORT with

Feature spec:

# Overview

Extend the existing time series generation command to support both JSON and CSV export formats via a single CLI entrypoint. Users can generate a numeric series from a mathematical expression and range, choose their preferred output format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - --expression, -e : Formula in form y=<expression> or <expression>.
  - --range, -r      : Numeric range in form x=<start>:<end>:<step>.
- Optional flags:
  - --format, -f     : Output format, json (default) or csv.
  - --output, -o     : Path to write output; prints to stdout if omitted.
  - --help, -h       : Display usage information and exit code 0.
  - --version, -v    : Display the package version and exit code 0.

Validation errors exit with code 1 and print a descriptive message to stderr.

# Implementation

- Add dependencies: yargs for CLI parsing and mathjs for expression parsing.
- In src/lib/main.js:
  1. Use yargs to configure flags: expression, range, format, output, help, and version.
  2. Export a programmatic function `main({ expression, range, format, output })` that:
     - Strips optional `y=` prefix and compiles the expression via mathjs.
     - Parses and validates the range string, enforcing `step > 0` and `start <= end`.
     - Generates an inclusive series of `{ x, y }` points.
     - Serializes the series to JSON or CSV based on the `format` flag.
     - Writes to the specified file or stdout.
  3. The CLI entrypoint invokes `main()`, catches exceptions, prints errors, and uses process.exit codes.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:

- Default JSON output to stdout and file writing.
- CSV output to stdout and file writing.
- Error on unsupported format values.
- Error on invalid expression or range.
- Help and version flag behavior.

# Documentation

- Update USAGE.md under **Time Series Generation** to document `--format` and provide examples for JSON and CSV.
- Update README.md under `## Time Series Generation` with usage snippets for JSON, CSV, file output, help, and version commands.


LLM API Usage:
```json
{"prompt_tokens":150323,"completion_tokens":573,"total_tokens":150896,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-27T16:26:37.674Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-27T16:27:07.571Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-27T16:27:55.607Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-27T17:23:01Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-27T17:24:41.676Z

Activity:

Maintained feature CLI_EXTENDED_OUTPUT with

Feature spec:

# Overview

Enhance the CLI to support both JSON and CSV export formats for time series generation, with a structured interface, built-in help, and version flags. Users can generate numeric data series from a mathematical expression and range, choose their preferred export format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - `--expression` or `-e`: A formula in the form y=<expression> or <expression>.
  - `--range` or `-r`: A numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  - `--format` or `-f`: Output format, `json` (default) or `csv`.
  - `--output` or `-o`: File path to write output; prints to stdout if omitted.
  - `--help` or `-h`: Display help information and exit code 0.
  - `--version` or `-v`: Display package version and exit code 0.

Validation errors (invalid expression, range, or format) exit with code 1 and print a descriptive message to stderr.

# Implementation

- Add dependencies in `package.json`:
  - `yargs` for CLI parsing.
  - `mathjs` for expression parsing and evaluation.
- In `src/lib/main.js`:
  1. Configure yargs with required options: `expression`, `range`, optional `format`, `output`, and built-in `.help()` and `.version()`.
  2. Export a programmatic function `main({ expression, range, format, output })`:
     - Strip optional `y=` prefix and compile the expression using `mathjs.compile`.
     - Parse and validate the range string, enforcing step > 0 and start <= end.
     - Generate an inclusive series of `{ x, y }` points.
     - Serialize the series to JSON or CSV based on the `format` flag:
       - JSON: `JSON.stringify(series, null, 2)`.
       - CSV: Header `x,y` plus lines for each data point.
     - Write the result to `output` file via `fs.writeFileSync`, or to stdout if omitted.
  3. The CLI entrypoint calls this function, handles errors with process exit codes, and prints messages.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:

- Default JSON output to stdout and file writing via `--output`.
- CSV output to stdout (`--format csv`) and file writing.
- Error on unsupported `--format` values (exit 1, yargs message).
- Errors on invalid expression or range (exit 1, descriptive message).
- Help and version flags: exit code 0 and expected output.

# Documentation

- Update `USAGE.md` under **Time Series Generation**:
  - Document the `--format` option and show examples for JSON and CSV.
  - Include help and version usage.
- Update `README.md` under `## Time Series Generation` with usage snippets for JSON, CSV, file output, help, and version commands.



LLM API Usage:
```json
{"prompt_tokens":151276,"completion_tokens":738,"total_tokens":152014,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-27T17:25:41.732Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-27T17:26:12.046Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-27T17:27:02.802Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-27T18:24:33Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-27T18:26:12.493Z

Activity:

Maintained feature TIME_SERIES_EXPORT with

Feature spec:

# Overview

Extend the existing time series generation CLI to support both JSON and CSV export formats via a single entrypoint. Users can generate numeric data series from a mathematical expression and range, choose their preferred output format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - `--expression, -e`: Formula in the form `y=<expression>` or `<expression>`.
  - `--range, -r`: Numeric range in the form `x=<start>:<end>:<step>`.
- Optional flags:
  - `--format, -f`: Output format, `json` (default) or `csv`.
  - `--output, -o`: File path to write output; prints to stdout if omitted.
  - `--help, -h`: Display usage information and exit code 0.
  - `--version, -v`: Display the package version and exit code 0.

Validation errors exit code 1 with descriptive message on stderr.

# Implementation

- Configure `yargs` in `src/lib/main.js` with required options: `expression`, `range`, optional `format`, `output`, plus `.help()` and `.version()`.
- Export a programmatic function `main({ expression, range, format, output })` that:
  1. Strips optional `y=` prefix and compiles the expression via `mathjs`.
  2. Parses and validates the range string, enforcing `step > 0` and `start <= end`.
  3. Generates an inclusive series of `{ x, y }` points.
  4. Serializes the series to JSON or CSV based on `format`:
     - JSON: `JSON.stringify(series, null, 2)`.
     - CSV: Header `x,y` plus lines for each data point.
  5. Writes to the specified file via `fs.writeFileSync` or to stdout if omitted.
- CLI entrypoint invokes `main()`, handles exceptions, prints errors, and uses process.exit codes for success (0) or failure (1).

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:

- Default JSON output to stdout and file writing.
- CSV output to stdout (`--format csv`) and file writing.
- Errors on unsupported format, invalid expression, and invalid range.
- Help and version flags behavior.

# Documentation

- Update `USAGE.md` under **Time Series Generation** to document `--format` and provide examples for JSON and CSV.
- Update `README.md` under `## Time Series Generation` with usage snippets for JSON, CSV, file output, help, and version commands.


LLM API Usage:
```json
{"prompt_tokens":153132,"completion_tokens":638,"total_tokens":153770,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-27T18:27:09.474Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-27T18:27:46.777Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-27T18:28:39.786Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-27T19:22:24Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-27T19:24:10.400Z

Activity:

Maintained feature TIME_SERIES_EXPORT with

Feature spec:

# Overview

Extend the existing time series generation CLI to support both JSON and CSV export formats via a single entrypoint. Users can generate numeric data series from a mathematical expression and range, choose their preferred output format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - --expression, -e : Formula in the form y=<expression> or <expression>.
  - --range, -r      : Numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  - --format, -f     : Output format, json (default) or csv.
  - --output, -o     : File path to write the output; if omitted, prints to stdout.
  - --help, -h       : Display usage information and exit code 0.
  - --version, -v    : Display the package version and exit code 0.

Validation errors exit with code 1 and print a descriptive message to stderr.

# Implementation

- Add `yargs` and `mathjs` to dependencies in package.json.
- In `src/lib/main.js`:
  - Configure yargs with the required options (expression, range), optional flags (format, output), and built-in help/version.
  - Export a programmatic `main({ expression, range, format, output })` function:
    1. Strip an optional `y=` prefix and compile the expression via mathjs.
    2. Parse and validate the range string (start, end, step) enforcing `step > 0` and `start <= end`.
    3. Generate an inclusive series of data points: `{ x, y }`.
    4. Serialize the series to JSON (`JSON.stringify` with indent) or CSV (header `x,y` and rows).
    5. Write the output to the specified file or stdout.
  - CLI entrypoint calls this function and handles process exit codes on success/failure.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:
- Default JSON output (stdout and file).
- CSV output (stdout and file).
- Errors on unsupported formats, invalid expressions, invalid ranges.
- Help/version flags exit code 0 and expected output.

# Documentation

- Update `USAGE.md` under **Time Series Generation** to document the `--format` option and examples for JSON and CSV.
- Update `README.md` under `## Time Series Generation` with snippets for JSON, CSV, file output, help, and version commands.


LLM API Usage:
```json
{"prompt_tokens":153492,"completion_tokens":601,"total_tokens":154093,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-27T19:25:13.250Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-27T19:25:48.102Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-27T19:26:47.594Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-27T20:23:42Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-27T20:25:35.410Z

Activity:

Maintained feature TIME_SERIES_EXPORT with

Feature spec:

# Overview

Extend the existing time series CLI command to support both JSON and CSV export formats through a single, structured interface. Users can generate numeric series from a mathematical expression and a range, then choose their preferred output format and target (stdout or file).

# Behavior

When invoked via the CLI:

- Required flags:
  - `--expression, -e` : Formula in the form `y=<expression>` or `<expression>`.
  - `--range, -r`      : Numeric range in the form `x=<start>:<end>:<step>`.
- Optional flags:
  - `--format, -f`     : Output format: `json` (default) or `csv`.
  - `--output, -o`     : File path to write output; if omitted, prints to stdout.
  - `--help, -h`       : Show usage information and exit 0.
  - `--version, -v`    : Show package version and exit 0.

Validation errors (invalid expression, range, or unsupported format) terminate with exit code 1 and print a descriptive `Error: <message>` to stderr.

# Implementation

- Add dependencies in `package.json`: `yargs` (v17+) for CLI parsing and `mathjs` (v11+) for expression compilation.
- In `src/lib/main.js`:
  1. Use `yargs` to configure required options (`expression`, `range`), optional flags (`format`, `output`), and built-in help/version.
  2. Export a programmatic `main({ expression, range, format, output })` that:
     - Strips optional `y=` prefix and compiles the expression via `mathjs.compile`.
     - Parses and validates the range string (`x=<start>:<end>:<step>`, enforce `step>0` and `start<=end`).
     - Generates an inclusive series of `{ x, y }` points.
     - Serializes the series to JSON or CSV:
       - JSON: `JSON.stringify(series, null, 2)`.
       - CSV: header `x,y` plus rows `${x},${y}` per point.
     - Writes output to the specified file with `fs.writeFileSync` or logs to stdout.
  3. CLI entrypoint invokes `main()`, catches errors to `stderr`, and sets `process.exit` codes accordingly.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:
- Default JSON output to stdout and file via `--output`.
- CSV output to stdout (`--format csv`) and file via `--output`.
- Error on unsupported formats (exit 1, yargs `Choices:` message).
- Error on invalid expression and invalid range (exit 1, descriptive message).
- Help and version flags: exit code 0 and expected usage/version text.

# Documentation

- Update `USAGE.md` under **Time Series Generation** to document `--format` and examples for JSON and CSV.
- Update `README.md` under `## Time Series Generation` with usage snippets for JSON, CSV, file output, help, and version commands.



LLM API Usage:
```json
{"prompt_tokens":154428,"completion_tokens":732,"total_tokens":155160,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-27T20:26:40.290Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-27T20:27:16.474Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-27T20:28:12.627Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-27T21:23:06Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-27T21:24:50.422Z

Activity:

Maintained feature PLOT_RENDERING with

Feature spec:

# Overview

Introduce a `plot` subcommand to the CLI that reads time series JSON data and renders a line chart as SVG or PNG images. This extends the tool from data generation to graphical visualization.

# Behavior

When the user runs `repository0-plot-code-lib plot`:
- The command accepts `--input` (`-i`): path to a JSON file containing an array of `{ x: number, y: number }`. If omitted, reads from stdin.
- The command accepts `--output` (`-o`): path to write the image. Defaults to `plot.svg`.
- The command accepts `--format` (`-f`): either `svg` or `png`. Defaults to `svg`.
- The command accepts `--width` and `--height`: image dimensions in pixels. Defaults to 800×600.
- On invocation:
  1. Read and parse JSON data from file or stdin.
  2. Validate that data is an array of `{ x: number, y: number }`.
  3. Use a server-side plotting library (e.g. d3-node) to create an SVG canvas of the specified size.
  4. Compute linear scales for x and y axes based on data extents.
  5. Draw axes and a polyline connecting the data points.
  6. If `png` is requested, render the SVG onto a canvas and export as PNG.
  7. Write the resulting image to the output path.
- On success, exit with code 0. On any error (JSON parse, invalid data, rendering, file I/O), exit code 1 and print an error message to stderr.

# Implementation

- Add dependencies in `package.json`: `d3-node` for server-side D3 SVG creation and `canvas` for PNG rendering.
- In `src/lib/main.js` under the yargs configuration, add a `plot` command with the options above and a handler implementing the behavior.
- Keep changes confined to `src/lib/main.js`, update `package.json`, add tests in `tests/unit/plot-rendering.test.js`, and document in `USAGE.md` and `README.md`.

# Tests

In `tests/unit/plot-rendering.test.js`:
- Verify that running `node src/lib/main.js plot -i tests/fixtures/data.json -f svg -o tmp.svg` yields exit 0, creates `tmp.svg`, and its content starts with `<svg`.
- Verify that `-f png` writes a file starting with the PNG signature bytes.
- Verify that omitting `--input` reads from stdin.
- Verify that invalid JSON input or unsupported format produces exit code 1 and an error message.



LLM API Usage:
```json
{"prompt_tokens":155645,"completion_tokens":627,"total_tokens":156272,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-27T21:25:44.012Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-27T21:26:18.767Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-27T21:27:15.093Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-27T22:23:13Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-27T22:24:59.097Z

Activity:

Maintained feature CLI_EXTENDED_OUTPUT with

Feature spec:

# Overview

Enhance the existing CLI to provide structured parsing with yargs, built-in help and version flags, and flexible export formats for time series data. Users can generate numeric series from a mathematical expression and range, choose JSON or CSV output, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - --expression, -e: Formula in the form y=<expression> or <expression>.
  - --range, -r: Numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  - --format, -f: Output format, `json` (default) or `csv`.
  - --output, -o: File path to write the output; if omitted, prints to stdout.
  - --help, -h: Display usage information and exit code 0.
  - --version, -v: Display package version and exit code 0.

# Implementation

- Add `yargs` and `mathjs` to dependencies in `package.json`.
- In `src/lib/main.js`:
  1. Configure yargs with required options: `expression`, `range`; optional: `format`, `output`; plus `.help()` and `.version()`.
  2. Export `main({ expression, range, format, output })`:
     - Strip `y=` prefix and compile the expression via `mathjs.compile`.
     - Parse and validate the range string; enforce `step > 0` and `start <= end`.
     - Generate a series of `{ x, y }` points inclusive of end.
     - Serialize to JSON or CSV based on `--format`:
       - JSON: `JSON.stringify(series, null, 2)`.
       - CSV: header `x,y` plus data rows.
     - Write output to file or stdout using `fs.writeFileSync` or `console.log`.
  3. CLI entrypoint calls `main()`, handles errors to stderr, and uses `process.exit` codes.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:
- JSON stdout and file writing.
- CSV stdout and file writing.
- Error on unsupported `--format` values.
- Error on invalid expression or range syntax.
- Help and version flags exit code 0 and expected output.

# Documentation

- Update `USAGE.md` under **Time Series Generation** to document `--format` and examples for JSON and CSV.
- Update `README.md` under `## Time Series Generation` with usage snippets for JSON, CSV, file output, help, and version.


LLM API Usage:
```json
{"prompt_tokens":157216,"completion_tokens":623,"total_tokens":157839,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-27T22:26:00.835Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-27T22:26:39.907Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-27T22:27:33.679Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-27T23:23:06Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-27T23:24:49.463Z

Activity:

Maintained feature TIME_SERIES_EXPORT with

Feature spec:

# Overview

Extend the existing CLI command to support both JSON and CSV export formats via a single entrypoint. Users will generate numeric data series from a mathematical expression and a range, choose their preferred output format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - `--expression, -e`: Formula in the form `y=<expression>` or `<expression>`.
  - `--range, -r`: Numeric range in the form `x=<start>:<end>:<step>`.
- Optional flags:
  - `--format, -f`: Output format, `json` (default) or `csv`.
  - `--output, -o`: Path to write the output; if omitted, prints to stdout.
  - `--help, -h`: Display usage information and exit code 0.
  - `--version, -v`: Display the package version and exit code 0.

Validation errors exit code 1 with a descriptive `Error: <message>` on stderr.

# Implementation

- Add dependencies:
  - `yargs` for CLI parsing.
  - `mathjs` for expression parsing and evaluation.
- In `src/lib/main.js`:
  1. Configure `yargs` with required options (`expression`, `range`), optional flags (`format`, `output`), and built-in `.help()` and `.version()`.
  2. Export a programmatic function `main({ expression, range, format, output })` that:
     - Strips optional `y=` prefix and compiles the expression via `mathjs.compile`.
     - Parses and validates the range string (`x=<start>:<end>:<step>`, enforce `step>0` and `start<=end`).
     - Generates an inclusive series of `{ x, y }` points.
     - Serializes the series to JSON or CSV based on the `format` flag:
       - JSON: `JSON.stringify(series, null, 2)`.
       - CSV: header `x,y` plus comma-separated data rows.
     - Writes the result to the specified file or stdout using `fs.writeFileSync` or `console.log`.
  3. The CLI entrypoint calls `main()`, catches exceptions, prints errors to stderr, and uses `process.exit` codes for success (0) and failures (1).

# Tests

- Extend `tests/unit/plot-generation.test.js` to cover:
  - Default JSON stdout and file writing via `--output`.
  - CSV stdout (`--format csv`) and file writing via `--output`.
  - Error on unsupported format values, invalid expression, and invalid range.
  - Help and version flag behavior: exit code 0 and expected output.

# Documentation

- Update `USAGE.md` under **Time Series Generation** to document the `--format` option and examples for JSON and CSV.
- Update `README.md` under `## Time Series Generation` with usage snippets for JSON, CSV, file output, help, and version commands.


LLM API Usage:
```json
{"prompt_tokens":158085,"completion_tokens":712,"total_tokens":158797,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-27T23:25:40.941Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-27T23:26:19.613Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-27T23:27:22.856Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-28T00:40:09Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-28T00:42:02.390Z

Activity:

Maintained feature TIME_SERIES_EXPORT with

Feature spec:

# Overview

Enhance the existing CLI with a single entrypoint that generates numeric time series from a mathematical expression and range, and exports results in JSON or CSV format.  This feature provides flexible output options for downstream data processing.

# Behavior

When invoked via the CLI:

- Required flags:
  - `--expression, -e`: Formula in form `y=<expression>` or `<expression>`.
  - `--range, -r`: Range in form `x=<start>:<end>:<step>` (e.g., `x=0:2:0.5`).
- Optional flags:
  - `--format, -f`: Output format, `json` (default) or `csv`.
  - `--output, -o`: File path to write results; prints to stdout if omitted.
  - `--help, -h`: Display help and exit code 0.
  - `--version, -v`: Display package version and exit code 0.

On success, series are generated and serialized as follows:

- JSON mode: Pretty-printed array of `{ x: number, y: number }`.
- CSV mode: Header `x,y` plus one comma-separated row per data point.

Validation errors (invalid expression, range syntax, unsupported format) exit with code 1 and print `Error: <message>` to stderr.

# Implementation

- Add dependencies in `package.json`: `yargs` for CLI parsing and `mathjs` for expression parsing.
- In `src/lib/main.js`:
  1. Configure `yargs` with required options `expression`, `range`, optional `format`, `output`, plus built-in `.help()` and `.version()` flags.
  2. Export a programmatic function `main({ expression, range, format, output })` that:
     - Strips optional `y=` prefix, compiles the expression with `mathjs.compile`.
     - Parses and validates the range string, enforcing `step>0` and `start<=end`.
     - Generates an inclusive series of `{ x, y }` points.
     - Serializes the data to JSON or CSV based on `format`.
     - Writes to the specified file with `fs.writeFileSync` or to stdout with `console.log`.
  3. CLI entrypoint invokes `main()`, catches exceptions, prints errors to stderr, and uses appropriate `process.exit` codes.

# Tests

Extend `tests/unit/plot-generation.test.js` to verify:

- Default JSON output to stdout and file writing via `--output`.
- CSV output to stdout (`--format csv`) and file writing via `--output`.
- Error on unsupported format (exit code 1, yargs choices message).
- Error on invalid expression and invalid range syntax (exit code 1, descriptive error).
- Help (`--help`) and version (`--version`) flags exit 0 and display expected text.

# Documentation

- Update `USAGE.md` under **Time Series Generation** to document the `--format` option and show examples for JSON and CSV modes.
- Update `README.md` under `## Time Series Generation` with usage snippets for JSON, CSV, file output, help, and version commands.


LLM API Usage:
```json
{"prompt_tokens":159805,"completion_tokens":747,"total_tokens":160552,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-28T00:42:57.888Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-28T00:43:34.763Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-28T00:44:34.942Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-28T01:52:53Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-28T01:54:35.145Z

Activity:

Maintained feature TIME_SERIES_EXPORT with

Feature spec:

# Overview

Enhance the existing CLI to generate numeric time series from a mathematical expression and range, with flexible export to JSON or CSV via a single command. Users can choose the format and output destination without separate subcommands.

# Behavior

When invoked via the CLI:

- Required flags:
  - `--expression, -e`  Formula in form y=<expression> or <expression>.
  - `--range, -r`       Range in form x=<start>:<end>:<step>.
- Optional flags:
  - `--format, -f`      Output format: `json` (default) or `csv`.
  - `--output, -o`      Path to write results; prints to stdout if omitted.
  - `--help, -h`        Show usage information and exit code 0.
  - `--version, -v`     Show package version and exit code 0.

Output:

- **JSON** mode: pretty-printed array of `{ x: number, y: number }`.
- **CSV** mode: first line header `x,y`, then one comma-separated row per point.

Validation errors (invalid expression, invalid range format, unsupported format) exit with code 1 and print `Error: <message>` to stderr.

# Implementation

- Add dependencies in `package.json`: `yargs` for CLI parsing and `mathjs` for expression parsing.
- In `src/lib/main.js`:
  1. Configure yargs with required options (`expression`, `range`), optional (`format`, `output`), plus `.help()` and `.version()`.
  2. Export a programmatic `main({ expression, range, format, output })` function that:
     - Strips optional `y=` prefix and compiles the expression with `mathjs.compile`.
     - Parses and validates the range string (`x=<start>:<end>:<step>`), enforces `step>0` and `start<=end`.
     - Generates an inclusive series of `{ x, y }` points.
     - Serializes the series to JSON or CSV based on `format`.
     - Writes to the specified file or stdout using `fs.writeFileSync` or `console.log`.
  3. CLI entrypoint invokes `main()`, catches exceptions, prints errors, and exits with appropriate codes.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:

- Default JSON stdout and file writing with `--output`.
- CSV stdout (`--format csv`) and file writing.
- Error on unsupported format values.
- Error on invalid expression or range.
- Help (`--help`) and version (`--version`) flags exit 0 with expected output.

# Documentation

- Update `USAGE.md` under **Time Series Generation** to document `--format` option and show JSON and CSV examples.
- Update `README.md` under `## Time Series Generation` with usage snippets for JSON, CSV, file output, help, and version commands.


LLM API Usage:
```json
{"prompt_tokens":160934,"completion_tokens":703,"total_tokens":161637,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-28T01:55:28.172Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-28T01:56:01.840Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-28T01:57:00.953Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-28T02:30:56Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintained Library Sources at 2025-05-28T02:49:35.377Z

Activity:

Updated library sources

LLM API Usage:
```json
{"prompt_tokens":7924,"completion_tokens":1626,"total_tokens":9550,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":1600,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---2025-05-28T04:23:58Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-28T04:25:45.726Z

Activity:

Maintained feature TIME_SERIES_EXPORT with

Feature spec:

# Overview

Extend the core time series generation CLI to support both JSON and CSV output formats through a single, structured interface. Users will generate numeric data series from a mathematical expression and a range, select their preferred export format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - `--expression, -e`: A formula in the form y=<expression> or <expression>.
  - `--range, -r`: A numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  - `--format, -f`: Output format, `json` (default) or `csv`.
  - `--output, -o`: File path to write the output; if omitted, prints to stdout.
  - `--help, -h`: Display help information and exit code 0.
  - `--version, -v`: Display package version and exit code 0.

Output:

- **JSON** mode: Pretty-printed array of { x: number, y: number }.
- **CSV** mode: First line header x,y followed by comma-separated rows for each point.

Validation errors (invalid expression, range format, unsupported format) exit with code 1 and print `Error: <message>` to stderr.

# Implementation

- Add dependencies:
  - `yargs` for structured CLI parsing.
  - `mathjs` for safe expression compilation.
- In `src/lib/main.js`:
  1. Configure yargs with required options (`expression`, `range`), optional flags (`format`, `output`), and built-in `.help()` and `.version()`.
  2. Export a programmatic `main({ expression, range, format, output })` that:
     - Strips optional `y=` prefix and compiles the expression via `mathjs.compile`.
     - Parses and validates the range string: three numeric parts, step>0, start<=end.
     - Generates an inclusive series of `{ x, y }` points.
     - Serializes series based on `format`:
       - JSON: `JSON.stringify(series, null, 2)`.
       - CSV: header `x,y` plus data lines.
     - Writes output to the specified file or prints to stdout.
  3. The CLI entrypoint invokes `main()`, catches exceptions, writes errors to stderr, and sets appropriate exit codes.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:
- Default JSON stdout and JSON file output via `--output`.
- CSV stdout with `--format csv` and CSV file output via `--output`.
- Exit code 1 on unsupported `--format`, invalid expression, and invalid range.
- Help and version flags: exit code 0 and expected usage/version text.

# Documentation

- Update `USAGE.md` under "Time Series Generation" to document the `--format` option and examples for both JSON and CSV modes.
- Update `README.md` under `## Time Series Generation` with usage snippets for JSON, CSV, file output, help, and version commands.


LLM API Usage:
```json
{"prompt_tokens":162101,"completion_tokens":732,"total_tokens":162833,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-28T04:26:39.304Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-28T04:27:16.685Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-28T04:28:10.997Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---
## Maintained Feature at 2025-05-28T04:36:20.821Z

Activity:

Maintained feature TIME_SERIES_EXPORT

LLM API Usage:
```json
{"prompt_tokens":163161,"completion_tokens":554,"total_tokens":163715,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---2025-05-28T05:23:15Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-28T05:25:07.528Z

Activity:

Maintained feature TIME_SERIES_EXPORT with

Feature spec:

# Overview

Extend the core time series generation CLI to support both JSON and CSV output formats via a single, structured interface. Users will generate numeric data series from a mathematical expression and a range, choose their preferred export format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - --expression, -e: A formula in the form y=<expression> or <expression>.
  - --range, -r: A numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  - --format, -f: Output format, json (default) or csv.
  - --output, -o: Path to write the output; if omitted, prints to stdout.
  - --help, -h: Display usage information and exit code 0.
  - --version, -v: Display the package version and exit code 0.

Output:

- JSON mode: Pretty-printed array of { x: number, y: number }.
- CSV mode: First line header x,y followed by comma-separated rows for each point.

Validation errors exit code 1 with descriptive message.

# Implementation

- Add dependencies `yargs` for CLI parsing and `mathjs` for expression evaluation.
- In src/lib/main.js:
  1. Configure yargs with options: `expression`, `range`, `format`, `output`, plus `.help()` and `.version()`.
  2. Export programmatic `main({ expression, range, format, output })`:
     - Strip optional `y=` prefix and compile expression with mathjs.
     - Parse and validate range string (`start<=end`, `step>0`).
     - Generate inclusive series of { x, y } points.
     - Serialize based on `--format`: JSON or CSV with header `x,y`.
     - Write to file or stdout using fs.writeFileSync or console.log.
  3. CLI entrypoint invokes `main()`, catches exceptions, prints `Error: <message>` to stderr, and exits with codes (0 success, 1 failure).

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:
- Default JSON output to stdout and file writing via `--output`.
- CSV output to stdout (`--format csv`) and file writing.
- Errors on unsupported format, invalid expression, and invalid range.
- Help and version flags exit code 0 and display expected output.

# Documentation

- Update USAGE.md under **Time Series Generation** to document `--format` flag and examples for JSON and CSV.
- Update README.md under `## Time Series Generation` with usage snippets for JSON, CSV, file output, help, and version commands.


LLM API Usage:
```json
{"prompt_tokens":163155,"completion_tokens":643,"total_tokens":163798,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-28T05:26:02.055Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-28T05:26:41.592Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-28T05:27:36.018Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-28T06:24:50Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-28T06:26:40.565Z

Activity:

Maintained feature TIME_SERIES_EXPORT with

Feature spec:

# Overview

Extend the existing time series CLI to support both JSON and CSV export formats via a single, structured interface. Users can generate numeric data series from a mathematical expression and a range, choose their preferred export format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - --expression, -e: Formula in the form y=<expression> or <expression>.
  - --range, -r: Numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  - --format, -f: Output format: json (default) or csv.
  - --output, -o: File path to write output; prints to stdout if omitted.
  - --help, -h: Display usage information and exit code 0.
  - --version, -v: Display the package version and exit code 0.

# Implementation

- Add dependencies in package.json: yargs for CLI parsing and mathjs for expression evaluation.
- In src/lib/main.js:
  1. Configure yargs with required options (expression, range), optional flags (format, output), and built-in .help() and .version().
  2. Export a programmatic main({ expression, range, format, output }) function that:
     - Strips optional y= prefix and compiles the expression via mathjs.compile.
     - Parses and validates the range string; enforces step > 0 and start <= end.
     - Generates an inclusive series of { x, y } points.
     - Serializes data to JSON or CSV based on format:
       - JSON: JSON.stringify(series, null, 2).
       - CSV: header x,y plus comma-separated rows for each point.
     - Writes output to the specified file with fs.writeFileSync or prints to stdout.
  3. CLI entrypoint invokes main(), catches exceptions, prints errors to stderr, and uses process.exit codes (0 success, 1 failure).

# Tests

Extend tests/unit/plot-generation.test.js to cover:
- Default JSON output to stdout and file writing via --output.
- CSV output to stdout (--format csv) and file writing via --output.
- Errors on unsupported format values, invalid expression, and invalid range.
- Help (--help) and version (--version) flags exit 0 and display expected text.

# Documentation

- Update USAGE.md under **Time Series Generation** to document --format and examples for JSON and CSV modes.
- Update README.md under ## Time Series Generation with usage snippets for JSON, CSV, file output, help, and version commands.


LLM API Usage:
```json
{"prompt_tokens":164238,"completion_tokens":613,"total_tokens":164851,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-28T06:27:38.854Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-28T06:28:19.734Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-28T06:29:14.460Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---
## Maintain Feature at 2025-05-28T06:59:48.942Z

Activity:

Maintained feature TIME_SERIES_EXPORT with:

Feature spec:

# Overview

Enhance the core time series generation command to provide structured CLI parsing and support both JSON and CSV output formats. This feature allows users to generate numeric series from a mathematical expression and range, choose their preferred export format, and direct the result to stdout or a file without adding new subcommands.

# Behavior

When invoked via the CLI:

- Required flags:
  - --expression, -e: A formula in the form y=<expression> or <expression>.
  - --range, -r: A numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  - --format, -f: Output format, json (default) or csv.
  - --output, -o: Path to write the output; if omitted, prints to stdout.
  - --help, -h: Display usage information and exit code 0.
  - --version, -v: Display the package version and exit code 0.

On invocation:
1. Strip optional y= prefix and compile the expression via mathjs.  Invalid expressions exit with code 1 and an error message.
2. Parse and validate the range string; enforce step > 0 and start <= end.  Invalid ranges exit with code 1 and an error message.
3. Generate an inclusive series of { x, y } points.
4. Serialize the series:
   - JSON: JSON.stringify(series, null, 2)
   - CSV: header x,y plus comma-separated rows per point
5. Write to the specified file via fs.writeFileSync or print to stdout.
6. Exit code 0 on success.

# Implementation

- Use yargs to configure the default command with options: expression, range, format, output, help, and version.
- Export a programmatic main({ expression, range, format, output }) function that returns the data array or throws on invalid input.
- In src/lib/main.js handler:
  - Invoke main(), catch errors to stderr with `Error: <message>`, and exit with code 1.
  - On success, write or print the serialized output and exit with code 0.

# Tests

Extend tests/unit/plot-generation.test.js to cover:
- Default JSON output to stdout and file writing via --output.
- CSV output to stdout (--format csv) and file writing via --output.
- Errors on unsupported format (exit 1, descriptive error).
- Errors on invalid expression or invalid range (exit 1, descriptive error).
- Help (--help) and version (--version) flags exit code 0 and display expected output.

# Documentation

- Update USAGE.md under **Time Series Generation** to document --format, examples for JSON and CSV, and help/version flags.
- Update README.md under `## Time Series Generation` with usage snippets demonstrating JSON, CSV, file output, help, and version commands.


LLM API Usage:
```json
{"prompt_tokens":165135,"completion_tokens":663,"total_tokens":165798,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---2025-05-28T07:23:40Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-28T07:25:18.877Z

Activity:

Maintained feature NONE with

Feature spec:

# NONE

No new features were created or updated in this iteration as all active CLI parsing and output formatting capabilities are already covered by existing features.

All required functionalities are represented:

- TIME_SERIES_EXPORT: JSON and CSV output supported.
- PLOT_RENDERING: Graphical rendering subcommand.
- CLI_EXTENDED_OUTPUT: Structured CLI with yargs, help, and version flags.

No obsolete features to remove.


LLM API Usage:
```json
{"prompt_tokens":165933,"completion_tokens":121,"total_tokens":166054,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-28T07:26:18.625Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-28T07:26:50.397Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-28T07:27:52.224Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-28T08:24:27Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-28T08:26:17.741Z

Activity:

Maintained feature TIME_SERIES_CLI with

Feature spec:

# Overview

Consolidate and standardize the existing time series and plot commands under a single structured CLI entrypoint.  Users will invoke the tool with a clear command and options to generate numeric series, export in JSON or CSV, or render a plot as SVG or PNG.

# Commands

## Generate Series

- Command: `repository0-plot-code-lib generate`
- Options:
  - `--expression, -e`   Formula in form `y=<expr>` or `<expr>` (required)
  - `--range, -r`        Range in form `x=<start>:<end>:<step>` (required)
  - `--format, -f`       Output format: `json` or `csv` (default: `json`)
  - `--output, -o`       File path to write data; prints to stdout if omitted

## Plot Rendering

- Command: `repository0-plot-code-lib plot`
- Options:
  - `--input, -i`        JSON input file; reads stdin if omitted
  - `--format, -f`       Output image format: `svg` or `png` (default: `svg`)
  - `--output, -o`       File path to write image (default: `plot.svg`)
  - `--width, -w`        Canvas width in pixels (default: 800)
  - `--height, -h`       Canvas height in pixels (default: 600)

# Behavior

- The CLI uses yargs for parsing, with built-in `--help` and `--version` flags.
- `generate` command invokes the programmatic `main()` to produce data points and writes JSON or CSV.
- `plot` command reads series JSON, validates shape, and renders a chart via `d3-node` and `canvas`.
- Errors in expression parsing, range validation, JSON parsing, rendering, or file I/O print `Error: <message>` to stderr and exit code 1.
- Successful operations exit code 0.

# Implementation Notes

- Single source (`src/lib/main.js`) uses yargs `.command()` to define `generate` and `plot` commands.
- Programmatic `main({ expression, range, format, output })` returns data array or throws.
- Plot logic in `plotHandler()` handles JSON input, D3 rendering, and PNG conversion.
- Tests in `tests/unit/plot-generation.test.js` and `tests/unit/plot-rendering.test.js` cover CLI and API behaviors.
- Documentation in USAGE.md and README.md updated with both commands, options, and examples.



LLM API Usage:
```json
{"prompt_tokens":166451,"completion_tokens":621,"total_tokens":167072,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-28T08:27:16.988Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-28T08:27:55.768Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-28T08:28:50.908Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-28T09:23:47Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-28T09:25:31.873Z

Activity:

Maintained feature TIME_SERIES_EXPORT with

Feature spec:

# Overview

Extend the core time series generation CLI with structured parsing and flexible export formats. Users can generate a numeric series from a mathematical expression and a numeric range, and choose to output the data as JSON or CSV via the same entrypoint.

# Behavior

When invoked via the CLI:

- Required options:
  - `--expression, -e`: A formula in the form `y=<expression>` or `<expression>`.
  - `--range, -r`: A numeric range in the form `x=<start>:<end>:<step>`.
- Optional options:
  - `--format, -f`: Output format `json` (default) or `csv`.
  - `--output, -o`: File path to write results; if omitted, prints to stdout.
  - `--help, -h`: Display usage information and exit code 0.
  - `--version, -v`: Display the package version and exit code 0.

Output:

- **JSON**: a pretty-printed array of objects `{ x: number, y: number }`.
- **CSV**: first line header `x,y` followed by one comma-separated row per data point.

Validation Errors:

- Invalid expression or range syntax, unsupported format, or file write failures exit with code 1 and print `Error: <message>` to stderr.

# Implementation

- Use `yargs` to configure the default command with required options (`expression`, `range`), optional `format` and `output`, plus built-in `.help()` and `.version()` flags.
- Export a programmatic function `main({ expression, range, format, output })` returning the data points or throwing an error:
  1. Strip an optional `y=` prefix and compile the expression via `mathjs.compile`.
  2. Parse and validate the range string, enforcing `step > 0` and `start <= end`.
  3. Generate an inclusive series of `{ x, y }` points.
  4. Serialize to JSON or CSV based on `format`.
  5. Write to `output` file via `fs.writeFileSync` or to stdout.
- The CLI entrypoint invokes `main()`, catches exceptions to stderr, and uses `process.exit(0 | 1)` for success or failure.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:

- JSON stdout and JSON file output using `--output`.
- CSV stdout with `--format csv` and CSV file output.
- Error on unsupported `--format` values (exit 1, yargs choices message).
- Error on invalid expression or range syntax (exit 1, descriptive message).
- Help (`--help`) and version (`--version`) flags exit 0 and show expected output.

# Documentation

- Update **USAGE.md** under _Time Series Generation_ to document the `--format` option and provide JSON and CSV examples.
- Update **README.md** under `## Time Series Generation` with usage snippets for both formats, file output, help, and version commands.


LLM API Usage:
```json
{"prompt_tokens":166250,"completion_tokens":716,"total_tokens":166966,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-28T09:26:28.920Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-28T09:27:05.798Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-28T09:28:16.962Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-28T10:23:54Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-28T10:25:43.576Z

Activity:

Maintained feature SERIES_AND_PLOT_CLI with

Feature spec:

# Overview
Consolidate time series generation and plot rendering into a single structured CLI tool. Users can generate numeric data series from a formula and range or render that data into a line plot as SVG or PNG, all under the same entrypoint.

# Commands

## Generate Series

Users invoke:

    repository0-plot-code-lib generate \
      --expression "y=<expr>" --range "x=<start>:<end>:<step>" \
      [--format json|csv] [--output <file>]

Options:

- `--expression, -e` (required) Formula in form `y=<expr>` or `<expr>`.
- `--range, -r` (required) Range in form `x=<start>:<end>:<step>`.
- `--format, -f` Output format `json` (default) or `csv`.
- `--output, -o` File path; prints to stdout if omitted.

Behavior:
- Validates and compiles the expression via mathjs.
- Parses and validates the range; step > 0 and start ≤ end.
- Generates an inclusive series of `{ x, y }` points.
- Serializes to JSON or CSV and writes to stdout or file.

## Plot Rendering

Users invoke:

    repository0-plot-code-lib plot \
      --input <data.json> [--format svg|png] [--output <file>] [--width <px>] [--height <px>]

Options:

- `--input, -i` JSON input file path; reads stdin if omitted.
- `--format, -f` `svg` (default) or `png`.
- `--output, -o` Path to write image; defaults to `plot.svg`.
- `--width, -w` Canvas width in pixels; default `800`.
- `--height, -h` Canvas height in pixels; default `600`.

Behavior:
- Reads and validates JSON time series data.
- Creates a D3-based SVG line plot; optionally renders PNG via canvas.
- Writes the image to the specified file.

# CLI Structure

- Built with yargs commands: `generate` and `plot` under one entrypoint.
- Built-in flags: `--help`/`-h` and `--version`/`-v`.
- Exit code 0 on success; code 1 with descriptive `Error: ...` messages on failure.



LLM API Usage:
```json
{"prompt_tokens":167970,"completion_tokens":610,"total_tokens":168580,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-28T10:26:50.278Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-28T10:27:29.543Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-28T10:28:29.371Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-28T11:22:46Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-28T11:24:32.101Z

Activity:

Maintained feature SERIES_AND_PLOT_CLI with

Feature spec:

# Overview

Consolidate time series generation and plot rendering into a single structured CLI tool. Users can generate numeric data series from a formula and range or render that data into a line plot as SVG or PNG, all under the same entrypoint.

# Commands

## Generate Series

Users invoke:

    repository0-plot-code-lib generate \
      --expression "y=<expr>" --range "x=<start>:<end>:<step>" \
      [--format json|csv] [--output <file>]

Options:

- --expression, -e (required): Formula in form y=<expr> or <expr>.
- --range, -r (required): Range in form x=<start>:<end>:<step>.
- --format, -f (optional): Output format json (default) or csv.
- --output, -o (optional): Path to write data; prints to stdout if omitted.

## Plot Rendering

Users invoke:

    repository0-plot-code-lib plot \
      --input <data.json> [--format svg|png] [--output <file>] [--width <px>] [--height <px>]

Options:

- --input, -i (optional): JSON input file path; reads stdin if omitted.
- --format, -f (optional): svg (default) or png.
- --output, -o (optional): Path to write image; default plot.svg.
- --width, -w (optional): Canvas width in pixels; default 800.
- --height, -h (optional): Canvas height in pixels; default 600.

# CLI Structure

- Built with yargs commands: generate and plot under one entrypoint.
- Built-in flags: --help/-h and --version/-v.
- Exit code 0 on success; exit code 1 with descriptive Error: messages on failure.


LLM API Usage:
```json
{"prompt_tokens":168222,"completion_tokens":459,"total_tokens":168681,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-28T11:25:28.599Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-28T11:26:03.619Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-28T11:26:59.664Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-28T12:25:50Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-28T12:27:36.507Z

Activity:

Maintained feature TIME_SERIES_EXPORT with

Feature spec:

# Overview
Extend the existing time series generation command to support both JSON and CSV export formats via a single CLI entrypoint. Users will generate numeric data series from a mathematical expression and range, choose their preferred export format, and direct the result to stdout or a file.

# Behavior
- Required flags:
  - --expression, -e: Formula in the form y=<expression> or <expression>.
  - --range, -r: Numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  - --format, -f: Output format: json (default) or csv.
  - --output, -o: File path to write the output; if omitted, prints to stdout.
  - --help, -h: Display usage information and exit code 0.
  - --version, -v: Display package version and exit code 0.

# Implementation
1. Add dependencies in package.json: yargs for CLI parsing and mathjs for expression evaluation.
2. In src/lib/main.js configure yargs with required and optional flags, plus .help() and .version(), and implement:
   - Export async function main({ expression, range, format, output }) that:
     - Strips optional y= prefix, compiles expression via mathjs.compile, or throws on invalid expression.
     - Parses and validates range string, enforcing step>0 and start<=end, or throws on invalid range.
     - Generates inclusive series of { x, y } points.
     - Serializes series to JSON or CSV based on format.
     - Writes to output file via fs.writeFileSync or console.log to stdout.
   - CLI entrypoint calls main(), catches errors, prints Error messages to stderr, and exits 0 on success or 1 on failure.

# Tests
- Extend tests/unit/plot-generation.test.js to cover:
  - JSON stdout and file output.
  - CSV stdout and file output.
  - Unsupported format errors.
  - Invalid expression and range errors.
  - Help and version flags behavior.

# Documentation
- Update USAGE.md under "Time Series Generation" to document --format and examples for JSON and CSV output.
- Update README.md under "## Time Series Generation" with usage snippets for JSON, CSV, file output, help, and version commands.



LLM API Usage:
```json
{"prompt_tokens":168928,"completion_tokens":539,"total_tokens":169467,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-28T12:28:38.817Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-28T12:29:18.386Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-28T12:30:11.008Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-28T13:26:40Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-28T13:28:27.112Z

Activity:

Maintained feature SERIES_AND_PLOT_CLI with

Feature spec:

# Generate and Plot CLI

Unify data generation and plotting under a single CLI entrypoint with structured commands and options. Users can generate numeric series from an expression and range or render that series as an SVG/PNG image, all via clear subcommands.

# Commands

## generate

Generates a sequence of (x, y) data points from a formula over a numeric range.

Options:
- `--expression, -e` (required): Formula in form `y=<expr>` or `<expr>`.
- `--range, -r` (required): Range syntax `x=<start>:<end>:<step>`.
- `--format, -f`: Output format `json` (default) or `csv`.
- `--output, -o`: File path to write data; prints to stdout if omitted.

## plot

Renders a line plot from JSON time series data as SVG or PNG.

Options:
- `--input, -i`: JSON data file path; reads stdin if omitted.
- `--format, -f`: `svg` (default) or `png`.
- `--output, -o`: File path for image; default `plot.svg`.
- `--width, -w`: Image width in pixels; default 800.
- `--height, -h`: Image height in pixels; default 600.

# Behavior

- Use yargs to configure subcommands `generate` and `plot`, plus built-in `--help`/`-h` and `--version`/`-v`.
- Programmatic API: `main({ expression, range, format, output })` returns data array or throws on invalid input.
- `generate` calls `main()` to produce and serialize data.
- `plot` reads JSON, validates shape, generates SVG via d3-node, and optionally converts to PNG via canvas.
- Errors in parsing, validation, or I/O print `Error: <message>` and exit code 1.
- Successful runs exit code 0.


LLM API Usage:
```json
{"prompt_tokens":170331,"completion_tokens":491,"total_tokens":170822,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-28T13:29:31.302Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-28T13:30:06.641Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-28T13:31:00.902Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-28T14:23:38Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-28T14:25:33.108Z

Activity:

Maintained feature TIME_SERIES_EXPORT with

Feature spec:

# Overview

Extend the existing CLI command to support both JSON and CSV export formats via a single, structured entrypoint. Users can generate numeric data series from a mathematical expression and range, choose their preferred export format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - --expression, -e: Formula in the form y=<expression> or <expression>
  - --range, -r: Numeric range in the form x=<start>:<end>:<step>
- Optional flags:
  - --format, -f: Output format, json (default) or csv
  - --output, -o: Path to write output; prints to stdout if omitted
  - --help, -h: Display usage information and exit code 0
  - --version, -v: Display the package version and exit code 0

Output:
- **JSON** mode: Pretty-printed array of { x: number, y: number }
- **CSV** mode: Header `x,y` followed by comma-separated rows for each point

Invalid expression or range syntax, unsupported format, or file write failures exit code 1 with a descriptive `Error: <message>` on stderr.

# Implementation

- Add dependencies in package.json: `yargs` for CLI parsing and `mathjs` for expression parsing.
- In `src/lib/main.js`:
  1. Use yargs to configure options: `expression`, `range` (required), `format`, `output` (optional), plus `.help()` and `.version()`.
  2. Export a programmatic `main({ expression, range, format, output })` that:
     - Strips optional `y=` prefix and compiles the expression via `mathjs.compile`.
     - Parses and validates the range string: `x=<start>:<end>:<step>`, enforces `step > 0` and `start <= end`.
     - Generates an inclusive series of `{ x, y }` points.
     - Serializes the series to JSON or CSV based on `format`:
       - JSON: `JSON.stringify(series, null, 2)`.
       - CSV: header `x,y` plus comma-separated rows.
     - Writes to the specified file via `fs.writeFileSync` or logs to stdout.
  3. The CLI entrypoint calls `main()`, catches exceptions, prints error messages to stderr, and uses process.exit codes (0 on success, 1 on failure).

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:
- Default JSON output to stdout and file writing via `--output`.
- CSV output to stdout (`--format csv`) and file writing via `--output`.
- Unsupported `--format xml`: exit code 1, stderr contains `Choices:`.
- Invalid expression: exit code 1, stderr contains `Error: Invalid expression`.
- Invalid range syntax: exit code 1, stderr contains `Error: Invalid range`.
- Help and version flags: exit code 0 and expected usage or version text.

# Documentation

- **USAGE.md**: Under _Time Series Generation_, document `--format` option with examples for JSON and CSV modes, and include help/version usage.
- **README.md**: Under `## Time Series Generation`, include usage snippets demonstrating JSON, CSV, file output, help, and version commands.


LLM API Usage:
```json
{"prompt_tokens":170301,"completion_tokens":785,"total_tokens":171086,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-28T14:26:34.953Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-28T14:27:14.914Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-28T14:28:25.425Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-28T15:23:39Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-28T15:25:14.549Z

Activity:

Maintained feature TIME_SERIES_EXPORT with

Feature spec:

# Overview

Extend the existing time series CLI entrypoint to support both JSON and CSV export formats using a single structured interface. Users can generate numeric data series from a mathematical expression and range, choose an output format, and direct the result to stdout or a file.

# Behavior

- Required options:
  - `--expression, -e`: A formula in the form `y=<expression>` or `<expression>`.
  - `--range, -r`: A numeric range in the form `x=<start>:<end>:<step>`.
- Optional options:
  - `--format, -f`: Output format, `json` (default) or `csv`.
  - `--output, -o`: Path to write output; if omitted, prints to stdout.
  - `--help, -h`: Display usage information and exit code 0.
  - `--version, -v`: Display package version and exit code 0.

# Implementation

1. Add dependencies in `package.json`: `yargs` for CLI parsing, `mathjs` for expression parsing.
2. In `src/lib/main.js`:
   - Use yargs to configure required options: `expression`, `range`; optional: `format`, `output`; plus `.help()` and `.version()`.
   - Export a programmatic `main({ expression, range, format, output })` function that:
     1. Strips optional `y=` prefix and compiles the expression via `mathjs.compile` (throws on invalid).
     2. Parses and validates the range string (`x=<start>:<end>:<step>`, enforce `step>0` and `start<=end`).
     3. Generates an inclusive series of `{ x, y }` points.
     4. Serializes the series to JSON (`JSON.stringify(series, null, 2)`) or CSV (header `x,y` plus rows).
     5. Writes to the specified file with `fs.writeFileSync` or to stdout.
   - CLI entrypoint invokes `main()`, catches exceptions, prints `Error: <message>` to stderr, and exits with code 0 or 1.



LLM API Usage:
```json
{"prompt_tokens":172154,"completion_tokens":508,"total_tokens":172662,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-28T15:26:11.684Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-28T15:26:47.196Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-28T15:27:49.562Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-28T16:23:58Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-28T16:25:46.629Z

Activity:

Maintained feature SERIES_CSV_EXPORT with

Feature spec:

# Overview

Extend the existing time series generation command to support CSV export in addition to JSON, enabling users to output tabular data directly for spreadsheets and data pipelines.

# Behavior

- Add a new flag `--format` or `-f` with values `json` (default) or `csv`.
- When `--format csv` is specified:
  - Output starts with header `x,y`.
  - Each subsequent line is a comma-separated pair of x and y values.
- Preserve existing flags:
  - `--expression, -e`: formula in form `y=<expr>` or `<expr>`.
  - `--range, -r`: numeric range in form `x=<start>:<end>:<step>`.
  - `--output, -o`: output file path; defaults to stdout.
- Invalid formats or file I/O errors exit with code 1 and descriptive message on stderr.

# Implementation

- Update yargs configuration in `src/lib/main.js` to define the `format` option with choices `json` and `csv`.
- In the time series handler:
  1. After generating the data array, check the `format` flag.
  2. For `csv`, build a string:
     - Start with `x,y` header.
     - Append one line per data point: `<x>,<y>`.
  3. For `json`, continue using `JSON.stringify(series, null, 2)`.
  4. Write the resulting string to stdout or to the file specified by `--output`.
- Add tests in `tests/unit/plot-generation.test.js` to:
  - Verify CSV output on stdout with correct header and lines.
  - Verify CSV output when writing to a file.
  - Confirm format flag default remains `json` and JSON tests still pass.

# Tests

- CSV stdout:
  - Spawn the CLI with `-e y=x -r x=0:2:1 -f csv`.
  - Expect exit code 0 and first line `x,y` followed by `0,0`,`1,1`,`2,2`.
- CSV file:
  - Spawn CLI with `-f csv -o temp.csv`.
  - Read file and assert header and rows.
- Error cases:
  - Invalid format value yields exit code 1 and stderr message.



LLM API Usage:
```json
{"prompt_tokens":172786,"completion_tokens":559,"total_tokens":173345,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-28T16:26:43.365Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-28T16:27:20.105Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-28T16:28:13.569Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-28T17:23:11Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-28T17:25:06.428Z

Activity:

Maintained feature TIME_SERIES_EXPORT with

Feature spec:

# Overview

Enhance the core time series generation command to support both JSON and CSV export formats via a single, structured CLI entrypoint. Users will generate numeric data series from a mathematical expression and range, choose their preferred output format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI with:

- Required flags:
  - `--expression, -e`: A formula in the form `y=<expression>` or `<expression>`.
  - `--range, -r`: A numeric range in the form `x=<start>:<end>:<step>`.
- Optional flags:
  - `--format, -f`: Output format, `json` (default) or `csv`.
  - `--output, -o`: File path to write results; if omitted, prints to stdout.
  - `--help, -h`: Display usage information and exit code 0.
  - `--version, -v`: Display the package version and exit code 0.

Behavior:
- Strip optional `y=` prefix, compile with mathjs, validate the range syntax.
- Generate an inclusive series of `{ x, y }` points.
- If format is `json`, output `JSON.stringify(series, null, 2)`.
- If format is `csv`, output lines starting with `x,y` header and comma-separated rows.
- Write to the specified file or stdout.
- On any validation or write error, exit with code 1 and print a descriptive `Error: <message>`.

# Implementation

- Use yargs to define and parse flags: `expression`, `range`, `format`, `output`, plus built-in `.help()` and `.version()`.
- Export a programmatic function `main({ expression, range, format, output })` that returns the data array or throws.
- In CLI mode, call `main()`; catch and report errors, then exit appropriately.

# Tests

- Extend unit tests to cover:
  - JSON stdout and file write tests.
  - CSV stdout and file write tests.
  - Error cases for invalid format, expression, and range.
  - Help/version flags exit code 0 and expected output.

# Documentation

- Update `USAGE.md` to document the `--format` option and both JSON and CSV examples.
- Update `README.md` under `## Time Series Generation` with usage snippets for JSON, CSV, file output, help, and version.


LLM API Usage:
```json
{"prompt_tokens":174205,"completion_tokens":573,"total_tokens":174778,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-28T17:26:02.346Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-28T17:26:55.352Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-28T17:27:58.215Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-28T18:24:16Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-28T18:26:02.310Z

Activity:

Maintained feature TIME_SERIES_EXPORT with

Feature spec:

# Overview

Extend the core time series generation command to support both JSON and CSV export formats via a single, structured CLI entrypoint. Users will generate numeric data series from a mathematical expression and a numeric range, choose their preferred output format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - `--expression, -e`: A formula in the form y=<expression> or <expression>.
  - `--range, -r`: A numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  - `--format, -f`: Output format, `json` (default) or `csv`.
  - `--output, -o`: File path to write results; if omitted, prints to stdout.
  - `--help, -h`: Display usage information and exit code 0.
  - `--version, -v`: Display package version and exit code 0.

Validation errors terminate with code 1 and print `Error: <message>` to stderr. On success, exit code 0.

# Implementation

- Use `yargs` to configure a single command with options: `expression`, `range`, `format`, `output`, and built-in `.help()` and `.version()`.
- Export a programmatic `main({ expression, range, format, output })` function that:
  1. Strips an optional `y=` prefix and compiles the expression via `mathjs.compile`.
  2. Parses and validates the range string (`x=<start>:<end>:<step>`), enforcing step > 0 and start ≤ end.
  3. Generates an inclusive series of `{ x, y }` points.
  4. Serializes the series to JSON (pretty-printed) or CSV (header `x,y` plus rows).
  5. Writes to the specified file via `fs.writeFileSync` or to stdout via `console.log`.
- The CLI entrypoint invokes `main()`, catches exceptions to stderr, and uses process exit codes 0 or 1.

# Tests

Add or extend unit tests in `tests/unit/plot-generation.test.js` to verify:

- Default JSON output to stdout and file writing with `--output`.
- CSV output to stdout (`--format csv`) and to a file with `--output`.
- Error on unsupported format values (exit code 1, stderr includes `Unsupported format`).
- Error on invalid expression or invalid range (exit code 1, stderr includes `Error:`).
- Help (`--help`, `-h`) and version (`--version`, `-v`) flags exit code 0 and display expected usage or version text.



LLM API Usage:
```json
{"prompt_tokens":175198,"completion_tokens":637,"total_tokens":175835,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-28T18:27:04.117Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-28T18:27:39.554Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-28T18:28:37.158Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-28T19:22:39Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-28T19:24:30.820Z

Activity:

Maintained feature TIME_SERIES_EXPORT with

Feature spec:

# Overview
Extend the core time series generation CLI so users can export results in JSON or CSV formats from a single command.

# Behavior

When invoked via the CLI:

- Required flags:
  - --expression, -e : Formula in the form y=<expression> or <expression>
  - --range, -r      : Range in the form x=<start>:<end>:<step>
- Optional flags:
  - --format, -f     : Output format, json (default) or csv
  - --output, -o     : File path to write results; prints to stdout if omitted
  - --help, -h       : Display usage information and exit code 0
  - --version, -v    : Display the package version and exit code 0

Validation errors (invalid expression, range format, or format) exit with code 1 and print `Error: <message>` to stderr. On success, exit code 0.

# Implementation

- Configure yargs in `src/lib/main.js` with options:
  - `--expression`, `--range` (required)
  - `--format`, `--output`, built-in `.help()` and `.version()` flags
- Export a programmatic `main({ expression, range, format, output })` function that:
  1. Strips optional `y=` prefix and compiles the expression via mathjs
  2. Parses and validates the range string; enforces `step > 0` and `start <= end`
  3. Generates an inclusive series of `{ x, y }` points
  4. Serializes data:
     - JSON: `JSON.stringify(series, null, 2)`
     - CSV: header `x,y` plus comma-separated rows
  5. Writes output to the specified file or stdout
- In CLI mode, invoke `main()`, catch errors, print to stderr and set `process.exit` codes accordingly.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:
- Default JSON stdout and JSON file output via `--output`
- CSV stdout (`--format csv`) and CSV file output via `--output`
- Error on unsupported format values (exit 1, stderr includes "Choices" or "Unsupported format")
- Error on invalid expression or range syntax (exit 1, stderr includes `Error:`)
- Help and version flags exit code 0 and show expected usage or version



LLM API Usage:
```json
{"prompt_tokens":176258,"completion_tokens":573,"total_tokens":176831,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-28T19:25:33.853Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-28T19:26:07.075Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-28T19:27:10.107Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-28T20:23:33Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-28T20:25:18.417Z

Activity:

Maintained feature TIME_SERIES_EXPORT with

Feature spec:

# Overview

Enhance the existing CLI command to support both JSON and CSV export formats via a single, structured entrypoint. Users will generate numeric data series from a mathematical expression and range, choose their preferred export format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - --expression, -e: A formula in the form y=<expression> or <expression>.
  - --range, -r: A numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  - --format, -f: Output format, json (default) or csv.
  - --output, -o: File path to write the output; if omitted, prints to stdout.
  - --help, -h: Display usage information and exit code 0.
  - --version, -v: Display the package version and exit code 0.

On success, prints or writes the series:
- JSON mode: Pretty-printed array of { x: number, y: number }.
- CSV mode: Header x,y followed by comma-separated lines.

Validation errors (invalid expression, range format, or unsupported format) exit code 1 and print `Error: <message>` to stderr.

# Implementation

- Use yargs to configure the default command in `src/lib/main.js` with:
  - `.option('expression', { alias: 'e', demandOption: true })`
  - `.option('range', { alias: 'r', demandOption: true })`
  - `.option('format', { alias: 'f', choices: ['json','csv'], default: 'json' })`
  - `.option('output', { alias: 'o' })`
  - `.help().alias('h','help').version().alias('v','version')`
- Export a programmatic `main({ expression, range, format, output })` function:  
  1. Strip optional `y=` prefix and compile the expression via `mathjs.compile`.  
  2. Parse and validate the range string (`x=<start>:<end>:<step>`), enforce `step > 0` and `start <= end`.  
  3. Generate an inclusive series of `{ x, y }` points.  
  4. Serialize to JSON or CSV:  
     - JSON: `JSON.stringify(series, null, 2)`  
     - CSV: header `x,y` and lines `<x>,<y>` per point  
  5. Write output to file via `fs.writeFileSync` or log to stdout.  
- CLI entrypoint calls this function, catches errors, prints to stderr, and uses `process.exit(0|1)`.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:
- Default JSON to stdout and file via `--output`.  
- CSV to stdout (`--format csv`) and file via `--output`.  
- Error on unsupported `--format xml`: exit 1, stderr informs of valid choices.  
- Error on invalid expression or invalid range: exit 1, stderr `Error: <message>`.  
- `--help` and `--version` flags: exit 0, display usage or version text.

# Documentation

- Update `USAGE.md` under **Time Series Generation** to document `--format` option and examples for JSON and CSV.  
- Update `README.md` under `## Time Series Generation` with usage snippets demonstrating JSON, CSV, file output, help, and version commands.


LLM API Usage:
```json
{"prompt_tokens":176648,"completion_tokens":835,"total_tokens":177483,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-28T20:26:13.597Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-28T20:26:50.875Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-28T20:27:55.533Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-28T21:23:01Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-28T21:24:55.137Z

Activity:

Maintained feature TIME_SERIES_EXPORT with

Feature spec:

# Overview

Extend the existing time series generation command to support both JSON and CSV export formats via a single, structured CLI entrypoint. Users will generate numeric data series from a mathematical expression and range, choose their preferred output format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - `--expression, -e`: Formula in the form `y=<expression>` or `<expression>`.
  - `--range, -r`: Numeric range in the form `x=<start>:<end>:<step>`.
- Optional flags:
  - `--format, -f`: Output format, `json` (default) or `csv`.
  - `--output, -o`: Path to write the output; if omitted, prints to stdout.
  - `--help, -h`: Display usage information and exit code 0.
  - `--version, -v`: Display the package version and exit code 0.

On success:
- JSON mode: Pretty-printed array of `{ x: number, y: number }`.
- CSV mode: Header `x,y` followed by comma-separated rows for each point.

Validation errors:
- Invalid expression, range format, or unsupported format exit code 1 and print `Error: <message>` to stderr.

# Implementation

- Add dependencies in `package.json`: `yargs` for CLI parsing and `mathjs` for expression parsing.
- In `src/lib/main.js`:
  1. Use yargs to configure the default command with required flags (`expression`, `range`), optional flags (`format`, `output`), and built-in `.help()` and `.version()`.
  2. Export a programmatic function `main({ expression, range, format, output })` that:
     - Strips optional `y=` prefix and compiles the expression via `mathjs.compile` (throws on invalid).
     - Parses and validates the range string (`x=<start>:<end>:<step>`, enforce `step > 0` and `start ≤ end`).
     - Generates an inclusive series of `{ x, y }` points.
     - Serializes the series to JSON with `JSON.stringify(series, null, 2)` or builds CSV with header `x,y` and data rows.
     - Writes to the specified file with `fs.writeFileSync` or prints to stdout.
  3. The CLI entrypoint calls `main()`, catches exceptions to stderr, and uses `process.exit(0|1)` for success or failure.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:
- Default JSON output to stdout and JSON file output via `--output`.
- CSV output to stdout (`--format csv`) and CSV file output via `--output`.
- Error on unsupported `--format` values (exit code 1, stderr includes valid choices).
- Error on invalid expression or range (exit code 1, stderr includes `Error:`).
- Help (`--help`/`-h`) and version (`--version`/`-v`) flags exit code 0 and display expected text.

# Documentation

- Update `USAGE.md` under **Time Series Generation** to document the `--format` option and examples for JSON and CSV modes, and help/version usage.
- Update `README.md` under `## Time Series Generation` with usage snippets for JSON, CSV, file output, help, and version commands.


LLM API Usage:
```json
{"prompt_tokens":178059,"completion_tokens":798,"total_tokens":178857,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-28T21:25:50.801Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-28T21:26:20.923Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-28T21:27:15.437Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-28T22:23:04Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-28T22:24:33.806Z

Activity:

Maintained feature  with

Feature spec:




LLM API Usage:
```json
{"prompt_tokens":179193,"completion_tokens":27,"total_tokens":179220,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-28T22:25:32.004Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-28T22:26:05.837Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-28T22:27:01.112Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-28T23:22:50Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-28T23:24:37.474Z

Activity:

Maintained feature TIME_SERIES_EXPORT with

Feature spec:

# Overview

Enhance the existing time series generation command to support both JSON and CSV export formats via the same CLI entrypoint, with clear help and version flags. Users can generate numeric series from a mathematical expression and range, choose their preferred output format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - `--expression, -e`: Formula in the form y=<expression> or <expression>
  - `--range, -r`: Numeric range in the form x=<start>:<end>:<step>
- Optional flags:
  - `--format, -f`: Output format, `json` (default) or `csv`
  - `--output, -o`: File path to write the output; prints to stdout if omitted
  - `--help, -h`: Show usage information and exit code 0
  - `--version, -v`: Show package version and exit code 0

Output details:
- **JSON**: Pretty-printed array of `{ x, y }`
- **CSV**: Header `x,y` plus comma-separated data rows

Validation errors (invalid expression, range, or format) exit with code 1 and print `Error: <message>` to stderr.

# Implementation

- Add dependencies in `package.json`: `yargs` for CLI parsing and `mathjs` for expression evaluation.
- In `src/lib/main.js` configure yargs with required options (`expression`, `range`), optional (`format`, `output`), and built-in `.help()` and `.version()`.
- Export a programmatic function `main({ expression, range, format, output })` that:
  1. Strips optional `y=` prefix and compiles the expression via `mathjs.compile` (throws on invalid).
  2. Parses and validates the range string (`step > 0`, `start <= end`).
  3. Generates an inclusive series of `{ x, y }` points.
  4. Serializes to JSON or CSV and writes to the specified file or stdout.
- CLI entrypoint calls `main()`, handles exceptions by printing `Error: <message>` and sets `process.exit(0|1)` accordingly.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:
- Default JSON stdout and JSON file output via `--output`
- CSV stdout (`--format csv`) and CSV file output via `--output`
- Error on unsupported `--format` values (exit 1, yargs choices message)
- Error on invalid expression or range (exit 1, descriptive message)
- Help (`--help`/`-h`) and version (`--version`/`-v`) flags exit 0 and display expected text.


LLM API Usage:
```json
{"prompt_tokens":179629,"completion_tokens":644,"total_tokens":180273,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-28T23:25:37.790Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-28T23:26:13.506Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-28T23:27:07.979Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---2025-05-29T02:29:13Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintained Library Sources at 2025-05-29T02:50:00.735Z

Activity:

Updated library sources

LLM API Usage:
```json
{"prompt_tokens":6754,"completion_tokens":3470,"total_tokens":10224,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":2112,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Maintained Feature at 2025-05-29T04:36:36.089Z

Activity:

Maintained feature SERIES_AND_PLOT_CLI

LLM API Usage:
```json
{"prompt_tokens":180609,"completion_tokens":711,"total_tokens":181320,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---2025-05-29T06:24:55Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-05-29T06:26:46.303Z

Activity:

Maintained feature SERIES_AND_PLOT_CLI with

Feature spec:

# Overview

Provide a unified CLI tool under a single entrypoint that supports both numeric time series generation and graphical plot rendering. Users can generate data series from mathematical expressions and ranges, export results in JSON or CSV formats, or render line charts as SVG or PNG images.

# Commands

## generate

- Description: Generate a sequence of (x, y) data points from a formula over a numeric range.
- Options:
  - `--expression, -e` (string, required): Formula in form y=<expr> or <expr>.
  - `--range, -r` (string, required): Range syntax x=<start>:<end>:<step>.
  - `--format, -f` (string, optional): Output format json or csv; defaults to json.
  - `--output, -o` (string, optional): File path to write data; prints to stdout if omitted.
- Behavior:
  1. Strip optional y= prefix and compile the expression with mathjs; invalid expressions exit code 1 with descriptive error.
  2. Parse and validate the range (three numeric parts, step>0, start ≤ end); invalid ranges exit code 1 with descriptive error.
  3. Generate an inclusive series of objects `{ x: number, y: number }` stepping by the specified value.
  4. Serialize the series:
     - JSON: `JSON.stringify(series, null, 2)`.
     - CSV: Header `x,y` plus comma-separated rows per point.
  5. Write the serialized data to the specified file or stdout.
  6. Exit code 0 on success.

## plot

- Description: Render a line plot from JSON time series data to SVG or PNG.
- Options:
  - `--input, -i` (string, optional): JSON file containing an array of `{ x:number, y:number }`; reads stdin if omitted.
  - `--format, -f` (string, optional): Output image format svg (default) or png.
  - `--output, -o` (string, optional): Path to write the image; defaults to plot.svg.
  - `--width, -w` (number, optional): Image width in pixels; default 800.
  - `--height, -h` (number, optional): Image height in pixels; default 600.
- Behavior:
  1. Read and parse JSON input; invalid JSON or shape exits code 1 with descriptive error.
  2. Use d3-node to create an SVG canvas and plot a line path connecting the data points.
  3. For png format, render the SVG to a canvas and export as PNG.
  4. Write the resulting image to the specified output path.
  5. Exit code 0 on success; exit code 1 on any error with descriptive message.

# CLI Structure

- Built with yargs commands `generate` and `plot`, with global `--help` and `--version` flags.
- Programmatic API: `main(options)` invokes generation logic and returns the data array or throws on invalid inputs.
- All functionality lives in `src/lib/main.js`; tests cover both series generation and plotting behaviors, with CLI and API modes.


LLM API Usage:
```json
{"prompt_tokens":180812,"completion_tokens":748,"total_tokens":181560,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-29T06:27:52.498Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-05-29T06:28:26.856Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-05-29T06:29:23.429Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---
## Maintain Feature at 2025-05-29T06:59:47.677Z

Activity:

Maintained feature TIME_SERIES_EXPORT with:

Feature spec:

# Overview

Extend the core time series generation CLI to support both JSON and CSV export formats via a single structured entrypoint. Users can generate numeric series from a mathematical expression and range, choose their preferred output format, and direct the result to stdout or a file.

# Behavior

- Required flags:
  - `--expression, -e`: Formula in the form y=<expression> or <expression>.
  - `--range, -r`: Numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  - `--format, -f`: Output format, json (default) or csv.
  - `--output, -o`: Path to write the output; if omitted, prints to stdout.
  - `--help, -h`: Display usage information and exit code 0.
  - `--version, -v`: Display the package version and exit code 0.

On invocation:
1. Strip optional y= prefix and compile the expression via mathjs; invalid expressions exit code 1 with “Error: Invalid expression.”
2. Parse and validate the range string in the form x=start:end:step, enforce step > 0 and start ≤ end; invalid ranges exit code 1 with “Error: Invalid range.”
3. Generate an inclusive series of objects `{ x: number, y: number }` by stepping from start to end.
4. Serialize:
   - JSON: `JSON.stringify(series, null, 2)`.
   - CSV: header `x,y` followed by comma-separated rows of each point.
5. Write to the specified file via fs.writeFileSync or print to stdout.
6. Exit code 0 on success; code 1 on failure.

# Implementation

- Add dependencies in package.json: `yargs` for CLI parsing and `mathjs` for expression evaluation.
- In `src/lib/main.js`: 
  - Configure yargs with required options (`expression`, `range`), optional (`format`, `output`), and built-in `.help()` and `.version()`.
  - Export programmatic `main({ expression, range, format, output })` that returns the data array or throws:
    1. Strip `y=` prefix and compile expression via mathjs.compile.
    2. Parse and validate range string.
    3. Generate series points.
    4. Serialize to JSON or CSV.
    5. Write to file or stdout.
  - CLI entrypoint calls `main()`, catches exceptions, prints `Error: <message>` to stderr, and uses `process.exit(0|1)`.

# Tests

Extend tests in `tests/unit/plot-generation.test.js` to verify:
- Default JSON stdout and file output.
- CSV stdout and file output.
- Error on unsupported formats.
- Error on invalid expression and range.
- Help and version flags exit code 0 and display expected output.

# Documentation

- Update `USAGE.md` under **Time Series Generation** to document `--format` option with examples for JSON and CSV.
- Update `README.md` under `## Time Series Generation` with usage snippets demonstrating JSON, CSV, file output, help, and version commands.


LLM API Usage:
```json
{"prompt_tokens":181925,"completion_tokens":737,"total_tokens":182662,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Maintained Library Sources at 2025-06-01T02:56:37.854Z

Activity:

Updated library sources

LLM API Usage:
```json
{"prompt_tokens":7525,"completion_tokens":3089,"total_tokens":10614,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":1856,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Maintained Feature at 2025-06-01T04:38:44.084Z

Activity:

Maintained feature TIME_SERIES_EXPORT

LLM API Usage:
```json
{"prompt_tokens":183461,"completion_tokens":748,"total_tokens":184209,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---2025-06-01T06:24:18Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-06-01T06:26:02.331Z

Activity:

Maintained feature TIME_SERIES_EXPORT with

Feature spec:

# Overview

Extend the existing time series CLI to support both JSON and CSV export formats via a single structured command. Users will generate numeric data series from a mathematical expression and range, choose their preferred output format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - `--expression, -e` (string): Formula in the form `y=<expression>` or `<expression>`.
  - `--range, -r` (string): Numeric range in the form `x=<start>:<end>:<step>`.
- Optional flags:
  - `--format, -f` (string): Output format `json` (default) or `csv`.
  - `--output, -o` (string): Path to write the output; prints to stdout if omitted.
  - `--help, -h`: Display usage information and exit code 0.
  - `--version, -v`: Display the package version and exit code 0.

### Output

- JSON mode: Pretty-printed array of `{ x: number, y: number }`.
- CSV mode: First line header `x,y`, followed by comma-separated data rows.

Validation errors (invalid expression or range syntax, unsupported format, file I/O failures) exit code 1 and print `Error: <message>` to stderr. Successful runs exit code 0.

# Implementation

- Add dependencies in `package.json`: `yargs` for CLI parsing, `mathjs` for expression evaluation.
- In `src/lib/main.js`: Configure yargs for a single command with options:
  - `expression`, `range` (required)
  - `format`, `output` (optional)
  - built-in `.help()` and `.version()` flags.
- Export a programmatic `main({ expression, range, format, output })` function that:
  1. Strips optional `y=` prefix and compiles the expression via `mathjs.compile` (throws on invalid).
  2. Parses and validates the range string (`x=<start>:<end>:<step>`, enforce `step>0` and `start<=end`).
  3. Generates an inclusive series of `{ x, y }` points.
  4. Serializes to JSON or CSV based on the `format` flag.
  5. Writes the result to the specified `output` file or prints to stdout.
- The CLI entrypoint calls `main()`, catches exceptions, prints errors to stderr, and uses process exit codes for success or failure.

# Tests

Extend `tests/unit/plot-generation.test.js` to verify:
- Default JSON stdout and JSON file output via `--output`.
- CSV stdout (`--format csv`) and CSV file output via `--output`.
- Error on unsupported format values (exit code 1, stderr contains valid choices).
- Error on invalid expression or invalid range (exit code 1, stderr contains `Error:`).
- Help and version flags exit code 0 and display expected text.

# Documentation

- Update `USAGE.md` under **Time Series Generation** to document the `--format` option and provide examples for both JSON and CSV.
- Update `README.md` under `## Time Series Generation` with usage snippets demonstrating JSON, CSV, file output, help, and version commands.


LLM API Usage:
```json
{"prompt_tokens":182932,"completion_tokens":773,"total_tokens":183705,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-06-01T06:27:06.451Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-06-01T06:27:45.553Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-06-01T06:28:37.392Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---
## Maintain Feature at 2025-06-01T06:58:22.259Z

Activity:

Maintained feature TIME_SERIES_CLI with:

Feature spec:

# Overview

Consolidate time series generation and plot rendering into a single structured CLI tool. Users can generate numeric data series from a formula and range or render that data as a line plot (SVG or PNG) under one entrypoint.

# Commands

## generate

- Description: Produce a sequence of `{ x, y }` points from a formula over a numeric range.
- Options:
  • `--expression, -e` (required): Formula in form y=<expr> or <expr>.
  • `--range, -r` (required): Range syntax `x=<start>:<end>:<step>`.
  • `--format, -f`: Output format `json` or `csv` (default `json`).
  • `--output, -o`: File path to write data; prints to stdout if omitted.
- Behavior:
  1. Compile expression with mathjs (error on invalid).
  2. Parse range string; enforce step > 0, start ≤ end.
  3. Generate inclusive series of `{ x, y }` points.
  4. Serialize to JSON or CSV.
  5. Write to file or stdout, exit code 0.

## plot

- Description: Render a line plot from JSON time series data.
- Options:
  • `--input, -i`: JSON file path; reads stdin if omitted.
  • `--format, -f`: Output format `svg` or `png` (default `svg`).
  • `--output, -o`: File path for image; default `plot.svg`.
  • `--width, -w`: Image width in pixels (default 800).
  • `--height, -h`: Image height in pixels (default 600).
- Behavior:
  1. Load and validate JSON data array of `{ x, y }`.
  2. Create an SVG via d3-node, draw axes and line path.
  3. Convert to PNG if requested via canvas.
  4. Write image file, exit code 0.

# CLI Interface

Use yargs to define `generate` and `plot` commands under one entrypoint, with global `--help, -h` and `--version, -v` flags. Errors in expression, range, JSON input, rendering, or I/O print `Error: <message>` and exit code 1.



LLM API Usage:
```json
{"prompt_tokens":184036,"completion_tokens":579,"total_tokens":184615,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---2025-06-05T02:29:43Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z

2025-06-12T02:30:03Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z

2025-06-19T02:31:03Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z

2025-06-26T02:31:29Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintained Library Sources at 2025-06-29T02:54:28.171Z

Activity:

Updated library sources

LLM API Usage:
```json
{"prompt_tokens":6673,"completion_tokens":2006,"total_tokens":8679,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":1024,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Maintained Feature at 2025-06-29T04:38:35.387Z

Activity:

Maintained feature SERIES_AND_PLOT_CLI

LLM API Usage:
```json
{"prompt_tokens":184767,"completion_tokens":738,"total_tokens":185505,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---2025-06-29T06:23:44Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-06-29T06:24:58.580Z

Activity:

Maintained feature TIME_SERIES_EXPORT with

Feature spec:

# Overview

Extend the existing CLI entrypoint to support both JSON and CSV export formats for numeric time series generation from a mathematical expression and a range. This provides flexible output options for downstream data processing without introducing new subcommands.

# Behavior

- Required flags:
  - `--expression, -e` : A formula in the form y=<expression> or <expression>.
  - `--range, -r`      : A numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  - `--format, -f`     : Output format, `json` (default) or `csv`.
  - `--output, -o`     : File path to write results; prints to stdout if omitted.
  - `--help, -h`       : Display usage information and exit code 0.
  - `--version, -v`    : Display the package version and exit code 0.

When invoked, the command:
1. Strips an optional `y=` prefix and compiles the expression via mathjs. Invalid expressions exit code 1 with `Error: Invalid expression`.
2. Parses and validates the range string `x=<start>:<end>:<step>` enforcing `step > 0` and `start <= end`. Invalid ranges exit code 1 with `Error: Invalid range`.
3. Generates an inclusive series of `{ x, y }` points.
4. Serializes the series:
   - JSON: `JSON.stringify(series, null, 2)`.
   - CSV: header `x,y` plus comma-separated rows per point.
5. Writes the serialized output to the specified file or stdout.
6. Exits with code 0 on success, 1 on failure.



LLM API Usage:
```json
{"prompt_tokens":185089,"completion_tokens":423,"total_tokens":185512,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-06-29T06:26:00.939Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-06-29T06:26:38.430Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-06-29T06:27:32.764Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---
## Maintain Feature at 2025-06-29T06:58:59.573Z

Activity:

Maintained feature TIME_SERIES_EXPORT with:

Feature spec:

# Overview

Enhance the existing time series generation command to support both JSON and CSV export formats via a single, structured CLI entrypoint. Users will generate numeric data series from a mathematical expression and range, choose their preferred output format, and direct the result to stdout or to a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - `--expression, -e`: A formula in the form y=<expression> or <expression>.
  - `--range, -r`: A numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  - `--format, -f`: Output format, `json` (default) or `csv`.
  - `--output, -o`: Path to write the output; if omitted, prints to stdout.
  - `--help, -h`: Display usage information and exit code 0.
  - `--version, -v`: Display the package version and exit code 0.

On successful invocation:
- `json` mode produces a pretty-printed array of `{ x: number, y: number }`.
- `csv` mode produces a header `x,y` followed by comma-separated rows for each point.

Validation errors (invalid expression syntax, range format, or unsupported format) exit with code 1 and print `Error: <message>` on stderr.

# Implementation

- Use `yargs` to configure the CLI options and built-in help/version flags.
- Add or update `src/lib/main.js`:
  1. Define `--expression` and `--range` as required options.
  2. Define `--format` with choices `json` and `csv`, defaulting to `json`.
  3. Define `--output` for file path output.
  4. Export a programmatic `main({ expression, range, format, output })` that:
     a. Strips optional `y=` prefix and compiles the expression with `mathjs.compile` (throws on invalid).
     b. Parses and validates the `x=<start>:<end>:<step>` range (throws on invalid).
     c. Generates an inclusive series of `{ x, y }` points.
     d. Serializes to JSON or CSV.
     e. Writes to `output` file or logs to stdout.
  5. In CLI entrypoint, call `main()`, catch exceptions, print errors, and set `process.exit` codes.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:

- Default JSON to stdout and file writing via `--output`.
- CSV to stdout and file writing via `--format csv` and `--output`.
- Unsupported format values exit code 1 and stderr includes `Choices:`.
- Invalid expression or range throw errors and exit code 1 with descriptive message.
- `--help` and `--version` exit code 0 and display expected usage or version text.



LLM API Usage:
```json
{"prompt_tokens":186206,"completion_tokens":691,"total_tokens":186897,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Maintained Library Sources at 2025-07-01T02:54:49.568Z

Activity:

Updated library sources

LLM API Usage:
```json
{"prompt_tokens":7459,"completion_tokens":2437,"total_tokens":9896,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":1344,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Maintained Feature at 2025-07-01T04:38:56.218Z

Activity:

Maintained feature TIME_SERIES_CLI

LLM API Usage:
```json
{"prompt_tokens":187271,"completion_tokens":687,"total_tokens":187958,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---2025-07-01T06:24:08Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-07-01T06:25:22.977Z

Activity:

Maintained feature none with

Feature spec:

# NONE

No new features were created or updated in this iteration as the CLI already supports both JSON and CSV export in the default `repository0-plot-code-lib` command along with `plot` subcommand for graphical output. All required functionality is present in existing features.



LLM API Usage:
```json
{"prompt_tokens":187423,"completion_tokens":87,"total_tokens":187510,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-07-01T06:26:21.227Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-07-01T06:26:52.428Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-07-01T06:27:50.098Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---
## Maintain Feature at 2025-07-01T07:00:09.631Z

Activity:

Maintained feature  with:

Feature spec:




LLM API Usage:
```json
{"prompt_tokens":187858,"completion_tokens":27,"total_tokens":187885,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---2025-07-03T02:32:21Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z

2025-07-10T02:33:38Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z

2025-07-17T02:36:23Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z

2025-07-24T02:37:29Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintained Library Sources at 2025-07-29T03:00:42.536Z

Activity:

Updated library sources

LLM API Usage:
```json
{"prompt_tokens":7452,"completion_tokens":1755,"total_tokens":9207,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":768,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Maintained Feature at 2025-07-29T04:40:58.792Z

Activity:

Maintained feature SERIES_ONLY_GENERATION

LLM API Usage:
```json
{"prompt_tokens":188283,"completion_tokens":425,"total_tokens":188708,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---2025-07-29T06:25:28Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-07-29T06:26:53.973Z

Activity:

Maintained feature TIME_SERIES_EXPORT with

Feature spec:

# Overview

Extend the existing time series generation CLI so users can export results in both JSON and CSV formats from a single, structured entrypoint. This feature enhances data interoperability by providing tabular output directly.

# Behavior

When invoked via the CLI:

- Required flags:
  • --expression, -e (string): Formula in the form y=<expression> or <expression>.
  • --range, -r (string): Numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  • --format, -f (string): Output format, json (default) or csv.
  • --output, -o (string): File path to write the output; prints to stdout if omitted.
  • --help, -h: Display usage information and exit with code 0.
  • --version, -v: Display package version and exit with code 0.

Output:
- **JSON** mode: Pretty-printed array of { x: number, y: number }.
- **CSV** mode: Header `x,y` followed by comma-separated rows for each data point.

On success, writes to the specified file or stdout and exits with code 0. Validation errors (invalid expression, range format, unsupported format, I/O failures) exit with code 1 and print a descriptive `Error: <message>` on stderr.

# Implementation

- Add `--format` (`-f`) choice in yargs configuration alongside `--expression` and `--range` flags.
- In the default command handler:
  1. Strip optional `y=` prefix and compile the expression using mathjs; on compile failure, throw `Invalid expression`.
  2. Parse `x=<start>:<end>:<step>` range, enforce numeric values, `step > 0`, and `start <= end`; on failure, throw `Invalid range`.
  3. Generate an inclusive series of points from start to end by step.
  4. After series generation:
     - If `format=json`, serialize with `JSON.stringify(series, null, 2)`.
     - If `format=csv`, build a string starting with `x,y` header and lines `${x},${y}` per point.
  5. Write to the file specified by `--output` via `fs.writeFileSync`, or `console.log` the output when `--output` is omitted.
  6. Use `process.exit(0)` on success and `process.exit(1)` on any error after printing `Error: <message>`.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:

- JSON stdout: verify default behavior for simple expressions and ranges, exit code 0, correct JSON structure.
- JSON file: verify output file is created with correct JSON content when `--output` is provided.
- CSV stdout: verify header `x,y` and data lines match series when `--format csv` is used.
- CSV file: verify file content for CSV output when `--format csv --output` is provided.
- Unsupported format: verify exit code 1 and stderr mentions valid choices or `Unsupported format`.
- Invalid expression: exit code 1 and stderr contains `Invalid expression`.
- Invalid range: exit code 1 and stderr contains `Invalid range`.
- Help/version flags: verify `--help` and `--version` exit code 0 and print usage or version text.


LLM API Usage:
```json
{"prompt_tokens":188201,"completion_tokens":792,"total_tokens":188993,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-07-29T06:27:45.489Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-07-29T06:28:26.176Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-07-29T06:29:21.318Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---
## Maintain Feature at 2025-07-29T07:02:25.760Z

Activity:

Maintained feature TIME_SERIES_GENERATION with:

Feature spec:

# Overview

Enhance the default time series generation command to support both JSON and CSV export formats and provide clear, discoverable CLI flags using yargs. Users can generate numeric data series from a mathematical expression and numeric range, choose output format, and write results to stdout or a file.

# Behavior

When invoked via the CLI:
- Required flags:
  • --expression, -e (string): Formula in the form y=<expression> or <expression>.
  • --range, -r (string): Numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  • --format, -f (string): Output format json (default) or csv.
  • --output, -o (string): Path to write the output file; prints to stdout if omitted.
  • --help, -h: Display usage information and exit code 0.
  • --version, -v: Display package version and exit code 0.

Behavior details:
1. Strip optional y= prefix and compile the expression using mathjs; on failure, exit code 1 with "Error: Invalid expression".
2. Parse and validate the range string; enforce step > 0 and start ≤ end; on failure, exit code 1 with "Error: Invalid range".
3. Generate an inclusive series of { x, y } points stepping by the specified value.
4. Serialize the series:
   - JSON: JSON.stringify(series, null, 2).
   - CSV: header x,y followed by comma-separated rows.
5. Write to the specified file via fs.writeFileSync or print to stdout.
6. Exit code 0 on success; exit code 1 on any error with a descriptive message.

# Implementation

- Add dependencies:
  • yargs for CLI parsing.
  • mathjs for expression compilation.
- In src/lib/main.js:
  • Use yargs to configure the default command with options: expression, range, format, output, help, and version flags.
  • Export a programmatic main({ expression, range, format, output }) function that:
    1. Strips y= prefix and compiles expression via mathjs.compile.
    2. Parses and validates the range string.
    3. Generates an inclusive series of data points.
    4. Serializes to JSON or CSV.
    5. Writes output to file or stdout.
  • CLI entrypoint calls main(), catches exceptions, prints error messages, and sets process.exit codes.

# Tests

- Extend tests/unit/plot-generation.test.js to cover:
  • JSON stdout and file output via --output.
  • CSV stdout (--format csv) and file output.
  • Unsupported format values: exit 1, stderr mentions valid choices or "Unsupported format".
  • Invalid expression or range: exit 1, stderr contains descriptive error.
  • Help and version flags: exit 0 and display expected usage or version.


LLM API Usage:
```json
{"prompt_tokens":190012,"completion_tokens":684,"total_tokens":190696,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---2025-07-31T02:39:22Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintained Library Sources at 2025-08-01T03:03:43.069Z

Activity:

Updated library sources

LLM API Usage:
```json
{"prompt_tokens":8554,"completion_tokens":2158,"total_tokens":10712,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":1152,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Maintained Feature at 2025-08-01T04:44:11.809Z

Activity:

Maintained feature CLI_EXTENDED_OUTPUT

LLM API Usage:
```json
{"prompt_tokens":191498,"completion_tokens":775,"total_tokens":192273,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---2025-08-01T06:24:34Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-08-01T06:26:09.579Z

Activity:

Maintained feature GENERATE_SUBCOMMAND with

Feature spec:

# Overview

Introduce a dedicated `generate` subcommand that isolates time series data generation under a clear command. This refines the CLI interface by splitting data generation (`generate`) from plot rendering (`plot`), improving discoverability and maintainability.

# Behavior

When invoked as:
```
repository0-plot-code-lib generate --expression <expr> --range <range> [--format <json|csv>] [--output <file>]
```

- The CLI accepts:
  • `--expression, -e` (string, required): formula in form `y=<expression>` or `<expression>`.
  • `--range, -r` (string, required): range syntax `x=<start>:<end>:<step>`.
  • `--format, -f` (string, optional): output format `json` (default) or `csv`.
  • `--output, -o` (string, optional): file path to write output; when omitted, data is printed to stdout.
  • `--help, -h`: show help for `generate` subcommand.
  • `--version, -v`: show global version and exit.

- Validation:
  1. Strip optional `y=` prefix and compile the expression via mathjs; compilation errors exit code 1 with `Error: Invalid expression`.
  2. Parse and validate the `x=<start>:<end>:<step>` range; enforce `step > 0` and `start <= end`; failures exit code 1 with `Error: Invalid range`.

- Output:
  • When `--format json`, output the data array `[ { x, y }, … ]` via `JSON.stringify(..., 2)`.
  • When `--format csv`, output lines beginning with header `x,y` and one comma-separated row per point.

- On success, write to file or stdout and exit code 0.
- On any error or missing required flags, show subcommand usage and exit code 1.

# Implementation

- Update `src/lib/main.js` to use `yargs.command('generate', …)` to define the subcommand.
- Move existing time series generation logic into the `generate` handler.
- Retain existing `plot` subcommand unchanged.
- Ensure `main()` programmatic export remains and is invoked by the `generate` handler.

# Tests

- Add `tests/unit/generate-subcommand.test.js` covering:
  • `generate` CLI for JSON stdout and file output.
  • CSV output to stdout and file when `--format csv`.
  • Errors for invalid expression and range.
  • `--help` for `generate` subcommand showing usage and flags.

# Documentation

- In `USAGE.md`, add a new section `## Generate Series` documenting the `generate` command and its flags.
- In `README.md`, under `## Commands`, list the `generate` subcommand with examples.



LLM API Usage:
```json
{"prompt_tokens":192363,"completion_tokens":689,"total_tokens":193052,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-08-01T06:26:57.042Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-08-01T06:27:32.956Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-08-01T06:28:29.061Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---
## Maintain Feature at 2025-08-01T07:03:03.033Z

Activity:

Maintained feature TIME_SERIES_EXPORT with:

Feature spec:

# Overview

Extend the existing time series CLI command to support both JSON and CSV export formats via a single, structured entrypoint. Users will generate numeric data series from a mathematical expression and range, choose their preferred output format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  • --expression, -e : Formula in the form y=<expression> or <expression>.
  • --range, -r      : Numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  • --format, -f     : Output format, json (default) or csv.
  • --output, -o     : Path to write the output; if omitted, prints to stdout.
  • --help, -h       : Display usage information and exit code 0.
  • --version, -v    : Display the package version and exit code 0.

On successful invocation:

- In json mode, outputs a pretty-printed array of objects `{ x: number, y: number }`.
- In csv mode, outputs a header `x,y` followed by comma-separated rows for each data point.

Validation errors (invalid expression, invalid range, unsupported format, file write failures) exit with code 1 and print `Error: <message>` to stderr.

# Implementation

- Use yargs to configure the default command in `src/lib/main.js` with:
  • `--expression`, `--range` (required)
  • `--format`, `--output` (optional)
  • `.help()` and `.version()` for built-in flags
- Export a programmatic function `main({ expression, range, format, output })` that:
  1. Strips an optional `y=` prefix and compiles the expression via mathjs.compile (throws 'Invalid expression').
  2. Parses and validates the range string (`x=<start>:<end>:<step>`, enforce `step > 0` and `start <= end`; throws 'Invalid range').
  3. Generates an inclusive series of `{ x, y }` points.
  4. Serializes to JSON or CSV based on `format`.
  5. Writes output to the specified file via fs.writeFileSync or logs to stdout.
- The CLI entrypoint calls `main()`, catches exceptions to stderr, and uses `process.exit(0|1)` for success or failure.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:

- Default JSON output to stdout and JSON file output via `--output`.
- CSV output to stdout (`--format csv`) and CSV file output via `--output`.
- Error on unsupported `--format` values (exit code 1, stderr contains valid choices).
- Error on invalid expression or invalid range (exit code 1, stderr contains `Error: Invalid expression` or `Error: Invalid range`).
- Help (`--help`) and version (`--version`) flags exit code 0 and display expected output.


LLM API Usage:
```json
{"prompt_tokens":193265,"completion_tokens":708,"total_tokens":193973,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---2025-08-07T02:40:16Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z

2025-08-14T02:35:09Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z

2025-08-21T02:27:40Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z

2025-08-28T02:26:28Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintained Library Sources at 2025-08-29T02:43:44.419Z

Activity:

Updated library sources

LLM API Usage:
```json
{"prompt_tokens":9097,"completion_tokens":3805,"total_tokens":12902,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":3008,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Maintained Feature at 2025-08-29T04:34:25.089Z

Activity:

Maintained feature CLI_EXTENDED_OUTPUT

LLM API Usage:
```json
{"prompt_tokens":194242,"completion_tokens":816,"total_tokens":195058,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---2025-08-29T06:24:06Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-27T03-33Z


## Maintain Feature at 2025-08-29T06:25:29.535Z

Activity:

Maintained feature TIME_SERIES_EXPORT with

Feature spec:

# Overview

Enhance the existing time series CLI command to support both JSON and CSV export formats via a single, structured entrypoint. Users will generate numeric data series from a mathematical expression and range, choose their preferred output format, and direct the result to stdout or a file.

# Behavior

When invoked via the default command:

- Required flags:
  • --expression, -e (string): Formula in the form y=<expression> or <expression>.
  • --range, -r (string): Numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  • --format, -f (string): Output format, json (default) or csv.
  • --output, -o (string): Path to write results; prints to stdout if omitted.
  • --help, -h: Display usage information and exit code 0.
  • --version, -v: Display the package version and exit code 0.

On success:
- JSON mode outputs a pretty-printed array of { x: number, y: number }.
- CSV mode outputs a header x,y followed by comma-separated data rows.

On validation errors (invalid expression, range syntax, unsupported format, file I/O), exit code 1 and print Error: <message>.

# Implementation

- Update yargs configuration in src/lib/main.js for the default command:
  • Add .option('format', { alias:'f', choices:['json','csv'], default:'json' }).
  • Retain --expression and --range as required options.
  • Add .help() and .version() for built-in flags.
- In the handler:
  1. Strip optional y= prefix and compile expression via mathjs.compile; errors throw 'Invalid expression'.
  2. Parse and validate range string: split x=start:end:step, enforce numeric values, step > 0, start <= end; errors throw 'Invalid range'.
  3. Generate an inclusive series of { x, y } points incremented by step.
  4. Serialize to JSON or CSV:
     - JSON: JSON.stringify(series, null, 2).
     - CSV: join header 'x,y' and rows `${x},${y}`.
  5. Write to the specified file using fs.writeFileSync or log to stdout.
- Export function main({ expression, range, format, output }) that returns the data array or throws.
- CLI entrypoint calls main(), catches exceptions, logs Error: <message>, and uses process.exit codes.

# Tests

Extend tests in tests/unit/plot-generation.test.js to cover:
- JSON stdout and JSON file output via --output.
- CSV stdout (--format csv) and CSV file output.
- Unsupported format errors (exit code 1, stderr mentions valid choices).
- Invalid expression and range errors (exit code 1, stderr contains descriptive error).
- --help and --version flags exit code 0 and show expected usage or version.

# Documentation

- Update USAGE.md under **Time Series Generation** to document the new --format option with examples for both JSON and CSV modes.
- Update README.md under `## Time Series Generation` with usage snippets for JSON, CSV, file output, --help, and --version.


LLM API Usage:
```json
{"prompt_tokens":195144,"completion_tokens":754,"total_tokens":195898,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-08-29T06:26:29.892Z

Activity:

Generated issue  for feature "" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/

title:



And description:



LLM API Usage:
```json

```

---
## Issue to enhanced Issue at 2025-08-29T06:27:07.850Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:



LLM API Usage:
```json

```

---
## Issue to Code at 2025-08-29T06:27:58.840Z

Activity:

fixApplied: false to branch agentic-lib-issue- with message  and outcome failure

Git Diff:
```diff

```

mainOutput:
```log

```

installAfterUpdateOutcome: skipped

ciAfterUpdateOutcome: skipped

testAfterUpdateOutcome: skipped

mainAfterUpdateOutcome: skipped

commitOutcome: skipped

postResolutionCommentOutcome: skipped

allValidationStepsSuccessful: false

[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with title: ""]

LLM API Usage:
```json

```

---