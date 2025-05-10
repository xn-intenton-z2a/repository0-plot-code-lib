# Overview
Add data transformation mode allowing users to apply operations to data arrays loaded from CSV or JSON before plotting.

# CLI Interface
Add a new --transform option that accepts a path to a JSON or YAML transform specification file or an inline JSON string defining an array of transform operations. Each operation supports:
- type: normalize | smooth | scale | offset
- windowSize: number (for smooth)
- factor: number (for scale)
- offset: number (for offset)

# Implementation
- Extend src/lib/main.js to parse the --transform flag and load the specification using fs.promises and js-yaml for YAML support. Validate the specification with Zod against a TransformSpec schema defining an array of operations.
- Implement data transformation functions within the same file: normalize applies min-max scaling to y values, smooth applies a sliding window average, scale multiplies y values by the factor, offset adds a constant to y values.
- Before rendering a plot, detect if transform spec is provided and apply the operations sequentially to the data array loaded from JSON or CSV input.
- Maintain descriptive error handling for invalid specifications or unsupported operation types, exiting with non-zero codes on errors.

# Testing
- Add tests in tests/unit/data-transform.test.js that define sample data arrays and transform specifications inline and via temporary files. Verify that each operation produces the expected output arrays.
- Mock the file system and use vitest to invoke the CLI with --transform and confirm that plots generated reflect transformed data by inspecting rendered data arrays or test hooks.

# Documentation Updates
- Update USAGE.md and README.md to include a "Data Transformation" section that describes the --transform option, shows examples of transform specification formats, and demonstrates combining transforms with plotting commands.