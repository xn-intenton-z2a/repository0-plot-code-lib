# Overview
Add support for specifying multiple axis ranges in a single --range flag, enabling users to define both x and y axis limits for precise scaling and rendering.

# CLI Flags
- `--range <list>`: Comma-separated list of axis ranges in the form axis=min:max. Example: "x=0:10,y=-1:1".
- Must supply at least one axis range. If only x is supplied, y-range is auto-scaled based on data.
- Remains mutually exclusive with expression-only or data-only modes unchanged.

# Implementation
1. **Schema Update**
   - In `cliSchema` (src/lib/main.js), change `range` to accept a pattern matching one or more axis=min:max pairs: 
     z.string().regex(/^(\w+=[^:]+:[^:]+)(,\w+=[^:]+:[^:]+)*$/, 'range must be axis=min:max pairs separated by commas')
2. **Argument Parsing**
   - Modify `parseArgs` to normalize `parsed.range` as the raw string.
   - Introduce a new helper `parseRanges(rangeStr)`:
     - Split on commas, for each segment split on `=` and `:`, parse numeric min/max, collect into an object `{ axis, min, max }`.
     - Validate no duplicate axes and throw descriptive errors on invalid formats.
3. **Range Handling in main()**
   - Replace single `parseRange` call with `parseRanges(parsed.range)` to obtain an array or map of ranges.
   - Extract the `x` range for data generation.
   - Preserve existing behavior when only x-range is provided.
4. **SVG Generation**
   - Update `generateSVG(points, width, height, options)` in `src/lib/main.js` to accept an optional `yRange` parameter.
   - When `yRange` is provided, map data y values to the specified min/max for vertical scaling and adjust viewBox or transform accordingly.
   - Default behavior remains unchanged when no y-range is provided.

# Testing
- Create `tests/unit/multi-axis-range.test.js`:
  - Test `parseRanges` with valid single and multiple axis input.
  - Verify errors are thrown on duplicate axes or malformed segments.
  - Run `main()` with `--range x=0:5,y=-2:2` and assert the output SVG contains correct viewBox or transform reflecting both ranges.
  - Ensure legacy calls with `--range x=0:5` produce identical output to existing behavior.

# Documentation
- Update `USAGE.md` and `README.md`:
  - Document the enhanced `--range` syntax and show example commands:
    repository0-plot-code-lib --expression "y=sin(x)" --range "x=0:6.28,y=-1:1" --format svg --output plot.svg
  - Note behavior when y-range is omitted: auto-scaling from data.