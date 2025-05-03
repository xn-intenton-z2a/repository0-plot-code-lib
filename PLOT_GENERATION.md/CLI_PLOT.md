# Overview
This feature merges the existing CLI validation and plot generation functionality into a single, robust feature that centrally handles input parsing, schema-based validation, error messaging, and dual output generation. The feature provides a consistent and user-friendly command line experience by combining strict argument validation with flexible output modes, either rendering a plot to an SVG/PNG file or providing a text preview.

# Implementation Details
1. Update the main source file to integrate both the CLI argument parsing with Zod-based schema validation and the plot generation logic into one coherent flow. The program will continue to support only the recognized mathematical expressions and validated range inputs while retaining the dual output functionality.
2. Ensure that when users pass the help flag or omit required arguments, the tool outputs a clear usage guide with examples. The validation schema guarantees that required flags such as --expression and --range are provided in the correct format, and that an optional --file parameter ends with a valid extension (.svg or .png).
3. Modify the processing of input ranges to work seamlessly with both x and y boundaries. Consolidate error handling into a centralized function which leverages Zod's descriptive messages along with additional checks for unsupported axes or file names.
4. Update the test files to merge existing cases. The tests will validate both valid input scenarios and error cases, ensuring that the proper text preview is output or that file outputs (SVG/PNG) are generated correctly in a seamless manner.
5. Enhance the documentation and README file to reflect the unified CLI functionality. The usage instructions and parameter descriptions will be consolidated to guide users in supplying correct parameters and understanding the dual output behavior.

# Testing and Documentation
1. Revise the unit tests to cover all aspects of the merged CLI functionality, including valid parameter parsing, error conditions, and both file and text output modes.
2. Update the USAGE documentation and the README file with updated examples that describe the merged behavior and validate that the usage is consistent with the mission statement.
3. Confirm that the refactored code remains compatible with Node 20 and adheres to ESM standards.

# Impact
This unified CLI feature improves reliability and maintainability by reducing duplicate implementations of argument parsing and plot generation across separate features. By providing a single entry point that handles both CLI validation and plot rendering, the tool becomes more intuitive and robust. This change directly supports the mission of being a go-to plot library for formula visualizations, ensuring users quickly access help, receive clear error messages, and generate plots reliably.