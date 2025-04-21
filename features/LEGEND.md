# LEGEND Feature Enhancement

This feature introduces a new CLI flag (`--legend`) to enable the inclusion of a legend in the generated plot outputs (SVG and PNG). When enabled, a legend box is rendered on the plot and displays descriptive text about the plotted data. The legend can either show a default label derived from the mathematical expression or a custom label provided by the user.

# Overview

- **Objective:** Provide users with a visual reference that identifies the data series in the plot. This is particularly useful when multiple expressions (or potential future upgrades) are introduced or when the default expression needs additional context.
- **Benefit:** Enhances plot interpretability and overall presentation. It becomes easy to understand what the plotted curve represents without consulting external documentation.
- **Usage Example:**
  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.svg --legend "Sine Wave"
  ```

# Implementation Details

- **CLI Parameter Parsing & Validation:**
  - Extend the argument parser in `src/lib/main.js` to include an optional parameter `--legend`. The value may be a string describing the legend text. If omitted, a default legend such as the expression itself (e.g., "y=sin(x)") will be used.
  - Validate that the legend text is a non-empty string if provided.

- **SVG/PNG Generation Updates:**
  - In the function that generates the SVG content (e.g., `generateSvgContent`), add logic toward the end to render a legend box. This may be implemented with an SVG `<rect>` element for background and a `<text>` element for the legend text.
  - Position the legend in a non-intrusive area (for example, the top-right corner) with a suitable offset from the margins.
  - Ensure that when converting the SVG to PNG (via sharp), the legend appears as expected.

- **Customization Options:**
  - Provide sensible defaults (e.g., default legend font size, color, and box background). Future iterations may allow these to be customized further via additional CLI options.

# Testing Enhancements

- **Source File Tests:**
  - Update tests in `tests/unit/main.test.js` to simulate invoking the CLI with the `--legend` flag.
  - Verify that the generated SVG content contains the legend group elements (e.g., `<rect>` and `<text>`) with the expected legend text.

- **Documentation Updates:**
  - Update `README.md` to document the new `--legend` CLI option with usage examples.

# Conformance with Mission and Guidelines

- **Repository Impact:** All changes are confined to existing source files, unit tests, and documentation, following the repository guidelines.
- **Mission Alignment:** This feature strengthens the mission to be the go-to plot library by making visual reports more self-contained and easier to interpret.
