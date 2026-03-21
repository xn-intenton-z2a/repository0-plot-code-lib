TABLE OF CONTENTS:
1. Module overview and module context
2. Import forms and grammar
3. Dynamic import and top-level await
4. Browser vs Node differences (resolution and file extensions)
5. Live bindings and circular dependencies
6. Implementation notes for the project
7. Reference details and troubleshooting
8. Digest and attribution

NORMALISED EXTRACT:
1) Module overview
- Modules are files executed in module scope (not global); they use strict mode semantics, and top-level scope is module-local.
- Use export to expose bindings and import to consume them.

2) Import forms (exact syntax examples):
- Named import: import { name1, name2 as alias } from "./module.js"
- Default import: import defaultExport from "./module.js"
- Namespace import: import * as ns from "./module.js"
- Mixed: import defaultExport, { named } from "./module.js"
- Dynamic import (returns Promise): import("./module.js").then(mod => { /* use mod */ }) or await import("./module.js")

3) Dynamic import and top-level await
- Dynamic import returns a Promise resolving to module namespace object; can be used in conditional flows.
- Top-level await is supported in module contexts (browsers and modern Node) allowing await at module top-level.

4) Browser vs Node differences (resolution rules and extensions)
- Browsers expect full specifiers for relative imports including file extension (./module.js).
- Node ESM: when package.json has "type": "module", .js files are treated as ESM; .mjs is alternative for ESM and .cjs for CommonJS.
- Node resolution commonly requires file extensions in relative import specifiers; prefer explicit extensions to avoid resolution errors.

5) Live bindings and circular dependencies
- Exports are live bindings; circular dependencies are supported provided code uses exported bindings (the values are updated as the exporting module executes).

6) Implementation notes for this project
- Source files are ES modules (package.json uses "type": "module"). Use named exports for library functions and import them with explicit file extension in tests: import { fizzBuzz } from "./src/lib/main.js"
- Prefer Array.from or simple loops to build the 1..n sequence; Number.isInteger validation should be used prior to algorithmic steps.

REFERENCE DETAILS (exact syntax and patterns):
- Import grammar: importClause fromModuleSpecifier where importClause is one of the forms shown above.
- Dynamic import returns Promise<ModuleNamespace> — in practice use await import(specifier) in async contexts.
- Recommended file-level pattern: export all public API at module bottom with export { name1, name2 } or use inline export declarations.

TROUBLESHOOTING:
- Symptom: SyntaxError: Cannot use import statement outside a module -> ensure module is executed as ESM (package.json "type": "module" or .mjs extension).
- Symptom: Module not found for relative path -> verify relative path includes extension and is correct relative to importing file.

DIGEST:
- Source: MDN — JavaScript modules guide
- URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
- Date retrieved: 2026-03-21
- Extracted technical points: import/export grammar, dynamic import, top-level await, browser vs Node resolution differences, live bindings, recommended ESM usage patterns.

ATTRIBUTION AND DATA SIZE:
- Attribution: MDN Web Docs (JavaScript modules guide)
- Bytes retrieved from source in crawl: 264101 bytes
