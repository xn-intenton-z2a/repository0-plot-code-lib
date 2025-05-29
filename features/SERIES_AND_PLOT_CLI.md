# Generate and Plot CLI

Provide a single, structured CLI entrypoint with two subcommands to cover both numeric time series generation and graphical plot rendering under one tool.

# Commands

## generate

Generate a sequence of (x, y) data points from a mathematical expression over a numeric range.

Options:
- `--expression, -e` (required): Formula in form `y=<expr>` or `<expr>`.
- `--range, -r` (required): Range syntax `x=<start>:<end>:<step>`.
- `--format, -f`: Output format, `json` (default) or `csv`.
- `--output, -o`: Path to write data; prints to stdout if omitted.

Behavior:
1. Strip optional `y=` prefix and compile the expression via mathjs.compile.  Invalid expressions exit with code 1 and `Error: Invalid expression`.
2. Parse and validate the range string; enforce `step > 0` and `start <= end`, or exit with `Error: Invalid range`.
3. Generate an inclusive series of `{ x, y }` points.
4. Serialize series:
   - JSON: `JSON.stringify(series, null, 2)`.
   - CSV: Header `x,y` plus lines `x,y` per point.
5. Write output to file via `fs.writeFileSync` or to stdout.
6. Exit code 0 on success.

## plot

Render a line plot from JSON time series data as an SVG or PNG image.

Options:
- `--input, -i`: JSON input file of `[{x:number,y:number}, …]`; reads stdin if omitted.
- `--output, -o`: Image output path; default `plot.svg`.
- `--format, -f`: Format `svg` (default) or `png`.
- `--width, -w`: Image width in pixels; default `800`.
- `--height, -h`: Image height in pixels; default `600`.

Behavior:
1. Read and parse JSON; invalid JSON or shape exits with `Error: Invalid data shape`.
2. Create an SVG canvas via d3-node; plot line path connecting points.
3. For `png`, render SVG to canvas and export PNG via canvas.
4. Write the image file; errors exit with `Error: <message>`.
5. Exit code 0 on success.

# Implementation Notes

- Use yargs `.command()` to define `generate` and `plot` subcommands, with global `--help` and `--version`.
- Export a programmatic `main(options)` for `generate` that returns the data array or throws errors.
- Plot handler uses d3-node and canvas modules.
- Confine changes to `src/lib/main.js`, update `package.json`, add tests in `tests/unit/plot-generation.test.js` and `tests/unit/plot-rendering.test.js`, update `USAGE.md` and `README.md` with subcommand usage examples.