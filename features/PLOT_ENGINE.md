# PLOT_ENGINE Feature Specification

## Overview
This feature implements a versatile plotting engine that evaluates mathematical expressions and generates ASCII plots. Built around the mathjs library, the plot engine serves both as a CLI tool and a library function. This feature aligns with the mission by offering an intuitive interface for visualising functions right from the terminal.

## Implementation Details
- **CLI Integration:**
  - Extend the main CLI handler in `src/lib/main.js` to recognize a `--plot` flag along with optional flags `--interval` and `--step` to customize the plotting range and resolution.
  - Example: `repository0-plot-code-lib --plot "sin(x)" --interval "-15,15" --step 0.5`
- **Function Evaluation and Data Generation:**
  - Utilize mathjs to parse the provided mathematical expression.
  - Evaluate the function over a default interval of [-10, 10] with a default step size, unless overridden by user-supplied flags.
  - Calculate corresponding y-values and scale the data appropriately to fit into a terminal window.
- **Plot Generation:**
  - Convert computed data points into a clear ASCII plot representation.
  - Ensure the plot highlights key features of the function, such as intercepts and turning points.
- **Library Exposure:**
  - Expose a function that accepts parameters (formula string, interval, step) and returns the generated ASCII plot. This function can be imported by other modules, making the plotting engine reusable beyond the CLI context.

## Error Handling and Defaults
- Validate the formula and input parameters. If mathjs fails to parse the expression, return a clear and user-friendly error message.
- If the interval or step flags are not provided, revert to the default values. If provided, validate the interval format and numerical correctness of the step size.

## Testing
- **Unit Tests:**
  - Add tests under `tests/unit` that confirm the following:
    - Proper parsing and evaluation of common functions (e.g., sin(x), x^2).
    - Correct ASCII output matching expected patterns for given inputs.
    - Appropriate error messages for invalid expressions or malformed interval/step parameters.
- **CLI Tests:**
  - Simulate command-line invocations to ensure the feature completes without error and outputs the expected plot.

## Documentation and Examples
- Update the README.md file with clear usage examples, including:
  - Basic plotting with the `--plot` flag.
  - Advanced usage with `--interval` and `--step` to demonstrate custom configuration.
  - Library usage examples that illustrate how to import and use the plotting function from other JavaScript modules.

This refined PLOT_ENGINE feature ensures a robust and user-friendly plotting experience, aligned with our mission to be the go-to library for formula visualisations via CLI and code integrations.