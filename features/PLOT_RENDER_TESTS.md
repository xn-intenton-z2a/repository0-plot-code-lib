# Overview

Enhance the test suite to verify that the renderPlot function produces correct SVG and PNG outputs, and update documentation with concrete rendering examples to guide users on generating and inspecting plots.

# Unit Tests

• Create tests/unit/render-plot-svg.test.js
  - Import renderPlot from src/lib/main.js (or src/lib/plot.js if separated).
  - Use a small, deterministic data set (for example x coordinates [0, 1, 2]) and call renderPlot(data, { format: 'svg' }).
  - Assert the returned string begins with `<svg` and contains expected `<path>` elements matching the data set.
  - Use snapshot testing to capture and compare the full SVG markup for regression detection.

• Create tests/unit/render-plot-png.test.js
  - Import renderPlot and the Sharp conversion logic.
  - Generate SVG via renderPlot for the sample data set, then convert it to a PNG buffer using Sharp.
  - Assert the PNG buffer begins with the PNG signature bytes (\x89PNG\r\n\x1a\n).
  - Optionally, capture a small snapshot of pixel data metadata to detect rendering regressions.

# Integration Tests

• Create tests/integration/cli-render-svg.test.js
  - Spawn the CLI with arguments: --expression "y=x" --range 0:2 --format svg --output temp.svg.
  - Wait for process completion, then read temp.svg.
  - Assert the file contents start with `<svg` and match a brief regex for path commands.
  - Clean up temp.svg after assertion.

• Create tests/integration/cli-render-png.test.js
  - Spawn the CLI with arguments: --expression "y=x" --range 0:2 --format png --output temp.png.
  - Wait for process completion, then read temp.png.
  - Assert the first eight bytes match the PNG signature.
  - Clean up temp.png after assertion.

# Documentation Updates

• In USAGE.md, add a section "Rendering Examples" that shows:
  - A CLI command to generate an SVG plot and an excerpt of the resulting `<svg>` markup.
  - A CLI command to generate a PNG plot and note how to inspect the first bytes of the file.

• In README.md under Examples, include:
  - `node src/lib/main.js --expression "y=sin(x)" --range 0:6.28 --format svg --output plot.svg` and show a truncated SVG preview.
  - `node src/lib/main.js --expression "y=cos(x)" --range 0:6.28 --format png --output plot.png` and indicate the PNG file signature bytes.