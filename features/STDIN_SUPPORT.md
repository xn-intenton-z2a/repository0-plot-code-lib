# Summary
Add support for reading data from standard input (stdin) for file-based CLI commands, enabling users to pipe JSON, YAML, or CSV data directly into plot, stats, transform, and regression subcommands.

# Behavior
- Recognize --data '-' as an instruction to read data from stdin instead of a filesystem path.
- Require a new --data-format flag when --data '-' is used to specify the data format: json, yaml, or csv.
- When --data '-' is present:
  • Read all incoming data synchronously via fs.readFileSync(0, 'utf8').
  • Parse the raw input based on --data-format: use JSON.parse for json, yaml.load for yaml/yml, or CSV parsing logic from loadDataFromFile for csv.
  • Validate that the parsed result is an array of { x: number, y: number } objects; on failure print a descriptive error and exit code 1.
- After parsing, proceed with existing command logic (ASCII rendering, statistics computation, transformations, regression) using the stdin-supplied data.

# CLI Flags
--data <filePath|->        Path to JSON, YAML, or CSV data file, or '-' to read from stdin.
--data-format <json|yaml|csv>  Required when --data '-' is specified to indicate the format of piped data.

# Implementation Details
1. Extend parsePlotOptions, parseStatsOptions, parseTransformOptions, and parseRegressionOptions to accept opts.data === '-' and capture opts.dataFormat.
2. In runPlot, runStats, runTransform, and runRegression, before calling loadDataFromFile:
   - If opts.data is '-', call fs.readFileSync(0, 'utf8') to obtain the raw input string.
   - Based on opts.dataFormat, parse the string:
     • json: JSON.parse(raw)
     • yaml: yaml.load(raw)
     • csv: reuse the CSV parsing logic (split lines, detect header, parse numbers)
   - Validate the resulting array and map to { x, y } objects.
3. On missing --data-format with --data '-', print an error and exit code 1.
4. No new dependencies are required; reuse fs, js-yaml, and existing CSV parsing logic.

# Testing
- Use Vitest to mock fs.readFileSync with file descriptor 0 and simulate JSON, YAML, and CSV inputs.
- Write tests for each subcommand (plot, stats, transform, regression) with --data '-' and the appropriate --data-format, asserting correct behavior (charts, stats, transforms, regression results).
- Test error conditions: missing --data-format, unsupported data-format values, malformed input, validation failures, and verify console.error messages and process.exit(1).