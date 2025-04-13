# Overview

This feature refines and fully implements the CLI plotting functionality. The tool will now robustly parse command-line inputs for mathematical expressions, range parameters, and an optional file output. It will evaluate the given expression over a defined range using mathjs and generate a dummy SVG plot. If no plotting parameters are provided, the tool will log the input arguments to maintain backward compatibility.

# Source Code Changes

- Update `src/lib/main.js` to:
  - Use a modern command-line argument parsing approach (via Node's built-in processing or a lightweight library) to capture options: `--expression`, `--range`, and `--file`.
  - Validate inputs and, when provided, pass the `expression` and `range` to mathjs for evaluation.
  - Generate a dummy SVG output that simulates a plot of computed values.
  - If the `--file` parameter is specified, simulate a file save operation by logging an appropriate message.
  - Retain backward compatibility by logging the raw input if the new parameters are missing.

# Testing

- Update `tests/unit/main.test.js` to include:
  - Test cases for valid input scenarios where a proper `--expression` and `--range` are supplied, expecting a dummy SVG output.
  - Test cases that confirm the simulation of a file save when a `--file` parameter is provided.
  - Tests for scenarios with missing or incomplete arguments to ensure graceful fallback behavior.

# Documentation

- Update `README.md` to document new usage examples, clearly explaining the following:
  - How to pass a mathematical expression (e.g., `y=sin(x)`) and range (e.g., `x=-1:1,y=-1:1`).
  - The expected dummy SVG output behavior.
  - Instructions for using the `--file` parameter to simulate saving the plot to a file.

# Dependencies

- Ensure that `mathjs` is correctly referenced in `package.json` for expression evaluation.
- Validate that no new dependencies are introduced outside of those already allowed.

This updated CLI plotting feature aligns with our mission and provides a clear, maintainable approach to visualizing formulas interactively via the command line.