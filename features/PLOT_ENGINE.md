# PLOT_ENGINE Feature Specification

## Overview
This feature introduces a simple plotting engine that leverages the existing mathjs dependency to evaluate mathematical expressions and generate a text-based ASCII plot. The CLI will accept a formula via the command line and produce a basic visualisation of the function's output over a defined interval. This aligns with the mission of being a go-to plot library with a CLI and serves both library and command-line usage.

## Implementation Details
- **Input Handling:**
  - Extend the current CLI argument parsing in `src/lib/main.js` to support a new flag (e.g., `--plot`).
  - The flag accepts a mathematical expression as a string, for example, "sin(x)" or "x^2".

- **Evaluation and Data Generation:**
  - Use mathjs to parse and evaluate the function over a fixed interval, such as x in [-10, 10] with a fixed step size.
  - Compute corresponding y-values for each x value.

- **Plot Generation:**
  - Convert the computed (x, y) pairs into a simple ASCII plot, scaling appropriately to display key features of the function.
  - Display the plot in the terminal using standard console output.

- **Error Handling and Defaults:**
  - Provide clear error messages if the input formula cannot be parsed or evaluated.
  - Include default values (e.g., interval [-10, 10] and step size) that can be overridden via additional optional flags if needed in future iterations.

## Usage Examples

- **Command Line:**
  ```sh
  repository0-plot-code-lib --plot "sin(x)"
  ```

- **Library Usage:**
  - Expose a function that takes a formula string and returns the ASCII plot data for integration into other applications.

## Testing

- Add unit tests in the `tests/unit` directory to verify that:
  - The formula is parsed correctly using mathjs.
  - The output plot matches expected outputs for standard functions.
  - Appropriate error messages are returned for invalid input.

## Documentation

- Update the README.md with usage examples and connect the new API endpoint for formula plotting.
- Ensure that modifications follow the guidelines in CONTRIBUTING.md and all tests pass on `npm test`.
