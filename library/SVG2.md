# SVG2

## Crawl Summary
SVG2 is a candidate recommendation from W3C detailing the updated SVG specification. It includes precise definitions for rendering models, data types, DOM interfaces, styling via CSS, geometric and coordinate properties, comprehensive path data syntax, and painting operations. The specification provides detailed API interfaces such as SVGElement, SVGGraphicsElement, SVGTransform, and SVGPathElement, along with explicit attribute descriptions and error-handling rules.

## Normalised Extract
Table of Contents:
  1. Rendering Model
     - Rendering tree, painters model, stacking context, visibility (display, visibility), and opacity calculations.
  2. Basic Data Types and Interfaces
     - Interfaces: SVGElement, SVGGraphicsElement, SVGGeometryElement, SVGNumber, SVGLength, SVGAngle, SVGNumberList, SVGLengthList, SVGStringList.
     - Attribute reflection, synchronization of DOM values, error handling for invalid or empty values.
  3. Document Structure
     - Root <svg> element specifications, <g> grouping, <defs> for reusable definitions, <symbol>, <use> with shadow tree details, conditional processing with <switch> and attributes requiredExtensions and systemLanguage.
  4. Styling
     - Use of CSS via <style> element and external style sheets, presentation attributes, class and style, user agent defaults, and required CSS properties for proper rendering.
  5. Geometry Properties
     - Precise properties: cx, cy, r, rx, ry for circles and ellipses; x, y, width, height for rectangles; line coordinate properties.
  6. Coordinate Systems, Transformations and Units
     - Viewport definitions, viewBox, preserveAspectRatio, transform attribute syntax, transformation matrices, initial coordinate system, and DOM interfaces: SVGTransform, SVGTransformList, SVGAnimatedTransformList, SVGPreserveAspectRatio.
  7. Paths
     - <path> element detailed command listing: moveto, lineto, cubic and quadratic Bézier curves, elliptical arcs, closepath operations, and complete grammar specification.
  8. Basic Shapes
     - Detailed specifications for <rect>, <circle>, <ellipse>, <line>, <polyline>, <polygon> with corresponding DOM interfaces (SVGRectElement, SVGCircleElement, SVGEllipseElement, SVGLineElement, SVGPolylineElement, SVGPolygonElement).
  9. Text
     - Text elements <text>, <tspan>, <textPath>; attributes x, y, dx, dy, rotate; text layout algorithms, white-space management, text-anchor, kerning, baseline alignment; DOM interfaces: SVGTextElement, SVGTSpanElement, SVGTextPathElement.
  10. Embedded Content
     - Specifications for <image> and <foreignObject> elements, embedding HTML in SVG, DOM interfaces: SVGImageElement, SVGForeignObjectElement.
  11. Painting
     - Filling: fill, fill-rule, fill-opacity; Stroking: stroke, stroke-opacity, stroke-width, stroke-linecap, stroke-linejoin, stroke-dasharray, stroke-dashoffset; Marker symbols: <marker>, marker-start, marker-mid, marker-end; attributes for paint order and color interpolation; DOM interface: SVGMarkerElement.

