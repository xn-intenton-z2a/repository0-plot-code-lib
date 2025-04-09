# PLOT_ENGINE Feature Specification

## Overview
This feature implements an enhanced plotting engine that evaluates mathematical expressions and generates clear ASCII plots. It functions both as a CLI tool and as an importable library function. Built around mathjs, the engine provides robust error handling and improved parsing of command-line arguments, aligning with our mission to deliver intuitive formula visualizations right from the terminal.

## Implementation Details
### CLI Integration
- Extend the main CLI handler in `src/lib/main.js` to support a `--plot` flag along with optional flags `--interval` and `--step`.
- Introduce a new `--color` flag to enable colorized output of the ASCII plot.
- Enhance input parsing to validate interval format (e.g. `-15,15`) and numeric step size values.
- Ensure graceful fallback to default values for interval `[-10, 10]` and a standard step size when optional parameters are missing or invalid.

### Function Evaluation and Data Generation
- Utilize mathjs to parse and evaluate the provided mathematical expression over a computed set of x-values.
- Calculate corresponding y-values from the function evaluation and scale data appropriately for terminal display.

### Plot Generation
- Convert evaluated data points into an ASCII plot, highlighting key function features such as intercepts, turning points, and discontinuities if applicable.
- When the `--color` flag is active, incorporate ANSI escape sequences into the plot output to differentiate axes, curve lines, and data points. Detect terminal capabilities to ensure compatibility.
- Wrap function calls to handle input validation and error messaging, similar to the CLI.

### Library Exposure
- Expose a function that accepts parameters (formula string, interval, step, and a color flag) and returns a string containing the ASCII plot. This facilitates integration both as a standalone CLI tool and as a library function in other applications.

## Enhanced Error Handling & Defaults
### Input Validation
- Validate the mathematical expression using mathjs and provide clear error messages if the parsing fails.
- Validate custom interval and step input. Distinguish between format errors and numeric correctness, and provide tailored feedback.

### Defaults
- Use default interval and step values when error conditions are met or when user inputs are absent.
- Default to non-colorized output unless the `--color` flag is explicitly provided.

## Testing and Documentation
### Testing
- Unit tests should confirm that common functions (e.g., sin(x), x^2) are correctly parsed, evaluated, and rendered in both standard and colorized modes.
- Compare generated ASCII output with expected patterns for given inputs.
- Validate that appropriate error messages are returned for invalid expressions or malformed parameters.

### Documentation and Examples
- Update the README.md with usage examples:
  - Basic plotting using the `--plot` flag.
  - Advanced usage with custom `--interval`, `--step`, and the new `--color` option for enhanced visualization.
  - Demonstrating library usage by importing the plotting function in JavaScript modules.

## Usage Example
- **CLI Command without Colorization:**
  - Run: `node src/lib/main.js --plot "sin(x)"`
- **CLI Command with Colorization:**
  - Run: `node src/lib/main.js --plot "sin(x)" --color`

This enhancement reinforces our mission by broadening the visual appeal and clarity of the ASCII plots, making the tool more accessible and user-friendly for both casual users and developers.
