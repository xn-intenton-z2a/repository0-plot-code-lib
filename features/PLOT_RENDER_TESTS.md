# Overview
Enhance the test suite to ensure that the renderPlot function produces correct SVG and PNG outputs by adding comprehensive unit and integration tests for both formats.

# Unit Tests
- Create tests/unit/render-plot-svg.test.js
  - Import renderPlot from src/lib/main.js or src/lib/plot.js (where the function is exported).
  - Provide a small, deterministic time series data set and call renderPlot with format svg.
  - Assert the returned string starts with <svg and includes expected path elements for the data set.
  - Use snapshot testing to capture the SVG structure for regression protection.

- Create tests/unit/render-plot-png.test.js
  - Import renderPlot and Sharp conversion logic.
  - Generate SVG via renderPlot for the sample data set, convert to PNG buffer using Sharp.
  - Assert the PNG buffer begins with the PNG signature bytes (\x89PNG\r\n\x1a\n).

# Integration Tests
- Create tests/integration/cli-plot-svg.test.js
  - Spawn the CLI with --expression "y=x" --range 0:1 --format svg --output temp.svg.
  - Wait for process completion, then read temp.svg.
  - Assert contents start with <svg and match a brief regex for path data.
  - Delete temp.svg after assertion.

- Create tests/integration/cli-plot-png.test.js
  - Spawn the CLI with --expression "y=x" --range 0:1 --format png --output temp.png.
  - Wait for process completion, then read temp.png.
  - Assert the first eight bytes match PNG signature.
  - Delete temp.png after assertion.

# Documentation Updates
- In USAGE.md, add a section "Testing Render Outputs" showing how to run the new test files and interpret results.
