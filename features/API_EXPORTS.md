# API_EXPORTS

Summary
Define and document the public API surface exported as named exports from src/lib/main.js so consumers and tests can import specific functions.

Specification
- Expected named exports include at minimum: parseExpression, parseRange, generateSeries, loadCSV, renderSVG, renderPNG, savePlot (or saveFile), and cliMain (or main).
- Each exported function must have a clear, testable contract documented in JSDoc-style prose in src/lib/main.js.

Acceptance criteria
- src/lib/main.js exports the named functions listed above and each export is a callable function.
- Unit tests import the module and assert the presence and type of each named export.

Test plan
- Add tests/unit/exports.test.js that import src/lib/main.js and assert that named exports exist and are functions.

Files to change
- src/lib/main.js: organize and export named functions.
- tests/unit/exports.test.js: unit tests described above.
