# TESTS_AND_EXAMPLES

Status: Implemented (closed: #7, #8, #13, #22, #28, #30)

Summary
Provide a clear, minimal test and example surface that demonstrates the library and CLI behaviour required by the mission. Unit tests must verify expression parsing, range evaluation, CSV loading, SVG structure and CLI flags; rasterization tests must be deterministic or clearly skipped in CI when native renderers are not available. Provide at least one small stable example CSV in examples/sample.csv used by tests and behaviour suites.

Behavior
- Unit tests under tests/unit/ must include focused tests for:
  * parseExpression("y=Math.sin(x)") returns a callable function and evaluates close to 1 at x = Math.PI/2.
  * parseRange("-3.14:0.01:3.14") returns numeric start, step, end and evaluateRange yields 629 points for the canonical range.
  * loadCSV correctly parses a minimal RFC4180-compliant sample (time,value) into [{time, value}].
  * renderSVG(points) returns a string containing <svg with a viewBox attribute and a <polyline> element.
  * CLI --help prints usage and example commands to stdout.
  * CLI end-to-end example (using expression and range) writes an .svg file containing <svg and viewBox attribute.

- PNG rasterization tests must assert PNG signature and IHDR width/height when a renderer is available and otherwise skip deterministically with a documented reason. To avoid masking rasterization gaps a non-triviality check must be added: when a renderer is present the produced PNG Buffer.byteLength must be >= 1024 bytes.

- Behaviour tests (Playwright) must probe the demo server for readiness and then assert the page contains an SVG element with a polyline and that the displayed points count equals the evaluated series length for the canonical example.

Acceptance Criteria
- Tests: tests/unit/core.test.js (or equivalent) exists and contains passing tests that verify parseExpression, parseRange/evaluateRange, loadCSV and renderSVG structure as described above.
- Points count: evaluateRange(parseExpression('y=Math.sin(x)'), -3.14, 0.01, 3.14) produces 629 points and a unit test asserts the exact length.
- PNG rasterization tests: when detectPNGRenderer() reports a native renderer is available the unit tests assert:
  * produced Buffer starts with PNG magic bytes (89 50 4E 47 0D 0A 1A 0A),
  * IHDR width/height fields equal the requested dimensions, and
  * Buffer.byteLength >= 1024 to avoid trivial fallbacks.
  When no renderer is available the tests must assert renderPNG rejects with "Missing PNG renderer" or skip the rasterization assertions but record the skip reason.
- CLI help: tests call node src/lib/main.js --help (programmatically or via spawn) and assert stdout contains the usage pattern and examples.
- Examples: examples/sample.csv exists and is referenced by at least one test; tests do not rely on external network resources.
- Behaviour tests: Playwright behaviour tests include a readiness probe (HTTP 200) before asserting the svg/polyline presence and points count; tests avoid brittle sleeps and use locator.waitFor APIs.

- All unit tests in tests/unit/ must pass locally and in CI (for example via npm test or npm run test:unit); failing tests must include a clear, actionable message and not be silently skipped without documentation.
- README.md must document CLI usage with concrete example commands for generating SVG and PNG output and include a short explanation of the PNG rendering approach (sharp preferred, node-canvas fallback) and CI expectations for rasterization tests.

Notes
Keep tests focused and deterministic: prefer asserting on structural output (presence of viewBox, polyline, IHDR header fields) rather than pixel-by-pixel visual equality. Document any test skips and CI requirements in README.md. Where CI cannot be changed immediately, ensure tests communicate the required change (for example a failing test or documented skipped test with an explicit reason) so maintainers can address CI rasterizer availability.
