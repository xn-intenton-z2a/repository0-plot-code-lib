# Overview
This enhancement extends the expression evaluation support within the CLI tool. Currently, the tool only processes the simple expression "y=sin(x)". With this update, users will be able to supply additional basic trigonometric expressions, specifically "y=cos(x)" and "y=tan(x)", which will be evaluated using JavaScript's Math.cos() and Math.tan() functions respectively.

# Implementation Details
- **Source Code Update (src/lib/main.js):**
  - Modify the `generateTimeSeriesData` function to recognize the new expressions. For example:
    - If the expression is "y=sin(x)", compute using Math.sin(x).
    - If the expression is "y=cos(x)", compute using Math.cos(x).
    - If the expression is "y=tan(x)", compute using Math.tan(x) with appropriate handling for extreme values (or potential undefined outputs).
  - Maintain the default behavior (return y = 0) for unsupported expressions.

# Testing Enhancements
- **Test File Update (tests/unit/main.test.js):**
  - Add tests to validate that when "y=cos(x)" is used, the generated data points reflect Math.cos(x) for a given range.
  - Similarly, verify that "y=tan(x)" returns values computed from Math.tan(x), ensuring that the test handles edge cases appropriately.

# Documentation Updates
- **README.md:**
  - Update the usage examples and documentation to list the supported expressions: "y=sin(x)", "y=cos(x)", and "y=tan(x)".

# Conformance and Mission Alignment
- This feature enhancement supports the mission of becoming a go-to plot library by increasing the flexibility in mathematical expression evaluation, thereby providing users with more options for generating accurate time series data from simple expressions.
