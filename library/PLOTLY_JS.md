# PLOTLY_JS

## Crawl Summary
Plotly.js uses a declarative JSON structure to configure charts. Key API is Plotly.newPlot which takes an HTML DOM element, an array of data traces, a layout object, and a configuration object. Detailed examples include a contour plot with properties such as colorscale, reversescale, zmax, and zmin, and a scatter chart with error bars configured for CSV data. Performance is optimized using SVG for basic rendering, stack.gl for high performance, and WebGL for 3D charts.

## Normalised Extract
Table of Contents:
1. API Initialization: Plotly.newPlot
   - Usage: Plotly.newPlot(domElement, dataArray, layoutObject, configObject)
   - Returns a promise after rendering is complete.
2. Contour Plot Configuration
   - Trace: x, y, z arrays; type set to 'contour'; autocolorscale false; colorscale array defined; reversescale true; zmax 2.5; zmin -2.5.
   - Layout: Title text, xaxis and yaxis with title, showline true, mirror 'allticks', ticks 'inside'; margin {l:40, b:40, t:60}; annotations for credit.
3. Scatter Chart Configuration
   - Trace: type 'scatter', mode 'lines'; x and y extracted from CSV rows; line object with width 1; error_y with array of errors, thickness 0.5, width 0.
   - Layout: yaxis title 'Wind Speed'; xaxis with no grid and tick format '%B, %Y'; margin {l:40, b:10, r:10, t:20}.
4. Performance Optimizations
   - Render using SVG with fallback to stack.gl and scattergl for enhanced speed; use of WebGL for 3D charts.
5. Configuration Options Summary
   - Config object: {showLink:false} disables the default link display.
Detailed technical steps include creation of data trace objects, defining layout configurations, and calling Plotly.newPlot with the DOM element obtained via document.getElementById.

## Supplementary Details
Contour Plot Details:
- trace.x, trace.y, trace.z must be valid data arrays.
- colorscale: Defined as [[0,'rgb(  0,  0,  0)'], [0.3,'rgb(230,  0,  0)'], [0.6,'rgb(255,210,  0)'], [1,'rgb(255,255,255)']].
- Layout margin: l=40, b=40, t=60. 
- Annotation: {showarrow:false, text:'Credit: Daniel Carrera', x:0, y:0, xref:'paper', yref:'paper'}.
Scatter Chart Details:
- Data mapping: x from row['Time'], y from row['10 Min Sampled Avg'], error_y.array extracts row['10 Min Std Dev'].
- xaxis tickformat: '%B, %Y'.
- Margin for scatter chart: l=40, b=10, r=10, t=20.
API Method:
- Plotly.newPlot(domElement, data, layout, config) where config { showLink: false } disables link feature.
Performance:
- Use scattergl for high volume rendering; ensure 3D charts apply WebGL API for GPU acceleration.
Implementation Steps:
1. Retrieve data using d3.json or d3.csv.
2. Construct 'trace' objects with proper type and data arrays.
3. Define layout object with axes and margin configurations.
4. Call Plotly.newPlot with the target DOM element.
5. For improved performance, select chart types that utilize WebGL or stack.gl accordingly.

## Reference Details
API Specification:
Function: Plotly.newPlot(domElement: HTMLElement, data: Array<Object>, layout: Object, config: Object): Promise
Parameters:
- domElement: Document element where chart is rendered; e.g., document.getElementById('chart-id')
- data: Array of trace objects. Example trace for contour plot:
  {
    x: Array<number>,
    y: Array<number>,
    z: Array<number>,
    type: 'contour',
    autocolorscale: boolean,
    colorscale: Array<[number, string]>,
    reversescale: boolean,
    zmax: number,
    zmin: number
  }
- layout: Object defining layout properties. Example layout:
  {
    title: { text: string },
    xaxis: { title: { text: string }, showline: boolean, mirror: string, ticks: string },
    yaxis: { title: { text: string }, showline: boolean, mirror: string, ticks: string },
    margin: { l: number, b: number, t: number, r?: number },
    annotations: Array<{ showarrow: boolean, text: string, x: number, y: number, xref: string, yref: string }>
  }
- config: Object with configuration options. Example: { showLink: boolean }

Code Example for Contour Plot with Comments:
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

Full SDK details include handling of promise returns, error callbacks, and integration with d3 data fetching. Best practices recommend validating data arrays for length consistency and using appropriate chart types for performance optimizations. Troubleshooting steps include checking browser console for errors, ensuring correct API usage, and verifying data integrity with sample datasets.

Troubleshooting Procedures:
- Command: Open browser console and inspect for errors if chart fails to render.
- Validate data: Confirm that data arrays for x, y, and z are non-empty and of matching lengths.
- Test alternative configurations such as switching from SVG to scattergl for performance improvements.
- Use network inspection to ensure that data endpoints return valid JSON or CSV data.


## Information Dense Extract
Plotly.js; API: Plotly.newPlot(domElement, data: Array<Object>, layout: Object, config: Object): Promise; Contour trace: {x: Array, y: Array, z: Array, type: 'contour', autocolorscale: false, colorscale: [[0,'rgb(0,0,0)'],[0.3,'rgb(230,0,0)'],[0.6,'rgb(255,210,0)'],[1,'rgb(255,255,255)']], reversescale: true, zmax: 2.5, zmin: -2.5}; Layout: {title:{text:'turbulence simulation'}, xaxis:{title:{text:'radial direction'}, showline:true, mirror:'allticks', ticks:'inside'}, yaxis:{title:{text:'vertical direction'}, showline:true, mirror:'allticks', ticks:'inside'}, margin:{l:40,b:40,t:60}, annotations:[{showarrow:false,text:'Credit: Daniel Carrera', x:0,y:0,xref:'paper',yref:'paper'}]}; Scatter trace: {type:'scatter', mode:'lines', x: from CSV Time, y: from CSV '10 Min Sampled Avg', line:{width:1}, error_y:{array: from CSV '10 Min Std Dev', thickness:0.5, width:0}}; Scatter Layout: {yaxis:{title:{text:'Wind Speed'}}, xaxis:{showgrid:false,tickformat:'%B, %Y'}, margin:{l:40,b:10,r:10,t:20}}; Performance: Use stack.gl and scattergl; 3D: WebGL acceleration.

