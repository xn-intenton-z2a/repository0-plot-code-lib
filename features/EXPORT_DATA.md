# Overview

Add a new CLI subcommand and flags to export raw time series data (generated or imported) into JSON, CSV, and YAML formats for downstream analysis without manual extraction.

# CLI Flags

- `--export-data <path>`  Specify output path for raw data series. File extension (.csv, .json, .yaml, .yml) determines format.
- `--export-format <csv|json|yaml>`  Optional override when extension is missing or ambiguous. Defaults based on extension: .csv→csv, .json→json, .yaml/.yml→yaml.
- These flags are mutually exclusive with or in addition to plotting flags; `--export-data` writing does not prevent normal SVG/PNG rendering.

# Implementation

1. Schema and Argument Parsing
   - In `src/lib/main.js` extend `cliSchema` to include:
     • `exportData`: z.string().optional()
     • `exportFormat`: z.enum(["csv","json","yaml"]).optional()
   - In `parseArgs`, detect `--export-data` and `--export-format` and normalize them into `parsed.exportData` and `parsed.exportFormat`.

2. Data Conversion Helper
   - In `src/lib/main.js`, implement a new helper function `convertDataToString(dataOrSeries, format)`:
     • For `csv`:
       - Single-series: output header `x,y` then rows of values.
       - Multi-series: output header `series,x,y` then rows for each point of each series.
     • For `json`:
       - Single-series: JSON array of `{x,y}` objects.
       - Multi-series: JSON object mapping series labels to arrays of point objects.
     • For `yaml`: call `import { dump } from 'js-yaml'` and dump the same structure as JSON.

3. CLI Integration in `main()`
   - After data generation or import and before plotting, if `parsed.exportData` is set:
     • Determine `format` from `parsed.exportFormat` or file extension of `exportData`.
     • Call `convertDataToString(dataOrSeries, format)` with the generated data or series array.
     • Write the resulting string to disk at `exportData` path via `fs.writeFileSync`.
   - Continue with existing logic to produce SVG or PNG without interruption.

4. Programmatic API Support (Optional)
   - Extend `generatePlot` options and schema to accept `exportData` and `exportFormat`.
   - When provided in programmatic API, return the converted data string alongside image result or throw if unsupported. (This can be deferred to a later iteration.)

# Testing

- Add `tests/unit/data-export.test.js`:
  • Mock `fs.readFileSync` and `fs.writeFileSync` as needed.
  • Test `parseArgs` captures `--export-data` and `--export-format` and errors on missing values or unsupported formats.
  • Test `convertDataToString` outputs correct CSV, JSON, and YAML for single and multi-series inputs.
  • Test CLI: run `main()` with `--expression`, `--range`, `--export-data data.csv` writes a CSV file containing the generated points and also writes the plot file when combined with `--format` and `--output`.
  • Test error cases: unsupported extension without `export-format`, conflicting flags.

# Documentation

1. **USAGE.md**
   - Document `--export-data` and `--export-format` flags with examples:
     repository0-plot-code-lib --expression y=x --range x=0:5 --export-data data.csv
     repository0-plot-code-lib --expression y=x --range x=0:5 --export-data output --export-format json
   - Show sample CSV, JSON, and YAML snippets of exported data.

2. **README.md**
   - Under **Examples**, add an **Export Data** section illustrating CLI commands and output preview.

# Dependencies

- Ensure `js-yaml` remains a dependency for YAML support. No new dependencies required.