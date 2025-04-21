# ASCII_PLOT Feature Enhancement

This feature introduces a new CLI flag, `--ascii`, which enables the tool to output a simple ASCII-based plot of the computed time series data directly to the console. This provides users with a quick, textual preview of their plotted data without needing to generate external files (like SVG or PNG).

# Overview

- **Objective:** Provide a fast and lightweight visualization option via ASCII art, allowing users to quickly inspect the trend of their data in the terminal.
- **Benefit:** Enhances accessibility of the CLI tool by offering an immediate, low-overhead visual representation that complements file-based outputs.

# CLI Parameter Parsing & Validation

- Extend the argument parser in `src/lib/main.js` to include an optional boolean flag `--ascii`.
- When the `--ascii` flag is detected, the tool bypasses (or complements) file generation to instead output an ASCII plot to stdout.
- Ensure that the flag is mutually exclusive with any conflicting output mode if required (or simply add to the output without interfering with other functionalities).

# Implementation Details

- **Data Processing:** 
  - Generate the time series data as usual from the provided mathematical expression and range.
  - Determine the minimum and maximum y-values to set up a vertical scale (for example, a fixed height of 20 rows).
  - Map each computed y-value to a corresponding row index based on the scale.
- **ASCII Plot Generation:**
  - For each data point, create a line of text of fixed width (e.g., 50 characters).
  - Place a marker character (such as `*`) at the horizontal position corresponding to the normalized y-value.
  - Other positions can be filled with spaces to form a simple visual plot.
- **Output:**
  - Print the generated ASCII plot line-by-line to stdout.

# Testing Enhancements

- Update the unit tests in `tests/unit/main.test.js` to include a scenario where the `--ascii` flag is provided.
- Verify that the console output contains expected ASCII chart patterns (e.g., presence of `*` characters arranged in a line plot).
- Ensure that no file write operations occur when the `--ascii` flag is active (or if combined, that the ASCII output is clearly printed to stdout).

# Documentation Updates

- Update `README.md` to document the new `--ascii` flag with usage examples:
  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --ascii
  ```
- Explain that this flag provides an immediate, text-based visualization of the computed time series data.

# Conformance with Mission and Guidelines

- The ASCII_PLOT feature aligns with the mission to be a go-to plot library by adding a quick, alternative visualization mode.
- All modifications are confined to existing source files, test files, the README, and dependency files if needed, adhering to repository contribution guidelines.
- This feature is distinct and enhances usability without overlapping existing features like SVG, PNG, or JSON exports.