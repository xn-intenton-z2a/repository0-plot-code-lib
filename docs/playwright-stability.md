# Playwright behaviour test stability guidance

This document summarises the concrete changes applied in this transform and recommended follow-ups to reduce Playwright CI flakiness (Issue #26).

What was applied in this change

- The demo page (`src/web/index.html`) now includes a lightweight click-queuing mechanism so test clicks are not lost if the demo's module script hasn't finished loading yet. This reduces timing races where test code clicks controls before module event listeners are attached.
- The page already exposes a `data-ready` signal (`#plot-wrapper[data-ready="true"]`) when plotting completes; the behaviour tests can (and do) use this to deterministically wait for rendering to finish.
- Documentation was added/updated (`docs/playwright-stability.md` and README) to explain the recommended Playwright configuration and the rationale for the change.
- An issue comment was added to Issue #26 summarizing what was changed and next steps for maintainers.

Recommended follow-ups (maintainer action required)

- Increase Playwright timeouts and enable traces in `playwright.config.js` used by CI. Recommended settings:
  - `timeout: 60000` (per-test)
  - `actionTimeout: 30000` and `navigationTimeout: 30000`
  - `webServer.timeout: 120000` to allow the demo server time to start in slower runners
  - `trace: 'on-first-retry'` to capture traces for diagnosing flakes

- Serve `src/web/` directly in the CI web server (e.g., `npx serve src/web -l 3000`) so base URLs are deterministic, or ensure the existing webServer serves the correct path.

- If flakes persist, enable traces for failing runs and inspect the Playwright traces to find the timing bottleneck.

Files changed in this transform

- `src/web/index.html` — added click-queuing and global hook
- `docs/playwright-stability.md` — guidance and recommended config changes
- `README.md` — added a section describing the stability improvement

Why these changes help

- Test runners can be faster than module scripts load in some CI environments; queuing ensures interactions are not lost and the module will process queued requests once ready, making tests more deterministic without changing existing selectors.

Acceptance criteria and verification

- The tests in `tests/behaviour/` are expected to be more stable due to the queuing change, but maintainers should update `playwright.config.js` in CI to increase timeouts as recommended and then monitor CI for three consecutive green behaviour-test runs before closing Issue #26.
