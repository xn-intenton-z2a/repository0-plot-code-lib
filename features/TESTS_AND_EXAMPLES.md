# BEHAVIOUR_STABILITY

Status: Proposed

Summary
Stabilise Playwright behaviour tests and the example fixtures so CI reliably verifies the demo web UI and page-driven assertions (SVG presence, polyline element, reported point count) without intermittent timeouts.

Behavior
- Playwright tests must use a server readiness probe before running page assertions (for example, poll the HTTP endpoint until 200 before navigation).
- Tests should explicitly wait for the svg and polyline elements using locator.waitFor with a sensible timeout rather than relying on implicit timing.
- Tests that depend on optional native renderers (sharp/canvas) must detect renderer availability and either run renderer-specific assertions or skip with a named reason.
- Example fixtures (examples/sample.csv) should exist with stable content used by behaviour and unit tests.

Test changes and resilience
- Increase or parameterise Playwright timeouts where network or CI delays occur; avoid brittle fixed delays.
- Use deterministic input (known expression and range) and assert the displayed points count matches the numeric evaluation (e.g., 629 for -3.14:0.01:3.14).
- When verifying SVG structures, assert the presence of an <svg> element containing a <polyline> child and that a visible text node displays the points count.

Acceptance Criteria
- tests/behaviour/homepage.test.js contains a readiness check that retries the demo server until it returns HTTP 200 before continuing.
- The behaviour test asserts that the page contains an <svg> element with a <polyline> child and that the displayed numeric points count equals the evaluated series length for the canonical example (expression y=Math.sin(x), range -3.14:0.01:3.14 => 629 points).
- Behaviour tests do not use brittle fixed sleeps; all waits use explicit Playwright waitFor/locator-based APIs and pass consistently in CI under typical load (retries set in playwright.config.js remain <= 2).
- Example fixtures: examples/sample.csv exists and is referenced by the behaviour tests; behaviour tests remain skip-free on environments providing the demo server and required renderer.
- CI: Playwright tests on main pass consistently (flakiness reduced) for at least three consecutive runs.
