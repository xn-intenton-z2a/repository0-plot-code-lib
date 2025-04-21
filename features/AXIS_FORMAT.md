# AXIS_FORMAT Feature Enhancement

This feature introduces custom formatting options for the x-axis and y-axis tick labels in the generated plots. Users can specify formatting strings or functions via CLI flags (e.g. `--x-format` and `--y-format`) to control how numerical or date values are displayed on the axes. By providing this flexibility, plots become more readable and tailored to different domains (e.g., financial, scientific, or date/time data).

## Overview

- **Objective:** Enhance the visualization output by allowing custom formatting of axis tick labels.
- **Benefit:** Tailor the appearance of tick labels, improving readability and making it easier to interpret numeric and date values in the plot.
- **Impact:** Users can now customize the formatting without post-processing the generated output, staying true to the mission of being the go-to tool for formula visualisations.

## Implementation Details

1. **CLI Integration:**
   - Extend the argument parser in `src/lib/main.js` to recognize two new optional flags: `--x-format` and `--y-format`.
   - If these flags are provided, store the formatting strings (or JSON-encoded functions for advanced usage) so that they can be applied during SVG generation.

2. **Source Code Modification:**
   - Update the `generateSvgContent` function in `src/lib/main.js`.
   - For axis label generation (for both tick values on the x-axis and y-axis), check if a custom format is provided.
   - Apply the formatting using JavaScript’s `Intl.NumberFormat` API (for numbers) or a custom function if provided by the user.
   - For example, if `--x-format` is set to a string like `".2f"`, format tick values to two decimal places. Alternatively, support date formatting if the x-axis represents dates.

3. **Testing Enhancements:**
   - Update tests in `tests/unit/main.test.js` to simulate CLI invocations with `--x-format` and `--y-format` flags.
   - Verify that the generated SVG output contains axis labels formatted according to the provided format options.
   - For example, check that numeric tick labels appear with exactly two decimal places when the format string is ".2f".

4. **Documentation Updates:**
   - Modify `README.md` to include documentation for the new CLI flags `--x-format` and `--y-format`.
   - Provide usage examples demonstrating how to customize tick label formatting:
     ```sh
     node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.svg --x-format ".2f" --y-format ".1f"
     ```
   - Explain that these options enable users to achieve consistent and tailored presentation of tick values.

## Conformance with Mission and Guidelines

- **Repository Impact:** All modifications are restricted to the existing source file (`src/lib/main.js`), test file (`tests/unit/main.test.js`), and `README.md`. No new files are created or deleted.
- **Mission Alignment:** By allowing custom axis formatting, the library becomes even more user-friendly and versatile, reinforcing its mission as the go-to tool for formula visualisations.
- **Achievability:** This feature is implementable within a single repository update and provides immediate value with minimal code overhead.