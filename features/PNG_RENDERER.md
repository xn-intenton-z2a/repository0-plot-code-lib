# PNG_VALIDATION

Status: Proposed

Summary
Ensure SVG-to-PNG rasterization is robust, deterministic in CI, and verifiable by unit tests. The goal is not to change the public renderPNG API surface but to tighten test coverage, document the chosen native dependency, and provide a clear fallback and CI installation strategy.

Behavior
- Prefer the `sharp` library for SVG→PNG conversion at runtime when available.
- When `sharp` is not available, fall back to `canvas` (node-canvas) if installed; otherwise renderPNG must reject with Error containing "Missing PNG renderer".
- Unit tests must perform a meaningful rasterization assertion (verify PNG IHDR width/height and non-trivial pixel data) rather than only checking the PNG magic bytes.
- CI must either install the chosen native renderer (recommended) or run tests that skip rasterization assertions with a deterministic skip reason.

API
No API surface change is required: renderPNG(svgOrSeries, options) continues to return a Buffer/Uint8Array with PNG bytes when a renderer is available, and rejects with a descriptive Error otherwise.

Acceptance Criteria
- Tests: tests/unit/png.test.js is updated so that when a renderer is available the test asserts the returned Buffer begins with the PNG signature (89 50 4E 47 0D 0A 1A 0A) and that the IHDR chunk reports width and height matching options.width and options.height (Buffer.readUInt32BE(16) === width and Buffer.readUInt32BE(20) === height).
- Tests: when neither sharp nor canvas is installed the test deterministically expects renderPNG to reject with an Error whose message contains "Missing PNG renderer" or the test is skipped with a documented skip reason.
- CI: a documented CI change exists (CI config or README) that either installs sharp (recommended) or explicitly documents the environment variable/flag that opts tests into running rasterization checks.
- Documentation: README.md contains a short section documenting the preferred renderer (sharp), the canvas fallback, and exact install notes for common platforms (Linux, macOS) including links or commands.
- Implementation: renderPNG still prefers `sharp` when available and falls back to `canvas`; detection behaviour is exercised by unit tests using dynamically-installed renderer or test-time mocks.
- Test determinism: Updates to tests avoid flaky pixel-level assertions by validating IHDR dimensions and a small set of deterministic pixel properties or using a reproducible SVG fixture.
