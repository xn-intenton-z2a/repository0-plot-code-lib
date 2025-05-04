# SVG_REFERENCE

## Crawl Summary
Extracted core SVG technical specifications: root <svg> element attributes with types and defaults; <rect> element attribute definitions; SVGDOM interface methods and properties; embedding patterns and MIME type; coordinate system control via viewBox and preserveAspectRatio; event APIs.

## Normalised Extract
Table of Contents:
1. <svg> Element Attributes
2. <rect> Element Attributes
3. SVGSVGElement Interface
4. Embedding Patterns
5. Coordinate System (viewBox)
6. Event Handling

1. <svg> Element Attributes
   xmlns: "http://www.w3.org/2000/svg" (required)
   width: length or percentage; default 100%
   height: length or percentage; default 100%
   viewBox: "min-x min-y width height"
   preserveAspectRatio: align (xMinYMin|xMidYMid|xMaxYMax) and meet|slice; default xMidYMid meet
   id: string
   baseProfile: string

2. <rect> Element Attributes
   x, y: number; default 0
   width, height: number; required
   rx, ry: number; default 0
   fill: paint; default black
   stroke: paint; default none
   stroke-width: number; default 1

3. SVGSVGElement Interface
   Methods:
     createSVGRect(): SVGRect
     createSVGPoint(): SVGPoint
     getBBox(): SVGRect
     getScreenCTM(): DOMMatrix
   Properties:
     currentScale: number
     currentTranslate: SVGPoint

4. Embedding Patterns
   MIME type: image/svg+xml
   Inline: <svg> in HTML5
   Image tag: <img src="file.svg"/>
   Object tag: <object data="file.svg" type="image/svg+xml"></object>
   Iframe: <iframe src="file.svg"></iframe>

5. Coordinate System (viewBox)
   viewBox="min-x min-y width height" defines user units
   width/height on <svg> set viewport size
   preserveAspectRatio aligns and scales content

6. Event Handling
   Supported: click, mousemove, load, etc.
   Attach: element.addEventListener('event', handler)


## Supplementary Details
Namespaces and MIME:
- Root must include xmlns="http://www.w3.org/2000/svg"
- Serve .svg files with Content-Type: image/svg+xml
Embedding Steps:
1. Inline: Place <svg> element in HTML body
2. External: Ensure server header, reference via <img>, <object>, or <iframe>
Configuration Options:
- preserveAspectRatio values: xMinYMin meet, xMidYMid slice, none (no scaling)
Implementation Steps:
1. document.createElementNS('http://www.w3.org/2000/svg','svg')
2. setAttribute('viewBox','0 0 100 100')
3. appendChild to container
4. create shapes via createElementNS and set attributes


## Reference Details
SVGSVGElement Interface:
Method Signatures:
  createSVGRect(): SVGRect
  createSVGPoint(): SVGPoint
  getBBox(): SVGRect
  getScreenCTM(): DOMMatrix
Properties:
  currentScale: number
  currentTranslate: SVGPoint

Code Example:
const svgNS = 'http://www.w3.org/2000/svg';
const svg = document.createElementNS(svgNS,'svg');
svg.setAttribute('width','200');
svg.setAttribute('height','100');
svg.setAttribute('viewBox','0 0 200 100');
svg.setAttribute('preserveAspectRatio','xMidYMid meet');

const rect = document.createElementNS(svgNS,'rect');
rect.setAttribute('x','10');
rect.setAttribute('y','10');
rect.setAttribute('width','180');
rect.setAttribute('height','80');
rect.setAttribute('fill','#4CAF50');
rect.setAttribute('stroke','#000000');
rect.setAttribute('stroke-width','2');

svg.appendChild(rect);
document.body.appendChild(svg);

Best Practices:
- Always include viewBox for responsive scaling
- Use defs and symbol for reusable shapes
- Minimize file size: remove metadata, comments

Troubleshooting:
- If SVG not rendering, verify xmlns attribute on <svg>
- Check server MIME: curl -I file.svg | grep Content-Type; should be image/svg+xml
- Inspect parser errors in browser console: SyntaxError: ... at line X
- For cross-origin, add CORS headers or inline SVG


