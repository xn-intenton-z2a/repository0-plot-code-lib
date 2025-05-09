# Overview
Review and finalize the renderPlot implementation to produce high fidelity SVG and PNG charts using ChartJSNodeCanvas. Maintain backward compatible API semantics for library use and extend the CLI with a plot subcommand that reads JSON input, applies configuration options, and writes image output to files or streams.

# Dependencies
Add chart.js and chartjs-node-canvas to dependencies. Ensure peer compatibility with existing ESM standards.

# Implementation Details
Import ChartJSNodeCanvas and Chart from their modules. Implement an async function renderPlot that accepts a data object and options for format, size, chart type, background colour, and output path. Instantiate ChartJSNodeCanvas with width, height and background. Use renderToBuffer for png and renderToBuffer with string conversion for svg. If an output path is provided, write the result to a file; otherwise return the image result to the caller. Extend the main CLI entry point to detect a plot command. Parse flags for input path, format, type, size, background and output. Load the JSON input, invoke renderPlot and handle success or error exit codes.

# Testing
Add unit tests under tests/unit to mock the ChartJSNodeCanvas constructor and renderToBuffer method. Verify that renderPlot returns a string beginning with an svg tag when format is svg and a buffer starting with the PNG file signature when format is png. Add CLI tests that invoke the plot subcommand with a temporary JSON data file. Confirm that output files are created and inspect the first bytes or string prefixes to assert correct format. Include integration tests that launch the CLI in a controlled environment, run two invocations for svg and png, and assert files exist and content signatures match expected image headers.

# Documentation Updates
Update README.md to describe the plot subcommand, list available flags and show example commands for generating svg and png charts. Update USAGE.md to include a section on plot usage with flag descriptions and example invocations. Document the renderPlot function signature in README and USAGE, listing parameter fields and return types for library consumers.