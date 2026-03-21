# CLI_TOOL

Summary
Provide a minimal command-line interface that exposes the library conversion functions so users can convert integers to Roman numerals and back from the shell.

Description
This feature adds a tiny CLI wrapper around the library exports in src/lib/main.js. The CLI accepts two primary commands: toRoman and fromRoman. It must be a thin adapter that delegates to the named exports and return appropriate exit codes and stdout/stderr messages for success and failure.

Usage examples
- Running node src/lib/main.js toRoman 1994 prints MCMXCIV to stdout and exits with code 0.
- Running node src/lib/main.js fromRoman MCMXCIV prints 1994 to stdout and exits with code 0.
- Running node src/lib/main.js toRoman 0 prints an error message to stderr and exits with non-zero code.

API and behavior
- The CLI uses named exports toRoman and fromRoman from src/lib/main.js so the core library remains the primary API surface.
- Input parsing is strict: numeric arguments are parsed as integers; non-integer numeric inputs cause an error.
- Errors from the library are surfaced as user-friendly messages on stderr and map to non-zero exit codes.

Acceptance Criteria
- Invoking node src/lib/main.js toRoman 1994 outputs MCMXCIV and exits 0.
- Invoking node src/lib/main.js fromRoman MCMXCIV outputs 1994 and exits 0.
- Invoking node src/lib/main.js toRoman 0 prints an error to stderr and exits with a non-zero code.
- Invoking node src/lib/main.js fromRoman IIII prints an error to stderr and exits with a non-zero code.

Deliverables
- A CLI entrypoint in src/lib/main.js or a small executable wrapper that delegates to the exported functions.
- Unit tests that simulate CLI invocation and assert stdout/stderr and exit codes for success and error cases.

Notes
- Keep CLI parsing simple and deterministic; the library is the authoritative implementation and must be test-covered separately.