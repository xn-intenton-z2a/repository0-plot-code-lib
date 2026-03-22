# SVG_RENDERER

# Description

Provide an SVG rendering utility that converts a numeric data series into an SVG 1.1 document. The renderer must produce a string containing an svg element with a viewBox attribute and a polyline element representing the series. The API should accept width and height options and return a complete SVG string suitable for writing to disk.

# Acceptance Criteria

- Export renderSvg from src/lib/main.js which accepts a data array and options and returns a string.
- The returned string contains an svg element with a viewBox attribute and a polyline element.
- The polyline element includes a points attribute that contains coordinate pairs in the form x,y separated by spaces.
- The SVG string is valid XML/SVG 1.1 structure (starts with an svg element and closes properly) and includes width/height or viewBox so it scales predictably in viewers.