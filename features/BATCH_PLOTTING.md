# Overview
Add batch plotting mode that allows users to specify multiple plotting tasks in a single YAML or JSON configuration file and generate all plots in one command.

# CLI Interface
Add a new --batch option that accepts a path to a configuration file. The file can be YAML or JSON and must define an array of plot tasks. Each task supports the following properties:

- expression or dataFile: A mathematical formula string or path to a JSON or CSV file containing x and y data arrays
- format: svg or png, default svg
- output: file path for the generated plot
- title (optional): Plot title
- xLabel (optional): Label for the X axis
- yLabel (optional): Label for the Y axis

Examples:
repository0-plot-code-lib --batch plots.yml
repository0-plot-code-lib --batch tasks.json

# Implementation
- Extend src/lib/main.js to detect the --batch flag. Use fs.promises to read the configuration file and js-yaml for YAML support. Validate the configuration using zod according to the defined schema for plot tasks. Loop through each task and invoke the existing plot rendering logic from PLOT_RENDERER. Handle file I/O errors and validation failures with descriptive error messages and non-zero exit codes.
- Ensure that chartjs-node-canvas is available for rendering. Allow CSV input by detecting the file extension and parsing it with a lightweight built-in CSV parser.
- Support concurrent or sequential processing of tasks based on performance and resource constraints.

# Testing
- Add tests in tests/unit/batch-plotting.test.js that mock the file system to provide sample batch config files in YAML and JSON formats. Spawn the CLI with the --batch option and verify that multiple output files are created with correct headers and content. Clean up generated files after each test.
- Include validation tests for malformed configuration files and ensure proper error codes and messages.

# Documentation Updates
- Update USAGE.md and README.md to include a new section Batch Plotting with examples of the --batch flag and configuration file format.