## Sanitised Extract
Table of Contents:
1. API Initialization: Plotly.newPlot
   - Usage: Plotly.newPlot(domElement, dataArray, layoutObject, configObject)
   - Returns a promise after rendering is complete.
2. Contour Plot Configuration
   - Trace: x, y, z arrays; type set to 'contour'; autocolorscale false; colorscale array defined; reversescale true; zmax 2.5; zmin -2.5.
   - Layout: Title text, xaxis and yaxis with title, showline true, mirror 'allticks', ticks 'inside'; margin {l:40, b:40, t:60}; annotations for credit.
3. Scatter Chart Configuration
   - Trace: type 'scatter', mode 'lines'; x and y extracted from CSV rows; line object with width 1; error_y with array of errors, thickness 0.5, width 0.
   - Layout: yaxis title 'Wind Speed'; xaxis with no grid and tick format '%B, %Y'; margin {l:40, b:10, r:10, t:20}.
4. Performance Optimizations
   - Render using SVG with fallback to stack.gl and scattergl for enhanced speed; use of WebGL for 3D charts.
5. Configuration Options Summary
   - Config object: {showLink:false} disables the default link display.
Detailed technical steps include creation of data trace objects, defining layout configurations, and calling Plotly.newPlot with the DOM element obtained via document.getElementById.

## Original Source
Plotly.js Documentation
https://plotly.com/javascript/

## Digest of PLOTLY_JS

# Plotly.js Technical Digest

Retrieved Date: 2023-10-05

## Overview
Plotly.js is a high-level, declarative charting library built on d3.js and stack.gl. It supports over 40 chart types including contour, scatter, 3D charts, and SVG maps. This document contains detailed technical specifications, method signatures, configuration options, and complete code examples.

## Contour Plot Example
Example usage for a contour plot with specific configuration properties:

- Trace Object Properties:
  - x, y, z: Data arrays.
  - type: 'contour'
  - autocolorscale: false
  - colorscale: An array of value-color pairs, e.g. [[0,"rgb(  0,  0,  0)"], [0.3,"rgb(230,  0,  0)"], [0.6,"rgb(255,210,  0)"], [1,"rgb(255,255,255)"]]
  - reversescale: true
  - zmax: 2.5
  - zmin: -2.5

- Layout Object Properties:
  - title: text 'turbulence simulation'
  - xaxis and yaxis include title, showline, mirror set to 'allticks', ticks style 'inside'
  - margin: {l: 40, b: 40, t: 60}
  - annotations: including credit information

Code Example:
  d3.json('https://plotly.com/~DanielCarrera/13.json', function(figure){
    var trace = {
      x: figure.data[0].x,
      y: figure.data[0].y,
      z: figure.data[0].z,
      type: 'contour',
      autocolorscale: false,
      colorscale: [[0,"rgb(  0,  0,  0)"],[0.3,"rgb(230,  0,  0)"],[0.6,"rgb(255,210,  0)"],[1,"rgb(255,255,255)"]],
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

## Scatter Chart Example
Example usage for a scatter line chart with error bar customization:

- Trace Object Properties:
  - type: 'scatter'
  - mode: 'lines'
  - x and y: Data arrays extracted from CSV rows
  - line: with width configuration (1)
  - error_y: object containing:
      - array: error values from data
      - thickness: 0.5
      - width: 0

- Layout Object Properties:
  - yaxis: title 'Wind Speed'
  - xaxis: non-grid and tick format '%B, %Y'
  - margin: { l: 40, b: 10, r: 10, t: 20 }

Code Example:
  d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/wind_speed_laurel_nebraska.csv', function(rows){
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
      xaxis: { showgrid: false, tickformat: '%B, %Y' },
      margin: { l: 40, b: 10, r: 10, t: 20 }
    };
    Plotly.newPlot(document.getElementById('wind-speed'), [trace], layout, { showLink: false });
  });

## Rendering and Performance
- Default rendering utilizes SVG for compatibility and vector quality, but excessive elements can cause performance issues.
- For high performance, Plotly.js uses stack.gl for 2D and 3D charting. The scattergl chart type renders significantly faster.
- All 3D charts leverage WebGL for GPU acceleration.

## API Method: Plotly.newPlot
Signature:
  Plotly.newPlot(domElement, data, layout, config)

Parameters:
  domElement - HTML element where the chart is rendered
  data - Array of trace objects with required properties (e.g. type, x, y, etc.)
  layout - Object with layout definitions (titles, axes, margins, annotations)
  config - Configuration options like { showLink: false }

Return:
  A promise that resolves once the chart is rendered.

## Attribution
- Data Size Obtained: 4289637 bytes
- Source: https://plotly.com/javascript/


## Attribution
- Source: Plotly.js Documentation
- URL: https://plotly.com/javascript/
- License: MIT License
- Crawl Date: 2025-04-27T12:56:47.197Z
- Data Size: 4289637 bytes
- Links Found: 13417

## Retrieved
2025-04-27
