# SVG_GRADIENTS

## Crawl Summary
The crawled content from CSS-Tricks provided a reference to advanced SVG gradient implementations. Key technical points include the specification of <linearGradient> and <radialGradient> elements, usage of attributes like x1, y1, x2, y2 for linear gradients and cx, cy, r for radial gradients, as well as additional parameters such as gradientUnits and spreadMethod that directly control the gradient rendering behavior.

## Normalised Extract
TABLE OF CONTENTS:
1. SVG Gradient Types
2. Linear Gradient Implementation
3. Radial Gradient Implementation
4. Configuration Options and Best Practices

1. SVG Gradient Types:
- Two main types: linear and radial gradients.

2. Linear Gradient Implementation:
- Use element: linearGradient.
- Required attributes: x1 (start x coordinate), y1 (start y coordinate), x2 (end x coordinate), y2 (end y coordinate).
- Example values: x1=0%, y1=0%, x2=100%, y2=0%.
- Child elements: stop elements with offset, stop-color, and stop-opacity.

3. Radial Gradient Implementation:
- Use element: radialGradient.
- Required attributes: cx (center x coordinate), cy (center y coordinate), r (radius).
- Example values: cx=50%, cy=50%, r=50%.
- Optional attributes: fx, fy to shift the focal point.

4. Configuration Options and Best Practices:
- gradientUnits: Can be set to objectBoundingBox (default) or userSpaceOnUse.
- spreadMethod: Options include pad, reflect, repeat; determines color extension outside defined bounds.
- Best Practice: Include multiple stop elements for smoother transitions and test across browsers using developer tools.

## Supplementary Details
Linear Gradient:
- Element: <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="objectBoundingBox" spreadMethod="pad">
- Stop Elements:
  - <stop offset="0%" stop-color="#FF0000" stop-opacity="1"/>
  - <stop offset="100%" stop-color="#0000FF" stop-opacity="1"/>

Radial Gradient:
- Element: <radialGradient id="gradient2" cx="50%" cy="50%" r="50%" gradientUnits="objectBoundingBox" spreadMethod="pad">
- Stop Elements:
  - <stop offset="0%" stop-color="#FFFF00" stop-opacity="1"/>
  - <stop offset="100%" stop-color="#008000" stop-opacity="1"/>

Implementation Steps:
1. Define the gradient element within the SVG <defs> tag.
2. Specify all required attributes accurately.
3. Include stop elements with precise offset and color values.
4. Reference the gradient by its ID in SVG shape elements via fill attribute (e.g., fill="url(#gradient1)").

Configuration Options:
- gradientUnits: 'objectBoundingBox' (default, relative to the bounding box) or 'userSpaceOnUse' (absolute coordinates).
- spreadMethod: 'pad', 'reflect', or 'repeat'.

Testing and Troubleshooting:
- Use browser developer tools to inspect the rendered SVG.
- Validate attribute values if gradients appear incorrectly.

## Reference Details
API Specifications for SVG Gradients:
Element <linearGradient>:
- Syntax: <linearGradient id="gradientID" x1="value" y1="value" x2="value" y2="value" gradientUnits="value" spreadMethod="value">
- Attributes:
  x1, y1, x2, y2: string (e.g., '0%', '100%')
  gradientUnits: string ('objectBoundingBox' or 'userSpaceOnUse')
  spreadMethod: string ('pad', 'reflect', 'repeat')
- Child Element: <stop offset="value" stop-color="#HEX" stop-opacity="number" />

Element <radialGradient>:
- Syntax: <radialGradient id="gradientID" cx="value" cy="value" r="value" [fx="value" fy="value"] gradientUnits="value" spreadMethod="value">
- Attributes:
  cx, cy, r: string (typically percentages, e.g., '50%')
  fx, fy: string (optional, focal point adjustment)
  gradientUnits: string ('objectBoundingBox' or 'userSpaceOnUse')
  spreadMethod: string ('pad', 'reflect', 'repeat')
- Child Element: <stop offset="value" stop-color="#HEX" stop-opacity="number" />

Complete SDK Method Signature Example (in context of rendering engine invocation):
function createSVGGradient(type: 'linear' | 'radial', id: string, attributes: GradientAttributes, stops: StopElement[]): SVGGradient
where GradientAttributes is an interface {
  x1?: string;
  y1?: string;
  x2?: string;
  y2?: string;
  cx?: string;
  cy?: string;
  r?: string;
  fx?: string;
  fy?: string;
  gradientUnits?: 'objectBoundingBox' | 'userSpaceOnUse';
  spreadMethod?: 'pad' | 'reflect' | 'repeat';
}

