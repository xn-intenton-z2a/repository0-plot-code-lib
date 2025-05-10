# Summary

Add a new transform subcommand to compute time series transforms such as moving average, difference, and cumulative sum on expression-generated or file-based data sets. This enables users to quickly derive new series from raw data without external tools.

# Behavior

When users invoke the CLI with the first argument "transform":
- Parse flags to determine input source:
  • If --expression is provided, sample a mathematical expression over a numeric domain.
  • Else if --data is provided, load an array of { x, y } points from JSON, YAML, or CSV.
- Require a --method flag indicating the transform type: moving-avg, diff, or cumsum.
- For moving-avg, use an integer --window flag (>=2) for window size.
- Validate required options and input ranges; on missing or invalid input, print an error and exit code 1.
- Compute a new array of transformed data points maintaining x coordinates:
  • moving-avg: sliding window average over y values, x at center of window.
  • diff: successive difference of y values, x at original points after the first.
  • cumsum: cumulative sum of y values, x unchanged.
- Format the transformed series according to the --format flag: table, json, or csv.
- If --output <file> is provided, write the formatted output to that file and confirm; otherwise print to console.

# CLI Flags

--expression <expr>       Generate points by sampling a JavaScript expression in x
--data <filePath>         Load points from a JSON, YAML, or CSV file
--xmin <number>           Minimum x value for sampling (default -10)
--xmax <number>           Maximum x value for sampling (default 10)
--samples <integer>       Number of sample points (default 100)
--method <transform>      Transform type: moving-avg, diff, cumsum (required)
--window <integer>        Window size for moving-avg (default 5, must be >=2)
--format <table|json|csv> Output format of transformed series (default table)
--output <file>           File path to write results; omit to print to console
--help                    Show help for transform command and exit

# Implementation Details

1. Extend the command router in src/lib/main.js to handle cmd === "transform" and invoke runTransform(rest).
2. Add a parseTransformOptions(args) function mirroring existing parsers to extract and validate flags.
3. Implement runTransform(opts):
   - Load or generate dataPoints via generateExpressionData or loadDataFromFile.
   - On load or evaluation errors, console.error and exit with code 1.
   - Compute the transformedPoints array according to opts.method:
     • moving-avg: for i from window-1 to n-1, average y values from i-window+1 to i, set x to center index value.
     • diff: for i from 1 to n-1, compute y[i] - y[i-1], x at original x[i].
     • cumsum: for each index i, y = sum of y[0..i], x unchanged.
   - Select formatter based on opts.format:
     • table: formatTable(transformedStats or series)
     • json: JSON.stringify(transformedPoints, null, 2)
     • csv: formatCsvSeries(transformedPoints)
   - If opts.output is set, write using fs.promises.writeFile or writeFileSync and console.log confirmation; otherwise console.log output.

# Testing

- Add tests in tests/unit/transform.test.js using Vitest:
  • Test each method in expression mode: verify output length, values, and x coordinates.
  • Test moving-avg with custom window sizes and confirm correct averaging and error on window <2.
  • Test data file mode for JSON, YAML, and CSV inputs by mocking fs.readFileSync and verifying transformation.
  • Test format options: table contains header and rows, json parses to array, csv has header and rows.
  • Test --output writes to file by mocking fs.promises.writeFile or writeFileSync and checking confirmation message.
  • Test error conditions: missing --method, invalid method, window <2, missing source, parse failures.

# Documentation

- Update README.md and USAGE.md under Available Commands to include the transform subcommand with a brief summary.
- Provide examples for each transform type:
  repository0-plot-code-lib transform --expression "x^2" --samples 5 --method diff --format json
  repository0-plot-code-lib transform --data data.csv --method moving-avg --window 3 --output smoothed.csv
- Include sample output snippets in documentation to illustrate the transformed series in table, JSON, and CSV modes.