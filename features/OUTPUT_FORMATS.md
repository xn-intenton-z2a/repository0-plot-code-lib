# Overview

Extend the CLI and library to support multiple output formats: SVG (existing), PNG, and JSON data. Introduce a new --format option to choose between formats, defaulting to SVG. Provide conversion from SVG to PNG using a headless canvas implementation and expose raw numerical data as JSON for downstream processing.

# CLI Integration

- Add new flag --format <format> where format is one of svg, png, json. Default is svg.
- parseArgs should validate format against allowed values and include format in the parsed result.
- Update usage examples in README.md and USAGE.md to demonstrate generating PNG and JSON outputs:
  - npx repository0-plot-code-lib --expression "sin(x)" --range "x=0:6.28:0.1" --format png --output out.png
  - npx repository0-plot-code-lib --expression "x^2" --range "x=0:10:1" --format json > data.json

# Implementation

- In main.js:
  - Add format to argsSchema and default to svg.
  - After generating SVG, branch on format:
    - svg: write or console.log SVG as before.
    - json: serialize object { xValues, yValues } to JSON string and write to output.
    - png: convert the SVG string to a PNG buffer using the canvas package:
      - Import { createCanvas, loadImage } from canvas.
      - Create a canvas matching SVG width/height.
      - Load SVG as image and draw to canvas.
      - Use canvas.toBuffer('image/png') to obtain PNG data.
      - Write buffer to file or stdout (respect --output).

# Tests

- Update plot-generation.test.js:
  - Add tests for parseArgs with --format flag.
  - Test JSON output by invoking generateData + JSON serialization helper returns valid JSON with correct arrays.
  - Test PNG conversion function produces a Buffer starting with PNG signature bytes (0x89,0x50,0x4e,0x47).

# Dependencies

- Add "canvas" to dependencies in package.json.

# Documentation

- Update README.md and USAGE.md to document the new --format option and examples for all formats.
