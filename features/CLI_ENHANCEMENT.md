# CLI_ENHANCEMENT Feature Update

This update refines the existing CLI functionalities to fully support a wider range of command line options. In addition to handling basic plot generation parameters, the feature now integrates handling for the `--stats` and `--diagnostics` flags. This update ensures the CLI tool is robust, providing users with statistical summaries and diagnostic output on demand.

## Overview

- **Plot Generation**: Parses the `--expression`, `--range`, and `--file` flags to generate plots in SVG/PNG formats.
- **Statistics Calculation**: With the `--stats` flag, the CLI calculates and displays statistics (minimum, maximum, average) for computed y-values.
- **Diagnostics Reporting**: The `--diagnostics` flag triggers diagnostics output including Node.js version, environment details, and active CLI flags to aid in debugging.

## Implementation Details

### Source File Updates (src/lib/main.js)

- **Argument Parsing**: Extend the `parseArgs` function to handle two new flags: `--stats` and `--diagnostics`.
  - When `--stats` is provided, set an option `stats: true` to later trigger the statistical summary processing.
  - When `--diagnostics` is provided, set an option `diagnostics: true` to output environment and configuration details.
- **Main Function Update**: Modify the `main` function to check for these flags and execute the corresponding logic.

### Testing Enhancements (tests/unit/main.test.js)

- Add test cases for both `--stats` and `--diagnostics` flags:
  - Verify that the `--stats` flag triggers proper calculation and logging of statistical metrics.
  - Verify that the `--diagnostics` flag logs diagnostic information including Node.js version and current CLI flags.

### Documentation Updates (README.md)

- Update usage examples to include new flags:
  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10,y=-1:1" --file output.svg --stats
  node src/lib/main.js --diagnostics
  ```
- Ensure that the README explains both new functionalities and provides clear usage instructions.

### Dependencies Updates (package.json)

- Confirm that testing and linting configurations support the updated CLI. No new dependencies are necessary for these changes.

## Rationale

This update consolidates critical CLI functionalities by extending support beyond basic plot generation. With integrated statistics and diagnostics features, the CLI tool becomes more useful for both end-users and developers. The changes align with our mission to be the go-to plot library by enhancing both usability and maintainability of our code base.
