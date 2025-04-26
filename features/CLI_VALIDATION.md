# CLI VALIDATION ENHANCEMENT

This feature introduces robust validation for command line inputs using zod. It ensures that the values passed for --expression and --range follow the expected formats before proceeding with plot generation. This enhancement reduces user errors and guides proper usage, which aligns with our mission to be a go-to plot library with reliable functionality.

# Validation Requirements

1. --expression must be a valid mathematical expression starting with y= and containing allowed characters (letters, numbers, and common mathematical operators).
2. --range must follow the format x=min:max,y=min:max with proper numeric bounds. 

If the provided inputs do not satisfy these conditions, a descriptive error will be thrown, prompting the user to correct the input.

# Implementation Details

- Update the source file (src/lib/main.js) to include zod-based schemas for validating --expression and --range flags. 
- The zod schema for --expression will require it to start with y= and to expose only valid mathematical characters.
- The zod schema for --range will enforce a format that contains x and y ranges separated by commas and using the colon as the delimiter.
- In main(), after parsing the command line arguments, apply the zod schemas. If validation fails, log a descriptive error message and exit the process.
- Update the CLI help message to include examples of valid --expression and --range formats.

# Testing and Documentation

- Update and add tests in tests/unit/main.test.js to simulate invalid input scenarios: 
  - Missing or incorrectly formatted expressions.
  - Ranges that do not adhere to the required pattern.
  - Ensure that the system throws appropriate errors when validation fails.
- Update the README.md and docs/USAGE.md with clear usage examples and error messaging details related to input validation.

This CLI validation enhancement ensures that users provide correctly formatted input and helps maintain the integrity and reliability of the plot generation process.
