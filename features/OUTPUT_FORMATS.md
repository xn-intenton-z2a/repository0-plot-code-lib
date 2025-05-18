# Overview

Enhance the existing plot generation feature to support:

- Plot annotations including a chart title, x-axis label, and y-axis label
- Custom line styling with configurable line color and stroke width
- Axis tick customization with configurable tick counts for both axes
- Optional grid lines behind the data series to improve readability
- Retain existing multi-format exports (svg, png, json, csv) and integrate all new metadata seamlessly into both CLI and HTTP modes

# CLI Integration

- Add flags:
  - `--title <string>`: Optional chart title to render at the top of the plot.
  - `--x-label <string>`: Optional label for the horizontal axis.
  - `--y-label <string>`: Optional label for the vertical axis.
  - `--line-color <string>`: Optional CSS color value for the data line (default: black).
  - `--line-width <number>`: Optional stroke width for the data line in pixels (default: 2).
  - `--tick-count <number>`: Optional number of tick divisions on each axis (default: 10).
  - `--grid`: Optional boolean flag to enable grid lines (default: false).
- Retain existing flags: `--format`, `--expression`, `--range`, `--input`, `--input-format`, `--output`, `--serve`, `--port`, and deprecated `--png` alias.
- After parsing args, collect annotation, styling, tick, and grid options and pass them into the rendering helper along with existing dimension and margin settings.
- Examples:
  - npx repository0-plot-code-lib --expression "sin(x)" --range "x=0:6.28:0.1" --format svg --title "Sine Wave" --x-label "Time (s)" --y-label "Amplitude" --line-color "blue" --line-width 3 --tick-count 5 --grid --output wave.svg
  - npx repository0-plot-code-lib --input data.csv --format png --line-color "#FF0000" --tick-count 8 --output plot.png

# HTTP API

- Accept query parameters:
  - `title`: Chart title string.
  - `xLabel`: X-axis label string.
  - `yLabel`: Y-axis label string.
  - `lineColor`: CSS color string for line.
  - `lineWidth`: Numeric string for stroke width.
  - `tickCount`: Numeric string for tick count.
  - `grid`: Boolean string (true/false) to enable grid lines.
  - Existing query params: `expression`, `range`, `input`, `inputFormat`, `format`.
- On GET `/plot`, parse and validate all new parameters. If provided, forward them to the SVG generator.
- Respond with annotated, styled, ticked, and optionally gridded SVG when `format=svg`, or convert and wrap with PNG, JSON, CSV logic as before.

# Implementation

- Extend `parseArgs` in `src/lib/main.js` to include:
  ```js
  title: z.string().optional(),
  xLabel: z.string().optional(),
  yLabel: z.string().optional(),
  lineColor: z.string().optional(),
  lineWidth: z.preprocess(val => typeof val === 'string' ? parseFloat(val) : val, z.number().positive().optional()),
  tickCount: z.preprocess(val => typeof val === 'string' ? parseInt(val, 10) : val, z.number().int().positive().optional()),
  grid: z.preprocess(val => val === '' || val === 'true' ? true : val === 'false' ? false : val, z.boolean().optional()),
  ```
- In `main`, collect parsed.title, parsed.xLabel, parsed.yLabel, parsed.lineColor, parsed.lineWidth, parsed.tickCount, parsed.grid and include them in the options passed to `generateSVG`.
- Update `generateSVG(data, options)` signature to read these new options along with width, height, and margin.
- In SVG output:
  - Compute tick positions based on options.tickCount or default.
  - If options.grid is true, draw light gray lines at each tick position behind axes and polyline.
  - Render axis ticks and optional numeric labels at each tick position.
  - Add annotation text elements when title, xLabel, or yLabel are provided.
  - Use options.lineColor and options.lineWidth for the polyline stroke attributes.
- Ensure layer order: grid lines at bottom, then axes, then polyline, then annotations.

# Tests

- Extend `parseArgs` tests to verify parsing of `--tick-count` and `--grid` flags.
- Add unit tests for `generateSVG` in `tests/unit/plot-generation.test.js`:
  - When tickCount and grid are provided, SVG string contains appropriate `<line>` elements for grid and correct number of tick marks.
  - Verify tick labels appear with correct numeric values when tickCount is provided.
  - Confirm that grid lines and tick labels do not appear when grid is false or tickCount is not provided.
- Extend HTTP API tests in `tests/unit/http-api.test.js`:
  - Request `/plot?expression=x&range=x=0:2&format=svg&tickCount=4&grid=true` returns status 200 with SVG including grid and tick elements.

# Documentation

- Update `README.md` and `USAGE.md` to document the new flags and query parameters, with example invocations for both CLI and HTTP modes.

