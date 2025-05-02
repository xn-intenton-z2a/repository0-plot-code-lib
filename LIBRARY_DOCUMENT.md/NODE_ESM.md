# NODE_ESM

## Crawl Summary
Node.js supports ECMAScript modules which are enabled via file extensions (.mjs), package.json type settings, or CLI flags. Import specifiers are classified as relative, bare, or absolute. Mandatory file extensions are enforced similar to browser environments. Supported URL schemes include file:, node:, and data:, with special handling for query strings and percent-encoded characters. Import attributes (e.g. { type: 'json' }) are required for JSON modules. Built-in modules and dynamic import() expressions are supported. The import.meta object provides module-specific metadata, including url, filename, dirname, and a synchronous resolve function. Interoperability with CommonJS is achieved through module.createRequire() and special resolution behavior. The resolution algorithm (ESM_RESOLVE and ESM_FILE_FORMAT) details rules for resolving specifiers, handling bare specifiers via node_modules, and defining module formats. Custom loaders can override these defaults.

## Normalised Extract
Table of Contents:
  1. Introduction
    - Overview of ESM format and interoperability with CommonJS
  2. Enabling Modules
    - .mjs extension, package.json "type": "module", --input-type flag
  3. Import Specifiers
    - Relative specifiers require file extensions
    - Bare specifiers resolved via node_modules and package exports
    - Absolute specifiers as file URLs
  4. File Extensions and URLs
    - Mandatory file extensions; percent-encoding in URLs
    - Supported schemes: file:, node:, data:
  5. Import Attributes
    - Syntax for JSON modules: with { type: 'json' }
  6. Built-in Modules and Dynamic Imports
    - Default and named exports, dynamic import() usage
  7. import.meta Object
    - Properties: url, filename, dirname, resolve(specifier[, parent])
    - Method signature: import.meta.resolve(specifier: string, parent?: string|URL) returns string
  8. Module Resolution Algorithms
    - ESM_RESOLVE for full resolution and format detection
    - ESM_FILE_FORMAT for determining module type based on extension or content
  9. Customization Hooks
    - How to customize resolver behaviors using experimental hooks

Detailed Information:
1. Introduction: Use ECMAScript modules to enable modular JavaScript with clear boundary between CommonJS and ESM. Provide interoperability through default exports and module.createRequire().

2. Enabling Modules: When no explicit markers exist, Node.js inspects source code for ESM syntax; use explicit markers to avoid ambiguity.

3. Import Specifiers: Relative specifiers (./, ../) require complete file paths. Bare specifiers refer to packages and use package.json export fields if available.

4. File Extensions and URLs: Always include file extensions; use url.pathToFileURL for conversion. Query strings create separate module loads.

5. Import Attributes: Mandatory for JSON imports. Syntax: import data from './data.json' with { type: 'json' }.

6. Built-in Modules: Import built-in modules with node: prefix, e.g. import fs from 'node:fs'.

7. import.meta Object: Use to get module-specific info. Example: import.meta.url returns absolute URL; import.meta.resolve('module-name') synchronously resolves specifiers.

8. Module Resolution Algorithms:
   - ESM_RESOLVE(specifier, parentURL): if specifier is URL, resolve directly; else if relative, resolve via URL resolution; if bare, use PACKAGE_RESOLVE.
   - ESM_FILE_FORMAT(url): determines format based on extension (.mjs -> module, .cjs -> commonjs, .json -> json) or detection of ESM syntax.

9. Customization Hooks: Use experimental hooks to override resolution; remove deprecated hooks such as getFormat, transformSource in favor of load and globalPreload hooks.


## Supplementary Details
Technical Specifications:
- Enabling ESM:
  • File Extensions: .mjs for modules, .cjs for CommonJS
  • package.json field: "type": "module" or "commonjs"
  • CLI Flags: --input-type=module or --input-type=commonjs

