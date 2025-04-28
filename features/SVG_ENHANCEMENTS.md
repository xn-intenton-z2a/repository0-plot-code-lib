# SVG_ENHANCEMENTS

## Overview
This feature enhances the SVG plotting functionality with improved visual customizations and additional data embedding. It consolidates prior plot metadata and dynamic SVG generation improvements into one cohesive module. Enhancements include adaptive resolution; customizable dimensions; dynamic color gradients; curve smoothing using quadratic Bezier interpolation with an adjustable smoothing factor; and the embedding of detailed plot metadata as an attribute. These improvements support both CLI and HTTP endpoints while ensuring clear, accessible output for downstream integrations.

## Implementation
- Update the main source file (src/lib/main.js) to incorporate the following enhancements:
  - Adaptive resolution: The number of computed points on the plot is adjustable via the "resolution" parameter, defaulting to 100 if not provided.
  - Custom dimensions: The SVG width and height can be customized via CLI or query parameters (e.g., --width and --height). Defaults are provided if not specified.
  - Dynamic color gradient: When the colorGradient flag is enabled, generate a linear gradient definition in a <defs> block with custom start and end colors. The stroke attribute of the plot then references this gradient using url(#dynamicGradient).
  - Curve smoothing: When the smooth flag is "true", render the plot as a smooth path using quadratic Bezier interpolation. Accept an optional smoothingFactor parameter (a number between 0 and 1, default 0.5) to adjust the tension of the curve.
  - Embedded metadata: Serialize detailed plot information (input expression, range, computed x/y ranges, axis labels, resolution, and custom parameters) into a JSON string. Escape and embed this string in a data-metadata attribute on the SVG root element.
  - ARIA and custom text attributes: Apply ARIA attributes and text-anchor properties to the axis labels. Support customizations (font size, color, rotation, and offsets) so that labels are both accessible and visually aligned.

## Testing
- Update unit tests in tests/unit/http.test.js and tests/unit/main.test.js to cover the following scenarios:
  - Verify that custom dimensions (width and height) are correctly applied to the SVG output.
  - Confirm that when the colorGradient flag is enabled, the SVG output includes a <defs> section with a linearGradient definition and references the gradient in the stroke attribute.
  - Validate that enabling the smooth flag results in a <path> element (instead of a <polyline>) with quadratic Bezier curve commands, and that the smoothingFactor parameter customizes the path shape.
  - Check that the data-metadata attribute contains valid JSON with all required plot metadata fields.
  - Ensure that ARIA labels and text-anchor attributes are correctly set according to custom parameters provided via CLI or HTTP query.

## Impact
This feature provides significant improvements to the core visualization output by making plots more informative (via embedded metadata) and aesthetically customizable. It directly advances the library's mission to serve as a go-to tool for formula visualizations by offering adaptive, accessible, and finely controllable SVG output through both CLI and HTTP interfaces.