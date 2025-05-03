# Overview
This feature consolidates the existing CLI validation and plot generation functionality into a single, robust CLI tool. It integrates schema-based argument parsing with comprehensive error handling and supports dual output modes: file generation (SVG/PNG) and console text preview. This unified interface ensures that users have a clear, self-documenting, and reliable command line experience.

# Implementation Details
1. Merge existing CLI argument validation and plotting features into one: incorporate zod for schema validation and centralized error messaging. The tool enforces that mandatory flags (--expression, --range) are provided and valid, and it supports optional parameters (--file, --width, --height) with default values.
2. Retain a help option which, when invoked or when no arguments are provided, displays a usage message. The help text is updated to combine instructions from the previous features.
3. Parse the --range input into numeric ranges for x and y axes with custom error messages if the format is invalid. Validate --expression to support only the allowed formats (e.g., y=sin(x) or y=cos(x)).
4. Implement file output logic: when a --file flag is provided, generate either an SVG or a simulated PNG output. Validate file extensions to only allow .svg or .png.
5. Maintain support for custom dimensions with --width and --height, ensuring they are positive numbers. Incorporate these into the generated SVG output and PNG placeholder text.
6. Update the test suite and documentation (USAGE.md, README.md) to reflect the consolidated functionality, ensuring that examples and error scenarios are fully covered by unit tests.

# Testing and Documentation
1. Merge unit tests for CLI validation and plot generation into an integrated test suite. Tests will cover both valid and error scenarios, including missing parameters, invalid range formats, unsupported file extensions, and invalid dimension values.
2. Update the README and USAGE documents with comprehensive examples that demonstrate the new, unified CLI behavior.
3. Ensure compatibility with Node 20 and maintain adherence to ESM standards.

# Impact
This unified CLI tool reduces code duplication and enhances maintainability by centralizing input parsing, validation, and output generation into one coherent feature. It directly supports the mission by offering users a reliable and user-friendly command line interface for generating plots from mathematical expressions, making the tool both robust and highly accessible.