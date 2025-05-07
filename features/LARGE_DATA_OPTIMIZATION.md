# Overview

Enhance performance and memory usage when rendering very large time series datasets by combining adaptive downsampling with a choice of decimation algorithms and streaming plot generation for both SVG and PNG outputs.

# CLI Interface

--max-points    Optional integer threshold for maximum data points to render. Defaults to 10000. Data arrays longer than this are downsampled.
--decimation-algorithm    Optional string to select the decimation algorithm. Supported values: minmax, lttb. Defaults to minmax.

# Behavior

1. Extend parseArgs to support --decimation-algorithm. Normalize to lowercase and validate against supported values.
2. After generating the full data array, if data.length exceeds maxPoints:
   • If algorithm is minmax:
     – Partition data into maxPoints segments by index.
     – In each segment, select minimum and maximum y values (with their x coordinates) to capture trend boundaries.
     – Combine up to 2 * maxPoints points, then truncate to maxPoints by evenly sampling if needed.
   • If algorithm is lttb:
     – Apply the Largest-Triangle-Three-Buckets algorithm to produce a shape-preserving downsampled series of exactly maxPoints points.
3. Replace the original data array with the downsampled array for plotting.
4. Refactor rendering to use streams:
   • Implement renderPlotStream(data, options) that returns a Readable stream emitting:
     – An SVG header chunk (including width, height, viewBox).
     – Path commands in incremental chunks rather than building one large string.
     – A closing </svg> tag.
   • In main(), for SVG format:
     – Call renderPlotStream and pipe its output to fs.WriteStream for files or process.stdout when no --output.
   • For PNG format:
     – Pipe the SVG stream into sharp().png() and then pipe the PNG stream to the output.
   • Ensure backpressure is respected to avoid unbounded memory use.

# Tests

• Create tests/unit/decimation-minmax.test.js:
  – Generate synthetic data longer than maxPoints, run the minmax path, assert output length ≤ maxPoints and trend boundaries are preserved.
• Create tests/unit/decimation-lttb.test.js:
  – Generate synthetic data longer than maxPoints, run LTTB path, assert output length equals maxPoints and overall shape matches original within tolerance.
• Create tests/unit/render-stream.test.js:
  – Mock a small data set, consume renderPlotStream as string, assert it begins with <svg, contains expected path commands, and ends with </svg>.
• Update integration tests in tests/unit/plot-integration.test.js:
  – Run CLI with --max-points and --decimation-algorithm flags for both svg and png, assert generated files exist and begin with correct signatures (<svg or PNG magic bytes).

# Documentation Updates

• In USAGE.md, add a section "Optimizing Large Dataset Rendering" describing --max-points and --decimation-algorithm flags, their defaults, and usage examples.
• In README.md under Examples, show invocations:
  repository0-plot-code-lib --expression "y=sin(x)" --range 0:6.28 --max-points 5000 --decimation-algorithm lttb --format svg --output plot.svg
  repository0-plot-code-lib --expression "y=x^2" --range -5:5 --max-points 5000 --decimation-algorithm minmax --format png --output plot.png