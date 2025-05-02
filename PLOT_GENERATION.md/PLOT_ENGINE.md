# Overview
This merged feature consolidates all plot generation functionality into a single robust CLI tool. It provides dynamic inline SVG rendering for single and multiple mathematical expressions as well as PNG conversion when requested. All aspects, including error handling, dimension calculation, and dependency updates, have been integrated into one coherent feature in line with the project mission.

# Functionality
- When the CLI is run with the --expression flag, the tool splits expressions across semicolons and renders an SVG image. For a single expression a fixed height of 400 is used. For multiple expressions, a segment height (specified via --height) is applied and the overall height is calculated accordingly.
- If the user supplies the --output-format flag with a value of png, the CLI now leverages the sharp library to convert the generated SVG into a PNG image and writes it to a file. In this case, the --file flag is mandatory and an error is thrown if missing.
- All input flags (e.g. --expression, --width, --height, --file) are validated. Provided dimensions are required to be positive numbers and clear error messages with timestamps are provided for missing or invalid inputs.

# Implementation
- Updates to src/lib/main.js include a code block that checks for the --output-format flag. When set to png, the generated SVG is passed to sharp (added as a dependency) for conversion and then written to the file specified by --file. Otherwise, the SVG is simply printed to the console.
- The underlying SVG generation function remains robust, handling both single and multiple expressions. The conversion flow is added as an extension of the main plot generation logic.

# Testing & Documentation
- Unit tests in tests/unit/plot-generation.test.js and tests/unit/main.test.js are updated to cover the new PNG conversion path. Tests verify that the PNG conversion only occurs when the --output-format flag is set to png and that a file output is properly forced.
- The usage guide in USAGE.md and the README.md are updated to include sample commands and guidelines for generating PNG plots. Instructions now clearly state the requirement for the sharp library and that the --file flag must be used with PNG output.
- The dependency file (package.json) is updated to include a new dependency, sharp, ensuring compatibility with existing npm scripts and project requirements.

# Impact
This consolidated feature ensures that all plot generation capabilities are available in one unified CLI tool, providing a seamless experience for users. By integrating PNG conversion directly into the workflow, the tool now supports more versatile use cases and adheres to the mission of delivering reliable mathematical visualisations.