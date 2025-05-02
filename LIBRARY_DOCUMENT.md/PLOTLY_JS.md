# PLOTLY_JS

## Crawl Summary
Plotly.js is a declarative charting library built on d3.js and stack.gl. Usage revolves around Plotly.newPlot which accepts a container element, data array, layout configuration, and a configuration object. The library supports complex chart types like contour, scatter with error bars, and high-performance WebGL based plots. Exact configurations include setting trace type, colorscale arrays, axis titles, margins, and annotations. Performance optimizations include using scattergl and WebGL for 3D plotting.

## Normalised Extract
Table of Contents:
1. Getting Started
   - Use Plotly.newPlot(DOMElement, data, layout, config) to render charts.
2. Chart Configuration
   - Define trace with properties: type, autocolorscale, colorscale (e.g. [[0, rgb(0,0,0)], [0.3, rgb(230,0,0)], [0.6, rgb(255,210,0)], [1, rgb(255,255,255)]]), reversescale, zmax, zmin.
   - Define layout with title, xaxis (text, showline, mirror, ticks), yaxis (text, showline, mirror, ticks), margin, and annotations (showarrow, text, x, y, xref, yref).
3. Example Implementation - Contour Plot
   - Create trace and layout JSON objects as specified. Execute Plotly.newPlot(document.getElementById('contour-plot'), [trace], layout, {showLink: false}).
4. Example Implementation - Scatter Plot with Error Bars
   - Define trace with type 'scatter', mode 'lines', x and y mapping from CSV rows, line width, and error_y config with array, thickness, width.
   - Configure layout with xaxis and yaxis properties and margin settings, then call Plotly.newPlot(document.getElementById('wind-speed'), [trace], layout, {showLink: false}).
5. Performance and Best Practices
   - For large datasets, use scattergl; for 3D charts, ensure WebGL is utilized.
   - Optimize SVG usage and switch to WebGL when necessary.

## Supplementary Details
Technical Specifications:
- Trace Object for Contour Plot:
  {
    type: 'contour',
    autocolorscale: false,
    colorscale: [[0, 'rgb(0, 0, 0)'],[0.3, 'rgb(230, 0, 0)'],[0.6, 'rgb(255, 210, 0)'],[1, 'rgb(255, 255, 255)']],
    reversescale: true,
    zmax: 2.5,
    zmin: -2.5
  }
- Layout Object for Contour Plot:
  {
    title: { text: 'turbulence simulation' },
    xaxis: { title: { text: 'radial direction' }, showline: true, mirror: 'allticks', ticks: 'inside' },
    yaxis: { title: { text: 'vertical direction' }, showline: true, mirror: 'allticks', ticks: 'inside' },
    margin: { l: 40, b: 40, t: 60 },
    annotations: [{ showarrow: false, text: 'Credit: Daniel Carrera', x: 0, y: 0, xref: 'paper', yref: 'paper' }]
  }
- Trace Object for Scatter Plot:
  {
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
  }
- Layout Object for Scatter Plot:
  {
    yaxis: { title: { text: 'Wind Speed' } },
    xaxis: { showgrid: false, tickformat: '%B, %Y' },
    margin: { l: 40, b: 10, r: 10, t: 20 }
  }
Implementation Steps:
1. Prepare data arrays from CSV or JSON.
2. Define trace and layout objects with exact properties as above.
3. Call Plotly.newPlot with container element, data array, layout, and configuration {showLink: false}.
Configuration Options:
- config.showLink: Boolean (default false to disable Plotly link).
- Use custom colorscale values and axis settings as specified.

## Reference Details
API Specifications:
Method: Plotly.newPlot(container: HTMLElement, data: Array<Object>, layout: Object, config: Object) => Promise
Parameters:
  container: A valid DOM element reference.
  data: Array of trace objects; each trace object must include type and data arrays.
  layout: Object including keys: title, xaxis, yaxis, margin, annotations.
  config: Object with options such as showLink (Boolean).

SDK Method Signatures:
Example 1 - Contour Plot:
// Create trace
var trace = {
  type: 'contour',
  autocolorscale: false,
  colorscale: [[0, 'rgb(0, 0, 0)'], [0.3, 'rgb(230, 0, 0)'], [0.6, 'rgb(255, 210, 0)'], [1, 'rgb(255, 255, 255)']],
  reversescale: true,
  zmax: 2.5,
  zmin: -2.5
};

// Create layout
var layout = {
  title: { text: 'turbulence simulation' },
  xaxis: { title: { text: 'radial direction' }, showline: true, mirror: 'allticks', ticks: 'inside' },
  yaxis: { title: { text: 'vertical direction' }, showline: true, mirror: 'allticks', ticks: 'inside' },
  margin: { l: 40, b: 40, t: 60 },
  annotations: [{ showarrow: false, text: 'Credit: Daniel Carrera', x: 0, y: 0, xref: 'paper', yref: 'paper' }]
};

// Plot call
Plotly.newPlot(document.getElementById('contour-plot'), [trace], layout, {showLink: false});

Example 2 - Scatter Plot with Error Bars:
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

Plotly.newPlot(document.getElementById('wind-speed'), [trace], layout, {showLink: false});

Troubleshooting Procedures:
1. Verify that the DOM element exists and is accessible.
2. Ensure that data arrays are correctly populated from CSV/JSON sources.
3. Check console for errors related to incorrect configuration object keys or missing parameters.
4. If performance lag occurs, replace SVG based scatter with scattergl.

Configuration Effects:
- showLink: false removes branding link. Default for deployment if not needed.
- Adjusting margin values controls chart padding.
- Using mirror 'allticks' in axes ensures consistent tick rendering.

