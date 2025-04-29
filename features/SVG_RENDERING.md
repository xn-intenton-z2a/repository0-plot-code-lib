# Overview
This update expands the SVG rendering capabilities to support enhanced plot visualization. Building on earlier accessibility improvements like embedded title elements, the feature now integrates dynamic color gradients, marker customization, stroke styling, and smooth curve generation via quadratic Bezier paths. These improvements ensure that plots are not only visually refined but also highly customizable through both CLI and HTTP interfaces.

# New Capabilities
- Dynamic Color Gradients: When enabled, users can specify a simple two-stop gradient (via gradientStartColor and gradientEndColor) or provide extended gradient stops as a JSON array. This enables multi-stop gradients with customizable offsets, colors, and opacities.
- Marker Customization: Adds support for markers at the start and end of plot paths. Users can choose the marker shape, dimensions (markerWidth and markerHeight), and fill color. These markers supplement visual cues on the plot lines.
- Stroke Styling Enhancements: Supports additional SVG stroke attributes including stroke-width, stroke-dasharray, and stroke-linecap. This allows users to further stylize the plot curve with custom dash patterns and cap styles.
- Curve Smoothing: Users can enable smooth plot paths using quadratic Bezier curves. The smoothingFactor parameter (a number between 0 and 1) lets users control the degree of curve smoothness and highlights the plot's aesthetic appeal.
- Accessibility and Metadata: Maintains accessibility by embedding ARIA labels and customizable axis labels with formatting options. SVG output includes a data-metadata attribute that captures plot parameters and configuration details.

# Implementation Details
- The createSvgPlot function has been updated to dynamically map computed plot coordinates to custom SVG dimensions. The function conditionally includes either a polyline or a smooth path (<path> element) based on the smooth flag.
- Gradient support is implemented by parsing the gradientStops parameter. In its absence, default two-stop gradients are generated using provided start and end colors.
- Marker elements are injected into the SVG <defs> section when markerStart and/or markerEnd flags are enabled. The markers reference customizable SVG elements, currently defaulting to a path shape.
- Stroke attributes are appended based on user inputs and integrated into the final SVG element. Proper validation ensures that strokeWidth must be a positive number and strokeDashArray is a non-empty string. Additionally, strokeLinecap is restricted to allowed values (butt, round, square).
- Robust error handling ensures that misconfigurations (such as an invalid smoothingFactor or malformed gradientStops) provide clear, actionable feedback.

# Impact
- Enhances the visual quality and customization of generated plots, allowing users to create publication-quality graphics.
- Consolidates multiple SVG customization options into a unified, easy-to-use interface available via CLI and HTTP endpoints.
- Ensures compliance with accessibility standards while providing rich metadata for debugging and further processing.
- Aligns with the mission to be the go-to plot library by offering versatile, high-impact functionality in a single, maintainable repository.