# FORMULA_ENGINE Feature Specification

## Overview
The FORMULA_ENGINE feature empowers users to input and plot custom mathematical expressions on the fly. It leverages the existing mathjs library to parse and evaluate user-supplied formulas, generating data points for dynamic visualizations. This feature integrates seamlessly with the existing CLI and web interface provided by CORE_ENGINE.

## Description
- **Formula Parsing:** Accepts mathematical expressions (e.g., "sin(x) + cos(x)") from the command line or web interface.
- **Evaluation and Data Generation:** Computes a sequence of data points over a specified domain based on user-defined start, end, and step values.
- **Validation and Error Handling:** Uses mathjs to validate expressions and returns descriptive error messages for any malformed or unsupported formulas.
- **Integration with Plotting:** Outputs evaluated data in a format that can be directly used by the advanced plotting functions in CORE_ENGINE, offering a unified visualization experience.
- **Usage Modes:** Available as a CLI flag (`--formula`) and as an optional field in the web interface form, ensuring consistency across different user interactions.

## Implementation Details
1. **CLI Integration:**
   - Add a new flag `--formula` that triggers the formula evaluation process.
   - Parse additional arguments to capture the formula string and numeric range parameters (start, end, step).
   - Display computed data points or error messages directly in the CLI output.

2. **Web Interface Integration:**
   - Extend the existing Express server to include a dedicated route for formula evaluation.
   - Embed an input form field allowing users to enter their formula and domain parameters.
   - Return the evaluated data in a confirmation page or visualization preview.

3. **Testing and Documentation:**
   - Add comprehensive unit tests that cover valid and invalid formula cases, including edge cases like division by zero and invalid syntax.
   - Update the README and CONTRIBUTING documents with detailed usage examples and integration instructions.

## Usage Examples

**CLI Mode:**
```
node src/lib/main.js --formula "sin(x) + cos(x)" 0 10 0.1
```

**Web Interface Mode:**
- Navigate to `http://localhost:3000` and use the formula evaluation form to input an expression and domain parameters.

## Motivation and Value
- **Enhanced Functionality:** Integrates dynamic mathematical evaluation with plotting, transforming the tool into a more versatile formula visualization library.
- **User Flexibility:** Allows users to experiment with their own expressions and view instant graphical representations, furthering the mission of being the go-to tool for formula visualizations.
- **Leverage Existing Systems:** Builds upon the robust CORE_ENGINE module and uses the pre-existing mathjs dependency, ensuring consistency and reliability.
