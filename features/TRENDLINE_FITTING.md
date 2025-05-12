# Overview
Add the ability to compute and overlay a regression trendline (linear or polynomial) on top of the plotted data series. Users can choose between linear and polynomial fits and specify the polynomial degree. The trendline will be rendered alongside the original data with a distinct color and labeled in the legend.

# CLI Flags
- `--trendline <type>`: Specify the type of trendline to overlay. Supported values: `linear`, `polynomial`. Defaults to no trendline when omitted.
- `--trendline-degree <integer>`: Degree of the polynomial fit when `--trendline polynomial` is selected. Must be a positive integer. Defaults to 2.

# Implementation
1. **Schema and Argument Parsing**
   - In `cliSchema` (src/lib/main.js), add optional fields:
     • `trendline`: z.string().refine(val => ["linear","polynomial"].includes(val), 'trendline must be linear or polynomial').optional()
     • `trendline-degree`: z.string().regex(/^\d+$/, 'trendline-degree must be a positive integer').optional()
   - In `parseArgs`, detect the new flags and convert:
     • `trendlineType = parsedArgs.trendline` or undefined
     • `trendlineDegree = parsedArgs["trendline-degree"] ? Number(parsedArgs["trendline-degree"]) : 2`

2. **Data Generation and Fit Computation**
   - After loading or generating the primary data series (`points`), if `trendlineType` is set:
     • For `linear`: compute slope (m) and intercept (b) using least squares formulas over `{x,y}`.
     • For `polynomial`: build a Vandermonde matrix for x values and solve for coefficients of degree N polynomial using mathjs.lusolve or mathjs.solve.
   - Generate a second array of `{x,y}` by evaluating the fitted model at the original x sample points.

3. **Series Assembly and Rendering**
   - Build a multi-series array:
     • `{ label: 'original', points: originalPoints }`
     • `{ label: 'trendline', points: trendlinePoints }`
   - Call `generateSVG(seriesArray, width, height)` to render both curves. The library’s existing color palette and legend rendering will distinguish the two series.
   - Preserve existing PNG conversion logic via `sharp` unchanged.

# Testing
- **Unit tests for fit computation** in `tests/unit/trendline-fitting.test.js`:
  • Test linear regression on simple datasets (e.g., y = 2x + 1). Verify slope and intercept.
  • Test polynomial fit on small known points for degree 2 and degree 3.
  • Test error cases: invalid degree (zero or non-integer), insufficient data points for polynomial degree.
- **CLI integration tests** in `tests/unit/cli-trendline.test.js`:
  • Run `main()` with `--expression y=x` and `--trendline linear`. Assert SVG contains two `<polyline>` elements and a legend entry for `trendline`.
  • Run with `--trendline polynomial --trendline-degree 3`. Verify output lines count and legend.
  • Error on unsupported `--trendline` value or invalid degree.
- **Programmatic API tests** in `tests/unit/generatePlot-trendline.test.js`:
  • Call `generatePlot({ expression, range, format:'svg', trendline:'linear' })`. Assert returned SVG has two series.
  • Test PNG path similarly.

# Documentation
- **USAGE.md** and **README.md**:
  • Document `--trendline` and `--trendline-degree` flags with examples:
    repository0-plot-code-lib --expression "y=x*2+1" --range "x=0:10" --format svg --output fit.svg --trendline linear
    repository0-plot-code-lib --expression "y=x^2" --range "x=0:5" --format svg --output poly.svg --trendline polynomial --trendline-degree 2
  • Show sample SVG snippet with two colored curves and legend entries: Original and Trendline.