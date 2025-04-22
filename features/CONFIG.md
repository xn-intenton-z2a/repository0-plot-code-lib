# CONFIG Feature Enhancement

This feature adds the ability to load default CLI options from a JSON configuration passed via a new `--config` flag. This allows users to define a set of default parameters in a configuration string that is merged with the command line arguments at runtime. This enhancement improves usability by allowing recurring parameter bundles to be specified once.

## CLI Parameter Parsing & Validation

- Extend the CLI schema in `src/lib/main.js` to check for a new optional parameter `--config`.
- When present, the tool will expect a valid JSON string representing default configuration values for the CLI. For example:

  ```sh
  node src/lib/main.js --config '{"expression": "y=sin(x)", "range": "x=-10:10"}'
  ```

- Validate the JSON using a try/catch block. If parsing fails, output a clear error message and exit.

## Implementation Details

- **Source Modifications:**
  - Update `src/lib/main.js` to detect the presence of the `--config` flag in the arguments list.
  - If the flag is provided, remove it (and its associated value) from the arguments array and attempt to parse the JSON string.
  - Merge the parsed configuration with other CLI arguments, with CLI parameters taking precedence over configuration defaults.
  - Ensure that any errors during JSON parsing trigger a user-friendly error message.

## Testing Enhancements

- Update the test suite in `tests/unit/main.test.js` to include tests verifying the following:
  - The CLI tool correctly parses a valid JSON configuration provided via `--config` and merges it with hardcoded arguments.
  - Invalid JSON input results in an error message and exits gracefully.
  - Ensure that when no `--config` flag is provided, the tool behaves as before.

## Documentation Updates

- Update the `README.md` to document the new `--config` feature. Include usage examples and explain that configuration values defined via `--config` serve as default parameters, which are overridden by any explicit CLI flags.

## Dependency and Build Consistency

- No new dependencies are required for this feature. The implementation utilizes built-in JavaScript methods (i.e., JSON.parse).
- All changes remain fully compatible with Node 20, ECMAScript modules, and adhere to the guidelines in `CONTRIBUTING.md` and the mission in `MISSION.md`.
