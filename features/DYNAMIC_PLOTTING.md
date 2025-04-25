# DYNAMIC_PLOTTING Feature

## Overview
This feature enhances the CLI tool by dynamically generating a polyline plot based on a user-supplied mathematical expression and range. When the user provides an expression such as y=sin(x) along with a range (for example, x=-1:1,y=-1:1), the tool will compute sample points, evaluate the expression using built-in Math functions, and render a dynamic polyline over a standard SVG canvas.

## Functionality
- Parse the --expression flag which must follow the format y=FUNCTION(x) where FUNCTION can be sin, cos, or tan.
- Parse the --range flag to extract numeric start and end values for the x-axis and y-axis from a string formatted as x=start:end,y=start:end.
- Compute a fixed number of sample points (50 sample points) in the x-range and, for each point, evaluate the corresponding y value using the specified function.
- Apply linear scaling to map these (x, y) values to fixed SVG canvas dimensions (width=300 and height=200).
- Create a polyline element in the SVG using the computed and scaled points, ensuring that it visually represents the dynamic curve as specified by the expression.
- Integrate the polyline element into the existing SVG layout in the source file, ensuring that it appears alongside other static elements such as the background rectangle and circle.
- Retain error checking and validation logic for both the --expression and --range flags.

## Testing and Documentation
- Update unit tests to verify that when both the --expression and --range flags are provided, the generated SVG includes a polyline element with properly computed coordinates.
- Modify the usage documentation in the README and USAGE files to include examples and explanations for dynamic plotting.
- Ensure that all changes remain compatible with Node 20, the ECMAScript module standard, and the repository guidelines.

## Benefits
This feature aligns with the mission to make plot-code-lib the go-to tool for formula visualisations. By incorporating dynamic evaluation of mathematical expressions to generate visual plots, users can see immediate graphical representations of formulae which enhances usability and core functionality.