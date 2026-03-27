SVG_VIEWBOX

Table of contents
1. Syntax
2. Effect on coordinate system
3. Mapping data coordinates to SVG user coordinates (formulas)
4. Responsive usage and preserveAspectRatio notes
5. Implementation pattern for plotting
6. Supplementary details
7. Reference details
8. Detailed digest
9. Attribution

Normalised extract
Syntax
- viewBox is a four-number list: min-x min-y width height (space- or comma-separated). Example: viewBox="0 0 800 600".

Effect on coordinate system
- The viewBox defines the user coordinate system used by child elements. The attribute maps the specified rectangle in user coordinates into the SVG viewport box.
- Mapping to pixel dimensions is: scaleX = viewportWidth / viewBoxWidth; scaleY = viewportHeight / viewBoxHeight.

Mapping data coordinates to SVG coordinates (recommended pattern)
- Given data domain x in [xMin,xMax] and y in [yMin,yMax] and an SVG viewBox set to (minX=0, minY=0, width=W, height=H), compute:
  - normalizedX = (x - xMin) / (xMax - xMin)
  - pixelX = normalizedX * W
  - normalizedY = (y - yMin) / (yMax - yMin)
  - pixelY = H - (normalizedY * H)   (flip Y because SVG y increases downward)
- If viewBox minY is set to yMin and height is yMax-yMin, then pixel mapping uses (x - minX) directly scaled by scaleX and pixelY uses (y - minY) * scaleY but the y-axis direction must still be accounted for.

Responsive usage and preserveAspectRatio
- viewBox enables responsive scaling. preserveAspectRatio defaults to 'xMidYMid meet'; choose 'none' or 'xMinYMin meet' if different behaviour is required.

Implementation pattern for plotting
- Set svg element: <svg width="Wpx" height="Hpx" viewBox="0 0 W H" xmlns="http://www.w3.org/2000/svg"> and render polyline points using the pixelX/pixelY computed above.

Supplementary details
- Use integer pixel coordinates when possible to reduce anti-aliasing discrepancies; rounding is acceptable.
- Use vector-effect="non-scaling-stroke" when stroke widths must not scale with the viewBox.

Reference details
- viewBox attribute: four numbers min-x, min-y, width, height. The SVG spec defines mapping semantics and interaction with preserveAspectRatio.

Detailed digest
- Source: MDN viewBox reference
- URL: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox
- Retrieved: 2026-03-27
- Data size obtained during crawl: approximately 176 KB

Attribution
- Source: MDN Web Docs (Mozilla). The numeric syntax and mapping formulas above follow the SVG viewBox semantics.