# Overview
This feature merges the functionality for customizable plot output into a single coherent update. It enables users to specify a custom number of sample points via a new --steps flag while retaining support for multiple output formats including text preview, SVG, PNG, and JSON output.

# Implementation Details
1. CLI Argument Parsing:
   - Extend the argument parser in src/lib/main.js to recognize a new optional parameter --steps.
   - Use Zod validation to ensure --steps, if provided, is a positive integer. Default value remains 20 if not provided.
   - Update the USAGE message to include the [--steps number] option alongside other flags.

2. Plot Computation:
   - Replace the hardcoded sample count with the custom value provided by --steps. Compute the step size using (xRange.high - xRange.low) / (steps - 1) with the steps value being either the user-provided number or the default.
   - Ensure all output modes (text preview, file generation, JSON output) use the computed sample count consistently.

3. Output Modes & JSON Functionality:
   - Retain JSON output mode when --json flag is provided, which outputs the validated parameters with the new steps parameter if it is set.
   - Ensure that in file generation mode (SVG/PNG), the new sample count influences the smoothness and detail of the plot data.

4. Testing & Documentation:
   - Update unit tests (tests/unit/plot-generation.test.js) to include a test case verifying the custom steps parameter correctly changes the number of generated plot points.
   - Revise README.md and USAGE.md documentation to describe the new --steps flag with usage examples and explanations.

# Impact
This merged feature addresses core user requirements by providing refined control over plot granularity. It enhances the CLI tool's flexibility and usability for detailed visualization tasks, while aligning with the mission of being a leading plot library that serves both human and automated workflows.