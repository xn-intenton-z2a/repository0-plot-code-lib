# PLOT Feature Enhancement

This update refines and extends the existing PLOT feature to improve the command-line interface (CLI) functionality and ensure robust parameter validation. The changes include enhanced parsing, clearer error messages, and updated documentation and tests.

## CLI Argument Parsing

- Update the main function in src/lib/main.js to recognize and validate the following CLI parameters:
  - `--expression`: Accepts a mathematical expression string (e.g., "y=sin(x)").
  - `--range`: Accepts a range in the format "x=start:end,y=start:end", and validates the input format.
  - `--file`: Accepts a file path for output where a simulated plot generation confirmation will be printed.

- Implement error handling for cases where required parameters are missing or are in an incorrect format. Provide users with usage guidance and error messages if the input parameters are malformed.

## Test Enhancements

- Update tests in tests/unit/main.test.js to include scenarios covering the new CLI functionality. This includes tests for:
  - Successful parsing and confirmation message when all required parameters are provided.
  - Error handling when one or more parameters (e.g., `--range` or `--expression`) are missing or do not meet the expected format.

## Documentation Updates

- Revise the README.md file to document the updated CLI usage, including examples of valid commands. For example:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10,y=-1:1" --file output.svg
```

- Include information on the expected input format and error messages in the documentation.

## Dependency and Code Quality Considerations

- Make sure that the updates in src/lib/main.js remain compatible with Node 20 and the ECMAScript Module (ESM) standards as outlined in CONTRIBUTING.md.
- Verify that any changes uphold the discipline of minimal file changes (updating only source, test, README, and dependencies if necessary).
- Ensure that the tests pass under the command `npm test` and that the new functionality is clearly documented.

This feature enhancement aligns with the mission of being a "go-to plot library with a CLI" by providing a more reliable, user-friendly interface for generating plot visualizations from mathematical expressions and time ranges.
