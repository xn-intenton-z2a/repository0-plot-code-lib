# Overview

Enhance the existing plot generation feature to support:

- Plot annotations including a chart title, x-axis label, and y-axis label
- Custom line styling with configurable line color and stroke width

Retain existing multi-format exports (svg, png, json, csv) and integrate annotation and styling metadata seamlessly into both CLI and HTTP modes.

# CLI Integration

- Add flags:
  - `--title <string>`: Optional chart title to render at the top of the plot.
  - `--x-label <string>`: Optional label for the horizontal axis.
  - `--y-label <string>`: Optional label for the vertical axis.
  - `--line-color <string>`: Optional CSS color value for the data line (default: black).
  - `--line-width <number>`: Optional stroke width for the data line in pixels (default: 2).
- Retain existing flags: `--format`, `--expression`, `--range`, `--input`, `--input-format`, `--output`, `--serve`, `--port`, and deprecated `--png` alias.
- After parsing args, collect annotation and styling options (`title`, `xLabel`, `yLabel`, `lineColor`, `lineWidth`) and pass them into the rendering helper along with existing dimension and margin settings.
- Examples:
  - npx repository0-plot-code-lib --expression "sin(x)" --range "x=0:6.28:0.1" --format svg --title "Sine Wave" --x-label "Time (s)" --y-label "Amplitude" --line-color "blue" --line-width 3 --output wave.svg
  - npx repository0-plot-code-lib --input data.csv --format png --line-color "#FF0000" --output plot.png

# HTTP API

- Accept query parameters:
  - `title`: Chart title string.
  - `xLabel`: X-axis label string.
  - `yLabel`: Y-axis label string.
  - `lineColor`: CSS color string for line.
  - `lineWidth`: Numeric string for stroke width.
  - Existing query params: `expression`, `range`, `input`, `inputFormat`, `format`.
- On GET `/plot`, parse and validate annotation and styling params. If provided, forward them to the SVG generator.
- Respond with annotated and styled SVG when `format=svg`, or convert and wrap with PNG, JSON, CSV logic as before.

# Implementation

- Extend `parseArgs` in `src/lib/main.js` to include:
  ```js
  title: z.string().optional(),
  xLabel: z.string().optional(),
  yLabel: z.string().optional(),
  lineColor: z.string().optional(),
  lineWidth: z.preprocess(val => typeof val === 'string' ? parseFloat(val) : val, z.number().positive().optional()),
  ```
- In `main`, after parsing, collect `parsed.title`, `parsed.xLabel`, `parsed.yLabel`, `parsed.lineColor`, `parsed.lineWidth` and include them in the options passed to `generateSVG`.
- Update `generateSVG(data, options)` signature to read these new options along with width, height, and margin.
- In SVG output:
  - If `options.title` present, add a `<text>` element centered at top (y = margin/2) with font-size proportional to margin.
  - If `options.xLabel` present, add a `<text>` element centered below the x-axis.
  - If `options.yLabel` present, add a rotated `<text>` element along the y-axis.
  - Use `options.lineColor` and `options.lineWidth` for the `<polyline>` stroke color and stroke-width attributes.
- Ensure new elements render above axes and polyline.

# Tests

- Extend `parseArgs` tests to verify parsing of `--title`, `--x-label`, `--y-label`, `--line-color`, and `--line-width` flags.
- Add unit tests for `generateSVG` in `tests/unit/plot-generation.test.js`:
  - When title, labels, and styling are provided, SVG string contains `<text>` elements and `<polyline>` has correct stroke and stroke-width attributes.
  - Ensure annotations and styling do not appear when not provided.
- Extend HTTP API tests in `tests/unit/http-api.test.js`:
  - Request `/plot?expression=x&range=x=0:2&format=svg&title=Test&xLabel=X&yLabel=Y&lineColor=red&lineWidth=5` returns status 200 with `Content-Type: image/svg+xml` and SVG including annotation and styling tags.

# Documentation

- Update `README.md` and `USAGE.md` to include the new flags and query parameters, with example invocations for both CLI and HTTP modes.
