# PNG_RENDERER

Overview
This feature specifies conversion of SVG output to PNG raster images. External native modules are permitted for this feature; sharp is the preferred library due to its speed and reliability, with an optional canvas-based fallback.

Specification
- Provide a named export renderPngFromSvg(svgString, options?) that returns a Promise resolving to a Buffer containing PNG bytes.
- The implementation may depend on sharp or canvas. If sharp is used, document adding sharp to package.json dependencies. If implementing a fallback use the node-canvas approach and document the trade-offs.
- Options include width, height, backgroundColor and density/scale settings.

Rationale
PNG output is required by the mission; allowing a native dependency for rasterization is acceptable and expected.

Acceptance criteria
- renderPngFromSvg when given a simple valid SVG returns a Buffer whose first four bytes match the PNG signature (decimal 137,80,78,71 or hex 89 50 4E 47).
- Documented behavior and dependency instructions are present in README changes.

Implementation notes
- Add tests that call renderPngFromSvg on a small SVG and assert the PNG magic bytes exist at the start of the returned Buffer.
- If choosing sharp as the implementation target update package.json dependencies accordingly and document install notes in README.