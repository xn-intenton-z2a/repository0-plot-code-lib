SVG_SPEC

TABLE OF CONTENTS:
1. svg root element and required namespace
2. viewBox syntax and coordinate mapping
3. preserveAspectRatio and scaling behavior
4. Units, width/height, and viewport mapping
5. Polyline rendering implications for plotting
6. Reference details (exact syntax and attribute meanings)
7. Detailed digest and retrieval metadata

NORMALISED EXTRACT:
- Root element: svg must include the XML namespace attribute: xmlns="http://www.w3.org/2000/svg". A minimal valid SVG 1.1 root: <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="minX minY width height" width="..." height="..."> ... </svg>
- viewBox attribute: four numbers "min-x min-y width height"; it defines the user coordinate system mapped into the viewport. Example: viewBox="0 0 800 600".
- Coordinate mapping: to map a user-space point (ux, uy) into viewport pixel coordinates (vx, vy) when viewport size is vw x vh and viewBox is (minX, minY, vbW, vbH): scaleX = vw / vbW; scaleY = vh / vbH; if preserveAspectRatio uses "meet" then a uniform scale = min(scaleX, scaleY) is chosen and alignment applied per preserveAspectRatio.
- preserveAspectRatio default is "xMidYMid meet". "meet" preserves aspect ratio and fit within viewport; "slice" preserves aspect ratio but slices to fill viewport.
- width and height may be absolute lengths or percentages; when omitted the viewBox can dictate intrinsic sizing in many renderers, but explicit width/height recommended for file output.

SUPPLEMENTARY DETAILS:
- For plotting with polyline: supply coordinates in user space that match the viewBox coordinate system; polyline uses points="x1,y1 x2,y2 ..." where each pair is in user units.
- Set viewBox so that y increases upwards in user coordinates if you prefer mathematical plotting (SVG’s default y increases downwards in screen pixels); to invert Y use viewBox that maps higher user Y to lower device Y or transform with scale(1,-1) and translate.
- Ensure the SVG root includes width/height or consumers may render with default sizing. Use viewBox and explicit width/height to create deterministic output sizes for PNG rasterization.

REFERENCE DETAILS (exact attribute syntax and semantics):
- viewBox: "min-x min-y width height" — four <number> tokens separated by whitespace and/or comma per the spec.
- xmlns attribute: xmlns="http://www.w3.org/2000/svg"
- preserveAspectRatio: <align> [<meetOrSlice>] where <align> is one of xMinYMin | xMidYMin | xMaxYMin | xMinYMid | xMidYMid | xMaxYMid | xMinYMax | xMidYMax | xMaxYMax and <meetOrSlice> is meet | slice. Default: xMidYMid meet.
- polyline: points attribute: a list of coordinate pairs: "x1,y1 x2,y2 ..."; stroke and fill attributes control visibility; typical plotting uses stroke="black" fill="none".

DETAILED DIGEST (extracted/normalised from SVG 1.1 Recommendation, retrieved 2026-03-20):
- SVG is XML-based; the viewBox defines a user coordinate system for drawing. For programmatic plot generation set viewBox, supply polyline points in that coordinate system, and provide explicit width/height to ensure consistent rasterized output.

ATTRIBUTION:
Primary spec: https://www.w3.org/TR/2003/REC-SVG11-20030114/ — retrieved 2026-03-20. Data size fetched during crawl: 18095 bytes.
Supplementary MDN reference: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg
