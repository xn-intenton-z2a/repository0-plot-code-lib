# Overview
This feature unifies all plotting functionalities into a single, robust command-line tool. PLOT_ENGINE combines SVG rendering, PNG conversion, axis labeling, style customization, and comprehensive input validation. The unified engine supports both single and multiple mathematical expressions and leverages existing libraries to generate high-quality plots according to user-specified parameters.

# Functionality
- Parses CLI arguments to accept one or multiple mathematical expressions separated by semicolons.
- Generates inline SVG plots with configurable dimensions. For single expressions, uses a fixed height (default 400) while for multiple expressions, calculates total height using a segment height (via --segmentHeight) or falls back to --height.
- Supports additional features like axis labeling (--xlabel and --ylabel), custom color styling (--textColor, --lineColor, and --backgroundColor), and optional range display (--range flag).
- Integrates PNG conversion: when the --output-format flag is set to png, the engine converts the generated SVG to a PNG file using the sharp library, requiring a valid --file flag for saving.
- Implements robust validations for required flags and non-empty values for custom options, logging detailed error messages with timestamps.

# Implementation
- Consolidates prior distinct modules and feature implementations into a single source file (src/lib/main.js).
- The CLI argument parser converts kebab-case flags to camelCase for consistent internal use.
- Features include dynamic SVG generation: text elements, optional background rectangle, and a configurable plot line. Axis labels are rendered appropriately with center alignment and rotation for the y-axis label.
- Error handling is thorough, ensuring that missing or empty critical flags (such as --expression, --xlabel, --ylabel, --textColor, --lineColor, or --backgroundColor) result in descriptive console error outputs.
- PNG conversion utilizes the sharp library to process the SVG and output a PNG file, with validations ensuring mandatory file output paths are provided.

# Testing & Documentation
- Unit tests cover SVG generation for both single and multiple expressions, validating dimension calculations, label positioning, style applications, and error conditions for improper flag values.
- The README, Usage Guide, and contributing guidelines have been updated to reflect unified functionality, providing comprehensive examples and command-line instructions.
- Documentation emphasizes both the core plotting capabilities and the expanded error handling, highlighting the ease of generating high-quality mathematical visualizations from simple expressions.

# Impact
This unified PLOT_ENGINE simplifies user experience and maintenance by merging previously separate plotting modules into one streamlined tool. It directly supports the mission of becoming the go-to plot library for formulae visualizations, delivering high impact through consolidated functionality and improved error handling across all plot generation scenarios.