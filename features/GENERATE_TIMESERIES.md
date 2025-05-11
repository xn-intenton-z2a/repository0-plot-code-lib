# Overview
Adds CLI support for generating time series data from a mathematical expression and range.

# CLI Options
--expression <expr>  Required: Mathematical expression as a function of x.
--range <min>:<max>:<step>  Required: Range specifier for x values.
--output <file>  Optional: Path to write the output JSON file.
--format <fmt>  Optional: Output format (json or csv). Defaults to json.

# Behavior
Parses the expression and range. Computes data points by evaluating the expression at each x value between min and max inclusive in increments of step. Produces an array of { x, y } objects. If --output is specified, writes the result to the file. Otherwise, prints the result to stdout.

# Examples
repository0-plot-code-lib --expression "Math.sin(x)" --range 0:6.28:0.1

# Validation
Validates that expression is provided and non-empty. Validates that range parts are numeric and that step is greater than zero.

# Error Handling
Exits with code 1 and prints an error message if arguments are missing, invalid, or if evaluation fails.