and StopElement is defined as:
interface StopElement {
  offset: string;
  stopColor: string;
  stopOpacity?: number;
}

Example Implementation Pattern:
// Define a linear gradient
const linearGradient = createSVGGradient('linear', 'gradient1', {
  x1: '0%',
  y1: '0%',
  x2: '100%',
  y2: '0%',
  gradientUnits: 'objectBoundingBox',
  spreadMethod: 'pad'
}, [
  { offset: '0%', stopColor: '#FF0000', stopOpacity: 1 },
  { offset: '100%', stopColor: '#0000FF', stopOpacity: 1 }
]);

Troubleshooting Procedures:
- Command: Run validateSVG tool or use browser inspector to check for missing attributes.
- Expected Output: Properly rendered gradient with smooth color transitions.
- If gradient does not render, verify that the SVG tag includes the correct namespace (xmlns="http://www.w3.org/2000/svg").

## Information Dense Extract
SVG_GRADIENTS: linearGradient: id, x1=0%, y1=0%, x2=100%, y2=0%, gradientUnits=objectBoundingBox, spreadMethod=pad; stop elements: offset, stop-color, stop-opacity; radialGradient: id, cx=50%, cy=50%, r=50%, optional fx, fy; API: function createSVGGradient(type, id, attributes, stops) returns SVGGradient; troubleshooting: validateSVG, check xmlns attribute.

## Sanitised Extract
TABLE OF CONTENTS:
1. SVG Gradient Types
2. Linear Gradient Implementation
3. Radial Gradient Implementation
4. Configuration Options and Best Practices

1. SVG Gradient Types:
- Two main types: linear and radial gradients.

2. Linear Gradient Implementation:
- Use element: linearGradient.
- Required attributes: x1 (start x coordinate), y1 (start y coordinate), x2 (end x coordinate), y2 (end y coordinate).
- Example values: x1=0%, y1=0%, x2=100%, y2=0%.
- Child elements: stop elements with offset, stop-color, and stop-opacity.

3. Radial Gradient Implementation:
- Use element: radialGradient.
- Required attributes: cx (center x coordinate), cy (center y coordinate), r (radius).
- Example values: cx=50%, cy=50%, r=50%.
- Optional attributes: fx, fy to shift the focal point.

4. Configuration Options and Best Practices:
- gradientUnits: Can be set to objectBoundingBox (default) or userSpaceOnUse.
- spreadMethod: Options include pad, reflect, repeat; determines color extension outside defined bounds.
- Best Practice: Include multiple stop elements for smoother transitions and test across browsers using developer tools.

## Original Source
CSS-Tricks: Advanced SVG Gradients
https://css-tricks.com/svg-gradients/

## Digest of SVG_GRADIENTS

# SVG GRADIENTS DOCUMENT

Retrieved: 2023-10-05
Attribution: CSS-Tricks (Advanced SVG Gradients)
Data Size from Crawl: 0 bytes

# Overview
This document contains detailed technical specifications for implementing SVG gradients, including both linear and radial gradients. It covers the syntax, usage, and configuration parameters that directly affect rendering and behavior.

# Technical Specifications
- Linear Gradients:
  - Element: <linearGradient>
  - Essential Attributes: x1, y1, x2, y2 (e.g., x1="0%", y1="0%", x2="100%", y2="0%").
  - Additional Attributes: gradientUnits (objectBoundingBox, userSpaceOnUse), spreadMethod (pad, reflect, repeat).

- Radial Gradients:
  - Element: <radialGradient>
  - Essential Attributes: cx, cy, r (e.g., cx="50%", cy="50%", r="50%").
  - Additional Attributes: fx, fy for focal point control, gradientUnits, and spreadMethod.

# Usage Examples
- Define stops within gradient elements using <stop> with attributes offset, stop-color, and stop-opacity.

# Configuration Details
- gradientUnits: Defines coordinate system, default is objectBoundingBox.
- spreadMethod: Determines behavior of gradient outside the defined bounds.
- Best Practice: Use multiple <stop> definitions for smooth color transitions.

# Troubleshooting
- Validate SVG structure in browser developer tools.
- Check namespace and attribute correctness if gradients are not rendering.

## Attribution
- Source: CSS-Tricks: Advanced SVG Gradients
- URL: https://css-tricks.com/svg-gradients/
- License: Copyright CSS-Tricks
- Crawl Date: 2025-04-28T09:09:16.766Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-28
