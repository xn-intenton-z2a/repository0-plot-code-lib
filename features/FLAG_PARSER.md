# FLAG_PARSER Feature Enhancement

This feature consolidates the processing of CLI flags into a unified flag parser using the zod library. The update enhances the usability of the CLI by ensuring robust, validated parsing across all supported flags (e.g. --help, --stats, --diagnostics, --expression, --range, --file). This consolidation streamlines feature interactions and improves error handling, while staying within the repository guidelines of only modifying existing source, tests, README, and dependencies files.

## Implementation Details

- **Source Code Updates (src/lib/main.js):**
  - Import the zod library to define a CLI schema for validating and parsing command-line arguments.
  - Define a schema with optional flags: `--help` (boolean), `--stats` (boolean), `--diagnostics` (boolean), `--expression` (string), `--range` (string), and `--file` (string).
  - Update the main function to parse `process.argv` using the defined schema. If the schema validation fails, display a clear error message along with a usage guide.
  - Route the control flow based on the presence or absence of the flags. For instance, if `--help` is detected, output comprehensive usage instructions and exit without further processing.

## Testing Enhancements

- **Test File Updates (tests/unit/main.test.js):**
  - Add tests to check that the CLI parser correctly handles valid and invalid flag combinations.
  - Verify that when a valid flag is passed (e.g., `--help`), the expected behavior and output are produced.
  - Ensure the parser gracefully catches errors for incorrect flag formats, providing the informative usage guide as feedback.

## Documentation Updates

- **README.md:**
  - Update the README to document the updated CLI interface, including details on each supported flag and their usage examples. For example:

    ```sh
    node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" --file output.svg
    ```

  - Provide a section on flag validations and error messaging.

## Dependency and Build Consistency

- No external dependencies beyond the already included zod are required. The updates remain compliant with Node 20 and ECMAScript module standards.
- All modifications adhere to the repository's contribution guidelines as specified in CONTRIBUTING.md and support the mission of being a go-to CLI tool for formula visualisations.
