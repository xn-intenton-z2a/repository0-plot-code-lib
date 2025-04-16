# Help Flag Feature

This feature introduces a robust `--help` flag to the CLI that triggers display of a detailed usage message and exits without performing further processing. This enhancement improves usability by providing immediate guidance on available commands and flags.

## Implementation Details

- **Source Code (src/lib/main.js):**
  - Check if the `--help` flag is present in the parsed options. If detected, print a help message detailing all available options (`--expression`, `--range`, `--file`, `--stats`, and `--help`) and exit the process immediately, bypassing all other logic.
  - Ensure the placement of this check is at the start of the `main` function to avoid side effects from processing other flags.

## Testing Enhancements

- **Test File (tests/unit/main.test.js):**
  - Add new tests verifying that when the `--help` flag is provided, the CLI outputs the complete help message and does not proceed with evaluating any expressions or generating outputs.
  - Ensure that the new test confirms the help message content includes appropriate descriptions for each flag.

## Documentation Updates

- **README (README.md):**
  - Add a new section under CLI Usage titled "Help Flag" that describes the purpose and usage of the `--help` flag, including example commands and expected output.
  - Update any introductory or index sections to reference the new help functionality.

## Alignment with Mission & Contributing Guidelines

- **Mission Compliance:**
  - Providing clear and accessible command-line documentation supports the mission of being the go-to tool for formulae visualisations.
  - The feature adheres to the repository guidelines by only modifying existing files (source, tests, README, dependencies) without introducing new files.

- **Contributing Guidelines:**
  - The changes follow the coding style and standards set in CONTRIBUTING.md.
  - All new functionality is covered by tests and documented accordingly in the README.
