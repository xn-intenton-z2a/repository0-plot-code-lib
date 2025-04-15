# PLOT Feature

This feature extends the CLI and library functionality of the repository to simulate plot generation from mathematical expressions and ranges. The feature enhances the main command-line interface by interpreting additional arguments (`--expression`, `--range`, and `--file`) to generate a plot. Although the actual plotting file output is simulated, the CLI will parse the inputs and confirm the intended action via console output.

## Implementation in src/lib/main.js

- Update the `main` function to check for CLI arguments `--expression`, `--range`, and `--file`.
- If `--expression` is provided, extract the mathematical expression and the range values from the `--range` argument.
- If a file output path is specified using `--file`, simulate the process of plotting and output a confirmation message including the parameters.
- Ensure graceful handling of missing or malformed input by providing usage hints.

## Testing Updates

- Enhance `tests/unit/main.test.js` to include test cases that cover the new CLI parameters for plot generation.
- One test should simulate invoking `main` with proper plot-related flags and check for the expected confirmation message output.
- Tests should verify that if the plot parameters are missing or incomplete, the function prints default or error guidance.

## Documentation Updates

- Update the README.md file to document the new CLI usage examples:
  - Example: `node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10,y=-1:1" --file output.svg`
- The documentation will describe the behavior of the CLI and how users can experiment with plot simulation from mathematical expressions.

This feature adheres to the mission statement by enhancing the library’s ability to be the 'jq of formulae visualisations', providing users with a simple method to visualize expressions and time series data via the CLI.
