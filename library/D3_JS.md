# D3_JS

## Crawl Summary
D3.js provides a complete set of modules for custom data visualizations. Key technical elements include selections and transitions for DOM manipulation, scales and axes (e.g., d3.scaleUtc(), d3.scaleLinear(), d3.axisBottom(), d3.axisLeft()), and layout engines such as force simulations. Implementation involves defining chart dimensions, configuring domains and ranges on scales, appending SVG elements, and integrating dynamic updates via data joins. Usage in frameworks like React and Svelte is facilitated by hooks and reactive statements.

## Normalised Extract
Table of Contents:
1. Basic Chart Setup
2. ES Module and CDN Integration
3. Force Simulation
4. Node Package Installation
5. React Integration
6. Svelte Integration

1. Basic Chart Setup:
- Set dimensions: width = 640, height = 400, margins (top:20, right:20, bottom:30, left:40).
- Define x scale using d3.scaleUtc with domain [new Date("2023-01-01"), new Date("2024-01-01")] and range [marginLeft, width - marginRight].
- Define y scale using d3.scaleLinear with domain [0, 100] and range [height - marginBottom, marginTop].
- Create an SVG container with d3.create('svg') and set attributes width and height.
- Append x-axis with d3.axisBottom(x) and position with translate(0, height - marginBottom).
- Append y-axis with d3.axisLeft(y) and position with translate(marginLeft, 0).

2. ES Module and CDN Integration:
- Import D3 modules from "https://cdn.jsdelivr.net/npm/d3@7/+esm" for ES module usage in HTML.
- Alternatively include via script src for UMD bundle.

3. Force Simulation:
- Import { forceSimulation, forceCollide, forceX }.
- Initialize simulation: forceSimulation(nodes).force('x', forceX()).force('collide', forceCollide(5)).on('tick', callback).

4. Node Package Installation:
- Installation commands: yarn add d3, npm install d3, pnpm add d3.
- Import entire library with: import * as d3 from 'd3'; or import specific modules.

5. React Integration:
- Use useRef and useEffect hooks.
- Create scales and axes similarly, attach refs to DOM elements, and call d3.axisBottom and d3.axisLeft inside useEffect.

6. Svelte Integration:
- Use reactive declarations ($:).
- Bind elements to variables using bind:this for axis groups.
- Automatically update axes with reactive statements invoking d3.select(ref).call(axisFunction).


## Supplementary Details
Dimensions: width=640, height=400, margins: top=20, right=20, bottom=30, left=40. 
Scales:
  d3.scaleUtc(): requires domain (start and end Date objects) and range (numeric array based on margins).
  d3.scaleLinear(): requires numeric domain (e.g., [0, 100]) and range (e.g., [height-marginBottom, marginTop]).
Axes:
  d3.axisBottom(scale): renders horizontal axis; used with transform translate(0, height-marginBottom).
  d3.axisLeft(scale): renders vertical axis; used with transform translate(marginLeft, 0).
Force Simulation:
  forceSimulation(nodes): accepts an array of nodes.
  forceX(): positions nodes along x axis.
  forceCollide(radius): applies collision force with specified radius (e.g., 5).
Installation:
  npm install d3 or equivalent commands.
React & Svelte integration patterns outlined with code examples; use refs or reactive statements as appropriate.


## Reference Details
API Specifications:
1. d3.scaleUtc()
   - Signature: d3.scaleUtc()
   - Methods: .domain([Date, Date]), .range([number, number]), returns a scale function: Date -> number.
2. d3.scaleLinear()
   - Signature: d3.scaleLinear()
   - Methods: .domain([number, number]), .range([number, number]), returns a scale function: number -> number.
3. d3.axisBottom(scale)
   - Signature: d3.axisBottom(scale: Function)
   - Returns an axis generator that when called on a selection, appends axis elements.
4. d3.axisLeft(scale)
   - Signature: d3.axisLeft(scale: Function)
   - Returns an axis generator for the left side.
5. d3.create(string)
   - Signature: d3.create(name: string) returns a selection representing an element of type specified (e.g., 'svg').
6. Force Simulation (from d3-force):
   - forceSimulation(nodes: Array<Object>) returns simulation object.
   - simulation.force(name: string, force: Function) to add forces.
   - forceX([strength]) creates a new force with optional strength parameter.
   - forceCollide(radius: number) sets collision detection with given radius.
   - simulation.on('tick', callback: Function) registers a tick event callback.
Code Example (Vanilla):
  const svg = d3.create('svg')
      .attr('width', 640)
      .attr('height', 400);
  const x = d3.scaleUtc()
      .domain([new Date('2023-01-01'), new Date('2024-01-01')])
      .range([40, 620]);
  const y = d3.scaleLinear()
      .domain([0, 100])
      .range([370, 20]);
  svg.append('g')
      .attr('transform', 'translate(0,370)')
      .call(d3.axisBottom(x));
  svg.append('g')
      .attr('transform', 'translate(40,0)')
      .call(d3.axisLeft(y));
Installation Commands:
  npm install d3
  yarn add d3
Troubleshooting:
  - Ensure proper domain and range values for scales.
  - Verify correct element selection before calling axis generators.
  - Check browser console for errors in case of module import issues.


