# Overview

Implement a new CLI subcommand `stats` that computes key summary statistics (minimum, maximum, mean, median, and sample standard deviation) for a data series. The series may be generated from a mathematical expression over a numeric range or imported from a JSON, YAML, or CSV file. This complements existing plotting and data export workflows by offering quick quantitative insights without rendering images.

# CLI Subcommand

- New positional subcommand: `stats`  
- Usage:
  • `repository0-plot-code-lib stats --expression <expr> --range <axis>=<min>:<max> [--samples <n>] [--json]`  
  • `repository0-plot-code-lib stats --data-file <path> [--samples <n>] [--json]`
- Flags:
  • `--expression <expr>`: Mathematical expression for data generation. Exclusive with `--data-file`.  
  • `--range <axis>=<min>:<max>`: Numeric range for generation, required with `--expression`.  
  • `--data-file <path>`: Path to JSON, YAML, or CSV file, exclusive with `--expression`.  
  • `--samples <number>`: Number of intervals for generation (default 100). Must be a positive integer.  
  • `--json`: Emit output as a JSON object rather than plain text.

# Implementation

1. Subcommand Detection
   - In `src/lib/main.js`, at the start of `main`, detect if the first argument is `stats`.  
   - Remove `stats` from the arguments list and delegate to a new `handleStats` function.

2. Stats Schema
   - Define a Zod schema `statsSchema` requiring either:
     • `expression` (string) and `range` (string matching axis=min:max), or
     • `dataFile` (alias for `--data-file`) as a string.
   - Include optional `samples` (positive integer) and `json` (boolean) fields.

3. Data Acquisition
   - If `dataFile` is provided, call existing `parseDataFile(path)` to load an array of `{ x, y }` points.
   - Otherwise, use `parseRange` and `generateData(expression, rangeObj, samples)` to produce the series.

4. Statistics Computation
   - Extract y-values from the point array.
   - Compute:
     • `min`: minimum y-value  
     • `max`: maximum y-value  
     • `mean`: sum(y)/n  
     • `median`: sorted midpoint (average of two middle for even n)  
     • `stddev`: sample standard deviation = sqrt(sum((y - mean)^2)/(n - 1))

5. Output Formatting
   - If `json` flag is true, assemble `{ min, max, mean, median, stddev }` and `console.log(JSON.stringify(..., null, 2))`.
   - Otherwise, print each statistic on its own line in `key: value` format with two decimal places.
   - Exit with code 0 on success.

6. Error Handling
   - On schema validation failure or missing required flags, print an error to `stderr` and `process.exit(1)`.

# Testing

- Create `tests/unit/stats-command.test.js`:
  • Expression mode: verify correct values for simple functions (e.g., y = x over x=0:10).
  • Data-file mode: mock `fs.readFileSync` to return sample JSON, YAML, CSV and assert the computed stats.
  • JSON output: `--json` produces valid JSON with expected keys and numerical precision.
  • Error cases: missing both `--expression` and `--data-file`, missing `--range`, invalid samples, unsupported file extension.

# Documentation

- Update `USAGE.md`:
  • Add a **Stats** section under CLI Examples with plain-text and JSON output examples.  
- Update `README.md`:
  • Under **Examples**, include `stats` usage and sample output snippets.  
- Ensure the help output (`--help`) mentions the new `stats` subcommand and flags.