- Import Attributes:
  • Syntax: import foo from './foo.json' with { type: 'json' }
  • Mandatory for JSON modules

- import.meta Object:
  • Properties:
     - url: string representing the absolute file URL
     - filename: string, equivalent to url.fileURLToPath(import.meta.url)
     - dirname: string, directory of the file
  • Method: resolve(specifier: string, parent?: string|URL) => string

- Resolution Algorithms:
  • ESM_RESOLVE(specifier, parentURL): returns object with resolved URL and format.
  • ESM_FILE_FORMAT(url): returns 'module', 'commonjs', 'json', 'wasm', or 'addon'

- Customization Hooks for loaders: Hooks allow asynchronous module resolution and loading; experimental support for chaining module customization hooks.

- Best Practices:
  • Always specify file extensions
  • Use import.meta.filename and import.meta.dirname instead of __filename and __dirname
  • For CommonJS compatibility use module.createRequire()

- Troubleshooting Procedures:
  • If import resolution fails, check explicit file extensions, verify package.json "type", and use import.meta.resolve() to debug path resolution.
  • For modules with query strings, clear loader cache if duplicate loads occur.
  • Use trace events in Node.js by enabling --trace-resolve to log resolution details.


## Reference Details
API Specifications:
1. import.meta.resolve(specifier: string, parent?: string | URL) => string
   - Parameters:
       specifier: string - The module specifier to resolve relative to the current module.
       parent (optional): string|URL - An absolute URL from which resolution begins (defaults to import.meta.url).
   - Returns: string - The absolute URL string of the resolved module.
   - Exceptions: May throw errors such as Invalid Module Specifier if the specifier is malformed.

2. ESM_RESOLVE(specifier: string, parentURL: string) => { format: string, resolved: string }
   - Detailed steps:
       a. If specifier is a valid URL, parse and return.
       b. If specifier is relative, perform standard URL resolution.
       c. If bare, delegate to PACKAGE_RESOLVE to handle node_modules lookup and package exports.
   - Return Types: format may be 'module', 'commonjs', 'json', 'wasm' or undefined if resolution fails.

3. ESM_FILE_FORMAT(url: string) => string
   - Determines the module format based on file extension:
       .mjs returns 'module'
       .cjs returns 'commonjs'
       .json returns 'json'
       .wasm returns 'wasm' (if enabled)
       .node returns 'addon' (if enabled)
       .js may return either based on package.json "type" or ESM syntax detection

Code Examples:
// Example of a module exporting a function using ESM
// addTwo.mjs
function addTwo(num) {
  return num + 2;
}
export { addTwo };

// Example of importing the ESM module
// app.mjs
import { addTwo } from './addTwo.mjs';
console.log(addTwo(4)); // Output: 6

// Example of using import.meta
console.log(import.meta.url);
const resolved = import.meta.resolve('./dep.js');
console.log(resolved);

// Using module.createRequire for CommonJS compatibility
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const cjsModule = require('./cjsModule');

Configuration Options and Flags:
- --input-type=module or --input-type=commonjs
- package.json: {
    "type": "module"
  }
- Experimental Flags: --experimental-wasm-modules, --experimental-addon-modules, --experimental-import-meta-resolve

Best Practices with Implementation Code:
- Always specify file extensions in import statements.
- Replace __filename and __dirname usage with import.meta.filename and import.meta.dirname.
- For dynamic module loading in CommonJS, use dynamic import() or module.createRequire().
- Validate module paths with import.meta.resolve() to debug resolution issues.

Troubleshooting Procedures:
- Command: node --trace-resolve app.mjs
  Expected Output: Detailed logs of module resolution steps including resolved URLs and format decisions.
- Check package.json for correct "type" field if modules do not load as expected.
- Use url.pathToFileURL to convert file paths if discrepancies exist between URL resolution and file system paths.


