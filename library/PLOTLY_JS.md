# PLOTLY_JS

## Crawl Summary
Plotly.js provides a declarative JSON-based charting API where charts are instantiated using Plotly.newPlot with parameters: container (HTML element), data (array of trace objects), layout (object defining styling and axes), and config (optional settings). The library supports various chart types and performance modes (SVG, scattergl, WebGL) with detailed attributes for traces (e.g., contour settings, scatter options) and layout customizations (titles, axes, margins, annotations). The documentation includes comprehensive code examples and event handling configurations.

## Normalised Extract
Table of Contents:
1. API Initialization
   - Use Plotly.newPlot(container, data, layout, config) to render charts; returns a promise.
2. Trace Definitions
   - Contour trace: type='contour', autocolorscale=false, colorscale array with specified stops, reversescale boolean, zmin and zmax for data limits.
   - Scatter trace: type='scatter', mode defines line/markers, error_y with array of values, thickness and width for error bars.
3. Layout Configuration
   - title: Object with text.
   - xaxis and yaxis: title text, showline flag, mirror set to 'allticks', ticks style, tickformat for dates.
   - margin: Object with left, bottom, top, right margins.
   - annotations: Array with properties showarrow (false), text, coordinates, and reference settings (xref, yref).
4. Configuration Options
   - config: Commonly includes showLink (false) and responsive (true) to control UI elements and layout.
5. Performance and Rendering
   - Default charts use SVG rendering; for high volume scatter charts, use scattergl for performance improvement.
   - 3D charts utilize WebGL via stack.gl for GPU acceleration.
6. Event Handling
   - Custom events for click, hover, zoom and controls can be added directly through Plotly methods.
Technical Details:
- API method signature: Plotly.newPlot(container: HTMLElement, data: Array<Object>, layout: Object, config?: Object)
- Example JSON definition for a trace, layout and config provided in the code samples.
- Ensure proper structure of attributes to avoid rendering and performance issues.

## Supplementary Details
Specification Details:
1. Plotly.newPlot Method:
   - Parameters:
     container: An existing DOM element (HTMLElement)
     data: Array of trace objects. Each trace object must include a 'type' property and corresponding data arrays (e.g. x, y, z).
     layout: Object containing chart layout settings: title, xaxis, yaxis, margin, annotations.
     config (optional): Object for configuration flags; recommended: { showLink: false, responsive: true }.
   - Returns: A Promise which resolves when rendering completes.

2. Trace Object Example (Contour):
   - type: 'contour'
   - autocolorscale: false
   - colorscale: An array of color stops: [[0, 'rgb(0,0,0)'], [0.3, 'rgb(230,0,0)'], [0.6, 'rgb(255,210,0)'], [1, 'rgb(255,255,255)']]
   - reversescale: true
   - zmax: 2.5
   - zmin: -2.5

3. Layout Object Example:
   - title: { text: "Chart Title" }
   - xaxis: { title: { text: "X-Axis Label" }, showline: true, mirror: 'allticks', ticks: 'inside', tickformat: "%B, %Y" }
   - yaxis: Similar structure as xaxis.
   - margin: { l: 40, b: 40, t: 60, r: 10 }
   - annotations: [{ showarrow: false, text: "Annotation Text", x: 0, y: 0, xref: 'paper', yref: 'paper' }]

4. Configuration Options:
   - showLink: false (disables the Plotly branding link)
   - responsive: true (enables dynamic resizing)

5. Implementation Steps:
   - Load data via d3.json or d3.csv as needed.
   - Construct trace and layout objects based on data requirements.
   - Call Plotly.newPlot with appropriate DOM container id.
   - Use event listeners to handle user interactions (click, hover, zoom).

6. Troubleshooting Procedures:
   - Ensure the HTML container element exists.
   - Validate that data arrays are non-empty and properly formatted.
   - Check console logs for errors on attribute misconfiguration.
   - Test responsiveness by toggling the responsive flag in config.
   - Use browser developer tools to inspect DOM rendering if SVG elements exceed expected counts.

