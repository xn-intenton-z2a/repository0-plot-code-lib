# PLOT Feature Enhancement

This update extends the PLOT feature to support both SVG and PNG output formats in the CLI tool and adds a new format flag for flexible export.

# CLI Parameter Parsing and Validation

Extend the CLI argument schema in src/lib/main.js to include a new optional string parameter format. Allowed values are svg and png. Default is svg. Validate that the format value is one of the supported options and produce a clear error message if it is invalid.

Example usage:
node src/lib/main.js --expression 'y=sin(x)' --range 'x=-10:10,y=-1:1' --file output.png --format png

# Implementation Details

After parsing the expression and range and computing the time series data, branch on the format flag. For svg format, use the existing SVG generation routine. For png format, render the SVG output into a PNG buffer using a headless canvas or a library such as sharp or canvas. Write the resulting file to disk with the correct extension and content type.

# Testing Enhancements

Add unit tests in tests/unit/main.test.js to cover:
- Default behavior without a format flag produces an svg file output.
- Passing format png generates a PNG file with nonzero byte length.
- Invalid format values cause the CLI to exit with an error and print a helpful message.

# Documentation Updates

Update README.md to document the new format option, list supported values, default behavior, and example commands for both svg and png outputs.

# Dependency Management

Add a dependency on sharp or canvas in package.json. Ensure that the dependency is imported and invoked only when png format is requested to avoid increasing overhead for svg-only use cases.

All changes should remain compatible with Node 20 and ESM standards and follow the guidelines in CONTRIBUTING.md and reflect the mission in MISSION.md.