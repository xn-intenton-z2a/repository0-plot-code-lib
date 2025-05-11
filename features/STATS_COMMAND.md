# Overview
Add a new stats subcommand to compute summary statistics (count, minimum, maximum, mean, median, standard deviation) for a generated or imported data series without rendering a chart.

# CLI Flags
- stats: Subcommand keyword to enter statistics mode; appears as the first positional argument.
- --expression <expr>: Mathematical expression in terms of x (required when not using data-file mode).
- --range <axis>=<min>:<max>: Numeric range for sampling the expression (required when not using data-file mode).
- --data <path> or --data-file <path>: Path to an external data file (.json, .yaml, .yml, .csv); mutually exclusive with expression and range.
- --samples <number>: Number of sample intervals (default 100).
- --stats-format <json|csv>: Output serialization format for the summary (default json).
- --output <path>: File path to write the summary output; if omitted, prints to stdout.

# Implementation
1. Command Dispatch
   - Update main() in src/lib/main.js to detect if the first argument equals 'stats'.
   - Remove the 'stats' token and route remaining args to a new handler function runStatsCommand(parsedArgs).

2. Argument Parsing and Validation
   - Define a Zod schema statsSchema requiring either:
     • expression and range for expression mode, or
     • data for file-input mode.
   - Include optional fields samples, stats-format, and output.
   - Enforce mutual exclusivity between expression/range and data via Zod refinements.

3. Data Acquisition
   - In runStatsCommand:
     • If data-file is provided, call parseDataFile(path) to load an array of {x, y} points.
     • Otherwise, call generateData(expression, rangeObj, samples) to generate the series.

4. Statistics Computation
   - Compute metrics over the y-values:
     - count: total number of data points.
     - min and max: minimum and maximum y-values.
     - mean: arithmetic average of y-values.
     - median: middle value of sorted y-values.
     - stddev: standard deviation of y-values.
   - Assemble a summary object {count, min, max, mean, median, stddev}.

5. Output Serialization and Delivery
   - Serialize the summary:
     • For json: pretty-print with JSON.stringify(summary, null, 2).
     • For csv: header row count,min,max,mean,median,stddev followed by a single data row.
   - If --output is provided, write to disk with fs.writeFileSync. Otherwise, console.log the serialized content.
   - Exit process with code 0 after completion.

# Testing
- Add tests in tests/unit/stats-command.test.js:
  • Expression mode: invoke main(['stats', ...]) and assert JSON or CSV summary is printed or returned.
  • Data-file mode: mock fs.readFileSync for JSON, YAML, CSV and verify correct summary values.
  • Output to file: spy on fs.writeFileSync and confirm file path and content formatting.
  • Validation errors: missing or conflicting flags should result in exit with code 1 and descriptive error messages.

# Documentation
- Update USAGE.md and README.md:
  • Introduce a **Stats Subcommand** section under CLI examples.
  • Show example commands:
    repository0-plot-code-lib stats --expression "y=sin(x)" --range "x=0:6.28" --samples 50 --stats-format json --output summary.json
    repository0-plot-code-lib stats --data-file data.csv --stats-format csv
  • Include expected JSON and CSV output snippets.