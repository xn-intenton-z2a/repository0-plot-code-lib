PROCESS_ARGV

NORMALISED EXTRACT
Table of contents:
- Overview
- process.argv structure
- Argument parsing patterns
- Range parsing (start:step:end)
- --help semantics
- Edge cases

Overview:
process.argv is a Node.js provided array of strings. The first two entries are the Node executable path and the script path; user arguments start at index 2.

process.argv parsing:
- Supported flag forms: --key=value, --key value, --flag (boolean)
- Implementation pattern (iterative parser):
  1) let args = process.argv.slice(2)
  2) walk args; when an entry starts with "--" treat as flag; if it contains '=' split into key/value; otherwise the next entry is the value unless the flag is boolean
  3) store flags in an object mapping string->string|boolean
- For negative numeric flag values prefer --flag=value to avoid parsing as a new flag

Range parsing (start:step:end):
- Format: three fields separated by ':' (exactly two separators)
- Parse each part with parseFloat or Number; require finite numbers
- Require step !== 0; generate points using a loop with careful floating rounding (use x = start; while ((step>0 && x<=end) || (step<0 && x>=end)) { push x; x = x + step; })
- Estimated point count: Math.floor((end - start)/step) + 1 (watch rounding)

--help semantics:
- Detect presence of --help or -h; print concise usage examples matching the CLI flags and exit 0

Edge cases:
- Shell preserves quoted values so process.argv receives them intact
- Values starting with '-' need explicit --flag=value to disambiguate
- Always validate numeric values with Number.isFinite after parseFloat

SUPPLEMENTARY DETAILS
- Use process.exit(code) for explicit termination. 0 indicates success; non-zero indicates error.
- Avoid using eval or new Function for CLI parsing; use deterministic string parsing and Number parsing.
- For robust parsing consider support for repeated flags and arrays (collect multiple occurrences into arrays).

REFERENCE DETAILS
- process.argv: string[] (array of command-line arguments provided by Node.js)
- process.exit(code?: number): never — exits the process with given status
- Behavior: user args start at index 2; shell handles quoting

DETAILED DIGEST
Source: https://nodejs.org/api/process.html#processargv
Retrieved: 2026-03-23
Bytes fetched: 694208

ATTRIBUTION
Source origin: Node.js documentation (nodejs.org)

