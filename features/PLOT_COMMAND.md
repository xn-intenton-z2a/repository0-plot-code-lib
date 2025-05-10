# Summary
Extend the plot subcommand to support reading data from JSON, YAML, or CSV files and rendering simple ASCII charts in the console or writing rendered output to a file.

# Behavior
When the first argument is plot:

- Parse flags:
  - `--type <chartType>` Chart type: line, bar, scatter; default line.
  - `--width <pixels>` Width of the plot in pixels; default 640.
  - `--height <pixels>` Height of the plot in pixels; default 480.
  - `--data <filePath>` Optional path to a JSON, YAML, or CSV data file containing either:
    - An array of numeric values,
    - An array of objects with x and y fields,
    - A CSV table with two columns (x and y) or a single column of numeric values.
  - `--output <file>` Optional path to write rendered output. If omitted, render chart as ASCII art in the console.

- If `--data` is omitted, use a built-in sample data set.
- Detect file type by extension: .json, .yaml/.yml, .csv. Use js-yaml to parse YAML and a CSV parser to parse CSV.
- On JSON, YAML, or CSV parse errors, display a descriptive message and exit with code 1.
- After loading data, normalize into an array of points with x and y values (for single-value arrays, treat index as x).
- Generate the specified chart type. For console output, render a simple ASCII chart scaled to width and height. For file output, write the ASCII rendering or raw data summary to the target file.

# CLI Flags

Usage: repository0-plot-code-lib plot [flags]

Flags:

- `--type <chartType>` Chart type (line, bar, scatter)
- `--width <pixels>` Width of the plot in pixels
- `--height <pixels>` Height of the plot in pixels
- `--data <filePath>` Path to JSON, YAML, or CSV data file
- `--output <file>` Output file path for the rendered chart or summary

# Examples

repository0-plot-code-lib plot --type bar --width 400 --height 300 --data data.json
Reads numeric array from data.json and renders a bar chart 400x300 as ASCII art in the console.

repository0-plot-code-lib plot --data chart.yaml --output chart.txt
Parses x/y points from chart.yaml and writes ASCII scatter chart to chart.txt.

repository0-plot-code-lib plot --data points.csv
Reads two-column CSV (x,y) from points.csv and renders a scatter chart 640x480 in the console.

repository0-plot-code-lib plot --data values.csv --type line
Reads single-column CSV of numeric values, treats row index as x, and renders a line chart.

repository0-plot-code-lib plot
Uses built-in sample data and renders a line chart 640x480 in the console.

# Testing

- Add tests in tests/unit/plot-generation.test.js to cover:
  - Reading valid CSV data and rendering ASCII output.
  - Reading valid JSON and YAML data as before.
  - Defaults when `--data` is not provided.
  - Error cases for invalid file path or parse errors in JSON, YAML, CSV (mock fs.readFile and csv parser to throw).
  - Writing output to a file when `--output` is specified (mock fs.writeFile).
- Mock console.log, fs.readFile, csv-parse or custom CSV parser to capture and assert rendering behavior.
- Ensure each chart type (line, bar, scatter) renders correctly with CSV input and matches snapshot of ASCII output.