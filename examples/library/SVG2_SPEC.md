# SVG2_SPEC

## Crawl Summary
The crawled content provides a highly detailed table of contents outlining the SVG 2 specification. It covers precise technical sections including rendering models, DOM interfaces, geometric property definitions, path data grammar, text layout, and styling rules. Specific configuration details such as the use of the `viewBox` attribute, the transformation matrix computations in the ‘transform’ property, and the exact SVG attributes for fill, stroke, and markers are clearly listed. Each section provides exact instructions on attribute syntax (e.g. real number precision, clamping of values), detailed command definitions for path construction (moveto, lineto, Bézier curves, elliptical arcs), and comprehensive DOM interface descriptions for all SVG elements.

## Normalised Extract
## Table of Contents and Technical Details

### 1. Introduction
- **Overview:** SVG 2 builds on SVG 1.1 Second Edition. It defines an XML-based language for two-dimensional graphics that can be scaled, styled with CSS, and animated via declarative or script-based methods.
- **Key Attributes:** Candidate Recommendation dated 04 October 2018.

### 2. Conformance Criteria
- **Processing Modes:**
  - Dynamic interactive, animated, secure animated, static, secure static.
- **Document Conformance:**
  - Conforming SVG DOM subtrees, conforming markup fragments, and error processing rules.

### 3. Rendering Model
- **Rendering Tree:**
  - Definitions comparing rendered vs non-rendered elements.
- **Painter’s Model:**
  - Establishing stacking contexts and ordering elements based on SVG structure.
- **Opacity Handling:**
  - Group and element opacity determined by the 'opacity' property.

### 4. Basic Data Types and Interfaces
- **Attribute Syntax:**
  - Real number precision and clamping for restricted ranges.
- **DOM Interfaces:**
  - SVGElement, SVGGraphicsElement, SVGGeometryElement, and interfaces for basic data types (SVGNumber, SVGLength, SVGAngle, etc.).
- **Animated Attributes:**
  - Interfaces such as SVGAnimatedBoolean, SVGAnimatedNumber, SVGAnimatedLength, SVGAnimatedRect, etc.

### 5. Document Structure
- **Core Elements:** `<svg>`, `<g>`, `<defs>`, `<symbol>`, `<use>`.
- **Conditional Processing:**
  - Use of `<switch>`, attributes `requiredExtensions`, and `systemLanguage` for conditional rendering.
- **Metadata:**
  - `<desc>`, `<title>`, and `<metadata>` to enhance accessibility and SEO.

### 6. Styling
- **CSS Integration:**
  - Inline `<style>` elements and external style sheets using `<link>` elements.
- **Presentation Attributes:**
  - Class and style attributes for element-specific styling, along with user agent style sheet defaults.

### 7. Geometry Properties
- **Shape Attributes:**
  - Definitions for `cx`, `cy` (center coordinates); `r` (radius); `rx`, `ry` for ellipses; `x`, `y`, `width`, `height` for basic shapes.

### 8. Coordinate Systems, Transformations and Units
- **Transformations:**
  - The `transform` property accepts transformation functions (translate, scale, rotate, skewX, skewY, matrix).
- **Viewport and ViewBox:**
  - The `viewBox` attribute defines the inner coordinate system and is complemented by `preserveAspectRatio` for aspect control.
- **Units:**
  - Defined measurement units and intrinsic sizing properties of SVG content.

### 9. Paths
- **Path Data (`d` Attribute):**
  - Contains commands: moveto (M, m), lineto (L, l), closepath (Z, z), cubic Bézier curves (C, c), quadratic Bézier curves (Q, q), and elliptical arcs (A, a).
- **Grammar:**
  - Detailed command syntax with error handling for malformed path data.

### 10. Basic Shapes
- **Elements:**
  - `<rect>`, `<circle>`, `<ellipse>`, `<line>`, `<polyline>`, `<polygon>` with specific attribute semantics and DOM interfaces (SVGRectElement, SVGCircleElement, etc.).

### 11. Text
- **Text Elements:**
  - `<text>`, `<tspan>`, `<textPath>` with attributes for layout (x, y, dx, dy, rotate).
- **Layout Processing:**
  - Handling of inline-size, shape-inside, and white-space rules.

### 12. Embedded Content
- **Embedding External Content:**
  - `<image>` element for raster images and `<foreignObject>` for incorporating non-SVG XML/HTML.

### 13. Painting: Filling, Stroking and Marker Symbols
- **Fill Properties:**
  - `fill`, `fill-rule` (nonzero/evenodd), `fill-opacity`.
- **Stroke Properties:**
  - `stroke`, `stroke-opacity`, `stroke-width`, `stroke-linecap` (butt, round, square), `stroke-linejoin` (miter, round, bevel), `stroke-dasharray`, `stroke-dashoffset`.
- **Markers:**
  - `<marker>` element with properties `marker-start`, `marker-mid`, and `marker-end` to define arrowheads and vertices.

This extract constitutes a directly usable technical reference for developers implementing or extending SVG functionalities in applications.


