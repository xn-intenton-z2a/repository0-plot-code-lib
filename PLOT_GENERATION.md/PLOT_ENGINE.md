# Overview
This feature consolidates all plot generation functionalities into a unified engine. It merges inline SVG rendering, dynamic multi-expression handling, axis labeling, style customization, optional PNG conversion, and annotation support into a single coherent CLI tool. The unified PLOT_ENGINE simplifies usage, reduces maintenance overhead, and delivers high-impact functionality in line with the mission of generating reliable plot visualizations.

# Functionality
- Accepts a mathematical expression or multiple expressions separated by semicolons. For multiple expressions, the total height is calculated as the number of expressions multiplied by either a fixed segment height or a dynamically computed segment height when --autoSegment is enabled.
- Supports SVG plot generation with customizable dimensions via --width, --height, and --segmentHeight flags. In multi-expression mode, if both --height and --segmentHeight are provided, segmentHeight takes precedence.
- Provides additional optional features, including custom axis labels using --xlabel and --ylabel, range information with --range, and an annotation element (via --annotation) positioned in the top-right corner.
- Integrates PNG conversion using the sharp library by ensuring that --file is provided when --outputFormat is set to png. Error handling with timestamped logs ensures users are informed of missing or invalid flags.

# Implementation
- All functionalities are implemented in a single source file, keeping the repository simple and maintainable. Core logic includes CLI argument parsing, conversion of kebab-case to camelCase flag names, dynamic segmentation computations, SVG content construction with inline style attributes, and conditional processing of PNG conversion.
- For multiple expressions, dynamic height calculation is based on a heuristic that adjusts the segment height according to the length of each expression and the presence of axis labels or range information.
- Proper validations ensure that all required flags are provided and that numeric flags are positive integer values.

# Testing & Documentation
- Unit tests cover all key functionalities including single expression and multi-expression SVG rendering, dynamic segment height adjustments, proper placement of axis labels, error handling of empty flag values, and PNG conversion conditions.
- The updated Usage Guide and README reflect detailed examples for invoking the CLI with all available options, ensuring consistency in documentation and user guidance.

# Impact
This unified PLOT_ENGINE delivers substantial user impact by providing a streamlined, reliable, and customizable plot generation solution. The consolidation of multiple legacy features into a single engine makes the tool easier to use, maintain, and extend while directly supporting the mission of serving as the go-to plot library for mathematical visualizations.