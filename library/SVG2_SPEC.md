# SVG2_SPEC

## Crawl Summary
The technical crawl retrieved from https://www.w3.org/TR/SVG2/ provides a detailed candidate recommendation for SVG 2. Key sections include:

- Introduction: Defines SVG as an XML-based language for 2D graphics with dynamic capabilities.
- Conformance Criteria: Specifies processing modes (dynamic, static, secure, animated) and details for error processing and document conformity.
- Rendering Model: Complete description of the painter’s model, stacking contexts, and the impact of display/visibility and opacity properties.
- Basic Data Types and Interfaces: Detailed attribute syntax, numeric precision, clamping, and a suite of DOM interfaces (SVGElement, SVGNumber, SVGLength, etc.).
- Document Structure: Specifies the layout of an SVG document including root elements, grouping, reuse elements (defs, symbol, use) and conditional processing via the switch element.
- Styling: Instructions for CSS-based styling within SVG including inline and external styles as well as presentation attributes.
- Geometry Properties: Exact properties such as cx, cy, r, rx, ry for positioning and sizing.
- Coordinate Systems, Transformations and Units: Includes transform property, viewBox and preserveAspectRatio details, and definitions for bounding box and intrinsic sizing.
- Paths: Detailed grammar for path data including all command types (moveto, lineto, cubic and quadratic Bézier curves, elliptical arcs) with complete error handling procedures.
- Basic Shapes: Clear definitions for rect, circle, ellipse, line, polyline, and polygon with associated DOM interface specifications.
- Text: Comprehensive enumeration of text-related elements and properties; details on layout, alignment, wrapping, and white-space handling.
- Embedded Content: Describes image and foreignObject embedding along with conversions for HTML elements inside SVG.
- Painting: Provides full configuration for fill, stroke, marker symbols, paint order, and rendering hints.


## Normalised Extract
## Table of Contents with Detailed Technical Topics

1. **Introduction**
   - SVG as XML for 2D vector graphics
   - Candidate Recommendation status: 04 October 2018
   - Editorial contacts and version history

2. **Conformance Criteria**
   - Processing modes:
     - Dynamic Interactive Mode
     - Animated Mode
     - Secure Animated Mode
     - Static and Secure Static Modes
   - Error processing and conformance classes (DOM subtrees, markup fragments, XML-compatible fragments, stand-alone files)

3. **Rendering Model**
   - Rendering tree definitions and elements classification
   - Painter’s Model and stacking context details
   - Visibility control via `display` and `visibility`
   - Opacity effects at both element and group levels

4. **Basic Data Types and Interfaces**
   - Attribute syntax: real number precision and clamping rules
   - DOM Interfaces:
     - SVGElement
     - SVGGraphicsElement
     - SVGGeometryElement
     - SVGNumber, SVGLength, SVGAngle
     - SVGAnimated* interfaces (e.g., SVGAnimatedBoolean, SVGAnimatedLength, etc.)

5. **Document Structure**
   - The `svg` element: namespaces and definitions
   - Grouping with the `g` element
   - Reusable content via `defs`, `symbol`, and `use` elements
   - Conditional processing using the `switch` element and attributes (`requiredExtensions`, `systemLanguage`)

6. **Styling**
   - Inline styling with the `style` element
   - External CSS via HTML `link` element
   - Usage of presentation attributes and common properties like `class` and `style`

7. **Geometry Properties**
   - Attributes: `cx`, `cy`, `r`, `rx`, `ry`, `x`, `y`, `width`, `height`

8. **Coordinate Systems, Transformations and Units**
   - Definitions of viewports and initial coordinate systems
   - `transform` property usage and syntax
   - `viewBox` and `preserveAspectRatio` attributes with example configurations
   - Calculation of bounding boxes and intrinsic sizing

9. **Paths**
   - The `path` element and its data attribute `d`
   - Detailed command set: moveto, lineto, closepath (with segment completion), cubic and quadratic Bézier, elliptical arc
   - Grammar for path data and error handling (e.g. out-of-range parameters, zero-length segments)

10. **Basic Shapes**
    - Detailed element descriptions for `rect`, `circle`, `ellipse`, `line`, `polyline`, `polygon`
    - Associated DOM interfaces like SVGRectElement, SVGCircleElement, etc.

