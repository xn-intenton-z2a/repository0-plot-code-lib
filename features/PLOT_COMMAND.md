# Summary
Enhance the plot subcommand to support reading data from JSON or YAML files and rendering simple ASCII charts in the console or writing rendered output to a file.

# Behavior

When the first argument is plot:
- Parse flags:
  - `--type <chartType>` Chart type: line, bar, scatter; default line.
  - `--width <pixels>` Width of the plot in pixels; default 640.
  - `--height <pixels>` Height of the plot in pixels; default 480.
  - `--data <filePath>` Optional path to a JSON or YAML data file containing an array of numeric values or objects with x and y fields.
  - `--output <file>` Optional file path to write rendered output. If omitted, render chart as ASCII art in the console.
- If `--data` is omitted, use a built-in sample data set.
- On JSON or YAML parse errors, display a descriptive error and exit with code 1.
- After loading data, generate the specified chart type. For console output, render a simple ASCII chart scaled to width and height. For file output, write the ASCII rendering or raw data summary to the target file.

# CLI Overview
Usage: repository0-plot-code-lib plot [flags]

Flags:
- `--type <chartType>` Chart type (line, bar, scatter)
- `--width <pixels>` Width of the plot in pixels
- `--height <pixels>` Height of the plot in pixels
- `--data <filePath>` Path to JSON or YAML data file
- `--output <file>` Output file path for the rendered chart or summary

# Examples

repository0-plot-code-lib plot --type bar --width 400 --height 300 --data data.json
Reads numeric array from data.json and renders a bar chart 400x300 as ASCII art in the console.

repository0-plot-code-lib plot --data chart.yaml --output chart.txt
Parses x/y points from chart.yaml and writes ASCII scatter chart to chart.txt.

repository0-plot-code-lib plot
Uses built-in sample data and renders a line chart 640x480 in the console.

# Testing

- Add tests in tests/unit/plot-generation.test.js to cover:
  - Reading valid JSON data file and rendering ASCII output.
  - Reading valid YAML data file and rendering ASCII output.
  - Defaults when `--data` is not provided.
  - Error cases for missing file or invalid JSON/YAML syntax.
  - Writing output to a file when `--output` is specified (mock fs.writeFile).
- Mock console.log and fs.readFile/fs.writeFile to capture and assert rendering behavior.
- Ensure each chart type (line, bar, scatter) renders without errors and matches snapshot of ASCII output.