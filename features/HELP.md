# HELP Feature Addition

This feature introduces a `--help` flag to the CLI tool that, when invoked, displays complete usage instructions and examples to the user. This is designed to improve usability and provide quick guidance on how to operate the tool.

## Implementation Details

- **Source Code (src/lib/main.js):**
  - Update the main function to check for the presence of the `--help` flag in the command-line arguments.
  - If the flag exists, print a detailed help message explaining the available flags (`--expression`, `--range`, `--file`, `--stats`, `--diagnostics`, etc.) along with an example usage guide.
  - Terminate the execution after displaying help to prevent further processing.

- **Testing Enhancements (tests/unit/main.test.js):**
  - Add a test case that simulates running the CLI with the `--help` flag.
  - Verify that the output includes key phrases from the help message (e.g. "Usage", "--help", and example command formats).

- **Documentation Updates (README.md):**
  - Update the README to include a section on the `--help` flag.
  - Provide an example command (e.g., `node src/lib/main.js --help`) and indicate the expected output.

## Conformance with Guidelines

- The changes are confined to the required files (source, test, README, and, if needed, package.json for dependency consistency).
- This feature adheres to the repository guidelines by enhancing the CLI interface without relying on grandiose changes or external dependencies.
- The added help functionality complements other CLI features like `--stats` and `--diagnostics`, ensuring a consistent user experience.

## Example Usage

```sh
node src/lib/main.js --help
```

Upon executing the command above, users will see a help message that details the available CLI options and usage examples.
