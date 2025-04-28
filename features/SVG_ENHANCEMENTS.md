# SVG ENHANCEMENTS

## Overview
This feature refines the SVG plot generation to offer a highly customizable and accessible visualization experience. In addition to existing capabilities such as adaptive dimensions, smooth curve rendering with optional Bezier interpolation, dynamic color gradients, marker support, and embedded metadata, this update adds new options for detailed stroke styling. Users can now specify custom stroke widths and dash arrays to tailor the appearance of the plot curves for publication-quality visuals.

## Implementation
- Extend the SVG rendering logic to select between a polyline and a smooth path based on the smooth flag. For smooth curves, quadratic Bezier commands are used with a configurable smoothing factor.
- Continue to validate and incorporate new styling options:
  - Enforce that strokeWidth is a valid positive number. If an invalid value is provided, an error is thrown with a message indicating the expectation.
  - Ensure strokeDashArray is a non-empty string to define the dash pattern for the stroke.
- Maintain dynamic color gradient support by defining a linearGradient in a defs block when enabled, using customizable gradientStartColor and gradientEndColor values.
- Add marker definitions for optional markerStart and markerEnd. When these flags are enabled, marker-start and marker-end attributes are applied to the SVG element based on the curve element type.
- Embed detailed plot metadata (including expression details, computed ranges, axis labels, resolution, and custom parameters) as a data-metadata attribute on the SVG root for downstream processing.
- Enhance accessibility by allowing custom ARIA labels, roles (svgRole), and text anchor settings for axis label positioning.

## Impact
- Provides end users and integrated tools a higher degree of visual customization and control over plot styling.
- Improves accessibility and flexible design integration by letting users fine-tune stroke appearance with strokeWidth and strokeDashArray.
- Empowers production of publication-quality plots that seamlessly integrate into broader design systems or automated workflows.
- Retains all previous functionalities in SVG rendering while extending the API to address new advanced usage requirements.