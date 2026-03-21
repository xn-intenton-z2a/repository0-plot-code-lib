# PNG_RENDERER

Purpose
Produce PNG output for a data series. External dependencies are permitted only for PNG rendering and must be documented.

Scope
- Convert SVG text to PNG bytes or render plot directly to an offscreen canvas and export PNG bytes
- Provide an API that returns a Buffer or Uint8Array containing PNG data suitable for saving to disk

Implementation Notes
- Preferred approach: generate the SVG string then convert to PNG using sharp to minimize custom rendering logic
- Alternative approach: draw onto an offscreen canvas implementation and export PNG from that canvas
- Document any dependency additions to package.json and mark them in README with install instructions
- Ensure PNG output begins with the PNG magic bytes 89 50 4E 47

Acceptance Criteria
- PNG rendering API returns bytes whose first four bytes match the PNG signature
- Unit tests assert the PNG output begins with the PNG magic bytes
- README documents the dependency approach and how to install for PNG support
