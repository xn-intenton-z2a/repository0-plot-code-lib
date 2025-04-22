# D3PLOT Feature Enhancement

This feature introduces a new CLI flag `--d3plot` which integrates data evaluation using math.js and SVG plot generation using D3.js. When enabled, the CLI will:

- Parse additional parameters such as `--expression`, `--range`, and `--file`.
- Use math.js to evaluate the provided mathematical expression over the specified range, generating a simple time series data set.
- Leverage D3.js to create a basic SVG plot from the computed data.
- Output the generated SVG content to the console or write it to a file (if `--file` is provided).

## CLI Parameter Parsing & Validation

- Extend the CLI schema in `src/lib/main.js` to include new optional flags:
  - `d3plot`: A boolean flag to trigger plot generation using D3.
  - `expression`: A string to define the mathematical function (e.g., "y=sin(x)").
  - `range`: A string defining the domain for the x-axis (e.g., "x=-10:10").
  - `file`: A file path where the SVG output should be saved.

- Validate that when `--d3plot` is enabled, both `--expression` and `--range` are provided.

## Implementation Details

- Update `src/lib/main.js` to check for the `--d3plot` flag. 
- When active, parse the provided expression and range parameters, use math.js to evaluate the expression over the range to generate y-values, and then use D3.js to construct an SVG element that plots the data (e.g., a simple line or scatter plot).
- If a `--file` parameter is passed, write the output SVG to the specified file; otherwise, output the SVG content to the console.
- Ensure that the existing functionality (e.g., `--stats`, `--verbose`, and `--plot`) remains unaffected.

## Testing Enhancements

- Update the test suite in `tests/unit/main.test.js` to include tests that:
  - Verify the CLI correctly detects and processes the `--d3plot` flag along with required parameters.
  - Ensure that when `--d3plot` is active and valid parameters are provided, an SVG string is generated.
  - Confirm that error messages are displayed if required parameters are missing when `--d3plot` is used.

## Documentation Updates

- Update `README.md` to include the new `--d3plot` flag. Document its purpose, usage examples, and expected behavior. For example:

```
node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" --file output.svg --d3plot
```

## Dependency and Build Consistency

- Update the `package.json` dependencies to include math.js and d3 if they are not already present. This keeps the project consistent with Node 20 and ECMAScript module standards.
- Ensure these additions and code modifications reflect the guidelines in `CONTRIBUTING.md` and align with the mission in `MISSION.md`.
