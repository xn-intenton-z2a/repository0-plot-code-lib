# Overview

Add support for loading external data series from JSON, YAML, or CSV files via a unified --data flag (alias --data-file) so users can plot real-world datasets without writing mathematical expressions.

# CLI Flags

- `--data <path>` or `--data-file <path>`
  Path to an input file containing an array of points or tabular rows with x and y values. Supported extensions: .json, .yaml, .yml, .csv
- Mutually exclusive with expression modes: --expression, --expressions, --x-expression, --y-expression, and --range flags
- Compatible with existing flags: --format, --output, --samples, --width, --height, --title, --x-label, --y-label, --grid, --x-log, --y-log, --derivative, --export-data

# Implementation

## Schema and Argument Parsing

- In src/lib/main.js extend `cliSchema` to accept optional `data` and `data-file` fields as strings
- Add a schema refinement to validate file extension is one of json, yaml, yml, or csv
- Enforce mutual exclusivity with expression and range flags by adding a zod refinement on the combined schema
- In `parseArgs`, normalize `--data` and `--data-file` into a single `parsed.data` property

## Data File Parsing Helper

- Implement `parseDataFile(path: string): Array<{x:number, y:number}>` in src/lib/main.js
  • Read file contents with fs.readFileSync
  • Determine format by file extension
    - JSON: JSON.parse to array of objects with numeric x and y
    - YAML/YML: use js-yaml to load into array of objects with numeric x and y
    - CSV: split on lines, parse header row for columns named x and y, parse each row into numeric values
  • Validate that the parsed result is a non-empty array and every record has numeric x and y fields
  • Throw descriptive errors for unsupported extensions, parse failures, or missing x/y fields

## Integration in CLI Main

- In `main()`, after schema validation, if `parsed.data` is set:
  • Call `parseDataFile(parsed.data)` to get `dataPoints` array
  • Bypass `generateData` and `generateDerivativeData`, use `dataPoints` (and optionally derivative logic) as the source series
  • Pass `dataPoints` into `generateSVG` or into the PNG pipeline via sharp

## Integration in Programmatic API

- Extend `generatePlot` schema to include optional `data` field as string
- After parsing options, if `options.data` is provided:
  • Call `parseDataFile(options.data)` to load `dataPoints`
  • Use `dataPoints` (and derivative logic if requested) instead of `generateData`
  • Generate SVG or PNG from these points and return result

# Testing

- Create `tests/unit/data-file-input.test.js`:
  • Mock fs.readFileSync to return sample JSON, YAML, and CSV strings
  • Test `parseDataFile` returns correct arrays for each format and errors on invalid input
  • Test CLI: run `main()` with `--data sample.json --format svg --output out.svg` and verify fs.writeFileSync writes an SVG containing a <polyline> with points matching sample data
  • Test CLI for PNG: run `main()` with `--data sample.csv --format png --output out.png` and verify sharp pipeline is invoked and output buffer is written
  • Test programmatic API: call `generatePlot({ data: 'data.yaml', format: 'svg' })` and assert returned object has correct type and SVG content
  • Test mutual exclusion: using `--data` with `--expression` triggers an error exit

# Documentation

- Update USAGE.md and README.md:
  • Document `--data` and `--data-file` flags, supported formats, and exclusivity rules
  • Provide example commands:
    repository0-plot-code-lib --data data.json --format svg --output chart.svg
    repository0-plot-code-lib --data-file data.csv --format png --output chart.png
  • Show a sample SVG snippet generated from a CSV dataset