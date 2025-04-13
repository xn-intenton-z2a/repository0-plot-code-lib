# CLI_PLOTTING

This update refines the existing CLI plotting feature to provide a more interactive command-line experience while simulating plot generation using dummy SVG output. The feature now fully parses and processes command line arguments and integrates with the mathjs library to compute function values over a specified range.

## Feature Description

- **Argument Parsing:**
  - Process command-line arguments: `--expression`, `--range`, and `--file`.
  - Validate input formats and provide default behaviors if arguments are missing.

- **Plot Simulation:**
  - When both `--expression` and `--range` options are provided, evaluate the expression over the range using mathjs.
  - Generate a dummy SVG plot output (simulate plot generation) and log the SVG content for visualization.
  - If the `--file` option is provided, log a message indicating that the dummy SVG would be saved to the specified filename.

- **Backward Compatibility:**
  - If no plot-related arguments are provided, log the arguments as currently done to ensure backward compatibility.

## Implementation Details

- **Source Code Changes:**
  - Update `src/lib/main.js` to include a command line parser which extracts `--expression`, `--range`, and `--file` parameters.
  - Use mathjs to perform basic evaluation of the provided expression across the specified range. The actual SVG content will be a placeholder string.
  - Log appropriate messages to simulate saving output when `--file` is specified.

- **Testing:**
  - Extend existing tests in `tests/unit/main.test.js` to cover scenarios with valid and missing command line arguments. 
  - Verify that the dummy SVG generation and file logging behave as expected.

- **Documentation:**
  - Enhance the `README.md` file to include usage examples, such as:
    ```bash
    node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.svg
    ```
  - Update documentation to detail behavior when arguments are omitted, ensuring clarity for all users.

## Testing & Deployment

- Ensure `npm test` passes all tests including the new cases.
- Confirm that running the CLI with appropriate arguments logs the expected dummy SVG output and file saving simulation.

This refinement strengthens the CLI capability in line with our mission of transforming mathematical expressions into visual plots, providing a robust and interactive user experience.
