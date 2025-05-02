# Feature Overview
This feature introduces the core functionality of generating plot visualisations from a mathematical expression and numeric range. The CLI will now accept arguments for expression, range, and output file. If provided, it will compute a simple time series from the expression within the defined range and generate a plot image in SVG (or PNG) format.

# Implementation Details
The main source file will be updated to parse command line arguments such as --expression, --range, and --file. The implementation will include:

1. Validating that an expression and range are provided.
2. Parsing the range string into proper numerical bounds for the x and y axes.
3. Generating a simple time series based on the mathematical expression; the algorithm will compute y-values for a set of x-values in the given range.
4. Creating a basic SVG plot using the computed values. This includes outlining axes, plotting points/lines, and then writing the result to the specified file if provided.
5. If no output file is provided, the plot will be printed to the console.

# Testing and Documentation
Unit tests in the existing test files (e.g., tests/unit/plot-generation.test.js) will be updated to validate:

- The correct parsing of command line arguments.
- The proper handling of missing or invalid parameters.
- The generation of an SVG file and its proper output.

The README.md and USAGE.md files will be updated with command examples and explanations on how to use the new CLI parameters. This ensures that users have a clear guide on how to generate plots with the new functionality.

This feature is designed in alignment with the mission to offer a go-to plot library with CLI capabilities, focusing on delivering core functionality that addresses the primary purpose of transforming expressions to visual time series representations.