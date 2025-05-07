# Overview
Enhance unit and integration test coverage for renderPlot SVG and PNG output. Ensure tests validate output correctness and CLI behavior.

# Unit Tests
Create tests/unit/render-plot-svg.test.js:
 • Call renderPlot with a simple two point data set and assert the returned string starts with <svg, includes width and viewBox attributes, and contains a path element with valid d attribute.

Create tests/unit/render-plot-custom-options.test.js:
 • Call renderPlot with custom width 400, height 300, margin 20 and assert SVG header reflects width 400, height 300, viewBox 0 0 400 300, and path coordinates scaled accordingly.

Create tests/unit/render-plot-png.test.js:
 • Use renderPlot to produce an SVG string, convert to a PNG buffer via sharp, and assert the first eight bytes of the buffer match the PNG signature [137,80,78,71,13,10,26,10].

# Integration Tests
Create tests/unit/cli-plot-integration.test.js:
 • Spawn the CLI with --expression y=x --range 0:1 --format svg --output temp.svg and assert exit code 0, that temp.svg exists, and its content starts with <svg.
 • Spawn CLI with --expression y=x --range 0:1 --format png --output temp.png and assert exit code 0, that temp.png exists, and its first eight bytes match PNG signature.
 • Run CLI for SVG without --output, capture stdout and assert it starts with <svg.
 • Run CLI for PNG without --output, capture stdout as a buffer and assert first eight bytes match the PNG signature.

# Documentation Updates
In USAGE.md under Generating Plots add examples for SVG and PNG rendering to file and to stdout.
In README.md under Examples add a subsection CLI Rendering Examples showing commands and verification steps, and a Programmatic Rendering Examples snippet demonstrating import of renderPlot and PNG conversion via sharp.