## Information Dense Extract
ESM enabled via .mjs, package.json "type": "module", --input-type flag; Import specifiers: relative (require full extension), bare (node_modules lookup, package "exports"), absolute (file URL). Mandatory file extensions. Supported URL schemes: file:, node:, data:; Import attributes: syntax 'with { type: "json" }' mandatory for JSON. import.meta: properties url, filename, dirname; method: resolve(specifier: string, parent?: string|URL): string; Resolution: ESM_RESOLVE returns {resolved, format}, ESM_FILE_FORMAT returns module format based on extension (.mjs->module, .cjs->commonjs, .json->json, .wasm, .node); Use module.createRequire for CommonJS in ESM; Flags: --experimental-wasm-modules, --experimental-addon-modules; Best Practices: explicit file extensions, usage of import.meta.* in lieu of CommonJS globals; Troubleshooting: use --trace-resolve and url.pathToFileURL for debugging.

## Sanitised Extract
Table of Contents:
  1. Introduction
    - Overview of ESM format and interoperability with CommonJS
  2. Enabling Modules
    - .mjs extension, package.json 'type': 'module', --input-type flag
  3. Import Specifiers
    - Relative specifiers require file extensions
    - Bare specifiers resolved via node_modules and package exports
    - Absolute specifiers as file URLs
  4. File Extensions and URLs
    - Mandatory file extensions; percent-encoding in URLs
    - Supported schemes: file:, node:, data:
  5. Import Attributes
    - Syntax for JSON modules: with { type: 'json' }
  6. Built-in Modules and Dynamic Imports
    - Default and named exports, dynamic import() usage
  7. import.meta Object
    - Properties: url, filename, dirname, resolve(specifier[, parent])
    - Method signature: import.meta.resolve(specifier: string, parent?: string|URL) returns string
  8. Module Resolution Algorithms
    - ESM_RESOLVE for full resolution and format detection
    - ESM_FILE_FORMAT for determining module type based on extension or content
  9. Customization Hooks
    - How to customize resolver behaviors using experimental hooks

Detailed Information:
1. Introduction: Use ECMAScript modules to enable modular JavaScript with clear boundary between CommonJS and ESM. Provide interoperability through default exports and module.createRequire().

2. Enabling Modules: When no explicit markers exist, Node.js inspects source code for ESM syntax; use explicit markers to avoid ambiguity.

3. Import Specifiers: Relative specifiers (./, ../) require complete file paths. Bare specifiers refer to packages and use package.json export fields if available.

4. File Extensions and URLs: Always include file extensions; use url.pathToFileURL for conversion. Query strings create separate module loads.

5. Import Attributes: Mandatory for JSON imports. Syntax: import data from './data.json' with { type: 'json' }.

6. Built-in Modules: Import built-in modules with node: prefix, e.g. import fs from 'node:fs'.

7. import.meta Object: Use to get module-specific info. Example: import.meta.url returns absolute URL; import.meta.resolve('module-name') synchronously resolves specifiers.

8. Module Resolution Algorithms:
   - ESM_RESOLVE(specifier, parentURL): if specifier is URL, resolve directly; else if relative, resolve via URL resolution; if bare, use PACKAGE_RESOLVE.
   - ESM_FILE_FORMAT(url): determines format based on extension (.mjs -> module, .cjs -> commonjs, .json -> json) or detection of ESM syntax.

9. Customization Hooks: Use experimental hooks to override resolution; remove deprecated hooks such as getFormat, transformSource in favor of load and globalPreload hooks.

## Original Source
ECMAScript Modules in Node.js Documentation
https://nodejs.org/api/esm.html

## Digest of NODE_ESM

# Node.js ECMAScript Modules Documentation

Retrieved on: 2023-10-18

## Introduction
ECMAScript modules (ESM) provide the official mechanism to package JavaScript code for reuse. This document includes detailed specifications, method signatures, configuration options, and implementation patterns extracted from Node.js v23.11.0 documentation.

