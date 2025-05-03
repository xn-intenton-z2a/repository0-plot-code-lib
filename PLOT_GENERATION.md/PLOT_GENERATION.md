# Overview
This update enhances the CLI tool by adding a customizable sample count for plot generation. In addition to the existing features like text preview, file output (SVG/PNG), and JSON output, users can now specify the number of sample points computed from the provided range using the --steps flag. This new option increases flexibility by allowing smoother or coarser plots based on user requirements.

# Implementation Details
1. CLI Argument Parsing:
   - Extend the CLI argument schema in the main source file (src/lib/main.js) by adding an optional parameter --steps.
   - Validate --steps as a positive integer using Zod. If omitted, default to 20 to retain existing behavior.
   - Update the USAGE message in the source file to list [--steps number] as an additional optional parameter.

2. Plot Computation:
   - Replace the hardcoded sample count with the value provided by the --steps flag.
   - Compute the step size based on the custom sample count and adjust the generation of plot points accordingly.
   - Ensure that all output modes (text preview, file generation, JSON output) use the computed sample count consistently.

3. Testing and Documentation:
   - Update unit tests in tests/unit/plot-generation.test.js to include a test case verifying that the number of generated plot points matches the custom --steps value.
   - Revise the README.md and USAGE.md documentation to include usage examples and explanations for the new --steps flag.
   - Update error messages, if necessary, to provide guidance when an invalid (non-numeric or non-positive) value is provided for the steps parameter.

# Impact
This feature enhances the core functionality of the CLI tool by giving users direct control over the granularity of time series data. This addresses real user needs for flexibility in plot detail and further aligns the tool with its mission of providing accessible and high-quality visualization solutions.