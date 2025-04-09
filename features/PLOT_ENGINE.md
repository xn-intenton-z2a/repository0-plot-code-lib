# PLOT_ENGINE Feature Specification

## Overview
This feature implements an enhanced plotting engine that evaluates mathematical expressions and generates clear ASCII plots. It functions both as a CLI tool and as an importable library function. Built around mathjs, the engine provides robust error handling and improved parsing of command-line arguments, aligning with our mission to deliver intuitive formula visualizations right from the terminal.

## Implementation Details
- **CLI Integration:**
  - Extend the main CLI handler in `src/lib/main.js` to support a `--plot` flag along with optional flags `--interval` and `--step`.
  - Enhance input parsing to clearly validate interval format (e.g. `-15,15`) and step size numeric values.
  - Ensure graceful fallback to default values for interval `[-10, 10]` and standard step size when optional parameters are missing or invalid.

- **Function Evaluation and Data Generation:**
  - Utilize mathjs to parse and evaluate the mathematical expression over a computed set of x-values.
  - Calculate corresponding y-values and scale data appropriately for terminal display.

- **Plot Generation:**
  - Convert evaluated data points into an ASCII plot, highlighting key function features such as intercepts, turning points, and discontinuities if applicable.

- **Library Exposure:**
  - Expose a function that accepts parameters (formula string, interval, and step) and returns a string containing the ASCII plot. This facilitates integration both as a standalone CLI tool and as a library function in other applications.

## Enhanced Error Handling & Defaults
- **Input Validation:**
  - Validate the mathematical expression using mathjs. Provide clear error messages if the parsing fails.
  - Validate custom interval and step input. Distinguish between format errors and numeric correctness, providing tailored feedback.

- **Defaults:**
  - Use default interval and step values when error conditions are met or when user inputs are absent.

## Testing
- **Unit Tests:**
  - Confirm that common functions (e.g., sin(x), x^2) are correctly parsed and evaluated.
  - Compare generated ASCII output with expected patterns for given inputs.
  - Validate that appropriate error messages are returned for invalid expressions or malformed parameters.

- **CLI Tests:**
  - Simulate various command-line invocations to ensure robust parsing, evaluation, and error handling without crashes.

## Documentation and Examples
- Update the README.md file with updated usage examples:
  - Basic plotting using the `--plot` flag.
  - Advanced usage with custom `--interval` and `--step` options.
  - Demonstrating library usage by importing the plotting function in JavaScript modules.
