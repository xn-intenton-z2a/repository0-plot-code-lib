# PNG_EXPORT

Summary
Produce a PNG raster image from plotting output. External native dependencies are permitted only for PNG rendering and must be documented.

Specification
- Provide a named export renderPng(svgString, options) that returns a Buffer containing PNG bytes or writes a PNG file when supplied a path.
- Implementations may use canvas, sharp, or similar native libraries; document the chosen approach in README and package.json.
- The returned Buffer or file must begin with the standard PNG signature bytes.

Acceptance Criteria
- renderPng is exported as a named export from src/lib/main.js.
- renderPng returns a Buffer whose first eight bytes match the PNG magic signature.
- When the CLI or API writes a PNG file, the file begins with the PNG signature.

Testing notes
- Unit tests should examine the first eight bytes of the Buffer or written file to assert the PNG signature.