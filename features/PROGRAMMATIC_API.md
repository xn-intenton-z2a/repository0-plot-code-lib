# PROGRAMMATIC_API

## Purpose
Expose core library functions for use in other Node.js applications, enabling direct time series data and image generation without invoking CLI or HTTP.

## Behavior
1. Introduce getTimeSeries(expression, range, options) returning a Promise of array of { x, y } points. Accepts range as string or numeric array. Options include points default 100.
2. Ensure existing generateSVG(data, width, height, title) is exported for direct use.
3. Add async generatePNG(data, width, height, title) returning a Promise of PNG Buffer. Internally call generateSVG and use sharp to convert SVG to PNG.
4. Preserve existing exports and behaviors for parseRange and evaluateExpression.
5. Document Programmatic API usage in README under a new section.

## Implementation
- In src/lib/main.js export new functions getTimeSeries and generatePNG.
- getTimeSeries calls parseRange and evaluateExpression and resolves data.
- generatePNG calls generateSVG, then sharp(Buffer.from(svg)).png().toBuffer().
- Update module exports object to include getTimeSeries and generatePNG.
- In README.md add a "Programmatic API" section with examples:
  - import { getTimeSeries, generateSVG, generatePNG } from '@xn-intenton-z2a/repository0-plot-code-lib'
  - use getTimeSeries to fetch data, then generateSVG or await generatePNG to obtain image buffer.
- Modify tests/unit/main.test.js to add tests verifying getTimeSeries returns correct data and generatePNG returns Buffer starting with PNG signature.