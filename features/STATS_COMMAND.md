# Summary

Add a new stats subcommand to compute and display descriptive statistics for data sets or mathematical expressions. Users can obtain min, max, mean, median, and standard deviation for x and y values without generating a chart.

# Behavior

When the first argument is "stats" is provided:

- Parse the same options as plot: --expression or --data to obtain data points.
- If --expression is present:
  - Generate data points using generateExpressionData with provided domain and samples.
- If --data is present and no --expression:
  - Load and normalize data from JSON, YAML, or CSV via loadDataFromFile.
- Compute the following statistics on dataPoints:
  - x_min, x_max, x_mean, x_median, x_stddev
  - y_min, y_max, y_mean, y_median, y_stddev
- Print each statistic to the console in a human-readable table.
- Exit with code 0 on success or 1 on error.

# CLI Flags

- --expression <formula>   Mathematical expression in x to sample
- --data <filePath>        Path to JSON, YAML, or CSV data file
- --xmin <number>          Minimum x value for sampling (default: -10)
- --xmax <number>          Maximum x value for sampling (default: 10)
- --samples <integer>      Number of sample points (default: 100)
- --help                   Show help for stats command

# Implementation Details

- In src/lib/main.js, extend main() router to handle "stats" command by calling runStats(rest).
- Implement runStats(args) following runPlot and loadDataFromFile pipelines to obtain dataPoints.
- Add a helper computeStatistics(dataPoints) that:
  - Extracts arrays of x and y values.
  - Computes min, max by Math.min/Math.max, mean by sum/length.
  - Sorts values to compute median, calculates standard deviation by the square root of average squared deviations.
- Format output lines such as:
  x_min    0.0000
  x_max    10.0000
  x_mean   5.0000
  ...
- Use console.log for output and console.error for errors. Use process.exit(1) on fatal errors.

# Testing

- In tests/unit/plot-generation.test.js (or main.test.js), add tests for stats:
  - Mock console.log to capture output and verify statistics for a simple expression x or known data array.
  - Test with expression: main(["stats","--expression","x","--xmin","0","--xmax","2","--samples","3"]) should list x_min 0, x_max 2, x_mean 1, etc.
  - Mock loadDataFromFile to return a fixed dataPoints array and assert stats are correct.
  - Test error cases: missing expression and data should print error and exit with code 1.

# Documentation

- Update README.md and USAGE.md to include stats subcommand in Command Router and relevant examples:
  repository0-plot-code-lib stats --expression "x^2" --xmin 0 --xmax 5 --samples 6
  repository0-plot-code-lib stats --data measurements.csv
- Describe supported flags and show sample output in README under a new "Stats Subcommand" section.