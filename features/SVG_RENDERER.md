# SVG_RENDERER

Summary

Render a numeric series to SVG 1.1 markup using a polyline element and an explicit viewBox attribute. The renderer must produce valid standalone SVG strings suitable for saving to disk or conversion to PNG.

Scope

- Provide a named export renderSVG in src/lib/main.js that accepts a series of numeric points and rendering options such as width, height, stroke, strokeWidth, and margin.
- The produced SVG must include a viewBox attribute and should use a single polyline element to represent the series points.
- Coordinates should be scaled and translated so the polyline fits the viewBox with the requested margins.

Acceptance criteria

- The output string contains an svg root element with a viewBox attribute.
- The output string contains a polyline element whose points attribute corresponds to the input series length.
- The produced SVG is valid SVG 1.1 text and includes the XML namespace attribute.

Implementation notes

- Keep the renderer deterministic and dependency-free; string-based construction is acceptable.
- Document coordinate mapping from data domain to viewBox coordinate space.

Tests

- Unit test that renderSVG returns a string containing viewBox and polyline.
- Unit test that polyline points count approximates the input data length.

# END
