# NODE_ESM

## Crawl Summary
ECMAScript modules in Node.js: enable via .mjs extension, package.json "type":"module", or --input-type flag. Import specifiers include relative, bare, and absolute types. Mandatory file extensions required. URL resolution supports file:, node:, data: URLs. import.meta provides dirname, filename, url, and resolve(specifier) APIs. Resolution algorithms include ESM_RESOLVE and ESM_FILE_FORMAT which determine module format from file extensions. Built-in module support and CommonJS interoperability via module.createRequire() are specified.

## Normalised Extract
TABLE OF CONTENTS:
1. INTRODUCTION & OVERVIEW
   - Official standard for packaging JS; includes examples for export and import.
2. ENABLING ESM
   - Use .mjs, package.json { type: module }, or --input-type=module flag; inverse for CommonJS with .cjs.
3. IMPORT SPECIFIERS
   - Relative: path requires file extension.
   - Bare: resolved via node_modules and exports.
   - Absolute: full URL resolution.
4. MANDATORY FILE EXTENSIONS
   - File extension is required for all imports including directory indexes.
5. URL RESOLUTION
   - File URLs: use url.pathToFileURL; Data URLs support MIME types text/javascript, application/json, application/wasm; node: URLs for built-in modules.
6. IMPORT ATTRIBUTES
   - Syntax: import foo from './foo.json' with { type: 'json' }.
   - Only type attribute supported.
7. BUILT-IN MODULES & DYNAMIC IMPORT
   - Built-in modules offer named exports and a default export. Dynamic import() allowed in both ESM and CommonJS.
8. COMMONJS INTEROPERABILITY
   - Default and namespace imports; no __filename or __dirname, use import.meta.filename and import.meta.dirname. Use module.createRequire for require-like functionality.
9. API SPECIFICATIONS
   - import.meta.resolve(specifier): Returns absolute URL string; synchronous API without promise. 
   - ESM_RESOLVE and ESM_FILE_FORMAT: Algorithms determining module resolution and format based on file extension and package configuration.

DETAILED TOPICS:
INTRODUCTION: Defines ESM and interoperability with CommonJS, with code examples.
ENABLING: Details methods to signal module type. 
IMPORT SPECIFIERS: Specifies how to use relative, bare, and absolute paths with full examples.
MANDATORY FILE EXTENSIONS: Emphasizes necessity of explicit file extensions.
URL RESOLUTION: Instructions for using percent encoding and supported protocols.
IMPORT ATTRIBUTES: Exact syntax for passing type information on JSON imports.
BUILT-IN MODULES: Method to use console, fs, events etc with examples.
COMMONJS INTEROPERABILITY: Guidelines and fallback mechanisms for using module.createRequire and handling namespace objects.
API SPECIFICATIONS: Precise method signatures and error conditions for import.meta.resolve and resolution algorithms.


## Supplementary Details
Configurations and parameter details:
- Enabling ESM: .mjs file extension or package.json { "type": "module" } or --input-type=module flag. For CommonJS, use .cjs or { "type": "commonjs" }.
- import.meta API:
    - import.meta.dirname: returns string directory name (only for file: URLs).
    - import.meta.filename: returns absolute file path.
    - import.meta.url: returns file URL of current module.
    - import.meta.resolve(specifier): takes a string specifier; returns absolute URL string synchronously. May throw errors on invalid specifiers.
- URL Resolution: Use url.pathToFileURL for converting paths. Data URL imports require the MIME type, e.g., text/javascript for code, application/json for JSON (must use with { type: 'json' }). 
- ESM_RESOLVE algorithm returns two key values: resolved URL and module format ("module", "commonjs", "json", "wasm", "addon"). Errors thrown include: Invalid Module Specifier, Module Not Found, Unsupported Directory Import.
- File extensions dictate format: .mjs -> module, .cjs -> commonjs, .json -> json.
- Best Practices: Avoid ambiguous specifiers; always include file extensions; use import.meta.resolve for require.resolve replacement.
- Troubleshooting: If resolution fails, check file existence, correct file extensions, and proper package.json configuration. Use commands like 'node --input-type=module app.mjs' to test module resolution.

