# Overview
Add a new CLI subcommand `stats` that computes and reports key summary statistics for a data series without generating a plot. Users may supply a mathematical expression with a range or import an external data file in JSON, YAML, or CSV formats.

# CLI Subcommand
- **Command**: repository0-plot-code-lib stats [options]
- **Options**:
  - `--expression <expr>`        Expression in x to generate y values (e.g., "y=sin(x)"). Exclusive with data-file.
  - `--range <axis>=min:max`     Required when using expression mode.
  - `--data-file <path>`         Path to JSON, YAML, or CSV file containing x,y records. Exclusive with expression mode.
  - `--samples <number>`         Number of intervals for generation. Defaults to 100.
  - `--json`                     Output stats as a JSON object. Defaults to plain text.

# Implementation
1. **Subcommand Dispatch**  
   - In `main()` detect when the first argument is `stats`. Remove it from `args` and invoke a new helper `handleStats`, then return.
2. **Stats Schema and Argument Parsing**  
   - Define `statsSchema` with Zod to parse:
     • `expression`: optional string  
     • `range`: string matching axis=min:max when expression is provided  
     • `data-file`: optional string  
     • `samples`: optional string matching integer, default 100  
     • `json`: optional string matching `true|false`, default false  
   - Enforce that exactly one of `expression` or `data-file` is provided, and that `--range` accompanies `--expression`.
3. **Data Acquisition**  
   - If `data-file` is set, call existing `parseDataFile(path)` to load an array of `{x,y}` points.  
   - Otherwise, parse the `--range` with `parseRange` and call `generateData(expression, rangeObj, samples)`.
4. **Summary Statistics Computation**  
   - Extract all y-values into an array.  
   - Compute:
     • `min`: smallest y  
     • `max`: largest y  
     • `mean`: arithmetic average  
     • `median`: middle value or average of two middles  
     • `stddev`: sample standard deviation (divide by n−1, zero if n≤1)  
5. **Output Formatting**  
   - Convert the `--json` flag to a boolean.  
   - If JSON output is true, `console.log(JSON.stringify({min,max,mean,median,stddev}, null, 2))`.  
   - Otherwise, write each statistic on its own line as `key: value` with two decimal places.  
   - On error, print a descriptive message to stderr and exit with code 1. Success exits with code 0.

# Testing
- Create `tests/unit/stats-command.test.js`:
  • **Expression mode**: run `main(['stats','--expression','y=x','--range','x=0:10'])`, capture stdout and assert correct numeric values.  
  • **Data-file mode**: mock `fs.readFileSync` to return JSON, YAML, and CSV, invoke `main(['stats','--data-file','data.csv','--json'])` and assert JSON output.  
  • **Flag parsing**: missing both expression and data-file, missing range, invalid samples, unsupported extension, and invalid json value should error with exit code 1 and descriptive stderr messages.  

# Documentation
- **USAGE.md** and **README.md**:
  - Under CLI Examples, add a **Stats Subcommand** section:  
    ```sh
    repository0-plot-code-lib stats --expression "y=x" --range "x=0:5"
    repository0-plot-code-lib stats --data-file data.csv --json
    ```  
  - Show sample plain-text output:
    ```
    min: 0.00
    max: 5.00
    mean: 2.50
    median: 2.50
    stddev: 1.87
    ```  
  - Show sample JSON output:
    ```json
    {
      "min": 0,
      "max": 5,
      "mean": 2.5,
      "median": 2.5,
      "stddev": 1.87
    }
    ```