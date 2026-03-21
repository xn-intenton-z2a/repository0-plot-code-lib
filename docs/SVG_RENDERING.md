# SVG Rendering

The library renders series data to SVG 1.1 using a single `<polyline>` element.

- The root `<svg>` element includes a `viewBox` attribute and explicit `width`/`height` attributes.
- The `<polyline>`'s `points` attribute contains one `x,y` coordinate pair for each input point in the series.

This structure makes it easy to verify output in tests by searching for the `'<polyline'` substring and the `viewBox=` attribute.
