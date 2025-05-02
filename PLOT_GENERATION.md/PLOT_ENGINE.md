# Overview
This feature merges all existing plotting functionalities into a single unified CLI tool. The new PLOT_ENGINE supports inline SVG rendering for one or multiple mathematical expressions, dynamic axis labeling, style customization, and PNG conversion using the sharp library. This consolidation streamlines usage, improves consistency and error handling, and simplifies maintenance in line with our mission to provide a go-to tool for creating mathematical visualizations.

# Functionality
- Accepts one or multiple mathematical expressions using the --expression flag. For multiple expressions, segment heights are calculated either via a dedicated --segmentHeight flag or by falling back to the --height flag or a default value.
- Dynamically generates inline SVG plotting the expressions with configurable width, height, and optional segment height for multiple expressions.
- Provides optional axis labels (--xlabel and --ylabel) which are rendered with proper positioning and error checking for empty inputs.
- Supports additional style customization options such as text color, line color, and background color.
- Displays range information within the SVG plot when the --range flag is provided.
- Converts the generated SVG to PNG format when the --output-format flag is set to "png" and ensures that a mandatory --file flag is provided for saving the PNG file.
- Implements robust validations for required parameters and outputs descriptive error messages with timestamps when needed.

# Implementation
- Consolidates logic from previously separate modules into a single source file (src/lib/main.js). This single entry point parses the CLI arguments, computes the dimensions dynamically, generates the SVG content, and optionally converts it to a PNG file.
- The merging supports both legacy and new flags, maintaining backward compatibility while improving internal consistency.

# Testing & Documentation
- Unit tests cover all aspects of SVG generation including single and multiple expressions, axis labeling, range display, and PNG conversion error handling.
- Documentation in the README and usage guides are updated to provide clear instructions on how to use the unified CLI tool.

# Impact
By integrating multiple plotting capabilities into PLOT_ENGINE, this feature significantly simplifies both end-user experience and ongoing development, ensuring that our library remains the go-to solution for high-quality, customizable mathematical visualizations.