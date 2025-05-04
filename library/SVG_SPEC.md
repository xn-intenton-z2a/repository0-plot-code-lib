# SVG_SPEC

## Crawl Summary
SVG root element requires width, height, viewBox and namespaces. Core elements (<rect>, <circle>, <path>) have specific coordinate and style attributes. viewBox defines user coordinate system. preserveAspectRatio controls alignment and scaling. Embed via inline <svg>, <img>, <object> or CSS. SVG elements support presentation attributes and CSS properties. Use createElementNS and setAttribute for dynamic DOM. SMIL animation via <animate> and <animateTransform>. Troubleshoot with W3C validator and correct namespaces.

## Normalised Extract
Table of Contents
1. SVG Root Element
2. Namespaces
3. Embedding Methods
4. Core Graphic Elements
   4.1 Rectangle (<rect>)
   4.2 Circle (<circle>)
   4.3 Path (<path>)
5. viewBox & Coordinate System
6. CSS Styling
7. SVG DOM API
8. SMIL Animation
9. Troubleshooting

1. SVG Root Element
Attributes:
  width: CSSLength | percentage
  height: CSSLength | percentage
  viewBox: "minX minY width height"
  preserveAspectRatio: align [meet|slice]
  xmlns: "http://www.w3.org/2000/svg"
  xmlns:xlink: "http://www.w3.org/1999/xlink"
Example:
<svg width="200px" height="100px" viewBox="0 0 200 100" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"></svg>

2. Namespaces
Default: http://www.w3.org/2000/svg
XLink: http://www.w3.org/1999/xlink

3. Embedding Methods
Inline: <svg>Syntax above</svg>
<img src="icon.svg" width="..." height="..." />
<object data="diagram.svg" type="image/svg+xml"></object>
CSS: selector { background-image:url('graphic.svg'); }

4. Core Graphic Elements
4.1 <rect>
  x (number), y (number)
  width (number|percentage), height (number|percentage)
  rx, ry (number)
  fill (color|none), stroke (color|none), stroke-width (number)
Example: <rect x="10" y="20" width="100" height="50" fill="#00f" stroke="#000" stroke-width="2" />

4.2 <circle>
  cx, cy (number)
  r (number)
  fill, stroke, stroke-width
Example: <circle cx="50" cy="50" r="40" fill="red" />

4.3 <path>
  d: move/line/curve commands
  fill-rule: nonzero|evenodd
Example: <path d="M10 10 H 90 V 90 H 10 Z" fill="none" stroke="black" />

5. viewBox
Defines user coordinate system. Syntax: minX minY width height. Allows scaling without loss.

6. CSS Styling
Properties: fill, stroke, stroke-width, opacity, display, visibility. Use inline or external stylesheets.

7. SVG DOM API
createElementNS(ns, name)
setAttribute(name, value)
getBBox(): returns {x,y,width,height}
addEventListener(type, listener, options)
Example:
const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
svg.setAttribute('viewBox','0 0 100 100');

8. SMIL Animation
<animate attributeName="fill" from="red" to="blue" dur="2s" repeatCount="indefinite" />
<animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="5s" repeatCount="indefinite" />

9. Troubleshooting
Use xmllint --noout file.svg to validate. Ensure correct MIME (image/svg+xml). Confirm namespaces. Check browser console for warnings.

## Supplementary Details
Default Values:
  width: auto (if missing)
  height: auto
  viewBox: none (defaults to width/height units)
  preserveAspectRatio: xMidYMid meet
Implementation Steps:
 1. Create root <svg> element with createElementNS
 2. Set mandatory attributes: width, height, viewBox, xmlns
 3. Append shape elements (<rect>,<circle>,<path>) with attributes
 4. Attach to DOM
Configuration Options:
  - preserveAspectRatio values: xMinYMin|xMidYMin|xMaxYMin|xMinYMid|xMidYMid|xMaxYMid|xMinYMax|xMidYMax|xMaxYMax + meet/slice
  - fill-rule: nonzero or evenodd
  - stroke-linecap: butt|round|square
Best Practices:
  - Use viewBox for responsive scaling
  - Minify SVG with SVGO
  - Group reusable shapes with <g> and symbols
  - Use external CSS for styling multiple SVGs


