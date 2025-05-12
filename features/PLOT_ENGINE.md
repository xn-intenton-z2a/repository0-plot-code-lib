# Overview
Add a new plot subcommand to the CLI to generate SVG or PNG plots directly from mathematical expressions and numeric ranges.

# CLI plot Command
Usage: repository0-plot-code-lib plot --expression <expression> --range <axis=min:max> --format <svg|png> [--output <path>]

# Flags
- --expression (required): mathematical expression in the form y=…
- --range (required): axis range in axis=min:max format
- --format (required): svg or png
- --output (optional): file path to write the generated image; writes to stdout if omitted

# Behavior
- Validate presence of required flags; on validation error write error to stderr and exit code 1
- Parse range and generate data series via existing parseRange and generateData functions
- Render the data to SVG or PNG using generatePlot
- Write the image buffer or text to the output file or stdout
- Exit with code 0 on success or non-zero on error

# Implementation
- In src/lib/main.js extend main to detect first argument plot and invoke runPlotCli
- Implement runPlotCli that uses parseArgs for flags, validate inputs, call generateData and generatePlot, and handle fs writes or stdout
- Reuse existing dependencies and ensure proper exit codes

# Testing
- Add unit tests in tests/unit/cli-plot.test.js
- Test generating svg and png output to file and stdout
- Test validation errors for missing or invalid flags

# Documentation
- Update USAGE.md and README.md to include the plot subcommand, its flags, examples, and usage