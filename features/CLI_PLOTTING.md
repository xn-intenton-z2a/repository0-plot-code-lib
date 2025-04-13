# Overview

This feature refines and enhances the CLI plotting functionality of the repository. The tool processes command-line inputs for mathematical expressions, range parameters, and an optional file output to generate a dummy SVG plot or convert it to PNG using the sharp library. The improvements further enhance input validation, logging, and user feedback while ensuring backward compatibility.

# Technical Changes

- Update the source file (`src/lib/main.js`) to:
  - Use a modern command-line argument parsing technique to capture options: `--expression`, `--range`, and `--file`.
  - Validate the provided range parameters (especially for x-coordinates) and expression format. Provide clear error messages when inputs are invalid.
  - Calculate time series data based on the mathematical expression over a defined range using mathjs.
  - Render an SVG plot via an inlined EJS template that displays the computed data points. The plot visualizes the expression by placing circular markers for each data point.
  - Check the `--file` parameter to simulate a file save operation. If the provided file extension is `.svg`, write the SVG content directly, or if it is `.png`, convert the SVG using sharp and then write the PNG image. If the file extension is unsupported, a descriptive error message is provided.
  - Maintain backward compatibility by logging raw input arguments if no new parameters are provided.

# Testing

- Update and extend tests in `tests/unit/main.test.js` to cover:
  - Cases where a valid `--expression` and `--range` are provided, ensuring that a dummy SVG output is generated.
  - Scenarios where the `--file` parameter is supplied, confirming that the file write and conversion operations perform as expected (e.g., valid PNG header).
  - Situations with missing or incomplete arguments to test graceful fallback behavior.
  - Cases for unsupported file extensions, ensuring the CLI reports clear error messages.

# Documentation

- Update the `README.md` to include detailed usage examples, providing clear instructions for:
  - Passing a mathematical expression (for example, `y=sin(x)`).
  - Specifying a valid range (for example, `x=-1:1,y=-1:1`).
  - Utilizing the `--file` parameter to output plots in either SVG or PNG format.
  - Understanding error handling in cases of unsupported parameters or malformed input.

This enhancement aligns with the repository's mission to be the "go-to plot library with a CLI" and achieves focused, maintainable value by refining the current functionality without bloating the feature set.