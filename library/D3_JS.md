# D3_JS

## Crawl Summary
D3.js provides low-level functions for DOM manipulation, creating and updating SVG elements based on data. Key elements include d3.create for SVG containers, scales (d3.scaleUtc and d3.scaleLinear) with defined domains and ranges, and axes (d3.axisBottom and d3.axisLeft). Integration is possible via ESM modules, UMD bundles, npm installation and includes examples for React and Svelte.

## Normalised Extract
TABLE OF CONTENTS
1. SVG Creation and DOM Manipulation
   - Use d3.create('svg') to generate an SVG element with attributes 'width' and 'height'.
   - Append the SVG to the container using container.append(svg.node()).
2. Chart Dimensions and Margins
   - Dimensions: width=640, height=400
   - Margins: top=20, right=20, bottom=30, left=40
3. Scales and Axes Construction
   - Define x scale using d3.scaleUtc() with domain [new Date('2023-01-01'), new Date('2024-01-01')] and range [marginLeft, width - marginRight].
   - Define y scale using d3.scaleLinear() with domain [0, 100] and range [height - marginBottom, marginTop].
   - Render axes by appending groups and calling d3.axisBottom(x) and d3.axisLeft(y).
4. Module Integration Patterns
   - ESM: import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm'
   - UMD: Use <script src='https://cdn.jsdelivr.net/npm/d3@7'></script>
   - Local npm: npm install d3; import * as d3 from 'd3'
5. Advanced Usage and Framework Integration
   - Example for force layout using d3-force module with forceSimulation, forceCollide, and forceX.
   - React and Svelte examples show usage of d3 with component lifecycle hooks and reactive statements.

## Supplementary Details
Chart Setup:
- Width: 640, Height: 400
- Margins: top: 20, right: 20, bottom: 30, left: 40
Scale Configuration:
- x scale: d3.scaleUtc() with domain([new Date('2023-01-01'), new Date('2024-01-01')]) and range([marginLeft, width - marginRight])
- y scale: d3.scaleLinear() with domain([0, 100]) and range([height - marginBottom, marginTop])
Axis Rendering:
- x-axis appended to group element translated by (0, height - marginBottom) and rendered using d3.axisBottom(x)
- y-axis appended to group element translated by (marginLeft, 0) and rendered using d3.axisLeft(y)
Module Loading and Bundling:
- ESM via CDN, UMD with script tag, or local npm installation. 
Advanced Examples:
- Force layout: forceSimulation(nodes) with forces: forceX() and forceCollide(5) and tick event logging.
Framework Specifics:
- React: Use useRef and useEffect to bind D3 axis generators to DOM elements.
- Svelte: Use reactive statements ($:) to update scales and call d3.axis methods using bind:this for DOM references.

## Reference Details
API Specifications:
- d3.create(element: string): Returns a selection of the created element. Example: const svg = d3.create('svg').attr('width', 640).attr('height', 400);
- d3.scaleUtc(): Creates a time scale with methods .domain([startDate, endDate]) and .range([min, max]).
- d3.scaleLinear(): Creates a linear scale with .domain([minValue, maxValue]) and .range([minPixel, maxPixel]).
- d3.axisBottom(scale): Generates an axis based on the provided scale for the bottom orientation. Returns an axis generator.
- d3.axisLeft(scale): Generates a left-oriented axis from the provided scale.

Method Signatures:
- axisBottom(scale: d3.ScaleTime<number, number>): (selection: d3.Selection<SVGGElement, unknown, null, undefined>) => void
- axisLeft(scale: d3.ScaleLinear<number, number>): (selection: d3.Selection<SVGGElement, unknown, null, undefined>) => void

Code Example (ESM):
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
    .call(d3.axisBottom(x));

