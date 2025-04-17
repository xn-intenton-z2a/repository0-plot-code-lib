# CLI_ENHANCEMENT Update

## Overview
This update extends the CLI functionality by fully implementing the additional diagnostic and statistical features as described in the current documentation. In addition to generating SVG/PNG plots from mathematical expressions or CSV input, users can now invoke the CLI with the `--diagnostics` flag to output useful environment and configuration details, and with the `--stats` flag to compute basic statistical summaries (minimum, maximum, and average) for the computed y-values of function plots.

## Implementation Details
### Source File Updates (src/lib/main.js)
- **Argument Parsing:** 
  - Extend the `parseArgs` function to recognize two new flags: `--diagnostics` and `--stats`, adding them to the options object.

- **Main Function Logic:**
  - **Diagnostics Mode:** When the `--diagnostics` flag is present, the program will:
    - Log the Node.js version (using `process.version`).
    - Log the full parsed CLI options.
    - Output any relevant environment variables (e.g. from `process.env`) or configuration details.

  - **Statistics Computation:** When the `--stats` flag is provided along with a valid expression and range, the CLI will:
    - Compute the y-values in the same loop used for generating plot points.
    - Calculate the minimum, maximum, and average of the valid y-values.
    - Log these computed statistics to the console for user inspection.

- **Fallback Behavior:**
  - Ensure that the new flags do not interfere with the existing SVG and PNG generation. Both the diagnostics and statistical outputs are supplementary and should not alter the final plot generation.

### Test File Enhancements (tests/unit/main.test.js)
- Add new test cases to verify:
  - That invoking the CLI with `--diagnostics` results in diagnostic output (using spies on `console.log`).
  - That invoking the CLI with `--stats` (together with valid `--expression` and `--range`) results in statistical information (minimum, maximum, average) being logged.

### README Updates (README.md)
- Update the usage examples to include the new flags. For example:
  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10,y=-1:1" --file output.svg --stats
  node src/lib/main.js --diagnostics
  ```
- Document the purpose and behavior of the new `--diagnostics` and `--stats` flags.

### Dependencies File (package.json)
- No additional dependencies are required. The current modules (including Node.js built-in modules) suffice to implement these features.

## Rationale
Integrating detailed diagnostics and statistical computation enhances the utility and robustness of the CLI tool. This update aligns with the project mission by providing users and developers with immediate insights into system configuration and computation results, enabling easier troubleshooting and validation of function plots.
