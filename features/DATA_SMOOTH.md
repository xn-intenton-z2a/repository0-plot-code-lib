# DATA_SMOOTH Feature Enhancement

This feature introduces a data smoothing functionality to the CLI tool. When enabled via a new CLI flag, `--smooth`, the tool will apply a simple moving average to the generated time series data before creating the plot or exporting the data. This helps in reducing noise and producing a smoother curve, which can be especially useful when the raw computed data exhibits high variability.

## Overview

- **Objective:** Implement an optional smoothing transformation on the computed time series. Users can specify a smoothing window size (an integer) via the CLI. If not provided, a default value (e.g. 3) is used.
- **Benefit:** Enhances the readability of plots by reducing noise in the data. This feature is useful when users want a more aesthetically pleasing graph or clearer trend visualization.

## Implementation Details

- **CLI Integration:**
  - Add a new optional flag `--smooth` that accepts a number (window size) as its argument.
  - Parse this option alongside existing parameters (e.g., `--expression`, `--range`, `--file`).

- **Data Processing:**
  - After generating the time series data using the existing `generateTimeSeriesData` function, check if the smooth flag is active.
  - If so, create a new data array by applying a simple moving average filter with the specified window size. For each point `i`, the new y-value is computed as the average of the y-values in the window [i - floor(windowSize/2), i + floor(windowSize/2)], handling boundaries appropriately.

- **Output Handling:**
  - The smoothed data is then passed to the subsequent stages (CSV serialization, SVG/PNG generation, etc.), ensuring that the output reflects the smoothing operation.
  
## Testing Enhancements

- **Unit Tests:**
  - Update `tests/unit/main.test.js` to add scenarios where the `--smooth` flag is provided.
  - Verify that the output data (CSV and SVG) reflects the smoothed values rather than the raw computed values.
  - Include edge cases such as when the window size is larger than the number of data points and when the window size is 1 (which should result in no change).

## Documentation Updates

- **README.md:**
  - Add a section documenting the new `--smooth` flag, including usage examples such as:
    ```sh
    node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --smooth 5 --file output.svg
    ```
  - Explain that the flag applies a simple moving average with a specified window size to reduce noise in the plot.

## Conformance with Guidelines

- All changes are confined to existing source files, test files, and the README, in line with repository contribution guidelines.
- This feature is distinct from existing features such as data filtering, as it transforms the computed data rather than simply excluding data points.
- The goal matches the mission statement by enhancing the usability and aesthetic quality of the generated visualizations.
