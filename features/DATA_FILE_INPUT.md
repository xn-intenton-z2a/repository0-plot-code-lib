# Overview
Add support for plotting external time series data via a new --data flag. Users can supply a JSON, YAML, or CSV file containing an array of { x:number, y:number } points. When --data is provided, the CLI bypasses expression parsing and uses the loaded data for SVG or PNG output.

# CLI Flags
- --data <path>: Path to input data file. Supported extensions: .json, .yaml/.yml, .csv
- Mutual exclusivity: --data cannot be used with --expression or --range
- Supports existing --format svg|png and --output <path> flags

# Implementation
1. Extend cliSchema in src/lib/main.js to accept an optional data: z.string() field
   and enforce either data or (expression and range) with a custom refinement.
2. In parseArgs, capture the --data flag value and include it in the parsed result.
3. After validation, in main(), detect if data is present:
   - Read file content with fs.readFileSync(path, 'utf-8')
   - Determine format by file extension:
     • .json: parse with JSON.parse
     • .yaml/.yml: import js-yaml and call load
     • .csv: split by line breaks, skip header line ‘x,y’, then parse each row as two numbers
   - Validate that parsed result is an array of objects with numeric x and y properties
4. Feed the array of points into generateSVG or into sharp pipeline for PNG as before
5. Ensure clear error messages for unsupported extensions or invalid content

# Testing
- Create tests in tests/unit/data-input.test.js
  • Mock fs.readFileSync to return sample JSON, YAML, and CSV strings
  • Import and call a new parseDataFile(path) helper to verify correct point arrays
  • Invoke main() with ['--data','data.json','--format','svg','--output','out.svg'] and assert fs.writeFileSync is called with an SVG containing polyline points from the file data
  • Invoke main() with --data and format png to verify sharp pipeline is invoked and writeFileSync receives a Buffer

# Documentation
- Update USAGE.md with examples:
   repository0-plot-code-lib --data data.json --format svg --output plot.svg
   repository0-plot-code-lib --data data.yaml --format png --output plot.png
   repository0-plot-code-lib --data data.csv --format svg --output chart.svg
- Update README.md to describe the --data flag, supported formats, and include a sample SVG snippet generated from a CSV file