# PARAMETER_HINTS Feature Specification

## Description
This feature enhances the current numeric and parameter validation system by providing interactive, context-aware hints and suggestions. When users input invalid or ambiguous numeric parameters, the system will offer helpful messages, examples, and possible corrections directly in both the CLI and the web interface. This improvement builds on the robust error handling already implemented in the tool, guiding users to quickly resolve errors in plot command syntax.

## Motivation
- **User Guidance:** By offering immediate, actionable hints, users (especially newcomers) will have an easier time understanding the required parameter format and correcting mistakes without having to refer to external documentation.
- **Enhanced Efficiency:** Reducing ambiguity in input parameters minimizes disruption during plot generation. This leads to a smoother workflow and fewer interruptions caused by syntax errors.
- **Mission Alignment:** In line with our mission to be the go-to plot library for formula-based visualisations, this feature improves tool accessibility and usability, making it more intuitive and appealing to a broad user base.

## Implementation Details
1. **CLI Integration:**
   - Enhance the current error messages from the numeric validation function in `src/lib/main.js` to include targeted suggestions and examples of correct input formats.
   - Optionally, implement an interactive prompt that offers auto-completion or step-by-step fixes when users input erroneous parameters.

2. **Web Interface Support:**
   - Integrate inline tooltips and dynamic help panels within the parameter input fields on the web interface.
   - Provide live feedback as users type, with explanations of parameter delimiters, number formats, and acceptable tokens (including the valid 'NaN' token).
   - Update the web documentation to include a dedicated section explaining how these hints work and offering common examples.

3. **Testing and Documentation:**
   - Extend unit tests to verify that the enhanced error messages are displayed when invalid parameters are detected.
   - Include end-to-end tests for the web interface to ensure that inline hints appear as expected.
   - Update the README and CONTRIBUTING documentation with usage examples, demonstrating both CLI and web interface scenarios where parameter hints assist in correcting input.

## Usage
- **CLI Example:**
  ```bash
  node src/lib/main.js "quad:1,NaN,abc,-10,10,1"
  ```
  On detecting the error, the CLI should output a detailed message such as:
  "Error: Invalid numeric parameter 'abc' in segment '1,NaN,abc,-10,10,1'. Did you mean to use 'quad:1,NaN,5,-10,10,1'? Ensure all tokens are valid numbers."

- **Web Interface Example:**
   - As users type a plotting command into the input field, inline hints and tooltips display the expected format and example corrections, dynamically guiding the user toward valid input.

This feature makes the plotting commands more user-friendly and reduces errors, thereby improving overall user experience and productivity.