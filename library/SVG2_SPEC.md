# SVG2_SPEC

## Crawl Summary
This crawl extracted the SVG 2 Candidate Recommendation including detailed sections on document status, rendering model, DOM interfaces for SVG elements, detailed descriptions of basic data types, document structure, CSS styling integration, geometry properties, coordinate systems, path data grammar, basic shapes, text layout, embedded content, and comprehensive painting instructions. Specific technical topics include detailed API and DOM interface names, attribute definitions, transformation mechanisms, and error handling strategies as defined in the SVG 2 specification.

## Normalised Extract
Table of Contents:
1. Status and Document History
   - Candidate Recommendation dated 04 October 2018
   - URLs for candidate, latest and previous versions
2. Rendering Model
   - Rendering tree definition, painters model, stacking context establishment, effects of 'display', 'visibility', and 'opacity'
3. Basic Data Types and DOM Interfaces
   - Definitions of SVGNumber, SVGLength, SVGAngle, and corresponding list interfaces
   - DOM interfaces: SVGElement, SVGGraphicsElement, SVGGeometryElement, SVGAnimated* interfaces
4. Document Structure
   - Structure: <svg>, <g>, <defs>, <symbol>, <use>, <switch>, <desc>, <title>, <metadata>
   - Common attributes (id, lang, xml:lang, xml:space, tabindex, data-*) and WAI-ARIA attributes
5. Styling and CSS Integration
   - Use of inline style (<style>) and external style sheets (<link>)
   - Presentation attributes and user agent style sheet details
   - SVGStyleElement interface
6. Geometry Properties
   - Attributes: cx, cy, r, rx, ry, x, y, width, height
7. Coordinate Systems and Transformations
   - 'transform' property, viewBox, preserveAspectRatio, initial viewport concepts
   - DOM interfaces: SVGTransform, SVGTransformList, SVGAnimatedTransformList, SVGPreserveAspectRatio, SVGAnimatedPreserveAspectRatio
8. Paths and Path Data Grammar
   - Definition of <path> element with 'd' attribute commands (moveto, lineto, curves, elliptical arcs, closepath)
   - Grammar rules and error handling for path data
   - SVGPathElement interface
9. Basic Shapes
   - Elements: <rect>, <circle>, <ellipse>, <line>, <polyline>, <polygon>
   - Corresponding DOM interfaces: SVGRectElement, SVGCircleElement, SVGEllipseElement, SVGLineElement, SVGPolylineElement, SVGPolygonElement
10. Text
   - Elements: <text>, <tspan>, <textPath>
   - Attributes: x, y, dx, dy, rotate; properties for inline-size, shape-inside, text-anchor, kerning, glyph orientation
   - DOM interfaces: SVGTextContentElement, SVGTextPositioningElement, SVGTextElement, SVGTSpanElement, SVGTextPathElement
11. Embedded Content
   - Embedding via <image> and <foreignObject>
   - DOM interfaces: SVGImageElement, SVGForeignObjectElement
12. Painting: Filling, Stroking, Markers
   - Fill properties: fill, fill-rule, fill-opacity
   - Stroke properties: stroke, stroke-opacity, stroke-width, stroke-linecap, stroke-linejoin, stroke-dasharray, stroke-dashoffset
   - Marker definitions using <marker> element and properties marker-start, marker-mid, marker-end
   - Additional properties: paint-order, color-interpolation, color-rendering, shape-rendering, text-rendering, image-rendering, and 'will-change'

Each section includes explicit technical definitions, attribute names, DOM interfaces and interfaces method specifications as defined in the SVG 2 specification.

## Supplementary Details
Technical Specifications and Implementation Details:
- Candidate Recommendation: 04 October 2018. URLs provided for candidate, latest, and previous versions.
- DOM Interface Specifications include full names such as SVGElement, SVGGraphicsElement, SVGGeometryElement, and specific SVGAnimatedXXX interfaces for animatable properties.
- Transformation details: 'transform' property accepts matrices, translations, rotations, scaling. The 'viewBox' attribute defines the initial coordinate system. 'preserveAspectRatio' specifies alignment and meet/slice options.
- Path Data: 'd' attribute grammar includes commands (M, L, C, Q, A, Z) with precise semantics; error handling includes checking for out-of-range elliptical arc parameters and zero-length segments.
- Configuration Options: Styling can be applied using inline styles, external CSS, or presentation attributes, with defaults defined by the user agent style sheet. Attributes like tabindex, data-* are supported with exact parameter rules.
- Best Practices: Use <defs> for reusable content, employ <use> with shadow trees for instance reuse, maintain accessibility with proper use of <title> and <desc>, and adhere to SVG DOM interface specifications for dynamic modifications via script.
- Troubleshooting Procedures: Validate SVG files against the SVG 2 specification, check for correct use of namespaces, verify that transformation matrices are computed correctly, and use browser developer tools to inspect computed styles and DOM interfaces. Typical commands include DOM inspection tools or validating against schema (e.g., xmllint) which should return no errors when compliant.