## Information Dense Extract
svg xmlns=http://www.w3.org/2000/svg;width:length|%;height:length|%;viewBox=min-x min-y width height;preserveAspectRatio=xMinYMin|xMidYMid|xMaxYMax meet|slice;id=string;baseProfile=string; rect x=number; y=number; width=number; height=number; rx=number; ry=number; fill=paint; stroke=paint; stroke-width=number; SVGSVGElement.createSVGRect():SVGRect;createSVGPoint():SVGPoint;getBBox():SVGRect;getScreenCTM():DOMMatrix; currentScale:number;currentTranslate:SVGPoint; MIME=image/svg+xml; embed via <img>,<object>,<iframe>,inline; CORS require header Access-Control-Allow-Origin; best: defs+symbol; troubleshooting: check xmlns, MIME, console errors.

## Sanitised Extract
Table of Contents:
1. <svg> Element Attributes
2. <rect> Element Attributes
3. SVGSVGElement Interface
4. Embedding Patterns
5. Coordinate System (viewBox)
6. Event Handling

1. <svg> Element Attributes
   xmlns: 'http://www.w3.org/2000/svg' (required)
   width: length or percentage; default 100%
   height: length or percentage; default 100%
   viewBox: 'min-x min-y width height'
   preserveAspectRatio: align (xMinYMin|xMidYMid|xMaxYMax) and meet|slice; default xMidYMid meet
   id: string
   baseProfile: string

2. <rect> Element Attributes
   x, y: number; default 0
   width, height: number; required
   rx, ry: number; default 0
   fill: paint; default black
   stroke: paint; default none
   stroke-width: number; default 1

3. SVGSVGElement Interface
   Methods:
     createSVGRect(): SVGRect
     createSVGPoint(): SVGPoint
     getBBox(): SVGRect
     getScreenCTM(): DOMMatrix
   Properties:
     currentScale: number
     currentTranslate: SVGPoint

4. Embedding Patterns
   MIME type: image/svg+xml
   Inline: <svg> in HTML5
   Image tag: <img src='file.svg'/>
   Object tag: <object data='file.svg' type='image/svg+xml'></object>
   Iframe: <iframe src='file.svg'></iframe>

5. Coordinate System (viewBox)
   viewBox='min-x min-y width height' defines user units
   width/height on <svg> set viewport size
   preserveAspectRatio aligns and scales content

6. Event Handling
   Supported: click, mousemove, load, etc.
   Attach: element.addEventListener('event', handler)

## Original Source
MDN SVG Documentation
https://developer.mozilla.org/en-US/docs/Web/SVG

## Digest of SVG_REFERENCE

# <svg> Element

Syntax: `<svg xmlns="http://www.w3.org/2000/svg" [width] [height] [viewBox] [preserveAspectRatio]>`  
Attributes:
- xmlns (required): "http://www.w3.org/2000/svg"
- width: `<length>` or `<percentage>`, default 100%
- height: `<length>` or `<percentage>`, default 100%
- viewBox: four numbers "min-x min-y width height"
- preserveAspectRatio: `<align> [meet|slice]`, default xMidYMid meet
- id: string
- baseProfile: string

# <rect> Element

Syntax: `<rect x="<number>" y="<number>" width="<number>" height="<number>" [rx]="<number>" [ry]="<number>" [fill] [stroke] [stroke-width]>`  
Attributes:
- x, y: `<number>`, default 0
- width, height: `<number>`, required
- rx, ry: `<number>`, defaults to 0
- fill: `<paint>`, default black
- stroke: `<paint>`, default none
- stroke-width: `<number>`, default 1

# SVGSVGElement Interface

Methods:
- createSVGRect(): SVGRect
- createSVGPoint(): SVGPoint
- getBBox(): SVGRect
- getScreenCTM(): DOMMatrix

Properties:
- currentScale: number
- currentTranslate: SVGPoint

# Embedding and Namespaces

- MIME type: image/svg+xml
- Embed via `<img src="...">`, `<object data="...">`, `<iframe src="...">`, or inline `<svg>` in HTML5
- Must include `xmlns` attribute on root

# ViewBox and Coordinate System

- viewBox="min-x min-y width height" defines user coordinate system
- Use width/height on `<svg>` for viewport size
- preserveAspectRatio controls scaling alignment

# Event Handling

- Support standard DOM events: click, mousemove, load
- Attach via element.addEventListener('click', handler)


## Attribution
- Source: MDN SVG Documentation
- URL: https://developer.mozilla.org/en-US/docs/Web/SVG
- License: License: CC-BY-SA
- Crawl Date: 2025-05-04T00:36:44.293Z
- Data Size: 1199398 bytes
- Links Found: 31574

## Retrieved
2025-05-04
