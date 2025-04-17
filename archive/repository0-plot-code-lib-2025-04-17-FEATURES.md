features/CLI_ENHANCEMENTS.md
# features/CLI_ENHANCEMENTS.md
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
features/REMOVE_NAN.md
# features/REMOVE_NAN.md
# REMOVE_NAN Feature Specification

This feature removes all explicit mentions of NaN and associated validation logic from the repository. The intent is to simplify the code by relying on JSON serialization to handle non-numeric values without manual intervention.

## Overview

- **Purpose:**
  - Remove any explicit checks for non-numeric values (previously detecting NaN) and all references to NaN in comments, tests, and documentation.
  - Rely on the default behavior of JSON.stringify to convert non-numeric results (such as NaN) to null.
  - Simplify the code and documentation while maintaining expected functionality.

## Implementation

### Source Code Changes (src/lib/main.js)

- Remove the conditional check that explicitly tests for NaN or non-numeric values. 
- Update related comments to remove any mention of NaN or validation of numeric results. 

**Before:**

```js
try {
  y = f(x);
  // When evaluating the expression, any result that is not a valid number (including NaN or non-numeric values)
  // is substituted with null to ensure the JSON output remains valid according to JSON standards.
  if (typeof y !== "number" || isNaN(y)) y = null;
} catch (e) {
  y = null;
}
```

**After:**

```js
try {
  y = f(x);
} catch (e) {
  y = null;
}
```

### Test File Updates (tests/unit/main.test.js)

- Rename the test suite from "NaN Handling in Time Series Generation" to "NonNumeric Handling in Time Series Generation".
- Update any comments in this test block to remove the mention of NaN, ensuring it describes handling of non-numeric evaluation results.

**Example Change:**

```js
describe("NonNumeric Handling in Time Series Generation", () => {
  test("should replace non-numeric evaluation results with null to comply with JSON standards", () => {
    // This test ensures that when the evaluated expression returns a non-numeric result,
    // the value is handled by JSON serialization to produce null in the output.
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--expression", "Math.sqrt(-1)", "--range", "x=0:10"]);
    const output = logSpy.mock.calls[0][0];
    let series;
    expect(() => { series = JSON.parse(output); }).not.toThrow();
    expect(Array.isArray(series)).toBe(true);
    expect(series.length).toBe(100);
    series.forEach(point => {
      expect(point.y).toBeNull();
    });
    logSpy.mockRestore();
  });
});
```

### Documentation Updates (README.md)

- Remove any references to NaN in the documentation.
- Update the section formerly titled "Note on NaN Handling" to a more generic note on handling non-numeric evaluation results through JSON serialization.

**Example Change:**

Before:

```markdown
**Note on NaN Handling:**
When the evaluated expression returns NaN (Not a Number) or any non-numeric result, it is automatically substituted with null to ensure valid JSON output.
```

After:

```markdown
**Note on Handling Invalid Values:**
When the evaluated expression returns a non-numeric value, JSON serialization converts it to null. This ensures that the output adheres to JSON standards without the need for manual validation.
```

## Compatibility and Mission Alignment

- This change retains full compatibility with existing functionality while simplifying the implementation.
- It aligns with the project mission of providing a reliable and streamlined CLI tool for generating plots and time series data.
