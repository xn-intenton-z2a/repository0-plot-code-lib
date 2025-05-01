# Overview
This feature consolidates critical aspects of our CLI tool into one robust enhancement. It not only improves error logging and input validation as previously implemented, but it also introduces multi-expression support. Users can now supply multiple mathematical expressions in the --expression flag by separating them with a semicolon. The tool will generate individual SVG plot segments for each expression and merge them into a single SVG output. When converting to PNG, the merged SVG output will be processed accordingly. This enhancement continues to enforce strict argument validations using the Zod library and ensures errors are logged with timestamps, optionally to a log file if LOG_FILE is set.

# Implementation
- Update the main source file (src/lib/main.js):
  - Enhance parseArgs to accept and detect multiple expressions separated by semicolons in the --expression flag.
  - Modify the plotting logic: 
    - If multiple expressions are detected, split the string into individual expressions.
    - Generate separate SVG segments for each expression by invoking the existing generateSVG function with appropriate parameters.
    - Merge the SVG segments into one final SVG document by stacking them vertically. Use a fixed vertical offset for each segment to ensure they do not overlap.
    - Maintain backwards compatibility for single expression inputs.
  - Update the PNG conversion logic to handle the merged SVG output when --output-format is set to png.
  - Ensure that error handling and input validation are performed on every expression part. Log errors using the logError function if the LOG_FILE environment variable is set.
- Testing enhancements in tests/unit/main.test.js:
  - Add tests to verify that providing multiple expressions results in a merged SVG that correctly includes all input expressions.
  - Validate that the multi-expression mode does not break existing single-expression behavior.
  - Confirm that errors in multi-expression inputs are correctly logged both to the console and to the log file when enabled.
- Documentation updates in README.md and USAGE.md:
  - Document the new multi-expression capability, including usage instructions and examples.
  - Outline how multiple expressions should be separated with semicolons and how the output will be structured.

# Testing & Quality Assurance
- Unit tests must cover both valid and invalid multi-expression scenarios.
- Validate that error logging works seamlessly for both single and multiple expression cases.
- Updated README and USAGE documentation will be manually verified to ensure clarity for end users.

# Conclusion
This enhancement directly supports our mission to be a go-to plot library by improving reliability through robust error logging and user input validation while extending functionality with flexible multi-expression support. Users will benefit from increased versatility and a more intuitive interface for generating multiple plots from a single command line invocation.