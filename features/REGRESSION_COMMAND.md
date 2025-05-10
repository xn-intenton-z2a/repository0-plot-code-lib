# Summary

Introduce a new "regression" subcommand to the CLI that computes a least-squares linear regression for expression-generated or file-based data sets. It calculates slope, intercept, and coefficient of determination (r-squared) and presents results in table, JSON, or CSV formats. Optionally overlay the regression line on an ASCII chart of the data.

# Behavior

When users invoke the CLI with the first argument "regression":
- Parse flags to determine data source:
  - If --expression is provided, sample a mathematical expression over a numeric domain.
  - Else if --data is provided, load an array of { x, y } points from JSON, YAML, or CSV.
- Validate required input; on missing or invalid input, print a descriptive error and exit code 1.
- Compute regression parameters using least squares:
  • slope (m)
  • intercept (b)
  • r_squared
- Format output according to the --format flag:
  • table: aligned columns printed to console
  • json: structured JSON string
  • csv: header row and comma-separated values
- If --plot-line flag is set, render an ASCII chart of data points with the regression line overlaid.
- If --output <file> is provided, write the formatted output or ASCII chart to that file and confirm; otherwise print to console.

# CLI Flags

--expression <expr>       Generate points by sampling a JavaScript expression in x
--data <filePath>         Load points from a JSON, YAML, or CSV file
--xmin <number>           Minimum x value for sampling (default -10)
--xmax <number>           Maximum x value for sampling (default 10)
--samples <integer>       Number of sample points (default 100)
--precision <integer>     Decimal places for numeric output (default 4)
--format <table|json|csv> Output format for regression results (default table)
--plot-line               Overlay regression line on ASCII chart of data points
--output <file>           File path to write results or ASCII chart; omit to print
--help                    Show help for regression command and exit

# Implementation Details

1. Extend the command router in src/lib/main.js to handle cmd === "regression" and invoke runRegression(rest).
2. Add parseRegressionOptions(args) similar to parseStatsOptions to extract flags and validate inputs.
3. Implement runRegression(opts):
   - Obtain dataPoints via generateExpressionData or loadDataFromFile.
   - Compute regression parameters:
     • Calculate means of x and y, sums of squared deviations, and covariance.
     • Compute slope = covariance / variance_x, intercept = y_mean - slope * x_mean, r_squared.
   - Build a results object { slope, intercept, r_squared } with specified precision.
   - If opts.plotLine is true:
     • Use renderAsciiChart(dataPoints, opts) to draw data points.
     • Overlay line by plotting extra points from the regression formula on the same grid.
     • Combine grid rows into a chart string.
   - Select formatter based on opts.format or use the ASCII chart string if plot-line only mode.
   - Write to file if opts.output is set, otherwise console.log.
4. Reuse helper functions generateExpressionData, loadDataFromFile, formatTable, formatCsv.
5. Ensure exit codes, console.error messages, and help output follow existing conventions.

# Testing

- Add tests in tests/unit/regression.test.js:
  • Test default expression mode: main(["regression","--expression","x","--samples","5"]) prints a table with correct slope and intercept.
  • Test JSON and CSV formats: verify output structure and values.
  • Test data file mode: mock fs.readFileSync to supply known data and assert regression results.
  • Test --plot-line: spy on console.log to capture ASCII chart and confirm both markers and line characters appear.
  • Test file export: mock fs.writeFileSync and confirm correct content and confirmation message.
  • Test error conditions: missing input, unsupported extension, samples <2, invalid --format values.

# Documentation

- Update README.md and USAGE.md under Available Commands to include regression with brief description.
- In README.md and USAGE.md, add usage examples:
  repository0-plot-code-lib regression --expression "2*x+1" --samples 10 --format json
  repository0-plot-code-lib regression --data data.csv --plot-line --output trend.txt
- Provide sample output for table, JSON, CSV, and ASCII overlay scenarios.