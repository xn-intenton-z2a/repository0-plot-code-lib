# Purpose
Enable the CLI tool to take generated time series data and produce a graphical plot in SVG or PNG format.

# Behavior
1. Accept additional CLI flags:
   - --plot-format: the output image format, either svg or png, default svg
   - --width and --height: optional numeric dimensions for the output image, default 800 and 600
   - --title: optional title to display on the plot
2. After computing the array of { x, y } points, render an XY line plot showing the series.
3. If format is svg, generate an SVG document containing axes, labels, and a polyline representing the series.
4. If format is png, render the same plot via a canvas library and serialize to a PNG buffer.
5. Write the resulting image data to the specified --output-file path, or print an error and exit non-zero if writing fails.

# Implementation
- Add dependencies on a lightweight SVG builder (for example svg-builder or @svgdotjs/svg.js) and a canvas-to-png library (for example canvas and pngjs).
- In src/lib/main.js, extend the CLI parser to recognize the new flags and validate their values.
- Introduce a plot renderer module that:
  1. Normalizes the points to the drawing area based on width and height.
  2. Draws axes with tick marks and optional title.
  3. Draws the data polyline connecting the points.
  4. Serializes to SVG or canvas, then to PNG.
- Keep existing time series generation logic intact and invoke it before rendering.
- Ensure all errors are caught and produce user-friendly messages.

# Testing
- Unit tests to verify:
  - The CLI accepts and correctly parses plot-format, width, height, and title flags.
  - SVG output contains expected elements: <svg>, <polyline>, axis lines, and title text.
  - PNG output is a valid PNG buffer of non-zero length.
  - Writing to output-file creates the file with correct extension.
  - Error cases: unsupported format, invalid dimensions, file write permissions.
