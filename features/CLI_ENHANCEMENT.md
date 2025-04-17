# CLI_ENHANCEMENT Feature

This feature consolidates and refines all CLI-related functionalities into one robust interface. It integrates plotting, statistical summaries, and diagnostics reporting into a single, coherent enhancement for the CLI tool.

## Overview

The unified CLI enhancement supports the following functionalities:

- **Plot Generation:** Parse and validate CLI parameters to generate plots (SVG/PNG) using expressions and ranges.
- **Statistics Calculation:** When enabled via the `--stats` flag, compute and display basic statistics (minimum, maximum, and average) for evaluated y-values.
- **Diagnostics Mode:** Introduce a new `--diagnostics` flag that outputs runtime diagnostic information such as Node version, environment details, and active CLI flags to assist in debugging and verifying configuration.

This consolidation adheres to our mission to be the go-to plot library with a CLI, providing clear, immediate feedback and robust functionality in a single entry point.

## CLI Parameter Parsing & Validation

- **Expression and Range Parsing:**
  - Parse parameters: `--expression`, `--range`, and `--file` as previously defined in the PLOT feature.
  - Validate the format of the range and file path, outputting user-friendly error messages when parameters are missing or misformatted.

- **Stats Flag Handling:**
  - Extend the CLI schema to include an optional boolean parameter `--stats` that triggers computation of min, max, and average values for computed y-values.

- **Diagnostics Flag Handling:**
  - Add a new optional boolean parameter `--diagnostics`. When invoked, special diagnostic output is generated, including the Node.js version, current configuration flags, and a summary of enabled features, before proceeding with the remainder of the CLI operations.

## Implementation Details

- **Source Modification:**
  - Update `src/lib/main.js` to integrate argument parsing for all aforementioned flags using the existing CLI schema and validation mechanisms (e.g., with zod).
  - Insert conditional blocks to handle each flag. For instance, if `--diagnostics` is present, output relevant diagnostic information immediately.
  - Ensure that the logic for plot generation and statistics computation remains intact and is invoked accordingly.

- **Testing Enhancements:**
  - Update tests in `tests/unit/main.test.js` to include cases for:
    - Successful execution using valid `--expression`, `--range`, and `--file` parameters.
    - Verification that when `--stats` is provided, calculated statistics are correctly output.
    - Verification that when `--diagnostics` is provided, the CLI prints the diagnostic summary, including environment and configuration details.
  
- **Documentation Updates:**
  - Amend the `README.md` to document the unified CLI interface. Include usage examples demonstrating all flags:
    ```sh
    node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10,y=-1:1" --file output.svg --stats
    node src/lib/main.js --diagnostics
    ```
  - Update the dependency and build instructions if needed, ensuring compatibility with Node 20 and ECMAScript modules.

## Rationale

By consolidating the discrete STATS and PLOT features into a single CLI enhancement, we simplify the codebase and provide a more streamlined user experience. Additionally, the new diagnostics feature provides actionable insights, furthering our commitment to reliability and user support as described in our mission and contributing guidelines.
