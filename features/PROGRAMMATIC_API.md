# Overview
Provide a native JavaScript API for generating plots programmatically without invoking the CLI. Users can import a function that returns an SVG string or PNG buffer based on the same core logic as the CLI.

# API Interface
- Export an async function `generatePlot(options)` from `src/lib/main.js`.
- `options` is an object with properties:
  - `expression` (string, required): mathematical expression in terms of `x`, e.g., "y=sin(x)".
  - `range` (string, required): axis range in the form "x=min:max".
  - `format` ("svg"|"png", required): output format, either svg or png.
  - `width` (number, optional): SVG width in pixels, default 500.
  - `height` (number, optional): SVG height in pixels, default 500.
  - `samples` (number, optional): number of intervals, default 100.
  - `xLog`/`yLog` (boolean, optional): enable log10 scaling on x or y axis.
  - Styling flags: `title`, `xLabel`, `yLabel`, `grid` (optional).

# Return Value
- Resolves to an object:
  - If `format` is "svg": `{ type: 'svg', data: string }`.
  - If `format` is "png": `{ type: 'png', data: Buffer }`.

# Implementation
1. In `src/lib/main.js`, add and export `async function generatePlot(options)`.
2. Validate `options` with the existing Zod schema extended to accept programmatic inputs.
3. Internally call `generateData`, `generateSVG`, and `sharp` conversion as in `main()`.
4. Return the appropriate object without writing to disk.

# Testing
- Create `tests/unit/programmatic-api.test.js`:
  - Import `generatePlot` and call with a simple expression and range for both svg and png.
  - Assert the returned `type` and `data` shape.
  - Mock `sharp` to return a known buffer.
  - Test error cases: missing required fields, invalid range.

# Documentation
- Update `README.md` and `USAGE.md`:
  - Describe `generatePlot(options)` and show sample code:
    ```js
    import { generatePlot } from 'repository0-plot-code-lib';
    const result = await generatePlot({ expression: 'y=x', range: 'x=0:5', format: 'svg' });
    console.log(result.type, result.data);
    ```