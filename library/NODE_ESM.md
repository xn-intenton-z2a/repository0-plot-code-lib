NODE_ESM

Normalised extract

Table of contents
- package.json "type" field and file extension rules
- Module resolution and file extensions (.mjs, .cjs, .js)
- Named export syntax and patterns
- Import syntax and dynamic import signature
- import.meta.url and file URL helpers
- Interop with CommonJS: createRequire and patterns
- Top-level await and runtime considerations

Details
package.json "type" field and file extension rules
- When package.json includes "type": "module", files with extension .js are treated as ECMAScript modules (ESM).
- Files with extension .mjs are always treated as ESM; files with extension .cjs are always treated as CommonJS regardless of the package type field.
- Absent an explicit "type" field, .js is treated as CommonJS unless the file uses the .mjs extension or a package "exports" map enforces ESM.

Module resolution and file extensions
- Local file specifiers in import statements generally must include a file extension when importing a file: use import x from './file.js' rather than './file'.
- The Node resolver follows the package exports/imports algorithms when package.json contains an "exports" field; this can map import specifiers to concrete files.
- Directory index resolution (index.js) may be affected by package exports; prefer explicit paths in libraries.

Named export syntax and patterns
- Named exports (public API) must be exported with one of the following forms:
  export function parse(x) { /*...*/ }
  export const VERSION = '1.0'
  export { parse, VERSION }
- To export an identifier under a different public name: export { internal as publicName }
- Avoid relying on default exports for the library public API if the acceptance criteria require named exports; prefer explicit named exports for each public symbol.

Import syntax and dynamic import
- Static import forms and exact syntax:
  import defaultExport from './mod.js'
  import { named1, named2 as alias } from './mod.js'
  import * as ns from './mod.js'
- Dynamic import signature and behaviour:
  const mod = await import('./mod.js')  // returns a module namespace object with exported properties
- Dynamic import returns a Promise that resolves to the module namespace object containing named exports as properties.

import.meta.url and file URL helpers
- import.meta.url is a string giving the module's file URL (file://...); use the "url" module to convert it to a filesystem path.
  import { fileURLToPath } from 'url'
  const __filename = fileURLToPath(import.meta.url)
  import path from 'path'
  const __dirname = path.dirname(__filename)
- Use fileURLToPath(url) to convert a file: URL to a platform file path; its runtime signature: fileURLToPath(url: string | URL) -> string

Interop with CommonJS: createRequire and patterns
- To require CommonJS modules from ESM code or to use require semantics, use createRequire from the built-in module module:
  import { createRequire } from 'module'
  const require = createRequire(import.meta.url)
  const pkg = require('some-cjs-package')  // behaves like CommonJS require
- createRequire(from) returns a CommonJS-compatible require function that resolves relative to the provided URL or path.
- CommonJS modules do not provide named ESM exports; importing them via ESM yields a default namespace object containing exported properties. For safe interoperability, prefer using createRequire when exact CommonJS behaviour is required.

Top-level await and runtime considerations
- Top-level await is allowed in ESM modules; an ESM module that uses top-level await will suspend its evaluation until the awaited promise resolves.
- When designing a CLI library, avoid long-running top-level awaits that block module initialization; prefer exported async functions that callers can await.

Supplementary details
- package.json exports field: use the "exports" map to define entry points and force particular import paths; the exports map can restrict imports to specific subpaths and should be set when publishing packages.
- When authoring a library that must be importable by CommonJS and ESM consumers, provide a dual package entry strategy (e.g., an "exports" map that exposes both ./cjs and ./esm entry points) or provide a CJS build alongside the ESM source.

Reference details (API signatures and concrete patterns)
- export signatures (ESM syntax):
  export function name(...) { }
  export const name = ...
  export { name1, name2 as alias }
  export default <expression>
- import signatures (ESM):
  import defaultExport from 'specifier'
  import { named } from 'specifier'
  import * as ns from 'specifier'
  const ns = await import('specifier')  // dynamic import returns Promise<ModuleNamespace>
- fileURLToPath (url module):
  import { fileURLToPath } from 'url'
  fileURLToPath(url: string | URL) -> string
- createRequire (module):
  import { createRequire } from 'module'
  const require = createRequire(from: string | URL)
  require(moduleId: string) -> any

Detailed digest
- Source: https://nodejs.org/api/esm.html
- Retrieved: 2026-03-20
- Bytes obtained (HTTP content-length): 125511
- Extract (condensed): Node ESM support governs module interpretation via package.json "type" and file extensions; .mjs and .cjs override package-level defaults; ESM uses import/export syntax and supports dynamic import and import.meta.url; createRequire(import.meta.url) produces a require function for CommonJS interop; top-level await is supported; prefer explicit named exports for library public API.

Attribution
- Source URL: https://nodejs.org/api/esm.html
- Retrieved: 2026-03-20
- Bytes fetched: 125511
