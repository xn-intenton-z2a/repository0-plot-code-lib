# Overview
This feature consolidates and enhances the CLI tool by merging previous plot generation customizations. It introduces a new --steps flag to allow users to specify the number of sample points used in generating plots. In addition to supporting SVG, PNG, text preview, and JSON output modes, the tool now permits fine-grained control over plot resolution.

# CLI Argument Enhancements
1. Extend the argument parser in the main source file (src/lib/main.js) to accept an optional --steps parameter. 
2. Validate --steps using Zod to ensure it is a positive integer. If omitted, it defaults to 20 to preserve existing behavior.
3. Update the USAGE message in the CLI documentation to include the [--steps number] parameter alongside existing flags.

# Plot Computation Updates
1. Replace the hardcoded sample count with the user-specified value from --steps.
2. Compute the step size using (xRange.high - xRange.low) / (steps - 1), ensuring consistency across all output modes (text preview, file generation, and JSON output).

# JSON and Multi-format Output
1. Retain the JSON output mode when the --json flag is provided so that validated parameters, including the new steps value, are output as a pretty-printed JSON string.
2. Ensure that file generation modes for SVG and PNG incorporate the dynamically computed sample count for smoother or coarser plots based on the user’s choice.

# Testing and Documentation
1. Update unit tests (tests/unit/plot-generation.test.js) to include test cases verifying that the number of generated plot points matches the custom --steps value. 
2. Amend tests to verify that usage messages and error outputs include guidance when invalid --steps values are provided.
3. Revise the README.md and USAGE.md documentation to include clear examples and explanations for the new --steps flag, detailing its impact on plot granularity.

# Impact
This consolidated feature directly addresses user needs by providing flexibility in determining the resolution of generated plots. It reinforces the product's mission by improving accessibility and adaptability of the visualization tool while maintaining compatibility with existing functionality.