## Supplementary Details
Key Technical Specifications:
- Rendering Model: Algorithms for stacking contexts and opacity blending, detailed in sections 3.2 to 3.6 of the spec.
- Data Types: Numerical precision rules, clamping for attribute values, and reflection mechanisms for DOM attributes (e.g., SVGNumber, SVGLength).
- Document Structure: The <svg> element must include a namespace declaration (http://www.w3.org/2000/svg) and support embedded modules (<defs>, <symbol>, <use>) with shadow trees for reusability.
- Styling: Inline style rules take precedence, CSS inheritance applies; required defaults include user agent style sheets that define element display and visibility.
- Geometry: Attributes such as cx, cy (for circles) and x, y, width, height (for rectangles) come with default units (px) if unspecified.
- Transformations: The transform property accepts matrix, translate, scale, rotate, skewX, skewY. The viewBox attribute is defined as min-x, min-y, width, height.
- Paths: The 'd' attribute for <path> follows a strict grammar with commands (M, m, L, l, H, h, V, v, C, c, Q, q, A, a, Z, z) and requires proper error handling for out-of-range parameters.
- API Interfaces: DOM interface definitions include method signatures and property types. For example, interface SVGElement may include getBBox() returning SVGRect with properties x, y, width, height.
- Configuration Options: Presentation attributes such as fill and stroke accept color values (e.g., rgb, hex) and numerical opacity values between 0 and 1. Stroke-dasharray defaults to none if not set.
- Troubleshooting: Debug SVG rendering by inspecting the DOM tree, verifying namespace declarations, and checking computed styles. Browser consoles can output errors when invalid attribute values are encountered; commands such as 'console.log(svgElement.getBBox())' may help diagnose layout issues.

## Reference Details
API Specifications and Code Patterns:
- Interface SVGElement:
  • Properties: id (DOMString), ownerSVGElement (SVGSVGElement)
  • Methods: getBBox() : SVGRect, getCTM() : SVGMatrix, getScreenCTM() : SVGMatrix
- Interface SVGGraphicsElement extends SVGElement
  • Additional properties: transform (SVGAnimatedTransformList)
- Interface SVGTransform:
  • Methods: setMatrix(matrix: SVGMatrix): void, setTranslate(tx: float, ty: float): void, setScale(sx: float, sy: float): void, setRotate(angle: float, cx: float, cy: float): void, setSkewX(angle: float): void, setSkewY(angle: float): void
- Code Example (Implementation Pattern):
  // Create an SVG circle element using the SVG DOM
  function createCircle(svgDoc, cx, cy, r) {
    var circle = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', cx.toString());
    circle.setAttribute('cy', cy.toString());
    circle.setAttribute('r', r.toString());
    circle.setAttribute('fill', '#FF0000');
    return circle;
  }

- SDK Method Signatures:
  • createElementNS(namespace: string, qualifiedName: string) : Element
  • setAttribute(name: string, value: string): void
  • getBBox() : SVGRect { x: number, y: number, width: number, height: number }
- Configuration Options:
  • fill: accepts any valid CSS color string (default: black if unspecified)
  • stroke: accepts any valid CSS color string (default: none)
  • stroke-width: numerical value with default 1 when specified.
  • transform: accepts strings in the form 'translate(x,y) rotate(angle)' etc.
- Best Practices:
  • Always declare the SVG namespace in the root element.
  • Use <defs> for symbol definitions to optimize reuse.
  • Validate path data against the SVG path grammar to prevent rendering errors.
  • For debugging, employ getBBox() and getCTM() methods to verify element positions.
- Troubleshooting Procedures:
  1. Verify namespace declarations using browser developer tools.
  2. Log getBBox() outputs: e.g., console.log(element.getBBox()) to inspect bounding boxes.
  3. Use browser console commands to inspect computed styles for fill, stroke, and transform properties.
  4. Check for errors in the console regarding invalid attribute values or parsing errors of the 'd' attribute.
  5. Test dynamic SVG modifications via script and review DOM changes in real time.

## Information Dense Extract
SVG2: Spec Candidate Rec, XML-based vector graphics; Rendering: painters model, stacking context, display/visibility, opacity; Data Types: SVGNumber, SVGLength, SVGAngle, synchronized DOM interfaces; Structure: <svg> namespace, <g>, <defs>, <symbol>, <use> with shadow trees; Styling: CSS integration via <style> and external sheets, presentation attributes; Geometry: cx,cy,r, rx,ry, x,y,width,height; Transform: viewBox, preserveAspectRatio, transform (matrix, translate, scale, rotate, skew); Paths: <path> d attribute grammar (M, L, C, Q, A, Z); Shapes: <rect>, <circle>, <ellipse>, <line>, <polyline>, <polygon>; Text: <text>, <tspan>, <textPath>, attributes x,y,dx,dy, rotate; Embedded: <image>, <foreignObject>; Painting: fill, fill-rule, fill-opacity, stroke, stroke-opacity, stroke-width, stroke-linecap, stroke-linejoin, stroke-dasharray, marker properties; API: SVGElement (getBBox, getCTM), SVGGraphicsElement, SVGTransform (setTranslate, setScale, etc.); Config: fill (CSS color), stroke (CSS color), stroke-width (number), transform (function string); Best Practices: namespace declaration, use <defs> for reuse, validate path grammar; Debug: use getBBox(), inspect computed styles, console logging.

## Sanitised Extract
Table of Contents:
  1. Rendering Model
     - Rendering tree, painters model, stacking context, visibility (display, visibility), and opacity calculations.
  2. Basic Data Types and Interfaces
     - Interfaces: SVGElement, SVGGraphicsElement, SVGGeometryElement, SVGNumber, SVGLength, SVGAngle, SVGNumberList, SVGLengthList, SVGStringList.
     - Attribute reflection, synchronization of DOM values, error handling for invalid or empty values.
  3. Document Structure
     - Root <svg> element specifications, <g> grouping, <defs> for reusable definitions, <symbol>, <use> with shadow tree details, conditional processing with <switch> and attributes requiredExtensions and systemLanguage.
  4. Styling
     - Use of CSS via <style> element and external style sheets, presentation attributes, class and style, user agent defaults, and required CSS properties for proper rendering.
  5. Geometry Properties
     - Precise properties: cx, cy, r, rx, ry for circles and ellipses; x, y, width, height for rectangles; line coordinate properties.
  6. Coordinate Systems, Transformations and Units
     - Viewport definitions, viewBox, preserveAspectRatio, transform attribute syntax, transformation matrices, initial coordinate system, and DOM interfaces: SVGTransform, SVGTransformList, SVGAnimatedTransformList, SVGPreserveAspectRatio.
  7. Paths
     - <path> element detailed command listing: moveto, lineto, cubic and quadratic Bzier curves, elliptical arcs, closepath operations, and complete grammar specification.
  8. Basic Shapes
     - Detailed specifications for <rect>, <circle>, <ellipse>, <line>, <polyline>, <polygon> with corresponding DOM interfaces (SVGRectElement, SVGCircleElement, SVGEllipseElement, SVGLineElement, SVGPolylineElement, SVGPolygonElement).
  9. Text
     - Text elements <text>, <tspan>, <textPath>; attributes x, y, dx, dy, rotate; text layout algorithms, white-space management, text-anchor, kerning, baseline alignment; DOM interfaces: SVGTextElement, SVGTSpanElement, SVGTextPathElement.
  10. Embedded Content
     - Specifications for <image> and <foreignObject> elements, embedding HTML in SVG, DOM interfaces: SVGImageElement, SVGForeignObjectElement.
  11. Painting
     - Filling: fill, fill-rule, fill-opacity; Stroking: stroke, stroke-opacity, stroke-width, stroke-linecap, stroke-linejoin, stroke-dasharray, stroke-dashoffset; Marker symbols: <marker>, marker-start, marker-mid, marker-end; attributes for paint order and color interpolation; DOM interface: SVGMarkerElement.

## Original Source
SVG 2 Specification
https://www.w3.org/TR/SVG2/

## Digest of SVG2

# SVG2 Specification Digest
Retrieved: 2023-10-09

# Overview
The SVG2 specification is a comprehensive candidate recommendation that defines a modernized version of Scalable Vector Graphics. The document details the syntax, DOM interfaces, rendering models, styling, coordinate systems, and more.

# Table of Contents
1. Rendering Model
2. Basic Data Types and Interfaces
3. Document Structure
4. Styling
5. Geometry Properties
6. Coordinate Systems, Transformations and Units
7. Paths
8. Basic Shapes
9. Text
10. Embedded Content
11. Painting: Filling, Stroking and Marker Symbols

# 1. Rendering Model
- Defines the rendering tree, painters model, stacking contexts, and the effects of CSS properties such as display, visibility, and opacity.
- Specifies how elements are rendered, including dynamic and static modes, and group opacity handling.

# 2. Basic Data Types and Interfaces
- Exact definitions for data types such as SVGNumber, SVGLength, SVGAngle.
- DOM interfaces: SVGElement, SVGGraphicsElement, SVGGeometryElement.
- List interfaces: SVGNumberList, SVGLengthList, SVGStringList.
- Reflectable attributes and synchronizing mechanisms with clear descriptions of initial values and error handling.

# 3. Document Structure
- Outlines the structure of an SVG document with the <svg> element as the root.
- Detailed specification for grouping (<g>), definitions (<defs>), symbols (<symbol>), and re-usable elements (<use>). 
- Conditional processing using the <switch> element and related attributes such as requiredExtensions and systemLanguage.

# 4. Styling
- Specifies the use of CSS for styling SVG content, including inline styles (<style> element) and external style sheets.
- Details element-specific styling using class and style attributes along with presentation attributes.
- Highlights the user agent style sheet and required CSS features for correct rendering.

# 5. Geometry Properties
- Detailed properties for shapes including cx, cy, r for circles; x, y, width, height for rectangles; and attributes for ellipses and line elements.

# 6. Coordinate Systems, Transformations and Units
- Provides the definitions for SVG viewports, viewBox attribute, and preserveAspectRatio.
- Includes transformation matrices via the transform attribute and details for units and intrinsic sizing.
- DOM interfaces: SVGTransform, SVGTransformList, SVGAnimatedTransformList, and SVGPreserveAspectRatio.

# 7. Paths
- Comprehensive description of the <path> element, including the d attribute with commands: moveto, lineto, closepath, cubic and quadratic Bézier curves, and elliptical arcs.
- Provides the grammar for path data and error handling for out-of-range parameters and zero-length segments.
- DOM interface: SVGPathElement.

# 8. Basic Shapes
- Specifications for basic shape elements (<rect>, <circle>, <ellipse>, <line>, <polyline>, <polygon>) and their associated DOM interfaces (SVGRectElement, SVGCircleElement, etc.).

# 9. Text
- Detailed definitions for text elements (<text>, <tspan>, <textPath>) including attributes (x, y, dx, dy, rotate) and font/glyph metrics.
- Describes text layout mechanisms, white-space handling, and properties such as text-anchor, kerning, and alignment-baseline.
- DOM interfaces: SVGTextElement, SVGTSpanElement, SVGTextPathElement.

# 10. Embedded Content
- Guidelines for embedding external content using the <image> and <foreignObject> elements.
- Specifies HTML elements within SVG subtrees and related DOM interfaces (SVGImageElement, SVGForeignObjectElement).

# 11. Painting: Filling, Stroking and Marker Symbols
- Specifies paint operations with fill properties (fill, fill-rule, fill-opacity) and stroke properties (stroke, stroke-opacity, stroke-width, stroke-linecap, stroke-linejoin, stroke-dasharray, stroke-dashoffset).
- Detailed explanation of markers with <marker> element and the properties marker-start, marker-mid, marker-end.
- Provides additional details on paint ordering (paint-order) and interpolation (color-interpolation), and rendering hints.
- DOM interface: SVGMarkerElement.

# Attribution
Data Size: 9220710 bytes; Links Found: 66664; No errors encountered.

## Attribution
- Source: SVG 2 Specification
- URL: https://www.w3.org/TR/SVG2/
- License: W3C Recommendation
- Crawl Date: 2025-04-27T11:47:26.256Z
- Data Size: 9220710 bytes
- Links Found: 66664

## Retrieved
2025-04-27
