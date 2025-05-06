# Overview

Add robust unit and integration tests for renderPlot functionality covering SVG and PNG outputs, and enhance user documentation with concrete rendering examples.

# Source File Updates

No changes to the implementation in src/lib/main.js. Tests will mock ChartJSNodeCanvas to simulate real rendering without modifying the stubbed renderPlot.

# Tests

Unit tests in tests/unit/plot-generation.test.js

- Mock ChartJSNodeCanvas.prototype.renderToBuffer to return a Buffer beginning with the PNG magic bytes when format png is requested, and a Buffer containing an <svg tag for format svg.
- Write tests for renderPlot:
  - Call renderPlot with data array and options format png, width, height, labels. Assert it resolves with a Buffer whose first bytes match PNG magic number.
  - Call renderPlot with format svg. Assert it resolves with a string starting with <svg.
  - Call renderPlot with an unsupported format 'pdf' and assert it rejects with an error about unsupported formats.

Integration tests in tests/unit/plot-generation.test.js

- Spy on process.stdout.write and fs.writeFileSync:
  - Run main with --expression, --range, --plot-format svg without --output. Assert process.stdout.write is called once with the SVG string and exit code 0.
  - Run main with --plot-format png and --output output.png. Assert fs.writeFileSync is called with 'output.png' and a Buffer whose first bytes match the PNG magic number and exit code 0.
  - Simulate renderPlot throwing an error and verify main returns exit code 1 and writes error to stderr.

# Documentation

Update USAGE.md and README.md

- USAGE.md:
  - Add CLI example for svg rendering: repository0-plot-code-lib --expression "x^2" --range "x=0:10:1" --plot-format svg --output plot.svg and show sample snippet of the SVG XML beginning with <svg.
  - Add CLI example for png rendering: repository0-plot-code-lib --expression "sin(x)" --range "x=0:6.28:0.1" --plot-format png > plot.png and note binary output.

- README.md:
  - Under Features, add entries for SVG and PNG plot generation with command examples.
  - In Programmatic API, show code calling renderPlot with format svg and format png and handling returned string or Buffer.
  - Link to renderPlot API reference in documentation section.