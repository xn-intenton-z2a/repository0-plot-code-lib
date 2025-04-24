# JAVASCRIPT_MODULES

## Crawl Summary
Module system overview; Canvas Module: create(wrapperId, parentElement, width, height) returns {ctx, id}, createReportList(wrapperId) returns list id; Square Module: constant name = 'square', draw(ctx, length, x, y, color) returns {length, x, y, color}, reportArea(length, reportList), reportPerimeter(length, reportList); Export syntax: named exports, default exports, aggregated exports; Import examples using relative paths, import maps for remapping; Use dynamic import() for asynchronous loading; Top-Level await to delay evaluation until promises resolve; Handling cyclic imports by asynchronous access; Strategies for writing isomorphic modules; Troubleshooting MIME types, local server, and file extension issues.

## Normalised Extract
Table of Contents:
1. Modules Overview
2. Canvas Module
3. Square Module
4. Export & Import Syntax
5. Import Maps
6. Dynamic Import
7. Top Level Await
8. Cyclic Imports
9. Isomorphic Modules
10. Troubleshooting

Modules Overview:
- Enabling ES modules in browsers and Node.js with proper file extensions and MIME type configuration.

Canvas Module:
- create(wrapperId: string, parentElement: HTMLElement, width: number, height: number): Object { ctx: CanvasRenderingContext2D, id: string }.
- createReportList(wrapperId: string): string (returns list id).

Square Module:
- Constant: name = 'square'.
- draw(ctx: CanvasRenderingContext2D, length: number, x: number, y: number, color: string): Object { length, x, y, color }.
- reportArea(length: number, reportList: string): void.
- reportPerimeter(length: number, reportList: string): void.

Export & Import Syntax:
- Use export keyword: export const name = 'square'; export function draw(...) {...};
- Default export: export default randomSquare;
- Import using: import { name, draw } from './modules/square.js'; or import randomSquare from './modules/square.js';

Import Maps:
- JSON object mapping module specifiers to URL paths. Example:
  { "imports": { "square": "./shapes/square.js" } }.
- Support for remapping bare module names and URL prefixes.

Dynamic Import:
- Syntax: import(moduleSpecifier).then((Module) => { ... });
- Returns a Promise resolving to the module object, e.g., Module.Square for class-based modules.

Top Level Await:
- Use await at module scope. Example in getColors.js: export default await fetch("../data/colors.json").then(r=>r.json());

Cyclic Imports:
- Handle cyclic dependencies by delaying usage of imported values (e.g., using setTimeout) or restructuring modules to avoid cycles.

Isomorphic Modules:
- Separate core logic and platform-specific bindings; use feature detection (typeof window, process) and polyfills via dynamic imports.

Troubleshooting:
- Verify correct MIME type (text/javascript) for module files.
- Use a local server to avoid CORS when using file://.
- Adjust OS file extension handling to prevent .mjs.js issues.

## Supplementary Details
Canvas Module Implementation:
- create(wrapperId, parentElement, width, height): Requires valid HTML element and numeric dimensions; returns { ctx: CanvasRenderingContext2D, id: string }.
- createReportList(wrapperId): Inserts <ul> element into element with id=wrapperId; returns unique list id.

Square Module Implementation:
- Constant name: 'square'.
- draw(ctx, length, x, y, color): Uses ctx.fillRect(x, y, length, length) and sets ctx.fillStyle; returns object with keys: length, x, y, color.
- reportArea(length, reportList): Calculates area as length^2; writes output to reportList element.
- reportPerimeter(length, reportList): Calculates perimeter as 4 * length; outputs to reportList element.

Export & Import Patterns:
- Named export pattern: Place export in front of declarations or aggregated at end using export { function1, const1 }.
- Default export requires use of 'export default' without curly braces and is imported without braces.

Import Maps Configuration:
- JSON file specifying mappings with keys and corresponding URL paths. Keys with trailing slashes denote path prefixes.
- Example mapping for packages like lodash: 'lodash': '/node_modules/lodash-es/lodash.js', 'lodash/': '/node_modules/lodash-es/'.

Dynamic Module Loading:
- Use import() as a function; returns a Promise.
- Example: import('./modules/square.js').then(Module => { new Module.Square(...).draw(); });

Top Level Await:
- Use 'await' at module level; ensures module does not execute further until promise resolves. 
- Requires importing module to also use async context.

Cyclic Imports Handling:
- Avoid immediate use of imported values; use asynchronous functions (e.g., setTimeout) to defer usage.
- Restructure modules when possible to merge or create intermediary modules.

Isomorphic Module Best Practices:
- Separate 'core' logic from environment specific binding.
- Employ feature detection checks: if (typeof process !== 'undefined') { ... } else if (typeof window !== 'undefined') { ... }.
- Use polyfill libraries via dynamic import if global features (like fetch) are absent.

Troubleshooting Procedures:
- Command to check MIME type via curl: curl -I http://localhost/path/to/module.js | grep Content-Type
- Ensure local server is used: e.g., run 'npx http-server' for testing.
- Check browser console for strict MIME type errors and revise server configuration accordingly.

