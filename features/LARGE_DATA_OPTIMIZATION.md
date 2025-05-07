# Overview

This feature improves rendering performance and memory usage when handling large time series data sets by decimating data above a configurable threshold and streaming image generation.

# CLI Interface

--max-points  Optional integer threshold for maximum data points to render. Defaults to 10000. When the generated data length exceeds this threshold, an adaptive decimation algorithm reduces the point count to improve performance.

# Behavior

1. Extend parseArgs to support --max-points. Parse maxPoints as integer and default to 10000.
2. After computing the full data array, if data.length > maxPoints, apply a decimation algorithm:
   • Partition the full data into maxPoints segments by index.
   • In each segment, select the minimum and maximum y values with their x coordinates.
   • Construct a new decimated data array preserving outline of data trends with at most 2 * maxPoints points.
3. Pass the decimated data array to renderPlot instead of the full data.
4. Update renderPlot and PNG conversion logic to use Node streams:
   • For SVG output, generate path data incrementally to avoid building large strings at once.
   • For PNG output, pipe the SVG stream into sharp and pipe the resulting PNG stream to file or stdout.

# Tests

• Add unit tests in tests/unit/decimation.test.js:
  - Generate synthetic data of length > maxPoints and verify decimation reduces length and preserves trend boundaries.
• Update render-plot tests to verify streaming behavior by mocking fs.writeStream and sharp pipelines without loading full buffers.

# Documentation Updates

- In USAGE.md, add a new section "Optimizing Rendering for Large Datasets" describing the --max-points flag and its effect.
- In README.md under Examples, show a sample invocation with --max-points and note performance improvements on large inputs.
