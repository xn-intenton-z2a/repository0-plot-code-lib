# UNIT_CONVERSION Feature Specification

## Overview
This feature introduces comprehensive unit conversion support for the plotting library. Users can specify input parameters (such as measure, range values, and angles) in different units, which are then converted to standard units before invoking the plotting engine. The feature enhances flexibility and usability for a diverse audience, including those working with trigonometric functions where angle inputs may be provided in degrees or radians.

## Implementation Details
### CLI Integration
- **New CLI Flags:**
  - `--input-unit <unit>`: Specifies the unit of the input values (e.g., inches, centimeters, degrees, radians).
  - `--output-unit <unit>`: Specifies the desired standard unit for plot computation (e.g., inches, radians).

- **Parameter Processing:**
  - Integrate conversion logic into the main CLI parsing routine (in `src/lib/main.js`) to intercept these flags and convert parameters such as intervals, step sizes, and angle measurements using built-in conversion factors or a lightweight conversion library.
  - For trigonometric expressions, automatically detect if the formula contains functions like `sin`, `cos`, or `tan` and apply angle conversion if the input is provided in degrees.
  - Ensure that conversion only occurs when both input and output units are provided; fallback to default behavior when not specified.

### Conversion Logic
- **Mathematical Conversion:**
  - Utilize available math functions (via mathjs or custom conversion functions) to perform unit conversions. 
  - For angles, support conversion between degrees and radians seamlessly.
  - Validate that the provided units are supported and provide informative error messages when an unsupported unit is used.

### Documentation and Testing
- **User Documentation:**
  - Update README.md and CONTRIBUTING.md with detailed usage examples and scenarios demonstrating how to use the unit conversion flags, including examples with trigonometric expressions.
  - Include examples that illustrate converting intervals (e.g., centimeters to inches) as well as angle measurements (e.g., degrees to radians) for accurate plot rendering.

- **Testing:**
  - Develop unit tests ensuring correct interpretation and conversion of input values without affecting core plotting functionality.
  - Include edge cases such as missing unit parameters, unsupported unit values, and special handling for trigonometric functions.

## Usage Examples
- **Standard Conversion and Plotting:**
  - Command: `node src/lib/main.js --plot "sin(x)" --interval 0,360 --input-unit degrees --output-unit radians`
  - This converts angle values from degrees to radians before generating the plot.

- **Fallback Behavior:**
  - If only one of the unit flags is provided, the plot is generated using default scales, and a warning message is displayed to the user.

## Benefits
- **Flexibility:** Supports multiple measurement systems, including direct handling of angle conversions for trigonometric plots.
- **Usability:** Enhances user experience by allowing natural input units, reducing the requirement for manual conversions in user scripts.
- **Accuracy:** Ensures that plot computations are based on correctly standardized values, improving the consistency and accuracy of rendered plots.
