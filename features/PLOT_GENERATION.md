# Overview

Implement the core time series data generation pipeline from a mathematical expression and numeric range. This will parse an arithmetic expression, sample the specified variable(s) over the provided interval, and emit structured data for downstream plotting or export.

# Expression and Range Parsing

Use a parsing library to interpret a single–variable expression syntax (for example sin(x) or x^2 + 3*x). Support a single variable name and numeric operations. Validate and convert a range string of the form x=start:end:step into numeric bounds and step size. Provide clear error messages for invalid syntax or ranges.

# Time Series Generation

Sample the expression over the specified range. For each value in the interval, compute the expression result and record an object with keys "x" and "y". Return an array of these data points.

# Output Formats

Support at least JSON output by default. Emit the generated time series as a JSON array on stdout or write to a file when a --output flag is provided. Plan for CSV or YAML export in a later iteration.

# CLI Integration

Extend the main CLI to accept flags:

--expression    the mathematical expression to evaluate
--range         the sampling range in the form x=start:end:step
--output        optional file path to write the output

Parse flags from process.argv, invoke the parser and generator, and handle stdout or file writing. Exit with nonzero on errors.

# Tests

Add unit tests for:

Parsing valid and invalid expressions
Range string parsing and validation
Time series data generation correctness for known functions
CLI invocation for basic JSON output and file writing

Ensure coverage of edge cases, such as zero or negative step sizes and out-of-range values.