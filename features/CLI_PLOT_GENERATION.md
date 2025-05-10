# Feature Overview

This feature introduces robust CLI plot generation logic into main.js. It adds support for parsing command line arguments for mathematical expressions and ranges, generating time series data, and rendering plots in SVG and PNG formats.

# Expression and Range Parsing

The CLI accepts an expression option and a range option. The expression is parsed into an abstract syntax tree using an open library parser. The range string supports definitions with min step max syntax separated by commas. The parser validates syntax and produces sample points for each variable.

# Plot Generation Logic

Using the parsed expression and generated data points, the feature computes values for each sample, constructs a time series dataset, and uses a plotting library to render output as SVG or PNG files. The output is saved to a specified file path based on user input.

# Unit Tests

Add tests in tests/unit/plot-generation.test.js to validate expression parsing, range generation, error handling for invalid inputs, and correct data point computation. Tests use vitest and cover edge conditions such as zero or negative step values.

# Documentation Updates

Update USAGE.md with CLI usage examples showing expression and range options and sample commands. Update README.md to include quick start instructions for the new CLI options.