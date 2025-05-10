# Summary

Extend the plot subcommand to implement data file plotting support for JSON, YAML, and CSV inputs, normalizing file contents into an array of { x, y } points and feeding them into the existing ASCII art rendering or file output pipeline.

# Behavior

When users invoke the plot command with the --data flag and no --expression flag:
- Determine file format by extension: .json, .yaml/.yml, or .csv.
- Read file contents asynchronously and parse:
  - JSON: JSON.parse
  - YAML: js-yaml.load
  - CSV: split lines, handle optional header row, parse numeric x and y columns or positional pairs
- Validate that parsed data yields a non-empty array of numeric { x, y } objects. On parse or validation failure, console.error a descriptive message and exit process with code 1.
- Pass the array of data points into renderAsciiChart and follow existing --type, --width, --height, and --output behavior:
  - If --output is omitted, print ASCII chart to console
  - If --output is provided, write ASCII text to the specified file path and console.log confirmation message

If both --expression and --data are provided, warn that --expression takes precedence and proceed with expression mode as before. If neither flag is present, default to the built-in sample data.

# CLI Flags

--data <filePath>     Path to a JSON, YAML, or CSV file containing data points.
--expression <expr>   JavaScript expression in x to generate y values (expression mode overrides data mode).
--type <chartType>    Chart style: line, bar, scatter (default: line).
--width <number>      Horizontal resolution for ASCII scaling (default: 640).
--height <number>     Vertical resolution for ASCII scaling (default: 480).
--output <file>       Path to write rendered ASCII chart; omit to render to console.

All other plot flags (--xmin, --xmax, --samples) are applied only in expression mode.

# Implementation Details

In src/lib/main.js:
- Add a helper loadDataFromFile(filePath) that:
  - Inspects extension with path.extname
  - Reads content via fs.promises.readFile
  - For JSON, calls JSON.parse; for YAML, calls js-yaml.load; for CSV, splits lines and commas to build { x, y } objects
  - Validates numeric values and throws on unsupported formats or invalid shapes
- In runPlot(), replace the "Data file plotting not implemented" placeholder:
  if (opts.data && !opts.expression) {
    try {
      dataPoints = await loadDataFromFile(opts.data)
    } catch (err) {
      console.error(err.message)
      process.exit(1)
    }
  } else if (opts.expression) {
    // existing behavior
  } else {
    // fallback built-in sample data
  }
- Pass dataPoints to renderAsciiChart and handle file writes or console output using fs.promises.writeFile when opts.output is set

# Testing

In tests/unit/plot-generation.test.js:
- Mock fs.promises.readFile and js-yaml.load to simulate valid JSON and YAML inputs, verify loadDataFromFile returns correct arrays
- Test CSV parsing with header row and without, verifying numeric x, y extraction
- Spy on console.error and process.exit to confirm error handling for malformed file contents and unsupported extensions
- For valid inputs, spy on console.log or fs.writeFile to assert that ASCII output contains expected markers and that file writes occur when --output is provided
- Ensure existing expression mode tests still pass unchanged

# Documentation

Update README.md and USAGE.md under Plot Subcommand:
- Describe --data flag and supported file formats with examples
- Add usage examples:
    repository0-plot-code-lib plot --data data.json --type scatter --width 80 --height 20
    repository0-plot-code-lib plot --data measurements.csv --output chart.txt
- Document the precedence of --expression over --data and error messages on invalid input