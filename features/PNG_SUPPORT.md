# PNG_SUPPORT Feature Update

## Overview
This update extends the CLI functionality to support PNG plot generation. In addition to generating SVG output, the CLI now accepts output file names ending in .png. When a .png file is specified, the CLI will create a PNG plot by converting the generated SVG using the sharp library. This change achieves additional value by aligning with the mission to generate both SVG and PNG plots from formula evaluations.

## Source File Updates
- Update src/lib/main.js to check if the --file parameter ends with .png. If so, generate an SVG internally and use the sharp library to convert the SVG data to PNG format.
- Ensure all parameter validations and error messages from the CLI_ENHANCEMENTS feature remain consistent. Add logic for PNG conversion as an extension to the existing functionality.

## Testing Enhancements
- Modify tests/unit/main.test.js to include a new test case for PNG output. Simulate the CLI call with a --file parameter ending in .png and verify that the output is a PNG buffer or that an indicative message is printed indicating PNG conversion was performed.
- Ensure the existing tests for SVG generation and CLI parameter handling continue to pass.

## Documentation Updates
- Update README.md to include usage examples demonstrating how to invoke the CLI with the --file parameter ending in .png. Provide instructions on expected behavior and notes on the conversion process.

## Dependency Updates
- Update the dependencies file (package.json) to add the sharp library with a version such as ^0.32.1. This library will be used to perform the SVG to PNG conversion.
- Verify that all changes remain within the repository’s scope and adhere to the mission and contributing guidelines.
