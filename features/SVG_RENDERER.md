# SVG_RENDERER

Overview

Render a numeric data series to an SVG 1.1 document using a polyline element and a viewBox attribute. The renderer must map data coordinates into SVG space and allow basic configuration for width, height, and padding.

Behavior

- Emit valid SVG 1.1 text with a viewBox attribute covering the plotted data extents.
- Use a single polyline element to render the series points in order with a points attribute.
- Allow simple styling hooks (stroke, stroke-width, fill none) via options.

Acceptance Criteria

- The produced SVG string contains a viewBox attribute.
- The produced SVG string includes a polyline element.
- The polyline points attribute contains coordinate pairs for the series and at least one pair when input series is non-empty.
- The renderer is exported as a named API from src/lib/main.js.