# Overview
Add support for importing time series data from external JSON, YAML, or CSV files via a unified --data flag, enabling users to plot provided data without mathematical expressions.

# CLI Flags
- `--data <path>`: Path to input data file. Supported extensions: .json, .yaml, .yml, .csv
- Alias `--data-file <path>` for backward compatibility
- `--data` is mutually exclusive with `--expression` and `--range`
- Supports existing `--format svg|png` and `--output <path>` flags

# Implementation
1. Extend the Zod schema in src/lib/main.js to include an optional `data` field of type string and enforce that either `data` is provided or both `expression` and `range` are present.
2. Update `parseArgs` to recognize both `--data` and `--data-file` flags and map their values to `parsed.data`.
3. Implement a helper function `parseDataFile(path)` that:
   - Reads file content using fs.readFileSync
   - Determines format by file extension
   - For .json, uses JSON.parse
   - For .yaml/.yml, uses js-yaml’s load
   - For .csv, splits lines, skips header, parses each row to numbers
   - Validates that the result is an array of objects with numeric x and y fields, throwing an error on failure
4. In `main()`, detect if `parsed.data` is set, call `parseDataFile(parsed.data)`, and assign the returned points array to the rendering pipeline instead of `generateData`
5. Retain generating SVG via `generateSVG(points)` or PNG via the sharp pipeline as before

# Testing
- Add tests in `tests/unit/data-file-input.test.js`:
  • Mock `fs.readFileSync` to return example JSON, YAML, and CSV content
  • Test `parseDataFile` for correct parsing and validation
  • Invoke `main()` with `--data sample.json --format svg --output out.svg` and assert that `fs.writeFileSync` is called with SVG content
  • Invoke `main()` with `--data sample.csv --format png --output out.png` and assert PNG buffer output
  • Test error conditions: unsupported extensions, invalid JSON/YAML/CSV structures, non-numeric values

# Documentation
- Update `USAGE.md` to include examples:
   repository0-plot-code-lib --data data.json --format svg --output chart.svg
   repository0-plot-code-lib --data data.csv --format png --output chart.png
- Update `README.md` to describe the `--data` flag, its alias, supported formats, and show a sample SVG snippet generated from CSV data