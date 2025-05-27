# Plot Rendering

Introduce a `plot` subcommand in the CLI that reads time series JSON data and produces a line plot as an SVG or PNG image. This fulfills the mission of a go-to plot library by enabling graphical output from numeric series.

# Behavior

When invoked with `plot`, the CLI should:
- Accept `--input, -i` to specify a JSON file of an array of `{ x: number, y: number }`. If omitted, read JSON from stdin.
- Accept `--output, -o` to specify the image file path. Default is `plot.svg`.
- Accept `--format, -f` to choose `svg` or `png`. Default is `svg`.
- Accept `--width, -w` and `--height, -h` for pixel dimensions (defaults: 800×600).
- Parse and validate JSON input; invalid JSON or data shape exits with code 1 and an error.
- Generate a line plot using a server-side D3 (via `d3-node`) for SVG and `canvas` for PNG.
- Write the generated image buffer or SVG string to the specified output and exit code 0 on success.

# Implementation

- Add dependencies: `d3-node` and `canvas` in `package.json`.
- In `src/lib/main.js`, extend yargs with a `plot` command:
  - Read JSON from `argv.input` or stdin.
  - Use `new D3Node()` to create an SVG of given width/height.
  - Build D3 scales and append a `<path>` for the series.
  - For PNG, render the SVG string onto a `canvas` and get a PNG buffer.
  - Write to `argv.output`, or error out on failures.

# Tests

- Create `tests/unit/plot-rendering.test.js`:
  - Spawn the CLI to generate an SVG from a sample JSON file; assert exit 0, file exists, and starts with `<svg>`.
  - Spawn for PNG; assert exit 0, file exists, and begins with PNG signature bytes.
  - Test reading data via stdin when `--input` omitted.
  - Test error when input JSON is invalid or format unsupported.

# Documentation

- Update `USAGE.md` with a `## Plot Rendering` section showing the `plot` subcommand, flags (`-i`, `-o`, `-f`, `-w`, `-h`), and examples.
- Update `README.md` under `## Plot Rendering` with CLI usage snippets and installation notes.