# Overview
Consolidate time series generation and plot rendering into a single structured CLI tool. Users can generate numeric data series from a formula and range or render that data into a line plot as SVG or PNG, all under the same entrypoint.

# Commands

## Generate Series

Users invoke:

    repository0-plot-code-lib generate \
      --expression "y=<expr>" --range "x=<start>:<end>:<step>" \
      [--format json|csv] [--output <file>]

Options:

- `--expression, -e` (required) Formula in form `y=<expr>` or `<expr>`.
- `--range, -r` (required) Range in form `x=<start>:<end>:<step>`.
- `--format, -f` Output format `json` (default) or `csv`.
- `--output, -o` File path; prints to stdout if omitted.

Behavior:
- Validates and compiles the expression via mathjs.
- Parses and validates the range; step > 0 and start ≤ end.
- Generates an inclusive series of `{ x, y }` points.
- Serializes to JSON or CSV and writes to stdout or file.

## Plot Rendering

Users invoke:

    repository0-plot-code-lib plot \
      --input <data.json> [--format svg|png] [--output <file>] [--width <px>] [--height <px>]

Options:

- `--input, -i` JSON input file path; reads stdin if omitted.
- `--format, -f` `svg` (default) or `png`.
- `--output, -o` Path to write image; defaults to `plot.svg`.
- `--width, -w` Canvas width in pixels; default `800`.
- `--height, -h` Canvas height in pixels; default `600`.

Behavior:
- Reads and validates JSON time series data.
- Creates a D3-based SVG line plot; optionally renders PNG via canvas.
- Writes the image to the specified file.

# CLI Structure

- Built with yargs commands: `generate` and `plot` under one entrypoint.
- Built-in flags: `--help`/`-h` and `--version`/`-v`.
- Exit code 0 on success; code 1 with descriptive `Error: ...` messages on failure.
