# Overview

Finalize and validate renderPlot functionality and CLI plot commands to ensure consistent and correct SVG output and seamless PNG conversion via sharp. Add comprehensive unit tests for the plot rendering logic and integration tests for CLI usage. Update USAGE.md and README.md with examples covering both file-based and stdout-based rendering for SVG and PNG.

# Unit Tests

Create tests/unit/plot-rendering.test.js:

• Test that renderPlot returns a valid SVG string:
  Provide a small data array and call renderPlot with default options. Assert the returned string starts with <svg, includes width and viewBox attributes matching defaults, and contains a <path element with a properly formatted d attribute.

• Test renderPlot with custom width, height, and margin:
  Call renderPlot with options width 400, height 300, margin 20. Assert the SVG header reflects width and height 400 and 300, viewBox updated to "0 0 400 300", and path commands scaled within those bounds.

• Test PNG conversion via sharp:
  Use renderPlot to produce an SVG string, convert it to a PNG buffer using sharp. Assert the first eight bytes of the buffer match the PNG signature [137,80,78,71,13,10,26,10].

# Integration Tests

Create tests/unit/cli-plot-integration.test.js:

• generates SVG file via CLI
  - Spawn the CLI with arguments --expression y=x --range 0:1 --format svg --output temp.svg
  - Assert exit code is 0
  - Assert fs.existsSync(temp.svg) is true
  - Read the file and assert it begins with <svg
  - Clean up temp.svg

• writes SVG to stdout
  - Spawn the CLI with --expression y=x --range 0:1 --format svg and no --output
  - Capture stdout and assert it starts with <svg

• generates PNG file via CLI
  - Spawn with --expression y=x --range 0:1 --format png --output temp.png
  - Assert exit code is 0
  - Assert fs.existsSync(temp.png) is true
  - Read the first eight bytes and assert PNG signature
  - Clean up temp.png

• writes PNG to stdout
  - Spawn with --expression y=x --range 0:1 --format png and no --output
  - Capture stdout as Buffer and assert first eight bytes match PNG signature

# Documentation Updates

In USAGE.md under "Generating Plots":

- Add examples showing CLI rendering to a file for SVG and PNG
- Add examples showing CLI rendering to stdout when --output is omitted

In README.md under "Examples":

### CLI Rendering Examples

Show commands for SVG and PNG to file and notes on verifying output

### Programmatic Rendering Examples

Demonstrate import of renderPlot, generating SVG with custom options, and converting to PNG via sharp, including code snippets.