## Reference Details
SVGDOM methods:
createElementNS(namespaceURI: string, qualifiedName: string): SVGElement
setAttribute(name: string, value: string): void
getBBox(): SVGRect { x:number; y:number; width:number; height:number }
addEventListener(type: string, listener: (evt: Event) => any, options?: boolean | AddEventListenerOptions): void

Core element interfaces:
interface SVGRectElement extends SVGGeometryElement {
  x: SVGAnimatedLength;
  y: SVGAnimatedLength;
  width: SVGAnimatedLength;
  height: SVGAnimatedLength;
  rx: SVGAnimatedLength;
  ry: SVGAnimatedLength;
}

interface SVGCircleElement extends SVGGeometryElement {
  cx: SVGAnimatedLength;
  cy: SVGAnimatedLength;
  r: SVGAnimatedLength;
}

interface SVGPathElement extends SVGGeometryElement {
  pathSegList: SVGPathSegList;
  getTotalLength(): number;
  getPointAtLength(distance: number): DOMPoint;
}

Code Example: Dynamic SVG Creation
const SVG_NS='http://www.w3.org/2000/svg';
function createCircle(cx,cy,r,fill){
  const c=document.createElementNS(SVG_NS,'circle');
  c.setAttribute('cx',cx);
  c.setAttribute('cy',cy);
  c.setAttribute('r',r);
  c.setAttribute('fill',fill);
  return c;
}
const svg=document.createElementNS(SVG_NS,'svg');
svg.setAttribute('viewBox','0 0 100 100');
svg.appendChild(createCircle(50,50,40,'green'));
document.body.appendChild(svg);

Troubleshooting Commands:
xmllint --noout --schema http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd file.svg
Expected no errors

SVGO CLI:
npx svgo --multipass input.svg -o output.min.svg
Expected file size reduction

## Information Dense Extract
svg root attributes: width CSSLength|%, height CSSLength|%, viewBox=minX minY width height, preserveAspectRatio=align[ meet|slice], xmlns=http://www.w3.org/2000/svg, xmlns:xlink=http://www.w3.org/1999/xlink. embedding: inline <svg>, <img src>, <object data>, CSS background-image. rect: x,y,width,height,rx,ry,fill,stroke,stroke-width. circle: cx,cy,r,fill,stroke,stroke-width. path: d commands, fill-rule. CSS: fill,stroke,opacity,font-size. DOM API: createElementNS(ns,name), setAttribute(name,value), getBBox(), addEventListener(). SMIL: <animate attributeName,from,to,dur,repeatCount>, <animateTransform type,values,dur,repeatCount>. troubleshoot: xmllint, SVGO, validate namespaces and MIME.

## Sanitised Extract
Table of Contents
1. SVG Root Element
2. Namespaces
3. Embedding Methods
4. Core Graphic Elements
   4.1 Rectangle (<rect>)
   4.2 Circle (<circle>)
   4.3 Path (<path>)
5. viewBox & Coordinate System
6. CSS Styling
7. SVG DOM API
8. SMIL Animation
9. Troubleshooting

1. SVG Root Element
Attributes:
  width: CSSLength | percentage
  height: CSSLength | percentage
  viewBox: 'minX minY width height'
  preserveAspectRatio: align [meet|slice]
  xmlns: 'http://www.w3.org/2000/svg'
  xmlns:xlink: 'http://www.w3.org/1999/xlink'
Example:
<svg width='200px' height='100px' viewBox='0 0 200 100' preserveAspectRatio='xMidYMid meet' xmlns='http://www.w3.org/2000/svg'></svg>

2. Namespaces
Default: http://www.w3.org/2000/svg
XLink: http://www.w3.org/1999/xlink

3. Embedding Methods
Inline: <svg>Syntax above</svg>
<img src='icon.svg' width='...' height='...' />
<object data='diagram.svg' type='image/svg+xml'></object>
CSS: selector { background-image:url('graphic.svg'); }

4. Core Graphic Elements
4.1 <rect>
  x (number), y (number)
  width (number|percentage), height (number|percentage)
  rx, ry (number)
  fill (color|none), stroke (color|none), stroke-width (number)
Example: <rect x='10' y='20' width='100' height='50' fill='#00f' stroke='#000' stroke-width='2' />

