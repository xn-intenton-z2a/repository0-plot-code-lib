# SVG_RENDERER

Purpose
Render a numeric data series to SVG 1.1 using a polyline element and a viewBox attribute so output is scalable and standards compliant.

Scope
- Produce an SVG string that includes an SVG root element with xmlns and viewBox attributes
- Render one polyline element whose points attribute contains the mapped coordinate pairs
- Allow configurable parameters such as width, height, stroke color, stroke width, and margin

Implementation Notes
- Compute data extents for x and y, map data points into SVG coordinate space and emit coordinates as pairs separated by spaces
- Emit an SVG 1.1 document string suitable for saving directly or passing to a PNG converter
- Keep the renderer pure string output so it can be unit tested without DOM

Acceptance Criteria
- SVG output contains a polyline element and a viewBox attribute
- The polyline points attribute contains coordinate pairs separated by spaces
- Unit tests verify presence of polyline and viewBox and basic formatting of points
