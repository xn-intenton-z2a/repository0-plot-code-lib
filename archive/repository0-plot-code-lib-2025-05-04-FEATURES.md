features/PLOT_GENERATION.md
# features/PLOT_GENERATION.md
# PLOT_GENERATION

# Description
This feature implements the core logic for converting a mathematical expression and numeric range into a time series and rendering it as an SVG or PNG plot. It extends main to parse arguments, evaluate the expression using mathjs, generate data points, and produce an image file using a lightweight chart library.

# CLI Interface
The CLI accepts the following options: expression flag with a formula as y equals function of x; range flag with one or more axis assignments separated by comma; output flag or alias o with a file path; format flag with value svg or png. The feature must validate required flags and provide user-friendly error messages.

# Programmatic API
The exported main function accepts an array of arguments identical to the CLI. It returns a Promise that resolves on successful file generation and rejects on invalid input or rendering errors.

# Implementation Details
Use mathjs to parse and evaluate the expression. Sample points are generated by dividing the range of x into 500 equal steps. Use chartjs-node-canvas or a minimal SVG generator to draw axes and line paths. Write the output file in the requested format. Add mathjs and chartjs-node-canvas to dependencies.

# Testing
Add unit tests that mock the file system to verify that given a known expression and range, the generated SVG contains expected path commands and headers. Include tests for argument parsing errors and format validation.
