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
