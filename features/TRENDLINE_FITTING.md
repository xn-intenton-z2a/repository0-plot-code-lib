# Overview
Add a new `trendline` subcommand that computes linear regression statistics (slope, intercept, and coefficient of determination R²) for a data series and, when requested, overlays the fitted trendline on the plot. This feature addresses analytical use cases by providing both numeric regression outputs and visual trend insights.

# CLI Flags
- `--trendline-stats <true|false>`  Boolean flag to compute and print slope, intercept, and R² for the primary data series. Must be true or false; defaults to false when omitted.
- `--overlay-trendline <true|false>`  Boolean flag to include the fitted trendline as a second series on the output plot. Must be true or false; defaults to false when omitted.
- When `--trendline-stats` is true, the CLI writes regression metrics to standard output. When `--overlay-trendline` is true, the plot includes the trendline beneath or alongside the original data series.
- The two flags may be used independently or together; if both are false or omitted, no regression is performed.

# Implementation
1. Schema and Argument Parsing
   1. In `src/lib/main.js`, extend `cliSchema` to accept optional string fields:
      - `trendline-stats`: must match `^(true|false)$`
      - `overlay-trendline`: must match `^(true|false)$`
   2. In `parseArgs`, convert them to booleans:
      ```js
      const statsFlag = parsedArgs['trendline-stats'] === 'true';
      const overlayFlag = parsedArgs['overlay-trendline'] === 'true';
      ```

2. Regression Computation
   1. After generating or importing the primary data series as an array of points `{x, y}`, if `statsFlag` or `overlayFlag` is true:
      - Compute linear regression using least squares:
        • `slope  = (Σ(xy) - N·x̄·ȳ) / (Σ(x²) - N·x̄²)`
        • `intercept = ȳ - slope·x̄`
      - Compute R² (coefficient of determination):
        • Total sum of squares: `SStot = Σ(y - ȳ)²`
        • Residual sum of squares: `SSres = Σ(y - (slope·x + intercept))²`
        • `R² = 1 - SSres / SStot`
   2. If `statsFlag` is true, print metrics with two decimal places:
      ```text
      slope: <value>
      intercept: <value>
      r2: <value>
      ```
      Then exit with code 0; no plot is generated unless `overlayFlag` is also true.

3. Overlay Trendline on Plot
   1. When `overlayFlag` is true:
      - Generate a trendline data series by evaluating the model at each original x-value: `{ x, y: slope·x + intercept }`.
      - Build a series array:
        • `{ label: 'original', points: originalPoints }`
        • `{ label: 'trendline', points: trendlinePoints }`
      - Pass this series array to `generateSVG` for rendering.
      - Preserve existing color palette, ensuring the trendline uses a distinct stroke style or color.

4. Programmatic API Support
   1. Extend `generatePlot` schema to accept optional boolean fields `trendlineStats` and `overlayTrendline`.
   2. In `generatePlot()`, perform the same regression calculation and:
      - If `trendlineStats` is true, return an additional property `stats: { slope, intercept, r2 }` on the result object.
      - If `overlayTrendline` is true, include the trendline series in the returned SVG or PNG.

# Testing
- Create tests/unit/trendline-fitting.test.js:
  • **Regression Calculation**: For a known dataset (e.g., y=2x+1 over x=0..2), verify computed slope=2.00, intercept=1.00, r2=1.00.
  • **CLI Stats Output**: Run `main()` with `--expression 'y=2*x+1' --range 'x=0:2' --format svg --output out.svg --trendline-stats true` and capture stdout, asserting printed metrics match expected values and no file is written.
  • **CLI Overlay**: Run with `--overlay-trendline true` and verify the output SVG contains two `<polyline>` elements and a legend entry for `trendline`.
  • **Combined Flags**: Run with both flags true, capture stdout and inspect the written plot file for overlay.
  • **Programmatic API**: Call `generatePlot({ expression, range, format:'svg', trendlineStats:true })` and assert returned object includes a `stats` property. Call with `overlayTrendline:true` and assert SVG contains trendline.
  • **Error Cases**: Invalid flag values should trigger schema validation errors and exit with code 1.

# Documentation
- Update `USAGE.md` and `README.md`:
  • Document `--trendline-stats` and `--overlay-trendline` flags with examples:
    repository0-plot-code-lib --expression 'y=x*2+1' --range 'x=0:5' --trendline-stats true
    repository0-plot-code-lib --expression 'y=x' --range 'x=0:5' --overlay-trendline true --format svg --output plot.svg
  • Show sample output snippet of printed metrics and an SVG snippet with the trendline overlay.
