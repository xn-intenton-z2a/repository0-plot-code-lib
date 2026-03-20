# PNG_RENDERER

Status: Implemented

Summary
Convert an SVG string into a PNG binary using a server-side renderer. Prefer the sharp library for reliable SVG-to-PNG conversion; provide a documented fallback to node-canvas when sharp is unavailable.

Behavior
Implement renderPNG(svgStringOrSeries, options) that returns a Promise resolving to a Buffer or Uint8Array containing PNG bytes. Options may include width, height, background, and density. The implementation should:
- Prefer the sharp library for SVG-to-PNG conversion when available at runtime.
- If sharp is not installed, fall back to using node-canvas (canvas) to draw the SVG onto a Canvas and encode PNG bytes.
- If neither renderer is available, reject with a clear Error: "Missing PNG renderer: install sharp or canvas".
- Validate inputs and reject with descriptive errors for invalid SVG input.

API
Export a named async function renderPNG from src/lib/main.js. The function must accept (svgStringOrSeries, options) and return a Buffer or Uint8Array containing the PNG file bytes.

Documentation
Document the chosen dependency and the fallback approach in README.md and in an inline comment in the implementation. Describe required native build steps for sharp or canvas where relevant so users can install the runtime dependency.

Acceptance Criteria
- renderPNG is a named export from src/lib/main.js.
- Calling renderPNG with a valid simple series or SVG string returns a Buffer or Uint8Array whose first eight bytes equal the PNG signature: 89 50 4E 47 0D 0A 1A 0A when a renderer is installed.
- When sharp is available, the implementation uses it; when not available but canvas is installed, the implementation uses canvas; when neither is available, renderPNG rejects with an Error whose message contains "Missing PNG renderer".
- README.md documents the dependency choice, the fallback behaviour, and the command(s) needed to install sharp or canvas on common platforms.
- The function accepts width/height options and produces a PNG matching those pixel dimensions when provided.
