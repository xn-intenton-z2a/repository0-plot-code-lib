# Overview
This feature enhances the SVG plotting functionality by unifying advanced visual improvements with robust HTTP API support. It now delivers adaptive resolution, custom dimensions, dynamic color gradients, and curve smoothing with an adjustable smoothing factor. In addition, the /plot endpoint has been enhanced with full content negotiation capabilities and improved error messaging to ensure a reliable experience both via CLI and HTTP.

# Implementation
- Extend the core rendering logic to support both polyline and smooth path (<path>) generation using quadratic Bezier interpolation with a configurable smoothingFactor.
- Integrate dynamic color gradient support by conditionally generating a <defs> section containing a linearGradient definition. Custom gradient start and end colors are applied and referenced by the SVG stroke.
- Implement adaptive plotting by mapping computed points to SVG coordinates based on customizable width and height, with defaults provided if not specified.
- Embed detailed plot metadata as a JSON string (with escaped characters) in the SVG root element's data-metadata attribute to provide downstream integrations and debugging support.
- Enhance accessibility by adding ARIA attributes and custom text-anchor options for axis labels, with additional support for locale-specific number formatting and precision.
- Update the HTTP API /plot endpoint to perform content negotiation based on the Accept header. The endpoint now reliably returns SVG, PNG (dummy), or detailed JSON output, and provides clear error messages in cases of malformed input or evaluation errors.
- Ensure that configuration values from CLI flags override those provided via external JSON configuration files after environment variable interpolation and schema validation.

# Testing & Impact
- Unit tests validate that the rendered SVG dynamically adapts to custom dimensions, smooth paths are correctly generated when the smooth flag is enabled, and that a custom smoothingFactor produces distinct curves compared to the default.
- HTTP tests confirm that the /plot endpoint correctly negotiates between SVG, PNG, and JSON formats based on Accept headers and query parameters.
- Integration tests verify the merging of configuration values from environment variables, JSON files, and CLI inputs, ensuring robust error handling across all branches.
- Overall, this unified enhancement significantly improves both the visual quality of the plots and the reliability of the API, directly supporting the mission to be a go-to plotting library for formula visualisations.