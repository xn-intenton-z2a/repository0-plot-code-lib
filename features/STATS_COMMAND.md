# Overview
Add a new CLI subcommand stats that computes and reports summary statistics for a data series.  Users can generate quantitative insights including minimum, maximum, mean, median, and standard deviation without producing a plot.

# CLI Subcommand
Command: repository0-plot-code-lib stats [options]

Options:
- --expression <expr>        Mathematical expression to generate y values, exclusive with data-file
- --range <axis>=min:max     Numeric range for generation, required with expression mode
- --data-file <path>         Path to JSON, YAML, or CSV file, exclusive with expression mode
- --samples <number>         Number of intervals for generation, default 100
- --json                     Emit output as a JSON object instead of plain text

# Implementation
1. Subcommand Detection
   - In main() detect when the first argument is stats. Remove stats from args and call a new function handleStats, then return.

2. Stats Schema and Parsing
   - Define a statsSchema using Zod with fields:
     • expression: string, optional
     • range: string matching axis=min:max when expression is present
     • dataFile: string when data-file is used
     • samples: integer, default 100
     • json: boolean, default false
   - Enforce that exactly one of expression or dataFile is provided and that range accompanies expression mode.

3. Data Acquisition
   - If dataFile is set, call parseDataFile(path) to load Array<{x,y}>.
   - Otherwise parse range into a range object and call generateData(expression, rangeObj, samples).

4. Summary Statistics Computation
   - Extract y-values from the point array.
   - Compute:
     • min: smallest y
     • max: largest y
     • mean: sum(y)/n
     • median: sort(y) and select middle or average of two middle values
     • stddev: sample standard deviation = sqrt(sum((y–mean)^2)/(n–1)) or zero when n ≤ 1

5. Output Formatting
   - If json flag is true, output JSON.stringify({ min, max, mean, median, stddev }, null, 2) to stdout.
   - Otherwise, write each statistic on its own line formatted as key: value with two decimals.
   - On error print a descriptive message to stderr and exit with code 1.  On success exit with code 0.

# Testing
- Create tests/unit/stats-command.test.js covering:
  • Expression mode computing known statistics for a simple function.
  • Data-file mode with mocked fs.readFileSync for JSON, YAML, and CSV formats.
  • JSON output produces correct object and precision.
  • Error cases: missing both expression and data-file, missing range with expression, invalid samples, unsupported file extension.

# Documentation
- USAGE.md
  Add a Stats section under CLI Examples with commands:
    repository0-plot-code-lib stats --expression y=x --range x=0:10
    repository0-plot-code-lib stats --data-file data.csv --json
  Show sample plain text and JSON outputs.

- README.md
  Under Examples add a stats subcommand snippet showing plain text and JSON usage and output.

- Help Output
  Ensure --help and --help stats mention the new stats subcommand and its flags.