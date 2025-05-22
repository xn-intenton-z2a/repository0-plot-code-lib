# Overview
Generates time series data points from a mathematical expression over a specified one-dimensional range. Provides core functionality for sampling expressions and producing structured data suitable for plotting or further analysis.
# CLI Parameters
--expression   Simple formula using x as the independent variable, for example y=sin(x)
--range        Sampling range in the form x=start:end:step where start, end and step are numeric values
--format       Output format, one of json or csv, default json
--file         Optional path to write the output; if omitted, data is printed to stdout
# Output
A sequence of sample points. In json format an array of objects with fields x and y. In csv format a header row x,y followed by numeric pairs.
# Error Handling
Validates both expression syntax and range parameters. On invalid input prints a descriptive message and exits with a non-zero code.
# Examples
node run start -- --expression "y=sin(x)" --range "x=0:6.28:0.1" --format csv --file data.csv