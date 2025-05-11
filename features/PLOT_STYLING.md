# Overview
Add capabilities to customize plot appearance including dimensions, title, axis labels, and optional gridlines. Users can tailor the SVG output to better fit publication or presentation needs without post-processing.

# CLI Flags
- `--width <number>`: Specify the width of the output SVG in pixels (default 500).
- `--height <number>`: Specify the height of the output SVG in pixels (default 500).
- `--title <string>`: Add a centered title at the top of the plot.
- `--x-label <string>`: Label the x-axis. Rendered below the horizontal axis.
- `--y-label <string>`: Label the y-axis. Rendered rotated along the vertical axis.
- `--grid`: Include gridlines at major tick intervals on both axes.

# Implementation
- In `cliSchema` (src/lib/main.js), extend with optional fields:
  - `width`: z.string().regex(/^\d+$/, 'width must be a positive integer')
  - `height`: z.string().regex(/^\d+$/, 'height must be a positive integer')
  - `title`, `xLabel`, `yLabel`: z.string().optional()
  - `grid`: z.boolean().optional()
- In `parseArgs`, detect the new flags and convert numeric values for width and height, and flag presence for `--grid`.
- Update `generateSVG` signature to accept an options object:
  - Use provided width and height parameters when generating `<svg>` element.
  - If `grid` is true, render `<line>` elements at uniform intervals based on data range divided into 5 segments for both axes.
  - Insert `<text>` at `x=width/2, y=20` for title if provided.
  - Add `<text>` for x-axis label centered at `x=width/2, y=height-10`.
  - Add `<text>` for y-axis label rotated `-90deg` at `x=20, y=height/2`.
  - Preserve existing polyline rendering logic.
- Ensure backward compatibility: default values when flags are absent.

# Testing
- Create `tests/unit/plot-styling.test.js` to cover:
  - `parseArgs` recognizes new flags and returns correct types.
  - `generateSVG` output contains `<svg>` with specified width and height attributes.
  - Title text element appears when `--title` is provided.
  - Axis labels appear in proper positions when `--x-label` and `--y-label` are provided.
  - Gridlines (`<line>` elements) are rendered when `--grid` flag is used.
  - Ensure default behavior remains unchanged when flags are omitted.

# Documentation
- Update `USAGE.md` with examples:
   repository0-plot-code-lib --expression "y=sin(x)" --range "x=0:6.28" --format svg --output plot.svg --width 600 --height 400 --title "Sine Wave" --x-label "Angle (rad)" --y-label "Amplitude" --grid
- Update `README.md` to describe the new styling flags and show a sample SVG snippet with title, labels, and gridlines.