## Supplementary Details
## Supplementary Technical Specifications

### Transformation Specifications
- **Transform Property Syntax:**
  - translate(tx, [ty])
  - scale(sx, [sy])
  - rotate(angle, [cx, cy])
  - skewX(angle)
  - skewY(angle)
  - matrix(a, b, c, d, e, f)

Example:

  transform="translate(50,100) rotate(45) scale(1.5)"

### ViewBox and Aspect Ratio
- **viewBox Attribute:** Defines a rectangle in user space. Format: "min-x min-y width height". E.g., viewBox="0 0 300 150".
- **preserveAspectRatio:** Format: "(none | xMidYMid meet | xMinYMin slice, etc.)". Default is "xMidYMid meet".

### DOM Interfaces and Animated Attributes
- **SVGElement Interface:** Base interface for all SVG elements with properties such as id, className, and style.
- **Animated Interfaces:**
  - SVGAnimatedNumber { baseVal: number; animVal: number; }
  - SVGAnimatedLength { baseVal: SVGLength; animVal: SVGLength; }

### Error Handling in Path Data
- **Invalid Commands:** The parser must raise errors when unexpected characters are encountered or when numbers fall out of valid ranges.
- **Fallback Procedures:** If an at-risk feature is not implemented, it should be removed according to the specification.

### Configuration Options in SVG Rendering
- **Stroke Configurations:**
  - Default stroke-width: 1 (if not specified)
  - Default stroke-linecap: butt
  - Default stroke-linejoin: miter
  - Stroke-dasharray and dashoffset must be parsed as lists of numbers with exact spacing behavior.

### Best Practices
- **Implementation:** Ensure proper namespace declaration (xmlns="http://www.w3.org/2000/svg") in the root `<svg>` element.
- **Accessibility:** Always include `<title>` and `<desc>` elements for assistive technologies.
- **Performance:** Use the `<use>` element for reusing definitions defined in `<defs>` to minimize DOM size.

### Troubleshooting Procedures
- **Validation:** Use an XML/SVG validator to ensure all elements conform to the SVG 2 DTD.
- **Debug Commands:** In browser developer tools, inspect the computed style and the rendering tree (e.g., using Chrome DevTools Elements panel) to pinpoint misconfigurations.
- **Example Command:**
    xmllint --noout --schema http://www.w3.org/Graphics/SVG/svg11.xsd yourfile.svg
  Expected Output: "yourfile.svg" is valid.


## Reference Details
## Complete API and Implementation Specifications

### SVG DOM API Specifications

1. SVGElement Interface
   - Properties:
     • id: DOMString
     • className: SVGAnimatedString
     • style: CSSStyleDeclaration
   - Methods:
     • `SVGElement.getBBox(): SVGRect` – Returns the bounding box.
     • `SVGElement.getCTM(): SVGMatrix` – Returns the current transformation matrix.

2. Animated Attributes (Example: SVGAnimatedNumber)
   - Structure:
     {
       baseVal: number,  // The static value
       animVal: number   // The animated value
     }

3. SVGTransform API
   - Method Signature:
     • `createSVGTransform(): SVGTransform`
       - Returns a new SVGTransform with properties:
         - type: number (enum value)
         - matrix: SVGMatrix (with properties a, b, c, d, e, f)
         - angle: number (for rotate, skew operations)

### SDK Method Signatures and Code Examples

// Creating a new SVG element and setting a transform
var svgNS = "http://www.w3.org/2000/svg";
var svgElem = document.createElementNS(svgNS, 'svg');
svgElem.setAttribute('width', '300');
svgElem.setAttribute('height', '150');

var rect = document.createElementNS(svgNS, 'rect');
rect.setAttribute('x', '50');
rect.setAttribute('y', '20');
rect.setAttribute('width', '100');
rect.setAttribute('height', '50');
rect.setAttribute('fill', 'blue');

// Applying transformation
rect.setAttribute('transform', 'translate(10,20) rotate(30)');

svgElem.appendChild(rect);
document.body.appendChild(svgElem);

// Using SVGAnimatedLength
// Assuming we have an SVG circle element with a radius attribute
var circle = document.createElementNS(svgNS, 'circle');
circle.setAttribute('cx', '75');
circle.setAttribute('cy', '75');
circle.setAttribute('r', '40');
circle.setAttribute('fill', 'red');

// Accessing animated value (if any animation is applied)
var radiusAnimated = circle.r; // This is an SVGAnimatedLength object
console.log('Base radius:', radiusAnimated.baseVal.value, 'Animated radius:', radiusAnimated.animVal.value);

### Configuration Options and Their Effects

- xmlns (Namespace): Must be set to "http://www.w3.org/2000/svg"; default if omitted can cause rendering issues.
- viewBox: Defines the internal coordinate system. E.g., viewBox="0 0 300 150" sets origin at (0,0) with width 300 and height 150.
- preserveAspectRatio: Controls scaling behavior. Values include "xMidYMid meet" (default), "none", etc.