## Reference Details
API Specifications and Code Examples:
1. DOM Interfaces:
   - Interface SVGElement: Base interface for all SVG elements.
   - Interface SVGGraphicsElement: Inherits from SVGElement and adds properties for geometric rendering.
   - Interface SVGPathElement: Methods include:
       getTotalLength() -> number
       getPointAtLength(distance: number) -> DOMPoint
       getPathSegAtLength(distance: number) -> number
   - Interface SVGAnimatedTransformList: Provides access to transformation lists via baseVal and animVal properties.

2. Method Signatures Examples:
   - function createSVGElement(tagName: string): SVGElement
   - function setAttribute(element: SVGElement, name: string, value: string): void
   - Example usage:
       // Create an SVG circle
       const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
       circle.setAttribute('cx', '50');
       circle.setAttribute('cy', '50');
       circle.setAttribute('r', '40');
       circle.setAttribute('fill', 'red');
       document.querySelector('svg').appendChild(circle);

3. Configuration Options:
   - 'viewBox': string; e.g., '0 0 100 100'; defines the coordinate system.
   - 'preserveAspectRatio': string; options include 'xMidYMid meet', 'xMinYMin slice'; defines scaling behavior.
   - 'transform': string; accepts transformation functions like translate(10,20), rotate(45), scale(2).

4. Best Practices:
   - Use <defs> to store reusable elements to reduce duplication.
   - Maintain clear separation of styling by using external CSS when possible.
   - Validate SVG syntax using XML validators and browser developer tools.

5. Troubleshooting Procedures:
   - Command: xmllint --noout --schema svg2.xsd file.svg
     Expected output: file.svg: valid
   - Use browser inspector to verify computed styles and transformation matrices.
   - Check for namespace errors when embedding SVG inside HTML by ensuring the correct XML namespace is declared: xmlns="http://www.w3.org/2000/svg".

These API specifications, method signatures, code examples, configuration options, best practices and troubleshooting steps represent the technical core of the SVG 2 specification directly as defined by W3C.

## Information Dense Extract
SVG2 Candidate Rec 04Oct2018; URLs:Cand:https://www.w3.org/TR/2018/CR-SVG2-20181004/, Latest:https://www.w3.org/TR/SVG2/; Metadata: DataSize=25244860, Links=196440; Sections: Status (Doc history, review annotations), RenderingModel (render tree, painters, stacking), DataTypes (SVGNumber, SVGLength, SVGAnimated*), DocumentStructure (svg, g, defs, symbol, use, switch, metadata), Styling (CSS, style element, SVGStyleElement), Geometry (cx,cy,r,rx,ry,x,y,width,height), CoordinateSystems (transform, viewBox, preserveAspectRatio, SVGTransformList), Paths (d attribute, M,L,C,Q,A,Z, SVGPathElement), BasicShapes (rect, circle, ellipse, line, polyline, polygon), Text (text, tspan, textPath, text-anchor, kerning, white-space, SVGTextElement), Embedded (image, foreignObject), Painting (fill, stroke, marker, paint-order, color-rendering, shape-rendering, SVGMarkerElement); API: Methods: getTotalLength() :number, getPointAtLength(distance:number):DOMPoint; Config: viewBox, preserveAspectRatio, transform; Best Practices: use defs, external CSS, namespace declaration; Troubleshoot: xmllint --schema svg2.xsd file.svg

## Sanitised Extract
Table of Contents:
1. Status and Document History
   - Candidate Recommendation dated 04 October 2018
   - URLs for candidate, latest and previous versions
2. Rendering Model
   - Rendering tree definition, painters model, stacking context establishment, effects of 'display', 'visibility', and 'opacity'
3. Basic Data Types and DOM Interfaces
   - Definitions of SVGNumber, SVGLength, SVGAngle, and corresponding list interfaces
   - DOM interfaces: SVGElement, SVGGraphicsElement, SVGGeometryElement, SVGAnimated* interfaces
