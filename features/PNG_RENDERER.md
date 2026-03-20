# PNG_RENDERER

Summary

Provide a PNG rendering path by converting the SVG output into a PNG image buffer. Use a well-supported native module such as sharp as the primary implementation option, and describe an alternative (canvas) where appropriate.

Scope

- Expose a named export renderPNG in src/lib/main.js that accepts an SVG string and options and returns a Buffer containing PNG bytes.
- Document the dependency required to support PNG rendering (for example sharp) and how to add it to package.json.
- Ensure the implementation preserves the visual fidelity of the SVG polyline output.

Acceptance criteria

- The returned Buffer starts with the PNG magic bytes: decimal sequence 137,80,78,71,13,10,26,10.
- The API can accept either an SVG string or an already-rendered canvas and produce PNG bytes.
- Behavior and dependency instructions are documented in the README.

Implementation notes

- Prefer sharp for its reliability and wide platform support; show the minimal integration approach in the README and tests.
- Keep the core library free of hard dependency on sharp; detect at runtime and fail with a clear message if PNG conversion is requested but sharp is not installed.

Tests

- Unit test that converting a minimal SVG via renderPNG returns a Buffer whose first eight bytes match the PNG signature.
- Integration test notes describe how CI can opt into tests that require native modules.

# END
