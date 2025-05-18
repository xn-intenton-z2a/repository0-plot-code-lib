# PLOTLY_ANNOTATIONS

## Crawl Summary
Annotation objects configured in layout.annotations array with properties: x, y, xref, yref, text, showarrow, ax, ay, arrowhead(0–8), arrowsize, arrowwidth, arrowcolor, font, bgcolor, bordercolor, borderpad, borderwidth, opacity, align, xanchor, yanchor, captureevents. Core methods: Plotly.newPlot(div,data,layout,config) returns Promise; Plotly.relayout(div,update) updates annotation fields. Dragmode 'annotate' enables drawing. Config.editable:true allows editing. Troubleshoot by verifying showarrow, refs, opacity, promise errors.

## Normalised Extract
Table of Contents
1. Annotation Object Properties
2. Core Plotly Methods
3. Annotation Editing and Drawing
4. Configuration Options
5. Troubleshooting

1. Annotation Object Properties
x: number|category
y: number|category
xref: 'x'|'paper'
yref: 'y'|'paper'
text: string (HTML)
showarrow: boolean
ax, ay: integer(pixel offset)
arrowhead: integer(0–8)
arrowsize: number
arrowwidth: number
arrowcolor: CSS color
font: { family:string, size:number, color:string }
bgcolor, bordercolor: CSS color
borderpad: number
borderwidth: number
opacity: number(0–1)
align: 'left'|'center'|'right'
xanchor: 'auto'|'left'|'center'|'right'
yanchor: 'auto'|'top'|'middle'|'bottom'
captureevents: boolean

2. Core Plotly Methods
Plotly.newPlot(div, data, layout, config) => Promise
  layout.annotations: Array<annotation>
Plotly.relayout(div, update) => Promise
  update keys: 'annotations[i].field'

3. Annotation Editing and Drawing
dragmode: 'annotate' enables drawing new annotations
to disable interaction: captureevents: false
for in-plot editing: config.editable:true

4. Configuration Options
dragmode values: 'zoom','pan','select','lasso','drawline','drawopenpath','drawclosedpath','drawcircle','drawrect','eraseshape','annotate'
config.editable: boolean

5. Troubleshooting
If annotation missing:
 showarrow: true
 correct xref/yref
 opacity>0
If relayout error:
 use correct annotation index
 confirm div id
 catch errors with .catch()


## Supplementary Details
layout.annotations must be an array on initial plot and subsequent relayout calls. When updating, reference annotations by zero-based index in relayout update object. Arrow tail offset ax, ay default to 0. arrowhead default 1. arrowsize default 1. arrowwidth default 1. arrowcolor default 'black'. bgcolor default transparent. borderpad default 2. borderwidth default 0. opacity default 1. config.editable default false. dragmode default 'zoom'. To programmatically add an annotation post-plot: fetch existing annotations via Plotly.layout then append new object and call Plotly.relayout(div,{annotations:updatedArray}).

## Reference Details
API: Plotly.newPlot(div, data, layout, config)
Parameters:
 div: string|HTMLElement
 data: Array<Trace>
 layout: Layout with optional annotations:Array<Annotation>
 config: Config with editable:boolean, scrollZoom:boolean, displayModeBar:boolean
Returns: Promise

Annotation Type Definition:
type Annotation = {
  x: number|string;
  y: number|string;
  xref?: 'x'|'paper';
  yref?: 'y'|'paper';
  text: string;
  showarrow?: boolean;
  ax?: number;
  ay?: number;
  arrowhead?: 0|1|2|3|4|5|6|7|8;
  arrowsize?: number;
  arrowwidth?: number;
  arrowcolor?: string;
  font?: { family?: string; size?: number; color?: string };
  bgcolor?: string;
  bordercolor?: string;
  borderpad?: number;
  borderwidth?: number;
  opacity?: number;
  align?: 'left'|'center'|'right';
  xanchor?: 'auto'|'left'|'center'|'right';
  yanchor?: 'auto'|'top'|'middle'|'bottom';
  captureevents?: boolean;
};

Plotly.relayout(div, update)
Parameters:
 div: string|HTMLElement
 update: { [key:string]: any }
Returns: Promise

Example Implementation Pattern:
```
// Initial plot
Plotly.newPlot('gd', traces, { annotations: [] }, { editable: true, scrollZoom: true });

// Add annotation programmatically
Plotly.relayout('gd', { annotations: [
  { x:1,y:2,text:'Note',showarrow:false }
] });

// Update single annotation text
Plotly.relayout('gd', { 'annotations[0].text':'New text' });
``` 

Best Practices:
• Always include showarrow field explicitly.
• Use xref/yref='paper' for positioning relative to entire plot.
• Set captureevents:false to prevent drag interference.
• Wrap relayout calls in Promise handlers:
  Plotly.relayout(...).then(() => console.log('Updated')).catch(err=>console.error(err));

Troubleshooting Steps:
1) Verify annotations array length: console.log(layout.annotations.length)
2) Print update object before relayout: console.log(update)
3) Enable debug logs: Plotly.debug = true
4) Check browser console for errors: SyntaxError in JSON or missing fields causes silent failures.

