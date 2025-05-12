# Overview
Implement a new CLI subcommand named stats that computes summary statistics for a generated or imported data series, including minimum, maximum, mean, median, and standard deviation. This mode complements the existing plot and export workflows by providing quantitative insights without rendering images.

# CLI Subcommand
- Add a new positional subcommand stats before all named flags.
- Supported flags:
  • --expression <expr>        Mathematical expression to generate data if no data-file is provided.
  • --range <axis>=min:max     Numeric range for data generation; mutually exclusive with --data-file.
  • --data-file <path>         Path to JSON, YAML, or CSV data file; mutually exclusive with expression mode.
  • --samples <number>         Number of intervals for data generation; default 100.
  • --json                     Output results as a JSON object instead of plain text.

# Implementation
1. Subcommand Detection and Parsing
   - In src/lib/main.js, detect if the first argument is stats.  Remove it from argument list before parseArgs.
   - Extend cliSchema or introduce a separate statsSchema with required fields: exactly one of expression+range or data-file, optional samples, optional json flag.
2. Data Acquisition
   - If data-file is set, call existing parseDataFile to load an array of {x,y} points.
   - Otherwise use parseRange and generateData to produce an array of points.
3. Statistics Computation
   - Compute five summary values:
     • min: smallest y-value in the series.
     • max: largest y-value.
     • mean: arithmetic average of y-values.
     • median: middle y-value after sorting;
     • stddev: sample standard deviation of y-values.
   - Use mathjs library or a simple utility function over the numeric array.
4. Output Formatting
   - If --json is provided, assemble an object with keys min, max, mean, median, stddev and print JSON.stringify with two-space indentation.
   - Otherwise, print each statistic on its own line, e.g.
     min: 0.00
     max: 2.00
     mean: 1.00
     median: 1.00
     stddev: 0.82
5. Exit Behavior
   - Exit with code 0 on success.  On missing or invalid flags, display an error message and exit with code 1.

# Testing
- Create tests/unit/stats-command.test.js:
  • Test expression mode: run main(['stats','--expression','y=x','--range','x=0:2','--samples','2']) and capture console output containing correct numeric statistics.
  • Test data-file mode: mock fs.readFileSync to return a simple JSON or CSV, verify stats on sample data.
  • Test --json flag: output is valid JSON with exactly the five keys and numeric values.
  • Error cases: missing required flags, both expression and data-file provided, invalid range or non-numeric samples.

# Documentation
- Update USAGE.md and README.md:
  • Add a **stats** section under CLI Examples describing usage and sample output.
  • Show both plain-text and JSON output examples.
  • Reference the new stats subcommand in the overview of available commands.