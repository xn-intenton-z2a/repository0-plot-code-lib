# Overview
This feature consolidates and extends the plot metadata functionality into a comprehensive SVG enhancements module. It merges the previous plot metadata logic with new capabilities that deliver adaptive resolution, dynamic color gradients, customizable dimensions, and curve smoothing with adjustable smoothing factors. This module enriches SVG outputs by embedding detailed metadata and improving visual presentation, aligning with the mission to be the go-to library for formula visualisations.

# Implementation
- Update the SVG generation function in the main source file (src/lib/main.js) to include enhanced features:
  - Embed a data-metadata attribute on the SVG root containing serialized plot generation details.
  - Support custom dimensions via width and height query or CLI parameters with validation and defaults.
  - Implement dynamic color gradient capability by conditionally adding a linear gradient definition and applying it to the plot stroke when enabled.
  - Enable curve smoothing using quadratic Bezier interpolation when the smooth flag is set, with an adjustable smoothingFactor parameter (default 0.5).
  - Merge the existing JSON export metadata functionality for both CLI and HTTP endpoints to ensure consistency across all export formats.
- Update configuration and error handling to abide by input validation guidelines, ensuring numeric precision and proper range specification.
- Revise documentation (README.md and docs/USAGE.md) with examples illustrating usage of new SVG parameters.

# Testing
- Enhance unit tests in tests/unit/http.test.js and tests/unit/main.test.js to validate the new SVG output:
  - Confirm that the SVG includes the dynamic color gradient definitions when enabled.
  - Validate that custom dimensions are applied correctly in the SVG element.
  - Ensure curve smoothing produces a path element with correct quadratic Bezier commands and that the smoothingFactor parameter alters the output path.
  - Test that the embedded metadata attribute contains all expected plot details.

# Impact
This feature provides users with a richer, more customizable, and metadata-enhanced SVG output. With added visual enhancements and detailed embedded metadata, it simplifies downstream processing for integrations and debugging while maintaining a consistent export mechanism. This improvement supports the core mission of delivering robust plot visualisations through both CLI and HTTP workflows.