## Reference Details
API Specifications:
Canvas Module:
- function create(wrapperId: string, parentElement: HTMLElement, width: number, height: number): { ctx: CanvasRenderingContext2D, id: string } - Creates a canvas element inside a div with id=wrapperId, appended to parentElement. Throws error if parameters are invalid.
- function createReportList(wrapperId: string): string - Inserts an unordered list in the element with id wrapperId. Returns list id.

Square Module:
- const name: string = 'square'
- function draw(ctx: CanvasRenderingContext2D, length: number, x: number, y: number, color: string): { length: number, x: number, y: number, color: string } - Draws a square on the canvas with given dimensions and color; must use ctx.fillStyle and ctx.fillRect. Returns object with properties.
- function reportArea(length: number, reportList: string): void - Calculates area (length*length) and appends result to element identified by reportList.
- function reportPerimeter(length: number, reportList: string): void - Calculates perimeter (4*length) and outputs to reportList.

Export/Import Syntax:
- Named export: export { name, draw, reportArea, reportPerimeter };
- Default export example: export default randomSquare;
- Import usage: import { name, draw } from './modules/square.js';
- Renaming imports: import { draw as drawSquare } from './modules/square.js';
- Import all as namespace: import * as Module from './modules/module.js';

Dynamic Import:
- Syntax: import('./modules/myModule.js').then((Module) => { /* use Module features */ });
- Returns Promise resolving to module object with exported members.

Configuration Options:
- Module file type: .js must be served with MIME type text/javascript.
- Import maps JSON example: { "imports": { "square": "./shapes/square.js" } }. Keys with trailing '/' indicate path prefixes.

Best Practices:
- Use export default for single main function in module; use named exports for multiple functions.
- Place all import declarations at file top for dependency clarity.
- When using dynamic imports, ensure module file paths are relative and error-handled using Promise.catch.

Troubleshooting Commands:
- Check server MIME type: curl -I http://server/path/module.js
- Local testing: Use a local server (e.g., npx http-server) to avoid CORS issues.
- For cyclic import issues, log intermediate values using setTimeout to ensure module initialization.

Code Examples:
// square.js
export const name = 'square';
export function draw(ctx, length, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, length, length);
  return { length, x, y, color };
}
export function reportArea(length, reportList) {
  const area = length * length;
  document.getElementById(reportList).innerText = 'Area: ' + area;
}
export function reportPerimeter(length, reportList) {
  const perimeter = 4 * length;
  document.getElementById(reportList).innerText = 'Perimeter: ' + perimeter;
}

// Importing in main.js
import { name, draw, reportArea, reportPerimeter } from './modules/square.js';

// Dynamic import example
document.querySelector('.square').addEventListener('click', () => {
  import('./modules/square.js').then(Module => {
    const square = Module.draw(canvasCtx, 50, 50, 100, 'blue');
    Module.reportArea(square.length, reportListId);
    Module.reportPerimeter(square.length, reportListId);
  });
});

## Information Dense Extract
Modules Overview: ES modules enable split code loading. Canvas Module: create(wrapperId, parentElement, width, height) -> {ctx, id}; createReportList(wrapperId) -> string. Square Module: const name='square'; draw(ctx, length, x, y, color) -> {length, x, y, color}; reportArea(length, reportList): void; reportPerimeter(length, reportList): void. Export syntax: named exports (export { ... }), default export (export default function), renaming imports (as keyword), namespace import (import * as Module). Import Maps: JSON mapping for bare module names; keys with trailing '/' denote path prefixes. Dynamic Import: import('module.js').then(Module => {...}). Top Level Await: export default await fetch(...).then(...). Cyclic Imports: Use asynchronous access to avoid ReferenceError. Isomorphic modules: Separate core logic, use feature detection, and polyfills. Troubleshooting: Ensure MIME type text/javascript, use local server, check file extensions.

## Sanitised Extract
Table of Contents:
1. Modules Overview
2. Canvas Module
3. Square Module
4. Export & Import Syntax
5. Import Maps
6. Dynamic Import
7. Top Level Await
8. Cyclic Imports
9. Isomorphic Modules
10. Troubleshooting

Modules Overview:
- Enabling ES modules in browsers and Node.js with proper file extensions and MIME type configuration.

Canvas Module:
- create(wrapperId: string, parentElement: HTMLElement, width: number, height: number): Object { ctx: CanvasRenderingContext2D, id: string }.
- createReportList(wrapperId: string): string (returns list id).

Square Module:
- Constant: name = 'square'.
- draw(ctx: CanvasRenderingContext2D, length: number, x: number, y: number, color: string): Object { length, x, y, color }.
- reportArea(length: number, reportList: string): void.
- reportPerimeter(length: number, reportList: string): void.

Export & Import Syntax:
- Use export keyword: export const name = 'square'; export function draw(...) {...};
- Default export: export default randomSquare;
- Import using: import { name, draw } from './modules/square.js'; or import randomSquare from './modules/square.js';

