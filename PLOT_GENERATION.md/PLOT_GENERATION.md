# Overview
This update enhances the plot generation feature by refining CLI argument parsing, improving error handling, and adding a help (--help) option for user guidance. The changes ensure that mathematical expressions and ranges are validated properly while offering users a quick reference via the CLI. The feature continues to support SVG and PNG outputs along with a console preview when no output file is specified.

# Implementation Details
1. Update the main source file to include a '--help' flag. If provided, display a clear help message outlining required arguments (--expression, --range) and optional parameters (--file).
2. Enhance CLI parsing to detect the help flag and exit with the usage information, in addition to validating mandatory arguments. Ensure that errors for missing or malformed parameters are concise.
3. Improve range string parsing by checking numeric bounds for both x and y axes with descriptive error messages for invalid input.
4. Add robust error handling around mathematical expression parsing and time series generation to ensure graceful failures and user-friendly feedback.
5. Ensure generated plots in SVG and PNG formats are validated before output, and if no '--file' flag is specified, provide a text preview on the console.

# Testing and Documentation
1. Update unit tests to cover new help functionality. Add test cases to check that the '--help' flag outputs the correct usage message without further processing.
2. Extend existing tests for command line argument validation to include both positive and negative cases, including help invocation.
3. Update the README and USAGE documentation to include examples of using the '--help' flag as well as enhanced CLI usage examples with correct flag order and error scenarios.
4. Verify that dependency updates (if any) continue to support Node 20 and ESM standards while maintaining performance and compatibility.

# Impact
This updated feature delivers substantial user impact by making the CLI more accessible and self-documenting. Users benefit from clear error messages, accessible help information, and robust input validation which align perfectly with the mission of providing a go-to tool for visualizing mathematical expressions.