# Summary

Extend the plot subcommand to fully support data file inputs in JSON, YAML, and CSV formats. When a data file is provided, the command will parse and normalize contents into an array of { x, y } points and then render the specified chart type as ASCII art or write to a file.

# Behavior

When the first argument is "plot" is provided:

- If the --data flag is present and no --expression flag:
  - Read the specified file using fs.promises.readFile.
  - Detect file format by extension:
    - .json: parse with JSON.parse.
    - .yaml or .yml: parse with js-yaml.
    - .csv: parse by splitting lines and commas or using a lightweight CSV parser.
  - Validate that the parsed result is an array of numbers or objects.
    - If array of numbers, treat each index as x and value as y.
    - If array of objects, require numeric x and y properties.
  - On parsing or validation errors, print a descriptive error and exit with code 1.
  - Once normalized, use the existing ASCII rendering pipeline to generate the chart according to --type, --width, --height, and --output.

- If the --expression flag is present, retain current expression evaluation behavior.

- If neither expression nor data is provided, fall back to a built-in default data set.

# CLI Flags

- --data <filePath>     Path to JSON, YAML, or CSV data file. Overrides built-in defaults when present.
- --expression <expr>    JavaScript expression in x to generate y values across a domain sample.
- --type <chartType>     Chart type: line, bar, scatter (default line).
- --width <number>       Horizontal resolution for ASCII scaling (default 640).
- --height <number>      Vertical resolution for ASCII scaling (default 480).
- --xmin <number>        Minimum x value (default -10) when using expressions.
- --xmax <number>        Maximum x value (default 10) when using expressions.
- --samples <integer>    Number of sample points (default 100) when using expressions.
- --output <file>        Path to write rendered ASCII chart; omit to render to console.
- --help                 Show help for plot command.

# Implementation Details

- In src/lib/main.js, import fs from "fs/promises" and import path from "path".
- Add a helper loadDataFromFile(filePath) that:
  - Determines extension with path.extname.
  - Reads file content and selects parser:
    - JSON.parse for .json.
    - js-yaml for .yaml/.yml.
    - A simple CSV splitter for .csv that handles header row or raw values.
  - Normalizes parsed content into array of { x, y } points.
  - Throws errors for unsupported formats or invalid data shapes.
- In runPlot, after parsePlotOptions, branch on opts.data to call loadDataFromFile, then pass normalized dataPoints to renderAsciiChart or the existing ASCII pipeline.
- Ensure console.error is used for error messages and process.exit(1) is invoked on failures.

# Testing

- In tests/unit/plot-generation.test.js, mock fs.promises.readFile and js-yaml to simulate JSON, YAML, and CSV inputs.
- Test valid JSON file containing array of objects and array of numbers, asserting correct x,y shapes and chart generation calls.
- Test malformed files to assert descriptive error messages and exit code 1.
- Test CSV with header and without header, verifying normalization logic.
- Retain existing expression tests and ensure data-file tests do not interfere.

# Documentation

- Update README.md under Plot Subcommand to include examples:
  repository0-plot-code-lib plot --data data.json --type scatter --width 80 --height 20
  repository0-plot-code-lib plot --data measurements.csv --output chart.txt
- Add a section in USAGE.md and README.md titled "Data File Input" describing supported formats and shape requirements.
- Include a small sample JSON and CSV snippet in documentation to illustrate normalization results.