# Overview
Enhance the plot rendering pipeline by adding comprehensive unit and integration tests for SVG and PNG outputs and update documentation with real-world rendering examples.

# Source File Updates
No changes to the existing renderPlot stub or CLI entrypoint. Tests will mock and stub ChartJSNodeCanvas to simulate rendering behavior.

# Tests

## Unit Tests (tests/unit/plot-render.test.js)

- Stub ChartJSNodeCanvas.prototype.renderToBuffer using vitest's vi.spyOn and mockImplementation to return a Buffer for PNG and a UTF-8 SVG string for SVG.
- Test renderPlot by calling it directly:
  - For options.format = 'png' and width, height, labels provided, verify the return value is a Buffer and matches the mocked buffer.
  - For options.format = 'svg', verify the return value is a string starting with `<svg` and contains axis label elements from options.labels.
  - Test that renderPlot throws an error when an unsupported format is passed.

## Integration Tests (tests/unit/plot-integration.test.js)

- CLI invocation with `--plot-format svg`:
  - Mock fs.writeFileSync and console.log to capture output.
  - Run main with args including expression, range, `--plot-format svg`, and `--output out.svg`.
  - Assert that fs.writeFileSync was called with filename out.svg and a string beginning with `<svg`.
  - Assert that axis labels from CLI options appear in the output.

- CLI invocation with `--plot-format png`:
  - Mock fs.writeFileSync and process.stdout.write to capture Buffer writes.
  - Run main with args including expression, range, `--plot-format png`, without --output to use stdout.
  - Assert that process.stdout.write was called with a Buffer whose first bytes equal the PNG magic number (`0x89 50 4E 47`).
  - Assert exit code 0 on success.

# Documentation Updates

## USAGE.md

- Add real CLI examples for SVG and PNG generation with truncated output samples:
  - Command: `repository0-plot-code-lib --expression "x^2" --range "x=0:10:1" --plot-format svg --output plot.svg`
  - Display first lines of an example SVG file showing `<svg` and axis labels.
  - Command: `repository0-plot-code-lib --expression "x+1" --range "x=0:5:1" --plot-format png > plot.png`
  - Describe PNG magic number verification.

## README.md

- Under Programmatic API, add usage example showing:
  - Calling renderPlot to obtain an SVG string and writing it to a file.
  - Calling renderPlot to obtain a PNG Buffer and writing via fs.writeFileSync or stdout.
- Under Features, update bullet: Plot rendering (SVG/PNG) now fully tested with unit and integration coverage and documented examples.