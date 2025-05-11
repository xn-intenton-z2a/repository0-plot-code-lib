# Overview
Add ability to read time series data from an external file in JSON, YAML, or CSV format via a new --data flag. When provided, the CLI loads this data and uses it for plotting or exporting.

# CLI Flags
- --data <path>: path to input data file (formats: .json, .yaml/.yml, .csv)
- Mutually exclusive with --expression and --range flags.

# Implementation
- Extend parseArgs and cliSchema in src/lib/main.js to accept optional data flag.
- Validate mutual exclusivity between data and expression/range flags.
- Detect file extension and parse content: JSON.parse for .json, js-yaml for .yaml/.yml, simple inline CSV parser for .csv.
- Convert parsed content into an array of points { x: number, y: number }.
- Use existing generateSVG or export-data serialization routines on loaded data.
- Provide clear error messages for invalid format or parse failures.

# Testing
- Add tests in tests/unit/data-input.test.js to mock fs.readFileSync and parse sample JSON, YAML, CSV into correct point arrays.
- Test end-to-end main invocation with --data flag for both plotting and exporting scenarios.

# Documentation
- Update USAGE.md and README.md with examples:
  repository0-plot-code-lib --data data.json --format svg --output plot.svg
  repository0-plot-code-lib --data data.yaml --format png --output plot.png
  repository0-plot-code-lib --data data.csv --export-data out.json --data-format json