# VERBOSE Feature Enhancement

This feature introduces a `--verbose` flag to the CLI tool. When enabled, the tool will output detailed debug information and progress logs during its execution. This enhancement aids both users and developers by providing insights into internal state changes and execution steps, aligned with our mission to be a go-to tool for formula visualisations.

## CLI Parameter Parsing & Validation

- Update the CLI schema in `src/lib/main.js` to include a new optional boolean parameter `verbose`.
- Extend the argument parsing logic to recognize the `--verbose` flag. For example, check if `args` array includes `--verbose` and set a corresponding flag.
- Validate that the flag does not conflict with other options such as `--stats` and `--expression`.

## Implementation Details

- Within the `main` function in `src/lib/main.js`, if the `verbose` flag is active, log detailed steps such as:
  - The received CLI arguments.
  - Intermediate results of any computation or data transformation.
  - Progress updates before and after major processing steps (e.g., before calculating statistics or generating plots).

- Ensure that these detailed logs do not overwhelm standard output when the flag is not provided. Use conditional logging based on the presence of the flag.

## Testing Enhancements

- Update the test suite in `tests/unit/main.test.js` to include tests verifying that:
  - The CLI tool outputs debug information when the `--verbose` flag is used.
  - The output contains key log messages or markers when verbose mode is active.
  - Regular execution without the flag remains unaffected.

## Documentation Updates

- Update the `README.md` to document the new `--verbose` flag:
  - Explain that when enabled, the CLI prints detailed debug and progress information.
  - Provide usage examples: 
    ```sh
    node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10,y=-1:1" --file output.svg --verbose
    ```

## Dependency and Build Consistency

- No new dependencies are required. The feature remains fully compatible with Node 20 and ECMAScript modules.
- Ensure that changes follow the guidelines outlined in `CONTRIBUTING.md` and continue to align with the mission in `MISSION.md`.
