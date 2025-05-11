# Overview
Add a new stats subcommand to compute summary statistics (count, minimum, maximum, mean, median, standard deviation) for a generated or imported data series without rendering a chart. This enables users to inspect numeric summaries in JSON or CSV formats directly from the CLI.

# CLI Flags
- `stats`: Subcommand keyword to enter statistics mode; appears as the first argument.
- `--expression <expr>`: Mathematical expression in terms of x (required when not using data-file mode).
- `--range <axis>=<min>:<max>`: Numeric range for sampling the expression (required when not using data-file mode).
- `--data` or `--data-file <path>`: Path to an external data file (.json, .yaml, .yml, .csv); mutually exclusive with `--expression` and `--range`.
- `--samples <number>`: Number of sample intervals (default 100).
- `--stats-format <json|csv>`: Output serialization format for the summary; defaults to `json`.
- `--output <path>`: Optional file path to write the summary; if omitted, prints to stdout.

# Implementation
1. **Command Dispatch**  
   - In `src/lib/main.js` inside `main()`, detect if the first argument equals `stats`. Remove it from the arguments array and route to a new handler function `runStatsCommand(parsedArgs)`.  
2. **Argument Parsing and Validation**  
   - Create a Zod schema `statsSchema` requiring either:  
     • `expression` and `range` for expression mode, or  
     • `data` for file-input mode.  
   - Include optional fields `samples`, `stats-format`, and `output`.  
   - Enforce mutual exclusivity between expression/range and data-file options via Zod refinements.  
3. **Data Acquisition**  
   - In `runStatsCommand`, after schema validation:  
     • If `data-file` is provided, call the existing `parseDataFile(path)` helper to load an array of `{x, y}` points.  
     • Otherwise, call `generateData(expression, rangeObj, samples)` to generate the data series.  
4. **Statistics Computation**  
   - Compute summary metrics over the `y` values (or all points if desired):  
     - `count`: total number of points.  
     - `min` and `max`: minimum and maximum y-values.  
     - `mean`: arithmetic average of y-values.  
     - `median`: middle value after sorting (or average of two middle values).  
     - `stddev`: standard deviation of y-values.  
   - Build a summary object: `{count, min, max, mean, median, stddev}`.  
5. **Output Serialization and Delivery**  
   - Serialize summary:  
     - For `json`: `JSON.stringify(summary, null, 2)`.  
     - For `csv`: Header `count,min,max,mean,median,stddev` followed by a single CSV row of values.  
   - If `--output` is specified, write to disk with `fs.writeFileSync(output, content)`. Otherwise, print to console via `console.log(content)`.  
   - After completion, exit process with code 0.

# Testing
- Create `tests/unit/stats-command.test.js`:  
  - **Expression mode**: Invoke `main(['stats','--expression','y=x','--range','x=0:5','--stats-format','json'])` and assert printed or returned JSON summary.  
  - **Data-file mode**: Mock `fs.readFileSync` for JSON, YAML, and CSV inputs; invoke `stats --data-file sample.csv` and assert correct summary.  
  - **Output to file**: Spy on `fs.writeFileSync` and verify path and serialized content for both JSON and CSV formats.  
  - **Validation errors**: Missing required flags or conflicting flags should cause `process.exit(1)` with descriptive error messages.

# Documentation
- **USAGE.md and README.md**:  
  - Introduce a new section **"Stats Subcommand"** under CLI examples.  
  - Show examples:  
    repository0-plot-code-lib stats --expression "y=sin(x)" --range "x=0:6.28" --samples 50 --stats-format json --output summary.json  
    repository0-plot-code-lib stats --data-file data.csv --stats-format csv  
  - Include expected JSON and CSV output snippets.