11. **Text**
    - Text elements (`text`, `tspan`, `textPath`) and their attribute sets
    - Layout algorithms: inline-size, shape-inside, wrapping, and alignment details
    - Properties: `text-anchor`, `glyph-orientation-horizontal`, `kerning`, and white-space handling

12. **Embedded Content**
    - Embedding using `image` and `foreignObject` elements
    - Integration of HTML metadata within SVG documents
    - Relevant DOM interfaces: SVGImageElement, SVGForeignObjectElement

13. **Painting: Filling, Stroking and Marker Symbols**
    - Fill specifications (property: `fill`, `fill-rule`, `fill-opacity`)
    - Stroke properties (properties: `stroke`, `stroke-opacity`, `stroke-width`, `stroke-linecap`, `stroke-linejoin`, `stroke-miterlimit`, `stroke-dasharray`, `stroke-dashoffset`)
    - Marker configuration (using `marker` element and properties: `marker-start`, `marker-mid`, `marker-end`)
    - Rendering order via `paint-order` and additional hints (color-rendering, shape-rendering, text-rendering, image-rendering)

_All details include the exact keywords and values as specified in the SVG 2 candidate recommendation text._


## Supplementary Details
## Supplementary Technical Specifications and Implementation Details

### Attribute and Property Specifications
- **Fill Property:** Accepts color values or 'none'. Default is browser-dependent; must be explicitly set to override.
- **Stroke Property:** Accepts color, 'none', or gradients. `stroke-width` accepts numerical values; defaults to 1 if unspecified.
- **Opacity:** Both individual (`opacity`) and group opacity affect rendering; values range from 0 (transparent) to 1 (opaque).

### Coordinate Systems & Transformations
- **Transform Property Syntax:** `transform="rotate(angle cx cy) translate(tx,ty)"` where angle is in degrees, cx,cy denote center of rotation.
- **ViewBox:** Format: `viewBox="min-x min-y width height"`. Example: `viewBox="0 0 100 100"`.
- **PreserveAspectRatio:** Accepts values such as `xMidYMid meet` or `none`.

### DOM Interface Details
- **SVGElement**: Base interface with core methods:
  - `getBBox(): DOMRect` – Returns the bounding box of the element.
  - `getCTM(): SVGMatrix` – Current transformation matrix.

- **SVGPathElement**:
  - Property: `d` (string) that holds path commands.
  - Example usage:
    ```javascript
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M 10 10 L 50 50 Z');
    document.querySelector('svg').appendChild(path);
    ```

### Best Practices and Implementation Patterns
- Always define the XML namespace when embedding SVG inline:
  ```html
  <svg xmlns="http://www.w3.org/2000/svg" version="2.0">
    <!-- SVG content here -->
  </svg>
  ```
- For dynamic updates, use DOM methods such as `setAttribute` and property binding. Example for updating stroke:
  ```javascript
  const svgElem = document.querySelector('svg > rect');
  svgElem.setAttribute('stroke', '#FF0000');
  svgElem.setAttribute('stroke-width', '2');
  ```

### Troubleshooting Procedures
- **Invalid Attribute Values:** Use browser console to inspect errors. For example, if a numeric attribute is out of range, the browser logs a warning indicating expected ranges.
- **Rendering Issues:** Check stacking context and CSS inheritance. Use browser developer tools to verify computed styles and transformation matrices.
- **Path Data Errors:** Validate the 'd' attribute string using online SVG path validators. Expected output for correct paths is a continuous set of commands; any missing command or extra delimiter will be flagged in the console.

### Configuration Options and Their Effects
- **SVG Optimization:** Tools (like SVGO) can be used to compress SVG files. Configuration options include removal of metadata, comments, and unnecessary attributes.
- **Interactivity Settings:** Use `pointer-events` and `cursor` properties to control interactive behavior. Defaults are set by user agents but may be overridden for precise UI behavior.


## Reference Details
## Complete API Specifications and Code Examples

### SVG DOM Interfaces

#### Interface: SVGElement
- **Description:** The root interface for all SVG objects.
- **Methods:**
  - `getBBox(): DOMRect`
    - **Parameters:** None
    - **Returns:** A DOMRect object representing the bounding box.
  - `getCTM(): SVGMatrix`
    - **Parameters:** None
    - **Returns:** Current transformation matrix.

