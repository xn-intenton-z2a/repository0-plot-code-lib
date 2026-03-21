TABLE OF CONTENTS:
1. Node ESM mode and package.json "type"
2. File extension rules and import specifiers
3. Interoperability with CommonJS
4. Resolution algorithm notes and package exports
5. Recommended project configuration
6. Troubleshooting and practical fixes
7. Digest and attribution

NORMALISED EXTRACT:
1) Node ESM mode and package.json "type"
- Setting package.json property "type": "module" causes Node to interpret .js files as ECMAScript modules (ESM).
- Alternative: use .mjs for ESM files and .cjs for CommonJS files when "type" is not set or to override defaults.

2) File extension rules and import specifiers
- In Node ESM, import specifiers for local files should include the file extension (for example: import { fizzBuzz } from "./src/lib/main.js").
- Bare specifiers (import x from "pkg") resolve via node package resolution; relative specifiers (starting with ./ or ../) are file-system based and normally require the extension.

3) Interoperability with CommonJS
- CommonJS modules (require/exports) are not directly importable as named exports. When importing a CommonJS package into ESM, the CommonJS module is provided as the default export namespace and consumers may need to adjust accordingly.
- For advanced interop use createRequire (module.createRequire) or use dynamic import and handle default-wrapped module shapes.

4) Resolution algorithm notes and package exports
- Node supports package.json "exports" field which controls what subpath specifiers map to; this can affect whether extension-less import specifiers succeed.
- When creating libraries, prefer explicit extension usage and canonical paths to avoid unpredictable resolution across bundlers and Node versions.

5) Recommended project configuration (exact values)
- package.json should include:
  "type": "module"
  "engines": { "node": ">=24.0.0" }
- Use explicit relative imports with .js extension when referring to local modules in source and test files.

6) Troubleshooting (step-by-step fixes)
- Problem: "Cannot use import statement outside a module"
  Fix: ensure package.json contains "type": "module" or rename file to .mjs.
- Problem: ImportError: Cannot find module './foo'
  Fix: verify import includes extension and correct relative path; if package "exports" remaps values, consult package.json exports field.
- Problem: Unexpected default export shape when importing CommonJS
  Fix: require via createRequire or inspect default property of imported namespace.

DIGEST:
- Source: Node.js documentation — Modules: ECMAScript modules
- URL: https://nodejs.org/api/esm.html
- Date retrieved: 2026-03-21
- Extracted technical points: package.json "type": "module" behavior, .mjs/.cjs conventions, file extension requirements, CommonJS interoperability, package exports considerations.

ATTRIBUTION AND DATA SIZE:
- Attribution: Node.js official documentation (esm)
- Bytes retrieved from source in crawl: 125992 bytes
