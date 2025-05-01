# ESM_GUIDE

## Crawl Summary
The Node.js ESM documentation outlines enabling ECMAScript modules via file extensions, package.json 'type' field, or CLI flags. It details import specifiers (relative, bare, absolute), mandatory file extensions, URL-based module resolution, use of import attributes (especially for JSON modules), built-in module handling, dynamic import(), and import.meta properties. The resolution algorithm (ESM_RESOLVE) and file format determination (ESM_FILE_FORMAT) are specified with error conditions.

## Normalised Extract
Table of Contents:
  1. Introduction
    - Definition of ESM using import/export statements; sample export (addTwo) and import usage.
  2. Enabling
    - Methods: .mjs file extension, package.json "type": "module", --input-type flag.
  3. Import Specifiers
    - Types: relative (e.g. './file.mjs'), bare (e.g. 'some-package'), absolute (e.g. 'file:///full/path')
  4. Mandatory File Extensions
    - All import paths require explicit file extensions.
  5. URLs and Resolution
    - Modules resolved as URLs using file:, node:, data:; percent-encoding rules apply.
  6. Import Attributes
    - Syntax: import module from './data.json' with { type: 'json' }; mandatory for JSON.
  7. Built-in Modules
    - Exports: Named and default export from CommonJS; syncBuiltinESMExports function for updates.
  8. Dynamic import() and import.meta
    - Dynamic import() for asynchronous module loading; import.meta provides dirname, filename, url, and resolve().
  9. Resolution Algorithm Details
    - ESM_RESOLVE(specifier, parentURL): processes URLs, relative specifiers, and bare specifiers using PACKAGE_RESOLVE and ESM_FILE_FORMAT; throws errors for invalid inputs.
  10. ESM File Format Determination
    - Based on file extensions (.mjs, .cjs, .json, .wasm, .node) with fallback using DETECT_MODULE_SYNTAX.

Each section includes specific technical details enabling immediate application in Node.js ESM projects.

## Supplementary Details
Configuration Options:
- In package.json, set "type": "module" or "commonjs" to enforce module type. Default is CommonJS if unspecified.
- CLI flag --input-type=module or --input-type=commonjs to override file interpretation.
- For JSON modules, use import attributes: with { type: 'json' } is mandatory.

Implementation Steps:
1. Mark source files with .mjs or set package.json type accordingly.
2. Use explicit import statements with relative specifiers including file extensions.
3. Utilize dynamic import() and import.meta properties for asynchronous module loading and file path resolution.
4. For CommonJS interoperability, use module.createRequire() to import modules using require.

Algorithm Details:
- ESM_RESOLVE takes a specifier and a parent URL. It handles valid URL parsing, relative resolution, bare specifier resolution via PACKAGE_RESOLVE, and determines module format using ESM_FILE_FORMAT.
- Errors include Invalid Module Specifier, Module Not Found, Unsupported Directory Import, and Invalid Package Configuration.
- import.meta.resolve signature: (specifier: string, [parent?: string|URL]) returns a resolved URL string synchronously.

Exact Parameter Values:
- import.meta.resolve(specifier: string, parent?: string|URL) -> string
- module.createRequire(filename: string) -> function(require: string) => any
- syncBuiltinESMExports() -> void

## Reference Details
API Specifications and Code Examples:
1. import.meta.resolve:
   - Signature: import.meta.resolve(specifier: string, [parent?: string|URL]) -> string
   - Behavior: Resolves the module specifier relative to the current module's URL; returns an absolute URL string.
   - Error Conditions: Throws 'Invalid Module Specifier' if the specifier is malformed, or returns errors for non-existent files.

2. module.createRequire:
   - Signature: module.createRequire(filename: string) -> (module: string) => any
   - Usage: Allows CommonJS require() functionality in ESM modules.
   - Example:
       const { createRequire } = require('module');
       const require = createRequire(import.meta.url);
       const cjsModule = require('some-cjs-module');

