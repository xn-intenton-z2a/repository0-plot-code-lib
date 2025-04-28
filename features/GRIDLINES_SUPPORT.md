# GRIDLINES SUPPORT

## Overview
This feature adds optional grid lines to the SVG plot output. When enabled, vertical and horizontal grid lines will be drawn in the background to enhance readability. Users can customize the grid using additional parameters such as grid color, stroke width, and dash pattern. This improvement directly supports the core functionality of transforming mathematical expressions into publication quality plots.

## Implementation
- Extend the createSvgPlot function in the source file to check for a new parameter (e.g., grid) in customLabels.
- When grid is enabled (e.g., grid set to "true"), compute tick positions along the x-axis and y-axis using the computed ranges.
- Draw vertical lines at calculated x positions and horizontal lines at calculated y positions. Use user provided customization parameters: gridColor (default light gray), gridStrokeWidth (default 0.5), and gridDashArray (if provided) for styling.
- Insert these grid line elements into the SVG before drawing the main plot curve.
- Update configuration loading and validation in loadConfig to support these new parameters if provided.

## Impact
- Enhances the interpretability of the plot by providing reference grid lines, which help users gauge the scale and value distribution.
- Provides additional flexibility in plot styling without compromising existing functionality.
- Achieves significant user impact by aligning the output with publication quality visualization standards.
