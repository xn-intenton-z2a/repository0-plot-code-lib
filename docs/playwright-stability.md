# Playwright behaviour test stability fixes

This document summarises the changes made to reduce Playwright CI flakiness (Issue #26).

What was changed

- Increased global and action timeouts in `playwright.config.js` to allow slower CI environments to start the demo server and render the plot.
  - test timeout: 30s
  - navigation/action timeout: 30s
  - webServer startup timeout: 120s
- Serve the demo site directory directly (`npx serve src/web -l 3000`) to remove path dependence on the repository root and make baseURL deterministic.
- Improved behaviour tests (`tests/behaviour/*`) to use explicit, visible waits and conservative timeouts:
  - Wait for input controls to be visible before interacting
  - Wait for `#plot-wrapper svg polyline` to appear before asserting on `#points-count`
  - Use `toContainText` and `waitForSelector` rather than fragile timing-based sleeps
- Added a small sanity check on the polyline `points` attribute (expect at least N coordinate pairs) instead of brittle exact string checks.

Why this helps

- CI environments vary in CPU and I/O; increasing timeouts reduces intermittent failures when the demo server or headless browser is slow.
- Serving `src/web` directly ensures the demo's URLs are stable and avoids extra path handling that could vary across environments.
- Waiting for specific DOM conditions (visible elements and polyline presence) makes the tests deterministic and less sensitive to timing.

Acceptance criteria

- Playwright e2e tests should pass reliably in CI for three consecutive workflow runs with no flaky failures.
- The tests have been updated in `tests/behaviour/` and the Playwright configuration is updated in `playwright.config.js`.

Notes for maintainers

- If CI still shows flakiness, consider:
  - increasing `webServer.timeout` further (e.g., 180000)
  - running the Playwright tests with `--debug` locally to capture diagnostics
  - adding `--trace on-first-retry` in Playwright config to capture traces on retries

Issue tracking

- A comment has been added to Issue #26 summarising these changes; close the issue once CI demonstrates stability for the required runs.
