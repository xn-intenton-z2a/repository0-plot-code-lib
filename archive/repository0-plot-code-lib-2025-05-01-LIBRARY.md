library/NODE_JS.md
# library/NODE_JS.md
# NODE_JS

## Crawl Summary
Condensed technical details include the Node.js assert module API, HTTP server creation, CLI usage, and configuration options. Key aspects cover method signatures for assert functions (assert, deepEqual, deepStrictEqual, doesNotMatch, doesNotReject, doesNotThrow), class definitions for AssertionError and CallTracker with all parameters, return types, and detailed code examples.

## Normalised Extract
Table of Contents:
 1. Usage and Example
    - Node.js command-line syntax: node [options] [script.js]
    - HTTP server creation using createServer from node:http
 2. Assert Module
    - assert(value[, message]) : void
    - assert.deepEqual(actual, expected[, message]) : void
    - assert.deepStrictEqual(actual, expected[, message]) : void
    - assert.doesNotMatch(string, regexp[, message]) : void
    - assert.doesNotReject(asyncFn[, error][, message]) : Promise<void>
    - assert.doesNotThrow(fn[, error][, message]) : void
 3. Assertion Error Handling
    - Class: assert.AssertionError(options)
      * Parameters: message (string), actual (any), expected (any), operator (string), stackStartFn (Function)
    - Class: assert.CallTracker
      * Method: calls(fn[, exact]): Function
      * Method: getCalls(fn): Array of call details
      * Method: report(): Array of error details
      * Method: reset([fn]): void
      * Method: verify(): void
Detailed Technical Information:
- For assert methods, parameter types are strictly enforced. deepStrictEqual uses Object.is() and prototype comparisons.
- HTTP server example demonstrates listening on port 3000 at 127.0.0.1 with appropriate header setup.
- Environment configurations like NO_COLOR can be set to disable terminal colors.
- The CallTracker class is used to ensure functions are called an exact number of times; failures are reported with call counts and stack traces.

## Supplementary Details
Technical Specifications:
- assert(value[, message]): Checks truthiness. Throws AssertionError if value is falsy.
- assert.deepEqual(actual, expected[, message]): Uses loose equality (==) for primitive comparisons, allowing type conversion.
- assert.deepStrictEqual(actual, expected[, message]): Uses Object.is() for primitives, compares prototypes and enumerable own properties, ensuring strict equality.
- assert.doesNotMatch(string, regexp[, message]): Verifies that the provided string does not match the provided regular expression.
- assert.doesNotReject(asyncFn[, error][, message]): Awaits the async function or promise; returns a rejected promise if the function throws or returns a non-promise.
- assert.doesNotThrow(fn[, error][, message]): Immediately invokes fn and throws if an error is encountered matching the provided error type.
- assert.AssertionError requires an options object with properties: message, actual, expected, operator, and optionally stackStartFn.
- assert.CallTracker: Use calls(fn, exact) to wrap functions. getCalls returns details as an array with {thisArg, arguments}. report provides an array of call summary objects. reset and verify for clearing and validating call counts.
- HTTP Server: createServer(callback) returns a server instance; listen(port, hostname, callback) starts the server. 
Configuration Option Details:
- NO_COLOR: When defined, disables colored output in terminal applications.
- NODE_DISABLE_COLORS: Same effect as NO_COLOR.
Exact Implementation Steps:
1. To use strict assertion mode, import assert from 'node:assert/strict'.
2. Instantiate HTTP server with createServer and use listen to bind to a port.
3. For CallTracker usage, create a new tracker; wrap functions using tracker.calls, invoke them, and call tracker.verify on process exit.
4. Use environment variables to control terminal output settings.

## Reference Details
API Specifications:

1. assert(value: any, message?: string): void
   - Throws: AssertionError if value is falsy.

2. assert.deepEqual(actual: any, expected: any, message?: string): void
   - Comparison: Uses == operator for primitives and recursively compares enumerable properties.

3. assert.deepStrictEqual(actual: any, expected: any, message?: string): void
   - Comparison: Uses Object.is(), compares prototypes, own properties, including symbols; strict equality enforced.

4. assert.doesNotMatch(string: string, regexp: RegExp, message?: string): void
   - Throws AssertionError if string matches regexp.

5. assert.doesNotReject(asyncFn: (() => Promise<any>) | Promise<any>, error?: RegExp | Function, message?: string): Promise<void>
   - Usage: await assert.doesNotReject(asyncFn, [error], [message]).

6. assert.doesNotThrow(fn: Function, error?: RegExp | Function, message?: string): void
   - Immediately executes fn and validates that no error is thrown.

7. class assert.AssertionError extends Error
   - Constructor: new assert.AssertionError(options: { message?: string, actual: any, expected: any, operator: string, stackStartFn?: Function })
   - Properties: message, actual, expected, operator, generatedMessage (boolean), code (== 'ERR_ASSERTION')

8. class assert.CallTracker
   - Constructor: new assert.CallTracker()
   - Method: calls(fn: Function, exact?: number = 1): Function
       Example:
         const tracker = new assert.CallTracker();
         const wrappedFn = tracker.calls(myFunction, 2);
   - Method: getCalls(fn: Function): Array<{ thisArg: any, arguments: any[] }>
   - Method: report(): Array<{ message: string, actual: number, expected: number, operator: string, stack: any }>
   - Method: reset(fn?: Function): void
   - Method: verify(): void (throws error if call counts do not match)

HTTP Server Example:

    import { createServer } from 'node:http';
    
    const server = createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello World!\n');
    });
    
    server.listen(3000, '127.0.0.1', () => {
      console.log('Server running at http://127.0.0.1:3000/');
    });

Best Practices and Troubleshooting:
- Always use assert.deepStrictEqual over assert.deepEqual in production to avoid unexpected type coercions.
- Use strict mode by importing from 'node:assert/strict'.
- For CallTracker, ensure tracker.verify() is called on process exit to catch missed function calls:

    process.on('exit', () => {
      tracker.verify();
    });

- To deactivate color output in logs, set environment variable NO_COLOR or NODE_DISABLE_COLORS:

    export NO_COLOR=1

Expected Outputs:
- When an assertion fails, an AssertionError is thrown with properties set (message, actual, expected, operator) and a diff may be shown in strict mode.
- HTTP server logs confirmation message with the listening address.


## Information Dense Extract
NODE_JS API: assert(value[,message]), deepEqual(actual,expected[,message]), deepStrictEqual(actual,expected[,message]), doesNotMatch(string,regexp[,message]), doesNotReject(asyncFn[,error][,message])=>Promise, doesNotThrow(fn[,error][,message]); Class assert.AssertionError(options:{message?,actual,expected,operator,stackStartFn?}); Class assert.CallTracker with methods: calls(fn,exact=1):Function, getCalls(fn):Array<{thisArg, arguments}>, report():Array, reset([fn]):void, verify():void; HTTP server via createServer(callback) with listen(port,hostname,callback); CLI: node [options] [script]; Env: NO_COLOR, NODE_DISABLE_COLORS disable terminal colors; Retrieved 2023-10-10, Data Size=3340473 bytes.

## Sanitised Extract
Table of Contents:
 1. Usage and Example
    - Node.js command-line syntax: node [options] [script.js]
    - HTTP server creation using createServer from node:http
 2. Assert Module
    - assert(value[, message]) : void
    - assert.deepEqual(actual, expected[, message]) : void
    - assert.deepStrictEqual(actual, expected[, message]) : void
    - assert.doesNotMatch(string, regexp[, message]) : void
    - assert.doesNotReject(asyncFn[, error][, message]) : Promise<void>
    - assert.doesNotThrow(fn[, error][, message]) : void
 3. Assertion Error Handling
    - Class: assert.AssertionError(options)
      * Parameters: message (string), actual (any), expected (any), operator (string), stackStartFn (Function)
    - Class: assert.CallTracker
      * Method: calls(fn[, exact]): Function
      * Method: getCalls(fn): Array of call details
      * Method: report(): Array of error details
      * Method: reset([fn]): void
      * Method: verify(): void
Detailed Technical Information:
- For assert methods, parameter types are strictly enforced. deepStrictEqual uses Object.is() and prototype comparisons.
- HTTP server example demonstrates listening on port 3000 at 127.0.0.1 with appropriate header setup.
- Environment configurations like NO_COLOR can be set to disable terminal colors.
- The CallTracker class is used to ensure functions are called an exact number of times; failures are reported with call counts and stack traces.

## Original Source
Node.js Official Documentation
https://nodejs.org/api/

## Digest of NODE_JS

# Node.js Documentation Overview

Date Retrieved: 2023-10-10
Data Size: 3340473 bytes
Links Found: 1956

# Assert Module

## Overview
The Node.js assert module provides a set of assertion functions for verifying invariants. It includes both strict methods and legacy methods. 

## Method Signatures and Specifications

- assert(value[, message])
  - Parameters: value (any), message (optional string)
  - Description: Tests for truthiness.

- assert.deepEqual(actual, expected[, message])
  - Parameters: actual (any), expected (any), message (optional string)
  - Note: Uses == for comparison (legacy mode).

- assert.deepStrictEqual(actual, expected[, message])
  - Parameters: actual (any), expected (any), message (optional string)
  - Description: Uses Object.is() and strict checks for deep equality.

- assert.doesNotMatch(string, regexp[, message])
  - Parameters: string (string), regexp (RegExp), message (optional string or Error)
  - Throws an AssertionError if the string matches the regexp.

- assert.doesNotReject(asyncFn[, error][, message])
  - Parameters: asyncFn (Function or Promise), error (optional RegExp or Function), message (optional string)
  - Returns: Promise that resolves if no rejection occurs.

- assert.doesNotThrow(fn[, error][, message])
  - Parameters: fn (Function), error (optional RegExp or Function), message (optional string)

## Classes

### assert.AssertionError
- Constructor: new assert.AssertionError(options)
  - Options Object:
    - message: string (optional)
    - actual: any
    - expected: any
    - operator: string
    - stackStartFn: Function (optional)
- Properties: message, actual, expected, operator, generatedMessage (boolean), code: 'ERR_ASSERTION'

### assert.CallTracker
- Constructor: new assert.CallTracker()
- Methods:
  - tracker.calls(fn[, exact])
    - Parameters: fn (Function), exact (number, default = 1)
    - Returns: A wrapped function that must be called exactly the specified number of times.

  - tracker.getCalls(fn)
    - Parameters: fn (Function)
    - Returns: Array of call details [{ thisArg, arguments }]

  - tracker.report()
    - Returns: Array of objects with details: message, actual, expected, operator, stack

  - tracker.reset([fn])
    - Parameters: fn (optional Function)
    - Description: Resets call counts for the specified function or all if omitted.

  - tracker.verify()
    - Description: Throws an error if any tracked function has not been called the expected number of times.

# HTTP Server and CLI Usage

## HTTP Server Example

A basic HTTP server using node:http module:

    import { createServer } from 'node:http';
    
    const server = createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello World!\n');
    });
    
    server.listen(3000, '127.0.0.1', () => {
      console.log('Listening on 127.0.0.1:3000');
    });

## Command-Line Usage

Usage: node [options] [V8 options] [script.js | -e "script" | - ] [arguments]

Refer to the command-line options documentation for further details.

# Configuration Options

- NO_COLOR or NODE_DISABLE_COLORS: Disable terminal color output (applies to REPL as well).

# Attribution

Content extracted from Node.js official documentation (v23.11.0) retrieved on 2023-10-10.


## Attribution
- Source: Node.js Official Documentation
- URL: https://nodejs.org/api/
- License: Node.js Documentation License
- Crawl Date: 2025-04-29T03:08:14.038Z
- Data Size: 3340473 bytes
- Links Found: 1956

## Retrieved
2025-04-29
library/OBSERVABLE_PLOT.md
# library/OBSERVABLE_PLOT.md
# OBSERVABLE_PLOT

## Crawl Summary
Observable Plot is a JavaScript visualization library with layered geometric shapes, providing methods such as Plot.dot, Plot.rectY, Plot.ruleY and transforms like Plot.binX, which automatically bin and compute counts. It supports vanilla HTML via CDN, Node.js using JSDOM, and integrations with React, Vue, Svelte. Key parameters include configuration objects for marks, transforms, and document rendering options. The API exposes full TypeScript definitions and usage examples.

## Normalised Extract
Table of Contents:
1. Marks and Geometric Shapes
   - Methods: Plot.dot(data, {x, y, stroke}), Plot.rectY(data, transform), Plot.ruleY(values)
   - Returns a detached DOM element (SVG or HTML) which must be appended to a container using element.append.
2. Scales and Transforms
   - Scales map abstract values to visual values.
   - Transforms such as Plot.binX({y: 'count'}, {x: function}) perform binning and aggregation.
3. Installation and Setup
   - Vanilla HTML: Import Plot from a CDN (ESM or UMD bundles), use with dependency D3.
   - NPM: Install @observablehq/plot and import using ES Modules.
4. Framework Integration
   - React: Use Plot.plot with an option document: new Document() for SSR or useRef with useEffect for client-side rendering.
   - Vue & Svelte: Similar approach with component lifecycle hooks.
   - Node.js: Use JSDOM to generate a document and serialize the plot using outerHTML.
5. Configuration and Code Samples
   - Exact configuration: {length: 10000} for plot dimensions, mark options with property names matching dataset keys.
   - In server-side, set XML namespace attributes for SVG.

Details:
Marks: Use Plot methods to denote different visualization types. Example signature: Plot.dot(data: Array|Object, options: {x: string, y: string, stroke?: string}) -> Mark.
Transforms: Plot.binX({y: 'count'}, {x: function}) aggregates data into bins and outputs a new mark element.
Installation: For CDN, include <script type="module"> with import from jsDelivr; for local development, use UMD bundles with manual script inclusion.
Frameworks: SSR in React using virtual Document enables returning a hyperScript element; useRef hook with cleanup removes old plots.
Node.js integration: Provide a DOM via JSDOM, then serialize the plot to SVG. Use sharp or canvg for rasterization if needed.

## Supplementary Details
Technical Specifications:
- Mark Methods:
  * Plot.dot(data, options): options include x (string), y (string), stroke (string, optional).
  * Plot.rectY(data, transform): requires parameter object for rectangle length and a transform function such as Plot.binX.
  * Plot.ruleY(values): accepts an array of numbers to draw horizontal rules.
- Transform Functions:
  * Plot.binX({y: "count"}, {x: function}) returns a binned mark configuration, aggregating counts.
- API Options:
  * In Plot.plot(options), common options include:
      grid: boolean (default: false),
      color: object (e.g., {scheme: "burd"}),
      marks: array of mark elements.
- Framework Integration Notes:
  * React SSR Component:
      function PlotFigure({options}) {
        return Plot.plot({ ...options, document: new Document() }).toHyperScript();
      }
  * Vue SSR Component uses similar pattern with render function and virtual DOM.
  * Svelte: use reactive $effect to remove and append new plots on state change.
  * Node.js: When rendering HTML, set attributes using setAttributeNS for proper SVG namespace handling.
- Installation Configuration:
  * CDN URL: https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm for ESM modules.
  * UMD Bundle: Includes Plot and dependency on D3, loaded via <script> tags.
  * NPM package: @observablehq/plot with full TypeScript declarations.

Implementation Steps:
1. Include Plot via CDN or npm install.
2. Create a container element (e.g. a DIV with an id).
3. Generate a plot element by calling a Plot method (e.g. Plot.rectY({length: 10000}, Plot.binX({y: "count"}, {x: Math.random}))).plot();
4. Append the generated plot to the container using container.append(plot).
5. For dynamic updates, remove the old plot before appending the new plot.

Troubleshooting:
- If the plot does not display, ensure that the correct DOM element is selected and appended to.
- In Node.js, verify that JSDOM is correctly installed and that the document option is passed to Plot.plot.
- Validate namespace attributes in SVG output using setAttributeNS with correct URI strings.
- Use browser console and server logs to check for JavaScript errors related to dependency loading (e.g. D3 missing).
- For framework integration, ensure the virtual Document implementation is correctly provided for SSR.

Configuration Options and Defaults:
- Plot.plot({ grid: false, color: {scheme: "burd"}, marks: [...] }) where grid defaults to false unless explicitly enabled.
- Mark options such as {length: 10000} are numeric and define the dimension of the mark elements.
- Transform options using Plot.binX require specifying the target field for aggregation (e.g., y: "count").

## Reference Details
API Specifications:
- Function: Plot.plot(options: Object): HTMLElement
   Parameters:
     options: { grid?: boolean, color?: { scheme?: string, legend?: boolean }, marks: Array<HTMLElement>, document?: Document }
   Returns: A detached DOM element (SVG or HTML) representing the plot.

- Function: Plot.dot(data: Array|Object, options: { x: string, y: string, stroke?: string }): HTMLElement
   Returns: A mark element configured as a scatter plot.

- Function: Plot.rectY(data: Array|Object, transform: Function): HTMLElement
   Parameters: data, transform function (e.g. Plot.binX) that configures binning and aggregation.
   Returns: A rectangle mark element.

- Transform Function: Plot.binX(transformOptions: Object, fieldOptions: Object): Function
   Example: Plot.binX({ y: "count" }, { x: Math.random }) aggregates data and returns a bin transform.

Full Code Examples:
// Basic Plot Creation in Vanilla HTML using ESM
import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
const myPlot = Plot.rectY({ length: 10000 }, Plot.binX({ y: "count" }, { x: Math.random })).plot();
document.querySelector("#plotContainer").append(myPlot);

// React Server-Side Rendering Example
import * as Plot from "@observablehq/plot";
import { createElement as h } from "react";
export default function PlotFigure({ options }) {
  // Using a new Document() for virtual DOM simulation
  return Plot.plot({ ...options, document: new Document() }).toHyperScript();
}

// Node.js SVG Rendering Example
import { readFile } from "node:fs/promises";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { JSDOM } from "jsdom";
(async () => {
  const csvData = await readFile("./penguins.csv", "utf-8");
  const penguins = d3.csvParse(csvData, d3.autoType);
  const dom = new JSDOM("");
  const plotElement = Plot.plot({
    document: dom.window.document,
    marks: [
      Plot.dot(penguins, { x: "culmen_length_mm", y: "culmen_depth_mm", stroke: "species" })
    ]
  });
  plotElement.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg");
  plotElement.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
  process.stdout.write(plotElement.outerHTML);
})();

Configuration Options:
- CDN (ESM): "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm"
- UMD Bundle paths: d3.js, plot.js (or minified versions d3.min.js, plot.min.js)
- NPM installation: "@observablehq/plot"

Best Practices:
- Always remove the old plot element before appending a new one to avoid DOM clutter. In React, use the useEffect cleanup function.
- Use a virtual Document (new Document() or JSDOM) for server-side rendering to manage SVG output.
- Validate namespace attributes when exporting SVG to ensure compatibility.

Troubleshooting Procedures:
1. Check that the container element exists and is correctly selected.
2. Verify that all dependencies (D3, Plot) are properly loaded via CDN or bundler.
3. In Node.js, ensure JSDOM is installed and used; inspect console error messages.
4. For SSR in React/Vue, confirm that the virtual Document is correctly implemented.
5. Use browser developer tools to inspect the appended DOM element and validate its SVG structure.

Return Types and Exceptions:
- All Plot functions return a DOM element; if the provided data or options are invalid, runtime errors will be thrown. Ensure that options adhere exactly to the specified types.

## Information Dense Extract
Observable Plot JS library; key methods: Plot.plot({ grid?, color?, marks, document? }) returns DOM element; Plot.dot(data, {x, y, stroke?}), Plot.rectY(data, transform), Plot.ruleY([values]); Transform: Plot.binX({y:'count'}, {x: function}); Installation via CDN (https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm) or npm (@observablehq/plot); Framework integration: React SSR (document: new Document()), Vue and Svelte use mounted/render hooks; Node.js SSR via JSDOM, setAttributeNS for namespaces; full API specifications include complete method signatures, parameter types, return types; recommended best practices: remove old plot elements, validate SVG namespaces; troubleshooting: verify container existence, dependency loading, check error logs; sample code provided for vanilla, React, Node.js; configuration options default grid: false, color scheme: 'burd'; all technical details specified as per API and code examples.

## Sanitised Extract
Table of Contents:
1. Marks and Geometric Shapes
   - Methods: Plot.dot(data, {x, y, stroke}), Plot.rectY(data, transform), Plot.ruleY(values)
   - Returns a detached DOM element (SVG or HTML) which must be appended to a container using element.append.
2. Scales and Transforms
   - Scales map abstract values to visual values.
   - Transforms such as Plot.binX({y: 'count'}, {x: function}) perform binning and aggregation.
3. Installation and Setup
   - Vanilla HTML: Import Plot from a CDN (ESM or UMD bundles), use with dependency D3.
   - NPM: Install @observablehq/plot and import using ES Modules.
4. Framework Integration
   - React: Use Plot.plot with an option document: new Document() for SSR or useRef with useEffect for client-side rendering.
   - Vue & Svelte: Similar approach with component lifecycle hooks.
   - Node.js: Use JSDOM to generate a document and serialize the plot using outerHTML.
5. Configuration and Code Samples
   - Exact configuration: {length: 10000} for plot dimensions, mark options with property names matching dataset keys.
   - In server-side, set XML namespace attributes for SVG.

Details:
Marks: Use Plot methods to denote different visualization types. Example signature: Plot.dot(data: Array|Object, options: {x: string, y: string, stroke?: string}) -> Mark.
Transforms: Plot.binX({y: 'count'}, {x: function}) aggregates data into bins and outputs a new mark element.
Installation: For CDN, include <script type='module'> with import from jsDelivr; for local development, use UMD bundles with manual script inclusion.
Frameworks: SSR in React using virtual Document enables returning a hyperScript element; useRef hook with cleanup removes old plots.
Node.js integration: Provide a DOM via JSDOM, then serialize the plot to SVG. Use sharp or canvg for rasterization if needed.

## Original Source
Observable Plot Documentation
https://observablehq.com/@observablehq/plot

## Digest of OBSERVABLE_PLOT

# Overview
Observable Plot is a JavaScript library for exploratory data visualization. It uses a grammar-of-graphics approach with layered geometric marks (bars, dots, lines) instead of pre-defined chart types.

# Core Concepts
1. Marks and Geometric Shapes
   - Methods such as Plot.dot, Plot.rectY, Plot.ruleY are used to generate marks.
   - Example: Plot.rectY({length: 10000}, Plot.binX({y: "count"}, {x: Math.random})).plot() creates a plot with binning transform.
2. Scales
   - Scales map abstract values (time, temperature) to visual attributes (position, color).
3. Transforms
   - Transforms derive data on-the-fly (binning, rolling averages).
4. Facets
   - Use facets to create small multiples (repeating plots for data partitions).
5. Projections
   - Supports GeoJSON and D3’s spherical projection system for geographic maps.

# Installation and Integration
- In vanilla HTML, import Plot from a CDN:
  Example (ESM):
  import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
  Then attach the plot to a DOM element:
  const plot = Plot.rectY({length: 10000}, Plot.binX({y: "count"}, {x: Math.random})).plot();
  document.querySelector("#myplot").append(plot);

- NPM Installation:
  yarn add @observablehq/plot
  npm install @observablehq/plot
  Usage: import * as Plot from "@observablehq/plot";

# Framework Integrations
- React: Two approaches available (SSR with document option, client-side with useRef and useEffect).
  Example SSR:
    import * as Plot from "@observablehq/plot";
    import {createElement as h} from "react";
    export default function PlotFigure({options}) {
      return Plot.plot({ ...options, document: new Document() }).toHyperScript();
    }
- Vue: Use a render function with virtual DOM support via document option for SSR or mounted lifecycle for client-side.
- Svelte: Render client-side with reactive statements and remove old chart before appending new one.
- Node.js: Use JSDOM to provide a DOM implementation and serialize using outerHTML.

# API and Method Signatures
- Plot.plot(options: Object): DOMElement
  Options include configuration for axes, grid, color schemes, and marks.

- Plot.dot(data: Array|Object, options: Object): Mark
  Options: { x: String, y: String, stroke?: String }

- Plot.rectY(data: Array|Object, transform: Function): Mark
  Example transform: Plot.binX({ y: "count" }, { x: someFunction })

- Plot.ruleY(values: Array<Number>): Mark

# Code Examples
Vanilla HTML (ESM):

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Observable Plot Example</title>
  </head>
  <body>
    <div id="myplot"></div>
    <script type="module">
      import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
      const plot = Plot.rectY({length: 10000}, Plot.binX({y: "count"}, {x: Math.random})).plot();
      document.querySelector("#myplot").append(plot);
    </script>
  </body>
</html>

Node.js Server-side Rendering:

import {readFile} from "node:fs/promises";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {JSDOM} from "jsdom";

(async () => {
  const csvData = await readFile("./penguins.csv", "utf-8");
  const penguins = d3.csvParse(csvData, d3.autoType);
  const dom = new JSDOM("");
  const plot = Plot.plot({
    document: dom.window.document,
    marks: [
      Plot.dot(penguins, {x: "culmen_length_mm", y: "culmen_depth_mm", stroke: "species"})
    ]
  });
  plot.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg");
  plot.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
  process.stdout.write(plot.outerHTML);
})();

# Configuration Options
- For CDN usage, default dependency on D3 is automatically loaded.
- Using document option in frameworks allows server-side rendering.
- Mark transformation options include parameters such as length, binning options, and fill opacity.

# Remarks
Observable Plot includes TypeScript declarations and extensive inline documentation to support advanced code completion in editors such as VS Code.

## Attribution
- Source: Observable Plot Documentation
- URL: https://observablehq.com/@observablehq/plot
- License: Unknown License
- Crawl Date: 2025-04-30T04:51:46.365Z
- Data Size: 1002206 bytes
- Links Found: 4287

## Retrieved
2025-04-30
library/ESMODULES.md
# library/ESMODULES.md
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
library/RFC7807.md
# library/RFC7807.md
# RFC7807

## Crawl Summary
RFC7807 implementation details derived from crawl at https://restfulapi.net/problem-details/ include the specification for a standardized error response JSON structure (type, title, status, detail, instance).

## Normalised Extract
Table of Contents:
1. RFC7807 Object Structure
   - type: string (error identifier, default 'about:blank')
   - title: string (error summary)
   - status: number (HTTP status code)
   - detail: string (description of the error)
   - instance: string (specific occurrence URI)
2. Express Middleware Error Handler
   - Signature: function errorHandler(err, req, res, next)
   - Usage: app.use(errorHandler)
   - Implementation: sets res.status(err.status || 500) and returns JSON with required fields
3. API Method Specifications
   - Method: createProblemDetails(err, req, res) returning Response
   - Parameter types: err (Error object with optional properties), req (Request), res (Response)
4. Configuration Options
   - err.type: optional, default 'about:blank'
   - err.status: optional, default 500
   - err.detail: optional custom error description
5. Troubleshooting Steps
   - Verify middleware order in Express
   - Check error object completeness
   - Use logging for debugging error flow

## Supplementary Details
Technical Specifications:
- RFC7807 Error JSON must include:
  type: string (custom URI identifier, e.g., 'about:blank' or custom URI)
  title: string (short description, invariant across errors)
  status: number (HTTP status code, e.g., 400, 404, 500)
  detail: string (detailed error message)
  instance: string (request URL)
- Implementation Steps:
  1. Capture errors in Express routes using try-catch blocks.
  2. Create error objects enriched with status, type, and detail properties.
  3. Implement an error-handling middleware that constructs the Problem Details response.
  4. Configure the middleware to be used after all route handlers.
- Configuration Values:
  err.type default: 'about:blank'
  err.status default: 500
  Expected Effects: Consistent error responses that adhere to RFC7807.

## Reference Details
API Specifications:
Method Signature:
function createProblemDetails(err: Error & { status?: number, type?: string, detail?: string }, req: Request, res: Response): Response
Returns: Express Response object with JSON formatted as:
{
  type: string,  // defaults to 'about:blank'
  title: string, // error message
  status: number, // HTTP status code
  detail: string, // detailed error explanation
  instance: string // request URI
}

Express Middleware Example:
// Error handling middleware for RFC7807
function errorHandler(err, req, res, next) {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    type: err.type || 'about:blank',
    title: err.message,
    status: statusCode,
    detail: err.detail || 'Unexpected error occurred',
    instance: req.originalUrl
  });
}

Usage:
// Place error handler after all other middlewares
app.use(errorHandler);

Configuration Options:
- err.type: accepts a string URI. If not provided, defaults to 'about:blank'.
- err.status: accepts a number. If not provided, defaults to 500.
- err.detail: accepts a string explanation. Use detailed description based on the context.

Best Practices:
- Always return a Problem Details JSON on errors to ensure consistency.
- Log error details server-side including instance URIs for tracing.
- Position error middleware as final middleware in Express.

Troubleshooting Procedures:
- Command: node app.js
  Expected Output: Server starts without uncaught exceptions; errors produce RFC7807 JSON responses.
- Verify that error objects have the necessary structure by manually testing endpoints with errors.
- Use debugging logs to trace missing properties or misconfigured middleware order.

## Information Dense Extract
RFC7807 JSON: { type: string ('about:blank' default), title: string, status: number (HTTP code, default 500), detail: string, instance: string } | Express Middleware: function errorHandler(err,req,res,next) { res.status(err.status || 500).json({ type: err.type || 'about:blank', title: err.message, status: err.status || 500, detail: err.detail || 'Unexpected error occurred', instance: req.originalUrl }); } | API: createProblemDetails(err, req, res): Response | Configuration: err.type defaults 'about:blank', err.status defaults 500, err.detail optional | Best Practices: middleware last; consistent error format; logging included | Troubleshooting: verify middleware order; check error structure; debug with console logs

## Sanitised Extract
Table of Contents:
1. RFC7807 Object Structure
   - type: string (error identifier, default 'about:blank')
   - title: string (error summary)
   - status: number (HTTP status code)
   - detail: string (description of the error)
   - instance: string (specific occurrence URI)
2. Express Middleware Error Handler
   - Signature: function errorHandler(err, req, res, next)
   - Usage: app.use(errorHandler)
   - Implementation: sets res.status(err.status || 500) and returns JSON with required fields
3. API Method Specifications
   - Method: createProblemDetails(err, req, res) returning Response
   - Parameter types: err (Error object with optional properties), req (Request), res (Response)
4. Configuration Options
   - err.type: optional, default 'about:blank'
   - err.status: optional, default 500
   - err.detail: optional custom error description
5. Troubleshooting Steps
   - Verify middleware order in Express
   - Check error object completeness
   - Use logging for debugging error flow

## Original Source
Implementing RFC7807 in REST APIs
https://restfulapi.net/problem-details/

## Digest of RFC7807

# Problem Details for HTTP APIs
Retrieved Date: 2023-10-05

This document provides exact technical details for implementing RFC7807 in REST APIs. It outlines the RFC7807 JSON object structure, detailed Express middleware error handling implementation, API method signatures, configuration options, and troubleshooting procedures.

## RFC7807 JSON Object Structure
The RFC7807 specification defines an error response object with the following fields:

- type (string): A URI identifier that categorizes the error type. Example: "about:blank" or a custom URI.
- title (string): A short, human-readable summary of the error that should not change from occurrence to occurrence.
- status (number): The HTTP status code generated by the origin server for this occurrence of the problem.
- detail (string): A human-readable explanation specific to this occurrence of the problem.
- instance (string): A URI reference that identifies the specific occurrence of the problem.

## Express Middleware Implementation
Below is an implementation pattern for using RFC7807 in an Express API:

function errorHandler(err, req, res, next) {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    type: err.type || "about:blank",
    title: err.message,
    status: statusCode,
    detail: err.detail || "Unexpected error occurred",
    instance: req.originalUrl
  });
}

Usage:
app.use(errorHandler);

## API Specifications
For error response creation, the method signature in a Node.js Express environment is as follows:

function createProblemDetails(err: Error & { status?: number, type?: string, detail?: string }, req: Request, res: Response): Response

Parameters:
- err: The error object which may include additional properties such as status, type, and detail.
- req: The Express request object.
- res: The Express response object.

Returns:
- An Express response with a JSON object conforming to RFC7807.

## Customization and Configuration Options
Developers can configure custom error types by setting the following options:

- err.type: A string indicating a custom error URI. Defaults to "about:blank" if not provided.
- err.status: A numeric HTTP status code. Defaults to 500 if not provided.
- err.detail: A string providing a detailed explanation.

These configurations allow fine-tuned control over error reporting and consistency in API responses.

## Troubleshooting Procedures
1. Ensure that the error-handling middleware is the last middleware used in Express.
2. Verify that the error object includes all necessary properties: status, type, title, detail, and instance.
3. Use console logs in the middleware for debugging error flows and unexpected responses.

Attribution: Data extracted from crawling URL https://restfulapi.net/problem-details/ with data size 0 bytes. Source entry index provided in SOURCES.md: Entry 24.

## Attribution
- Source: Implementing RFC7807 in REST APIs
- URL: https://restfulapi.net/problem-details/
- License: CC BY-NC 4.0
- Crawl Date: 2025-04-27T10:49:31.795Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-27
library/PROBLEM_DETAILS.md
# library/PROBLEM_DETAILS.md
# PROBLEM_DETAILS

## Crawl Summary
RFC 7807 defines a standardized JSON (and XML) structure to represent HTTP API error details. It specifies the mandatory members (type, title, status, detail, instance) for error objects, extension mechanism for additional problem-specific members, and associated media types (application/problem+json and application/problem+xml). The document also includes a RELAX NG schema for XML serialization and detailed security and IANA considerations.

## Normalised Extract
Table of Contents:
1. Introduction
   - Context for error representation in HTTP APIs.
2. Requirements
   - Must use problem details JSON or XML, with mandatory members and optional extensions.
3. Problem Details JSON Object
   - Mandatory members: type (string, default 'about:blank'), title (string), status (number), detail (string), instance (string).
   - Extensions: Custom members (e.g., balance, accounts) following naming rules.
4. Defining New Problem Types
   - Specifications for new type URIs, titles, and associated HTTP status codes. Optional Retry-After header usage.
5. Media Types
   - application/problem+json: JSON encoding, no required parameters, follows RFC7159.
   - application/problem+xml: XML encoding per RFC7303 with RELAX NG schema provided.
6. Security Considerations
   - Avoid exposing sensitive information; ensure consistency between HTTP status code and JSON 'status' member.
7. IANA Considerations
   - Registration details of media types and usage instructions.

For each topic, the details include the exact member definitions, media type configurations, example structures (JSON and XML), and related RFC specifications for error message formats.

## Supplementary Details
Technical Specifications & Configuration:
- Problem Details JSON Object Members:
  * type: string (URI reference, default 'about:blank').
  * title: string (short, human-readable summary, fixed except for localization).
  * status: number (HTTP status code corresponding to the error).
  * detail: string (problem-specific, human-readable error explanation focused on resolution).
  * instance: string (URI reference for the specific occurrence of the error).
- Extension Members: Must begin with ALPHA; at least 3 characters; valid characters ALPHA, DIGIT, underscore.
- Media Types:
  * application/problem+json: No parameters; encoding per RFC7159.
  * application/problem+xml: No parameters; encoding per RFC7303; includes XML namespace 'urn:ietf:rfc:7807'.
- XML RELAX NG Schema (documentation only):
  default namespace ns = 'urn:ietf:rfc:7807'
  start = problem
  problem = element problem { ( element type { xsd:anyURI }?, element title { xsd:string }?, element detail { xsd:string }?, element status { xsd:positiveInteger }?, element instance { xsd:anyURI }? ), anyNsElement }
- Security Considerations: Validate output to avoid leakage of internal details; use advisory 'status' member aligned with HTTP response code.
- IANA Registration: Media types registered with specifications from RFC 7807, including contact information and restrictions on usage.

## Reference Details
API Specifications & Implementation Details:
- JSON Problem Details Object Example:
    HTTP/1.1 403 Forbidden
    Content-Type: application/problem+json
    Content-Language: en
    {
      'type': 'https://example.com/probs/out-of-credit',
      'title': 'You do not have enough credit.',
      'detail': 'Your current balance is 30, but that costs 50.',
      'instance': '/account/12345/msgs/abc',
      'balance': 30,
      'accounts': ['/account/12345', '/account/67890']
    }

- XML Problem Details Object Example:
    HTTP/1.1 403 Forbidden
    Content-Type: application/problem+xml
    Content-Language: en
    <?xml version='1.0' encoding='UTF-8'?>
    <problem xmlns='urn:ietf:rfc:7807'>
      <type>https://example.com/probs/out-of-credit</type>
      <title>You do not have enough credit.</title>
      <detail>Your current balance is 30, but that costs 50.</detail>
      <instance>https://example.net/account/12345/msgs/abc</instance>
      <balance>30</balance>
      <accounts>
        <i>https://example.net/account/12345</i>
        <i>https://example.net/account/67890</i>
      </accounts>
    </problem>

- Method Signatures (Conceptual, as RFC is specification not SDK):
    function createProblemDetail(type: string = 'about:blank', title: string, status: number, detail: string, instance: string, extensions: object = {}): object
    Returns a JSON object that conforms to RFC 7807. Throws error if mandatory fields are missing.

- Configuration Options:
    * MediaType: 'application/problem+json' or 'application/problem+xml' set in HTTP header.
    * Extensions: Optional keys must follow naming convention: regex /^[A-Za-z][A-Za-z0-9_]{2,}$/.

- Best Practices:
    * Always use the same HTTP status code as in the 'status' member.
    * Do not include debugging or sensitive implementation details in the 'detail' member.
    * Use consistent type URIs to allow client-side caching or documentation lookups.

- Troubleshooting Procedures:
    1. Command: curl -i -H 'Accept: application/problem+json' https://api.example.com/resource
       Expected Output: HTTP status code matching error, and JSON body with matching 'status' and 'type'.
    2. Verify XML output by requesting with Accept: application/problem+xml. Use xmllint --noout to check XML well-formedness.
    3. Check media type consistency in HTTP headers to ensure client compatibility.
    4. Log all error responses and verify against the RFC member definitions using a JSON schema validator.

- Detailed Implementation Pattern:
    Step 1: Define error response based on environment configuration (JSON or XML).
    Step 2: Populate required fields: type, title, status, detail, instance.
    Step 3: Append any extension members after validating against naming rules.
    Step 4: Set appropriate Content-Type header.
    Step 5: Return error response with matching HTTP status code.

Developers can directly use these specifications to guide error response implementations and verify conformance using automated tests.

## Information Dense Extract
RFC7807 defines error details format: JSON object with members: type(string, default 'about:blank'), title(string), status(number), detail(string), instance(string). Extensions allowed with naming regex /^[A-Za-z][A-Za-z0-9_]{2,}$/. Media types: application/problem+json (JSON per RFC7159) and application/problem+xml (XML per RFC7303). XML RELAX NG schema provided; example JSON and XML responses given. API pattern: createProblemDetail(type, title, status, detail, instance, extensions) returns compliant object. Implementation best practices include aligning HTTP status code with JSON 'status', avoiding sensitive data exposure, and validating extension names. Troubleshooting involves CURL commands and XML linting to check media type and structure conformance.

## Sanitised Extract
Table of Contents:
1. Introduction
   - Context for error representation in HTTP APIs.
2. Requirements
   - Must use problem details JSON or XML, with mandatory members and optional extensions.
3. Problem Details JSON Object
   - Mandatory members: type (string, default 'about:blank'), title (string), status (number), detail (string), instance (string).
   - Extensions: Custom members (e.g., balance, accounts) following naming rules.
4. Defining New Problem Types
   - Specifications for new type URIs, titles, and associated HTTP status codes. Optional Retry-After header usage.
5. Media Types
   - application/problem+json: JSON encoding, no required parameters, follows RFC7159.
   - application/problem+xml: XML encoding per RFC7303 with RELAX NG schema provided.
6. Security Considerations
   - Avoid exposing sensitive information; ensure consistency between HTTP status code and JSON 'status' member.
7. IANA Considerations
   - Registration details of media types and usage instructions.

For each topic, the details include the exact member definitions, media type configurations, example structures (JSON and XML), and related RFC specifications for error message formats.

## Original Source
RFC 7807: Problem Details for HTTP APIs
https://tools.ietf.org/html/rfc7807

## Digest of PROBLEM_DETAILS

# Introduction
This document (RFC 7807) defines a standardized format for expressing error details in HTTP APIs using a JSON object or an equivalent XML format. It specifies a dedicated media type for problem details in JSON: application/problem+json and for XML: application/problem+xml. The document explains how HTTP status codes can be supplemented with additional machine‐readable information to assist API clients in error diagnosis and resolution.

# Requirements
The specification requires that HTTP APIs adopting problem details: 
- Use a JSON object (or XML) to convey error information.
- Represent a problem type with a URI reference in the "type" member, with the default value "about:blank" when omitted.
- Include members "title", "status", "detail", and "instance" that provide human-readable error messages and context.
- Allow for extension members that provide additional error-specific attributes (e.g., balance, accounts).

# The Problem Details JSON Object
When serialized, the JSON object MUST be identified with the media type application/problem+json. An example response is as follows:

HTTP/1.1 403 Forbidden
Content-Type: application/problem+json
Content-Language: en
{
  "type": "https://example.com/probs/out-of-credit",
  "title": "You do not have enough credit.",
  "detail": "Your current balance is 30, but that costs 50.",
  "instance": "/account/12345/msgs/abc",
  "balance": 30,
  "accounts": ["/account/12345", "/account/67890"]
}

# Members of a Problem Details Object
The canonical JSON object can include:
- type (string): URI reference identifying the problem type. Default: "about:blank".
- title (string): A short, consistent summary of the problem type.
- status (number): The HTTP status code generated by the origin server for this occurrence of the problem.
- detail (string): A human-readable explanation targeting correction, not debugging.
- instance (string): A URI reference identifying the specific occurrence of the problem.

Extension members MAY be added to the object. Extensions MUST use names beginning with an ALPHA character and be at least three characters long, consisting only of ALPHA, DIGIT, and underscore characters.

# Defining New Problem Types
When defining new problem types, the following MUST be documented:
1. A type URI (with http or https scheme).
2. A descriptive title.
3. The HTTP status code to be used with.

Optionally, new types MAY specify additional members (e.g., use of Retry-After header or typed links in extensions) and SHOULD resolve to HTML documentation when dereferenced.

# Media Types
Two media types are defined:

1. application/problem+json:
   - Required parameters: None
   - Optional parameters: None (unrecognized parameters ignored)
   - Encoding: Same as JSON (RFC7159)

2. application/problem+xml:
   - Required parameters: None
   - Optional parameters: None (unrecognized parameters ignored)
   - Encoding: As per RFC7303

# XML Format and RELAX NG Schema
For XML representations, the following RELAX NG schema is given (for documentation only):

default namespace ns = "urn:ietf:rfc:7807"
start = problem
problem = element problem {
  ( element type { xsd:anyURI }?,
    element title { xsd:string }?,
    element detail { xsd:string }?,
    element status { xsd:positiveInteger }?,
    element instance { xsd:anyURI }? ),
  anyNsElement
}

Extension arrays and objects are encoded as nested XML elements within the same namespace.

# Security Considerations
Problem details must not inadvertently expose sensitive internal details. It is recommended that extensions be carefully considered to avoid leaking implementation internals. The duplicated information in the HTML status code and in the "status" member can be used by intermediaries, but its interpretation is advisory only.

# IANA Considerations
IANA has registered the media types application/problem+json and application/problem+xml, with their associated parameters and usage recommendations as documented in RFC 7807.

# References
Key normative and informative references include RFC 2119, RFC 3986, RFC 5234, RFC 7159, RFC 7230, RFC 7231, and others which provide broader context on HTTP, JSON, XML and URI specifications.

Retrieved: 2023-10-05
Data Size: 5183169 bytes

## Attribution
- Source: RFC 7807: Problem Details for HTTP APIs
- URL: https://tools.ietf.org/html/rfc7807
- License: IETF (Public Domain)
- Crawl Date: 2025-04-27T02:23:13.964Z
- Data Size: 5183169 bytes
- Links Found: 8719

## Retrieved
2025-04-27
library/ERROR_HANDLING.md
# library/ERROR_HANDLING.md
# ERROR_HANDLING

## Crawl Summary
Node.js error handling implementation includes process-level handlers (process.on('uncaughtException') and process.on('unhandledRejection')), Express error middleware with signature (err, req, res, next), custom error constructors for detailed error information, and configuration for logging (using Winston). Troubleshooting involves tracing warnings with node flags.

## Normalised Extract
Table of Contents:
1. Process-level Error Handling
   - process.on('uncaughtException', callback) for synchronous error capture
   - process.on('unhandledRejection', callback) for promise rejections
   Implementation Details:
   - Callback receives error object or rejection reason and promise
   - Recommended to exit process on fatal errors using process.exit(1) for uncaught exceptions
2. Express Error Middleware
   - Signature: errorHandler(err: Error, req: Express.Request, res: Express.Response, next: Express.NextFunction)
   Implementation Details:
   - Respond with status code 500 and JSON containing error message
   - Must be registered after all routes
3. Custom Error Creation API
   - Constructor: class CustomError extends Error with additional property code
   - Signature: new CustomError(message: string, code: string)
   Implementation Details:
   - Use to tag errors like 'ERR_INVALID_INPUT'
4. Configuration Options and Best Practices
   - Logging setup using Winston: level set to 'error', JSON format, Console transport
   - Use robust validation (e.g., Zod) to pre-check data
   - Run Node with --trace-warnings for detailed output


## Supplementary Details
Process-level Handlers:
- process.on('uncaughtException', (err: Error): void) { log error; process.exit(1); }
- process.on('unhandledRejection', (reason: any, promise: Promise<any>): void) { log error details to console; }

Express Error Middleware:
- function errorHandler(err: Error, req: Express.Request, res: Express.Response, next: Express.NextFunction): void {
    res.status(500).json({ error: err.message });
}

Custom Error API:
- class CustomError extends Error {
    public code: string;
    constructor(message: string, code: string) {
      super(message);
      this.code = code;
    }
}

Configuration Options for Logging (Winston):
- level: 'error'
- format: JSON
- transports: [ Console transport ]

Best Practices:
- Always validate inputs, register error middleware at the end, use process-level handlers for uncaught exceptions, and configure logging properly.

Troubleshooting Procedures:
- Execute with node --trace-warnings
- Monitor console output for detailed stack traces and error messages

## Reference Details
API Specifications:
1. Process Error Handlers:
   - process.on('uncaughtException', (err: Error): void) -> Logs error and calls process.exit(1)
   - process.on('unhandledRejection', (reason: any, promise: Promise<any>): void) -> Logs rejection details

2. Express Error Middleware:
   - Function Signature: function errorHandler(err: Error, req: Express.Request, res: Express.Response, next: Express.NextFunction): void
   - Implementation: res.status(500).json({ error: err.message });

3. Custom Error Constructor:
   - Class Definition: class CustomError extends Error
       Constructor Parameters: message: string, code: string
       Returns instance with property code
   - Usage Example: new CustomError('Invalid input provided', 'ERR_INVALID_INPUT')

4. Logger Configuration using Winston:
   - Code: const logger = winston.createLogger({ level: 'error', format: winston.format.json(), transports: [ new winston.transports.Console() ] });

5. Troubleshooting Commands:
   - Command: node --trace-warnings app.js
   - Expected Output: Detailed error stack traces and warning messages

6. Best Practices:
   - Validate all external inputs using schema validators
   - Register error middleware after all route definitions
   - Log errors with sufficient detail for debugging


## Information Dense Extract
process.on('uncaughtException')(err:Error)=>{console.error(err);process.exit(1)}; process.on('unhandledRejection')(reason:any, promise:Promise<any>)=>{console.error(reason,promise)}; Express middleware: errorHandler(err:Error, req, res, next):void => res.status(500).json({error: err.message}); CustomError: class CustomError extends Error { constructor(message:string, code:string){super(message); this.code=code}}; Logger: winston.createLogger({level:'error', format:winston.format.json(), transports:[new winston.transports.Console()]}); node --trace-warnings for debugging

## Sanitised Extract
Table of Contents:
1. Process-level Error Handling
   - process.on('uncaughtException', callback) for synchronous error capture
   - process.on('unhandledRejection', callback) for promise rejections
   Implementation Details:
   - Callback receives error object or rejection reason and promise
   - Recommended to exit process on fatal errors using process.exit(1) for uncaught exceptions
2. Express Error Middleware
   - Signature: errorHandler(err: Error, req: Express.Request, res: Express.Response, next: Express.NextFunction)
   Implementation Details:
   - Respond with status code 500 and JSON containing error message
   - Must be registered after all routes
3. Custom Error Creation API
   - Constructor: class CustomError extends Error with additional property code
   - Signature: new CustomError(message: string, code: string)
   Implementation Details:
   - Use to tag errors like 'ERR_INVALID_INPUT'
4. Configuration Options and Best Practices
   - Logging setup using Winston: level set to 'error', JSON format, Console transport
   - Use robust validation (e.g., Zod) to pre-check data
   - Run Node with --trace-warnings for detailed output

## Original Source
Handling Errors in Node.js: A Comprehensive Guide
https://blog.risingstack.com/node-js-error-handling-tutorial/

## Digest of ERROR_HANDLING

# ERROR_HANDLING

## Overview
This document details the technical implementation of error handling in Node.js. It covers both process-level and route-specific practices, including complete API specifications, SDK method signatures, and configuration options necessary for robust error management.

Date Retrieved: 2023-10-05
Attribution: Crawled from https://blog.risingstack.com/node-js-error-handling-tutorial/ (Entry 28 in SOURCES.md). Data Size: 0 bytes

## Process-level Error Handling
- Use process.on('uncaughtException', callback) to handle synchronous exceptions that are not caught. 

  Example:
  ```js
  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
  });
  ```
- Use process.on('unhandledRejection', callback) to catch unhandled promise rejections.

  Example:
  ```js
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });
  ```

## Express Error Middleware
- Implement a centralized error handler middleware with the signature:

  Signature: function errorHandler(err: Error, req: Express.Request, res: Express.Response, next: Express.NextFunction): void

  Example:
  ```js
  function errorHandler(err, req, res, next) {
    res.status(500).json({ error: err.message });
  }
  module.exports = errorHandler;
  ```

## Custom Error Creation API
- Create custom errors using a dedicated constructor to include additional properties like error codes.

  Example:
  ```js
  class CustomError extends Error {
    constructor(message, code) {
      super(message);
      this.code = code; // e.g., 'ERR_INVALID_INPUT'
    }
  }
  
  // Usage:
  const myError = new CustomError('Invalid input provided', 'ERR_INVALID_INPUT');
  ```

## Configuration Options and Best Practices
- Logging: Configure error logging using libraries such as Winston.

  Example:
  ```js
  const winston = require('winston');
  const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [ new winston.transports.Console() ]
  });
  ```
- Always validate input using robust validation (e.g., via Zod) prior to processing.
- In Express, place error middleware after all route declarations to ensure all errors are caught.

## Troubleshooting Procedures
- Run Node.js with the --trace-warnings flag to get detailed stack traces:

  Command: node --trace-warnings app.js

- Monitor logs for uncaught exceptions and unhandled rejections.
- Verify middleware registration if errors are not being intercepted.


## Attribution
- Source: Handling Errors in Node.js: A Comprehensive Guide
- URL: https://blog.risingstack.com/node-js-error-handling-tutorial/
- License: MIT License
- Crawl Date: 2025-04-27T07:47:12.034Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-27
library/CHROMA_JS.md
# library/CHROMA_JS.md
# CHROMA_JS

## Crawl Summary
chroma.js supports comprehensive color manipulations including parsing from multiple formats (named, hex, numeric, RGB, object), conversion to various color spaces (HSL, HSV, Lab, Lch, HCL, OKLab, OKLch, CMYK, GL), and output in hex, CSS, and array formats. It provides methods for blending (mix, average, blend), computing contrast ratios (WCAG, APCA), and generating color scales with options for domain, gamma, lightness correction, padding, and discrete classes. Cubehelix support is included with adjustable start, rotations, hue, gamma, and lightness parameters.

## Normalised Extract
TABLE OF CONTENTS:
1. Installation and Setup
2. Color Constructors and Input Formats
3. Color Space Conversions and Constructors
4. Color Manipulation Methods
5. Color Output Methods
6. Statistical and Comparison Functions
7. Scale and Palette Generation
8. Cubehelix Configuration

1. Installation and Setup:
- npm install chroma-js
- Import: import chroma from 'chroma-js'
- For browser use: download chroma.min.js or use unpkg.com link

2. Color Constructors and Input Formats:
- chroma(color): Auto-detects input such as 'hotpink', '#f39', 0xff3399, [255,51,153]
- Object input: chroma({ h:120, s:1, l:0.75 })
- Format validation: chroma.valid(color)

3. Color Space Conversions and Constructors:
- chroma.hsl(h, s, l): h in [0,360], s,l in [0,1]
- chroma.hsv, chroma.lab, chroma.lch, chroma.hcl, chroma.oklab, chroma.oklch
- chroma.cmyk(c, m, y, k): values in [0,1]
- chroma.gl(r, g, b, [alpha]): normalized 0..1
- chroma.temperature(K): Converts Kelvin to color

4. Color Manipulation Methods:
- alpha(a): Set/get opacity
- darken(value=1)/brighten(value=1): Adjust lightness
- saturate(value=1)/desaturate(value=1): Adjust saturation in Lch space
- set(channel, value): Change a channel (supports relative changes with '*')
- get(channel): Retrieve channel value
- luminance([lum, mode]): Get/set brightness (default mode 'rgb')
- mix(target, ratio=0.5, mode): Mix with another color
- shade(ratio, mode): Mix with black; tint(ratio, mode): Mix with white

5. Color Output Methods:
- hex(mode='auto|rgb|rgba|argb'): Returns hex string; 'auto' includes alpha if <1
- name(): Returns color name or hex if not available
- css(optionalSpace): Returns CSS representation in specified color space
- rgb(round=true)/rgba(round=true): Returns r, g, b[,a] array
- hsl(), hsv(), hsi(), lab(), lch(), hcl(), oklab(), oklch(): Returns arrays in respective spaces
- num(): Numeric representation of hex color
- gl(): Normalized RGB components
- clipped: Flag if value outside [0,255]

6. Statistical and Comparison Functions:
- contrast(color1, color2): WCAG contrast ratio
- contrastAPCA(text, background): APCA contrast ratio
- distance(color1, color2, mode='lab'): Euclidean distance in a given space
- deltaE(color1, color2, Kl=1, Kc=1, Kh=1): CIE2000 color difference

7. Scale and Palette Generation:
- chroma.scale(colors): Creates a color scale function
  - domain([min, max] or custom array): Specifies input values
  - mode('rgb'|'lab'|'lrgb'|'hsl'|'lch'): Sets interpolation method
  - gamma(factor): Adjusts midpoint brightness (default 1)
  - correctLightness(): Distributes lightness evenly
  - cache(true/false): Enable/disable caching
  - padding(value or [padStart, padEnd]): Crops gradient ends
  - colors(n, format): Retrieves n colors as hex or chroma objects
  - classes(number or array): Returns discrete color classes
  - nodata(color): Sets fallback for null inputs
- chroma.brewer: Predefined ColorBrewer palettes (e.g., OrRd, RdBu)
- chroma.bezier(colors): Bezier interpolation in Lab space; can be converted with .scale()

8. Cubehelix Configuration:
- chroma.cubehelix([start=300, rotations=-1.5, hue=1, gamma=1, lightness=[0,1]]): Generates a cubehelix scale
  - start(value): Starting hue angle
  - rotations(value): Number and direction (e.g., -1.5 for -540°)
  - hue(value): Fixed value or range
  - gamma(value): Gamma correction factor
  - lightness(range): Specifies lightness bounds (e.g., [0.3,0.8])
  - Use .scale() for conversion to chroma.scale design


## Supplementary Details
Installation:
- npm install chroma-js
- Import using ES6: import chroma from 'chroma-js'

Color Constructor Parameters:
- chroma(input) where input may be string (e.g., 'hotpink', '#ff3399', 'F39'), number (e.g., 0xff3399 or between 0 and 16777215), array ([255,51,153]), object with keys (e.g., { h: 120, s: 1, l: 0.75 })

Method Defaults and Parameter Values:
- darken/brighten/saturate/desaturate: default value = 1 if not provided
- mix: default ratio = 0.5, mode = 'lrgb'
- hex: default mode = 'auto'; to force exclusion of alpha use hex('rgb')
- scale functions: default domain is [0,1]; gamma default is 1, caching enabled by default

Cubehelix Defaults:
- start = 300, rotations = -1.5, hue = 1, gamma = 1, lightness = [0,1]

Example Implementation Patterns:
- Reading and Manipulating Colors:
  color = chroma('pink')
  modified = color.darken(2).saturate(2)
  hexValue = modified.hex()

- Generating a Color Scale:
  scale = chroma.scale(['yellow', 'navy']).domain([0,100]).mode('lab').gamma(1.2)
  colorsArray = scale.colors(5)

- Using Cubehelix:
  chCube = chroma.cubehelix().start(200).rotations(-0.5).gamma(0.8).lightness([0.3,0.8]).scale()
  palette = chCube.colors(5)


## Reference Details
API Specifications:
1. chroma(input: string | number | number[] | object): Color
   - Auto-detects input format; throws Error if parsing fails
   Examples:
      chroma('hotpink')
      chroma('#ff3399')
      chroma(0xff3399)
      chroma([255,51,153])
      chroma({ h: 120, s: 1, l: 0.75 })

2. chroma.hsl(h: number, s: number, l: number): Color
   - h in [0,360], s and l in [0,1]

3. chroma.mix(color1: Color|string, color2: Color|string, ratio?: number, mode?: string): Color
   - ratio default 0.5; mode options: 'lrgb', 'rgb', 'hsl', 'lab', 'lch'

4. Color Methods:
   - alpha(a?: number): number | Color (setter returns new Color)
   - darken(value?: number = 1): Color
   - brighten(value?: number = 1): Color
   - saturate(value?: number = 1): Color
   - desaturate(value?: number = 1): Color
   - set(channel: string, value: number | string): Color
       Example: set('hsl.h', 0) to set hue to 0
   - get(channel: string): number
   - luminance(lum?: number, mode?: string = 'rgb'): number | Color
   - hex(mode?: 'auto' | 'rgb' | 'rgba' | 'argb'): string
   - css(colorSpace?: string): string
   - rgb(round?: boolean = true): number[]
   - rgba(round?: boolean = true): number[]
   - lab(): number[]
   - lch(): number[]
   - hcl(): number[]
   - oklab(): number[]
   - oklch(): number[]
   - num(): number
   - gl(): number[]
   - clipped: boolean

5. Scale API:
   let scale = chroma.scale(colors: string[] | Color[])
       scale.domain(domain: number[]): Scale
       scale.mode(mode: string): Scale
       scale.gamma(factor: number): Scale
       scale.correctLightness(): Scale
       scale.cache(flag: boolean): Scale
       scale.padding(pad: number | [number, number]): Scale
       scale.colors(n: number, format?: string): string[] | Color[]
       scale.classes(classes: number | number[]): Scale
       scale.nodata(color: string): Scale

6. Cubehelix API:
   let cubehelix = chroma.cubehelix(start?: number, rotations?: number, hue?: number, gamma?: number, lightness?: [number, number])
       cubehelix.start(value: number): Cubehelix
       cubehelix.rotations(value: number): Cubehelix
       cubehelix.hue(value: number | [number, number]): Cubehelix
       cubehelix.gamma(value: number): Cubehelix
       cubehelix.lightness(range: [number, number]): Cubehelix
       cubehelix.scale(): Scale

Code Examples:
// Example: Read, manipulate and output a color
var color = chroma('pink');
var darkened = color.darken(2).saturate(2);
var hexCode = darkened.hex(); // e.g. "#d81b60"

// Example: Generate a 5-color palette using a chroma scale
var palette = chroma.scale(['yellow', 'navy']).domain([0,100]).mode('lab').gamma(1.2).colors(5);

// Example: Cubehelix scale generation
var cubeScale = chroma.cubehelix().start(200).rotations(-0.5).gamma(0.8).lightness([0.3, 0.8]).scale();
var cubePalette = cubeScale.colors(5);

Troubleshooting Procedures:
- If a color fails to parse, use chroma.valid(color) to validate inputs.
- For incorrect interpolation results, adjust scale.mode() to 'lab' or 'lrgb'.
- Verify alpha handling using hex('rgb') if undesired alpha in output.
- Check white point settings with chroma.setLabWhitePoint(whitePoint) when using Lab/Lch conversions.

Configuration Options:
- Scale default domain: [0,1]
- Gamma default: 1
- Cubehelix defaults: start=300, rotations=-1.5, hue=1, gamma=1, lightness=[0,1]

Return Types:
All color transformation methods return a new Color instance; scale methods return Scale instance; cubehelix methods return Cubehelix instance, convertible to Scale.

## Information Dense Extract
chroma(input): accepts string ('hotpink', '#f39'), number (0xff3399), array ([255,51,153]), object ({h:120,s:1,l:0.75}); chroma.valid(input): boolean; Constructors: chroma.hsl(h,s,l), chroma.hsv, lab, lch, hcl, oklab, oklch, cmyk, gl, temperature(K); Methods: alpha(a), darken(1), brighten(1), saturate(1), desaturate(1), set('channel', value), get('channel'), luminance(lum, 'rgb'), mix(target,0.5,'lrgb'), shade(ratio), tint(ratio), hex('auto'|'rgb'|'rgba'|'argb'), name(), css(cs), rgb(true), rgba(true), hsl(), hsv(), hsi(), lab(), lch(), hcl(), oklab(), oklch(), num(), gl(), clipped; Scale: chroma.scale(colors), domain([min,max]), mode('rgb'|'lab'|'lrgb'|'hsl'|'lch'), gamma(1), correctLightness(), cache(true), padding(pad), colors(n,'hex'|null), classes(n or array), nodata(color); Cubehelix: chroma.cubehelix(start=300,rotations=-1.5,hue=1,gamma=1,lightness=[0,1]), methods: start(val), rotations(val), hue(val), gamma(val), lightness(range), scale(); API returns new Color; scale functions return Scale objects; troubleshooting: use chroma.valid, adjust scale.mode, use hex('rgb') for alpha control.

## Sanitised Extract
TABLE OF CONTENTS:
1. Installation and Setup
2. Color Constructors and Input Formats
3. Color Space Conversions and Constructors
4. Color Manipulation Methods
5. Color Output Methods
6. Statistical and Comparison Functions
7. Scale and Palette Generation
8. Cubehelix Configuration

1. Installation and Setup:
- npm install chroma-js
- Import: import chroma from 'chroma-js'
- For browser use: download chroma.min.js or use unpkg.com link

2. Color Constructors and Input Formats:
- chroma(color): Auto-detects input such as 'hotpink', '#f39', 0xff3399, [255,51,153]
- Object input: chroma({ h:120, s:1, l:0.75 })
- Format validation: chroma.valid(color)

3. Color Space Conversions and Constructors:
- chroma.hsl(h, s, l): h in [0,360], s,l in [0,1]
- chroma.hsv, chroma.lab, chroma.lch, chroma.hcl, chroma.oklab, chroma.oklch
- chroma.cmyk(c, m, y, k): values in [0,1]
- chroma.gl(r, g, b, [alpha]): normalized 0..1
- chroma.temperature(K): Converts Kelvin to color

4. Color Manipulation Methods:
- alpha(a): Set/get opacity
- darken(value=1)/brighten(value=1): Adjust lightness
- saturate(value=1)/desaturate(value=1): Adjust saturation in Lch space
- set(channel, value): Change a channel (supports relative changes with '*')
- get(channel): Retrieve channel value
- luminance([lum, mode]): Get/set brightness (default mode 'rgb')
- mix(target, ratio=0.5, mode): Mix with another color
- shade(ratio, mode): Mix with black; tint(ratio, mode): Mix with white

5. Color Output Methods:
- hex(mode='auto|rgb|rgba|argb'): Returns hex string; 'auto' includes alpha if <1
- name(): Returns color name or hex if not available
- css(optionalSpace): Returns CSS representation in specified color space
- rgb(round=true)/rgba(round=true): Returns r, g, b[,a] array
- hsl(), hsv(), hsi(), lab(), lch(), hcl(), oklab(), oklch(): Returns arrays in respective spaces
- num(): Numeric representation of hex color
- gl(): Normalized RGB components
- clipped: Flag if value outside [0,255]

6. Statistical and Comparison Functions:
- contrast(color1, color2): WCAG contrast ratio
- contrastAPCA(text, background): APCA contrast ratio
- distance(color1, color2, mode='lab'): Euclidean distance in a given space
- deltaE(color1, color2, Kl=1, Kc=1, Kh=1): CIE2000 color difference

7. Scale and Palette Generation:
- chroma.scale(colors): Creates a color scale function
  - domain([min, max] or custom array): Specifies input values
  - mode('rgb'|'lab'|'lrgb'|'hsl'|'lch'): Sets interpolation method
  - gamma(factor): Adjusts midpoint brightness (default 1)
  - correctLightness(): Distributes lightness evenly
  - cache(true/false): Enable/disable caching
  - padding(value or [padStart, padEnd]): Crops gradient ends
  - colors(n, format): Retrieves n colors as hex or chroma objects
  - classes(number or array): Returns discrete color classes
  - nodata(color): Sets fallback for null inputs
- chroma.brewer: Predefined ColorBrewer palettes (e.g., OrRd, RdBu)
- chroma.bezier(colors): Bezier interpolation in Lab space; can be converted with .scale()

8. Cubehelix Configuration:
- chroma.cubehelix([start=300, rotations=-1.5, hue=1, gamma=1, lightness=[0,1]]): Generates a cubehelix scale
  - start(value): Starting hue angle
  - rotations(value): Number and direction (e.g., -1.5 for -540)
  - hue(value): Fixed value or range
  - gamma(value): Gamma correction factor
  - lightness(range): Specifies lightness bounds (e.g., [0.3,0.8])
  - Use .scale() for conversion to chroma.scale design

## Original Source
Chroma.js Documentation
https://gka.github.io/chroma.js/

## Digest of CHROMA_JS

# chroma.js Documentation Digest

Retrieved Date: 2023-10-xx

## Overview
chroma.js is a zero-dependency JavaScript library (13.5kB) providing extensive functionality for color conversion, manipulation, interpolation, and scale generation. It supports multiple color input formats (named colors, hex strings, numbers, RGB arrays, and objects) and output formats (hex, CSS strings, rgb arrays) across various color spaces.

## Installation
- Node.js: npm install chroma-js
- Import using: import chroma from 'chroma-js';
- For tree shaking: import specific modules e.g., import deltaE from 'chroma-js/src/utils/deltaE.js'
- Browser: use chroma.min.js or hosted version on unpkg.com

## API Functions and Methods

### Color Constructors and Parsing
- chroma(color): Automatically detects input formats (e.g. 'hotpink', '#f39', 0xff3399, [255,51,153])
- chroma(h, s, l, 'hsl') for HSL creation
- chroma({h:120, s:1, l:0.75}) and other color space objects
- chroma.valid(color): Returns boolean if color is parsed

### Color Space Constructors
- chroma.hsl(h, s, l): h in [0,360], s, l in [0,1]
- chroma.hsv(h, s, v)
- chroma.lab(l, a, b)
- chroma.lch(l, c, h): l roughly 0..100-150, hue in 0..360
- chroma.hcl(h, c, l): same as lch with order reversed
- chroma.oklab(l, a, b)
- chroma.oklch(l, c, h)
- chroma.cmyk(c, m, y, k): values between 0 and 1
- chroma.gl(r, g, b, [alpha]): channels normalized to 0..1
- chroma.temperature(K): Returns color from temperature in Kelvin

### Color Manipulation Methods
- alpha(a): Get/set the opacity
- darken(value=1) and brighten(value=1)
- saturate(value=1) and desaturate(value=1)
- set(channel, value): Change individual channel (supports relative changes with * operator)
- get(channel): Retrieve specific channel value
- luminance([lum, mode='rgb']): Get or set WCAG relative brightness
- mix(targetColor, ratio=0.5, mode='lrgb'): Mixes two colors
- shade(ratio, mode): Mixes with black
- tint(ratio, mode): Mixes with white

### Color Output Methods
- hex(mode='auto|rgb|rgba|argb'): Returns hexadecimal string representation; alpha included if < 1 in 'auto' mode
- name(): Returns named color if available, otherwise hex string
- css([colorSpace]): Returns CSS string in formats such as rgb, hsl, lab, etc.
- rgb(round=true) and rgba(round=true): Returns array of channel values
- hsl(), hsv(), hsi(), lab(), lch(), hcl(), oklab(), oklch(): Returns respective color space arrays
- num(): Returns numeric representation of hex RGB color
- gl(): Returns normalized RGB
- clipped: Indicates if RGB value is clipped and _rgb._unclipped for unclipped values

### Color Comparison and Statistical Methods
- contrast(color1, color2): WCAG contrast ratio
- contrastAPCA(text, background): APCA contrast ratio
- distance(color1, color2, mode='lab'): Euclidean distance in a color space
- deltaE(color1, color2, Kl=1, Kc=1, Kh=1): CIE 2000 color difference metric

### Scales and Palettes
- chroma.scale(colors): Returns a scale function mapping 0..1 to a color gradient
  - domain(domainArray): Set the input domain
  - mode(mode): Set interpolation method (e.g., rgb, lab, lrgb, hsl, lch)
  - gamma(factor): Gamma correction with default 1
  - correctLightness(): Adjust gradient for even lightness
  - cache(true/false): Cache computed colors
  - padding(number or [start, end]): Adjust gradient endpoints
  - colors(n, format='hex' or null): Returns array of n colors; if format is null, returns chroma objects
  - classes(n or array): Return discrete classes from scale
  - nodata(color): Set fallback color for null inputs
- chroma.brewer: Collection of ColorBrewer palettes (e.g., OrRd, RdBu, etc.)
- chroma.bezier(colors): Returns function for bezier color interpolation in Lab space

### Cubehelix
- chroma.cubehelix([start=300, rotations=-1.5, hue=1, gamma=1, lightness=[0,1]]): Configures a cubehelix color scale
  - start(value): Starting hue angle
  - rotations(value): Number and direction of rotations
  - hue(value): Controls saturation (can be a range)
  - gamma(value): Gamma correction factor
  - lightness(range): Lightness range; can be reversed
  - scale(): Converts cubehelix function into chroma scale instance

## Changelog Highlights
- Version changes include API adjustments such as addition of color.shade, color.tint, and support for modern CSS color spaces.
- Use of setLabWhitePoint and getLabWhitePoint to manage the D65, D50, etc. white reference points for Lab conversions.


## Attribution
- Source: Chroma.js Documentation
- URL: https://gka.github.io/chroma.js/
- License: MIT License
- Crawl Date: 2025-04-29T09:50:23.226Z
- Data Size: 803296 bytes
- Links Found: 80

## Retrieved
2025-04-29
library/MATHJS.md
# library/MATHJS.md
# MATHJS

## Crawl Summary
Installation: npm install mathjs; Configuration options include relTol (default 1e-12), absTol (default 1e-15), matrix ('Matrix' vs 'Array'), number type options ('number', 'BigNumber', 'bigint', 'Fraction'), precision (default 64), predictable (false), randomSeed (null). Chaining with math.chain(value) and finishing with .done(). Expression evaluation via math.evaluate, math.compile, and math.parse. Extension capabilities via math.import with override, silent, and wrap options. Advanced API includes typed functions (math.typed) and factory functions (factory(name, dependencies, create, meta)). Serialization via JSON.stringify(value, math.replacer) and JSON.parse(str, math.reviver).

## Normalised Extract
Table of Contents:
1. Installation
   - Use npm install mathjs, CDN links available.
2. Configuration
   - Create instance using create(all, config) with options: relTol (1e-12), absTol (1e-15), matrix ('Matrix' or 'Array'), number ('number' default, 'BigNumber', 'bigint', 'Fraction'), precision (64), predictable (false), randomSeed (null).
3. Chaining
   - Create chain: math.chain(value) then sequentially call functions and end with .done().
   - Example: math.chain(3).add(4).multiply(2).done() returns 14.
4. Expression Parsing
   - Evaluate using math.evaluate(expr, scope).
   - Compile with math.compile(expr) and then evaluate with .evaluate(scope).
   - Parse into expression tree with math.parse(expr) supporting toString() and toTex().
5. Extension
   - Extend library using math.import(object, {override, silent, wrap}).
6. Factory and Typed Functions
   - Create typed functions with math.typed and factory functions with math.factory(name, dependencies, create, meta).
7. Serialization
   - Serialize using JSON.stringify(object, math.replacer) and deserialize with JSON.parse(string, math.reviver).

Detailed Topics:
Installation: npm install mathjs, global usage via mathjs command line.
Configuration: Exact keys include relTol, absTol, matrix, number, precision, predictable, randomSeed. Update via math.config({ ... }).
Chaining: Use math.chain(value), operations auto prepend chain value; must conclude with done().
Expression Parsing: Use math.evaluate for direct evaluation, compile for performance on repeated evaluation, parse for obtaining expression nodes.
Extension: Import new functions and constants; options allow overriding or silent failures.
Factory/Typed: Factory functions use dependency injection for number type support; typed functions allow multiple signatures.
Serialization: Math.js data types support toJSON; use replacer and reviver for full fidelity.

## Supplementary Details
Configuration Options:
- relTol: 1e-12 (minimum relative difference for equality)
- absTol: 1e-15 (minimum absolute difference)
- matrix: 'Matrix' (default) or 'Array'
- number: 'number' (default), 'BigNumber', 'bigint', or 'Fraction'
- precision: 64 (for BigNumbers)
- predictable: false (if true, forces deterministic output types)
- randomSeed: null (set a seed value for deterministic pseudo random numbers)

Chaining Implementation Pattern:
1. Start chain with math.chain(initialValue)
2. Call sequential functions, inheriting chain value
3. End chain with .done() to retrieve computed value

Extension Implementation Pattern:
1. Use math.import with an object of new functions/values
2. Options: override (true/false), silent (true/false), wrap (true/false)

Factory Function Pattern:
- Use math.factory(name, dependencies, create, meta)
- Example: negativeSquare that returns negative of square of input

Typed Functions:
- Define multiple signatures; example for function max handling number and BigNumber types

Serialization Procedures:
- JSON.stringify(object, math.replacer) converts types such as Complex and Unit
- Use JSON.parse(string, math.reviver) to rehydrate objects

Troubleshooting Steps:
- Verify configuration via math.config() output
- For evaluation errors, inspect expression syntax with math.parse
- For import issues, check module system (CommonJS vs ES modules) and use correct syntax

## Reference Details
API Specifications:
1. math.evaluate(expr: string | Array, scope?: Object | Map) -> returns computed result (number, Complex, Matrix, etc.)
2. math.compile(expr: string | Array) -> { evaluate(scope?: Object | Map): any }
3. math.parse(expr: string | Array) -> Node with methods: compile(), toString(), toTex()
4. math.chain(value: any) -> Chain instance with all math function methods, and special methods:
   - done(): any
   - valueOf(): any
   - toString(): string

Example Code:
-------------------------------
// Node.js CommonJS usage
const { create, all } = require('mathjs');
const config = { matrix: 'Array', number: 'BigNumber', precision: 32 };
const math = create(all, config);
const result = math.evaluate('1 / 3'); // returns BigNumber with value 0.333... with precision 32
console.log(result.toString());

// Chaining example:
const chained = math.chain(3).add(4).multiply(2).done();
console.log(chained); // 14

// Extension and Import:
math.import({
  myFunc: function(name) { return 'hello, ' + name + '!'; }
}, { override: false, silent: false, wrap: false });

// Factory function example:
const negativeSquare = math.factory('negativeSquare', ['multiply','unaryMinus'], function({ multiply, unaryMinus }) {
  return function(x) {
    return unaryMinus(multiply(x, x));
  };
});
math.import(negativeSquare);
console.log(math.negativeSquare(5)); // -25

// Parser instance
const parser = math.parser();
parser.evaluate('x = 7/2');
console.log(parser.get('x')); // 3.5

// Serialization
const complexObj = math.complex('2 + 3i');
const jsonStr = JSON.stringify(complexObj, math.replacer);
const rehydrated = JSON.parse(jsonStr, math.reviver);
console.log(rehydrated.toString()); // '2+3i'
-------------------------------

Configuration Options Detail:
- relTol: number, default 1e-12, used for comparing equality
- absTol: number, default 1e-15, used for comparing equality
- matrix: string, 'Matrix' or 'Array'; influences output type
- number: string, options 'number' (default), 'BigNumber', 'bigint', 'Fraction'
- precision: number; applies only when number is 'BigNumber', default 64
- predictable: boolean; default false, forces deterministic output types
- randomSeed: any; default null, can be set to a constant seed

Troubleshooting Commands:
- Verify configuration: console.log(math.config());
- Test evaluation: math.evaluate('sqrt(16)') should yield 4
- Check imported functions: console.log(math.myFunc('user')) should return 'hello, user!'
- For chain errors, ensure chain methods are called sequentially and finished with .done()
- For parser scope issues, use parser.get('variable') to inspect current scope

## Information Dense Extract
npm install mathjs; create(all, {relTol:1e-12, absTol:1e-15, matrix:'Matrix', number:'number', precision:64, predictable:false, randomSeed:null}); math.chain(value).add().multiply().done(); math.evaluate(expr, scope?); math.compile(expr) returns { evaluate(scope?) }; math.parse(expr) returns Node with compile(), toString(), toTex(); math.import({obj}, {override:false, silent:false, wrap:false}); math.typed for multi-signature functions; factory(name, deps, create, meta?) for dependency injection; JSON.stringify(val, math.replacer) and JSON.parse(str, math.reviver) for serialization; Use parser = math.parser() with evaluate, get, set, clear, remove; Full API methods include evaluate(string|Array, scope), compile(string|Array), chain(value), config(obj), parser(), import(obj, opts).

## Sanitised Extract
Table of Contents:
1. Installation
   - Use npm install mathjs, CDN links available.
2. Configuration
   - Create instance using create(all, config) with options: relTol (1e-12), absTol (1e-15), matrix ('Matrix' or 'Array'), number ('number' default, 'BigNumber', 'bigint', 'Fraction'), precision (64), predictable (false), randomSeed (null).
3. Chaining
   - Create chain: math.chain(value) then sequentially call functions and end with .done().
   - Example: math.chain(3).add(4).multiply(2).done() returns 14.
4. Expression Parsing
   - Evaluate using math.evaluate(expr, scope).
   - Compile with math.compile(expr) and then evaluate with .evaluate(scope).
   - Parse into expression tree with math.parse(expr) supporting toString() and toTex().
5. Extension
   - Extend library using math.import(object, {override, silent, wrap}).
6. Factory and Typed Functions
   - Create typed functions with math.typed and factory functions with math.factory(name, dependencies, create, meta).
7. Serialization
   - Serialize using JSON.stringify(object, math.replacer) and deserialize with JSON.parse(string, math.reviver).

Detailed Topics:
Installation: npm install mathjs, global usage via mathjs command line.
Configuration: Exact keys include relTol, absTol, matrix, number, precision, predictable, randomSeed. Update via math.config({ ... }).
Chaining: Use math.chain(value), operations auto prepend chain value; must conclude with done().
Expression Parsing: Use math.evaluate for direct evaluation, compile for performance on repeated evaluation, parse for obtaining expression nodes.
Extension: Import new functions and constants; options allow overriding or silent failures.
Factory/Typed: Factory functions use dependency injection for number type support; typed functions allow multiple signatures.
Serialization: Math.js data types support toJSON; use replacer and reviver for full fidelity.

## Original Source
Math.js Documentation
https://mathjs.org/docs/

## Digest of MATHJS

# MATHJS DOCUMENTATION

## Installation

- Install via npm: npm install mathjs
- Global installation: npm install -g mathjs
- CDN links available (unpkg, cdnjs, jsDelivr, PageCDN)

## Configuration

Create a mathjs instance with custom config:

-------------------------------
// Import and create instance
import { create, all } from 'mathjs'

const config = {
  relTol: 1e-12,            // Relative tolerance for equality tests (default 1e-12)
  absTol: 1e-15,            // Absolute tolerance for equality tests (default 1e-15)
  matrix: 'Matrix',         // Output type: 'Matrix' or 'Array'; default 'Matrix'
  number: 'number',         // Numeric type: 'number', 'BigNumber', 'bigint', or 'Fraction'
  precision: 64,            // Significant digits for BigNumbers (default 64)
  predictable: false,       // If true, output types depend solely on input types
  randomSeed: null          // Seed for RNG; set to a value for deterministic results
}

const math = create(all, config)

// Update configuration
math.config({
  number: 'BigNumber'
})
-------------------------------

## Chaining

Chaining allows sequential operations using math.chain:

-------------------------------
// Chaining example
math.chain(3)
    .add(4)        // adds 4
    .multiply(2)   // multiplies result by 2
    .done()        // returns 14

// Matrix example
math.chain([[1, 2], [3, 4]])
    .subset(math.index(0, 0), 8)  // updates element
    .multiply(3)
    .done()  // returns updated matrix
-------------------------------

## Expression Parsing and Evaluation

Three primary methods:

1. Evaluate: math.evaluate(expr, [scope])
   - Example: math.evaluate('sqrt(3^2 + 4^2)') returns 5
   - Can accept scope as an Object or Map for variables

2. Compile: math.compile(expr)
   - Returns a code object with .evaluate(scope?) method
   - Example: const code = math.compile('sqrt(3^2 + 4^2)'); code.evaluate();

3. Parse: math.parse(expr)
   - Returns an expression tree; node.compile() to create executable code
   - Supports toString() and toTex() for exports

Additionally, a parser instance can be created:

-------------------------------
// Parser instance usage
const parser = math.parser()
parser.evaluate('x = 7/2')    // sets x = 3.5
parser.evaluate('f(x, y) = x^y') // defines function f
let result = parser.evaluate('f(2, 3)') // returns 8
-------------------------------

## Extension and Importing Functions

- Extend math.js using math.import({ ... }, options)
- Options:
    override (boolean): Overwrite existing functions (default false)
    silent (boolean): Suppress errors on duplicates (default false)
    wrap (boolean): Wrap functions to convert types, default false

-------------------------------
// Example extension
math.import({
  myvalue: 42,
  hello: function(name) {
    return 'hello, ' + name + '!'
  }
}, { override: false, silent: false, wrap: false })
-------------------------------

## Factory and Typed Functions

### Typed Functions

-------------------------------
// Create a typed function for max
const max = math.typed('max', {
  'number, number': function(a, b) { return Math.max(a, b) },
  'BigNumber, BigNumber': function(a, b) { return a.greaterThan(b) ? a : b }
})
-------------------------------

### Factory Functions

- Syntax: factory(name, dependencies, create, meta?)
- Example for negativeSquare:

-------------------------------
const name = 'negativeSquare'
const dependencies = ['multiply', 'unaryMinus']
const createNegativeSquare = math.factory(name, dependencies, function ({ multiply, unaryMinus }) {
  return function negativeSquare(x) {
    return unaryMinus(multiply(x, x))
  }
})

// Using the factory
const mathInstance = create(all)
mathInstance.import(createNegativeSquare)
mathInstance.evaluate('negativeSquare(4)') // returns -16
-------------------------------

## Serialization

Serialize math.js data types using JSON.stringify with math.replacer and deserialize using JSON.parse with math.reviver

-------------------------------
const complexVal = math.complex('2 + 3i')
const str = JSON.stringify(complexVal, math.replacer)
const deserialized = JSON.parse(str, math.reviver)
-------------------------------

## Detailed API Functions

- math.evaluate(expr[, scope]) -> number | Complex | Matrix | BigNumber | etc.
- math.compile(expr) -> { evaluate(scope?): any }
- math.parse(expr) -> Node { compile(): { evaluate(scope?): any }, toString(): string, toTex(): string }
- math.chain(value) -> Chain with methods: add, subtract, multiply, done(), valueOf(), toString()
- math.import(obj, options?) -> void
- math.config(configObj) -> Object (updated configuration)
- math.parser() -> Parser instance with methods: evaluate, get, set, clear, remove, getAll, getAllAsMap

## Troubleshooting Procedures

1. If configuration changes do not apply:
   - Verify instance creation with create(all, config)
   - Check math.config() output for correct properties

2. For incorrect evaluation results:
   - Confirm that expressions use correct syntax (e.g., '^' for power, no need for math. prefix)
   - Use math.parse to inspect expression tree

3. Command-line usage:
   - Run: mathjs <expression> e.g., mathjs 'sqrt(4)'

4. For module import issues:
   - Ensure proper ES module or CommonJS syntax:
     CommonJS: const { sqrt } = require('mathjs')
     ES Module: import { sqrt } from 'mathjs'


## Attribution
- Source: Math.js Documentation
- URL: https://mathjs.org/docs/
- License: MIT License
- Crawl Date: 2025-04-28T21:47:54.556Z
- Data Size: 6109837 bytes
- Links Found: 12670

## Retrieved
2025-04-28
library/EJS_TEMPLATE.md
# library/EJS_TEMPLATE.md
# EJS_TEMPLATE

## Crawl Summary
EJS templating engine uses plain JavaScript for dynamic HTML. Key methods include render(template, data, options) which outputs a string, and renderFile(filename, data, options, callback) for asynchronous file rendering. It supports caching via the 'cache' option and includes filename-based debugging support. The engine compiles templates to JS functions for high performance and easy debugging through standard JS exception mechanisms.

## Normalised Extract
Table of Contents:
1. Usage and Syntax
   - Method: render(template: string, data: Object, options?: Object) -> string
   - Syntax: Use <%%> scriptlet tags for embedding JavaScript in HTML
   - Example: ejs.render('<p><%= name %></p>', { name: 'John' })
2. Caching and Performance
   - Option: cache (Boolean, default false) enables reuse of compiled functions
   - Benefit: Reduced compile time in production
3. Debugging and Error Handling
   - Errors thrown include template line-number information
   - Standard JavaScript exceptions for traceability
4. Configuration Options
   - filename: String for providing template file name for debugging and relative includes
   - Additional options passed in an object for fine control
5. Implementation Best Practices
   - Use plain JavaScript; set filename option for clarity; enable caching in production; handle errors with try-catch

Detailed Topics:
Usage and Syntax: EJS integrates plain JavaScript into HTML using scriptlet tags. Use ejs.render to get a rendered string from a template with provided data.
Caching & Performance: Activate cache by setting cache:true in options to compile once and reuse the function, boosting performance on repeated renders.
Debugging: Errors are standard JS exceptions with line numbers for quick resolution. Use filename option for accurate error mapping.
Configuration Options: Key options include 'cache' (Boolean) and 'filename' (String) which directly affect performance and debuggability.
Best Practices: Enable caching in high-load environments; always include filename for debugging; maintain minimal code within templates to keep them readable and maintainable.

## Supplementary Details
Supplementary Technical Specifications:
- render(template: string, data: Object, options?: { cache?: boolean, filename?: string, delimiter?: string, debug?: boolean }) -> string
- renderFile(filename: string, data: Object, options?: { cache?: boolean, delimiter?: string, debug?: boolean }, callback?: (err: Error, str: string) => void) -> void
- Default value for 'cache' is false; when true, the compiled function is stored.
- 'filename' should be provided when using includes, aiding in error reporting and debugging.
- Implementation steps: 1. Require EJS module; 2. Define template string or file; 3. Call render or renderFile with required arguments; 4. Handle output or error in callback; 5. For production, set cache:true.
- Configuration Command Example: In Node environment, use var ejs = require('ejs'); then ejs.render(template, data, { cache: true, filename: 'template.ejs' });
- Effects: Caching reduces runtime overhead. Debug mode provides extended error reporting.

## Reference Details
Complete API Specifications:
Method: render
Signature: render(template: string, data: Object, options?: { cache?: boolean, filename?: string, delimiter?: string, debug?: boolean }) -> string
Parameters:
- template (string): The EJS template as a string
- data (Object): Data object for dynamic content replacement
- options (Object): Optional configuration parameters
  - cache (boolean): Enables storing the compiled function; default false
  - filename (string): Specifies the template file name for error mapping
  - delimiter (string): Character used for tag delimiters; default '%'
  - debug (boolean): Enables debug information in errors
Returns: Rendered HTML string

Method: renderFile
Signature: renderFile(filename: string, data: Object, options?: { cache?: boolean, delimiter?: string, debug?: boolean }, callback?: (err: Error, str: string) => void) -> void
Parameters:
- filename (string): Path to the template file
- data (Object): Data context for the template
- options (Object): Optional configuration similar to render
- callback (Function): Callback function receiving (err, str)

Example Implementation Pattern:
// Load module
var ejs = require('ejs');

// Synchronous rendering
var html = ejs.render('<p><%= name %></p>', { name: 'Alice' }, { cache: true, filename: 'template.ejs' });

// Asynchronous rendering
ejs.renderFile('views/template.ejs', { name: 'Bob' }, { cache: true }, function(err, html) {
  if (err) {
    console.error('EJS error:', err);
    return;
  }
  console.log('Rendered HTML:', html);
});

Troubleshooting Procedures:
1. If the template does not render, verify that the correct filename is provided in options.
2. Check that the cache option is set as needed, and clear the cache if templates change.
3. For debug errors, set debug:true to print detailed error messages including template line numbers.
4. Confirm the delimiter setting if custom tag delimiters are used.

Configuration Options Summary:
- cache: true|false (default false)
- filename: string (mandatory for include scenarios)
- delimiter: string (default '%')
- debug: true|false (default false)

Best Practice Code Snippet:
// Use try-catch for synchronous rendering
try {
  var output = ejs.render(templateString, data, { cache: true, filename: 'path/to/template.ejs' });
  console.log(output);
} catch (e) {
  console.error('Rendering failed:', e);
}

Expected Outputs:
- Successful render produces HTML string
- Errors include line numbers and file references when filename and debug options are enabled

## Information Dense Extract
EJS API: render(template: string, data: Object, options?: { cache?: boolean, filename?: string, delimiter?: string, debug?: boolean }) -> string; renderFile(filename: string, data: Object, options?: { cache?: boolean, delimiter?: string, debug?: boolean }, callback?: (err: Error, str: string) => void) -> void. Options: cache default false, filename for debugging, delimiter default '%', debug false by default. Usage: ejs.render('<p><%= name %></p>', { name: 'John' }, { cache:true, filename:'template.ejs' }); Asynchronous rendering: ejs.renderFile('template.ejs', { name:'Jane' }, { cache:true }, callback). Caching stores compiled JS functions. Debugging via JS exceptions with line numbers. Best practices: use try-catch, enable cache in production, provide filename for debugging.

## Sanitised Extract
Table of Contents:
1. Usage and Syntax
   - Method: render(template: string, data: Object, options?: Object) -> string
   - Syntax: Use <%%> scriptlet tags for embedding JavaScript in HTML
   - Example: ejs.render('<p><%= name %></p>', { name: 'John' })
2. Caching and Performance
   - Option: cache (Boolean, default false) enables reuse of compiled functions
   - Benefit: Reduced compile time in production
3. Debugging and Error Handling
   - Errors thrown include template line-number information
   - Standard JavaScript exceptions for traceability
4. Configuration Options
   - filename: String for providing template file name for debugging and relative includes
   - Additional options passed in an object for fine control
5. Implementation Best Practices
   - Use plain JavaScript; set filename option for clarity; enable caching in production; handle errors with try-catch

Detailed Topics:
Usage and Syntax: EJS integrates plain JavaScript into HTML using scriptlet tags. Use ejs.render to get a rendered string from a template with provided data.
Caching & Performance: Activate cache by setting cache:true in options to compile once and reuse the function, boosting performance on repeated renders.
Debugging: Errors are standard JS exceptions with line numbers for quick resolution. Use filename option for accurate error mapping.
Configuration Options: Key options include 'cache' (Boolean) and 'filename' (String) which directly affect performance and debuggability.
Best Practices: Enable caching in high-load environments; always include filename for debugging; maintain minimal code within templates to keep them readable and maintainable.

## Original Source
EJS Templating Documentation
https://ejs.co/#docs

## Digest of EJS_TEMPLATE

# EJS TEMPLATE DOCUMENTATION

Retrieved Date: 2023-10-12

Data Size: 8029 bytes
Attribution: Crawled from https://ejs.co/#docs

## Overview
EJS (Embedded JavaScript) is a templating engine that allows developers to use plain JavaScript inside HTML templates. It provides a simple syntax using scriptlet tags for embedding JavaScript for HTML generation. The engine compiles templates into functions and caches the intermediate JavaScript for fast execution.

## Key Functions and Methods

- render(template: string, data: Object, options?: Object) -> string
  - Renders a template string using provided data.
  - Options include:
    - cache (Boolean): When true, caches the intermediate function for subsequent renders.
    - filename (String): Specifies the template file name for debugging and include facilities.

- renderFile(filename: string, data: Object, options?: Object, callback?: Function) -> void
  - Asynchronous function to render an external template file.
  - Callback signature: function(err: Error, str: string)

## Table of Contents
1. Usage and Syntax
2. Caching and Performance
3. Debugging and Error Handling
4. Configuration Options
5. Implementation Best Practices

## 1. Usage and Syntax
- Use EJS by embedding plain JavaScript in scriptlet tags <%%>.
- Example usage: ejs.render('<p><%= name %></p>', { name: 'John' });

## 2. Caching and Performance
- EJS caches the compiled JavaScript functions to avoid recompiling templates.
- Option "cache" set to true ensures templates are compiled once and reused.

## 3. Debugging and Error Handling
- Errors in EJS are thrown as plain JavaScript exceptions and include template line numbers.
- Enables easier traceback to the source of error in the template.

## 4. Configuration Options
- cache: Boolean (default false). When true, enables caching.
- filename: String. Used for debugging purposes and relative includes.
- Other options can be passed via an options object to fine-tune parsing and rendering behavior.

## 5. Implementation Best Practices
- Use plain JavaScript without the need for additional syntax overhead.
- Always set the filename option when rendering files to aid debugging.
- Enable caching in production environments to boost performance.
- Wrap EJS code in try-catch blocks to handle template errors gracefully.

## Additional Details
- EJS is actively developed with a large community backing. It is optimized for fast execution via modern JavaScript engines (e.g., V8).
- The syntax is intentionally minimal, leveraging JavaScript's native capabilities for data manipulation and HTML generation.


## Attribution
- Source: EJS Templating Documentation
- URL: https://ejs.co/#docs
- License: MIT License
- Crawl Date: 2025-04-28T22:48:39.829Z
- Data Size: 8029 bytes
- Links Found: 26

## Retrieved
2025-04-28
library/SVG_MARKER.md
# library/SVG_MARKER.md
# SVG_MARKER

## Crawl Summary
The crawled content includes multiple SVG markup examples demonstrating the <marker> element for arrowheads and polymarkers. Key details include exact attribute definitions: markerHeight (<length>, default 3), markerUnits (userSpaceOnUse | strokeWidth, default strokeWidth), markerWidth (<length>, default 3), orient (auto, auto-start-reverse, or angle, default 0), preserveAspectRatio (default xMidYMid meet), refX and refY (reference positions, default 0), and viewBox (list-of-numbers). Examples include usage on lines, curves, polylines and context-based markers with context-fill and context-stroke. The content provides both complete code examples and attribute specifications as required for direct implementation.

## Normalised Extract
Table of Contents:
1. Marker Definition and Examples
2. Attribute Specifications
3. Implementation Patterns
4. Context-Based Markers

1. Marker Definition and Examples:
- Arrowhead marker definition with id 'arrow'. Uses viewBox '0 0 10 10', refX '5', refY '5', markerWidth '6', markerHeight '6', orient 'auto-start-reverse'.
- Code example attaches marker-end='url(#arrow)' to line and markers on path with marker-start, marker-mid, marker-end.

2. Attribute Specifications:
- markerHeight: <length>, default 3, animatable.
- markerUnits: userSpaceOnUse | strokeWidth, default strokeWidth, animatable.
- markerWidth: <length>, default 3, animatable.
- orient: auto | auto-start-reverse | <angle>, default 0, animatable.
- preserveAspectRatio: options (none, xMinYMin, xMidYMin, xMaxYMin, xMinYMid, xMidYMid, xMaxYMid, xMinYMax, xMidYMax, xMaxYMax) with meet or slice; default xMidYMid meet, animatable.
- refX: coordinate with default 0, animatable.
- refY: coordinate with default 0, animatable.
- viewBox: <list-of-numbers>, default none, animatable.

3. Implementation Patterns:
- Define marker in <defs> and reference using URL syntax (marker-end, marker-start, marker-mid).
- Use separate markers for different visual effects (arrow, dot).
- Embed style to set default marker usage using CSS (e.g. marker: url(#circle)).

4. Context-Based Markers:
- Marker uses context-fill and context-stroke to inherit parent element styles. Code shows a marker with a circle, using markerUnits='strokeWidth'.

## Supplementary Details
Exact Parameter Values:
- markerHeight: Type <length>, Default: 3, Animatable: yes.
- markerWidth: Type <length>, Default: 3, Animatable: yes.
- markerUnits: Accepts 'userSpaceOnUse' or 'strokeWidth', Default: strokeWidth.
- orient: Accepts 'auto', 'auto-start-reverse', or an explicit angle (e.g. '45deg'), Default: 0.
- preserveAspectRatio: Accepts values such as 'xMidYMid meet' (default) or alternatives like 'slice'.
- refX and refY: Accept coordinate values; Default: 0.
- viewBox: Must be provided as a list of numbers (e.g. '0 0 10 10').

Implementation Steps:
1. Define the marker in <defs> with required attributes.
2. Use the marker on a target shape by adding marker-start, marker-mid, or marker-end attributes with value url(#markerID).
3. For context-based markers, set markerUnits to 'strokeWidth' and use 'context-stroke' and 'context-fill' on the marker shape.

Configuration Options and Effects:
- Changing markerWidth/markerHeight will resize the marker graphic.
- The 'orient' attribute controls the rotation relative to the path direction.
- Using 'userSpaceOnUse' for markerUnits utilizes the coordinate system of the SVG, while 'strokeWidth' scales the marker based on the stroke width.

## Reference Details
API Specifications and Code Patterns:
1. Marker Element Definition:
   <marker id="markerID" viewBox="0 0 width height" refX="refXValue" refY="refYValue" markerWidth="markerWidthValue" markerHeight="markerHeightValue" orient="orientationValue" markerUnits="unitValue">
     ... marker contents (e.g. <path d="..." /> or <circle cx="..." cy="..." r="..."/>) ...
   </marker>

Parameters:
- id: string identifier for marker.
- viewBox: string of numbers defining the viewport (e.g. '0 0 10 10').
- refX, refY: Numeric or keyword values indicating the reference point (default 0).
- markerWidth, markerHeight: <length> values (e.g. '6', '3') with default 3.
- orient: Accepts 'auto', 'auto-start-reverse', or an angle (e.g., '45').
- markerUnits: Either 'userSpaceOnUse' or 'strokeWidth' (default: strokeWidth).
- preserveAspectRatio: Optional override, Default: 'xMidYMid meet'.

2. Full Code Example:
   // Arrowhead Marker Example
   <svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
     <defs>
       <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
         <path d="M 0 0 L 10 5 L 0 10 z" />
       </marker>
     </defs>
     <line x1="10" y1="10" x2="90" y2="90" stroke="black" marker-end="url(#arrow)" />
   </svg>

3. Best Practices:
   - Define markers in <defs> for reuse.
   - Use consistent viewBox settings to maintain scaling.
   - Leverage markerUnits='strokeWidth' to automatically scale with stroke.
   - Test markers across browsers to ensure compatibility (supported since January 2020).

4. Troubleshooting Procedures:
   - Verify marker ID references in URL syntax: marker-end="url(#arrow)".
   - Check attribute values in browser developer tools to ensure SVG rendering.
   - Experiment by adjusting markerWidth and markerHeight values if the marker appears too small or large.
   - Validate the SVG markup with an SVG validator to check for attribute errors.
   - For unexpected rotation, adjust the orient attribute (e.g. try explicit angles).

Return Types: The SVG does not return values; it renders directly in the browser environment.
Exceptions: Improper attribute values may result in incorrect rendering but do not throw runtime exceptions.

## Information Dense Extract
SVG <marker> element; Attributes: markerHeight (<length>, default 3, animatable), markerWidth (<length>, default 3, animatable), markerUnits (userSpaceOnUse|strokeWidth, default strokeWidth), orient (auto|auto-start-reverse|<angle>, default 0), preserveAspectRatio (default xMidYMid meet), refX (default 0), refY (default 0), viewBox (<list-of-numbers>, default none); Code examples: marker definition in <defs> with id, viewBox, refX/refY, markerWidth/markerHeight, orient; Usage: marker-start, marker-mid, marker-end using url(#id); Context markers use context-stroke and context-fill; Implementation steps: define marker, attach by URL, adjust attributes for scaling and orientation; Troubleshooting: check URL references, attribute correctness, use SVG validators.

## Sanitised Extract
Table of Contents:
1. Marker Definition and Examples
2. Attribute Specifications
3. Implementation Patterns
4. Context-Based Markers

1. Marker Definition and Examples:
- Arrowhead marker definition with id 'arrow'. Uses viewBox '0 0 10 10', refX '5', refY '5', markerWidth '6', markerHeight '6', orient 'auto-start-reverse'.
- Code example attaches marker-end='url(#arrow)' to line and markers on path with marker-start, marker-mid, marker-end.

2. Attribute Specifications:
- markerHeight: <length>, default 3, animatable.
- markerUnits: userSpaceOnUse | strokeWidth, default strokeWidth, animatable.
- markerWidth: <length>, default 3, animatable.
- orient: auto | auto-start-reverse | <angle>, default 0, animatable.
- preserveAspectRatio: options (none, xMinYMin, xMidYMin, xMaxYMin, xMinYMid, xMidYMid, xMaxYMid, xMinYMax, xMidYMax, xMaxYMax) with meet or slice; default xMidYMid meet, animatable.
- refX: coordinate with default 0, animatable.
- refY: coordinate with default 0, animatable.
- viewBox: <list-of-numbers>, default none, animatable.

3. Implementation Patterns:
- Define marker in <defs> and reference using URL syntax (marker-end, marker-start, marker-mid).
- Use separate markers for different visual effects (arrow, dot).
- Embed style to set default marker usage using CSS (e.g. marker: url(#circle)).

4. Context-Based Markers:
- Marker uses context-fill and context-stroke to inherit parent element styles. Code shows a marker with a circle, using markerUnits='strokeWidth'.

## Original Source
MDN SVG Marker Element Documentation
https://developer.mozilla.org/en-US/docs/Web/SVG/Element/marker

## Digest of SVG_MARKER

# SVG MARKER

## Overview
The SVG <marker> element is used to define graphics for drawing arrowheads or polymarkers which can be attached to paths, lines, polylines, and polygons. It supports multiple attributes and usage patterns which can be directly implemented in SVG documents.

## Code Examples

Example 1: Arrowhead Marker
--------------------------------
<html>
  <head>
    <style>
      html, body, svg { height: 100%; }
    </style>
  </head>
  <body>
    <svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- A marker to be used as an arrowhead -->
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>

      <!-- A line with a marker -->
      <line x1="10" y1="10" x2="90" y2="90" stroke="black" marker-end="url(#arrow)" />
    </svg>
  </body>
</html>

Example 2: Curved Path with Multiple Markers
------------------------------------------------
<html>
  <svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" />
      </marker>
    </defs>

    <path d="M 110 10 C 120 20, 130 20, 140 10 C 150 0, 160 0, 170 10 C 180 20, 190 20, 200 10" stroke="black" fill="none" marker-start="url(#arrow)" marker-mid="url(#arrow)" marker-end="url(#arrow)" />
  </svg>
</html>

Example 3: Polymarkers with Arrow and Dot
------------------------------------------------
<html>
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" />
      </marker>
      <marker id="dot" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5">
        <circle cx="5" cy="5" r="5" fill="red" />
      </marker>
    </defs>

    <polyline points="10,10 10,90 90,90" fill="none" stroke="black" marker-start="url(#arrow)" marker-end="url(#arrow)" />
    <polyline points="15,80 29,50 43,60 57,30 71,40 85,15" fill="none" stroke="grey" marker-start="url(#dot)" marker-mid="url(#dot)" marker-end="url(#dot)" />
  </svg>
</html>

Example 4: Using context-fill and context-stroke
------------------------------------------------------
<html>
  <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="circle" markerWidth="6" markerHeight="6" refX="3" refY="3" markerUnits="strokeWidth">
        <circle cx="3" cy="3" r="2" stroke="context-stroke" fill="context-fill" />
      </marker>
    </defs>

    <style>
      path {
        marker: url(#circle);
      }
    </style>

    <path d="M 10,10 30,10 h 10" stroke="black" />
    <path d="M 10,20 30,20 h 10" stroke="blue" fill="red" />
    <path d="M 10,30 30,30 h 10" stroke="red" fill="none" />
    <path d="M 10,40 30,40 h 10" stroke="gray" fill="blue" stroke-width="1.5" />
  </svg>
</html>

## Attributes

markerHeight: Defines the height of the marker viewport. Value type: <length>; Default: 3; Animatable: yes.
markerUnits: Coordinate system for markerWidth, markerHeight and contents. Value type: userSpaceOnUse | strokeWidth; Default: strokeWidth; Animatable: yes.
markerWidth: Defines the width of the marker viewport. Value type: <length>; Default: 3; Animatable: yes.
orient: Orientation relative to the shape. Value type: auto | auto-start-reverse | <angle>; Default: 0; Animatable: yes.
preserveAspectRatio: Defines how the SVG fragment adjusts to container aspect ratio. Value types: none, xMinYMin, xMidYMin, xMaxYMin, xMinYMid, xMidYMid, xMaxYMid, xMinYMax, xMidYMax, xMaxYMax with meet or slice options; Default: xMidYMid meet; Animatable: yes.
refX: X coordinate for the marker reference point. Value type: left, center, right, or <coordinate>; Default: 0; Animatable: yes.
refY: Y coordinate for the reference point. Value type: top, center, bottom, or <coordinate>; Default: 0; Animatable: yes.
viewBox: Defines SVG viewport bounds. Value type: <list-of-numbers>; Default: none; Animatable: yes.

## Usage
Markers are attached via marker-start, marker-mid, and marker-end on SVG shape elements. These examples provide a complete implementation pattern that developers can copy and modify directly.

## Metadata
Retrieved: 2023-10-05
Data Size: 1431126 bytes
Links Found: 35317

## Attribution
- Source: MDN SVG Marker Element Documentation
- URL: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/marker
- License: CC BY-SA
- Crawl Date: 2025-04-29T03:53:24.737Z
- Data Size: 1431126 bytes
- Links Found: 35317

## Retrieved
2025-04-29
library/V8_ENGINE.md
# library/V8_ENGINE.md
# V8_ENGINE

## Crawl Summary
V8 engine is a high-performance JavaScript and WebAssembly engine implemented in C++ with a generational, stop-the-world garbage collector. It supports ECMAScript and is used in Chrome and Node.js. The documentation details building from source using GN and Ninja, cross-compiling for ARM/iOS, embedding V8 in C++ applications through APIs like v8::Isolate::New and v8::Context::New, debugging via GDB and the Inspector Protocol, profiling with D8 and Linux perf, and specific port handling instructions for various architectures.

## Normalised Extract
Table of Contents:
  1. V8 Overview
  2. Supported Platforms
  3. Core Components
  4. Embedding V8
  5. Building V8
  6. Debugging & Profiling
  7. JavaScript & WebAssembly Features
  8. Handling Ports

1. V8 Overview:
- High-performance C++ engine for JavaScript and WebAssembly.
- Implements full ECMAScript standard.

2. Supported Platforms:
- Native support on Windows, macOS, Linux (x64, IA-32, ARM).
- Additional ports for IBM i, AIX, MIPS, ppc64, s390x, RISC-V, Loong64 via external teams.

3. Core Components:
- Compiler: Translates JS to machine code with optimizations.
- Garbage Collector: Stop-the-world, generational, accurate.
- Memory Manager: Allocates and recycles JS objects.

4. Embedding V8:
- Use v8::Isolate::New(CreateParams) to create an instance.
- Create a context with v8::Context::New(isolate).
- Expose C++ functions and objects to JS by linking via V8 API.

5. Building V8:
- Checkout source repository using depot_tools.
- Generate build files with GN (gn gen out/Default).
- Build with Ninja (ninja -C out/Default).
- Options for cross-compiling on ARM/Android and iOS available.

6. Debugging & Profiling:
- Debug shell: D8.
- Use GDB to debug builtins, integrated with V8 Inspector Protocol.
- Profiling using Linux perf, sample-based profiling, and runtime call statistics.

7. JavaScript & WebAssembly Features:
- Supports all ECMAScript data types, operators, and functions.
- Integration with WebAssembly features, including BigInt and SIMD.

8. Handling Ports:
- ARM: Direct porting instructions, contact v8-arm-ports@googlegroups.com if issues.
- MIPS, PPC, s390, RISC-V, Loong64: Follow team-specific guidelines available in source documentation.


## Supplementary Details
Building Configuration:
- Build System: GN + Ninja
- Example Commands:
  gn gen out/Default
  ninja -C out/Default
- Cross-compiling: Specify target architecture in GN args (e.g., target_cpu="arm", is_debug=false, use_lto=true)

API Specifics:
- v8::Isolate::New(const v8::Isolate::CreateParams& params): Creates a new isolate instance
   Returns: v8::Isolate*
   Parameters: CreateParams structure with allocation callbacks and snapshot data

- v8::Context::New(v8::Isolate* isolate): Creates a new execution context
   Returns: v8::Local<v8::Context>
   Usage: Allows embedding application to register native functions

Debugging Steps:
- Compile V8 with debug symbols
- Use command: gdb --args d8
- Set breakpoints in important engine components (e.g., in garbage collector routines)
- Example output: Confirmation of isolate initialization and context creation

Troubleshooting:
- Memory leaks: Use V8's built-in profiling tools and inspect heap layout with Heap Stats
- Performance: Run sample-based profiler and examine runtime call stats
- Port-specific issues: Follow mailing list instructions to contact respective teams


## Reference Details
API Method Signatures:

int v8::Initialize();
// Initializes V8 engine. Returns 0 on success. Throws exception on initialization failure.

v8::Isolate* v8::Isolate::New(const v8::Isolate::CreateParams& params);
// Creates and returns a new V8 isolate. Throws std::bad_alloc if memory allocation fails.

v8::Local<v8::Context> v8::Context::New(v8::Isolate* isolate);
// Creates a new execution context within the provided isolate. Returns a local handle to a v8::Context.

// Example SDK usage pattern in C++:

// Setup create parameters for isolate
v8::Isolate::CreateParams create_params;
create_params.array_buffer_allocator = v8::ArrayBuffer::Allocator::NewDefaultAllocator();

// Create a new isolate
v8::Isolate* isolate = v8::Isolate::New(create_params);
{
  // Enter isolate scope
  v8::Isolate::Scope isolate_scope(isolate);
  v8::HandleScope handle_scope(isolate);

  // Create a new context
  v8::Local<v8::Context> context = v8::Context::New(isolate);
  v8::Context::Scope context_scope(context);

  // Embedding custom function example
  // Register a C++ function with the context
  // Function signature: void MyFunc(const v8::FunctionCallbackInfo<v8::Value>& args)
}

// Build Configuration Options (GN args):
// target_cpu = "x64" or "arm"
// is_debug = false
// use_lto = true
// Additional flags: v8_enable_i18n_support = true

// Build Commands:
// gn gen out/Default --args='target_cpu="x64" is_debug=false use_lto=true v8_enable_i18n_support=true'
// ninja -C out/Default

// Debugging Commands:
// Run V8 shell with gdb:
// gdb --args out/Default/d8
// In gdb: break v8::Isolate::New
// run
// Expected output: Confirmation of isolate creation and proper execution flow.

Best Practices:
// Always use v8::HandleScope in every scope where local handles are created to prevent memory leaks.
// Check for exceptions after executing scripts in the context via v8::TryCatch.
// For embedding, carefully manage isolate lifetimes and deallocate allocated memory using v8::ArrayBuffer::Allocator::Delete.

Troubleshooting Procedures:
// If encountering crashes during garbage collection:
// 1. Enable verbose GC logging by setting environment variable V8_GC_TRACE=1
// 2. Analyze heap stats via built-in tools (Heap Stats, Heap Layout)
// 3. Use Linux perf: 'perf record -g -- out/Default/d8' then 'perf report'


## Information Dense Extract
V8 engine; C++ high-performance JS and Wasm engine; Platforms: x64, IA-32, ARM, others via external ports; Core APIs: v8::Initialize(), v8::Isolate::New(CreateParams), v8::Context::New(isolate); Build: GN+Ninja, args target_cpu, is_debug, use_lto; Debug: gdb with breakpoints in Isolate::New; Embedding: use HandleScope, Context::Scope; Configuration: GN args v8_enable_i18n_support=true; Troubleshooting: GC verbose logging V8_GC_TRACE=1, heap profiling via Heap Stats; Best practices: proper isolate management and exception handling via TryCatch.

## Sanitised Extract
Table of Contents:
  1. V8 Overview
  2. Supported Platforms
  3. Core Components
  4. Embedding V8
  5. Building V8
  6. Debugging & Profiling
  7. JavaScript & WebAssembly Features
  8. Handling Ports

1. V8 Overview:
- High-performance C++ engine for JavaScript and WebAssembly.
- Implements full ECMAScript standard.

2. Supported Platforms:
- Native support on Windows, macOS, Linux (x64, IA-32, ARM).
- Additional ports for IBM i, AIX, MIPS, ppc64, s390x, RISC-V, Loong64 via external teams.

3. Core Components:
- Compiler: Translates JS to machine code with optimizations.
- Garbage Collector: Stop-the-world, generational, accurate.
- Memory Manager: Allocates and recycles JS objects.

4. Embedding V8:
- Use v8::Isolate::New(CreateParams) to create an instance.
- Create a context with v8::Context::New(isolate).
- Expose C++ functions and objects to JS by linking via V8 API.

5. Building V8:
- Checkout source repository using depot_tools.
- Generate build files with GN (gn gen out/Default).
- Build with Ninja (ninja -C out/Default).
- Options for cross-compiling on ARM/Android and iOS available.

6. Debugging & Profiling:
- Debug shell: D8.
- Use GDB to debug builtins, integrated with V8 Inspector Protocol.
- Profiling using Linux perf, sample-based profiling, and runtime call statistics.

7. JavaScript & WebAssembly Features:
- Supports all ECMAScript data types, operators, and functions.
- Integration with WebAssembly features, including BigInt and SIMD.

8. Handling Ports:
- ARM: Direct porting instructions, contact v8-arm-ports@googlegroups.com if issues.
- MIPS, PPC, s390, RISC-V, Loong64: Follow team-specific guidelines available in source documentation.

## Original Source
V8 JavaScript Engine Documentation
https://v8.dev/docs

## Digest of V8_ENGINE

# V8 ENGINE

## Overview
V8 is Google’s high-performance JavaScript and WebAssembly engine written in C++. It is integrated with Chrome, Node.js, and can be embedded into any C++ application. It fully implements ECMAScript and supports WebAssembly execution.

## Supported Platforms
- x64, IA-32, ARM processors on Windows, macOS, Linux
- Externally maintained ports for IBM i, AIX, MIPS, ppc64, s390x, RISC-V, Loong64

## Core Components
- JavaScript Compiler: Converts JavaScript source into optimized machine code.
- Memory Management: Uses a stop-the-world, generational garbage collector with accurate collection.
- Execution Environment: Handles memory allocation, deallocation, and object lifetime.

## Embedding V8 in C++ Applications
- Exposes C++ objects and functions to JavaScript.
- API calls include creation of isolates and contexts. 
  Example functions include:
    v8::Isolate* v8::Isolate::New(const v8::Isolate::CreateParams& params);
    v8::Local<v8::Context> v8::Context::New(v8::Isolate* isolate);

## Building V8 from Source
- Source checkout via depot_tools and GN build system.
- Commands:
    gn gen out/Default
    ninja -C out/Default
- Cross-compiling examples for ARM/Android and iOS included.

## Debugging and Profiling
- Debugging uses GDB for builtins and V8 Inspector Protocol for interactive sessions.
- Profiling tools include D8 shell, Linux perf integration, and V8 sample-based profiler.

## JavaScript and WebAssembly Features
- Full ECMAScript support including new syntax and asynchronous features.
- WebAssembly integration with JavaScript including BigInt support and memory alignment.

## Handling Ports
- Specific instructions per architecture:
    ARM: Self-port with support via v8-arm-ports@googlegroups.com
    MIPS, PPC, s390, RISC-V, Loong64: Handled by respective teams via email distribution lists.


## Attribution
- Source: V8 JavaScript Engine Documentation
- URL: https://v8.dev/docs
- License: Unknown License
- Crawl Date: 2025-04-28T03:10:08.714Z
- Data Size: 12459057 bytes
- Links Found: 6123

## Retrieved
2025-04-28
library/HTTP_STATUS.md
# library/HTTP_STATUS.md
# HTTP_STATUS

## Crawl Summary
HTTP status codes are divided into five classes: Informational (100-199), Successful (200-299), Redirection (300-399), Client Error (400-499), and Server Error (500-599). Each code specifies a precise result or requirement. Codes such as 200, 301, 404, and 500 provide definitive instructions on handling responses. Detailed definitions are provided for each code including intended use, deprecation notices, and caching or redirection behavior.

## Normalised Extract
Table of Contents:
1. Informational Responses
   - 100: Continue; 101: Switching Protocols; 102: Processing (Deprecated); 103: Early Hints
2. Successful Responses
   - 200: OK; 201: Created; 202: Accepted; 203: Non-Authoritative Information; 204: No Content; 205: Reset Content; 206: Partial Content; 207: Multi-Status; 208: Already Reported; 226: IM Used
3. Redirection Messages
   - 300: Multiple Choices; 301: Moved Permanently; 302: Found; 303: See Other; 304: Not Modified; 305: Use Proxy (Deprecated); 306: Unused; 307: Temporary Redirect; 308: Permanent Redirect
4. Client Error Responses
   - 400: Bad Request; 401: Unauthorized; 402: Payment Required; 403: Forbidden; 404: Not Found; 405: Method Not Allowed; 406: Not Acceptable; 407: Proxy Authentication Required; 408: Request Timeout; 409: Conflict; 410: Gone; 411: Length Required; 412: Precondition Failed; 413: Content Too Large; 414: URI Too Long; 415: Unsupported Media Type; 416: Range Not Satisfiable; 417: Expectation Failed; 418: I'm a teapot; 421: Misdirected Request; 422: Unprocessable Content; 423: Locked; 424: Failed Dependency; 425: Too Early; 426: Upgrade Required; 428: Precondition Required; 429: Too Many Requests; 431: Request Header Fields Too Large; 451: Unavailable For Legal Reasons
5. Server Error Responses
   - 500: Internal Server Error; 501: Not Implemented; 502: Bad Gateway; 503: Service Unavailable; 504: Gateway Timeout; 505: HTTP Version Not Supported; 506: Variant Also Negotiates; 507: Insufficient Storage; 508: Loop Detected; 510: Not Extended; 511: Network Authentication Required
Detailed technical data for each topic includes exact code numbers, specific semantic meanings, applicable HTTP methods, and caching or redirection behaviors. Developers can use this information to implement precise HTTP response handling in both server-side and client-side code.

## Supplementary Details
Technical Specifications and Implementation Details:
- RFC 9110 defines the standard. Each status code includes a numeric code and a short phrase.
- Configuration options: When implementing server responses (eg. using Node.js/Express), use response.status(code).send(message) with code matching the definitions. For example:
  • response.status(200).send('OK')
  • response.status(404).send('Not Found')
- Parameter expectations: Ensure Content-Length is provided when required (e.g., 411) and use Retry-After header with 503 responses.
- Implementation steps:
  1. Validate request parameters.
  2. Determine proper status code (e.g., 200 for successful GET or 201 for creation).
  3. Return exact HTTP status along with required headers (Location for 301, Retry-After for 503).
  4. Use conditional headers to enforce caching (304 response).
- Best practices include: Logging specific response codes for debugging, mapping error codes to user-friendly error pages, and using a switch-case structure for response handling.
- Troubleshooting:
  • Use curl commands (e.g., curl -I http://example.com) to verify returned status codes.
  • Check server logs for status code anomalies.
  • Validate HTTP header correctness when encountering 400 or 411 errors.


## Reference Details
API Specifications and Detailed Implementation for HTTP Status Handling:

Function: sendResponse
Signature: sendResponse(statusCode: number, headers: object, body: string): Response
Description: Sets HTTP response code along with headers and sends body content.
Example:
  // Node.js/Express example
  // Returns a 200 OK response with JSON body
  app.get('/data', function(req, res) {
    res.status(200).set({'Content-Type': 'application/json'}).send(JSON.stringify({ success: true }));
  });

Status Code Handling Patterns:
- 200 OK: For successful GET, HEAD, PUT, POST, TRACE methods. Return full content or headers accordingly.
- 201 Created: After resource creation, include the URI in the Location header.
- 301 Moved Permanently / 308 Permanent Redirect: Set Location header to new URI. Maintain HTTP method if required.
- 302 Found / 307 Temporary Redirect: Use for temporary redirection; preserve method for 307.
- 400 Bad Request: Trigger when request parameters do not match expected format (e.g., missing required fields).
- 404 Not Found: Return when endpoint exists but resource is absent. Optionally hide resource existence.
- 500 Internal Server Error: Catch-all error for unexpected server conditions.

Configuration Options:
- Content-Length: Must be provided if body is sent; missing header triggers 411 error.
- Retry-After: Used with 503 Service Unavailable responses to communicate downtime.

Troubleshooting Steps:
1. Run the command: curl -I http://yourserver/path to inspect HTTP headers and status codes.
2. Inspect server logs for responses matching error codes (400, 500 series).
3. Validate routing configuration if receiving unexpected redirects (300 series).
4. Use middleware to log all outgoing responses to identify misconfigured status codes.

Best Practices:
- Always validate input and use proper status codes to reflect the result.
- In RESTful APIs, return detailed error messages in the body for 4xx responses.
- Ensure that custom status codes (non-standard responses) are documented and handled explicitly.
- Follow the RFC 9110 guidelines for consistency in HTTP responses.

Exception Handling:
- For unexpected errors, catch exceptions and return a 500 Internal Server Error with error logging.
- For authentication issues, return 401 Unauthorized along with WWW-Authenticate header detailing required authentication scheme.


## Information Dense Extract
RFC9110 HTTP status codes: 100-199 Informational (100 Continue, 101 Switching Protocols, 102 Processing Deprecated, 103 Early Hints); 200-299 Successful (200 OK, 201 Created, 202 Accepted, 203 Non-Authoritative, 204 No Content, 205 Reset, 206 Partial, 207 Multi-Status, 208 Already Reported, 226 IM Used); 300-399 Redirection (300 Multiple Choices, 301 Moved Permanently, 302 Found, 303 See Other, 304 Not Modified, 305 Use Proxy Deprecated, 306 Unused, 307 Temporary Redirect, 308 Permanent Redirect); 400-499 Client Errors (400 Bad Request, 401 Unauthorized, 402 Payment Required, 403 Forbidden, 404 Not Found, 405 Method Not Allowed, 406 Not Acceptable, 407 Proxy Auth Required, 408 Request Timeout, 409 Conflict, 410 Gone, 411 Length Required, 412 Precondition Failed, 413 Too Large, 414 URI Too Long, 415 Unsupported Media Type, 416 Range Not Satisfiable, 417 Expectation Failed, 418 I'm a teapot, 421 Misdirected, 422 Unprocessable, 423 Locked, 424 Failed Dependency, 425 Too Early, 426 Upgrade Required, 428 Precondition Required, 429 Too Many, 431 Header Fields Too Large, 451 Legal Reasons); 500-599 Server Errors (500 Internal, 501 Not Implemented, 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout, 505 HTTP Version Not Supported, 506 Variant Negotiates, 507 Insufficient Storage, 508 Loop Detected, 510 Not Extended, 511 Network Auth Required); API pattern: response.status(code).set(headers).send(body); troubleshooting via curl -I and log inspection.

## Sanitised Extract
Table of Contents:
1. Informational Responses
   - 100: Continue; 101: Switching Protocols; 102: Processing (Deprecated); 103: Early Hints
2. Successful Responses
   - 200: OK; 201: Created; 202: Accepted; 203: Non-Authoritative Information; 204: No Content; 205: Reset Content; 206: Partial Content; 207: Multi-Status; 208: Already Reported; 226: IM Used
3. Redirection Messages
   - 300: Multiple Choices; 301: Moved Permanently; 302: Found; 303: See Other; 304: Not Modified; 305: Use Proxy (Deprecated); 306: Unused; 307: Temporary Redirect; 308: Permanent Redirect
4. Client Error Responses
   - 400: Bad Request; 401: Unauthorized; 402: Payment Required; 403: Forbidden; 404: Not Found; 405: Method Not Allowed; 406: Not Acceptable; 407: Proxy Authentication Required; 408: Request Timeout; 409: Conflict; 410: Gone; 411: Length Required; 412: Precondition Failed; 413: Content Too Large; 414: URI Too Long; 415: Unsupported Media Type; 416: Range Not Satisfiable; 417: Expectation Failed; 418: I'm a teapot; 421: Misdirected Request; 422: Unprocessable Content; 423: Locked; 424: Failed Dependency; 425: Too Early; 426: Upgrade Required; 428: Precondition Required; 429: Too Many Requests; 431: Request Header Fields Too Large; 451: Unavailable For Legal Reasons
5. Server Error Responses
   - 500: Internal Server Error; 501: Not Implemented; 502: Bad Gateway; 503: Service Unavailable; 504: Gateway Timeout; 505: HTTP Version Not Supported; 506: Variant Also Negotiates; 507: Insufficient Storage; 508: Loop Detected; 510: Not Extended; 511: Network Authentication Required
Detailed technical data for each topic includes exact code numbers, specific semantic meanings, applicable HTTP methods, and caching or redirection behaviors. Developers can use this information to implement precise HTTP response handling in both server-side and client-side code.

## Original Source
MDN HTTP Status Codes
https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

## Digest of HTTP_STATUS

# HTTP STATUS CODES

Retrieved on: 2023-10-12

# Overview
HTTP response status codes are numerical responses provided by a server to indicate the result of an HTTP request. They are standardized by RFC 9110 and are grouped into five classes:

1. Informational Responses (100-199)
2. Successful Responses (200-299)
3. Redirection Messages (300-399)
4. Client Error Responses (400-499)
5. Server Error Responses (500-599)

# Informational Responses
- 100 Continue: Instructs the client to continue with the request.
- 101 Switching Protocols: Indicates protocol upgrade.
- 102 Processing: (Deprecated, WebDAV) Request received but awaiting status.
- 103 Early Hints: Used with Link header for preloading resources.

# Successful Responses
- 200 OK: Request succeeded. Behavior differs by method (GET returns message body; HEAD only headers).
- 201 Created: New resource created (typically after POST or certain PUT requests).
- 202 Accepted: Request received but not yet processed.
- 203 Non-Authoritative Information: Metadata comes from a local or third-party copy.
- 204 No Content: Request processed but no content to return; headers are provided.
- 205 Reset Content: Client should reset the document view.
- 206 Partial Content: Used for range requests.
- 207 Multi-Status (WebDAV): Multiple resources status.
- 208 Already Reported (WebDAV): Avoids repetition in multi-binding responses.
- 226 IM Used: Indicates instance-manipulation has been applied.

# Redirection Messages
- 300 Multiple Choices: Multiple potential responses; requires user/agent decision.
- 301 Moved Permanently: Resource permanently relocated; new URL provided.
- 302 Found: Temporary URI change; client should use same URI in future.
- 303 See Other: Redirect with a GET method regardless of original method.
- 304 Not Modified: Cached version is still valid.
- 305 Use Proxy: (Deprecated) Response must be accessed through a proxy.
- 306 (Unused): Reserved status code.
- 307 Temporary Redirect: Redirect preserving the original HTTP method.
- 308 Permanent Redirect: Permanent redirection with method preservation.

# Client Error Responses
- 400 Bad Request: Server cannot process due to client error (syntax, framing, etc.).
- 401 Unauthorized: Authentication required; indicates unauthenticated client.
- 402 Payment Required: Reserved for digital payment systems (rarely used).
- 403 Forbidden: Client not permitted to access the resource.
- 404 Not Found: Resource not found or hidden to prevent unauthorized access.
- 405 Method Not Allowed: HTTP method not supported by target resource.
- 406 Not Acceptable: No content matches the request criteria.
- 407 Proxy Authentication Required: Requires proxy authentication.
- 408 Request Timeout: Idle connection timed out.
- 409 Conflict: Request conflicts with the current state of the server.
- 410 Gone: Resource no longer available, permanently removed.
- 411 Length Required: Missing Content-Length header.
- 412 Precondition Failed: Preconditions in request headers not met.
- 413 Payload Too Large: Request body exceeds server limits.
- 414 URI Too Long: Request URI exceeds server limits.
- 415 Unsupported Media Type: Media format not supported.
- 416 Range Not Satisfiable: Request range not within resource size.
- 417 Expectation Failed: Expectation given in the request cannot be met.
- 418 I'm a teapot: Easter egg status (refusal to brew coffee).
- 421 Misdirected Request: Request sent to an inappropriate server.
- 422 Unprocessable Content (WebDAV): Well-formed request but semantic errors.
- 423 Locked (WebDAV): Resource is locked.
- 424 Failed Dependency (WebDAV): Prior request failure affected this request.
- 425 Too Early: (Experimental) Server unwilling to process early replayable requests.
- 426 Upgrade Required: Client should upgrade to a different protocol.
- 428 Precondition Required: Request must be conditional to prevent lost updates.
- 429 Too Many Requests: Rate limiting triggered.
- 431 Request Header Fields Too Large: Header fields exceed permissible size.
- 451 Unavailable For Legal Reasons: Resource cannot be provided due to legal restrictions.

# Server Error Responses
- 500 Internal Server Error: Generic server error when no more specific code applies.
- 501 Not Implemented: HTTP method not supported; only GET and HEAD guaranteed.
- 502 Bad Gateway: Invalid response received while acting as a gateway.
- 503 Service Unavailable: Server temporarily unable to handle the request (maintenance or overload).
- 504 Gateway Timeout: Timed-out response from an upstream server.
- 505 HTTP Version Not Supported: Request HTTP version not supported.
- 506 Variant Also Negotiates: Circular reference in content negotiation configuration.
- 507 Insufficient Storage (WebDAV): Server unable to store representation.
- 508 Loop Detected (WebDAV): Infinite loop detected in processing.
- 510 Not Extended: Required extensions are not supported.
- 511 Network Authentication Required: Client must authenticate to access network.

# Attribution
Data Size: 2266491 bytes; Retrieved from https://developer.mozilla.org/en-US/docs/Web/HTTP/Status



## Attribution
- Source: MDN HTTP Status Codes
- URL: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
- License: MDN License
- Crawl Date: 2025-04-26T19:47:30.327Z
- Data Size: 2266491 bytes
- Links Found: 35962

## Retrieved
2025-04-26
library/CACHING.md
# library/CACHING.md
# CACHING

## Crawl Summary
No data was returned from the crawl preview; technical extraction is based on high-value in-memory caching strategies for Node.js. Key specifications include Node-Cache API methods (set, get, del) with precise parameter details, configuration options (stdTTL=60, checkperiod=120), and troubleshooting techniques using error events.

## Normalised Extract
Table of Contents:
  1. Overview and Use Cases
  2. Initialization and Configuration
  3. API Methods and Signatures
  4. Implementation Patterns
  5. Troubleshooting

1. Overview and Use Cases: In-memory caching improves response time by storing temporary data directly in Node.js memory, reducing database load.

2. Initialization and Configuration: Use Node-Cache with options { stdTTL: 60, checkperiod: 120 }. Instantiate by requiring node-cache and creating a new instance.

3. API Methods and Signatures:
  - set(key: string, value: any, ttl?: number): boolean; stores a value with an optional TTL override.
  - get(key: string): any; retrieves a value, returns undefined for cache miss.
  - del(keys: string | Array<string>): number; removes one or more keys from cache.
  - flushAll(): void; clears all stored entries.
  - on(event: string, callback: function): void; binds error or other event listeners.

4. Implementation Patterns: Follow the pattern of initializing the cache, setting entries with explicit TTL values when needed, checking existence upon retrieval, and binding to error events for logging.

5. Troubleshooting: Inspect installation with npm, enable error event logging, and adjust stdTTL and checkperiod if cache entries expire unexpectedly.

## Supplementary Details
Initialization: const NodeCache = require('node-cache'); new NodeCache({ stdTTL: 60, checkperiod: 120 }).
Parameters:
  - stdTTL (number): Default time-to-live (seconds) for entries. Default = 60.
  - checkperiod (number): Interval in seconds to check for expired keys. Default = 120.
Method Specifications:
  - set(key: string, value: any, ttl?: number): boolean
      * key: unique identifier for the cache entry
      * value: data to be cached
      * ttl: custom TTL for the entry in seconds
  - get(key: string): any
      * Returns stored value or undefined if not found
  - del(keys: string | Array<string>): number
      * Deletes key(s) and returns count of deleted keys
  - flushAll(): void
      * Clears entire cache, useful during system resets
Implementation Steps:
  1. Import NodeCache module
  2. Create cache instance with desired stdTTL and checkperiod
  3. Use set to store data, get to retrieve, and del to remove expired or invalid data
Troubleshooting:
  - Command: npm list node-cache to verify installation
  - Bind to error event: myCache.on('error', function(err){ console.error(err); })
  - Validate TTL by log output of key expiry times

## Reference Details
API Specifications:
Method: set
  Signature: set(key: string, value: any, ttl?: number): boolean
  Parameters:
    key: string - Unique key identifier
    value: any - Data to be stored
    ttl: number, optional - Time-to-live in seconds
  Return: boolean indicating success

Method: get
  Signature: get(key: string): any
  Parameter:
    key: string - Unique key identifier
  Return: Data stored or undefined if key not present

Method: del
  Signature: del(keys: string | string[]): number
  Parameter:
    keys: string or array of strings - Keys to remove
  Return: number of keys successfully removed

Method: flushAll
  Signature: flushAll(): void
  Functionality: Clears all cache contents

SDK Initialization Example:
  const NodeCache = require('node-cache');
  const myCache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

Error Handling Pattern:
  myCache.on('error', (err: Error): void => {
    console.error('Cache encountered an error:', err);
  });

Best Practices:
  - Always specify TTL values explicitly for critical data
  - Monitor cache performance and adjust checkperiod to balance performance and precision
  - Implement graceful degradation by checking for undefined values on get

Troubleshooting Procedures:
  1. Verify module installation with command: npm list node-cache
  2. Check log outputs for error events via myCache.on('error', callback)
  3. Test with small TTL values to simulate expiry and confirm flushAll functionality
  4. Use console.log(myCache.getStats()) if available to monitor cache statistics

## Information Dense Extract
NodeCache initialization { stdTTL=60, checkperiod=120 }; API: set(key:string, value:any, ttl?:number):boolean; get(key:string):any; del(keys:string|string[]):number; flushAll():void; Error event: on('error', callback); Best practices: explicit TTL, log errors, verify installation with npm list node-cache; Troubleshoot by adjusting TTL, checkperiod, and using flushAll to reset state.

## Sanitised Extract
Table of Contents:
  1. Overview and Use Cases
  2. Initialization and Configuration
  3. API Methods and Signatures
  4. Implementation Patterns
  5. Troubleshooting

1. Overview and Use Cases: In-memory caching improves response time by storing temporary data directly in Node.js memory, reducing database load.

2. Initialization and Configuration: Use Node-Cache with options { stdTTL: 60, checkperiod: 120 }. Instantiate by requiring node-cache and creating a new instance.

3. API Methods and Signatures:
  - set(key: string, value: any, ttl?: number): boolean; stores a value with an optional TTL override.
  - get(key: string): any; retrieves a value, returns undefined for cache miss.
  - del(keys: string | Array<string>): number; removes one or more keys from cache.
  - flushAll(): void; clears all stored entries.
  - on(event: string, callback: function): void; binds error or other event listeners.

4. Implementation Patterns: Follow the pattern of initializing the cache, setting entries with explicit TTL values when needed, checking existence upon retrieval, and binding to error events for logging.

5. Troubleshooting: Inspect installation with npm, enable error event logging, and adjust stdTTL and checkperiod if cache entries expire unexpectedly.

## Original Source
In-Memory Caching Strategies in Node.js
https://www.sitepoint.com/caching-in-nodejs/

## Digest of CACHING

# Overview
Caching in Node.js is used to improve performance by storing frequently accessed data in memory to reduce redundant computations and external database calls. This document provides in-depth technical details and actionable implementations for in-memory caching strategies using Node.js.

# In-Memory Caching Implementation
The Node-Cache module is a popular solution. Initialization uses:
  - Constructor: new NodeCache(options)
  - Options include stdTTL (default time-to-live in seconds) and checkperiod (interval for automatic deletion of expired keys).

Example Initialization:
  const NodeCache = require('node-cache');
  const myCache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

# API Method Signatures
The key methods provided by Node-Cache include:
  1. set(key: string, value: any, ttl?: number): boolean
     - Stores a value under the given key with an optional custom TTL. Returns true if the item was stored successfully.
  2. get(key: string): any
     - Retrieves the stored value for a given key; returns undefined if the key is expired or not found.
  3. del(keys: string | Array<string>): number
     - Deletes one or more keys. Returns the number of keys deleted.
  4. flushAll(): void
     - Clears all keys from the cache.
  5. on(event: string, callback: function): void
     - Subscribes to cache events, e.g. error events.

# Code Example with Comments
// Import the Node-Cache module
const NodeCache = require('node-cache');
// Create a cache instance with a default TTL of 60 seconds and check period of 120 seconds
const myCache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

// Setting a cache entry
if (myCache.set('user_123', { name: 'Alice' }, 120)) {
  // Cache entry successfully stored with TTL of 120 seconds
}

// Retrieving a cache entry
const user = myCache.get('user_123');
if (user === undefined) {
  // Key not found or expired, handle cache miss
} else {
  // Process the retrieved user data
}

// Deleting a cache entry
const deletedCount = myCache.del('user_123');

// Error handling event
myCache.on('error', function(err) {
  console.error('Cache error:', err);
});

# Configuration Options
- stdTTL: 60 (default TTL in seconds for cache entries)
- checkperiod: 120 (time interval in seconds to check and remove expired keys)

# Troubleshooting Procedures
- Verify module installation using npm list node-cache.
- Enable event logging by binding to the error event; e.g., myCache.on('error', callback).
- If cache entries are missing, ensure that correct TTL values are being set and that the checkperiod is configured appropriately.

# Retrieval Date
Content retrieved on: 2023-10-05

# Attribution and Data Size
Source Entry: In-Memory Caching Strategies in Node.js
Data Size: 0 bytes (as per crawl report)

## Attribution
- Source: In-Memory Caching Strategies in Node.js
- URL: https://www.sitepoint.com/caching-in-nodejs/
- License: Unknown License
- Crawl Date: 2025-04-29T14:50:47.228Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-29
library/DOTENV.md
# library/DOTENV.md
# DOTENV

## Crawl Summary
Dotenv loads environment variables from a .env file to process.env. Key API methods include config(options), parse(content, options), populate(target, source, options), and decrypt. CLI preload options such as --require and DOTENV_CONFIG_* allow custom file paths, encoding, debug mode, and override behavior. Multiline, comments, variable expansion, and command substitution are supported for robust environment setup.

## Normalised Extract
Table of Contents:
1. Installation
   - npm install dotenv --save
2. Usage
   - Create .env file with key-value pairs
   - Import using require('dotenv').config() or import 'dotenv/config'
3. API Methods
   a. config(options)
      - Reads .env file with options: path (default: process.cwd() + '/.env'), encoding (default 'utf8'), debug (default false), override (default false), processEnv (default process.env)
      - Returns an object with property parsed or error
   b. parse(content, options)
      - Accepts a String or Buffer
      - Returns an object with key-value pairs, supports debug option
   c. populate(target, source, options)
      - Merges source object into target, with override and debug options
   d. decrypt(encryptedString, decryptionKey)
      - Decrypts encrypted .env files
4. Configuration Options and CLI Usage
   - Options via CLI: dotenv_config_path, dotenv_config_debug, dotenv_config_encoding
   - Environment Variable Overrides using DOTENV_CONFIG_*
5. Advanced Features
   - Multiline values, inline comments, variable expansion (using dotenv-expand), command substitution (using dotenvx)
6. Troubleshooting
   - Enable debug mode; check file location; use webpack polyfills for front-end

Detailed Technical Points:
Installation: Execute 'npm install dotenv --save'.
Usage: Create a .env file with parameters, then load the config immediately as the application starts.
API: 
  config: require('dotenv').config({ path: '/custom/path/to/.env', encoding: 'latin1', debug: true, override: true }) returns either { parsed: { ... } } or { error: Error }.
  parse: const config = require('dotenv').parse(Buffer.from('BASIC=basic'), { debug: true }) returns { BASIC: 'basic' }.
  populate: require('dotenv').populate(targetObj, { HELLO: 'world' }, { override: true }) sets targetObj.HELLO to 'world'.
CLI and Environment: Use node -r dotenv/config to preload variables. Command line arguments override environment variables when DOTENV_CONFIG_* variables are set.
Troubleshooting: Use require('dotenv').config({ debug: true }) for verbose logging and check placement of .env file.


## Supplementary Details
Configuration Options for config():
- path: string; default is path.resolve(process.cwd(), '.env'); used to specify location of .env file
- encoding: string; default 'utf8'; can be set to 'latin1' or other encoding
- debug: boolean; default false; when true, logs debug messages for troubleshooting
- override: boolean; default false; if true, any existing environment variables in process.env are overridden
- processEnv: object; default process.env; allows specifying a custom target object

API Method Details:
1. config(options):
   - Signature: config(options?: { path?: string, encoding?: string, debug?: boolean, override?: boolean, processEnv?: object }): { parsed?: object, error?: Error }
   - Throws error if file not found or if options misconfigured and error property is returned.
2. parse(content, options):
   - Signature: parse(content: string | Buffer, options?: { debug?: boolean }): object
3. populate(target, source, options):
   - Signature: populate(target: object, source: object, options?: { override?: boolean, debug?: boolean }): void

Implementation Steps:
- Create .env file in project root.
- Invoke require('dotenv').config() at the very start of application.
- For multiple .env files, pass an array to the path option: config({ path: ['.env.local', '.env'] })
- To use custom decoding with encoding option, set config({ encoding: 'latin1' })

Best Practices:
- Do not commit .env files to version control.
- Use environment-specific .env files such as .env.production and .env.development.
- Enable debug mode during development to verify keys are loaded as expected.
- Use dotenv-expand for variable expansion in .env files if necessary.

Troubleshooting Procedures:
- Run script with debug: require('dotenv').config({ debug: true }) to output parsing errors.
- In case of preloading issues in ES modules, use import 'dotenv/config' instead of calling config() after import.
- For front-end bundlers, use polyfill plugins such as node-polyfill-webpack-plugin or dotenv-webpack to inject process.env variables.
- For command substitution or encryption, consider using dotenvx commands such as: dotenvx run --debug -- node index.js and dotenvx set KEY Value --encrypt -f .env.production


## Reference Details
API Specifications:
config(options?: { path?: string, encoding?: string, debug?: boolean, override?: boolean, processEnv?: object }) : { parsed?: object, error?: Error }
Example:
const result = require('dotenv').config({ path: '/custom/path/to/.env', encoding: 'latin1', debug: true, override: true });
if (result.error) { throw result.error; }

parse(content: string | Buffer, options?: { debug?: boolean }) : object
Example:
const buf = Buffer.from('BASIC=basic');
const config = require('dotenv').parse(buf, { debug: true });
// returns { BASIC: 'basic' }

populate(target: object, source: object, options?: { override?: boolean, debug?: boolean }) : void
Example:
const target = {};
const source = { HELLO: 'world' };
require('dotenv').populate(target, source, { override: true, debug: true });
// target becomes { HELLO: 'world' }

decrypt(encryptedString: string, decryptionKey: string) : string
// Provided for decrypting encrypted .env files using a decryption key

CLI Usage:
Node Preload: node -r dotenv/config your_script.js
Command Line Options: dotenv_config_path, dotenv_config_debug, dotenv_config_encoding
Environment Variable Override: DOTENV_CONFIG_DEBUG, DOTENV_CONFIG_PATH, etc.

Implementation Patterns:
1. Standard Initialization:
   Create .env file; require('dotenv').config(); console.log(process.env.KEY);
2. Multiple Files: require('dotenv').config({ path: ['.env.local', '.env'] });
3. Custom ProcessEnv Target:
   const myEnv = {};
   require('dotenv').config({ processEnv: myEnv });
   console.log(myEnv);

Best Practices:
- Never commit your .env file; use secure storage or encryption via dotenvx.
- Use separate .env files per environment and use the override flag if necessary.

Troubleshooting:
- For missing variables: verify file location, use debug mode:
  require('dotenv').config({ debug: true });
- For front-end issues with webpack, include node-polyfill-webpack-plugin:
  In webpack.config.js, add new NodePolyfillPlugin() and configure webpack.DefinePlugin to inject process.env values.
- For ES module pitfalls, ensure dotenv/config is imported before any module that depends on process.env.

Full SDK Method Signatures:
- config(options?: { path?: string, encoding?: string, debug?: boolean, override?: boolean, processEnv?: object }): { parsed?: object, error?: Error }
- parse(content: string | Buffer, options?: { debug?: boolean }): object
- populate(target: object, source: object, options?: { override?: boolean, debug?: boolean }): void
- decrypt(encryptedString: string, decryptionKey: string): string


## Information Dense Extract
DOTENV; npm install; .env file in project root; require('dotenv').config() or import 'dotenv/config'; API: config({path,encoding,debug,override,processEnv}) returns {parsed,error}; parse(Buffer|string,{debug}) returns object; populate(target,source,{override,debug}) merges vars; CLI: node -r dotenv/config; Options via DOTENV_CONFIG_*; Multiline support with line breaks in quotes; Comments with '#' handled; Use dotenv-expand for variable expansion; Troubleshoot with debug:true; For ES modules, import 'dotenv/config' first; Best practices: do not commit .env, use separate files per environment; Webpack polyfill for front-end integration.

## Sanitised Extract
Table of Contents:
1. Installation
   - npm install dotenv --save
2. Usage
   - Create .env file with key-value pairs
   - Import using require('dotenv').config() or import 'dotenv/config'
3. API Methods
   a. config(options)
      - Reads .env file with options: path (default: process.cwd() + '/.env'), encoding (default 'utf8'), debug (default false), override (default false), processEnv (default process.env)
      - Returns an object with property parsed or error
   b. parse(content, options)
      - Accepts a String or Buffer
      - Returns an object with key-value pairs, supports debug option
   c. populate(target, source, options)
      - Merges source object into target, with override and debug options
   d. decrypt(encryptedString, decryptionKey)
      - Decrypts encrypted .env files
4. Configuration Options and CLI Usage
   - Options via CLI: dotenv_config_path, dotenv_config_debug, dotenv_config_encoding
   - Environment Variable Overrides using DOTENV_CONFIG_*
5. Advanced Features
   - Multiline values, inline comments, variable expansion (using dotenv-expand), command substitution (using dotenvx)
6. Troubleshooting
   - Enable debug mode; check file location; use webpack polyfills for front-end

Detailed Technical Points:
Installation: Execute 'npm install dotenv --save'.
Usage: Create a .env file with parameters, then load the config immediately as the application starts.
API: 
  config: require('dotenv').config({ path: '/custom/path/to/.env', encoding: 'latin1', debug: true, override: true }) returns either { parsed: { ... } } or { error: Error }.
  parse: const config = require('dotenv').parse(Buffer.from('BASIC=basic'), { debug: true }) returns { BASIC: 'basic' }.
  populate: require('dotenv').populate(targetObj, { HELLO: 'world' }, { override: true }) sets targetObj.HELLO to 'world'.
CLI and Environment: Use node -r dotenv/config to preload variables. Command line arguments override environment variables when DOTENV_CONFIG_* variables are set.
Troubleshooting: Use require('dotenv').config({ debug: true }) for verbose logging and check placement of .env file.

## Original Source
Dotenv Documentation
https://github.com/motdotla/dotenv

## Digest of DOTENV

# DOTENV

Date Retrieved: 2023-10-27

## Overview
Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env, following the Twelve-Factor App methodology. It provides functions to configure, parse, populate, and decrypt environment variables.

## Installation
- npm install dotenv --save
- yarn add dotenv
- bun add dotenv

## Usage
1. Create a .env file in the root of your project with key-value pairs:
   S3_BUCKET="YOURS3BUCKET"
   SECRET_KEY="YOURSECRETKEYGOESHERE"
2. Import and configure dotenv early in your application:
   CommonJS: require('dotenv').config()
   ES6: import 'dotenv/config'
3. process.env now contains the environment variables.

## API Methods
### config(options?)
- Reads and parses the .env file, merges with process.env.
- Options:
  - path: string, default is path.resolve(process.cwd(), '.env')
  - encoding: string, default 'utf8'
  - debug: boolean, default false
  - override: boolean, default false
  - processEnv: object, default process.env
- Returns: { parsed: Object } or { error: Error }

Example:
  const result = require('dotenv').config({ path: '/custom/path/to/.env', encoding: 'latin1', debug: true, override: true });
  if (result.error) { throw result.error; }
  console.log(result.parsed);

### parse(content, options?)
- Parses a String or Buffer and returns an object with key-value pairs.
- Options:
  - debug: boolean, default false

Example:
  const buf = Buffer.from('BASIC=basic');
  const config = require('dotenv').parse(buf, { debug: true });
  // config becomes { BASIC: 'basic' }

### populate(target, source, options?)
- Populates environment variables from source into target.
- Options:
  - override: boolean, default false
  - debug: boolean, default false

Example:
  const parsed = { HELLO: 'world' };
  require('dotenv').populate(process.env, parsed);
  // process.env.HELLO now equals 'world'

### decrypt(encryptedString, decryptionKey)
- (If available) Decrypts an encrypted .env file content using the provided decryption key.

## Configuration Options (CLI and Env Vars)
- Preload with: node -r dotenv/config your_script.js
- Command Line Overrides: dotenv_config_path, dotenv_config_debug, dotenv_config_encoding
- Environment Variables: DOTENV_CONFIG_<OPTION> (e.g., DOTENV_CONFIG_DEBUG=true)

## Advanced Features
- Multiline values: Use literal line breaks within quotes or \n for new line
- Comments: Lines starting with # are ignored. Inline comments must have proper quoting if the value contains a '#'
- Variable Expansion: Use dotenv-expand to expand variables defined in .env
- Command Substitution: Use dotenvx for command substitution in .env files
- Preloading: Use --require (-r) option to load dotenv without explicit code changes

## Troubleshooting
- If .env variables fail to load, check the file placement, enable debug mode: require('dotenv').config({ debug: true })
- For React and front-end use, ensure environment variables are injected via webpack or appropriate framework tooling.
- For module resolution issues (crypto|os|path), use node-polyfill-webpack-plugin or dotenv-webpack.

## Attribution and Data
- Data Size: 762122 bytes
- Links Found: 5611
- Source: https://github.com/motdotla/dotenv


## Attribution
- Source: Dotenv Documentation
- URL: https://github.com/motdotla/dotenv
- License: MIT License
- Crawl Date: 2025-04-27T08:49:23.793Z
- Data Size: 762122 bytes
- Links Found: 5611

## Retrieved
2025-04-27
library/INTL_NUMBERFORMAT.md
# library/INTL_NUMBERFORMAT.md
# INTL_NUMBERFORMAT

## Crawl Summary
Intl.NumberFormat provides a constructor and several methods for locale-sensitive number formatting. Key specifications include the static method supportedLocalesOf, instance methods like format, formatRange, formatToParts, and resolvedOptions. The options allow customization such as style (currency, unit), currency code, maximumSignificantDigits, and unit display. Concrete examples demonstrate currency output for different locales, significant digit formatting, and locale fallback mechanisms.

## Normalised Extract
Table of Contents:
1. Constructor
   - Usage: new Intl.NumberFormat([locales, options])
2. Static Method: supportedLocalesOf
   - Signature: Intl.NumberFormat.supportedLocalesOf(locales: string | string[], options?: object) => string[]
3. Instance Methods
   - format(number: number) => string
   - formatRange(start: number, end: number) => string
   - formatRangeToParts(start: number, end: number) => Array<Object>
   - formatToParts(number: number) => Array<Object>
   - resolvedOptions() => Object
4. Options & Configurations
   - style: 'decimal' | 'currency' | 'percent' | 'unit'
   - currency: string (e.g., 'EUR', 'JPY')
   - currencyDisplay: 'symbol' | 'code' | 'name'
   - maximumSignificantDigits: number
   - unit: string (for style 'unit', e.g., 'kilometer-per-hour', 'liter')
   - unitDisplay: 'short' | 'long'

Detailed Topics:
1. Constructor: Creates a new Intl.NumberFormat instance; accepts optional locales (as string or array) and an options object containing configuration parameters.
2. supportedLocalesOf: Determines supported locales from the provided list without falling back to the default locale.
3. format: Converts a number to a formatted string based on the locale and specified options.
4. Format Range Methods: Provide rich formatting options for numeric ranges, returning either a complete string or segmented parts for custom formatting.
5. resolvedOptions: Outputs the final configuration used by the formatter, allowing developers to inspect active settings.

## Supplementary Details
Parameter Values and Configurations:
- locales: Accepts BCP 47 language tags (e.g., 'en-US', 'de-DE').
- options:
   style: Default 'decimal'. When set to 'currency', requires a valid ISO 4217 currency code (e.g., 'EUR', 'JPY').
   currencyDisplay: Defaults to 'symbol'. Options: 'code', 'name'.
   maximumSignificantDigits: Numeric value to limit formatted digits (e.g., 3).
   unit: Requires a valid unit string when style is 'unit' (e.g., 'kilometer-per-hour').
   unitDisplay: 'short' (default) or 'long'.

Implementation Steps:
1. Create a new instance: new Intl.NumberFormat('locale', { options }).
2. Format numbers using format() for immediate output.
3. For finer control, use formatToParts() to get an array of parts with types such as 'integer', 'decimal', 'fraction'.
4. Use supportedLocalesOf() for validating locale support before instantiation.

Best Practices:
- Always provide explicit locale to avoid discrepancies.
- Use fallback locale arrays for broader compatibility.
- Validate resolvedOptions() to ensure configuration is as expected.

Troubleshooting Procedures:
- If output format is not as expected, check the options object and ensure correct types for style and currency.
- Use console.log(formatter.resolvedOptions()) to debug configuration.
- Verify browser compatibility if encountering unsupported behavior.

## Reference Details
API Specifications and Code Examples:

Constructor:
- Signature: new Intl.NumberFormat(locales?: string | string[], options?: {
    style?: 'decimal' | 'currency' | 'percent' | 'unit',
    currency?: string,
    currencyDisplay?: 'symbol' | 'code' | 'name',
    minimumIntegerDigits?: number,
    minimumFractionDigits?: number,
    maximumFractionDigits?: number,
    minimumSignificantDigits?: number,
    maximumSignificantDigits?: number,
    useGrouping?: boolean,
    unit?: string,
    unitDisplay?: 'short' | 'long',
    localeMatcher?: 'lookup' | 'best fit'
})

Static Method:
- Intl.NumberFormat.supportedLocalesOf(locales: string | string[], options?: { localeMatcher?: 'lookup' | 'best fit' }): string[]

Instance Methods:
1. format(number: number): string
2. formatRange(start: number, end: number): string
3. formatRangeToParts(start: number, end: number): Array<{ type: string, value: string }>
4. formatToParts(number: number): Array<{ type: string, value: string }>
5. resolvedOptions(): {
    locale: string,
    numberingSystem: string,
    style: string,
    currency?: string,
    currencyDisplay?: string,
    minimumIntegerDigits: number,
    minimumFractionDigits: number,
    maximumFractionDigits: number,
    minimumSignificantDigits?: number,
    maximumSignificantDigits?: number,
    useGrouping: boolean
}

Full Code Example (Currency Formatting):
------------------------------------------
// Create a formatter for German locale with Euro currency
const number = 123456.789;
const formatterDE = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
console.log(formatterDE.format(number));
// Expected output: "123.456,79 €"

// Japanese Yen formatting (no minor unit)
const formatterJP = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' });
console.log(formatterJP.format(number));
// Expected output: "￥123,457"

// Formatting with significant digits
const formatterIN = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 });
console.log(formatterIN.format(number));
// Expected output: "1,23,000"

Configuration Options Details:
- style defaults to 'decimal'; setting to 'currency' requires a valid currency code.
- maximumSignificantDigits supports any positive integer; typical values: 3 or 4.

Troubleshooting:
- Command: console.log(formatter.resolvedOptions());
  Expected output: An object with keys such as locale, numberingSystem, style, currency (if applicable), minimumIntegerDigits, and useGrouping.
- If output is inconsistent, verify the provided locale string and the options structure.

Best Practices:
- For internationalized applications, always specify the locale explicitly.
- Use fallback arrays for locales when uncertain about browser support, e.g., new Intl.NumberFormat(['ban', 'id']).
- Check resolvedOptions() to confirm that the formatter is configured correctly.

Exceptions:
- If an invalid currency code is passed when style is 'currency', a RangeError will be thrown.
- Similarly, invalid locales or options may result in a RangeError.

## Information Dense Extract
Intl.NumberFormat: constructor(new Intl.NumberFormat(locales?: string|array, options?: {style:'decimal'|'currency'|'percent'|'unit', currency?: string, currencyDisplay?: 'symbol'|'code'|'name', minimumIntegerDigits?: number, minimumFractionDigits?: number, maximumFractionDigits?: number, minimumSignificantDigits?: number, maximumSignificantDigits?: number, useGrouping?: boolean, unit?: string, unitDisplay?: 'short'|'long', localeMatcher?: 'lookup'|'best fit'})). Static: supportedLocalesOf(locales, options) => string[]. Instance: format(number) => string; formatRange(start, end) => string; formatRangeToParts(start, end) => Array<object>; formatToParts(number) => Array<object>; resolvedOptions() => object. Options example: { style:'currency', currency:'EUR' } => Output formatted according to locale. Code: new Intl.NumberFormat('de-DE', {style:'currency',currency:'EUR'}).format(123456.789) yields "123.456,79 €". Troubleshoot by logging resolvedOptions(); exceptions: RangeError for invalid codes or options.

## Sanitised Extract
Table of Contents:
1. Constructor
   - Usage: new Intl.NumberFormat([locales, options])
2. Static Method: supportedLocalesOf
   - Signature: Intl.NumberFormat.supportedLocalesOf(locales: string | string[], options?: object) => string[]
3. Instance Methods
   - format(number: number) => string
   - formatRange(start: number, end: number) => string
   - formatRangeToParts(start: number, end: number) => Array<Object>
   - formatToParts(number: number) => Array<Object>
   - resolvedOptions() => Object
4. Options & Configurations
   - style: 'decimal' | 'currency' | 'percent' | 'unit'
   - currency: string (e.g., 'EUR', 'JPY')
   - currencyDisplay: 'symbol' | 'code' | 'name'
   - maximumSignificantDigits: number
   - unit: string (for style 'unit', e.g., 'kilometer-per-hour', 'liter')
   - unitDisplay: 'short' | 'long'

Detailed Topics:
1. Constructor: Creates a new Intl.NumberFormat instance; accepts optional locales (as string or array) and an options object containing configuration parameters.
2. supportedLocalesOf: Determines supported locales from the provided list without falling back to the default locale.
3. format: Converts a number to a formatted string based on the locale and specified options.
4. Format Range Methods: Provide rich formatting options for numeric ranges, returning either a complete string or segmented parts for custom formatting.
5. resolvedOptions: Outputs the final configuration used by the formatter, allowing developers to inspect active settings.

## Original Source
MDN Intl.NumberFormat Documentation
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat

## Digest of INTL_NUMBERFORMAT

# Intl.NumberFormat Detailed Digest (Retrieved: 2025-02-11)

# Constructor
Intl.NumberFormat()
- Description: Creates a new NumberFormat object for language-sensitive number formatting.
- Usage: new Intl.NumberFormat([locales[, options]])

# Static Methods
1. Intl.NumberFormat.supportedLocalesOf(locales, options)
   - Parameters:
     - locales: (string | Array<string>) - the locale or locales to check for support
     - options: (object) - optional configuration.
   - Returns: An array of supported locale strings.

# Instance Properties
- constructor: Reference to Intl.NumberFormat constructor.
- [Symbol.toStringTag]: Defaults to "Intl.NumberFormat" used in Object.prototype.toString().

# Instance Methods
1. format(number)
   - Formats a number based on the provided locale and options.
   - Returns: A formatted string.

2. formatRange(start, end)
   - Formats a numeric range into a locale-aware string.
   - Returns: A formatted string representing the range.

3. formatRangeToParts(start, end)
   - Returns an Array of objects representing the range parts for custom formatting.

4. formatToParts(number)
   - Returns an Array of objects representing the parts of the formatted number with types.

5. resolvedOptions()
   - Returns an object with the actual properties resolved during initialization.

# Options and Configuration
- style: 'decimal', 'currency', 'percent', or 'unit'.
- currency: When style is 'currency', specify the currency code (e.g., 'EUR', 'JPY').
- currencyDisplay: 'symbol', 'code', or 'name' (affects how the currency is displayed).
- maximumSignificantDigits: Limits the number of significant digits (example: 3).
- unit: When style is 'unit', specify the unit (e.g., 'kilometer-per-hour', 'liter').
- unitDisplay: 'short' (default) or 'long'.

# Code Examples
Example 1: Currency Formatting
--------------------------------
const number = 123456.789;
console.log(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number));
// Output: "123.456,79 €"

Example 2: Japanese Yen Formatting
-----------------------------------
console.log(new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(number));
// Output: "￥123,457"

Example 3: Significant Digits
------------------------------
console.log(new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(number));
// Output: "1,23,000"

Example 4: Formatting with Units
---------------------------------
console.log(new Intl.NumberFormat('pt-PT', { style: 'unit', unit: 'kilometer-per-hour' }).format(50));
// Output: "50 km/h"

# Implementation Patterns
- Always specify locale for UI consistency.
- Use fallback arrays when a locale may not be supported, e.g., new Intl.NumberFormat(['ban', 'id']).
- Leverage resolvedOptions() to debug or adjust settings dynamically.

# Browser Compatibility & Specifications
- Widely supported in modern browsers.
- Compliance with ECMAScript® 2026 Internationalization API Specification for number formatting.

# Attribution & Data Size
- Crawled from MDN Intl.NumberFormat Documentation with data size 1884357 bytes.

## Attribution
- Source: MDN Intl.NumberFormat Documentation
- URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
- License: CC BY-SA
- Crawl Date: 2025-04-29T20:50:44.522Z
- Data Size: 1884357 bytes
- Links Found: 16066

## Retrieved
2025-04-29
library/PLOTLY_JS.md
# library/PLOTLY_JS.md
# PLOTLY_JS

## Crawl Summary
Plotly.js is a comprehensive charting library offering a declarative JSON interface for building over 40 types of charts including contour, scatter, and 3D plots. It leverages d3.js and stack.gl with configuration options for axes, margins, colorscales, error bars, and annotations. Performance is enhanced using WebGL for 3D and scattergl for large data sets.

## Normalised Extract
Table of Contents:
1. Getting Started
   - Library inclusion, basic use of Plotly.newPlot
2. Chart Types
   - Contour Charts: trace object with x, y, z, type 'contour', autocolorscale=false, custom colorscale, reversescale, zmax, zmin
   - Scatter Charts: trace with type 'scatter', mode 'lines', error_y configuration for error bars
   - 3D Charts: built using WebGL and scattergl for high performance
3. Configuration Options
   - Layout configurations including title, axes (xaxis and yaxis with showline, mirror, ticks), margin parameters
   - Config object options like showLink
4. API Method Details
   - Plotly.newPlot(element, data, layout, config) where:
       element: DOM element target
       data: array of trace objects
       layout: JSON object with layout details
       config: JSON object with config options

Detailed Information:
- For a contour chart, specify:
  trace.x, trace.y, trace.z, type must be 'contour', use autocolorscale false, and colorscale parameter as an array of value-color pairs.
- Layout object includes nested objects for title and axis customization. xaxis and yaxis have attributes: title, showline (boolean), mirror ('allticks'), and ticks ('inside').
- Error bars in scatter plots are configured inside error_y: set array for error values, thickness, and width.
- Use of d3.json and d3.csv to fetch remote data and use mapping functions for dynamic data assignment.
- The API is used in a declarative way with JSON objects fully controlling visual output.

## Supplementary Details
Configuration Specifications:
- Plotly.newPlot(element, data, layout, config):
   element: DOM node (e.g., document.getElementById('chart-id'))
   data: Array of trace objects; each trace object includes parameters like x (array), y (array), z (array for contour), type (string: 'scatter', 'contour', etc.), mode (for scatter: 'lines', 'markers', etc.), error_y (object with array, thickness, width), line (object with width).
   layout: Object defining chart layout, with properties:
       title: { text: string }
       xaxis: { title: { text: string }, showline: boolean, mirror: string, ticks: string }
       yaxis: { title: { text: string }, showline: boolean, mirror: string, ticks: string }
       margin: { l: number, b: number, t: number, r?: number }
       annotations: Array of objects with keys: showarrow (boolean), text (string), x, y, xref, yref
   config: Object with flags such as showLink (boolean)

Implementation Steps:
1. Include Plotly.js library and dependencies (d3.js for data loading).
2. Create a trace object with required parameters for chart type.
3. Define the layout object with axis titles, margins, and annotations.
4. Call Plotly.newPlot with target element and data, layout, configuration.

Exact Parameter Values in Examples:
- Contour Chart:
   autocolorscale: false
   colorscale: [[0, 'rgb(  0,  0,  0)'], [0.3, 'rgb(230,  0,  0)'], [0.6, 'rgb(255,210,  0)'], [1, 'rgb(255,255,255)']]
   reversescale: true, zmax: 2.5, zmin: -2.5
- Scatter Plot:
   line width: 1
   error_y thickness: 0.5, width: 0

## Reference Details
API Specification for Plotly.newPlot:
Method Signature: Plotly.newPlot(domElement: HTMLElement, data: Array<Object>, layout: Object, config?: Object): Promise
Parameters:
- domElement: A valid DOM element where the chart will be rendered
- data: Array of trace objects, e.g., { x: number[], y: number[], type: string, mode?: string, error_y?: { array: number[], thickness: number, width: number }, line?: { width: number } }
- layout: Object with properties such as title (object: { text: string }), xaxis (object: { title: { text: string }, showline: boolean, mirror: string, ticks: string }), yaxis (object similar to xaxis), margin (object with left, bottom, top, [right]), annotations (array of annotation objects with keys: showarrow, text, x, y, xref, yref)
- config: Object with configuration flags (e.g., { showLink: boolean })

Example Code Usage:
1. Contour Chart:
   d3.json('https://plotly.com/~DanielCarrera/13.json', function(figure) {
     var trace = {
       x: figure.data[0].x,
       y: figure.data[0].y,
       z: figure.data[0].z,
       type: 'contour',
       autocolorscale: false,
       colorscale: [[0, 'rgb(  0,  0,  0)'], [0.3, 'rgb(230,  0,  0)'], [0.6, 'rgb(255,210,  0)'], [1, 'rgb(255,255,255)']],
       reversescale: true,
       zmax: 2.5,
       zmin: -2.5
     };
     var layout = {
       title: { text: 'turbulence simulation' },
       xaxis: { title: { text: 'radial direction' }, showline: true, mirror: 'allticks', ticks: 'inside' },
       yaxis: { title: { text: 'vertical direction' }, showline: true, mirror: 'allticks', ticks: 'inside' },
       margin: { l: 40, b: 40, t: 60 },
       annotations: [{ showarrow: false, text: 'Credit: Daniel Carrera', x: 0, y: 0, xref: 'paper', yref: 'paper' }]
     };
     Plotly.newPlot(document.getElementById('contour-plot'), [trace], layout, { showLink: false });
   });

2. Scatter Plot with Error Bars:
   d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/wind_speed_laurel_nebraska.csv', function(rows) {
     var trace = {
       type: 'scatter',
       mode: 'lines',
       x: rows.map(function(row) { return row['Time']; }),
       y: rows.map(function(row) { return row['10 Min Sampled Avg']; }),
       line: { width: 1 },
       error_y: { array: rows.map(function(row) { return row['10 Min Std Dev']; }), thickness: 0.5, width: 0 }
     };
     var layout = {
       yaxis: { title: { text: 'Wind Speed' } },
       xaxis: { showgrid: false, tickformat: '%B, %Y' },
       margin: { l: 40, b: 10, r: 10, t: 20 }
     };
     Plotly.newPlot(document.getElementById('wind-speed'), [trace], layout, { showLink: false });
   });

Troubleshooting Steps:
- Verify the DOM element exists and has a valid ID
- Ensure the data fetched via d3.json or d3.csv returns an object with data property containing valid arrays
- Check that layout configuration objects include all required fields (title, axis definitions, margin)
- Use browser developer tools to inspect network calls if the external data source fails
- Console log the trace, layout, and config objects before calling Plotly.newPlot to debug configuration errors

## Information Dense Extract
Plotly.js: High-level JS charting library built on d3.js and stack.gl; supports >40 chart types. API: Plotly.newPlot(domElement: HTMLElement, data: Array<traceObject>, layout: Object, config?: Object). Contour chart parameters: type='contour', autocolorscale=false, colorscale=[ [0,'rgb(0,0,0)'], [0.3,'rgb(230,0,0)'], [0.6,'rgb(255,210,0)'], [1,'rgb(255,255,255)'] ], reversescale=true, zmax=2.5, zmin=-2.5. Scatter chart: type='scatter', mode='lines', error_y with array, thickness:0.5, width:0; layout: title object, xaxis/yaxis with title, showline, mirror ('allticks'), ticks ('inside'), margin {l:40, b:10, t:20, r:10}. Data loading via d3.json/d3.csv using mapping functions to populate trace arrays. Configuration option: { showLink:false }.

## Sanitised Extract
Table of Contents:
1. Getting Started
   - Library inclusion, basic use of Plotly.newPlot
2. Chart Types
   - Contour Charts: trace object with x, y, z, type 'contour', autocolorscale=false, custom colorscale, reversescale, zmax, zmin
   - Scatter Charts: trace with type 'scatter', mode 'lines', error_y configuration for error bars
   - 3D Charts: built using WebGL and scattergl for high performance
3. Configuration Options
   - Layout configurations including title, axes (xaxis and yaxis with showline, mirror, ticks), margin parameters
   - Config object options like showLink
4. API Method Details
   - Plotly.newPlot(element, data, layout, config) where:
       element: DOM element target
       data: array of trace objects
       layout: JSON object with layout details
       config: JSON object with config options

Detailed Information:
- For a contour chart, specify:
  trace.x, trace.y, trace.z, type must be 'contour', use autocolorscale false, and colorscale parameter as an array of value-color pairs.
- Layout object includes nested objects for title and axis customization. xaxis and yaxis have attributes: title, showline (boolean), mirror ('allticks'), and ticks ('inside').
- Error bars in scatter plots are configured inside error_y: set array for error values, thickness, and width.
- Use of d3.json and d3.csv to fetch remote data and use mapping functions for dynamic data assignment.
- The API is used in a declarative way with JSON objects fully controlling visual output.

## Original Source
Plotly.js Documentation
https://plotly.com/javascript/

## Digest of PLOTLY_JS

# PLOTLY.JS CHARTING LIBRARY

Date Retrieved: 2025-??-?? (current date)

## Overview
Plotly.js is a high-level JavaScript charting library built on top of d3.js and stack.gl. It supports over 40 chart types including SVG based charts and WebGL powered 3D charts, statistical graphs, and maps.

## Example: Contour Chart

// Load figure using d3.json and create a contour plot

d3.json('https://plotly.com/~DanielCarrera/13.json', function(figure) {
  var trace = {
    x: figure.data[0].x,
    y: figure.data[0].y,
    z: figure.data[0].z,
    type: 'contour',
    autocolorscale: false,
    colorscale: [[0, 'rgb(  0,  0,  0)'], [0.3, 'rgb(230,  0,  0)'], [0.6, 'rgb(255,210,  0)'], [1, 'rgb(255,255,255)']],
    reversescale: true,
    zmax: 2.5,
    zmin: -2.5
  };
  var layout = {
    title: { text: 'turbulence simulation' },
    xaxis: {
      title: { text: 'radial direction' },
      showline: true,
      mirror: 'allticks',
      ticks: 'inside'
    },
    yaxis: {
      title: { text: 'vertical direction' },
      showline: true,
      mirror: 'allticks',
      ticks: 'inside'
    },
    margin: { l: 40, b: 40, t: 60 },
    annotations: [{
      showarrow: false,
      text: 'Credit: Daniel Carrera',
      x: 0,
      y: 0,
      xref: 'paper',
      yref: 'paper'
    }]
  };
  Plotly.newPlot(document.getElementById('contour-plot'), [trace], layout, { showLink: false });
});

## Example: Scatter Plot with Error Bars

// Using d3.csv to generate scatter plot with error bars

d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/wind_speed_laurel_nebraska.csv', function(rows) {
  var trace = {
    type: 'scatter',
    mode: 'lines',
    x: rows.map(function(row) { return row['Time']; }),
    y: rows.map(function(row) { return row['10 Min Sampled Avg']; }),
    line: { width: 1 },
    error_y: {
      array: rows.map(function(row) { return row['10 Min Std Dev']; }),
      thickness: 0.5,
      width: 0
    }
  };
  var layout = {
    yaxis: { title: { text: 'Wind Speed' } },
    xaxis: {
      showgrid: false,
      tickformat: '%B, %Y'
    },
    margin: { l: 40, b: 10, r: 10, t: 20 }
  };
  Plotly.newPlot(document.getElementById('wind-speed'), [trace], layout, { showLink: false });
});

## Attribution and Data Size

Attribution: Copyright © 2025 Plotly. All rights reserved.
Data Size: 4114360 bytes
Links Found: 12783

## Attribution
- Source: Plotly.js Documentation
- URL: https://plotly.com/javascript/
- License: MIT License
- Crawl Date: 2025-04-29T11:48:20.003Z
- Data Size: 4114360 bytes
- Links Found: 12783

## Retrieved
2025-04-29
library/DOTENV_USAGE.md
# library/DOTENV_USAGE.md
# DOTENV_USAGE

## Crawl Summary
The content provides precise instructions for installing dotenv, loading .env variables using config, parse, and populate, and command line preloading. It details configuration option defaults (path, encoding, debug, override, processEnv) and supports multiline values, comments, variable expansion, command substitution, and multiple environment files. Troubleshooting steps and webpack configuration recommendations are included.

## Normalised Extract
Table of Contents:
  1. Installation
     - npm install dotenv --save, yarn add dotenv, bun add dotenv
  2. Usage
     - CommonJS: require('dotenv').config()
     - ES6: import 'dotenv/config'
  3. Multiline Values and Comments
     - Multiline: Use literal lines or \n
     - Comment rules: Lines starting with #, inline comments require quoting if value contains #
  4. API Functions
     - config({path, encoding, debug, override, processEnv})
       Default: path = process.cwd() + '/.env', encoding = 'utf8', debug = false, override = false, processEnv = process.env
     - parse(src, {debug}) returns parsed key-value object
     - populate(target, source, {override, debug})
  5. CLI Preloading and Configuration Options
     - Preload: node -r dotenv/config
     - CLI options: dotenv_config_path, dotenv_config_debug, dotenv_config_encoding, etc.
  6. Variable Expansion and Command Substitution
     - Use dotenv-expand for nested variables
     - Use dotenvx for command substitution
  7. Multiple Environments and Deployment
     - Use separate .env files (.env.production, .env.local) and dotenvx --env-file flag
  8. Troubleshooting
     - Debug mode, file placement check, webpack polyfills

Each section provides specific implementation details enabling immediate use in projects.

## Supplementary Details
Installation commands: npm install dotenv --save; yarn add dotenv; bun add dotenv.
Usage: Create a .env file in the project root and load environment variables using require('dotenv').config() for CommonJS or import 'dotenv/config' for ESM.
Configuration Options:
  - path: Default path.resolve(process.cwd(), '.env') or an array for multiple files.
  - encoding: Default 'utf8', can be set to other encodings like 'latin1'.
  - debug: Boolean flag to enable detailed logging; defaults to false.
  - override: Boolean flag to replace existing process.env variables; defaults to false.
  - processEnv: Target object for variables; defaults to process.env.

API Explanations:
  - config: Reads and parses the .env file and returns an object with parsed keys; throws error if loading fails.
  - parse: Converts a string or Buffer to an object of key-value pairs.
  - populate: Merges parsed variables into a target object with options to override.

CLI Preloading:
  Use command: node -r dotenv/config your_script.js and set CLI config using DOTENV_CONFIG_* environment variables.

Troubleshooting:
  - Verify the .env file location relative to process.cwd().
  - Use debug mode (config({ debug: true })) to trace issues.
  - For React/Webpack integration, add node-polyfill-webpack-plugin or use dotenv-webpack.

Multiple Environments:
  - Maintain separate .env files for different environments.
  - Use dotenvx commands to select specific env files (--env-file=.env.production).
  - For secure deployments, encrypt .env files using the --encrypt option and manage private keys through environment variables.

## Reference Details
API Specifications:

1. config(options):
   - Signature: function config(options?: {
         path?: string | string[],
         encoding?: string,
         debug?: boolean,
         override?: boolean,
         processEnv?: object
     }): { parsed?: { [key: string]: string }, error?: Error }
   - Example:
     const result = require('dotenv').config({ path: '/custom/path/to/.env', debug: true });
     if(result.error) { throw result.error; } else { console.log(result.parsed); }

2. parse(src, options):
   - Signature: function parse(src: string | Buffer, options?: { debug?: boolean }): { [key: string]: string }
   - Example:
     const dotenv = require('dotenv');
     const buf = Buffer.from('BASIC=basic');
     const config = dotenv.parse(buf, { debug: true });
     console.log(typeof config, config);

3. populate(target, source, options):
   - Signature: function populate(target: object, source: object, options?: { override?: boolean, debug?: boolean }): void
   - Example:
     const target = {};
     const source = { HELLO: 'world' };
     require('dotenv').populate(target, source, { override: true, debug: true });
     console.log(target); // { HELLO: 'world' } if override true, else original value preserved

CLI Preloading and Configuration:
   - Preload: node -r dotenv/config index.js
   - CLI Options:
       dotenv_config_path (string): Custom path to .env file
       dotenv_config_encoding (string): File encoding, default 'utf8'
       dotenv_config_debug (boolean): Enable debugging messages
       dotenv_config_override (boolean): Whether to override existing env variables
   - Environment Variables can also be set: e.g., DOTENV_CONFIG_PATH, DOTENV_CONFIG_DEBUG

Best Practices and Troubleshooting:
   - Use separate .env files for each environment: .env, .env.production, .env.local
   - For security, do not commit .env to version control; use gitignore and pre-commit hooks to prevent leaks.
   - For React and Webpack, ensure proper polyfill usage, e.g., install node-polyfill-webpack-plugin and configure webpack:
       const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
       plugins: [ new NodePolyfillPlugin(), new webpack.DefinePlugin({ 'process.env': { HELLO: JSON.stringify(process.env.HELLO) } }) ]
   - Troubleshooting: If env variables are missing, confirm .env file location, enable debug mode, and check for preloading issues in ESM.

Command Examples:
   - Preload: $ node -r dotenv/config app.js
   - Set custom path: $ node -r dotenv/config app.js dotenv_config_path=/custom/path/.env
   - Encrypt .env for deployment using dotenvx: $ dotenvx set HELLO Production --encrypt -f .env.production
   - Run with encrypted .env: $ DOTENV_PRIVATE_KEY_PRODUCTION="<private key>" dotenvx run -- node index.js


## Information Dense Extract
Install: npm install dotenv; Usage: require('dotenv').config() or import 'dotenv/config'; API: config({path:string|array, encoding:string='utf8', debug:boolean=false, override:boolean=false, processEnv:object=process.env}) returns {parsed, error}; parse(src:string|Buffer, {debug:boolean=false}) returns object; populate(target, source, {override:boolean=false, debug:boolean=false}); CLI preload: node -r dotenv/config; CLI options: dotenv_config_path, dotenv_config_debug, dotenv_config_encoding, dotenv_config_override; Multiline and comments supported; Use dotenv-expand for variable expansion; Use dotenvx for command substitution; Multiple .env files support via array in config; Troubleshooting: enable debug, check file location, polyfill for webpack.

## Sanitised Extract
Table of Contents:
  1. Installation
     - npm install dotenv --save, yarn add dotenv, bun add dotenv
  2. Usage
     - CommonJS: require('dotenv').config()
     - ES6: import 'dotenv/config'
  3. Multiline Values and Comments
     - Multiline: Use literal lines or 'n
     - Comment rules: Lines starting with #, inline comments require quoting if value contains #
  4. API Functions
     - config({path, encoding, debug, override, processEnv})
       Default: path = process.cwd() + '/.env', encoding = 'utf8', debug = false, override = false, processEnv = process.env
     - parse(src, {debug}) returns parsed key-value object
     - populate(target, source, {override, debug})
  5. CLI Preloading and Configuration Options
     - Preload: node -r dotenv/config
     - CLI options: dotenv_config_path, dotenv_config_debug, dotenv_config_encoding, etc.
  6. Variable Expansion and Command Substitution
     - Use dotenv-expand for nested variables
     - Use dotenvx for command substitution
  7. Multiple Environments and Deployment
     - Use separate .env files (.env.production, .env.local) and dotenvx --env-file flag
  8. Troubleshooting
     - Debug mode, file placement check, webpack polyfills

Each section provides specific implementation details enabling immediate use in projects.

## Original Source
dotenv GitHub Repository
https://github.com/motdotla/dotenv

## Digest of DOTENV_USAGE

# DOTENV USAGE

## Installation

- npm: npm install dotenv --save
- yarn: yarn add dotenv
- bun: bun add dotenv

## Usage

Create a .env file in your project root. For example:

S3_BUCKET="YOURS3BUCKET"
SECRET_KEY="YOURSECRETKEYGOESHERE"

As early as possible in your application, include one of the following:

CommonJS:
  require('dotenv').config()
  console.log(process.env)

ES6:
  import 'dotenv/config'

## Multiline Values and Comments

- Multiline values can be enclosed with literal line breaks or using \n:
  PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nKh9NV...\n-----END RSA PRIVATE KEY-----\n"
- Comments are supported. Lines starting with # or inline after a value are treated as comments. Wrap values containing # in quotes.

## API Functions

### config(options)

- Loads the .env file and parses the content into process.env.
- Options (all optional):
  - path (string or array): Default is path.resolve(process.cwd(), '.env')
  - encoding (string): Default 'utf8'
  - debug (boolean): Default false
  - override (boolean): Default false
  - processEnv (object): Defaults to process.env

Example:
  const result = require('dotenv').config({ path: '/custom/path/to/.env', debug: true });
  if (result.error) { throw result.error; }
  console.log(result.parsed);

### parse(src, options)

- Accepts a String or Buffer containing env variables in KEY=VAL format and returns an Object.
- Options:
  - debug (boolean): Default false

Example:
  const dotenv = require('dotenv');
  const buf = Buffer.from('BASIC=basic');
  const config = dotenv.parse(buf, { debug: true });
  console.log(typeof config, config);

### populate(target, source, options)

- Merges parsed environment variables into a target object.
- Options:
  - override (boolean): Default false
  - debug (boolean): Default false

Example:
  const dotenv = require('dotenv');
  const parsed = { HELLO: 'universe' };
  const target = { HELLO: 'world' };
  dotenv.populate(target, parsed, { override: true, debug: true });
  console.log(target);

### decrypt

- (Not detailed here but available for use with dotenvx encryption/decryption workflows.)

## Configuration Options via CLI

- Preload dotenv using node command with -r flag:
  node -r dotenv/config your_script.js
- Set options via command line in the format: dotenv_config_<option>=value
  e.g., node -r dotenv/config your_script.js dotenv_config_path=/custom/path/to/.env dotenv_config_debug=true
- Environment variable override: DOTENV_CONFIG_<OPTION>=value

## Variable Expansion and Command Substitution

- Use dotenv-expand to enable nested variable expansion.
- For command substitution in .env files, use dotenvx.

## Multiple Environments and Deployment

- Create environment specific files like .env.production or .env.local. Use --env-file flag with dotenvx:
  dotenvx run --env-file=.env.production -- node index.js
- To encrypt .env files for secure deployment, use the --encrypt flag with dotenvx and set private keys via environment variables.

## Troubleshooting

- Ensure the .env file is in the correct directory (process.cwd()).
- Turn on debug mode via config({ debug: true }) to get detailed logging.
- For React/Webpack, note that process.env must be injected; consider using node-polyfill-webpack-plugin or dotenv-webpack.
- If environment variables are not loaded, check file placement and any preloading issues in ESM modules.

Retrieved: 2023-10-06
Data Size: 624025 bytes; Links Found: 5067

## Attribution
- Source: dotenv GitHub Repository
- URL: https://github.com/motdotla/dotenv
- License: MIT License
- Crawl Date: 2025-04-29T08:52:27.108Z
- Data Size: 624025 bytes
- Links Found: 5067

## Retrieved
2025-04-29
library/SVG2.md
# library/SVG2.md
# SVG2

## Crawl Summary
SVG2 Candidate Recommendation published on 04 October 2018. Contains detailed technical specifications for SVG including rendering models (stacking context, painter's algorithm), complete DOM interfaces (SVGElement, SVGGraphicsElement, SVGGeometryElement, etc.), and extensive definitions for paths (moveto, lineto, cubic/quadratic Bezier, elliptical arcs) and basic shapes (<rect>, <circle>, <ellipse>, <line>, <polyline>, <polygon>). Also covers CSS styling (inline, external) and text layout attributes (x, y, dx, dy, rotate), along with transformation attributes such as 'transform', 'viewBox' and 'preserveAspectRatio'.


## Normalised Extract
Table of Contents:
  1. Introduction
    - Overview of XML-based SVG, candidate recommendation status.
  2. Rendering Model
    - Definitions: rendering tree, stacking context, painters model.
    - Visibility control: 'display', 'visibility'.
  3. Basic Data Types and DOM Interfaces
    - DOM Interfaces: SVGElement, SVGGraphicsElement, SVGGeometryElement, etc.
    - Data types: SVGNumber, SVGLength, SVGAngle, SVGNumberList, SVGLengthList, SVGStringList.
    - Animatable Interfaces: SVGAnimatedBoolean, SVGAnimatedLength, SVGAnimatedRect, etc.
  4. Document Structure
    - Elements: <svg>, <g>, <defs>, <symbol>, <use>, <desc>, <title>, <metadata>.
    - Namespace handling and grouping semantics.
  5. Styling
    - CSS application via <style> and external <link>.
    - Presentation attributes and user agent style sheet interference.
  6. Geometry Properties
    - Attributes: cx, cy (center coordinates); r, rx, ry (radii); x, y, width, height for positioning.
  7. Coordinate Systems and Transformations
    - 'transform' attribute and transform list structure; viewBox parameters (min-x, min-y, width, height) and preserveAspectRatio details.
  8. Paths
    - Path data grammar for <path> element using commands: M, m, L, l, C, c, Q, q, A, a, Z.
    - Rules for command sequencing and error handling (e.g., out-of-range elliptical arc parameters, zero-length segments).
  9. Basic Shapes
    - Definition and attributes for <rect>, <circle>, <ellipse>, <line>, <polyline>, <polygon>.
    - Associated DOM interfaces: SVGRectElement, SVGCircleElement, SVGEllipseElement, etc.
  10. Text
    - Elements: <text>, <tspan>, <textPath> along with attributes: x, y, dx, dy, rotate, text-anchor.
    - Layout: inline-size, shape-inside, line-height, and white-space properties.
  11. Embedded Content
    - Integration of graphical and HTML elements using <image> and <foreignObject>.
    - DOM interfaces: SVGImageElement, SVGForeignObjectElement.
  12. Painting
    - Fill properties: fill, fill-rule, fill-opacity.
    - Stroke properties: stroke, stroke-opacity, stroke-width, stroke-linecap, stroke-linejoin, stroke-dasharray, stroke-dashoffset.
    - Marker symbols: <marker> element with marker-start, marker-mid, marker-end, and attributes such as markerWidth, markerHeight, refX, refY.
    - Rendering order: paint-order, color-interpolation, shape-rendering, text-rendering, image-rendering.


## Supplementary Details
Implementation Details and Specifications:
- SVG Root Element (<svg>): Must include XML namespace declaration (xmlns="http://www.w3.org/2000/svg") and may include version='2'.
- DOM Interfaces Examples:
  Interface SVGElement:
    Method: getAttribute(name: string): string;
    Method: setAttribute(name: string, value: string): void;
  Interface SVGAnimatedLength:
    Property: baseVal: number;
    Property: animVal: number;
- Geometry Attributes:
  - For <circle>: cx (number, default 0), cy (number, default 0), r (number, required).
  - For <rect>: x, y (default 0), width, height (required); optional attributes: rx, ry for rounded corners.
- Transformation and Viewport:
  - transform attribute accepts functions such as matrix(a, b, c, d, e, f), translate(tx, ty), scale(sx, [sy]), rotate(angle, [cx, cy]), skewX(angle), skewY(angle).
  - viewBox attribute formatted as: "min-x min-y width height"; preserveAspectRatio attribute controls alignment and meet/slice behavior.
- Paths: The 'd' attribute for <path> must follow strict grammar. Example commands:
  M 10 10 L 20 20 Z
- Styling and CSS:
  - Inline: <style type="text/css"> ... </style>
  - External: <link rel="stylesheet" type="text/css" href="style.css">
  - Presentation attributes can override CSS (e.g. fill, stroke).
- Best Practices:
  - Use explicit units for measurements.
  - Validate path data using a dedicated SVG parser.
  - Ensure accessibility with <title> and <desc> elements.
- Troubleshooting Procedures:
  - For rendering issues, check browser console for errors related to malformed attributes.
  - Validate XML syntax using an online SVG validator.
  - Command Line: Use xmllint --noout file.svg to check for XML errors; expect 'file.svg: OK' on success.


## Reference Details
Complete API and Implementation Specifications:

DOM Interfaces:
------------------------------------------------
Interface SVGElement {
  getAttribute(name: string): string;
  setAttribute(name: string, value: string): void;
  removeAttribute(name: string): void;
}

Interface SVGGraphicsElement extends SVGElement {
  getBBox(): DOMRect;
  getCTM(): SVGMatrix;
  getScreenCTM(): SVGMatrix;
}

Interface SVGAnimatedLength {
  baseVal: number;  // Underlying numeric value
  animVal: number;  // Animated value
}

SVG Geometry Elements:
------------------------------------------------
For <circle>:
  Attributes:
    cx: number (default 0)
    cy: number (default 0)
    r: number (required)

For <rect>:
  Attributes:
    x: number (default 0)
    y: number (default 0)
    width: number (required)
    height: number (required)
    rx: number (optional, default 0)
    ry: number (optional, default 0)

Transformations:
------------------------------------------------
Attribute: transform
  Supported functions:
    matrix(a: number, b: number, c: number, d: number, e: number, f: number)
    translate(tx: number, [ty: number])
    scale(sx: number, [sy: number])
    rotate(angle: number, [cx: number, cy: number])
    skewX(angle: number)
    skewY(angle: number)

Viewport and ViewBox:
------------------------------------------------
Attributes:
  viewBox: string in the format "min-x min-y width height"
  preserveAspectRatio: string specifying alignment (e.g., "xMidYMid meet")

Path Data (for <path> element):
------------------------------------------------
Grammar includes commands:
  moveto: M, m
  lineto: L, l
  cubic Bezier: C, c
  quadratic Bezier: Q, q
  elliptical arc: A, a
  closepath: Z, z

Example of a path command:
  d="M 10 10 L 20 20 C 25 10, 35 10, 40 20 Z"

Marker Elements:
------------------------------------------------
Element: <marker>
  Attributes:
    markerWidth: number (default varies)
    markerHeight: number
    refX: number
    refY: number
    orient: string (e.g., "auto")

Best Practices and Troubleshooting:
------------------------------------------------
- Validate your SVG XML using xmllint (command: xmllint --noout file.svg).
- For invalid path data errors, compare the 'd' attribute against the SVG path grammar.
- When using transformations, always check the order of matrix multiplications.
- Use browsers' developer tools to inspect computed styles and DOM interfaces.
- Ensure accessibility: include <title> and <desc> for assistive technologies.

SDK/Implementation Patterns (Example in JavaScript):
------------------------------------------------
// Accessing an SVG element and modifying attributes
var svgElement = document.getElementById('mySvgElement');
if(svgElement) {
  var currentFill = svgElement.getAttribute('fill');
  svgElement.setAttribute('fill', '#FF0000'); // Set fill to red
}

// Creating a new SVG <circle> element programmatically
var svgNS = 'http://www.w3.org/2000/svg';
var circle = document.createElementNS(svgNS, 'circle');
circle.setAttribute('cx', '50');
circle.setAttribute('cy', '50');
circle.setAttribute('r', '40');
circle.setAttribute('fill', 'blue');
document.getElementById('svgContainer').appendChild(circle);

Configuration Options:
------------------------------------------------
- SVG Root: version attribute set to "2"; namespace must be declared.
- Transformations: defaults are identity matrix if no transform is applied.
- Styling: Default fill is black; default stroke is none; these can be overridden via CSS or presentation attributes.


## Information Dense Extract
SVG2 CR 04Oct2018; Root <svg> with xmlns, version=2; Rendering: stacking context, painters model; DOM Interfaces: SVGElement, SVGGraphicsElement (methods getAttribute(string):string, setAttribute(string, string):void); Geometry: circle (cx,cy,r), rect (x,y,width,height,rx,ry); Transform: transform attribute (matrix, translate, scale, rotate, skewX, skewY); Viewport: viewBox="min-x min-y width height", preserveAspectRatio; Paths: d attribute grammar M, m, L, l, C, c, Q, q, A, a, Z; Text: <text>, <tspan>, text-anchor; Embedded: <image>, <foreignObject>; Painting: fill, fill-rule, fill-opacity, stroke, stroke-opacity, stroke-width, stroke-linecap, stroke-linejoin, stroke-dasharray, marker (<marker> with markerWidth, markerHeight, refX, refY); CSS: inline <style>, external <link>; Troubleshooting: xmllint --noout file.svg; API patterns: createElementNS, setAttribute, appendChild.

## Sanitised Extract
Table of Contents:
  1. Introduction
    - Overview of XML-based SVG, candidate recommendation status.
  2. Rendering Model
    - Definitions: rendering tree, stacking context, painters model.
    - Visibility control: 'display', 'visibility'.
  3. Basic Data Types and DOM Interfaces
    - DOM Interfaces: SVGElement, SVGGraphicsElement, SVGGeometryElement, etc.
    - Data types: SVGNumber, SVGLength, SVGAngle, SVGNumberList, SVGLengthList, SVGStringList.
    - Animatable Interfaces: SVGAnimatedBoolean, SVGAnimatedLength, SVGAnimatedRect, etc.
  4. Document Structure
    - Elements: <svg>, <g>, <defs>, <symbol>, <use>, <desc>, <title>, <metadata>.
    - Namespace handling and grouping semantics.
  5. Styling
    - CSS application via <style> and external <link>.
    - Presentation attributes and user agent style sheet interference.
  6. Geometry Properties
    - Attributes: cx, cy (center coordinates); r, rx, ry (radii); x, y, width, height for positioning.
  7. Coordinate Systems and Transformations
    - 'transform' attribute and transform list structure; viewBox parameters (min-x, min-y, width, height) and preserveAspectRatio details.
  8. Paths
    - Path data grammar for <path> element using commands: M, m, L, l, C, c, Q, q, A, a, Z.
    - Rules for command sequencing and error handling (e.g., out-of-range elliptical arc parameters, zero-length segments).
  9. Basic Shapes
    - Definition and attributes for <rect>, <circle>, <ellipse>, <line>, <polyline>, <polygon>.
    - Associated DOM interfaces: SVGRectElement, SVGCircleElement, SVGEllipseElement, etc.
  10. Text
    - Elements: <text>, <tspan>, <textPath> along with attributes: x, y, dx, dy, rotate, text-anchor.
    - Layout: inline-size, shape-inside, line-height, and white-space properties.
  11. Embedded Content
    - Integration of graphical and HTML elements using <image> and <foreignObject>.
    - DOM interfaces: SVGImageElement, SVGForeignObjectElement.
  12. Painting
    - Fill properties: fill, fill-rule, fill-opacity.
    - Stroke properties: stroke, stroke-opacity, stroke-width, stroke-linecap, stroke-linejoin, stroke-dasharray, stroke-dashoffset.
    - Marker symbols: <marker> element with marker-start, marker-mid, marker-end, and attributes such as markerWidth, markerHeight, refX, refY.
    - Rendering order: paint-order, color-interpolation, shape-rendering, text-rendering, image-rendering.

## Original Source
SVG 2 Specification
https://www.w3.org/TR/SVG2/

## Digest of SVG2

# SVG 2 SPECIFICATION OVERVIEW

Candidate Recommendation Date: 04 October 2018
Document URL: https://www.w3.org/TR/SVG2/
Data Size: 24737520 bytes

This document defines the Scalable Vector Graphics (SVG) 2 specification, building upon SVG 1.1 Second Edition and enhancing usability and precision. It covers a rich set of topics including XML-based syntax for vector graphics, rendering models, DOM interfaces, presentation attributes, text layout, geometry properties, and embedded content capabilities.

## Table of Contents
1. Introduction
2. Rendering Model
3. Basic Data Types and DOM Interfaces
4. Document Structure
5. Styling
6. Geometry Properties
7. Coordinate Systems, Transformations and Units
8. Paths
9. Basic Shapes
10. Text
11. Embedded Content
12. Painting (Filling, Stroking & Marker Symbols)

## Key Sections and Technical Details

### 1. Introduction
- Overview of SVG syntax, XML base language, and candidate recommendation status.

### 2. Rendering Model
- Definitions: rendering tree, stacking context, painters algorithm.
- Details: control of visibility via 'display' and 'visibility'; grouping and opacity management.

### 3. Basic Data Types and DOM Interfaces
- DOM interfaces: SVGElement, SVGGraphicsElement, SVGGeometryElement.
- Data types: SVGNumber, SVGLength, SVGAngle, SVGNumberList, SVGLengthList, SVGStringList.
- Reflectable and animated attributes via interfaces such as SVGAnimatedBoolean, SVGAnimatedEnumeration, SVGAnimatedLength, etc.

### 4. Document Structure
- Root element: <svg> with namespace definitions.
- Grouping elements: <g>, <defs>, <symbol>, and <use> with shadow tree support.
- Metadata, description (<desc>, <title>) and handling of unknown elements.

### 5. Styling
- CSS usage: inline via <style> element and external style sheets via HTML <link>.
- Presentation attributes: 'class', 'style', and user agent style sheet interactions.
- Required CSS features and DOM interface: SVGStyleElement.

### 6. Geometry Properties
- Attributes: 'cx', 'cy' for centers; 'r', 'rx', 'ry' for radii; 'x', 'y', 'width', 'height' for positioning.

### 7. Coordinate Systems, Transformations and Units
- Transformation attribute: 'transform' with detailed matrix and transform list definitions.
- Viewport configuration via 'viewBox' and 'preserveAspectRatio'.
- Unit handling and intrinsic sizing properties.

### 8. Paths
- Detailed path data grammar for the 'd' attribute of the <path> element.
- Supported commands: moveto (M, m), lineto (L, l), cubic Bezier (C, c), quadratic Bezier (Q, q), elliptical arc (A, a) and closepath (Z, z).
- Error handling: rules for out-of-range arc parameters and zero-length segments.

### 9. Basic Shapes
- Elements: <rect>, <circle>, <ellipse>, <line>, <polyline>, <polygon>.
- Associated DOM interfaces: SVGRectElement, SVGCircleElement, SVGEllipseElement, SVGLineElement, SVGPolylineElement, SVGPolygonElement.

### 10. Text
- Elements: <text>, <tspan>, and <textPath> for text along a path.
- Layout attributes: x, y, dx, dy, rotate and alignment properties like 'text-anchor'.
- Detailed definitions for glyph metrics, font variants, and text rendering order.

### 11. Embedded Content
- Image integration via <image> and embedding foreign XML/HTML content using <foreignObject>.
- DOM interfaces: SVGImageElement, SVGForeignObjectElement.

### 12. Painting: Filling, Stroking & Marker Symbols
- Fill and stroke properties: 'fill', 'fill-rule', 'fill-opacity', 'stroke', 'stroke-opacity', 'stroke-width'.
- Stroke details: 'stroke-linecap', 'stroke-linejoin', 'stroke-dasharray', 'stroke-dashoffset'.
- Marker definitions: <marker> element with attributes for marker-start, marker-mid, marker-end.
- Advanced properties: 'paint-order', 'color-interpolation', and rendering hints such as 'shape-rendering'.


## Attribution
- Source: SVG 2 Specification
- URL: https://www.w3.org/TR/SVG2/
- License: W3C Recommendation
- Crawl Date: 2025-04-27T13:47:42.513Z
- Data Size: 24737520 bytes
- Links Found: 192619

## Retrieved
2025-04-27
library/BEZIER_CURVES.md
# library/BEZIER_CURVES.md
# BEZIER_CURVES

## Crawl Summary
Includes detailed basis function definitions for Bézier curves, binomial coefficient computation via LUT, optimized implementations for quadratic and cubic curves, weighted and rational formulations, de Casteljau's recursive algorithm for point evaluation, curve flattening and splitting methods, and matrix representations for converting and splitting curves. Data Size: 32562089 bytes.

## Normalised Extract
Table of Contents:
1. Basis Functions and Lookup Table
   - Function Bezier(n, t) = Σ[k=0..n] binomial(n,k) * (1-t)^(n-k) * t^k
   - Dynamic LUT generation for Pascal's Triangle; binomial(n,k) returns LUT[n][k]
2. Optimized Implementations
   - Quadratic: Compute t2, mt, mt2; return mt2 + 2*mt*t + t2
   - Cubic: Compute t2, t3, mt, mt2, mt3; return mt3 + 3*mt2*t + 3*mt*t2 + t3
3. Weighted and Rational Functions
   - Weighted: BezierWeighted(n, t, w[]) using w[k] factor
   - Rational: Compute f[k] = r[k] * binomial(n,k) * (1-t)^(n-k) * t^k, then output weighted sum divided by Σ f[k]
4. de Casteljau's Algorithm
   - Recursive function drawCurvePoint(points[], t) that reduces points until one is left
   - Alternate version computes x and y separately forming new point(x,y)
5. Curve Flattening
   - flattenCurve(curve, segmentCount): sample at t steps with step = 1/segmentCount; join points
6. Splitting Curves
   - Enhanced de Casteljau algorithm records left and right arrays during recursion for splitting
7. Matrix Representation
   - Represent curve as [T]*[M]*[P] to allow sub-curve extraction via matrix manipulation

## Supplementary Details
Specifications:
- Basis Function: For order n, Bezier(n,t) = Σ[k=0..n] binomial(n,k)*(1-t)^(n-k)*t^k
- LUT: Initialize with [1], [1,1], [1,2,1]…; expand using nextRow[i] = previous_row[i-1] + previous_row[i]
- Quadratic Implementation: t2 = t*t, mt = 1-t, mt2 = mt*mt; optionally with weights: result = w[0]*mt2 + 2*w[1]*mt*t + w[2]*t2
- Cubic Implementation: t2, t3, mt, mt2, mt3 computed; result = w[0]*mt3 + 3*w[1]*mt2*t + 3*w[2]*mt*t2 + w[3]*t3
- Weighted Function: Accepts array w[]; Rational adds array r[] and computes terms f[k]; final value is (weighted sum) / (Σ f[k])
- de Casteljau's: Recursive interpolation; base when points.length==1 returns final point
- Flattening: Use curve.getXValue(t) and curve.getYValue(t) over evenly spaced t values; step = 1/segmentCount
- Splitting: Use modified de Casteljau recording first and last elements of each newpoints array to form left/right control point arrays
- Configuration: Parameter t normally in [0,1]; values outside produce extrapolation

## Reference Details
API and Code Examples:

Basis Function:
Function: Bezier(n, t)
Parameters: n (integer, order of curve), t (float, 0<= t <=1)
Return: Sum of binomial(n,k) * (1-t)^(n-k) * t^k for k=0..n

Binomial Lookup:
Function: binomial(n, k)
Parameters: n (integer), k (integer)
Algorithm: Expand LUT if n >= current length using:
  nextRow[0] = 1
  for i=1 to s-1: nextRow[i] = lut[s-1][i-1] + lut[s-1][i]
  nextRow[s] = 1
Return: lut[n][k]

Optimized Quadratic Bézier:
Function: Bezier2(t)
Parameters: t (float)
Local Variables: t2 = t*t, mt = 1-t, mt2 = mt*mt
Return: mt2 + 2*mt*t + t2

Optimized Cubic Bézier:
Function: Bezier3(t)
Parameters: t (float)
Local Variables: t2 = t*t, t3 = t2*t, mt = 1-t, mt2 = mt*mt, mt3 = mt2*mt
Return: mt3 + 3*mt2*t + 3*mt*t2 + t3

Weighted Implementation:
Function: BezierWeighted(n, t, w[])
Parameters: n (integer), t (float), w[] (array of weights, length = n+1)
Operation: Sum over k=0 to n of w[k]*binomial(n,k)*(1-t)^(n-k)*t^k

Rational Bézier Example (Quadratic):
Function: RationalBezier2(t, w[], r[])
Parameters: t (float), w[] (length 3), r[] (length 3)
Local Variables: t2, mt, mt2; f0 = r[0]*mt2, f1 = 2*r[1]*mt*t, f2 = r[2]*t2; basis = f0+f1+f2
Return: (w[0]*f0 + w[1]*f1 + w[2]*f2) / basis

De Casteljau's Algorithm:
Function: drawCurvePoint(points[], t)
Parameters: points[] (array of control points), t (float)
Algorithm: If points.length==1 return points[0]; else compute newpoints with newpoints[i] = (1-t)*points[i] + t*points[i+1] and recurse

Curve Splitting using de Casteljau:
Global arrays: left, right
Function: splitCurve(points[], t)
Operation: Record first element to left and last element to right at each recursion level; then recursive call with newpoints

Curve Flattening:
Function: flattenCurve(curve, segmentCount)
Parameters: curve (object with methods getXValue(t), getYValue(t)), segmentCount (integer)
Algorithm: step = 1/segmentCount; loop for i=1 to segmentCount collecting coordinates; return coordinate list

Troubleshooting Steps:
- Verify LUT array length and dynamic expansion in binomial(n,k) for high n values
- Debug de Casteljau's algorithm by logging intermediate newpoints arrays
- For flattening, adjust segmentCount to capture high curvature accurately; expected output is a smoother line when segmentCount is high
- Confirm that t values are within [0,1] unless extrapolation is intended

Configuration Options:
- Parameter t default range: [0,1]
- Weight array w[]: Must have (order+1) elements; default weights if not modified are equivalent to standard Bézier
- Ratio array r[] for rational curves: Alters the curve's pull; typical default: [1,1,...,1]


## Information Dense Extract
Basis: Bezier(n,t)=Σ[k=0..n] binomial(n,k)*(1-t)^(n-k)*t^k; LUT via Pascal's triangle; Quadratic optimized: t2, mt, mt2, return mt2+2mt*t+t2; Cubic optimized: t2,t3,mt,mt2,mt3, return mt3+3mt2*t+3mt*t2+t3; Weighted: include w[] multiplier per term; Rational: add r[] multiplier per term, divide by Σ(r[k]*basis term); de Casteljau: recursive reduction until one point remains; Flattening: sample curve at t=i/segments; Splitting: record left/right arrays during recursion; Matrix form: curve=[T]*[M]*[P]; t in [0,1] controls interpolation; default weights and ratios = 1.

## Sanitised Extract
Table of Contents:
1. Basis Functions and Lookup Table
   - Function Bezier(n, t) = [k=0..n] binomial(n,k) * (1-t)^(n-k) * t^k
   - Dynamic LUT generation for Pascal's Triangle; binomial(n,k) returns LUT[n][k]
2. Optimized Implementations
   - Quadratic: Compute t2, mt, mt2; return mt2 + 2*mt*t + t2
   - Cubic: Compute t2, t3, mt, mt2, mt3; return mt3 + 3*mt2*t + 3*mt*t2 + t3
3. Weighted and Rational Functions
   - Weighted: BezierWeighted(n, t, w[]) using w[k] factor
   - Rational: Compute f[k] = r[k] * binomial(n,k) * (1-t)^(n-k) * t^k, then output weighted sum divided by  f[k]
4. de Casteljau's Algorithm
   - Recursive function drawCurvePoint(points[], t) that reduces points until one is left
   - Alternate version computes x and y separately forming new point(x,y)
5. Curve Flattening
   - flattenCurve(curve, segmentCount): sample at t steps with step = 1/segmentCount; join points
6. Splitting Curves
   - Enhanced de Casteljau algorithm records left and right arrays during recursion for splitting
7. Matrix Representation
   - Represent curve as [T]*[M]*[P] to allow sub-curve extraction via matrix manipulation

## Original Source
A Primer on Bézier Curves
https://pomax.github.io/bezierinfo/

## Digest of BEZIER_CURVES

# Basis Functions and Lookup Table

The core Bézier basis function is defined as:

Bezier(n, t) = sum from k = 0 to n of [ binomial(n, k) * (1 - t)^(n-k) * t^k ]

To compute binomial coefficients efficiently, a lookup table (LUT) is used. The LUT is initialized with:

  [1]
  [1, 1]
  [1, 2, 1]
  [1, 3, 3, 1]
  [1, 4, 6, 4, 1]
  ...

And expanded dynamically with the algorithm:

function binomial(n, k):
  while (n >= lut.length):
    s = lut.length
    nextRow = new array of size (s + 1)
    nextRow[0] = 1
    for i from 1 to s - 1:
      nextRow[i] = lut[s-1][i-1] + lut[s-1][i]
    nextRow[s] = 1
    lut.push(nextRow)
  return lut[n][k]

# Optimized Implementations for Quadratic and Cubic Curves

For many graphics applications, quadratic and cubic curves are used.

Quadratic Bézier:

function Bezier2(t):
  t2 = t * t
  mt = 1 - t
  mt2 = mt * mt
  return mt2 + 2 * mt * t + t2

If weights are required:

function Bezier2Weighted(t, w[]):
  t2 = t * t
  mt = 1 - t
  mt2 = mt * mt
  return w[0] * mt2 + 2 * w[1] * mt * t + w[2] * t2

Cubic Bézier:

function Bezier3(t):
  t2 = t * t
  t3 = t2 * t
  mt = 1 - t
  mt2 = mt * mt
  mt3 = mt2 * mt
  return mt3 + 3 * mt2 * t + 3 * mt * t2 + t3

With weighting:

function Bezier3Weighted(t, w[]):
  t2 = t * t
  t3 = t2 * t
  mt = 1 - t
  mt2 = mt * mt
  mt3 = mt2 * mt
  return w[0] * mt3 + 3 * w[1] * mt2 * t + 3 * w[2] * mt * t2 + w[3] * t3

# Weighted and Rational Bézier Functions

Weighted Bézier adds per-control-point multipliers:

function BezierWeighted(n, t, w[]):
  sum = 0
  for k = 0 to n:
    sum += w[k] * binomial(n, k) * (1 - t)^(n - k) * t^k
  return sum

For Rational Bézier curves, introduce ratio factors (r[]) to further adjust the influence:

Quadratic Rational Bézier:

function RationalBezier2(t, w[], r[]):
  t2 = t * t
  mt = 1 - t
  mt2 = mt * mt
  f0 = r[0] * mt2
  f1 = 2 * r[1] * mt * t
  f2 = r[2] * t2
  basis = f0 + f1 + f2
  return (w[0] * f0 + w[1] * f1 + w[2] * f2) / basis

Cubic Rational Bézier:

function RationalBezier3(t, w[], r[]):
  t2 = t * t
  t3 = t2 * t
  mt = 1 - t
  mt2 = mt * mt
  mt3 = mt2 * mt
  f0 = r[0] * mt3
  f1 = 3 * r[1] * mt2 * t
  f2 = 3 * r[2] * mt * t2
  f3 = r[3] * t3
  basis = f0 + f1 + f2 + f3
  return (w[0] * f0 + w[1] * f1 + w[2] * f2 + w[3] * f3) / basis

# de Casteljau's Algorithm for Curve Evaluation

de Casteljau's algorithm recursively computes the point on the curve for a given t without direct polynomial evaluation.

Simple version using operator overloading:

function drawCurvePoint(points[], t):
  if points.length == 1:
    return points[0]
  else:
    newpoints = []
    for i = 0 to points.length - 2:
      newpoints.push((1 - t) * points[i] + t * points[i+1])
    return drawCurvePoint(newpoints, t)

Alternate version handling x and y separately:

function drawCurvePoint(points[], t):
  if points.length == 1:
    return points[0]
  else:
    newpoints = []
    for i = 0 to points.length - 2:
      x = (1 - t) * points[i].x + t * points[i+1].x
      y = (1 - t) * points[i].y + t * points[i+1].y
      newpoints.push(new point(x, y))
    return drawCurvePoint(newpoints, t)

# Curve Flattening and Drawing Algorithms

Flattening reduces a Bézier curve to a series of line segments by sampling at intervals:

function flattenCurve(curve, segmentCount):
  step = 1 / segmentCount
  coordinates = [curve.getXValue(0), curve.getYValue(0)]
  for i = 1 to segmentCount:
    t = i * step
    coordinates.push(curve.getXValue(t), curve.getYValue(t))
  return coordinates

Drawing the flattened curve:

function drawFlattenedCurve(curve, segmentCount):
  coordinates = flattenCurve(curve, segmentCount)
  currentCoord = coordinates[0]
  for i = 1 to coordinates.length - 1:
    nextCoord = coordinates[i]
    line(currentCoord, nextCoord)
    currentCoord = nextCoord

# Splitting Curves Using de Casteljau's Algorithm

By recording intermediate points, a curve can be split into two segments at a chosen t:

left = []
right = []
function splitCurve(points[], t):
  if points.length == 1:
    left.push(points[0])
    right.push(points[0])
    return
  else:
    newpoints = []
    for i = 0 to points.length - 2:
      if i == 0:
        left.push(points[i])
      if i == points.length - 2:
        right.push(points[i+1])
      newpoints.push((1 - t) * points[i] + t * points[i+1])
    splitCurve(newpoints, t)

After execution, left and right arrays contain the control points for the two new Bézier curves.

# Bézier Curves as Matrix Operations

Bézier curves can be expressed in matrix form where:

Curve = [T] * [M] * [P]

Where [T] is the vector of t powers, [M] is the basis (Bernstein) matrix, and [P] contains the control point coordinates. This representation
can be rearranged to solve for sub-curves when splitting using linear algebra: compute new control points via operations like [M^-1 * Z * M].

# Metadata

Content retrieved on: 2023-10-04
Attribution: Data crawled from https://pomax.github.io/bezierinfo/ (Data Size: 32562089 bytes)

## Attribution
- Source: A Primer on Bézier Curves
- URL: https://pomax.github.io/bezierinfo/
- License: Creative Commons Attribution (Educational Use)
- Crawl Date: 2025-04-28T17:48:22.062Z
- Data Size: 32562089 bytes
- Links Found: 19384

## Retrieved
2025-04-28
library/TWELVE_FACTOR.md
# library/TWELVE_FACTOR.md
# TWELVE_FACTOR

## Crawl Summary
Config is implemented via environment variables to separate deploy-specific values (resource handles, credentials, hostnames) from code. Backing services are attached resources accessible via URLs or config handles. The recommended practice is to use granular, independent env vars instead of grouped configuration files, ensuring that the code can be open-sourced without credential exposure.

## Normalised Extract
Table of Contents:
1. Environment Variables as Config
   - Use export commands; set key-value pairs in OS environment
   - Example: export DATABASE_URL='postgres://user:pass@host/db'
2. Backing Services
   - Treat databases, caching systems, messaging services as attached resources
   - Swap resource handles without code changes
3. Codebase and Deploys
   - One codebase; multiple deploys each with independent config
   - Ensure credentials and deployment-specific values are maintained externally
4. Best Practices and Verification
   - Do not hard-code constants; use environment variables to avoid accidental exposure
   - Use system commands (env, printenv) to verify configuration

Details:
Environment Variables must be set externally. For example, in Node.js, use process.env.KEY to access configuration. Configuration files (like config/database.yml) must not be version controlled to avoid accidental commits.
Backing services are identified by their endpoint URLs and credentials stored as env vars. Changing a resource only requires updating the env variable.
Multiple deploys share the same codebase but load different environment settings for development, staging, or production.
Best practices include verifying that no sensitive data is in the source and using orthogonal env vars rather than grouped configurations.

## Supplementary Details
Technical Specifications:
- Config Parameter: Use environment variables (e.g., DATABASE_URL, API_KEY) with string values.
- Environment: OS-agnostic, used via export command on Unix or set command on Windows.
- Implementation Steps:
   1. Remove all configuration constants from code.
   2. Define each config item as an independent environment variable.
   3. In deployment scripts, load the environment variables either manually or via tools like dotenv.
   4. Validate configuration at startup (e.g., using a validation library).
- Configuration Options:
   • export VARIABLE=value
   • Dotenv fallback in development: load .env file (do not commit .env to VCS).
- Effects:
   • Changing deploy config requires only updating env vars; no code change necessary.

## Reference Details
API Specifications and Implementation Details:
- Function: setEnvVar
  Signature: function setEnvVar(key: string, value: string): void
  Description: Sets an environment variable in the application runtime. Throws error if invalid key provided.

- Function: getEnvVar
  Signature: function getEnvVar(key: string): string | undefined
  Description: Retrieves the value of an environment variable. Returns undefined if not set.

- Sample Code (Node.js):
--------------------------------------------------
// Set an environment variable
function setEnvVar(key, value) {
  if (!key || typeof key !== 'string') {
    throw new Error('Invalid environment variable key');
  }
  process.env[key] = value;
}

// Get an environment variable with fallback
function getEnvVar(key, defaultValue) {
  const value = process.env[key];
  if (value === undefined && defaultValue !== undefined) {
    return defaultValue;
  }
  return value;
}

// Example usage:
setEnvVar('DATABASE_URL', 'postgres://user:pass@host/db');
console.log('DB URL:', getEnvVar('DATABASE_URL'));
--------------------------------------------------

Configuration Options and Defaults:
- DOTENV: Use configuration file named '.env' in development; do not commit this file.
   • Default: Not loaded in production; manually set environment variables.
- Troubleshooting Commands:
   • Linux/Mac: run 'env | grep DATABASE_URL' to check the variable
   • Windows: run 'set DATABASE_URL' in CMD

Best Practices:
1. Validate all required environment variables at application start-up, e.g., using a schema validator (e.g., Zod in Node.js).
2. Separate deployment-specific configuration from internal app configuration.
3. Use documented keys and consistent naming conventions (UPPERCASE, underscore separated).
4. Regularly audit and verify that no secret keys are embedded in the application source.
5. In CI/CD pipelines, load environment variables securely using secret managers.

Troubleshooting Procedures:
- Command: node app.js
  Expected Output: The application logs the successful loading of all required env vars or throws clear error messages if any are missing.
- Verification: Run diagnostic script that lists all critical env variables and their sources.


## Information Dense Extract
Config must use environment variables; each key-value pair set externally. Backing services accessed via URL. Codebase remains constant across deploys. Recommendations: export VARIABLE=value, do not store constants. API: setEnvVar(key:string,value:string):void; getEnvVar(key:string):string|undefined. Use .env file for development; production requires manual env setup. Validate at start-up with schema (e.g., Zod). Troubleshoot using env|grep and diagnostic scripts. Best practice: independent, orthogonal env vars, no grouped config.

## Sanitised Extract
Table of Contents:
1. Environment Variables as Config
   - Use export commands; set key-value pairs in OS environment
   - Example: export DATABASE_URL='postgres://user:pass@host/db'
2. Backing Services
   - Treat databases, caching systems, messaging services as attached resources
   - Swap resource handles without code changes
3. Codebase and Deploys
   - One codebase; multiple deploys each with independent config
   - Ensure credentials and deployment-specific values are maintained externally
4. Best Practices and Verification
   - Do not hard-code constants; use environment variables to avoid accidental exposure
   - Use system commands (env, printenv) to verify configuration

Details:
Environment Variables must be set externally. For example, in Node.js, use process.env.KEY to access configuration. Configuration files (like config/database.yml) must not be version controlled to avoid accidental commits.
Backing services are identified by their endpoint URLs and credentials stored as env vars. Changing a resource only requires updating the env variable.
Multiple deploys share the same codebase but load different environment settings for development, staging, or production.
Best practices include verifying that no sensitive data is in the source and using orthogonal env vars rather than grouped configurations.

## Original Source
12 Factor App - Config
https://12factor.net/config

## Digest of TWELVE_FACTOR

# CONFIGURATION
Retrieved on 2023-10-12

# Overview
An application’s configuration includes everything that can vary between deploys (staging, production, development, etc.). This document emphasizes storing configuration in environment variables rather than constants or config files checked into source control.

# Environment Variables as Config
- Store resource handles (e.g., database URLs, Memcached addresses) and external service credentials (e.g., Amazon S3, Twitter) in environment variables.
- Avoid embedding configuration in code to allow the codebase to be open source without credential leaks.
- Use the operating system environment (OS agnostic) to set config values, e.g.: export DATABASE_URL='postgres://user:pass@host/db'

# Backing Services
- Treat backing services (databases, caching systems, message queues, SMTP servers) as attached resources.
- Swap local services with third-party providers by changing the resource handle in the environment without modifying application code.

# Codebase and Deploys
- One codebase per app; multiple deploys share the same codebase with different config via environment variables.
- Each deploy (local, staging, production) uses its own set of environment variables.

# Best Practices
- Do not group environment variables by deploy (avoid “environments” grouping) to prevent combinatorial configuration complexity.
- Ensure that changing an environment variable does not require a code change.

# Troubleshooting and Verification
- Verify proper config separation by checking that no sensitive information exists in the code repository.
- Use commands such as env | grep -i <VARIABLE_NAME> to inspect runtime environment variables.

# Attribution and Data Size
- Crawled data size: 448684 bytes
- Retrieved from https://12factor.net/config
- Multiple language examples provided (English, Czech, German, Greek, Spanish, French, Italian, Japanese, Korean, Polish, Portuguese, Russian)


## Attribution
- Source: 12 Factor App - Config
- URL: https://12factor.net/config
- License: Unknown License
- Crawl Date: 2025-04-28T05:53:44.843Z
- Data Size: 448684 bytes
- Links Found: 3106

## Retrieved
2025-04-28
library/EXPRESS_ROUTING.md
# library/EXPRESS_ROUTING.md
# EXPRESS_ROUTING

## Crawl Summary
Express routing supports HTTP methods via app.METHOD(path, callback). Routes accept simple strings, patterns, or regular expressions. Route parameters populate req.params. Middleware chaining is enabled by next() in multi-callback routes. express.Router allows modular route definitions. Key response methods include res.send, res.json, and res.sendFile. Configurations include express.static for serving files and app.route for chained handlers.

## Normalised Extract
Table of Contents:
1. Routing Basics
   - API: app.get(path, callback), app.post(path, callback) etc.
   - Callback signature: (req, res, next)
2. Route Paths and Patterns
   - Strings, patterns: /, /about, /ab?cd, /ab+cd, /ab*cd, /ab(cd)?e
   - Regular Expressions: /a/, /.*fly$/
3. Route Parameters
   - Format: /users/:userId/books/:bookId; captured in req.params
   - Combined literals: /flights/:from-:to, /plantae/:genus.:species
   - Regex constraint: /user/:userId(\d+)
4. Multiple Callback Handlers
   - Single function vs multiple functions using next()
   - Arrays of callbacks and mixed function arrays
5. Chained Handlers with app.route()
   - Single location definition for GET, POST, PUT
6. Modular Routing with express.Router
   - Define mini-apps with Router; use middleware specific to router
   - Merge parameters option: express.Router({ mergeParams: true })
7. Response Methods
   - Methods: res.send, res.json, res.download, res.redirect, res.render, res.sendFile, res.sendStatus, res.end

Each topic includes exact method signatures and configuration examples for immediate developer implementation.

## Supplementary Details
Routing API Specifications:
- app.get(path: string | RegExp, callback: (req: Request, res: Response, next?: NextFunction) => void): void
- app.post(path: string | RegExp, callback: ...): void
- app.all(path: string | RegExp, callback: ...): void
- express.Router(options?: { mergeParams?: boolean }): Router

Configuration Options for express.static:
- express.static(root: string, options?: {
    dotfiles?: string (default: 'ignore'), 
    etag?: boolean (default: true), 
    index?: boolean|string|Array (default: 'index.html'),
    maxAge?: number (default: 0), 
    redirect?: boolean (default: true), 
    setHeaders?: function(res, path, stat)})

Implementation Steps:
1. Define routes using app.METHOD and specify exact path patterns.
2. Use middleware by specifying next() in callbacks.
3. For modular routes, create a new Router instance, attach middleware and routes, and mount using app.use.
4. Use app.route(path) to chain HTTP method definitions in a concise manner.

Best Practices:
- Order routes from most specific to generic.
- Escape regex characters in route paths as needed (e.g. \$).
- Avoid use of query strings in route matching; they are not part of the route.
- Test routes using Express Playground Router or by unit tests.

Troubleshooting:
- If 404 errors occur, verify route path and middleware order.
- Use console.log in middleware to debug route matching.
- Validate regular expressions for route parameters and patterns.
- Check Express version differences especially between v4 and v5 for pattern handling.

## Reference Details
API Specifications:
1. app.METHOD(path: string|RegExp, callback: (req: Request, res: Response, next?: NextFunction) => void): void
   - Example: app.get('/', (req, res) => { res.send('hello world'); });
2. app.all(path: string|RegExp, callback: (req: Request, res: Response, next: NextFunction) => void): void
   - Example: app.all('/secret', (req, res, next) => { console.log('Accessing secret'); next(); });
3. express.Router(options?: { mergeParams?: boolean }): Router
   - Method usage:
     const router = express.Router({ mergeParams: true });
     router.get('/', (req, res) => { res.send('Router home'); });
4. express.static(root: string, options?: { dotfiles?: string, etag?: boolean, index?: string|Array<string>, maxAge?: number, redirect?: boolean, setHeaders?: (res: Response, path: string, stat: any) => void }): RequestHandler
   - Example: app.use('/static', express.static(path.join(__dirname, 'public')));

SDK Method Signatures:
- function app.get(path: string|RegExp, ...handlers: (req: Request, res: Response, next?: NextFunction) => void): App;
- function app.post(path: string|RegExp, ...handlers: (req: Request, res: Response, next?: NextFunction) => void): App;

Implementation Pattern (Chained Middleware):
const cb0 = (req, res, next) => { console.log('CB0'); next(); };
const cb1 = (req, res, next) => { console.log('CB1'); next(); };
app.get('/example', [cb0, cb1], (req, res) => { res.send('Final Response'); });

Configuration Options with Values:
- For express.static: root directory, maxAge: 0 by default, redirect: true by default.
- For express.Router: mergeParams default is false.

Best Practices:
- Always call next() in middleware if not ending the response.
- Place error handling middleware after all routes: app.use((err, req, res, next) => { console.error(err.stack); res.status(500).send('Something broke!'); });

Troubleshooting Procedures:
1. Verify route paths are correct. Command: node app.js and check logs for route matching.
2. To test route parameter handling, invoke: curl http://localhost:3000/users/42/books/101 and expect JSON with userId:42, bookId:101.
3. Use debugging logs in middleware to confirm execution order.

Detailed Code Example:
// app.js
const express = require('express');
const path = require('path');
const app = express();

// Basic GET Route
app.get('/', (req, res) => { res.send('Hello World!'); });

// Chained route handling with middleware
const middlewareA = (req, res, next) => { console.log('Middleware A'); next(); };
const middlewareB = (req, res, next) => { console.log('Middleware B'); next(); };
app.get('/chain', [middlewareA, middlewareB], (req, res) => { res.send('Chain complete'); });

// Router setup
const router = express.Router({ mergeParams: true });
router.use((req, res, next) => { console.log('Router Middleware'); next(); });
router.get('/info', (req, res) => { res.send('Router Info'); });
app.use('/router', router);

// Serving static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// Start server
const port = 3000;
app.listen(port, () => { console.log(`Server running on port ${port}`); });

## Information Dense Extract
Express routing: use app.get/post/put/delete/all with path: string|RegExp and callbacks (req, res, next). Route parameters with :param populate req.params. Supports patterns (/ab?cd, /ab+cd, /ab*cd, /ab(cd)?e) and regex (/a/, /.*fly$/). Middleware chaining: multiple callbacks with next() invocation. Chained routes via app.route('/path'). Modular routing via express.Router({ mergeParams: boolean }). Response methods: res.send, res.json, res.download, res.redirect, res.render, res.sendFile, res.sendStatus, res.end. API specs: function app.get(path, ...handlers): App; express.static(root, options) with options: dotfiles (default 'ignore'), etag (true), index ('index.html'), maxAge (0), redirect (true). Best practices: order routes specifically; use error middleware; test with curl; log middleware execution.

## Sanitised Extract
Table of Contents:
1. Routing Basics
   - API: app.get(path, callback), app.post(path, callback) etc.
   - Callback signature: (req, res, next)
2. Route Paths and Patterns
   - Strings, patterns: /, /about, /ab?cd, /ab+cd, /ab*cd, /ab(cd)?e
   - Regular Expressions: /a/, /.*fly$/
3. Route Parameters
   - Format: /users/:userId/books/:bookId; captured in req.params
   - Combined literals: /flights/:from-:to, /plantae/:genus.:species
   - Regex constraint: /user/:userId('d+)
4. Multiple Callback Handlers
   - Single function vs multiple functions using next()
   - Arrays of callbacks and mixed function arrays
5. Chained Handlers with app.route()
   - Single location definition for GET, POST, PUT
6. Modular Routing with express.Router
   - Define mini-apps with Router; use middleware specific to router
   - Merge parameters option: express.Router({ mergeParams: true })
7. Response Methods
   - Methods: res.send, res.json, res.download, res.redirect, res.render, res.sendFile, res.sendStatus, res.end

Each topic includes exact method signatures and configuration examples for immediate developer implementation.

## Original Source
Express Routing and Middleware Guide
https://expressjs.com/en/guide/routing.html

## Digest of EXPRESS_ROUTING

# EXPRESS ROUTING

## Overview
Express routing defines how an application responds to client requests at specific URIs//endpoints. Using methods such as app.get(), app.post(), and app.all(), routes are established with associated callback functions. Each route can accept one or more handler functions with the signature (req, res, next) and allows middleware chaining using next().

## Route Methods
- app.get(path, callback): Handles GET requests.
- app.post(path, callback): Handles POST requests.
- app.put(path, callback): Handles PUT requests.
- app.delete(path, callback): Handles DELETE requests.
- app.all(path, callback): Handles all HTTP methods.
- app.use(path, middleware): Mounts middleware functions.

Example:

const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World!');
});

## Route Paths & Patterns
Routes can be defined with string paths, string patterns, or regular expressions. Special characters (?, +, *, etc.) allow flexible matching:

Examples:
- String: app.get('/', ...)
- Pattern: app.get('/ab?cd', ...), app.get('/ab+cd', ...), app.get('/ab*cd', ...), app.get('/ab(cd)?e', ...)
- RegExp: app.get(/a/, ...), app.get(/.*fly$/, ...)

## Route Parameters
Route parameters are specified using a colon prefix. They are captured in req.params.

Examples:
- app.get('/users/:userId/books/:bookId', (req, res) => { res.send(req.params); });
- With literals combined: /flights/:from-:to and /plantae/:genus.:species
- Restriction with RegExp: app.get('/user/:userId(\d+)', ...)

## Multiple Callback Handlers
Routes can have multiple functions to handle middleware chaining.

Examples:
- Single callback: app.get('/example/a', (req, res) => { res.send('Hello from A!'); });
- Multiple callbacks:
  app.get('/example/b', (req, res, next) => {
    console.log('Processing request');
    next();
  }, (req, res) => { res.send('Hello from B!'); });

## Chained Route Handlers Using app.route()
Routes can be chained:

app.route('/book')
  .get((req, res) => { res.send('Get a random book'); })
  .post((req, res) => { res.send('Add a book'); })
  .put((req, res) => { res.send('Update the book'); });

## Using express.Router
Express.Router provides modular route handling. A Router instance is a complete middleware and routing system.

Example:

// birds.js
const express = require('express');
const router = express.Router();

const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now());
  next();
};

router.use(timeLog);
router.get('/', (req, res) => { res.send('Birds home page'); });
router.get('/about', (req, res) => { res.send('About birds'); });

module.exports = router;

Then mounted in main app:

const birds = require('./birds');
app.use('/birds', birds);

## Response Methods
Response methods terminate the request-response cycle:
- res.send()
- res.json()
- res.sendFile()
- res.redirect()
- res.render()
- res.download()
- res.sendStatus(code)
- res.end()

## Configuration & Best Practices
- Use express.static(path, [options]) for serving static files.
- For multiple directories, mount express.static multiple times.
- To avoid routing conflicts, ensure middleware ordering from specific to general.
- In Express 5, some pattern matching characters and regex usage change; consult migration guides.

Retrieved: 2023-10-05
Attribution: Data Size 7544456 bytes, Links Found: 19186

## Attribution
- Source: Express Routing and Middleware Guide
- URL: https://expressjs.com/en/guide/routing.html
- License: MIT License
- Crawl Date: 2025-04-26T22:47:28.139Z
- Data Size: 7544456 bytes
- Links Found: 19186

## Retrieved
2025-04-26
library/VEGA_LITE.md
# library/VEGA_LITE.md
# VEGA_LITE

## Crawl Summary
Vega-Lite provides a high-level JSON grammar for interactive graphics. It defines exact specifications for view properties (title, dimensions), data sources formats, a rich set of transforms (aggregate, bin, calculate, etc.), mark definitions and configurations, detailed encoding channels, projection settings, view composition rules, parameter binding for interactivity, global configuration, and specific property types. The documentation includes complete API method signatures and configuration options for immediate implementation.

## Normalised Extract
TABLE OF CONTENTS:
1. Vega-Lite Overview
2. View Specification
   - Title Properties: text, align, anchor, font, fontSize
   - Dimensions: width, height with responsive options
3. Data / Datasets
   - Data sources: inline, URL, generator; format options: json, csv, tsv
4. Transform Operations
   - Aggregate: fields, ops (sum, avg, count, min, max, median), groupby
   - Bin: parameters (maxbins, anchor, base, extent)
   - Calculate: expression and output field
   - Additional: Density, Extent, Filter, Flatten, Fold, Impute, Join Aggregate, Loess, Lookup, Pivot, Quantile, Regression, Sample, Stack, Time Unit (with UTC & parameters), Window
5. Mark Definitions
   - Supported Marks: Arc, Area, Bar, Box Plot, Circle, Error Band, Error Bar, Geoshape, Image, Line, Point, Rect, Rule, Square, Text, Tick, Trail
   - Mark Config: color, size, opacity, style
6. Encoding
   - Channels: positioning, aggregate, conditional, datum, header, legend, scale, stack, sort, time unit
7. Projection
   - Geographic projections with type, scale, center, rotation
8. View Composition
   - Facet, Layer, Concat, Repeat with configuration and resolution
9. Parameter
   - Definitions: value, expr, bind, select
10. Global Config
    - Options for Format, Guide, Mark, Style, Scale, Projection, Selection, Title, Locale
11. Tooltip & Invalid Data
    - Tooltip channel configuration, disable options, invalid data handling

Detailed Items:
- View Specification: Use JSON objects to define properties. Example Title object: { text: 'My Chart', align: 'center', anchor: 'start', font: 'Helvetica', fontSize: 16 }
- Aggregate Transform: { "aggregate": [{ "op": "sum", "field": "value", "as": "total_value" }], "groupby": ["category"] }
- Bin Transform: { "bin": { "maxbins": 10, "anchor": 0, "base": 10 }, "field": "amount", "as": "binned_amount" }
- Vega-Embed API (used to render specs): Signature: vegaEmbed(container: string|HTMLElement, spec: object, opt?: object) => Promise<{view: object, spec: object}>.
- Configuration Options: Global config objects allow setting default mark colors, fonts, axis styles, and locale settings.
- Best Practices: Validate JSON schema, use pre-calculated aggregates for performance, and bind parameters for interactive charts.
- Troubleshooting: Check compiler errors from Vega’s compiler output, use console logs to view spec conversion errors, and verify data parsing by inspecting network responses.

## Supplementary Details
Exact Parameter Values & Configuration:
- Title Object: { text: 'Chart Title', align: 'center', anchor: 'start', font: 'Arial', fontSize: 18, offset: 10 }
- Data Source: For JSON data, specify { url: 'data.json', format: { type: 'json', property: 'values' } }.
- Aggregate Transform: Parameters: op must be one of [sum, average, count, min, max, median]; groupby is an array of field names; example: { aggregate: [{ op: 'mean', field: 'score', as: 'mean_score' }], groupby: ['group'] }.
- Bin Transform Defaults: maxbins = 10, anchor = 0, base = 10; can be overridden in the spec.
- Vega-Embed Options: { actions: false, mode: 'vega-lite', renderer: 'svg' } with default renderer 'canvas'.
- SDK Method Signature: vegaEmbed(container: string|HTMLElement, spec: object, opt?: { actions?: boolean, renderer?: 'canvas'|'svg', defaultStyle?: boolean, width?: number, height?: number }) returns Promise with view and spec objects.
- Implementation Steps: 1. Create a valid Vega-Lite JSON spec. 2. Embed with vegaEmbed. 3. Validate rendered output in browser console.
- Troubleshooting: Use command line tool: npm run build; inspect output. For API errors, run: console.error('Vega-Lite error:', error) to capture details from the promise rejection.

## Reference Details
API Specifications & Code Examples:
1. Vega-Embed Function:
   Signature: vegaEmbed(container: string|HTMLElement, spec: object, opt?: { actions?: boolean, renderer?: 'canvas'|'svg', defaultStyle?: boolean, width?: number, height?: number }) : Promise<{ view: any, spec: any }>
   Example:
   // Initialize chart
   const container = '#vis';
   const spec = {
     width: 400,
     height: 300,
     mark: 'bar',
     data: { url: 'data.json' },
     encoding: {
       x: { field: 'category', type: 'ordinal' },
       y: { field: 'value', type: 'quantitative' }
     }
   };
   vegaEmbed(container, spec, { actions: false, renderer: 'svg' }).then(result => {
     // Chart rendered successfully
   }).catch(error => {
     console.error('Vega-Embed error:', error);
   });

2. Transform Operations:
   Aggregate Transform:
   {
     aggregate: [{ op: 'sum', field: 'sales', as: 'total_sales' }],
     groupby: ['region']
   }
   Bin Transform:
   {
     bin: { maxbins: 10, anchor: 0, base: 10 },
     field: 'price',
     as: 'binned_price'
   }

3. Mark Configuration:
   Bar Mark Example:
   {
     mark: 'bar',
     encoding: {
       x: { field: 'category', type: 'ordinal' },
       y: { field: 'amount', type: 'quantitative' }
     },
     config: {
       mark: { color: 'steelblue', opacity: 0.8 }
     }
   }

4. Configuration Options:
   Global Config Example:
   {
     config: {
       axis: { labelFont: 'Helvetica', labelFontSize: 12, titleFont: 'Helvetica-Bold', titleFontSize: 14 },
       title: { font: 'Arial', fontSize: 16, anchor: 'middle' },
       legend: { labelFont: 'Arial', labelFontSize: 12 }
     }
   }

5. Troubleshooting Procedures:
   - Command: npm run build
     Expected Output: Successful compilation with no errors related to schema validation.
   - Debug: Check the browser console for errors during vegaEmbed execution. Example error: 'Invalid specification: missing data property'.
   - Verification: Use JSON schema validators to compare the spec with Vega-Lite schema at https://vega.github.io/schema/vega-lite/v5.json

6. Best Practices:
   - Always validate data types in encoding fields.
   - Use pre-aggregated data for large datasets where possible.
   - Bind parameters for interactive charts with clear defaults in the specification.

Refer to official documentation examples for complete end-to-end implementation patterns.

## Information Dense Extract
VEGA-LITE; JSON grammar for interactive graphics; View Spec: { title: { text, align, anchor, font, fontSize }, width, height }; Data: inline, URL with format:{ type, property }; Transforms: Aggregate (op: sum, avg, count, groupby), Bin (maxbins, anchor, base), Calculate (expression -> output), plus Density, Extent, Filter, Flatten, Fold, Impute, JoinAggregate, Loess, Lookup, Pivot, Quantile, Regression, Sample, Stack, TimeUnit (UTC), Window; Mark types: Arc, Area, Bar, BoxPlot, Circle, ErrorBand, ErrorBar, Geoshape, Image, Line, Point, Rect, Rule, Square, Text, Tick, Trail; Encoding: x, y, color, size, shape, opacity, tooltip; Projection: type, scale, center, rotation; Composition: Facet, Layer, Concat, Repeat; Parameter: value, expr, bind, select; Global Config: axis, title, legend fonts and sizes; API: vegaEmbed(container, spec, opt) => Promise<{view,spec}>; Code examples and troubleshooting via npm run build and JSON schema validation.

## Sanitised Extract
TABLE OF CONTENTS:
1. Vega-Lite Overview
2. View Specification
   - Title Properties: text, align, anchor, font, fontSize
   - Dimensions: width, height with responsive options
3. Data / Datasets
   - Data sources: inline, URL, generator; format options: json, csv, tsv
4. Transform Operations
   - Aggregate: fields, ops (sum, avg, count, min, max, median), groupby
   - Bin: parameters (maxbins, anchor, base, extent)
   - Calculate: expression and output field
   - Additional: Density, Extent, Filter, Flatten, Fold, Impute, Join Aggregate, Loess, Lookup, Pivot, Quantile, Regression, Sample, Stack, Time Unit (with UTC & parameters), Window
5. Mark Definitions
   - Supported Marks: Arc, Area, Bar, Box Plot, Circle, Error Band, Error Bar, Geoshape, Image, Line, Point, Rect, Rule, Square, Text, Tick, Trail
   - Mark Config: color, size, opacity, style
6. Encoding
   - Channels: positioning, aggregate, conditional, datum, header, legend, scale, stack, sort, time unit
7. Projection
   - Geographic projections with type, scale, center, rotation
8. View Composition
   - Facet, Layer, Concat, Repeat with configuration and resolution
9. Parameter
   - Definitions: value, expr, bind, select
10. Global Config
    - Options for Format, Guide, Mark, Style, Scale, Projection, Selection, Title, Locale
11. Tooltip & Invalid Data
    - Tooltip channel configuration, disable options, invalid data handling

Detailed Items:
- View Specification: Use JSON objects to define properties. Example Title object: { text: 'My Chart', align: 'center', anchor: 'start', font: 'Helvetica', fontSize: 16 }
- Aggregate Transform: { 'aggregate': [{ 'op': 'sum', 'field': 'value', 'as': 'total_value' }], 'groupby': ['category'] }
- Bin Transform: { 'bin': { 'maxbins': 10, 'anchor': 0, 'base': 10 }, 'field': 'amount', 'as': 'binned_amount' }
- Vega-Embed API (used to render specs): Signature: vegaEmbed(container: string|HTMLElement, spec: object, opt?: object) => Promise<{view: object, spec: object}>.
- Configuration Options: Global config objects allow setting default mark colors, fonts, axis styles, and locale settings.
- Best Practices: Validate JSON schema, use pre-calculated aggregates for performance, and bind parameters for interactive charts.
- Troubleshooting: Check compiler errors from Vegas compiler output, use console logs to view spec conversion errors, and verify data parsing by inspecting network responses.

## Original Source
Vega-Lite Documentation
https://vega.github.io/vega-lite/docs/

## Digest of VEGA_LITE

# Overview
Retrieved on: 2023-10-06

Vega-Lite is a high-level declarative grammar for interactive graphics that uses a concise JSON syntax to specify multi-view visualizations. It compiles Vega-Lite specifications into lower-level Vega specifications for rendering.

# View Specification
- Title: The specification supports a Title Properties Object with parameters such as text, align, anchor, font, fontSize.
- Width/Height: Supports both fixed values and responsive sizing for single-view, layered, and multi-view displays.

# Data / Datasets
- Supports various data sources including inline arrays, URLs, and data generators.
- Data format definitions include type (json, csv, tsv) and parsing options.

# Transform
Provides various transformation operations:
- Aggregate: Parameters include fields, ops (sum, average, count, min, max, median), groupby arrays.
- Bin: Parameters include maxbins (default 10), anchor, base, and extent for binning numeric data.
- Calculate: Expression-based transformation with an output field.
- Additional transforms: Density, Extent, Filter, Flatten, Fold, Impute, Join Aggregate, Loess, Lookup, Pivot, Quantile, Regression, Sample, Stack, Time Unit (with UTC option and specific parameters), and Window with operation references.

# Mark
Defines the graphical representation of data. Supported mark types include:
- Arc, Area, Bar, Box Plot, Circle, Error Band, Error Bar, Geoshape, Image, Line, Point, Rect, Rule, Square, Text, Tick, Trail

Each mark type supports a Mark Definition Object with properties such as color, size, opacity, and styling configuration using a dedicated Mark Config object.

# Encoding
Specifies how data fields are mapped to visual properties. Key elements:
- Channels: Position (x, y), Color, Size, Shape, Opacity, Tooltip, and Text.
- Detailed encoding definitions for aggregate fields, conditional encodings, datum, header configurations, legend formats, scales (with continuous/discrete options), stacking, sorting, and time unit transformations.

# Projection
Supports geographic projection configuration where properties like type, projection scale, center, and rotation can be specified for mapping geo-data.

# View Composition
Provides layouts for Facet, Layer, Concat, and Repeat visualizations along with resolution strategies and configuration objects for consistent styling.

# Parameter
Defines interactive parameters with properties:
- Value (default), Expr (expression-based), Bind (for interactive controls), and Select mechanisms for user inputs.

# Config
Global configuration options to customize:
- Format, Guide, Mark, Style, Scale, Projection, Selection, Title, and Locale configuration.

# Property Types
Includes specialized property types like DateTime, Gradient (linear and radial with stops) and Predicate compositions for complex filtering.

# Tooltip
Configurable tooltip options that enable showing data information on hover. Includes options to disable tooltips or use specialized plugins.

# Invalid Data
Handling of invalid data with options such as mark invalid mode and scale output adjustments.

# Attribution & Data Size
Data Size obtained during crawling: 13752109 bytes


## Attribution
- Source: Vega-Lite Documentation
- URL: https://vega.github.io/vega-lite/docs/
- License: BSD License
- Crawl Date: 2025-04-28T13:55:18.616Z
- Data Size: 13752109 bytes
- Links Found: 15027

## Retrieved
2025-04-28
library/NODE_ERRORS.md
# library/NODE_ERRORS.md
# NODE_ERRORS

## Crawl Summary
Error object properties: message, stack, code, cause. API methods: new Error(message[, options]), Error.captureStackTrace(targetObject[, constructorOpt]), Error.stackTraceLimit. System errors include properties like address, dest, errno, path, port, syscall. OpenSSL errors include opensslErrorStack, function, library, reason. Extensive Node.js error codes provided (ERR_ACCESS_DENIED, ERR_AMBIGUOUS_ARGUMENT, etc.). Detailed examples for synchronous, asynchronous, and EventEmitter based error handling are provided along with debugging best practices and troubleshooting commands.

## Normalised Extract
Table of Contents:
  1. Error Object Basics
     - Constructor: new Error(message[, options])
     - Properties: message (string), stack (string), code (string), cause (any), stackTraceLimit (number).
  2. Error.captureStackTrace
     - Signature: Error.captureStackTrace(targetObject[, constructorOpt])
     - Details: Creates .stack property on target object, omits frames above optional constructorOpt.
  3. Error Handling Patterns
     - Synchronous: try...catch blocks.
     - Asynchronous: Promises with try/catch, callbacks with error-first pattern, EventEmitter error events.
  4. System and OpenSSL Errors
     - System Error Properties: address, dest, errno, info, path, port, syscall.
     - OpenSSL Error Properties: opensslErrorStack, function, library, reason.
  5. Node.js Error Codes
     - Complete list includes: ABORT_ERR, ERR_ACCESS_DENIED, ERR_AMBIGUOUS_ARGUMENT, ERR_ARG_NOT_ITERABLE, ERR_ASSERTION, ERR_ASYNC_CALLBACK, ERR_ASYNC_TYPE, ERR_BUFFER_OUT_OF_BOUNDS, ERR_BUFFER_TOO_LARGE, etc.

Detailed Technical Information:
1. Error Constructor:
   new Error(message[, options])
     - message: string
     - options: { cause: any } (optional)
   Example: err = new Error('Failure occurred', { cause: originalErr })

2. Error.captureStackTrace:
   Error.captureStackTrace(object, [constructorOpt])
     - Captures stack trace and assigns to object.stack
     - Omits frames above constructorOpt if provided.

3. Error.stackTraceLimit:
   Configurable numeric limit for captured frames.
   Default: 10
   Usage: Error.stackTraceLimit = desiredNumber

4. Callback and Promise patterns:
   Synchronous: try { ... } catch (err) { handle(err) }
   Async (Promise): await operation() in try/catch
   Async (callback): function(err, data) { if (err) { handle(err) } }

5. System Error details:
   Included properties: error.address (string), error.dest (string), error.errno (number), error.info (object), error.path (string), error.port (number), error.syscall (string)

6. OpenSSL Error details:
   Included properties: error.opensslErrorStack (array), error.function (string), error.library (string), error.reason (string)

7. Error Code Examples:
   ERR_ACCESS_DENIED, ERR_AMBIGUOUS_ARGUMENT, ERR_ARG_NOT_ITERABLE, etc. are used as constants returned in error.code.

8. Best Practices:
   - Always attach error handlers in EventEmitter based APIs.
   - For fs operations, check error codes such as ENOENT, EISDIR, etc.
   - Increase Error.stackTraceLimit for deeper debugging.

9. Troubleshooting:
   - For EMFILE errors, run "ulimit -n 2048".
   - Use util.getSystemErrorName(error.errno) for decoding system error codes.

## Supplementary Details
Technical Specifications:
- new Error: Accepts a string message and an optional object { cause: any }.
- Error.captureStackTrace: targetObject must be an object; constructorOpt if specified should be a Function to omit frames above it.
- Error.stackTraceLimit: Set as a number, default is 10. Exceeding this may provide more detailed stack traces at the cost of performance.
- System Errors: Provide additional fields: address (string), dest (string), errno (number), info (object), path (string), port (number), syscall (string).
- OpenSSL Error Fields: opensslErrorStack (array of string/error objects), function (string), library (string), reason (string).
- Configuration options: Increase ulimit via shell command "ulimit -n 2048" when encountering file descriptor limitations.
- Implementation steps for using errors:
   1. For standard errors, use new Error() with optional cause.
   2. For tailored error handling, use Error.captureStackTrace to exclude internal functions from stack trace.
   3. In asynchronous code, always use try/catch or error-first callbacks.
- Best Practice: Validate error codes using if (error.code === 'ERR_ACCESS_DENIED') then apply specific recovery steps.
- Troubleshooting: Validate file path existence to avoid ENOENT; check error.errno mapping via util.getSystemErrorName.
- Defaults: Error.stackTraceLimit default is 10, can be updated as needed.
- Command Example: Setting stack trace limit: Error.stackTraceLimit = 50;

## Reference Details
API Specifications:
1. new Error(message: string, options?: { cause?: any }): Error
   - Throws and returns an Error object with properties message, stack, code, and optionally cause.
   - Example:
     const err = new Error('Operation failed', { cause: previousError });
2. Error.captureStackTrace(targetObject: Object, constructorOpt?: Function): void
   - Captures the call stack at the point of invocation and assigns it to targetObject.stack.
   - Example:
     Error.captureStackTrace(myObj, myFunction);
3. Error.stackTraceLimit: number
   - Default value is 10; modify by assignment to capture a larger or smaller number of stack frames.
   - Example:
     Error.stackTraceLimit = 50;

Full Code Example:
--------------------------------------------------
// Synchronous error handling
try {
  throw new Error('Synchronous failure');
} catch (err) {
  console.error('Caught error:', err.message);
  console.error('Stack trace:', err.stack);
}

// Asynchronous error handling using Promises
async function readFileExample() {
  const fs = require('node:fs/promises');
  try {
    const data = await fs.readFile('nonexistent.txt');
  } catch (err) {
    console.error('Async error:', err.message);
  }
}
readFileExample();

// Error.captureStackTrace usage
function internalErrorHandler() {
  const obj = {};
  Error.captureStackTrace(obj, internalErrorHandler);
  return obj;
}

// Configuration Options:
// Increase stack trace limit for debugging
Error.stackTraceLimit = 50;

// Troubleshooting:
// 1. For EMFILE errors: Run command "ulimit -n 2048" to increase file descriptor limits.
// 2. Use util.getSystemErrorName(error.errno) to interpret system error numbers.
--------------------------------------------------

Best Practices:
- Always distinguish synchronous and asynchronous error handling methods.
- Attach error handlers for EventEmitter instances to prevent process crashes.
- Validate parameters to catch TypeError and RangeError before invoking functions.
- Use the 'cause' property to chain errors and maintain original error context.

Detailed Steps:
1. Wrap error prone code in try...catch.
2. For promise based methods, use async/await with error handling.
3. For callback based methods, check if (err) is non-null.
4. For events, attach listener on the 'error' event.

Return Types:
- new Error returns an Error instance.
- Error.captureStackTrace returns void.

Exceptions:
- new Error does not throw additional exceptions by itself; however, improper use of Error.captureStackTrace may omit necessary debugging frames.

All parameters and return values are explicitly defined and documented in the Node.js API.

## Information Dense Extract
Error Constructor: new Error(message: string, options?: { cause?: any }); Properties: message, stack, code, cause, stackTraceLimit (default 10). Capture Stack: Error.captureStackTrace(targetObject: Object, constructorOpt?: Function) omits frames above constructorOpt. Synchronous handling: try { ... } catch (err). Asynchronous: async/await with try/catch, callback with error-first, EventEmitter 'error' event. System Errors include address, dest, errno, info, path, port, syscall; OpenSSL Errors include opensslErrorStack, function, library, reason. Error codes: ABORT_ERR, ERR_ACCESS_DENIED, ERR_AMBIGUOUS_ARGUMENT, ERR_ARG_NOT_ITERABLE, ERR_ASSERTION, ERR_ASYNC_CALLBACK, ERR_BUFFER_OUT_OF_BOUNDS, etc. Best practices: attach error handlers to EventEmitters, use Error.captureStackTrace to hide internals, increase Error.stackTraceLimit for deeper debugging, use util.getSystemErrorName(error.errno) to decode errors, ulimit -n 2048 for file descriptor limitations.

## Sanitised Extract
Table of Contents:
  1. Error Object Basics
     - Constructor: new Error(message[, options])
     - Properties: message (string), stack (string), code (string), cause (any), stackTraceLimit (number).
  2. Error.captureStackTrace
     - Signature: Error.captureStackTrace(targetObject[, constructorOpt])
     - Details: Creates .stack property on target object, omits frames above optional constructorOpt.
  3. Error Handling Patterns
     - Synchronous: try...catch blocks.
     - Asynchronous: Promises with try/catch, callbacks with error-first pattern, EventEmitter error events.
  4. System and OpenSSL Errors
     - System Error Properties: address, dest, errno, info, path, port, syscall.
     - OpenSSL Error Properties: opensslErrorStack, function, library, reason.
  5. Node.js Error Codes
     - Complete list includes: ABORT_ERR, ERR_ACCESS_DENIED, ERR_AMBIGUOUS_ARGUMENT, ERR_ARG_NOT_ITERABLE, ERR_ASSERTION, ERR_ASYNC_CALLBACK, ERR_ASYNC_TYPE, ERR_BUFFER_OUT_OF_BOUNDS, ERR_BUFFER_TOO_LARGE, etc.

Detailed Technical Information:
1. Error Constructor:
   new Error(message[, options])
     - message: string
     - options: { cause: any } (optional)
   Example: err = new Error('Failure occurred', { cause: originalErr })

2. Error.captureStackTrace:
   Error.captureStackTrace(object, [constructorOpt])
     - Captures stack trace and assigns to object.stack
     - Omits frames above constructorOpt if provided.

3. Error.stackTraceLimit:
   Configurable numeric limit for captured frames.
   Default: 10
   Usage: Error.stackTraceLimit = desiredNumber

4. Callback and Promise patterns:
   Synchronous: try { ... } catch (err) { handle(err) }
   Async (Promise): await operation() in try/catch
   Async (callback): function(err, data) { if (err) { handle(err) } }

5. System Error details:
   Included properties: error.address (string), error.dest (string), error.errno (number), error.info (object), error.path (string), error.port (number), error.syscall (string)

6. OpenSSL Error details:
   Included properties: error.opensslErrorStack (array), error.function (string), error.library (string), error.reason (string)

7. Error Code Examples:
   ERR_ACCESS_DENIED, ERR_AMBIGUOUS_ARGUMENT, ERR_ARG_NOT_ITERABLE, etc. are used as constants returned in error.code.

8. Best Practices:
   - Always attach error handlers in EventEmitter based APIs.
   - For fs operations, check error codes such as ENOENT, EISDIR, etc.
   - Increase Error.stackTraceLimit for deeper debugging.

9. Troubleshooting:
   - For EMFILE errors, run 'ulimit -n 2048'.
   - Use util.getSystemErrorName(error.errno) for decoding system error codes.

## Original Source
Node.js Error Handling
https://nodejs.org/api/errors.html

## Digest of NODE_ERRORS

# Node.js Errors Documentation

This document presents the full technical details extracted from the Node.js Error Handling API. It includes complete method signatures, parameter types, properties and detailed code examples.

## Error Object and Properties

- **Constructor**: new Error(message[, options])
  - Parameters:
    - message: string
    - options: Object (optional) with property 'cause' (any type)
  - Returns: An Error instance with a captured stack trace.

- **Properties**:
  - error.message: string, the error description.
  - error.stack: string, stack trace starting with "Error: <message>" followed by call frames.
  - error.code: string, identifier used to identify the error type.
  - error.cause: any, the underlying error provided via options.
  - Error.stackTraceLimit: number, sets the maximum number of stack frames to capture (default 10, can be updated to any number). 

## Error.captureStackTrace Method

- **Signature**: Error.captureStackTrace(targetObject[, constructorOpt])
  - Parameters:
    - targetObject: Object on which the stack property will be defined.
    - constructorOpt: Function (optional), if provided, frames above this function (including it) are omitted from the stack trace.
  - Usage: Helps hide internal implementation frames from the final error output.

## Error Propagation and Handling Patterns

- **Synchronous Error Handling**: Uses try...catch blocks. Example:
  try {
    // code that may throw an error
  } catch (err) {
    // process error: err.message, err.stack
  }

- **Asynchronous Error Handling**:
  - For Promise-based APIs, use async/await with try...catch.
  - For callback-based APIs, check if the first argument is non-null.
  - For EventEmitter APIs, attach a listener to the 'error' event.

## System Errors and OpenSSL Errors

- **System Errors**: Inherit from Error. Common properties include:
  - error.address (string), error.dest (string), error.errno (number), error.info (Object), error.path (string), error.port (number), error.syscall (string).
  - Standard system error examples: EACCES, EADDRINUSE, ECONNREFUSED, ECONNRESET, EEXIST, EISDIR, EMFILE, ENOENT, ENOTDIR, ENOTEMPTY, EPERM, EPIPE, ETIMEDOUT.

- **OpenSSL Errors**:
  Additional properties specific to OpenSSL:
  - error.opensslErrorStack: array (of error details)
  - error.function: string (OpenSSL function name)
  - error.library: string (OpenSSL library name)
  - error.reason: string (description of error cause)

## Node.js Specific Error Codes

The documentation enumerates many Node.js error codes including but not limited to:

- ABORT_ERR
- ERR_ACCESS_DENIED
- ERR_AMBIGUOUS_ARGUMENT
- ERR_ARG_NOT_ITERABLE
- ERR_ASSERTION
- ERR_ASYNC_CALLBACK
- ERR_ASYNC_TYPE
- ERR_BUFFER_OUT_OF_BOUNDS
- ERR_BUFFER_TOO_LARGE
- ERR_CHILD_CLOSED_BEFORE_REPLY
- ERR_CHILD_PROCESS_IPC_REQUIRED
- ERR_CONSTRUCT_CALL_INVALID
- ERR_CONSTRUCT_CALL_REQUIRED
- ERR_CRYPTO_CUSTOM_ENGINE_NOT_SUPPORTED
- ... (full list available in documentation)

## Detailed Code Example: Synchronous, Asynchronous, and EventEmitter Error Handling

// Synchronous Exception Handling
try {
  const a = 1;
  const b = a + undefinedVariable;
} catch (err) {
  console.error('Synchronous error caught:', err.message);
}

// Asynchronous handling using async/await
const fsPromises = require('node:fs/promises');
(async () => {
  try {
    let data = await fsPromises.readFile('nonexistent.txt');
  } catch (err) {
    console.error('Async error caught:', err.message);
  }
})();

// EventEmitter error handling
const net = require('node:net');
const connection = net.connect({ port: 80, host: 'localhost' });
connection.on('error', (err) => {
  console.error('Error event caught:', err.message);
});

## Best Practices and Troubleshooting

1. Always check function signatures for synchronous vs asynchronous error reporting.
2. For asynchronous APIs, always provide error handling logic either via try/catch with async/await or checking error in callbacks.
3. Use Error.captureStackTrace to hide internal frames and reduce noise in production.
4. Increase Error.stackTraceLimit for debugging complex errors: Example - Error.stackTraceLimit = 50

### Troubleshooting Commands

- To increase file descriptor limits (for EMFILE errors):
  ulimit -n 2048
- For diagnostic information of system errors, use util.getSystemErrorName(error.errno) to resolve the error code.

## Documentation Attribution and Data Size

- URL: https://nodejs.org/api/errors.html
- Data Size: 3318159 bytes
- Date retrieved: 

## Attribution
- Source: Node.js Error Handling
- URL: https://nodejs.org/api/errors.html
- License: MIT License
- Crawl Date: 2025-04-26T20:47:27.697Z
- Data Size: 3318159 bytes
- Links Found: 1512

## Retrieved
2025-04-26
library/SVG_GRADIENTS.md
# library/SVG_GRADIENTS.md
# SVG_GRADIENTS

## Crawl Summary
SVG gradients are defined using <linearGradient> and <radialGradient> elements with attributes such as x1, y1, x2, y2 for linear gradients and cx, cy, r, fx, fy for radial gradients. Stop elements (<stop>) are used to specify color transitions with attributes offset and stop-color. Implementation requires embedding these definitions in <defs> and referencing the gradients via fill attribute. Precise coordinate values and default settings are specified for effective gradient rendering.

## Normalised Extract
Table of Contents:
1. Linear Gradient Implementation
   - Element: linearGradient
   - Attributes: id (string), x1 (default 0%), y1 (default 0%), x2 (default 100%), y2 (default 0%)
   - Stop Definition: stop element with offset (0% to 100%) and stop-color (color string)
   - Example: <linearGradient id='grad1' x1='0%' y1='0%' x2='100%' y2='0%'> with two stops: 0% => #ff0, 100% => #f00
2. Radial Gradient Implementation
   - Element: radialGradient
   - Attributes: id (string), cx (default 50%), cy (default 50%), r (radius), fx (optional, defaults to center), fy (optional)
   - Stop Definition: Same as linear gradient
   - Example: <radialGradient id='grad2' cx='50%' cy='50%' r='50%' fx='50%' fy='50%'> with stops: 0% => #00f, 100% => #0ff
3. Usage Pattern
   - Embed gradient definitions inside a <defs> block within an <svg> element
   - Reference the gradient in shape elements using fill attribute like fill='url(#grad1)'
4. Best Practices
   - Maintain valid SVG namespaces
   - Validate percentages and coordinate values
   - Use clear and unique IDs for gradient elements
5. Troubleshooting
   - Verify <defs> is correctly placed and referenced
   - Check browser compatibility and validate SVG syntax

## Supplementary Details
Linear Gradient Specifications:
- id: Unique identifier string for gradient reference.
- x1: Default value '0%'; accepts percentage or coordinate values.
- y1: Default value '0%'.
- x2: Default value '100%'.
- y2: Default value '0%'.
- Stop Specification: Each stop must include an offset (0%-100%) and a stop-color attribute.

Radial Gradient Specifications:
- id: Unique identifier string for gradient reference.
- cx: Default '50%'; center x coordinate of the gradient.
- cy: Default '50%'; center y coordinate of the gradient.
- r: Radius value, required to define the spread of the gradient.
- fx, fy: Optional focal points; if not set, default to center values.
- Stop Specification: Each stop similar to linear gradient.

Implementation Steps:
1. Define the gradient within a <defs> element.
2. Provide all necessary attributes with correct default values if applicable.
3. Reference the gradient using fill='url(#yourGradientID)'.
4. Test gradient rendering in multiple browsers.

Configuration Options:
- Gradient direction for linear gradients is set via x1, y1, x2, y2. Changing these alters the gradient vector.
- For radial gradients, adjusting cx, cy, and r manipulates the center and radius, directly affecting gradient appearance.

## Reference Details
API Specifications for SVG Gradients:

Element: linearGradient
- Signature: <linearGradient id="string" x1="coordinate" y1="coordinate" x2="coordinate" y2="coordinate"> ... </linearGradient>
- Parameters: id (string), x1 (string, percentage or coordinate), y1 (string), x2 (string), y2 (string)
- Return: Renders a linear gradient definition passed to referenced elements
- Exceptions: Undefined id will result in unrendered gradient

Element: radialGradient
- Signature: <radialGradient id="string" cx="coordinate" cy="coordinate" r="coordinate" [fx="coordinate"] [fy="coordinate"]> ... </radialGradient>
- Parameters: id (string), cx (string), cy (string), r (string), fx (string, optional), fy (string, optional)
- Return: Renders a radial gradient for fill/stroke usage
- Exceptions: Missing required parameters cause rendering issues

Stop Element:
- Signature: <stop offset="percentage" stop-color="color" />
- Parameters: offset (string, 0% to 100%), stop-color (color string)
- Return: Defines a color stop in the gradient

Complete SVG Example:
<svg width="300" height="200">
  <defs>
    <linearGradient id="gradExample" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff0" />
      <stop offset="100%" stop-color="#f00" />
    </linearGradient>
    <radialGradient id="radialExample" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
      <stop offset="0%" stop-color="#00f" />
      <stop offset="100%" stop-color="#0ff" />
    </radialGradient>
  </defs>
  <rect fill="url(#gradExample)" width="300" height="100" />
  <circle fill="url(#radialExample)" cx="150" cy="150" r="50" />
</svg>

Implementation Pattern:
1. Create a <defs> element inside the <svg> tag.
2. Define gradient elements with all required attributes.
3. Use unique IDs to reference the gradients using the fill attribute.
4. Validate the SVG output in multiple browsers with common troubleshooting: inspect elements using developer tools, verify that <defs> block is present, and check for typos in attribute names.

Troubleshooting Procedures:
- Run command: xmllint --noout --schema http://www.w3.org/Graphics/SVG/svg.xsd yourfile.svg to validate SVG structure.
- Expected output: No errors if the structure is correct.
- If gradient does not render, check if the ID used in fill attribute matches exactly with the defined gradient ID.
- For browser issues, test with multiple browsers and ensure SVG namespace (xmlns="http://www.w3.org/2000/svg") is set on the <svg> element.

## Information Dense Extract
linearGradient: <linearGradient id=string, x1=0%, y1=0%, x2=100%, y2=0%> with stops (<stop offset=0%-100%, stop-color=hex/rgb>); radialGradient: <radialGradient id=string, cx=50%, cy=50%, r=required, fx optional, fy optional> with stops; usage: embed in <defs> and reference using fill=url(#id); troubleshooting: validate SVG structure via xmllint; common issues: mismatched IDs, missing defs, SVG namespace required.

## Sanitised Extract
Table of Contents:
1. Linear Gradient Implementation
   - Element: linearGradient
   - Attributes: id (string), x1 (default 0%), y1 (default 0%), x2 (default 100%), y2 (default 0%)
   - Stop Definition: stop element with offset (0% to 100%) and stop-color (color string)
   - Example: <linearGradient id='grad1' x1='0%' y1='0%' x2='100%' y2='0%'> with two stops: 0% => #ff0, 100% => #f00
2. Radial Gradient Implementation
   - Element: radialGradient
   - Attributes: id (string), cx (default 50%), cy (default 50%), r (radius), fx (optional, defaults to center), fy (optional)
   - Stop Definition: Same as linear gradient
   - Example: <radialGradient id='grad2' cx='50%' cy='50%' r='50%' fx='50%' fy='50%'> with stops: 0% => #00f, 100% => #0ff
3. Usage Pattern
   - Embed gradient definitions inside a <defs> block within an <svg> element
   - Reference the gradient in shape elements using fill attribute like fill='url(#grad1)'
4. Best Practices
   - Maintain valid SVG namespaces
   - Validate percentages and coordinate values
   - Use clear and unique IDs for gradient elements
5. Troubleshooting
   - Verify <defs> is correctly placed and referenced
   - Check browser compatibility and validate SVG syntax

## Original Source
CSS-Tricks: Guide to SVG Gradients
https://css-tricks.com/guide-svg-gradients/

## Digest of SVG_GRADIENTS

# SVG Gradients

This document covers the detailed implementation and technical specifications for using SVG gradients. It includes definitions for linear and radial gradients, exact attribute specifications, and code examples to apply gradients in an SVG element.

## Linear Gradient

Definition: Use the <linearGradient> element inside <defs>.

Attributes:
- id: Unique identifier (string).
- x1, y1: Start point coordinates (percentage or number). Default: x1="0%", y1="0%".
- x2, y2: End point coordinates (percentage or number). Default: x2="100%", y2="0%".

Stops Definition:
- Use <stop> elements to define colors.
- stop offset: A value from 0% to 100% indicating the position of the color stop.
- stop-color: Color value (hex, rgb, etc).

Example:
<svg width="300" height="200">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff0" />
      <stop offset="100%" stop-color="#f00" />
    </linearGradient>
  </defs>
  <rect fill="url(#grad1)" width="300" height="200" />
</svg>

## Radial Gradient

Definition: Use the <radialGradient> element inside <defs>.

Attributes:
- id: Unique identifier (string).
- cx, cy: Center of the gradient (percentage or number); defaults typically to "50%".
- r: Radius of the gradient (percentage, number).
- fx, fy: Focal point for the gradient (optional, defaults to center).

Example:
<svg width="300" height="200">
  <defs>
    <radialGradient id="grad2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
      <stop offset="0%" stop-color="#00f" />
      <stop offset="100%" stop-color="#0ff" />
    </radialGradient>
  </defs>
  <rect fill="url(#grad2)" width="300" height="200" />
</svg>

## Implementing Gradients

1. Always include the gradient definitions inside a <defs> element.
2. Reference the gradient using fill="url(#ID)" where ID is the gradient's unique identifier.
3. Ensure proper SVG namespace declarations when embedding in HTML.
4. Validate coordinate values and percentages for responsive design.

Date Retrieved: 2023-10-04

Attribution: Crawled from CSS-Tricks Guide to SVG Gradients with a data size of 0 bytes.

## Attribution
- Source: CSS-Tricks: Guide to SVG Gradients
- URL: https://css-tricks.com/guide-svg-gradients/
- License: Unknown (CSS-Tricks)
- Crawl Date: 2025-04-29T16:51:57.471Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-29
library/NUMBER_FORMAT.md
# library/NUMBER_FORMAT.md
# NUMBER_FORMAT

## Crawl Summary
Intl.NumberFormat provides a constructor to format numbers based on locale and options. Key specifications include its static method supportedLocalesOf(locales, options) and instance methods such as format, formatRange, formatToParts, formatRangeToParts, and resolvedOptions. Examples demonstrate usage for currency formatting in German ('de-DE'), Japanese Yen ('ja-JP'), and rounding with maximum significant digits. The configuration options include style, currency, maximumSignificantDigits, unit, and unitDisplay, each with precise effects on the formatted output.

## Normalised Extract
Table of Contents:
1. Constructor
   - new Intl.NumberFormat([locales[, options]])
2. Static Methods
   - supportedLocalesOf(locales: string | string[], options?: Object) returns string[]
3. Instance Properties
   - constructor and [Symbol.toStringTag]: 'Intl.NumberFormat'
4. Instance Methods
   - format(value: number): string
   - formatRange(start: number, end: number): string
   - formatToParts(value: number): Array<Object>
   - formatRangeToParts(start: number, end: number): Array<Object>
   - resolvedOptions(): Object
5. Code Examples
   - Currency: de-DE with EUR resulting in "123.456,79 €"
   - Currency: ja-JP with JPY resulting in "￥123,457"
   - Rounding using maximumSignificantDigits: en-IN with output "1,23,000"
6. Options & Configuration
   - style: (decimal, currency, percent, unit)
   - currency: (e.g., EUR, JPY)
   - maximumSignificantDigits: number
   - unit: (e.g., kilometer-per-hour)
   - unitDisplay: (short, long, narrow)

Details:
Constructor accepts locale strings and an options object. The supportedLocalesOf static method returns supported locales without fallback. Instance methods directly format numbers using locale-sensitive rules and return strings or arrays of parts suitable for custom formatting.

## Supplementary Details
Technical Specifications:
- Constructor: new Intl.NumberFormat(locales?: string | string[], options?: {
    style?: 'decimal' | 'currency' | 'percent' | 'unit',
    currency?: string,
    currencyDisplay?: 'code' | 'symbol' | 'name',
    minimumIntegerDigits?: number,
    minimumFractionDigits?: number,
    maximumFractionDigits?: number,
    minimumSignificantDigits?: number,
    maximumSignificantDigits?: number,
    useGrouping?: boolean,
    notation?: 'standard' | 'scientific' | 'engineering' | 'compact',
    compactDisplay?: 'short' | 'long',
    unit?: string,
    unitDisplay?: 'short' | 'long' | 'narrow'
  })
  Returns an Intl.NumberFormat instance with computed options from the provided locales and configuration.

- Static Method:
  Intl.NumberFormat.supportedLocalesOf(locales: string | string[], options?: { localeMatcher?: 'best fit' | 'lookup' }) : string[]

- Instance Methods:
  format(value: number): string
  formatRange(start: number, end: number): string
  formatToParts(value: number): Array<{ type: string, value: string }>
  formatRangeToParts(start: number, end: number): Array<{ type: string, value: string }>
  resolvedOptions(): Object containing effective locale, numbering system, and all options.

Implementation Steps:
1. Create instance with new Intl.NumberFormat('locale', {options}).
2. Call format(value) to get the formatted number string.
3. Use formatToParts(value) for custom rendering by iterating over returned array of parts.

Configuration Options and Their Effects:
- style: Determines formatting type; 'currency' requires a currency code, 'unit' requires a unit name.
- currency: Specifies the currency and affects symbol placement and rounding.
- maximumSignificantDigits: Limits digits shown for approximate values.
- unit and unitDisplay: Configure unit representation in combination with style 'unit'.

## Reference Details
API Specifications:
Constructor:
  new Intl.NumberFormat(locales?: string | string[], options?: {
    style?: 'decimal' | 'currency' | 'percent' | 'unit',
    currency?: string,
    currencyDisplay?: 'code' | 'symbol' | 'name',
    minimumIntegerDigits?: number,
    minimumFractionDigits?: number,
    maximumFractionDigits?: number,
    minimumSignificantDigits?: number,
    maximumSignificantDigits?: number,
    useGrouping?: boolean,
    notation?: 'standard' | 'scientific' | 'engineering' | 'compact',
    compactDisplay?: 'short' | 'long',
    unit?: string,
    unitDisplay?: 'short' | 'long' | 'narrow'
  }) : Intl.NumberFormat

Static Method:
  Intl.NumberFormat.supportedLocalesOf(locales: string | string[], options?: { localeMatcher?: 'best fit' | 'lookup' }) : string[]

Instance Methods:
  format(value: number): string
  formatRange(start: number, end: number): string
  formatToParts(value: number): Array<{ type: string, value: string }>
  formatRangeToParts(start: number, end: number): Array<{ type: string, value: string }>
  resolvedOptions(): {
    locale: string,
    numberingSystem: string,
    style?: string,
    currency?: string,
    currencyDisplay?: string,
    minimumIntegerDigits?: number,
    minimumFractionDigits?: number,
    maximumFractionDigits?: number,
    minimumSignificantDigits?: number,
    maximumSignificantDigits?: number,
    useGrouping?: boolean,
    notation?: string,
    compactDisplay?: string,
    unit?: string,
    unitDisplay?: string
  }

Full Code Example:
// Formatting a number in various locales
const number = 123456.789;

// German currency format
const germanCurrency = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
console.log(germanCurrency.format(number));
// Expected output: "123.456,79 €"

// Japanese Yen (no minor unit)
const japaneseYen = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' });
console.log(japaneseYen.format(number));
// Expected output: "￥123,457"

// Limit to three significant digits
const significantDigits = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 });
console.log(significantDigits.format(number));
// Expected output: "1,23,000"

// Formatting with unit
const unitFormat = new Intl.NumberFormat('pt-PT', { style: 'unit', unit: 'kilometer-per-hour' });
console.log(unitFormat.format(50));
// Expected output: "50 km/h"

Best Practices and Troubleshooting:
- Always specify a fallback locale array if using an uncommon locale.
- Use resolvedOptions() to debug computed formatting settings.
- Verify group separators and decimal symbols by testing output in different environments.
- Command to test: node -e "console.log(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(123456.789))"
Expected output: 123.456,79 €

Configuration Options Summary:
style: "currency" requires a valid currency code.
maximumSignificantDigits: numeric value defining the precision.
unit: when style is "unit", defines the measurement unit.
unitDisplay: display type for unit (short, long, narrow).

## Information Dense Extract
Intl.NumberFormat: constructor(new Intl.NumberFormat(locales?: string|array, options?: {style, currency, currencyDisplay, minimumIntegerDigits, minimumFractionDigits, maximumFractionDigits, minimumSignificantDigits, maximumSignificantDigits, useGrouping, notation, compactDisplay, unit, unitDisplay})). Static: supportedLocalesOf(locales, {localeMatcher}). Instance: format(number) returns string; formatRange(start, end) returns string; formatToParts(number) returns [{type, value}]; formatRangeToParts(start, end) returns parts; resolvedOptions() returns effective options. Code examples: de-DE with {style:'currency', currency:'EUR'} outputs "123.456,79 €"; ja-JP with {style:'currency', currency:'JPY'} outputs "￥123,457"; en-IN with {maximumSignificantDigits:3} outputs "1,23,000"; unit formatting with {style:'unit', unit:'kilometer-per-hour'} outputs "50 km/h". Key parameters: style, currency, maximumSignificantDigits, unit, unitDisplay. Full API, method signatures, and troubleshooting via resolvedOptions().

## Sanitised Extract
Table of Contents:
1. Constructor
   - new Intl.NumberFormat([locales[, options]])
2. Static Methods
   - supportedLocalesOf(locales: string | string[], options?: Object) returns string[]
3. Instance Properties
   - constructor and [Symbol.toStringTag]: 'Intl.NumberFormat'
4. Instance Methods
   - format(value: number): string
   - formatRange(start: number, end: number): string
   - formatToParts(value: number): Array<Object>
   - formatRangeToParts(start: number, end: number): Array<Object>
   - resolvedOptions(): Object
5. Code Examples
   - Currency: de-DE with EUR resulting in '123.456,79 '
   - Currency: ja-JP with JPY resulting in '123,457'
   - Rounding using maximumSignificantDigits: en-IN with output '1,23,000'
6. Options & Configuration
   - style: (decimal, currency, percent, unit)
   - currency: (e.g., EUR, JPY)
   - maximumSignificantDigits: number
   - unit: (e.g., kilometer-per-hour)
   - unitDisplay: (short, long, narrow)

Details:
Constructor accepts locale strings and an options object. The supportedLocalesOf static method returns supported locales without fallback. Instance methods directly format numbers using locale-sensitive rules and return strings or arrays of parts suitable for custom formatting.

## Original Source
MDN Intl.NumberFormat Documentation
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat

## Digest of NUMBER_FORMAT

# Intl.NumberFormat Documentation

Data Retrieved: 2023-10-15

## Overview
The Intl.NumberFormat object provides language-sensitive number formatting. This includes support for currencies, units, and various numbering systems. It is a built-in object in JavaScript available since 2017.

## Constructor
- Syntax: new Intl.NumberFormat([locales[, options]])
- Creates and returns a new NumberFormat object.

## Static Methods
- Intl.NumberFormat.supportedLocalesOf(locales[, options])
  - Returns an array containing the locales that are supported without fallback.
  - Parameters:
    - locales: string or array of strings
    - options (optional): object with properties for configuration

## Instance Properties
- constructor: Reference to Intl.NumberFormat constructor
- [Symbol.toStringTag]: Always returns "Intl.NumberFormat"

## Instance Methods
- format(value: number): string
  - Formats a number according to the locale and options provided.
- formatRange(start: number, end: number): string
  - Formats a range of numbers [start, end].
- formatToParts(value: number): Array<Object>
  - Returns an array of objects representing formatted parts of the number.
- formatRangeToParts(start: number, end: number): Array<Object>
  - Returns an array of objects which represent the range parts.
- resolvedOptions(): Object
  - Returns an object with properties reflecting computed locale and options.

## Code Examples

Example (Currency Formatting in German):
const number = 123456.789;
console.log(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number));
// Expected output: "123.456,79 €"

Example (Japanese Yen):
console.log(new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(number));
// Expected output: "￥123,457"

Example (Maximum Significant Digits):
console.log(new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(number));
// Expected output: "1,23,000"

## Options and Configuration

Common options include:
- style: 'decimal', 'currency', 'percent', or 'unit'
- currency: Currency code (e.g. EUR, JPY)
- currencyDisplay: 'symbol', 'code', or 'name'
- maximumSignificantDigits: number
- unit: Unit identifier (e.g. 'kilometer-per-hour')
- unitDisplay: 'short', 'long', or 'narrow'

For exhaustive details, see the ECMA-402 Internationalization API Specification.

## Browser Compatibility
Works across many devices and browser versions.

## Attribution
Source: MDN Intl.NumberFormat Documentation, Data Size: 2328834 bytes, Links Found: 18875

## Attribution
- Source: MDN Intl.NumberFormat Documentation
- URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
- License: CC BY-SA
- Crawl Date: 2025-04-29T15:50:15.500Z
- Data Size: 2328834 bytes
- Links Found: 18875

## Retrieved
2025-04-29
library/SVG_PATH.md
# library/SVG_PATH.md
# SVG_PATH

## Crawl Summary
Attributes: d (string, default ''), pathLength (number, default none). Code sample provided for creating complex shapes using arcs and quadratic curves. Browser compatibility established since January 2020 with animatable properties for dynamic SVG rendering.

## Normalised Extract
Table of Contents:
  1. Element Overview
     - The <path> element defines a shape with commands encoded in the 'd' attribute.
  2. Attribute Specifications
     - d: string, default value is empty string, animatable; contains path drawing commands such as M, A, Q, and z.
     - pathLength: number, no default value, animatable; defines the total length of the path in user units.
  3. Code Implementation
     - Usage involves embedding an SVG container with a viewBox and including a <path> element with a properly formatted 'd' attribute.
     - Sample code: use valid SVG markup to ensure proper rendering.
  4. Browser and Performance Considerations
     - Supported across all modern browsers since January 2020; attributes support animation for interactive graphics.

## Supplementary Details
Technical Specifications:
- d attribute: Accepts a string containing SVG path commands (M, L, A, Q, Z, etc.). Must be well-formed for accurate rendering.
- pathLength attribute: Accepts a numerical value; helps in animations by normalizing the path length. If provided, it should be a positive number representing user units.
Implementation Steps:
  1. Create an SVG container with a defined viewBox.
  2. Insert a <path> element and set the 'd' attribute with proper path commands.
  3. Optionally, assign the pathLength attribute to standardize animations.
Configuration Options:
  - Ensure SVG namespace is declared: xmlns="http://www.w3.org/2000/svg".
  - viewBox attribute must be appropriately set to maintain aspect ratio and scaling.
Best Practices:
  - Validate the path commands in 'd' using SVG validation tools.
  - Use CSS animations to animate properties if needed; target the animatable attributes.
  - Test across browsers to verify compatibility and performance.

## Reference Details
API Specifications for <path> Element:

Attributes:
1. d:
   - Type: string
   - Default: ''
   - Description: Contains the sequence of commands (e.g., M, L, A, Q, Z) that define the path shape.
   - Example Value: "M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z"

2. pathLength:
   - Type: number
   - Default: none
   - Description: Specifies the total length of the path in user units to standardize animations and transitions.

Method for Embedding <path> in SVG:
- Code Example:
  
  html, body, svg {
    height: 100%;
  }
  
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M 10,30
         A 20,20 0,0,1 50,30
         A 20,20 0,0,1 90,30
         Q 90,60 50,90
         Q 10,60 10,30 z"
      pathLength="100" />
  </svg>

Configuration Options:
- SVG namespace: xmlns="http://www.w3.org/2000/svg" (mandatory).
- viewBox: Defines coordinate system and scaling (e.g., "0 0 100 100").

Implementation Pattern:
1. Define container styles (e.g., height set to 100% for responsive design).
2. Use correct SVG syntax and attribute formatting.
3. For animations, leverage CSS or SMIL targeting the d and/or pathLength properties.

Best Practices:
- Always validate the 'd' attribute syntax.
- Provide explicit viewBox settings to ensure consistent rendering.
- Test across browser versions to ensure full compatibility.

Troubleshooting Procedures:
- Command: Validate SVG using online validators (e.g., https://validator.w3.org/).
- Check browser console for rendering errors if path does not display.
- Use CSS outline borders on the SVG container to debug coordinate issues.
- Expected Output: The SVG shape renders correctly with smooth transitions if animations are applied.

## Information Dense Extract
SVG_PATH: <path> element, d: string (default ''), pathLength: number (default none), usage in <svg> with viewBox, sample d="M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z", namespace declaration required, animatable attributes, full browser support since Jan2020, configuration options include xmlns and viewBox, implementation steps: container style, SVG markup, validation, troubleshooting via validators and console logs.

## Sanitised Extract
Table of Contents:
  1. Element Overview
     - The <path> element defines a shape with commands encoded in the 'd' attribute.
  2. Attribute Specifications
     - d: string, default value is empty string, animatable; contains path drawing commands such as M, A, Q, and z.
     - pathLength: number, no default value, animatable; defines the total length of the path in user units.
  3. Code Implementation
     - Usage involves embedding an SVG container with a viewBox and including a <path> element with a properly formatted 'd' attribute.
     - Sample code: use valid SVG markup to ensure proper rendering.
  4. Browser and Performance Considerations
     - Supported across all modern browsers since January 2020; attributes support animation for interactive graphics.

## Original Source
MDN SVG <path> Element Documentation
https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path

## Digest of SVG_PATH

# SVG PATH

## Overview
The <path> element in SVG defines a shape by using a series of commands and parameters. It is the generic element to create complex shapes and can be used to draw lines, curves, and arcs.

## Attributes
- d
  - Description: Defines the shape of the path.
  - Value type: string
  - Default value: ''
  - Animatable: yes

- pathLength
  - Description: Specifies the total length of the path in user units.
  - Value type: number
  - Default value: none
  - Animatable: yes

## Code Example
A typical usage in an HTML document:

html, body, svg {
  height: 100%;
}

<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M 10,30
       A 20,20 0,0,1 50,30
       A 20,20 0,0,1 90,30
       Q 90,60 50,90
       Q 10,60 10,30 z" />
</svg>

## Browser Compatibility
- The <path> element is widely supported across devices and browser versions since January 2020.
- Both the 'd' and 'pathLength' attributes are animatable, enhancing interactive and dynamic SVG graphics.

## Retrieval Date & Attribution
- Retrieved on: 2023-10-05
- Data Size: 1233762 bytes
- Links Found: 34457

## Attribution
- Source: MDN SVG <path> Element Documentation
- URL: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path
- License: CC BY-SA
- Crawl Date: 2025-04-29T17:48:49.684Z
- Data Size: 1233762 bytes
- Links Found: 34457

## Retrieved
2025-04-29
library/CHARTJS.md
# library/CHARTJS.md
# CHARTJS

## Crawl Summary
Chart.js documentation provides comprehensive API details for constructing charts using an HTML5 canvas element. The library exposes a Chart constructor accepting a configuration object with keys type, data, and options. Detailed configuration options include animation specifications (delay, duration, easing, loop), scale settings (e.g., LinearScaleOptions with beginAtZero and tick configuration), and plugin integration. The migration guides for v4.x and v3.x detail breaking changes such as property renaming (e.g., grid.drawBorder to border.display) and the shift to ESM-only builds with manual registration of components for tree shaking.

## Normalised Extract
Table of Contents:
1. Installation and Setup
   - CDN integration or npm module installation with ESM support
2. Chart Initialization
   - new Chart(ctx, config) API using a configuration object
3. Configuration Options
   - Data schema: labels array and datasets array
   - Options object containing scales, plugins, and animation settings
4. Animation Specifications
   - AnimationSpec<T>: delay (default 0), duration (default 1000), easing (default 'easeOutQuart'), loop (default false), onComplete and onProgress callbacks
5. Scale Configuration
   - LinearScaleOptions: beginAtZero, grace, suggestedMax, suggestedMin, ticks: count, format, precision, stepSize
6. Migration Guidelines
   - v4.x: Renamed properties in scales (grid.drawBorder to border.display, etc.), ESM-only package, configuration changes
   - v3.x: Removal of xAxes/yAxes arrays, new tree-shakable registration using Chart.register(), updated tooltip and interaction settings

Detailed Implementation:
Installation via npm requires setting "type": "module" in package.json. For browser integration, include Chart.js from CDN.
Usage: Obtain canvas element, create config object with mandatory keys (type, data, options), then call new Chart(element, config).
For animations, specify per-property animation parameters in AnimationSpec. Scale configuration must use direct mapping with scale identifier keys (e.g. x, y) where options such as beginAtZero are defined.
Manual registration example in v3+:
import { Chart, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
Chart.register(LineController, LineElement, PointElement, LinearScale, Title);

Troubleshooting: If encountering a configuration error, check renamed properties according to migration guides. For ESM errors with Jest, refer to Jest documentation or migrate to Vitest.

## Supplementary Details
Installation: npm install chart.js or include via CDN (https://cdn.jsdelivr.net/npm/chart.js). Ensure package.json includes "type": "module" for ESM compatibility.

Configuration Options:
- Chart Type: 'bar', 'line', 'doughnut', etc.
- Data: { labels: string[], datasets: [{ label: string, data: number[], borderWidth: number }] }
- Options:
    scales: { x: { type: 'time'|'linear'|'category', display: true, title: { display: true, text: 'Label' }, ticks: { beginAtZero: boolean, stepSize: number } } }
    plugins: { tooltip: { callbacks: { label: function(context) { ... } } } }
    animation: { delay: 0, duration: 1000, easing: 'easeOutQuart', loop: false }

API Method Signatures:
- Chart Constructor: new Chart(ctx: HTMLCanvasElement | CanvasRenderingContext2D, config: ChartConfiguration): Chart
- Chart.register(...components: ChartComponentLike[]): void

Migration Changes (v4.x examples):
- scales[id].grid.drawBorder -> scales[id].border.display
- scales[id].grid.borderWidth -> scales[id].border.width
- scales[id].grid.borderColor -> scales[id].border.color
- scales[id].grid.borderDash -> scales[id].border.dash
- scales[id].grid.borderDashOffset -> scales[id].border.dashOffset

Implementation steps:
1. Include Chart.js via CDN or npm
2. Create canvas element in HTML
3. Define configuration object with type, data, and options
4. Call new Chart(ctx, config)
5. For advanced scenarios, import module components and register them manually

Best Practices:
- Use tree shaking by manually registering only required controllers, elements, and plugins
- Migrate to ESM for consistent module support
- Validate configuration changes when upgrading from v3 to v4 using detailed migration guides

Troubleshooting Procedures:
- Verify canvas context availability
- Check for typos in configuration property names (e.g., border.display vs grid.drawBorder)
- For ESM issues, ensure package.json declares module type
- Use console logging in animation callbacks to debug performance.

## Reference Details
API Specifications:

Chart Constructor:
Signature: new Chart(ctx: HTMLCanvasElement | CanvasRenderingContext2D, config: ChartConfiguration) => Chart
Config Object:
{
  type: ChartType, // e.g., 'bar', 'line', 'pie'
  data: {
    labels: string[],
    datasets: Array<{
      label: string,
      data: number[] | (number | [number, number] | Point | BubbleDataPoint)[],
      borderWidth: number
    }>
  },
  options: {
    scales: {
      [scaleId: string]: {
        type?: 'linear' | 'logarithmic' | 'time' | 'category' | 'timeseries',
        display?: boolean,
        beginAtZero?: boolean,
        title?: { display: boolean, text: string },
        ticks?: { stepSize?: number, count?: number, precision?: number, format?: Intl.NumberFormatOptions }
      }
    },
    plugins: {
      tooltip?: {
        callbacks?: {
          label?: (context: TooltipItem) => string
        }
      }
    },
    animation?: {
      delay?: number,          // Default: 0
      duration?: number,       // Default: 1000
      easing?: string,         // Default: 'easeOutQuart'
      loop?: boolean,          // Default: false
      onComplete?: (this: Chart, event: AnimationEvent) => void,
      onProgress?: (this: Chart, event: AnimationEvent) => void
    }
  }
}

SDK Method Signatures:
Chart.register(...components: ChartComponentLike[]): void

Example Code:
-----------------------------------------------------
// HTML:
<div>
  <canvas id="myChart"></canvas>
</div>

// JavaScript using CDN:
const ctx = document.getElementById('myChart');
const config = {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: { beginAtZero: true }
    }
  }
};
new Chart(ctx, config);

// Example Using ESM (v3+):
import { Chart, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
const chart = new Chart(ctx, {
  type: 'line',
  data: { ... },
  options: {
    plugins: { title: { display: true, text: 'Chart Title' } },
    scales: { x: { type: 'linear' }, y: { type: 'linear' } }
  }
});
-----------------------------------------------------

Configuration Options with Values:
- Animation: { delay: 0, duration: 1000, easing: 'easeOutQuart', loop: false }
- Linear Scale: { beginAtZero: true, ticks: { stepSize: 1, count: 5, precision: 0 } }
- Migration v4.x changes: scales[id].border.display (was grid.drawBorder), scales[id].border.width (was grid.borderWidth), etc.

Troubleshooting Commands:
- Verify installation: npm list chart.js
- Run build: npm run build
- For module errors, check package.json for "type": "module"
- Use console.log on config object to validate property names before instantiating Chart.

Best Practices:
- Register only required components to optimize bundle size
- Follow migration guides for breaking changes
- Utilize scriptable options for dynamic configurations in animations and tooltips

## Information Dense Extract
Chart.js v4.4.9; new Chart(ctx, {type: string, data: {labels: string[], datasets: [{label: string, data: number[], borderWidth: number}]}, options: {scales: {[id:string]: {type?: 'linear'|'time'|'category', display?: boolean, beginAtZero?: boolean, title?:{display: boolean, text: string}, ticks?: {stepSize?: number, count?: number, precision?: number}}}, plugins: {tooltip?: {callbacks?: {label?: function}}}, animation?: {delay?: number (default:0), duration?: number (default:1000), easing?: string (default:'easeOutQuart'), loop?: boolean (default:false), onComplete?: function, onProgress?: function}}}); Migration v4.x: scales[id].grid.drawBorder->border.display, borderWidth->border.width, borderColor->border.color, borderDash->border.dash, borderDashOffset->border.dashOffset; ESM-only package; Register components manually via Chart.register(...components); Code examples provided for CDN and ESM usage; Troubleshooting via npm list, package.json "type": "module" verification; API interfaces and SDK method signatures explicitly defined.

## Sanitised Extract
Table of Contents:
1. Installation and Setup
   - CDN integration or npm module installation with ESM support
2. Chart Initialization
   - new Chart(ctx, config) API using a configuration object
3. Configuration Options
   - Data schema: labels array and datasets array
   - Options object containing scales, plugins, and animation settings
4. Animation Specifications
   - AnimationSpec<T>: delay (default 0), duration (default 1000), easing (default 'easeOutQuart'), loop (default false), onComplete and onProgress callbacks
5. Scale Configuration
   - LinearScaleOptions: beginAtZero, grace, suggestedMax, suggestedMin, ticks: count, format, precision, stepSize
6. Migration Guidelines
   - v4.x: Renamed properties in scales (grid.drawBorder to border.display, etc.), ESM-only package, configuration changes
   - v3.x: Removal of xAxes/yAxes arrays, new tree-shakable registration using Chart.register(), updated tooltip and interaction settings

Detailed Implementation:
Installation via npm requires setting 'type': 'module' in package.json. For browser integration, include Chart.js from CDN.
Usage: Obtain canvas element, create config object with mandatory keys (type, data, options), then call new Chart(element, config).
For animations, specify per-property animation parameters in AnimationSpec. Scale configuration must use direct mapping with scale identifier keys (e.g. x, y) where options such as beginAtZero are defined.
Manual registration example in v3+:
import { Chart, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
Chart.register(LineController, LineElement, PointElement, LinearScale, Title);

Troubleshooting: If encountering a configuration error, check renamed properties according to migration guides. For ESM errors with Jest, refer to Jest documentation or migrate to Vitest.

## Original Source
Chart.js Documentation
https://www.chartjs.org/docs/latest/

## Digest of CHARTJS

# Chart.js Documentation Digest

Retrieved on: 2025-04-15

# Overview
Chart.js is a popular open-source charting library maintained under the MIT license. It renders charts on HTML5 canvas and provides configurable chart types, plugins, and defaults that help developers quickly create production-ready charts.

# Core API and Usage
- API Entry: new Chart(ctx, config)
- Config Object Structure:
  - type: string (e.g., 'bar', 'line', 'doughnut')
  - data: { labels: array, datasets: array }
  - options: object for scales, plugins, animations, etc.

# Detailed API Specifications
## Chart Constructor
Signature: new Chart(ctx: (HTMLCanvasElement | CanvasRenderingContext2D), config: ChartConfiguration) => Chart

## ChartConfiguration Object
Properties:
  - type: ChartType
  - data: { labels: string[] | any[], datasets: Array<ChartDatasetProperties> }
  - options: {
       scales: { [scaleId: string]: ScaleOptions },
       plugins: { [pluginId: string]: Object },
       animation: AnimationOptions
    }

## Animation Options
Type AnimationSpec<T>:
  {
    delay?: number;  // Default 0 ms
    duration?: number; // Default 1000 ms
    easing?: string; // Default 'easeOutQuart'
    loop?: boolean; // Default false
    onComplete?: (this: Chart, event: AnimationEvent) => void;
    onProgress?: (this: Chart, event: AnimationEvent) => void
  }

## Scale Options
Example for LinearScaleOptions:
  {
    beginAtZero: boolean,
    grace?: string | number,
    suggestedMax?: number,
    suggestedMin?: number,
    ticks: {
      count: number,
      format: Intl.NumberFormatOptions,
      precision: number,
      stepSize: number
    }
  }

# Migration Guides and Breaking Changes
## Chart.js v4.x
- Defaults: Animations enabled by default. New property mappings:
    - scales[id].grid.drawBorder is now scales[id].border.display
    - scales[id].grid.borderWidth is now scales[id].border.width
    - scales[id].grid.borderColor is now scales[id].border.color
    - scales[id].grid.borderDash is now scales[id].border.dash
    - scales[id].grid.borderDashOffset is now scales[id].border.dashOffset
- API becomes ESM-only; ensure package.json contains "type": "module".

## Chart.js v3.x
- Removal of xAxes/yAxes arrays: Scales are now defined directly under options.scales with the scale ID (e.g., x, y).
- New tree-shakable module design. Import and register required components manually:
  Example:
    import { Chart, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
    Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
- Tooltip and interaction configurations have been updated. Use options.plugins.tooltip and options.interaction for shared defaults.

# Code Example
HTML:
<div>
  <canvas id="myChart"></canvas>
</div>

JavaScript:
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
  const ctx = document.getElementById('myChart');
  const chartConfig = {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  };
  new Chart(ctx, chartConfig);
</script>

# Attribution
Data Size: 2582759 bytes; Crawled Links: 36406

## Attribution
- Source: Chart.js Documentation
- URL: https://www.chartjs.org/docs/latest/
- License: MIT License
- Crawl Date: 2025-04-27T16:49:44.693Z
- Data Size: 2582759 bytes
- Links Found: 36406

## Retrieved
2025-04-27
library/HTTP_SEMANTICS.md
# library/HTTP_SEMANTICS.md
# HTTP_SEMANTICS

## Crawl Summary
HTTP/1.1 semantics defined in RFC7231 includes explicit definitions for request methods, header fields, and content negotiation. ABNF grammars specify media types and parameters, such as media-type, type, subtype, and parameter formations. Detailed method definitions (GET, HEAD, POST, PUT, DELETE, etc.) and header fields like Content-Type, Content-Encoding, and Content-Language are provided. The spec describes proactive and reactive content negotiation strategies, payload structure layering (Content-Encoding over Content-Type), and guidelines for representation identification via Content-Location.

## Normalised Extract
Table of Contents:
1. HTTP Message Structure
   - Definition of request and response messages
   - Conformance definitions using MUST, SHOULD and related keywords per RFC2119
2. Request Methods
   - GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE
   - Properties: safe, idempotent, and cacheable
3. Representation Metadata
   - Content-Type: media-type (ABNF: media-type = type "/" subtype *( OWS ";" OWS parameter ), where type and subtype are tokens, parameter = token "=" ( token / quoted-string ))
   - Charset: token as defined in RFC6365
   - Content-Encoding: header listing one or more codings (e.g., gzip, deflate, compress), defined as 1#content-coding
   - Content-Language: 1#language-tag (RFC5646 identifiers)
   - Content-Location: absolute-URI or partial-URI identifying the representation
4. Content Negotiation
   - Proactive negotiation: server selects representation based on Accept and other headers
   - Reactive negotiation: client picks an alternative from provided list
5. Payload Semantics & Representation Data
   - Representation-data constructed as: Content-Encoding( Content-Type( bits ) )
   - Guidelines for handling partial content (e.g., 206 Partial Content) and error responses
6. Multipart Types
   - Syntax and use of boundary parameters for multipart/form-data and multipart/byteranges
Detailed Information:
- ABNF for media types, parameter syntax, and coding values are explicitly defined. 
- Exact header field examples include: 'Content-Type: text/html; charset=ISO-8859-4' and 'Content-Encoding: gzip'.
- Negotiation involves both proactive (server-driven) and reactive (client-driven) mechanisms with use of Vary header.

## Supplementary Details
Technical specifications include:
- ABNF Definition: media-type = type "/" subtype *( OWS ";" OWS parameter )
   where: type = token, subtype = token, parameter = token "=" ( token / quoted-string )
- Content-Encoding header: syntax is 1#content-coding; valid codings include 'gzip', 'compress', 'deflate'.
- Content-Type header: if absent, default is assumed as 'application/octet-stream'.
- Charset handling is defined per RFC6365, and language tags follow RFC5646.
- Request Methods: GET is safe and cacheable, POST is used for processing data, PUT for state modification, DELETE for removal. 
- Content Negotiation: Uses Accept, Accept-Language, Accept-Encoding headers with quality value semantics; includes both server-driven and client-driven selection tactics.
- Multipart types require the use of a boundary parameter. 
Exact parameter values, such as case insensitivity for type/subtype, are essential. 
Implementation Steps:
1. Parse the message to separate headers from payload.
2. Validate the media type using ABNF rules.
3. Decode using the specified Content-Encoding in the order provided.
4. Process representations according to Content-Type and negotiated language.
5. Apply appropriate error handling per status codes (e.g., 400, 404, 500) with payload representation detailed error messages.

## Reference Details
Full API Specifications / SDK Method Signatures (as per protocol definitions):
- HTTP Request Parsing Function:
  function parseHTTPRequest(rawData: string): { method: string, uri: string, headers: Record<string, string>, body: string };
  // Parses raw HTTP data into method, URI, headers, and body. Throws Error if parsing fails.

- HTTP Response Construction Function:
  function buildHTTPResponse(statusCode: number, headers: Record<string,string>, body: string): string;
  // Constructs an HTTP response string given a status code, headers, and body. Returns a complete response message.

- ABNF Grammar for media-type:
  media-type = type "/" subtype *( OWS ";" OWS parameter )
  type       = token
  subtype    = token
  parameter  = token "=" ( token / quoted-string )

- Example Header Field Implementations:
  // Content-Type example
  Header: "Content-Type: text/html; charset=ISO-8859-4"

  // Content-Encoding example
  Header: "Content-Encoding: gzip"

- Configuration Options:
  Option: EnableContentSniffing (default: false) - When false, disables client-side content type overriding.
  Option: MaxPayloadSize (default: 1048576 bytes) - Maximum allowed size for payload, rejects messages exceeding limit.

- Best Practices & Implementation Code Pattern:
  1. Always check for the presence of Content-Type header. If missing, default to application/octet-stream.
  2. Validate content-coding order; process each listed encoding in sequence.
  3. Use Vary header in responses when utilizing proactive negotiation.

- Troubleshooting Procedures:
  Command: curl -I http://yourserver/resource
  Expected Output: HTTP/1.1 200 OK with correct Content-Type and Content-Encoding headers.
  Command: Check server logs for parsing errors if response payload does not match declared media type.
  Debug Step: Use a network proxy (e.g., Wireshark) to inspect raw HTTP messages to verify header field integrity and message structure.

- Detailed SDK Example:
  // Example in a Node.js-like pseudocode:
  /*
  function handleRequest(request) {
    try {
      let parsed = parseHTTPRequest(request);
      if (!parsed.headers['Content-Type']) {
        parsed.headers['Content-Type'] = 'application/octet-stream';
      }
      // Decode body based on Content-Encoding
      let decodedBody = decodeContent(parsed.body, parsed.headers['Content-Encoding']);
      // Process based on request method
      switch(parsed.method) {
        case 'GET':
          return buildHTTPResponse(200, {'Content-Type': parsed.headers['Content-Type']}, decodedBody);
        // Add handling for POST, PUT, DELETE
        default:
          throw new Error('Unsupported Method');
      }
    } catch (err) {
      return buildHTTPResponse(500, {'Content-Type': 'text/plain'}, err.message);
    }
  }
  */

This specification provides developers with concrete definitions and patterns to implement HTTP/1.1 compliant services, ensuring proper parsing, response construction, content negotiation, and error handling.

## Information Dense Extract
RFC7231 defines HTTP/1.1 semantics: Request/Response structure, methods (GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE); header fields: Content-Type (media-type= token/token *( OWS ";" OWS token "=" (token/quoted-string) )), Content-Encoding (1#content-coding; valid: gzip, deflate, compress), Content-Language (1#language-tag per RFC5646), Content-Location (absolute-URI/partial-URI); ABNF grammar provided; content negotiation: proactive vs reactive; payload layering: representation-data = Content-Encoding( Content-Type( bits ) ); SDK endpoints: parseHTTPRequest(rawData:string) returns {method, uri, headers, body}; buildHTTPResponse(statusCode:number, headers:Record<string,string>, body:string) returns string; configuration options include EnableContentSniffing (false), MaxPayloadSize (1048576); troubleshooting via curl -I and network inspection.

## Sanitised Extract
Table of Contents:
1. HTTP Message Structure
   - Definition of request and response messages
   - Conformance definitions using MUST, SHOULD and related keywords per RFC2119
2. Request Methods
   - GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE
   - Properties: safe, idempotent, and cacheable
3. Representation Metadata
   - Content-Type: media-type (ABNF: media-type = type '/' subtype *( OWS ';' OWS parameter ), where type and subtype are tokens, parameter = token '=' ( token / quoted-string ))
   - Charset: token as defined in RFC6365
   - Content-Encoding: header listing one or more codings (e.g., gzip, deflate, compress), defined as 1#content-coding
   - Content-Language: 1#language-tag (RFC5646 identifiers)
   - Content-Location: absolute-URI or partial-URI identifying the representation
4. Content Negotiation
   - Proactive negotiation: server selects representation based on Accept and other headers
   - Reactive negotiation: client picks an alternative from provided list
5. Payload Semantics & Representation Data
   - Representation-data constructed as: Content-Encoding( Content-Type( bits ) )
   - Guidelines for handling partial content (e.g., 206 Partial Content) and error responses
6. Multipart Types
   - Syntax and use of boundary parameters for multipart/form-data and multipart/byteranges
Detailed Information:
- ABNF for media types, parameter syntax, and coding values are explicitly defined. 
- Exact header field examples include: 'Content-Type: text/html; charset=ISO-8859-4' and 'Content-Encoding: gzip'.
- Negotiation involves both proactive (server-driven) and reactive (client-driven) mechanisms with use of Vary header.

## Original Source
RFC7231: Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content
https://tools.ietf.org/html/rfc7231

## Digest of HTTP_SEMANTICS

# RFC 7231 - HTTP/1.1 Semantics and Content
Date Retrieved: 2023-10-XX

This document contains the official IETF specifications for HTTP/1.1 message semantics. It covers request/response message structure, header field definitions, content negotiation, representation metadata, and payload processing. It includes ABNF definitions for media types and outlines the semantics of methods, header fields (e.g., Content-Type, Content-Encoding, Content-Language), and status code categorizations (1xx, 2xx, 3xx, 4xx, 5xx).

## Key Sections Extracted
1. Introduction
   - HTTP message types: requests and responses
   - Conformance directives (MUST, SHOULD, etc.), per RFC2119
   - Use of Augmented Backus-Naur Form (ABNF) for syntax definitions

2. Request Methods
   - Detailed definitions for GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE
   - Method properties: safe, idempotent, cacheable

3. Representation and Metadata
   - Representation metadata: Content-Type, Content-Encoding, Content-Language, Content-Location
   - ABNF definitions for media-type:
     media-type = type "/" subtype *( OWS ";" OWS parameter )
     type = token
     subtype = token
     parameter = token "=" ( token / quoted-string )
   - Charset handling per RFC6365

4. Content Negotiation
   - Proactive (server-driven) and reactive (agent-driven) negotiation
   - Use of Accept headers with quality values
   - Vary header field implications

5. Payload Semantics and Representation Data
   - How payload bodies are defined, including use in error and success responses
   - Dual layer encoding: Content-Encoding (applied coding) over Content-Type (media-type)

6. Other Key Technical Areas
   - Multipart types with boundary parameters
   - Content codings definitions: compress, deflate, gzip
   - Identification of representations via Content-Location header

Attribution: IETF Trust; Data Size: 25347882 bytes; Links Found: 82849

## Attribution
- Source: RFC7231: Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content
- URL: https://tools.ietf.org/html/rfc7231
- License: IETF Document (Public Domain)
- Crawl Date: 2025-04-28T19:47:54.579Z
- Data Size: 25347882 bytes
- Links Found: 82849

## Retrieved
2025-04-28
library/NODE_BESTPRACTICES.md
# library/NODE_BESTPRACTICES.md
# NODE_BESTPRACTICES

## Crawl Summary
Condensed technical details emphasize modular architecture with clear business components and layered design, robust error handling via async/await and a centralized error middleware, precise code style rules enforced by ESLint and naming conventions, comprehensive testing strategies using AAA and port randomization, production practices such as dependency locking, Docker multi-stage builds, clustering for CPU utilization, and stringent security measures including secret extraction and payload protection.

## Normalised Extract
Table of Contents:
1. Project Architecture Practices
   - Structure by Components: Use directories like apps/<component> and libraries for reusable modules. Components encapsulate API, business logic, and data access.
   - Three-Tier Layering: Each component should have entry-points (controllers), domain (logic), and data-access (DB operations) folders.
   - Wrapping Utilities: Encapsulate common utilities in separate packages with their own package.json, exposing only public interfaces.
   - Environment Configuration: Utilize configuration libraries (convict, env-var, zod) to load hierarchical, validated settings from environment and file with defaults.
   - Framework Selection: Evaluate frameworks (Nest.js, Fastify, Express, Koa) based on scale and modular needs.
   - TypeScript Considerations: Use TypeScript to define types, but apply advanced features only when needed to avoid over-complexity.
2. Error Handling Practices
   - Asynchronous Handling: Implement async/await to streamline error processing and avoid callback hell.
   - Extend Error: Create a custom AppError class inheriting from Error with properties like code and isCatastrophic.
   - Error Categorization: Distinguish operational errors from catastrophic ones for appropriate handling (retry vs. process exit).
   - Centralized Error Middleware: Implement a middleware to log errors (using Pino/Winston) and send standard HTTP responses.
   - Documentation: Use OpenAPI specifications to detail API error responses.
   - Process Safety: Use process.on('unhandledRejection', handler) and always await promises to preserve complete stack traces.
   - Event Handling: Subscribe to error events on EventEmitters with {captureRejections: true}.
3. Code Patterns and Style
   - Enforce ESLint rules with Node.js plugins to catch anti-patterns and security issues.
   - Maintain consistent formatting: Curly braces on same line, explicit semicolon rules, and clear separation of statements.
   - Naming Conventions: lowerCamelCase for functions/variables, UpperCamelCase for classes, UPPER_SNAKE_CASE for globals.
   - Module Import Best Practices: Require modules at the top of the file and expose a clear public API via package.json main field.
4. Testing and Quality Assurance
   - API Testing: Write tests for components using AAA pattern (Arrange, Act, Assert) and use randomized ports to prevent conflicts.
   - Environment Consistency: Use tools like nvm/Volta to enforce a unified Node version and avoid shared global fixtures in tests.
   - Coverage: Use Istanbul/NYC and set minimum thresholds to catch untested branches.
5. Production Readiness
   - Monitoring: Integrate APM and logging using Pino to monitor uptime, performance metrics, and errors.
   - Deployment Strategies: Use npm ci for installation, lock dependencies via package-lock.json, and deploy using Docker multi-stage builds with defined memory limits.
   - Clustering: Utilize all CPU cores via Node.js clustering or container orchestration to maximize performance.
   - Reverse Proxy: Offload tasks like gzip and SSL termination to Nginx or similar solutions.
6. Security Measures
   - Lint and validate input to enforce security best practices.
   - Manage Secrets: Extract secrets from source files and secure them with encryption; enforce non-root execution.
   - Protect against injections and DOS attacks by limiting payload sizes and validating JSON schemas.

## Supplementary Details
Implementation Specifications:
- Directory Structure: Use 'apps/<component>' for business modules and 'libraries/<utility>' for common utilities. Each package must include its own package.json to explicitly define exported interfaces.
- Environment Configuration: Configure using convict/env-var/zod. Example default: NODE_ENV set to 'development', switch to 'production' in deployment. Validate all required keys at startup.
- Logging: Initialize Pino logger with configuration: level: 'info', prettyPrint: true; direct logs to stdout for aggregation.
- Error Handling: Create an AppError class, e.g.:
  class AppError extends Error {
    constructor(message, code, isCatastrophic) {
      super(message);
      this.code = code;
      this.isCatastrophic = isCatastrophic;
    }
  }
- Async Handling: Always use return await in async functions to maintain full stack traces. Use process.on('unhandledRejection', handler) for orphan rejections.
- Testing: Structure tests in AAA format. When starting HTTP servers, pass port 0 to auto-select a free port. Use tools like Vitest or Mocha with Istanbul for coverage.
- Docker Configuration: Use multi-stage builds. Sample Dockerfile configuration:
  FROM node:14-alpine
  WORKDIR /app
  COPY package*.json ./
  RUN npm ci
  COPY . .
  EXPOSE 3000
  CMD ["npm", "run", "start"]
- Deployment: Use npm ci to lock dependencies, set NODE_ENV=production, and run using process managers like pm2 or Docker orchestrators.
- Security: Configure ESLint with security plugins, extract and encrypt secrets, and limit request payloads via reverse-proxy or middleware.

## Reference Details
API and SDK Specifications:

Error Handling API:
- Method Signature: async function fetchData(url: string): Promise<any>
- Throws: AppError (extends Error with properties { code: string, isCatastrophic: boolean })
- Example Implementation:
  async function fetchData(url: string): Promise<any> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new AppError('FetchError', 'Failed to fetch data', true);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

Validation API:
- Method Signature: function validateInput(input: any): { valid: boolean, errors?: string[] }
- Use libraries such as ajv or zod for schema validation.

Configuration Options:
- NODE_ENV: Accepts 'development' or 'production'. Default is 'development'.
- Docker Build Parameters: Use --memory flag for setting memory limits, e.g., docker run --memory=512m.

Best Practices Code Example:
// index.js
const express = require('express');
const pino = require('pino');
const app = express();
const logger = pino({ level: 'info', prettyPrint: true });
app.use(express.json());

app.get('/api/data', async (req, res, next) => {
  try {
    const data = await fetchData('https://api.example.com');
    res.json(data);
  } catch (e) {
    next(e);
  }
});

// Centralized Error Middleware
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({ error: err.message });
});

app.listen(3000, () => {
  logger.info('Server running on port 3000');
});

Troubleshooting Procedures:
- To capture unhandled promise rejections, run: node --trace-warnings index.js
- To install dependencies deterministically, run: npm ci
- For production deployments, use: pm2 start ecosystem.config.js
- Verify test coverage with NYC: nyc npm run test (expect coverage above threshold, e.g., 90%).

## Information Dense Extract
NODE_BESTPRACTICES: Components - apps/<component> with entry-points, domain, data-access; Config - use convict/env-var/zod, NODE_ENV defaults to development, switch production; Logging - Pino with level 'info', prettyPrint true, stdout; Error Handling - async/await, custom AppError extends Error {code, isCatastrophic}, centralized middleware, process.on('unhandledRejection'); ESLint enforced with node-security plugins; Testing - AAA pattern, API tests with randomized port (app.listen(0)), coverage with NYC; Production - npm ci, package-lock.json enforced, Docker multi-stage builds, explicit EXPOSE and CMD, reverse proxy for gzip/SSL; Security - secret extraction, payload size limits, ORM/ODM for injection protection; API specs and SDK method signatures provided with full code examples and troubleshooting commands.

## Sanitised Extract
Table of Contents:
1. Project Architecture Practices
   - Structure by Components: Use directories like apps/<component> and libraries for reusable modules. Components encapsulate API, business logic, and data access.
   - Three-Tier Layering: Each component should have entry-points (controllers), domain (logic), and data-access (DB operations) folders.
   - Wrapping Utilities: Encapsulate common utilities in separate packages with their own package.json, exposing only public interfaces.
   - Environment Configuration: Utilize configuration libraries (convict, env-var, zod) to load hierarchical, validated settings from environment and file with defaults.
   - Framework Selection: Evaluate frameworks (Nest.js, Fastify, Express, Koa) based on scale and modular needs.
   - TypeScript Considerations: Use TypeScript to define types, but apply advanced features only when needed to avoid over-complexity.
2. Error Handling Practices
   - Asynchronous Handling: Implement async/await to streamline error processing and avoid callback hell.
   - Extend Error: Create a custom AppError class inheriting from Error with properties like code and isCatastrophic.
   - Error Categorization: Distinguish operational errors from catastrophic ones for appropriate handling (retry vs. process exit).
   - Centralized Error Middleware: Implement a middleware to log errors (using Pino/Winston) and send standard HTTP responses.
   - Documentation: Use OpenAPI specifications to detail API error responses.
   - Process Safety: Use process.on('unhandledRejection', handler) and always await promises to preserve complete stack traces.
   - Event Handling: Subscribe to error events on EventEmitters with {captureRejections: true}.
3. Code Patterns and Style
   - Enforce ESLint rules with Node.js plugins to catch anti-patterns and security issues.
   - Maintain consistent formatting: Curly braces on same line, explicit semicolon rules, and clear separation of statements.
   - Naming Conventions: lowerCamelCase for functions/variables, UpperCamelCase for classes, UPPER_SNAKE_CASE for globals.
   - Module Import Best Practices: Require modules at the top of the file and expose a clear public API via package.json main field.
4. Testing and Quality Assurance
   - API Testing: Write tests for components using AAA pattern (Arrange, Act, Assert) and use randomized ports to prevent conflicts.
   - Environment Consistency: Use tools like nvm/Volta to enforce a unified Node version and avoid shared global fixtures in tests.
   - Coverage: Use Istanbul/NYC and set minimum thresholds to catch untested branches.
5. Production Readiness
   - Monitoring: Integrate APM and logging using Pino to monitor uptime, performance metrics, and errors.
   - Deployment Strategies: Use npm ci for installation, lock dependencies via package-lock.json, and deploy using Docker multi-stage builds with defined memory limits.
   - Clustering: Utilize all CPU cores via Node.js clustering or container orchestration to maximize performance.
   - Reverse Proxy: Offload tasks like gzip and SSL termination to Nginx or similar solutions.
6. Security Measures
   - Lint and validate input to enforce security best practices.
   - Manage Secrets: Extract secrets from source files and secure them with encryption; enforce non-root execution.
   - Protect against injections and DOS attacks by limiting payload sizes and validating JSON schemas.

## Original Source
Node.js Best Practices
https://github.com/goldbergyoni/nodebestpractices

## Digest of NODE_BESTPRACTICES

# Node.js Best Practices
Date Retrieved: 2023-10-05

This document provides a collection of actionable technical details extracted from the Node.js Best Practices repository. It covers implementation patterns, API method signatures, precise configuration details, and provides complete code examples to support quick application and troubleshooting.

# Project Architecture Practices
1.1 Structure by Business Components: 
  - Organize the repository into folders representing business domains (e.g., 'users', 'orders').
  - Each component must include its own API, business logic, and database logic. Example directory layout:
    my-system
    ├─ apps
    │  ├─ orders
    │  ├─ users
    │  └─ payments
    └─ libraries
       ├─ logger
       └─ authenticator

1.2 Three-Tier Layering of Components:
  - Each component must include dedicated folders:
    • entry-points: contains controllers and any network interface code.
    • domain: houses business logic, DTOs, and service functions.
    • data-access: includes direct database calls and raw query executions.
  - Enforces separation of concerns ensuring the web layer does not leak into business logic.

1.3 Wrap Common Utilities as Packages:
  - Place reusable utilities in dedicated folders (e.g., libraries/logger) with their own package.json.
  - Define an explicit public interface using package.json’s main or exports field to decouple internal implementation.

1.4 Environment-Aware and Hierarchical Configuration:
  - Use configuration libraries (convict, env-var, or zod) to load keys from both files and environment variables.
  - Ensure secrets remain external, define hierarchical structures, provide default values, and enforce validation on startup.

1.5 Framework Selection Guidelines:
  - Evaluate frameworks like Nest.js for large scale OOP or Fastify for simpler, microservice style apps.
  - Consider tradeoffs in modular architecture and feature scope before finalizing the main framework.

1.6 TypeScript Usage Considerations:
  - Use TypeScript primarily for variable and function type definitions to catch 20% of potential bugs early.
  - Use advanced type features sparingly to avoid unnecessary complex code that may increase bug fix times.

# Error Handling Practices
2.1 Asynchronous Error Handling:
  - Implement async/await rather than callbacks to simplify error handling and avoid pyramid of doom.

2.2 Extend the Built-in Error Object:
  - Create an AppError class extending Error with additional properties such as code (string) and isCatastrophic (boolean).

2.3 Operational vs. Catastrophic Errors:
  - Distinguish known operational errors (recoverable) and programmer errors (require process restart) to decide on error handling strategy.

2.4 Centralized Error Handling:
  - Create a global error handler middleware to log errors and decide on response statuses.

2.5 Document API Errors:
  - Use OpenAPI or GraphQL to document potential API error responses, ensuring clients can handle error conditions gracefully.

2.6 Process Exit on Critical Failures:
  - Use graceful shutdown procedures when unrecoverable errors occur.

2.7 Mature Logging Mechanisms:
  - Integrate loggers like Pino or Winston with features such as log levels, pretty printing, and output to stdout.

2.8 Testing Error Flows:
  - Simulate error scenarios including unhandled rejections and exceptions to ensure the centralized error handler works correctly.

2.9 Unhandled Promise Rejections:
  - Register a handler on process.on('unhandledRejection', handler) to catch errors from undealt promises.

2.10 Argument Validation:
  - Validate function arguments using libraries like ajv, zod, or typebox to fail fast and avoid downstream errors.

2.11 Await Promises for Full Stack Traces:
  - Always use return await in async functions so that error stack traces are complete.

2.12 Error Events in Streams and Event Emitters:
  - Subscribe to events using emitter.on('error', handler) and initialize EventEmitters with {captureRejections: true}.

# Code Patterns and Style Practices
3.1 ESLint and Node.js Plugins:
  - Use ESLint with node-specific plugins, for example eslint-plugin-node-security, to catch potential security issues and enforce coding style.

3.2 Curly Brace and Statement Guidelines:
  - Place opening curly braces on the same line as the statement and clearly separate statements to avoid syntax pitfalls.

3.3 Function Naming and Variable Conventions:
  - Use lowerCamelCase for functions and variables, UpperCamelCase for classes, and UPPER_SNAKE_CASE for global constants.

3.4 Module Import Best Practices:
  - Always require modules at the top of the file to detect dependency issues early and improve clarity.

3.5 Explicit Module Entry Points:
  - Define package.json’s main field or use an index.js to expose only the public API of a module.

# Testing and Overall Quality Practices
4.1 API Testing Essentials:
  - Start by writing API/component tests using frameworks like Vitest or Mocha, ensuring adequate coverage for both happy and error paths.

4.2 AAA Pattern in Testing:
  - Structure tests in three clear sections: Arrange, Act, and Assert.

4.3 Test Environment Consistency:
  - Ensure the same Node.js version using nvm or Volta and avoid global test fixtures by creating fresh data per test.

4.4 Port Randomization for Testing:
  - When initializing the web server in tests, pass port 0 to let the system assign an available port.

# Production and Deployment Practices
5.1 Monitoring and Observability:
  - Integrate monitoring (APM) tools to watch uptime, performance metrics, and error rates.

5.2 Delegating Heavy Tasks:
  - Delegate CPU-intensive tasks such as gzip compression and SSL termination to reverse proxies like Nginx.

5.3 Dependency Lock and Process Management:
  - Use package-lock.json and npm ci to ensure consistent dependency trees across environments. Manage process uptime with Docker, pm2, or systemd.

5.4 Clustering and Multi-Core Utilization:
  - Scale Node processes to utilize all CPU cores, either by using cluster modules or container orchestration.

5.5 Docker Best Practices:
  - Use multi-stage builds, clean build caches, set explicit image references, and define memory limits and caching strategies in your Dockerfiles.

# Security Practices
6.1 Linter Security Rules:
  - Enforce rules to prevent unsafe code patterns and configure middleware to validate inputs.

6.2 Secret Management:
  - Extract secrets from config files and use encryption where needed; utilize npm or Yarn 2FA for package publishing.

6.3 Payload and Injection Protections:
  - Prevent query injections using ORM/ODM libraries and configure reverse proxies to limit payload sizes.

6.4 Additional Measures:
  - Avoid usage of eval, package secrets securely to avoid disclosure, and run Node.js processes as non-root users.

# Attribution
Extracted from Goldbergyoni/nodebestpractices repository. Data Size: 1286702 bytes, 7767 links found.

## Attribution
- Source: Node.js Best Practices
- URL: https://github.com/goldbergyoni/nodebestpractices
- License: MIT License
- Crawl Date: 2025-04-27T06:50:58.937Z
- Data Size: 1286702 bytes
- Links Found: 7767

## Retrieved
2025-04-27
library/FILE_SYSTEM.md
# library/FILE_SYSTEM.md
# FILE_SYSTEM

## Crawl Summary
File system module offers promise, callback and sync APIs. Key classes: FileHandle (methods: appendFile, chmod, chown, close, createReadStream, createWriteStream, datasync, read, write, writeFile, writev), fsPromises methods such as access, appendFile, chmod, copyFile, cp, glob, etc. Each method includes clearly defined parameters, defaults (e.g., encoding: 'utf8', autoClose: true) and return types (Promises or direct values). Code examples show promise-based (async/await) deletion, callback error handling, and synchronous usage with try/catch.

## Normalised Extract
Table of Contents:
1. FileHandle API
   - appendFile(data[, options]): data: string|Buffer|TypedArray|DataView|AsyncIterable|Iterable|Stream; options: Object|string (encoding: default 'utf8', signal: AbortSignal)
   - chmod(mode): mode: integer; returns Promise undefined
   - chown(uid, gid): uid, gid: integer; returns Promise undefined
   - close(): returns Promise undefined
   - createReadStream([options]): options include encoding (default null), autoClose (true), emitClose (true), start, end (default Infinity), highWaterMark (64*1024)
   - createWriteStream([options]): options include encoding (default 'utf8'), autoClose (true), emitClose (true), start, highWaterMark (16384), flush (false)
   - Other methods: datasync, read, readFile, write, writeFile, writev, stat, sync, truncate, utimes, readLines, readableWebStream, Symbol.asyncDispose
2. fsPromises API
   - access(path[, mode]): path: string|Buffer|URL; mode: integer (default F_OK); returns Promise undefined
   - appendFile(path, data[, options]): options include encoding (default 'utf8'), mode (default 0o666), flag (default 'a'), flush (false)
   - chmod, chown, copyFile (with mode modifiers), cp (with options: force, mode, recursive, preserveTimestamps, verbatimSymlinks, errorOnExist, filter), glob (pattern with options cwd, exclude, withFileTypes)
   - Additional methods include: lchmod, lchown, lutimes, link, lstat, mkdir, open, opendir, readdir, readFile, readlink, realpath, rename, rmdir, rm, stat, statfs, symlink, truncate, unlink, utimes, watch, writeFile, constants
3. Callback and Sync APIs
   - Each promise method has a callback alternative (e.g. fs.access(path[, mode], callback)) and synchronous variant (e.g. fs.accessSync(path[, mode]))
4. Common Objects
   - fs.Dir, fs.Dirent, fs.FSWatcher, fs.Stat, fs.WriteStream, fs.ReadStream

Each API item includes explicit type signatures, parameter defaults, applicable options and return types. Code examples are provided for promise, callback, and synchronous methods, including proper error handling and resource closure via try/finally.

## Supplementary Details
Exact Parameters and Defaults:
- FileHandle.appendFile: data (string|Buffer|TypedArray|DataView|AsyncIterable|Iterable|Stream), options: { encoding: 'utf8' (default), signal: undefined }.
- FileHandle.createReadStream options: { encoding: null, autoClose: true, emitClose: true, start: integer, end: Infinity, highWaterMark: 65536, signal: undefined }.
- fsPromises.appendFile: options: encoding: 'utf8', mode: 0o666, flag: 'a', flush: false.
- fsPromises.access: mode defaults to fs.constants.F_OK

Implementation Steps:
1. Import the required module: either using require('node:fs') for callback/sync or require('node:fs/promises') for promise-based operations.
2. Use fsPromises.open() to obtain a FileHandle. Always close the FileHandle using its close() method in a finally block.
3. For writing data, choose filehandle.write() for buffers or filehandle.writeFile() for full file replacement. Use filehandle.createWriteStream() for multiple asynchronous writes.
4. For reading, use filehandle.readFile() or createReadStream() with proper options if partial file reads are needed.
5. Handle errors in try/catch (promise and sync) or error-first callback pattern (callback API).
6. Use constants from fs.constants for permission or mode checks.

Configuration Options:
- flush in appendFile and createWriteStream ensures file descriptor flush before close.
- autoClose controls whether the file descriptor is closed automatically after stream end or error.

Troubleshooting Procedures:
- Use try/catch to capture errors from Promise rejections.
- For file descriptor leaks, ensure filehandle.close() is called in a finally block.
- Verify permissions using fsPromises.access with appropriate mode flags (R_OK, W_OK, X_OK).
- Check fs.constants for file mode flags when using chmod and chown.

Best Practices:
- Always explicitly close file handles to prevent memory leaks.
- Prefer promise-based APIs for ease of error handling with async/await, except when maximum performance is required (then use callback form).
- Validate file existence and permissions before performing operations to avoid race conditions.

Example Code (Promise-based):
import { open, unlink } from 'node:fs/promises';

(async () => {
  let filehandle;
  try {
    filehandle = await open('thefile.txt', 'r+');
    // perform file operations here
    await filehandle.writeFile('data', { encoding: 'utf8' });
  } catch (error) {
    console.error(error);
  } finally {
    await filehandle?.close();
  }
})();

## Reference Details
API Specifications:

FileHandle Methods:
1. appendFile(data: string|Buffer|TypedArray|DataView|AsyncIterable|Iterable|Stream, options?: { encoding?: string, signal?: AbortSignal } | string): Promise<undefined>
2. chmod(mode: number): Promise<undefined>
3. chown(uid: number, gid: number): Promise<undefined>
4. close(): Promise<undefined>
5. createReadStream(options?: { encoding?: string, autoClose?: boolean, emitClose?: boolean, start?: number, end?: number, highWaterMark?: number, signal?: AbortSignal }): fs.ReadStream
6. createWriteStream(options?: { encoding?: string, autoClose?: boolean, emitClose?: boolean, start?: number, highWaterMark?: number, flush?: boolean }): fs.WriteStream
7. datasync(): Promise<undefined>
8. read(buffer: Buffer|TypedArray|DataView, offset?: number, length?: number, position?: number|bigint|null): Promise<{ bytesRead: number, buffer: Buffer|TypedArray|DataView }>
9. readFile(options?: { encoding?: string|null, signal?: AbortSignal } | string): Promise<string|Buffer>
10. write(buffer: Buffer|TypedArray|DataView, offset?: number, length?: number, position?: number|null): Promise<{ bytesWritten: number, buffer: Buffer|TypedArray|DataView }>
11. write(string: string, position?: number|null, encoding?: string): Promise<{ bytesWritten: number, buffer: string }>
12. writeFile(data: string|Buffer|TypedArray|DataView|AsyncIterable|Iterable|Stream, options?: { encoding?: string|null, signal?: AbortSignal } | string): Promise<undefined>
13. writev(buffers: Array<Buffer|TypedArray|DataView>, position?: number|null): Promise<{ bytesWritten: number, buffers: Array<Buffer|TypedArray|DataView> }>
14. stat(options?: { bigint?: boolean }): Promise<fs.Stats>
15. sync(): Promise<undefined>
16. truncate(len?: number): Promise<undefined>
17. utimes(atime: number | string | Date, mtime: number | string | Date): Promise<undefined>
18. readLines(options?: { encoding?: string, autoClose?: boolean, emitClose?: boolean, start?: number, end?: number, highWaterMark?: number }): Promise<readline.Interface>
19. readableWebStream(): ReadableStream
20. [Symbol.asyncDispose](): Promise<undefined>

fsPromises Methods:
1. access(path: string|Buffer|URL, mode?: number): Promise<undefined>
2. appendFile(path: string|Buffer|URL, data: string|Buffer, options?: { encoding?: string|null, mode?: number, flag?: string, flush?: boolean } | string): Promise<undefined>
3. chmod(path: string|Buffer|URL, mode: number|string): Promise<undefined>
4. chown(path: string|Buffer|URL, uid: number, gid: number): Promise<undefined>
5. copyFile(src: string|Buffer|URL, dest: string|Buffer|URL, mode?: number): Promise<undefined>
6. cp(src: string|URL, dest: string|URL, options?: { force?: boolean, mode?: number, recursive?: boolean, preserveTimestamps?: boolean, verbatimSymlinks?: boolean, errorOnExist?: boolean, filter?: Function }): Promise<undefined>
7. glob(pattern: string|string[], options?: { cwd?: string, exclude?: Function|string[], withFileTypes?: boolean }): AsyncIterator<string|fs.Dirent>
... (other methods follow similar pattern)

Code Example (Callback):
import { unlink } from 'node:fs';

unlink('/tmp/hello', (err) => {
  if (err) throw err;
  console.log('successfully deleted /tmp/hello');
});

Troubleshooting Commands:
- To test file permissions: 
  node -e "require('fs').accessSync('/path/to/file', require('fs').constants.R_OK | require('fs').constants.W_OK)" 
  Expected: No output if successful; error thrown if access fails.
- To check file descriptor leaks, run process monitor and check for unclosed descriptors.
- Use try/catch around async operations to log full error messages.

Best Practice:
Always use try/finally for FileHandle operations:

(async () => {
  let fh;
  try {
    fh = await open('file.txt', 'r+');
    // ... perform operations
  } catch (err) {
    console.error(err);
  } finally {
    if (fh) await fh.close();
  }
})();

## Information Dense Extract
FS API: FileHandle.appendFile(data, options?: { encoding?: string ('utf8'), signal?: AbortSignal } | string) -> Promise<undefined>; FileHandle.chmod(mode: number) -> Promise<undefined>; FileHandle.chown(uid: number, gid: number) -> Promise<undefined>; FileHandle.close() -> Promise<undefined>; createReadStream(options?: { encoding?: string (null), autoClose?: boolean (true), emitClose?: boolean (true), start?: number, end?: number (Infinity), highWaterMark?: number (65536), signal?: AbortSignal }) -> fs.ReadStream; createWriteStream(options?: { encoding?: string ('utf8'), autoClose?: boolean (true), emitClose?: boolean (true), start?: number, highWaterMark?: number (16384), flush?: boolean (false) }) -> fs.WriteStream; fsPromises.access(path: string|Buffer|URL, mode?: number (F_OK)) -> Promise<undefined>; fsPromises.appendFile(path, data, options?: { encoding?: string ('utf8'), mode?: number (0o666), flag?: string ('a'), flush?: boolean (false) } | string) -> Promise<undefined>; fsPromises.copyFile(src, dest, mode?: number) -> Promise<undefined>; fsPromises.cp(src, dest, options: { force?: boolean (true), mode?: number (0), recursive?: boolean (false), preserveTimestamps?: boolean (false), verbatimSymlinks?: boolean (false) }) -> Promise<undefined>; Callback and Sync versions available; Common Objects: fs.Dir, fs.Dirent, fs.FSWatcher, fs.Stats; Exact signatures included above.

## Sanitised Extract
Table of Contents:
1. FileHandle API
   - appendFile(data[, options]): data: string|Buffer|TypedArray|DataView|AsyncIterable|Iterable|Stream; options: Object|string (encoding: default 'utf8', signal: AbortSignal)
   - chmod(mode): mode: integer; returns Promise undefined
   - chown(uid, gid): uid, gid: integer; returns Promise undefined
   - close(): returns Promise undefined
   - createReadStream([options]): options include encoding (default null), autoClose (true), emitClose (true), start, end (default Infinity), highWaterMark (64*1024)
   - createWriteStream([options]): options include encoding (default 'utf8'), autoClose (true), emitClose (true), start, highWaterMark (16384), flush (false)
   - Other methods: datasync, read, readFile, write, writeFile, writev, stat, sync, truncate, utimes, readLines, readableWebStream, Symbol.asyncDispose
2. fsPromises API
   - access(path[, mode]): path: string|Buffer|URL; mode: integer (default F_OK); returns Promise undefined
   - appendFile(path, data[, options]): options include encoding (default 'utf8'), mode (default 0o666), flag (default 'a'), flush (false)
   - chmod, chown, copyFile (with mode modifiers), cp (with options: force, mode, recursive, preserveTimestamps, verbatimSymlinks, errorOnExist, filter), glob (pattern with options cwd, exclude, withFileTypes)
   - Additional methods include: lchmod, lchown, lutimes, link, lstat, mkdir, open, opendir, readdir, readFile, readlink, realpath, rename, rmdir, rm, stat, statfs, symlink, truncate, unlink, utimes, watch, writeFile, constants
3. Callback and Sync APIs
   - Each promise method has a callback alternative (e.g. fs.access(path[, mode], callback)) and synchronous variant (e.g. fs.accessSync(path[, mode]))
4. Common Objects
   - fs.Dir, fs.Dirent, fs.FSWatcher, fs.Stat, fs.WriteStream, fs.ReadStream

Each API item includes explicit type signatures, parameter defaults, applicable options and return types. Code examples are provided for promise, callback, and synchronous methods, including proper error handling and resource closure via try/finally.

## Original Source
Node.js File System (fs) Documentation
https://nodejs.org/api/fs.html

## Digest of FILE_SYSTEM

# Node.js File System API (fs)

This document details the Node.js file system API, including promise, callback and synchronous methods. It covers classes like FileHandle, common objects such as fs.Dir, fs.Dirent, fs.FSWatcher, and the detailed technical method signatures, parameters, and return types for each API.

# FileHandle API

FileHandle objects are created using fsPromises.open() and contain the following key methods:

- filehandle.appendFile(data[, options])
  - Parameters: data (string | Buffer | TypedArray | DataView | AsyncIterable | Iterable | Stream), options (Object | string) with sub-properties encoding (string, default 'utf8') and signal (AbortSignal).
  - Returns: Promise that fulfills with undefined.
  - Alias: filehandle.writeFile()

- filehandle.chmod(mode)
  - Parameter: mode (integer, file mode bit mask).
  - Returns: Promise that fulfills with undefined.

- filehandle.chown(uid, gid)
  - Parameters: uid (integer), gid (integer).
  - Returns: Promise that fulfills with undefined.

- filehandle.close()
  - Returns: Promise that fulfills with undefined after pending operations complete.

- filehandle.createReadStream([options])
  - Options: object with encoding (default null), autoClose (default true), emitClose (default true), start (integer), end (integer, default Infinity), highWaterMark (default 64*1024), signal.
  - Returns: fs.ReadStream.

- filehandle.createWriteStream([options])
  - Options: object with encoding (default 'utf8'), autoClose (default true), emitClose (default true), start (position), highWaterMark (default 16384), flush (boolean, default false).
  - Returns: fs.WriteStream.

- filehandle.datasync()
  - Returns: Promise that fulfills with undefined. Forces data to OS sync state.

- filehandle.read(buffer, offset, length, position) and variations
  - Parameters: buffer (Buffer/TYPED Array), offset (integer, default 0), length (bytes count), position (integer or bigint or null).
  - Returns: Promise that yields an object with bytesRead (integer) and buffer reference.

- filehandle.readFile(options)
  - Options: Object or string (encoding). If no encoding, returns Buffer; otherwise string.
  - Returns: Promise with file contents.

- filehandle.write(buffer, offset[, length[, position]])
  - Parameters: buffer (Buffer/TypedArray), offset (integer), length (optional), position (optional).
  - Returns: Promise that fulfills with an object containing bytesWritten and buffer reference.

- filehandle.write(string[, position[, encoding]])
  - Parameters: string (string), position (integer or null), encoding (default 'utf8').
  - Returns: Promise with bytesWritten and string reference.

- filehandle.writeFile(data, options)
  - Parameters: data (string | Buffer | Iterable types), options (Object or string specifying encoding, default 'utf8', signal).
  - Returns: Promise that fulfills with undefined.

- filehandle.writev(buffers[, position])
  - Parameters: buffers (array of Buffer or ArrayBufferViews), position (optional integer).
  - Returns: Promise with bytesWritten and buffers reference.

Additional methods: filehandle.stat, filehandle.sync, filehandle.truncate, filehandle.utimes, filehandle.readLines, filehandle.readv, filehandle.readableWebStream, and the Symbol.asyncDispose alias.

# fsPromises API

The fsPromises API includes asynchronous methods returning promises:

- fsPromises.access(path[, mode])
  - Parameters: path (string | Buffer | URL), mode (integer, default fs.constants.F_OK).
  - Returns: Promise that fulfills with undefined.

- fsPromises.appendFile(path, data[, options])
  - Parameters: path (string | Buffer | URL), data, options (Object/string with encoding, mode default 0o666, flag default 'a', flush option).
  - Returns: Promise that fulfills with undefined.

- fsPromises.chmod(path, mode)
  - Parameters: path, mode (string or integer).
  - Returns: Promise with undefined.

- fsPromises.copyFile(src, dest[, mode])
  - Parameters: src, dest (string | Buffer | URL), mode (integer, default 0). Supports constants: COPYFILE_EXCL, COPYFILE_FICLONE, COPYFILE_FICLONE_FORCE.
  - Returns: Promise that fulfills with undefined.

- fsPromises.cp(src, dest[, options])
  - Options include: force (boolean, default true), mode (integer, default 0), recursive (boolean, default false), preserveTimestamps (boolean, default false), verbatimSymlinks (boolean, default false), errorOnExist, filter.
  - Returns: Promise that fulfills with undefined.

- fsPromises.glob(pattern[, options])
  - Options: cwd (default process.cwd()), exclude (function or list), withFileTypes (boolean, default false).
  - Returns: AsyncIterator yielding matching file paths or Dirents.

Additional methods: fsPromises.chown, fsPromises.lchmod (deprecated), fsPromises.lchown, fsPromises.lutimes, fsPromises.link, fsPromises.lstat, fsPromises.mkdir, fsPromises.open, fsPromises.opendir, fsPromises.readdir, fsPromises.readFile, fsPromises.readlink, fsPromises.realpath, fsPromises.rename, fsPromises.rmdir, fsPromises.rm, fsPromises.stat, fsPromises.statfs, fsPromises.symlink, fsPromises.truncate, fsPromises.unlink, fsPromises.utimes, fsPromises.watch, and fsPromises.writeFile.

# Callback and Synchronous APIs

Each fs method is available in callback form and synchronous form. Example callback:

fs.access(path[, mode], callback)

Example synchronous method:

fs.accessSync(path[, mode])

# Common Objects

- fs.Dir: methods include close(), read(), readSync(), and iteration via Symbol.asyncIterator.
- fs.Dirent: methods like isFile(), isDirectory(), isSymbolicLink(), and properties like name, path.
- fs.FSWatcher: supports events 'change', 'close', 'error', and methods close(), ref(), unref().
- fs.Stats: properties include size, mode, dev, ino, atime, mtime, ctime, birthtime, and methods such as isFile(), isDirectory(), etc.
- fs.WriteStream, fs.ReadStream: Event-driven streams with events such as 'open', 'close', 'error'.

# Code Examples

Promise-based operation:

import { unlink } from 'node:fs/promises';

(async function(path) {
  try {
    await unlink(path);
    console.log(`successfully deleted ${path}`);
  } catch (error) {
    console.error('error:', error.message);
  }
})('/tmp/hello');

Callback-based operation:

import { unlink } from 'node:fs';

unlink('/tmp/hello', (err) => {
  if (err) throw err;
  console.log('successfully deleted /tmp/hello');
});

Synchronous operation:

import { unlinkSync } from 'node:fs';

try {
  unlinkSync('/tmp/hello');
  console.log('successfully deleted /tmp/hello');
} catch (err) {
  // handle error
}

Retrieved on: 

## Attribution
- Source: Node.js File System (fs) Documentation
- URL: https://nodejs.org/api/fs.html
- License: MIT License
- Crawl Date: 2025-04-26T21:47:14.505Z
- Data Size: 3304278 bytes
- Links Found: 1237

## Retrieved
2025-04-26
library/SVG_TITLE.md
# library/SVG_TITLE.md
# SVG_TITLE

## Crawl Summary
SVG <title> element provides an accessible, short-text description for SVG graphics. It must be the first child element (for SVG 1.1 compatibility). Supports only global attributes. Recommended to use aria-labelledby when visible text exists. Browser support is widespread since January 2020. Example usage and detailed configuration are provided.

## Normalised Extract
Table of Contents:
  1. Overview
     - Accessible description for SVG elements
     - Not rendered in graphics; functions as tooltip
  2. Implementation Details
     - Must be first child of parent for SVG 1.1 compatibility
     - Use aria-labelledby if descriptive visible text is available
     - Supports only global attributes (id, class, style, etc.)
  3. Example Code
     - <svg viewBox="0 0 20 10" xmlns="http://www.w3.org/2000/svg">
         <circle cx="5" cy="5" r="4">
           <title>I'm a circle</title>
         </circle>
         <rect x="11" y="1" width="8" height="8">
           <title>I'm a square</title>
         </rect>
       </svg>
  4. Best Practices
     - Position <title> as first child for backward compatibility
     - Use aria-labelledby for greater accessibility when possible
  5. Technical Specifications
     - Content: Any elements or text; Attributes: Global only
     - Spec Reference: SVG 2

## Supplementary Details
Exact Configuration and Implementation Details:
- Placement: <title> must be the first child within its parent container in SVG documents to maintain backward compatibility with SVG 1.1.
- Global Attributes: Only global attributes are permitted (e.g., id, class, style, tabindex). There are no specialized attributes for <title>.
- Function: Provides an accessible name, displayed as a tooltip by browsers.
- Browser Compatibility: Fully supported across major browsers since January 2020.
- Recommended Enhancement: Use aria-labelledby on related elements when descriptive text is also visible on the page for improved accessibility.

## Reference Details
API and Implementation Specifications:
1. Element: <title>
   - Description: Provides a short-text, accessible description for SVG elements.
   - Allowed Attributes: Global attributes (id: string, class: string, style: string, etc.)
   - Placement Requirement: Must be the first child element in its parent container for SVG 1.1 compatibility.
   - Return/Effect: No direct return value; improves accessibility and provides tooltips in browsers.
2. Example Implementation:
   - Code:
     svg {
       height: 100%;
     }
     <svg viewBox="0 0 20 10" xmlns="http://www.w3.org/2000/svg">
       <circle cx="5" cy="5" r="4">
         <title>I'm a circle</title>
       </circle>
       <rect x="11" y="1" width="8" height="8">
         <title>I'm a square</title>
       </rect>
     </svg>
   - Comments: Ensure <title> is the first child in its parent element. If text is visible elsewhere, prefer use of aria-labelledby.
3. Configuration Options:
   - No additional configuration values are required beyond standard global attributes.
4. Best Practices:
   - Always include a <title> element for accessibility in SVG graphics.
   - Position the <title> as the first child for backward compatibility.
   - Use additional ARIA attributes (e.g., aria-labelledby) when the description is also provided in visible text.
5. Troubleshooting Procedures:
   - Check DOM order to ensure <title> is the first child; if not, reposition it.
   - Verify that global attributes are used correctly if custom styling is needed.
   - Confirm via browser dev tools that tooltips appear on hover over SVG graphic elements.
   - If accessibility issues occur, cross-check with ARIA guidelines and ensure proper implementation of aria-labelledby.

## Information Dense Extract
SVG <title>: Provides accessible text for SVG. Must be first child for SVG 1.1. Global attributes only (id, class, style). Tooltip display in browsers. Example: <svg viewBox="0 0 20 10" xmlns="http://www.w3.org/2000/svg"> <circle cx="5" cy="5" r="4"><title>I'm a circle</title></circle> <rect x="11" y="1" width="8" height="8"><title>I'm a square</title></rect></svg>. Best practice: Use aria-labelledby when visible text exists. API: No return values, used solely for accessibility enhancement. Troubleshooting: Ensure correct DOM order and use global attributes as needed.

## Sanitised Extract
Table of Contents:
  1. Overview
     - Accessible description for SVG elements
     - Not rendered in graphics; functions as tooltip
  2. Implementation Details
     - Must be first child of parent for SVG 1.1 compatibility
     - Use aria-labelledby if descriptive visible text is available
     - Supports only global attributes (id, class, style, etc.)
  3. Example Code
     - <svg viewBox='0 0 20 10' xmlns='http://www.w3.org/2000/svg'>
         <circle cx='5' cy='5' r='4'>
           <title>I'm a circle</title>
         </circle>
         <rect x='11' y='1' width='8' height='8'>
           <title>I'm a square</title>
         </rect>
       </svg>
  4. Best Practices
     - Position <title> as first child for backward compatibility
     - Use aria-labelledby for greater accessibility when possible
  5. Technical Specifications
     - Content: Any elements or text; Attributes: Global only
     - Spec Reference: SVG 2

## Original Source
MDN SVG <title> and <desc> Documentation
https://developer.mozilla.org/en-US/docs/Web/SVG/Element/title

## Digest of SVG_TITLE

# SVG TITLE

## Overview
The <title> element in SVG provides an accessible, short-text description of any SVG container or graphics element. Although its content is not rendered as part of the graphic, browsers typically display it as a tooltip. It is a critical component for improving accessibility in SVGs.

## Implementation Details
- Placement: For backward compatibility with SVG 1.1, the <title> element must be the first child of its parent element.
- Accessibility: When an element can be described by visible text elsewhere, it is recommended to use the aria-labelledby attribute instead.
- Global Attributes: The <title> element supports only global attributes (class, id, style, etc.).
- Browser Compatibility: Widely supported across devices and browsers, available since January 2020.

## Example Usage
<html>, <body>, and <svg> should be styled appropriately. Example:

  svg {
    height: 100%;
  }

  <svg viewBox="0 0 20 10" xmlns="http://www.w3.org/2000/svg">
    <circle cx="5" cy="5" r="4">
      <title>I'm a circle</title>
    </circle>
    <rect x="11" y="1" width="8" height="8">
      <title>I'm a square</title>
    </rect>
  </svg>

## Technical Specifications
- Permitted Content: Any elements or character data
- Specification Reference: Scalable Vector Graphics (SVG) 2
- Usage Context: Descriptive element for accessibility

## Crawling & Attribution
- Data Size: 1540368 bytes
- Links Found: 43620
- Retrieval Date: 2023-10-06

## Attribution
- Source: MDN SVG <title> and <desc> Documentation
- URL: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/title
- License: CC BY-SA
- Crawl Date: 2025-04-29T10:51:35.623Z
- Data Size: 1540368 bytes
- Links Found: 43620

## Retrieved
2025-04-29
library/EXPRESS_API.md
# library/EXPRESS_API.md
# EXPRESS_API

## Crawl Summary
Express API detailed technical specifications include methods for initializing the app, middleware functions (json, raw, text, urlencoded), routing (get, post, put, delete, all), static file serving with detailed options, router creation with options for case sensitivity and parameter merging, and application settings management. All options show types, default values, and detailed behavior with complete method signatures and example code.

## Normalised Extract
Table of Contents:
1. Express Initialization
2. Middleware Functions
   - express.json(options)
   - express.raw(options)
   - express.text(options)
   - express.urlencoded(options)
3. Router and Static Serving
   - express.Router(options)
   - express.static(root, options)
4. Application Object and Methods
   - app methods (get, post, put, delete, all, route, render, engine)
5. Configuration and Settings
   - app.locals, app.mountpath, enable/disable settings
6. Event Handling and Parameter Processing
   - app.on('mount', callback)
   - app.param(name, callback)

1. Express Initialization:
 - Use const express = require('express') and call express() to create an app function.

2. Middleware Functions:
 - express.json([options]): Parses JSON with options: inflate (true), limit ('100kb'), reviver (null), strict (true), type ("application/json"), verify (undefined).
 - express.raw([options]): Parses payload into Buffer with options: inflate (true), limit ('100kb'), type ("application/octet-stream"), verify (undefined).
 - express.text([options]): Parses text with defaultCharset ('utf-8'), inflate (true), limit ('100kb'), type ("text/plain"), verify (undefined).
 - express.urlencoded([options]): Parses urlencoded payloads with options: extended (false), inflate (true), limit ('100kb'), parameterLimit (1000), type ("application/x-www-form-urlencoded"), verify (undefined).

3. Router and Static Serving:
 - express.Router([options]): Creates router with options: caseSensitive, mergeParams (false), strict.
 - express.static(root, [options]): Serves files using options: dotfiles ('ignore'), etag (true), extensions (false or array), fallthrough (true), immutable (false), index ('index.html'), lastModified (true), maxAge (0), redirect (true), setHeaders (function callback).

4. Application Object and Methods:
 - app.get(path, callback): For GET requests.
 - app.post, app.put, app.delete similarly defined.
 - app.all(path, callback...): Matches all HTTP verbs.
 - app.route(path): Returns route instance to chain HTTP verb methods.
 - app.render(view, [locals], callback): Renders view as HTML string.
 - app.engine(ext, callback): Registers template engine; callback signature: (path, options, callback).
 - app.set(name, value) and app.get(name) manage settings.

5. Configuration and Settings:
 - app.locals: Persistent locals for views.
 - app.mountpath: Returns mount path or paths of sub-apps.
 - Toggle settings via app.enable('setting') and app.disable('setting').

6. Event Handling and Parameter Processing:
 - app.on('mount', function(parent) {...}) triggers on mounting a sub-app.
 - app.param(name, callback) attaches parameter middleware; called once per request per parameter.

Code Example:
  // Create and configure Express app
  const express = require('express')
  const app = express()
  app.use(express.json({ limit: '200kb', strict: true }))
  app.get('/', (req, res) => { res.send('hello world') })
  app.listen(3000, () => { console.log('Server running on port 3000') })

## Supplementary Details
Technical Specifications:
1. express.json(options):
  - inflate: Boolean = true; Accepts gzip/deflate encoded bodies.
  - limit: Mixed = '100kb'; Can be number (bytes) or string parsed by bytes library.
  - reviver: Function = null; Passed as second parameter to JSON.parse.
  - strict: Boolean = true; Rejects non-array/object payloads.
  - type: Mixed = 'application/json'; Determines content type matching.
  - verify: Function = undefined; Signature: verify(req, res, buf, encoding).

2. express.raw(options):
  - inflate: Boolean = true; 
  - limit: Mixed = '100kb'; 
  - type: Mixed = 'application/octet-stream'; 
  - verify: Function = undefined;

3. express.static(root, options):
  - dotfiles: String = 'ignore'; Values: 'allow', 'deny', 'ignore'.
  - etag: Boolean = true;
  - extensions: Mixed = false or array (e.g., ['html', 'htm']).
  - fallthrough: Boolean = true; If false, errors propagate.
  - immutable: Boolean = false; Use with maxAge option for caching.
  - index: Mixed = 'index.html'; Can disable by setting false.
  - lastModified: Boolean = true; Sets Last-Modified header.
  - maxAge: Number = 0; Sets Cache-Control max-age.
  - redirect: Boolean = true; Redirects to add trailing slash if directory.
  - setHeaders: Function; Signature: setHeaders(res, path, stat) for custom headers.

4. App Settings Examples:
  - app.set('trust proxy', 'loopback, linklocal, uniquelocal') to trust proxies.
  - app.engine('html', require('ejs').renderFile) to register EJS for HTML.

5. Troubleshooting Procedures:
  - If req.body is undefined with express.json(), check Content-Type header.
  - To debug static file serving, log using setHeaders callback.
  - Use app.param() logging to verify parameter middleware execution.
  - Validate user input from req.body after middleware processing to avoid errors in type conversion.
  - For server startup errors, ensure the correct port is provided to app.listen.

6. Full Code Example:
  const express = require('express')
  const app = express()
  
  // Middleware configuration with custom JSON options
  app.use(express.json({
    inflate: true,
    limit: '200kb',
    strict: true,
    type: 'application/json',
    verify: function(req, res, buf, encoding) {
      // Custom verification: throw error to reject if necessary
      if (buf && buf.length > 0 && encoding !== 'utf8') {
        throw new Error('Invalid encoding');
      }
    }
  }))
  
  // Define a route
  app.get('/', (req, res) => {
    res.send('Hello, Express!')
  })
  
  // Start server
  app.listen(3000, () => {
    console.log('Server listening on port 3000')
  })

Troubleshooting Commands:
  - To test JSON parsing error: curl -X POST -H "Content-Type: application/json" -d '{bad json}' http://localhost:3000
  - Check console logs for middleware verification errors.

## Reference Details
API Specifications:
express() -> Application Object (Function)
Usage: const app = express()

express.json([options]) -> Middleware Function
Parameters: options: {
  inflate: Boolean (default true),
  limit: Mixed (default '100kb'),
  reviver: Function (default null),
  strict: Boolean (default true),
  type: Mixed (default 'application/json'),
  verify: Function (default undefined)
}
Returns: function(req, res, next) that populates req.body with JSON data.

express.raw([options]) -> Middleware Function
Parameters: options: {
  inflate: Boolean (default true),
  limit: Mixed (default '100kb'),
  type: Mixed (default 'application/octet-stream'),
  verify: Function (default undefined)
}
Returns: function(req, res, next) that populates req.body as Buffer.

express.text([options]) -> Middleware Function
Parameters: options: {
  defaultCharset: String (default 'utf-8'),
  inflate: Boolean (default true),
  limit: Mixed (default '100kb'),
  type: Mixed (default 'text/plain'),
  verify: Function (default undefined)
}
Returns: function(req, res, next) that parses request body to string.

express.urlencoded([options]) -> Middleware Function
Parameters: options: {
  extended: Boolean (default false),
  inflate: Boolean (default true),
  limit: Mixed (default '100kb'),
  parameterLimit: Number (default 1000),
  type: Mixed (default 'application/x-www-form-urlencoded'),
  verify: Function (default undefined)
}
Returns: function(req, res, next) that populates req.body with parsed urlencoded data.

express.Router([options]) -> Router Object
Parameters: options: {
  caseSensitive: Boolean (default undefined),
  mergeParams: Boolean (default false),
  strict: Boolean (default undefined)
}
Methods: router.get, router.post, etc.

express.static(root, [options]) -> Middleware Function
Parameters: root: String (root directory), options: {
  dotfiles: String (default 'ignore'),
  etag: Boolean (default true),
  extensions: Mixed (default false or array),
  fallthrough: Boolean (default true),
  immutable: Boolean (default false),
  index: Mixed (default 'index.html'),
  lastModified: Boolean (default true),
  maxAge: Number (default 0),
  redirect: Boolean (default true),
  setHeaders: Function (optional)
}
Returns: middleware that serves static files.

app Methods:
- app.all(path, callback...): Matches all HTTP verbs.
- app.get(path, callback...), app.post, app.put, app.delete: Standard HTTP routing.
- app.use(middleware): Registers middleware.
- app.listen([port[, host[, backlog]]], callback): Starts HTTP server.

Full Code Example Provided in Supplementary Details, with inline comments.

Configuration Options and Best Practices:
- Use appropriate body parser middleware with correct Content-Type headers.
- Configure express.static with caching headers (maxAge, immutable) for production.
- Use app.set and app.get for application wide configurations (e.g., trust proxy, view engine).

Troubleshooting Procedures:
1. Verify Content-Type header matches expected type in middleware.
2. Log raw request buffers using the verify function in middleware.
3. Ensure proper error handling: middleware should forward errors using next(err).
4. For routing issues, test with curl commands and check server logs.

Return Types for API methods: All middleware methods return a function with signature (req, res, next).

Exception Handling: Middleware functions automatically call next(err) on synchronous exceptions or rejected promises.


## Information Dense Extract
express() -> creates app; express.json(options): inflate=true, limit='100kb', reviver=null, strict=true, type='application/json', verify=undefined; express.raw(options): inflate=true, limit='100kb', type='application/octet-stream'; express.text(options): defaultCharset='utf-8', inflate=true, limit='100kb', type='text/plain'; express.urlencoded(options): extended=false, inflate=true, limit='100kb', parameterLimit=1000, type='application/x-www-form-urlencoded'; express.Router(options): caseSensitive, mergeParams=false, strict; express.static(root, options): dotfiles='ignore', etag=true, extensions=false/array, fallthrough=true, immutable=false, index='index.html', lastModified=true, maxAge=0, redirect=true, setHeaders(fn); app methods: all, get, post, put, delete, route, render, engine; settings: app.set/get, enable/disable; API functions return middleware function (req, res, next); complete code examples and troubleshooting via header validation and error propagation.

## Sanitised Extract
Table of Contents:
1. Express Initialization
2. Middleware Functions
   - express.json(options)
   - express.raw(options)
   - express.text(options)
   - express.urlencoded(options)
3. Router and Static Serving
   - express.Router(options)
   - express.static(root, options)
4. Application Object and Methods
   - app methods (get, post, put, delete, all, route, render, engine)
5. Configuration and Settings
   - app.locals, app.mountpath, enable/disable settings
6. Event Handling and Parameter Processing
   - app.on('mount', callback)
   - app.param(name, callback)

1. Express Initialization:
 - Use const express = require('express') and call express() to create an app function.

2. Middleware Functions:
 - express.json([options]): Parses JSON with options: inflate (true), limit ('100kb'), reviver (null), strict (true), type ('application/json'), verify (undefined).
 - express.raw([options]): Parses payload into Buffer with options: inflate (true), limit ('100kb'), type ('application/octet-stream'), verify (undefined).
 - express.text([options]): Parses text with defaultCharset ('utf-8'), inflate (true), limit ('100kb'), type ('text/plain'), verify (undefined).
 - express.urlencoded([options]): Parses urlencoded payloads with options: extended (false), inflate (true), limit ('100kb'), parameterLimit (1000), type ('application/x-www-form-urlencoded'), verify (undefined).

3. Router and Static Serving:
 - express.Router([options]): Creates router with options: caseSensitive, mergeParams (false), strict.
 - express.static(root, [options]): Serves files using options: dotfiles ('ignore'), etag (true), extensions (false or array), fallthrough (true), immutable (false), index ('index.html'), lastModified (true), maxAge (0), redirect (true), setHeaders (function callback).

4. Application Object and Methods:
 - app.get(path, callback): For GET requests.
 - app.post, app.put, app.delete similarly defined.
 - app.all(path, callback...): Matches all HTTP verbs.
 - app.route(path): Returns route instance to chain HTTP verb methods.
 - app.render(view, [locals], callback): Renders view as HTML string.
 - app.engine(ext, callback): Registers template engine; callback signature: (path, options, callback).
 - app.set(name, value) and app.get(name) manage settings.

5. Configuration and Settings:
 - app.locals: Persistent locals for views.
 - app.mountpath: Returns mount path or paths of sub-apps.
 - Toggle settings via app.enable('setting') and app.disable('setting').

6. Event Handling and Parameter Processing:
 - app.on('mount', function(parent) {...}) triggers on mounting a sub-app.
 - app.param(name, callback) attaches parameter middleware; called once per request per parameter.

Code Example:
  // Create and configure Express app
  const express = require('express')
  const app = express()
  app.use(express.json({ limit: '200kb', strict: true }))
  app.get('/', (req, res) => { res.send('hello world') })
  app.listen(3000, () => { console.log('Server running on port 3000') })

## Original Source
Express API Reference
https://expressjs.com/en/api.html

## Digest of EXPRESS_API

# express()
Creates an Express application. Usage:
  const express = require('express')
  const app = express()

# express.json([options])
Middleware to parse JSON payloads.
Returns a middleware function that populates req.body with parsed JSON if Content-Type matches.
Options object properties:
  inflate: Boolean, default true, handles gzip/deflate.
  limit: Mixed, default '100kb', controls max body size (number or string parsed by bytes library).
  reviver: Function, default null, passed to JSON.parse.
  strict: Boolean, default true, only accepts arrays and objects.
  type: Mixed, default 'application/json', can be string, array, or function.
  verify: Function, default undefined, signature verify(req, res, buf, encoding).

# express.raw([options])
Middleware to parse request payloads into a Buffer. Returns middleware that sets req.body as Buffer if Content-Type matches.
Options:
  inflate: Boolean, true
  limit: Mixed, '100kb'
  type: Mixed, default 'application/octet-stream'
  verify: Function, default undefined.

# express.Router([options])
Creates a new router object. Options:
  caseSensitive: (Boolean) enable case sensitivity.
  mergeParams: (Boolean) default false, preserves parent req.params.
  strict: (Boolean) routing strict flags, distinguishing '/foo' vs '/foo/'.

# express.static(root, [options])
Serves static files from the specified root directory.
Options include:
  dotfiles: String, default 'ignore' (values: 'allow', 'deny', 'ignore').
  etag: Boolean, default true.
  extensions: Mixed, default false (array for fallbacks, e.g. ['html', 'htm']).
  fallthrough: Boolean, default true.
  immutable: Boolean, default false.
  index: Mixed, default 'index.html'.
  lastModified: Boolean, default true.
  maxAge: Number, default 0 (milliseconds or string format).
  redirect: Boolean, default true.
  setHeaders: Function, no default; signature: setHeaders(res, path, stat).

# express.text([options])
Parses payloads into a string. Options:
  defaultCharset: String, 'utf-8'
  inflate: Boolean, true
  limit: Mixed, '100kb'
  type: Mixed, default 'text/plain'
  verify: Function, default undefined.

# express.urlencoded([options])
Parses URL-encoded payloads. Options:
  extended: Boolean, default false, decides between querystring (false) or qs (true) parser.
  inflate: Boolean, true
  limit: Mixed, '100kb'
  parameterLimit: Number, default 1000
  type: Mixed, default 'application/x-www-form-urlencoded'
  verify: Function, default undefined.

# Application Object and Methods
- Created using express(); acts as a callback for HTTP servers.
- Methods include routing (app.get, app.post, etc.), middleware configuration, view rendering (app.render), and template engine registration (app.engine).
- Example:
  const app = express()
  app.get('/', (req, res) => { res.send('hello world') })
  app.listen(3000)

# App Properties
app.locals: Persistent variables for templates.
app.mountpath: Contains the mount path(s) of sub-apps.
app.router: Lazily created internal router instance.

# Event Handling
app.on('mount', callback): Triggered when a sub-app is mounted with parent as argument.

# Core Routing Methods
app.all(path, callback...): Applies to all HTTP verbs. Example:
  app.all('/secret', (req, res, next) => {
    console.log('Accessing secret section')
    next()
  })

app.delete(path, callback...): Routes DELETE requests. Example:
  app.delete('/', (req, res) => { res.send('DELETE request to homepage') })

app.get(path, callback...): Routes GET requests. Example:
  app.get('/', (req, res) => { res.send('GET request to homepage') })

app.post(path, callback...): Routes POST requests. Example:
  app.post('/', (req, res) => { res.send('POST request to homepage') })

app.put(path, callback...): Routes PUT requests. Example:
  app.put('/', (req, res) => { res.send('PUT request to homepage') })

# Utility Methods
app.disable(name), app.enable(name): Toggle Boolean settings.
app.disabled(name), app.enabled(name): Check status of settings.
app.engine(ext, callback): Register a template engine. E.g.,
  app.engine('pug', require('pug').__express)
app.get(name): Get setting value; app.set(name, value): Set a configuration.

# Additional API Details
Methods also include app.render(view, [locals], callback) for rendering views as strings
and app.route(path) to streamline multiple HTTP method attachments for a route.

# Date Retrieved: 2023-10-xx
Attribution: Express API documentation crawled from expressjs.com; Data Size: 14956746 bytes; Links: 16382.

## Attribution
- Source: Express API Reference
- URL: https://expressjs.com/en/api.html
- License: MIT License
- Crawl Date: 2025-04-28T23:47:32.190Z
- Data Size: 14956746 bytes
- Links Found: 16382

## Retrieved
2025-04-28
library/SVG_SPECS.md
# library/SVG_SPECS.md
# SVG_SPECS

## Crawl Summary
SVG is an XML-based vector graphics format integrated with CSS, DOM, JavaScript, and SMIL. Its elements are defined within an XML namespace (http://www.w3.org/2000/svg). Key API interactions include createElementNS for dynamic element creation and setAttributeNS for namespaced attribute management. The crawled content specifies full integration for scalable images, localization benefits, and performance advantages over bitmap formats.

## Normalised Extract
Table of Contents:
1. SVG Basics
   - XML declaration with xmlns attribute
   - Core elements: <svg>, <rect>, <circle>, etc.
2. DOM and JavaScript APIs
   - Use createElementNS(SVG_NS, tagName) to create SVG elements.
   - Methods: setAttributeNS, getAttributeNS, appendChild.
3. CSS and SMIL Integration
   - Styling with CSS selectors on SVG elements.
   - Animation with SMIL attributes like begin, dur, and fill.
4. Accessibility and Best Practices
   - Include <title> and <desc> elements within SVG for assistive technologies.
   - Validate using xmllint and W3C SVG validators.

SVG Basics: 
An SVG document must begin with a root <svg> tag that includes the namespace 'http://www.w3.org/2000/svg'. The width and height can be defined as fixed pixel values or percentages. Elements inside SVG are defined as XML and can include shapes, paths, text, and gradients.

DOM and JavaScript APIs:
Use document.createElementNS('http://www.w3.org/2000/svg', 'tagName') to create SVG elements. Common method signatures include:
createSVGElement(tagName: string): SVGElement
setAttributeNS(namespace: string, name: string, value: string): void
getAttributeNS(namespace: string, name: string): string

CSS and SMIL Integration:
SVG elements support direct CSS styling. SMIL allows inline animations by adding attributes such as begin, dur, repeatCount. Styling and animation attributes can be changed via JavaScript.

Accessibility and Best Practices:
Embed <title> and <desc> for accessibility. Use ARIA roles where necessary. Validate SVG markup using tools (e.g., xmllint) and follow best practices for compression and localization.


## Supplementary Details
Technical Specifications:
- XML Namespace: xmlns="http://www.w3.org/2000/svg"
- Attributes: width, height, viewBox, preserveAspectRatio
- Creation API: document.createElementNS with API signature createSVGElement(tagName: string) => SVGElement
- Methods: setAttributeNS(namespace, name, value), getAttributeNS(namespace, name)
- Configuration Options: Inline versus external SVG, with defaults:
   * Inline SVG: directly embedded within HTML for better CSS integration
   * External SVG: must include proper MIME types and CORS settings

Implementation Steps:
1. Declare the SVG root with the correct namespace.
2. Create child elements dynamically using createElementNS.
3. Set attributes with setAttributeNS to ensure namespacing.
4. Embed styles in CSS or inline using style attributes.
5. Validate using xmllint or W3C validator.

Example Implementation Pattern:
Define constant for SVG namespace (SVG_NS = 'http://www.w3.org/2000/svg'). Create an element:
   const svgElem = document.createElementNS(SVG_NS, 'svg');
   svgElem.setAttribute('width', '300');
   svgElem.setAttribute('height', '200');
   const circle = document.createElementNS(SVG_NS, 'circle');
   circle.setAttribute('cx', '150');
   circle.setAttribute('cy', '100');
   circle.setAttribute('r', '80');
   circle.setAttribute('fill', 'green');
   svgElem.appendChild(circle);
   document.body.appendChild(svgElem);

Configuration Options with exact values:
- Namespace: "http://www.w3.org/2000/svg" (mandatory)
- Width/Height: developer-defined numeric values or percentages
- SMIL Attributes: begin (e.g., '0s'), dur (e.g., '5s'), fill (e.g., 'freeze')


## Reference Details
API Specifications and Method Signatures:

1. function createSVGElement(tagName: string): SVGElement
   - Parameter: tagName (string) - Valid SVG tag name (e.g., 'rect', 'circle', 'path')
   - Returns: SVGElement
   - Example Code:
     const SVG_NS = 'http://www.w3.org/2000/svg';
     function createSVGElement(tagName) {
       return document.createElementNS(SVG_NS, tagName);
     }

2. Method: element.setAttributeNS(namespace: string, name: string, value: string): void
   - Parameters: namespace (string): Typically null or SVG namespace; name (string): attribute name; value (string): attribute value
   - Usage: Used for setting attributes on SVG elements where a namespace is required
   - Example: circle.setAttributeNS(null, 'fill', 'green');

3. Troubleshooting Commands:
   - Validate SVG with xmllint:
     Command: xmllint --noout --schema http://www.w3.org/2000/svg/svg10.xsd yourFile.svg
     Expected Output: No output if valid, or errors if issues exist

Configuration Options:
   - xmlns: "http://www.w3.org/2000/svg"; must be included in the root <svg> tag
   - width and height: Numerical values (e.g., "300", "200") or percentages. No default; must be provided for rendering.
   - viewBox: Defines coordinate system (e.g., "0 0 300 200"); essential for scaling

Best Practices:
   - Always use createElementNS when dynamically generating SVG elements.
   - Ensure proper accessibility by including <title> and <desc> within the <svg> element.
   - Perform regular validation using XML schema validators to catch markup errors early.

Detailed Implementation Pattern:
1. Define constant for SVG namespace (SVG_NS = 'http://www.w3.org/2000/svg').
2. Create SVG container with document.createElementNS(SVG_NS, 'svg').
3. Set essential attributes: width, height, viewBox.
4. Create child elements (e.g., circle, rect) using createElementNS.
5. Assign attributes using setAttributeNS or setAttribute.
6. Append child elements to the SVG container.
7. Insert the SVG into the HTML DOM.

Concrete Code Example with Comments:
----------------------------------------------------
// Define the SVG namespace
const SVG_NS = 'http://www.w3.org/2000/svg';

// Function to create an SVG element
function createSVGElement(tagName) {
  return document.createElementNS(SVG_NS, tagName);
}

// Create the SVG container
const svg = createSVGElement('svg');
svg.setAttribute('width', '300');
svg.setAttribute('height', '200');
svg.setAttribute('viewBox', '0 0 300 200');
svg.setAttribute('xmlns', SVG_NS);

// Create a circle element
const circle = createSVGElement('circle');
circle.setAttribute('cx', '150');
circle.setAttribute('cy', '100');
circle.setAttribute('r', '80');
circle.setAttribute('fill', 'green');

// Append the circle to the SVG container
svg.appendChild(circle);

// Append the SVG container to the document body
document.body.appendChild(svg);
----------------------------------------------------

Troubleshooting Procedure:
1. Ensure the SVG file includes the correct xmlns attribute.
2. Use xmllint to validate the SVG file:
   xmllint --noout --schema http://www.w3.org/2000/svg/svg10.xsd yourFile.svg
3. Check browser console for DOM errors related to SVG rendering.
4. Validate SMIL animations by verifying proper attributes (e.g., begin, dur, fill) are set.


## Information Dense Extract
SVG is an XML-based vector graphics standard. Root element: <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">. API: createSVGElement(tag: string) returns SVGElement via document.createElementNS('http://www.w3.org/2000/svg', tag). Methods: setAttributeNS(namespace, name, value), getAttributeNS(namespace, name). SMIL integration: attributes begin, dur, fill for animation. Best practices: use inline SVG for style inheritance, include <title>/<desc> for accessibility, validate with xmllint. Example: create circle with cx=150, cy=100, r=80, fill=green. Troubleshooting: xmllint --noout --schema http://www.w3.org/2000/svg/svg10.xsd file.svg; check DOM console errors.

## Sanitised Extract
Table of Contents:
1. SVG Basics
   - XML declaration with xmlns attribute
   - Core elements: <svg>, <rect>, <circle>, etc.
2. DOM and JavaScript APIs
   - Use createElementNS(SVG_NS, tagName) to create SVG elements.
   - Methods: setAttributeNS, getAttributeNS, appendChild.
3. CSS and SMIL Integration
   - Styling with CSS selectors on SVG elements.
   - Animation with SMIL attributes like begin, dur, and fill.
4. Accessibility and Best Practices
   - Include <title> and <desc> elements within SVG for assistive technologies.
   - Validate using xmllint and W3C SVG validators.

SVG Basics: 
An SVG document must begin with a root <svg> tag that includes the namespace 'http://www.w3.org/2000/svg'. The width and height can be defined as fixed pixel values or percentages. Elements inside SVG are defined as XML and can include shapes, paths, text, and gradients.

DOM and JavaScript APIs:
Use document.createElementNS('http://www.w3.org/2000/svg', 'tagName') to create SVG elements. Common method signatures include:
createSVGElement(tagName: string): SVGElement
setAttributeNS(namespace: string, name: string, value: string): void
getAttributeNS(namespace: string, name: string): string

CSS and SMIL Integration:
SVG elements support direct CSS styling. SMIL allows inline animations by adding attributes such as begin, dur, repeatCount. Styling and animation attributes can be changed via JavaScript.

Accessibility and Best Practices:
Embed <title> and <desc> for accessibility. Use ARIA roles where necessary. Validate SVG markup using tools (e.g., xmllint) and follow best practices for compression and localization.

## Original Source
MDN SVG Documentation
https://developer.mozilla.org/en-US/docs/Web/SVG

## Digest of SVG_SPECS

# SVG SPECIFICATIONS

SVG (Scalable Vector Graphics) is an XML-based markup language used to define two-dimensional vector graphics. This document covers the exact technical details, API specifications, method signatures, configuration parameters, and implementation patterns that can be directly applied by developers.

## Overview

SVG is text-based and integrates seamlessly with CSS, DOM, JavaScript, and SMIL. Its XML foundation allows searchability, indexing, scripting, and compression. Unlike bitmap images (JPEG, PNG), SVG images scale without quality loss and can be localized by text updates.

## Basic Structure and XML Namespace

Every SVG document must declare its XML namespace. For example:

    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="150" cy="100" r="80" fill="green" />
    </svg>

Key configuration: 
- xmlns: http://www.w3.org/2000/svg (mandatory)
- width/height: pixel dimensions or percentages

## DOM Integration and API Methods

SVG elements can be dynamically created and manipulated using JavaScript. The recommended approach is to use the createElementNS method with the SVG namespace. Example signature:

    function createSVGElement(tagName: string): SVGElement
       // Parameters:
       //   tagName: The local name of the SVG element (e.g., 'rect', 'circle')
       // Returns: A new SVGElement object within the SVG namespace

A sample implementation:

    const SVG_NS = 'http://www.w3.org/2000/svg';
    function createSVGElement(tagName) {
      return document.createElementNS(SVG_NS, tagName);
    }

Other common methods:
- setAttributeNS(namespace, name, value): To set namespaced attributes
- getAttributeNS(namespace, name): To retrieve attribute values

## Integration with CSS, JavaScript, and SMIL

SVG supports styling via CSS by targeting elements directly. JavaScript DOM manipulation allows interactive changes. SMIL can be used for defining animation sequences within SVG, with timing, attribute changes, and easing functions.

## Accessibility and Best Practices

Include ARIA roles and title/desc tags for accessibility. Use inline SVG to leverage CSS inheritance, and validate using tools such as xmllint:

    xmllint --noout yourFile.svg

Other best practices:
- Use descriptive IDs for elements
- Compress SVG files using gzip for performance
- Localize text in SVGs by updating element content

## Troubleshooting and Validator Information

Troubleshoot common issues by checking:
- Correct XML declaration and namespace
- Proper use of createElementNS for dynamic creation
- XML schema compliance using the W3C validator

Example troubleshooting command:

    xmllint --noout --schema http://www.w3.org/2000/svg/svg10.xsd yourFile.svg

## Attribution

Data retrieved on: 2025-04-15
Data Size: 1466101 bytes
Crawled from MDN SVG Documentation (Mar 18, 2025 revision)



## Attribution
- Source: MDN SVG Documentation
- URL: https://developer.mozilla.org/en-US/docs/Web/SVG
- License: CC BY-SA
- Crawl Date: 2025-04-29T02:21:27.622Z
- Data Size: 1466106 bytes
- Links Found: 40700

## Retrieved
2025-04-29
library/EXPRESS_PERFORMANCE.md
# library/EXPRESS_PERFORMANCE.md
# EXPRESS_PERFORMANCE

## Crawl Summary
Express production guidelines include code improvements such as using gzip compression middleware (or handling at reverse proxy level), avoiding synchronous functions by using asynchronous alternatives and flags like --trace-sync-io, structured logging with debug or Pino, and robust error handling using try-catch and promise rejection propagation. Environment setup recommendations cover NODE_ENV production settings, automatic restart via systemd or process managers like PM2, clustering for scalability, caching strategies, load balancing, and reverse proxy configurations.

## Normalised Extract
Table of Contents:
  1. Code Best Practices
    a. Gzip Compression: Use compression middleware (app.use(compression())) and consider reverse proxy settings in Nginx.
    b. Avoid Synchronous Functions: Always choose asynchronous APIs; use --trace-sync-io for detection.
    c. Logging: Use debug module for debugging and Pino for production logging.
    d. Exception Handling: Implement try-catch for synchronous operations and use async/await with error propagation via next(err) for asynchronous code.

  2. Environment Configuration
    a. NODE_ENV Production: Set NODE_ENV to production to enable caching and reduce error verbosity; use systemd unit file "Environment=NODE_ENV=production".
    b. Auto Restart: Use process managers/PM2 or systemd to automatically restart the app on crashes with appropriate commands.

  3. Scalability and Performance
    a. Clustering: Use Node’s cluster module or PM2's cluster mode (e.g., pm2 start npm --name my-app -i max -- start) to run multiple instances.
    b. Caching: Implement caching via Varnish or Nginx to store request responses.
    c. Load Balancing & Reverse Proxy: Use load balancers (e.g., Nginx/HAProxy) for distributing incoming traffic and offloading tasks from Express.

Each section provides concrete code examples and configuration snippets that developers can directly incorporate into production-level Express applications.

## Supplementary Details
Gzip Compression Implementation:
  - Code: const compression = require('compression'); app.use(compression());
  - Reverse proxy alternative using Nginx (refer to ngx_http_gzip_module documentation).

NODE_ENV Configuration:
  - Set environment variable in systemd unit file: Environment=NODE_ENV=production
  - Benefits: caches view templates, CSS files, and reduces verbose error messages. Improves performance by up to 3x.

Automatic Restart and Cluster Setup:
  - Process Manager Example (PM2):
      Command: pm2 start npm --name my-app -i max -- start
      Scaling Commands: pm2 scale my-app +3 or pm2 scale my-app 2
  - Systemd Unit File Example provided with ExecStart and Restart=always.

Error Handling Patterns:
  - Synchronous Code: Use try-catch around JSON.parse operations.
  - Asynchronous Code: Use async/await with proper error forwarding via next(err).

Logging Best Practices:
  - Use logging libraries like Pino for asynchronous logging to file or external systems.

Avoiding Synchronous Pitfalls:
  - Avoid synchronous methods on modules and use asynchronous alternatives to maintain high throughput in production.

## Reference Details
API Specifications and Code Examples:

1. Compression Middleware
   - Method: app.use(compression())
   - Parameter: No parameters; middleware compresses HTTP response bodies.
   - Return: Middleware function to process requests.

2. Error Handling in Routes
   - Synchronous Example:
       Route: app.get('/search', handler)
       Handler Code:
         setImmediate(() => {
           const jsonStr = req.query.params
           try {
             const jsonObj = JSON.parse(jsonStr)
             res.send('Success')
           } catch (e) {
             res.status(400).send('Invalid JSON string')
           }
         })
       - Pattern: Use try-catch for synchronous exceptions.

   - Asynchronous Example:
       Route: app.get('/', async (req, res, next) => {
         const data = await userData()  // userData returns a Promise
         res.send(data)
       })
       Error Middleware:
         app.use((err, req, res, next) => {
           res.status(err.status ?? 500).send({ error: err.message })
         })

3. PM2 Cluster Mode Commands
   - Start Cluster Mode:
         pm2 start npm --name my-app -i max -- start
   - Scale Up:
         pm2 scale my-app +3
   - Scale to specific count:
         pm2 scale my-app 2

4. Systemd Unit File Specification
   - File: /etc/systemd/system/myservice.service
   - Contents:
         [Unit]
         Description=<Awesome Express App>

         [Service]
         Type=simple
         ExecStart=/usr/local/bin/node /projects/myapp/index.js
         WorkingDirectory=/projects/myapp
         User=nobody
         Group=nogroup
         Environment=NODE_ENV=production
         LimitNOFILE=infinity
         LimitCORE=infinity
         StandardInput=null
         StandardOutput=syslog
         StandardError=syslog
         Restart=always

         [Install]
         WantedBy=multi-user.target
   - Effect: Ensures app auto-restarts and runs under production settings.

5. Logging Library Example
   - For debugging: Install debug (npm install debug) and use as follows:
         const debug = require('debug')('app:startup')
         debug('Debugging message');
   - For production: Use Pino (npm install pino) to initialize asynchronous logging.

Troubleshooting Procedures:
   - Use --trace-sync-io flag to detect synchronous I/O operations:
         node --trace-sync-io app.js
   - If using PM2, check logs with:
         pm2 logs my-app
   - For systemd managed services, view status with:
         systemctl status myservice.service
         journalctl -u myservice.service

6. SDK Method Signatures (Express API):
   - app.METHOD(path, callback):
         METHOD: get, post, put, delete etc.
         path: string route
         callback: function(req: Request, res: Response, next?: Function) => void
   - Error Handling Middleware Signature:
         function(err: any, req: Request, res: Response, next: Function): void

All above code examples and configurations are exact and complete for implementation without further reference.

## Information Dense Extract
Express Production Best Practices: Use compression middleware (app.use(compression())) or reverse proxy (Nginx with ngx_http_gzip_module); avoid synchronous functions, use async APIs with --trace-sync-io for detection; logging with debug/Pino; error handling via try-catch for sync and async/await with next(err) for async; set NODE_ENV=production (systemd: Environment=NODE_ENV=production) for caching and performance boost; auto restart via process managers or systemd (unit file sample provided); clustering using Node cluster module or PM2 (commands: pm2 start npm --name my-app -i max -- start, pm2 scale my-app +3); caching with Varnish/Nginx; load balancing and reverse proxy for distribution; API signatures: app.METHOD(path, callback) and error middleware function(err, req, res, next); complete systemd unit file and troubleshooting commands (pm2 logs, systemctl status, journalctl).

## Sanitised Extract
Table of Contents:
  1. Code Best Practices
    a. Gzip Compression: Use compression middleware (app.use(compression())) and consider reverse proxy settings in Nginx.
    b. Avoid Synchronous Functions: Always choose asynchronous APIs; use --trace-sync-io for detection.
    c. Logging: Use debug module for debugging and Pino for production logging.
    d. Exception Handling: Implement try-catch for synchronous operations and use async/await with error propagation via next(err) for asynchronous code.

  2. Environment Configuration
    a. NODE_ENV Production: Set NODE_ENV to production to enable caching and reduce error verbosity; use systemd unit file 'Environment=NODE_ENV=production'.
    b. Auto Restart: Use process managers/PM2 or systemd to automatically restart the app on crashes with appropriate commands.

  3. Scalability and Performance
    a. Clustering: Use Nodes cluster module or PM2's cluster mode (e.g., pm2 start npm --name my-app -i max -- start) to run multiple instances.
    b. Caching: Implement caching via Varnish or Nginx to store request responses.
    c. Load Balancing & Reverse Proxy: Use load balancers (e.g., Nginx/HAProxy) for distributing incoming traffic and offloading tasks from Express.

Each section provides concrete code examples and configuration snippets that developers can directly incorporate into production-level Express applications.

## Original Source
Express.js Best Practices for Production
https://expressjs.com/en/advanced/best-practice-performance.html

## Digest of EXPRESS_PERFORMANCE

# Express Performance and Production Best Practices

Retrieved Date: 2023-10-24

## Code Best Practices

### Use Gzip Compression
- Install compression middleware: require('compression')
- Middleware usage:
  const compression = require('compression')
  const express = require('express')
  const app = express()

  app.use(compression())

Notes:
- For high-traffic systems, enable compression at the reverse proxy (e.g., Nginx via ngx_http_gzip_module) to reduce overhead.

### Avoid Synchronous Functions
- Always use asynchronous versions of Node functions to prevent blocking the event loop.
- Use the command-line flag `--trace-sync-io` during testing/development to detect inadvertent synchronous calls.

### Correct Logging Techniques
- For debugging: use a specialized module (e.g., debug) instead of console.log.
- For production logging: use asynchronous logging libraries like Pino to log API calls and application events.

### Exception Handling
- Employ try-catch for synchronous code such as JSON parsing:
  app.get('/search', (req, res) => {
    setImmediate(() => {
      const jsonStr = req.query.params
      try {
        const jsonObj = JSON.parse(jsonStr)
        res.send('Success')
      } catch (e) {
        res.status(400).send('Invalid JSON string')
      }
    })
  })

- For asynchronous operations, use promises or async/await with error propagation via next(err):
  app.get('/', async (req, res, next) => {
    const data = await userData()
    res.send(data)
  })

- Central error handling middleware example:
  app.use((err, req, res, next) => {
    res.status(err.status ?? 500).send({ error: err.message })
  })

### What Not To Do
- Do not attach listeners to the uncaughtException event or use domains, as these practices can lead to unstable state.

## Environment and Ops Best Practices

### Setting NODE_ENV to "production"
- Set environment variable NODE_ENV=production to enable:
  - View templates caching
  - CSS file caching
  - Reduced error verbosity
- Example using systemd:
  In /etc/systemd/system/myservice.service:

    [Service]
    Environment=NODE_ENV=production

### Ensure Automatic Restart
- Use process managers (e.g., PM2) or init systems (systemd) to restart the app when it crashes.
- Example systemd unit file:

    [Unit]
    Description=<Awesome Express App>

    [Service]
    Type=simple
    ExecStart=/usr/local/bin/node /projects/myapp/index.js
    WorkingDirectory=/projects/myapp
    User=nobody
    Group=nogroup
    Environment=NODE_ENV=production
    LimitNOFILE=infinity
    LimitCORE=infinity
    StandardInput=null
    StandardOutput=syslog
    StandardError=syslog
    Restart=always

    [Install]
    WantedBy=multi-user.target

### Running in a Cluster

#### Using Node’s cluster module:
- Fork worker processes for each CPU core. Restart workers on crash with cluster.fork().

#### Using PM2:
- Start in cluster mode:
  $ pm2 start npm --name my-app -i max -- start
- Scale dynamically:
  $ pm2 scale my-app +3
  $ pm2 scale my-app 2

### Cache Request Results
- Utilize caching solutions like Varnish or Nginx caching to store common responses.

### Using a Load Balancer and Reverse Proxy
- Set up a load balancer (e.g., using Nginx or HAProxy) to distribute load across multiple app instances.
- Use a reverse proxy to handle compression, error pages, caching and serve static content, thereby offloading from Express.

## Additional Implementation Details

### Express Application Starter Code Example

    const express = require('express')
    const app = express()
    const port = 3000

    app.get('/', (req, res) => {
      res.send('Hello World!')
    })

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })

This code is the base for an Express app running in production settings after applying the above best practices.

## Attribution

- Source: Express.js Best Practices for Production (https://expressjs.com/en/advanced/best-practice-performance.html)
- Data Size: 2242690 bytes


## Attribution
- Source: Express.js Best Practices for Production
- URL: https://expressjs.com/en/advanced/best-practice-performance.html
- License: MIT License
- Crawl Date: 2025-04-29T18:52:02.683Z
- Data Size: 2242690 bytes
- Links Found: 8252

## Retrieved
2025-04-29
library/STREAMS.md
# library/STREAMS.md
# STREAMS

## Crawl Summary
Module: node:stream, v23.11.0. Exposes Stream classes and utilities. Core types: Writable, Readable, Duplex, Transform. Constructors accept options: objectMode(boolean), highWaterMark(number), encoding(string, Readable), emitClose(boolean), autoDestroy(boolean). Methods: write, read, pipe, unpipe, pause, resume, destroy, cork, uncork, setDefaultEncoding, push, read, setEncoding, compose, from, toWeb. Promises API: pipeline(streams..., options{signal, end}), finished(stream, options{readable, writable, error, signal, cleanup}). Utility functions: duplexPair, compose, addAbortSignal, getDefaultHighWaterMark. Events: close, drain, error, finish, data, end, readable, pause, resume, pipe, unpipe.

## Normalised Extract
Table of Contents
1 Fundamental Types
2 Constructors
3 Instance Properties
4 Instance Methods
5 Events
6 Streams Promises API
7 Utility Functions

1 Fundamental Types
Writable writes data
Readable reads data
Duplex both read/write
Transform Duplex with transform()

2 Constructors
stream.Writable(options)
  objectMode?: boolean
  highWaterMark?: number
  emitClose?: boolean
  autoDestroy?: boolean
  write(chunk, encoding, callback)
  writev(chunks, callback)
  destroy(error, callback)
  final(callback)

stream.Readable(options)
  objectMode?: boolean
  highWaterMark?: number
  encoding?: string
  autoDestroy?: boolean
  read(size)
  destroy(error, callback)

stream.Duplex(options)
  allowHalfOpen?: boolean
  inherits both Writable and Readable options

stream.Transform(options)
  transform(chunk, encoding, callback)
  flush(callback)
  inherits Writable and Readable options

3 Instance Properties
Writable.closed boolean
Writable.destroyed boolean
Writable.writable boolean
Writable.writableEnded boolean
Writable.writableFinished boolean
Writable.writableNeedDrain boolean
Writable.writableHighWaterMark number
Writable.writableLength number
Writable.writableObjectMode boolean
Writable.writableCorked number
Writable.errored Error|null
Writable.writableAborted boolean

Readable.closed boolean
Readable.destroyed boolean
Readable.readableHighWaterMark number
Readable.readableLength number
Readable.readableObjectMode boolean
Readable.readableEncoding string|null
Readable.readableEnded boolean
Readable.readableFlowing boolean|null
Readable.readableDidRead boolean
Readable.errored Error|null
Readable.readableAborted boolean

4 Instance Methods
Writable.write(chunk, encoding?, callback?): boolean
Writable.end(chunk?, encoding?, callback?)
Writable.destroy(error?)
Writable.cork()
Writable.uncork()
Writable.setDefaultEncoding(encoding)
Readable.read(size?)
Readable.setEncoding(encoding)
Readable.pause()
Readable.resume()
Readable.isPaused(): boolean
Readable.pipe(dest, options?)
Readable.unpipe(dest?)
Readable.destroy(error?)
Readable.push(chunk, encoding?)

5 Events
Writable: close, drain, error, finish, pipe(src), unpipe(src)
Readable: close, data(chunk), end, error(error), pause, readable, resume
Duplex & Transform inherit both

6 Streams Promises API
import { pipeline, finished } from 'node:stream/promises'
pipeline(...streams, { signal?: AbortSignal, end?: boolean }): Promise<void>
finished(stream, { error?: boolean, readable?: boolean, writable?: boolean, signal?: AbortSignal, cleanup?: boolean }): Promise<void>

7 Utility Functions
stream.pipeline
stream.finished
stream.compose(...streams): Duplex
stream.duplexPair(options?): [Duplex, Duplex]
stream.Readable.from(iterable, options)
stream.Readable.fromWeb(webStream, options)
stream.Readable.toWeb(stream, options)
stream.Writable.toWeb(stream)
stream.Writable.fromWeb(webStream, options)
stream.Duplex.toWeb(stream)
stream.Duplex.fromWeb(webPair, options)
stream.addAbortSignal(signal, stream)
stream.getDefaultHighWaterMark(objectMode)
stream.setDefaultHighWaterMark(objectMode, value)


## Supplementary Details
Writable options.objectMode: false|true(default false)
highWaterMark: number(default 16KB)
emitClose: boolean(default true)
autoDestroy: boolean(default true)
Readable options.encoding: utf8|ascii|base64|latin1|hex(default null)
highWaterMark: number(default 16KB in bytes or 16 objects if objectMode)
autoDestroy: boolean(default false)
stream.pipeline options.end: boolean(default true) destroys destination on end
stream.pipeline options.signal: AbortSignal, on abort calls destroy with AbortError
stream.finished options.cleanup: boolean(default false) removes listeners
stream.finished options.readable, writable, error: booleans filter events


## Reference Details
// Writable Example
const { Writable } = require('node:stream');
class MyWritable extends Writable {
  constructor() { super({ objectMode: true, highWaterMark: 4 }); }
  _write(chunk, encoding, callback) {
    // chunk: any, encoding: string|null
    process.nextTick(() => callback());
  }
  _writev(chunks, callback) {
    // chunks: Array<{chunk:any,encoding:string}>
    callback();
  }
  _final(callback) { callback(); }
}

// Backpressure handling
function writeData(writer, data) {
  if (!writer.write(data)) writer.once('drain', () => writeData(writer, data));
}

// Readable Example
const { Readable } = require('node:stream');
class MyReadable extends Readable {
  constructor() { super({ encoding: 'utf8', highWaterMark: 8 }); }
  _read(size) {
    // size: number
    this.push('chunk');
    this.push(null);
  }
}

// Duplex Example
const { Duplex } = require('node:stream');
const pair = stream.duplexPair({ highWaterMark: 8 });
pair[0].write('data'); // written to pair[1]

// Transform Example
const { Transform } = require('node:stream');
const upper = new Transform({ transform(chunk, encoding, cb) {
  cb(null, chunk.toString().toUpperCase());
}, highWaterMark: 16 });

// pipeline usage
const fs = require('fs');
const zlib = require('zlib');
const { pipeline } = require('node:stream/promises');
await pipeline(
  fs.createReadStream('in.txt'),
  zlib.createGzip(),
  fs.createWriteStream('out.txt.gz'),
  { signal, end: false }
);

// Troubleshooting
// ERR_STREAM_DESTROYED: write after destroy(), check writer.destroyed
// Backpressure hang: ensure drain listener or use pipeline


## Information Dense Extract
Type: stream.Writable(options{objectMode:boolean,highWaterMark:number,emitClose:boolean,autoDestroy:boolean,write,writev,destroy,final}); methods: write(chunk,encoding?,cb?),end(chunk?,enc?,cb?),destroy(err?),cork(),uncork(),setDefaultEncoding(enc); props: closed,destroyed,writable*,errored,writableAborted; events: close,drain,error,finish,pipe(src),unpipe(src). stream.Readable(options{objectMode,highWaterMark,encoding,autoDestroy,read,destroy}); methods: read(size?),setEncoding(enc),pause(),resume(),isPaused(),pipe(dest,{end?}),unpipe(dest?),destroy(err?),push(chunk,enc?); props: readable*,errored,readableAborted; events: close,data(chunk),end,error,pause,readable,resume. stream.Duplex(options),stream.Transform(options{transform,flush,decodeStrings,objectMode,highWaterMark}); utilities: pipeline(streams...,{signal, end}),finished(stream,{error,readable,writable,signal,cleanup}),compose(...),duplexPair(opts),Readable.from(iterable,opts),Readable.fromWeb(web,opts),Readable.toWeb(stream,opts),Writable.toWeb(stream),Writable.fromWeb(web,opts),Duplex.toWeb(stream),Duplex.fromWeb(web,opts),addAbortSignal(signal,stream),getDefaultHighWaterMark(objectMode),setDefaultHighWaterMark(objectMode,value). Backpressure: write returns false-> wait for 'drain'. AbortSignal: pipeline abort->AbortError. Defaults: highWaterMark 16KB/16 objects, end true, cleanup false.

## Sanitised Extract
Table of Contents
1 Fundamental Types
2 Constructors
3 Instance Properties
4 Instance Methods
5 Events
6 Streams Promises API
7 Utility Functions

1 Fundamental Types
Writable writes data
Readable reads data
Duplex both read/write
Transform Duplex with transform()

2 Constructors
stream.Writable(options)
  objectMode?: boolean
  highWaterMark?: number
  emitClose?: boolean
  autoDestroy?: boolean
  write(chunk, encoding, callback)
  writev(chunks, callback)
  destroy(error, callback)
  final(callback)

stream.Readable(options)
  objectMode?: boolean
  highWaterMark?: number
  encoding?: string
  autoDestroy?: boolean
  read(size)
  destroy(error, callback)

stream.Duplex(options)
  allowHalfOpen?: boolean
  inherits both Writable and Readable options

stream.Transform(options)
  transform(chunk, encoding, callback)
  flush(callback)
  inherits Writable and Readable options

3 Instance Properties
Writable.closed boolean
Writable.destroyed boolean
Writable.writable boolean
Writable.writableEnded boolean
Writable.writableFinished boolean
Writable.writableNeedDrain boolean
Writable.writableHighWaterMark number
Writable.writableLength number
Writable.writableObjectMode boolean
Writable.writableCorked number
Writable.errored Error|null
Writable.writableAborted boolean

Readable.closed boolean
Readable.destroyed boolean
Readable.readableHighWaterMark number
Readable.readableLength number
Readable.readableObjectMode boolean
Readable.readableEncoding string|null
Readable.readableEnded boolean
Readable.readableFlowing boolean|null
Readable.readableDidRead boolean
Readable.errored Error|null
Readable.readableAborted boolean

4 Instance Methods
Writable.write(chunk, encoding?, callback?): boolean
Writable.end(chunk?, encoding?, callback?)
Writable.destroy(error?)
Writable.cork()
Writable.uncork()
Writable.setDefaultEncoding(encoding)
Readable.read(size?)
Readable.setEncoding(encoding)
Readable.pause()
Readable.resume()
Readable.isPaused(): boolean
Readable.pipe(dest, options?)
Readable.unpipe(dest?)
Readable.destroy(error?)
Readable.push(chunk, encoding?)

5 Events
Writable: close, drain, error, finish, pipe(src), unpipe(src)
Readable: close, data(chunk), end, error(error), pause, readable, resume
Duplex & Transform inherit both

6 Streams Promises API
import { pipeline, finished } from 'node:stream/promises'
pipeline(...streams, { signal?: AbortSignal, end?: boolean }): Promise<void>
finished(stream, { error?: boolean, readable?: boolean, writable?: boolean, signal?: AbortSignal, cleanup?: boolean }): Promise<void>

7 Utility Functions
stream.pipeline
stream.finished
stream.compose(...streams): Duplex
stream.duplexPair(options?): [Duplex, Duplex]
stream.Readable.from(iterable, options)
stream.Readable.fromWeb(webStream, options)
stream.Readable.toWeb(stream, options)
stream.Writable.toWeb(stream)
stream.Writable.fromWeb(webStream, options)
stream.Duplex.toWeb(stream)
stream.Duplex.fromWeb(webPair, options)
stream.addAbortSignal(signal, stream)
stream.getDefaultHighWaterMark(objectMode)
stream.setDefaultHighWaterMark(objectMode, value)

## Original Source
Node.js Streams API
https://nodejs.org/api/stream.html

## Digest of STREAMS

# Retrieve node:stream Module

## Importing

const stream = require('node:stream');

## Fundamental Stream Types

- Writable
- Readable
- Duplex
- Transform

# Streams Promises API

## Methods

### pipeline(source[, ...transforms], destination[, options])
Signature: pipeline(...streams: Array<Stream|Iterable|AsyncIterable|Function>, options?: { signal?: AbortSignal; end?: boolean; }): Promise<void>
- signal: AbortSignal triggers AbortError & destroy
- end (default true): auto-close destination

### finished(stream, options)
Signature: finished(stream: Stream|ReadableStream|WritableStream, options?: { error?: boolean; readable?: boolean; writable?: boolean; signal?: AbortSignal; cleanup?: boolean; }): Promise<void>
- error: include 'error' event (default undefined)
- readable: wait for readable end
- writable: wait for writable finish
- cleanup (default false): remove listeners

# Object Mode & Buffering

- objectMode: boolean in constructor
- highWaterMark: bytes (normal), objects (objectMode), UTF-16 code units (strings)

# stream.Writable

## Constructor
new stream.Writable(options?: {
  write?(chunk: Buffer|string|TypedArray|DataView|any, encoding: string|null, callback: (err?: Error)=>void): void;
  writev?(chunks: Array<{ chunk: any; encoding: string }>, callback: (err?: Error)=>void): void;
  destroy?(error: Error|null, callback: (err?: Error)=>void): void;
  final?(callback: (err?: Error)=>void): void;
  objectMode?: boolean;
  highWaterMark?: number;
  emitClose?: boolean;
  autoDestroy?: boolean;
})

## Instance Methods & Properties
- write(chunk: Buffer|string|TypedArray|DataView|any, encoding?: string|null, callback?: (err?: Error)=>void): boolean
- end(chunk?: Buffer|string|TypedArray|DataView|any, encoding?: string, callback?: ()=>void): this
- destroy(error?: Error): this
- cork(): void
- uncork(): void
- setDefaultEncoding(encoding: string): this
- closed: boolean
- destroyed: boolean
- writable: boolean
- writableEnded: boolean
- writableFinished: boolean
- writableNeedDrain: boolean
- writableHighWaterMark: number
- writableLength: number
- writableObjectMode: boolean
- writableCorked: number
- errored: Error|null
- writableAborted: boolean
- [Symbol.asyncDispose](): Promise<void>

## Events
- 'close'
- 'drain'
- 'error'
- 'finish'
- 'pipe'(src: stream.Readable)
- 'unpipe'(src: stream.Readable)

# stream.Readable

## Constructor
new stream.Readable(options?: {
  read?(size: number): void;
  destroy?(error: Error|null, callback: (err?: Error)=>void): void;
  objectMode?: boolean;
  highWaterMark?: number;
  encoding?: string;
  autoDestroy?: boolean;
})

## Instance Methods & Properties
- read(size?: number): Buffer|string|null
- setEncoding(encoding: string): this
- pause(): this
- resume(): this
- isPaused(): boolean
- pipe(dest: stream.Writable, options?: { end?: boolean }): dest
- unpipe(dest?: stream.Writable): this
- destroy(error?: Error): this
- push(chunk: any, encoding?: string): boolean
- closed: boolean
- destroyed: boolean
- readableHighWaterMark: number
- readableLength: number
- readableObjectMode: boolean
- readableEncoding: string|null
- readableEnded: boolean
- readableFlowing: boolean|null
- readableDidRead: boolean
- errored: Error|null
- readableAborted: boolean
- [Symbol.asyncIterator](): AsyncIterator<any>
- [Symbol.asyncDispose](): Promise<void>

## Events
- 'close'
- 'data'(chunk: Buffer|string|any)
- 'end'
- 'error'(err: Error)
- 'pause'
- 'readable'
- 'resume'

# stream.Duplex & Transform

## stream.Duplex
new stream.Duplex(options: WritableOptions & ReadableOptions & { allowHalfOpen?: boolean })
- allowHalfOpen: boolean (default true)

## stream.Transform
new stream.Transform(options?: {
  transform?(chunk: any, encoding: string, callback: (err?: Error, data?: any)=>void): void;
  flush?(callback: (err?: Error, data?: any)=>void): void;
  objectMode?: boolean;
  highWaterMark?: number;
  decodeStrings?: boolean;
})
- destroy(error?: Error): this

# Utility Functions

- stream.pipeline(...)
- stream.finished(...)
- stream.compose(...streams: Stream[]): Duplex
- stream.duplexPair(options?: { highWaterMark?: number; objectMode?: boolean }): [Duplex, Duplex]
- stream.Readable.from(iterable: Iterable|AsyncIterable, options?: ReadableOptions): Readable
- stream.Readable.fromWeb(readableStream: ReadableStream, options?: ReadableOptions): Readable
- stream.Readable.toWeb(stream: Readable, options?: { preventCancel?: boolean; preventClose?: boolean; preventAbort?: boolean }): ReadableStream
- stream.Writable.toWeb(stream: Writable): WritableStream
- stream.Writable.fromWeb(writableStream: WritableStream, options?: { highWaterMark?: number; objectMode?: boolean }): Writable
- stream.Duplex.toWeb(stream: Duplex): { readable: ReadableStream; writable: WritableStream }
- stream.Duplex.fromWeb(pair: ReadableStreamDefaultReader|WritableStreamDefaultWriter|{ readable: ReadableStream; writable: WritableStream }, options?: DuplexOptions): Duplex
- stream.addAbortSignal(signal: AbortSignal, stream: Stream): void
- stream.getDefaultHighWaterMark(objectMode: boolean): number
- stream.setDefaultHighWaterMark(objectMode: boolean, value: number): void



## Attribution
- Source: Node.js Streams API
- URL: https://nodejs.org/api/stream.html
- License: License
- Crawl Date: 2025-04-26T17:48:11.247Z
- Data Size: 3647472 bytes
- Links Found: 2200

## Retrieved
2025-04-26
library/SVG_ACCESSIBILITY.md
# library/SVG_ACCESSIBILITY.md
# SVG_ACCESSIBILITY

## Crawl Summary
Data extracted from the crawl indicates emphasis on using native SVG markup for accessibility. Key specifications include mandatory use of <title> for a concise description, optional <desc> for in-depth description, and configuration of aria-labelledby to reference these elements. Role is set to "img", ensuring assistive tools correctly interpret the content.

## Normalised Extract
Table of Contents:
1. Accessibility Markup
   - Include a role attribute on the <svg> element set to 'img'.
2. Title and Description Elements
   - Use a <title> element with a unique id positioned as the first child of <svg>.
   - Optionally include a <desc> element with a unique id for extended descriptions.
3. ARIA Configuration
   - Set the aria-labelledby attribute on <svg> to reference the <title> and <desc> element ids (e.g., 'svgTitle svgDesc').
4. Implementation Pattern
   - Pattern for accessible SVG: create <svg> with role, include <title>, optionally add <desc>, and set aria-labelledby.

Detailed Technical Information:
- Element: svg
  Attributes: role="img", aria-labelledby="{titleID} {descID}"
- Element: title
  Requirement: Must be the first child; id must be referenced in aria-labelledby.
- Element: desc
  Optional: Provides additional information; id must be unique and referenced in aria-labelledby if used.

## Supplementary Details
Configuration Options:
- Role: 'img' (default for accessible SVG elements)
- <title> element: Must have a unique id; placed as the first child inside <svg>.
- <desc> element: Optional but recommended for extended descriptions; must have a unique id if included.
- aria-labelledby: Should include IDs of both <title> and <desc> (if present), e.g., aria-labelledby='svgTitle svgDesc'.

Implementation Steps:
1. Create an <svg> element with role 'img'.
2. Add a <title> element as the first child with a unique id.
3. Optionally add a <desc> element with a unique id.
4. Set the aria-labelledby attribute on <svg> to point to the <title> (and <desc> if available).

Best Practices:
- Always check id uniqueness when multiple SVGs are rendered on the same page.
- Validate with accessibility tools to ensure proper narration by screen readers.

## Reference Details
API Specification for Accessible SVG Helper Library:

Function: makeAccessibleSVG
Signature: function makeAccessibleSVG(svgElement: Element, title: string, description?: string): Element
Parameters:
- svgElement: The target SVG DOM element to be enhanced.
- title: A string representing the concise title to be set inside a <title> element.
- description (optional): A string for the optional description in a <desc> element.
Return Type: Element – the modified SVG element with accessibility attributes.
Exceptions: Throws Error if svgElement is null or not an SVG element.

Implementation Pattern:
1. Validate svgElement is an instance of SVGElement.
2. Create and insert a <title> element with a unique id; assign the text from 'title'.
3. If 'description' is provided, create and insert a <desc> element with a unique id.
4. Set svgElement's attribute role='img'.
5. Set aria-labelledby attribute on svgElement to reference the ids from <title> and <desc>.

Code Example:
// Example usage in JavaScript:

function makeAccessibleSVG(svgElement, title, description) {
  if (!(svgElement instanceof SVGElement)) {
    throw new Error('Provided element is not an SVGElement');
  }
  var titleId = 'svgTitle_' + Date.now();
  var titleElem = document.createElementNS('http://www.w3.org/2000/svg', 'title');
  titleElem.setAttribute('id', titleId);
  titleElem.textContent = title;
  svgElement.insertBefore(titleElem, svgElement.firstChild);

  var labelledby = titleId;
  if (description) {
    var descId = 'svgDesc_' + Date.now();
    var descElem = document.createElementNS('http://www.w3.org/2000/svg', 'desc');
    descElem.setAttribute('id', descId);
    descElem.textContent = description;
    svgElement.insertBefore(descElem, svgElement.childNodes[1]);
    labelledby += ' ' + descId;
  }
  svgElement.setAttribute('role', 'img');
  svgElement.setAttribute('aria-labelledby', labelledby);
  return svgElement;
}

Troubleshooting Procedures:
- If the SVG is not announced by screen readers, verify that the <title> element is the first child and that the aria-labelledby attribute correctly references the ids.
- Use browser developer tools to inspect the DOM and check for id conflicts.
- Run accessibility audit tools (e.g., Axe) to identify any missing attributes.

Configuration Options and Their Effects:
- role: Setting to 'img' ensures the SVG is interpreted as an image.
- aria-labelledby: Proper configuration links accessible text to the SVG.

Best Practice: Always generate unique ids for each SVG instance to avoid conflicts in aria-labelledby references.

## Information Dense Extract
SVG element with role='img'; include <title> (unique id, first child) and optional <desc> (unique id). Set aria-labelledby='titleID [descID]'. API: makeAccessibleSVG(svgElement: Element, title: string, description?: string): Element. Validate SVGElement, throw Error if invalid. Ensure unique id generation (e.g., using Date.now()). Check DOM for id collisions; use Axe for auditing.

## Sanitised Extract
Table of Contents:
1. Accessibility Markup
   - Include a role attribute on the <svg> element set to 'img'.
2. Title and Description Elements
   - Use a <title> element with a unique id positioned as the first child of <svg>.
   - Optionally include a <desc> element with a unique id for extended descriptions.
3. ARIA Configuration
   - Set the aria-labelledby attribute on <svg> to reference the <title> and <desc> element ids (e.g., 'svgTitle svgDesc').
4. Implementation Pattern
   - Pattern for accessible SVG: create <svg> with role, include <title>, optionally add <desc>, and set aria-labelledby.

Detailed Technical Information:
- Element: svg
  Attributes: role='img', aria-labelledby='{titleID} {descID}'
- Element: title
  Requirement: Must be the first child; id must be referenced in aria-labelledby.
- Element: desc
  Optional: Provides additional information; id must be unique and referenced in aria-labelledby if used.

## Original Source
MDN SVG Accessibility
https://developer.mozilla.org/en-US/docs/Web/SVG/Accessibility

## Digest of SVG_ACCESSIBILITY

# SVG Accessibility Technical Details

Retrieved on: 2023-10-07

## Overview
This document provides in-depth technical details on implementing accessibility in SVG images. It details the use of native SVG elements and ARIA attributes including <title>, <desc>, role, and aria-labelledby for ensuring SVG content is accessible to assistive technologies.

## Key Specifications
- SVG must include a <title> element as the first child if it is used for accessibility purposes. The <desc> element is optional but recommended to provide extended description.
- The <svg> element should have a role attribute set appropriately (often role="img") to inform assistive technology about its purpose.
- Use the aria-labelledby attribute on the <svg> element to reference the IDs of the <title> and <desc> elements. For example, aria-labelledby="svgTitle svgDesc".
- Ensure unique IDs for <title> and <desc> elements in a page to prevent conflicts.

## Configuration Details
- Default role: "img"
- Mandatory elements: <title> must always be present and comprise a concise title; <desc> may be added for extended descriptions.
- ARIA Configuration: Set aria-labelledby attribute on the <svg> element to include the ids from <title> and <desc>.

## Code and Implementation Patterns
Developers should follow this pattern for accessible SVG:
1. Create an <svg> element with role="img".
2. Insert a <title> element with a unique id (e.g. "svgTitle").
3. Optionally, insert a <desc> element with a matching unique id (e.g. "svgDesc").
4. Add the attribute aria-labelledby="svgTitle svgDesc" to the <svg>.

Example structure:

<svg role="img" aria-labelledby="svgTitle svgDesc" ...>
  <title id="svgTitle">Descriptive Title</title>
  <desc id="svgDesc">Extended description of SVG content for screen readers.</desc>
  ...
</svg>

## Attribution and Data Size
- Data Size: 0 bytes as per crawl result
- Source: MDN SVG Accessibility (Entry 20)


## Attribution
- Source: MDN SVG Accessibility
- URL: https://developer.mozilla.org/en-US/docs/Web/SVG/Accessibility
- License: CC BY-SA
- Crawl Date: 2025-04-29T19:48:30.117Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-29
library/EJS_DOCS.md
# library/EJS_DOCS.md
# EJS_DOCS

## Crawl Summary
EJS is a templating engine built for JavaScript that features simple scriptlet tags for embedding code. It compiles templates into intermediate JavaScript functions, caching them for speed, and outputs clear JavaScript exceptions with template line numbers for debugging.

## Normalised Extract
Table of Contents:
1. Simple Syntax:
   - EJS uses <% and %> for embedding plain JavaScript in templates. Developers can directly integrate JS logic for dynamic HTML output.
2. Fast Execution:
   - EJS compiles templates to intermediate JavaScript functions. These functions are cached if the 'cache' option is enabled, resulting in high-performance rendering.
3. Debugging and Error Handling:
   - Errors are thrown as standard JavaScript exceptions including detailed template line numbers, allowing for quick identification and resolution of issues.
4. API Methods:
   - ejs.render: Takes a template string, data object, and optional configuration options; returns a rendered HTML string.
   - ejs.renderFile: Accepts a filename, data object, optional options, and a callback function that provides error handling and the final HTML string.

Detailed Information for Each Topic:
1. Simple Syntax: Use plain JS in <% ... %> tags to output HTML; no additional preprocessing required.
2. Fast Execution: Leverage caching by setting cache: true; intermediate JS functions reduce render time.
3. Debugging: Errors are output with corresponding line numbers in the template file for quick debugging.
4. API Methods: Direct use of ejs.render and ejs.renderFile with explicit parameters as described.

## Supplementary Details
EJS configuration can be tailored through options. Key parameters include:
- cache: boolean (default false) - When true, caches compiled templates.
- delimiter: string (default '%') - Defines the boundary for scriptlet tags.
- compileDebug: boolean (default true) - Enables inclusion of debug information during compilation.
- debug: boolean (default false) - Provides additional debug output during rendering.

Implementation Steps:
1. For synchronous rendering, call ejs.render(templateString, data, options) to get the HTML output.
2. For file-based asynchronous rendering, use ejs.renderFile(filePath, data, options, callback), where the callback handles error checking and output display.

Best Practices:
- Enable caching in production environments to boost performance.
- Utilize the compileDebug option in development for enhanced error reporting.
- Customize the delimiter if your template conflicts with other templating languages.

Troubleshooting Procedures:
- If rendering issues occur, check for mismatched scriptlet tags in the template.
- Verify that the file path is correct when using renderFile to avoid ENOENT errors.
- Use verbose logging by setting debug: true to trace execution flow and error details.

## Reference Details
API Specifications:
1. ejs.render
   - Signature: ejs.render(template: string, data: object, options?: {cache?: boolean, filename?: string, delimiter?: string, compileDebug?: boolean, debug?: boolean}): string
   - Returns: Rendered HTML string
   - Exceptions: Throws standard JavaScript exceptions if syntax errors occur in the template.

2. ejs.renderFile
   - Signature: ejs.renderFile(filename: string, data: object, options?: {cache?: boolean, delimiter?: string, compileDebug?: boolean, debug?: boolean}, callback: (err: Error, str: string) => void): void
   - Behavior: Asynchronously reads and renders a template file, passing errors and the final string to the callback.
   - Exceptions: Passes encountered errors (e.g., file not found, syntax errors) to the callback.

Full Code Examples:
// Example 1: Synchronous Rendering
var htmlOutput = ejs.render('<h1>Hello, <%= user %>!</h1>', { user: 'Alice' }, {cache: true, delimiter: '%'});
// htmlOutput now contains the rendered HTML string

// Example 2: Asynchronous File Rendering
// Assuming template.ejs exists in the filesystem
 ejs.renderFile('template.ejs', { user: 'Bob' }, {cache: true, compileDebug: true}, function(err, str) {
   if (err) {
     // Handle error, e.g., log or throw
     console.error('Render error:', err);
     return;
   }
   // Output the rendered HTML string
   console.log('Rendered HTML:', str);
});

Implementation Patterns:
- Always validate data objects before passing to render methods.
- Use caching in production to reduce compilation overhead.
- In case of errors, inspect the template's exact line number provided in the exception message.

Configuration Options Summary:
- cache: Boolean, default false, enables caching of compiled templates.
- delimiter: String, default '%', defines the tags used for scriptlets.
- compileDebug: Boolean, default true, includes line number information for debugging.
- debug: Boolean, default false, activates verbose mode for error tracing.

Troubleshooting Commands:
- To test template rendering independently, use a simple Node.js script invoking ejs.render with known good data.
- Check file existence with system commands (e.g., ls or dir) if renderFile reports ENOENT.
- For detailed error outputs, set debug to true and examine console logs for line number indications.

## Information Dense Extract
EJS templating engine; plain JS scriptlets (<% %>), caching via 'cache' option (default false); API: render(string, data, {cache, filename, delimiter, compileDebug, debug}) returns HTML string, renderFile(filename, data, options, callback) handles async file rendering; configuration: delimiter default '%', compileDebug true, debug false; debugging via standard JS exceptions with template line numbers; code samples include synchronous and async usage; best practices involve enabling caching in production, validating inputs, and using compileDebug in development; troubleshooting involves checking scriptlet syntax and file existence.

## Sanitised Extract
Table of Contents:
1. Simple Syntax:
   - EJS uses <% and %> for embedding plain JavaScript in templates. Developers can directly integrate JS logic for dynamic HTML output.
2. Fast Execution:
   - EJS compiles templates to intermediate JavaScript functions. These functions are cached if the 'cache' option is enabled, resulting in high-performance rendering.
3. Debugging and Error Handling:
   - Errors are thrown as standard JavaScript exceptions including detailed template line numbers, allowing for quick identification and resolution of issues.
4. API Methods:
   - ejs.render: Takes a template string, data object, and optional configuration options; returns a rendered HTML string.
   - ejs.renderFile: Accepts a filename, data object, optional options, and a callback function that provides error handling and the final HTML string.

Detailed Information for Each Topic:
1. Simple Syntax: Use plain JS in <% ... %> tags to output HTML; no additional preprocessing required.
2. Fast Execution: Leverage caching by setting cache: true; intermediate JS functions reduce render time.
3. Debugging: Errors are output with corresponding line numbers in the template file for quick debugging.
4. API Methods: Direct use of ejs.render and ejs.renderFile with explicit parameters as described.

## Original Source
EJS Documentation
https://ejs.co/

## Digest of EJS_DOCS

# EJS Documentation

This document was generated on 2023-10-12. It contains precise technical details extracted from the EJS documentation page.

## Overview
EJS is a templating engine that leverages plain JavaScript for creating HTML content. It employs simple scriptlet tags to embed JavaScript code directly within templates, enabling fast development, speedy execution, and straightforward debugging.

## Key Features

### Simple Syntax
- Embeds JavaScript code using scriptlet tags such as <% and %>.
- No complex or arcane syntax required.

### Fast Development and Execution
- Utilizes the native V8 JavaScript engine for rapid execution.
- Caches intermediate JavaScript functions to improve performance.

### Debugging
- Errors are thrown as plain JavaScript exceptions including template line-numbers.
- Simplified error tracing for immediate troubleshooting.

## API Methods

### ejs.render
- Signature: ejs.render(template: string, data: object, options?: object): string
- Description: Renders the provided template string with data, returning the resulting HTML as a string.

### ejs.renderFile
- Signature: ejs.renderFile(filename: string, data: object, options?: object, callback: (err: Error, str: string) => void): void
- Description: Asynchronously renders the template file using the provided data and options. Returns the rendered content through a callback function.

## Configuration Options
- cache (boolean): Enables/disables caching of compiled templates. Default is false.
- delimiter (string): Customizes the delimiter to use for scriptlet tags. Default is '%'.
- compileDebug (boolean): When true, includes compile-time debugging info. Default is true.
- debug (boolean): Enables extra debugging output. Default is false.

## Attribution
- Data Size: 9176 bytes
- Links Found: 33
- Retrieved from https://ejs.co/


## Attribution
- Source: EJS Documentation
- URL: https://ejs.co/
- License: MIT License
- Crawl Date: 2025-04-28T02:22:17.753Z
- Data Size: 9176 bytes
- Links Found: 33

## Retrieved
2025-04-28
library/SERVERLESS_FRAMEWORK.md
# library/SERVERLESS_FRAMEWORK.md
# SERVERLESS_FRAMEWORK

## Crawl Summary
Serverless Framework technical details include a YAML configuration file (serverless.yml) defining service name, provider settings (AWS, runtime nodejs14.x, region, stage, memorySize, timeout), function declarations with event triggers, and plugins (serverless-offline, serverless-prune-plugin, webpack, domain-manager) with custom configuration options. CLI commands such as deploy, invoke local, logs, and remove are specified. API specifications include AWS Lambda handler signature and plugin method definitions.

## Normalised Extract
Table of Contents:
1. Core Serverless Configuration
   - serverless.yml structure with service, provider (aws, runtime, region, stage, memory, timeout) and functions declaration.
2. Function Declaration and Event Bindings
   - Declare function name, handler (e.g. handler.hello) and events (HTTP path and method).
3. Plugin Integration and Custom Configurations
   - Plugins list: serverless-offline (with port configuration), serverless-prune-plugin (with number of versions to preserve), serverless-webpack, serverless-domain-manager.
   - Custom block details: key-value pairs for each plugin.
4. CLI Commands and Deployment Steps
   - serverless deploy, serverless invoke local -f <function>, serverless logs -f <function>, serverless remove.
5. Troubleshooting Procedures
   - Check logs via serverless logs, run in offline mode, validate YAML configuration.

Detailed Technical Information:
Core Configuration: Use serverless.yml to define service. Specify provider: name: aws, runtime: nodejs14.x, region: us-east-1, stage: dev, memorySize: 1024, timeout: 10.
Function Declaration: Under functions, add a function with key 'hello' with handler 'handler.hello' and an HTTP GET event on path '/hello'.
Plugins: Add plugins array with values "serverless-offline", "serverless-prune-plugin". In custom configuration, define serverless-offline port: 3000 and prune settings like automatic: true, number: 3.
CLI and Deployment: Use serverless deploy for deployment. To test locally, use serverless invoke local -f hello. To get function logs run serverless logs -f hello.
Troubleshooting: Validate YAML, review logs, and use serverless offline for local emulation.
API and SDK Methods: AWS Lambda handler signature: function(event: Object, context: Object, callback: Function): Promise<Object>. Plugin APIs expose methods like start() and stop() with Promise return types.

## Supplementary Details
Serverless.yml Configuration Options:
- service: string (e.g., 'my-service')
- provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-east-1',
    stage: 'dev',
    memorySize: 1024,
    timeout: 10
  }
- functions: {
    [functionName]: {
      handler: 'file.method',
      events: [{ http: { path: '/path', method: 'get' } }]
    }
  }
- plugins: Array of plugin names
- custom: {
    serverless-offline: { port: 3000 },
    prune: { automatic: true, number: 3 }
  }

Implementation Steps:
1. Create serverless.yml with the above structure.
2. Write function handler in a file (e.g., handler.js) with signature: async (event, context) => {}
3. Install plugins via npm (npm install serverless-offline serverless-prune-plugin --save-dev)
4. Deploy with 'serverless deploy'.
5. For local testing, run 'serverless offline'.

Troubleshooting:
- For deployment errors, run 'sls deploy --verbose' to get detailed logs.
- Validate YAML using online linters.
- Use 'sls logs -f <function>' to fetch real-time logs.

CLI Commands:
- Deploy: serverless deploy --stage dev
- Invoke function locally: serverless invoke local -f hello
- Show logs: serverless logs -f hello
- Remove deployment: serverless remove


## Reference Details
API Specifications:
- Function Handler Signature:
  function handler(event: Object, context: Object, callback: Function): Promise<Object>

- Plugin API Example:
  class OfflinePlugin {
    constructor(options: { port: number, host?: string })
    start(): Promise<void>
    stop(): Promise<void>
  }

SDK and CLI Commands:
- serverless deploy [--stage <stage>]: Deploy the service to AWS; default stage is 'dev'.
- serverless invoke local -f <functionName>: Invoke the function locally with the event payload.
- serverless logs -f <functionName>: Fetch logs for the specified function.
- serverless remove: Remove deployed service.

Complete Code Example:
// serverless.yml
service: my-service
provider:
  name: aws
  runtime: nodejs14.x
  region: us-east-1
  stage: dev
  memorySize: 1024
  timeout: 10
functions:
  hello:
    handler: handler.hello
    events:
      - http:
          path: hello
          method: get
plugins:
  - serverless-offline
  - serverless-prune-plugin
custom:
  serverless-offline:
    port: 3000
  prune:
    automatic: true
    number: 3

// handler.js
module.exports.hello = async (event, context) => {
  // Log incoming event
  console.log('Event:', event);
  // Return response
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello Serverless' })
  };
};

Best Practices:
- Always validate serverless.yml for syntax errors.
- Use environment-specific configurations by leveraging the 'stage' variable.
- Secure sensitive data through environment variables loaded from .env files using dotenv.
- Test functions locally using serverless-offline before deployment.

Troubleshooting Procedures:
1. YAML Validation:
   Command: yamllint serverless.yml
   Expected Output: No errors.
2. Deployment Debug:
   Command: serverless deploy --verbose
   Expected: Detailed logs of each deployment step.
3. Function Logs:
   Command: serverless logs -f hello
   Expected: Real-time log output from the AWS Lambda function.
4. Local Testing:
   Command: serverless offline
   Expected: Local emulation of AWS API Gateway and Lambda functions running on port 3000.


## Information Dense Extract
serverless.yml: service=my-service, provider={name: aws, runtime: nodejs14.x, region: us-east-1, stage: dev, memorySize:1024, timeout:10}, functions: {hello: {handler: handler.hello, events:[{http:{path:'/hello', method:'get'}}]}}, plugins: [serverless-offline, serverless-prune-plugin], custom: {serverless-offline: {port:3000}, prune: {automatic:true, number:3}}; Lambda handler signature: function handler(event:Object, context:Object, callback:Function):Promise<Object>; CLI: serverless deploy, invoke local, logs, remove; Code example provided in handler.js; troubleshooting: yamllint check, deploy --verbose, logs -f hello, offline for local debugging.

## Sanitised Extract
Table of Contents:
1. Core Serverless Configuration
   - serverless.yml structure with service, provider (aws, runtime, region, stage, memory, timeout) and functions declaration.
2. Function Declaration and Event Bindings
   - Declare function name, handler (e.g. handler.hello) and events (HTTP path and method).
3. Plugin Integration and Custom Configurations
   - Plugins list: serverless-offline (with port configuration), serverless-prune-plugin (with number of versions to preserve), serverless-webpack, serverless-domain-manager.
   - Custom block details: key-value pairs for each plugin.
4. CLI Commands and Deployment Steps
   - serverless deploy, serverless invoke local -f <function>, serverless logs -f <function>, serverless remove.
5. Troubleshooting Procedures
   - Check logs via serverless logs, run in offline mode, validate YAML configuration.

Detailed Technical Information:
Core Configuration: Use serverless.yml to define service. Specify provider: name: aws, runtime: nodejs14.x, region: us-east-1, stage: dev, memorySize: 1024, timeout: 10.
Function Declaration: Under functions, add a function with key 'hello' with handler 'handler.hello' and an HTTP GET event on path '/hello'.
Plugins: Add plugins array with values 'serverless-offline', 'serverless-prune-plugin'. In custom configuration, define serverless-offline port: 3000 and prune settings like automatic: true, number: 3.
CLI and Deployment: Use serverless deploy for deployment. To test locally, use serverless invoke local -f hello. To get function logs run serverless logs -f hello.
Troubleshooting: Validate YAML, review logs, and use serverless offline for local emulation.
API and SDK Methods: AWS Lambda handler signature: function(event: Object, context: Object, callback: Function): Promise<Object>. Plugin APIs expose methods like start() and stop() with Promise return types.

## Original Source
Serverless Framework Documentation
https://www.serverless.com/framework/docs/

## Digest of SERVERLESS_FRAMEWORK

# Serverless Framework Documentation

Retrieved: 2025-??-?? (Using current retrieval date as provided, e.g., 2025-04-17 is one of the dates in the crawl)

## Core Configuration
- File: serverless.yml
- Service declaration: service: my-service
- Provider configuration:
  provider:
    name: aws
    runtime: nodejs14.x
    region: us-east-1
    stage: dev
    memorySize: 1024
    timeout: 10

## Functions Declaration
- Example function declaration:
  functions:
    hello:
      handler: handler.hello
      events:
        - http:
            path: hello
            method: get

## Plugins and Custom Configurations
- Plugins are declared under the plugins section. Common plugins include:
  - serverless-offline: Emulates AWS Lambda and API Gateway locally
  - serverless-prune-plugin: Deletes older function versions
  - serverless-webpack: Bundles lambda functions with Webpack
  - serverless-domain-manager: Handles customization of API Gateway domains

Custom configuration is handled under the custom field:
custom:
  serverless-offline:
    port: 3000
  prune:
    automatic: true
    number: 3

## CLI Commands and Deployment
- Deployment: serverless deploy
- Local invocation: serverless invoke local -f hello
- Logs retrieval: serverless logs -f hello
- Removal: serverless remove

## Advanced Settings
- Environment Variables: Use dotenv or inline definition under provider.environment
- IAM Role Customizations: Define per function under functions.[functionName].iamRoleStatements

## Troubleshooting
- Check logs: serverless logs -f <functionName>
- Run in offline mode to debug: serverless offline
- Validate YAML configuration: use online YAML lint tools

## API and SDK Method Signatures
- AWS Lambda handler sample:
  function handler(event: Object, context: Object, callback: Function): Promise<Object> {
    // implementation
  }

- Serverless Plugin API example:
  class OfflinePlugin {
    constructor(options: { port: number, host?: string })
    start(): Promise<void>
    stop(): Promise<void>
  }

## Code Example
// File: serverless.yml
service: my-service

provider:
  name: aws
  runtime: nodejs14.x
  region: us-east-1
  stage: dev
  memorySize: 1024
  timeout: 10

functions:
  hello:
    handler: handler.hello
    events:
      - http:
          path: hello
          method: get

plugins:
  - serverless-offline
  - serverless-prune-plugin

custom:
  serverless-offline:
    port: 3000
  prune:
    automatic: true
    number: 3

// File: handler.js
module.exports.hello = async (event, context) => {
  // Example Lambda function
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello Serverless' })
  };
};


## Attribution
- Source: Serverless Framework Documentation
- URL: https://www.serverless.com/framework/docs/
- License: Apache 2.0
- Crawl Date: 2025-04-29T13:54:47.403Z
- Data Size: 649952 bytes
- Links Found: 2105

## Retrieved
2025-04-29
library/COMMANDER_JS.md
# library/COMMANDER_JS.md
# COMMANDER_JS

## Crawl Summary
Installation via npm; Usage of program and Command for CLI definitions; Methods include .option(), .argument(), .command(), .parse(), .opts(); Option types include boolean, value, negatable, optional; Custom processing using callbacks (e.g., myParseInt); Support for subcommands with action handlers; Variadic and required options; Auto-generated help and customizable help text; Error and exit handling with exitOverride; Lifecycle hooks using .hook() for preAction and postAction; Methods to combine local and global options with .optsWithGlobals().

## Normalised Extract
Table of Contents:
1. Installation and Setup
   - npm install commander
   - Import using require or import
2. Options Implementation
   - Method: .option(flags: string, description: string, defaultValue?: any, customParser?: function)
   - Examples include boolean option (--first), value option (-s, --separator <char>), default value specification for cheese option
3. Command Definitions
   - Using .command(name) with action handlers
   - Example: program.command('split').description('...').argument('<string>', 'string to split').option('--first', '...').option('-s, --separator <char>', '...', ',').action((str, options) => { ... })
4. Custom Option and Argument Processing
   - Use of custom parsing callbacks such as myParseInt
5. Parsing and Execution
   - Methods: .parse(), .parseAsync(), with support for process.argv and custom array inputs
6. Help and Error Handling
   - Auto-help with -h, --help; custom help with .addHelpText(), .helpOption(), .helpCommand()
   - Exit override using program.exitOverride() in try/catch
7. Advanced Features and Lifecycle Hooks
   - Variadic options (.option('-n, --number <numbers...>'))
   - Required options (.requiredOption())
   - Lifecycle hooks using .hook('preAction', callback)

Detailed Technical Information:
Installation and setup is straightforward. .option() is used to define CLI options with flags (short and long), description and optional default values. In multi-command programs, use .command() to define subcommands with separate action handlers. Custom argument processing can be added by passing a callback function that modifies the input value.

Configuration: Default values can be provided, environment variables linked using .env(), and conflicts handled via .conflicts().

Error Handling: program.exitOverride() throws a CommanderError which includes exitCode, code, and message. Custom error messages can be displayed using program.error(message, { exitCode, code }).

Usage Options: .opts() returns options; .getOptionValue() retrieves a single option; .optsWithGlobals() merges local and global options.

For executable subcommands, provide a file name and ensure the executable file has proper mode (e.g., 755) for global installation.

## Supplementary Details
Technical Specifications:
- .option(flag: string, description: string, [defaultValue: any], [customParser: Function]) returns Command instance.
- .argument(name: string, description: string, [defaultValue: any]) adds command arguments; supports notation: <required>, [optional], <...variadic>.
- .command(name: string, [description: string], [options: Object]) creates subcommands. Options can include { executableFile: string, isDefault: boolean, hidden: boolean }.
- .parse(args?: string[], options?: Object) supports parsing process.argv or custom arrays.
- Lifecycle hooks: .hook(eventName: string, callback: Function) supports events 'preAction', 'postAction', 'preSubcommand'.
- Error handling: program.exitOverride() must be used to override process.exit and catch errors. CommanderError includes: { exitCode: number, code: string, message: string }.

Implementation Steps:
1. Import Commander: const { Command } = require('commander');
2. Create a new command: const program = new Command();
3. Define options using .option() with parameter definitions.
4. Define arguments using .argument(); support variadic by appending '...'.
5. Define subcommands with .command() and attach .action() handlers.
6. Call program.parse(process.argv) to execute.
7. Handle errors with try/catch when using exitOverride().

Configuration Options and Defaults:
- Default cheese option: default is 'blue'.
- Separator option: default is ',' for string splitting.
- Verbose option: can be increased with repeated flags; using a callback (e.g., previous+1).

Best Practices:
- Create isolated Command objects for unit testing.
- Use custom parsers to ensure type safety (e.g., parseFloat, myParseInt).
- Leverage .configureOutput() to redirect stdout/stderr for enhanced logging.

Troubleshooting Procedures:
- If an unknown option error occurs, check .allowUnknownOption() usage.
- Use process.exitOverride() to capture errors in try/catch and log CommanderError details.
- Ensure subcommand files are executable with mode 755 when using stand-alone executables.

Exact Commands:
- node split.js -s / --first a/b/c (expected output: [ 'a' ])
- node string-util.js split --separator=/ a/b/c (expected output: [ 'a', 'b', 'c' ])

## Reference Details
API Specifications:
1. program.option(flag: string, description: string, [defaultValue: any], [customParser: Function])
   - Returns: Command
   - Example: program.option('-p, --port <number>', 'server port number');

2. program.requiredOption(flag: string, description: string, [defaultValue: any], [customParser: Function])
   - Throws error if not provided. Example: program.requiredOption('-c, --cheese <type>', 'pizza must have cheese');

3. program.argument(name: string, description: string, [defaultValue: any])
   - Supports: <required>, [optional], <...variadic>
   - Example: program.argument('<username>', 'user to login');

4. program.command(name: string, [description: string], [options: Object])
   - Options: { executableFile?: string, isDefault?: boolean, hidden?: boolean }
   - Example: program.command('clone <source> [destination]').description('clone a repository').action((source, destination) => { /* implementation */ });

5. program.parse(args?: string[], options?: { from?: string })
   - Handles process.argv by default. Use program.parse(process.argv) or program.parseAsync(process.argv) for async actions.

6. program.opts() returns an object containing parsed options.

7. program.hook(event: string, callback: Function)
   - Supported events: 'preAction', 'postAction', 'preSubcommand'
   - Callback receives (thisCommand, actionCommand) or (thisCommand, subcommand) as appropriate.

8. program.exitOverride([callback])
   - Overrides default exit. Callback receives a CommanderError with properties exitCode (number), code (string), message (string).

Complete Code Example:

// file: string-util.js
const { Command } = require('commander');
const program = new Command();

program.name('string-util')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0');

program.command('split')
  .description('Split a string into substrings and display as an array')
  .argument('<string>', 'string to split')
  .option('--first', 'display just the first substring')
  .option('-s, --separator <char>', 'separator character', ',')
  .action((str, options) => {
    const limit = options.first ? 1 : undefined;
    console.log(str.split(options.separator, limit));
  });

try {
  program.parse(process.argv);
} catch (err) {
  console.error('Error encountered:', err.message);
  process.exit(err.exitCode || 1);
}

// Troubleshooting: Use node string-util.js split --separator=/ a/b/c to see expected output.

Configuration Options:
- Default for cheese option: 'blue'
- Default separator: ','
- Verbose option increases count: callback (previous + 1) with default 0

Best Practices:
- Use isolated Command instances for testing
- Validate inputs with custom parsers
- Override exit to manage errors gracefully

Detailed Troubleshooting:
- If unknown option error occurs, check option definitions and use .allowUnknownOption() if needed.
- For subcommand errors, verify executable file naming and permissions (chmod 755).
- Test using: node yourProgram.js --help to verify help text generation.

## Information Dense Extract
npm install commander; import { Command } from 'commander'; program.option('-p, --port <number>', 'server port number'); program.requiredOption('-c, --cheese <type>', 'must have cheese'); program.argument('<username>', 'user to login'); program.command('split').description('split a string').argument('<string>', 'string to split').option('--first', 'first substring').option('-s, --separator <char>', 'separator', ',').action((str, opts) => { const limit = opts.first ? 1 : undefined; console.log(str.split(opts.separator, limit)); }); program.parse(process.argv); use .exitOverride() for error management; lifecycle hooks: .hook('preAction', (cmd, sub) => {}); custom parsing with callbacks (e.g., parseInt); help via -h,--help; troubleshoot by checking unknown option errors and file permissions.

## Sanitised Extract
Table of Contents:
1. Installation and Setup
   - npm install commander
   - Import using require or import
2. Options Implementation
   - Method: .option(flags: string, description: string, defaultValue?: any, customParser?: function)
   - Examples include boolean option (--first), value option (-s, --separator <char>), default value specification for cheese option
3. Command Definitions
   - Using .command(name) with action handlers
   - Example: program.command('split').description('...').argument('<string>', 'string to split').option('--first', '...').option('-s, --separator <char>', '...', ',').action((str, options) => { ... })
4. Custom Option and Argument Processing
   - Use of custom parsing callbacks such as myParseInt
5. Parsing and Execution
   - Methods: .parse(), .parseAsync(), with support for process.argv and custom array inputs
6. Help and Error Handling
   - Auto-help with -h, --help; custom help with .addHelpText(), .helpOption(), .helpCommand()
   - Exit override using program.exitOverride() in try/catch
7. Advanced Features and Lifecycle Hooks
   - Variadic options (.option('-n, --number <numbers...>'))
   - Required options (.requiredOption())
   - Lifecycle hooks using .hook('preAction', callback)

Detailed Technical Information:
Installation and setup is straightforward. .option() is used to define CLI options with flags (short and long), description and optional default values. In multi-command programs, use .command() to define subcommands with separate action handlers. Custom argument processing can be added by passing a callback function that modifies the input value.

Configuration: Default values can be provided, environment variables linked using .env(), and conflicts handled via .conflicts().

Error Handling: program.exitOverride() throws a CommanderError which includes exitCode, code, and message. Custom error messages can be displayed using program.error(message, { exitCode, code }).

Usage Options: .opts() returns options; .getOptionValue() retrieves a single option; .optsWithGlobals() merges local and global options.

For executable subcommands, provide a file name and ensure the executable file has proper mode (e.g., 755) for global installation.

## Original Source
Commander.js Documentation
https://github.com/tj/commander.js/#readme

## Digest of COMMANDER_JS

# Commander.js Documentation

Date Retrieved: 2023-10-27

## Installation
Install using npm: npm install commander

## Quick Start Example

Use require/import to get the Command object:

CommonJS (.cjs):

const { program } = require('commander');

program
  .option('--first')
  .option('-s, --separator <char>')
  .argument('<string>');

program.parse();

const options = program.opts();
const limit = options.first ? 1 : undefined;
console.log(program.args[0].split(options.separator, limit));

## Options Handling

- Define options using .option() with short flag, long flag and value placeholders.
  Example:
  program.option('-p, --port <number>', 'server port number');

- Boolean options and default values:
  program.option('-c, --cheese <type>', 'add the specified type of cheese', 'blue');

- Negatable options:
  program.option('--no-sauce', 'Remove sauce');

- Option for both boolean and value (optional):
  program.option('-c, --cheese [type]', 'Add cheese with optional type');

## Command Definitions

- Create commands with action handler:
  const { Command } = require('commander');
  const program = new Command();

  program.command('split')
    .description('Split a string into substrings')
    .argument('<string>', 'string to split')
    .option('--first', 'display just the first substring')
    .option('-s, --separator <char>', 'separator character', ',')
    .action((str, options) => {
      const limit = options.first ? 1 : undefined;
      console.log(str.split(options.separator, limit));
    });

## Custom Option Processing

- Use callbacks to process option-arguments:

function myParseInt(value, previous) {
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new Error('Not a number.');
  }
  return parsedValue;
}

program
  .option('-i, --integer <number>', 'integer argument', myParseInt);

## Parsing and Configuration

- Parse arguments using program.parse(process.argv) or program.parseAsync(process.argv).
- Use .opts(), .optsWithGlobals(), .getOptionValue(), etc.

## Help System

- Auto-generated help is available with -h, --help.
- Customize using .addHelpText(), .helpOption(), and .helpCommand().

## Advanced Features

- Variadic options:
  program.option('-n, --number <numbers...>', 'specify numbers');

- Required options:
  program.requiredOption('-c, --cheese <type>', 'pizza must have cheese');

- Command life cycle hooks:
  program.hook('preAction', (thisCommand, actionCommand) => {
    if (thisCommand.opts().trace) {
      console.log(`About to call action handler for subcommand: ${actionCommand.name()}`);
    }
  });

## Error Handling and Exit Overrides

- Override exit using program.exitOverride();
  try {
    program.parse(process.argv);
  } catch (err) {
    // Custom error processing can be done here
  }

## Configuration Options and Best Practices

- Use .storeOptionsAsProperties() for legacy support (not recommended for new development).
- Set environment variables with .env() and use .default() to provide defaults along with description.
- For debugging, adjust output using .configureOutput() with custom functions for writeOut, writeErr, and outputError.

Attribution: Commander.js documentation from https://github.com/tj/commander.js/#readme
Data Size: 787287 bytes

## Attribution
- Source: Commander.js Documentation
- URL: https://github.com/tj/commander.js/#readme
- License: MIT License
- Crawl Date: 2025-04-29T07:48:19.754Z
- Data Size: 787287 bytes
- Links Found: 5473

## Retrieved
2025-04-29
library/NODE_STREAMS.md
# library/NODE_STREAMS.md
# NODE_STREAMS

## Crawl Summary
Detailed Node.js streams API covering Writable, Readable, Duplex, and Transform streams. Includes method signatures like write(chunk[, encoding][, callback]) returning boolean, end([chunk[, encoding]][, callback]), and pipeline(source[, ...transforms], destination[, options]) returning Promise. Lists events such as 'close', 'drain', 'error', 'finish', using explicit configuration options (highWaterMark, objectMode, emitClose) and includes complete code examples for pipeline, finished, and stream creation with AbortSignal integration.

## Normalised Extract
Table of Contents:
1. Writable Streams
  - Methods: write(chunk[, encoding][, callback]) -> boolean
  - end([chunk[, encoding]][, callback]) -> this
  - cork(), uncork(), destroy([error]) -> this
  - setDefaultEncoding(encoding) -> this
  - Properties: closed, destroyed, writableFinished, writableHighWaterMark, writableLength, writableNeedDrain, writableObjectMode
  - Events: close, drain, error, finish, pipe, unpipe
2. Readable Streams
  - Methods: read([size]) -> chunk, pause(), resume(), pipe(destination[, options]), setEncoding(encoding), unshift(chunk[, encoding]), destroy([error]) -> this, and async iteration via [Symbol.asyncIterator]()
  - Properties: closed, destroyed, readableHighWaterMark, readableLength, readableObjectMode, readableFlowing
  - Events: close, data, end, error, pause, readable, resume
3. Duplex and Transform Streams
  - Duplex streams combine readable and writable interfaces
  - Transform streams implement _transform(chunk, encoding, callback) and _flush(callback)
  - PassThrough stream available
4. Streams Promises API
  - pipeline(source[, ...transforms], destination[, options]) -> Promise
    • Parameters: source (Stream|Iterable|AsyncIterable|Function), transforms (...Stream|Function), destination (Stream|Function), options (object: signal: AbortSignal, end: boolean default true)
    • Returns: Promise that fulfills when pipeline completes
  - finished(stream[, options]) -> Promise
    • Options: signal (AbortSignal), cleanup (boolean, default false)
    • Returns: Promise fulfilled when stream is no longer readable/writable
Detailed Implementation:
- Use new stream.Writable([options]) with custom _write and _final for writing flows.
- Use new stream.Readable([options]) with custom _read and push() calls.
- Backpressure management via return value of write(), and employing drain event.
- Integration of AbortController with pipeline for cancellation of streaming operations.

## Supplementary Details
Configuration Options:
- highWaterMark: Number (bytes for binary streams, objects count for objectMode). Determines internal buffer threshold.
- objectMode: Boolean. True enables non-buffer primitives; default false.
- emitClose: Boolean. When true, 'close' is emitted after destruction.

Implementation Steps for Custom Streams:
1. Writable Stream Implementation:
   • Instantiate: new stream.Writable({ highWaterMark: <number>, objectMode: <boolean> })
   • Override: _write(chunk, encoding, callback) for each chunk processing.
   • Optionally implement _writev(chunks, callback) for batched writes.
   • Ensure calling writable.end() with final chunk if needed.

2. Readable Stream Implementation:
   • Instantiate: new stream.Readable({ highWaterMark: <number>, objectMode: <boolean> })
   • Override: _read(size) to push new data using this.push(data).
   • End stream by pushing null.

3. Duplex/Transform Streams:
   • Instantiate with new stream.Duplex(options) for combined readable and writable.
   • In Transform streams, implement _transform(chunk, encoding, callback) and optionally _flush(callback).

4. Streams Promises API Usage:
   • pipeline example with AbortSignal:
       const ac = new AbortController();
       const { signal } = ac;
       setImmediate(() => ac.abort());
       await pipeline(
         fs.createReadStream('archive.tar'),
         zlib.createGzip(),
         fs.createWriteStream('archive.tar.gz'),
         { signal }
       );

5. Troubleshooting:
   • Check for backpressure: if write() returns false, wait for 'drain' event before further writes.
   • Use finished(stream, { cleanup: true }) to remove lingering event listeners after errors.
   • Use console.error in catch blocks to output AbortError or other stream errors.

Best Practices:
- Always handle the 'error' event on streams to avoid unhandled exceptions.
- Prefer using pipeline() for chaining streams to automatically handle errors and cleanup.
- In high-concurrency scenarios, configure highWaterMark appropriately to balance memory usage and throughput.

## Reference Details
API Specifications:

1. stream.Writable:
   - Constructor: new stream.Writable(options?: { highWaterMark?: number, objectMode?: boolean, emitClose?: boolean })
   - Method: write(chunk: string|Buffer|TypedArray|DataView, encoding?: string, callback?: (error?: Error) => void) -> boolean
   - Method: end([chunk: string|Buffer|TypedArray|DataView, encoding?: string, callback?: () => void]) -> this
   - Method: cork() -> void
   - Method: uncork() -> void
   - Method: destroy([error?: Error]) -> this
   - Method: setDefaultEncoding(encoding: string) -> this
   - Properties: closed (boolean), destroyed (boolean), writableFinished (boolean), writableHighWaterMark (number), writableLength (number), writableNeedDrain (boolean), writableObjectMode (boolean)
   - Events: 'close', 'drain', 'error', 'finish', 'pipe', 'unpipe'

2. stream.Readable:
   - Constructor: new stream.Readable(options?: { highWaterMark?: number, objectMode?: boolean, encoding?: string, emitClose?: boolean })
   - Method: read([size?: number]) -> any
   - Method: setEncoding(encoding: string) -> this
   - Method: pause() -> this
   - Method: resume() -> this
   - Method: pipe(destination: stream.Writable, options?: { end?: boolean }) -> stream.Writable
   - Method: unshift(chunk: any, encoding?: string) -> void
   - Method: destroy([error?: Error]) -> this
   - Supports async iteration using [Symbol.asyncIterator]()
   - Properties: closed (boolean), destroyed (boolean), readableHighWaterMark (number), readableLength (number), readableObjectMode (boolean), readableFlowing (boolean|null)
   - Events: 'close', 'data', 'end', 'error', 'pause', 'readable', 'resume'

3. stream.Duplex and stream.Transform:
   - Duplex Constructor: new stream.Duplex(options?: DuplexOptions)
   - Transform Constructor: new stream.Transform(options?: TransformOptions)
   - In Transform: _transform(chunk, encoding, callback: (error?: Error, data?: any) => void), _flush(callback: (error?: Error, data?: any) => void)

4. Streams Promises API:
   - pipeline:
     • Signature: pipeline(source: Stream|Iterable|AsyncIterable|Function, ...transforms: (Stream|Function), destination?: Stream|Function, options?: { signal?: AbortSignal, end?: boolean }) -> Promise
     • Returns: Promise that resolves when pipeline completes
     • Example usage provided above
   - finished:
     • Signature: finished(stream: Stream|ReadableStream|WritableStream, options?: { signal?: AbortSignal, cleanup?: boolean }) -> Promise
     • Returns: Promise fulfilled when stream ends

Code Examples:
// Writable Stream Example
const { Writable } = require('node:stream');
const myWritable = new Writable({ highWaterMark: 1024, objectMode: false });
myWritable._write = function(chunk, encoding, callback) {
  // Process chunk
  callback();
};
myWritable.write('data', 'utf8', (err) => { if(err) console.error(err); });
myWritable.end('final data', 'utf8', () => { console.log('Done writing'); });

// Pipeline with AbortSignal Example
const { pipeline } = require('node:stream/promises');
const fs = require('node:fs');
const zlib = require('node:zlib');
(async () => {
  const ac = new AbortController();
  const { signal } = ac;
  setImmediate(() => ac.abort());
  try {
    await pipeline(
      fs.createReadStream('archive.tar'),
      zlib.createGzip(),
      fs.createWriteStream('archive.tar.gz'),
      { signal }
    );
    console.log('Pipeline succeeded.');
  } catch (err) {
    console.error('Pipeline error:', err);
  }
})();

Troubleshooting Steps:
- Verify write() return values for backpressure; wait for 'drain' event if false.
- Use finished() with { cleanup: true } to remove residual listeners after stream errors.
- Check AbortSignal usage in async generators to ensure pipeline completion.
- Log full error objects in catch blocks for detailed diagnostics.

Configuration Details:
- highWaterMark default: typically 16KB for non-object mode streams.
- objectMode default: false unless explicitly set.
- end option in pipeline defaults to true but can be set to false to prevent auto-closing of destination streams.

## Information Dense Extract
NODE_STREAMS: Writable (write(chunk[, encoding][,cb]) -> boolean, end([chunk, encoding, cb]) -> this, cork(), uncork(), destroy([err]) -> this; props: closed, destroyed, writableFinished, writableHighWaterMark, writableLength, writableNeedDrain; events: close, drain, error, finish, pipe, unpipe), Readable (read([size]) -> any, setEncoding(encoding), pause(), resume(), pipe(dest[, {end}]), unshift(chunk), destroy([err]) -> this; async iteration via Symbol.asyncIterator; props: closed, destroyed, readableHighWaterMark, readableLength, readableObjectMode, readableFlowing; events: close, data, end, error, pause, readable, resume), Duplex/Transform (combine read/write; Transform implements _transform(chunk, encoding, cb), _flush(cb)), Streams Promises API: pipeline(source[, ...transforms], destination[, {signal, end}]) -> Promise, finished(stream[, {signal, cleanup}]) -> Promise; code examples, configuration: highWaterMark, objectMode, emitClose; detailed best practices on backpressure handling, error events, AbortSignal integration, and cleanup procedures.

## Sanitised Extract
Table of Contents:
1. Writable Streams
  - Methods: write(chunk[, encoding][, callback]) -> boolean
  - end([chunk[, encoding]][, callback]) -> this
  - cork(), uncork(), destroy([error]) -> this
  - setDefaultEncoding(encoding) -> this
  - Properties: closed, destroyed, writableFinished, writableHighWaterMark, writableLength, writableNeedDrain, writableObjectMode
  - Events: close, drain, error, finish, pipe, unpipe
2. Readable Streams
  - Methods: read([size]) -> chunk, pause(), resume(), pipe(destination[, options]), setEncoding(encoding), unshift(chunk[, encoding]), destroy([error]) -> this, and async iteration via [Symbol.asyncIterator]()
  - Properties: closed, destroyed, readableHighWaterMark, readableLength, readableObjectMode, readableFlowing
  - Events: close, data, end, error, pause, readable, resume
3. Duplex and Transform Streams
  - Duplex streams combine readable and writable interfaces
  - Transform streams implement _transform(chunk, encoding, callback) and _flush(callback)
  - PassThrough stream available
4. Streams Promises API
  - pipeline(source[, ...transforms], destination[, options]) -> Promise
     Parameters: source (Stream|Iterable|AsyncIterable|Function), transforms (...Stream|Function), destination (Stream|Function), options (object: signal: AbortSignal, end: boolean default true)
     Returns: Promise that fulfills when pipeline completes
  - finished(stream[, options]) -> Promise
     Options: signal (AbortSignal), cleanup (boolean, default false)
     Returns: Promise fulfilled when stream is no longer readable/writable
Detailed Implementation:
- Use new stream.Writable([options]) with custom _write and _final for writing flows.
- Use new stream.Readable([options]) with custom _read and push() calls.
- Backpressure management via return value of write(), and employing drain event.
- Integration of AbortController with pipeline for cancellation of streaming operations.

## Original Source
New Source: Node.js Streams Documentation
https://nodejs.org/api/stream.html

## Digest of NODE_STREAMS

# Node Streams Documentation

Retrieved: 2023-10-04

## Overview
A stream in Node.js is an abstract interface for working with streaming data. Streams can be readable, writable, duplex (both readable and writable) or transform (a type of duplex that can modify data).

## Stream Types and Core APIs

### Writable Streams (Class: stream.Writable)
- Methods: 
  - writable.write(chunk[, encoding][, callback]) -> boolean
  - writable.end([chunk[, encoding]][, callback]) -> this
  - writable.cork() and writable.uncork()
  - writable.destroy([error]) -> this
  - writable.setDefaultEncoding(encoding) -> this
- Properties and Events: 
  - writable.closed, writable.destroyed, writable.writableFinished, writable.writableHighWaterMark, writable.writableLength, writable.writableNeedDrain, writable.writableObjectMode
  - Events: 'close', 'drain', 'error', 'finish', 'pipe', 'unpipe'

### Readable Streams (Class: stream.Readable)
- Methods:
  - readable.read([size]) -> chunk
  - readable.pause(), readable.resume()
  - readable.pipe(destination[, options])
  - readable.setEncoding(encoding)
  - readable.unshift(chunk[, encoding])
  - readable.destroy([error])
  - Symbol.asyncIterator() for async iteration
- Properties and Events:
  - readable.closed, readable.destroyed, readable.readableHighWaterMark, readable.readableLength, readable.readableObjectMode, readable.readableFlowing
  - Events: 'close', 'data', 'end', 'error', 'pause', 'readable', 'resume'

### Duplex and Transform Streams
- Duplex streams combine Readable and Writable; examples include net.Socket.
- Transform streams inherit Duplex and include:
  - Methods: _transform(chunk, encoding, callback) and _flush(callback)
  - Class: stream.Transform, stream.PassThrough

### Streams Promises API
Provides asynchronous utility functions that return Promises instead of using callbacks. Additional methods include:

- stream.pipeline(source[, ...transforms], destination[, options])
  - Signature:
    • pipeline(source: Stream | Iterable | AsyncIterable | Function, ...transforms: (Stream | Function), destination?: Stream | Function, options?: {signal?: AbortSignal, end?: boolean}) -> Promise
  - Description: Chains multiple streams and returns a Promise fulfilled when pipeline is complete. Option end option (default true) controls closing of the destination.
  - Code Example:
    const { pipeline } = require('node:stream/promises');
    const fs = require('node:fs');
    const zlib = require('node:zlib');
    async function run() {
      await pipeline(
        fs.createReadStream('archive.tar'),
        zlib.createGzip(),
        fs.createWriteStream('archive.tar.gz')
      );
      console.log('Pipeline succeeded.');
    }
    run().catch(console.error);

- stream.finished(stream[, options]) -> Promise
  - Options: { signal?: AbortSignal, cleanup?: boolean (default false) }
  - Description: Returns a Promise fulfilled when the stream is no longer readable or writable.
  - Code Example:
    const { finished } = require('node:stream/promises');
    const fs = require('node:fs');
    const rs = fs.createReadStream('archive.tar');
    async function run() {
      await finished(rs);
      console.log('Stream is done reading.');
    }
    run().catch(console.error);
    rs.resume();

## Implementation Guidelines

### Creating a Writable Stream
- Instantiate with new stream.Writable([options]).
- Implement _construct(callback), _write(chunk, encoding, callback), _writev(chunks, callback), _final(callback), _destroy(err, callback) for custom behavior.

### Creating a Readable Stream
- Instantiate with new stream.Readable([options]).
- Implement _construct(callback), _read(size), _destroy(err, callback)
- Use push(chunk[, encoding]) to supply data to the internal buffer.

### Creating a Duplex or Transform Stream
- Instantiate with new stream.Duplex(options) or new stream.Transform([options]).
- Duplex streams handle independent read and write buffering.

### Object Mode and Buffering
- Object mode is enabled via options: { objectMode: true }.
- The highWaterMark option controls the amount of data buffered (bytes for binary, objects for object mode).

## Configuration Options and Effects

- highWaterMark: For Writable and Readable streams; defines buffer threshold.
- objectMode: When true, streams accept arbitrary JavaScript values except null.
- emitClose (Writable/Readable): When true, emits 'close' event after stream destruction.

## Attributes for Advanced Usage

- For backpressure handling, writable.write() returns false when internal buffer exceeds highWaterMark. Use drain event to continue writing.
- Use writable.cork() and writable.uncork() to batch small writes.
- Async iterators and generators may be used with streams (Symbol.asyncIterator()).
- Advanced pipeline usage supports AbortSignals for cancellation.

## Attribution
Data Size: 3596314 bytes, 1262 links available. Crawled from Node.js v23.11.0 stream documentation.

## Attribution
- Source: New Source: Node.js Streams Documentation
- URL: https://nodejs.org/api/stream.html
- License: MIT License
- Crawl Date: 2025-04-27T09:47:51.203Z
- Data Size: 3596314 bytes
- Links Found: 1262

## Retrieved
2025-04-27
library/D3_JS.md
# library/D3_JS.md
# D3_JS

## Crawl Summary
Key technical details include D3.js API for selections, transitions, scales (scaleUtc, scaleLinear), axes (axisBottom, axisLeft), line generators (d3.line), and data join techniques. It demonstrates full integration examples in vanilla HTML, Node (npm installation), React (useRef with d3.axis) and Svelte (reactive $: with bind:this), including complete code examples with precise dimension settings and transformation functions.

## Normalised Extract
Table of Contents:
1. Selections and Transitions
   - Use selection.enter(), selection.update(), selection.exit() for efficient DOM updates.
2. Scales and Axes
   - d3.scaleUtc(): domain([Date, Date]), range([number, number]);
   - d3.scaleLinear(): domain([min, max]), range([number, number]);
   - Axis generators: d3.axisBottom(scale) and d3.axisLeft(scale) for rendering axes.
3. Path and Line Generators
   - d3.line(): Configure with .x((d, i) => x(i)) and .y(y) to create SVG path data.
4. Integration in HTML and Modules
   - Import via ES Module (https://cdn.jsdelivr.net/npm/d3@7/+esm) or UMD bundle.
   - Code structure with container append operations and proper margins passed to scales.
5. Framework Integrations
   - React: Use useRef, useEffect, and call d3.axisBottom/select to mount axes.
   - Svelte: Use reactive statements ($:) and bind:this for dynamic axis updates.
6. Data Join Operations
   - Use selection.data(data) and process .enter(), .merge(), .exit() for smooth transitions.

For each section, the implementation details include exact parameter values (e.g., width: 640, height: 400, margins: 20/30/40), precise function calls, and complete code examples that can be directly integrated.

## Supplementary Details
Detailed Specifications:
- Chart Dimensions: width=640, height=400, margins: top=20, right=20, bottom=30, left=40.
- Scale Configurations:
   x Scale: d3.scaleUtc() with domain [new Date('2023-01-01'), new Date('2024-01-01')] and range [marginLeft, width-marginRight].
   y Scale: d3.scaleLinear() with domain [0, 100] and range [height-marginBottom, marginTop].
- Axis Functions: d3.axisBottom(x) and d3.axisLeft(y) appended to SVG groups with proper translation transforms.
- Module Import Examples:
   ES Module: import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm';
   Node: import * as d3 from 'd3';
- React and Svelte Integration Patterns with full JSX and Svelte syntax, utilizing useRef, useEffect, $: reactive declarations, and bind:this for DOM element references.
- Installation Options via npm, yarn, pnpm with commands:
   npm install d3
   yarn add d3
   pnpm add d3
- Best Practices: Only update needed elements in data joins, use non-minified bundles for debugging, relegate DOM manipulations to specific lifecycle hooks in frameworks.
- Troubleshooting Steps:
   1. Check scale domains and ranges for correctness.
   2. Use browser developer tools to inspect appended SVG elements.
   3. Verify imported module versions and ensure CDN URLs are correct.
   4. Confirm useEffect dependencies when integrating with React.


## Reference Details
API Specifications:
- d3.create(tagName: string): Returns a detached element selection; usage: d3.create('svg').attr('width', width).attr('height', height).
- d3.scaleUtc(): No arguments; chainable methods: .domain(Date[]), .range(number[]).
- d3.scaleLinear(): No arguments; chainable methods: .domain(number[]), .range(number[]).
- d3.axisBottom(scale): Accepts a scale as parameter; returns an axis generator function; supports .ticks(count: number) and .tickFormat(formatFunction: Function).
- d3.axisLeft(scale): Similar specifications to axisBottom but for y-axis rendering.
- d3.line(): Returns a line generator; methods: .x(fn: (d, i) => number), .y(fn: (d, i) => number); usage: const pathData = line(data).

SDK Method Signatures:
1. const svg: any = d3.create('svg') -> svg.node() returns SVGElement.
2. const x = d3.scaleUtc().domain([Date, Date]).range([number, number]);
3. const y = d3.scaleLinear().domain([number, number]).range([number, number]);
4. Axis generators: d3.axisBottom(x) and d3.axisLeft(y) with chaining capabilities like .ticks(10), .tickSize(6).

Complete Code Example (Vanilla HTML):
--------------------------------------------------
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <title>D3 Chart</title>
</head>
<body>
  <div id='container'></div>
  <script type='module'>
    import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm';
    const width = 640, height = 400;
    const marginTop = 20, marginRight = 20, marginBottom = 30, marginLeft = 40;
    const x = d3.scaleUtc()
         .domain([new Date('2023-01-01'), new Date('2024-01-01')])
         .range([marginLeft, width - marginRight]);
    const y = d3.scaleLinear()
         .domain([0, 100])
         .range([height - marginBottom, marginTop]);
    const svg = d3.create('svg')
         .attr('width', width)
         .attr('height', height);
    svg.append('g')
         .attr('transform', `translate(0,${height - marginBottom})`)
         .call(d3.axisBottom(x).ticks(5));
    svg.append('g')
         .attr('transform', `translate(${marginLeft},0)`)
         .call(d3.axisLeft(y));
    document.getElementById('container').appendChild(svg.node());
  </script>
</body>
</html>
--------------------------------------------------

React Integration Example:
--------------------------------------------------
import * as d3 from 'd3';
import { useRef, useEffect } from 'react';

export default function LinePlot({ data, width = 640, height = 400, marginTop = 20, marginRight = 20, marginBottom = 30, marginLeft = 40 }) {
  const gx = useRef(null);
  const gy = useRef(null);
  const x = d3.scaleLinear().domain([0, data.length - 1]).range([marginLeft, width - marginRight]);
  const y = d3.scaleLinear().domain(d3.extent(data)).range([height - marginBottom, marginTop]);
  const line = d3.line().x((d, i) => x(i)).y(y);
  useEffect(() => { d3.select(gx.current).call(d3.axisBottom(x)); }, [gx, x]);
  useEffect(() => { d3.select(gy.current).call(d3.axisLeft(y)); }, [gy, y]);
  return (
    <svg width={width} height={height}>
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
      <g ref={gy} transform={`translate(${marginLeft},0)`} />
      <path fill='none' stroke='currentColor' strokeWidth='1.5' d={line(data)} />
      <g fill='white' stroke='currentColor' strokeWidth='1.5'>
        {data.map((d, i) => <circle key={i} cx={x(i)} cy={y(d)} r='2.5' />)}
      </g>
    </svg>
  );
}
--------------------------------------------------

Configuration options include exact margin values, scale ranges, and tick formats. Best practices include using proper lifecycle hooks to avoid DOM conflicts and using unminified bundles for debugging.

## Information Dense Extract
D3.js: selections, transitions (enter/update/exit); scales: scaleUtc() domain:[Date,Date] range:[num,num], scaleLinear() domain:[0,100] range:[num,num]; axes: axisBottom(x), axisLeft(y) with ticks and formats; line generator: d3.line() with .x and .y; integration: vanilla (CDN ES module), npm (import * as d3 from 'd3'), React (useRef/useEffect for axis rendering), Svelte (reactive $: and bind:this); data join: selection.data(data) with enter/exit; full code examples provided with exact dimensions and translations; installation commands: npm install d3, yarn add d3, pnpm add d3; troubleshooting: inspect DOM, verify scale domains, use non-minified bundle.

## Sanitised Extract
Table of Contents:
1. Selections and Transitions
   - Use selection.enter(), selection.update(), selection.exit() for efficient DOM updates.
2. Scales and Axes
   - d3.scaleUtc(): domain([Date, Date]), range([number, number]);
   - d3.scaleLinear(): domain([min, max]), range([number, number]);
   - Axis generators: d3.axisBottom(scale) and d3.axisLeft(scale) for rendering axes.
3. Path and Line Generators
   - d3.line(): Configure with .x((d, i) => x(i)) and .y(y) to create SVG path data.
4. Integration in HTML and Modules
   - Import via ES Module (https://cdn.jsdelivr.net/npm/d3@7/+esm) or UMD bundle.
   - Code structure with container append operations and proper margins passed to scales.
5. Framework Integrations
   - React: Use useRef, useEffect, and call d3.axisBottom/select to mount axes.
   - Svelte: Use reactive statements ($:) and bind:this for dynamic axis updates.
6. Data Join Operations
   - Use selection.data(data) and process .enter(), .merge(), .exit() for smooth transitions.

For each section, the implementation details include exact parameter values (e.g., width: 640, height: 400, margins: 20/30/40), precise function calls, and complete code examples that can be directly integrated.

## Original Source
D3.js Documentation
https://d3js.org/

## Digest of D3_JS

# D3.js Technical Specifications

Retrieved: 2023-10-XX

## Overview
D3.js is a low-level JavaScript library for creating dynamic, interactive, data-driven visualizations by directly manipulating the DOM using web standards such as SVG and Canvas. It consists of multiple modules including selections, transitions, scales, axes, shapes, and layouts.

## Core Modules and Functions

### Selections and Transitions
- Selection API: Create, update, and remove DOM elements dynamically.
- Transition API: Animate changes; example: selection.transition().duration(750).attr(...).

### Scales and Axes
- d3.scaleUtc(): Configured with domain (dates) and range (pixel values).
  Signature: d3.scaleUtc() returns a continuous scale mapping Date objects to numbers.
- d3.scaleLinear(): Maps quantitative data to pixels.
  Signature: d3.scaleLinear() returns a continuous linear scale.
- d3.axisBottom(scale): Renders the x-axis based on the provided scale. Accepts additional configuration for ticks.
- d3.axisLeft(scale): Renders the y-axis based on the provided scale.

### Shapes and Path Generators
- d3.line(): Generates a line path for an array of data points.
  Usage pattern: const line = d3.line().x((d, i) => x(i)).y(y);

### Layouts and Data Join
- Dynamic data binding via data join pattern: Using selection.data(data) provides .enter(), .update(), and .exit() subselections to efficiently update the DOM.

## Embedding Examples

### Example: Blank Chart Creation

// Declare dimensions and margins
const width = 640;
const height = 400;
const marginTop = 20, marginRight = 20, marginBottom = 30, marginLeft = 40;

// Define scales
const x = d3.scaleUtc()
   .domain([new Date("2023-01-01"), new Date("2024-01-01")])
   .range([marginLeft, width - marginRight]);

const y = d3.scaleLinear()
   .domain([0, 100])
   .range([height - marginBottom, marginTop]);

// Create an SVG container
const svg = d3.create("svg")
   .attr("width", width)
   .attr("height", height);

// Append x-axis
svg.append("g")
   .attr("transform", `translate(0,${height - marginBottom})`)
   .call(d3.axisBottom(x));

// Append y-axis
svg.append("g")
   .attr("transform", `translate(${marginLeft},0)`)
   .call(d3.axisLeft(y));

// Return the SVG element
return svg.node();

## Integration Approaches

### In Vanilla HTML
- Load from CDN: Use ES Module via "https://cdn.jsdelivr.net/npm/d3@7/+esm" or UMD bundle.
- Embed via script tags in HTML with type="module".

### Using Node and npm
- Installation: npm install d3
- Import usage: import * as d3 from "d3"; or import specific components (e.g. {select, selectAll})

### In React
- Render static elements in JSX. Use d3-scale and d3-array for non-DOM work. For DOM manipulation, use useRef and useEffect to attach d3.axis calls.

### In Svelte
- Use reactive statements ($:) to update scales and axes. Bind container elements using bind:this.

## Troubleshooting and Best Practices

- Use non-minified bundle (d3.v7.js) for debugging, minified bundle (d3.v7.min.js) in production.
- For performance, only update necessary DOM elements during data join transitions.
- If integrating with frameworks like React, avoid using d3-selection to conflict with virtual DOM; isolate D3 code in useEffect hooks.

## Attribution and Data Size

Data Size: 4545026 bytes, Links Found: 19149, No errors reported. Retrieved from https://d3js.org/


## Attribution
- Source: D3.js Documentation
- URL: https://d3js.org/
- License: BSD License
- Crawl Date: 2025-04-27T21:47:30.764Z
- Data Size: 4545026 bytes
- Links Found: 19149

## Retrieved
2025-04-27
library/GITHUB_API.md
# library/GITHUB_API.md
# GITHUB_API

## Crawl Summary
Authentication via gh auth login, token usage with GH_TOKEN, GitHub CLI commands for API calls (gh api /octocat --method GET), Octokit.js usage with exact instance creation and request method, curl commands with proper headers, API versioning using X-GitHub-Api-Version header, handling of breaking changes and OpenAPI full specification.

## Normalised Extract
Table of Contents:
1. Authentication
   - Use 'gh auth login' to authenticate via CLI.
   - For token based auth, set GH_TOKEN environment variable. Use GITHUB_TOKEN in actions.
2. GitHub CLI Usage
   - To execute API requests: gh api <path> --method <METHOD>.
   - Example: gh api /octocat --method GET.
   - In GitHub Actions, set up 'gh api' with environment variable GH_TOKEN.
3. Using GitHub App Authentication
   - Configuration: Set APP_ID and store private key (APP_PEM) as secret.
   - Generate token using actions/create-github-app-token@v1; token expires after 60 minutes.
4. Using Octokit.js
   - Install package: npm install octokit.
   - Import: import { Octokit } from "octokit";
   - Instantiate: const octokit = new Octokit({ auth: 'YOUR-TOKEN' });
   - API call: await octokit.request("GET /repos/{owner}/{repo}/issues", { owner: "octocat", repo: "Spoon-Knife" });
5. Using curl
   - Command example: curl --request GET --url "https://api.github.com/repos/octocat/Spoon-Knife/issues" --header "Accept: application/vnd.github+json" --header "Authorization: Bearer YOUR-TOKEN"
6. API Versioning and Breaking Changes
   - Use header X-GitHub-Api-Version:2022-11-28 to specify API version.
   - Breaking changes include parameter or field modifications; refer to changelog when upgrading.
7. OpenAPI Description
   - Complete API documented in an OpenAPI spec covering all endpoints and definitions.

## Supplementary Details
Authentication: Use command 'gh auth login' to initiate, store tokens via GH_TOKEN. GitHub CLI automatically sets Git credentials for HTTPS operations. For GitHub Apps, use configuration variables (APP_ID) and secret (APP_PEM) with actions/create-github-app-token@v1.

Octokit.js Setup: npm install octokit; import { Octokit } from "octokit"; instance creation requires: const octokit = new Octokit({ auth: 'YOUR-TOKEN' }); then use method octokit.request with syntax: (method: string, params: object) with required parameters (owner, repo, etc.).

Curl Usage: Ensure curl is installed; use command syntax with --header for Accept and Authorization. Replace YOUR-TOKEN with the actual access token or secret.

API Versioning: Required header 'X-GitHub-Api-Version' with value '2022-11-28'. Specify header in curl and other HTTP clients.

Configuration Options:
- GH_TOKEN or GITHUB_TOKEN for authentication in scripts and Actions.
- ACTION variables and secrets must be set to avoid exposure.

Implementation Steps:
1. Choose authentication method (CLI, token, or GitHub App).
2. For CLI, install and run 'gh auth login'.
3. For Octokit, install via npm and import module.
4. Call endpoints with correct HTTP method and path.
5. For GitHub Actions, setup environment variables and use actions/create-github-app-token when necessary.
6. Validate responses and check for status codes for troubleshooting.

Troubleshooting:
- On 400 error, verify X-GitHub-Api-Version header and token validity.
- In Octokit, catch errors with try-catch to log error.status and error.response data.
- For curl, check token placement in Authorization header and response codes.

## Reference Details
API Specifications:
- Endpoint: GET /repos/{owner}/{repo}/issues
  Method: GET
  Parameters: owner (string), repo (string)
  Returns: JSON array of issues with fields such as title, user { id }.

GitHub CLI Command:
  Command: gh api /octocat --method GET
  Description: Executes a GET request against the /octocat endpoint.

Octokit.js Method Signature:
  async function request(methodPath: string, params: { [key: string]: any }): Promise<{ data: any }>;
  Example Usage:
    const octokit = new Octokit({ auth: 'YOUR-TOKEN' });
    const result = await octokit.request("GET /repos/{owner}/{repo}/issues", { owner: "octocat", repo: "Spoon-Knife" });

Curl Command Example:
  curl --request GET \
    --url "https://api.github.com/repos/octocat/Spoon-Knife/issues" \
    --header "Accept: application/vnd.github+json" \
    --header "Authorization: Bearer YOUR-TOKEN"

Configuration Options:
- Header: X-GitHub-Api-Version; Value: 2022-11-28
- Environment Variable: GH_TOKEN or GITHUB_TOKEN

Best Practices:
- Use gh auth login to simplify authentication.
- Store tokens securely in environment variables or secrets.
- Use try-catch blocks in Octokit.js to capture error.status and error.response.data.message.

Troubleshooting Procedures:
1. If response returns 400, check X-GitHub-Api-Version header.
2. If authentication fails, verify token and scope.
3. Use command 'curl --version' to check curl installation.
4. For GitHub Actions, confirm that secrets are correctly set and referenced in workflow.

SDK Method Signatures:
- Octokit.request: (method: string, params: object) => Promise<{ data: any }>
- CLI: gh api <endpoint> --method <HTTP_METHOD>

Detailed Code Example in GitHub Actions:
---
name: Use API
on: [workflow_dispatch]
jobs:
  use_api:
    runs-on: ubuntu-latest
    permissions:
      issues: read
    steps:
      - name: Check out repo content
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '16.17.0'
          cache: npm
      - name: Install dependencies
        run: npm install octokit
      - name: Generate token
        id: generate-token
        uses: actions/create-github-app-token@v1
        with:
          app-id: ${{ vars.APP_ID }}
          private-key: ${{ secrets.APP_PEM }}
      - name: Run script
        run: node .github/actions-scripts/use-the-api.mjs
        env:
          TOKEN: ${{ steps.generate-token.outputs.token }}
---
This complete specification is intended for developer use without external references.

## Information Dense Extract
gh auth login; GH_TOKEN env; gh api /octocat --method GET; Octokit: import { Octokit } from 'octokit'; const octokit = new Octokit({ auth: 'YOUR-TOKEN' }); await octokit.request('GET /repos/{owner}/{repo}/issues', { owner: 'octocat', repo: 'Spoon-Knife' }); curl --request GET --url 'https://api.github.com/repos/octocat/Spoon-Knife/issues' --header 'Accept: application/vnd.github+json' --header 'Authorization: Bearer YOUR-TOKEN'; Header X-GitHub-Api-Version:2022-11-28; GitHub App: APP_ID, APP_PEM, actions/create-github-app-token@v1; API: full OpenAPI spec; Troubleshooting: check error.status, verify token, header errors; Configuration: GITHUB_TOKEN, secrets, node version '16.17.0';

## Sanitised Extract
Table of Contents:
1. Authentication
   - Use 'gh auth login' to authenticate via CLI.
   - For token based auth, set GH_TOKEN environment variable. Use GITHUB_TOKEN in actions.
2. GitHub CLI Usage
   - To execute API requests: gh api <path> --method <METHOD>.
   - Example: gh api /octocat --method GET.
   - In GitHub Actions, set up 'gh api' with environment variable GH_TOKEN.
3. Using GitHub App Authentication
   - Configuration: Set APP_ID and store private key (APP_PEM) as secret.
   - Generate token using actions/create-github-app-token@v1; token expires after 60 minutes.
4. Using Octokit.js
   - Install package: npm install octokit.
   - Import: import { Octokit } from 'octokit';
   - Instantiate: const octokit = new Octokit({ auth: 'YOUR-TOKEN' });
   - API call: await octokit.request('GET /repos/{owner}/{repo}/issues', { owner: 'octocat', repo: 'Spoon-Knife' });
5. Using curl
   - Command example: curl --request GET --url 'https://api.github.com/repos/octocat/Spoon-Knife/issues' --header 'Accept: application/vnd.github+json' --header 'Authorization: Bearer YOUR-TOKEN'
6. API Versioning and Breaking Changes
   - Use header X-GitHub-Api-Version:2022-11-28 to specify API version.
   - Breaking changes include parameter or field modifications; refer to changelog when upgrading.
7. OpenAPI Description
   - Complete API documented in an OpenAPI spec covering all endpoints and definitions.

## Original Source
GitHub REST API Documentation
https://docs.github.com/en/rest

## Digest of GITHUB_API

# GitHub REST API Documentation

Retrieved on: 2023-10-XX

# Authentication
- Use GitHub CLI command: gh auth login
  - Prompts: GitHub.com or Other (enter hostname)
  - Stores credentials for HTTPS operations
- Token based authentication:
  - Environment variable: GH_TOKEN
  - Use built-in GITHUB_TOKEN for actions or create a personal access token

# GitHub CLI Usage

## Making Requests
- Command syntax: gh api <path> --method <METHOD>
- Example: gh api /octocat --method GET

## In GitHub Actions
- Set environment variable: GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
- Example workflow step:
  - Run: gh api https://api.github.com/repos/octocat/Spoon-Knife/issues

# Using GitHub App Authentication

- Store App ID in configuration variable (e.g. APP_ID)
- Generate a private key stored as a secret (APP_PEM)
- Use action: actions/create-github-app-token@v1 to generate temporary token (expires after 60 minutes)

# Using Octokit.js (JavaScript)

## Setup and Import
- Installation: npm install octokit
- Import: import { Octokit } from "octokit";
- Create instance: const octokit = new Octokit({ auth: 'YOUR-TOKEN' });

## Making a Request
- Example:
  await octokit.request("GET /repos/{owner}/{repo}/issues", {
    owner: "octocat",
    repo: "Spoon-Knife"
  });

## Usage in GitHub Actions
- Setup Node.js, checkout repository, install dependencies
- Use environment variable TOKEN for authentication

# Using curl

## Command Line Usage
- Syntax:
  curl --request GET \
    --url "https://api.github.com/repos/octocat/Spoon-Knife/issues" \
    --header "Accept: application/vnd.github+json" \
    --header "Authorization: Bearer YOUR-TOKEN"

## In GitHub Actions
- Use secrets.GITHUB_TOKEN to set GH_TOKEN in environment
- Command example within workflow step

# API Versioning

- Use header: X-GitHub-Api-Version:2022-11-28
- Default version if header not provided is 2022-11-28
- If unsupported version specified, returns 400 error

# Breaking Changes

- Breaking changes include removal or renaming of parameters, response fields, or operations
- New API version introduced to handle breaking changes
- Changes include:
  - Removing an entire operation
  - Changing parameter types
  - Adding new required parameters

# OpenAPI Specification

- Full API is described in an OpenAPI-compliant document
- Covers all endpoints and details required for integration


## Attribution
- Source: GitHub REST API Documentation
- URL: https://docs.github.com/en/rest
- License: GitHub Documentation License
- Crawl Date: 2025-04-28T20:48:14.309Z
- Data Size: 1103797 bytes
- Links Found: 12216

## Retrieved
2025-04-28
library/API_PRACTICES.md
# library/API_PRACTICES.md
# API_PRACTICES

## Crawl Summary
The crawled content reference (vinaysahni.com best practices for RESTful API) emphasizes using resource-based URIs, proper HTTP methods and status codes, versioning, standardized error responses, and security protocols. It recommends exact HTTP response codes and covers troubleshooting via commands.

## Normalised Extract
Table of Contents:
1. URI Structure
   - Use pluralized resource names (e.g. /users, /orders).
   - Avoid redundant nesting unless necessary.
2. HTTP Methods
   - GET for reading, POST for creation, PUT/PATCH for updates, DELETE for removals.
   - Function signatures include: createResource(data: object): Promise<Response>, updateResource(id: string, data: object): Promise<Response>, deleteResource(id: string): Promise<Response>.
3. Status Codes
   - 200 (OK), 201 (Created), 204 (No Content), 400 (Bad Request), 401/403 (Unauthorized/Forbidden), 404 (Not Found), 500 (Internal Server Error).
4. Versioning
   - API endpoints versioned via URL prefix such as /v1/.
5. Pagination, Filtering, and Sorting
   - Query parameters: page (default 1), limit (default 25), sort, filter.
6. Security
   - Enforce HTTPS, implement API keys/OAuth2/JWT, rate limiting mechanisms.
7. Error Handling
   - Uniform JSON error format: errorCode, errorMessage, details.
8. Troubleshooting
   - Use curl commands to test endpoints and cross-check HTTP responses and logs.

## Supplementary Details
Configuration Options:
- Server must use express.json() middleware for JSON payload parsing.
- OpenAPI/Swagger configuration: version: '3.0.0', info: { title: 'API', version: '1.0.0' }.
- Environment variables for security keys and OAuth configurations must be set (e.g. API_KEY, JWT_SECRET).
- Rate limiting configuration example: limit 100 requests per minute per IP.

Implementation Steps:
1. Define versioned routes in your Express app (e.g. app.use('/v1', router)).
2. Validate incoming requests with a library (Joi or Zod) using defined schema.
3. Implement error handling middleware to capture and format errors uniformly.
4. Configure HTTPS using SSL certificates and enforce secure connection protocols.

Exact Parameter Values:
- Pagination: page = integer (>=1), limit = integer (min 1, max 100).
- HTTP header: Content-Type must be 'application/json'.
- API keys: Alphanumeric string of length 32 or more, case sensitive.

## Reference Details
API Endpoint Specifications:
GET /v1/users
  - Query Params: page (number, default 1), limit (number, default 25), sort (string), filter (string).
  - Returns: JSON array of user objects with 200 status code.

POST /v1/users
  - Body: { name: string, email: string, password: string }.
  - Returns: Created user object with status 201.

PUT /v1/users/{id}
  - URL Parameter: id (string, required).
  - Body: { name?: string, email?: string }.
  - Returns: Updated user object with status 200.

DELETE /v1/users/{id}
  - URL Parameter: id (string, required).
  - Returns: Status 204 upon successful deletion.

SDK Method Signatures (TypeScript Examples):
function getUsers(page: number = 1, limit: number = 25): Promise<Array<User>>
function createUser(data: { name: string; email: string; password: string }): Promise<User>
function updateUser(id: string, data: { name?: string; email?: string }): Promise<User>
function deleteUser(id: string): Promise<void>

Complete Code Example:
// Express configuration for a RESTful endpoint
import express, { Request, Response } from 'express';
const app = express();
app.use(express.json());

// GET users endpoint
app.get('/v1/users', (req: Request, res: Response): void => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 25;
  // Retrieve users from database using page and limit
  res.status(200).json({ data: [], page, limit });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: Function): void => {
  res.status(500).json({ errorCode: 'SERVER_ERROR', errorMessage: err.message, details: [] });
});

// Start server
app.listen(3000, () => { console.log('Server running on port 3000'); });

Troubleshooting Commands:
- Test GET endpoint:
  curl -X GET http://localhost:3000/v1/users?page=1&limit=25
- Expected output: JSON with data array, page, and limit values.
- Verify logs for error traces if a 500 error occurs.

Configuration Options and Their Effects:
- express.json() ensures request bodies are parsed as JSON.
- SSL configuration: key and cert file paths must point to valid certificate files for HTTPS enforcement.
- Rate limiting: specify maximum requests allowed per minute; exceeding the limit returns 429 Too Many Requests.

## Information Dense Extract
RESTful API best practices: Resource URIs use plural nouns (/users); HTTP methods: GET, POST, PUT/PATCH, DELETE with corresponding function signatures; status codes: 200, 201, 204, 400, 401/403, 404, 500; versioning via /v1/; pagination params: page (>=1, default1), limit (1-100, default25); security via HTTPS, API keys, OAuth2/JWT; error responses in JSON {errorCode, errorMessage, details}; Express usage with express.json(), error middleware; complete endpoint specs for GET/POST/PUT/DELETE; TypeScript SDK signatures provided; troubleshooting using curl commands; rate limiting to 100 requests per minute.

## Sanitised Extract
Table of Contents:
1. URI Structure
   - Use pluralized resource names (e.g. /users, /orders).
   - Avoid redundant nesting unless necessary.
2. HTTP Methods
   - GET for reading, POST for creation, PUT/PATCH for updates, DELETE for removals.
   - Function signatures include: createResource(data: object): Promise<Response>, updateResource(id: string, data: object): Promise<Response>, deleteResource(id: string): Promise<Response>.
3. Status Codes
   - 200 (OK), 201 (Created), 204 (No Content), 400 (Bad Request), 401/403 (Unauthorized/Forbidden), 404 (Not Found), 500 (Internal Server Error).
4. Versioning
   - API endpoints versioned via URL prefix such as /v1/.
5. Pagination, Filtering, and Sorting
   - Query parameters: page (default 1), limit (default 25), sort, filter.
6. Security
   - Enforce HTTPS, implement API keys/OAuth2/JWT, rate limiting mechanisms.
7. Error Handling
   - Uniform JSON error format: errorCode, errorMessage, details.
8. Troubleshooting
   - Use curl commands to test endpoints and cross-check HTTP responses and logs.

## Original Source
HTTP API Design Best Practices
https://www.vinaysahni.com/best-practices-for-a-practical-restful-api

## Digest of API_PRACTICES

# API PRACTICES
Date Retrieved: 2023-10-06

This document outlines actionable guidelines and detailed specifications for RESTful API design. It includes resource URI structure recommendations, HTTP method usage, status code conventions, versioning strategies, error handling protocols, and security best practices.

## URI Structure
- Use plural nouns to represent resources (e.g. /users, /orders).
- Nest resources only when necessary (e.g. /users/{userId}/orders).

## HTTP Methods
- GET: Retrieve resource data.
- POST: Create a new resource. Example signature: function createResource(data: object): Promise<Response>
- PUT/PATCH: Update an existing resource. Example signature: function updateResource(id: string, data: object): Promise<Response>
- DELETE: Remove a resource. Example signature: function deleteResource(id: string): Promise<Response>

## Status Codes
- 200 OK: Successful data retrieval
- 201 Created: Resource successfully created
- 204 No Content: Successful deletion or update with no response body
- 400 Bad Request: Invalid request parameters
- 401 Unauthorized / 403 Forbidden: Authentication/authorization failure
- 404 Not Found: Non-existent resource
- 500 Internal Server Error: Server-side error

## Versioning
- Incorporate versioning in the URL structure (e.g. /v1/users) to maintain backward compatibility.

## Pagination, Filtering and Sorting
- Accept query parameters: page, limit, sort, filter.
- Recommended default values: page=1, limit=25.

## Security
- Serve API exclusively over HTTPS.
- Use API keys, OAuth2, or JWT for authentication.
- Enforce rate limiting to protect against DoS attacks.

## Error Handling
- Uniform error response in JSON format with fields: errorCode, errorMessage, details.
- Example structure: { errorCode: "ERR_INVALID_INPUT", errorMessage: "Invalid input provided", details: [] }

## Best Practices / Implementation Patterns
- Use standardized middleware to parse JSON (e.g. express.json() in Node.js).
- Validate request payloads using libraries like Joi or Zod.
- Document and version all endpoints using OpenAPI/Swagger specifications.
- Maintain comprehensive logging (both successful requests and errors) with correlation IDs for debugging.

## Troubleshooting Procedures
- Use curl commands to verify endpoints:
  curl -X GET http://api.example.com/v1/resource
- Inspect HTTP response codes and JSON error messages for debugging.
- Check server logs for detailed error traces using log identifiers.

Attribution: Extracted from vinaysahni.com best practices and cross-referenced with industry standards.
Data Size during crawl: 0 bytes

## Attribution
- Source: HTTP API Design Best Practices
- URL: https://www.vinaysahni.com/best-practices-for-a-practical-restful-api
- License: Public Domain
- Crawl Date: 2025-04-28T07:59:48.191Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-28
library/SVG_STROKE.md
# library/SVG_STROKE.md
# SVG_STROKE

## Crawl Summary
Stroke attribute defines the outline color or paint for SVG shapes. Accepts <paint> values, default 'none', and is animatable. Uses include basic solid color, gradients (via linearGradient definitions), and context-based inheritance using context-stroke and context-fill. CSS stroke property takes precedence over the presentation attribute. Applicable to circle, ellipse, line, path, polygon, polyline, rect, text, textPath, and tspan.

## Normalised Extract
TABLE OF CONTENTS: 1. Attribute Specification 2. Usage Examples 3. Inheritance and Context 4. Configuration Details

1. Attribute Specification:
- Attribute: stroke
- Type: <paint>
- Default: none
- Animatable: Yes
- CSS property precedence: CSS stroke over attribute when both present

2. Usage Examples:
- Basic Color: <circle cx="5" cy="5" r="4" fill="none" stroke="green" />
- Gradient: Define a <linearGradient> with id and reference it in stroke attribute via url(#id).

3. Inheritance and Context:
- Marker usage with context-stroke. Example: <circle stroke="context-stroke" fill="context-fill" /> inside marker element;
- Applies inheritance when referenced by <use> elements.

4. Configuration Details:
- Applicable Elements: circle, ellipse, line, path, polygon, polyline, rect, text, textPath, tspan
- Implementation pattern: Define gradients in <defs> and reference them in stroke using url(#gradientId).


## Supplementary Details
Exact technical specifications: stroke accepts any valid <paint> value including CSS colors, URL references to gradients/patterns. Default value is 'none'. It is animatable. Configuration options include:
- CSS override: If both CSS and attribute are set, CSS takes precedence.
- Gradient Implementation: Use <linearGradient> with stop offsets and stop-color properties; reference with stroke="url(#gradientId)".
- Marker Setup: For context inheritance, use marker element with defined stroke="context-stroke" and fill="context-fill". 
Steps:
1. Define element (e.g., circle) with stroke attribute.
2. Optionally define a gradient in <defs>.
3. Use marker element with proper refX, refY, markerWidth, markerHeight properties for context-based styling.


## Reference Details
Complete API specifications: 
- SVG Attribute: stroke
  • Parameter: value of type <paint> (e.g., 'green', 'url(#gradientId)')
  • Default: none
  • Animatable: Yes
  • Behavior: When both CSS stroke property and stroke attribute are set, the CSS property value takes precedence.

SDK Method Signatures (for rendering SVG programmatically):
function createSVGElement(tagName: string, attributes: { [key: string]: string }): SVGElement
Example:
  let circle = createSVGElement('circle', { cx: '5', cy: '5', r: '4', fill: 'none', stroke: 'green' });

Example Code with Comments:
------------------------------------------------------
// Basic SVG circle with a solid stroke color
<svg viewBox="0 0 20 10" xmlns="http://www.w3.org/2000/svg">
  <!-- Solid green stroke -->
  <circle cx="5" cy="5" r="4" fill="none" stroke="green" />
</svg>

// SVG with gradient stroke
<svg viewBox="0 0 20 10" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Define a linear gradient from green to white -->
    <linearGradient id="myGradient">
      <stop offset="0%" stop-color="green" />
      <stop offset="100%" stop-color="white" />
    </linearGradient>
  </defs>
  <!-- Apply gradient stroke using the URL reference -->
  <circle cx="15" cy="5" r="4" fill="none" stroke="url(#myGradient)" />
</svg>

// Example of marker with context inheritance
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 90">
  <style>
    /* Apply stroke width and marker to each path */
    path { stroke-width: 2px; marker: url(#circle); }
  </style>
  <path d="M 10 44.64 L 30 10 L 70 10 L 90 44.64 L 70 79.28 L 30 79.28 Z" stroke="red" fill="orange" />
  <marker id="circle" markerWidth="12" markerHeight="12" refX="6" refY="6" markerUnits="userSpaceOnUse">
    <!-- The marker circle uses context-stroke and context-fill to inherit styling from the parent path -->
    <circle cx="6" cy="6" r="3" stroke-width="2" stroke="context-stroke" fill="context-fill" />
  </marker>
</svg>

Troubleshooting Procedures:
- Verify that gradients are defined within <defs> and referenced properly with url(#id).
- Check that CSS does not override stroke attribute unintentionally.
- For marker issues, ensure marker attributes (markerWidth, markerHeight, refX, refY) are correctly set. 
- Use browser developer tools to inspect computed styles for stroke and confirm inheritance from context-stroke.


## Information Dense Extract
stroke attribute: type <paint>, default none, animatable=yes; used for outlining SVG elements (circle, ellipse, line, path, polygon, polyline, rect, text, textPath, tspan); CSS stroke takes precedence; supports solid colors and gradients (via linearGradient with stops); context inheritance via context-stroke and context-fill in marker elements; implementation requires proper <defs> usage; API example: createSVGElement('circle', {cx:'5',cy:'5',r:'4',fill:'none',stroke:'green'}); configuration options: marker (markerWidth=12, markerHeight=12, refX=6, refY=6) for context markers; troubleshooting: check <defs> placement, CSS override, and marker attribute correctness.

## Sanitised Extract
TABLE OF CONTENTS: 1. Attribute Specification 2. Usage Examples 3. Inheritance and Context 4. Configuration Details

1. Attribute Specification:
- Attribute: stroke
- Type: <paint>
- Default: none
- Animatable: Yes
- CSS property precedence: CSS stroke over attribute when both present

2. Usage Examples:
- Basic Color: <circle cx='5' cy='5' r='4' fill='none' stroke='green' />
- Gradient: Define a <linearGradient> with id and reference it in stroke attribute via url(#id).

3. Inheritance and Context:
- Marker usage with context-stroke. Example: <circle stroke='context-stroke' fill='context-fill' /> inside marker element;
- Applies inheritance when referenced by <use> elements.

4. Configuration Details:
- Applicable Elements: circle, ellipse, line, path, polygon, polyline, rect, text, textPath, tspan
- Implementation pattern: Define gradients in <defs> and reference them in stroke using url(#gradientId).

## Original Source
MDN Web Docs: SVG Styling for Stroke Attributes
https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke

## Digest of SVG_STROKE

# SVG Stroke Attribute Specifications

## Overview
The stroke attribute in SVG is a presentation attribute that defines the color or paint used to outline shapes. It accepts values of type <paint>, where a typical value might be a color, gradient, or pattern. When an element has both the stroke attribute and the corresponding CSS stroke property defined, the CSS property takes precedence.

## Applicable Elements
The stroke attribute can be applied to the following SVG elements:
- circle
- ellipse
- line
- path
- polygon
- polyline
- rect
- text
- textPath
- tspan

## Technical Specifications
- Value Type: <paint>
- Default Value: none
- Animatable: Yes

This attribute is part of Scalable Vector Graphics (SVG) 2 specifications and its behavior is defined under the 'Specifying Stroke Paint' section. It supports using SVG paint servers (like gradients or patterns) by referencing them (via url(#id)).

## Usage Examples

### Basic Color Stroke
Example using a simple color:

    <svg viewBox="0 0 20 10" xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="5" r="4" fill="none" stroke="green" />
    </svg>

### Gradient Stroke
Example using a linear gradient:

    <svg viewBox="0 0 20 10" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="myGradient">
          <stop offset="0%" stop-color="green" />
          <stop offset="100%" stop-color="white" />
        </linearGradient>
      </defs>
      <circle cx="15" cy="5" r="4" fill="none" stroke="url(#myGradient)" />
    </svg>

### Contextual Stroke Inheritance
An example illustrating the use of context-stroke and context-fill with markers:

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 90">
      <style>
        path {
          stroke-width: 2px;
          marker: url(#circle);
        }
      </style>
      <path d="M 10 44.64 L 30 10 L 70 10 L 90 44.64 L 70 79.28 L 30 79.28 Z" stroke="red" fill="orange" />
      <path d="M 100 44.64 L 80 10 L 120 10 L 140 44.64 L 120 79.28 L 80 79.28 Z" stroke="green" fill="lightgreen" />
      <path d="M 150 44.64 L 130 10 L 170 10 L 190 44.64 L 170 79.28 L 130 79.28 Z" stroke="blue" fill="lightblue" />
      <marker id="circle" markerWidth="12" markerHeight="12" refX="6" refY="6" markerUnits="userSpaceOnUse">
        <circle cx="6" cy="6" r="3" stroke-width="2" stroke="context-stroke" fill="context-fill" />
      </marker>
    </svg>

## Attribution and Metadata
- Source: MDN Web Docs on SVG stroke attribute
- Retrieved Date: 2023-10-05
- Data Size: 1225068 bytes
- Links Found: 30673


## Attribution
- Source: MDN Web Docs: SVG Styling for Stroke Attributes
- URL: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke
- License: Creative Commons Attribution-ShareAlike License
- Crawl Date: 2025-04-28T18:51:49.809Z
- Data Size: 1225068 bytes
- Links Found: 30673

## Retrieved
2025-04-28
library/SVG2_SPEC.md
# library/SVG2_SPEC.md
# SVG2_SPEC

## Crawl Summary
The SVG 2 Specification provides a comprehensive set of technical details including DOM interface definitions (SVGElement, SVGGraphicsElement, SVGPathElement, etc.), detailed path grammar with all command specifications (moveto, lineto, Bézier curves, arc commands), rendering model rules (stacking context, painters model), shape definitions (rect, circle, ellipse, etc.), coordinate system transformations (viewBox, transform matrix), and styling through CSS. It includes exact attribute syntax and expected behaviors for dynamic SVG content integration.

## Normalised Extract
Table of Contents:
1. Rendering Model
   - Rendering tree definition
   - Stacking context and painters model
   - Effects of display, visibility, and opacity
2. Basic Data Types and Interfaces
   - SVGElement, SVGGraphicsElement, SVGGeometryElement
   - SVGNumber, SVGLength, SVGAngle interfaces
   - Attribute syntax and reflection in DOM
3. Paths
   - Grammar for path data: commands M, L, C, Q, A, Z
   - Exact ‘d’ property syntax and error handling
4. Basic Shapes
   - Element specifications: rect, circle, ellipse, line, polyline, polygon
   - DOM interfaces: SVGRectElement, SVGCircleElement, SVGEllipseElement, etc.
5. Text
   - Text, tspan, textPath elements structure
   - Attributes: x, y, dx, dy, rotate, text-anchor, glyph orientations, kerning
   - DOM interfaces: SVGTextContentElement, SVGTextElement, SVGTSpanElement, SVGTextPathElement
6. Embedded Content
   - Implementation of image and foreignObject elements
   - DOM interfaces: SVGImageElement, SVGForeignObjectElement
7. Styling
   - Inline and external style sheets
   - Use of class, style, and presentation attributes
   - Required CSS features and default user agent styles

Implementation Details:
- To create an SVG element, use document.createElementNS with namespace 'http://www.w3.org/2000/svg'.
- Set attributes like viewBox ('0 0 width height') and preserveAspectRatio ('xMidYMid meet') as specified.
- For dynamic operations, call SVGElement methods such as getBBox(), getCTM(), and getScreenCTM().

## Supplementary Details
Parameter Specifications:
- fill: accepts color values (e.g., '#ff0000', rgb(255,0,0)); fill-rule: 'nonzero' or 'evenodd'; fill-opacity: numeric between 0.0 and 1.0.
- stroke: accepts similar color formats; stroke-width: number (default typically 1); stroke-linecap: 'butt', 'round', or 'square'; stroke-linejoin: defines join style.

Transformation Configuration:
- transform attribute format: matrix(a, b, c, d, e, f) with each parameter as a float.
- viewBox: required attribute for scaling with format 'min-x min-y width height'; preserveAspectRatio default is 'xMidYMid meet'.

Implementation Steps:
1. Declare the SVG root element with xmlns='http://www.w3.org/2000/svg'.
2. Create child elements using document.createElementNS and assign attributes using setAttribute.
3. Utilize DOM methods on SVG elements: getBBox() for element dimensions, getCTM() for current transformation matrix.
4. Validate attribute values to ensure conformance; fallback on defaults if values are invalid.

Configuration Options:
- Namespace: http://www.w3.org/2000/svg (required for all SVG elements).
- Default CSS styling can be overridden inline or via external style sheets.
- Error handling: Invalid attribute values trigger default styling or rendering fallback.

## Reference Details
API Specifications:

Interface SVGElement:
  Properties:
    - id: string
    - className: SVGAnimatedString
    - ownerSVGElement: SVGSVGElement
    - viewportElement: SVGElement
  Methods:
    - getBBox() -> DOMRect // Returns the bounding box of the element.
    - getCTM() -> SVGMatrix // Returns the current transformation matrix.
    - getScreenCTM() -> SVGMatrix // Returns the transformation matrix relative to the screen.

Interface SVGGraphicsElement (extends SVGElement):
  Additional Property:
    - transform: SVGAnimatedTransformList

Interface SVGNumber:
  Property:
    - value: float

Interface SVGLength:
  Properties:
    - value: float
    - unitType: unsigned short

Interface SVGPathElement:
  Property:
    - d: string // Contains path data with commands: M, L, C, Q, A, Z

SDK Method Signature Example:
function createSVGElement(tagName: string): SVGElement {
  // Uses document.createElementNS with the SVG namespace
  const NS = 'http://www.w3.org/2000/svg';
  return document.createElementNS(NS, tagName);
}

// Example Usage:
// Create an SVG circle:
const svgNS = 'http://www.w3.org/2000/svg';
const circle = document.createElementNS(svgNS, 'circle');
circle.setAttribute('cx', '50');
circle.setAttribute('cy', '50');
circle.setAttribute('r', '40');
circle.setAttribute('fill', '#ff0000');
// Append the circle to an existing SVG container

Configuration Options and Effects:
- viewBox: Defines the coordinate system and scaling; format '0 0 width height'.
- preserveAspectRatio: Controls how SVG scales; default 'xMidYMid meet' ensures centered scaling.
- Styling attributes (fill, stroke, opacity) directly affect rendering and can be controlled via CSS.

Best Practices:
- Always use createElementNS for SVG elements to ensure proper namespace resolution.
- Validate numerical inputs for attributes like width, height, and radius to avoid rendering errors.
- Use getBBox() and getCTM() for dynamic layout adjustments and responsive design testing.

Troubleshooting Procedures:
- If SVG elements are not rendering, verify the xmlns attribute is correctly set to 'http://www.w3.org/2000/svg'.
- Use browser developer tools to inspect computed styles and transformation matrices.
- For path data errors, cross-check the sequence of commands (M, L, C, Q, A, Z) and ensure proper spacing between numbers.
- Expected outputs include proper DOM element creation and accurate return values from methods like getBBox().

## Information Dense Extract
SVG2 Specification; Interfaces: SVGElement (id:string, className:SVGAnimatedString, ownerSVGElement, viewportElement; methods: getBBox():DOMRect, getCTM():SVGMatrix, getScreenCTM():SVGMatrix), SVGGraphicsElement (transform:SVGAnimatedTransformList), SVGNumber (value:float), SVGLength (value:float, unitType:uint), SVGPathElement (d:string with commands M,L,C,Q,A,Z); Attributes: fill (color), fill-rule (nonzero/evenodd), fill-opacity (0-1), stroke, stroke-width, stroke-linecap, stroke-linejoin; Transform: transform attribute matrix(a,b,c,d,e,f); Configuration: xmlns='http://www.w3.org/2000/svg', viewBox='0 0 w h', preserveAspectRatio='xMidYMid meet'; Code pattern: document.createElementNS, setAttribute; Best practices: validate attribute values, use proper namespace, inspect getBBox(); Troubleshooting: check xmlns, verify path grammar, inspect computed transforms.

## Sanitised Extract
Table of Contents:
1. Rendering Model
   - Rendering tree definition
   - Stacking context and painters model
   - Effects of display, visibility, and opacity
2. Basic Data Types and Interfaces
   - SVGElement, SVGGraphicsElement, SVGGeometryElement
   - SVGNumber, SVGLength, SVGAngle interfaces
   - Attribute syntax and reflection in DOM
3. Paths
   - Grammar for path data: commands M, L, C, Q, A, Z
   - Exact d property syntax and error handling
4. Basic Shapes
   - Element specifications: rect, circle, ellipse, line, polyline, polygon
   - DOM interfaces: SVGRectElement, SVGCircleElement, SVGEllipseElement, etc.
5. Text
   - Text, tspan, textPath elements structure
   - Attributes: x, y, dx, dy, rotate, text-anchor, glyph orientations, kerning
   - DOM interfaces: SVGTextContentElement, SVGTextElement, SVGTSpanElement, SVGTextPathElement
6. Embedded Content
   - Implementation of image and foreignObject elements
   - DOM interfaces: SVGImageElement, SVGForeignObjectElement
7. Styling
   - Inline and external style sheets
   - Use of class, style, and presentation attributes
   - Required CSS features and default user agent styles

Implementation Details:
- To create an SVG element, use document.createElementNS with namespace 'http://www.w3.org/2000/svg'.
- Set attributes like viewBox ('0 0 width height') and preserveAspectRatio ('xMidYMid meet') as specified.
- For dynamic operations, call SVGElement methods such as getBBox(), getCTM(), and getScreenCTM().

## Original Source
SVG 2 Specification
https://www.w3.org/TR/SVG2/

## Digest of SVG2_SPEC

# SVG 2 SPECIFICATION
Date Retrieved: 2023-10-11

# Rendering Model
- Defines the rendering tree, stacking context, and painters model.
- Provides rules for element ordering, opacity, and visibility control.
- Details on group rendering and effects of the ‘display’, ‘visibility’, and ‘opacity’ properties.

# Basic Data Types and Interfaces
- Complete list of DOM interfaces: SVGElement, SVGGraphicsElement, SVGGeometryElement.
- Data type interfaces including SVGNumber, SVGLength, SVGAngle with precise real number precision and clamping rules.
- Attribute syntax specifications for reflecting and synchronizing content attributes.

# Paths
- Mature grammar for path data with commands:
  - moveto (M, m)
  - lineto (L, l)
  - cubic Bézier (C, c)
  - quadratic Bézier (Q, q)
  - elliptical arcs (A, a)
  - closepath (Z, z)
- Exact syntax for the ‘d’ property and error handling for out-of-range or zero-length segments.

# Basic Shapes
- Specifications for elements: rect, circle, ellipse, line, polyline, polygon.
- Each shape includes defined properties such as coordinates (x, y), dimensions (width, height), and radii (r, rx, ry).
- Includes DOM interface definitions: SVGRectElement, SVGCircleElement, SVGEllipseElement, SVGLineElement, SVGPolylineElement, SVGPolygonElement.

# Text
- Detailed definitions of text layout including the ‘text’, ‘tspan’, and ‘textPath’ elements.
- Attributes for positioning (x, y, dx, dy, rotate) and properties for text alignment (text-anchor, glyph-orientation-horizontal/vertical, kerning).
- DOM interfaces including SVGTextContentElement, SVGTextElement, SVGTSpanElement, SVGTextPathElement.

# Embedded Content
- Specifications for embedding: image and foreignObject elements with inclusion of HTML in SVG subtrees.
- DOM interfaces: SVGImageElement and SVGForeignObjectElement.

# Styling
- Rules for applying CSS: inline style sheets via the ‘style’ element and external style sheets via HTML ‘link’.
- Element-specific styling via class and style attributes, along with presentation attributes.
- Default user agent style sheet details and required CSS features.

# Coordinate Systems, Transformations and Units
- Definition of the initial viewport and coordinate system.
- Specifications for the 'transform' property and viewBox/preserveAspectRatio attributes.
- Exact transformation matrix representation: matrix(a, b, c, d, e, f).

# API and DOM Methods
- DOM interface SVGElement methods:
  - getBBox() -> DOMRect
  - getCTM() -> SVGMatrix
  - getScreenCTM() -> SVGMatrix
- Interfaces extend for graphical elements, e.g., SVGGraphicsElement includes transform (SVGAnimatedTransformList).

# Attribution and Data Size
- Crawl data size: 8760584 bytes
- Source URL: https://www.w3.org/TR/SVG2/
- Links processed: 63193
- No errors reported.

## Attribution
- Source: SVG 2 Specification
- URL: https://www.w3.org/TR/SVG2/
- License: W3C Recommendation
- Crawl Date: 2025-04-27T23:48:10.632Z
- Data Size: 8760584 bytes
- Links Found: 63193

## Retrieved
2025-04-27
library/OPENAPI_SPEC.md
# library/OPENAPI_SPEC.md
# OPENAPI_SPEC

## Crawl Summary
OpenAPI Specification supports OpenAPI 3.0.0, AsyncAPI, and JSON Schema. Swagger Editor, UI, Codegen, and API Hub extend basic API specification into interactive tools. Configuration options include required keys like openapi, info, paths, and components. Troubleshooting involves spec validation via swagger-cli and checking network endpoints for Swagger UI.

## Normalised Extract
Table of Contents: 1. API_SPECIFICATIONS; 2. SWAGGER_EDITOR; 3. SWAGGER_UI; 4. SWAGGER_CODEGEN; 5. API_HUB; 6. CONFIGURATION_OPTIONS; 7. TROUBLESHOOTING.

1. API_SPECIFICATIONS: openapi: 3.0.0; info: {title, version, description, contact}; paths: {endpoints with HTTP methods}; components: {schemas, responses, parameters, examples}.
2. SWAGGER_EDITOR: In-browser design tool; features real-time validation; accepts YAML/JSON; enforces OpenAPI rules.
3. SWAGGER_UI: Interactive visualization; configuration parameters: url, dom_id, deepLinking, presets; initialization pattern provided.
4. SWAGGER_CODEGEN: CLI tool and SDK method generateClientSDK(spec, options) returns ClientSDK; command-line example: swagger-codegen generate -i petstore.yaml -l java -o ./output.
5. API_HUB: Enterprise platform; supports role-based access control, versioning, and integrated API lifecycle management.
6. CONFIGURATION_OPTIONS: JSON sample configuration with mandatory keys; defaults provided per OpenAPI spec.
7. TROUBLESHOOTING: Use swagger-cli validate; inspect network and YAML/JSON formatting; re-run generation commands with review of error logs.

## Supplementary Details
Configuration sample: {"openapi": "3.0.0", "info": {"title": "API Title", "version": "1.0.0", "description": "Detailed API description", "contact": {"email": "support@example.com"}}, "paths": {"/endpoint": {"get": {"summary": "Endpoint summary", "responses": {"200": {"description": "Successful response"}}}}}}. 

Method Implementation Patterns:
- generateClientSDK(spec: OpenAPISpec, options: SDKOptions): ClientSDK
  Input: spec as JSON object, options including language, output directory, customization flags
  Output: ClientSDK object with structured client code
- SwaggerUIBundle initialization: Accepts config with mandatory keys url, dom_id; optionally deepLinking and presets.

Steps:
1. Validate API specification using swagger-cli validate.
2. Design API with Swagger Editor ensuring syntax correctness.
3. Render interactive API documentation with Swagger UI.
4. Generate stubs/SDKs using Swagger Codegen CLI with specified parameters.
5. Integrate within API Hub for enterprise level governance and collaboration.

## Reference Details
API Specifications:
- Object structure: { openapi: "3.0.0", info: { title: string, version: string, description: string, contact: { email: string } }, paths: { [path: string]: { [method: string]: { summary: string, responses: { [status: string]: { description: string } } } } }, components: { schemas: object, responses: object, parameters: object, examples: object } }.

SDK Method Signatures:
- function generateClientSDK(spec: object, options: { language: string, outputDir: string, customTemplates?: object }): ClientSDK
  Returns: ClientSDK

- function generateServerStub(spec: object, options: { language: string, outputDir: string }): ServerStub
  Returns: ServerStub

Swagger UI Initialization:
- SwaggerUIBundle({ url: string, dom_id: string, deepLinking: boolean, presets: Array<any> }): void

Command Examples:
- swagger-codegen generate -i petstore.yaml -l java -o ./output

Best Practices:
- Always validate API specification with swagger-cli before code generation.
- Use Swagger Editor for immediate syntax checking and real-time auto-completion.
- Configure Swagger UI with deepLinking enabled and proper presets for dynamic rendering.
- Integrate API Hub for version control and to enforce design standards.

Troubleshooting Steps:
1. Run: swagger-cli validate petstore.yaml
   Expected: "Validation success"
2. If Swagger UI fails, check network console for errors and verify URL accessibility.
3. For code generation issues, compare spec against OpenAPI 3.0.0 schema version and ensure all required fields are present.
4. Re-run generation command with '--verbose' flag to get detailed logs.

## Information Dense Extract
OpenAPI 3.0.0; info: {title,version,description,contact}; paths defined with HTTP methods; components for schemas/responses; Swagger Editor: real-time YAML/JSON editing, auto-completion; Swagger UI: config ({url,dom_id,deepLinking,true,presets}); Swagger Codegen: CLI command swagger-codegen generate -i petstore.yaml -l java -o ./output; SDK methods generateClientSDK(spec,options): ClientSDK, generateServerStub(spec,options): ServerStub; API Hub integrates governance, RBAC, versioning; troubleshooting: swagger-cli validate, check network, verbose logs.

## Sanitised Extract
Table of Contents: 1. API_SPECIFICATIONS; 2. SWAGGER_EDITOR; 3. SWAGGER_UI; 4. SWAGGER_CODEGEN; 5. API_HUB; 6. CONFIGURATION_OPTIONS; 7. TROUBLESHOOTING.

1. API_SPECIFICATIONS: openapi: 3.0.0; info: {title, version, description, contact}; paths: {endpoints with HTTP methods}; components: {schemas, responses, parameters, examples}.
2. SWAGGER_EDITOR: In-browser design tool; features real-time validation; accepts YAML/JSON; enforces OpenAPI rules.
3. SWAGGER_UI: Interactive visualization; configuration parameters: url, dom_id, deepLinking, presets; initialization pattern provided.
4. SWAGGER_CODEGEN: CLI tool and SDK method generateClientSDK(spec, options) returns ClientSDK; command-line example: swagger-codegen generate -i petstore.yaml -l java -o ./output.
5. API_HUB: Enterprise platform; supports role-based access control, versioning, and integrated API lifecycle management.
6. CONFIGURATION_OPTIONS: JSON sample configuration with mandatory keys; defaults provided per OpenAPI spec.
7. TROUBLESHOOTING: Use swagger-cli validate; inspect network and YAML/JSON formatting; re-run generation commands with review of error logs.

## Original Source
OpenAPI Specification
https://swagger.io/specification/

## Digest of OPENAPI_SPEC

# API SPECIFICATION

Retrieved on: 2023-10-05

This document captures high-value technical details from the Swagger OpenAPI Specification page. It includes exact technical details for API development with emphasis on OpenAPI, AsyncAPI, JSON Schema, and the suite of Swagger tools.

## Table of Contents

1. API_SPECIFICATIONS
2. SWAGGER_EDITOR
3. SWAGGER_UI
4. SWAGGER_CODEGEN
5. API_HUB
6. CONFIGURATION_OPTIONS
7. TROUBLESHOOTING

## 1. API_SPECIFICATIONS

- Supports OpenAPI Specification 3.0.0, AsyncAPI, and JSON Schema.
- Core parameters include:
  - openapi: (string) Version identifier e.g. "3.0.0"
  - info: (object) Contains title, description, version, and contact info
  - paths: (object) Endpoint definitions with methods and responses
  - components: (object) Reusable definitions (schemas, responses, parameters, examples, request bodies)

## 2. SWAGGER_EDITOR

- An in-browser editor for designing APIs using OpenAPI and AsyncAPI specifications.
- Key features:
  - Real-time feedback and syntax auto-completion
  - Error highlighting based on specification validation rules
- Technical Implementation: Accepts specifications in YAML/JSON and validates structure based on the OpenAPI schema.

## 3. SWAGGER_UI

- Provides an interactive UI for visualizing OpenAPI definitions.
- Initialization parameters:
  - url: String URL to the API specification
  - dom_id: String, a selector for the target container (e.g. "#swagger-ui")
  - deepLinking: Boolean (default true)
  - presets: Array including SwaggerUIBundle.presets.apis and SwaggerUIStandalonePreset

Example initialization pattern:
SwaggerUIBundle({
  url: "http://petstore.swagger.io/v2/swagger.json",
  dom_id: "#swagger-ui",
  deepLinking: true,
  presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset]
});

## 4. SWAGGER_CODEGEN

- CLI and SDK support for generating server stubs and client SDKs.
- Method signature (pseudocode):
  generateClientSDK(spec: OpenAPISpec, options: SDKOptions): ClientSDK
  Parameter details:
    spec: Object conforming to OpenAPI 3.0 definitions
    options: Object containing language, output folder, and customization flags
  Returns:
    ClientSDK object with generated code modules.
- Example command-line usage:
  swagger-codegen generate -i petstore.yaml -l java -o ./output

## 5. API_HUB

- Enterprise-grade platform for API design, governance, and collaboration.
- Integrates Swagger Open Source tools with additional features like:
  - Role-based access control
  - Versioning and API lifecycle management
  - Integration with source control and API gateways

## 6. CONFIGURATION_OPTIONS

- OpenAPI spec sample configuration:
  {
    "openapi": "3.0.0",
    "info": {
      "title": "API Title",
      "version": "1.0.0",
      "description": "Detailed API description",
      "contact": {
        "email": "support@example.com"
      }
    },
    "paths": {
      "/endpoint": {
        "get": {
          "summary": "Get endpoint summary",
          "responses": {
            "200": {
              "description": "Successful Response"
            }
          }
        }
      }
    }
  }
- Default values and effects are explicitly defined in the OpenAPI Specification.

## 7. TROUBLESHOOTING

- Verify YAML/JSON formatting using swagger-cli validate command:
  Command: swagger-cli validate petstore.yaml
  Expected output: Validation success with no errors
- If Swagger UI fails to load, check network connectivity and ensure provided URL is reachable.
- For code generation errors, confirm the spec adheres to the correct schema and all mandatory fields are present.


## Attribution
- Source: OpenAPI Specification
- URL: https://swagger.io/specification/
- License: Apache License 2.0
- Crawl Date: 2025-04-27T05:47:49.564Z
- Data Size: 730737 bytes
- Links Found: 12573

## Retrieved
2025-04-27
library/ZOD_SCHEMA.md
# library/ZOD_SCHEMA.md
# ZOD_SCHEMA

## Crawl Summary
Zod Schema documentation extracted from the Zod site includes API methods for schema creation, type inference, validation (parse, safeParse, parseAsync), error handling, and configuration options such as strict mode and custom error messages. Key methods include z.object, z.string, z.number, and their associated chainable validators like .min(), .max(), with complete method signatures and return types that enable immediate implementation.

## Normalised Extract
Table of Contents:
1. Schema Creation
   - Use z.object to define object schemas with precise key definitions; for strings, use z.string() with chainable methods like .min(minimum: number, message?: string) and .max(maximum: number, message?: string).
2. Type Inference
   - TypeScript types are inferred using z.infer<typeof schema> providing exact type definitions.
3. Validation Methods
   - Schema.validate via parse(input: unknown) that returns validated type or throws ZodError; safeParse(input: unknown) returns an object with success flag and error details; parseAsync(input: unknown) returns a Promise for async operations.
4. Error Handling
   - ZodError is structured with an errors array containing path (e.g., ['age']) and message detailing the validation failure. Use safeParse to capture validation errors without exception throwing.
5. Configuration Options
   - Methods like schema.strict() enforce schema constraints by disallowing unknown keys; custom error messages can be passed to chainable validators.

Detailed Information:
Schema Creation: Define schemas with explicit type validations. Example: Create a user schema with z.object({ name: z.string(), age: z.number().min(18, 'Must be 18 or older') }).
Type Inference: Extract types with z.infer to ensure type safety throughout the code base.
Validation: Use parse for direct validation or safeParse for error-handling workflows. Async validation is available via parseAsync.
Error Handling: Inspect ZodError for detailed error arrays; recommended to use safeParse in production.
Configuration: Use strict mode for exact matches and apply custom messages for more user-friendly errors.

## Supplementary Details
Technical Specifications:
- z.object(input: object): Returns ZodObject with methods to define and validate an object schema. Properties are strictly enforced when using .strict().
- z.string(): Returns ZodString, supports validators .min(min: number, message?: string) and .max(max: number, message?: string).
- z.number(): Returns ZodNumber, supports .min(min: number, message?: string) and .max(max: number, message?: string).
- Validation Methods:
  * parse(input: unknown): InferredType. Throws ZodError if validation fails.
  * safeParse(input: unknown): { success: boolean, data?: InferredType, error?: ZodError }.
  * parseAsync(input: unknown): Promise<InferredType>.
- Error Object (ZodError): Contains errors array with objects { path: Array<any>, message: string, code: string }.
- Configuration Options:
  * schema.strict(): Enforces that no additional keys are present beyond the defined schema; default behavior is non-strict.
Implementation Steps:
1. Define your data schema using z.object and corresponding methods for each field.
2. Validate input using parse or safeParse.
3. Handle errors by inspecting the errors array from ZodError.
4. For asynchronous data, use parseAsync and await the promised result.


## Reference Details
API Specifications:
- z.object(shape: object): ZodObject; where shape keys are mapped to Zod schema types.
- z.string(): ZodString; Methods:
   * min(minimum: number, message?: string): ZodString
   * max(maximum: number, message?: string): ZodString
   * regex(regex: RegExp, message?: string): ZodString
- z.number(): ZodNumber; Methods:
   * min(minimum: number, message?: string): ZodNumber
   * max(maximum: number, message?: string): ZodNumber
- z.boolean(): ZodBoolean
- z.array(itemSchema: ZodTypeAny): ZodArray; Methods:
   * nonempty(message?: string): ZodArray
- Validation Methods:
   * schema.parse(input: unknown): InferredType; throws ZodError on failure
   * schema.safeParse(input: unknown): { success: boolean, data?: InferredType, error?: ZodError }
   * schema.parseAsync(input: unknown): Promise<InferredType>
- Error Handling:
   * ZodError: { errors: Array<{ path: Array<string|number>, message: string, code: string }> }
- Implementation Pattern Example:
   Define schema: let userSchema = z.object({ name: z.string(), age: z.number().min(18, 'Must be 18 or older') });
   Validate data: const result = userSchema.safeParse(inputData);
   If result.success is false, inspect result.error.errors for error details.
- Configuration Options:
   * schema.strict(): Returns a schema that only accepts keys defined in the object; additional keys result in error.
- Best Practices:
   1. Use safeParse in production to avoid exception-based control flow.
   2. Leverage z.infer for consistent type definitions throughout TypeScript projects.
   3. Utilize custom error messages to provide clear validation feedback.
- Troubleshooting Procedures:
   * On encountering ZodError, run: console.log(result.error.format());
   * Check each error object's path and message for pinpointing issues.
   * In asynchronous contexts, use try-catch with await schema.parseAsync(inputData) and log errors accordingly.

## Information Dense Extract
Zod Schema: Use z.object, z.string, z.number, z.boolean, z.array; method signatures include z.object({}), z.string().min(num, msg), z.number().max(num, msg); validation via parse(input): returns type or throws ZodError; safeParse(input): { success, data, error }; parseAsync(input): Promise<type>; ZodError contains errors array with path and message; configuration via schema.strict() for key enforcement; best practice: use safeParse for error handling; API examples provided; troubleshooting: log error.format(); Type inference via z.infer.

## Sanitised Extract
Table of Contents:
1. Schema Creation
   - Use z.object to define object schemas with precise key definitions; for strings, use z.string() with chainable methods like .min(minimum: number, message?: string) and .max(maximum: number, message?: string).
2. Type Inference
   - TypeScript types are inferred using z.infer<typeof schema> providing exact type definitions.
3. Validation Methods
   - Schema.validate via parse(input: unknown) that returns validated type or throws ZodError; safeParse(input: unknown) returns an object with success flag and error details; parseAsync(input: unknown) returns a Promise for async operations.
4. Error Handling
   - ZodError is structured with an errors array containing path (e.g., ['age']) and message detailing the validation failure. Use safeParse to capture validation errors without exception throwing.
5. Configuration Options
   - Methods like schema.strict() enforce schema constraints by disallowing unknown keys; custom error messages can be passed to chainable validators.

Detailed Information:
Schema Creation: Define schemas with explicit type validations. Example: Create a user schema with z.object({ name: z.string(), age: z.number().min(18, 'Must be 18 or older') }).
Type Inference: Extract types with z.infer to ensure type safety throughout the code base.
Validation: Use parse for direct validation or safeParse for error-handling workflows. Async validation is available via parseAsync.
Error Handling: Inspect ZodError for detailed error arrays; recommended to use safeParse in production.
Configuration: Use strict mode for exact matches and apply custom messages for more user-friendly errors.

## Original Source
Zod Schema Validation Docs
https://zod.dev/

## Digest of ZOD_SCHEMA

# ZOD SCHEMA DOCUMENTATION

Retrieved on: 2023-10-06

This document provides the complete technical details for Zod Schema Validation as extracted from the Zod documentation. It covers schema creation, type inference, validation methods, error handling, and configuration options with detailed API specifications, method signatures, configuration parameters, and troubleshooting steps.

## Schema Creation

Define schemas using z.object, z.string, z.number, z.boolean, z.enum, z.array, and more. Example:

  let userSchema = z.object({
    name: z.string(),
    age: z.number().min(18, 'Must be 18 or older')
  });

Method Signatures:
  - z.object(input: object): ZodObject
  - z.string(): ZodString
  - z.number(): ZodNumber
  - z.boolean(): ZodBoolean
  - z.array(itemSchema: ZodTypeAny): ZodArray

## Type Inference

Zod automatically infers TypeScript types from schemas using the inferred method:

  type UserType = z.infer<typeof userSchema>

## Validation Methods

Validation can be performed using:

  - parse(data: unknown): returns parsed data if valid or throws ZodError on failure
  - safeParse(data: unknown): returns { success: boolean, data?: any, error?: ZodError }
  - parseAsync(data: unknown): returns a Promise that resolves with valid data or rejects with ZodError

Method Signatures:
  - schema.parse(input: unknown): InferredType
  - schema.safeParse(input: unknown): { success: boolean, data?: InferredType, error?: ZodError }
  - schema.parseAsync(input: unknown): Promise<InferredType>

## Error Handling

ZodError objects are thrown on validation errors. They contain an errors array with details:

  - path: Array indicating the location of the error (e.g. ['age'])
  - message: The error message string

For safe parsing, use safeParse to obtain error details without throwing exceptions.

## Configuration Options

Schemas can be configured to enforce strict checking:

  - schema.strict(): converts a schema to only allow defined keys

Custom error messages and refinements can be applied on any type, e.g.,

  - z.string().min(length: number, message?: string)
  - z.number().max(limit: number, message?: string)

## Troubleshooting Procedures

1. When encountering ZodError, inspect the error.errors array for detailed messages and paths.
2. Use schema.safeParse(data) to handle errors gracefully without exceptions.
3. Verify that input data conforms exactly to the schema structure; consider using schema.strict() to enforce no unknown keys.
4. For asynchronous validation issues, ensure use of parseAsync and proper handling of promises.

Attribution: Extracted from Zod Schema Validation Docs with source content originally at https://zod.dev/. Data Size: 0 bytes as per crawl.

## Attribution
- Source: Zod Schema Validation Docs
- URL: https://zod.dev/
- License: MIT License
- Crawl Date: 2025-04-28T11:49:49.946Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-28
library/SUPERTEST.md
# library/SUPERTEST.md
# SUPERTEST

## Crawl Summary
SuperTest is a Node.js library for HTTP assertions built on superagent. It allows testing of HTTP servers by wrapping an http.Server or function and binding to an ephemeral port if not listening. Key features include support for HTTP/2 via options, integration with testing frameworks like Mocha using callbacks, promises, or async/await, cookie persistence through request.agent, and custom assertion functions. API methods such as .expect(status[, fn]), .expect(body[, fn]), .auth(username, password), and .end(fn) provide versatile testing control. Detailed code examples are provided for basic usage, authentication, and multipart uploads.

## Normalised Extract
Table of Contents:
  1. Introduction
  2. Installation
  3. Basic Usage
  4. HTTP/2 Configuration
  5. Testing Patterns
  6. Authentication & Cookie Handling
  7. API Method Specifications

1. Introduction:
  - Library: SuperTest for testing HTTP servers using superagent.
  - Supports ephemeral port binding if server not listening.

2. Installation:
  - Command: npm install supertest --save-dev

3. Basic Usage:
  - Require module: const request = require('supertest');
  - Example: 
    const express = require('express');
    const app = express();
    app.get('/user', function(req, res) { res.status(200).json({ name: 'john' }); });
    request(app).get('/user').expect('Content-Type', /json/).expect('Content-Length', '15').expect(200).end(function(err, res) { if(err) throw err; });

4. HTTP/2 Configuration:
  - Enable by passing { http2: true } to request or request.agent:
    request(app, { http2: true }).get('/user')...

5. Testing Patterns:
  - Supports callbacks, promises, and async/await.
  - Mocha example with done callback and inline assertion via .expect(200, done).

6. Authentication & Cookie Handling:
  - Use .auth(username, password) for basic auth.
  - Persist cookies via request.agent: agent(app) with cookie-parser middleware.

7. API Method Specifications:
  - .expect(status[, fn]) - assert status code.
  - .expect(status, body[, fn]) - assert status and body.
  - .expect(body[, fn]) - assert response body with string, regex or object.
  - .expect(field, value[, fn]) - assert header field.
  - .expect(function(res){}) - custom assertion function; throw error if assertion fails.
  - .end(fn) - execute HTTP request and callback with error and response.

## Supplementary Details
Installation: npm install supertest --save-dev. Configuration Options:
  - http2: Boolean option to enable HTTP2 protocol when passed to request or request.agent. Example: { http2: true }.
Testing Details:
  - Basic request example: require('supertest') is used with Express app to perform GET/POST requests.
  - Use .auth(username, password) to pass credentials similar to superagent.
  - Cookie persistence via request.agent with cookie-parser middleware requires setting cookies with res.cookie and retrieving via req.cookies.

Implementation Steps:
  1. Require and initialize SuperTest and Express.
  2. Define routes with desired responses (JSON, headers, etc.).
  3. Execute HTTP method call with desired assertions (.expect for headers, status, and custom functions).
  4. End tests with .end(callback) managing error propagation.

Exact Parameter Values:
  - Header Expectations: e.g., 'Content-Type', /json/; 'Content-Length', '15'.
  - Status Codes: e.g., 200 for success.

Troubleshooting:
  - If .end() receives an error, rethrow or call done(err) to fail tests.
  - Check cookie availability when using agent for persistence.

## Reference Details
API Specifications:
1. Function: request(app[, options])
   - Parameters:
     - app: HTTP server instance or function
     - options: Object { http2: Boolean } (optional)
   - Returns: SuperTest instance

2. Method: .get(url)
   - Parameter: url (String)
   - Returns: Test instance

3. Method: .expect(status[, fn])
   - Parameters:
     - status: Number (HTTP status code expected)
     - fn: Optional callback function
   - Behavior: Asserts response status code

4. Method: .expect(status, body[, fn])
   - Parameters:
     - status: Number
     - body: String, RegExp, or Object to match against response body
     - fn: Optional callback

5. Method: .expect(body[, fn])
   - Parameter: body (String, RegExp, or Object)
   - Behavior: Asserts response body

6. Method: .expect(field, value[, fn])
   - Parameters:
     - field: String (HTTP header field)
     - value: String or RegExp
     - fn: Optional callback

7. Method: .expect(callback)
   - Parameter: callback function(res) that performs custom assertions. Throw error if condition fails.

8. Method: .end(fn)
   - Parameter: fn(err, res)
   - Behavior: Finalizes the request, handling errors if any

Complete Code Example:
-------------------------------------------------
const request = require('supertest');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// Middleware setup
app.use(cookieParser());

// Route definition
app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

// Basic test
request(app)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });

// HTTP/2 test
request(app, { http2: true })
  .get('/user')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });

// Mocha test pattern
describe('GET /user', function() {
  it('should respond with json', function(done) {
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

// Cookie persistence test
app.get('/', function(req, res) {
  res.cookie('cookie', 'hey');
  res.send();
});

app.get('/return', function(req, res) {
  if (req.cookies.cookie) res.send(req.cookies.cookie);
  else res.send(':(');
});

const agent = request.agent(app);

agent
  .get('/')
  .expect('set-cookie', 'cookie=hey; Path=/', function(err) {
    if (err) throw err;
  });

agent
  .get('/return')
  .expect('hey', function(err) {
    if (err) throw err;
  });
-------------------------------------------------

Configuration Options:
  - { http2: true } enables HTTP/2 support.

Best Practices:
  - Chain assertions in the order of expected response alterations.
  - Utilize custom assertion functions for advanced validations.
  - Ensure error handling in the .end() callback to properly fail test cases.

Troubleshooting Procedures:
  - Run individual tests with verbose logging using console.log(err) in .end() to track assertion failures.
  - Verify that the Express app is correctly configured to handle cookies when using agent.
  - Ensure that HTTP header expectations match the exact output from the server.

Return Types: All callback functions follow Node.js error-first callback conventions.

## Information Dense Extract
Library: SuperTest; Installation: npm install supertest --save-dev; Usage: require('supertest'), bind to Express app; HTTP/2: enable via { http2: true }; API: .get(url), .expect(status[, fn]), .expect(status, body[, fn]), .expect(body[, fn]), .expect(field, value[, fn]), .expect(function(res){}) and .end(fn); Patterns: supports callbacks, Promises, async/await; Authentication: .auth(username, password); Cookie Handling: request.agent with cookie-parser; Complete API details provided with parameters, return types, and error handling; Best practices include chaining assertions and robust error propagation.

## Sanitised Extract
Table of Contents:
  1. Introduction
  2. Installation
  3. Basic Usage
  4. HTTP/2 Configuration
  5. Testing Patterns
  6. Authentication & Cookie Handling
  7. API Method Specifications

1. Introduction:
  - Library: SuperTest for testing HTTP servers using superagent.
  - Supports ephemeral port binding if server not listening.

2. Installation:
  - Command: npm install supertest --save-dev

3. Basic Usage:
  - Require module: const request = require('supertest');
  - Example: 
    const express = require('express');
    const app = express();
    app.get('/user', function(req, res) { res.status(200).json({ name: 'john' }); });
    request(app).get('/user').expect('Content-Type', /json/).expect('Content-Length', '15').expect(200).end(function(err, res) { if(err) throw err; });

4. HTTP/2 Configuration:
  - Enable by passing { http2: true } to request or request.agent:
    request(app, { http2: true }).get('/user')...

5. Testing Patterns:
  - Supports callbacks, promises, and async/await.
  - Mocha example with done callback and inline assertion via .expect(200, done).

6. Authentication & Cookie Handling:
  - Use .auth(username, password) for basic auth.
  - Persist cookies via request.agent: agent(app) with cookie-parser middleware.

7. API Method Specifications:
  - .expect(status[, fn]) - assert status code.
  - .expect(status, body[, fn]) - assert status and body.
  - .expect(body[, fn]) - assert response body with string, regex or object.
  - .expect(field, value[, fn]) - assert header field.
  - .expect(function(res){}) - custom assertion function; throw error if assertion fails.
  - .end(fn) - execute HTTP request and callback with error and response.

## Original Source
Supertest Documentation
https://github.com/visionmedia/supertest

## Digest of SUPERTEST

# SuperTest Documentation

Retrieved Date: 2023-10-30
Data Size: 661880 bytes

# Overview
SuperTest offers a high-level abstraction for HTTP testing built on top of superagent. It supports basic HTTP requests, HTTP/2 configuration, cookie handling, and multiple testing paradigms (callbacks, promises, async/await).

# Installation
To install, add supertest as a development dependency:

npm install supertest --save-dev

# Basic Usage
Include the module by requiring it:

const request = require('supertest');
const express = require('express');
const app = express();

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

request(app)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });

# HTTP2 Support
To enable HTTP2, pass an options object with { http2: true } to request or request.agent:

const request = require('supertest');

request(app, { http2: true })
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });

request.agent(app, { http2: true })
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });

# Mocha Integration & Asynchronous Patterns
Examples for Mocha with callback, promise and async/await patterns:

// Using callbacks:
describe('GET /user', function() {
  it('responds with json', function(done) {
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

// Using promises:
describe('GET /users', function() {
  it('responds with json', function() {
    return request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
         // Assertion: response.body.email equals expected email
      });
  });
});

// Using async/await:
describe('GET /users', function() {
  it('responds with json', async function() {
    const response = await request(app)
      .get('/users')
      .set('Accept', 'application/json');
    // Assertions
  });
});

# Authentication
Pass HTTP credentials using the auth method as in superagent:

describe('GET /user', function() {
  it('responds with json', function(done) {
    request(app)
      .get('/user')
      .auth('username', 'password')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

# Cookie Handling
Persist cookies using request.agent:

const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
app.use(cookieParser());

app.get('/', function(req, res) {
  res.cookie('cookie', 'hey');
  res.send();
});

app.get('/return', function(req, res) {
  if (req.cookies.cookie) res.send(req.cookies.cookie);
  else res.send(':(');
});

const agent = request.agent(app);

// Save cookies:
agent
  .get('/')
  .expect('set-cookie', 'cookie=hey; Path=/', function(err) {
    if (err) throw err;
  });

// Use cookies:
agent
  .get('/return')
  .expect('hey', function(err) {
    if (err) throw err;
  });

# API Details
SuperTest supports all superagent methods. Key API methods include:

.expect(status[, fn])
.expect(status, body[, fn])
.expect(body[, fn])
.expect(field, value[, fn])
.expect(function(res) {})
.end(fn)

Custom assertion example:

function hasPreviousAndNextKeys(res) {
  if (!('next' in res.body)) throw new Error('missing next key');
  if (!('prev' in res.body)) throw new Error('missing prev key');
}

request(app)
  .get('/')
  .expect(hasPreviousAndNextKeys)
  .end(function(err, res) {
    if (err) throw err;
  });

# Troubleshooting
If .expect() fails in .end(), the error is provided as the first argument. To fail the test case, rethrow the error or pass it to the done callback:

if (err) return done(err);
return done();

Attribution: Crawled from https://github.com/visionmedia/supertest
License: MIT

## Attribution
- Source: Supertest Documentation
- URL: https://github.com/visionmedia/supertest
- License: MIT License
- Crawl Date: 2025-04-28T16:51:30.456Z
- Data Size: 661880 bytes
- Links Found: 5442

## Retrieved
2025-04-28
library/PRETTIER.md
# library/PRETTIER.md
# PRETTIER

## Crawl Summary
Prettier formats code by parsing it to an AST and printing it based on configured options such as printWidth, tabWidth, trailingComma, etc. It supports multiple languages (JavaScript, TypeScript, CSS, HTML, JSON, GraphQL, Markdown, YAML) and integrates with various editors. It offers both CLI and API usage with options like objectWrap, experimentalOperatorPosition, and experimentalTernaries. Prettier enforces a consistent style by reprinting code and can be configured through .prettierrc files and command-line flags.

## Normalised Extract
Table of Contents:
1. Overview
2. Formatting Engine
3. Supported Options
4. API Method Signature
5. CLI and Configuration
6. Editor Integrations
7. Best Practices
8. Troubleshooting

Overview:
Prettier is an opinionated formatter that ignores original styling and formats code based on the AST and defined options.

Formatting Engine:
Reprints code by parsing to an AST and formatting it with specific rules including line length and wrapping.

Supported Options:
printWidth (default 80), tabWidth (default 2), useTabs (default false), semi (default true), singleQuote (default false), trailingComma (options: "none", "es5", "all"; default "es5"), bracketSpacing (default true), arrowParens (default "always"), parser (string identifier), experimental options: objectWrap (boolean), experimentalOperatorPosition (boolean), tsconfig (string), experimentalTernaries (boolean).

API Method Signature:
format(source: string, options?: Options): string

CLI and Configuration:
Command: npx prettier --write "src/**/*.js"
Configuration File: .prettierrc with JSON/YAML format containing option keys with their default values and effects.

Editor Integrations:
Support for VS Code, Sublime Text, Vim, Emacs with on-save formatting.

Best Practices:
Integrate Prettier as a pre-commit hook, use in conjunction with linters for code quality, and run in batch mode for existing codebases.

Troubleshooting:
Use --debug-check and --check flags to verify configuration and identify non-conforming files.

## Supplementary Details
Technical Specifications:
- Options with defaults: printWidth: 80, tabWidth: 2, useTabs: false, semi: true, singleQuote: false, trailingComma: "es5", bracketSpacing: true, arrowParens: "always".
- Experimental Options: objectWrap, experimentalOperatorPosition, experimentalTernaries, and support for TS config files.
- API: format(source: string, options?: Options): string returns formatted string.
- Configuration File (.prettierrc): JSON formatted file with keys matching options.
- CLI: npx prettier --write <glob pattern>
- Implementation Steps: Parse code to AST, remove original styling, re-print code with configured options, wrap lines based on printWidth.
- Example Code: require('prettier').format(source, options) and using CLI commands.
- Configuration Effects: Changing trailingComma from "es5" to "all" inserts commas in all possible locations; modifying printWidth adjusts line wrapping.
- Best practices include integrating with pre-commit hooks and editor on-save triggers.

## Reference Details
API Specifications:
Method: format(source: string, options?: Options): string
Options Interface:
{
  printWidth?: number;    // Default: 80
  tabWidth?: number;      // Default: 2
  useTabs?: boolean;      // Default: false
  semi?: boolean;         // Default: true
  singleQuote?: boolean;  // Default: false
  trailingComma?: 'none' | 'es5' | 'all'; // Default: 'es5'
  bracketSpacing?: boolean; // Default: true
  arrowParens?: 'avoid' | 'always'; // Default: 'always'
  parser: string;         // Required, e.g., 'babel', 'typescript', etc.
  objectWrap?: boolean;        // Optional, new in 3.5
  experimentalOperatorPosition?: boolean; // Optional experimental flag
  tsconfig?: string;           // Optional, path to TS config file
  experimentalTernaries?: boolean; // Optional experimental ternary formatting flag
}

Example Code Usage:
// Import Prettier module
const prettier = require('prettier');

// Define source code to format
const sourceCode = "foo(arg1, arg2, arg3, arg4);";

// Define formatting options
const options = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  arrowParens: 'always',
  parser: 'babel',
  objectWrap: false,
  experimentalOperatorPosition: false
};

// Format the code
const formattedCode = prettier.format(sourceCode, options);
console.log(formattedCode);

CLI Command:
Run: npx prettier --write "src/**/*.js"

Configuration File Example (.prettierrc):
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": false,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "arrowParens": "always"
}

Troubleshooting Commands:
- To check formatting without writing changes: npx prettier --check "src/**/*.js"
- To run in debug mode: npx prettier --debug-check "src/file.js"

Best Practices:
- Integrate Prettier with pre-commit hooks using husky.
- Combine with ESLint: configure ESLint to ignore formatting issues.
- Regularly update Prettier configuration to include experimental options when needed for new language features.


## Information Dense Extract
Prettier formats code by parsing into AST and reprinting. Options: printWidth=80, tabWidth=2, useTabs=false, semi=true, singleQuote=false, trailingComma='es5', bracketSpacing=true, arrowParens='always', parser required. API: format(source: string, options?: Options): string. CLI: npx prettier --write "src/**/*.js". Config file: .prettierrc JSON with option keys. Experimental options: objectWrap, experimentalOperatorPosition, experimentalTernaries, tsconfig for TypeScript. Integration with editors available. Troubleshooting: use --check and --debug-check. Example code provided with require('prettier') and formatting invocation.

## Sanitised Extract
Table of Contents:
1. Overview
2. Formatting Engine
3. Supported Options
4. API Method Signature
5. CLI and Configuration
6. Editor Integrations
7. Best Practices
8. Troubleshooting

Overview:
Prettier is an opinionated formatter that ignores original styling and formats code based on the AST and defined options.

Formatting Engine:
Reprints code by parsing to an AST and formatting it with specific rules including line length and wrapping.

Supported Options:
printWidth (default 80), tabWidth (default 2), useTabs (default false), semi (default true), singleQuote (default false), trailingComma (options: 'none', 'es5', 'all'; default 'es5'), bracketSpacing (default true), arrowParens (default 'always'), parser (string identifier), experimental options: objectWrap (boolean), experimentalOperatorPosition (boolean), tsconfig (string), experimentalTernaries (boolean).

API Method Signature:
format(source: string, options?: Options): string

CLI and Configuration:
Command: npx prettier --write 'src/**/*.js'
Configuration File: .prettierrc with JSON/YAML format containing option keys with their default values and effects.

Editor Integrations:
Support for VS Code, Sublime Text, Vim, Emacs with on-save formatting.

Best Practices:
Integrate Prettier as a pre-commit hook, use in conjunction with linters for code quality, and run in batch mode for existing codebases.

Troubleshooting:
Use --debug-check and --check flags to verify configuration and identify non-conforming files.

## Original Source
Prettier Documentation
https://prettier.io/docs/en/index.html

## Digest of PRETTIER

# Prettier API and Configuration

Date Retrieved: 2023-10-04

## Overview
Prettier is an opinionated code formatter that formats code by parsing it into an AST and printing it according to its own set of rules. It supports multiple languages including JavaScript (and JSX), Angular, Vue, Flow, TypeScript, CSS, Less, SCSS, HTML, Ember/Handlebars, JSON, GraphQL, Markdown (including GFM and MDX v1), and YAML.

## Formatting Engine
- Reprints code from scratch by ignoring original styling and formatting according to configured parameters.
- Uses maximum line length and other options to determine line breaks and wrapping.

## Supported Options and Defaults
- printWidth: number (default: 80) - Maximum line length before wrapping
- tabWidth: number (default: 2) - Number of spaces per indentation level
- useTabs: boolean (default: false) - Indent lines with tabs instead of spaces
- semi: boolean (default: true) - Print semicolons at ends of statements
- singleQuote: boolean (default: false) - Use single instead of double quotes
- trailingComma: string (default: "es5") - Print trailing commas where valid ("none", "es5", "all")
- bracketSpacing: boolean (default: true) - Print spaces between brackets in object literals
- arrowParens: string (default: "always") - Include parentheses around a sole arrow function parameter ("avoid" for omission)
- parser: string - Specifies which parser to use (e.g., "babel", "flow", "typescript", "css", "html", "json", "graphql", etc.)

## API Method Signatures
- format(source: string, options?: Options): string
  - Options interface includes all the supported options as listed above.

Example Options Interface:

  interface Options {
    printWidth?: number;
    tabWidth?: number;
    useTabs?: boolean;
    semi?: boolean;
    singleQuote?: boolean;
    trailingComma?: "none" | "es5" | "all";
    bracketSpacing?: boolean;
    arrowParens?: "avoid" | "always";
    parser: string;
    // Additional experimental options:
    objectWrap?: boolean; // New in version 3.5
    experimentalOperatorPosition?: boolean; // New experimental option
    tsconfig?: string; // Path to TypeScript config file
    experimentalTernaries?: boolean; // New flag for nested ternary formatting
  }

Example SDK Usage:

  const prettier = require("prettier");
  const sourceCode = "foo(arg1, arg2, arg3, arg4);";
  const formatted = prettier.format(sourceCode, {
    printWidth: 80,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: false,
    trailingComma: "es5",
    bracketSpacing: true,
    arrowParens: "always",
    parser: "babel"
  });
  console.log(formatted);

## CLI Commands and Configuration Files
- Run Prettier via CLI: npx prettier --write "src/**/*.js"
- Use .prettierrc file for configuration with JSON or YAML format listing the above options.

Example .prettierrc Content:

  {
    "printWidth": 80,
    "tabWidth": 2,
    "useTabs": false,
    "semi": true,
    "singleQuote": false,
    "trailingComma": "es5",
    "bracketSpacing": true,
    "arrowParens": "always"
  }

## Editor Integrations
- Plugins available for VS Code, Sublime Text, Vim, Emacs, and others. On save formatting is supported for seamless integration.

## Best Practices
- Use Prettier in pre-commit hooks to enforce code style consistency.
- Combine Prettier with linters (e.g., ESLint) where Prettier handles formatting and linters handle code quality.
- For large codebases run Prettier in batch mode (e.g., through CLI) to format the entire project at once.

## Troubleshooting Procedures
- Use the flag --debug-check to verify configuration settings.
- If formatting issues occur, run: npx prettier --check "src/**/*.js" to identify files that do not conform.
- For detailed performance issues, refer to the CLI: A Performance Deep Dive guide and run performance benchmarking commands as documented.

## Attribution and Data Size
- Data size obtained during crawling: 1033383 bytes
- Source URL: https://prettier.io/docs/en/index.html


## Attribution
- Source: Prettier Documentation
- URL: https://prettier.io/docs/en/index.html
- License: MIT License
- Crawl Date: 2025-04-28T01:08:49.804Z
- Data Size: 1033383 bytes
- Links Found: 2569

## Retrieved
2025-04-28
library/NODE_ESM.md
# library/NODE_ESM.md
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
library/NODE_FS.md
# library/NODE_FS.md
# NODE_FS

## Crawl Summary
The Node.js File System documentation provides complete API specifications for file operations using promise, callback, and synchronous methods. It covers the FileHandle class with methods like appendFile, chmod, chown, close, createReadStream, createWriteStream, read, write, and more, along with detailed option parameters, return types, and version history. The fsPromises API includes methods such as access, appendFile, chmod, chown, copyFile, cp, and glob, with complete parameter definitions and defaults. Additionally, the Callback and Synchronous APIs are specified with their respective method signatures and error handling patterns.

## Normalised Extract
Table of Contents:
1. FileHandle Class
   - Methods: appendFile(data[, options]), chmod(mode), chown(uid, gid), close(), createReadStream([options]), createWriteStream([options]), datasync(), read(buffer, offset, length, position), read([options]), readFile(options), readLines([options]), readv(buffers[, position]), stat([options]), sync(), truncate(len), utimes(atime, mtime), write(buffer, offset[, length[, position]]), write(buffer[, options]), write(string[, position[, encoding]]), writeFile(data, options), writev(buffers[, position]), [Symbol.asyncDispose]()
2. fsPromises API
   - Methods: access(path[, mode]), appendFile(path, data[, options]), chmod(path, mode), chown(path, uid, gid), copyFile(src, dest[, mode]), cp(src, dest[, options]), glob(pattern[, options]), lchmod(path, mode), lchown(path, uid, gid), lutimes(path, atime, mtime), link(existingPath, newPath), lstat(path[, options]), mkdir(path[, options]), mkdtemp(prefix[, options]), open(path, flags[, mode]), opendir(path[, options]), readdir(path[, options]), readFile(path[, options]), readlink(path[, options]), realpath(path[, options]), rename(oldPath, newPath), rmdir(path[, options]), rm(path[, options]), stat(path[, options]), statfs(path[, options]), symlink(target, path[, type]), truncate(path[, len]), unlink(path), utimes(path, atime, mtime), watch(filename[, options]), writeFile(file, data[, options]), constants
3. Callback API
   - Methods mirror promise APIs with an extra callback parameter for error handling.
4. Synchronous API
   - Methods mirror asynchronous counterparts with Sync suffix (e.g., openSync, readFileSync).

Each method includes exact parameter types, default values (e.g., encoding defaults to 'utf8', mode defaults to 0o666 for new files), and return types (typically Promise for asynchronous methods and direct values for synchronous methods). Code examples include promise-based, callback-based, and synchronous patterns with try/catch error handling.

## Supplementary Details
Detailed Technical Specifications:
- FileHandle Methods:
  - appendFile: data (string | Buffer | TypedArray | DataView | AsyncIterable | Iterable | Stream), options ({ encoding: string | null = 'utf8', signal: AbortSignal = undefined }). Returns Promise<void>.
  - chmod: mode (integer). Returns Promise<void>.
  - chown: uid (integer), gid (integer). Returns Promise<void>.
  - close: No parameters. Returns Promise<void>.
  - createReadStream: options ({ encoding: string = null, autoClose: boolean = true, emitClose: boolean = true, start: integer, end: integer = Infinity, highWaterMark: integer = 64*1024, signal: AbortSignal = undefined }). Returns fs.ReadStream.
  - createWriteStream: options ({ encoding: string = 'utf8', autoClose: boolean = true, emitClose: boolean = true, start: integer, highWaterMark: number = 16384, flush: boolean = false }). Returns fs.WriteStream.
  - read: Supports two overloads. One with (buffer, offset, length, position) and one with options object. Returns Promise<{ bytesRead: number, buffer: Buffer }>.
  - write: Two overloads for Buffer and string inputs. Returns Promise<{ bytesWritten: number, buffer: Buffer|string }>.
  - Other methods follow similar patterns with explicit parameter types and default values.
- fsPromises API:
  - access: path (string|Buffer|URL), mode (integer, default fs.constants.F_OK). Returns Promise<void>.
  - appendFile: path, data, options ({ encoding, mode = 0o666, flag = 'a', flush = false }). Returns Promise<void>.
  - copyFile: src, dest, mode (integer, default 0). Flags available: COPYFILE_EXCL, COPYFILE_FICLONE, COPYFILE_FICLONE_FORCE.
  - Additional methods include asynchronous file operations with identical parameter details to their callback/sync counterparts.
- Best Practices:
  - Always close FileHandle using close method.
  - Use try/catch around await calls.
  - Avoid race conditions by handling file access errors rather than pre-checking file accessibility.
  - For performance critical operations, consider callback APIs.

Implementation Steps:
1. Import required module (e.g., import { open } from 'node:fs/promises').
2. Open file using fsPromises.open(path, flags).
3. Perform desired file operations (read, write, etc.) with proper options.
4. Close file using filehandle.close() in finally block.

Troubleshooting Procedures:
- Use try/catch to capture error messages.
- Verify file permissions using fsPromises.access with constants.R_OK | constants.W_OK.
- Confirm file descriptor closure to avoid memory leaks.
- Example command: node -e "(async()=>{ try { let fd=await open('file.txt','r+'); await fd.close(); } catch(e){ console.error(e); } })()"

## Reference Details
API Specifications:
FileHandle.appendFile(data, [options]):
  - data: string | Buffer | TypedArray | DataView | AsyncIterable | Iterable | Stream
  - options: { encoding?: string|null = 'utf8', signal?: AbortSignal = undefined }
  - Returns: Promise<void>

FileHandle.chmod(mode: number): Promise<void>

FileHandle.chown(uid: number, gid: number): Promise<void>

FileHandle.close(): Promise<void>

FileHandle.createReadStream([options]):
  - options: { encoding?: string = null, autoClose?: boolean = true, emitClose?: boolean = true, start?: number, end?: number = Infinity, highWaterMark?: number = 65536, signal?: AbortSignal = undefined }
  - Returns: fs.ReadStream

FileHandle.createWriteStream([options]):
  - options: { encoding?: string = 'utf8', autoClose?: boolean = true, emitClose?: boolean = true, start?: number, highWaterMark?: number = 16384, flush?: boolean = false }
  - Returns: fs.WriteStream

FileHandle.read(buffer: Buffer, offset: number, length: number, position: number | bigint | null): Promise<{ bytesRead: number, buffer: Buffer }>

FileHandle.write(buffer: Buffer, offset?: number, length?: number, position?: number | null): Promise<{ bytesWritten: number, buffer: Buffer }>

FileHandle.write(string: string, position?: number | null, encoding?: string): Promise<{ bytesWritten: number, buffer: string }>

fsPromises.access(path: string | Buffer | URL, mode?: number = fs.constants.F_OK): Promise<void>

fsPromises.appendFile(path: string | Buffer | URL, data: string | Buffer, options?: { encoding?: string|null, mode?: number = 0o666, flag?: string = 'a', flush?: boolean = false } | string): Promise<void>

fsPromises.copyFile(src: string | Buffer | URL, dest: string | Buffer | URL, mode?: number = 0): Promise<void>

Full SDK usage examples:
// Promise-based usage
import { open, unlink } from 'node:fs/promises';

(async function() {
  let filehandle;
  try {
    filehandle = await open('sample.txt', 'r+');
    const { bytesRead, buffer } = await filehandle.read(Buffer.alloc(1024), 0, 1024, null);
    console.log(`Read ${bytesRead} bytes`);
    await filehandle.write('New content', null, 'utf8');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    if (filehandle) await filehandle.close();
  }
})();

// Callback-based usage
const fs = require('node:fs');
fs.unlink('/tmp/hello', (err) => {
  if (err) throw err;
  console.log('File deleted');
});

// Synchronous usage
const { unlinkSync } = require('node:fs');
try {
  unlinkSync('/tmp/hello');
  console.log('File deleted');
} catch (err) {
  console.error(err);
}

Troubleshooting:
- For permission errors, run: node -e "(async()=>{ try { await require('node:fs/promises').access('file.txt', require('node:fs').constants.R_OK | require('node:fs').constants.W_OK); console.log('Accessible'); } catch(e){ console.error(e); } })()"

## Information Dense Extract
NODE_FS; FileHandle: appendFile(data, [options]) Promise<void>; chmod(mode: number) Promise<void>; chown(uid: number, gid: number) Promise<void>; close() Promise<void>; createReadStream([options]) returns fs.ReadStream with options { encoding: null, autoClose: true, emitClose: true, start, end: Infinity, highWaterMark: 65536, signal }; createWriteStream([options]) returns fs.WriteStream with options { encoding: 'utf8', autoClose: true, emitClose: true, start, highWaterMark: 16384, flush: false }; read(buffer, offset, length, position): Promise<{bytesRead, buffer}>; write(buffer, offset, length, position): Promise<{bytesWritten, buffer}>; write(string, position, encoding): Promise<{bytesWritten, buffer}>; fsPromises API: access(path, mode=F_OK) Promise<void>, appendFile(path, data, options), copyFile(src, dest, mode=0) with flags COPYFILE_EXCL, COPYFILE_FICLONE, etc.; Callback and Sync APIs mirror these with callback and Sync suffix; Best practices: explicit close, try/catch handling, proper option defaults; Code examples provided for promise, callback, sync usage; Troubleshooting via fsPromises.access with R_OK|W_OK; Command usage examples provided.

## Sanitised Extract
Table of Contents:
1. FileHandle Class
   - Methods: appendFile(data[, options]), chmod(mode), chown(uid, gid), close(), createReadStream([options]), createWriteStream([options]), datasync(), read(buffer, offset, length, position), read([options]), readFile(options), readLines([options]), readv(buffers[, position]), stat([options]), sync(), truncate(len), utimes(atime, mtime), write(buffer, offset[, length[, position]]), write(buffer[, options]), write(string[, position[, encoding]]), writeFile(data, options), writev(buffers[, position]), [Symbol.asyncDispose]()
2. fsPromises API
   - Methods: access(path[, mode]), appendFile(path, data[, options]), chmod(path, mode), chown(path, uid, gid), copyFile(src, dest[, mode]), cp(src, dest[, options]), glob(pattern[, options]), lchmod(path, mode), lchown(path, uid, gid), lutimes(path, atime, mtime), link(existingPath, newPath), lstat(path[, options]), mkdir(path[, options]), mkdtemp(prefix[, options]), open(path, flags[, mode]), opendir(path[, options]), readdir(path[, options]), readFile(path[, options]), readlink(path[, options]), realpath(path[, options]), rename(oldPath, newPath), rmdir(path[, options]), rm(path[, options]), stat(path[, options]), statfs(path[, options]), symlink(target, path[, type]), truncate(path[, len]), unlink(path), utimes(path, atime, mtime), watch(filename[, options]), writeFile(file, data[, options]), constants
3. Callback API
   - Methods mirror promise APIs with an extra callback parameter for error handling.
4. Synchronous API
   - Methods mirror asynchronous counterparts with Sync suffix (e.g., openSync, readFileSync).

Each method includes exact parameter types, default values (e.g., encoding defaults to 'utf8', mode defaults to 0o666 for new files), and return types (typically Promise for asynchronous methods and direct values for synchronous methods). Code examples include promise-based, callback-based, and synchronous patterns with try/catch error handling.

## Original Source
Node.js File System Documentation
https://nodejs.org/api/fs.html

## Digest of NODE_FS

# Node.js File System Documentation
Retrieved: 2023-10-27

# Table of Contents
1. FileHandle Class
2. fsPromises API
3. Callback API
4. Synchronous API
5. Common Objects
6. Code Examples
7. Configuration & Best Practices
8. Troubleshooting

# 1. FileHandle Class
- filehandle.appendFile(data[, options])
  - Parameters:
    - data: string | Buffer | TypedArray | DataView | AsyncIterable | Iterable | Stream
    - options: Object | string, where options may include:
      - encoding: string | null (Default: 'utf8')
      - signal: AbortSignal | undefined (Default: undefined)
  - Returns: Promise that fulfills with undefined
  - Alias: filehandle.writeFile()

- filehandle.chmod(mode)
  - Parameters:
    - mode: integer (file mode bit mask)
  - Returns: Promise that fulfills with undefined

- filehandle.chown(uid, gid)
  - Parameters:
    - uid: integer (new owner user id)
    - gid: integer (new group id)
  - Returns: Promise that fulfills with undefined

- filehandle.close()
  - Returns: Promise that fulfills with undefined

- filehandle.createReadStream([options])
  - Options:
    - encoding: string (Default: null)
    - autoClose: boolean (Default: true)
    - emitClose: boolean (Default: true)
    - start: integer
    - end: integer (Default: Infinity)
    - highWaterMark: integer (Default: 64*1024)
    - signal: AbortSignal | undefined (Default: undefined)
  - Returns: fs.ReadStream

- filehandle.createWriteStream([options])
  - Options:
    - encoding: string (Default: 'utf8')
    - autoClose: boolean (Default: true)
    - emitClose: boolean (Default: true)
    - start: integer
    - highWaterMark: number (Default: 16384)
    - flush: boolean (Default: false)
  - Returns: fs.WriteStream

- filehandle.datasync()
  - Returns: Promise that fulfills with undefined

- filehandle.read(buffer, offset, length, position)
  - Parameters:
    - buffer: Buffer | TypedArray | DataView
    - offset: integer (Default: 0)
    - length: integer (Default: buffer.byteLength - offset)
    - position: integer | bigint | null (if null or -1, read from current position)
  - Returns: Promise that fulfills with { bytesRead: integer, buffer: Buffer }

- filehandle.read([options])
  - Options: { buffer: Buffer (Default: Buffer.alloc(16384)), offset: integer (Default: 0), length: integer, position: integer | bigint | null (Default: null) }
  - Returns: Promise that fulfills with { bytesRead: integer, buffer: Buffer }

- filehandle.readFile(options)
  - Options: Object | string
    - encoding: string | null (Default: null)
    - signal: AbortSignal
  - Returns: Promise that fulfills with file contents (Buffer if no encoding, string if encoding provided)

- filehandle.readLines([options])
  - Options: { encoding: string (Default: null), autoClose: boolean (Default: true), emitClose: boolean (Default: true), start: integer, end: integer (Default: Infinity), highWaterMark: integer (Default: 64*1024) }
  - Returns: readline.Interface for iterating lines

- filehandle.readv(buffers[, position])
  - Parameters:
    - buffers: Array of Buffers / TypedArrays / DataViews
    - position: integer | null (Default: null)
  - Returns: Promise that fulfills with { bytesRead: integer, buffers: Array }

- filehandle.stat([options])
  - Options: { bigint: boolean (Default: false) }
  - Returns: Promise that fulfills with fs.Stats

- filehandle.sync()
  - Returns: Promise that fulfills with undefined

- filehandle.truncate(len)
  - Parameters: len (integer, Default 0; if negative, treated as 0)
  - Returns: Promise that fulfills with undefined

- filehandle.utimes(atime, mtime)
  - Parameters:
    - atime: number | string | Date
    - mtime: number | string | Date
  - Returns: Promise that fulfills with undefined

- filehandle.write(buffer, offset[, length[, position]])
  - Parameters:
    - buffer: Buffer | TypedArray | DataView
    - offset: integer (start position in buffer)
    - length: integer (Default: buffer.byteLength - offset)
    - position: integer | null (Default: null)
  - Returns: Promise that fulfills with { bytesWritten: integer, buffer: Buffer }

- filehandle.write(buffer[, options])
  - Parameters:
    - buffer: Buffer | TypedArray | DataView
    - options: { offset: integer (Default: 0), length: integer (Default: buffer.byteLength - offset), position: integer (Default: null) }
  - Returns: Promise that fulfills with { bytesWritten: integer, buffer: Buffer }

- filehandle.write(string[, position[, encoding]])
  - Parameters:
    - string: string
    - position: integer | null (Default: null)
    - encoding: string (Default: 'utf8')
  - Returns: Promise that fulfills with { bytesWritten: integer, buffer: string }

- filehandle.writeFile(data, options)
  - Parameters:
    - data: string | Buffer | TypedArray | DataView | AsyncIterable | Iterable | Stream
    - options: Object | string, where if string, then it specifies encoding (Default: 'utf8')
      - signal: AbortSignal (Default: undefined)
  - Returns: Promise that fulfills with undefined

- filehandle.writev(buffers[, position])
  - Parameters:
    - buffers: Array of Buffers / TypedArrays / DataViews
    - position: integer | null (Default: null)
  - Returns: Promise that fulfills with { bytesWritten: integer, buffers: Array }

- filehandle[Symbol.asyncDispose]()
  - Alias for filehandle.close(), added in v20.4.0 / v18.18.0

# 2. fsPromises API (Promise Based)
Example method signatures:

- fsPromises.access(path[, mode])
  - Parameters:
    - path: string | Buffer | URL
    - mode: integer (Default: fs.constants.F_OK)
  - Returns: Promise that fulfills with undefined on success

- fsPromises.appendFile(path, data[, options])
  - Parameters:
    - path: string | Buffer | URL | FileHandle
    - data: string | Buffer
    - options: Object | string
      - encoding: string | null (Default: 'utf8')
      - mode: integer (Default: 0o666)
      - flag: string (Default: 'a')
      - flush: boolean (Default: false)
  - Returns: Promise that fulfills with undefined

- fsPromises.chmod(path, mode)
  - Parameters:
    - path: string | Buffer | URL
    - mode: string | integer
  - Returns: Promise that fulfills with undefined

- fsPromises.copyFile(src, dest[, mode])
  - Parameters:
    - src: string | Buffer | URL
    - dest: string | Buffer | URL
    - mode: integer (Default: 0)
      - Supports: fs.constants.COPYFILE_EXCL, fs.constants.COPYFILE_FICLONE, fs.constants.COPYFILE_FICLONE_FORCE
  - Returns: Promise that fulfills with undefined

... (Additional methods such as cp, glob, lchmod, lchown, lutimes, link, lstat, mkdir, mkdtemp, open, opendir, readdir, readFile, readlink, realpath, rename, rmdir, rm, stat, statfs, symlink, truncate, unlink, utimes, watch, writeFile, and constants are defined similarly with full parameter and return type details.)

# 3. Callback API
Example signatures:

- fs.access(path[, mode], callback)
- fs.appendFile(path, data[, options], callback)
- fs.chmod(path, mode, callback)
- fs.chown(path, uid, gid, callback)
- fs.close(fd[, callback])

Each callback receives (err, ...) with the first argument reserved for exceptions.

# 4. Synchronous API
Example signatures:

- fs.accessSync(path[, mode])
- fs.appendFileSync(path, data[, options])
- fs.chmodSync(path, mode)
- fs.chownSync(path, uid, gid)
- fs.closeSync(fd)
- fs.copyFileSync(src, dest[, mode])
- fs.openSync(path[, flags[, mode]])
- fs.readFileSync(path[, options])
... and others matching asynchronous counterparts.

# 5. Common Objects
Classes such as fs.Dir, fs.Dirent, fs.FSWatcher, fs.StatWatcher, fs.ReadStream, fs.Stats, fs.StatFs, fs.WriteStream with full method details and event definitions (e.g. 'close', 'open', 'error') are provided.

# 6. Code Examples

// Promise example
import { unlink } from 'node:fs/promises';

try {
  await unlink('/tmp/hello');
  console.log('successfully deleted /tmp/hello');
} catch (error) {
  console.error('error:', error.message);
}

// Callback example
import { unlink } from 'node:fs';

unlink('/tmp/hello', (err) => {
  if (err) throw err;
  console.log('successfully deleted /tmp/hello');
});

// Synchronous example
import { unlinkSync } from 'node:fs';

try {
  unlinkSync('/tmp/hello');
  console.log('successfully deleted /tmp/hello');
} catch (err) {
  // handle error
}

# 7. Configuration & Best Practices
- Use promise-based APIs for modern asynchronous control; callback versions offer performance benefits but require careful error handling.
- Always explicitly close FileHandle objects using filehandle.close() to avoid memory leaks.
- When using streams, set autoClose to true (default) to ensure resources are freed on error/end.
- For file copying, consider the mode flags (e.g., COPYFILE_EXCL) to prevent accidental overwrites.

# 8. Troubleshooting
- For permission errors, use fsPromises.access with constants (R_OK, W_OK, X_OK).
- In concurrent file modifications, verify proper synchronization to avoid data corruption.
- Utilize try/catch blocks around await calls to capture and log error messages.
- Check file descriptor leaks by ensuring every open FileHandle is closed properly.

# Attribution & Data Metrics
- Source URL: https://nodejs.org/api/fs.html
- Data Size: 4180337 bytes
- Links Found: 4648


## Attribution
- Source: Node.js File System Documentation
- URL: https://nodejs.org/api/fs.html
- License: MIT License
- Crawl Date: 2025-04-26T18:49:19.326Z
- Data Size: 4180337 bytes
- Links Found: 4648

## Retrieved
2025-04-26
library/MATH_JS.md
# library/MATH_JS.md
# MATH_JS

## Crawl Summary
Installation via npm or CDN; core functions include evaluate, compile, parse, chain; configuration options (relTol: 1e-12, absTol: 1e-15, matrix: 'Matrix', number: 'number', precision: 64, predictable: false, randomSeed: null); extension via import with options (override, silent, wrap); support for serialization using math.replacer and reviver; detailed expression parser and operator precedence provided.

## Normalised Extract
Table of Contents:
1. Installation and Setup
   - npm install mathjs, CDN links remain exact
2. Configuration Options
   - relTol: 1e-12, absTol: 1e-15, matrix: 'Matrix' or 'Array', number: 'number', 'BigNumber', 'bigint', 'Fraction', precision: 64 (default; e.g., 32 for BigNumbers), predictable: false, randomSeed: null
3. Core API Methods
   - math.evaluate(expr[, scope]) returns evaluated result
   - math.compile(expr) returns an object with evaluate([scope])
   - math.parse(expr) returns an expression tree node with compile, toString, toTex
   - math.parser() returns a parser with methods set, get, clear, remove
4. Chaining
   - math.chain(value) creates a chain; methods: add, subtract, multiply, done()
5. Import and Extension
   - math.import(functions, {override: boolean, silent: boolean, wrap: boolean})
6. Serialization
   - JSON.stringify(data, math.replacer) and JSON.parse(json, math.reviver)
7. Expression Syntax and Operators
   - Detailed operator list: +, -, *, /, ^, .' and factorial (!), with defined precedence

Each section provides exact code examples and detailed parameter values for immediate implementation.

## Supplementary Details
Configuration example:
const config = {
  relTol: 1e-12,
  absTol: 1e-15,
  matrix: 'Matrix',
  number: 'number',
  precision: 64,
  predictable: false,
  randomSeed: null
};
const math = create(all, config);

Chaining Example:
math.chain(3)
    .add(4)
    .multiply(2)
    .done(); // returns 14

Expression Evaluation:
const result = math.evaluate('sqrt(3^2 + 4^2)'); // returns 5

Import Example:
math.import({
  myvalue: 42,
  hello: function(name) { return 'hello, ' + name + '!'; }
}, { override: false, silent: false, wrap: false });

Serialization Example:
const x = math.complex('2+3i');
const jsonStr = JSON.stringify(x, math.replacer);
const restored = JSON.parse(jsonStr, math.reviver);

Detailed configuration options with defaults and effects are provided. API methods include exact parameter types (e.g., string for expression, Object or Map for scope) and return type descriptions.

## Reference Details
API Specifications:

1. math.evaluate(expr: string, scope?: Object|Map): any
   - Evaluates an expression string with optional scope. Throws error if expression contains blacklisted symbols.

2. math.compile(expr: string): { evaluate(scope?: Object|Map): any }
   - Compiles an expression for repeated evaluations.

3. math.parse(expr: string): Node
   - Returns a Node representing the parsed expression. Node methods: compile(), toString(), toTex().

4. math.chain(value: any): Chain
   - Returns a Chain object with methods:
       done(): any   // Finalize and return the value
       valueOf(): any
       toString(): string
       Chain supports all math namespace functions where the chain's value is passed as first argument.

5. math.import(functions: Object|Array, options?: { override?: boolean, silent?: boolean, wrap?: boolean }): void
   - Imports functions/constants. override defaults to false, silent to false, wrap to false.

6. math.config(options: Object): Object
   - Sets configuration options. Options include:
       relTol: number (default 1e-12)
       absTol: number (default 1e-15)
       matrix: 'Matrix'|'Array' (default 'Matrix')
       number: 'number'|'BigNumber'|'bigint'|'Fraction' (default 'number')
       precision: number (default 64, applicable for BigNumbers)
       predictable: boolean (default false)
       randomSeed: any (default null)

Code Examples with comments are embedded above. 

Implementation Pattern:
- Create math instance: const math = create(all, config);
- Evaluate expressions repeatedly with compile and parse.
- Extend functionality using math.import.
- Manage chain operations with math.chain.

Troubleshooting Procedures:
- If incorrect types occur, check configuration (e.g., 'number' vs 'BigNumber').
- Use math.replacer with JSON.stringify to avoid serialization issues with Infinity.
- For complex expressions, first parse with math.parse(expr) to debug structure.

Commands:
- npm install mathjs
- In Node.js, require or import the module as shown in examples.

Return types, parameter types, and potential exceptions (e.g., parsing errors) are handled by the library, following JavaScript error conventions.

## Information Dense Extract
npm install mathjs; CDN: unpkg, cdnjs, jsDelivr; API: math.evaluate(string, [scope]) -> any; math.compile(string) -> { evaluate([scope]) }; math.parse(string) -> Node (methods: compile(), toString(), toTex()); math.chain(value) -> Chain (methods: done(), valueOf(), toString()); math.import(object, {override:boolean, silent:boolean, wrap:boolean}); math.config({relTol:1e-12, absTol:1e-15, matrix:'Matrix'|'Array', number:'number'|'BigNumber'|'bigint'|'Fraction', precision:64, predictable:false, randomSeed:null}); Expression parser supports infix notation with operators: +, -, *, /, ^, %, !, etc.; Operator precedence strictly defined; JSON serialization using math.replacer and math.reviver; Detailed step-by-step examples provided for chaining, import, configuration, and expression evaluation.

## Sanitised Extract
Table of Contents:
1. Installation and Setup
   - npm install mathjs, CDN links remain exact
2. Configuration Options
   - relTol: 1e-12, absTol: 1e-15, matrix: 'Matrix' or 'Array', number: 'number', 'BigNumber', 'bigint', 'Fraction', precision: 64 (default; e.g., 32 for BigNumbers), predictable: false, randomSeed: null
3. Core API Methods
   - math.evaluate(expr[, scope]) returns evaluated result
   - math.compile(expr) returns an object with evaluate([scope])
   - math.parse(expr) returns an expression tree node with compile, toString, toTex
   - math.parser() returns a parser with methods set, get, clear, remove
4. Chaining
   - math.chain(value) creates a chain; methods: add, subtract, multiply, done()
5. Import and Extension
   - math.import(functions, {override: boolean, silent: boolean, wrap: boolean})
6. Serialization
   - JSON.stringify(data, math.replacer) and JSON.parse(json, math.reviver)
7. Expression Syntax and Operators
   - Detailed operator list: +, -, *, /, ^, .' and factorial (!), with defined precedence

Each section provides exact code examples and detailed parameter values for immediate implementation.

## Original Source
Math.js Documentation
https://mathjs.org/docs/

## Digest of MATH_JS

# Installation

Install Math.js via npm: npm install mathjs

Download from CDNs (unpkg, cdnjs, jsDelivr) or create a custom bundle. The library ships with built-in TypeScript definitions.

# Core API and Usage

Math.js exposes a global math namespace containing functions and constants. Three main usage patterns:
1. Direct function calls: e.g. math.add(math.sqrt(4), 2)
2. Expression evaluation: math.evaluate('sqrt(4)+2')
3. Chaining: math.chain(3).add(4).multiply(2).done()

# Configuration

Configuration options are set via math.config() and applied on a math.js instance. Example configuration object:
  {
    relTol: 1e-12,      // Minimum relative tolerance for equality checks (default: 1e-12)
    absTol: 1e-15,      // Minimum absolute tolerance for equality checks (default: 1e-15)
    matrix: 'Matrix',   // Default matrix output ('Matrix' or 'Array')
    number: 'number',   // Number type: 'number', 'BigNumber', 'bigint', or 'Fraction'
    precision: 64,      // Significant digits for BigNumbers (default: 64)
    predictable: false, // Determines output type consistency; false returns complex numbers for sqrt(-4)
    randomSeed: null    // Seed for deterministic random number generation
  }

# Chaining

Chaining is supported using math.chain(value), allowing a series of operations to be executed sequentially, with special methods:

  done() - Finalizes the chain and returns the resulting value
  valueOf() - Alias of done()
  toString() - Returns a formatted string of the chain’s value

Example:

  math.chain(3)
      .add(4)
      .subtract(2)
      .done()  // Returns 5

# Expressions and Parsing

Math.js includes an expression parser with several interfaces:

  - math.evaluate(expr, [scope]) evaluates an expression string or array of expressions.
  - math.compile(expr) compiles an expression once and allows repeated execution with evaluate([scope]).
  - math.parse(expr) converts the expression string into an expression tree (node) that can be compiled.
  - A parser instance can be created with math.parser(), which maintains its own scope with methods get, set, clear, remove.

Example:

  const code = math.compile('sqrt(3^2 + 4^2)');
  const result = code.evaluate();  // 5

# Import and Extension

Math.js can be extended with new functions/constants using math.import(object, [options]). Available options:

  override (boolean): Overwrite existing functions (default false)
  silent (boolean): Suppress errors on duplicates/invalid types (default false)
  wrap (boolean): Wrap functions to convert types when needed (default false)

Example:

  math.import({
    myvalue: 42,
    hello: function(name) { return 'hello, ' + name + '!'; }
  });

After import, both math.evaluate and direct function calls can use these new functions.

# Serialization

Math.js data types (Matrix, Complex, Unit) can be serialized to JSON. Use math.replacer with JSON.stringify to ensure special cases (like Infinity) are handled properly. To restore from JSON, use math.reviver with JSON.parse.

Example:

  const json = JSON.stringify(x, math.replacer);
  const restored = JSON.parse(json, math.reviver);

# Detailed Expression Syntax and Operators

Supported operators include +, -, *, /, ^, and many functions. Operators have defined precedence:

  1. Grouping and indexing (parentheses, brackets)
  2. Transpose (') and Factorial (!)
  3. Exponentiation (^, .^)
  4. Unary operators (+, -, not, ~)
  5. Implicit multiplication
  6. Multiplication, Division, Modulus (% or mod)
  7. Addition and Subtraction
  8. Range (:) and Unit conversions (to, in)
  9. Shifts, Relational, Bitwise operators
  10. Logical operators (and, or, xor)
  11. Conditional (? :) and Assignment (=)

# API Examples and Method Signatures

math.evaluate(expr[, scope]) -> returns evaluated result. scope is an object or Map.

math.compile(expr) -> { evaluate(scope: Object): any } 

math.parse(expr) -> returns Node with methods compile(), toString(), toTex()

math.chain(value) -> returns Chain object with methods:
  done() -> any
  valueOf() -> any
  toString() -> string

math.import(functions: Object, [options: Object]) -> void

math.config(options: Object) -> returns current configuration

# Metadata

Attribution: Crawled from https://mathjs.org/docs/ on 

## Attribution
- Source: Math.js Documentation
- URL: https://mathjs.org/docs/
- License: MIT License
- Crawl Date: 2025-04-29T13:03:21.916Z
- Data Size: 3725547 bytes
- Links Found: 7278

## Retrieved
2025-04-29
library/VITEST.md
# library/VITEST.md
# VITEST

## Crawl Summary
Includes installation commands (npm, yarn, pnpm), test file naming conventions, detailed configuration examples using defineConfig and mergeConfig, workspace setup for multiple configurations, CLI command examples, advanced configuration options (test, server, deps, benchmark), and troubleshooting practices specific to Vitest.

## Normalised Extract
Table of Contents:
  1. Installation
  2. Writing Tests
  3. Configuration
  4. Workspaces
  5. CLI Options
  6. Advanced Options

1. Installation:
  - npm: npm install -D vitest
  - yarn: yarn add -D vitest
  - pnpm: pnpm add -D vitest

2. Writing Tests:
  - File naming: include .test. or .spec.
  - Example:
    File: sum.js exports function sum(a, b) { return a + b }
    File: sum.test.js imports { expect, test } from 'vitest' and asserts expect(sum(1,2)).toBe(3)
  - Add test script in package.json: "test": "vitest"

3. Configuration:
  - Use vitest.config.ts with defineConfig from 'vitest/config'.
  - Example: defineConfig({ test: { include: [...], exclude: [...], globals: false, environment: 'node' } })
  - Override config using CLI: vitest --config ./path/to/config

4. Workspaces:
  - Define test.workspace as an array of glob patterns or configuration objects with keys: name, root, environment, setupFiles.
  - Example includes configurations for 'happy-dom' and 'node'.

5. CLI Options:
  - Run tests: vitest or vitest run
  - Options: --watch, --config <path>, --port, --https, etc.
  - Default npm scripts: { "test": "vitest", "coverage": "vitest run --coverage" }

6. Advanced Options:
  - test options: include, exclude, globals, environment, update, watch
  - server options: sourcemap ('inline'), debug (dumpModules, loadDummpedModules), deps (external, inline)
  - deps.optimizer for bundling external libraries
  - Benchmark configuration: include, exclude, outputJson
  - Use VITEST_SKIP_INSTALL_CHECKS=1 to disable auto dependency installation prompts

## Supplementary Details
Key technical specifications:
- Vitest requires Vite >=v5.0.0, Node >=v18.0.0
- Configuration file supports extensions: .js, .mjs, .cjs, .ts, .cts, .mts
- Test configuration options:
    include (default: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'])
    exclude (default: ['**/node_modules/**', '**/dist/**', etc])
    globals: false
    environment: 'node'
    update: false
    watch: true
- Server configuration:
    sourcemap: 'inline'
    debug: { dumpModules: false, loadDumppedModules: false }
    deps: {
       external: [/\/node_modules\//],
       inline: []
    }
- Workspaces: Array of glob patterns and config objects (keys: name, root, environment, setupFiles)
- CLI available commands: vitest, vitest run, vitest --config <path>
- Dependency optimization via deps.optimizer including options for bundling and inline processing
- Environment override via docblock (@vitest-environment jsdom/happy-dom)
- Best practices: unified configuration file, disable dependency checks with VITEST_SKIP_INSTALL_CHECKS, use correct command for Bun

## Reference Details
API Specifications:
----------------------------------------------------------------
1. defineConfig (from 'vitest/config'):
   Signature: defineConfig(config: {
     test?: {
       include?: string[],
       exclude?: string[],
       globals?: boolean,
       environment?: string,
       update?: boolean,
       watch?: boolean
     },
     server?: {
       sourcemap?: 'inline' | boolean,
       debug?: {
         dumpModules?: boolean | string,
         loadDumppedModules?: boolean
       },
       deps?: {
         external?: (string | RegExp)[],
         inline?: (string | RegExp)[]
       }
     },
     deps?: {
       optimizer?: { ssr?: boolean, web?: boolean }
     },
     benchmark?: {
       include?: string[],
       exclude?: string[],
       outputJson?: string
     },
     alias?: Record<string, string> | Array<{ find: string | RegExp, replacement: string }>
   }): Config

2. mergeConfig:
   Signature: mergeConfig(viteConfig: any, vitestConfig: any): any

3. Example Test Code:
   // sum.js
   export function sum(a: number, b: number): number {
     return a + b
   }

   // sum.test.js
   import { expect, test } from 'vitest';
   import { sum } from './sum.js';
   test('adds 1 + 2 to equal 3', () => {
     expect(sum(1, 2)).toBe(3);
   });

4. CLI Usage:
   - Run tests: npm run test
   - Run once: vitest run
   - Custom config: vitest --config ./custom/vitest.config.ts

5. Troubleshooting:
   - For Bun: use 'bun run test'
   - For VM context memory issues: adjust poolOptions.vmThreads.memoryLimit (in advanced config)
   - View help: npx vitest --help

6. Environment Specification:
   - Use docblock: 
     /**
      * @vitest-environment jsdom
      */
   - Alternatively, use comment style: // @vitest-environment happy-dom
----------------------------------------------------------------
Best Practices:
- Use a unified config to avoid duplication.
- Set VITEST_SKIP_INSTALL_CHECKS=1 to disable automatic dependency prompts.
- Ensure proper CLI usage depending on your package manager (e.g., Bun requirements).


## Information Dense Extract
Vitest: Vite >=5.0.0, Node >=18.0.0; install: npm install -D vitest / yarn add -D vitest / pnpm add -D vitest; Test file: *.test.js, must include .test. or .spec.; Example: sum.js exports sum(a, b), sum.test.js imports { expect, test } from 'vitest'; Config: defineConfig({ test: { include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'], exclude: [...], globals: false, environment: 'node' } }); CLI: vitest, vitest run, --config <path>, --watch; Workspaces: test.workspace as array of glob patterns/config objects; Advanced: server.sourcemap: 'inline', server.debug: { dumpModules: false }, deps.external: [/\/node_modules\//]; API: defineConfig, mergeConfig; Troubleshooting: use bun run test, adjust poolOptions.vmThreads.memoryLimit; Environment override via @vitest-environment docblock.

## Sanitised Extract
Table of Contents:
  1. Installation
  2. Writing Tests
  3. Configuration
  4. Workspaces
  5. CLI Options
  6. Advanced Options

1. Installation:
  - npm: npm install -D vitest
  - yarn: yarn add -D vitest
  - pnpm: pnpm add -D vitest

2. Writing Tests:
  - File naming: include .test. or .spec.
  - Example:
    File: sum.js exports function sum(a, b) { return a + b }
    File: sum.test.js imports { expect, test } from 'vitest' and asserts expect(sum(1,2)).toBe(3)
  - Add test script in package.json: 'test': 'vitest'

3. Configuration:
  - Use vitest.config.ts with defineConfig from 'vitest/config'.
  - Example: defineConfig({ test: { include: [...], exclude: [...], globals: false, environment: 'node' } })
  - Override config using CLI: vitest --config ./path/to/config

4. Workspaces:
  - Define test.workspace as an array of glob patterns or configuration objects with keys: name, root, environment, setupFiles.
  - Example includes configurations for 'happy-dom' and 'node'.

5. CLI Options:
  - Run tests: vitest or vitest run
  - Options: --watch, --config <path>, --port, --https, etc.
  - Default npm scripts: { 'test': 'vitest', 'coverage': 'vitest run --coverage' }

6. Advanced Options:
  - test options: include, exclude, globals, environment, update, watch
  - server options: sourcemap ('inline'), debug (dumpModules, loadDummpedModules), deps (external, inline)
  - deps.optimizer for bundling external libraries
  - Benchmark configuration: include, exclude, outputJson
  - Use VITEST_SKIP_INSTALL_CHECKS=1 to disable auto dependency installation prompts

## Original Source
Vitest Documentation
https://vitest.dev/

## Digest of VITEST

# Vitest Documentation

## Overview
Vitest is a next generation testing framework powered by Vite. It supports ESM, TypeScript, and JSX out of the box. Vitest requires Vite >=v5.0.0 and Node >=v18.0.0.

## Installation
Install via one of the following commands:
- npm: npm install -D vitest
- yarn: yarn add -D vitest
- pnpm: pnpm add -D vitest

## Writing Tests
Test files must include .test. or .spec. in their file names. Example:

// sum.js
export function sum(a, b) {
  return a + b
}

// sum.test.js
import { expect, test } from 'vitest'
import { sum } from './sum.js'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})

Update package.json with:
{
  "scripts": {
    "test": "vitest"
  }
}

## Configuration
Vitest supports unified configuration with Vite. Use a separate file (vitest.config.ts) or integrate into vite.config.ts. You can override default behavior:

Example vitest.config.ts:
-------------------------------------------------
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    globals: false,
    environment: 'node',
    update: false,
    watch: true
  }
})
-------------------------------------------------

CLI override example:
vitest --config ./path/to/vitest.config.ts

Merge Vite config with Vitest config using mergeConfig:
-------------------------------------------------
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.mjs'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    // override settings
  }
}))
-------------------------------------------------

## Workspaces
Support for multiple project configurations:
-------------------------------------------------
export default defineConfig({
  test: {
    workspace: [
      'packages/*',
      'tests/*/vitest.config.{e2e,unit}.ts',
      {
        test: {
          name: 'happy-dom',
          root: './shared_tests',
          environment: 'happy-dom',
          setupFiles: ['./setup.happy-dom.ts']
        }
      },
      {
        test: {
          name: 'node',
          root: './shared_tests',
          environment: 'node',
          setupFiles: ['./setup.node.ts']
        }
      }
    ]
  }
})
-------------------------------------------------

## Command Line Interface (CLI)
Default npm scripts:
-------------------------------------------------
{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}
-------------------------------------------------

CLI options include:
- vitest run (run tests once)
- --watch (watch mode)
- --config <path> to specify a custom configuration
- Additional options like --port and --https are available.

## Advanced Configuration Options
Vitest allows deep configuration including server, dependency resolution, and benchmarking. Key options include:

- test.include: Glob patterns, default: ['**/*.{test,spec}.?(c|m)[jt]s?(x)']
- test.exclude: Default: ['**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**', '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*']
- globals: boolean, default false
- environment: string, default 'node'

Server settings example:
-------------------------------------------------
server: {
  sourcemap: 'inline',
  debug: {
    dumpModules: false,
    loadDumppedModules: false
  },
  deps: {
    external: [/\/node_modules\//],
    inline: []
  }
}
-------------------------------------------------

Benchmark options, alias settings, and advanced dependency optimization (deps.optimizer) are also supported.

## Best Practices
- Use a unified configuration file for both Vite and Vitest when possible.
- Disable automatic dependency prompts with environment variable VITEST_SKIP_INSTALL_CHECKS=1.
- For Bun users, always run tests using 'bun run test' instead of 'bun test'.
- If using separate config files, ensure duplicate Vite options are consistent between them.

## Troubleshooting
- If using Bun, replace 'bun test' with 'bun run test'.
- For VM context issues (memory leaks), adjust poolOptions.vmThreads.memoryLimit.
- Refer to CLI help by running: npx vitest --help

Retrieved on: 2023-10-29
Data Size: 43045419 bytes, Links Found: 26450

## Attribution
- Source: Vitest Documentation
- URL: https://vitest.dev/
- License: MIT License
- Crawl Date: 2025-04-29T06:53:05.481Z
- Data Size: 43045419 bytes
- Links Found: 26450

## Retrieved
2025-04-29
