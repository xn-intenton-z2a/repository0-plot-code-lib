# CLI_PARSER Feature Specification

## Overview
This feature introduces robust command line argument parsing to the repository's main CLI tool. The functionality will allow users to supply parameters such as --expression, --range, and --file directly through the CLI. This enhancement will bring the tool closer to the mission of being a go-to plot library by interpreting user inputs to generate time series data and produce SVG/PNG visualisations.

## Implementation
- Update the source file (src/lib/main.js) to parse command line arguments.
  - If the user provides `--expression`, `--range`, and `--file`, parse their values to trigger the respective plotting functionalities.
  - Maintain backward compatibility by continuing to print the arguments when no valid flags are provided.
- Utilize simple in-code parsing logic to recognize flags. Optionally, use existing dependencies (such as zod for validation) to handle and validate input formats.
- Update test cases in tests/unit/main.test.js to check that the CLI responds correctly to flag inputs and produces the expected console output.

## Testing
- Add scenarios in the test files to simulate passing different combinations of the flags (`--expression`, `--range`, `--file`).
- Ensure that the input parsing logic gracefully handles missing or incomplete arguments.
- Use the vitest framework to automate tests to guarantee no regression in CLI behavior.

## Documentation
- Update the README.md file with examples of the new CLI usage.
  - Include sample commands, e.g.: `node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.svg`.
- Document the expected input formats and possible error messages arising from invalid inputs.

This feature will enhance the user experience by providing a direct, intuitive interface for interacting with the plotting library, fully aligning with the mission of turning formulae and time series data into visual plots.
