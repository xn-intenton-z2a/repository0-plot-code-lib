# CLI_PLOTTING

## Overview
This update refines the existing CLI plotting functionality by implementing robust command-line parameter parsing and integrating the mathjs library to process mathematical expressions into a dummy SVG plot. It ensures the tool behaves predictably under both valid and fallback input scenarios, aligning with our mission of being the go-to CLI for formula visualisations.

## Source Code Changes
- Modify `src/lib/main.js` to:
  - Parse command-line arguments for `--expression`, `--range`, and `--file` using a modern parsing approach.
  - Evaluate the mathematical expression using mathjs over the provided range. 
  - Generate a dummy SVG output based on the computed values.
  - Simulate file-saving operations when the `--file` parameter is passed. 
  - Maintain backward compatibility by logging input arguments if plotting parameters are absent.

## Testing
- Update `tests/unit/main.test.js` to add test cases for:
  - Valid usage with proper `--expression` and `--range` that results in a dummy SVG output.
  - Presence of the `--file` parameter triggering a simulated file save log message.
  - Scenarios where arguments are missing or incomplete, ensuring graceful handling of defaults.

## Documentation
- Update `README.md` to include modern usage examples:
```bash
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.svg
```
- Provide detailed documentation on both the new interactive plotting functionality and the fallback behavior.

## Dependencies
- Confirm that all required libraries, notably mathjs, are correctly listed in `package.json`.

This refined feature will ensure that the CLI tool meets user needs for both interactive plotting and robust command-line input handling within a single repository setup.