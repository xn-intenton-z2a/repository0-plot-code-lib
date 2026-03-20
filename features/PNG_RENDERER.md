# PNG_RENDERER

Summary
Convert an SVG string into a PNG binary using a server-side renderer. Prefer the sharp library for reliable SVG-to-PNG conversion; document a fallback approach if sharp is unavailable.

Behavior
Implement renderPng(svgString, options) that returns a Promise resolving to a Buffer or Uint8Array containing PNG bytes. The implementation should detail which dependency is required (for example sharp) and how it is used in README or code comments.

API
Export a named async function renderPng from src/lib/main.js.

Acceptance Criteria
- renderPng is a named export from src/lib/main.js.
- renderPng returns a Buffer or Uint8Array whose first eight bytes match the PNG signature: 89 50 4E 47 0D 0A 1A 0A.
- The README or the implementation documents the chosen dependency (sharp or alternative) and describes the conversion approach.
