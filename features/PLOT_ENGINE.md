# Overview

Extend the CLI to support a dedicated plot subcommand that generates SVG or PNG visualizations from mathematical expressions over a numeric range. This feature lays the foundation for advanced styling, overlays, and HTTP rendering in future iterations while delivering core plotting functionality.

# CLI Plot Subcommand

Add a new top-level CLI subcommand plot:

Flags:
- --expression <expression>    Required mathematical expression in the form y=…
- --range <axis>=<min>:<max>   Required numeric range string (e.g., x=0:10)
- --format <svg|png>           Required output image format
- --output <path>              Required file path to write the generated image

Behavior:
1. Inspect argv[0] for plot and invoke runPlotCli with remaining args
2. Parse flags using parseArgs and validate presence and formats of expression, range, format, and output; on validation failure print descriptive error and exit code 1
3. Interpret range string via parseRange into axis, min, and max
4. Sample the expression with generateData using default 100 points or a samples flag in future
5. Render chart configuration:
   - SVG: build a ChartJS configuration and call QuickChart HTTP API or embedded SVG builder
   - PNG: generate an SVG first then rasterize to PNG via sharp
6. Write resulting image file to the given output path
7. Set process.exitCode to 0 on success, 1 on any error

# Implementation

- In src/lib/main.js add runPlotCli to handle parseArgs, parseRange, generateData, rendering and file output
- In main(), dispatch to runPlotCli when the first argument is plot
- Reuse existing mathjs, generateData, and parseRange utilities
- Use QuickChart API or internal SVG builder for chart markup
- Employ sharp to convert SVG to PNG for format=png

# Testing

- Create tests in tests/unit/plot-generation.test.js
- Test that running main(["plot", flags…]) writes an SVG file starting with <svg
- Test that PNG output file begins with PNG signature (0x89 0x50 0x4E 0x47)
- Verify missing required flags produce exit code 1 and appropriate stderr messages

# Documentation

- Update USAGE.md and README.md to include the plot subcommand syntax and minimal examples for SVG and PNG output
- Illustrate usage with repository0-plot-code-lib plot --expression "y=sin(x)" --range "x=0:6.28" --format svg --output plot.svg