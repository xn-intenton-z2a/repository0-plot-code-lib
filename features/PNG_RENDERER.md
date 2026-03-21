# PNG_RENDERER

Overview

Produce PNG output from SVG input. Implementation may use node-canvas, sharp, or another native renderer; document the chosen approach in README.

Specification

- Named export: renderPng(svgString, options) which returns a Buffer or writes a PNG file
- Prefer an implementation that can be tested headlessly in CI; allow dependency selection via package.json and feature implementation notes

Acceptance Criteria

1. renderPng is exported as a named export from src/lib/main.js
2. When renderer dependencies are installed, renderPng given a simple SVG returns a Buffer whose first four bytes are the PNG magic bytes 89 50 4E 47 (hex)
3. If renderer dependencies are missing an informative error is thrown explaining how to enable PNG output

Implementation Notes

- Two common approaches: render SVG to a canvas using node-canvas and call toBuffer('image/png'), or use sharp to convert SVG to PNG. Both are acceptable; document the choice and installation steps in README.
- Keep the API consistent so callers can choose to save a Buffer or write it to disk.

Tests

- Unit tests should attempt to call renderPng only when the renderer dependency is available; otherwise assert an informative error is raised.