# FILE_IO

Summary
Save plot outputs to disk, inferring output format from the file extension and delegating to the appropriate renderer.

Behavior
Implement savePlot(filePath, payload, options) which infers output format by the file extension. If the extension is .svg, payload should be an SVG string written directly to disk. If the extension is .png, payload may be an SVG string or point data; savePlot should ensure a PNG is produced by calling renderPng and then write the resulting bytes to disk.

API
Export a named function savePlot from src/lib/main.js.

Acceptance Criteria
- savePlot('out.svg', svgString) writes a file that contains an <svg root and viewBox attribute.
- savePlot('out.png', svgOrPoints) writes a file whose first bytes match the PNG magic bytes.
- The named export savePlot exists in src/lib/main.js.
