# AXES_RENDERER

Summary

Add optional axes and tick rendering for plots so SVG outputs can include clearly identifiable X and Y axes, optional tick marks, and minimal label support. This feature is an augmentation to the existing SVG renderer that remains dependency-free and deterministic for unit testing.

Scope

- Extend the public renderSVG API to accept options showAxes (boolean), showTicks (boolean), tickCount (integer), and axisStyle (object with stroke and strokeWidth) or expose a small helper computeAxisPositions that returns computed axis and tick coordinates for unit tests.
- Axes must be rendered as a grouped element with id axes and include two line elements with classes axis-x and axis-y so tests can locate them reliably.
- Tick marks must be rendered as small line elements with classes tick-x and tick-y and be produced when showTicks is true. Labels are optional; if implemented they must be plain text elements with class axis-label and have predictable content when a label option is provided.
- Behaviour must be deterministic: axis position logic should draw axes at the data origin (0) when 0 is within the data domain, otherwise at the corresponding boundary (min or max) so tests can assert expected coordinates for typical input ranges.

Acceptance criteria

- Calling renderSVG with a data series and options showAxes:true returns an SVG string containing a group element with id="axes" and two line elements with classes axis-x and axis-y.
- When showTicks:true and tickCount is provided, the returned SVG contains at least tickCount elements with class="tick-x" and at least tickCount elements with class="tick-y".
- The helper computeAxisPositions(series, viewBox, options) is a named export and returns a plain object { xAxis, yAxis, xTicks, yTicks } where xAxis and yAxis are numeric positions and xTicks/yTicks are arrays of numeric positions; for a sample sine series over -3.14:0.01:3.14 computeAxisPositions returns xTicks.length equal to the requested tickCount when tickCount is provided.
- The produced SVG remains valid SVG 1.1 and still contains a viewBox and the primary polyline element; adding axes does not remove existing required elements.

Implementation notes

- Keep construction string-based and dependency-free so renderSVG remains usable in minimal environments and easy to unit test via string inspection.
- Axis placement should use the same coordinate mapping used by the polyline so coordinates are consistent; expose computeAxisPositions to unit tests to avoid brittle string parsing.
- Default tickCount should be 5 and tick length should be configurable via options.tickLength; choose visually small defaults so ticks do not overlap the polyline.
- Avoid adding complex text layout for labels; any label support should be very small and optional to keep the renderer simple.

Tests

- Unit test that renderSVG(sampleSeries, { showAxes: true }) returns a string containing id="axes" and classes axis-x and axis-y.
- Unit test that renderSVG(sampleSeries, { showAxes: true, showTicks: true, tickCount: 5 }) returns a string containing at least five occurrences of class="tick-x" and at least five occurrences of class="tick-y".
- Unit test that computeAxisPositions for a known series and viewBox with tickCount:5 returns xTicks and yTicks arrays of length 5 and that xAxis and yAxis are numeric values inside the viewBox numeric range.
- Integration-style unit test that adds axes to the SVG and asserts the polyline and viewBox are still present and unchanged in coordinate mapping.

# END
