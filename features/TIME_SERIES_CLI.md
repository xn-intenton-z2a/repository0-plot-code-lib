# Overview

Consolidate time series generation and plot rendering into a single structured CLI tool. Users can generate numeric data series from a formula and range or render that data as a line plot (SVG or PNG) under one entrypoint.

# Commands

## generate

- Description: Produce a sequence of `{ x, y }` points from a formula over a numeric range.
- Options:
  • `--expression, -e` (required): Formula in form y=<expr> or <expr>.
  • `--range, -r` (required): Range syntax `x=<start>:<end>:<step>`.
  • `--format, -f`: Output format `json` or `csv` (default `json`).
  • `--output, -o`: File path to write data; prints to stdout if omitted.
- Behavior:
  1. Compile expression with mathjs (error on invalid).
  2. Parse range string; enforce step > 0, start ≤ end.
  3. Generate inclusive series of `{ x, y }` points.
  4. Serialize to JSON or CSV.
  5. Write to file or stdout, exit code 0.

## plot

- Description: Render a line plot from JSON time series data.
- Options:
  • `--input, -i`: JSON file path; reads stdin if omitted.
  • `--format, -f`: Output format `svg` or `png` (default `svg`).
  • `--output, -o`: File path for image; default `plot.svg`.
  • `--width, -w`: Image width in pixels (default 800).
  • `--height, -h`: Image height in pixels (default 600).
- Behavior:
  1. Load and validate JSON data array of `{ x, y }`.
  2. Create an SVG via d3-node, draw axes and line path.
  3. Convert to PNG if requested via canvas.
  4. Write image file, exit code 0.

# CLI Interface

Use yargs to define `generate` and `plot` commands under one entrypoint, with global `--help, -h` and `--version, -v` flags. Errors in expression, range, JSON input, rendering, or I/O print `Error: <message>` and exit code 1.
