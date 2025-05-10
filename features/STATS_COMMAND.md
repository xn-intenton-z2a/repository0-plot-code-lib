# Summary

Add a new "stats" subcommand to the CLI that computes descriptive statistics over expression-generated or file-based data sets and outputs results in table, JSON, or CSV formats. Support writing output to a file or printing to the console.

# Behavior

When users invoke the CLI with the first argument "stats":

- Parse flags to determine data source:
  - If --expression is provided, sample a mathematical expression over a numeric domain.
  - Otherwise if --data is provided, load an array of { x, y } points from JSON, YAML, or CSV.
- Validate that at least one source is present; on missing or invalid input, print a descriptive error and exit with code 1.
- Compute statistics (min, max, mean, median, standard deviation) separately for x and y values using the existing computeStatistics helper.
- Format the resulting statistics object according to the --format flag:
  • table: aligned columns printed to console
  • json: structured JSON string
  • csv: header row and comma-separated values
- If --output <file> is provided, write the formatted output to that file and print a confirmation message.
- If --output is omitted, print results to standard output.

# CLI Flags

--data <filePath>        Load points from a JSON, YAML, or CSV file
--expression <expr>       Generate points by sampling a JavaScript expression in x
--xmin <number>          Minimum x value for sampling (default -10)
--xmax <number>          Maximum x value for sampling (default 10)
--samples <integer>      Number of sample points (default 100)
--precision <integer>    Number of decimal places for numeric output (default 4)
--format <table|json|csv> Output format (default table)
--output <file>          File path to write results; omit to print to console
--help                   Show help for stats command and exit

# Implementation Details

1. Update src/lib/main.js:
   - Extend the command router in main() to handle cmd === "stats" and invoke runStats(rest).
   - Add a parseStatsOptions(args) function mirroring parsePlotOptions that extracts flags above and handles validation of mutually exclusive or required flags.
   - Implement runStats(opts):
     • Load or generate dataPoints: call generateExpressionData when opts.expression is set, otherwise call loadDataFromFile(opts.data).
     • On load or evaluation errors, console.error the message and exit with process.exit(1).
     • Call computeStatistics(dataPoints) to obtain a stats object.
     • Select a formatter based on opts.format:
         - formatTable(stats, opts.precision)
         - JSON.stringify(stats, null, 2)
         - formatCsv(stats)
     • If opts.output is set, use fs.promises.writeFile to write the formatted string, then console.log a confirmation. Otherwise console.log the formatted output.
     • Ensure exit codes and error messages follow existing conventions.

2. Add helper formatters in src/lib/main.js or a new helper module:
   - formatTable(stats, precision): produce an aligned text table with headers and values.
   - formatCsv(stats): output a header row of statistic names and a single data row.

# Testing

- Create tests/unit/stats.test.js using Vitest:
  • Test default table output for expression mode: invoke main(["stats","--expression","x^2","--samples","5"]) and assert console.log prints a table with correct numeric values.
  • Test JSON and CSV formats: run main with --format json and --format csv and parse the output or split lines to assert expected fields and precision.
  • Test file export: mock fs.promises.writeFile, invoke main with --output stats.txt, and confirm writeFile receives correct content and console.log confirms path.
  • Test error conditions: missing both --data and --expression, invalid format value, file load failures; assert console.error is called with descriptive message and process.exit(1) occurs.

# Documentation

- Update README.md under Available Commands to list stats with a brief summary.
- In README.md and USAGE.md, add a new section for the stats subcommand:
    repository0-plot-code-lib stats --expression "x^2" --samples 5 --format json
    repository0-plot-code-lib stats --data data.csv --format csv --output summary.csv
  Include sample output for table, JSON, and CSV modes.
- Document each flag in the Usage section and note default values and precedence.
