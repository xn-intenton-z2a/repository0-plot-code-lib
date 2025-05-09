# Overview

Add a new plot subcommand to the CLI that accepts a mathematical formula and generates a simple line plot as an SVG image. This enables users to quickly visualize functions without leaving the terminal.

# CLI Usage

repository0-plot-code-lib plot "<formula>" [options]

Options:
  --output <file>       Path to output SVG file, default plot.svg
  --width <pixels>      Width of the SVG canvas, default 800
  --height <pixels>     Height of the SVG canvas, default 600
  --range <min:max>     Domain for x axis, default -10:10

Examples:
  repository0-plot-code-lib plot "sin(x)" --output sin.svg
  repository0-plot-code-lib plot "x^2 - 3*x + 2" --range -5:5 --width 500 --height 500

# Implementation

1. Detect when the first argument is "plot" in src/lib/main.js.  If so, route to a new plotCommand handler.
2. Parse the formula string and options manually or via a minimal flag parser.  Validate presence of a formula.
3. Add mathjs as a dependency and use it to compile and evaluate the formula over a set of sample points.
4. Generate an SVG polyline path: compute N points evenly spaced across the specified range and join them into an SVG path element.
5. Assemble a complete SVG document with axes and the computed path, respecting width and height.
6. Write the SVG output to the specified file using fs/promises.
7. Exit with status 0 on success or nonzero on parsing or file errors, printing descriptive messages.

# Testing

1. Create tests in tests/unit/plot-command.test.js.  Mock fs/promises to capture write calls.
2. Test correct exit when missing formula or invalid range.
3. Provide a simple formula, invoke main(['plot','x+1','--output','out.svg']), and verify mathjs is called and fs.writeFile is called with an SVG string containing a <polyline>.
4. Test default values: no flags yields plot.svg with default dimensions and range.
5. Ensure errors in evaluation produce nonzero exit and descriptive error output.

# Documentation

Update README.md to include the new plot subcommand in the Usage section and provide examples.  Document plotCommand as part of the public API.