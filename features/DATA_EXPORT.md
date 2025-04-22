# DATA_EXPORT Feature Enhancement

This feature adds the ability to export the computed time series data into a standardized CSV format. The CLI will now accept an additional parameter `--export <filepath>` and, when provided, will output the evaluated expression data in a CSV format to the specified file path.

## CLI Parameter Parsing & Validation

- Extend the CLI schema in `src/lib/main.js` to include a new optional string parameter `export`.
- Validate that if the `--export` flag is provided, a valid file path string immediately follows the flag.

```js
// Example snippet for integration in the argument parser
// Assume args is an object parsed from process.argv
if (args.export && typeof args.export !== 'string') {
  console.error('Error: --export must be followed by a valid file path.');
  process.exit(1);
}
```

## Implementation Details

- **Data Evaluation:** After processing the mathematical expression (for example, with the existing `--expression` and `--range` options), compute the time series data. This data should consist of rows where each row contains the x value and the computed y value.

- **CSV Generation:** Convert the computed time series data into CSV format. For instance, the first row can include headers `x,y`, followed by rows of data. You can implement a simple CSV string generation without requiring additional dependencies.

- **File Output:** If the `--export` flag is active, write the CSV string to the specified file path. If no file path is provided or the flag is absent, the functionality should be bypassed without affecting the other plotting and statistic functions.

## Testing Enhancements

- Update the test suite in `tests/unit/main.test.js` to verify the following:
  - When the `--export` flag is supplied with a valid file path, the CLI processes the export correctly with the expected CSV format.
  - In the absence of `--export`, no export routine is invoked.
  - The CSV data includes a header row (e.g., `x,y`) and correctly formatted rows corresponding to the computed data.

## Documentation Updates

- Update `README.md` to document the new `--export` functionality. The documentation should include usage examples, such as:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" --export output.csv
```

## Dependency and Build Consistency

- This feature does not introduce new dependencies. CSV generation can be accomplished with a few lines of code using built-in JavaScript functions. Ensure that any changes made remain fully compatible with Node 20 and the ECMAScript module standards.

- Update all relevant sections in `CONTRIBUTING.md` and `MISSION.md` to reflect this new export capability, emphasizing that the tool now supports a full cycle of computing and exporting time series data.
