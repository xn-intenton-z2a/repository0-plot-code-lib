PNG_RENDERER

Overview

Provide a conversion path from the generated SVG to a PNG buffer or file. External dependencies are allowed here; prefer sharp for simplicity and reliability but include a fallback strategy in documentation.

Behavior

- Expose a named export renderPng(svgString, options?) -> Buffer (PNG bytes) or write directly to a file path when requested.
- The implementation documents which dependency is required (sharp recommended) and how to install it for users who need PNG output. Tests can use a mock or run if sharp is available in the test environment.

API

- renderPng(svgString, opts?) -> Promise<Buffer>
  - opts.width/height optional to control rasterization size.

Acceptance criteria

- When a PNG Buffer is produced, its first four bytes match the PNG magic bytes (hex 89 50 4E 47).  
- The README documents the approach chosen (sharp or canvas) and includes an installation note for the optional dependency.

Testing

- Unit tests should either use a small SVG fixture and verify the returned Buffer starts with PNG magic bytes or mock the conversion when the optional dependency is not installed.

Implementation notes

- Prefer sharp for server-side conversion: sharp(Buffer.from(svgString)).png().toBuffer().  
- Document the fallback and test-time behavior in the README and tests.