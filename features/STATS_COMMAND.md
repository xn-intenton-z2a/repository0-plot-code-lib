# Summary

Add support for the stats subcommand in the CLI to parse data files or mathematical expressions and output descriptive statistics in a tabular format. Users can supply either a data file (--data) in JSON, YAML, or CSV format or an expression (--expression) with sampling domain flags to compute min, max, mean, median, and standard deviation for x and y values.

# Behavior

When the first argument is "stats" is provided:
- Parse subcommand flags via parseStatsOptions:
  - --data <filePath> to load points from JSON, YAML, or CSV file
  - --expression <formula> to sample an expression over a numeric domain
  - --xmin, --xmax, --samples for expression sampling defaults
  - --precision to control decimal places in output
  - --help to display usage
- If both --data and --expression are provided, prioritize --data and warn that expression is ignored
- If --data is supplied:
  - Call loadDataFromFile(filePath) to read and normalize to array of { x, y } points
  - On parse or validation failure, console.error and exit with code 1
- Else if --expression is supplied:
  - Generate data via generateExpressionData with provided domain and sample count
- Else print error requiring one of the flags and exit with code 1
- Compute statistics using computeStatistics on the chosen data array
- Format results into aligned console table lines with column headers and rows; apply precision to numeric values
- Print each table line with console.log and exit with code 0 on success

# Implementation Details

- In src/lib/main.js add or update runStats(args) to implement the above behavior
- Define parseStatsOptions(args) to populate options object including data, expression, xmin, xmax, samples, precision, and help flag
- Implement loadDataFromFile(filePath) similar to plot mode:
  - Inspect file extension, read file contents asynchronously
  - JSON: JSON.parse, YAML: js-yaml.load, CSV: split lines and parse numeric columns
  - Validate numeric x and y fields and non-empty array
- Reuse computeStatistics and format table logic or extract into a helper
- Update main() dispatching to include stats exactly as other subcommands
- Add or update tests in tests/unit/plot-generation.test.js or create tests/unit/stats.test.js to cover CLI invocation main(["stats","...args"])
- Update README.md and USAGE.md under Available Commands to document stats usage, flags, and examples