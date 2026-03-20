# FILE_IO

Status: Completed

Summary
Save plot outputs to disk, inferring output format from the file extension and delegating to the appropriate renderer.

Behavior
Implement savePlotToFile(filePath, seriesOrSvg, options) which infers output format by the file extension. If the extension is .svg, the function should write the provided SVG string directly to disk. If the extension is .png, the function should ensure a PNG is produced by calling renderPNG and then write the resulting bytes to disk. Ensure file writes use atomic semantics where possible and surface filesystem errors clearly.

API
Export a named function savePlotToFile from src/lib/main.js.

Acceptance Criteria
- savePlotToFile is a named export from src/lib/main.js.
- savePlotToFile('out.svg', svgString) writes a UTF-8 file at out.svg that contains the substring <svg and includes a viewBox attribute on the svg root.
- savePlotToFile('out.png', svgStringOrPoints) writes a binary file whose first bytes equal the PNG magic bytes: 89 50 4E 47 0D 0A 1A 0A when a PNG renderer is available.
- Filesystem errors (e.g., permission denied, missing directories) result in rejected Promises or thrown errors with descriptive messages.
