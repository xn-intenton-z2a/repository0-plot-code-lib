# Overview

Enable users to load and plot real-world datasets from external files using a unified --data (alias --data-file) flag. Supported formats include JSON, YAML/YML, and CSV. This feature lets users visualize arbitrary x,y data without writing expressions.

# CLI Flags

- --data <path> or --data-file <path>
  Path to an input file containing an array of records or tabular rows with numeric x and y fields. Supported extensions: .json, .yaml, .yml, .csv.
- Mutually exclusive with expression and parametric modes: --expression, --expressions, --x-expression, --y-expression, and --range flags.
- Compatible with all styling, output, derivative, trendline, and export options: --format, --output, --samples, --width, --height, --title, --x-label, --y-label, --grid, --x-log, --y-log, --derivative, --trendline-stats, --overlay-trendline, --export-data.

# Implementation

## Schema and Argument Parsing
- Extend cliSchema in src/lib/main.js to accept optional string fields data and data-file.
- Add a Zod refinement to ensure the file extension is one of .json, .yaml, .yml, or .csv.
- Enforce mutual exclusivity: data/data-file cannot be combined with any expression or range flags.
- In parseArgs(), normalize values passed via --data or --data-file into a single parsed.data property.

## Data File Parsing Helper
- Implement a new helper parseDataFile(path: string): Array<{ x: number, y: number }> in src/lib/main.js:
  1. Read file content with fs.readFileSync(path, 'utf-8').
  2. Determine format from file extension:
     - JSON: JSON.parse() to an array of objects with numeric x and y.
     - YAML/YML: yaml.load() from js-yaml to an array of objects with numeric x and y.
     - CSV: split text on newlines, parse header row for columns named x and y, parse each record into numeric x and y values.
  3. Validate that result is a non-empty array and each record has finite numeric x and y.
  4. Throw descriptive errors for unsupported extension, parse failures, or missing x/y fields.

## Integration in CLI Main
- After schema validation in main(), if parsed.data is set:
  1. Call parseDataFile(parsed.data) to obtain dataPoints.
  2. Bypass generateData and generateDerivativeData; use dataPoints as the primary series.
  3. Apply derivative or trendline logic if requested to dataPoints.
  4. Pass dataPoints (or series array) into generateSVG or the PNG pipeline via sharp.

## Integration in Programmatic API
- Extend generatePlot() schema to include an optional data field (string).
- After parsing options in generatePlot(), if options.data is provided:
  1. Call parseDataFile(options.data) to load dataPoints.
  2. Use dataPoints in place of generateData output, including derivative, xLog, yLog, and trendline transformations.
  3. Generate and return SVG or PNG result as usual.

# Testing

- Create tests/unit/data-file-input.test.js:
  • Mock fs.readFileSync to return sample JSON, YAML, and CSV contents.
  • Test parseDataFile() returns correct arrays for each format and errors on invalid input.
  • Test CLI mode: run main() with --data sample.json --format svg --output out.svg and verify fs.writeFileSync writes an SVG containing a <polyline> with points matching sample data.
  • Test CLI mode for PNG: run main() with --data sample.csv --format png --output out.png and verify sharp pipeline is invoked and output buffer is written.
  • Test mutual exclusion: using --data with any expression or range flag triggers a validation error and exits with code 1.
  • Test programmatic API: call generatePlot({ data: 'data.yaml', format: 'svg' }) and assert returned object type is svg and data contains expected <polyline> points.

# Documentation

- Update USAGE.md and README.md:
  • Document --data and --data-file flags, list supported formats, and explain exclusivity rules with examples.
  • Add example commands:
    repository0-plot-code-lib --data data.json --format svg --output chart.svg
    repository0-plot-code-lib --data-file data.csv --format png --output chart.png
  • Show a sample SVG snippet generated from a CSV dataset to illustrate the plotted points.