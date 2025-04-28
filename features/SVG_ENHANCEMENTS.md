# SVG ENHANCEMENTS

## Overview
This update refines the SVG plot generation to offer a highly customizable visualization experience. In addition to existing features such as adaptive dimensions, smooth curve rendering, dynamic color gradients, and marker support, the feature now embeds detailed plot metadata into the SVG. The new metadata mechanism inserts a data-metadata attribute on the SVG root element that encodes the original expression, input range, computed x and y ranges, axis labels, resolution, and custom parameters. This addition facilitates downstream processing and integration with external tools.

## Implementation
- Extend the SVG rendering logic to decide between a polyline and a smooth path when the smooth flag is enabled. For smooth curves, quadratic Bezier commands are used with a configurable smoothingFactor.
- Validate and incorporate new styling options: strokeWidth and strokeDashArray must be checked for valid positive number and non-empty string respectively.
- Integrate dynamic color gradient support by defining a linearGradient in a <defs> block when the colorGradient option is enabled, using customizable gradientStartColor and gradientEndColor values.
- Add marker definitions for optional markerStart and markerEnd. When enabled, apply marker-start and marker-end attributes to the curve element.
- Embed plot metadata by serializing key plot parameters (including the expression, input range, computed X/Y ranges, axis labels, resolution, and any custom parameters) as JSON. This metadata is escaped and included as a data-metadata attribute on the root <svg> element.
- Enhance accessibility by allowing custom ARIA labels and role attributes (via svgRole) and by allowing custom axis label positioning and rotation.

## Impact
- Provides users with enhanced visual customization for publication-quality plots.
- Embedding metadata empowers integrated tools and automated workflows to extract detailed plot information without parsing the SVG content.
- Improves accessibility and interpretability of plot visuals with configurable attributes and ARIA labels.
- All enhancements merge seamlessly with existing functionality, maintaining a robust and feature-rich plotting library.