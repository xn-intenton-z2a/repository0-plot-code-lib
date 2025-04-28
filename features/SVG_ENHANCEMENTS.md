# SVG ENHANCEMENTS

## Overview
This feature improves the visual quality and operational reliability of the plot output. It supports dynamic SVG generation with advanced styling capabilities, adaptive dimensions, and enhanced error handling for the HTTP API. In addition to previous enhancements like dynamic color gradients, the feature now explicitly supports smooth curve rendering with a customizable smoothing factor, allowing users to fine-tune the curvature of plotted graphs.

## Implementation
- Extend the core rendering logic to support both polyline and smooth path generation. When the smooth flag is enabled, the plotted curve is rendered using quadratic Bezier interpolation. A new parameter smoothingFactor (a floating-point number between 0 and 1, with a default of 0.5) allows custom adjustment of the control points used in the curve generation.
- Integrate dynamic color gradient support by optionally inserting a <defs> section with a linearGradient element. Users may supply gradientStartColor and gradientEndColor (with defaults of blue and red) to define the gradient applied to the stroke.
- Map computed plot points to an SVG coordinate system with adaptive dimensions. If custom width and height are provided, they are validated and applied; otherwise, default values are used.
- Embed detailed plot metadata in the SVG output as a data attribute. This metadata (including the original expression, computed ranges, axis labels, resolution, and custom parameters) is JSON-stringified and properly escaped for downstream applications.
- Enhance HTTP API /plot endpoint error handling to return structured responses in compliance with RFC7807. Errors such as malformed parameters or evaluation issues result in clear messages to the client.

## Testing & Impact
- Unit tests ensure that both the polyline and smooth path modes produce correct SVG content. Special attention is given to verifying that the smoothingFactor parameter alters the smooth curve's path data as expected.
- HTTP tests verify content negotiation for SVG, PNG, and JSON outputs while ensuring that error responses adhere to the required structure.
- The improvements in dynamic styling (gradient, adaptive dimensions, and robust error handling) and the addition of customizable curve smoothing directly support the mission of providing a go-to plot library with high-quality visualizations.
