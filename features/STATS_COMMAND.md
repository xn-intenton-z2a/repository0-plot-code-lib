# Summary

Add a new stats subcommand to the CLI that provides quick descriptive statistics for data sets or mathematical expressions without rendering plots. Users receive min, max, mean, median, and standard deviation for both x and y values in a clear, tabular format.

# Behavior

When the first argument is "stats" is provided:
- Parse subcommand-specific flags via parseStatsOptions.
- If --expression is supplied:
  - Sample the expression over the domain using generateExpressionData.
- Else if --data is supplied:
  - Load and normalize points from JSON, YAML, or CSV using loadDataFromFile.
- If neither --expression nor --data is provided:
  - Print an error indicating one flag is required and exit with code 1.
- Compute descriptive statistics on x and y arrays using computeStatistics:
  - Metrics: minimum, maximum, mean, median, standard deviation.
- Display results in a console table with aligned columns and configurable decimal precision.
- Exit with code 0 on success or code 1 on error.

# CLI Flags

--expression <formula>   Mathematical expression in x to sample (requires --xmin, --xmax, --samples defaults).
--data <filePath>        Path to JSON, YAML, or CSV file of { x, y } points.
--xmin <number>          Minimum x value for sampling expressions (default -10).
--xmax <number>          Maximum x value for sampling expressions (default 10).
--samples <integer>      Number of sample points for expressions (default 100).
--precision <integer>    Decimal places to display (default 4).
--help                   Show help for stats command and exit.

# Implementation Details

In src/lib/main.js:
- Extend main() to dispatch when cmd === "stats" and call runStats(rest).
- Implement parseStatsOptions(args) analogous to parsePlotOptions, extracting stats flags and setting defaults.
- Implement loadDataFromFile(filePath) if not already defined, reusing logic from plot data loader:
  - Detect format by extension (.json, .yaml, .yml, .csv), parse and normalize to array of { x, y }.
  - Validate presence of numeric x and y values.
- Implement computeStatistics(data) or reuse existing function:
  - Sort x and y arrays, calculate min, max, mean, median, and standard deviation.
  - Return an object with keys x_min, x_max, x_mean, x_median, x_stddev, y_min, y_max, y_mean, y_median, y_stddev.
- In runStats(opts):
  - Validate flag presence and numeric ranges; on error console.error and process.exit(1).
  - Generate or load data, call computeStatistics.
  - Format a table header and rows, aligning column widths, and apply opts.precision to toFixed values.
  - Print each line via console.log.

# Testing

In tests/unit/stats.test.js:
- Mock console.log, console.error, and process.exit.
- Test expression path: main(["stats","--expression","x^2","--xmin","0","--xmax","4","--samples","5"])
  - Verify printed table contains correct numeric values and headers.
- Test data file path: mock loadDataFromFile to return sample points, verify compute output and table.
- Test missing flags: main(["stats"]) prints error and exits with code 1.
- Test invalid input: mock loadDataFromFile throwing or invalid expression, expect error path.

# Documentation

- Update README.md under Available Commands:
  - Add "stats" with brief description of metrics.
  - Provide two examples:
    repository0-plot-code-lib stats --expression "x^2" --xmin 0 --xmax 5 --samples 6 --precision 3
    repository0-plot-code-lib stats --data measurements.csv --precision 2
  - Include sample console output table snippet.
- Update USAGE.md in the Stats section with flag descriptions and examples.