## Enabling ECMAScript Modules
- Mark as ESM using .mjs extension, package.json "type": "module", or --input-type=module flag.
- For CommonJS, use .cjs extension, package.json "type": "commonjs", or --input-type=commonjs.

## Import Specifiers
- Relative: './file.mjs'; Absolute: 'file:///path/to/module.js'; Bare: 'package' or 'package/feature'.
- Resolution: Bare specifiers use Node.js module resolution algorithm to locate modules in node_modules unless overridden by package "exports" field.

## Mandatory File Extensions
- Import statements require explicit file extensions; directory indexes require full specification (e.g. './startup/index.js').

## URLs and Schemes
- Supported schemes: file:, node:, data:.
- Percent-encoding required for special characters (e.g., '#' as %23).
- file: URLs load modules and can differ based on query strings causing multiple loads.

## Data: and Node: Imports
- Data: URLs: Supported MIME types: text/javascript, application/json, application/wasm (requires { type: 'json' } for JSON imports).
- Node: URLs load Node.js built-in modules (e.g., import fs from 'node:fs/promises').

## Import Attributes
- Syntax: import foo from './foo.json' with { type: 'json' }.
- Only supported attribute is "type" for JSON modules. Attribute is mandatory for JSON.

## Built-in Modules and import() expressions
- Built-in modules export named exports and default that trails module.syncBuiltinESMExports().
- Dynamic import() is supported in both ESM and CommonJS (in CommonJS modules to load ESM).

## import.meta Object
- Properties: 
  - import.meta.url: string (absolute file URL).
  - import.meta.filename: string (absolute file path, only for file: modules).
  - import.meta.dirname: string (directory name equivalent to path.dirname(import.meta.filename)).
  - import.meta.resolve(specifier: string[, parent: string|URL]): string; returns resolved URL synchronously.

## Interoperability with CommonJS
- ESM loads CommonJS modules with a default export as module.exports and may provide static analysis for named exports.
- CommonJS specific variables (__filename, __dirname) are replaced by import.meta.filename and import.meta.dirname.
- module.createRequire() can be used to load CommonJS modules when needed.

## JSON Modules and WASM Modules
- JSON modules require { type: 'json' } in import statements; provide default export only.
- WASM modules: Enabled with --experimental-wasm-modules flag; imported as normal modules returning exports interface.

## Top-Level Await
- Top-level await can be used directly in ESM. Unresolved promises exit with status code 13.
- Example: export const value = await Promise.resolve(5);

## Loaders and Module Resolution
- Custom loaders and resolution hooks allow overriding default behavior.
- Default resolution supports: FileURL-based resolution, bare specifiers in node_modules, and inline data: URLs.

## Resolution Algorithms
### ESM_RESOLVE(specifier, parentURL)
- Valid URL: returns parsed URL string.
- Relative specifiers use standard URL resolution.
- Bare specifiers pass through PACKAGE_RESOLVE with node_modules lookup.
- Returns: { format: string, resolved: string }.

### ESM_FILE_FORMAT(url)
- Returns "module" for .mjs, "commonjs" for .cjs, "json" for .json, "wasm" if experimental flag enabled for .wasm, and "addon" for .node if enabled.
- Fallback: uses package.json "type" or detection of ESM syntax.

## Customizing ESM Specifier Resolution
- Use module customization hooks to override ESM resolution (e.g. commonjs-extension-resolution-loader).
- Hooks can alter behavior for getFormat, load, and globalPreload using defined specifier resolution rules.

## Attribution
- Data Size: 4304332 bytes
- Source: https://nodejs.org/api/esm.html, Node.js v23.11.0 documentation


## Attribution
- Source: ECMAScript Modules in Node.js Documentation
- URL: https://nodejs.org/api/esm.html
- License: License: MIT
- Crawl Date: 2025-05-02T10:48:37.177Z
- Data Size: 4304332 bytes
- Links Found: 5203

## Retrieved
2025-05-02
