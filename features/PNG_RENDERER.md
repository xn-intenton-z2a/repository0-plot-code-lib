# PNG_RENDERER

# Description

Provide PNG rendering for plots. This may be implemented by rendering to a canvas or by converting the produced SVG to PNG using an external library. The approach must be documented in the README. The PNG renderer must return a Buffer (or Node Uint8Array) containing valid PNG bytes.

# Acceptance Criteria

- Export renderPng from src/lib/main.js which accepts the same data/options as renderSvg (or an SVG string) and returns a Buffer or Uint8Array containing PNG image data.
- The returned PNG data must begin with the PNG signature bytes 0x89 0x50 0x4E 0x47 in that order.
- The README documents the chosen PNG generation approach and lists any external dependency used (for example canvas or sharp) and why it was selected.