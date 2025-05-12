# Overview

Implement a dedicated CLI plot subcommand that generates SVG or PNG visualizations from mathematical expressions over a numeric range. This iteration focuses on core flags for basic plotting and file output, providing a foundation to layer on overlays, encoding, and data exports in future releases.

# CLI Plot Subcommand

Add a new top-level subcommand `plot` in `src/lib/main.js`:

Flags:
- --expression <expression>    Mathematical expression in the form `y=…` (required)
- --range <axis>=<min>:<max>  Numeric axis range (required)
- --format <svg|png>          Output image format (required)
- --output <path>             File path to write the resulting image (required)

Behavior:
1. Invoke parseArgs to collect CLI flags after the `plot` keyword.
2. Validate that expression, range, format, and output flags are present; emit an error and exit code 1 if any are missing or invalid.
3. Use parseRange to interpret the range string into axis, min, and max.
4. Call generateData to sample the expression at default 100 points.
5. Render the plot:
   - For SVG: construct a QuickChart configuration JSON and request the QuickChart render endpoint, or use an embedded SVG builder.
   - For PNG: generate an SVG first then rasterize via sharp to PNG.
6. Write the binary or text image to the specified output path.
7. Set exit code 0 on success, 1 on validation or render errors.

# Implementation

- In `src/lib/main.js`, add a `runPlotCli` function parallel to `runStatsCli`:
  1. Detect the first CLI argument `plot` and dispatch to `runPlotCli` in `main()`.
  2. Integrate QuickChart or sharp (already in dependencies) for rendering.
  3. Use existing `generateData`, `parseRange`, and mathjs utilities for data generation.

# Testing

- Add unit tests under `tests/unit/plot-generation.test.js`:
  - Invoke `main(['plot', '--expression', 'y=x', '--range', 'x=0:1', '--format', 'svg', '--output', 'out.svg'])` and verify `out.svg` exists and begins with `<svg`.
  - Test PNG output file contains the PNG signature bytes (`\x89PNG`).
  - Validate missing required flags produce exit code 1 and error messages.

# Documentation

- Update `USAGE.md` and `README.md` to include:
  - The new `plot` subcommand syntax and minimal example for SVG and PNG output.
  - Illustrative CLI commands:
    repository0-plot-code-lib plot --expression "y=sin(x)" --range "x=0:6.28" --format svg --output plot.svg