## Reference Details
Complete API Specifications:
Method: Plotly.newPlot(container: HTMLElement, data: Array<Object>, layout: Object, config?: Object) => Promise
Parameters:
- container: Must be a valid HTML element, e.g. document.getElementById('chart')
- data: Array of trace objects. Each trace object example for a scatter plot:
   { type: 'scatter', mode: 'lines', x: Array<number|string>, y: Array<number>, line: { width: number }, error_y: { array: Array<number>, thickness: number, width: number } }
- layout: Must include properties such as:
   { title: { text: string }, xaxis: { title: { text: string }, showline: boolean, mirror: string, ticks: string, tickformat?: string }, yaxis: { title: { text: string }, showline: boolean, mirror: string, ticks: string }, margin: { l: number, b: number, t: number, r?: number }, annotations: Array<{ showarrow: boolean, text: string, x: number, y: number, xref: string, yref: string }> }
- config: Optional configuration options object, e.g., { showLink: false, responsive: true }

SDK Method Signature in Code:
// Contour Plot Implementation Example
// Load JSON data and render contour plot

d3.json('https://plotly.com/~DanielCarrera/13.json', function(figure) {
  var trace = {
    x: figure.data[0].x,
    y: figure.data[0].y,
    z: figure.data[0].z,
    type: 'contour',
    autocolorscale: false,
    colorscale: [[0, 'rgb(0,0,0)'], [0.3, 'rgb(230,0,0)'], [0.6, 'rgb(255,210,0)'], [1, 'rgb(255,255,255)']],
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
  Plotly.newPlot(document.getElementById('contour-plot'), [trace], layout, { showLink: false })
    .then(function() { console.log('Plot rendered successfully'); })
    .catch(function(err) { console.error('Plot rendering error:', err); });
});

Best Practices:
- Always validate the structure of data and layout objects before rendering.
- Use responsive configuration for fluid layouts.
- For large datasets, prefer scattergl for performance improvement.

Troubleshooting Commands:
1. Console command: document.getElementById('chart') to ensure the element exists.
2. Inspect data: console.log(JSON.stringify(data)) prior to rendering.
3. Check network tab for d3.json/d3.csv response integrity.
4. Re-run Plotly.newPlot with minimal configuration to isolate issues.
Expected Output: Successful rendering of chart without DOM errors.


## Information Dense Extract
Plotly.js: Use Plotly.newPlot(HTMLElement, Array<trace>, Object<layout>, optional Object<config>) returning Promise. Trace examples: contour {type:'contour', autocolorscale:false, colorscale:[[0,'rgb(0,0,0)'],[0.3,'rgb(230,0,0)'],[0.6,'rgb(255,210,0)'],[1,'rgb(255,255,255)']], reversescale:true, zmin:-2.5, zmax:2.5}; scatter {type:'scatter', mode:'lines', x:Array, y:Array, line:{width:number}, error_y:{array:Array, thickness:0.5, width:0}}. Layout: {title:{text:string}, xaxis:{title:{text:string}, showline:true, mirror:'allticks', ticks:'inside', tickformat optional}, yaxis similar, margin:{l:40,b:40,t:60}, annotations: [{showarrow:false, text:string, x:0, y:0, xref:'paper', yref:'paper'}]}. Config: {showLink:false, responsive:true}. Performance: Default SVG, use scattergl for higher speed, 3D via WebGL. API complete with method signatures, error handling via promise catch, full code examples provided for contour and scatter plots.

## Sanitised Extract
Table of Contents:
1. API Initialization
   - Use Plotly.newPlot(container, data, layout, config) to render charts; returns a promise.
2. Trace Definitions
   - Contour trace: type='contour', autocolorscale=false, colorscale array with specified stops, reversescale boolean, zmin and zmax for data limits.
   - Scatter trace: type='scatter', mode defines line/markers, error_y with array of values, thickness and width for error bars.
3. Layout Configuration
   - title: Object with text.
   - xaxis and yaxis: title text, showline flag, mirror set to 'allticks', ticks style, tickformat for dates.
   - margin: Object with left, bottom, top, right margins.
   - annotations: Array with properties showarrow (false), text, coordinates, and reference settings (xref, yref).
4. Configuration Options
   - config: Commonly includes showLink (false) and responsive (true) to control UI elements and layout.
5. Performance and Rendering
   - Default charts use SVG rendering; for high volume scatter charts, use scattergl for performance improvement.
   - 3D charts utilize WebGL via stack.gl for GPU acceleration.
6. Event Handling
   - Custom events for click, hover, zoom and controls can be added directly through Plotly methods.
Technical Details:
- API method signature: Plotly.newPlot(container: HTMLElement, data: Array<Object>, layout: Object, config?: Object)
- Example JSON definition for a trace, layout and config provided in the code samples.
- Ensure proper structure of attributes to avoid rendering and performance issues.

## Original Source
Plotly.js Graphing Library
https://plotly.com/javascript/

## Digest of PLOTLY_JS

# Plotly.js API Specification
Date Retrieved: 2025-10-18

# Overview
Plotly.js is a high-level, declarative charting library built atop d3.js and stack.gl. It supports over 40 chart types including 3D charts, statistical graphs and SVG maps. It features declarative chart definitions using JSON structures.

# API Methods
## Plotly.newPlot
Signature: Plotly.newPlot(container: HTMLElement, data: Array<Object>, layout: Object, config?: Object) => Promise
- container: HTML element where the chart is rendered
- data: Array of trace objects (each containing x, y, z values and type definitions such as 'scatter', 'contour', 'scattergl')
- layout: Object defining titles, axis definitions, margins, annotations, and styling options
- config: Optional configuration (e.g. { showLink: false, responsive: true })

# Trace Object Specifications
Example trace for a contour plot:
- type: 'contour'
- autocolorscale: boolean
- colorscale: array of color stops with numerical positions and rgb values
- reversescale: boolean
- zmax/zmin: numerical limits for data scaling

Example trace for a scatter plot:
- type: 'scatter'
- mode: 'lines' (or markers, or both)
- line: { width: number }
- error_y: { array: Array<number>, thickness: number, width: number }

# Layout Object Specifications
Properties include:
- title: Object { text: string }
- xaxis/yaxis: Object { title: { text: string }, showline: boolean, mirror: string, ticks: string, tickformat: string (for dates) }
- margin: Object { l: number, b: number, t: number, r: number }
- annotations: Array of annotation object { showarrow: boolean, text: string, x: number, y: number, xref: string, yref: string }

# Configuration Options
Common config parameters:
- showLink: boolean (hides or displays the link to Plotly)
- responsive: boolean (enables fluid layout and responsiveness)

# Code Example: Contour Plot
Using d3.json to load data and Plotly.newPlot to render a contour plot:

d3.json('https://plotly.com/~DanielCarrera/13.json', function(figure) {
  var trace = {
    x: figure.data[0].x,
    y: figure.data[0].y,
    z: figure.data[0].z,
    type: 'contour',
    autocolorscale: false,
    colorscale: [[0, 'rgb(0,0,0)'], [0.3, 'rgb(230,0,0)'], [0.6, 'rgb(255,210,0)'], [1, 'rgb(255,255,255)']],
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

# Performance Considerations
- SVG rendering: Used by most Plotly charts, ideal for vector exports but limited by DOM element count.
- WebGL rendering: All 3D charts leverage WebGL for GPU acceleration.
- Option scattergl: For scatter plots with high data volumes rendering an order of magnitude faster.

# Event Handling
Plotly supports custom events such as click, hover and zoom, which developers can attach via addEventListener or using Plotly-specific event methods.

# Troubleshooting
- Verify container element exists in the DOM before calling Plotly.newPlot
- Check data array structure for proper trace formatting
- Inspect console for errors related to invalid attribute values or misconfigured layout objects


## Attribution
- Source: Plotly.js Graphing Library
- URL: https://plotly.com/javascript/
- License: MIT License
- Crawl Date: 2025-04-27T03:08:19.239Z
- Data Size: 4877544 bytes
- Links Found: 15266

## Retrieved
2025-04-27
