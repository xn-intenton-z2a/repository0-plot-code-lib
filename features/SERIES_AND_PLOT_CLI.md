# Overview

Consolidate data generation and plotting into a single structured CLI entrypoint. Users can generate numeric time series from a formula and range or render that series into a line plot (SVG or PNG) using subcommands of the same tool.

# Commands

## generate

When invoked with `generate`:
- Options:
  • `--expression, -e` (string, required): Formula in form y=<expr> or <expr>.
  • `--range, -r` (string, required): Range syntax x=<start>:<end>:<step>.
  • `--format, -f` (string, optional): Output format `json` (default) or `csv`.
  • `--output, -o` (string, optional): File path to write data; prints to stdout if omitted.
- Behavior:
  1. Strip optional `y=` prefix, compile the expression using mathjs; invalid expressions exit code 1 with message `Error: Invalid expression`.
  2. Parse and validate the range string (three numeric parts, `step>0`, `start<=end`); invalid ranges exit code 1 with `Error: Invalid range`.
  3. Generate inclusive series of `{ x, y }` points stepping from start to end.
  4. Serialize the series:
     - JSON: `JSON.stringify(series, null, 2)`.
     - CSV: a header line `x,y` and comma-separated rows per point.
  5. Write result to specified file via `fs.writeFileSync` or prints to stdout. Exit code 0 on success.

## plot

When invoked with `plot`:
- Options:
  • `--input, -i` (string, optional): JSON file of `{ x, y }` array; reads stdin if omitted.
  • `--format, -f` (string, optional): `svg` (default) or `png`.
  • `--output, -o` (string, optional): File path for image; default `plot.svg`.
  • `--width, -w` (number, optional): Canvas width in pixels; default 800.
  • `--height, -h` (number, optional): Canvas height in pixels; default 600.
- Behavior:
  1. Read and parse JSON data; invalid JSON or shape exits code 1 with `Error: Invalid data shape`.
  2. Use d3-node to build an SVG line chart of the data.
  3. If `format=png`, render the SVG onto a canvas and export as PNG.
  4. Write the image to the specified output path. Exit code 0 on success.

# CLI Structure

- Uses yargs to define `generate` and `plot` commands under a single entrypoint, with global `--help` (`-h`) and `--version` (`-v`).
- Exports a programmatic `main(options)` for data generation that returns the series array or throws errors for invalid input.
- All commands and handlers live in `src/lib/main.js`; tests in `tests/unit/` cover both generation and plotting behaviors.