# Overview
Add a new stats subcommand that computes summary statistics (minimum, maximum, mean, median, standard deviation) over a generated or imported data series without rendering a plot. Users can inspect numeric summaries in JSON or CSV formats and either print to the console or write to a file.

# CLI Flags
- stats: subcommand keyword to enter statistics mode.  This must appear first in CLI invocation.
- --expression <expr>: Mathematical expression in terms of x (e.g., y=sin(x)).  Required when not using data-file.
- --range <axis>=<min>:<max>: Numeric range for sampling the expression.  Required when not using data-file.
- --samples <number>: Number of sample intervals (default 100).
- --stats-format <json|csv>: Output serialization format, default json.
- --output <path>: Optional file path to write the summary output.  If omitted, output is printed to stdout.

# Implementation
1. **Command Dispatch**
   - In `main()` in `src/lib/main.js`, detect if the first argument equals `stats`.  When so, remove it from the args array and route to a new handler `runStatsCommand` before normal CLI logic.

2. **Argument Parsing and Validation**
   - Define a Zod schema `statsSchema` that requires:
     - Either `expression` and `range` or (in future) a data-file option.
     - Optional `samples` as a positive integer.
     - `stats-format` as enum of `json` or `csv`.
     - Optional `output` path.
   - Parse the remaining args with `parseArgs` and validate with `statsSchema`.

3. **Data Generation**
   - Call the existing `generateData(expression, rangeObj, samples)` helper to produce an array of `{x, y}` points.

4. **Statistics Computation**
   - Extract the array of `y` values.
   - Compute:
     - `min` and `max` via Math.min and Math.max.
     - `mean` by summing and dividing by count.
     - `median` by sorting and selecting the middle or average of two middles.
     - `stddev` by computing the square root of the average squared deviations from the mean.
   - Assemble an object:
     {
       count, min, max, mean, median, stddev
     }

5. **Output Serialization**
   - If `stats-format` is `json`, serialize with `JSON.stringify(summary, null, 2)`.
   - If `csv`, output a header row and a single row of values: `count,min,max,mean,median,stddev`.

6. **Writing or Printing**
   - If `output` is provided, write serialized content to `fs.writeFileSync(output, content)`.
   - Otherwise, print content to `console.log`.

7. **Exit**
   - After output, exit the process with code 0.

# Testing
- Create `tests/unit/stats-command.test.js`:
  - Mock `fs.writeFileSync` and confirm it is called with correct path and serialized content for both JSON and CSV formats.
  - Simulate `main(['stats', '--expression', 'y=x', '--range', 'x=0:3', '--stats-format', 'json'])` and capture console output to verify valid JSON string.
  - Simulate CSV format and verify header and values in the console or written file.
  - Test validation errors for missing required flags and invalid formats.

# Documentation
- Update `README.md` and `USAGE.md`:
  - Add a section on the `stats` subcommand with a usage example:
    ```sh
    repository0-plot-code-lib stats --expression "y=sin(x)" --range "x=0:6.28" --samples 50 --stats-format json --output summary.json
    ```
  - Show expected JSON output example and CSV output example.
