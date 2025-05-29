# Overview

Provide a unified CLI tool under a single entrypoint that supports both numeric time series generation and graphical plot rendering. Users can generate data series from mathematical expressions and ranges, export results in JSON or CSV formats, or render line charts as SVG or PNG images.

# Commands

## generate

- Description: Generate a sequence of (x, y) data points from a formula over a numeric range.
- Options:
  - `--expression, -e` (string, required): Formula in form y=<expr> or <expr>.
  - `--range, -r` (string, required): Range syntax x=<start>:<end>:<step>.
  - `--format, -f` (string, optional): Output format json or csv; defaults to json.
  - `--output, -o` (string, optional): File path to write data; prints to stdout if omitted.
- Behavior:
  1. Strip optional y= prefix and compile the expression with mathjs; invalid expressions exit code 1 with descriptive error.
  2. Parse and validate the range (three numeric parts, step>0, start ≤ end); invalid ranges exit code 1 with descriptive error.
  3. Generate an inclusive series of objects `{ x: number, y: number }` stepping by the specified value.
  4. Serialize the series:
     - JSON: `JSON.stringify(series, null, 2)`.
     - CSV: Header `x,y` plus comma-separated rows per point.
  5. Write the serialized data to the specified file or stdout.
  6. Exit code 0 on success.

## plot

- Description: Render a line plot from JSON time series data to SVG or PNG.
- Options:
  - `--input, -i` (string, optional): JSON file containing an array of `{ x:number, y:number }`; reads stdin if omitted.
  - `--format, -f` (string, optional): Output image format svg (default) or png.
  - `--output, -o` (string, optional): Path to write the image; defaults to plot.svg.
  - `--width, -w` (number, optional): Image width in pixels; default 800.
  - `--height, -h` (number, optional): Image height in pixels; default 600.
- Behavior:
  1. Read and parse JSON input; invalid JSON or shape exits code 1 with descriptive error.
  2. Use d3-node to create an SVG canvas and plot a line path connecting the data points.
  3. For png format, render the SVG to a canvas and export as PNG.
  4. Write the resulting image to the specified output path.
  5. Exit code 0 on success; exit code 1 on any error with descriptive message.

# CLI Structure

- Built with yargs commands `generate` and `plot`, with global `--help` and `--version` flags.
- Programmatic API: `main(options)` invokes generation logic and returns the data array or throws on invalid inputs.
- All functionality lives in `src/lib/main.js`; tests cover both series generation and plotting behaviors, with CLI and API modes.