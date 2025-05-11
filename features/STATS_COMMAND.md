# Overview
Add a new stats subcommand that computes summary statistics (minimum, maximum, mean, median, standard deviation) over a generated or imported data series without rendering a plot. Users can inspect numeric summaries in JSON or CSV formats and print to the console or write to a file.

# CLI Flags
- `stats`: subcommand keyword to enter statistics mode; must appear first.
- `--expression <expr>`: mathematical expression in terms of x (required when not using data-file).
- `--range <axis>=<min>:<max>`: numeric range for sampling the expression (required when not using data-file).
- `--data` or `--data-file <path>`: path to external data file (.json, .yaml, .yml, .csv); mutually exclusive with `--expression` and `--range` flags.
- `--samples <number>`: number of sample intervals (default 100).
- `--stats-format <json|csv>`: output serialization format, default `json`.
- `--output <path>`: optional file path to write the summary output; if omitted, prints to stdout.

# Implementation
1. Command Dispatch
   - In `main()` detect if first argument is `stats`. Remove it from the args list and invoke a new handler `runStatsCommand` before normal CLI logic.

2. Argument Parsing and Validation
   - Define a Zod schema `statsSchema` requiring either:
     - `expression` and `range` for expression mode, or
     - `data` for file input mode.
   - Include optional fields `samples`, `stats-format`, and `output`.
   - Enforce mutual exclusivity between expression/range and data-file options.
   - Parse CLI args with `parseArgs`, then validate against `statsSchema`.

3. Data Acquisition
   - If `data-file` provided, call the existing `parseDataFile(path)` helper to load an array of `{ x, y }` points from JSON, YAML, or CSV.
   - Otherwise, use `generateData(expression, rangeObj, samples)` to generate the data series.

4. Statistics Computation
   - Extract the array of `y` values (or any specified metric series).
   - Compute:
     - `count`: number of data points.
     - `min` and `max` using Math.min and Math.max.
     - `mean` as the sum divided by count.
     - `median` by sorting and selecting the middle value (or average of two middle values).
     - `stddev` as the square root of the average squared deviation from the mean.
   - Assemble a summary object: `{ count, min, max, mean, median, stddev }`.

5. Output Serialization
   - For `json`, use `JSON.stringify(summary, null, 2)`.
   - For `csv`, generate a header `count,min,max,mean,median,stddev` and a single row of values separated by commas.

6. Writing or Printing
   - If `output` is specified, write content to disk via `fs.writeFileSync(output, content)`.
   - Otherwise, print content to stdout with `console.log`.

7. Exit
   - After writing or printing, exit process with code 0.

# Testing
- Create `tests/unit/stats-command.test.js` to cover:
  - Expression mode: invoking CLI with `stats --expression y=x --range x=0:5 --stats-format json` prints valid JSON summary.
  - Data-file mode: invoking CLI with `stats --data-file sample.csv` loads and summarizes the data.
  - Output to file: verify `fs.writeFileSync` is called with correct path and content for both formats.
  - CSV serialization: header row and values match computed statistics.
  - Validation errors: missing required flags, invalid formats, and exclusivity violations result in process exit with code 1.

# Documentation
- Update `README.md` and `USAGE.md` to include a section on the `stats` subcommand:
  - Show examples:
    repository0-plot-code-lib stats --expression "y=sin(x)" --range "x=0:6.28" --samples 50 --stats-format json --output summary.json
    repository0-plot-code-lib stats --data-file data.csv --stats-format csv
  - Display expected JSON and CSV output examples.