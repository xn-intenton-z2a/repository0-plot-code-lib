# PLOTLY_JS

## Crawl Summary
Plotly.js is a comprehensive high-level charting library that uses a declarative JSON structure to define chart elements. The central method Plotly.newPlot renders charts on a DOM element with detailed data arrays for different chart types. Included examples demonstrate creating contour charts and scatter plots with error bars using d3.json and d3.csv. Configuration includes layout options for axes, margins, annotations, and display settings such as showLink.

## Normalised Extract
Table of Contents: 1. Library Overview 2. Plotly.newPlot API 3. Contour Chart Implementation 4. Scatter Plot with Error Bars 5. Configuration Options
1. Library Overview: Plotly.js is built on d3.js and stack.gl, supporting 40+ chart types including 3D charts and SVG maps.
2. Plotly.newPlot API: Signature: Plotly.newPlot(container, data, layout, config). container (HTMLElement), data (Array of trace objects), layout (JSON object), config (Object, e.g., {showLink:false}).
3. Contour Chart Implementation: Trace includes keys: x, y, z, type ('contour'), autocolorscale (false), colorscale (array with RGB arrays), reversescale (true), zmax (2.5), zmin (-2.5). Layout includes title, xaxis and yaxis with title text, showline (true), mirror ('allticks'), ticks ('inside'), margin ({l:40,b:40,t:60}), and annotations (credit information).
4. Scatter Plot with Error Bars: Trace includes type ('scatter'), mode ('lines'), x and y arrays, line object with width (1), error_y with array data, thickness (0.5), width (0). Layout defines axis titles and margins.
5. Configuration Options: Layout and config objects control display properties. Common config: {showLink:false}. Layout properties for axes customize gridlines, tick formatting, and margins.

## Supplementary Details
Technical Specifications: Plotly.newPlot(HTMLElement container, Array<Object> data, Object layout, Object config). Contour Trace: { x: Array, y: Array, z: Array, type: 'contour', autocolorscale: false, colorscale: Array of [Number, String] pairs, reversescale: true, zmax: 2.5, zmin: -2.5 }. Scatter Trace: { type: 'scatter', mode: 'lines', x: Array, y: Array, line: { width: 1 }, error_y: { array: Array, thickness: 0.5, width: 0 } }. Layout object: { title: { text: String }, xaxis: { title: { text: String }, showline: true, mirror: 'allticks', ticks: 'inside' }, yaxis: { title: { text: String }, showline: true, mirror: 'allticks', ticks: 'inside' }, margin: { l: Number, b: Number, t: Number }, annotations: Array<Object> }.
Configuration Object: { showLink: Boolean } with default false. Implementation uses d3.json and d3.csv for asynchronous data loading. Ensure valid DOM elements via document.getElementById. Comments embedded in code highlight configuration details and necessary parameter mappings.

## Reference Details
API Specifications:
Function: Plotly.newPlot(container: HTMLElement, data: Array<Object>, layout: Object, config: Object) -> void
Parameters for Contour Chart trace:
  x: Array<Number>
  y: Array<Number>
  z: Array<Number>
  type: 'contour'
  autocolorscale: Boolean (false)
  colorscale: Array<[Number, String]> e.g., [[0, 'rgb(0,0,0)'], [0.3, 'rgb(230,0,0)'], [0.6, 'rgb(255,210,0)'], [1, 'rgb(255,255,255)']]
  reversescale: Boolean (true)
  zmax: Number (2.5)
  zmin: Number (-2.5)
Parameters for Scatter Chart trace:
  type: 'scatter'
  mode: 'lines'
  x: Array
  y: Array
  line: { width: Number } (width: 1)
  error_y: { array: Array, thickness: Number (0.5), width: Number (0) }
Layout Object:
  title: { text: String }
  xaxis: { title: { text: String }, showline: true, mirror: 'allticks', ticks: 'inside' }
  yaxis: { title: { text: String }, showline: true, mirror: 'allticks', ticks: 'inside' }
  margin: { l: Number, b: Number, t: Number, (and optionally r: Number) }
  annotations: Array of objects { showarrow: Boolean, text: String, x: Number, y: Number, xref: String, yref: String }
Config Object:
  showLink: Boolean (typically false)

SDK Method Usage Example:
Plotly.newPlot(document.getElementById('contour-plot'), [trace], layout, { showLink: false });

Detailed Code Example:
// Contour Chart Rendering
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

Troubleshooting Procedures:
- Confirm that document.getElementById returns a valid element.
- Check network responses for d3.json/d3.csv calls.
- Validate that trace and layout objects conform to API schema.
- Inspect browser console for errors regarding configuration properties.

