# Summary

Enhance the transform subcommand to include additional time series operations: scaling and offset along with existing moving average, difference, and cumulative sum transforms. Users can apply these transforms to expression-generated or file-based data sets directly via CLI flags.

# Behavior

When users invoke the CLI with the first argument "transform":
- Parse flags to determine input source:
  • If --expression is provided, sample a mathematical expression over a numeric domain.
  • Else if --data is provided, load an array of { x, y } points from JSON, YAML, or CSV.
- Require a --method flag indicating the transform type: moving-avg, diff, cumsum, scale, or offset.
- For moving-avg, use an integer --window flag (>=2) for window size.
- For scale, require --factor <number> to multiply y values.
- For offset, require --value <number> to add to y values.
- Validate required options and input ranges; on missing or invalid input, print an error and exit code 1.
- Compute a new array of transformed data points maintaining x coordinates:
  • moving-avg: sliding window average over y values, x at center of window.
  • diff: successive difference of y values, x at original points after the first.
  • cumsum: cumulative sum of y values, x unchanged.
  • scale: multiply each y value by the factor, x unchanged.
  • offset: add the value to each y, x unchanged.
- Format the transformed series according to the --format flag: table, json, or csv.
- If --output <file> is provided, write the formatted output to that file and confirm; otherwise print to console.

# CLI Flags

--expression <expr>       Generate points by sampling a JavaScript expression in x
--data <filePath>         Load points from a JSON, YAML, or CSV file
--xmin <number>           Minimum x value for sampling (default -10)
--xmax <number>           Maximum x value for sampling (default 10)
--samples <integer>       Number of sample points (default 100)
--method <transform>      Transform type: moving-avg, diff, cumsum, scale, offset (required)
--window <integer>        Window size for moving-avg (default 5, must be >=2)
--factor <number>         Scaling factor for scale method (required for scale)
--value <number>          Offset value for offset method (required for offset)
--format <table|json|csv> Output format of transformed series (default table)
--output <file>           File path to write results; omit to print to console
--help                    Show help for transform command and exit

# Implementation Details

1. Extend the command router in src/lib/main.js to handle cmd === "transform" and invoke runTransform(rest).
2. Add a parseTransformOptions(args) function to extract and validate flags, ensuring method-specific parameters are present.
3. Implement runTransform(opts):
   - Load or generate dataPoints via generateExpressionData or loadDataFromFile.
   - On load or evaluation errors, console.error and exit with code 1.
   - Compute the transformedPoints array according to opts.method:
     • moving-avg: for i from window-1 to n-1, average y values from i-window+1 to i, set x to center index value.
     • diff: for i from 1 to n-1, compute y[i] - y[i-1], x at original x[i].
     • cumsum: for each index i, y = sum of y[0..i], x unchanged.
     • scale: for each point, y = original y * opts.factor, x unchanged.
     • offset: for each point, y = original y + opts.value, x unchanged.
   - Select formatter based on opts.format:
     • table: use existing formatTable to display series statistics or values.
     • json: JSON.stringify(transformedPoints, null, 2).
     • csv: use existing formatCsvSeries helper.
   - If opts.output is set, write using fs.writeFileSync and console.log confirmation; otherwise console.log output.

# Testing

- Add tests in tests/unit/transform.test.js using Vitest:
  • moving-avg: test various window sizes and error on window <2.
  • diff and cumsum: verify length and values for simple series.
  • scale: use an expression or static data, apply factor and assert y values multiplied.
  • offset: apply positive and negative offsets and check y values shifted correctly.
  • Data file mode for JSON, YAML, and CSV inputs: mock fs.readFileSync and verify transformation.
  • Format options: table header and rows, valid JSON array, CSV header and rows.
  • --output writes file: mock fs.writeFileSync and confirm content and confirmation log.
  • Error conditions: missing method, invalid method, missing factor or value for scale/offset, missing source, parse failures.

# Documentation

- Update README.md and USAGE.md under Available Commands to include transform with new scale and offset examples:
  repository0-plot-code-lib transform --expression "x" --method scale --factor 2 --format json
  repository0-plot-code-lib transform --data data.csv --method offset --value -5 --output adjusted.csv
- Provide sample outputs for scale and offset transforms in table, JSON, and CSV modes.