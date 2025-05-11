features/SERIES_GENERATION.md
# features/SERIES_GENERATION.md
# Overview
The command line interface parses a mathematical expression and a numeric range then transforms them into a sequence of data points.

# CLI Usage
Users can provide the following options:
--expression  A formula in terms of x to be evaluated.
--range       A range specification in the format start:stop:step where step is optional.
--format      The output format, currently supports json.

The CLI will parse these flags, call the generation function, and print the resulting data series.

# Data Generation
Implement a function generateSeries that:
1. Parses range into numeric start, stop, and step defaulting to 1.
2. Evaluates the expression for each x value in the sequence.
3. Returns an array of objects with x and y values.
Ensure safe evaluation using Function or a parser library.

# Testing
Add unit tests for generateSeries to cover:
- Simple linear expressions over positive, negative, and zero ranges.
- Expressions with non integer steps.
- Missing step default behavior.
Ensure tests run under vitest and pass.