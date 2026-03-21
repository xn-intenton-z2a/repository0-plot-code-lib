# API_EXPORTS

Summary
Ensure the library exposes its public API as named exports from src/lib/main.js. No default export should be used so consumers can import specific functions.

Specification
- Named exports required: integerToRoman, romanToInteger
- Module entry point remains src/lib/main.js and package.json main points to this file.
- Exports must be usable with named import syntax.

Acceptance criteria
- Importing with named imports succeeds, for example: import { integerToRoman, romanToInteger } from 'src/lib/main.js' (test imports use relative path as appropriate).
- No default export is present for the conversion functions.

Files changed by this feature
- src/lib/main.js: ensure named exports are present and documented in README.
- tests/unit/main.test.js: import library functions using named imports in tests.
