# NODE_ESM

## Crawl Summary
Node.js ESM documentation provides precise instructions on module recognition via file extensions, package.json "type" field, and command-line inputs. It details resolution mechanisms for relative, bare, and absolute specifiers, handling of file:, data:, and node: URLs, and explicit import attributes for JSON modules. The resolution algorithm (ESM_RESOLVE) and file format determination (ESM_FILE_FORMAT) are fully specified with error conditions, version history, and interoperability with CommonJS. The documentation includes dynamic import support, import.meta properties, and clear examples for practical implementation.

## Normalised Extract
Table of Contents:
1. Introduction
   - Overview of ECMAScript modules
   - Interoperability with CommonJS
2. Enabling ESM
   - Use of .mjs, package.json "type": "module", or --input-type flag
   - Fallback to CommonJS if ESM syntax not detected
3. Import Specifiers
   - Relative: must include file extensions, e.g. ./file.mjs
   - Bare: resolved via package name and package.json exports
   - Absolute: full URL specification (file:///path/to/module.js)
4. Mandatory File Extensions and URL Encoding
   - File extension is mandatory for import, percent encoding for special characters
5. URL Schemes
   - file: URLs behavior and multiple loads with query differences
   - data: URLs for importing JavaScript, JSON, and Wasm with limitations on relative resolution
6. Node: Imports
   - Usage of node: prefix to load builtin modules (e.g. node:fs)
7. Import Attributes
   - Syntax: import fooData from './foo.json' with { type: 'json' }
   - Mandatory for JSON modules
8. Built-In Modules and import.meta
   - Default and named exports from builtin modules
   - import.meta properties (url, filename, dirname, resolve)
9. Dynamic import() Expressions
   - Support for both ESM and CommonJS dynamic loading
10. Resolution and Loading Algorithm
    - ESM_RESOLVE: parsing, relative resolution, bare specifier handling
    - ESM_FILE_FORMAT: determines module format based on extensions and package.json "type"
    - Error handling: Module Not Found, Invalid Module Specifier, etc.
Detailed Technical Points:
- Enabling: .mjs, --input-type, package.json field. Example: { "type": "module" }.
- import.meta.resolve(specifier): synchronous resolution, returns string; accepts optional parent URL when using experimental flag.
- ESM Resolution Process: Validate URL, resolve relative paths, use PACKAGE_RESOLVE for bare specifiers, check exports in package.json. 
- ESM_FILE_FORMAT returns: "module" for .mjs; "commonjs" for .cjs or .js if not marked "module"; "json" for .json; "wasm" if --experimental-wasm-modules enabled; "addon" for .node if enabled.
- Version and stability indicators provided for import attributes and top-level await.
Usage patterns and pitfalls such as no __filename/__dirname in ESM and alternative use of import.meta are explicitly noted.

## Supplementary Details
Configuration Options and Implementation Details:
- Module recognition: Set file extension (.mjs vs .cjs), package.json "type": "module", or use --input-type flag.
- import Attributes: Use with clause mandatory for JSON; supported attribute: type with value 'json'.
- ESM_RESOLVE Algorithm Parameters:
   * specifier (string): the module specifier
   * parentURL (string): the URL of the parent module
   * Returns: Object with resolved URL and format (string)
   * Exceptions: Invalid Module Specifier, Module Not Found, Unsupported Directory Import
- ESM_FILE_FORMAT:
   * Input: url (string) referencing existing file
   * Returns "module", "commonjs", "json", "wasm", or "addon"
- import.meta Properties:
   * import.meta.url: string (absolute file URL)
   * import.meta.filename: string (absolute file path, file: only)
   * import.meta.dirname: string (directory path)
   * import.meta.resolve(specifier): string; synchronous resolution
- Dynamic import(): Standard async loading and error handling via Promises.
- Best Practices:
   * Always include file extensions in import statements.
   * Use import.meta to obtain file paths instead of __filename/__dirname.
   * Ensure JSON modules are imported with { type: 'json' } to enforce proper parsing.
- Troubleshooting Procedures:
   * Verify that the file exists at the resolved URL to avoid Module Not Found errors.
   * Check package.json "exports" field when using bare specifiers.
   * Use url.pathToFileURL() for converting local paths to file URLs for consistency.
   * Use explicit error messages from ESM_RESOLVE and ESM_FILE_FORMAT routines to diagnose misconfigurations.

## Reference Details
API Specifications and Method Signatures:

1. import.meta.resolve(specifier: string, parent?: string | URL): string
   - Synchronously returns the absolute URL string for a given specifier relative to the current module.
   - Throws if the specifier is invalid or if resolution results in an unknown protocol.

2. ESM_RESOLVE(specifier: string, parentURL: string): { format: string, resolved: string }
   - Algorithm steps:
     a. If specifier is a valid URL, parse and reserialize.
     b. If specifier starts with '/', './', or '../', use URL resolution relative to parentURL.
     c. For bare specifiers, delegate to PACKAGE_RESOLVE which reads package.json and checks for "exports" or "main" fields.
     d. Validate existence and directory restrictions.
   - Exceptions: Invalid Module Specifier, Invalid Package Configuration, Module Not Found.

3. ESM_FILE_FORMAT(url: string): string
   - Returns one of: "module", "commonjs", "json", "wasm", "addon"
   - Logic based on file extension and package.json "type" field.

Code Example (ESM Import and Resolution):

// Example of a simple ESM module exporting a function
function addTwo(num) {
  return num + 2;
}
export { addTwo };

// Importing the module using file URL resolution
import { addTwo } from './addTwo.mjs';
console.log(addTwo(4)); // Expected output: 6

// Using dynamic import in CommonJS
const dynamicImport = async () => {
  const module = await import('./addTwo.mjs');
  console.log(module.addTwo(5));
};

dynamicImport();

// Using import.meta properties
import { readFileSync } from 'node:fs';
const dataPath = new URL('./data.proto', import.meta.url);
const buffer = readFileSync(dataPath);

// Configuration Option Example in package.json:
// {
//   "type": "module",
//   "exports": {
//     "./feature": "./src/feature.js"
//   }
// }

Troubleshooting Commands:
- Check module resolution: node --trace-resolve file.mjs
- Validate package.json configuration using JSON linter
- For dynamic import failures, use process.on('unhandledRejection', handler)

Best Practices:
- Always use explicit file extensions in import statements.
- Use import.meta.url combined with URL operations to safely reference local files.
- Ensure consistency in module type declarations in package.json to prevent ambiguity between ESM and CommonJS.
- Use synchronous API for resolution when immediate resolution is needed, but be aware of potential performance impacts.
- Use error codes from thrown exceptions to debug compatibility issues between ESM and CommonJS.

## Information Dense Extract
ESM enablement via .mjs, package.json "type":"module", or --input-type flag. Import specifiers: relative (./file.mjs), bare (package or package/subpath), absolute (file:///path). Mandatory file extension; percent encoding for special characters. URL schemes: file:, data: (text/javascript, application/json, application/wasm); node: prefix for built-ins. import.meta provides url, filename, dirname, resolve(specifier). ESM_RESOLVE(specifier, parentURL) returns { format, resolved } with error conditions (Invalid Module Specifier, Module Not Found). ESM_FILE_FORMAT(url) returns: "module" for .mjs, "commonjs" for .cjs or .js if not flagged, "json" for .json, "wasm" (with flag), "addon" (with experimental flag). API: import.meta.resolve(specifier[,parent]). Code examples provided for synchronous module import, dynamic import, and URL-based file resolution. Configuration options in package.json affecting module resolution, with troubleshooting commands: node --trace-resolve, JSON validation, unhandledRejection monitoring.

## Sanitised Extract
Table of Contents:
1. Introduction
   - Overview of ECMAScript modules
   - Interoperability with CommonJS
2. Enabling ESM
   - Use of .mjs, package.json 'type': 'module', or --input-type flag
   - Fallback to CommonJS if ESM syntax not detected
3. Import Specifiers
   - Relative: must include file extensions, e.g. ./file.mjs
   - Bare: resolved via package name and package.json exports
   - Absolute: full URL specification (file:///path/to/module.js)
4. Mandatory File Extensions and URL Encoding
   - File extension is mandatory for import, percent encoding for special characters
5. URL Schemes
   - file: URLs behavior and multiple loads with query differences
   - data: URLs for importing JavaScript, JSON, and Wasm with limitations on relative resolution
6. Node: Imports
   - Usage of node: prefix to load builtin modules (e.g. node:fs)
7. Import Attributes
   - Syntax: import fooData from './foo.json' with { type: 'json' }
   - Mandatory for JSON modules
8. Built-In Modules and import.meta
   - Default and named exports from builtin modules
   - import.meta properties (url, filename, dirname, resolve)
9. Dynamic import() Expressions
   - Support for both ESM and CommonJS dynamic loading
10. Resolution and Loading Algorithm
    - ESM_RESOLVE: parsing, relative resolution, bare specifier handling
    - ESM_FILE_FORMAT: determines module format based on extensions and package.json 'type'
    - Error handling: Module Not Found, Invalid Module Specifier, etc.
Detailed Technical Points:
- Enabling: .mjs, --input-type, package.json field. Example: { 'type': 'module' }.
- import.meta.resolve(specifier): synchronous resolution, returns string; accepts optional parent URL when using experimental flag.
- ESM Resolution Process: Validate URL, resolve relative paths, use PACKAGE_RESOLVE for bare specifiers, check exports in package.json. 
- ESM_FILE_FORMAT returns: 'module' for .mjs; 'commonjs' for .cjs or .js if not marked 'module'; 'json' for .json; 'wasm' if --experimental-wasm-modules enabled; 'addon' for .node if enabled.
- Version and stability indicators provided for import attributes and top-level await.
Usage patterns and pitfalls such as no __filename/__dirname in ESM and alternative use of import.meta are explicitly noted.

## Original Source
Node.js ESM Documentation
https://nodejs.org/api/esm.html

## Digest of NODE_ESM

# Introduction
Node.js supports ECMAScript modules (ESM) as the official standard for packaging JavaScript code. It implements full inter-operability with CommonJS and defines a clear resolution and loading algorithm.

# Enabling ESM
Modules can be recognized by:
- The .mjs file extension
- The package.json field with "type": "module"
- The --input-type flag set to "module"

Conversely, CommonJS modules are declared with .cjs or "type": "commonjs". When no explicit marker is present, Node.js introspects the source code for ESM syntax.

# Import Specifiers
There are three types:
1. Relative specifiers (e.g. ./startup.js, ../config.mjs). The file extension must be provided.
2. Bare specifiers (e.g. some-package or some-package/shuffle). They resolve via Node.js module resolution in node_modules unless the package.json "exports" field defines accessible paths.
3. Absolute specifiers (e.g. file:///opt/nodejs/config.js). They are treated as full URLs.

# Mandatory File Extensions and URLs
Every import must include the file extension. Directory indexes (e.g. './startup/index.js') must be fully specified.
ESM are resolved as URLs. In these URL-based resolutions special characters must be percent-encoded (e.g. # becomes %23).

# file: and data: URLs
- file: URLs load modules from the file system and may be loaded more than once if query parameters differ.
- data: URLs are supported for text/javascript (ESM), application/json, and application/wasm. They do not support relative specifiers.

# Node: Imports
Node.js supports using the node: prefix to import built-in modules (e.g. import fs from 'node:fs/promises').

# Import Attributes
Import attributes provide extra information during module import. Example:
  import fooData from './foo.json' with { type: 'json' };
They are required for JSON modules, and Node.js currently supports the type attribute with values such as 'json'.

# Built-In Modules and import.meta
Built-in modules export both named and default exports. The import.meta object provides:
- import.meta.url: the absolute URL of the module
- import.meta.filename: the full resolved path (file: only)
- import.meta.dirname: the directory name
- import.meta.resolve(specifier): synchronously resolves a module specifier relative to the module

# Dynamic import()
Dynamic import() expressions are supported in both ESM and CommonJS. In CommonJS, dynamic import can load an ES module.

# Resolution and Loading Algorithm
The default Node.js loader:
- Uses file URL-based resolution, relative/absolute URL resolution
- Resolves bare specifiers by searching node_modules and evaluating package.json "exports" field if present
- Determines module format with ESM_FILE_FORMAT which returns: "module" for .mjs, "commonjs" for .cjs and .js (depending on package.json type), "json" for .json, "wasm" for .wasm (if enabled) and "addon" for .node if experimental addon modules are enabled

# ESM Module Resolution Steps
The algorithm (ESM_RESOLVE) takes a specifier and a parent URL and performs:
1. URL parsing if the specifier is a valid URL
2. Relative resolution if the specifier starts with /, ./, or ../
3. For bare specifiers, it invokes PACKAGE_RESOLVE which:
   - Checks for Node.js builtin modules
   - Extracts the package name and subpath
   - Looks up package.json and uses PACKAGE_EXPORTS_RESOLVE if present
4. Validates the file exists and determines the module format using ESM_FILE_FORMAT

# Version History Highlights
- v23.1.0: Import attributes are no longer experimental
- v22.0.0: Dropped import assertions support
- v17.1.0 & v16.14.0: Introduced experimental import attributes
- v14.8.0: Top-level await unflagged
- v12.0.0: Support for .js extension for ES modules via package.json "type" field

Retrieved on: 2023-10-05
Attribution: Data crawled from https://nodejs.org/api/esm.html, Data Size: 3345679 bytes

## Attribution
- Source: Node.js ESM Documentation
- URL: https://nodejs.org/api/esm.html
- License: Node.js License
- Crawl Date: 2025-04-28T06:55:16.333Z
- Data Size: 3345679 bytes
- Links Found: 719

## Retrieved
2025-04-28