## Information Dense Extract
layout.annotations:Array<Annotation>{x:number|string,y:number|string,xref:'x'|'paper',yref:'y'|'paper',text:string,showarrow:boolean,ax:number,ay:number,arrowhead:0–8,arrowsize:number,arrowwidth:number,arrowcolor:string,font:{family:string,size:number,color:string},bgcolor:string,bordercolor:string,borderpad:number,borderwidth:number,opacity:0–1,align:'left'|'center'|'right',xanchor:'auto'|'left'|'center'|'right',yanchor:'auto'|'top'|'middle'|'bottom',captureevents:boolean};Plotly.newPlot(div,data,layout,config{editable:boolean,dragmode:string})=>Promise;Plotly.relayout(div,update{'annotations[i].field':value}|{annotations:Array<Annotation>})=>Promise;dragmode='annotate';config.editable=true;Update via zero-based index;Defaults: arrowhead=1,arrowsize=1,arrowwidth=1,arrowcolor='black',borderpad=2,opacity=1;Use captureevents:false to disable drag;Wrap relayout in .then/.catch;Use xref/yref='paper' to anchor to plot area.

## Sanitised Extract
Table of Contents
1. Annotation Object Properties
2. Core Plotly Methods
3. Annotation Editing and Drawing
4. Configuration Options
5. Troubleshooting

1. Annotation Object Properties
x: number|category
y: number|category
xref: 'x'|'paper'
yref: 'y'|'paper'
text: string (HTML)
showarrow: boolean
ax, ay: integer(pixel offset)
arrowhead: integer(08)
arrowsize: number
arrowwidth: number
arrowcolor: CSS color
font: { family:string, size:number, color:string }
bgcolor, bordercolor: CSS color
borderpad: number
borderwidth: number
opacity: number(01)
align: 'left'|'center'|'right'
xanchor: 'auto'|'left'|'center'|'right'
yanchor: 'auto'|'top'|'middle'|'bottom'
captureevents: boolean

2. Core Plotly Methods
Plotly.newPlot(div, data, layout, config) => Promise
  layout.annotations: Array<annotation>
Plotly.relayout(div, update) => Promise
  update keys: 'annotations[i].field'

3. Annotation Editing and Drawing
dragmode: 'annotate' enables drawing new annotations
to disable interaction: captureevents: false
for in-plot editing: config.editable:true

4. Configuration Options
dragmode values: 'zoom','pan','select','lasso','drawline','drawopenpath','drawclosedpath','drawcircle','drawrect','eraseshape','annotate'
config.editable: boolean

5. Troubleshooting
If annotation missing:
 showarrow: true
 correct xref/yref
 opacity>0
If relayout error:
 use correct annotation index
 confirm div id
 catch errors with .catch()

## Original Source
Plotly.js Annotation Guide
https://plotly.com/javascript/annotations/

## Digest of PLOTLY_ANNOTATIONS

# Plotly.js Annotations Guide

Date Retrieved: 2024-06-15

## Annotation Object Structure

Annotation objects live in layout.annotations array. Each annotation supports the following fields:

- x: number or category
- y: number or category
- xref: 'x', 'paper'
- yref: 'y', 'paper'
- text: string (supports HTML tags)
- showarrow: boolean
- ax, ay: integer (arrow tail offset in pixels)
- arrowhead: integer (0–8)
- arrowsize: number
- arrowwidth: number
- arrowcolor: string (CSS color)
- font: { family: string, size: number, color: string }
- bgcolor: string
- bordercolor: string
- borderpad: number
- borderwidth: number
- opacity: number (0–1)
- align: 'left', 'center', 'right'
- xanchor, yanchor: 'auto', 'left', 'center', 'right', 'top', 'middle', 'bottom'
- captureevents: boolean

## Core Methods and Patterns

### Plotly.newPlot

Signature: Plotly.newPlot(div, data, layout, config)
- Returns: Promise
- layout.annotations: Array<annotation>

### Plotly.relayout

Signature: Plotly.relayout(div, update)
- update: Object with keys matching layout properties, e.g. { 'annotations[0].text': 'New text' }
- Returns: Promise

### Drag and Edit Annotations

- dragmode: 'annotate'
- To make annotation non-interactive: captureevents: false

## Code Examples

1) Creating a simple annotation:

```
Plotly.newPlot('gd', [{ x: [1,2], y: [3,4], type: 'scatter' }], {
  annotations: [{
    x: 2,
    y: 4,
    xref: 'x',
    yref: 'y',
    text: 'Peak value',
    showarrow: true,
    arrowhead: 2,
    arrowsize: 1,
    arrowwidth: 2,
    arrowcolor: '#636363',
    font: { size: 14, color: '#000' },
    bordercolor: '#c7c7c7',
    borderwidth: 1,
    bgcolor: '#ff7f0e',
    opacity: 0.8
  }]
});
```

2) Updating annotation text dynamically:

```
Plotly.relayout('gd', { 'annotations[0].text': 'Updated label' });
```

3) Enabling annotation drawing mode:

```
Plotly.newPlot('gd', data, layout, { dragmode: 'annotate' });
```

## Configuration Options

- dragmode: 'zoom', 'pan', 'select', 'lasso', 'drawline', 'drawopenpath', 'drawclosedpath', 'drawcircle', 'drawrect', 'eraseshape', 'annotate'
- config: { editable: boolean }
- To allow annotation editing: config.editable must be true

## Troubleshooting

1) Annotation not visible:
   - Check showarrow true or false accordingly
   - Verify xref/yref align with axis
   - Ensure opacity > 0 and bgcolor distinct from paper bg

2) relayout fails:
   - Use zero-based index in annotations array
   - Confirm the div id matches
   - Catch promise errors: Plotly.relayout(...).catch(console.error)


## Attribution
- Source: Plotly.js Annotation Guide
- URL: https://plotly.com/javascript/annotations/
- License: License
- Crawl Date: 2025-05-18T12:32:07.787Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-18
