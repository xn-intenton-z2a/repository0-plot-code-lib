# Overview

Add support for setting a background fill color for plots to improve contrast and meet styling requirements. Users can specify a CSS color to render as a rectangle beneath all plot elements.

# CLI Flags

- --background <CSS color>: Set the background fill color of the plot SVG. Default is transparent.

# Implementation

1. Schema and Argument Parsing
   - In cliSchema in src/lib/main.js add optional background: z.string().optional().
   - In parseArgs detect --background and store value in parsed.background.
2. Style Options
   - Include background in styleOpts passed to generateSVG.
3. generateSVG Enhancement
   - Update generateSVG signature to accept options.background.
   - At the beginning of the SVG element list, if options.background is set, insert a rect element with width, height, and fill attributes matching the background color.
   - Ensure the rect is rendered before all other plot elements.

# Testing

- Create tests/unit/background-color.test.js:
  • Test generateSVG with background option adds correct <rect> element with width, height, and fill attributes.
  • Test generatePlot with background option returns SVG string containing the background rectangle.
  • Test CLI mode with --background flag and inspect output file to verify the background <rect> is present.

# Documentation

- Update USAGE.md and README.md under Plot Styling:
  • Document the --background flag with examples.
  • Show a sample SVG snippet with the <rect> element as the first child under the SVG root.