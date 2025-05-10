# Summary
Enhance the existing stats subcommand to support multiple output formats and optional file export. Users can choose to receive results as a formatted console table (default), as structured JSON, or as comma-separated values (CSV). They may also direct output to a file instead of standard output.

# Behavior
When users invoke the stats command:
- Parse input flags: data file or expression with domain options, precision, format, and output file.
- Load or generate points as before.
- Compute statistics: min, max, mean, median, standard deviation for x and y.
- Format results based on --format:
  - table: aligned columns with headers and rows printed or written.
  - json: a JSON object mapping statistic keys to values.
  - csv: a single header row of keys and a single data row of values separated by commas.
- If --output is provided:
  - Write formatted text or JSON/CSV string into the specified file.
  - Print a confirmation message including the file path.
- If --output is omitted:
  - Print the result to standard output using console.log.

# CLI Flags
--data <filePath>      Load data points from JSON, YAML, or CSV file.
--expression <expr>     Generate data by sampling an expression over a domain.
--xmin <number>         Minimum x value (default: -10).
--xmax <number>         Maximum x value (default: 10).
--samples <integer>     Number of sample points (default: 100).
--precision <integer>   Decimal places for numeric output (default: 4).
--format <table|json|csv>  Output format: table (default), json, or csv.
--output <file>         Path to write output; omit to print to console.
--help                  Show help and exit.

# Implementation Details
Extend parseStatsOptions to recognize --format and --output flags and merge with existing options. In runStats:
- After computing stats object, choose formatter:
  • formatTable(stats, precision)
  • JSON.stringify(stats, null, 2)
  • formatCsv(stats)
- If opts.output is set, use fs.promises.writeFile to write the formatted string, then console.log confirmation. Otherwise, console.log each line or the full string.
- Ensure exit code 0 on success and non-zero on errors.

# Testing
- In tests/unit/stats.test.js, mock console.log and fs.promises.writeFile:
  • Verify table output lines for default mode.
  • Verify JSON output contains keys and numeric values with correct precision.
  • Verify CSV header and values line formatting.
  • Test --output writes the correct content and logs confirmation.
  • Test error conditions: missing data or expression, invalid precision or format, write failures.

# Documentation
Update README.md and USAGE.md under Available Commands:
- Document --format and --output flags with examples for each format.
- Show example invocations:
    repository0-plot-code-lib stats --expression "x^2" --samples 5 --format json
    repository0-plot-code-lib stats --data data.csv --format csv --output stats.csv
- Include snippets of each output style and file write confirmation.