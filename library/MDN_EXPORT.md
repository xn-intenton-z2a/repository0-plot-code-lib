TABLE OF CONTENTS:
1. Export forms
2. Named exports semantics
3. Default exports
4. Re-exporting
5. Live bindings and evaluation timing
6. Recommended export patterns for this project
7. Reference details: function signatures, parameter and return types, thrown errors
8. Digest and attribution

NORMALISED EXTRACT:
1) Export forms (explicit syntax examples)
- Declaration forms: export function name(params) { ... }  
- Named constant declaration: export const name = value  
- Export list: export { name1, name2 as alias }  
- Default export: export default expression  
- Re-export from another module: export { name } from "module"  and export * from "module"

2) Named exports semantics
- Named exports create named bindings that importing modules reference with exact identifier names (or using as alias).  
- Import syntax for named exports: import { name } from "module"  
- Imported bindings are read-only in the importer; the exporter provides a live binding that reflects updates to the exported local binding.

3) Default exports
- A module can provide a single default export; import without braces: import defaultName from "module"  
- Modules can expose both default and named exports concurrently.

4) Re-exporting
- Re-exporting forwards exports from another module without creating local bindings (export * from "module") or selectively re-exports named bindings (export { name } from "module").

5) Live bindings and evaluation timing
- Export bindings are created before module execution; modules support circular dependencies using live bindings.  
- Assignment to an exported local binding updates the value observed by importers; importers cannot reassign imported bindings.

6) Recommended export patterns for this project (practical rules)
- Use named exports for library functions that are consumed by tests and consumers. Two recommended patterns:  
  Pattern A — inline named declarations:
  export function fizzBuzz(n) { /* implementation */ }
  export function fizzBuzzSingle(n) { /* implementation */ }

  Pattern B — define then export list (preferred when implementing helpers internally):
  function fizzBuzz(n) { /* implementation */ }
  function fizzBuzzSingle(n) { /* implementation */ }
  export { fizzBuzz, fizzBuzzSingle }

- Importing these functions from another module (relative path) should include file extension when running under Node ESM: import { fizzBuzz } from "./src/lib/main.js"

REFERENCE DETAILS (project-level API specifications and exact behaviors):
- Function: fizzBuzz(n)
  Parameters: n — number (integer, required). Accepts integer n >= 0.
  Returns: Array of strings (length n). Each element follows the FizzBuzz rule:
    - if value divisible by 3 -> "Fizz"
    - if divisible by 5 -> "Buzz"
    - if divisible by both 3 and 5 -> "FizzBuzz"
    - otherwise the decimal representation of the number as a string
  Errors: Throws TypeError if n is not an integer (Number.isInteger(n) === false). Throws RangeError if n < 0.
  Edge behavior: fizzBuzz(0) returns an empty array []

- Function: fizzBuzzSingle(n)
  Parameters: n — number (integer, required). Expects a positive integer (n >= 1).
  Returns: string — the single FizzBuzz result for n using the same rules as above.
  Errors: Throws TypeError if n is not an integer. Throws RangeError if n <= 0.

- Export pattern (exact implementation recommendation):
  Use one of the patterns above; when publishing as an ES module ensure package.json contains "type": "module" or use .mjs extension. Prefer Pattern B for clearer separation between implementation and exports when tests import named functions.

SUPPLEMENTARY DETAILS:
- Use Number.isInteger to validate integerness: Number.isInteger(n) returns false for NaN and non-integer values.
- Use the remainder operator (%) to detect divisibility: (n % 3) === 0, (n % 5) === 0.
- When converting a non-Fizz/Buzz value to string use String(n) (returns decimal representation).

TROUBLESHOOTING (export/import common errors):
- Error: "Cannot use import statement outside a module" -> ensure package.json has "type": "module" or rename file to .mjs for Node.
- Error: "Module not found" using relative import -> ensure the import specifier includes the correct relative path and file extension (./src/lib/main.js).

DIGEST (extracted content and retrieval):
- Source: MDN — export statement
- URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
- Date retrieved: 2026-03-21
- Extracted technical points: export forms, named vs default, re-exporting, live bindings, recommended patterns for library exports, exact function signatures and error semantics for fizzBuzz and fizzBuzzSingle.

ATTRIBUTION AND DATA SIZE:
- Attribution: Content extracted from MDN Web Docs (MDN export statement). Use under MDN terms.
- Bytes retrieved from source in crawl: 211588 bytes
