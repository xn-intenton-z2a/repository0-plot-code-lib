# SVG_STROKE

## Crawl Summary
Stroke attribute defines the outline color or paint for SVG shapes. Accepts <paint> values, default 'none', and is animatable. Uses include basic solid color, gradients (via linearGradient definitions), and context-based inheritance using context-stroke and context-fill. CSS stroke property takes precedence over the presentation attribute. Applicable to circle, ellipse, line, path, polygon, polyline, rect, text, textPath, and tspan.

## Normalised Extract
TABLE OF CONTENTS: 1. Attribute Specification 2. Usage Examples 3. Inheritance and Context 4. Configuration Details

1. Attribute Specification:
- Attribute: stroke
- Type: <paint>
- Default: none
- Animatable: Yes
- CSS property precedence: CSS stroke over attribute when both present

2. Usage Examples:
- Basic Color: <circle cx="5" cy="5" r="4" fill="none" stroke="green" />
- Gradient: Define a <linearGradient> with id and reference it in stroke attribute via url(#id).

3. Inheritance and Context:
- Marker usage with context-stroke. Example: <circle stroke="context-stroke" fill="context-fill" /> inside marker element;
- Applies inheritance when referenced by <use> elements.

4. Configuration Details:
- Applicable Elements: circle, ellipse, line, path, polygon, polyline, rect, text, textPath, tspan
- Implementation pattern: Define gradients in <defs> and reference them in stroke using url(#gradientId).


## Supplementary Details
Exact technical specifications: stroke accepts any valid <paint> value including CSS colors, URL references to gradients/patterns. Default value is 'none'. It is animatable. Configuration options include:
- CSS override: If both CSS and attribute are set, CSS takes precedence.
- Gradient Implementation: Use <linearGradient> with stop offsets and stop-color properties; reference with stroke="url(#gradientId)".
- Marker Setup: For context inheritance, use marker element with defined stroke="context-stroke" and fill="context-fill". 
Steps:
1. Define element (e.g., circle) with stroke attribute.
2. Optionally define a gradient in <defs>.
3. Use marker element with proper refX, refY, markerWidth, markerHeight properties for context-based styling.


## Reference Details
Complete API specifications: 
- SVG Attribute: stroke
  • Parameter: value of type <paint> (e.g., 'green', 'url(#gradientId)')
  • Default: none
  • Animatable: Yes
  • Behavior: When both CSS stroke property and stroke attribute are set, the CSS property value takes precedence.

SDK Method Signatures (for rendering SVG programmatically):
function createSVGElement(tagName: string, attributes: { [key: string]: string }): SVGElement
Example:
  let circle = createSVGElement('circle', { cx: '5', cy: '5', r: '4', fill: 'none', stroke: 'green' });

Example Code with Comments:
------------------------------------------------------
// Basic SVG circle with a solid stroke color
<svg viewBox="0 0 20 10" xmlns="http://www.w3.org/2000/svg">
  <!-- Solid green stroke -->
  <circle cx="5" cy="5" r="4" fill="none" stroke="green" />
</svg>

// SVG with gradient stroke
<svg viewBox="0 0 20 10" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Define a linear gradient from green to white -->
    <linearGradient id="myGradient">
      <stop offset="0%" stop-color="green" />
      <stop offset="100%" stop-color="white" />
    </linearGradient>
  </defs>
  <!-- Apply gradient stroke using the URL reference -->
  <circle cx="15" cy="5" r="4" fill="none" stroke="url(#myGradient)" />
</svg>

// Example of marker with context inheritance
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 90">
  <style>
    /* Apply stroke width and marker to each path */
    path { stroke-width: 2px; marker: url(#circle); }
  </style>
  <path d="M 10 44.64 L 30 10 L 70 10 L 90 44.64 L 70 79.28 L 30 79.28 Z" stroke="red" fill="orange" />
  <marker id="circle" markerWidth="12" markerHeight="12" refX="6" refY="6" markerUnits="userSpaceOnUse">
    <!-- The marker circle uses context-stroke and context-fill to inherit styling from the parent path -->
    <circle cx="6" cy="6" r="3" stroke-width="2" stroke="context-stroke" fill="context-fill" />
  </marker>
</svg>

Troubleshooting Procedures:
- Verify that gradients are defined within <defs> and referenced properly with url(#id).
- Check that CSS does not override stroke attribute unintentionally.
- For marker issues, ensure marker attributes (markerWidth, markerHeight, refX, refY) are correctly set. 
- Use browser developer tools to inspect computed styles for stroke and confirm inheritance from context-stroke.


## Information Dense Extract
stroke attribute: type <paint>, default none, animatable=yes; used for outlining SVG elements (circle, ellipse, line, path, polygon, polyline, rect, text, textPath, tspan); CSS stroke takes precedence; supports solid colors and gradients (via linearGradient with stops); context inheritance via context-stroke and context-fill in marker elements; implementation requires proper <defs> usage; API example: createSVGElement('circle', {cx:'5',cy:'5',r:'4',fill:'none',stroke:'green'}); configuration options: marker (markerWidth=12, markerHeight=12, refX=6, refY=6) for context markers; troubleshooting: check <defs> placement, CSS override, and marker attribute correctness.

## Sanitised Extract
TABLE OF CONTENTS: 1. Attribute Specification 2. Usage Examples 3. Inheritance and Context 4. Configuration Details

1. Attribute Specification:
- Attribute: stroke
- Type: <paint>
- Default: none
- Animatable: Yes
- CSS property precedence: CSS stroke over attribute when both present

2. Usage Examples:
- Basic Color: <circle cx='5' cy='5' r='4' fill='none' stroke='green' />
- Gradient: Define a <linearGradient> with id and reference it in stroke attribute via url(#id).

3. Inheritance and Context:
- Marker usage with context-stroke. Example: <circle stroke='context-stroke' fill='context-fill' /> inside marker element;
- Applies inheritance when referenced by <use> elements.

4. Configuration Details:
- Applicable Elements: circle, ellipse, line, path, polygon, polyline, rect, text, textPath, tspan
- Implementation pattern: Define gradients in <defs> and reference them in stroke using url(#gradientId).

## Original Source
MDN Web Docs: SVG Styling for Stroke Attributes
https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke

## Digest of SVG_STROKE

# SVG Stroke Attribute Specifications

## Overview
The stroke attribute in SVG is a presentation attribute that defines the color or paint used to outline shapes. It accepts values of type <paint>, where a typical value might be a color, gradient, or pattern. When an element has both the stroke attribute and the corresponding CSS stroke property defined, the CSS property takes precedence.

## Applicable Elements
The stroke attribute can be applied to the following SVG elements:
- circle
- ellipse
- line
- path
- polygon
- polyline
- rect
- text
- textPath
- tspan

## Technical Specifications
- Value Type: <paint>
- Default Value: none
- Animatable: Yes

This attribute is part of Scalable Vector Graphics (SVG) 2 specifications and its behavior is defined under the 'Specifying Stroke Paint' section. It supports using SVG paint servers (like gradients or patterns) by referencing them (via url(#id)).

## Usage Examples

### Basic Color Stroke
Example using a simple color:

    <svg viewBox="0 0 20 10" xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="5" r="4" fill="none" stroke="green" />
    </svg>

### Gradient Stroke
Example using a linear gradient:

    <svg viewBox="0 0 20 10" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="myGradient">
          <stop offset="0%" stop-color="green" />
          <stop offset="100%" stop-color="white" />
        </linearGradient>
      </defs>
      <circle cx="15" cy="5" r="4" fill="none" stroke="url(#myGradient)" />
    </svg>

### Contextual Stroke Inheritance
An example illustrating the use of context-stroke and context-fill with markers:

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 90">
      <style>
        path {
          stroke-width: 2px;
          marker: url(#circle);
        }
      </style>
      <path d="M 10 44.64 L 30 10 L 70 10 L 90 44.64 L 70 79.28 L 30 79.28 Z" stroke="red" fill="orange" />
      <path d="M 100 44.64 L 80 10 L 120 10 L 140 44.64 L 120 79.28 L 80 79.28 Z" stroke="green" fill="lightgreen" />
      <path d="M 150 44.64 L 130 10 L 170 10 L 190 44.64 L 170 79.28 L 130 79.28 Z" stroke="blue" fill="lightblue" />
      <marker id="circle" markerWidth="12" markerHeight="12" refX="6" refY="6" markerUnits="userSpaceOnUse">
        <circle cx="6" cy="6" r="3" stroke-width="2" stroke="context-stroke" fill="context-fill" />
      </marker>
    </svg>

## Attribution and Metadata
- Source: MDN Web Docs on SVG stroke attribute
- Retrieved Date: 2023-10-05
- Data Size: 1225068 bytes
- Links Found: 30673


## Attribution
- Source: MDN Web Docs: SVG Styling for Stroke Attributes
- URL: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke
- License: Creative Commons Attribution-ShareAlike License
- Crawl Date: 2025-04-28T18:51:49.809Z
- Data Size: 1225068 bytes
- Links Found: 30673

## Retrieved
2025-04-28
