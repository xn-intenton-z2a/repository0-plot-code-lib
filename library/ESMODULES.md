# ESMODULES

## Crawl Summary
ES Modules in Node.js support both static and dynamic import mechanisms, require explicit file extensions, and are enabled via .mjs extension, package.json type field, or --input-type flag. The resolution algorithm (ESM_RESOLVE) processes relative, absolute, bare specifiers and applies URL encoding. Import attributes permit inline specification (e.g., type: 'json') and import.meta provides module metadata. Detailed algorithms include PACKAGE_RESOLVE, PACKAGE_SELF_RESOLVE, and ESM_FILE_FORMAT with precise error handling and fallback procedures.

## Normalised Extract
Table of Contents:
  1. ECMAScript Module Usage
     - Enabling Modules with .mjs, package.json "type": "module", or --input-type flag
     - Import specifiers: relative ('./file.js'), bare ('package' resolved via node_modules), and absolute (file:///path/to/file.js)
  2. URL and File Resolution
     - Resolution using URL semantics with percent encoding
     - Usage of url.pathToFileURL for path conversion
  3. Import Attributes
     - Syntax: import data from './data.json' with { type: 'json' }
     - Mandatory for JSON modules
  4. Built-in Modules and Dynamic Import
     - Built-in modules usage (e.g., import fs from 'node:fs')
     - Dynamic import() in both ESM and CommonJS
  5. import.meta Object
     - Properties: import.meta.dirname, import.meta.filename, import.meta.url, import.meta.resolve(specifier)
  6. Module Resolution Algorithm
     - ESM_RESOLVE(specifier, parentURL): returns format and resolved URL
     - PACKAGE_RESOLVE for bare specifiers, handling package name, subpath, package.json "exports", and main field
     - ESM_FILE_FORMAT determines module type based on file extension and package.json "type"
Detailed Topics:
1. ECMAScript Module Usage:
   - Use .mjs extension or "type": "module" in package.json
   - Fallback resolution based on module syntax detection
2. URL and File Resolution:
   - Resolve relative URLs from parentURL
   - Enforce correct percent encoding (e.g., '#' as '%23')
   - Validate existence and directory restrictions
3. Import Attributes and JSON Modules:
   - Syntax requires with clause: { type: 'json' }
   - Only default export available for JSON imports
4. Built-in Modules and Dynamic Import:
   - Built-in modules accessible using 'node:' prefix
   - Dynamic import seamless in both module types
5. import.meta Details:
   - import.meta.dirname: directory path
   - import.meta.filename: resolved absolute file path
   - import.meta.url: file protocol URL
   - import.meta.resolve(specifier): synchronously resolves a module specifier
6. Module Resolution Algorithm:
   - ESM_RESOLVE validates and returns module format ('module', 'commonjs', 'json', 'wasm', 'addon')
   - PACKAGE_RESOLVE handles bare specifiers, leveraging package.json exports
   - Detailed error cases: Invalid Module Specifier, Package Path Not Exported, Module Not Found


## Supplementary Details
Implementation Details:

1. Enabling ECMAScript Modules:
   - File Extensions: .mjs for ES modules, .cjs for CommonJS
   - package.json: { "type": "module" } enables ES module behavior
   - CLI Flag: --input-type=module

2. import.meta Methods:
   - import.meta.resolve(specifier: string, parent?: string | URL): string
     * Returns the absolute URL for the module specifier
     * Throws error if specifier cannot be resolved

3. Module Resolution Functions:
   - ESM_RESOLVE(specifier, parentURL) returns { format: string, resolved: string }
   - PACKAGE_RESOLVE(packageSpecifier, parentURL) processes bare specifiers
   - ESM_FILE_FORMAT(url): Evaluates file extension (.mjs -> 'module', .cjs -> 'commonjs', .json -> 'json')

4. Configuration Options:
   - Experimental flags: --experimental-wasm-modules enable WASM support; --experimental-addon-modules for .node addons
   - URL resolution settings: No default extensions, no folder mains, bare specifier lookup via node_modules

5. Concrete Best Practices:
   - Always specify file extensions for imports
   - Use import.meta.url for relative resource resolution
   - Use module.createRequire() in ES modules when CommonJS functionality (e.g. require.resolve) is needed

6. Troubleshooting:
   - Error: "Invalid Module Specifier" when file paths are not fully qualified
   - Command: node --input-type=module app.mjs; check that file paths include proper extensions
   - Validate package.json exports configuration for packages to ensure module paths are correctly exported

7. Code Example:
   // ES Module Example (addTwo.mjs)
   function addTwo(num) {
     return num + 2;
   }
   export { addTwo };

   // Importing the module (app.mjs)
   import { addTwo } from './addTwo.mjs';
   console.log(addTwo(4));


## Reference Details
API Specifications and SDK Details:

1. import.meta.resolve(specifier, parent):
   - Signature: import.meta.resolve(specifier: string, parent?: string | URL): string
   - Returns: absolute URL string
   - Exceptions: Throws Error if specifier is invalid or cannot be resolved
   - Example Usage: 
       const assetURL = import.meta.resolve('component-lib/asset.css');
       // Returns: file:///app/node_modules/component-lib/asset.css

2. ESM_RESOLVE(specifier, parentURL):
   - Process: Validates if specifier is a valid URL; if relative, uses URL resolution relative to parentURL; resolves bare specifiers via PACKAGE_RESOLVE
   - Returns: Object { format: 'module' | 'commonjs' | 'json' | 'wasm' | 'addon', resolved: string }
   - Error Cases: Invalid Module Specifier, Module Not Found, Unsupported Directory Import

3. ESM_FILE_FORMAT(url):
   - Logic:
       if url ends in .mjs then return 'module'
       if url ends in .cjs then return 'commonjs'
       if url ends in .json then return 'json'
       if experimental flags enabled, then .wasm returns 'wasm', .node returns 'addon'
       else use DETECT_MODULE_SYNTAX(source) to return 'module' or 'commonjs'

4. PACKAGE_RESOLVE(packageSpecifier, parentURL):
   - Extract packageName and packageSubpath
   - Lookup package.json in node_modules hierarchy
   - Returns resolved URL based on main field or exports mapping
   - Errors: Invalid Package Configuration, Package Path Not Exported

5. SDK Method Signatures (example for module.createRequire):
   - Signature: module.createRequire(filename: string): NodeJS.Require
   - Returns: A require function that can be used to load CommonJS modules
   - Usage: const require = module.createRequire(import.meta.url);

6. Troubleshooting Procedures:
   - Command: node --input-type=module app.mjs
   - Expected Output: Proper resolution of modules with no "Invalid Module Specifier" errors
   - Check file extension correctness and package.json configuration if errors occur

7. Best Practices:
   - Always use absolute URL resolution with import.meta.url for relative assets
   - Validate package.json exports to avoid resolution errors
   - For CommonJS interop, use module.createRequire to access require.resolve and require.cache


## Information Dense Extract
ESM enabled via .mjs or package.json type 'module', CLI flag --input-type; import specifiers: relative, bare, absolute; URL resolution with percent encoding; import attributes with syntax 'with { type: "json" }'; import.meta provides dirname, filename, url, resolve; Resolution algorithm: ESM_RESOLVE returns {format, resolved}; PACKAGE_RESOLVE handles bare specifiers and package.json exports; ESM_FILE_FORMAT returns module types based on extension; API: import.meta.resolve(specifier: string, parent?: string|URL): string; module.createRequire(filename: string): NodeJS.Require; Config flags: --experimental-wasm-modules, --experimental-addon-modules; Best practices: specify file extensions, use module.createRequire for CommonJS interop; Troubleshooting: check full file paths, validate package.json exports; Code example: function addTwo(num) { return num + 2; } export { addTwo }; Import using import { addTwo } from './addTwo.mjs';

## Sanitised Extract
Table of Contents:
  1. ECMAScript Module Usage
     - Enabling Modules with .mjs, package.json 'type': 'module', or --input-type flag
     - Import specifiers: relative ('./file.js'), bare ('package' resolved via node_modules), and absolute (file:///path/to/file.js)
  2. URL and File Resolution
     - Resolution using URL semantics with percent encoding
     - Usage of url.pathToFileURL for path conversion
  3. Import Attributes
     - Syntax: import data from './data.json' with { type: 'json' }
     - Mandatory for JSON modules
  4. Built-in Modules and Dynamic Import
     - Built-in modules usage (e.g., import fs from 'node:fs')
     - Dynamic import() in both ESM and CommonJS
  5. import.meta Object
     - Properties: import.meta.dirname, import.meta.filename, import.meta.url, import.meta.resolve(specifier)
  6. Module Resolution Algorithm
     - ESM_RESOLVE(specifier, parentURL): returns format and resolved URL
     - PACKAGE_RESOLVE for bare specifiers, handling package name, subpath, package.json 'exports', and main field
     - ESM_FILE_FORMAT determines module type based on file extension and package.json 'type'
Detailed Topics:
1. ECMAScript Module Usage:
   - Use .mjs extension or 'type': 'module' in package.json
   - Fallback resolution based on module syntax detection
2. URL and File Resolution:
   - Resolve relative URLs from parentURL
   - Enforce correct percent encoding (e.g., '#' as '%23')
   - Validate existence and directory restrictions
3. Import Attributes and JSON Modules:
   - Syntax requires with clause: { type: 'json' }
   - Only default export available for JSON imports
4. Built-in Modules and Dynamic Import:
   - Built-in modules accessible using 'node:' prefix
   - Dynamic import seamless in both module types
5. import.meta Details:
   - import.meta.dirname: directory path
   - import.meta.filename: resolved absolute file path
   - import.meta.url: file protocol URL
   - import.meta.resolve(specifier): synchronously resolves a module specifier
6. Module Resolution Algorithm:
   - ESM_RESOLVE validates and returns module format ('module', 'commonjs', 'json', 'wasm', 'addon')
   - PACKAGE_RESOLVE handles bare specifiers, leveraging package.json exports
   - Detailed error cases: Invalid Module Specifier, Package Path Not Exported, Module Not Found

## Original Source
ES Modules in Node.js Documentation
https://nodejs.org/api/esm.html

## Digest of ESMODULES

# INTRODUCTION (Retrieved: 2023-11-24)

ECMAScript Modules (ESM) are the standard format for packaging JavaScript code. They support export/import syntax and interoperate with CommonJS. The documentation covers both usage and internal resolution algorithms.

# ENABLING

- Use .mjs file extension, or set package.json "type" to "module" for ES modules.
- Alternatively, explicitly set --input-type flag to "module" for ES modules and "commonjs" for CommonJS.

# IMPORT SPECIFIERS

- Relative Specifiers: e.g. './startup.js'
- Bare Specifiers: e.g. 'some-package' (resolved via node_modules and package.json "exports")
- Absolute Specifiers: e.g. 'file:///opt/nodejs/config.js'

Mandatory file extensions are required for relative/absolute paths. Directory indexes must be fully specified (e.g. './startup/index.js').

# URL RESOLUTION

- ES modules are resolved and cached as URLs with percent-encoding for special characters (# -> %23, ? -> %3F).
- Supported URL schemes: file:, node:, data:.
- Use url.pathToFileURL when converting paths for import.

# IMPORT ATTRIBUTES

- Inline syntax allows additional information in module import.
- Example: import fooData from './foo.json' with { type: 'json' }.
- JSON modules require the attribute: { type: 'json' }.

# BUILT-IN MODULES

- Built-in modules (like 'node:events', 'node:fs') offer named exports and default export from CommonJS.
- They are updated via module.syncBuiltinESMExports().

# DYNAMIC IMPORT AND import.meta

- Dynamic import() expressions load modules asynchronously, even in CommonJS.
- import.meta is an object available in ES modules with properties:
    - import.meta.dirname: directory name of the module (equivalent to path.dirname(import.meta.filename))
    - import.meta.filename: absolute file path with symlinks resolved
    - import.meta.url: absolute file: URL of the module
    - import.meta.resolve(specifier): synchronously returns the resolved URL string

# MODULE RESOLUTION ALGORITHM

The resolution process consists of the following key steps:

1. ESM_RESOLVE(specifier, parentURL) returns { format, resolved }. It validates specifiers, resolves file paths and URLs, and determines module format (.mjs -> module, .cjs -> commonjs, .json -> json).

2. PACKAGE_RESOLVE(packageSpecifier, parentURL) resolves bare specifiers using Node.js module resolution:
   - Determines packageName and packageSubpath
   - Uses package.json exports field if available
   - Returns errors for invalid package target or not exported subpaths.

3. Additional helper functions:
   - PACKAGE_SELF_RESOLVE
   - PACKAGE_EXPORTS_RESOLVE
   - PACKAGE_IMPORTS_RESOLVE (for specifiers starting with "#")
   - ESM_FILE_FORMAT(url) determines the module format based on the file extension and package type.

# MODULE CUSTOMIZATION

- Custom loaders can override default resolution behavior using module customization hooks.
- Loaders can support inline module loading via data: URLs and file: module loading with specific file extension restrictions.

# HISTORY & VERSION CHANGES

Key changes include:

- Unflagging top-level await (v14.8.0)
- Consolidating customization hooks (v17.0.0, v16.12.0)
- Removal of experimental warnings and deprecation of import assertions (v22.0.0, v23.1.0)


## Attribution
- Source: ES Modules in Node.js Documentation
- URL: https://nodejs.org/api/esm.html
- License: MIT License
- Crawl Date: 2025-04-27T04:49:17.243Z
- Data Size: 3464457 bytes
- Links Found: 2684

## Retrieved
2025-04-27
