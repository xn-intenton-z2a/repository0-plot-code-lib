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