3. syncBuiltinESMExports:
   - Signature: syncBuiltinESMExports() -> void
   - Usage: Synchronizes built-in ESM exports with CommonJS module.exports changes.

4. ESM_FILE_FORMAT:
   - Functionality: Determines module format based on file extension:
         .mjs => 'module'
         .cjs => 'commonjs'
         .json => 'json'
         .wasm => 'wasm' (if --experimental-wasm-modules enabled)
         .node => 'addon' (if --experimental-addon-modules enabled)

Code Example:
// ESM Module Export
function addTwo(num: number): number {
  return num + 2;
}
export { addTwo };

// ESM Module Import
import { addTwo } from './addTwo.mjs';
console.log(addTwo(4));

// Using import.meta
const currentDir = import.meta.dirname; // Requires file: protocol
const fileUrl = import.meta.url;
const resolvedPath = import.meta.resolve('./dependency.js');

// Creating a require function in ESM
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');

// Configuration in package.json
{
  "type": "module"
}

Best Practices:
- Always specify file extensions in import statements.
- Use import attributes for JSON modules: import data from './data.json' with { type: 'json' };
- Utilize import.meta for resolving relative paths dynamically: new URL('./file', import.meta.url).

Troubleshooting Procedures:
- If encountering 'Invalid Module Specifier': Verify that the import specifier is correctly formatted and percent-encoded if necessary.
- For module not found errors: Check that file paths and package.json exports are correctly set; use module.createRequire() for backward compatibility with CommonJS.
- Command for testing WebAssembly modules:
   node --experimental-wasm-modules index.mjs
   Expected output: Provides exports from the .wasm module without resolution errors.

## Information Dense Extract
ESM enabled via .mjs extension or package.json "type":"module"; Import specifiers: relative ('./file.mjs'), bare ('module'), absolute ('file:///path'); Mandatory extensions; URL resolution uses file:, node:, data:; import attributes syntax: with { type:'json' } mandatory for JSON; import.meta provides dirname, filename, url, resolve(specifier:string,[parent?:string|URL]) -> string; Resolution algorithm (ESM_RESOLVE) processes URLs and specifiers, determining format via ESM_FILE_FORMAT (.mjs->module, .cjs->commonjs, .json->json, experimental .wasm, .node->addon); API: module.createRequire(filename:string) returns require; syncBuiltinESMExports() synchronizes built-in exports; Errors include Invalid Module Specifier, Module Not Found; Config flags: --input-type, --experimental-wasm-modules; Best practices: explicit extensions, dynamic resolution with import.meta, use of import attributes, proper use of module.createRequire.

## Sanitised Extract
Table of Contents:
  1. Introduction
    - Definition of ESM using import/export statements; sample export (addTwo) and import usage.
  2. Enabling
    - Methods: .mjs file extension, package.json 'type': 'module', --input-type flag.
  3. Import Specifiers
    - Types: relative (e.g. './file.mjs'), bare (e.g. 'some-package'), absolute (e.g. 'file:///full/path')
  4. Mandatory File Extensions
    - All import paths require explicit file extensions.
  5. URLs and Resolution
    - Modules resolved as URLs using file:, node:, data:; percent-encoding rules apply.
  6. Import Attributes
    - Syntax: import module from './data.json' with { type: 'json' }; mandatory for JSON.
  7. Built-in Modules
    - Exports: Named and default export from CommonJS; syncBuiltinESMExports function for updates.
  8. Dynamic import() and import.meta
    - Dynamic import() for asynchronous module loading; import.meta provides dirname, filename, url, and resolve().
  9. Resolution Algorithm Details
    - ESM_RESOLVE(specifier, parentURL): processes URLs, relative specifiers, and bare specifiers using PACKAGE_RESOLVE and ESM_FILE_FORMAT; throws errors for invalid inputs.
  10. ESM File Format Determination
    - Based on file extensions (.mjs, .cjs, .json, .wasm, .node) with fallback using DETECT_MODULE_SYNTAX.

