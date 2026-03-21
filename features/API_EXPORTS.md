# API_EXPORTS

Goal
Ensure the library exposes its public API as named exports from src/lib/main.js.

Behavior
- Export named functions toRoman and fromRoman from src/lib/main.js.
- Avoid a default export for the core API.
- Optionally expose a small CLI helper as a separate named export (for example runCli) but core functions must remain available as named exports.

Acceptance Criteria
- src/lib/main.js exports named functions toRoman and fromRoman
- Importing from src/lib/main.js as named imports yields functions with those names
