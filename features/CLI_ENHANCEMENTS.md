# CLI_ENHANCEMENTS Feature Update

## Overview
This update refines the CLI module by not only enforcing robust parameter validation using the zod library for parameters such as --expression, --range, and --stats but also integrating expression evaluation for dynamic plot generation. In addition, the CLI continues to support the --file flag for both SVG and PNG outputs. The PNG support originally in a separate feature has been merged into this enhancement.

## Parameter Validation and Usage
- Use the zod library to enforce that the --expression parameter follows a basic formula pattern (for example, "y=sin(x)", "y=cos(x)").
- Validate that the --range parameter is well-formed (e.g., "x=-1:1,y=-1:1") and extract numeric ranges.
- Maintain and validate the --stats flag to produce summary statistics of computed y-values when enabled.
- On validation failure or missing parameters, output a detailed usage guide with examples and exit with an error code.

## Expression Evaluation and Plot Generation
- In src/lib/main.js, after parsing CLI arguments, detect whether both --expression and --range are provided. If so, parse the range values to determine the start and end for x values and discretize the range into several points.
- Evaluate the provided mathematical expression for each computed x value using built-in Math functions (supporting sin, cos, and tan) and generate corresponding y values.
- Construct an SVG plot using a polyline element to connect computed data points. The SVG should still include basic styling and proper namespace declarations.
- For the --file flag, if the specified filename ends with .png, convert the generated SVG to PNG using the sharp library. Otherwise, write the SVG content directly.

## Source File Improvements
- Update src/lib/main.js to include the parsing of --expression and --range. In addition to the existing file handling logic, integrate a function to compute x and y values and generate a polyline element for dynamic SVG content.
- Merge the PNG conversion logic into the same code path so that errors in SVG-to-PNG conversion are properly handled.

## Testing Enhancements
- Update tests/unit/main.test.js to add test cases that simulate CLI calls with valid and invalid --expression and --range parameters. Verify that when provided, the output SVG contains a polyline element representing evaluated points.
- Maintain existing test cases for both SVG and PNG generation. Add assertions for proper error messages and usage guide display if validation fails.

## Documentation Updates
- Update the README.md to include usage examples demonstrating how to invoke the CLI with the new --expression and --range parameters. Provide examples that cover both direct SVG output and PNG conversion scenarios, including the use of the --stats flag for statistical output.
- Ensure that error messages and proper usage guidelines are documented.

## Dependencies and Compatibility
- Continue using Node 20 and the ECMAScript module standard. No new dependencies are introduced as the current math functionality is achieved using built-in JavaScript capabilities.
- Ensure that the merged functionality remains compatible with the mission statement and guidelines in CONTRIBUTING.md.

Overall, this comprehensive update enhances the user experience by merging parameter validation, expression evaluation, and dynamic plotting into a single robust CLI tool.