Import Maps:
- JSON object mapping module specifiers to URL paths. Example:
  { 'imports': { 'square': './shapes/square.js' } }.
- Support for remapping bare module names and URL prefixes.

Dynamic Import:
- Syntax: import(moduleSpecifier).then((Module) => { ... });
- Returns a Promise resolving to the module object, e.g., Module.Square for class-based modules.

Top Level Await:
- Use await at module scope. Example in getColors.js: export default await fetch('../data/colors.json').then(r=>r.json());

Cyclic Imports:
- Handle cyclic dependencies by delaying usage of imported values (e.g., using setTimeout) or restructuring modules to avoid cycles.

Isomorphic Modules:
- Separate core logic and platform-specific bindings; use feature detection (typeof window, process) and polyfills via dynamic imports.

Troubleshooting:
- Verify correct MIME type (text/javascript) for module files.
- Use a local server to avoid CORS when using file://.
- Adjust OS file extension handling to prevent .mjs.js issues.

## Original Source
MDN ECMAScript Modules Documentation
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

## Digest of JAVASCRIPT_MODULES

# JavaScript Modules Documentation

Retrieved: 2023-10-06

## Overview
This document covers the use of ES modules in JavaScript as described in the MDN documentation. It includes exact API specifications, method signatures, configuration details, and code examples directly from the crawled content.

## Canvas Module
- Function: create(wrapperId: string, parentElement: HTMLElement, width: number, height: number)
  - Description: Creates a canvas element inside a wrapper <div> with the given id. The wrapper is appended to the specified parent element.
  - Returns: An object { ctx: CanvasRenderingContext2D, id: string }.

- Function: createReportList(wrapperId: string)
  - Description: Creates an unordered list in the specified wrapper element to output report data.
  - Returns: The generated list's id as a string.

## Square Module
- Constant: name = "square"

- Function: draw(ctx: CanvasRenderingContext2D, length: number, x: number, y: number, color: string)
  - Description: Draws a square on the canvas with the given properties.
  - Returns: An object { length: number, x: number, y: number, color: string }.

- Function: reportArea(length: number, reportList: string)
  - Description: Writes the square's area to the specified report list.
  - Returns: void.

- Function: reportPerimeter(length: number, reportList: string)
  - Description: Writes the square's perimeter to the specified report list.
  - Returns: void.

## Export & Import Syntax
- Named export example:
  - export const name = "square";
  - export function draw(ctx, length, x, y, color) { ... };

- Aggregated export:
  - export { name, draw, reportArea, reportPerimeter };

- Default export example:
  - export default randomSquare;

- Importing example:
  - import { name, draw, reportArea, reportPerimeter } from "./modules/square.js";
  - import randomSquare from "./modules/square.js";

## Import Maps
- JSON mapping sample:
  {
    "imports": {
      "square": "./shapes/square.js",
      "lodash": "/node_modules/lodash-es/lodash.js",
      "lodash/": "/node_modules/lodash-es/"
    }
  }
- Usage: Allows bare module names to be resolvable and supports remapping entire URL prefixes.

## Dynamic Import
- Syntax: import(moduleSpecifier).then((Module) => { ... });
- Example:
  import("./modules/square.js").then((Module) => {
    const square1 = new Module.Square(ctx, listId, 50, 50, 100, "blue");
    square1.draw();
    square1.reportArea();
    square1.reportPerimeter();
  });

## Top Level Await
- Usage: Await can be used at module scope.
- Example in getColors.js:
  const colors = fetch("../data/colors.json").then(response => response.json());
  export default await colors;
- Import in main.js:
  import colors from "./modules/getColors.js";

## Cyclic Imports
- Description: Modules importing each other can lead to cyclic dependencies. Use asynchronous access (e.g., setTimeout) to ensure values are defined.
- Example:
  In a.js: import { b } from "./b.js"; export const a = 2;
  In b.js: import { a } from "./a.js"; setTimeout(() => { console.log(a); }, 10); export const b = 1;

## Isomorphic Modules
- Techniques for creating modules that run both on browser and Node.js:
  - Separate core logic from platform-specific binding.
  - Feature detection (e.g., typeof window !== "undefined").
  - Use dynamic import for polyfills (e.g., node-fetch for fetch in Node.js).

## Troubleshooting
- Ensure module files (.js or .mjs) are served with the correct MIME type (e.g., text/javascript).
- Run via a local server to avoid CORS errors when using file:// URLs.
- Disable automatic file extension changes (macOS may append .js to .mjs).

## Attribution
Data Size: 6471614 bytes; Links Found: 41782; Retrieved from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

## Attribution
- Source: MDN ECMAScript Modules Documentation
- URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
- License: License: CC-BY-SA 2.5
- Crawl Date: 2025-04-24T04:49:28.385Z
- Data Size: 6471614 bytes
- Links Found: 41782

## Retrieved
2025-04-24
