PLOT_GENERATION.md/PLOT_ENGINE.md
# PLOT_GENERATION.md/PLOT_ENGINE.md
# Overview
This feature consolidates all functionalities required for generating plots from mathematical expressions into a single, unified CLI tool. It provides robust inline SVG rendering, dynamic handling for single and multiple expressions, comprehensive style customizations, and optional PNG conversion using the sharp library. The design ensures clear error reporting and precise dimension calculations, aligning with the mission of delivering reliable and user-friendly plot visualizations.

# Functionality
- Accepts one or multiple mathematical expressions (separated by semicolons) and computes SVG dimensions dynamically based on provided flags.
- For a single expression, uses a fixed height (default 400) or a custom height; for multiple expressions, computes total SVG height using either an explicit segment height or a dynamically computed value with the --autoSegment option.
- Supports detailed customization via flags: --width, --height, --segmentHeight, --autoSegment for dimension control, and --textColor, --lineColor, --backgroundColor for styling.
- Incorporates axis labeling through --xlabel and --ylabel, ensuring proper placement and readability.
- Enables annotation support via --annotation and title support via --title, automatically adjusting layout during multi-expression rendering.
- Implements PNG conversion mode when the --outputFormat flag is set to png; validates that a --file flag is provided for output and uses the sharp library for image conversion.
- Includes robust validations for non-empty string inputs and strictly positive numeric flags, with timestamped error logs to aid debugging.

# Implementation
- Unified CLI parser that converts flags appropriately from kebab-case to camelCase and processes both legacy and new flags.
- Single source file (src/lib/main.js) integrates all aspects of plot generation, including dynamic SVG generation, styling, error handling, and optional PNG conversion.
- Dynamic segmentation for multi-expression plots is computed based on expression length and additional element flags (e.g. labels, range, annotation, title).

# Testing and Documentation
- Comprehensive unit tests cover both CLI and direct function calls, ensuring proper SVG outputs across various scenarios including single and multi-expression modes, custom styles, and validation errors.
- Usage documentation (in USAGE.md and README.md) is updated to reflect the consolidated functionality, offering clear examples and explanations for all supported flags and options.
- This merged feature streamlines the project, consolidating prior separate features into a cohesive plot generation engine that enhances the product's primary functionality.
PLOT_GENERATION.md/PLOT_GENERATION.md
# PLOT_GENERATION.md/PLOT_GENERATION.md
# Overview
This feature consolidates all plot generation functionalities into a single unified CLI tool. It covers inline SVG rendering for both single and multiple mathematical expressions, optional axis labelling, configurable style properties, and PNG conversion using the sharp library. The CLI now accepts a range of flags to specify dimensions, appearance, and output formats, ensuring that users can generate high-quality, customizable plots in one consistent command.

# Functionality
- Parses a mathematical expression (or multiple separated by semicolons) to generate an SVG image.
- For a single expression, uses a fixed height (default 400) and for multiple expressions, calculates total SVG height based on the provided segment height or fallback height.
- Supports optional axis labels via --xlabel and --ylabel flags. When provided, the x-axis label is centered at the bottom and the y-axis label is rotated and placed along the left side.
- Provides additional style customization options via --textColor, --lineColor, and --backgroundColor. These flags apply color styling to text, plot lines, and the SVG canvas background respectively.
- Includes a range flag (--range) to display additional context information directly within the plot.
- Implements PNG conversion when the --output-format flag is set to png. In this case, a mandatory --file flag is required to write the PNG image, with the conversion handled by the sharp library.
- Performs robust validations on all input flags, including checks for required flags, ensuring non-empty values for axis labels, and validating positive numerical values for width, height, and segment height.

# Implementation
- The main source file (src/lib/main.js) has been updated to merge existing plot generation, axis labelling, style customization, and SVG rendering functionalities into a single coherent workflow.
- The CLI parser has been maintained and extended to support both legacy and new flags. The renderSVG function dynamically builds the SVG output by combining text elements, style attributes, and range information.
- PNG conversion is integrated within the main execution flow and utilizes the sharp library to convert the dynamically generated SVG to a PNG image when requested.

