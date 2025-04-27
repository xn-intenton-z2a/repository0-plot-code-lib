# SVG2_SPEC

## Crawl Summary
The SVG 2 Specification provides a comprehensive set of technical details including DOM interface definitions (SVGElement, SVGGraphicsElement, SVGPathElement, etc.), detailed path grammar with all command specifications (moveto, lineto, Bézier curves, arc commands), rendering model rules (stacking context, painters model), shape definitions (rect, circle, ellipse, etc.), coordinate system transformations (viewBox, transform matrix), and styling through CSS. It includes exact attribute syntax and expected behaviors for dynamic SVG content integration.

## Normalised Extract
Table of Contents:
1. Rendering Model
   - Rendering tree definition
   - Stacking context and painters model
   - Effects of display, visibility, and opacity
2. Basic Data Types and Interfaces
   - SVGElement, SVGGraphicsElement, SVGGeometryElement
   - SVGNumber, SVGLength, SVGAngle interfaces
   - Attribute syntax and reflection in DOM
3. Paths
   - Grammar for path data: commands M, L, C, Q, A, Z
   - Exact ‘d’ property syntax and error handling
4. Basic Shapes
   - Element specifications: rect, circle, ellipse, line, polyline, polygon
   - DOM interfaces: SVGRectElement, SVGCircleElement, SVGEllipseElement, etc.
5. Text
   - Text, tspan, textPath elements structure
   - Attributes: x, y, dx, dy, rotate, text-anchor, glyph orientations, kerning
   - DOM interfaces: SVGTextContentElement, SVGTextElement, SVGTSpanElement, SVGTextPathElement
6. Embedded Content
   - Implementation of image and foreignObject elements
   - DOM interfaces: SVGImageElement, SVGForeignObjectElement
7. Styling
   - Inline and external style sheets
   - Use of class, style, and presentation attributes
   - Required CSS features and default user agent styles

Implementation Details:
- To create an SVG element, use document.createElementNS with namespace 'http://www.w3.org/2000/svg'.
- Set attributes like viewBox ('0 0 width height') and preserveAspectRatio ('xMidYMid meet') as specified.
- For dynamic operations, call SVGElement methods such as getBBox(), getCTM(), and getScreenCTM().

## Supplementary Details
Parameter Specifications:
- fill: accepts color values (e.g., '#ff0000', rgb(255,0,0)); fill-rule: 'nonzero' or 'evenodd'; fill-opacity: numeric between 0.0 and 1.0.
- stroke: accepts similar color formats; stroke-width: number (default typically 1); stroke-linecap: 'butt', 'round', or 'square'; stroke-linejoin: defines join style.

Transformation Configuration:
- transform attribute format: matrix(a, b, c, d, e, f) with each parameter as a float.
- viewBox: required attribute for scaling with format 'min-x min-y width height'; preserveAspectRatio default is 'xMidYMid meet'.

Implementation Steps:
1. Declare the SVG root element with xmlns='http://www.w3.org/2000/svg'.
2. Create child elements using document.createElementNS and assign attributes using setAttribute.
3. Utilize DOM methods on SVG elements: getBBox() for element dimensions, getCTM() for current transformation matrix.
4. Validate attribute values to ensure conformance; fallback on defaults if values are invalid.

Configuration Options:
- Namespace: http://www.w3.org/2000/svg (required for all SVG elements).
- Default CSS styling can be overridden inline or via external style sheets.
- Error handling: Invalid attribute values trigger default styling or rendering fallback.

## Reference Details
API Specifications:

Interface SVGElement:
  Properties:
    - id: string
    - className: SVGAnimatedString
    - ownerSVGElement: SVGSVGElement
    - viewportElement: SVGElement
  Methods:
    - getBBox() -> DOMRect // Returns the bounding box of the element.
    - getCTM() -> SVGMatrix // Returns the current transformation matrix.
    - getScreenCTM() -> SVGMatrix // Returns the transformation matrix relative to the screen.

