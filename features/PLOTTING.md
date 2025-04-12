# PLOTTING

## Overview
This feature introduces basic plotting functionality to the repository, aligning with our mission to be a go-to plot library with a CLI. Users will be able to input mathematical expressions via the CLI and obtain plots rendered as SVG files as well as textual previews in the terminal.

## Implementation
- **CLI Integration:** Extend the main CLI (in src/lib/main.js) to accept a new flag `--plot` followed by a mathematical expression (e.g., "sin(x)"). Optionally, support additional flags:
  - `--range`: Specify the domain as a comma-separated pair (default: -10,10).
  - `--output`: File path for saving the generated SVG (if omitted, a console preview is provided).
- **Plot Generation:**
  - Use the `mathjs` library to parse and evaluate the input expression over the specified range.
  - Compute data points by sampling the function at regular intervals.
  - Generate an SVG file plotting these points. Basic styling and axes should be included.
- **User Feedback:** Utilize `chalk` for colored output in the terminal, showcasing either error messages or a confirmation with a textual preview of the plot layout.
- **Error Handling:** Validate input expressions and range, providing clear error messages and usage hints if invalid input is detected.

## Usage Examples
- **Generate a plot and view preview:**
  ```bash
  node src/lib/main.js --plot "sin(x)"
  ```
- **Generate a plot with a specific range and save to SVG:**
  ```bash
  node src/lib/main.js --plot "sin(x)" --range "-6.28,6.28" --output "plot.svg"
  ```

## Testing & Documentation
- **Unit Tests:** Add new tests in tests/unit/main.test.js to verify:
  - Correct parsing of command-line arguments.
  - Evaluation of the mathematical expression across the given range.
  - Proper SVG generation and file output when the `--output` flag is used.
- **Documentation:** Update README.md with detailed usage instructions, examples, and screenshots of generated plots. Ensure that the feature complies with guidelines detailed in CONTRIBUTING.md.

## Future Considerations
- Expand plotting capabilities to support multiple functions, customizable styling, and interactive modes.
- Modularize the plotting functionality further if the feature grows in complexity.