## Reference Details
API SPECIFICATIONS:
1. import.meta.resolve(specifier: string, parent?: string | URL) -> string
   - Resolves the given module specifier relative to the current module. Returns the absolute URL string. Throws on invalid specifier or if the file does not exist.
   - Example usage:
     const resolved = import.meta.resolve('./dep.js');
     // returns 'file:///absolute/path/dep.js'
2. ESM_RESOLVE(specifier: string, parentURL: string) -> { format: string, resolved: string }
   - Determines full module URL and format by checking file existence, extensions, and package.json configuration. Format values: 'module', 'commonjs', 'json', 'wasm', 'addon'.
3. ESM_FILE_FORMAT(url: string) -> string
   - Returns module format based on file extension. If extension unrecognized, returns undefined leading to load phase error.

SDK Method Signatures (conceptual):
- module.createRequire(filename: string) -> NodeRequire
   - Returns a CommonJS require function. Use for importing CommonJS modules in ESM.

Configuration Options:
- package.json 'type': 'module' or 'commonjs'. Default if not specified: inspected from file extension (.mjs for module, .cjs for commonjs).
- Command-line flags: --input-type=module, --experimental-wasm-modules, --experimental-addon-modules.

Best Practices with Code:
// Using dynamic import in CommonJS
const require = module.createRequire(import.meta.url);
(async () => {
  const moduleData = await import('./data.mjs');
  console.log(moduleData);
})();

Troubleshooting Procedures:
1. Verify file extensions and package.json configuration.
2. Use url.pathToFileURL to convert local paths.
3. Execute node with appropriate flags: e.g., node --input-type=module app.mjs
4. Check for synchronous file system access when using import.meta.resolve (may impact performance).
5. For JSON modules, ensure using import with { type: 'json' } and that the JSON is well-formed.

Detailed Instructional Material:
- Follow Node.js documentation for ESM; use provided algorithms (PACKAGE_RESOLVE, PACKAGE_EXPORTS_RESOLVE) for understanding resolution errors.
- When encountering resolution issues, check error message for 'Invalid Module Specifier' and ensure specifier format matches one of relative, bare, or absolute patterns.


