# SVG_ANIMATION Feature

## Overview
This feature introduces dynamic animation to SVG plots. When enabled via the CLI or HTTP query parameter (--animate true), the generated SVG will include a SMIL <animate> element that animates the drawing of the plot. The animation visually simulates the curve being drawn over a configurable duration (default 2000ms) by animating the stroke-dashoffset property. An optional parameter (--animationDuration) allows users to adjust the duration of the animation in milliseconds.

## Implementation
- Update the SVG generation logic in the createSvgPlot function to check for an "animate" flag in custom parameters. If set to "true", wrap the existing plot element (either a <path> for smooth curves or a <polyline> for non-smooth plots) with an animation element.
- Compute the total length of the SVG path (using a predetermined value or by setting stroke-dasharray to the path length) and initiate an animation that transitions the stroke-dashoffset from the full length to 0.
- Allow users to override the default animation duration via the new parameter --animationDuration, ensuring that the value is a positive number.
- Update error handling to report if an invalid animation duration is provided.
- Modify unit and HTTP tests to check both the presence and correctness of the <animate> element in the SVG output when the animate flag is active.
- Update the USAGE documentation to illustrate how to use the --animate and --animationDuration flags with relevant examples.

## Impact
- Enhances the visual appeal of the plots with a dynamic drawing effect.
- Provides users an interactive way to visualize the plot generation process.
- Aligns with the mission by reinforcing the tool's versatility as the go-to plot library for formula visualizations, making it not only functional but engaging.
