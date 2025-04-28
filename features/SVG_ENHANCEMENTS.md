# SVG_ENHANCEMENTS

## Overview
This feature enhances the SVG plotting functionality with advanced visual and interaction improvements. It consolidates all dynamic plot generation aspects including adaptive resolution, custom dimensions, dynamic color gradients, curve smoothing with an adjustable smoothing factor, and enriched accessibility support via ARIA attributes. The feature now embeds detailed plot metadata in the SVG output for downstream integrations and provides robust error handling for invalid expressions or numeric configurations. It also harmonizes CLI parameters and configuration file overrides into a seamless customization experience.

## Implementation
- Update the core rendering logic in the main source file to allow for a smooth curve rendering mode when the smooth flag is enabled. Validate that the smoothingFactor parameter, if provided, is a number between 0 and 1 (defaulting to 0.5).
- When smoothing is enabled, the plot is rendered using a <path> element with quadratic Bezier interpolation computed from the mapped points. Otherwise, a polyline is drawn.
- Integrate dynamic color gradients by conditionally creating a <defs> section with a linearGradient element when the colorGradient flag is set to true. The gradient uses customizable start and end colors via gradientStartColor and gradientEndColor parameters.
- Support custom dimensions (width and height) that override default values. Fallback defaults (width = 300, height = 150) are applied when necessary.
- Enhance accessibility by including ARIA attributes and allowing custom overrides (xlabelAriaLabel, ylabelAriaLabel) in SVG axis labels, and setting text-anchor attributes based on user input.
- Embed comprehensive metadata in the SVG output as a data-metadata attribute. The metadata captures the original expression, input range, computed ranges, axis labels, resolution, and any other custom parameters. This metadata string is properly escaped for downstream JSON parsing.
- Improve error messaging to cover scenarios such as missing variable 'x' in the expression, malformed range input, non-finite computed y-values, and improper numeric values in configuration or CLI overrides.

## Testing & Impact
- Unit tests verify that the endpoint correctly negotiates responses (SVG, PNG, and JSON) based on the Accept header and fileType or format parameter.
- Tests cover various scenarios including custom dimensions, locale-specific numeric formatting, precise axis labels with given precision, ARIA attribute overrides, and proper error responses for invalid input (including smoothingFactor validations).
- The improved SVG generation and error feedback result in a more robust and accessible plotting tool that aligns with the mission of being a go-to visualization library for mathematical expressions.
