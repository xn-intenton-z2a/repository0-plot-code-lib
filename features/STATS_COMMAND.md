# Summary

Enhance the CLI with a stats subcommand that computes and displays descriptive statistics (min, max, mean, median, standard deviation) for datasets or mathematical expressions without rendering charts. This feature provides users quick numerical insights into their data.

# Behavior

When the first argument is "stats" is provided:
- Route to a new runStats handler after parsing subcommand-specific flags.
- If --expression is supplied:
  - Generate data points by sampling the mathematical expression over a domain using the existing generateExpressionData function.
- If --data is supplied and --expression is absent:
  - Load and normalize data points from JSON, YAML, or CSV using a new loadDataFromFile helper.
- If neither --expression nor --data is provided:
  - Print an error message indicating one of those flags is required and exit with code 1.
- Compute descriptive statistics on x and y arrays:
  - Minimum, maximum, mean, median, standard deviation.
- Display results in a formatted console table with aligned columns and four decimal places.
- Exit with code 0 on success, or code 1 on error.

# CLI Flags

- --expression <formula>   Mathematical expression in x to sample (over --xmin, --xmax, --samples).
- --data <filePath>        Path to JSON, YAML, or CSV data file.
- --xmin <number>          Minimum x value for sampling expressions (default -10).
- --xmax <number>          Maximum x value for sampling expressions (default 10).
- --samples <integer>      Number of sample points (default 100).
- --help                   Show help for stats command and exit.

# Implementation Details

- In src/lib/main.js:
  - Extend main() to recognize "stats" and dispatch to runStats(args).
  - Add a parseStatsOptions(args) function similar to parsePlotOptions, extracting only stats-related flags.
  - Implement runStats(opts):
    - Validate that opts.expression or opts.data is present, otherwise console.error and process.exit(1).
    - If opts.expression, call generateExpressionData. If opts.data, call loadDataFromFile(filePath).
    - Invoke computeStatistics(dataPoints):
      - Extract arrays of x and y values.
      - Calculate min, max using Math.min/Math.max, mean by sum/length.
      - Sort for median; compute standard deviation via sqrt of average squared deviations.
    - Format output into columns with headings: Metric, X Value, Y Value; align decimals to four places.
    - Use console.log for each line.

- In src/lib/main.js or a new helper module:
  - Implement loadDataFromFile(filePath) for JSON, YAML, CSV detection and normalization to [{x,y}] array.
  - Implement computeStatistics(dataPoints) returning an object with x_min, x_max, x_mean, x_median, x_stddev, y_min, y_max, y_mean, y_median, y_stddev.

# Testing

- In tests/unit/plot-generation.test.js or a dedicated tests/unit/stats.test.js:
  - Mock console.log and console.error to capture output.
  - Test expression case: main(["stats","--expression","x","--xmin","0","--xmax","2","--samples","3"]) prints correct statistics (0.0000, 2.0000, 1.0000, etc.) and exits normally.
  - Test data file case: mock loadDataFromFile to return a fixed data set and verify printed statistics match expected values.
  - Test missing flags: main(["stats"]) prints error and exit code 1.
  - Test invalid data file or parsing error: mock loadDataFromFile to throw, verify error is printed and process.exit(1) is called.

# Documentation

- Update README.md:
  - Add a "Stats Subcommand" section under Available Commands with a brief description.
  - Show usage examples:
    - repository0-plot-code-lib stats --expression "x^2" --xmin 0 --xmax 5 --samples 6
    - repository0-plot-code-lib stats --data measurements.csv
  - Include sample console output table snippet.

- Update USAGE.md similarly with flag descriptions and examples.
