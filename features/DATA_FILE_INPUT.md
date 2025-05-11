# Overview
Add unified support for plotting external datasets by loading JSON, YAML, or CSV files through a single data flag with alias data-file for backward compatibility. Users can import real-world time series data and visualize it directly without writing mathematical expressions.

# CLI Flags
- --data <path> path to input data file supported extensions .json .yaml .yml .csv
- alias data-file <path> for backward compatibility
- mutually exclusive with expression, expressions, x-expression, y-expression, and range modes
- compatible with existing flags format, output, samples, export-data, width, height, title, x-label, y-label, and grid

# Implementation
## Schema and Argument Parsing
In src/lib/main.js
- extend cliSchema to include optional fields data and data-file as strings
- add zod refinement to ensure the file extension matches json yaml yml or csv
- update parseArgs to recognize both data and data-file and normalize into parsed.data
- enforce mutual exclusivity of data with all expression and range related flags via zod schema refinement

## Data File Parsing Helper
In src/lib/main.js
- implement parseDataFile(path) that reads file content using fs.readFileSync
- detect file type by extension:
  • for .json use JSON.parse
  • for .yaml or .yml use js-yaml load
  • for .csv split on lines, parse header x,y then convert each row into numeric x and y
- validate that the parsed result is a non-empty array of objects with numeric x and y properties
- throw descriptive errors for unsupported extensions, malformed content, or missing fields

## Integration in Main
In main() after schema validation and before data generation
- if parsed.data is set call parseDataFile(parsed.data) to obtain dataPoints
- bypass generateData and treat dataPoints as the plot source
- feed dataPoints into generateSVG or PNG conversion pipeline unchanged
- preserve multi-series, export-data, and styling behavior when loading file dataPoints

# Testing
Add tests in tests/unit/data-file-input.test.js
- mock fs.readFileSync to return sample JSON YAML and CSV strings
- test parseDataFile yields correct arrays of { x y } for each format
- invoke main with --data sample.json and format svg then assert fs.writeFileSync writes an svg containing polyline for loaded data
- invoke main with --data sample.csv and format png then assert PNG buffer output via sharp is written
- verify validation errors thrown for unsupported file extensions, malformed data, missing x or y values, and flag exclusivity violations

# Documentation
Update USAGE.md and README.md
- document the --data and --data-file flags, supported formats, and exclusivity rules
- provide example commands such as repository0-plot-code-lib --data data.json --format svg --output chart.svg and repository0-plot-code-lib --data-file data.csv --format png --output chart.png
- include a sample SVG snippet generated from a CSV dataset