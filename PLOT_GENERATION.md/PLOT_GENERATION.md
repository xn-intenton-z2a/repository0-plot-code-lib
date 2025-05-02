# Overview
This enhanced plot generation feature consolidates all plotting capabilities into one unified CLI tool. It supports dynamic generation of both SVG and PNG outputs from mathematical expressions. The PNG conversion functionality is powered by the sharp library and seamlessly integrates with the existing SVG rendering logic. This update strengthens the core plotting functionality and ensures the tool meets the mission of being the go-to formula visualization library.

# Functionality
- Parses user provided mathematical expressions using the --expression flag. For multiple expressions separated by semicolons, it computes dynamic segment heights and overall SVG dimensions.
- Supports both SVG and PNG output formats. If the user provided the --output-format flag set to png, the tool mandates the presence of the --file flag to specify the output file.
- For PNG generation, the internally generated SVG is converted using the sharp library. Error handling ensures that missing or invalid flags produce clear error messages with timestamps.
- Maintains validation for numerical inputs (width, height, segment height) and provides default values when flags are not supplied.

# Implementation
- In the source file (src/lib/main.js), the main function was updated to detect the --output-format flag. When set to png, an asynchronous block converts the SVG to PNG using the sharp library, writing the result to the file specified by --file. After writing the file, the process is terminated gracefully.
- The dependency file (package.json) is updated to include a new dependency for sharp.
- Unit tests in tests/unit/plot-generation.test.js have been expanded to cover the PNG conversion path. Tests now simulate providing --output-format png and verifying that the output file is written and the process exits without error.
- Documentation in USAGE.md and README.md has been updated to include instructions for both SVG and PNG outputs, highlighting the requirement for the --file flag when generating PNG images.

# Testing & Documentation
- Unit tests cover both default SVG generation and the new PNG conversion feature. Tests use spies to simulate file writing and process exit calls to ensure that conversion occurs as expected.
- Updates to the usage guide provide comprehensive instructions on how to generate both SVG and PNG plots. The documentation emphasizes the new PNG pathway, aligning with the tool's mission to provide versatile and reliable plot visualizations.

# Impact
This consolidation and enhancement offers users a robust and flexible plotting solution, capable of delivering high-quality visual outputs in both SVG and PNG formats. The integration of PNG conversion minimizes workflow complexity and supports diverse user needs. As a core enhancement, this feature realizes the mission of making repository0-plot-code-lib a decisive tool in mathematical visualization.