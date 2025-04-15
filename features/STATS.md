# STATS Feature Enhancement

This feature introduces a new CLI flag `--stats` that computes and displays basic statistics for the computed y-values (minimum, maximum, and average) for each mathematical expression. When added, the tool will output these statistics to the console before proceeding with plot generation or data export.

## CLI Parameter Parsing & Validation

- Update the CLI argument parsing in `src/lib/main.js` to accept an optional `--stats` flag. 
- Extend the zod schema to include `stats: z.boolean().optional()`, ensuring that the flag is correctly parsed as a boolean.
- When the `--stats` flag is provided, compute the statistics for each expression based on the already calculated y-values.

## Implementation Details

- After evaluating expressions and computing `yValuesArray`, iterate through each array to calculate:
  - **Minimum Value:** Use `Math.min(...yValues)`.
  - **Maximum Value:** Use `Math.max(...yValues)`.
  - **Average Value:** Sum the y-values and divide by the count.
- Print the computed statistics to the console in a readable format, labeling each expression’s statistics if multiple expressions are provided.
- Ensure that this additional output does not interfere with other functionalities like evaluation export or file generation.

## Testing Enhancements

- Update `tests/unit/main.test.js` to include tests for the new `--stats` flag.
    - Test that for a given expression, the console output includes a statistics summary.
    - Verify that the statistics output is formatted correctly when multiple expressions are provided.

## Documentation Updates

- Update the `README.md`:
    - Include the new `--stats` flag in the usage instructions and examples.
    - Provide an explanation that when `--stats` is used, the CLI prints out the summary statistics (min, max, average) for the computed y-values.
- No changes to the dependencies file are required for this feature.

This feature complements the core mission by providing users with immediate insights into the computed time series data, making the tool more informative and useful for analysis.
