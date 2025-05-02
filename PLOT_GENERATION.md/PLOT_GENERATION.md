# Overview
This feature consolidates all plot generation and rendering functionality into a single unified CLI tool. It encapsulates SVG generation, dynamic dimension calculation, support for multiple expressions, axis labelling, PNG conversion, and new style customization options. This unified feature aligns with the mission to be the go-to plot library by delivering reliable, customizable, and visually appealing mathematical visualisations.

# Functionality
- Parses input expressions and splits them if they are separated by semicolons, supporting both single and multi-expression plots.
- Dynamically calculates SVG dimensions. For single expressions, a fixed height is used, while for multiple expressions the total height is computed based on a segment height flag (or falls back to the height flag).
- Allows optional axis labelling via --xlabel and --ylabel flags to provide additional context for the plots.
- Integrates PNG conversion using the sharp library when the --output-format flag is set to png. Enforces the presence of a mandatory --file flag for file output.
- New: Introduces style customization options via additional CLI flags:
  - --textColor: Specifies the fill color for text elements in the SVG.
  - --lineColor: Specifies the color for plot lines and the boundary line in the SVG.
  - --backgroundColor: Applies a background color to the SVG canvas.
These style options allow users to tailor the visual appearance of plots to meet diverse presentation and branding requirements.

# Implementation
- The main source file (src/lib/main.js) is updated to parse new CLI flags (--textColor, --lineColor, --backgroundColor) and pass these options to the SVG rendering function.
- The renderSVG function is enhanced to include style attributes:
  - The root SVG element checks for a backgroundColor parameter and applies it.
  - Text elements receive a fill attribute based on the provided textColor flag.
  - The line element for plot boundaries uses the lineColor flag for its stroke attribute.
- Input validations ensure that if style flags are provided, they are non-empty valid color values.

# Testing & Documentation
- Unit tests in the test suite are updated to cover the new style customization options, ensuring that the generated SVG contains the expected style attributes when these flags are provided.
- The usage guide (USAGE.md) is updated with examples demonstrating the new style flags and their impact on the rendered plot.
- The README.md is updated to reflect these improvements, underscoring the enhanced capabilities and customization features aligned with our mission.

# Impact
This enhancement offers users increased control over the aesthetics of generated plots, facilitating a more tailored and professional visual output. By merging all existing features and adding style customization, the tool now meets a broader range of user requirements while remaining a single, coherent CLI tool for reliable mathematical visualisation.