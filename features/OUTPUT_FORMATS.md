# Overview

Enhance the existing output generation feature to support plot annotations including a chart title, x-axis label, and y-axis label in both CLI and HTTP modes. Retain existing multi-format exports (svg, png, json, csv) and integrate annotation metadata seamlessly.

# CLI Integration

- Add flags:
  - `--title <string>`: Optional chart title to render at the top of the plot.
  - `--x-label <string>`: Optional label for the horizontal axis.
  - `--y-label <string>`: Optional label for the vertical axis.
- Retain and document existing flags: `--format`, `--expression`, `--range`, `--input`, `--input-format`, `--output`, `--serve`, `--port`, and deprecated `--png` alias.
- After parsing args, collect annotation options (`title`, `xLabel`, `yLabel`) and pass them into the rendering helper along with existing dimension and margin settings.
- Examples:
  - `npx repository0-plot-code-lib --expression "sin(x)" --range "x=0:6.28:0.1" --format svg --title "Sine Wave" --x-label "Time (s)" --y-label "Amplitude" --output wave.svg`
  - `npx repository0-plot-code-lib --input data.csv --format png --title "Sample Data" --output plot.png`

# HTTP API

- Accept query parameters:
  - `title`: Chart title string.
  - `xLabel`: X-axis label string.
  - `yLabel`: Y-axis label string.
  - Existing query params: `expression`, `range`, `input`, `inputFormat`, `format`.
- On GET `/plot`, parse and validate annotation params. If provided, forward to SVG generator.
- Respond with annotated SVG when `format=svg`, or convert and wrap with PNG, JSON, CSV logic as before.

# Implementation

- Extend `parseArgs` in `src/lib/main.js` to include:
  ```js
  title: z.string().optional(),
  xLabel: z.string().optional(),
  yLabel: z.string().optional(),
  ```
- In `main`, after parsing, collect `parsed.title`, `parsed.xLabel`, `parsed.yLabel` and include them in the options passed to `generateSVG`.
- Update `generateSVG(data, options)` signature to read `options.title`, `options.xLabel`, `options.yLabel`, along with width, height, margin.
- In SVG output:
  - If `options.title` present, add a `<text>` element centered at top (y = margin/2) with font-size proportional to margin.
  - If `options.xLabel` present, add a `<text>` element centered below the x-axis with appropriate positioning.
  - If `options.yLabel` present, add a rotated `<text>` element along the y-axis with appropriate transform.
- Ensure annotation elements render above axes and polyline.

# Tests

- Extend `parseArgs` tests to verify parsing of `--title`, `--x-label`, and `--y-label` flags.
- Add unit tests for `generateSVG` in `tests/unit/plot-generation.test.js`:
  - When title and labels are provided, SVG string contains `<text>` elements with correct content and attributes.
  - Ensure annotations do not appear when not provided.
- Extend HTTP API tests in `tests/unit/http-api.test.js`:
  - Request `/plot?expression=x&range=x=0:2&format=svg&title=Test&xLabel=X&yLabel=Y` returns status 200 with `Content-Type: image/svg+xml` and SVG including annotation tags.

# Documentation

- Update `README.md` and `USAGE.md` to include the new flags and query parameters, with example invocations for both CLI and HTTP modes.