4. Document Structure
   - Structure: <svg>, <g>, <defs>, <symbol>, <use>, <switch>, <desc>, <title>, <metadata>
   - Common attributes (id, lang, xml:lang, xml:space, tabindex, data-*) and WAI-ARIA attributes
5. Styling and CSS Integration
   - Use of inline style (<style>) and external style sheets (<link>)
   - Presentation attributes and user agent style sheet details
   - SVGStyleElement interface
6. Geometry Properties
   - Attributes: cx, cy, r, rx, ry, x, y, width, height
7. Coordinate Systems and Transformations
   - 'transform' property, viewBox, preserveAspectRatio, initial viewport concepts
   - DOM interfaces: SVGTransform, SVGTransformList, SVGAnimatedTransformList, SVGPreserveAspectRatio, SVGAnimatedPreserveAspectRatio
8. Paths and Path Data Grammar
   - Definition of <path> element with 'd' attribute commands (moveto, lineto, curves, elliptical arcs, closepath)
   - Grammar rules and error handling for path data
   - SVGPathElement interface
9. Basic Shapes
   - Elements: <rect>, <circle>, <ellipse>, <line>, <polyline>, <polygon>
   - Corresponding DOM interfaces: SVGRectElement, SVGCircleElement, SVGEllipseElement, SVGLineElement, SVGPolylineElement, SVGPolygonElement
10. Text
   - Elements: <text>, <tspan>, <textPath>
   - Attributes: x, y, dx, dy, rotate; properties for inline-size, shape-inside, text-anchor, kerning, glyph orientation
   - DOM interfaces: SVGTextContentElement, SVGTextPositioningElement, SVGTextElement, SVGTSpanElement, SVGTextPathElement
11. Embedded Content
   - Embedding via <image> and <foreignObject>
   - DOM interfaces: SVGImageElement, SVGForeignObjectElement
12. Painting: Filling, Stroking, Markers
   - Fill properties: fill, fill-rule, fill-opacity
   - Stroke properties: stroke, stroke-opacity, stroke-width, stroke-linecap, stroke-linejoin, stroke-dasharray, stroke-dashoffset
   - Marker definitions using <marker> element and properties marker-start, marker-mid, marker-end
   - Additional properties: paint-order, color-interpolation, color-rendering, shape-rendering, text-rendering, image-rendering, and 'will-change'

Each section includes explicit technical definitions, attribute names, DOM interfaces and interfaces method specifications as defined in the SVG 2 specification.

## Original Source
W3C SVG 2 Documentation
https://www.w3.org/TR/SVG2/

## Digest of SVG2_SPEC

# SVG2 SPECIFICATION

Retrieved on: 2023-10-13

# Document Metadata

This document is the W3C Candidate Recommendation for SVG 2, dated 04 October 2018. It supersedes earlier versions such as the 04 August 2018 Candidate Recommendation and builds upon SVG 1.1 Second Edition. The specification is available at:
- Candidate Recommendation: https://www.w3.org/TR/2018/CR-SVG2-20181004/
- Latest version: https://www.w3.org/TR/SVG2/
- Previous version: https://www.w3.org/TR/2018/CR-SVG2-20180807/

Attribution:
- Data Size: 25244860 bytes
- Links Found: 196440
- Crawled from: https://www.w3.org/TR/SVG2/

# Table of Contents
1. Status and Document History
2. Rendering Model
3. Basic Data Types and DOM Interfaces
4. Document Structure
5. Styling and CSS Integration
6. Geometry Properties
7. Coordinate Systems, Transformations and Units
8. Paths and Path Data Grammar
9. Basic Shapes and Associated DOM Interfaces
10. Text Rendering and Layout
11. Embedded Content
12. Painting: Filling, Stroking and Marker Symbols

# 1. Status and Document History
- Candidate Recommendation dated 04 October 2018
- Expected to advance to Proposed Recommendation no earlier than 04 December 2018
- Contains annotations indicating review status: red (unchanged or new work), yellow (reviewed and rewritten), white (ready for wider review)

# 2. Rendering Model
- Defines the rendering tree, the painters model, and the rendering order.
- Topics include: establishing stacking contexts, rendered versus non-rendered elements, controlling visibility using 'display' and 'visibility', re-used graphics, and group opacity via the 'opacity' property.

# 3. Basic Data Types and DOM Interfaces
- Defines basic numeric types, angles, lengths and clamping rules.
- DOM interfaces include:
  - SVGElement
  - SVGGraphicsElement
  - SVGGeometryElement
  - SVGNumber, SVGLength, SVGAngle and their list interfaces, e.g. SVGNumberList, SVGLengthList, SVGStringList
