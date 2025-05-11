# Overview
Add support for plotting external time series data via a new --data-file flag. Users can supply a JSON, YAML, or CSV file containing an array of { x: number, y: number } points. When --data-file is provided, the CLI bypasses expression parsing and uses the loaded data for SVG or PNG output.

# CLI Flags
- `--data-file <path>`: Path to input data file. Supported extensions: .json, .yaml/.yml, .csv
- Mutual exclusivity: --data-file cannot be used with --expression or --range
- Supports existing `--format svg|png` and `--output <path>` flags

# Implementation
1. Extend `cliSchema` in `src/lib/main.js` to accept an optional `dataFile` field (z.string) and refine schema so that either `dataFile` is present or both `expression` and `range` are provided.
2. In `parseArgs`, recognize the `--data-file` flag and assign its value to `dataFile` in the parsed result.
3. After argument validation, in `main()`, detect if `dataFile` is set:
   - Read file content with `fs.readFileSync(dataFile, 'utf-8')`.
   - Determine format by file extension:
     • `.json`: parse with `JSON.parse`
     • `.yaml`/`.yml`: import `js-yaml` and call `load`
     • `.csv`: split by lines, skip header `x,y`, then parse each row into numbers
   - Validate that the parsed result is an array of objects with numeric `x` and `y` properties; throw a clear error if validation fails.
   - Use the resulting array of points in place of generated expression data.
4. Pass the loaded points into `generateSVG` for SVG output or into the sharp pipeline for PNG output as before.
5. Ensure error messages clearly report unsupported extensions, parse failures, or invalid data structures.

# Testing
- Create tests in `tests/unit/data-file-input.test.js`:
  • Mock `fs.readFileSync` to return sample JSON, YAML, and CSV strings.
  • Test a new helper `parseDataFile(path)` to verify it returns the correct array of `{ x, y }` points for each format.
  • Invoke `main()` with `['--data-file','data.json','--format','svg','--output','out.svg']` and assert `fs.writeFileSync` writes an SVG containing the expected polyline points.
  • Invoke `main()` with `--data-file` and `--format png` to verify the sharp pipeline is invoked and `writeFileSync` receives the correct Buffer.
  • Test error cases: unsupported file extensions, malformed JSON/YAML/CSV, and non-numeric values.

# Documentation
- Update `USAGE.md` with examples:
   repository0-plot-code-lib --data-file data.json --format svg --output plot.svg
   repository0-plot-code-lib --data-file data.yaml --format png --output plot.png
   repository0-plot-code-lib --data-file data.csv --format svg --output chart.svg
- Update `README.md` to describe the `--data-file` flag, supported formats, and include a sample SVG snippet generated from a CSV file.