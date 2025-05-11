# Overview
Add unified support for plotting external datasets by loading JSON, YAML, or CSV files through a single --data flag with alias --data-file for backward compatibility. Users can import real-world time series data without writing mathematical expressions.

# CLI Flags
- --data <path>  Path to input data file. Supported extensions: .json, .yaml, .yml, .csv
- --data-file <path>  Alias for --data for backward compatibility
- Mutually exclusive with --expression, --expressions, --x-expression, --y-expression, and --range
- Compatible with existing flags: --format, --output, --samples, --export-data, --width, --height, --title, --x-label, --y-label, --grid

# Implementation
1. Schema and Argument Parsing
   - Extend cliSchema in src/lib/main.js to include optional fields data and data-file as strings
   - Add zod refinement to ensure file extension matches .json, .yaml, .yml, or .csv
   - Update parseArgs to recognize both --data and --data-file, normalizing into parsed.data
   - Enforce mutual exclusivity in the zod schema between data and all expression or range flags

2. Data File Parsing Helper
   - Implement parseDataFile(path) in src/lib/main.js
     • Read file content via fs.readFileSync
     • Determine type by extension: .json (JSON.parse), .yaml/.yml (js-yaml.load), .csv (split lines and parse into numeric { x, y })
     • Validate result is a non-empty array of objects with numeric x and y properties
     • Throw descriptive errors for unsupported formats, malformed data, or missing fields

3. Integration in Main
   - After schema validation in main(), detect if parsed.data is set
   - Call parseDataFile(parsed.data) to retrieve dataPoints array
   - Bypass generateData when dataPoints are provided
   - Feed dataPoints into generateSVG or PNG conversion pipeline
   - Ensure multi-series plotting, export-data, and other downstream flags operate on loaded dataPoints

# Testing
- Create tests/unit/data-file-input.test.js
  • Mock fs.readFileSync to return representative JSON, YAML, and CSV content
  • Test parseDataFile returns correct arrays of { x, y } for each format
  • Invoke main() with --data sample.json --format svg --output out.svg and assert fs.writeFileSync receives SVG
  • Invoke main() with --data sample.csv --format png --output out.png and assert PNG buffer output
  • Verify validation errors for unsupported extensions, malformed files, missing x or y values, and exclusivity rule violations

# Documentation
- Update USAGE.md and README.md
  • Document the --data and --data-file flags, supported formats, and exclusivity rules
  • Provide example commands:
     repository0-plot-code-lib --data data.json --format svg --output chart.svg
     repository0-plot-code-lib --data-file data.csv --format png --output chart.png
  • Include a sample SVG snippet generated from a CSV dataset