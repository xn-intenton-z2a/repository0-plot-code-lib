# PARAM_VALIDATION Feature Specification

## Description
This feature isolates and enhances numeric parameter validation for both CLI and web inputs. It refactors existing numeric input checks into a dedicated module to robustly parse colon-delimited, comma-separated numeric strings. Special handling for case-insensitive 'NaN' values is included, alongside detailed error reporting for tokens that are empty or non-numeric.

## Motivation
- **Reliability:** Early detection of invalid numeric parameters reduces runtime errors across plotting, export, and data processing workflows.
- **User Experience:** Clear, detailed error messages help users quickly identify and correct input mistakes, improving overall usability.
- **Maintainability:** Encapsulating validation logic in a standalone module simplifies future enhancements and makes integration into both CLI and web interfaces seamless.

## Implementation Details
1. **Module Extraction and Refactoring:**
   - Create a new module (e.g., `src/lib/paramValidation.js`) that contains the numeric parameter validation logic.
   - Parse inputs by splitting colon-delimited segments into comma-separated tokens, validating each for numeric value or a valid 'NaN'.
   - Preserve and enhance error reporting with explicit messages that include the problematic token and its context.

2. **Integration:**
   - Replace inline validation in `src/lib/main.js` with calls to the new `paramValidation` module.
   - Ensure both CLI and web interface interactions utilize the module for consistent validation behavior.

3. **Testing and Documentation:**
   - Add comprehensive unit tests covering edge cases: empty tokens, non-numeric values, and valid special tokens ('NaN').
   - Update documentation in README and CONTRIBUTING files, including usage examples and error message guidelines.

## Usage
- **CLI Example:**
  ```bash
  node src/lib/main.js "quad:1,NaN,5,-10,10,1"
  ```

- **Web Interface Example:**
  - On form submissions, the module processes numeric inputs and displays immediate, user-friendly feedback if any tokens are invalid.
