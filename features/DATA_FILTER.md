# DATA_FILTER Feature Enhancement

This feature introduces a new `--filter` flag to the CLI tool that allows users to manipulate the computed time series data before plotting. Inspired by jq's data processing capabilities, the `--filter` flag accepts a simple filter expression to transform, reduce, or otherwise refine the generated data set.

## CLI Parameter Parsing & Validation

- Extend the CLI schema in `src/lib/main.js` to include a new optional string parameter `filter`.
- Use the existing `zod` validation framework to ensure that, if provided, the filter expression is a valid string.
- Update the help and usage output so that users are aware of the new flag.

## Implementation Details

- After evaluating the mathematical expression (e.g., via the `--expression` flag) and computing the time series data, check if a `--filter` flag is active.
- Implement a basic filter parser that supports simple conditions; for example, a filter expression like `gt:0;lt:1` where `gt` means greater than and `lt` means less than. This will allow the filtering of values (e.g., removing data points that do not meet the criteria).
- Apply the parsed filter conditions to the computed array of y-values before further processing (such as statistics computation, plotting, or file export).
- Ensure that if the provided expression does not match the expected format, the CLI returns a clear error message without disrupting normal operations.

## Test Enhancements

- Update the test suite in `tests/unit/main.test.js` to simulate CLI invocations that include the `--filter` flag.
- Verify that when a valid filter expression is provided, the computed data is correctly transformed and that the filtering logic produces the expected output.
- Add tests to cover edge cases where the filter expression is invalid or results in an empty data set, ensuring that proper error handling and messaging occur.

## Documentation Updates

- Update the `README.md` to document the new `--filter` flag. Include detailed instructions and examples in a new section describing the supported filter syntax.
- Provide example usage:

  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" --filter "gt:0;lt:1" --file output.svg
  ```

- Explain that the filter will be applied to the computed y-values and can be used to narrow down the data set based on user-defined conditions.

## Conformance with Mission and Guidelines

- This feature adds achievable value by empowering users to refine the raw data before visualisation, aligning with the mission to be a "go-to plot library".
- All modifications remain confined to the source file, tests, and documentation, adhering to repository guidelines.
