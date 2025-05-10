# Summary

Merge the regression subcommand branch into the main CLI to perform least-squares linear regression on data points derived from expressions or files, and add comprehensive tests and documentation updates.

# Behavior

When the user runs repository0-plot-code-lib regression [flags]:
• If both --expression and --data are provided, log a warning and only use the expression source.
• If --expression is given, sample y values by evaluating the JavaScript expression over [xmin, xmax] with the specified number of samples.
• Otherwise if --data is given, load an array of x,y points from JSON, YAML or CSV file.
• On missing source or invalid input values, print a descriptive error and exit code 1.
• Compute slope, intercept and coefficient of determination (r_squared) using a least-squares algorithm.
• Round numeric results to the configured precision.
• Format output according to --format: table (aligned text), json or csv.
• If --plot-line is set, render an ASCII chart with the regression line overlaid using the existing chart renderer.
• If --output <file> is provided, write the formatted results or chart to a file, otherwise print to console.

# CLI Flags

--expression <string>    JavaScript expression in x to generate y values
--data <filePath>        Path to JSON, YAML, or CSV data file
--xmin <number>          Minimum x value when sampling expressions (default: -10)
--xmax <number>          Maximum x value when sampling expressions (default: 10)
--samples <integer>      Number of sample points (default: 100, must be >=2)
--precision <integer>    Decimal places for numeric output (default: 4)
--format <table|json|csv>  Output format for regression parameters (default: table)
--plot-line              Overlay the regression line on an ASCII chart
--output <file>          File path to write output or chart; omit to print to console
--help                   Show help for regression command and exit

# Implementation Details

1. In src/lib/main.js update main() to route cmd === "regression" to a new function runRegression.
2. Add parseRegressionOptions(args) mirroring other parsers to extract and validate flags, ensuring samples>=2 and required options.
3. Implement runRegression(opts) in src/lib/main.js:
   • Determine data points via generateExpressionData or loadDataFromFile.
   • Validate inputs and on errors use console.error and process.exit(1).
   • Compute means, variances and covariance to derive slope, intercept and r_squared.
   • Round results to opts.precision.
   • If opts.plotLine is true, call renderAsciiChart on data points and on computed line points, merging outputs.
   • Select formatter based on opts.format: use formatTable, JSON.stringify or formatCsv helper.
   • If opts.output is set, write output via fs.writeFileSync and console.log confirmation; otherwise console.log output.
4. Reuse existing helpers: generateExpressionData, loadDataFromFile, renderAsciiChart, formatTable, formatCsv.
5. No additional dependencies required.

# Testing

Add a new file tests/unit/regression.test.js with Vitest covering:
• Expression mode: verify slope, intercept and r_squared for known linear expressions.
• File mode: mock fs.readFileSync for JSON, YAML and CSV and assert formatted output in table, json and csv modes.
• --plot-line: spy on console.log to capture ASCII chart and verify both data markers and regression line.
• --output file export: mock fs.writeFileSync and confirm file content and confirmation log.
• Invalid conditions: missing expression and data, samples<2, unsupported extension, unknown format flag, and assert descriptive error messages and exit code 1.

# Documentation

Update README.md and USAGE.md:
• Under Available Commands add regression with a brief summary.
• In Plot and Stats sections cross-link regression feature.
• Add a Regression section listing flags and sample invocations for table, json, csv and ASCII chart modes.
• Provide example commands such as:
  repository0-plot-code-lib regression --expression "2*x+1" --samples 10 --format json
  repository0-plot-code-lib regression --data data.csv --plot-line --output trend.txt