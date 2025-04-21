# THEME Feature Enhancement

This feature adds a new CLI flag `--theme` to allow users to select a predefined visual theme for the generated plots. Instead of manually specifying individual style options such as line color or background color, users can choose from a set of predefined themes (e.g. DARK, LIGHT, SOLARIZED) that automatically set consistent styling for the SVG or PNG output.

## Overview

- **Objective:** Enable users to easily switch between predefined visual styles with a single flag, making the plots immediately more aesthetically consistent.
- **Benefit:** Reduces the need for multiple custom style flags. It enhances user experience by offering a set of polished themes that update background, axis, and plot colors automatically.
- **Usage Example:**
  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg --theme DARK
  ```

## Implementation Details

### Source Code Changes (src/lib/main.js)

- **CLI Flag Addition:**
  - Extend the simple argument parser to detect `--theme` followed by a theme name (case-insensitive). Valid options include: `dark`, `light`, and `solarized`.

- **Style Overrides:**
  - When a theme is specified, override default styling parameters. For example:
    - **Dark Theme:** Set background fill to a dark color (e.g. `#222`), line color to a bright color (e.g. `#4CAF50`), and axis labels to light colors.
    - **Light Theme:** Use a white or light background with dark text and lines as defaults.
    - **Solarized Theme:** Apply a solarized palette for background, text, and plot elements.

- **Plot Generation Adjustments:**
  - In the SVG generation branch, check if a theme is provided and insert corresponding `<text>` elements for titles and adjust `<line>`, `<polyline>`, and `<circle>` attributes with theme-specific colors.
  - If the output file is PNG, the generated SVG (with theme-based styling) will be converted via sharp.

### Test Enhancements (tests/unit/main.test.js)

- **New Test Cases:**
  - Add tests to simulate CLI invocation with the `--theme` flag and verify the produced SVG content contains the expected theme-specific color values (e.g., for DARK theme, verify that the background or axis elements have the dark color code).
  - Confirm that when a theme is provided along with other custom style flags (if any), the theme takes precedence.

### Documentation Updates (README.md)

- Update the README to include a section on theme selection.
- Provide usage examples and describe the available themes and their visual effects.

## Conformance with Mission and Guidelines

- **Compliance:** All modifications are confined to updating source files, tests, and documentation. No new files are created or deleted.
- **Mission Alignment:** This feature supports the mission of being a go-to plot library by enhancing the aesthetic and usability of plot outputs through thematic visualization options.