### Best Practices with Implementation Code

// Best practice: Always include accessibility tags
var title = document.createElementNS(svgNS, 'title');
title.textContent = 'Sample SVG Graphic';

var desc = document.createElementNS(svgNS, 'desc');
desc.textContent = 'A blue rectangle and red circle.';

svgElem.insertBefore(title, svgElem.firstChild);
svgElem.insertBefore(desc, svgElem.firstChild);

// Validate SVG structure using xmllint as troubleshooting step:
// Command:
//   xmllint --noout --schema http://www.w3.org/Graphics/SVG/svg11.xsd file.svg
// Expected outcome: 'file.svg' is valid if no errors are returned.

### Detailed Troubleshooting Procedures

1. Verify all attributes and namespaces are correctly defined.
2. Check the browser console for parsing errors related to SVG content.
3. Use developer tools to inspect the computed layout and applied transformations.
4. In case of animation issues, confirm that animated attributes (baseVal and animVal) are being updated as per the JavaScript API.

This complete reference provides developers with an exhaustive set of API specifications, method signatures, code examples, and configuration options required for direct implementation of SVG 2 features.


## Original Source
W3C SVG 2 Specification
https://www.w3.org/TR/SVG2/

## Digest of SVG2_SPEC

# Scalable Vector Graphics (SVG) 2 Specification

**Retrieved Date:** 2023-10-30

This document presents the full technical digest of the W3C SVG 2 Candidate Recommendation published on 04 October 2018. The specification defines the complete syntax, features, and behaviors for describing two-dimensional vector and mixed graphics using XML. It covers detailed topics such as conformance criteria, rendering models, basic data types and interfaces, document structure, styling, geometry properties, coordinate systems and transformations, path data, basic shapes, text layout, embedded content, and painting (filling, stroking, marker symbols).

## Table of Contents

1. Introduction
   - Overview of SVG 2
   - Compatibility requirements
   - Normative Terminology

2. Conformance Criteria
   - Processing modes (dynamic, animated, static, secure modes)
   - Document and software conformance classes

3. Rendering Model
   - Rendering tree definitions
   - Painter’s model and stacking contexts
   - Group rendering and opacity effects

4. Basic Data Types and Interfaces
   - Attribute syntax (real number precision, clamping values)
   - SVG DOM overviews and interface definitions (SVGElement, SVGGraphicsElement, SVGGeometryElement)
   - Interfaces for basic types and animated attributes (SVGNumber, SVGLength, SVGAngle, SVGAnimatedString, etc.)

5. Document Structure
   - Definition of the `<svg>` element with namespaces
   - Grouping (`<g>`), definitions (`<defs>`), symbol and use elements
   - Conditional processing and metadata inclusion

6. Styling
   - Use of CSS for styling SVG content
   - Inline style sheets (`<style>`), external style sheets via `<link>`
   - Presentation attributes and required CSS features

7. Geometry Properties
   - Properties like `cx`, `cy`, `r`, `rx`, `ry`, `x`, `y`, `width`, and `height`
   - Effects of these properties on shape rendering

8. Coordinate Systems, Transformations and Units
   - Viewport and coordinate system definitions
   - The `transform` attribute and transformation matrices
   - The `viewBox` and `preserveAspectRatio` attributes
   - Unit specifications and intrinsic sizing

9. Paths
   - The `<path>` element and its `d` attribute
   - Command definitions: moveto, lineto, closepath, cubic & quadratic Bézier curves, elliptical arcs
   - Grammar and error handling in path data

10. Basic Shapes
    - Elements for simple shapes: `<rect>`, `<circle>`, `<ellipse>`, `<line>`, `<polyline>`, `<polygon>`
    - DOM interfaces for each shape and points list handling

11. Text
    - Definitions, font and glyph metrics
    - Text elements (`<text>`, `<tspan>`, `<textPath>`) and attributes like x, y, dx, dy, and rotate
    - Layout algorithms, white-space handling, text decoration and rendering order

12. Embedded Content
    - Handling embedded images using the `<image>` element
    - Foreign content via `<foreignObject>` and incorporation of HTML elements

13. Painting: Filling, Stroking and Marker Symbols
    - Specification of fill properties (`fill`, `fill-rule`, `fill-opacity`)
    - Stroke properties (`stroke`, `stroke-opacity`, `stroke-width`, `stroke-linecap`, `stroke-linejoin`, `stroke-dasharray`, `stroke-dashoffset`)
    - Marker elements and properties (`marker-start`, `marker-mid`, `marker-end`)
    - Additional rendering hints and color interpolation

---

**Attribution:** Technical content extracted directly from the W3C SVG 2 specification as published by the W3C SVG Working Group.

**Data Size:** 19918006 bytes


## Attribution
- Source: W3C SVG 2 Specification
- URL: https://www.w3.org/TR/SVG2/
- License: W3C License
- Crawl Date: 2025-04-21T07:46:57.567Z
- Data Size: 19918006 bytes
- Links Found: 155348

## Retrieved
2025-04-21
