# SVG2

## Crawl Summary
SVG2 Candidate Recommendation published on 04 October 2018. Contains detailed technical specifications for SVG including rendering models (stacking context, painter's algorithm), complete DOM interfaces (SVGElement, SVGGraphicsElement, SVGGeometryElement, etc.), and extensive definitions for paths (moveto, lineto, cubic/quadratic Bezier, elliptical arcs) and basic shapes (<rect>, <circle>, <ellipse>, <line>, <polyline>, <polygon>). Also covers CSS styling (inline, external) and text layout attributes (x, y, dx, dy, rotate), along with transformation attributes such as 'transform', 'viewBox' and 'preserveAspectRatio'.


## Normalised Extract
Table of Contents:
  1. Introduction
    - Overview of XML-based SVG, candidate recommendation status.
  2. Rendering Model
    - Definitions: rendering tree, stacking context, painters model.
    - Visibility control: 'display', 'visibility'.
  3. Basic Data Types and DOM Interfaces
    - DOM Interfaces: SVGElement, SVGGraphicsElement, SVGGeometryElement, etc.
    - Data types: SVGNumber, SVGLength, SVGAngle, SVGNumberList, SVGLengthList, SVGStringList.
    - Animatable Interfaces: SVGAnimatedBoolean, SVGAnimatedLength, SVGAnimatedRect, etc.
  4. Document Structure
    - Elements: <svg>, <g>, <defs>, <symbol>, <use>, <desc>, <title>, <metadata>.
    - Namespace handling and grouping semantics.
  5. Styling
    - CSS application via <style> and external <link>.
    - Presentation attributes and user agent style sheet interference.
  6. Geometry Properties
    - Attributes: cx, cy (center coordinates); r, rx, ry (radii); x, y, width, height for positioning.
  7. Coordinate Systems and Transformations
    - 'transform' attribute and transform list structure; viewBox parameters (min-x, min-y, width, height) and preserveAspectRatio details.
  8. Paths
    - Path data grammar for <path> element using commands: M, m, L, l, C, c, Q, q, A, a, Z.
    - Rules for command sequencing and error handling (e.g., out-of-range elliptical arc parameters, zero-length segments).
  9. Basic Shapes
    - Definition and attributes for <rect>, <circle>, <ellipse>, <line>, <polyline>, <polygon>.
    - Associated DOM interfaces: SVGRectElement, SVGCircleElement, SVGEllipseElement, etc.
  10. Text
    - Elements: <text>, <tspan>, <textPath> along with attributes: x, y, dx, dy, rotate, text-anchor.
    - Layout: inline-size, shape-inside, line-height, and white-space properties.
  11. Embedded Content
    - Integration of graphical and HTML elements using <image> and <foreignObject>.
    - DOM interfaces: SVGImageElement, SVGForeignObjectElement.
  12. Painting
    - Fill properties: fill, fill-rule, fill-opacity.
    - Stroke properties: stroke, stroke-opacity, stroke-width, stroke-linecap, stroke-linejoin, stroke-dasharray, stroke-dashoffset.
    - Marker symbols: <marker> element with marker-start, marker-mid, marker-end, and attributes such as markerWidth, markerHeight, refX, refY.
    - Rendering order: paint-order, color-interpolation, shape-rendering, text-rendering, image-rendering.


## Supplementary Details
Implementation Details and Specifications:
- SVG Root Element (<svg>): Must include XML namespace declaration (xmlns="http://www.w3.org/2000/svg") and may include version='2'.
- DOM Interfaces Examples:
  Interface SVGElement:
    Method: getAttribute(name: string): string;
    Method: setAttribute(name: string, value: string): void;
  Interface SVGAnimatedLength:
    Property: baseVal: number;
    Property: animVal: number;
- Geometry Attributes:
  - For <circle>: cx (number, default 0), cy (number, default 0), r (number, required).
  - For <rect>: x, y (default 0), width, height (required); optional attributes: rx, ry for rounded corners.
- Transformation and Viewport:
  - transform attribute accepts functions such as matrix(a, b, c, d, e, f), translate(tx, ty), scale(sx, [sy]), rotate(angle, [cx, cy]), skewX(angle), skewY(angle).
  - viewBox attribute formatted as: "min-x min-y width height"; preserveAspectRatio attribute controls alignment and meet/slice behavior.
- Paths: The 'd' attribute for <path> must follow strict grammar. Example commands:
  M 10 10 L 20 20 Z
- Styling and CSS:
  - Inline: <style type="text/css"> ... </style>
  - External: <link rel="stylesheet" type="text/css" href="style.css">
  - Presentation attributes can override CSS (e.g. fill, stroke).
- Best Practices:
  - Use explicit units for measurements.
  - Validate path data using a dedicated SVG parser.
  - Ensure accessibility with <title> and <desc> elements.
- Troubleshooting Procedures:
  - For rendering issues, check browser console for errors related to malformed attributes.
  - Validate XML syntax using an online SVG validator.
  - Command Line: Use xmllint --noout file.svg to check for XML errors; expect 'file.svg: OK' on success.


## Reference Details
Complete API and Implementation Specifications:

DOM Interfaces:
------------------------------------------------
Interface SVGElement {
  getAttribute(name: string): string;
  setAttribute(name: string, value: string): void;
  removeAttribute(name: string): void;
}

Interface SVGGraphicsElement extends SVGElement {
  getBBox(): DOMRect;
  getCTM(): SVGMatrix;
  getScreenCTM(): SVGMatrix;
}

Interface SVGAnimatedLength {
  baseVal: number;  // Underlying numeric value
  animVal: number;  // Animated value
}

SVG Geometry Elements:
------------------------------------------------
For <circle>:
  Attributes:
    cx: number (default 0)
    cy: number (default 0)
    r: number (required)

For <rect>:
  Attributes:
    x: number (default 0)
    y: number (default 0)
    width: number (required)
    height: number (required)
    rx: number (optional, default 0)
    ry: number (optional, default 0)

Transformations:
------------------------------------------------
Attribute: transform
  Supported functions:
    matrix(a: number, b: number, c: number, d: number, e: number, f: number)
    translate(tx: number, [ty: number])
    scale(sx: number, [sy: number])
    rotate(angle: number, [cx: number, cy: number])
    skewX(angle: number)
    skewY(angle: number)

Viewport and ViewBox:
------------------------------------------------
Attributes:
  viewBox: string in the format "min-x min-y width height"
  preserveAspectRatio: string specifying alignment (e.g., "xMidYMid meet")

Path Data (for <path> element):
------------------------------------------------
Grammar includes commands:
  moveto: M, m
  lineto: L, l
  cubic Bezier: C, c
  quadratic Bezier: Q, q
  elliptical arc: A, a
  closepath: Z, z

Example of a path command:
  d="M 10 10 L 20 20 C 25 10, 35 10, 40 20 Z"

Marker Elements:
------------------------------------------------
Element: <marker>
  Attributes:
    markerWidth: number (default varies)
    markerHeight: number
    refX: number
    refY: number
    orient: string (e.g., "auto")

Best Practices and Troubleshooting:
------------------------------------------------
- Validate your SVG XML using xmllint (command: xmllint --noout file.svg).
- For invalid path data errors, compare the 'd' attribute against the SVG path grammar.
- When using transformations, always check the order of matrix multiplications.
- Use browsers' developer tools to inspect computed styles and DOM interfaces.
- Ensure accessibility: include <title> and <desc> for assistive technologies.

SDK/Implementation Patterns (Example in JavaScript):
------------------------------------------------
// Accessing an SVG element and modifying attributes
var svgElement = document.getElementById('mySvgElement');
if(svgElement) {
  var currentFill = svgElement.getAttribute('fill');
  svgElement.setAttribute('fill', '#FF0000'); // Set fill to red
}

// Creating a new SVG <circle> element programmatically
var svgNS = 'http://www.w3.org/2000/svg';
var circle = document.createElementNS(svgNS, 'circle');
circle.setAttribute('cx', '50');
circle.setAttribute('cy', '50');
circle.setAttribute('r', '40');
circle.setAttribute('fill', 'blue');
document.getElementById('svgContainer').appendChild(circle);

Configuration Options:
------------------------------------------------
- SVG Root: version attribute set to "2"; namespace must be declared.
- Transformations: defaults are identity matrix if no transform is applied.
- Styling: Default fill is black; default stroke is none; these can be overridden via CSS or presentation attributes.


## Information Dense Extract
SVG2 CR 04Oct2018; Root <svg> with xmlns, version=2; Rendering: stacking context, painters model; DOM Interfaces: SVGElement, SVGGraphicsElement (methods getAttribute(string):string, setAttribute(string, string):void); Geometry: circle (cx,cy,r), rect (x,y,width,height,rx,ry); Transform: transform attribute (matrix, translate, scale, rotate, skewX, skewY); Viewport: viewBox="min-x min-y width height", preserveAspectRatio; Paths: d attribute grammar M, m, L, l, C, c, Q, q, A, a, Z; Text: <text>, <tspan>, text-anchor; Embedded: <image>, <foreignObject>; Painting: fill, fill-rule, fill-opacity, stroke, stroke-opacity, stroke-width, stroke-linecap, stroke-linejoin, stroke-dasharray, marker (<marker> with markerWidth, markerHeight, refX, refY); CSS: inline <style>, external <link>; Troubleshooting: xmllint --noout file.svg; API patterns: createElementNS, setAttribute, appendChild.

## Sanitised Extract
Table of Contents:
  1. Introduction
    - Overview of XML-based SVG, candidate recommendation status.
  2. Rendering Model
    - Definitions: rendering tree, stacking context, painters model.
    - Visibility control: 'display', 'visibility'.
  3. Basic Data Types and DOM Interfaces
    - DOM Interfaces: SVGElement, SVGGraphicsElement, SVGGeometryElement, etc.
    - Data types: SVGNumber, SVGLength, SVGAngle, SVGNumberList, SVGLengthList, SVGStringList.
    - Animatable Interfaces: SVGAnimatedBoolean, SVGAnimatedLength, SVGAnimatedRect, etc.
  4. Document Structure
    - Elements: <svg>, <g>, <defs>, <symbol>, <use>, <desc>, <title>, <metadata>.
    - Namespace handling and grouping semantics.
  5. Styling
    - CSS application via <style> and external <link>.
    - Presentation attributes and user agent style sheet interference.
  6. Geometry Properties
    - Attributes: cx, cy (center coordinates); r, rx, ry (radii); x, y, width, height for positioning.
  7. Coordinate Systems and Transformations
    - 'transform' attribute and transform list structure; viewBox parameters (min-x, min-y, width, height) and preserveAspectRatio details.
  8. Paths
    - Path data grammar for <path> element using commands: M, m, L, l, C, c, Q, q, A, a, Z.
    - Rules for command sequencing and error handling (e.g., out-of-range elliptical arc parameters, zero-length segments).
  9. Basic Shapes
    - Definition and attributes for <rect>, <circle>, <ellipse>, <line>, <polyline>, <polygon>.
    - Associated DOM interfaces: SVGRectElement, SVGCircleElement, SVGEllipseElement, etc.
  10. Text
    - Elements: <text>, <tspan>, <textPath> along with attributes: x, y, dx, dy, rotate, text-anchor.
    - Layout: inline-size, shape-inside, line-height, and white-space properties.
  11. Embedded Content
    - Integration of graphical and HTML elements using <image> and <foreignObject>.
    - DOM interfaces: SVGImageElement, SVGForeignObjectElement.
  12. Painting
    - Fill properties: fill, fill-rule, fill-opacity.
    - Stroke properties: stroke, stroke-opacity, stroke-width, stroke-linecap, stroke-linejoin, stroke-dasharray, stroke-dashoffset.
    - Marker symbols: <marker> element with marker-start, marker-mid, marker-end, and attributes such as markerWidth, markerHeight, refX, refY.
    - Rendering order: paint-order, color-interpolation, shape-rendering, text-rendering, image-rendering.

## Original Source
SVG 2 Specification
https://www.w3.org/TR/SVG2/

## Digest of SVG2

# SVG 2 SPECIFICATION OVERVIEW

Candidate Recommendation Date: 04 October 2018
Document URL: https://www.w3.org/TR/SVG2/
Data Size: 24737520 bytes

This document defines the Scalable Vector Graphics (SVG) 2 specification, building upon SVG 1.1 Second Edition and enhancing usability and precision. It covers a rich set of topics including XML-based syntax for vector graphics, rendering models, DOM interfaces, presentation attributes, text layout, geometry properties, and embedded content capabilities.

## Table of Contents
1. Introduction
2. Rendering Model
3. Basic Data Types and DOM Interfaces
4. Document Structure
5. Styling
6. Geometry Properties
7. Coordinate Systems, Transformations and Units
8. Paths
9. Basic Shapes
10. Text
11. Embedded Content
12. Painting (Filling, Stroking & Marker Symbols)

## Key Sections and Technical Details

### 1. Introduction
- Overview of SVG syntax, XML base language, and candidate recommendation status.

### 2. Rendering Model
- Definitions: rendering tree, stacking context, painters algorithm.
- Details: control of visibility via 'display' and 'visibility'; grouping and opacity management.

### 3. Basic Data Types and DOM Interfaces
- DOM interfaces: SVGElement, SVGGraphicsElement, SVGGeometryElement.
- Data types: SVGNumber, SVGLength, SVGAngle, SVGNumberList, SVGLengthList, SVGStringList.
- Reflectable and animated attributes via interfaces such as SVGAnimatedBoolean, SVGAnimatedEnumeration, SVGAnimatedLength, etc.

### 4. Document Structure
- Root element: <svg> with namespace definitions.
- Grouping elements: <g>, <defs>, <symbol>, and <use> with shadow tree support.
- Metadata, description (<desc>, <title>) and handling of unknown elements.

### 5. Styling
- CSS usage: inline via <style> element and external style sheets via HTML <link>.
- Presentation attributes: 'class', 'style', and user agent style sheet interactions.
- Required CSS features and DOM interface: SVGStyleElement.

### 6. Geometry Properties
- Attributes: 'cx', 'cy' for centers; 'r', 'rx', 'ry' for radii; 'x', 'y', 'width', 'height' for positioning.

### 7. Coordinate Systems, Transformations and Units
- Transformation attribute: 'transform' with detailed matrix and transform list definitions.
- Viewport configuration via 'viewBox' and 'preserveAspectRatio'.
- Unit handling and intrinsic sizing properties.

### 8. Paths
- Detailed path data grammar for the 'd' attribute of the <path> element.
- Supported commands: moveto (M, m), lineto (L, l), cubic Bezier (C, c), quadratic Bezier (Q, q), elliptical arc (A, a) and closepath (Z, z).
- Error handling: rules for out-of-range arc parameters and zero-length segments.

### 9. Basic Shapes
- Elements: <rect>, <circle>, <ellipse>, <line>, <polyline>, <polygon>.
- Associated DOM interfaces: SVGRectElement, SVGCircleElement, SVGEllipseElement, SVGLineElement, SVGPolylineElement, SVGPolygonElement.

### 10. Text
- Elements: <text>, <tspan>, and <textPath> for text along a path.
- Layout attributes: x, y, dx, dy, rotate and alignment properties like 'text-anchor'.
- Detailed definitions for glyph metrics, font variants, and text rendering order.

### 11. Embedded Content
- Image integration via <image> and embedding foreign XML/HTML content using <foreignObject>.
- DOM interfaces: SVGImageElement, SVGForeignObjectElement.

### 12. Painting: Filling, Stroking & Marker Symbols
- Fill and stroke properties: 'fill', 'fill-rule', 'fill-opacity', 'stroke', 'stroke-opacity', 'stroke-width'.
- Stroke details: 'stroke-linecap', 'stroke-linejoin', 'stroke-dasharray', 'stroke-dashoffset'.
- Marker definitions: <marker> element with attributes for marker-start, marker-mid, marker-end.
- Advanced properties: 'paint-order', 'color-interpolation', and rendering hints such as 'shape-rendering'.


## Attribution
- Source: SVG 2 Specification
- URL: https://www.w3.org/TR/SVG2/
- License: W3C Recommendation
- Crawl Date: 2025-04-27T13:47:42.513Z
- Data Size: 24737520 bytes
- Links Found: 192619

## Retrieved
2025-04-27
