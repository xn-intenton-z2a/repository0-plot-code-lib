# Summary

Integrate the existing computeStatistics utility into a new CLI stats subcommand so users can compute descriptive statistics from expression-generated or file-based data, choose output formats, and optionally export results to a file.

# Behavior

When the first argument is "stats" is provided:
- Parse input flags to identify a data source: either --data <filePath> or --expression <expr> with --xmin, --xmax, and --samples.
- Compute statistics (min, max, mean, median, standard deviation) for x and y using computeStatistics.
- Format results according to --format:
  • table: aligned console table
  • json: structured JSON object
  • csv: comma-separated values with a header row
- If --output <file> is provided:
  • Write the formatted string to the specified file via fs.promises.writeFile
  • Console.log a confirmation message including the output path
- If --output is omitted:
  • Print results to standard output
- On missing or invalid options, print descriptive error messages and exit with non-zero code.

# CLI Flags

--data <filePath>      Load points from JSON, YAML, or CSV data file
--expression <expr>     Generate points by sampling a mathematical expression
--xmin <number>        Minimum x value (default -10)
--xmax <number>        Maximum x value (default 10)
--samples <integer>    Number of sample points (default 100)
--precision <integer>  Decimal places for numeric output (default 4)
--format <table|json|csv>  Output format (default table)
--output <file>        File path to write output; omit to print to console
--help                 Show help for stats command and exit

# Implementation Details

1. In main(), add a branch for cmd === "stats" that invokes runStats(rest).
2. Implement parseStatsOptions(args) mirroring parsePlotOptions but including --precision, --format, and --output.
3. Add runStats(opts) in src/lib/main.js:
   - Load or generate dataPoints (use existing generateExpressionData or loadDataFromFile).
   - Call computeStatistics(dataPoints) to obtain a stats object.
   - Choose formatter:
       • formatTable(stats, opts.precision)
       • JSON.stringify(stats, null, 2)
       • formatCsv(stats)
   - If opts.output is set, write to file and console.log confirmation; else console.log formatted output.
   - Use process.exit(1) on errors.
4. Ensure exit codes and console.error messages follow existing conventions.

# Testing

- Create tests in tests/unit/stats.test.js or extend plot-generation.test.js:
  • Mock console.log and fs.promises.writeFile.
  • Test default table output for expression mode.
  • Test JSON and CSV formats, verifying content and precision.
  • Test --output writes correct content and logs confirmation.
  • Test error cases: missing data and expression, invalid format, file write failures result in process.exit and descriptive errors.

# Documentation

- Update README.md under Available Commands to list the stats subcommand and its purpose.
- In README.md and USAGE.md, add detailed flag descriptions and examples:
    repository0-plot-code-lib stats --expression "x^2" --samples 5 --format json
    repository0-plot-code-lib stats --data data.csv --format csv --output stats.csv
- Include sample console outputs and confirmation messages in the examples.