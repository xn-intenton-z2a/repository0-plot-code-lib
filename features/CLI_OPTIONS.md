# CLI_OPTIONS Feature Consolidation

This feature merges the enhancements previously described under STATS, VERBOSE, and CONFIG into a unified CLI options handler. The new implementation supports three additional CLI flags:

1. --stats: When enabled, the tool computes and displays basic statistics for computed y-values including minimum, maximum, and average values.

2. --verbose: When active, the CLI tool prints detailed internal logs and progress messages to help with debugging and provide clear insights into execution steps.

3. --config: Allows users to supply a JSON configuration string that defines default parameters. These defaults are merged with command line inputs, with explicit CLI arguments taking precedence.

## CLI Parameter Parsing & Validation

- Update the schema in src/lib/main.js using Zod to validate the additional boolean flags for --stats and --verbose, plus a string parameter for --config.
- Ensure that the --config option is validated and its JSON is parsed safely. On parsing error, a user-friendly error message is displayed and the process exits.
- Continue to support existing CLI arguments such as --expression, --range, and --file.

## Implementation Details

- Modify src/lib/main.js to detect and process the new flags. First read and remove the --config parameter along with its value from the arguments, parse it, and merge with other parameters.
- If --stats is enabled, compute the minimum, maximum, and average values for the generated y-values before any subsequent processing.
- If --verbose is enabled, output detailed logs, including the raw arguments, internal state changes, and processing steps.
- Ensure that explicit CLI flag values override any defaults coming from the configuration.

## Testing Enhancements

- Update tests in tests/unit/main.test.js to simulate CLI calls with combinations of the new flags:
  - A test case for verifying that --stats outputs a correctly formatted statistics summary.
  - A test case for ensuring that --verbose mode outputs expected log messages.
  - A test case to check that --config JSON strings are parsed correctly and merged with CLI arguments.
  - A test case validating that invalid JSON input for --config triggers an appropriate error message.

## Documentation Updates

- Revise README.md to reflect the consolidated CLI options, detailing usage examples for --stats, --verbose, and --config. Include examples that show configuration defaults being overridden by command line flags.

## Dependency and Build Consistency

- No new external dependencies beyond those already in the project are required.
- Confirm compatibility with Node 20, ES modules, and ensure changes remain compliant with the guidelines in CONTRIBUTING.md and MISSION.md.

This consolidation aims to streamline CLI configuration and improve user experience by unifying related flag functionalities into a single, maintainable feature.
