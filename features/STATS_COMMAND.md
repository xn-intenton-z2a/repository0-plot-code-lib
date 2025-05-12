# Overview

Add a new CLI subcommand stats that calculates and reports summary statistics for a data series produced from a mathematical expression over a numeric range or imported from a data file. This command provides quick quantitative insights without generating a plot.

# CLI Subcommand

**Command**

  repository0-plot-code-lib stats [options]

**Usage Examples**

  repository0-plot-code-lib stats --expression "y=x" --range "x=0:10" --samples 50
  repository0-plot-code-lib stats --data-file data.csv --json

**Options**

  --expression <expr>        Mathematical expression to generate y values. Exclusive with data-file
  --range <axis>=<min>:<max> Numeric range for generation. Required with expression mode
  --data-file <path>         Path to JSON, YAML, or CSV file. Exclusive with expression mode
  --samples <number>         Number of intervals for generation. Default 100
  --json                     Emit output as a JSON object instead of plain text

# Implementation

1. Subcommand Detection
   In src/lib/main.js, at the start of main(), check if first argument equals stats. If so:
     • Remove stats from argument list
     • Invoke a new function handleStats with remaining args and return

2. Stats Schema and Parsing
   Define statsSchema using Zod:
     • expression: string (optional)
     • range: string matching axis=min:max when expression is provided
     • dataFile: string when data-file is provided
     • samples: positive integer, default 100
     • json: boolean, default false
   Use parseArgs to read raw flags, then validate with statsSchema. Enforce that exactly one of expression or dataFile is provided, and range must accompany expression.

3. Data Acquisition
   • If dataFile is set, call existing parseDataFile(path) to retrieve Array<{x, y}>
   • Otherwise, call parseRange(range) and generateData(expression, rangeObj, samples)

4. Summary Statistics Computation
   Extract y-values from the point array. Compute:
     • min: smallest y
     • max: largest y
     • mean: sum(y)/n
     • median: sort(y) and pick middle or average of two middle values
     • stddev: sample standard deviation = sqrt(sum((y-mean)^2)/(n-1)) when n>1 or zero otherwise

5. Output Formatting
   • If json is true, console.log JSON.stringify({ min, max, mean, median, stddev }, null, 2)
   • Otherwise, print each statistic as key: value with two decimal places on its own line
   • On error, print descriptive message to stderr and process.exit(1)
   • On success, process.exit(0)

# Testing

Create tests/unit/stats-command.test.js that covers:

  • Expression mode: verify correct values for simple linear functions
  • Data-file mode: mock fs.readFileSync to return sample JSON, YAML, CSV and assert computed statistics
  • JSON output: verify JSON structure and numeric precision
  • Error cases: missing both expression and data-file, missing range, invalid samples, unsupported file extension

# Documentation

1. USAGE.md
   Add a **Stats** section under CLI Examples illustrating both plain text and JSON output:

     repository0-plot-code-lib stats --expression "y=x" --range "x=0:5"
     repository0-plot-code-lib stats --data-file data.csv --json

2. README.md
   Under **Examples**, include a snippet for stats usage and sample output lines

3. Help Output
   Ensure --help and --help stats mention the new stats subcommand and its flags