# CLI CONFIG Feature

## Overview
This feature introduces a --config flag for the CLI. When provided, the tool will parse the supplied JSON string and merge its properties with any individual CLI flags. This gives users a single point to configure plot parameters such as expression, range, file output path, and custom styling options. Command line values provided separately will override the values from the config JSON.

## Implementation
- In the main function of src/lib/main.js, check for the presence of the --config flag. If it exists, parse its value into a JSON object and merge its key/value pairs with the existing options.
- Implement error handling for invalid JSON input in the config flag, providing a clear error message.
- Ensure that the merged configuration is used for plot generation. Values explicitly supplied as CLI flags should take precedence over those in the config object.
- Update the README.md and docs/USAGE.md files to document the new --config flag with usage examples (e.g., --config '{ "expression": "y=sin(x)", "range": "x=-1:1,y=-1:1", "file": "output.svg" }').

## Testing
- Add a new CLI test case in tests/unit/main.test.js to simulate providing the --config flag. The test should verify that the plot is generated using values from the JSON config when no conflicting individual CLI flags are provided.
- Ensure that passing an invalid JSON string to --config triggers a descriptive error.

## Impact
With the --config flag, users can easily bundle multiple configuration parameters into a single JSON string, reducing the complexity of long command lines. This feature streamlines CLI usage, enhances user experience, and complements the existing dotenv and dynamic plot rendering functionality.