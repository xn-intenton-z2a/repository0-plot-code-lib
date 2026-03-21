Normalised extract
The export statement is used to export functions, objects, or primitives from a module so they can be imported by other modules. Supports named and default exports.

Table of contents
- Normalised extract
- Detailed implementation info
- Supplementary details
- Reference API signatures
- Detailed digest
- Attribution

Detailed implementation info
Named exports: export const a = 1; export function f() {}
Default export: export default function() {} or export default expression;
Re-exporting: export { name } from './module';

Semantics
- Exports are live bindings for named exports: importing code sees updates to exported bindings.
- Default export is a single value; importing default creates a local binding to that value (not a live binding to a named variable in the exporting module).

Supplementary details
- Use named exports for multiple items and clearer tooling; use default for module's primary export when appropriate.
- Interop with CommonJS uses transpilation or module interop wrappers.

Reference API signatures
- export { name1, name2 as alias } from 'module';
- export default expression;

Detailed digest
- Retrieved: 2026-03-21T10:11:58.557Z
- Data size (approx): 3.5 KB

Attribution
Source: MDN Web Docs - export statement documentation.