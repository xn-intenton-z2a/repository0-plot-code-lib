# Overview

Add core functionality to parse mathematical expressions and numeric ranges, generate time series data, and render plots in SVG or PNG formats via the CLI and library API.

# CLI Interface

Users can invoke the CLI with the following options:

repository0-plot-code-lib --expression "y=sin(x)" --range "x=0:10:0.1" --output output.svg --format svg

--expression   A mathematical expression of y in terms of x.  
--range        Contiguous numeric range specification for x: start:end:step.  
--output       File path to write the generated plot.  
--format       Output format: svg or png (default svg).

# Library API

Export a function generatePlot(options) accepting an object with:

expression: string  
range: { start: number; end: number; step: number }  
output: string  
format: "svg" | "png"

The function returns a Promise<void> that resolves when the file is written.

# Implementation Details

1. Add mathjs as a dependency to parse and evaluate expressions.  
2. Use zod to validate CLI inputs for expression and range.  
3. Generate an array of x values from start to end inclusive by step, compute y for each using mathjs.  
4. Use a lightweight SVG builder library or template to plot the time series.  
5. For PNG output, convert the generated SVG using an existing utility in the repository or a light dependency.

# Tests

- Unit tests for parsing and validation of expression and range inputs.  
- Integration test for generatePlot producing a valid SVG string containing path data for sine curves.  
- CLI tests invoking main with args array and verifying output file creation via a temporary filesystem mock.