# Testing & Documentation
- Unit tests in tests/unit/plot-generation.test.js and tests/unit/main.test.js cover all aspects of the functionality: single and multiple expressions, custom dimensions, axis labels, style options, range display, and PNG conversion error handling and success conditions.
- The usage guide (USAGE.md) and README.md have been updated with comprehensive examples and detailed instructions for all supported flags and options.

# Impact
This merged feature ensures that all key plotting functionalities are available in one consolidated CLI tool. By combining SVG rendering, axis labelling, style customization, and PNG conversion, the tool now offers a robust, user-friendly solution for generating reliable mathematical visualizations in line with our mission.PLOT_GENERATION.md/SVG_RENDER.md
# PLOT_GENERATION.md/SVG_RENDER.md
# Overview
This feature introduces a minimal inline SVG rendering capability to the plot-code-lib. It transforms the user-supplied mathematical expression and options (such as range, width, and height) into a basic SVG image that represents the plot. The SVG is generated dynamically based on the provided dimensions and expression, and error messages are output when required flags are missing or invalid.

# Implementation
The main source file (src/lib/main.js) is updated to include a simple SVG generation function. When the CLI is invoked with the --expression flag, the tool parses additional flags like --range, --width, --height, and --output-format. A basic algorithm is implemented to generate an SVG tag with a placeholder path element representing the plot. This feature supports both single and multiple expressions by adjusting the SVG dimensions appropriately. The function also handles basic validation such as ensuring positive dimensions and the presence of required flags when generating PNG outputs.

# Testing
The unit tests in tests/unit/plot-generation.test.js and tests/unit/main.test.js are updated to check for:
- Correct generation of an SVG output given the appropriate flags.
- Proper error handling when required flags (such as --expression or --file for PNG output) are missing.
- Validation of numerical flags (e.g., --width and --height) to ensure that only positive numbers are processed.

# Documentation
The usage guide in USAGE.md and README.md is updated with examples demonstrating the new SVG rendering functionality. This includes examples for generating a basic SVG plot from a single expression and handling multiple expressions with dynamic dimensions. Users are guided on how to provide custom dimensions and triggers to receive a rendered plot output on the console or in a file.

This SVG rendering functionality is a core enhancement that moves the tool closer to being a complete plotting solution, in line with the mission of generating reliable mathematical visuals from a simple command line interface.PLOT_GENERATION.md/SVG_OUTPUT.md
# PLOT_GENERATION.md/SVG_OUTPUT.md
# SVG OUTPUT FEATURE

This feature introduces the ability to export the generated SVG plot directly to a file when an optional flag (--output) is provided. Currently, the tool outputs SVG to the console, and file export is implemented only for PNG output via the --file flag. With SVG_OUTPUT, users can now save the SVG content to a specified file, enhancing usability for automated workflows and integration into further processing pipelines.

## Functionality

- Checks for an optional --output flag when no PNG conversion is triggered or when outputFormat is not set to png. If provided, the SVG content is written to the specified file path instead of being printed to the console.
- Maintains current behavior for PNG conversion (requires --file) and for console output when --output is absent.
- Updates validations and error reporting to include missing file path when --output is provided but empty.
- Minimal changes in the source file (src/lib/main.js) to add a conditional branch for SVG file output, along with appropriate updates to CLI parsing and validations.

## Testing and Documentation

- Updates in unit tests (tests/unit/plot-generation.test.js) to check for file creation when the --output flag is used in SVG mode.
- README and USAGE documentation are enhanced to provide examples for exporting SVG plots to a file using the --output flag.
- This feature does not affect existing PNG conversion or CLI behavior for direct console SVG generation.

## Impact

The SVG_OUTPUT feature provides a high-impact, user-centric enhancement that streamlines the workflow for users who require persistent SVG outputs. This aligns with the mission of delivering a robust, user-friendly plot library that can be easily integrated into larger systems and automation scripts.
