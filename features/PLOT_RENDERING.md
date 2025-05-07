# Overview

Implement the core plotting capability by extending the CLI and library to render time series data into SVG and PNG image files. Add unit tests for the rendering function and integration tests for the full CLI workflow. Update documentation with clear examples showing how to produce both SVG and PNG outputs.

# CLI Interface

--format  Specify the output image format: svg or png.  Defaults to svg if omitted.
--output  Path to the output file.  Required when rendering plots.

# Behavior

1. Extend main(args) in src/lib/main.js to accept format and output parameters.
2. After generating the time series data array, call renderPlot(data, options) to produce an SVG string.
3. If format is png, convert the SVG to PNG using the Sharp library and buffer.
4. Write the resulting image content to the specified output file.
5. Exit with code 0 on success or non-zero on failure.

# Unit Tests

- Create or update tests/unit/plot-rendering.test.js.
- Mock a simple time series data set and verify renderPlot returns a valid SVG string starting with <svg.
- When requesting PNG format, verify the output buffer begins with the PNG signature bytes.
- Use snapshot testing to assert stable SVG structure for a fixed data set.

# Integration Tests

- Extend tests/unit/plot-integration.test.js (or reuse plot-generation.test.js) to:
  • Run the CLI via child_process spawn with format=svg and output=temp.svg, then assert the file exists and its contents start with <svg.
  • Run the CLI with format=png and output=temp.png, then read the file and assert the first eight bytes match the PNG signature.

# Documentation Updates

- In USAGE.md, add a new section “Generating Plots” with example commands and their expected outputs for both SVG and PNG.
- In README.md, under Examples, show CLI invocations for generating an SVG and a PNG plot, referencing the new flags.

# Dependencies

- Add sharp as a dependency to handle SVG-to-PNG conversion.
- Ensure jsdom is not needed; produce SVG directly as a string.

# Examples

node run start -- --expression "y=sin(x)" --range 0:6.28 --format svg --output plot.svg
node run start -- --expression "y=cos(x)" --range 0:6.28 --format png --output plot.png