Configuration Options and Effects:
- showLink: false disables the display of Plotly branding links.
- Margin settings affect spacing: e.g., {l:40, b:40, t:60} for contour charts; adjust for scatter charts as {l:40, b:10, r:10, t:20}.

Best Practices:
- Use declarative JSON objects to define every chart component.
- Map external data directly to chart trace arrays.
- Use d3 for asynchronous data loading with robust error handling.


## Information Dense Extract
Plotly.newPlot(HTMLElement, Array<Trace>, Layout: {title, xaxis, yaxis, margin, annotations}, Config: {showLink:false}) | Contour: {x, y, z, type:'contour', autocolorscale:false, colorscale:[[0,'rgb(0,0,0)'],[0.3,'rgb(230,0,0)'],[0.6,'rgb(255,210,0)'],[1,'rgb(255,255,255)']], reversescale:true, zmax:2.5, zmin:-2.5} | Scatter: {type:'scatter', mode:'lines', x, y, line:{width:1}, error_y:{array, thickness:0.5, width:0}} | Layout: {title:{text}, xaxis:{title:{text}, showline:true, mirror:'allticks', ticks:'inside'}, yaxis:{title:{text}, showline:true, mirror:'allticks', ticks:'inside'}, margin:{l:40,b:40,t:60}, annotations:[{showarrow:false, text, x, y, xref:'paper', yref:'paper'}]} | API: Plotly.newPlot(container, data, layout, config)

## Sanitised Extract
Table of Contents: 1. Library Overview 2. Plotly.newPlot API 3. Contour Chart Implementation 4. Scatter Plot with Error Bars 5. Configuration Options
1. Library Overview: Plotly.js is built on d3.js and stack.gl, supporting 40+ chart types including 3D charts and SVG maps.
2. Plotly.newPlot API: Signature: Plotly.newPlot(container, data, layout, config). container (HTMLElement), data (Array of trace objects), layout (JSON object), config (Object, e.g., {showLink:false}).
3. Contour Chart Implementation: Trace includes keys: x, y, z, type ('contour'), autocolorscale (false), colorscale (array with RGB arrays), reversescale (true), zmax (2.5), zmin (-2.5). Layout includes title, xaxis and yaxis with title text, showline (true), mirror ('allticks'), ticks ('inside'), margin ({l:40,b:40,t:60}), and annotations (credit information).
4. Scatter Plot with Error Bars: Trace includes type ('scatter'), mode ('lines'), x and y arrays, line object with width (1), error_y with array data, thickness (0.5), width (0). Layout defines axis titles and margins.
5. Configuration Options: Layout and config objects control display properties. Common config: {showLink:false}. Layout properties for axes customize gridlines, tick formatting, and margins.

## Original Source
Plotly.js Graphing Library Documentation
https://plotly.com/javascript/

## Digest of PLOTLY_JS

# PLOTLY JS LIBRARY
Date Retrieved: 2023-10-13

## Overview
Plotly.js is a high-level, declarative charting library built on d3.js and stack.gl. It supports over 40 chart types including 3D charts, statistical graphs, SVG maps, and more. It is fully open source and available on GitHub for issue reporting and contributions.

## API and Method Specifications
- Function: Plotly.newPlot(container, data, layout, config)
  * container: DOM element (HTMLElement) where the chart will be rendered.
  * data: Array of trace objects with specific chart data (e.g., contour, scatter).
  * layout: JSON configuration object defining chart layout including titles, axes, margins, and annotations.
  * config: Optional configuration options (e.g., {showLink: false}).

## Code Example: Contour Chart
Using d3.json to load data:

var trace = {
  x: figure.data[0].x,
  y: figure.data[0].y,
  z: figure.data[0].z,
  type: 'contour',
  autocolorscale: false,
  colorscale: [[0, "rgb(  0,  0,  0)"], [0.3, "rgb(230,  0,  0)"], [0.6, "rgb(255,210,  0)"], [1, "rgb(255,255,255)"]],
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

## Code Example: Scatter Plot with Error Bars
Using d3.csv to load CSV data:

var trace = {
  type: 'scatter',
  mode: 'lines',
  x: rows.map(function(row){ return row['Time']; }),
  y: rows.map(function(row){ return row['10 Min Sampled Avg']; }),
  line: { width: 1 },
  error_y: {
    array: rows.map(function(row){ return row['10 Min Std Dev']; }),
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

## Attribution
Data Size: 4324997 bytes; 13571 links found.

## Attribution
- Source: Plotly.js Graphing Library Documentation
- URL: https://plotly.com/javascript/
- License: MIT License
- Crawl Date: 2025-04-28T13:08:33.137Z
- Data Size: 4324997 bytes
- Links Found: 13571

## Retrieved
2025-04-28
