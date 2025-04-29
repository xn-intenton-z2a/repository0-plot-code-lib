# SVG_PLOTTING Feature Update

## Overview
This update extends the existing SVG_PLOTTING feature to incorporate new capabilities for enhanced plot visualization. Enhancements include dynamic gradient customization with multiple stops, marker support at both start and end of the plot path, and additional stroke styling options such as stroke width, dash patterns, and line cap styles. Support for curve smoothing with adjustable smoothing factors is further refined. Additionally, accessibility improvements via ARIA labels and customizable axis text anchors are integrated. These improvements ensure that users can generate richly styled and accessible plots with just a few CLI or configuration options.

## Implementation
- Extend the configuration parser and CLI options to accept advanced parameters: colorGradient, gradientStops, markerStart, markerEnd, markerShape, markerWidth, markerHeight, markerFill, strokeWidth, strokeDashArray, and strokeLinecap.
- Update the SVG plot generation routine to wrap gradient definitions in a <defs> element. Generate linear gradients either with simple two-stop defaults or via an extended JSON array of stops from gradientStops.
- Integrate marker customization by conditionally embedding marker definitions for start and end markers with configurable shape, size, and fill color.
- Implement stroke customization to allow dynamic adjustment of stroke width, dash patterns, and line cap styles. This includes input validation to ensure positive numeric stroke widths and allowed stroke line cap values ('butt', 'round', 'square').
- Improve the smooth curve drawing by refining the quadratic Bezier path generator when the smooth flag is enabled, allowing a custom smoothingFactor parameter.
- Update error handling and validation routines in both configuration (using Zod schemas) and during plot data computation to provide clear error messages if invalid numeric ranges or malformed parameters are detected.
- Enhance SVG metadata output by embedding JSON details in a data attribute, facilitating downstream automated testing and accessibility reviews.
- Update unit tests and HTTP endpoint tests to verify new parameters, including tests for marker definitions, stroke styling, and gradient stops.
- Revise documentation (README and USAGE) to illustrate examples for each enhanced functionality and detail how to use the new customization options.

## Impact
- Users gain greater control over the look and feel of their plots through extensive styling options including gradients, markers, and stroke customizations.
- Accessibility improvements ensure that plots are semantically rich and better integrated with assistive technologies.
- The unified and enhanced plotting interface consolidates batch plotting, dynamic SVG generation, and HTTP-based visualization into a robust and flexible module, reinforcing the mission to be the go-to plot library for formula visualisations.