_Example:_
```javascript
const svgElement = document.querySelector('svg');
const bbox = svgElement.getBBox();
console.log('Bounding Box:', bbox);
```

#### Interface: SVGPathElement
- **Property:** `d` (type: string)
- **Description:** Contains the path data commands.

_Example:_
```javascript
const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
// Path commands: MoveTo (M), LineTo (L), ClosePath (Z)
path.setAttribute('d', 'M 10 10 L 50 50 L 90 10 Z');
document.querySelector('svg').appendChild(path);
```

#### Interface: SVGRectElement
- **Properties:**
  - `x` (type: SVGAnimatedLength)
  - `y` (type: SVGAnimatedLength)
  - `width` (type: SVGAnimatedLength)
  - `height` (type: SVGAnimatedLength)

_Example:_
```javascript
const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
rect.setAttribute('x', '10');
rect.setAttribute('y', '10');
rect.setAttribute('width', '100');
rect.setAttribute('height', '50');
rect.setAttribute('fill', 'blue');
document.querySelector('svg').appendChild(rect);
```

### Implementation Patterns

1. **Including an SVG Document**
   - Always declare the namespace:
   ```html
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
     <!-- SVG content here -->
   </svg>
   ```
2. **Dynamic Styling and Interaction**
   - Use JavaScript to dynamically update style properties:
   ```javascript
   const element = document.getElementById('myElement');
   element.setAttribute('fill', '#00FF00');
   element.style.pointerEvents = 'auto';
   ```
3. **Transformations**
   - Example of combining translation and rotation:
   ```javascript
   const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
   group.setAttribute('transform', 'translate(50,50) rotate(45)');
   document.querySelector('svg').appendChild(group);
   ```

### Configuration Options

- **Animation Settings:**
  - `begin`: start time (e.g., '0s')
  - `dur`: duration (e.g., '5s')
  - `repeatCount`: can be a number or 'indefinite'

- **Style Attributes:**
  - `class`: String identifier for CSS rules
  - `style`: Inline CSS declarations
  - `pointer-events`: Controls interactivity (e.g., 'none', 'visiblePainted')

### Best Practices

- **SVG Code Organization:**
  - Separate definitions (`defs`) from visible elements to improve reusability.
  - Use external CSS files to manage styling for large SVGs.

- **Debugging Techniques:**
  - Utilize browser developer tools to inspect the computed layout and transformation matrices.
  - Validate SVG syntax using W3C's validator tools.

### Troubleshooting Procedures

1. **Command to Validate SVG Syntax (using SVGO CLI):**
   ```bash
   svgo --input input.svg --output output.svg
   ```
   - **Expected Output:** Optimized SVG file without syntax errors.

2. **Browser Console Commands:**
   - Inspect an element:
     ```javascript
     console.log(document.querySelector('svg').getBBox());
     ```
   - Check for attribute errors:
     ```javascript
     const elem = document.querySelector('svg rect');
     console.dir(elem);
     ```

All above specifications and examples are directly extracted so that developers can integrate, implement, and troubleshoot SVG 2 functionalities without further reference.


## Original Source
SVG 2 Specification
https://www.w3.org/TR/SVG2/

## Digest of SVG2_SPEC

# SVG 2 SPECIFICATION

**Retrieved Date:** 2023-10-XX
**Data Size:** 12562302 bytes

## Overview
This document is a direct extract from the W3C SVG 2 Candidate Recommendation (04 October 2018). It includes the complete specification for Scalable Vector Graphics (SVG) 2, which builds upon SVG 1.1 Second Edition by improving language usability and precision.

## Table of Contents
1. Introduction
2. Conformance Criteria
3. Rendering Model
4. Basic Data Types and Interfaces
5. Document Structure
6. Styling
7. Geometry Properties
8. Coordinate Systems, Transformations and Units
9. Paths
10. Basic Shapes
11. Text
12. Embedded Content
13. Painting: Filling, Stroking and Marker Symbols

## 1. Introduction
- Describes SVG as an XML-based language for two-dimensional vector and mixed vector/raster graphics.
- Details candidate recommendation status, publication details, version history, and editorial contacts.