svg.append('g')
    .attr('transform', `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y));

// Append the SVG element: container.append(svg.node());

Troubleshooting Procedures:
- Ensure correct import: For ESM, use the full URL with "/+esm" suffix.
- Verify date formats in d3.scaleUtc domain are valid Date objects.
- If axes are not rendered, check that container element exists and that margins are set correctly.
- Use browser developer tools to inspect SVG structure and applied attributes.

Installation commands:
- npm install d3
- yarn add d3

Return Types:
- d3.create returns a D3 selection.
- Axis generators when called on a selection return undefined (side-effect: DOM update).


## Information Dense Extract
d3.create('svg'): selection; dimensions: 640x400; margins: 20,20,30,40; x scale: d3.scaleUtc() with domain [2023-01-01,2024-01-01], range [marginLeft, width-marginRight]; y scale: d3.scaleLinear() with domain [0,100], range [height-marginBottom, marginTop]; axes: d3.axisBottom(x), d3.axisLeft(y); module import patterns: ESM via cdn.jsdelivr.net, UMD via script tag, npm installation; advanced: d3-force usage with forceSimulation, forceCollide(5), forceX(); React integration via useRef/useEffect; Svelte integration using reactive statements; API: axisBottom(scale) and axisLeft(scale) method signatures; troubleshooting: verify container, date formats, margins; installation commands: npm install d3, yarn add d3.

## Sanitised Extract
TABLE OF CONTENTS
1. SVG Creation and DOM Manipulation
   - Use d3.create('svg') to generate an SVG element with attributes 'width' and 'height'.
   - Append the SVG to the container using container.append(svg.node()).
2. Chart Dimensions and Margins
   - Dimensions: width=640, height=400
   - Margins: top=20, right=20, bottom=30, left=40
3. Scales and Axes Construction
   - Define x scale using d3.scaleUtc() with domain [new Date('2023-01-01'), new Date('2024-01-01')] and range [marginLeft, width - marginRight].
   - Define y scale using d3.scaleLinear() with domain [0, 100] and range [height - marginBottom, marginTop].
   - Render axes by appending groups and calling d3.axisBottom(x) and d3.axisLeft(y).
4. Module Integration Patterns
   - ESM: import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm'
   - UMD: Use <script src='https://cdn.jsdelivr.net/npm/d3@7'></script>
   - Local npm: npm install d3; import * as d3 from 'd3'
5. Advanced Usage and Framework Integration
   - Example for force layout using d3-force module with forceSimulation, forceCollide, and forceX.
   - React and Svelte examples show usage of d3 with component lifecycle hooks and reactive statements.

## Original Source
D3.js Documentation
https://d3js.org/

## Digest of D3_JS

# D3 Documentation Digest (Retrieved: 2023-10-05)

## SVG Container Creation
- Create an SVG container using d3.create:
  const svg = d3.create("svg")
      .attr("width", width)        // e.g., 640
      .attr("height", height);     // e.g., 400
- Append SVG to DOM container: container.append(svg.node());

## Chart Dimensions and Margins
- Dimensions: width = 640; height = 400
- Margins: marginTop = 20, marginRight = 20, marginBottom = 30, marginLeft = 40

## Scales and Axes
- Horizontal (x) scale using d3.scaleUtc:
  const x = d3.scaleUtc()
      .domain([new Date("2023-01-01"), new Date("2024-01-01")])
      .range([marginLeft, width - marginRight]);
- Vertical (y) scale using d3.scaleLinear:
  const y = d3.scaleLinear()
      .domain([0, 100])
      .range([height - marginBottom, marginTop]);
- Axes creation and rendering:
  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x));

  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y));

## Integration Methods
- ESM Module Loading:
  import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
- UMD Bundle via CDN:
  <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
- Local Installation via npm:
  npm install d3
  import * as d3 from "d3";

## Advanced Topics
- D3 Force Layout Example:
  import {forceSimulation, forceCollide, forceX} from "https://cdn.jsdelivr.net/npm/d3-force@3/+esm";
  const nodes = [{}, {}];
  const simulation = forceSimulation(nodes)
      .force("x", forceX())
      .force("collide", forceCollide(5))
      .on("tick", () => console.log(nodes[0].x));

## Framework Integrations
- React Example:
  import * as d3 from "d3";
  // Using useRef and useEffect hooks for axes:
  // const gx = useRef(); ... d3.select(gx.current).call(d3.axisBottom(x));
- Svelte Example:
  <script>
    import * as d3 from 'd3';
    export let data;
    $: x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
    $: y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
    $: line = d3.line((d, i) => x(i), y);
  </script>
  <svg width={width} height={height}>
    <path fill="none" stroke="currentColor" stroke-width="1.5" d={line(data)} />
  </svg>


## Attribution
- Source: D3.js Documentation
- URL: https://d3js.org/
- License: BSD-3-Clause
- Crawl Date: 2025-04-25T20:28:03.863Z
- Data Size: 6360997 bytes
- Links Found: 26499

## Retrieved
2025-04-25
