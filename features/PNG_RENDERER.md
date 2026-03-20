# PNG_RENDERER

Status: Proposed

Summary
Provide a deterministic SVG→PNG rasterization strategy with a clear renderer preference (sharp preferred, node-canvas fallback) and a documented test strategy for CI. The implementation must choose the best available renderer at runtime and expose a single renderPNG(svgString, options?) API that returns a Buffer of PNG bytes.

Behavior
- Prefer using the 'sharp' package for SVG→PNG conversion when it is installed and usable.
- If 'sharp' is not available, attempt to use node-canvas (canvas) to rasterize the SVG. If neither renderer is available, renderPNG must reject with an Error containing the phrase "Missing PNG renderer".
- renderPNG(svgString, { width, height, background }) returns a Buffer (`Uint8Array` acceptable) containing PNG bytes at the requested pixel dimensions.
- The renderer selection must be deterministic and discoverable at runtime (for tests, expose a small internal flag or detection function to check which renderer was chosen).

API
Export a named function renderPNG(svgString, options?) from src/lib/main.js that returns a Promise resolving to a Buffer with PNG bytes.

Acceptance Criteria
- When 'sharp' is available, renderPNG called with options.width and options.height returns a Buffer that starts with the PNG signature (bytes 89 50 4E 47 0D 0A 1A 0A) and Buffer.readUInt32BE(16) === options.width and Buffer.readUInt32BE(20) === options.height.
- When only node-canvas is available the same IHDR assertions hold for the produced PNG bytes.
- When neither renderer is installed renderPNG rejects with an Error whose message contains "Missing PNG renderer"; unit tests must assert this behaviour when executing in an environment without either native renderer.
- Tests that assert rasterization must be written so they run deterministically in CI: either CI installs 'sharp' (preferred) or the tests detect renderer availability and skip rasterization assertions with a documented skip reason.

CI and Documentation
Document the preferred renderer and provide CI guidance in README.md: how to install 'sharp' for common platforms or set up node-canvas as a fallback, and how tests will behave if no renderer is available (skip vs fail). Keep the runtime API stable so callers do not need to know which renderer was used.