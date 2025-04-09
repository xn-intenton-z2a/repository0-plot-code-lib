# UNIT_CONVERSION Feature Specification

## Overview
This feature introduces unit conversion support for the plotting library. Users will be able to specify input parameters (such as measure or range values) in different units, which the system will then convert to standard units before invoking the plotting engine. This addition enhances flexibility and usability, especially for users dealing with diverse unit systems, without bloating the core functionality of the repository.

## Implementation Details
### CLI Integration
- **New CLI Flags:**
  - `--input-unit <unit>`: Specifies the unit of the input values (e.g., inches, centimeters).
  - `--output-unit <unit>`: Specifies the desired standard unit for plot computation (e.g., inches).
  
- **Parameter Processing:**
  - Integrate conversion logic into the main CLI parsing routine (in `src/lib/main.js`) to intercept these flags and convert parameters such as intervals or step sizes using built-in conversion factors or a lightweight conversion library.
  - Ensure that conversion only occurs when both input and output units are provided; fallback to default behavior when not specified.

### Conversion Logic
- **Mathematical Conversion:**
  - Utilize available math functions (via mathjs or custom functions) to perform unit conversions.
  - Validate that provided units are supported and provide informative error messages if an unsupported unit is used.

### Documentation and Testing
- **User Documentation:**
  - Update README.md and CONTRIBUTING.md with details and examples on how to use the new unit conversion flags.
  - Include usage scenarios illustrating conversion from one unit to another (e.g., converting intervals specified in centimeters to inches).
- **Testing:**
  - Develop unit tests ensuring that the CLI correctly interprets and converts units without affecting standard plotting functionality.
  - Include edge cases such as missing unit parameters or unsupported unit values.

## Usage Examples
- **Direct Conversion and Plotting:**
  - Command: `node src/lib/main.js --plot "sin(x)" --interval 0,100 --input-unit cm --output-unit inches`
  - This will convert the interval from centimeters to inches before generating the ASCII plot.

- **Fallback Behavior:**
  - If only one of the unit flags is provided, the plot should be generated using default scales without conversion, with a warning message to the user.

This feature aligns with our mission of being the go-to plot library by enhancing the flexibility of input handling and ensuring that a wider audience with varying measurement systems can generate accurate and reproducible plots.
