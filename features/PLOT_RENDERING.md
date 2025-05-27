# Overview

Introduce a new CLI command that reads time series JSON data and renders a plot as an SVG or PNG image. This feature extends the library’s core functionality from generating numeric series to visualizing the data graphically, fulfilling the mission of being a go-to plot library.

# Behavior

When invoked via the CLI with a JSON input source and plot options:

- The CLI accepts `--input` or `-i` to specify a JSON file containing an array of `{ x: number, y: number }` objects. If omitted, it reads JSON from stdin.
- The CLI accepts `--output` or `-o` to specify the path to write the generated image. If not provided, defaults to `plot.svg`.
- The CLI accepts `--format` or `-f` to choose between `svg` or `png` output formats, defaulting to `svg`.
- The CLI accepts `--width` and `--height` to set image dimensions in pixels, defaulting to 800×600.
- The command parses the JSON data, generates scales and axes, draws a line or scatter plot of the series, and serializes the result to the chosen image format.
- On success, the image file is written and the process exits with code 0. Errors in parsing, rendering, or file I/O exit with code 1 and an error message on stderr.

# Implementation

- Add dependencies: a lightweight plotting library such as `d3-node` or `@svgdotjs/svg.js`, and `canvas` for PNG rendering.
- Create a new subcommand under the existing CLI (e.g. `repository0-plot-code-lib plot`) using `yargs.command`.
- Read and parse input data from file or stdin.
- Use the plotting library to:
  - Create an SVG document with specified width and height.
  - Generate linear scales for x and y based on data extents.
  - Draw axes with tick marks and labels.
  - Plot the data as a polyline connecting each data point.
- For `png` format, render the SVG to a canvas and export as PNG.
- Write the output image to disk using `fs.writeFileSync`.

# CLI Interface

- repository0-plot-code-lib plot --input data.json --output plot.svg --format svg --width 800 --height 600
- repository0-plot-code-lib plot -i data.json -o chart.png -f png -w 1024 -h 768

# Tests

- Add unit tests in `tests/unit/plot-rendering.test.js` using Vitest:
  - Mock simple time series arrays and verify SVG output contains expected `<svg>`, `<path>`, and axis elements.
  - For PNG format, generate a small image and compare dimensions and PNG signature bytes.
  - Test reading data from stdin when `--input` is omitted.
  - Test error cases for invalid JSON and unsupported formats.

# Documentation

- Update `USAGE.md` with a new section "Plot Rendering" describing the command, options, and examples.
- Update `README.md` under `## Plot Rendering` with installation reminders, CLI usage snippets, and notes on required dependencies.
