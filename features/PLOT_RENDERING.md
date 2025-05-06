# Overview

Render the generated time series data as vector or raster plots directly from the CLI. The tool will take the data produced by the expression parser and time series generator and produce a visual plot in SVG or PNG format.

# Dependencies

Add a lightweight rendering library such as chartjs-node-canvas or use D3 with canvas. Update dependencies in package.json to include chartjs-node-canvas at a compatible version.

# Rendering Engine

Implement a function renderPlot(data, options) that accepts an array of objects with x and y keys, plot dimensions (width and height), axis labels, and output format. The function will initialize a canvas or SVG renderer, create a line chart with axes, grid lines, and labeled axes, and return a string for SVG or a Buffer for PNG.

# CLI Integration

Extend the main CLI to accept a new flag --plot-format with allowed values svg or png. After generating the time series data, if --plot-format is provided, invoke renderPlot with the data and write the resulting output to the file specified by --output. Exit with a nonzero code on rendering or file I O errors.

# Tests

Add unit tests for renderPlot that verify:
- SVG output is returned as a string containing an svg element
- PNG output is returned as a Buffer starting with the PNG file signature bytes
Add CLI integration tests that invoke the tool with --expression, --range, --plot-format svg and --output, and assert that the file exists and contains valid SVG or PNG content.