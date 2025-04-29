# OVERVIEW
This update extends the core Plot Engine functionality by incorporating advanced stroke styling, marker customization, and extended gradient configurations. In addition to existing SVG generation improvements and accessibility enhancements, the Plot Engine now supports parameters for stroke width, dash patterns, and line cap styles along with detailed marker definitions at both the start and end of curves. These enhancements provide users with greater control over the aesthetics and clarity of their plots.

# ENHANCEMENTS
- Stroke Styling: New parameters (strokeWidth, strokeDashArray, strokeLinecap) allow users to customize the appearance of plot lines. Validation errors ensure that only positive numbers and valid values (butt, round, square) are accepted.
- Marker Customization: With markerStart and markerEnd flags along with markerShape, markerWidth, markerHeight, and markerFill options, users can now add custom markers to the plot curves. This improves the visual guidance at the endpoints.
- Extended Gradient Support: The Plot Engine supports both basic two-stop gradients (via gradientStartColor and gradientEndColor) and extended gradients using a JSON array string provided in gradientStops, enhancing dynamic color transitions on plot lines.
- Configuration and Accessibility: The enhancements remain backward-compatible. New parameters are seamlessly merged with existing configuration options. Detailed metadata embedding and ARIA attributes continue to support accessibility best practices.

# IMPLEMENTATION
- Update the createSvgPlot function in the source file (src/lib/main.js) to process new query parameters for stroke styling and marker configuration. Integrate error handling and validations for numeric values and allowed enumerations.
- Incorporate additional rendering logic based on the smooth flag to switch between polyline and smooth path generation with quadratic Bezier curves.
- Modify test files to include test cases for stroke styling (strokeWidth, strokeDashArray, strokeLinecap) and marker customization. Ensure that gradient configurations with both simple and extended stops are validated.
- Update documentation files (USAGE.md and README.md) to reflect new CLI flags and web query parameters, along with usage examples and expected outputs.

# IMPACT
- User Impact: Provides a higher degree of customization for visual styling, enabling users to produce plots that are both accessible and visually appealing for diverse presentation needs.
- Core Functionality: Enhances the plotting engine's flexibility without breaking backward compatibility, aligning with the mission of becoming a go-to plot library for formula visualisations.