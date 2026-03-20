# PNG_RENDERER

Status: Implemented (closed: #7, #8, #13, #22, #28, #30)

Summary
Provide a deterministic SVG→PNG rasterization strategy with a clear renderer preference (sharp preferred, node-canvas fallback) and a documented test strategy for CI. The implementation must choose the best available renderer at runtime and expose a single renderPNG(svgString, options?) API that returns a Buffer of PNG bytes.

Behavior
- Prefer using the 'sharp' package for SVG→PNG conversion when it is installed and usable.
- If 'sharp' is not available, attempt to use node-canvas (canvas) to rasterize the SVG. If neither renderer is available, renderPNG must reject with an Error containing the phrase "Missing PNG renderer".
- renderPNG(svgString, { width, height, background }) returns a Buffer (`Uint8Array` acceptable) containing PNG bytes at the requested pixel dimensions.
- The renderer selection must be deterministic and discoverable at runtime (for tests, expose a small internal detection function to check which renderer was chosen).

API
Export a named function renderPNG(svgString, options?) from src/lib/main.js that returns a Promise resolving to a Buffer with PNG bytes.

Additionally export a small detection helper detectPNGRenderer() that returns the selected renderer string ('sharp' | 'canvas' | null) so tests and CI can make deterministic decisions about which assertions to run.

Acceptance Criteria
- When 'sharp' is available, renderPNG called with options.width and options.height returns a Buffer that starts with the PNG signature (bytes 89 50 4E 47 0D 0A 1A 0A), Buffer.readUInt32BE(16) === options.width and Buffer.readUInt32BE(20) === options.height, and Buffer.byteLength >= 1024 to avoid trivial 1x1 fallbacks.
- When only node-canvas is available the same IHDR and size assertions hold for the produced PNG bytes.
- When neither renderer is installed renderPNG rejects with an Error whose message contains "Missing PNG renderer"; unit tests must assert this behaviour when executing in an environment without either native renderer.
- detectPNGRenderer() returns the selected renderer string or null when none available; unit tests must use this to decide whether to run full rasterization assertions or the missing-renderer rejection assertion.
- Tests must not accept a trivial 1x1 PNG as success; when a renderer is present the produced PNG must be non-trivial (>= 1024 bytes) to be considered a valid rasterization in unit tests.

CI and Documentation
- Document the preferred renderer and provide CI guidance in README.md: how to install 'sharp' for common platforms or set up node-canvas as a fallback, and how tests will behave if no renderer is available (skip vs fail).
- Recommendation: include 'sharp' as an optional devDependency or ensure CI installs it so that at least one CI job exercises real SVG→PNG rasterization and validates IHDR width/height and size assertions. If maintaining CI changes is not possible, document the required CI job configuration in README and in the PNG renderer feature spec.
- Tests must be written to detect renderer availability via detectPNGRenderer() and then:
  * If a renderer is available: assert PNG signature, IHDR width/height match options, and Buffer.byteLength >= 1024.
  * If no renderer: assert renderPNG rejects with "Missing PNG renderer" or skip full rasterization tests with a documented skip reason.

Notes
Keep the runtime API stable so callers do not need to know which renderer was used. Expose the detection helper for diagnostics and CI assertions so the test-suite is deterministic and clearly documents the environment expectations for rasterization.
