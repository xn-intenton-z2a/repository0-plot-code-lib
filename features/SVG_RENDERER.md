# SVG_RENDERER

## Summary

Render a series of numeric points to a valid SVG 1.1 document using a polyline element and an appropriate viewBox so the result scales correctly.

## Motivation

SVG is the primary vector output format for plots; SVG output must be deterministic, embeddable and human-inspectable.

## Scope

- Provide renderSVG(points, options) that returns a string containing an SVG 1.1 document.
- The SVG must contain a viewBox attribute and a single polyline element representing the series.

## Requirements

- The returned string must begin with an <svg element and include viewBox="minX minY width height".
- The polyline element must include a points attribute with x,y coordinate pairs separated by spaces and commas as required by SVG.
- Expose a named export renderSVG from src/lib/main.js.

## Acceptance Criteria

- renderSVG called with a non-empty series returns a string that contains "<svg" and a viewBox attribute.
- The returned SVG string contains a "<polyline" element and a "points=" attribute with numeric entries.
- The produced SVG conforms to SVG 1.1 structure (single root svg element, namespace optional but recommended).

## Notes

- Options may include width, height, padding, stroke color and stroke width; polyline should default to stroke visible and fill none.
