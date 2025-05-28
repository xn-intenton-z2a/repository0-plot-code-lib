# Overview

Consolidate and standardize the existing time series and plot commands under a single structured CLI entrypoint.  Users will invoke the tool with a clear command and options to generate numeric series, export in JSON or CSV, or render a plot as SVG or PNG.

# Commands

## Generate Series

- Command: `repository0-plot-code-lib generate`
- Options:
  - `--expression, -e`   Formula in form `y=<expr>` or `<expr>` (required)
  - `--range, -r`        Range in form `x=<start>:<end>:<step>` (required)
  - `--format, -f`       Output format: `json` or `csv` (default: `json`)
  - `--output, -o`       File path to write data; prints to stdout if omitted

## Plot Rendering

- Command: `repository0-plot-code-lib plot`
- Options:
  - `--input, -i`        JSON input file; reads stdin if omitted
  - `--format, -f`       Output image format: `svg` or `png` (default: `svg`)
  - `--output, -o`       File path to write image (default: `plot.svg`)
  - `--width, -w`        Canvas width in pixels (default: 800)
  - `--height, -h`       Canvas height in pixels (default: 600)

# Behavior

- The CLI uses yargs for parsing, with built-in `--help` and `--version` flags.
- `generate` command invokes the programmatic `main()` to produce data points and writes JSON or CSV.
- `plot` command reads series JSON, validates shape, and renders a chart via `d3-node` and `canvas`.
- Errors in expression parsing, range validation, JSON parsing, rendering, or file I/O print `Error: <message>` to stderr and exit code 1.
- Successful operations exit code 0.

# Implementation Notes

- Single source (`src/lib/main.js`) uses yargs `.command()` to define `generate` and `plot` commands.
- Programmatic `main({ expression, range, format, output })` returns data array or throws.
- Plot logic in `plotHandler()` handles JSON input, D3 rendering, and PNG conversion.
- Tests in `tests/unit/plot-generation.test.js` and `tests/unit/plot-rendering.test.js` cover CLI and API behaviors.
- Documentation in USAGE.md and README.md updated with both commands, options, and examples.
