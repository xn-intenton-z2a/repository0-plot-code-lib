# Overview

Add a complete command line interface to parse a mathematical expression, generate a time series over a specified range, and render a plot file in SVG or PNG format. This feature covers parsing of flags, expression evaluation, time series generation, plotting, and saving of the resulting image.

# CLI Arguments

--expression <string>
  A formula in simple infix syntax, for example y=sin(x)

--range <string>
  A colon-delimited x and y range specification, for example x=-1:1,y=-1:1

--file <string>
  The output file path, for example output.svg or image.png

--format <string>
  The output image format, either svg or png. Defaults to svg

# Behavior

1. Parse and validate CLI flags
2. Use a formula parsing library to convert the expression into a function
3. Sample the function across the x range to produce (x,y) pairs
4. Generate a chart using a lightweight plotting library
5. Write the resulting SVG or PNG to the specified output file

# Implementation Details

Update src/lib/main.js to:
- Add argument parsing via minimist or yargs
- Import a math parsing library (eg mathjs) to handle the expression
- Generate time series data at a default resolution of 1000 points
- Use a minimal plot library (eg plotly.js or a simple SVG builder) to produce the image
- Write image output via fs

Update package.json to include any new dependencies for parsing and plotting.

# Testing

Add unit tests to:
  - Verify that main() recognizes and rejects missing or invalid flags
  - Confirm that a valid expression and range generate an image file in the correct format
  - Ensure that the function returns without error when run without file output in dry mode

# Documentation

- Update README.md to list the new CLI flags and include example commands
- Create or update USAGE.md with detailed walkthroughs and sample output
