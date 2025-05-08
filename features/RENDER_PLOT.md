# Overview

Add a renderPlot function to the library that accepts data and options and produces SVG or PNG output. Merge agentic-lib-issue-2907 enhancements to support both formats, allow CLI invocation, and update documentation to show usage.

# Implementation Details

1. Source File Changes in src/lib/main.js
   - Export a new async function renderPlot(data, options) that:
     - Uses EJS templates or a small in-memory SVG builder to draw axes, series, and labels.
     - Accepts options.format as "svg" or "png" and options.size as width and height in pixels.
     - For PNG format, convert the SVG string to PNG buffer using a lightweight library such as sharp.
     - Return or write the result to stdout or to a file path when options.output is provided.
   - Extend main CLI to detect a "plot" command:
     - repository0-plot-code-lib plot --input <jsonFile> [--format svg|png] [--size WxH] [--output <path>]
     - Read JSON data file, call renderPlot, then write to stdout or to output file.

# Testing

- tests/unit/plot-rendering.test.js
  - Provide minimal data sets (e.g., one series with two points) and options for SVG and PNG.
  - Verify that renderPlot returns a string starting with "<svg" for SVG format and a Buffer for PNG format whose PNG signature matches 89 50 4E 47.
  - Mock sharp conversion to isolate behavior.
  - Integration test via CLI invocation in main.js that writes to a temporary file and reads back contents.

# Documentation

- Update README.md to document the renderPlot API:
  - Code example showing import of renderPlot, calling with data and writing to a file.
  - CLI usage examples for generating plot.svg and plot.png.
  - Note dependency on sharp for PNG support and add to dependencies in package.json.

# Dependencies

- Add sharp to dependencies to enable SVG to PNG conversion.

# Backwards Compatibility

- Ensure existing reseed command remains unchanged.
