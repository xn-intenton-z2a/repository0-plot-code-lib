# Overview
Add unified support for plotting external datasets by loading JSON, YAML, or CSV files through a single --data flag. Users can import real-world time series data without writing mathematical expressions.

# CLI Flags
- --data <path>  Path to input data file. Supported extensions: .json, .yaml, .yml, .csv
- --data-file <path>  Alias for --data for backward compatibility
- Mutually exclusive with --expression, --expressions, --x-expression, --y-expression, and --range
- Compatible with existing flags: --format, --output, --samples, --export-data, --width, --height, --title, --x-label, --y-label, --grid

# Implementation
1. Schema and Argument Parsing
   - In src/lib/main.js extend cliSchema to include an optional data field: z.string().refine(path => /\.(json|ya?ml|csv)$/i.test(path), 'data must be .json, .yaml, .yml, or .csv')
   - Update parseArgs to recognize both --data and --data-file flags and normalize to parsed.data
   - Enforce mutual exclusivity in the schema between data and all expression-based flags

2. Data File Parsing Helper
   - Implement parseDataFile(path) in src/lib/main.js:
     • Read file content via fs.readFileSync
     • Detect file type by extension
     • For .json use JSON.parse
     • For .yaml or .yml use js-yaml.load
     • For .csv split content by lines, parse header row, map each row to numeric { x, y }
     • Validate that result is an array of objects with numeric x and y, throw descriptive errors otherwise

3. Integration in Main
   - In main(), after schema validation detect parsed.data
   - Call parseDataFile(parsed.data) to get dataPoints
   - Skip generateData when dataPoints is provided and feed dataPoints into generateSVG or PNG pipeline
   - Ensure multi-series and export-data flags operate on loaded data when present

# Testing
- Create tests/unit/data-file-input.test.js
  • Mock fs.readFileSync to return representative JSON, YAML, and CSV content
  • Test that parseDataFile returns correct array of { x, y } for each format
  • Invoke main with --data sample.json --format svg --output out.svg and assert writeFileSync called with SVG content
  • Invoke main with --data sample.csv --format png --output out.png and assert PNG buffer output
  • Test validation errors for unsupported file extensions, malformed structure, missing x or y values, and exclusivity rule violations

# Documentation
- Update USAGE.md and README.md
  • Document the --data and --data-file flags, supported formats, and exclusivity rules
  • Provide example commands:
      repository0-plot-code-lib --data data.json --format svg --output chart.svg
      repository0-plot-code-lib --data data.csv --format png --output chart.png
  • Include a sample SVG snippet generated from a CSV dataset