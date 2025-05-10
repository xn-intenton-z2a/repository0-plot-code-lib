# Summary
Extend the plot subcommand to fully support loading data files in JSON, YAML, and CSV formats, normalizing their contents into an array of { x, y } points, and rendering charts as ASCII art or writing to a file.

# Behavior
When the first argument is "plot" is provided:
- If the --data flag is present and no --expression flag:
  - Call loadDataFromFile with the specified path.
  - On success, receive a normalized array of { x, y } points.
  - Pass dataPoints into the existing ASCII rendering pipeline according to --type, --width, --height, and --output.
  - If parsing or validation fails, print a descriptive error via console.error and exit with code 1.
- If both --expression and --data are provided, emit a warning that expression takes precedence and continue with expression behavior.
- If only --expression is provided, retain existing expression evaluation behavior.
- If neither flag is present, fall back to built-in default data set and render accordingly.

# CLI Flags
--data <filePath>     Path to JSON, YAML, or CSV data file. Overrides built-in defaults when present.
--expression <expr>   JavaScript expression in x to generate y values.
--type <chartType>    Chart type: line, bar, scatter (default line).
--width <number>      Horizontal resolution for ASCII scaling (default 640).
--height <number>     Vertical resolution for ASCII scaling (default 480).
--xmin <number>       Minimum x value for sampling expressions (default -10).
--xmax <number>       Maximum x value for sampling expressions (default 10).
--samples <integer>   Number of sample points for expression mode (default 100).
--output <file>       Path to write rendered ASCII chart; omit to render to console.
--help                Show help for plot command and exit.

# Implementation Details
- In src/lib/main.js:
  - Import fs from "fs/promises", path from "path", and js-yaml for YAML parsing.
  - Implement loadDataFromFile(filePath):
    - Determine extension with path.extname.
    - Read file content with fs.readFile.
    - If .json, parse with JSON.parse.
    - If .yaml or .yml, parse with js-yaml.load.
    - If .csv, split content by lines and commas, handle optional header row, normalize rows into numeric x and y values.
    - Validate parsed result: if array of numbers, treat index as x and value as y; if array of objects, require numeric x and y properties.
    - Return array of { x, y } or throw an error on unsupported format or invalid shape.
  - In runPlot, replace the placeholder console.log for data support with:
    if (opts.data && !opts.expression) {
      try { dataPoints = await loadDataFromFile(opts.data); } catch (err) { console.error(err.message); process.exit(1); }
    } else if (opts.expression) {
      // existing behavior
    } else {
      // fallback data
    }
  - Pass dataPoints to renderAsciiChart and handle output or file write.

# Testing
- In tests/unit/plot-generation.test.js:
  - Add tests mocking fs.promises.readFile and js-yaml.load to simulate JSON and YAML inputs.
  - Test CSV parsing: provide CSV string with header and without header, verify loadDataFromFile returns correct x,y arrays.
  - For each format, spy on renderAsciiChart or console.log to assert chart output contains expected markers.
  - Test error paths: invalid JSON/YAML/CSV content triggers console.error and process.exit(1).
- Retain existing expression tests to ensure no regressions.

# Documentation
- Update README.md and USAGE.md under Plot Subcommand:
  - Add examples:
    repository0-plot-code-lib plot --data data.json --type scatter --width 80 --height 20
    # Reads JSON data, renders an ASCII scatter chart to console.
    repository0-plot-code-lib plot --data measurements.csv --output chart.txt
    # Reads CSV data, renders a line chart, and writes to chart.txt.
  - Describe supported formats and normalization rules.
