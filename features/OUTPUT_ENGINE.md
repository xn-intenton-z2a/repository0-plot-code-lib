# OUTPUT_ENGINE Feature Enhancement

This update refines the unified output engine to fully support PNG conversion alongside the existing SVG, JSON, and CSV outputs. The enhancement targets modifications in the source file, test file, README, and dependencies file and aligns with the CLI functionality described in CONTRIBUTING.md and the mission statement in MISSION.md.

## Source Code Updates

- Enhance the CLI parser in src/lib/main.js to check if the --file flag is provided with a .png extension.
- When a .png file is specified, invoke a PNG conversion routine. The routine will generate SVG content first (as previously implemented) and then convert it to PNG using the sharp library.
- Maintain priority such that JSON output overrides CSV export when the --json flag is present.
- Ensure this implementation remains compliant with Node 20 and ES modules.

## Testing Enhancements

- Update tests in tests/unit/main.test.js to add test cases that simulate providing a .png file extension. The tests should check that:
  - The correct branch of code is reached (e.g., triggering the PNG conversion routine).
  - The output format is logged appropriately for validation.
  - Other flags such as --json and --export continue to behave as expected.

## Documentation Updates

- Revise README.md to include usage examples that specifically demonstrate the new PNG conversion feature. For example, illustrate how providing an output file with a .png extension results in conversion from generated SVG to PNG.
- Update any references in the documentation that list supported output formats, emphasizing PNG support.

## Dependency and Build Consistency

- Add the sharp library to package.json dependencies with an appropriate version (e.g. sharp v0.32.x) to support the conversion from SVG to PNG.
- Verify that dependency updates do not conflict with existing libraries and maintain compatibility with the current build and testing setup.

## Benefits

- Streamlines the process of generating graphical output by automatically converting SVG plots to PNG when requested.
- Enhances user experience by ensuring a simple, unified command line interface for all supported output formats.
- Consolidates output functionalities into one coherent feature, reducing code duplication and maintenance overhead.
