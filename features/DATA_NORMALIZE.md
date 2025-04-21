# DATA_NORMALIZE Feature Enhancement

This feature introduces a new CLI flag, `--normalize`, which automatically normalizes the computed time series data. When enabled, the tool will scale all y-values to the range [0, 1] after generating them from the provided mathematical expression and range. This normalization can help users compare plots on a common scale and facilitate further data processing.

# Overview

- **Objective:** Add an optional normalization step to the data generation process so that all y-values are scaled between 0 and 1.
- **Benefit:** Offers a consistent scale for visualizations and simplifies analyses where relative differences are more important than absolute values.

# Implementation Details

- **CLI Integration & Argument Parsing:**
  - Extend the CLI parser in `src/lib/main.js` to include a new boolean flag `--normalize`.
  - If `--normalize` is detected, after generating the time series data via the `generateTimeSeriesData` function, compute the minimum and maximum y-values from the data.
  - Normalize each y-value using the formula: 
    
    ```js
    normalized_y = (y - minY) / (maxY - minY)
    ```
  - Use the normalized data for subsequent operations, including CSV, SVG, PNG, PDF, and JSON exports.

- **Source Code Modifications:**
  - Update the main execution flow in `src/lib/main.js` to check for the `--normalize` flag and apply the normalization transformation to the generated data array.
  - Ensure that if multiple data series are present (for overlay plots), the normalization is applied per series or across all series consistently (document the chosen approach).

- **Testing Enhancements:**
  - Update `tests/unit/main.test.js` by adding unit tests verifying that when the `--normalize` flag is provided, the resulting data has all y-values within the range [0, 1].
  - Include tests that check the CSV output and the SVG output to validate that normalization is correctly applied.

- **Documentation Updates:**
  - Update `README.md` to document the new `--normalize` flag. Provide usage examples such as:

    ```sh
    node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --normalize --file output.svg
    ```
  - Explain how normalization adjusts the y-values and the benefits of viewing data on a [0, 1] scale.

# Conformance with Guidelines

- **Repository Constraints:**
  - All modifications will be limited to existing source files, test files, and documentation (README.md). No new files will be created or deleted.
- **Mission Alignment:**
  - The addition of data normalization supports the mission to be the go-to plot library by providing enhanced flexibility for visualizing mathematical expressions. It adds immediate, achievable value by standardizing the output scale for easier interpretation.
