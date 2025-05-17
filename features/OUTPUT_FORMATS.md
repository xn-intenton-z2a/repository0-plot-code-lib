# Overview

Extend the CLI and library to support multiple output formats (SVG, PNG, JSON) and customizable plot appearance via new flags. Users can specify image dimensions, margins, axis labels, and plot title to tailor visualizations to their needs.

# CLI Integration

- Add flags to parseArgs:
  - --format <format>    : one of svg, png, json. Default svg.
  - --width <number>     : output width in pixels. Default 800.
  - --height <number>    : output height in pixels. Default 600.
  - --margin <number>    : margin around plot in pixels. Default 40.
  - --x-label <string>   : label text for the x-axis.
  - --y-label <string>   : label text for the y-axis.
  - --title <string>     : title text displayed at top of SVG.

Update usage examples in README.md and USAGE.md to include customization:
  npx repo0-plot --expression "sin(x)" --range "x=0:6.28:0.1" --format png --width 1024 --height 768 --margin 50 --x-label "Time (s)" --y-label "Amplitude" --title "Sine Wave" --output out.png

# Implementation

- In src/lib/main.js:
  - Extend argsSchema with width (number), height (number), margin (number), xLabel (string optional), yLabel (string optional), title (string optional).
  - After parsing and data generation, call generateSVG(data, { width, height, margin, xLabel, yLabel, title }).
  - Branch on format:
    - svg: output SVG string.
    - json: output JSON { xValues, yValues }.
    - png: convert SVG to PNG buffer via canvas and write buffer.

- In generateSVG:
  - Use width, height, margin values to compute scales.
  - Render title centered at top using <text> element.
  - Render axis labels near axis ends using <text> rotated for y-axis.
  - Preserve existing axes lines and polyline rendering.

# Tests

- Update tests for parseArgs:
  - Ensure new flags parse correctly and default values apply.
- Add tests for generateSVG:
  - Verify <text> element for title contains correct text.
  - Verify x-axis and y-axis labels appear at expected positions.
- Retain and extend tests for format conversions (JSON, PNG buffer signature).

# Documentation

- Update README.md and USAGE.md sections to document new flags with examples and default values.
