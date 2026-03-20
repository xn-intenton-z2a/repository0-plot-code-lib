# TEST_SUITE

Summary

Describe the unit and integration tests required to validate the mission. The tests must be deterministic, small, and focused on the public named exports of src/lib/main.js.

Scope

- Unit tests for parseExpression, parseRange/evaluateOverRange, loadTimeSeries, renderSVG, and renderPNG.
- Tests should live in tests/unit/ and be executable with the npm test script.
- Where native modules are required (sharp), provide an optional integration test marked or skipped unless the dependency is present.

Acceptance criteria

- Tests assert the key mission acceptance criteria: parsing y=Math.sin(x), range evaluation returning ~628 points for -3.14:0.01:3.14, svg containing polyline and viewBox, png buffer starts with PNG magic bytes, CLI --help and file output behaviors.
- Tests must exercise exported APIs as named imports from src/lib/main.js rather than spawning the CLI when feasible.

Test cases

- parseExpression: parse a set of expressions and assert numeric output properties.
- range evaluate: assert length falls in expected bounds and first/last values approximate the range endpoints.
- csv loader: parse a small CSV fixture and assert parsed types and values.
- svg renderer: assert returned string contains xmlns and viewBox and polyline elements.
- png renderer: when dependency available, assert buffer begins with PNG signature.
- cli runner: call runCli with synthetic argv arrays to validate help text and basic write behavior, using the file system in a temporary directory.

# END
