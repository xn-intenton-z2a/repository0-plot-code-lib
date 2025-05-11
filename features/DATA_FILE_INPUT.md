# Overview
Add support for importing time series data from external JSON, YAML, or CSV files via a unified --data flag, enabling users to plot provided datasets without requiring mathematical expressions.

# CLI Flags
- `--data <path>`: Path to input data file. Supported extensions: .json, .yaml, .yml, .csv
- Alias `--data-file <path>` for backward compatibility
- `--data` is mutually exclusive with `--expression`, `--expressions`, and `--range`
- Supports existing flags: `--format svg|png`, `--output <path>`, `--samples`, `--export-data`, and styling options

# Implementation

1. Extend the Zod schema in `src/lib/main.js`:
   - Add optional `data` field: z.string().refine(path => /\.(json|ya?ml|csv)$/i.test(path), 'data must be a JSON, YAML, or CSV file')
   - Add alias `dataFile` mapped to `data` in parsing logic
   - Enforce that either `data` is provided or expression-based flags are present

2. Update `parseArgs`:
   - Recognize `--data` and `--data-file` flags and map both to `parsed.data`

3. Implement helper `parseDataFile(path)` in `src/lib/main.js`:
   - Read file content using `fs.readFileSync`
   - Determine format by file extension:
     • `.json`: parse with `JSON.parse`
     • `.yaml/.yml`: parse with `js-yaml`.load
     • `.csv`: split lines, detect header row, parse each row to numeric x and y values
   - Validate result is an array of points `{ x: number, y: number }`; throw descriptive error on invalid structure or non-numeric values

4. Integrate into `main()`:
   - After schema validation, if `parsed.data` is set, call `parseDataFile(parsed.data)` to obtain `dataPoints`
   - Bypass `generateData` and feed `dataPoints` into `generateSVG` or PNG pipeline
   - Maintain multi-series and export-data behavior
   - Preserve existing error handling and process exit codes

# Testing

- Create `tests/unit/data-file-input.test.js`:
  • Mock `fs.readFileSync` to return sample JSON, YAML, and CSV contents
  • Test `parseDataFile` returns correct arrays for each format
  • Invoke `main()` with `--data sample.json --format svg --output out.svg` and assert `fs.writeFileSync` is called with SVG content
  • Invoke `main()` with `--data sample.csv --format png --output out.png` and assert PNG buffer output
  • Test validation errors for unsupported extensions, malformed data, missing x/y values, and mutual exclusivity violations

# Documentation

- Update `USAGE.md` with examples:
  repository0-plot-code-lib --data data.json --format svg --output chart.svg
  repository0-plot-code-lib --data data.csv --format png --output chart.png

- Update `README.md` to describe the `--data` flag, its alias, supported formats, mutual exclusivity rules, and sample SVG/PNG snippets