# Overview
This update extends the CLI tool by introducing a JSON output mode. In addition to the existing text preview and file output (SVG/PNG), the tool can now output the computed time series data as JSON. This feature enhances integration with other tools and workflows that process JSON data.

# Implementation Details
1. Update the CLI argument parsing in the main source file (src/lib/main.js) to detect a new flag: --json. The flag should be optional and mutually exclusive with --file.
2. In the main function, after computing the plot points, add a condition to check if the --json flag is provided. If so, output the points as a formatted JSON string to stdout instead of the text preview.
3. Update the argument schema if needed so that --json is recognized as a boolean flag and does not conflict with other parameters.
4. If both --json and --file are provided, prioritize file output and ignore the JSON flag, or optionally raise an error, following established error handling patterns.
5. Revise error messages and help text (displayed when --help is used or when parameters are missing) to include documentation about the --json option.

# Testing and Documentation
1. Update unit tests in tests/unit/plot-generation.test.js to include cases that verify the JSON output mode. Capture the stdout and assert that a valid JSON string is output when the --json flag is provided without --file.
2. Modify the README (README.md) and usage documentation (USAGE.md) to document the new JSON output mode, including examples on how to use the --json flag to generate JSON output.
3. Ensure that the updated tests cover both valid JSON output scenarios and cases where the flag is used inappropriately (for example, together with --file) to enforce mutually exclusive options.

# Impact
This update increases the versatility of the CLI tool by enabling users to easily integrate the plot generation with other command-line tools and data processing pipelines. By providing a JSON output mode, the tool supports automated workflows and enhances interoperability with data analysis libraries. The new functionality aligns with the project mission of delivering accessible and user-friendly visualisation solutions.