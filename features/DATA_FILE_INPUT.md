# Overview
Add unified support for plotting external datasets loaded from JSON, YAML, or CSV files via a single `--data` flag. This allows users to supply real-world time series data without writing expressions.

# CLI Flags
- `--data <path>`: Path to input data file. Supported extensions: .json, .yaml, .yml, .csv
- Alias `--data-file <path>` for backward compatibility
- `--data` is mutually exclusive with `--expression`, `--expressions`, `--x-expression`, `--y-expression`, and `--range`
- Supports existing flags: `--format svg|png`, `--output <path>`, `--samples`, `--export-data`, styling flags (`--width`, `--height`, etc.)

# Implementation
1. Schema and Argument Parsing
   - Extend `cliSchema` in `src/lib/main.js` to add optional `data` field:
     ```js
     data: z.string().refine(path => /\.(json|ya?ml|csv)$/i.test(path), 'data must be .json, .yaml, .yml, or .csv')
     ```
   - In `parseArgs`, recognize `--data` and `--data-file` and normalize both to `parsed.data`.
   - Enforce mutual exclusivity in the schema between `data` and all expression-based flags.

2. Data File Parsing Helper
   - Implement `parseDataFile(path)` in `src/lib/main.js`:
     - Read file content via `fs.readFileSync`.
     - Detect format by file extension:
       - `.json`: `JSON.parse`
       - `.yaml`/`.yml`: `js-yaml`.load
       - `.csv`: split lines, parse header row, map each row to numeric `{ x, y }` objects
     - Validate the result is an array of points with numeric `x` and `y`. Throw descriptive errors on invalid structure.

3. Integration into `main()`
   - After validation, if `parsed.data` is set, call `parseDataFile(parsed.data)` to obtain `dataPoints`.
   - Bypass `generateData` and feed `dataPoints` into `generateSVG` or PNG pipeline.
   - Maintain multi-series and export-data behavior: if multiple series detected in file or `--export-data` is set, handle accordingly.

# Testing
- Create `tests/unit/data-file-input.test.js`:
  - Mock `fs.readFileSync` to return sample JSON, YAML, and CSV contents.
  - Test `parseDataFile` returns the correct array of `{ x, y }` for each format.
  - Invoke `main()` with `--data sample.json --format svg --output out.svg` and assert `fs.writeFileSync` is called with SVG content.
  - Invoke `main()` with `--data sample.csv --format png --output out.png` and assert PNG buffer output.
  - Test validation errors for unsupported extensions, malformed data, missing x/y values, and mutual exclusivity violations.

# Documentation
- Update `USAGE.md` and `README.md`:
  - Document the `--data` flag and its alias, list supported formats and exclusivity rules.
  - Provide example commands:
    repository0-plot-code-lib --data data.json --format svg --output chart.svg
    repository0-plot-code-lib --data data.csv --format png --output chart.png
  - Show sample SVG/PNG snippets generated from a CSV dataset.