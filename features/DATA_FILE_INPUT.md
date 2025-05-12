# Overview
Add unified support for loading external datasets from JSON, YAML, or CSV files via a single data flag with alias data-file. Users can visualize real-world time series data directly without writing mathematical expressions.

# CLI Flags

- --data <path> (or alias --data-file <path>)
  Path to an input data file. Supported extensions: .json, .yaml, .yml, .csv
- Mutually exclusive with --expression, --expressions, --x-expression, --y-expression, and --range modes
- Compatible with existing flags: --format, --output, --samples, --export-data, --data-format, --width, --height, --title, --x-label, --y-label, --grid

# Implementation

## Schema and Argument Parsing
In src/lib/main.js:
- Extend cliSchema to include optional fields data and data-file as strings
- Add a zod refinement to ensure the file extension matches json, yaml, yml, or csv
- Enforce mutual exclusivity of data with all expression and range related flags via a schema refinement
- In parseArgs, detect both --data and --data-file and normalize into parsed.data

## Data File Parsing Helper
In src/lib/main.js:
- Implement function parseDataFile(path)
  • Read file content with fs.readFileSync
  • Determine file type by extension
    - .json: parse with JSON.parse
    - .yaml or .yml: parse with js-yaml load
    - .csv: split lines, parse header row for x and y, convert each row into numeric x and y
  • Validate result is a non-empty array of objects with numeric x and y properties
  • Throw descriptive errors for unsupported extensions, malformed content, or missing fields

## Integration in CLI Main
In main():
- After schema validation, if parsed.data is set:
  • Call parseDataFile(parsed.data) to obtain dataPoints
  • Bypass generateData and treat dataPoints as the plot source
  • Feed dataPoints into generateSVG or PNG conversion pipeline unchanged
- Preserve multi-series, export-data, and styling behavior when loading file dataPoints

## Integration in Programmatic API
In generatePlot():
- Extend the options schema to include optional data as a string
- After parsing options, if data is provided:
  • Call parseDataFile(data) to obtain dataPoints
  • Bypass generateData and proceed to rendering or PNG conversion

# Testing

Create tests/unit/data-file-input.test.js:
- Mock fs.readFileSync to return sample JSON, YAML, and CSV strings
- Test parseDataFile returns correct arrays of { x, y } for each format
- Invoke main with --data sample.json and --format svg, assert fs.writeFileSync writes SVG with a polyline of loaded data
- Invoke main with --data sample.csv and --format png, assert PNG buffer output via sharp
- Test generatePlot called with data option returns svg or png result based on loaded data
- Verify validation errors for unsupported extensions, malformed data, missing x or y values, and flag exclusivity violations

# Documentation

Update USAGE.md and README.md:
- Document the --data and --data-file flags, supported formats, and exclusivity rules
- Provide example commands:
  repository0-plot-code-lib --data data.json --format svg --output chart.svg
  repository0-plot-code-lib --data-file data.csv --format png --output chart.png
- Include a sample SVG snippet generated from a CSV dataset