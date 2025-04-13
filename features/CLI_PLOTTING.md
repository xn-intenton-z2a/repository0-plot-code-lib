# CLI_PLOTTING

This feature refines and extends the existing CLI plotting functionality to provide a fully interactive command-line experience. The implementation leverages mathjs to evaluate mathematical expressions over specified ranges and generates a dummy SVG output. Furthermore, it simulates file-saving actions when indicated by the command line parameters.

# Source Code Changes
- Update `src/lib/main.js` to include robust command-line argument parsing for `--expression`, `--range`, and `--file`.
- Use mathjs to compute function values over the specified range. Manipulate these computed values to generate a dummy SVG string that simulates a plot.
- When the `--file` option is provided, log a message indicating that the generated SVG plot would be saved to the given filename.
- Maintain backward compatibility by logging input arguments when no plotting parameters are provided.

# Testing
- Enhance `tests/unit/main.test.js` by adding tests for:
  - Valid command usage with proper `--expression` and `--range` inputs that trigger dummy SVG generation.
  - Scenario where `--file` is provided and a file-saving simulation is logged.
  - Cases ensuring no error is thrown when arguments are missing or incomplete.

# Documentation
- Update `README.md` to include clear usage examples with the new CLI options:
  ```bash
  node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.svg
  ```
- Document the behavior for both complete and fallback argument schemes, ensuring users know what output to expect in each case.

# Dependencies
- Confirm that all necessary libraries, notably mathjs, are listed in the dependencies within `package.json`.

This extension aligns with our mission of providing a robust CLI tool for converting mathematical expressions into visual plots, enhancing usability and interactivity in a single repository setup.