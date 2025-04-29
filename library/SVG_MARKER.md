# SVG_MARKER

## Crawl Summary
The crawled content includes multiple SVG markup examples demonstrating the <marker> element for arrowheads and polymarkers. Key details include exact attribute definitions: markerHeight (<length>, default 3), markerUnits (userSpaceOnUse | strokeWidth, default strokeWidth), markerWidth (<length>, default 3), orient (auto, auto-start-reverse, or angle, default 0), preserveAspectRatio (default xMidYMid meet), refX and refY (reference positions, default 0), and viewBox (list-of-numbers). Examples include usage on lines, curves, polylines and context-based markers with context-fill and context-stroke. The content provides both complete code examples and attribute specifications as required for direct implementation.

## Normalised Extract
Table of Contents:
1. Marker Definition and Examples
2. Attribute Specifications
3. Implementation Patterns
4. Context-Based Markers

1. Marker Definition and Examples:
- Arrowhead marker definition with id 'arrow'. Uses viewBox '0 0 10 10', refX '5', refY '5', markerWidth '6', markerHeight '6', orient 'auto-start-reverse'.
- Code example attaches marker-end='url(#arrow)' to line and markers on path with marker-start, marker-mid, marker-end.

2. Attribute Specifications:
- markerHeight: <length>, default 3, animatable.
- markerUnits: userSpaceOnUse | strokeWidth, default strokeWidth, animatable.
- markerWidth: <length>, default 3, animatable.
- orient: auto | auto-start-reverse | <angle>, default 0, animatable.
- preserveAspectRatio: options (none, xMinYMin, xMidYMin, xMaxYMin, xMinYMid, xMidYMid, xMaxYMid, xMinYMax, xMidYMax, xMaxYMax) with meet or slice; default xMidYMid meet, animatable.
- refX: coordinate with default 0, animatable.
- refY: coordinate with default 0, animatable.
- viewBox: <list-of-numbers>, default none, animatable.

