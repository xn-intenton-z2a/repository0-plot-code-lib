# CLI_ENHANCEMENTS Feature Specification

This feature upgrades and consolidates the command line interface (CLI) by adding several new options and modes. In addition to the existing support for help output, diagnostics, verbose logging, interactive mode, and pretty print support for JSON outputs, this update adds axis label customization for SVG plots. These enhancements improve user experience and output personalization while maintaining backward compatibility.

## Overview

- **Purpose:**
  - Enhance the CLI experience by providing an interactive mode (`--interactive`) and a pretty print JSON option (`--pretty`), as described previously.
  - Introduce two new options, `--xlabel` and `--ylabel`, which allow users to specify custom labels for the x-axis and y-axis when generating SVG plots.
  - Continue to support existing features including help (`--help`), diagnostics (`--diagnostics`), and verbose logging (`--verbose`).
  - Maintain correct behavior for plot generation (SVG/PNG) and time series JSON data generation.

## Implementation

### Source Code Changes (src/lib/main.js)

- **Axis Labels Support:**
  - When generating an SVG plot (i.e. when the `--file` option ends with `.svg`), check for the optional CLI parameters `--xlabel` and `--ylabel`.
  - If provided, embed the axis labels within the SVG content. For example:
    - If a title is already provided, include a `<title>` element followed by a `<text>` element that displays the axis labels (e.g., `X: [xlabel], Y: [ylabel]`) at a fixed position in the SVG.
    - If no title is provided, still include the axis labels in a `<text>` element, possibly at a position different than the main plot text.
  - Ensure that if these options are not provided, the SVG output remains unchanged.

- **Existing Features:**
  - Retain Interactive Mode: When the `--interactive` flag is detected, the CLI enters a session that prompts the user for the mathematical expression and range.
  - Utilize Pretty Print Option: When the `--pretty` flag is provided, output the JSON time series data in a formatted style using `JSON.stringify(series, null, 2)`.
  - Help, Diagnostics, Verbose Logging: Behavior remains unchanged.

### Test File Updates (tests/unit/main.test.js)

- **New Tests for Axis Labels:**
  - Add tests to simulate SVG generation with `--xlabel` and `--ylabel` options. Verify that the generated SVG file content includes the provided axis labels in the expected format.
  - For example, when calling the CLI with `--file output.svg`, `--xlabel "Time"`, and `--ylabel "Value"`, the SVG content should include a segment such as `<text x="10" y="40">X: Time, Y: Value</text>`.

- **Regression Tests:**
  - Ensure that tests for interactive mode, pretty print, and file generation (both SVG and PNG) continue to pass without interference.

### Documentation Updates (README.md)

- **CLI Usage Section:**
  - Update the documentation to include details on the new `--xlabel` and `--ylabel` options. For instance:
    ```bash
    node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg --xlabel "Time" --ylabel "Amplitude"
    ```
  - Explain that these options allow users to customize axis labels in the SVG plot output.

## Compatibility and Mission Alignment

- The addition of axis label customization builds on the existing CLI enhancements, further personalizing the plot outputs without disrupting current features.
- All changes are restricted to modifications within the source file, test file, README file, and dependency files, ensuring full backward compatibility.
- This update aligns with the mission of making `plot-code-lib` the go-to tool for generating flexible and user-friendly plot visualizations, now with improved personalization options.