## Information Dense Extract
ESM enable: .mjs or package.json {type:"module"} or --input-type=module; Import specifiers: relative (./file.js), bare (package or package/path), absolute (file:///path/file.js); File extension mandatory; URL resolution supports file:, node:, data:; API: import.meta.dirname, .filename, .url, resolve(specifier):string; ESM_RESOLVE returns {format, resolved}; File formats: .mjs->module, .cjs->commonjs, .json->json; Dynamic import() supported; module.createRequire for CommonJS; Config options: --experimental-wasm-modules, --experimental-addon-modules; Troubleshooting: verify file existence, correct specifiers, proper flags.

## Sanitised Extract
TABLE OF CONTENTS:
1. INTRODUCTION & OVERVIEW
   - Official standard for packaging JS; includes examples for export and import.
2. ENABLING ESM
   - Use .mjs, package.json { type: module }, or --input-type=module flag; inverse for CommonJS with .cjs.
3. IMPORT SPECIFIERS
   - Relative: path requires file extension.
   - Bare: resolved via node_modules and exports.
   - Absolute: full URL resolution.
4. MANDATORY FILE EXTENSIONS
   - File extension is required for all imports including directory indexes.
5. URL RESOLUTION
   - File URLs: use url.pathToFileURL; Data URLs support MIME types text/javascript, application/json, application/wasm; node: URLs for built-in modules.
6. IMPORT ATTRIBUTES
   - Syntax: import foo from './foo.json' with { type: 'json' }.
   - Only type attribute supported.
7. BUILT-IN MODULES & DYNAMIC IMPORT
   - Built-in modules offer named exports and a default export. Dynamic import() allowed in both ESM and CommonJS.
8. COMMONJS INTEROPERABILITY
   - Default and namespace imports; no __filename or __dirname, use import.meta.filename and import.meta.dirname. Use module.createRequire for require-like functionality.
9. API SPECIFICATIONS
   - import.meta.resolve(specifier): Returns absolute URL string; synchronous API without promise. 
   - ESM_RESOLVE and ESM_FILE_FORMAT: Algorithms determining module resolution and format based on file extension and package configuration.

DETAILED TOPICS:
INTRODUCTION: Defines ESM and interoperability with CommonJS, with code examples.
ENABLING: Details methods to signal module type. 
IMPORT SPECIFIERS: Specifies how to use relative, bare, and absolute paths with full examples.
MANDATORY FILE EXTENSIONS: Emphasizes necessity of explicit file extensions.
URL RESOLUTION: Instructions for using percent encoding and supported protocols.
IMPORT ATTRIBUTES: Exact syntax for passing type information on JSON imports.
BUILT-IN MODULES: Method to use console, fs, events etc with examples.
COMMONJS INTEROPERABILITY: Guidelines and fallback mechanisms for using module.createRequire and handling namespace objects.
API SPECIFICATIONS: Precise method signatures and error conditions for import.meta.resolve and resolution algorithms.

## Original Source
Node.js ESM Documentation
https://nodejs.org/api/esm.html

## Digest of NODE_ESM

# INTRODUCTION
ECMAScript modules (ESM) are the official standard for packaging JavaScript code. Node.js supports ESM as specified, providing interoperability with CommonJS. 

# CODE EXAMPLES
// addTwo.mjs
function addTwo(num) {
  return num + 2;
}
export { addTwo };

// app.mjs
import { addTwo } from './addTwo.mjs';
console.log(addTwo(4)); // Prints: 6

# ENABLING ESM
To enable ESM in Node.js you can use the .mjs file extension, set the package.json "type" field to "module", or use the --input-type=module flag. Conversely, .cjs or "commonjs" value force CommonJS.

# IMPORT SPECIFIERS
There are three types of import specifiers:
1. Relative (e.g. ./startup.js) – file extension required
2. Bare (e.g. some-package) – resolved via node_modules and package "exports"
3. Absolute (e.g. file:///opt/nodejs/config.js) – full URL

# MANDATORY FILE EXTENSIONS
File extensions must be provided even for directory indexes (e.g. ./startup/index.js).

# URL RESOLUTION
ES modules are resolved and cached as URLs. Special characters must be percent-encoded. Supported URL schemes include file:, node:, and data: URLs. For example:
- file: URLs: imported using url.pathToFileURL
- data: URLs: support for text/javascript, application/json (with { type: 'json' }), and application/wasm
- node: URLs: reference built-in modules (e.g. import fs from 'node:fs/promises')

# IMPORT ATTRIBUTES
Import attributes provide inline syntax for providing additional information. Example:
import fooData from './foo.json' with { type: 'json' };

The type attribute is mandatory when importing JSON modules.

# BUILT-IN MODULES AND DYNAMIC IMPORT
Built-in modules export named properties and a default export that mirrors CommonJS exports. Dynamic import() is supported in both ESM and CommonJS contexts.

# COMMONJS INTEROPERABILITY
In ESM, CommonJS modules are imported using default imports or namespace imports. CommonJS variables like __filename or __dirname are not available. To replicate these, use import.meta.filename and import.meta.dirname. For require-like resolution, module.createRequire() is available.

# API SPECIFICATIONS
## import.meta
- import.meta.dirname: string (directory name of the module, file: only)
- import.meta.filename: string (absolute file path of the module, with symlinks resolved)
- import.meta.url: string (absolute file URL of the module)
- import.meta.resolve(specifier):
    - Parameter: specifier (string) for the module to resolve
    - Returns: string – the absolute URL the specifier resolves to
    - Can throw errors if the file does not exist or resolution issues occur

## Module Resolution Algorithms
- ESM_RESOLVE(specifier, parentURL): Determines the resolved URL and module format ("module", "commonjs", "json", "wasm", "addon").
- ESM_FILE_FORMAT(url): Returns the file format based on the file extension including .mjs, .cjs, .json, and experimental .wasm or .node support.
- Additional helper algorithms: PACKAGE_RESOLVE, PACKAGE_SELF_RESOLVE, PACKAGE_EXPORTS_RESOLVE, and PACKAGE_IMPORTS_RESOLVE handle resolution of bare specifiers and package exports.

Retrieved on 2023-10-10
Data Size: 3411087 bytes
Attribution: Node.js v23.11.0 documentation crawl

## Attribution
- Source: Node.js ESM Documentation
- URL: https://nodejs.org/api/esm.html
- License: MIT License
- Crawl Date: 2025-04-26T18:10:52.591Z
- Data Size: 3411087 bytes
- Links Found: 2013

## Retrieved
2025-04-26
