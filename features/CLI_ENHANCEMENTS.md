# CLI_ENHANCEMENTS Feature Update

## Overview
This update enhances the CLI module to not only perform robust parameter validation and basic SVG/PNG file generation but also integrate advanced expression evaluation and dynamic plot generation. When the user provides a mathematical expression via --expression and a numeric range via --range, the tool will compute and render a dynamic polyline curve on the SVG plot.

## Parameter Validation and Input Parsing
- Continue using the zod library to validate parameters such as --expression and --range. The --expression value should follow the pattern y=FUNCTION(x) where FUNCTION can be sin, cos, or tan.
- Validate that the --range parameter follows the format x=start:end,[y=start:end] and accurately extract numeric start and end values for the x-axis (and optionally for the y-axis if needed for scaling).
- On validation errors or missing parameters, output a usage guide with examples and exit with an error code.

## Expression Evaluation and Dynamic Polyline Generation
- When both --expression and --range parameters are provided, parse the range string to obtain the start and end values for the x-axis; use a fixed sample count (for example, 50 points) to discretize the range.
- Parse the mathematical expression provided in the format y=FUNCTION(x). Use built-in Math functions (Math.sin, Math.cos, Math.tan) to evaluate the expression for each sample x value.
- Map the computed (x, y) values to the SVG coordinate system (using fixed dimensions such as width=300 and height=200). A simple linear scaling can be used to transform the x and y values to SVG canvas coordinates.
- Create a polyline element in the SVG with the computed and scaled points. This polyline will visually represent the curve defined by the expression.

## SVG and PNG Generation
- If the --file flag is provided and ends with .png, convert the generated SVG (which now includes a polyline element) to a PNG using the sharp library. Handle any conversion errors appropriately.
- For SVG files, write the SVG content with dynamic elements directly to the file.

## Testing Enhancements
- Update the unit tests in tests/unit/main.test.js to include cases where a valid mathematical expression and range are provided. Assert that the output SVG contains a polyline element with properly computed coordinates.
- Ensure existing tests for SVG and PNG generation continue to pass, with additional checks for dynamic plot content when --expression and --range are present.

## Documentation Updates
- Revise README.md and docs/USAGE.md to include usage examples demonstrating the new functionality. Provide examples showing how the CLI tool now renders a dynamic curve based on the evaluated function.
- Clearly document the updated behavior of the --expression and --range flags, explaining the expected format and the nature of the dynamic plot generation.

## Dependencies and Compatibility
- No new dependencies are added. Built-in Math functionality is used for expression evaluation, and the existing sharp library is used for SVG-to-PNG conversion.
- Ensure compatibility with Node 20 and the ECMAScript module standard, and maintain adherence to the guidelines in CONTRIBUTING.md and the mission in MISSION.md.

This enhanced functionality significantly improves the user experience by enabling visual representation of mathematical expressions through dynamic plotting, thus aligning with the mission of making plot-code-lib the go-to tool for formula visualisations.