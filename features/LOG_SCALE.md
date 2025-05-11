# Overview

Add support for logarithmic scaling on the x-axis and/or y-axis. Users can enable log10 transforms for data visualization of functions and datasets spanning multiple orders of magnitude.

# CLI Flags

- `--x-log`: Apply a base-10 logarithmic transform to all x-values before rendering.
- `--y-log`: Apply a base-10 logarithmic transform to all y-values before rendering.
- Flags may be used independently or together. Mutually exclusive with providing manual y-range on the same axis (use multi-axis-range instead).

# Implementation

1. Schema and Argument Parsing
   - In `cliSchema` (`src/lib/main.js`), add optional boolean fields `xLog` and `yLog` using zod:
     - xLog: z.boolean().optional()
     - yLog: z.boolean().optional()
   - Update `parseArgs` to detect `--x-log` and `--y-log` flags and set parsed.xLog and parsed.yLog to true.
   - Validate that `xLog` cannot be combined with a manual x-range in `parsed.range` and similarly for `yLog` with y-range.

2. Data Transformation in Main
   - After generating `data` via `generateData` or loading from `--data`, inspect parsed.xLog and parsed.yLog.
   - If `xLog` is true, transform each point: `p.x = Math.log10(p.x)` and ensure all original x-values are positive or throw an error.
   - If `yLog` is true, transform each point: `p.y = Math.log10(p.y)` and ensure all original y-values are positive or throw an error.
   - Proceed with plotting the transformed data.

3. SVG Rendering
   - No changes to `generateSVG` interface; points passed in are already transformed.
   - The axis tick labels should reflect transformed values; no additional markup required.

# Testing

- Create `tests/unit/log-scale.test.js`:
  - Test `parseArgs` handles `--x-log` and `--y-log` flags and sets the correct boolean properties.
  - Generate a simple dataset (e.g., y=x) over x=1:100, apply `xLog` and verify output points have values log10(1), log10(100).
  - Run `main()` with `--expression y=x --range x=1:10 --format svg --output out.svg --x-log` and assert the resulting SVG polyline contains transformed x-values.
  - Test error cases when data contains non-positive values and log flags are used.

# Documentation

- Update `USAGE.md` and `README.md`:
  - Document `--x-log` and `--y-log` flags with examples:
    repository0-plot-code-lib --expression "y=x" --range "x=1:100" --format svg --output logx.svg --x-log
    repository0-plot-code-lib --expression "y=exp(x)" --range "x=0:2" --format png --output logy.png --y-log
  - Explain that logs are base-10 and require positive inputs.
