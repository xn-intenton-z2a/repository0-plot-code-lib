# Overview

Consolidate time series generation and plot rendering into a single structured CLI tool under one entrypoint. Users can:

- Generate numeric series data from a mathematical expression and range, exporting results in JSON or CSV.
- Render a line chart from JSON series data as an SVG or PNG image.

# Commands

## generate

When invoked as `repository0-plot-code-lib generate`:

- Required options:
  • `--expression, -e`  Formula in the form y=<expr> or <expr>.
  • `--range, -r`       Range syntax x=<start>:<end>:<step>.
- Optional options:
  • `--format, -f`      Output format: json (default) or csv.
  • `--output, -o`      File path to write data; prints to stdout if omitted.
- Behavior:
  1. Strip optional y= prefix and compile the formula via mathjs. Invalid expressions exit code 1 with `Error: Invalid expression`.
  2. Parse and validate the range (three numeric parts, step>0, start≤end). Invalid ranges exit code 1 with `Error: Invalid range`.
  3. Generate an inclusive series of `{ x, y }` points.
  4. Serialize to JSON or CSV:
     - JSON: `JSON.stringify(series, null, 2)`
     - CSV: header `x,y` plus comma-separated rows.
  5. Write output to file or stdout. Exit code 0 on success.

## plot

When invoked as `repository0-plot-code-lib plot`:

- Required or default options:
  • `--input, -i`   Path to JSON file of series data; reads stdin if omitted.
  • `--format, -f`  Output format: svg (default) or png.
  • `--output, -o`  Path to write image; default plot.svg.
  • `--width, -w`   Image width in pixels; default 800.
  • `--height, -h`  Image height in pixels; default 600.
- Behavior:
  1. Read and validate JSON data array of `{ x: number, y: number }`. Invalid data exits code 1 with `Error: Invalid data shape`.
  2. Use d3-node to generate an SVG line plot of the data.
  3. If PNG requested, render the SVG on a canvas and export PNG.
  4. Write the image to the specified path. Exit code 0 on success.

# CLI Structure

Use yargs to define two subcommands `generate` and `plot` under one tool, with global `--help`/`-h` and `--version`/`-v` flags. The programmatic API function `main(options)` returns the series data for `generate` without exiting, enabling tests.