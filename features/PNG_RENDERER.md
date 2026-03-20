# PNG_RENDERER

Summary
Convert an SVG string into a PNG binary using a server-side renderer. Prefer the sharp library for reliable SVG-to-PNG conversion; provide a documented fallback if sharp is unavailable.

Behavior
Implement renderPng(svgString, options) that returns a Promise resolving to a Buffer or Uint8Array containing PNG bytes. Document that sharp is the preferred dependency and outline the conversion approach.

API
Export a named async function renderPng from src/lib/main.js.

Acceptance Criteria
- renderPng returns a bytes-like Buffer/Uint8Array whose initial bytes match the PNG signature (the PNG magic bytes).
- The implementation documents the chosen dependency (for example sharp) and how it is used.
- The named export renderPng exists in src/lib/main.js.
