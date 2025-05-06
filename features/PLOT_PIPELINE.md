# Overview
Enhance the renderPlot functionality by providing a complete implementation for SVG and PNG output, adding comprehensive unit and integration tests, updating user documentation with concrete rendering examples, and optimizing plot rendering performance for large datasets via data decimation.

# Source File Updates
1. Implement renderPlot in src/lib/main.js:
   - Accept data array and options object including format, width, height, labels, and decimation settings.
   - Register chartjs plugin for data decimation when options.decimation.enabled is true.
   - Provide new decimation options with fields enabled, algorithm (min-max or lttb), and threshold for maximum points before decimation.
   - Configure chart options.plugins.decimation to apply downsampling when data length exceeds threshold.
   - For format png, call renderToBuffer and return the resulting buffer.
   - For format svg, call renderToBuffer with image svg mime type and return the resulting utf8 string.
   - Throw an error for unsupported formats.
2. Update CLI entrypoint in main function:
   - Add flags decimation (boolean, default false), decimation-algorithm (min-max or lttb, default min-max), decimation-threshold (number, default 5000).
   - Pass decimation settings into renderPlot when plot-format is provided.
   - Maintain existing logic for writing output to file or writing to stdout and exit codes for success and error.

# Performance Optimization
Large data arrays are downsampled before rendering to reduce memory and CPU usage. Data decimation uses chartjs plugin strategies and prevents rendering slowdowns with thousands of points.

# Tests
1. Unit tests in tests/unit/plot-render.test.js:
   - Spy on ChartJSNodeCanvas prototype to verify plugin registration when data length is above threshold and decimation enabled.
   - Test renderPlot returns buffer for png and string for svg with decimation settings enabled and disabled.
2. Integration tests in tests/unit/plot-generation.test.js:
   - Run main with plot-format svg and decimation flags to assert that ChartJSNodeCanvas is instantiated with plugin settings matching CLI flags.
   - Run main on small datasets with decimation disabled to assert no decimation plugin applied.

# Documentation
1. Update USAGE.md:
   - Document new flags decimation, decimation-algorithm, decimation-threshold with example command for large data rendering.
2. Update README.md:
   - Under features, note performance optimization via data decimation.
   - In programmatic API examples, show calling renderPlot with decimation settings and handling the returned buffer or string.
