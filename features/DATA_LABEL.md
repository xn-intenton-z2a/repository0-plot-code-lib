# DATA_LABEL Feature Enhancement

This feature adds a new CLI flag, `--data-label`, which enables the display of numeric labels next to each plotted data point in the generated SVG (and PNG) output. When activated, the tool annotates each marker with its corresponding y-value (or the data value) in a small text element positioned nearby. This enhancement provides immediate data insight directly on the plot and increases the interpretability of the visualization.

# Overview

- **Objective:** Allow users to quickly see the value of each data point without having to infer it from the axis scales.
- **Benefit:** Improves usability when precise values are required, aiding in data analysis and presentation.
- **Usage Example:**
  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.svg --data-label true
  ```

# Implementation Details

- **Source Code Changes (src/lib/main.js):**
  - Extend the simple CLI argument parser to include a new optional flag `--data-label` (boolean). When the flag is present, store a variable (e.g. `dataLabel = true`).
  - In the SVG (and PNG) generation branch, after drawing the marker (circle) for each data point, add a corresponding `<text>` SVG element that displays the y-value (or other desired value) near the marker. Positioning should be offset slightly to avoid overlap with the marker.
  - Ensure that the inclusion of text labels does not interfere with the existing structure of the SVG and that it scales appropriately with different numbers of points and marker sizes.

- **Error Handling & Fallbacks:**
  - If an invalid value is provided for `--data-label`, default to no labels.
  - Maintain full backward compatibility when this flag is not provided.

# Testing Enhancements

- **Test File Updates (tests/unit/main.test.js):**
  - Add test cases that simulate running the CLI with the `--data-label` flag enabled.
  - Verify that when the flag is active, the generated SVG string contains additional `<text>` elements corresponding to data point labels. These elements should include numerical values that match (or approximate) the computed y-values.
  - Ensure that when `--data-label` is not provided, no such `<text>` elements (beyond the title and axis labels) are present near the markers.

# Documentation Updates

- **README.md:**
  - Update the documentation to include a section describing the new `--data-label` flag.
  - Provide a usage example and explain that enabling this feature will annotate each data point with its numeric value.
  - Explain any limitations or recommended usage scenarios (e.g. using it with a moderate number of data points to avoid clutter).

# Conformance with Mission and Guidelines

- This enhancement is fully achievable within the current repository as it only changes the source file, test file, README, and if needed, minor updates to dependencies. It adheres to the repository guidelines and reinforces the mission to provide precise, go-to visualizations for mathematical expressions.
