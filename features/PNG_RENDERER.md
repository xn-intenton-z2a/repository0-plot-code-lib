# PNG_RENDERER

Summary
Provide PNG rendering of a plotted series by converting SVG to PNG or drawing to a Canvas backend; document the chosen approach and any optional dependencies.

Goals
- Implement renderPng(series, options) that returns a Promise resolving to a Buffer containing PNG bytes.
- Acceptable implementations: using sharp to convert SVG to PNG, or using a headless canvas implementation. The chosen approach must be documented.

API Contract
- renderPng(series, options) -> Promise<Buffer>
  - Buffer must contain a valid PNG image; tests will validate the PNG magic bytes.

Behavior and constraints
- External dependencies are allowed only for PNG rendering; document dependency choices in README and feature spec.
- Prefer sharp where available for fast conversion; provide fallback to canvas when sharp is not installed.

Acceptance Criteria
- renderPng returns a Buffer whose first eight bytes match the PNG signature: 137 80 78 71 13 10 26 10.
- Unit test verifies the buffer begins with the PNG magic bytes.

Deliverables
- Named export renderPng from src/lib/main.js, README documentation explaining the approach, and unit tests that assert the PNG signature.

Notes
- If sharp is used, document installation steps in README; keep the implementation optional so tests can run in CI without native deps by stubbing or using a lightweight fallback.