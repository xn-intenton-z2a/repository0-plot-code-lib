# Overview
Allow users to control the resolution of generated plots by specifying the number of sample intervals taken over the range. This enables higher fidelity or coarser output directly from the CLI without manual code changes.

# CLI Flags
- `--samples <number>`: Number of equal segments to divide the range into (default 100).  
  Must be a positive integer.  
  Applies to expression-based plotting and data export pipelines.

# Implementation
1. Update `cliSchema` in `src/lib/main.js`:
   - Add optional `samples` field as z.string().regex(/^\\d+$/, 'samples must be a positive integer').optional().
2. Enhance `parseArgs`:
   - Recognize `--samples` flag, parse its value as a string, validate numeric via zod, convert to Number in parsed output.
3. In `main()`:
   - Destructure `samples` from `parsed` and coerce to Number or fallback to default (100).
   - Pass the `samples` value into `generateData` when generating data points.
4. Update `generateData` signature to accept `samples` override without breaking existing behavior.

# Testing
- Modify `tests/unit/plot-generation.test.js`:
  - Add tests to verify that calling main with `--samples 10` generates exactly 11 data points in the SVG polyline.
  - Test that passing a non-numeric or zero `--samples` value triggers a validation error and exits with code 1.

# Documentation
- Update `USAGE.md` and `README.md`:
  - Document the new `--samples` flag with an example:
     repository0-plot-code-lib --expression "y=sin(x)" --range "x=0:3.14" --samples 200 --format svg --output plot.svg
  - Note the default behavior when `--samples` is omitted.