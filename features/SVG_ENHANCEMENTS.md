# SVG ENHANCEMENTS

## Overview
This feature not only improves the visual quality of SVG plots with dynamic color gradients, adaptive dimensions, and smooth curve rendering but also enhances the HTTP API experience. In addition to generating high-quality plots from mathematical expressions, the feature now introduces robust error handling using structured responses, ensuring that clients receive clear, RFC7807-compliant error details when issues arise.

## Implementation
- Extend the core rendering logic to support both polyline and smooth path generation using quadratic Bezier interpolation. The smoothing behavior can be customized via a smoothing factor supplied through CLI or query parameters.
- Integrate dynamic color gradient support by conditionally generating a <defs> section with a linearGradient element. Users can specify start and end colors to be applied to the SVG stroke.
- Map computed plot points to a dynamic SVG coordinate system based on customizable width and height. Fallback defaults (300x150) are applied if custom dimensions are not provided.
- Embed detailed metadata in the SVG output by adding a data-metadata attribute on the root <svg> element. This metadata includes the original expression, input range, computed ranges, axis labels, resolution, and all custom parameters. The metadata is JSON-stringified and properly escaped for downstream integrations.
- Enhance the HTTP API /plot endpoint with improved content negotiation. In cases of malformed requests or processing errors, the API now returns structured error responses conforming to RFC7807 (Problem Details for HTTP APIs). These responses include standard fields such as type, title, status, detail, and instance, ensuring clients receive comprehensive error information.
- Maintain compatibility with the configuration management features, including merging of CLI flags, JSON config files, and environment variable interpolation, ensuring all overrides remain effective.

## Testing & Impact
- Unit tests validate that the SVG output reflects adaptive dimensions, correct dynamic gradient insertion, and smooth path generation when smoothing is enabled. Tests also confirm that detailed metadata is embedded and correctly formatted.
- HTTP tests have been updated to verify the content negotiation behavior for SVG, PNG, and JSON outputs as well as to confirm that error responses follow the RFC7807 structure when query parameters are invalid or missing.
- Integration tests ensure that configuration merging and runtime reloading continue to work correctly alongside the new HTTP error handling enhancements.
- Overall, these enhancements dramatically improve both the visual and operational reliability of the plot library, directly supporting the mission to be the go-to plotting tool for formula visualisations by offering a robust and user-friendly HTTP API experience.