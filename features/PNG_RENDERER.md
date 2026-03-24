# PNG_RENDERER

Summary
Provide PNG rendering by converting SVG output to PNG bytes using an external renderer (acceptable external dependencies include sharp or canvas). Document the chosen approach in the README.

Specification
- API: renderPNG(svgString, options?) -> Promise<Buffer> (or Buffer) that contains PNG binary data.
- Implementation may depend on either sharp, canvas, or a Node tool that converts SVG to PNG; document the dependency trade-offs in README.

Acceptance criteria
- renderPNG returns a Buffer whose initial bytes match the PNG file signature (hex: 0x89 0x50 0x4E 0x47 0x0D 0x0A 0x1A 0x0A).
- The function rejects or throws if input is not valid SVG text.

Test plan
- Add tests/unit/png.test.js that call renderPNG with a small SVG and assert the returned Buffer starts with the PNG magic bytes.

Files to change
- src/lib/main.js: export renderPNG implementation.
- package.json: add dependency selection for PNG rendering (documented in feature and README).
- tests/unit/png.test.js: unit tests described above.
