# Overview
Integrate full SVG and PNG plot rendering capabilities into the CLI, merging the implementation from agentic-lib-issue-2907. Users can input formulae or JSON data sets and generate visualizations directly from the command line. Integration tests will verify end-to-end behavior, and documentation in README.md and USAGE.md will be updated with usage examples.

# CLI Interface
The CLI supports a new --plot command with the following options

--plot <expression|dataFile>
  Provide a mathematical expression as a string (e.g. y=sin(x)) or a path to a JSON file containing x, y arrays.

--format <svg|png>
  Specify output format. Default is svg.

--output <filePath>
  Path to write the generated plot. Extension should match the format, e.g. plot.svg or plot.png.

Examples:
repository0-plot-code-lib --plot "y=sin(x)" --format=png --output=plot.png
repository0-plot-code-lib --plot data.json --output=data.svg

# Implementation
- Merge the rendering module from agentic-lib-issue-2907 into src/lib/main.js.
- Add chartjs-node-canvas dependency at version ^4.1.0.
- Parse input: detect if argument is a formula string or JSON file path, load and validate accordingly.
- Use ChartJS with Node canvas to generate chart configuration, render to SVG or PNG based on --format.
- Ensure error handling for parse failures, file I/O errors, and unsupported formats.
- Update package.json dependencies and scripts if needed.

# Testing
- Enhance tests/unit/plot-generation.test.js to include integration tests.
  - Spawn the CLI via child_process with sample formula and sample data JSON.
  - Verify that output file is created and begins with appropriate SVG or PNG header bytes.
  - Clean up generated files after each test.
- Retain existing unit tests for main module import and exit behavior.

# Documentation Updates
- Add a "Plot Generation" section to README.md under Usage, including examples for both SVG and PNG.
- Update USAGE.md with full reference for the --plot command, its flags, and example invocations.