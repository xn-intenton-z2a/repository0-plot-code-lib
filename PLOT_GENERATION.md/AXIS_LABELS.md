# Overview
This feature extends the plot generation CLI by adding optional axis labels to the generated plots. Users can now supply labels for the x-axis and y-axis using the --xlabel and --ylabel flags. This improvement provides clear context to the visualizations, enhancing the usability of the tool in accordance with our mission to be the go-to plot library.

# Functionality
- Accepts --xlabel and --ylabel as command-line flags with non-empty string values.
- When provided, the SVG output will include additional text elements. The x-axis label will be centered at the bottom of the SVG, and the y-axis label will be rotated and positioned along the left side.
- The label positions use default placements, but are computed based on the SVG width and height to ensure a balanced layout.
- Maintains existing functionality for single and multiple expressions along with SVG and PNG formats, ensuring no disruption to core plotting capabilities.

# Implementation
- In src/lib/main.js, update the main function to extract --xlabel and --ylabel flags from the command-line arguments.
- Modify the renderSVG function to append text elements for the axis labels to the generated SVG. The x-axis label will be placed near the bottom center, and the y-axis label will be added along the left side with a proper transformation to display vertically.
- Update error handling to verify that if these flags are provided, the values are not empty.

# Testing & Documentation
- Update existing unit tests in tests/unit/plot-generation.test.js to include cases where axis labels are provided. Tests should verify that the resulting SVG contains the expected text elements for the labels.
- Enhance the README.md and USAGE.md documentation to explain the new --xlabel and --ylabel options with examples.
- No additional dependencies are required for this feature.

# Impact
By providing customizable axis labels on the plots, this feature improves clarity and context of the visualizations. This leads to better interpretability of the graph outputs, addressing user needs for more informative and professional plot presentations.