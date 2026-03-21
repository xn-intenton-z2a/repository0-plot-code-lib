Normalised extract

This document normalises the semantics of the SVG viewBox attribute: a four-number list (min-x, min-y, width, height) that defines an internal coordinate system and its mapping to the element's viewport. It summarises parsing, units, preserveAspectRatio interaction and common pitfalls when converting between CSS pixels and SVG user units.

Table of contents

- Normalised extract
- Overview & intent
- Syntax and parsing
- Coordinate space and transforms
- Interaction with preserveAspectRatio
- Practical examples
- Supplementary details
- Reference details (API signatures)
- Detailed digest and retrieval
- Attribution

Overview & intent

The viewBox provides a mapping from an SVG's internal coordinate system to its rendered box. It is the primary mechanism for resolution-independent scaling and panning of SVG content.

Syntax and parsing

viewBox = "min-x min-y width height"
- All four components are <number> (floating point allowed).
- width and height must be positive; non-positive values are invalid and typically ignored by user agents.
- Numbers are parsed as XML number tokens (space/comma separated allowed).

Coordinate space and transforms

- The viewBox sets the user coordinate system origin at (min-x, min-y) and scales units so that width/height map to the viewport's width/height before preserveAspectRatio is applied.
- The effective transform = translate(-min-x, -min-y) then scale(sx, sy) where sx = viewportWidth / width, sy = viewportHeight / height.
- Subsequent graphical operators (stroke widths, patterns) are resolved in user units after scaling.

Interaction with preserveAspectRatio

- preserveAspectRatio controls alignment and uniform scaling policy (meet vs slice).
- If preserveAspectRatio indicates uniform scaling, a single scale factor is chosen and translated to align according to the alignment keywords (xMinYMin, xMidYMid, etc.).
- 'none' disables uniform scaling and uses sx and sy independently.

Practical examples

- viewBox="0 0 100 50" on a 200×200 viewport yields sx=2, sy=4; with preserveAspectRatio="xMidYMid meet" it centers and uses scale=2.
- Common mistake: interpreting viewBox values as CSS pixels rather than user units; always compute transform from viewport size.

Supplementary details

- Viewport unit conversions: CSS pixels ↔ device pixels depend on devicePixelRatio; viewBox mapping works in CSS pixel space unless explicit scaling (e.g., width/height in px) changes it.
- Animations that modify viewBox require reflow; some user agents animate via the SVG DOM or SMIL/JS.

Reference details (API signatures)

- SVGElement.getAttribute("viewBox") -> string | null
- SVGSVGElement.viewBox.baseVal -> SVGRect { x, y, width, height }
- SVGSVGElement.preserveAspectRatio.baseVal -> SVGPreserveAspectRatio

Detailed digest (retrieval)

- Retrieval date: 2026-03-21
- Crawl size: 176.4 KB
- Digest: Consolidated extract derived from MDN, W3C SVG 1.1/2 specifications, and Web platform implementation notes.

Attribution

Sources: MDN Web Docs (SVG viewBox), W3C SVG Recommendation, browser implementation notes. Content normalised and condensed for engineering reference.