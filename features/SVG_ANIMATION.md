# SVG_ANIMATION

## Overview
This feature adds dynamic SVG animation capabilities to the plot output. Users can enable animation via an optional parameter (animate) to produce a smoothly animated plot curve. When enabled, the SVG output will include an embedded animate element that animates SVG attributes (for example, stroke-dashoffset) to provide a dynamic visual effect. This increases visual engagement without affecting the core plotting functionality.

## Implementation
- Update the existing createSvgPlot function in the main source file to check for an optional parameter (animate) in the custom configuration.
- When animate is set to "true", wrap the generated shape element (path or polyline) inside a container element and insert an <animate> element that animates stroke-dashoffset or another defined SVG attribute.
- Provide additional optional parameters for animation duration (e.g. animateDuration), and animation range (for instance, from and to values) so that users can customize the animation effect. Default values should be provided if these parameters are not set.
- Ensure that the generated SVG remains standards compliant and that the new animation elements do not interfere with accessibility features, metadata embedding, or other custom styling (such as markers and gradients) already present in the plot.
- Update tests in the HTTP and CLI test suites to simulate requests with the animate parameter and verify that the output SVG contains an <animate> element with the correct attributes.

## Impact
- Enhances the visual appeal and interactivity of the plots, making them suitable for dynamic presentations or live displays.
- Adds measurable user value by providing an animated plot option without affecting existing non-animated functionality.
- Complements the current SVG plotting feature and aligns with the mission of creating engaging, publication-quality visualizations.
