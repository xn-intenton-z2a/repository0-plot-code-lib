# PNG_RENDERER

Summary
Describe svgToPng which converts an SVG string to PNG bytes. The current implementation returns a small placeholder PNG buffer; a replacement using sharp or canvas is optional for production.

Specification
- Function: svgToPng(svgString, width?, height?) -> Buffer or Uint8Array containing PNG bytes.
- Current behavior: returns a 1x1 PNG placeholder buffer encoded from base64 and does not require native dependencies.
- Future option: replace with sharp or canvas for full SVG rasterization; document tradeoffs in README.

Acceptance criteria
- svgToPng returns a binary Buffer or Uint8Array whose first eight bytes match the PNG signature 89 50 4E 47 0D 0A 1A 0A.
- Calling svgToPng with an SVG string returns a Buffer-like object representing PNG bytes.

Test plan
- tests/unit/png.test.js should call svgToPng with a minimal SVG and assert the returned buffer starts with PNG magic bytes.