Each section includes specific technical details enabling immediate application in Node.js ESM projects.

## Original Source
Node.js ECMAScript Modules (ESM) Guide
https://nodejs.org/api/esm.html

## Digest of ESM_GUIDE

# Introduction
ECMAScript modules (ESM) are the standard format for packaging JavaScript code. They use import and export statements. Example:

// addTwo.mjs
function addTwo(num) {
  return num + 2;
}

export { addTwo };

// app.mjs
import { addTwo } from './addTwo.mjs';
console.log(addTwo(4));

# Enabling
Node.js supports two module systems: CommonJS and ESM. To explicitly use ESM, use one of the following:
- Use the .mjs file extension
- Set "type": "module" in package.json
- Use the --input-type=module flag
For CommonJS explicitly:
- Use the .cjs extension or "type": "commonjs"
- Use the --input-type=commonjs flag

# Import Specifiers
Import specifiers are the strings provided after the from keyword. They come in three forms:
1. Relative specifiers (e.g. './startup.js') requiring a file extension
2. Bare specifiers (e.g. 'some-package' or 'some-package/feature') which resolve via the Node.js module resolution algorithm
3. Absolute specifiers (e.g. 'file:///opt/nodejs/config.js')

# Mandatory File Extensions
Every import statement must specify a file extension. For directory indexes, specify the full path (e.g. './startup/index.js').

# URLs
ES modules are resolved as URLs with support for file:, node:, and data: URL schemes. Special characters must be percent-encoded (e.g. '#' as %23, '?' as %3F).

# Import Attributes
Import attributes allow passing extra information alongside the specifier. The common use is for JSON modules:
Example:
  import packageConfig from './package.json' with { type: 'json' };
The attribute { type: 'json' } is mandatory for JSON modules.

# Built-in Modules
Built-in modules provide named exports and a default export representing the CommonJS module.exports. They can be updated using module.syncBuiltinESMExports().

Example:
  import { readFile } from 'node:fs';
  import fs, { readFileSync } from 'node:fs';
  import { syncBuiltinESMExports } from 'node:module';

# Dynamic Import and import.meta
Dynamic import() works in both CommonJS and ESM. The import.meta object in ESM provides:
- import.meta.dirname: Directory of current module (file: modules only)
- import.meta.filename: Absolute path with symlinks resolved
- import.meta.url: Absolute file URL
- import.meta.resolve(specifier): Synchronously resolves specifiers relative to the module

Usage of import.meta.resolve:
  const dep = import.meta.resolve('./dep.js');

# Resolution Algorithm
The ESM resolution algorithm (ESM_RESOLVE) processes module specifiers and returns a fully resolved URL and module format. It includes:
- Handling of valid URLs directly
- Relative URL resolution against a parent module
- Bare specifier resolution via PACKAGE_RESOLVE

Errors that may be thrown include:
- Invalid Module Specifier
- Module Not Found
- Unsupported Directory Import

# ESM File Format
Determines module type based on file extension:
- .mjs  -> "module"
- .cjs  -> "commonjs"
- .json -> "json"
- .wasm -> "wasm" (with --experimental-wasm-modules)
- .node -> "addon" (with --experimental-addon-modules)

# Additional Resolution Functions
Functions such as PACKAGE_SELF_RESOLVE and PACKAGE_EXPORTS_RESOLVE are used for handling package exports and imports resolution. They ensure that module specifiers conform to the package.json configuration.

# History and Version Changes
Key version changes include removal of experimental warnings for import attributes (v23.1.0) and unflagging of top-level await (v14.8.0). Previous versions added support incrementally for file extension resolution, detection of named exports, and module customization hooks.

## Attribution
- Source: Node.js ECMAScript Modules (ESM) Guide
- URL: https://nodejs.org/api/esm.html
- License: MIT
- Crawl Date: 2025-05-01T15:47:40.526Z
- Data Size: 3579662 bytes
- Links Found: 2527

## Retrieved
2025-05-01
