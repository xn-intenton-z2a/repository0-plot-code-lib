# Overview

Introduce a `plot` subcommand to the CLI that reads time series JSON data and renders a line chart as SVG or PNG images. This extends the tool from data generation to graphical visualization.

# Behavior

When the user runs `repository0-plot-code-lib plot`:
- The command accepts `--input` (`-i`): path to a JSON file containing an array of `{ x: number, y: number }`. If omitted, reads from stdin.
- The command accepts `--output` (`-o`): path to write the image. Defaults to `plot.svg`.
- The command accepts `--format` (`-f`): either `svg` or `png`. Defaults to `svg`.
- The command accepts `--width` and `--height`: image dimensions in pixels. Defaults to 800×600.
- On invocation:
  1. Read and parse JSON data from file or stdin.
  2. Validate that data is an array of `{ x: number, y: number }`.
  3. Use a server-side plotting library (e.g. d3-node) to create an SVG canvas of the specified size.
  4. Compute linear scales for x and y axes based on data extents.
  5. Draw axes and a polyline connecting the data points.
  6. If `png` is requested, render the SVG onto a canvas and export as PNG.
  7. Write the resulting image to the output path.
- On success, exit with code 0. On any error (JSON parse, invalid data, rendering, file I/O), exit code 1 and print an error message to stderr.

# Implementation

- Add dependencies in `package.json`: `d3-node` for server-side D3 SVG creation and `canvas` for PNG rendering.
- In `src/lib/main.js` under the yargs configuration, add a `plot` command with the options above and a handler implementing the behavior.
- Keep changes confined to `src/lib/main.js`, update `package.json`, add tests in `tests/unit/plot-rendering.test.js`, and document in `USAGE.md` and `README.md`.

# Tests

In `tests/unit/plot-rendering.test.js`:
- Verify that running `node src/lib/main.js plot -i tests/fixtures/data.json -f svg -o tmp.svg` yields exit 0, creates `tmp.svg`, and its content starts with `<svg`.
- Verify that `-f png` writes a file starting with the PNG signature bytes.
- Verify that omitting `--input` reads from stdin.
- Verify that invalid JSON input or unsupported format produces exit code 1 and an error message.
