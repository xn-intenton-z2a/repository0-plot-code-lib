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
