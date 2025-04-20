# Expression Extension Enhancement

This update extends the expression evaluation support within the CLI tool. In addition to the original `y=sin(x)` functionality, the CLI now supports additional trigonometric expressions: `y=cos(x)` and `y=tan(x)`. This enhancement aligns with our goal of being a go-to plot library by providing users with more flexibility in generating time series data from simple mathematical expressions.

## Overview

- **Extended Expression Support:** The CLI now recognizes and evaluates `y=cos(x)` using `Math.cos(x)` and `y=tan(x)` using `Math.tan(x)`, in addition to the existing `y=sin(x)` evaluation. Any unsupported expression defaults to `y=0`.
- **User Benefit:** Users can now generate time series data for cosine and tangent functions, offering a broader set of mathematical visualizations without requiring changes to the expression input format.

## Implementation Details

### Source Code Changes (src/lib/main.js)

- **Function Update:** Modify the `generateTimeSeriesData` function to recognize multiple expressions. Update the conditional logic as follows:
  ```js
  if (expression === "y=sin(x)") {
    y = Math.sin(x);
  } else if (expression === "y=cos(x)") {
    y = Math.cos(x);
  } else if (expression === "y=tan(x)") {
    y = Math.tan(x);
  } else {
    // Default behavior for unsupported expressions
    y = 0;
  }
  ```
- **Error Handling:** Ensure that the function still throws an error if the range format is invalid.

### Test Enhancements (tests/unit/main.test.js)

- **Extended Tests:** Add test cases to validate that when the CLI is invoked with `--expression "y=cos(x)"` or `--expression "y=tan(x)"`, the generated data reflects the appropriate mathematical evaluation. Verify that the computed `y` values are within the expected numerical bounds.

### Documentation Updates (README.md & MISSION.md)

- **README Update:** Include examples in the README demonstrating usage of the new expressions. Example:
  ```sh
  node src/lib/main.js --expression "y=cos(x)" --range "x=0:6.28" --file output.svg
  ```
- **Mission Alignment:** Update mission and contributing documents to reference the new expression capabilities, underscoring our commitment to versatile formula visualization.

## Conformance with Guidelines

- The changes are confined to the source file, tests, and documentation, adhering to repository guidelines.
- This enhancement is achievable within the current repository scope and is distinct from existing features.

## Usage Example

- For sine:
  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.csv
  ```
- For cosine:
  ```sh
  node src/lib/main.js --expression "y=cos(x)" --range "x=0:6.28" --file output.csv
  ```
- For tangent:
  ```sh
  node src/lib/main.js --expression "y=tan(x)" --range "x=0:6.28" --file output.csv
  ```

This update further strengthens our library's flexibility in generating plots from mathematical expressions.