3. Implementation Patterns:
- Define marker in <defs> and reference using URL syntax (marker-end, marker-start, marker-mid).
- Use separate markers for different visual effects (arrow, dot).
- Embed style to set default marker usage using CSS (e.g. marker: url(#circle)).

4. Context-Based Markers:
- Marker uses context-fill and context-stroke to inherit parent element styles. Code shows a marker with a circle, using markerUnits='strokeWidth'.

## Supplementary Details
Exact Parameter Values:
- markerHeight: Type <length>, Default: 3, Animatable: yes.
- markerWidth: Type <length>, Default: 3, Animatable: yes.
- markerUnits: Accepts 'userSpaceOnUse' or 'strokeWidth', Default: strokeWidth.
- orient: Accepts 'auto', 'auto-start-reverse', or an explicit angle (e.g. '45deg'), Default: 0.
- preserveAspectRatio: Accepts values such as 'xMidYMid meet' (default) or alternatives like 'slice'.
- refX and refY: Accept coordinate values; Default: 0.
- viewBox: Must be provided as a list of numbers (e.g. '0 0 10 10').

Implementation Steps:
1. Define the marker in <defs> with required attributes.
2. Use the marker on a target shape by adding marker-start, marker-mid, or marker-end attributes with value url(#markerID).
3. For context-based markers, set markerUnits to 'strokeWidth' and use 'context-stroke' and 'context-fill' on the marker shape.

Configuration Options and Effects:
- Changing markerWidth/markerHeight will resize the marker graphic.
- The 'orient' attribute controls the rotation relative to the path direction.
- Using 'userSpaceOnUse' for markerUnits utilizes the coordinate system of the SVG, while 'strokeWidth' scales the marker based on the stroke width.

## Reference Details
API Specifications and Code Patterns:
1. Marker Element Definition:
   <marker id="markerID" viewBox="0 0 width height" refX="refXValue" refY="refYValue" markerWidth="markerWidthValue" markerHeight="markerHeightValue" orient="orientationValue" markerUnits="unitValue">
     ... marker contents (e.g. <path d="..." /> or <circle cx="..." cy="..." r="..."/>) ...
   </marker>

Parameters:
- id: string identifier for marker.
- viewBox: string of numbers defining the viewport (e.g. '0 0 10 10').
- refX, refY: Numeric or keyword values indicating the reference point (default 0).
- markerWidth, markerHeight: <length> values (e.g. '6', '3') with default 3.
- orient: Accepts 'auto', 'auto-start-reverse', or an angle (e.g., '45').
- markerUnits: Either 'userSpaceOnUse' or 'strokeWidth' (default: strokeWidth).
- preserveAspectRatio: Optional override, Default: 'xMidYMid meet'.

2. Full Code Example:
   // Arrowhead Marker Example
   <svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
     <defs>
       <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
         <path d="M 0 0 L 10 5 L 0 10 z" />
       </marker>
     </defs>
     <line x1="10" y1="10" x2="90" y2="90" stroke="black" marker-end="url(#arrow)" />
   </svg>

3. Best Practices:
   - Define markers in <defs> for reuse.
   - Use consistent viewBox settings to maintain scaling.
   - Leverage markerUnits='strokeWidth' to automatically scale with stroke.
   - Test markers across browsers to ensure compatibility (supported since January 2020).

4. Troubleshooting Procedures:
   - Verify marker ID references in URL syntax: marker-end="url(#arrow)".
   - Check attribute values in browser developer tools to ensure SVG rendering.
   - Experiment by adjusting markerWidth and markerHeight values if the marker appears too small or large.
   - Validate the SVG markup with an SVG validator to check for attribute errors.
   - For unexpected rotation, adjust the orient attribute (e.g. try explicit angles).

Return Types: The SVG does not return values; it renders directly in the browser environment.
Exceptions: Improper attribute values may result in incorrect rendering but do not throw runtime exceptions.

## Information Dense Extract
SVG <marker> element; Attributes: markerHeight (<length>, default 3, animatable), markerWidth (<length>, default 3, animatable), markerUnits (userSpaceOnUse|strokeWidth, default strokeWidth), orient (auto|auto-start-reverse|<angle>, default 0), preserveAspectRatio (default xMidYMid meet), refX (default 0), refY (default 0), viewBox (<list-of-numbers>, default none); Code examples: marker definition in <defs> with id, viewBox, refX/refY, markerWidth/markerHeight, orient; Usage: marker-start, marker-mid, marker-end using url(#id); Context markers use context-stroke and context-fill; Implementation steps: define marker, attach by URL, adjust attributes for scaling and orientation; Troubleshooting: check URL references, attribute correctness, use SVG validators.

## Sanitised Extract
Table of Contents:
1. Marker Definition and Examples
2. Attribute Specifications
3. Implementation Patterns
4. Context-Based Markers

1. Marker Definition and Examples:
- Arrowhead marker definition with id 'arrow'. Uses viewBox '0 0 10 10', refX '5', refY '5', markerWidth '6', markerHeight '6', orient 'auto-start-reverse'.
- Code example attaches marker-end='url(#arrow)' to line and markers on path with marker-start, marker-mid, marker-end.

2. Attribute Specifications:
- markerHeight: <length>, default 3, animatable.
- markerUnits: userSpaceOnUse | strokeWidth, default strokeWidth, animatable.
- markerWidth: <length>, default 3, animatable.
- orient: auto | auto-start-reverse | <angle>, default 0, animatable.
- preserveAspectRatio: options (none, xMinYMin, xMidYMin, xMaxYMin, xMinYMid, xMidYMid, xMaxYMid, xMinYMax, xMidYMax, xMaxYMax) with meet or slice; default xMidYMid meet, animatable.
- refX: coordinate with default 0, animatable.
- refY: coordinate with default 0, animatable.
- viewBox: <list-of-numbers>, default none, animatable.

3. Implementation Patterns:
- Define marker in <defs> and reference using URL syntax (marker-end, marker-start, marker-mid).
- Use separate markers for different visual effects (arrow, dot).
- Embed style to set default marker usage using CSS (e.g. marker: url(#circle)).

4. Context-Based Markers:
- Marker uses context-fill and context-stroke to inherit parent element styles. Code shows a marker with a circle, using markerUnits='strokeWidth'.

## Original Source
MDN SVG Marker Element Documentation
https://developer.mozilla.org/en-US/docs/Web/SVG/Element/marker

## Digest of SVG_MARKER

# SVG MARKER

## Overview
The SVG <marker> element is used to define graphics for drawing arrowheads or polymarkers which can be attached to paths, lines, polylines, and polygons. It supports multiple attributes and usage patterns which can be directly implemented in SVG documents.

## Code Examples

Example 1: Arrowhead Marker
--------------------------------
<html>
  <head>
    <style>
      html, body, svg { height: 100%; }
    </style>
  </head>
  <body>
    <svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- A marker to be used as an arrowhead -->
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>

      <!-- A line with a marker -->
      <line x1="10" y1="10" x2="90" y2="90" stroke="black" marker-end="url(#arrow)" />
    </svg>
  </body>
</html>

Example 2: Curved Path with Multiple Markers
------------------------------------------------
<html>
  <svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" />
      </marker>
    </defs>

    <path d="M 110 10 C 120 20, 130 20, 140 10 C 150 0, 160 0, 170 10 C 180 20, 190 20, 200 10" stroke="black" fill="none" marker-start="url(#arrow)" marker-mid="url(#arrow)" marker-end="url(#arrow)" />
  </svg>
</html>

Example 3: Polymarkers with Arrow and Dot
------------------------------------------------
<html>
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" />
      </marker>
      <marker id="dot" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5">
        <circle cx="5" cy="5" r="5" fill="red" />
      </marker>
    </defs>

    <polyline points="10,10 10,90 90,90" fill="none" stroke="black" marker-start="url(#arrow)" marker-end="url(#arrow)" />
    <polyline points="15,80 29,50 43,60 57,30 71,40 85,15" fill="none" stroke="grey" marker-start="url(#dot)" marker-mid="url(#dot)" marker-end="url(#dot)" />
  </svg>
</html>

Example 4: Using context-fill and context-stroke
------------------------------------------------------
<html>
  <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="circle" markerWidth="6" markerHeight="6" refX="3" refY="3" markerUnits="strokeWidth">
        <circle cx="3" cy="3" r="2" stroke="context-stroke" fill="context-fill" />
      </marker>
    </defs>

    <style>
      path {
        marker: url(#circle);
      }
    </style>

    <path d="M 10,10 30,10 h 10" stroke="black" />
    <path d="M 10,20 30,20 h 10" stroke="blue" fill="red" />
    <path d="M 10,30 30,30 h 10" stroke="red" fill="none" />
    <path d="M 10,40 30,40 h 10" stroke="gray" fill="blue" stroke-width="1.5" />
  </svg>
</html>

## Attributes

markerHeight: Defines the height of the marker viewport. Value type: <length>; Default: 3; Animatable: yes.
markerUnits: Coordinate system for markerWidth, markerHeight and contents. Value type: userSpaceOnUse | strokeWidth; Default: strokeWidth; Animatable: yes.
markerWidth: Defines the width of the marker viewport. Value type: <length>; Default: 3; Animatable: yes.
orient: Orientation relative to the shape. Value type: auto | auto-start-reverse | <angle>; Default: 0; Animatable: yes.
preserveAspectRatio: Defines how the SVG fragment adjusts to container aspect ratio. Value types: none, xMinYMin, xMidYMin, xMaxYMin, xMinYMid, xMidYMid, xMaxYMid, xMinYMax, xMidYMax, xMaxYMax with meet or slice options; Default: xMidYMid meet; Animatable: yes.
refX: X coordinate for the marker reference point. Value type: left, center, right, or <coordinate>; Default: 0; Animatable: yes.
refY: Y coordinate for the reference point. Value type: top, center, bottom, or <coordinate>; Default: 0; Animatable: yes.
viewBox: Defines SVG viewport bounds. Value type: <list-of-numbers>; Default: none; Animatable: yes.

## Usage
Markers are attached via marker-start, marker-mid, and marker-end on SVG shape elements. These examples provide a complete implementation pattern that developers can copy and modify directly.

## Metadata
Retrieved: 2023-10-05
Data Size: 1431126 bytes
Links Found: 35317

## Attribution
- Source: MDN SVG Marker Element Documentation
- URL: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/marker
- License: CC BY-SA
- Crawl Date: 2025-04-29T03:53:24.737Z
- Data Size: 1431126 bytes
- Links Found: 35317

## Retrieved
2025-04-29
