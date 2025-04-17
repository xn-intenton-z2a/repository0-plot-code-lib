# CLI_ENHANCEMENT Update

## Overview
This update augments the CLI functionality by fully implementing two important supplemental features: diagnostics and statistical computation. In addition to generating SVG/PNG plots from mathematical expressions or CSV input, the CLI tool now supports the `--diagnostics` and `--stats` flags to provide enhanced runtime insights.

## Implementation Details
### Source File Updates (src/lib/main.js)
- **Argument Parsing:** Extend the `parseArgs` function to recognize two new flags: `--diagnostics` and `--stats`, adding them to the options object.

- **Main Function Logic:**
  - **Diagnostics Mode (`--diagnostics`):**
    - When the flag is provided, the CLI prints diagnostic information before any plot generation. This includes:
      - The Node.js version (using `process.version`).
      - The complete set of parsed CLI options.
      - Relevant environment variables (such as select values from `process.env`).
  
  - **Statistics Computation (`--stats`):**
    - When the flag is provided along with valid `--expression` and `--range` options, the tool computes y-values during plot point generation.
    - It then calculates and logs the minimum, maximum, and average of these y-values to the console. This computation helps validate the plotted data.

- **Fallback Behavior:**
  - If neither the diagnostics nor the stats flags are present, the CLI continues its standard SVG/PNG generation routine without interference.

### Test File Enhancements (tests/unit/main.test.js)
- **Diagnostics Tests:**
  - Add test cases that invoke the CLI with the `--diagnostics` flag and use spies on `console.log` to verify that the diagnostic information (Node.js version, CLI options, environment variables) is output.

- **Statistics Tests:**
  - Add tests that supply valid function-based inputs with `--stats` enabled. Verify that the computed statistics (minimum, maximum, average) are correctly logged.

### Documentation Updates (README.md)
- Update the usage examples to include the new flags. For example:

  ```sh
  node src/lib/main.js --diagnostics
  node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10,y=-1:1" --stats
  ```

## Rationale
Integrating detailed diagnostics and statistical computation enhances the utility and troubleshooting capabilities of the CLI tool. It provides immediate feedback on system configuration and validates the generated plot data, aligning with the mission to be a go-to plot library for formula visualisations.

## Compatibility
These changes adhere to Node.js (>=20) and ECMAScript module standards, ensure backward compatibility, and require no additional dependencies.