4.2 <circle>
  cx, cy (number)
  r (number)
  fill, stroke, stroke-width
Example: <circle cx='50' cy='50' r='40' fill='red' />

4.3 <path>
  d: move/line/curve commands
  fill-rule: nonzero|evenodd
Example: <path d='M10 10 H 90 V 90 H 10 Z' fill='none' stroke='black' />

5. viewBox
Defines user coordinate system. Syntax: minX minY width height. Allows scaling without loss.

6. CSS Styling
Properties: fill, stroke, stroke-width, opacity, display, visibility. Use inline or external stylesheets.

7. SVG DOM API
createElementNS(ns, name)
setAttribute(name, value)
getBBox(): returns {x,y,width,height}
addEventListener(type, listener, options)
Example:
const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
svg.setAttribute('viewBox','0 0 100 100');

8. SMIL Animation
<animate attributeName='fill' from='red' to='blue' dur='2s' repeatCount='indefinite' />
<animateTransform attributeName='transform' type='rotate' from='0 50 50' to='360 50 50' dur='5s' repeatCount='indefinite' />

9. Troubleshooting
Use xmllint --noout file.svg to validate. Ensure correct MIME (image/svg+xml). Confirm namespaces. Check browser console for warnings.

## Original Source
MDN SVG Documentation
https://developer.mozilla.org/en-US/docs/Web/SVG

## Digest of SVG_SPEC

# SVG Root Element

<svg
  width: CSSLength | percentage (e.g., "200px", "50%"),
  height: CSSLength | percentage,
  viewBox: four numbers "min-x min-y width height" defining internal coordinate system,
  preserveAspectRatio: <align> [meet|slice] (default xMidYMid meet),
  xmlns: "http://www.w3.org/2000/svg",
  xmlns:xlink: "http://www.w3.org/1999/xlink"
>

# Namespaces

- Default namespace URI: http://www.w3.org/2000/svg
- XLink namespace URI: http://www.w3.org/1999/xlink

# Embedding SVG in HTML

Inline: <svg> ... </svg>

Object: <object data="file.svg" type="image/svg+xml"></object>

Image: <img src="file.svg" width="..." height="..." />

CSS: background-image: url("file.svg");

# Core Graphic Elements & Attributes

## Rectangle (<rect>)
- x, y: coordinate of top-left corner (number, default 0)
- width, height: CSSLength (required)
- rx, ry: corner radii (number)
- fill: paint (color|none)
- stroke: paint
- stroke-width: number

## Circle (<circle>)
- cx, cy: center coordinates (number, default 0)
- r: radius (number, required)
- fill, stroke, stroke-width as above

## Path (<path>)
- d: path data string (commands M, L, C, Z, etc.)
- fill-rule: nonzero|evenodd (default nonzero)
- stroke, stroke-width

# viewBox & Coordinate Systems

viewBox="minX minY width height"

Coord space transforms to viewport via preserveAspectRatio.

# CSS & External Styling

SVG elements accept presentation attributes and CSS properties: fill, stroke, stroke-opacity, font-size, display, visibility

# SVG DOM API

document.createElementNS(namespaceURI: string, qualifiedName: string): Element

element.setAttribute(name: string, value: string)
element.getBBox(): SVGRect

element.addEventListener(type: string, listener: EventListener, options?: boolean|AddEventListenerOptions)

# SMIL Animation Elements

<animate>
  attributeName: string,
  from: number|string,
  to: number|string,
  dur: time (e.g., "2s"),
  repeatCount: number | "indefinite"
</animate>

<animateTransform>
  type: rotate|scale|translate|skewX|skewY,
  values: semicolon-separated list,
  dur, repeatCount
</animateTransform>

# Troubleshooting

- Validate XML namespaces and correct MIME type
- Use W3C validator: xmllint --noout file.svg
- Check console for unsupported features in target browsers

## Attribution
- Source: MDN SVG Documentation
- URL: https://developer.mozilla.org/en-US/docs/Web/SVG
- License: License: CC-BY-SA
- Crawl Date: 2025-05-04T01:08:19.026Z
- Data Size: 1365385 bytes
- Links Found: 37438

## Retrieved
2025-05-04