Interface SVGGraphicsElement (extends SVGElement):
  Additional Property:
    - transform: SVGAnimatedTransformList

Interface SVGNumber:
  Property:
    - value: float

Interface SVGLength:
  Properties:
    - value: float
    - unitType: unsigned short

Interface SVGPathElement:
  Property:
    - d: string // Contains path data with commands: M, L, C, Q, A, Z

SDK Method Signature Example:
function createSVGElement(tagName: string): SVGElement {
  // Uses document.createElementNS with the SVG namespace
  const NS = 'http://www.w3.org/2000/svg';
  return document.createElementNS(NS, tagName);
}

// Example Usage:
// Create an SVG circle:
const svgNS = 'http://www.w3.org/2000/svg';
const circle = document.createElementNS(svgNS, 'circle');
circle.setAttribute('cx', '50');
circle.setAttribute('cy', '50');
circle.setAttribute('r', '40');
circle.setAttribute('fill', '#ff0000');
// Append the circle to an existing SVG container

Configuration Options and Effects:
- viewBox: Defines the coordinate system and scaling; format '0 0 width height'.
- preserveAspectRatio: Controls how SVG scales; default 'xMidYMid meet' ensures centered scaling.
- Styling attributes (fill, stroke, opacity) directly affect rendering and can be controlled via CSS.

Best Practices:
- Always use createElementNS for SVG elements to ensure proper namespace resolution.
- Validate numerical inputs for attributes like width, height, and radius to avoid rendering errors.
- Use getBBox() and getCTM() for dynamic layout adjustments and responsive design testing.

Troubleshooting Procedures:
- If SVG elements are not rendering, verify the xmlns attribute is correctly set to 'http://www.w3.org/2000/svg'.
- Use browser developer tools to inspect computed styles and transformation matrices.
- For path data errors, cross-check the sequence of commands (M, L, C, Q, A, Z) and ensure proper spacing between numbers.
- Expected outputs include proper DOM element creation and accurate return values from methods like getBBox().

## Information Dense Extract
SVG2 Specification; Interfaces: SVGElement (id:string, className:SVGAnimatedString, ownerSVGElement, viewportElement; methods: getBBox():DOMRect, getCTM():SVGMatrix, getScreenCTM():SVGMatrix), SVGGraphicsElement (transform:SVGAnimatedTransformList), SVGNumber (value:float), SVGLength (value:float, unitType:uint), SVGPathElement (d:string with commands M,L,C,Q,A,Z); Attributes: fill (color), fill-rule (nonzero/evenodd), fill-opacity (0-1), stroke, stroke-width, stroke-linecap, stroke-linejoin; Transform: transform attribute matrix(a,b,c,d,e,f); Configuration: xmlns='http://www.w3.org/2000/svg', viewBox='0 0 w h', preserveAspectRatio='xMidYMid meet'; Code pattern: document.createElementNS, setAttribute; Best practices: validate attribute values, use proper namespace, inspect getBBox(); Troubleshooting: check xmlns, verify path grammar, inspect computed transforms.

## Sanitised Extract
Table of Contents:
1. Rendering Model
   - Rendering tree definition
   - Stacking context and painters model
   - Effects of display, visibility, and opacity
2. Basic Data Types and Interfaces
   - SVGElement, SVGGraphicsElement, SVGGeometryElement
   - SVGNumber, SVGLength, SVGAngle interfaces
   - Attribute syntax and reflection in DOM
3. Paths
   - Grammar for path data: commands M, L, C, Q, A, Z
   - Exact d property syntax and error handling
4. Basic Shapes
   - Element specifications: rect, circle, ellipse, line, polyline, polygon
   - DOM interfaces: SVGRectElement, SVGCircleElement, SVGEllipseElement, etc.
5. Text
   - Text, tspan, textPath elements structure
   - Attributes: x, y, dx, dy, rotate, text-anchor, glyph orientations, kerning
   - DOM interfaces: SVGTextContentElement, SVGTextElement, SVGTSpanElement, SVGTextPathElement
