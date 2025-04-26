# Overview
This feature expands the command line interface to support plotting from a mathematical expression and a specified range. It enables users to provide CLI options such as --expression, --range, and --file to generate an SVG or PNG plot. The output file format is determined from the file extension provided to --file.

# Implementation Details
We will update the main source file (src/lib/main.js) to parse additional command line arguments. When the --expression flag is passed, along with --range and optionally --file, the program will generate a dummy plot based on the provided mathematical expression. The implementation will choose between SVG and PNG content based on the --file extension (or default to JSON if an unsupported file flag is provided). This ensures that the CLI not only logs instructions but actually produces output that aligns with the mission to be a go-to library for plots and formula visualisations.

Steps:
1. Enhance argument parsing in main.js to detect and process --expression, --range, and --file.
2. Implement simple check and generation of dummy content: if output is SVG, generate an SVG structure; if PNG, generate a Buffer from a base64 string; otherwise, log an error or fallback to JSON output.
3. Update the usage description within the CLI so that users see an example command in the console output.
4. Update the README to include a new CLI usage example demonstrating how to use these parameters to generate plots.

# Testing and Documentation
Unit tests in tests/unit will be extended to simulate CLI calls and verify that the correct output is generated based on the provided parameters. The README and documentation will be updated to reflect the new command line options and usage instructions.

This feature directly addresses mission priorities by enabling the main functionality of using mathematical expressions and ranges for generating plots, fulfilling parts of the mission statement related to time series and plot generation.