Best Practices:
- Validate data before plotting.
- Use WebGL enabled chart types for large datasets.
- Maintain configuration consistency across charts to ensure uniform styling.

## Information Dense Extract
Plotly.js: Declarative charting library using Plotly.newPlot(container, data, layout, config). Trace config: type, autocolorscale, colorscale ([[0, rgb(0,0,0)], [0.3, rgb(230,0,0)], [0.6, rgb(255,210,0)], [1, rgb(255,255,255)]]), reversescale, zmax (2.5), zmin (-2.5). Layout: title text, xaxis and yaxis with title, showline true, mirror 'allticks', ticks 'inside', margin {l:40,b:40,t:60}, annotations with showarrow false. Scatter plot: type 'scatter', mode 'lines', line width 1, error_y: array, thickness 0.5, width 0; layout with yaxis title 'Wind Speed', xaxis with showgrid false and tickformat '%B, %Y', margin {l:40,b:10,r:10,t:20}. API: Plotly.newPlot returns Promise; parameters container: HTMLElement, data: Array<Object>, layout: Object, config: Object (e.g., {showLink:false}). Use scattergl for performance and WebGL for 3D charts.

## Sanitised Extract
Table of Contents:
1. Getting Started
   - Use Plotly.newPlot(DOMElement, data, layout, config) to render charts.
2. Chart Configuration
   - Define trace with properties: type, autocolorscale, colorscale (e.g. [[0, rgb(0,0,0)], [0.3, rgb(230,0,0)], [0.6, rgb(255,210,0)], [1, rgb(255,255,255)]]), reversescale, zmax, zmin.
   - Define layout with title, xaxis (text, showline, mirror, ticks), yaxis (text, showline, mirror, ticks), margin, and annotations (showarrow, text, x, y, xref, yref).
3. Example Implementation - Contour Plot
   - Create trace and layout JSON objects as specified. Execute Plotly.newPlot(document.getElementById('contour-plot'), [trace], layout, {showLink: false}).
4. Example Implementation - Scatter Plot with Error Bars
   - Define trace with type 'scatter', mode 'lines', x and y mapping from CSV rows, line width, and error_y config with array, thickness, width.
   - Configure layout with xaxis and yaxis properties and margin settings, then call Plotly.newPlot(document.getElementById('wind-speed'), [trace], layout, {showLink: false}).
5. Performance and Best Practices
   - For large datasets, use scattergl; for 3D charts, ensure WebGL is utilized.
   - Optimize SVG usage and switch to WebGL when necessary.

## Original Source
Plotly.js Documentation
https://plotly.com/javascript/

## Digest of PLOTLY_JS

# Plotly.js Documentation Digest

Date Retrieved: 2023-10-12

## Overview
Plotly.js is a high-level, declarative charting library built on d3.js and stack.gl. It supports over 40 chart types including 3D charts, statistical graphs, and SVG maps. It represents charts using declarative JSON objects.

## Table of Contents
1. Getting Started
2. Chart Configuration
3. Example: Contour Plot
4. Example: Scatter Plot with Error Bars
5. Performance Considerations
6. API and SDK Methods

## 1. Getting Started
- Include Plotly.js in your project to render interactive charts.
- Plotly.newPlot(container, data, layout, config) is the main method.

## 2. Chart Configuration
- All aspects such as colors, grid lines, legends, and annotations can be configured via JSON objects.
- Layout configuration includes axis settings, margins, and annotation positioning.

## 3. Example: Contour Plot
Trace definition:
  type: 'contour'
  autocolorscale: false
  colorscale: [[0, rgb(0, 0, 0)], [0.3, rgb(230, 0, 0)], [0.6, rgb(255,210, 0)], [1, rgb(255,255,255)] ]
  reversescale: true
  zmax: 2.5, zmin: -2.5

Layout settings:
  title: text 'turbulence simulation'
  xaxis: title 'radial direction', showline true, mirror 'allticks', ticks 'inside'
  yaxis: title 'vertical direction', showline true, mirror 'allticks', ticks 'inside'
  margin: {l: 40, b: 40, t: 60}
  annotations: [{showarrow: false, text: 'Credit: Daniel Carrera', x: 0, y: 0, xref: 'paper', yref: 'paper'}]

Plotting command:
  Plotly.newPlot(DOMElement, [trace], layout, {showLink: false})

## 4. Example: Scatter Plot with Error Bars
Trace definition:
  type: 'scatter'
  mode: 'lines'
  x: Data parsed from CSV (e.g. row['Time'])
  y: Data parsed from CSV (e.g. row['10 Min Sampled Avg'])
  line: {width: 1}
  error_y: { array: Data parsed for error, thickness: 0.5, width: 0 }

Layout settings:
  xaxis: showgrid false, tickformat '%B, %Y'
  yaxis: title text 'Wind Speed'
  margin: {l: 40, b: 10, r: 10, t: 20}

Plotting command:
  Plotly.newPlot(DOMElement, [trace], layout, {showLink: false})

## 5. Performance Considerations
- For high performance charts, use scattergl instead of standard scatter to render points via WebGL.
- 3D charts leverage WebGL for GPU acceleration.

## 6. API and SDK Methods
Primary method:
  Plotly.newPlot(container: HTMLElement, data: Array<Object>, layout: Object, config: Object): Promise

Configuration options example:
  config: {showLink: false} disables the default Plotly logo link.

Attribution: Data size: 4221886 bytes, Links Found: 13163

Copyright © 2025 Plotly. All rights reserved.

## Attribution
- Source: Plotly.js Documentation
- URL: https://plotly.com/javascript/
- License: MIT
- Crawl Date: 2025-05-02T02:20:52.266Z
- Data Size: 4221886 bytes
- Links Found: 13163

## Retrieved
2025-05-02