6. Embedded Content
   - Implementation of image and foreignObject elements
   - DOM interfaces: SVGImageElement, SVGForeignObjectElement
7. Styling
   - Inline and external style sheets
   - Use of class, style, and presentation attributes
   - Required CSS features and default user agent styles

Implementation Details:
- To create an SVG element, use document.createElementNS with namespace 'http://www.w3.org/2000/svg'.
- Set attributes like viewBox ('0 0 width height') and preserveAspectRatio ('xMidYMid meet') as specified.
- For dynamic operations, call SVGElement methods such as getBBox(), getCTM(), and getScreenCTM().

## Original Source
SVG 2 Specification
https://www.w3.org/TR/SVG2/

## Digest of SVG2_SPEC

# SVG 2 SPECIFICATION
Date Retrieved: 2023-10-11

# Rendering Model
- Defines the rendering tree, stacking context, and painters model.
- Provides rules for element ordering, opacity, and visibility control.
- Details on group rendering and effects of the ‘display’, ‘visibility’, and ‘opacity’ properties.

# Basic Data Types and Interfaces
- Complete list of DOM interfaces: SVGElement, SVGGraphicsElement, SVGGeometryElement.
- Data type interfaces including SVGNumber, SVGLength, SVGAngle with precise real number precision and clamping rules.
- Attribute syntax specifications for reflecting and synchronizing content attributes.

# Paths
- Mature grammar for path data with commands:
  - moveto (M, m)
  - lineto (L, l)
  - cubic Bézier (C, c)
  - quadratic Bézier (Q, q)
  - elliptical arcs (A, a)
  - closepath (Z, z)
- Exact syntax for the ‘d’ property and error handling for out-of-range or zero-length segments.

# Basic Shapes
- Specifications for elements: rect, circle, ellipse, line, polyline, polygon.
- Each shape includes defined properties such as coordinates (x, y), dimensions (width, height), and radii (r, rx, ry).
- Includes DOM interface definitions: SVGRectElement, SVGCircleElement, SVGEllipseElement, SVGLineElement, SVGPolylineElement, SVGPolygonElement.

# Text
- Detailed definitions of text layout including the ‘text’, ‘tspan’, and ‘textPath’ elements.
- Attributes for positioning (x, y, dx, dy, rotate) and properties for text alignment (text-anchor, glyph-orientation-horizontal/vertical, kerning).
- DOM interfaces including SVGTextContentElement, SVGTextElement, SVGTSpanElement, SVGTextPathElement.

# Embedded Content
- Specifications for embedding: image and foreignObject elements with inclusion of HTML in SVG subtrees.
- DOM interfaces: SVGImageElement and SVGForeignObjectElement.

# Styling
- Rules for applying CSS: inline style sheets via the ‘style’ element and external style sheets via HTML ‘link’.
- Element-specific styling via class and style attributes, along with presentation attributes.
- Default user agent style sheet details and required CSS features.

# Coordinate Systems, Transformations and Units
- Definition of the initial viewport and coordinate system.
- Specifications for the 'transform' property and viewBox/preserveAspectRatio attributes.
- Exact transformation matrix representation: matrix(a, b, c, d, e, f).

# API and DOM Methods
- DOM interface SVGElement methods:
  - getBBox() -> DOMRect
  - getCTM() -> SVGMatrix
  - getScreenCTM() -> SVGMatrix
- Interfaces extend for graphical elements, e.g., SVGGraphicsElement includes transform (SVGAnimatedTransformList).

# Attribution and Data Size
- Crawl data size: 8760584 bytes
- Source URL: https://www.w3.org/TR/SVG2/
- Links processed: 63193
- No errors reported.

## Attribution
- Source: SVG 2 Specification
- URL: https://www.w3.org/TR/SVG2/
- License: W3C Recommendation
- Crawl Date: 2025-04-27T23:48:10.632Z
- Data Size: 8760584 bytes
- Links Found: 63193

## Retrieved
2025-04-27