## Information Dense Extract
Width=640,Height=400,Margin: {top:20,right:20,bottom:30,left:40}; d3.scaleUtc(): domain=[Date('2023-01-01'),Date('2024-01-01')], range=[marginLeft, width-marginRight]; d3.scaleLinear(): domain=[0,100], range=[height-marginBottom, marginTop]; Axes: d3.axisBottom(x) at translate(0, height-marginBottom), d3.axisLeft(y) at translate(marginLeft,0); Force simulation: forceSimulation(nodes).force('x', forceX()).force('collide', forceCollide(5)).on('tick', callback); Import: ES module via https://cdn.jsdelivr.net/npm/d3@7/+esm, or npm install d3; React: useRef/useEffect to attach d3.axis, Svelte: reactive $: statements with bind:this; API details include methods of scales, axis generators, d3.create for SVG; complete method signatures provided above.

## Sanitised Extract
Table of Contents:
1. Basic Chart Setup
2. ES Module and CDN Integration
3. Force Simulation
4. Node Package Installation
5. React Integration
6. Svelte Integration

1. Basic Chart Setup:
- Set dimensions: width = 640, height = 400, margins (top:20, right:20, bottom:30, left:40).
- Define x scale using d3.scaleUtc with domain [new Date('2023-01-01'), new Date('2024-01-01')] and range [marginLeft, width - marginRight].
- Define y scale using d3.scaleLinear with domain [0, 100] and range [height - marginBottom, marginTop].
- Create an SVG container with d3.create('svg') and set attributes width and height.
- Append x-axis with d3.axisBottom(x) and position with translate(0, height - marginBottom).
- Append y-axis with d3.axisLeft(y) and position with translate(marginLeft, 0).

2. ES Module and CDN Integration:
- Import D3 modules from 'https://cdn.jsdelivr.net/npm/d3@7/+esm' for ES module usage in HTML.
- Alternatively include via script src for UMD bundle.

3. Force Simulation:
- Import { forceSimulation, forceCollide, forceX }.
- Initialize simulation: forceSimulation(nodes).force('x', forceX()).force('collide', forceCollide(5)).on('tick', callback).

4. Node Package Installation:
- Installation commands: yarn add d3, npm install d3, pnpm add d3.
- Import entire library with: import * as d3 from 'd3'; or import specific modules.

5. React Integration:
- Use useRef and useEffect hooks.
- Create scales and axes similarly, attach refs to DOM elements, and call d3.axisBottom and d3.axisLeft inside useEffect.

6. Svelte Integration:
- Use reactive declarations ($:).
- Bind elements to variables using bind:this for axis groups.
- Automatically update axes with reactive statements invoking d3.select(ref).call(axisFunction).

## Original Source
D3.js Documentation
https://d3js.org/

## Digest of D3_JS

# GETTING_STARTED
Retrieved on 2023-10-12
D3.js is a comprehensive JavaScript library that enables custom dynamic data visualizations using web standards. This document provides exact implementation details including API usage, method signatures, configuration parameters, and complete code examples.

# VANILLA HTML & ES MODULE
- Use CDN reference via "https://cdn.jsdelivr.net/npm/d3@7/+esm" for ES modules.
- In vanilla HTML, load D3 via a script tag or as an ES module. Example code:

  // Dimensions and margins
  const width = 640;
  const height = 400;
  const marginTop = 20, marginRight = 20, marginBottom = 30, marginLeft = 40;

  // Scales
  const x = d3.scaleUtc()
      .domain([new Date("2023-01-01"), new Date("2024-01-01")])
      .range([marginLeft, width - marginRight]);
  const y = d3.scaleLinear()
      .domain([0, 100])
      .range([height - marginBottom, marginTop]);

  // Create SVG container
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height);

  // Add axes
  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x));
  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y));

  // Append element
  container.append(svg.node());

# FORCED SIMULATION
- Import individual modules:
  import { forceSimulation, forceCollide, forceX } from "https://cdn.jsdelivr.net/npm/d3-force@3/+esm";
- Use simulation as:

  const nodes = [{}, {}];
  const simulation = forceSimulation(nodes)
      .force("x", forceX())
      .force("collide", forceCollide(5))
      .on("tick", () => console.log(nodes[0].x));

# INSTALLING FROM NPM
- Commands:
  yarn add d3
  npm install d3
  pnpm add d3
- Import examples:
  import * as d3 from "d3";
  or
  import { select, selectAll } from "d3";

# REACT INTEGRATION
- Components use hooks and refs to integrate D3, for instance:

  const gx = useRef();
  const gy = useRef();
  const x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
  const y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
  useEffect(() => { d3.select(gx.current).call(d3.axisBottom(x)); }, [gx, x]);
  useEffect(() => { d3.select(gy.current).call(d3.axisLeft(y)); }, [gy, y]);

# SVELTE INTEGRATION
- Utilize reactive statements ($:) for dynamic updates:

  $: x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
  $: y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
  $: line = d3.line((d, i) => x(i), y);
  $: d3.select(gy).call(d3.axisLeft(y));
  $: d3.select(gx).call(d3.axisBottom(x));

# CONFIGURATION AND PARAMETERS
- Dimensions: width: 640, height: 400; margins: top:20, right:20, bottom:30, left:40.
- Scale methods: d3.scaleUtc() and d3.scaleLinear() require .domain() and .range() methods.
- Axis methods: d3.axisBottom(scale) and d3.axisLeft(scale) to render axes.

# ATTRIBUTION
Data Size: 8936502 bytes; Links Count: 33758; Source: https://d3js.org/


## Attribution
- Source: D3.js Documentation
- URL: https://d3js.org/
- License: BSD License
- Crawl Date: 2025-04-27T15:47:41.882Z
- Data Size: 8936502 bytes
- Links Found: 33758

## Retrieved
2025-04-27
