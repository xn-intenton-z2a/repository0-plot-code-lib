# NUMERIC_VALIDATION Feature Specification

## Description
This feature enhances the numeric parameter validation mechanism within the plotting library. It scrutinizes colon-delimited segments containing comma-separated numeric tokens to ensure they are valid numbers. The system now accepts the special token 'NaN' (case insensitive) as a valid numeric value, and produces clear, contextual error messages that indicate the problematic token, its segment, and the nature of the error.

## Motivation
- **Enhanced Error Reporting:** Provides precise, actionable feedback to users when inputs are invalid, reducing troubleshooting time.
- **Improved User Guidance:** Helps users understand the expected input format by detailing errors in context.
- **Mission Alignment:** By ensuring robust input validation, the feature supports our goal of being the go-to plot library for formula-based visualisations.

## Implementation Details
1. **Validation Process:**
   - Split input strings into colon-delimited segments, and further split segments containing commas into individual tokens.
   - Validate each token by attempting numeric conversion, with the exception of the accepted literal 'NaN'.
   - If a token is invalid (e.g., empty or not a valid number), generate a detailed error message that includes the token, its segment, and the error type.

2. **CLI Integration:**
   - Integrated into the main argument parser in the CLI (see src/lib/main.js), this functionality ensures that input is validated before executing plotting commands.
   - In case of errors, the system outputs an informative error message and exits gracefully.

3. **Testing and Documentation:**
   - Extensive unit tests (using Vitest) simulate various invalid input scenarios to verify that error messages are correctly generated.
   - Documentation in the README and CONTRIBUTING files is updated to include usage examples and explanations of the new validation process.

## Usage
- **CLI Example:**
  ```bash
  node src/lib/main.js "quad:1,NaN,5,-10,10,1"
  ```

- **Expected Behavior:**
   - Valid inputs proceed without interruption.
   - Invalid tokens result in a specific, descriptive error message, such as indicating that 'abc' is not a valid number in its respective segment.

This improvement significantly increases the tool's resilience and user-friendliness by ensuring that only well-formed numeric inputs are processed.