- Interfaces for animatable attributes:
  - SVGAnimatedBoolean, SVGAnimatedEnumeration, SVGAnimatedInteger, SVGAnimatedNumber, SVGAnimatedLength, SVGAnimatedAngle, SVGAnimatedString, SVGAnimatedRect, SVGAnimatedNumberList, SVGAnimatedLengthList
- Other interfaces include SVGUnitTypes, SVGTests, SVGFitToViewBox, SVGZoomAndPan, and SVGURIReference

# 4. Document Structure
- Root element: <svg>
- Grouping element: <g>
- Reusable content defined using <defs>
- Symbol definitions with <symbol>
- Content reuse via <use> and the use-element shadow tree
- Conditional processing with <switch> and attributes such as requiredExtensions and systemLanguage
- Metadata embedding through <desc>, <title>, and <metadata>
- Common attributes: id, lang, xml:lang, xml:space, tabindex, data-* attributes, and WAI-ARIA attributes

# 5. Styling and CSS Integration
- Styling with inline <style> elements and external style sheets via <link> (HTML effect) 
- Element-specific styling via class and style attributes
- Presentation attributes and default user agent styles
- Required CSS features and DOM interface: SVGStyleElement

# 6. Geometry Properties
- Attributes for positioning and sizing shapes: cx, cy (center coordinates), r (radius), rx, ry, x, y, width, height

# 7. Coordinate Systems, Transformations and Units
- Definition of the initial viewport and coordinate system
- Transformation using the 'transform' property and the 'viewBox' and 'preserveAspectRatio' attributes
- Introduction to units and bounding boxes including object bounding box units
- DOM interfaces for transformations: SVGTransform, SVGTransformList, SVGAnimatedTransformList, SVGPreserveAspectRatio, SVGAnimatedPreserveAspectRatio

# 8. Paths and Path Data Grammar
- Definition and usage of the <path> element
- The 'd' attribute defines path commands including:
  - moveto commands
  - lineto commands
  - cubic and quadratic Bézier curves
  - elliptical arc commands
  - closepath commands with segment-completing operations
- Detailed grammar for path data and error handling, including out-of-range arc parameters and zero-length segments
- DOM interface: SVGPathElement

# 9. Basic Shapes and Associated DOM Interfaces
- Supported elements include:
  - <rect>
  - <circle>
  - <ellipse>
  - <line>
  - <polyline>
  - <polygon>
- Corresponding DOM interfaces include: SVGRectElement, SVGCircleElement, SVGEllipseElement, SVGLineElement, SVGAnimatedPoints, SVGPointList, SVGPolylineElement, SVGPolygonElement

# 10. Text Rendering and Layout
- Text is handled by <text> and <tspan> elements
- Attributes for text positioning: x, y, dx, dy, rotate
- Text layout properties such as inline-size, shape-inside, shape-subtract, shape-image-threshold, shape-margin, and shape-padding
- Additional text formatting options including text anchoring ('text-anchor'), kerning, glyph orientation (horizontal and vertical), and white space handling
- Advanced text methods: text on a path using <textPath>
- DOM interfaces: SVGTextContentElement, SVGTextPositioningElement, SVGTextElement, SVGTSpanElement, SVGTextPathElement

# 11. Embedded Content
- Embedding external content via <image> and <foreignObject> elements
- Inclusion of HTML elements within SVG subtrees
- DOM interfaces: SVGImageElement, SVGForeignObjectElement

# 12. Painting: Filling, Stroking and Marker Symbols
- Specification of paint using properties:
  - Fill properties: fill, fill-rule, fill-opacity
  - Stroke properties: stroke, stroke-opacity, stroke-width, stroke-linecap, stroke-linejoin (with miter limit adjustments), stroke-dasharray, stroke-dashoffset
- Definition of markers via the <marker> element with attributes for marker-start, marker-mid, and marker-end
- Control over paint operation order via the 'paint-order' property
- Color space and rendering hints with 'color-interpolation', 'color-rendering', 'shape-rendering', 'text-rendering', and 'image-rendering'
- DOM interface: SVGMarkerElement


## Attribution
- Source: W3C SVG 2 Documentation
- URL: https://www.w3.org/TR/SVG2/
- License: License: W3C Document License
- Crawl Date: 2025-04-25T00:39:08.062Z
- Data Size: 25244860 bytes
- Links Found: 196440

## Retrieved
2025-04-25
