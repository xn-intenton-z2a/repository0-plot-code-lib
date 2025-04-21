# DATA_DERIVATIVE Feature Enhancement

This feature introduces a new CLI flag `--derivative` that computes and displays the first derivative of the generated time series data. By applying numerical differentiation to the computed y-values with respect to x, users can gain insight into the rate of change of the plotted function. This supports a deeper analysis of trends and inflection points, aligning with our mission of becoming the go-to plot library for formula visualisations.

## Overview

- **Objective:** Provide an option to calculate and visualize the derivative of the computed time series data. This derivative data can be output in the same formats as the original data (CSV, JSON, SVG, PNG, PDF).
- **Benefits:** Allows users to instantly observe rates of change (e.g. slopes, acceleration) within their plots, enhancing analytical capabilities without requiring external tools.
- **Usage Examples:**
  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --derivative --file output_derivative.svg
  node src/lib/main.js --expression "y=x^2" --range "x=-10:10" --derivative --file output_derivative.csv
  ```

## Implementation Details

- **Source Code Changes (src/lib/main.js):**
  - Extend the argument parser to include an optional boolean flag `--derivative`.
  - After generating the primary time series data from the provided expression:
    - Compute the derivative using a simple finite difference method. For each consecutive pair of points, estimate `dy/dx = (y[i+1] - y[i]) / (x[i+1] - x[i])`.
    - Generate a new array of data points representing the derivative. (Optionally, set the derivative for the first point equal to the derivative computed between the first two points.)
  - Allow the derivative data to be included in the output file. If the output file extension is one of CSV, JSON, SVG, etc., use the derived data instead of or in addition to the original data.
  - Update the plotting routine to optionally plot the derivative curve (or output it in CSV/JSON) when the `--derivative` flag is active.

- **Test File Changes (tests/unit/main.test.js):**
  - Add unit tests that call `generateTimeSeriesData` followed by a derivative computation routine.
  - Validate that the computed derivative approximates the mathematical derivative of the function over the range.
  - Ensure that providing the `--derivative` flag results in altered output (for example, the CSV output starts with derivative values rather than raw function values).

- **Documentation Updates (README.md):**
  - Include a new section that describes the `--derivative` flag, with concrete examples showing both plotting and CSV output for derivative data.
  - Explain the benefit of having derivative plots in quickly assessing the rate of change.

## Conformance with Mission and Guidelines

- All modifications are confined to the existing source file, test file, and README file. No new files are created or deleted.
- This feature enriches our CLI tool by adding analytical value, empowering users with an extra layer of visualisation that complements the existing plotting capabilities.
