# API_EXPORTS

Summary
Document the public named exports from src/lib/main.js and ensure tests verify their presence and types.

Specification
- Named exports implemented in src/lib/main.js: parseExpression, evaluateRange, loadCsvTimeSeries, renderSVG, svgToPng, savePlot, handleCliArgs, main, getIdentity, name, version, description.
- Each exported function must have a clear contract (input and return types); name, version and description are string exports.

Acceptance criteria
- Importing src/lib/main.js yields named exports parseExpression, evaluateRange, loadCsvTimeSeries, renderSVG, svgToPng, savePlot, handleCliArgs, main, getIdentity, name, version, description.
- Each exported function is callable (typeof === 'function') and name/version/description are strings.
- Unit tests assert presence and correct types for each export.

Test plan
- Add tests/unit/exports.test.js which imports src/lib/main.js and asserts each named export exists and has the expected typeof.

Files to change
- tests/unit/exports.test.js: new test that validates the exports listed above.
