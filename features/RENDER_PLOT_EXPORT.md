# RENDER_PLOT_EXPORT

## Purpose
Enable robust SVG and PNG export for renderPlot with comprehensive tests and clear usage examples, ensuring users can generate and verify graphical outputs with confidence.

# Source Changes
1. In src/lib/main.js:
   - Retain existing ChartJSNodeCanvas and Chart imports and batch rendering logic.
   - Ensure renderPlot(seriesData, options) returns a Promise resolving to a Buffer for PNG or a string for SVG when called programmatically.
   - Add an optional callback or event emitter to signal when rendering completes for integration tests.
2. In package.json:
   - No changes needed; chart.js and chartjs-node-canvas dependencies already present.
3. Retain CLI flags: --format <svg|png>, --batch-size, --max-points.

# Test Changes
1. Unit Tests (tests/unit/plot-generation.test.js):
   - Add tests for renderPlot API:
     a. Call renderPlot with a small seriesData array and format svg; expect returned string to start with '<svg'.
     b. Call renderPlot with small seriesData and format png; expect returned Buffer to start with PNG signature (0x89,0x50,0x4e,0x47).
   - Mock ChartJSNodeCanvas to simulate rendering path and verify correct width, height, and format options passed.
2. Integration Tests (new file or extend tests/unit/main.test.js):
   - Simulate CLI invocation:
     a. Invoke main(['--flow-sync','--start','0','--end','2','--step','1','x','--format','svg']) and capture stdout; write to a temp .svg file; validate file contains '<svg'.
     b. Invoke main([...,'--format','png']) and write to temp .png; validate file size > 0 and Buffer signature matches PNG.
   - Clean up temp files after tests.

# Documentation Changes
1. USAGE.md:
   - Document example commands for exporting SVG and PNG:
     node src/lib/main.js --flow-sync --start 0 --end 10 --step 1 x --format svg > plot.svg
     node src/lib/main.js --flow-sync --start 0 --end 10 --step 1 x --format png > plot.png
   - Explain how to load plot.svg in browser or plot.png in image viewers.
2. README.md:
   - Add section "Rendering Examples":
     - Show CLI commands and preview snippets of SVG output.
     - Note that PNG files can be directly opened in standard viewers.

# Dependencies
No new dependencies; leverage chart.js and chartjs-node-canvas already defined.

# Backward Compatibility
Default behavior remains unchanged when --format=json or no format flag supplied; JSON output is preserved.

# Alignment with Mission
Enhances core visualization capabilities, solidifying the library as the go-to CLI tool for formula-driven plot exports.