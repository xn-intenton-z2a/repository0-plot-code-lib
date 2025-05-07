# Overview

Add comprehensive unit tests for the renderPlot function and end-to-end CLI integration tests to verify SVG and PNG output. Update documentation with concrete rendering examples to guide users on producing and inspecting plot files.

# Unit Tests

Create or update tests/unit/plot-rendering.test.js

• Test that renderPlot(data) returns a string starting with <svg and containing a path element.
• Generate a small sample data array, call renderPlot, and assert the SVG string matches basic shape expectations.
• Use Sharp to convert the SVG string to a PNG buffer and assert the first eight bytes equal the PNG magic numbers.

# Integration Tests

Create tests/unit/cli-plot-integration.test.js

• Use spawnSync from child_process to invoke the CLI with --expression y=x --range 0:2 --format svg --output temp.svg
  – Assert exit code is 0
  – Assert fs.existsSync(temp.svg) is true
  – Read file contents and assert it starts with <svg
  – Clean up temp.svg

• Similarly, invoke the CLI with --format png --output temp.png
  – Assert exit code is 0
  – Assert fs.existsSync(temp.png) is true
  – Read first eight bytes and verify they match the PNG signature bytes
  – Clean up temp.png

# Documentation Updates

In USAGE.md under Generating Plots, add examples for both SVG and PNG output with expected output prefixes:

repository0-plot-code-lib --expression "y=sin(x)" --range 0:6.28 --format svg --output plot.svg
Outputs a file starting with <svg

repository0-plot-code-lib --expression "y=cos(x)" --range 0:6.28 --format png --output plot.png
Outputs a file whose first bytes are the PNG signature

In README.md under Examples, add a section Rendering Examples with the two commands above and descriptions of inspecting the generated files.