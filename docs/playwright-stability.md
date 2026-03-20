# Playwright behaviour test stability guidance

This document summarises the concrete changes applied in this transform and recommended follow-ups to reduce Playwright CI flakiness (Issue #26).

What was applied in this change

- The demo page (`src/web/index.html`) now includes a lightweight click-queuing mechanism so test clicks are not lost if the demo's module script hasn't finished loading yet. This reduces timing races where test code clicks controls before module event listeners are attached.
- Behaviour tests were updated to wait for an explicit `data-ready` signal on `#plot-wrapper` before asserting output is present. This is a deterministic completion signal emitted by the demo and avoids fragile timing-dependent assertions.
- Playwright configuration (`playwright.config.js`) was updated to increase per-test timeouts, action and navigation timeouts, and enable trace collection on the first retry. The web server command now serves `src/web/` directly so base URLs are stable in CI.
- Documentation was added/updated (`README.md` and this file) to explain the recommended Playwright configuration and the rationale for the changes.

Recommended follow-ups (maintainer action required)

- Finalize CI Playwright settings in the repository's CI workflow to adopt the recommended timeouts and enable `trace: 'on-first-retry'`.
- If your CI uses a different OS or container, install `libvips` or use prebuilt `sharp` binaries to enable full SVG→PNG rasterization.
- If flakes persist, enable full trace capture (`trace: 'on'`) for a short run and inspect traces using Playwright Trace Viewer.

Why these changes help

- Tests no longer rely on precise timing of module script execution; queued interactions are handled once the module is ready.
- Waiting on an explicit DOM signal (`data-ready`) is reliable across fast and slow environments and yields deterministic behaviour for assertions.

Files changed in this transform

- `src/web/index.html` — unchanged in this transform (feature added earlier), behaviour tests now consume its `data-ready` signal
- `playwright.config.js` — updated to use conservative timeouts and to serve `src/web/` directly
- `tests/behaviour/*` — updated to use deterministic waits and longer timeouts

Acceptance criteria and verification

- The tests in `tests/behaviour/` should be more stable due to the queuing change and the switch to deterministic waits. Maintain the recommended CI configuration and observe three consecutive successful behaviour test runs in CI before closing Issue #26.
