# Overview

This feature extends the CLI tool to parse a mathematical expression and generate a time series data set across a specified range. It reads the expression and range parameters from the command line, computes evenly spaced data points, and outputs the result as a JSON array of x and y coordinate pairs. This builds the core data generation capability needed for downstream plotting.

# CLI Interface

The main entry point accepts the following parameters:

--expression  A mathematical formula in terms of x, for example y=sin(x).  This parameter is required.
--range       A range specification in the form start:end, for example 0:10.  Defines the domain of x values.  This parameter is required.
--points      An optional integer to specify the number of samples to generate.  Defaults to 100 if omitted.

# Behavior

1. Validate that the expression parameter contains a single variable x.
2. Validate that the range parameter has a numeric start and end with start less than end.
3. Compute the step size as (end - start) divided by (points - 1).
4. For each index i from 0 to points-1, compute x = start + i * step and y by evaluating the expression at x.
5. Collect each coordinate as an object with numeric fields x and y.
6. Print the resulting array of data points as JSON to standard output.

# Dependencies

Add mathjs to the dependencies list to handle safe expression parsing and evaluation.

# Examples

Using the default point count:
node run start -- --expression y=sin(x) --range 0:6.28

With custom point count:
node run start -- --expression y=x^2 --range -5:5 --points 50