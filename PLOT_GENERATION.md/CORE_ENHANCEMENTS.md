# Overview
This enhancement consolidates core improvements to the CLI tool. In addition to multi-expression support and robust error logging, the CLI now accepts additional parameters to customize the SVG output size through the new --width and --height flags. These flags allow users to define the width of the generated SVG and the height of each expression segment, providing flexible customizations to visually tailor plots.

# Implementation
- Update the main source file to parse new optional flags: --width and --height. Extend the parseArgs function to detect these parameters if present and include them as options.
- In generateSVG and generateMultiSVG functions, use the specified --width value to set the overall SVG width. Similarly, if --height is provided, use it as the segment height for multi-expression plots. Fallback to default values if not provided.
- Ensure that updates do not affect the currently validated multi-expression logic, error logging, and PNG conversion processes.
- Verify that provided width and height values are valid numbers and within a reasonable range. Log errors if invalid parameters are encountered.

# Testing & Quality Assurance
- In the unit test files, add tests to simulate scenarios where --width and --height flags are included. Ensure that the SVG output reflects these overrides in its dimensions.
- Maintain tests to ensure backward compatibility for cases when these flags are omitted.
- Confirm that invalid numeric values are correctly handled by logging the error.

# Documentation
- Update the README and Usage Guide to include examples using the new --width and --height flags. Specify that these flags are optional and describe how they affect the SVG’s overall layout and the vertical offset for multi-expression graphics.
- Document the default values when --width and --height are not provided, and update the guidelines regarding parameter validation.

# Conclusion
This combined enhancement delivers substantial user impact by not only supporting multi-expression plots but also by providing customizable output dimensions. It reinforces the mission to offer a versatile plotting tool while ensuring reliability and user feedback through improved error logging and parameter validation.