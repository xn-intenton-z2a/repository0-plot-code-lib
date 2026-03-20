# FILE_IO

Summary
Save plot outputs to disk, inferring output format from the file extension and delegating to the appropriate renderer.

Behavior
Implement savePlot(filePath, payload, options) which infers output format by the file extension. If the extension is .svg, payload should be an SVG string written directly to disk. If the extension is .png, payload may be an SVG string or point data; savePlot should ensure a PNG is produced by calling renderPng and then write the resulting bytes to disk. Ensure file writes use atomic semantics where possible and surface filesystem errors clearly.

API
Export a named function savePlot from src/lib/main.js.

Acceptance Criteria
- savePlot is a named export from src/lib/main.js.
- savePlot('out.svg', svgString) writes a UTF-8 file at out.svg that contains the substring <svg and includes a viewBox attribute on the svg root.
- savePlot('out.png', svgStringOrPoints) writes a binary file whose first bytes equal the PNG magic bytes: 89 50 4E 47 0D 0A 1A 0A.
- Filesystem errors (e.g., permission denied, missing directories) result in rejected Promises or thrown errors with descriptive messages.
