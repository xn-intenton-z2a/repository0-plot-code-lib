# Overview
This feature consolidates all plot generation capabilities into one unified CLI tool. It encompasses functionalities for rendering SVG plots from mathematical expressions, adding customizable axis labels, configurable style options, and converting SVG outputs to PNG using the sharp library. The new feature simplifies the workflow by merging all previous implementations into a single coherent module.

# Functionality
- Parses a single or multiple mathematical expressions using the --expression flag (separated by semicolons) and determines the appropriate dimensions using the --width and --height flags. For multi-expression setups, it uses --segmentHeight or falls back to --height as the segment height.
- Provides optional axis labeling using the --xlabel and --ylabel flags. When provided, labels are rendered at the bottom center (x-axis) and along the left side (y-axis) of the SVG respectively.
- Supports additional style customization options through flags such as --textColor, --lineColor, and --backgroundColor. Further customization includes displaying supplemental range information via the --range flag.
- Implements robust error handling and input validation. Required flags must be present (such as --expression and --file for PNG output), and numerical values are validated to be positive, providing timestamped error outputs when validation fails.
- When the --output-format flag is set to png, the tool converts the generated SVG into a PNG image using the sharp library. In this case, the --file flag is mandatory to specify the output file location.

# Implementation
- The main source file is updated to include a consolidated CLI parser, merging prior segregated functionalities. The render function creates the SVG using dynamic content based on the number of expressions, adding axis labels and range text when specified.
- The process flow differentiates between single and multiple expressions, adjusting dimensions accordingly. For PNG conversion, sharp is integrated directly into the pipeline and file I/O is managed within the same module.
- Error messages are logged with timestamps to provide better debugging support in case of missing flags or invalid inputs.

# Testing & Documentation
- Unit tests are updated and merged to cover single-expression and multi-expression scenarios, axis labeling validations, proper handling of style and range options, and PNG conversion error handling.
- The usage guides in the README.md and USAGE.md are revised to include comprehensive examples and command-line instructions for both SVG and PNG outputs.
- Documentation is consolidated to reflect the integrated capabilities, ensuring users have clear instructions on how to utilize all features in a unified command structure.

# Impact
This integrated PLOT_ENGINE feature streamlines the user experience by combining all plot generation functionalities into one coherent tool. It reduces redundancy, simplifies the command-line interface, and supports both traditional SVG output and high-quality PNG conversion, making it an essential core functionality aligned with the library's mission.