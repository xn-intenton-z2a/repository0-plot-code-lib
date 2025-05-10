# Summary

Introduce a new "regression" subcommand in the CLI that performs least-squares linear regression on a set of data points, either generated from a mathematical expression or loaded from an external file. Outputs slope, intercept, r-squared and can overlay the regression line on an ASCII chart. Supports table, JSON, or CSV output formats and file export.

# Behavior

When the user runs:

    repository0-plot-code-lib regression [flags]

- If both --expression and --data are provided, the tool logs a warning that expression takes precedence and ignores data.
- If --expression is provided:
  - Sample the provided JavaScript expression in x over [xmin, xmax] with the given number of samples.
- Otherwise if --data is provided:
  - Read an array of { x, y } points from JSON, YAML, or CSV.
- On missing source or invalid inputs, print a descriptive error and exit code 1.
- Compute regression parameters by least squares:
  • slope (m)
  • intercept (b)
  • coefficient of determination (r_squared)
- Format results according to --format: table (aligned text), JSON, or CSV.
- If --plot-line is set, render an ASCII chart of the data with the regression line overlaid.
- If --output <file> is given, write the chosen output or ASCII chart to that file; otherwise print to console.

# CLI Flags

  --expression <string>   JavaScript expression in x to generate y values.
  --data <filePath>       Path to JSON, YAML, or CSV file with x,y data.
  --xmin <number>         Minimum x value when sampling expressions (default: -10).
  --xmax <number>         Maximum x value when sampling expressions (default: 10).
  --samples <integer>     Number of sample points (default: 100, must be >=2).
  --precision <integer>   Decimal places for numeric output (default: 4).
  --format <table|json|csv>  Output format (default: table).
  --plot-line             Overlay the regression line on an ASCII chart.
  --output <file>         File path to write output or chart; omit to print to console.
  --help                  Show help for regression command and exit.

# Implementation Details

1. Update src/lib/main.js:
   - In main(), add: else if (cmd === "regression") runRegression(rest);
2. Create parseRegressionOptions(args) mirroring other parsers to extract and validate flags.
3. Implement runRegression(opts) in src/lib/main.js:
   - Determine dataPoints via generateExpressionData or loadDataFromFile.
   - Validate samples >=2 and input errors with console.error and process.exit(1).
   - Compute means, variances, covariance to derive slope, intercept, and r_squared.
   - Round numeric results to opts.precision.
   - If opts.plotLine:
     • Use renderAsciiChart to draw data points.
     • Generate regression line points and overlay on the same grid.
     • Append chart string after regression parameters.
   - Choose formatter based on opts.format; build output string.
   - Write to opts.output via fs.writeFileSync or console.log.
4. Reuse existing helpers generateExpressionData, loadDataFromFile, renderAsciiChart, formatTable, formatCsv.
5. No new dependencies are required.

# Testing

- Add tests in tests/unit/regression.test.js:
  • Expression mode: verify slope, intercept, r_squared for simple linear expressions.
  • JSON, CSV formats: mock inputs and compare outputs.
  • File input mode: mock fs.readFileSync to supply known data points.
  • --plot-line: spy on console.log to capture ASCII chart and verify both markers and line characters.
  • --output file export: mock fs.writeFileSync and confirm written content and confirmation log.
  • Error conditions: missing source, samples<2, unsupported extension, unknown format.

# Documentation

- In README.md and USAGE.md under Available Commands, add regression subcommand:

      repository0-plot-code-lib regression --expression "2*x+1" --samples 10 --format json
      repository0-plot-code-lib regression --data data.csv --plot-line --output trend.txt

- Show sample outputs for table, JSON, CSV, and ASCII chart overlay.