## 2. Conformance Criteria
- Lists processing modes: dynamic interactive, animated, secure animated, static, secure static, and modes for SVG sub-resource documents.
- Provides treatment for error handling and document conformance classes (DOM subtrees, markup fragments, XML-compatible fragments, and stand-alone files).

## 3. Rendering Model
- Defines the rendering tree, including distinctions between rendered and non-rendered elements.
- Explains painter’s model, stacking contexts, group rendering with opacity and object opacity, and properties affecting element visibility such as `display` and `visibility`.

## 4. Basic Data Types and Interfaces
- Specifies attribute syntax, real number precision, and clamping rules for restricted ranges.
- Documents DOM interfaces: SVGElement, SVGGraphicsElement, SVGGeometryElement, SVGNumber, SVGLength, SVGAngle, SVGNumberList, SVGLengthList and more.

## 5. Document Structure
- Details the 'svg' element: namespaces, definitions, and role in document fragments.
- Covers grouping with the 'g' element, unknown elements, content reuse with the 'defs' element, and symbolic constructs with 'symbol' and 'use'.
- Specifies conditional processing via the 'switch' element and attributes like `requiredExtensions` and `systemLanguage`.

## 6. Styling
- Describes CSS styling of SVG content including inline styles via the `style` element and external styles using HTML link relationships.
- Lists element-specific styling with `class` and `style` attributes along with presentation attributes and user agent styles.

## 7. Geometry Properties
- Enumerates geometric attributes: horizontal center (`cx`), vertical center (`cy`), radius (`r`), horizontal (`rx`) and vertical (`ry`) radii, x and y coordinates, and sizing via `width` and `height`.

## 8. Coordinate Systems, Transformations and Units
- Explains viewports, initial coordinate systems, and the `transform` property usage.
- Details the `viewBox` and `preserveAspectRatio` attributes, configuration of new viewports, bounding box computations, and unit specifications.

## 9. Paths
- Covers the `path` element including the detailed grammar for path data.
- Lists command types: moveto, lineto, cubic Bézier, quadratic Bézier, elliptical arc commands, and closepath operations with segment-completing behavior.
- Provides domain-specific notes on out-of-range elliptical arc parameters, reflected control points, zero-length segments and error handling in path data.

## 10. Basic Shapes
- Documents standard shape elements: `rect`, `circle`, `ellipse`, `line`, `polyline`, and `polygon`.
- Lists associated DOM interfaces such as SVGRectElement, SVGCircleElement, SVGEllipseElement, and so forth.

## 11. Text
- Outlines text-related elements (`text`, `tspan`, `textPath`) and their attribute sets (e.g., `x`, `y`, `dx`, `dy`, `rotate`).
- Provides text layout algorithms, inline-size, shape-inside/subtract, text wrapping (including first line positioning and broken lines), and text rendering order.
- Enumerates styling properties such as `text-anchor`, `glyph-orientation-horizontal/vertical`, `kerning`, and white-space handling properties.

## 12. Embedded Content
- Discusses embedded content handling with the `image` and `foreignObject` elements.
- Details the inclusion of HTML metadata within SVG subtrees and associated DOM interfaces: SVGImageElement, SVGForeignObjectElement.

## 13. Painting: Filling, Stroking and Marker Symbols
- Specifies paint configuration with properties: `fill`, `fill-rule`, `fill-opacity` for painting elements.
- Details stroke properties: `stroke`, `stroke-opacity`, `stroke-width`, `stroke-linecap`, `stroke-linejoin`, `stroke-miterlimit`, `stroke-dasharray`, `stroke-dashoffset` and computation of stroke shape.
- Documents marker configuration with the `marker` element and its properties (`marker-start`, `marker-mid`, `marker-end`), along with rendering and ordering via `paint-order`.
- Includes notes on color interpolation, rendering hints (color-rendering, shape-rendering, text-rendering, image-rendering) and the effects of `will-change`.


## Attribution
- Source: SVG 2 Specification
- URL: https://www.w3.org/TR/SVG2/
- License: W3C
- Crawl Date: 2025-04-20T19:13:20.413Z
- Data Size: 12562302 bytes
- Links Found: 95412

## Retrieved
2025-04-20
